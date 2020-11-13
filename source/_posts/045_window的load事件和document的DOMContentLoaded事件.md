---
id: 045
title: window的load事件和document的DOMContentLoaded事件
date: 2020-11-12 15:49:36
tags:
  DOM
---

#### 区别
- `DOMContentLoaded`：HTML文档（DOM）被完全加载和解析完成之后触发，不等待styles、images、js等资源的加载；
- `load`：在HTML文档和所有相关的资源全部加载加载完成后才会触发；
- DOMContentLoaded绑定到document，load绑定到window。
  ```js
  document.addEventListener('DOMContentLoaded', (e) => {
    // 先打印
    console.log("DOMContentLoaded");
  });
  window.addEventListener('load', (e) => {
    // 后打印
    console.log("load");
  });
  ```