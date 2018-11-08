---
id: 0809020
title: 总结《You-Dont-Need-Lodash-Underscore》
date: 2018-01-21 18:07:48
tags:
  - JavaScript
  - es6
categories:
---

#### <a id="You-Dont-Need-Lodash-Underscore">前言</a>
- [Lodash](https://github.com/lodash/lodash) 和 [Underscore](https://github.com/jashkenas/underscore) 是非常优秀的现代JavaScript程序库，它们被前端开发人员广泛使用。

- 但是，如果你将目标锁定为现代浏览器，则可能会发现很多原生的方法，已经被原生的 `ES5` 或者 `ES6` 支持了。

- 如果你希望你的项目需要更少的依赖关系，并且你清楚地知道你的目标浏览器，那么你可能不需要 `Lodash` / `Underscore`。

- 如果你想在更传统的JavaScript执行环境（浏览器？）中使用这些ES5方法，可以使用 [es5-shim](https://github.com/es-shims/es5-shim)

<a href="#array">1. 数组 Array</a>
<a href="#Collection">2. 集合 Collection</a>
<a href="#Function">3. 函数 Function</a>
<a href="#Object">4. 对象 Object</a>
<a href="#String">5. 字符串 String</a>

#### <a name="Array">1、数组 Array</a>

<span style="color: #f55; font-size: 16px;">* _.compact</span>
返回一个过滤了 `falsy `（隐含有false属性，`false`, `0`, `""`, `null`, `undefined`, `NaN`）的值得集合。
```js
// Underscore/Lodash
_.compact([0, 1, false, 2, '', 3]);

// Native
[0, 1, false, 2, '', 3].filter(v => v)
// [1, 2, 3]
```
| ![Chrome](/images/browser/chrome.png) | ![Firefox](/images/browser/firefox.png) | ![IE](/images/browser/ie.png) | ![Opera](/images/browser/opera.png) | ![Safari](/images/browser/safari.png) |
| :---: | :---: |:---: | :---: | :---: | 
| <i style="color: #0b0">√</i> |  <i style="color: #0b0">1.5 √</i> | <i style="color: #0b0">9 √</i> |  <i style="color: #0b0">√</i> |  <i style="color: #0b0">√</i>  |

<span style="color: #f55; font-size: 16px;">* _.concat</span>
将任意的数组或一个值合并成一个新的数组
```js
// Underscore/Lodash
var array = [1]
var other = _.concat(array, 2, [3], [[4]])
console.log(other)  // [1, 2, 3, [4]]

// Native
var array = [1]
var other = array.concat(2, [3], [[4]])
console.log(other)  // [1, 2, 3, [4]]
```
| ![Chrome](/images/browser/chrome.png) | ![Firefox](/images/browser/firefox.png) | ![IE](/images/browser/ie.png) | ![Opera](/images/browser/opera.png) | ![Safari](/images/browser/safari.png) |
| :---: | :---: |:---: | :---: | :---: | 
| <i style="color: #0b0">1.0 √</i> |  <i style="color: #0b0">1.0 √</i> | <i style="color: #0b0">5.5 √</i> |  <i style="color: #0b0">√</i> |  <i style="color: #0b0">√</i>  |

<span style="color: #f55; font-size: 16px;">* _.fill</span>
使用从开始到结束，但不包括结束的值填充数组元素
```js
// Underscore/Lodash
var array = [1, 2, 3]
_.fill(array, 'a')
console.log(array)    
// output: ['a', 'a', 'a']
_.fill(Array(3), 2)
// output: [2, 2, 2]
_.fill([4, 6, 8, 10], '*', 1, 3)
// output: [4, '*', '*', 10]

// Native
var array = [1, 2, 3]
array.fill('a')
console.log(array)
// output: ['a', 'a', 'a']
Array(3).fill(2)
// output: [2, 2, 2]
[4, 6, 8, 10].fill('*', 1, 3)
// output: [4, '*', '*', 10]
```
| ![Chrome](/images/browser/chrome.png) | ![Firefox](/images/browser/firefox.png) | ![IE](/images/browser/ie.png) | ![Opera](/images/browser/opera.png) | ![Safari](/images/browser/safari.png) |
| :---: | :---: |:---: | :---: | :---: | 
| <i style="color: #0b0">45.0 √</i> |  <i style="color: #0b0">31.0 √</i> | <i style="color: #0b0">×</i> |  <i style="color: #0b0">×</i> |  <i style="color: #0b0">7.1 √</i>  |

<span style="color: #f55; font-size: 16px;">* _.find</span>
返回数组中满足提供的检测函数的第一个元素的值，否则返回 undefined
```js
// Underscore/Lodash
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
]
_.find(users, function (o) { return o.age < 40; })
// output: {user: "barney", age: 36, active: true}

// Native
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
]
users.find(function (o) { return o.age < 40; })
// output: {user: "barney", age: 36, active: true}
```
| ![Chrome](/images/browser/chrome.png) | ![Firefox](/images/browser/firefox.png) | ![IE](/images/browser/ie.png) | ![Opera](/images/browser/opera.png) | ![Safari](/images/browser/safari.png) |
| :---: | :---: |:---: | :---: | :---: | 
| <i style="color: #0b0">45.0 √</i> |  <i style="color: #0b0">25.0 √</i> | <i style="color: #0b0">×</i> |  <i style="color: #0b0">×</i> |  <i style="color: #0b0">7.1 √</i>  |


#### <a name="Collection">2、集合 Collection</a>
#### <a name="Function">3、函数 Function</a>
#### <a name="Object">4、对象 Object</a>
#### <a name="String">5、字符串 String</a>

