---
id: 052
title: 如何优雅的进行async/await的错误捕获
date: 2021-03-21 19:28:29
tags:
  - JavaScript
---

说到捕获JS中错误的方法，我们首先想到的就是`try/catch`了，这也是我们在实际业务中最常用到的。本文我们看看如何在`async/await`中优雅的捕获错误。

#### 什么是async/await
`async/await`是ES7中提出来的新特性，他是基于`Promise`来使用的，常见的用法：
  ```js
    import userLogin from '../api/user/login';

    async function onUserLogin(params) {
      const res = await userLogin(params);

      if (res.code === 10000) {
        // your code
      }
    }
  ```
这里就会出现一种情况，这段代码`const res = await userLogin(params)`由于是向服务端请求一个接口，但是这里的错误类型就很多了，比如说网络异常（超时等）、接口返回异常（40x/50x）、返回了错误的业务代码（code !== 10000），甚至时语法错误。

#### 使用try/catch来捕获错误
我们当然可以使用`try/catch`的方式去捕获这个异常，就像这样：
```js
  import userLogin from '../api/user/login';

  async function onUserLogin(params) {
    try {
      const res = await userLogin(params);

      if (res.code === 10000) {
        // your code
      }
    } catch (err) {
      console.error(err);
    }
  }
```
这种处理方式乍一看其实没有问题，但是如果我们考虑到实际的使用场景就会发现，类似这样对API接口的调用，在应用里其实是非常多的，难道我们在每个调用的地方都要使用`try/catch`吗？我们已经封装了API接口，为何不进一步封装一下这里对`async/await`的呢？

#### 使用.catch()方法来捕获错误
我们知道了`async/await`的使用，是基于`Promise`的，而`Promise`是有`then()`和`catch()`方法的，既然是这样，那我们可以把对错误的捕获，统一放在`catch()`方法中去捕获并处理：
```js
  // api/request.js
  // 我们在封装Ajax的时候，把对async/await的错误捕获也加上
  // 比如我们基于Promise封装了request方法
  import axios from 'axios';

  const request = (url, params) => {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  const $http = (url, params) => {
    return request(url, params).then(data => [null, data]).catch(err => [err, null]);
  }

  export default $http;
```
使用：
```js
  // login.html
  import $http from '../api/request';

  const [err, data] = await $http('/api/user/login', { u_name: 'admin', u_pwd: '123456' });

  if (err) {
    // error handler
  } else {
    // your code
  }
```