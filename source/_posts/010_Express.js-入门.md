---
id: 010
title: Express.js 入门
date: 2018-01-12 16:07:06
tags:
    - Node
    - Express
    - ing
categories:
---

> Express: Fast, unopinionated, minimalist web framework for Node.js（Express是一个快速，高度包容，极简的Node.js框架）。事实上，只要对Node.js稍有了解，基本上就可以入门Express了，本人就是对Node.js有些了解之后就去学习了一下Express，自身感觉正如官方介绍那样。

- <a href="#start">1 入门</a>
    - <a href="#install">1.1 安装</a>
    - <a href="#hello">1.2 hello world</a>
    - <a href="#generator">1.3 Express生成器</a>
    - <a href="#basicrouter">1.4 基本路由</a>
    - <a href="#static">1.5 静态文件处理</a>
- <a href="#guide">2 指南</a>
    - <a href="#router">2.1 路由</a>
    - <a href="#writingmiddleware">2.2 编写中间件</a> 
    - <a href="#useingmiddleware">2.3 使用中间件</a> 
- <a href="#api">3 API</a>
---

#### <a name="start">1. 入门</a>

- <a name="install">1.1 安装</a>

`使用Express之前确保你的机器上安装有Node.js环境。`

> 创建工程目录，并进入到工程目录：

```sh
$ mkdir express
$ cd express
```

> 使用`npm init`命令为应用程序创建`package.json`文件：

```sh
$ npm init
```
输入`npm init`命令时，除了`entry point: (index.js)`选项修改`index.js`为`app.js`（入口文件）之外（当然也可以使用默认值），其余的选项可以直接回车选择默认值。
此时，工程中会生成一个`package.json`文件，打开看一下，基本长这样：
```json
{
  "name": "express",
  "version": "1.0.0",
  "description": "start express",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "express"
  ],
  "author": "yvshare.cn",
  "license": "ISC"
}
```

> 在当前目录中安装`Express`，然后将其保存在依赖项列表中。例如：

```sh
$ npm install express --save
```
要暂时安装`Express`而不将其添加到依赖项列表中，请省略`--save`选项：
```sh
$ npm install express
```
`采用 --save 选项安装的 Node 模块已添加到 package.json 文件中的 dependencies 列表。 今后运行 app 目录中的 npm install 将自动安装依赖项列表中的模块。`

- <a name="hello">1.2 hello world</a>

> 在<a href="#install">1.1</a>步骤的基础上，开始创建第一个程序，创建一个`app.js`文件（对应`npm init`时的`entry point: (app.js)`），并填入代码：

```js
// app.js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
应用程序会启动服务器，并在端口 3000 上侦听连接。此应用程序以“Hello World!”响应针对根 URL (/) 或路由的请求。对于其他所有路径，它将以 404 Not Found 进行响应。
`req（请求）和 res（响应）与 Node 提供的对象完全相同，所以您可以在不涉及 Express 的情况下调用 req.pipe()、req.on('data', callback) 和要执行的其他任何函数。`

> 使用以下命令运行应用程序：

```sh
$ node app.js
```
然后，在浏览器中输入 [http://localhost:3000/](http://localhost:3000/) 以查看输出。

- <a name="generator">1.3 Express生成器</a>

`Express 生成器的作用就像是为完整的应用程序建立一个“脚手架”，包含各种用途的 JavaScript 文件、Jade 模板和子目录。`

> 使用以下命令安装 express：

```sh
$ npm install express-generator -g
```

> 使用 -h 选项显示命令选项：

```sh
$ express -h

  Usage: express [options] [dir]


  Options:

        --version        output the version number
    -e, --ejs            add ejs engine support
        --pug            add pug engine support
        --hbs            add handlebars engine support
    -H, --hogan          add hogan.js engine support
    -v, --view <engine>  add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade                                                                                                                                   )
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css                                                                                                                                   )
        --git            add .gitignore
    -f, --force          force on non-empty directory
    -h, --help           output usage information
```

> 例如，以下语句在当前工作目录中创建名为 `myapp` 的 `Express` 应用程序：

```sh
$ express --view=pug myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/public
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/bin
   create : myapp/bin/www
   create : myapp/public/images
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css

   install dependencies:
     $ cd myapp && npm install

   run the app:
     $ DEBUG=myapp:* npm start

   create : myapp/public/javascripts
```

> 进入到 `myapp` 目录，然后安装依赖项：

```sh
$ npm install
```

> 在 MacOS 或 Linux 上，采用以下命令运行此应用程序：

```sh
$ DEBUG=myapp:* npm start
```

> 在 Windows 上，使用以下命令：

```sh
set DEBUG=myapp:* & npm start
```
或者直接
```sh
$ npm start
```

*然后在浏览器中输入 [http://localhost:3000/](http://localhost:3000/) 以访问此应用程序。*

> 生成的应用程序具有以下目录结构：

```sh
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```
`生成器创建的应用程序结构只是构造 Express 应用程序的众多方法之一。请随意使用此结构或者对其进行修改以最大程度满足自己的需求。`

- <a name="basicrouter">1.4 基本路由</a>
- <a name="static">1.5 静态文件处理</a>