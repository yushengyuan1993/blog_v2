---
id: 0809004
title: HTML5 存储 webStorage
date: 2017-02-12 17:56:48
tags: 
    - HTML5
    - sessionStorage
    - localStorage
categories:
---

`客户端存储数据的两个对象为：`
- `localStorage` - 没有时间限制的数据存储
- `sessionStorage` - 针对一个 session(会话) 的数据存储
在使用 web 存储前，应检查浏览器是否支持 localStorage 和sessionStorage :
```js
if( typeof(Storage) !== "undefined" )
{
    // 是的! 支持 localStorage  sessionStorage 对象!
    // your code
} else {
    // 抱歉! 不支持 web 存储。
}
```
#### <a name="local">1. localStorage 对象</a>
- `localStorage` 对象存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。
实例：
```js
// 存储
// {"name": "yssuo"}
localStorage.name="yasuo";

// 获取
console.log(localStorage.name); // yasuo

// 移除
localStorage.removeItem("name");

// 再次获取
console.log(localStorage.name); // undefined
```
![localstorage](/images/localstorage.png)

#### <a name="local">2. sessionStorage 对象</a>

- `sessionStorage` 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。

不管是 `localStorage`，还是 `sessionStorage`，可使用的API都相同，常用的有如下几个（以localStorage为例）：
```js
// 保存数据
localStorage.setItem(key,value);
// 读取数据
localStorage.getItem(key);
// 删除单个数据
localStorage.removeItem(key);
// 删除所有数据
localStorage.clear();
// 得到某个索引的key
localStorage.key(index);
```