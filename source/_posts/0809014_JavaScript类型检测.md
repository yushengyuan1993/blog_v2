---
id: 0809014
title: JavaScript 类型检测
date: 2016-10-05 10:58:37
tags:
    - JavaScript
categories:
---

一个简单有用的js类型检测的方法：

```javascript
function checkType(sth) {
    return Object.prototype.toString.call(o)
    .match(/(\w+)\]$/)[1]
    .toLowerCase();
}

checkType({})               // object
checkType([])               // array
checkType(function(){})     // function
checkType(1)                // number
checkType(+'3')             // number
checkType(3+'')             // string
```