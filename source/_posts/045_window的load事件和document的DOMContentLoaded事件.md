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
- DOMContentLoaded绑定在`document`，load绑定在`window`。
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

#### 如何触发
  1. 当`DOMContentLoaded`事件触发时，仅当DOM加载完成，不包括样式、图片、flash等；
  2. 当`load`事件触发时，页面上所有的DOM、样式、脚本、图片flash都己加载完成。

#### DOM的加载步骤
  1. 解析HTML结构；
  2. 加载外部脚本和样式文件；
  3. 解析并执行脚本代码；
  4. DOM树构建完成； // DOMContentLoaded
  5. 加载图片等外部文件；
  6. 页面加载完毕。 // load