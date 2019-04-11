---
id: 040
title: JavaScript 自动分号补全
date: 2019-02-23 13:53:32
tags:
  - JavaScript
categories:
---

#### 一些 [`JavaScript`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements) 语句必须用分号结束，所以会被自动分号补全(`ASI`)影响
- 空语句
- `let`、`const`、变量声明
- `import`、`export`、模块定义
- 表达式语句
- `debugger`
- `continue`、`break`、`throw`
- `return`

#### `ECMAScript` 提到自动分号补全的三个规则
1. 当出现一个不允许的`行终止符`或“`}`”时，会在其之前插入一个分号：
  ```js
  { 1 2 } 3 

  // 将会被ASI转换为 

  { 1 2 ;} 3;
  ```
2. 当捕获到标识符输入流的结尾，并且无法将单个输入流转换为一个完整的程序时，将在结尾插入一个分号：
  ```js
  // 由于在 b 和 ++ 之间出现了一个行终止符，所以 ++ 未被当成变量 b 的后置运算符。
  a = b
  ++c

  // 将被ASI转换为

  a = b;
  ++c;
  ```
3. 当语句中包含语法中的限制产品后跟一个行终止符的时候，将会在结尾插入一个分号。带`这里没有行终止符`规则的语句有：
  - 后置运算符（`++`和`--`）
  - `continue`
  - `break`
  - `return`
  - `yield`, `yield*`
  - `module`
  ```js
  return
  a + b

  // 将被ASI转换为

  return;
  a + b;
  ```

<p style="text-align: right;">`参考文档` [自动分号补全](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E8%87%AA%E5%8A%A8%E5%88%86%E5%8F%B7%E8%A1%A5%E5%85%A8)</p>
