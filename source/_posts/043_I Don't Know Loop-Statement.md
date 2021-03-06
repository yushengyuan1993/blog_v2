---
id: 043
title: I Don't Know Loop-Statement
date: 2019-01-15 14:46:37
tags:
  - JavaScript
---

1. `for...in`:
    - `for...in`一般是用在对象属性名的遍历上的，由于每次迭代操作会同时搜索实例本身的属性以及原型链上的属性，所以效率肯定低下.
    - `for...in` 实际上效率是最低的。这是因为 `for...in` 有一些特殊的要求，具体包括：
      ```js
      1. 遍历所有属性，不仅是 ownproperties 也包括原型链上的所有属性。
      2. 忽略 enumerable 为 false 的属性。
      3. 必须按特定顺序遍历，先遍历所有数字键，然后按照创建属性的顺序遍历剩下的。
      ```
2. `for...in`, `Object.keys()`和`Object.getOwnPropertyNames()`的区别:
    ```js
    1. for...in 循环:会遍历对象自身的属性,以及原型属性,包括enumerable 为 false(不可枚举属性);
    2. Object.keys():可以得到自身可枚举的属性,但得不到原型链上的属性;
    3. Object.getOwnPropertyNames():可以得到自身所有的属性(包括不可枚举),但得不到原型链上的属性,Symbols属性
    也得不到.
    ```
3. 小结：
- 能用for缓存的方法循环就用for循坏,性能最高,写起来繁杂;
- 不追求极致性能的情况下,建议使用forEach方法,干净，简单，易读，短，没有中间变量，没有成堆的分号，简单非常
优雅;
- 想尝鲜使用ES6语法的话,不考虑兼容性情况下,推荐使用for of方法,这是最简洁、最直接的遍历数组元素的语法,该方
法避开了for-in;循环的所有缺陷与forEach()不同的是，它可以正确响应break、continue和return语句.
- 能避免for in循环尽量避免,太消费性能,太费时间,数组循环不推荐使用.