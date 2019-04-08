---
id: 021
title: ES6 Promise
date: 2017-06-09 15:30:49
tags:
  - JavaScript
  - es6
categories:
---

> `Promise`是抽象异步处理对象以及对其进行各种操作的组件。 通俗点讲，`Promise`能解决由于回调嵌套带来的流程控制与可读性问题。

1. <a href="#primise">原生API函数的 Promise 化</a>
2. <a href="#all">Promise.all 解决并行任务</a>
3. <a href="#then">Promise.then 的链式调用</a>
4. <a href="#catch">中断或取消 Promise 链</a>
5. <a href="#async/await">使用基于 Promise 的 async/await</a>


#### <a name="primise">1. 原生API函数的 Promise 化</a>
- 大部分原生的API函数并不支持 `Promise`，还是基于回调来使用的，所以需要把一些方法改为返回一个 `Promise` 对象，这个过程被称为函数的 `Promise` 化。
- 下面一个例子将对定时器 `setTimeout` `Promise` 化:
  ```js
  function timer (fn, time) {
    return function () {
      return new Promise( (resolve, reject) => {
        setTimeout(function () {
          fn();
          resolve();
        }, time);
      });
    }
  }

  Promise.resolve()
  .then(
    timer(function () {
      console.log('1')
    }, 1000)
  )
  .then(() => {
    console.log('2');
  });
  // 输出结果
  // 1
  // 2
  ```
- `Promise`化本质上都属于一种`Curry(柯里)`化。`Curry`化是指，将需要传递多参数的函数生成一个新的函数，如上代码先通过执行 timer得到一个新的函数，该函数会返回一个`Promise`，这样就完成了`Promise`化。将一些基础的函数进行`Promise`化，可以
大大减少不必要的代码。
- 下面的代码，将会体现这种优势:
  ```js
  var promise_timer = timer(function () {
   console.log('1')
  }, 1000) 
  function promise_timer2(){
    return new Promise( (resolve,reject) => {
      setTimeout(function () {
        console.log('1');
        resolve();
      }, 1000);
    });
  }
  ```

#### <a name="all">2. Promise.all 解决并行任务</a>
- 当某个函数需要在 `N` 个回调都完成时才执行，这个时候就可以使用 `Promise.all` 来改善你的代码。
- 以下是一个图片并行加载的例子,当所有图片加载完成后，再将所有图片一起展示:
  ```js
  function loadImg(src){
    return new Promise( (resolve,reject) => {
      var img = document.createElement("img");
      img.src = src;
      img.onload = function(){
        resolve(img);
      }
      img.onerror = function(err){
        reject(err);
      }
    });
  }

  function showImgs(imgs){ 
    imgs.forEach(function(img){
      document.body.appendChild(img);
    });
  }

  Promise.all([
    loadImg('1.png'), //加载图片
    loadImg('2.png'),
    loadImg('3.png'),
    ...
  ]).then(showImgs); //显示图片
  ```
  - 需要注意的是，`Promise.all` 中传入的 `Promise` 数组，各自 `resolve` 之后得到的值，将合并成一个数组传入到 `then` 中的方法，且数组中 `resolve` 值的顺序，与 `Promise` 数组的顺序一致。
  ![promise](/images/promise-1.png)

#### <a name="then">3. Promise.then 的链式调用</a>
- 在许多Promise示例中都可以看到类似如下的 `链式调用` 的代码：
  ```js
  function getUserInfo(){
   console.log('getUserInfo start');
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('getUserInfo end');
        var userInfo = {
          name: 'adam'
        };
        resolve(userinfo);
      },1000);
   });
  }

  function getGroupInfo(userinfo){
    console.log('getGroupInfo start');
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        var groupInfo = {
          name: 'desc'
        }
        console.log('getGroupInfo end');
        resolve(groupInfo,userinfo);
      },1000);
    });
  }

  function getTaskInfo(groupInfo,userinfo){
    console.log('getTaskInfo start');
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        var taskInfo = {
          name: 'rebuild'
        };
        console.log('getTaskInfo end');
        resolve();
      },1000);
    });
  }

  var p = Promise.resolve();
    p.then(getUserInfo)
    .then(getGroupInfo)
    .then(getTaskInfo);
  /* 输出结果 
  getUserInfo start
  getUserInfo end
  getGroupInfo start
  getGroupInfo end
  getTaskInfo start
  getTaskInfo end
  */
  ```
  - 如上面代码所示，我们可以很清楚的理解到程序执行的顺序是:
  ![promise](/images/promise-2.png)
- 但是如果我们对代码进行一点小的改造，将 `then` 中的方法不再返回 `Promise` ，那么执行的代码将会变成这样:
  ```js
  function getUserInfo(){
    console.log('getUserInfo start');
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('getUserInfo end');
        resolve();
      },1000);
    });
  }

  function getGroupInfo(){
    console.log('getGroupInfo start');
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('getGroupInfo end');
        resolve();
      },1000);
    });
  }

  function getTaskInfo(){
    console.log('getTaskInfo start');
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('getTaskInfo end');
        resolve();
      },1000);
    });
  }

  var p = Promise.resolve();
    p.then(getUserInfo)
    .then(getGroupInfo)
    .then(getTaskInfo);
  /* 输出结果 
  getUserInfo start
  getGroupInfo start
  getTaskInfo start
  getUserInfo end
  getGroupInfo end
  getTaskInfo end
  */
  ```
  - 这是因为每次调用 `then` 都会返回一个新的 `Promise` ，如果 `then` 中的申明的方法没有返回一个 `Promise` ，那么会默认返回一个新的
处于 `fulfilled` 的 `Promise` ，之后添加的 `then` 中的方法都会立即执行,所以执行的顺序就变成这样了：
![promise](/images/promise-3.png)
  - 当要在使用`链式 Promise` 时，请务必在 `then` 传入的方法中`返回一个新的 Promise`。
  - 另外一个需要 `注意` 的是，resolve 传递给下个 then 方法的值只能有一个，上面 getTaskInfo 方法中是无法获取到 userInfo 的值，所以如果有多个值需要放在一个 `数据集合`（ Array , Object , Map , Set ）中传入下个方法。

#### <a name="catch">4. 中断或取消 Promise 链</a>
- Promise 标准的 API 中并没有提供相应的方法来中断或者取消 Promise 链的执行，一些库中提供了类似 `Promise.break` 或者 `Promise.fail` 的方法来中断或取消 Promise 链。利用 `Promise.catch` 的特性来`中断 promise` 链。
  ```js
  /** 用于中断的信号 */
  class BreakSignal {}
  Promise
    .then(() => {  // 1
      // 开始.
    })
    .then(() => {  // 2
      if (wantToBreakHere) {
        // 抛出中断信号.
        throw new BreakSignal();
      }
    })
    .then(() => { // 3
      // 需要跳过的部分.
    })
    // 接住中断信号.
    .catch(BreakSignal, () => {  // 4

    });
  ```
  - 只要在 Promise 执行过程中抛出异常，都会直接跳转到 `catch` 中。但是这样的做法有一个缺点，无法区分程序本身的异常，还是手动抛出的异常。所以需要手动设置一个标识标量，来区分是为了中断执行还是本身的程序异常。
  - 上面的代码中，执行到 `2` 时，由于抛出了终端信号，所以会直接跳过 `3` 直接执行 `catch` 部分。

#### <a name="async/await">4. 使用基于 Promise 的 async/await</a>
- `async`：
  ```js
  async function f() {
    return 1
  }
  ```
  - 函数前面的 async 一词意味着一个简单的事情：这个函数总是返回一个 `Promise`，如果代码中有 return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。
  - 例如，上面的代码返回resolved值为1的promise，我们可以测试一下：
  ```js
  async function f() {
    return 1
  }
  f().then(alert) // 1
  ```
  - 我们也可以显式的返回一个promise，这个将会是同样的结果：
  ```js
  async function f() {
    return Promise.resolve(1)
  }
  f().then(alert) // 1
  ```
  >所以，`async` 确保了函数返回一个 `Promise`，即使其中包含非Promise。
- `await`：
  ```js
  // 只能在 async 函数内部使用
  let value = await promise;
  ```
  - 关键词 `await` 可以让JavaScript进行等待，直到一个 `Promise` 执行并返回它的结果，JavaScript才会继续往下执行。
  - 以下是一个 Promise 在 1s 之后 resolve 的例子:
  ```js
  async function f() {
    let p = new Promise((resolve, reject) => {
      setTimeout(() => resolve('done!'), 1000)
    })
    let result = await p // 直到promise返回一个resolve值（*）
    alert(result) // 'done!' 
  }
  f()
  ```
  - 函数执行到（*）行会‘暂停’，当Promise处理完成后重新恢复运行， resolve的值成了最终的result，所以上面的代码会在1s后输出'done!'。
  > 我们强调一下：`await` 字面上使得JavaScript等待，直到 `Promise` 处理完成，然后将结果继续下去。这并不会花费任何的cpu资源，因为引擎能够同时做其他工作：执行其他脚本，处理事件等等。
- `一个非常常见的栗子`：
  ```js
  function getSyncTime() {
    return new Promise((resolve, reject) => {
      try {
        let startTime = new Date().getTime();
        setTimeout(() => {
          let endTime = new Date().getTime();
          let data = endTime - startTime;
          resolve( data );
        }, 500);
      } catch ( err ) {
        reject( err );
      }
    });
  }

  async function getSyncData() {
    let time = await getSyncTime();
    let data = `endTime - startTime = ${time}`;
    return data;
  }

  async function getData() {
    let data = await getSyncData();
    // 打印
    console.log( data );
  }

  getData();

  /** 500ms 后输出
  * Promise {<pending>}
  * endTime - startTime = 501
  */
  ```

<p style="text-align: right">参考文档 [Promise](https://aotu.io/notes/2016/01/08/promise/)</p>