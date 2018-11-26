---
id: 006
title: 有趣的 javascript 数组
date: 2016-11-27 15:48:26
tags: 
    - JavaScript
categories:
---

#### 关于数组的一些认识
1. 使用构造器函数创建数组时:
```javascript
let ary = new Array();
```
- 若参数只有一个，且为数字，`let ary1 = new Array(3)`，这是其实我们是在指定数组的长度的，即 `ary1.length === 3`。`ary1[0]`则为`undefined`;
- 当定义`let ary2 = new Array(1, 2, 3)`时，此时`ary2 === [1, 2, 3]`;
2. JS中的数组定义非常的自由：
 看下面的例子：
```javascript
let ary = [1, 2, 3];
ary[5] = 5;
console.log(ary);           // [1,2,3,undefined,undefined,5]
console.log(ary.length);    // 6
```
 再看：
```javascript
let ary2 = [1, 2, 3, 4, 5];
ary2.length = 3;
console.log(ary2);      // [1, 2, 3]
```
#### 常用的数组API
1. 万能方法 `splice()`
-  splice()方法允许我们对数组进行插入、替换和删除的功能。**splice方法返回一个有删除元素组成的新数组，没有删除时则返回一个空数组**，简直完美呀！
- `splice()`方法接受三个参数，**第一个**为开始索引，**第二个**为删除元素的位置，**第三个**为插入的元素，可以为第二个，当然也可省略（表示删除元素）。
- `splice()`方法会修改原数组！
- 通过以下三个demo了解一下具体的用法吧：
插入:
```javascript
let ary1 = ["first", "second", "third", "forth", "fifth"];
let ary2 = ary1.splice(1,0,"add1");
console.log(ary1);      [ 'first', 'add1', 'second', 'third', 'forth', 'fifth' ]
console.log(ary2);      [] 没有删除则放回一个空数组
```
替换：
```javascript
let ary1 = ["first", "second", "third", "forth", "fifth"];
let ary2 = ary1.splice(1,1,"replace");
console.log(ary1);      [ 'first', "replace, 'third', 'forth', 'fifth' ]
console.log(ary2);      ["second"] 返回被删除(即替换)的数组
```
删除：
```javascript
let ary1 = ["first", "second", "third", "forth", "fifth"];
let ary2 = ary1.splice(1,3);
console.log(ary1);      ["second", "third", "forth"]
console.log(ary2);      ["first", "fifth"]
```
2. `slice()` 方法
- `slice()` 方法可以接受两个参数(start, end)；
- `slice()` 方法可从已有的数组中返回选定的元素；
- `slice()` 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分；
- `slice()` 方法**不会改变原始数组**，而是返回一个新数组。
demo1:
```javascript
let ary = ["first", "second", "third", "forth", "fifth"];
console.log (ary.slice(1,2) );      // ["second"]
let ary1 = ary.slice(1,2);          // ["second"]
let ary2 = ary.slice(1,3);          // ["second", "third"]
console.log(ary);                   // ["first", "second", "third", "forth", "fifth"];
```
demo2:
```javascript
let ary = ["first", "second", "third", "forth", "fifth"];
console.log(ary.slice(1,2));    // ["second"]
console.log(ary.slice(1,3));    // ["second", "third"]
console.log(ary));              // ["first", "second", "third", "forth", "fifth"];
```
demo3:
```javascript
let ary = ["first", "second", "third", "forth", "fifth"];
let ary1 = ary.slice();     // ["first", "second", "third", "forth", "fifth"];
let ary2 = ary.slice(0);     // ["first", "second", "third", "forth", "fifth"];

ary === ary1;       // false
ary === ary2;       // false
ary1 === ary2;      // false
```
**看出来啥猫腻没，这不是深复制一个数据吗！**