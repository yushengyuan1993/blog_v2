---
id: 0809022
title: JavaScript 闭包 (Closure)
date: 2017-09-17 16:16:25
tags:
  - JavaScript
categories:
---

> 网上很多人对闭包 `closure` 进行了非常多的描述，毫无疑问，他们大多都讲的非常细致，非常棒。但总是觉得赘述部分有点多，有时候会把一个人给绕懵，其实我们可以从最简单的地方入手 闭包的。

#### <a>1、What is `closure`?</a>

- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，`将函数内部的变量和方法传递到外部`。

- `闭包的特征`：
  - 函数内再嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收

#### <a>2、How to do?</a>

- 一个最简单常见的场景：
  每次点击一个 `li` 元素，打印出该元素对应的索引
  ```html
  <ul id="list">
    <li>item 0</li>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
  </ul>
  ```
  ```js
  var lists = document.getElementsByTagName("li");
 	for(var i = 0; i < lists.length; i ++){
 	  lists[i].onclick = (function(i){
      return function() {
        console.log(i);
      } //不用闭包的话，值每次都是 5
    })(i);
 	}

  //当然，使用 ES6 也可以这么干
  for(let j = 0; j < lists.length; j ++){
 	  lists[j].onclick = () => {
      console.log(j)
    }
 	}
  ```

- 看一个更加直白的例子：
  看看闭包都干了些什么
  ```js
  // 执行greeter()后,greeter()闭包内部变量会存在,而闭包内部函数的内部变量不会存在
  // 使得Javascript的垃圾回收机制 GC 不会收回greeter()所占用的资源
  // 因为greeter()的内部函数的执行需要依赖greeter()中的变量
  
  function greeter() {
    // Local variable that ends up within closure
    var str = 'hello';
    var alertGreet = function() {
      alert(str);
    }
    str = 'hello world';
    return alertGreet;
  }

  var alertGreet = greeter();
  alertGreet()    // hello world

  // 还是上面的例子，如果把 `str = hello world` 和 `return alertGreet` 调换位置，
  // 最后会弹出 hello 而不是 hello world 了。
  ```

<p style="text-align: right">参考文档 [github.com](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)</p>