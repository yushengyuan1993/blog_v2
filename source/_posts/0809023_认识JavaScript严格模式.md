---
id: 0809023
title: 认识 JavaScript 严格模式
date: 2016-12-19 16:17:23
tags:
  - JavaScript
categories:
---

<a href="#whatIs">1. 关于严格模式</a>
<a href="#why">2. 为什么使用严格模式</a>
<a href="#ctrl">3. 严格模式的限制</a>
<a href="#key">4. 保留关键字</a>
<a href="regulation">5. 严格模式下的规则</a>

#### <a name="whatIs">1、关于严格模式</a>

- JavaScript 严格模式（strict mode）即在 `严格的条件`下运行。

- 严格模式通过在脚本或函数的头部添加 `use strict`; 表达式来声明。

- `use strict` 指令不是一条语句，但是是一个字面量表达式，在 `JavaScript` 旧版本中会被忽略。

- `use strict` 的目的是指定代码在严格条件下执行。

- `严格模式下你不能使用未声明的变量。`

  **支持严格模式的浏览器:**
  IE 10+、 Firefox 4+、 Chrome 13+、 Safari 5.1+、 Opera 12+。

#### <a name="why">2、为什么使用严格模式</a>

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
  - 消除代码运行的一些不安全之处，保证代码运行的安全；
  - 提高编译器效率，增加运行速度；
  - 为未来新版本的Javascript做好铺垫。

- "严格模式"体现了Javascript更合理、更安全、更严谨的发展方向，包括IE 10在内的主流浏览器，都已经支持它，许多大项目已经开始全面拥抱它。

- 另一方面，同样的代码，在"严格模式"中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。掌握这些内容，有助于更细致深入地理解Javascript，让你变成一个更好的程序员。

#### <a name="ctrl">3、严格模式的限制</a>

- 不允许使用未声明的变量
```js
"use strict";
x = 3.14;           // Uncaught ReferenceError: x is not defined

y = {p1:10, p2:20}; // Uncaught ReferenceError: y is not defined
```

- 不允许删除变量或对象。
```js
"use strict";
var x = 3.14;
delete x;           // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```

- 不允许变量重名:
```js
"use strict";
function func(p1, p1) {};   // 报错
```

- 不允许使用八进制:
```js
"use strict";
var x = 010;                // 报错
```

- 不允许使用转义字符:
```js
"use strict";
var x = \010;               // 报错
```

- 不允许对只读属性赋值:
```js
"use strict";
var obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;               // 报错
```

- 不允许对一个使用 `getter` 方法读取的属性进行赋值
```js
"use strict";
var obj = {get x() {return 0} };

obj.x = 3.14;               // 报错
```

- 不允许删除一个不可删除的属性：
```js
"use strict";
delete Object.prototype;    // 报错
```

- 变量名不能使用 `eval` 字符串:
```js
"use strict";
var eval = 3.14;            // 报错
```

- 变量名不能使用 `arguments` 字符串:
```js
"use strict";
var arguments = 3.14;       // 报错
```

- 不允许使用以下这种语句:
```js
"use strict";
with (Math){x = cos(2)};    // 报错
```

- 由于一些安全原因，在作用域 `eval()` 中创建的变量不能被调用:
```js
"use strict";
eval ("var x = 2");
alert (x);                  // 报错 (x is not defined)
```

- 禁止 `this` 关键字指向全局对象:
```js
function f(){
  return !this;
} 
// 返回false，因为"this"指向全局对象，"!this"就是false

function f(){ 
  "use strict";
  return !this;
} 
// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。

//因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错:
function f(){
  "use strict";
  this.a = 1;
};
f();    // 报错，this未定义
```

- `use strict` 指令只运行出现在脚本或函数的开头。

#### <a name="key">4、保留关键字</a>

- **为了向将来Javascript的新版本过渡，严格模式新增了一些 `保留关键字`：**
  - implements
  - interface
  - let
  - package
  - private
  - protected
  - public
  - static
  - yield

#### <a name="#regulation">5、严格模式下的规则</a>

- 变量不能未声明就使用
- 函数参数必须有唯一的名称 （否则会被认为是语法错误）
- `with` 语句被禁止使用
- 赋值给只读属性会抛出一个错误
- 像 `00840` 这样的八进制数是语法错误
- 尝试 `delete` 不可删除的数据会抛出一个错误
- `delete prop` 被认为是语法错误, 只能删除属性 `delete global[prop]`
- `eval` 不会引入新的变量到它的作用域
- `eval` 和 `arguments` 的绑定不会被改变
- `arguments` 不会神奇地跟踪方法参数的变化
- 不再支持 `arguments.callee`，使用它会抛出 `TypeError`
- 不再支持 `arguments.caller`，使用它会抛出 `TypeError`
- 上下文作为 `this` 在方法调用时不会被强制包装成一个 `Object`（即 `this` 不会指向全局对象）
- 不再能够使用 `fn.caller` 和 `fn.arguments` 访问 `JavaScript` 的堆栈
- 保留字(例如 `protected`, `static`, `interface`等等)不能被作为新变量声明 <a href="#key">保留关键字</a>