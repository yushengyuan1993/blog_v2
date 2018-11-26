---
id: 009
title: vue-cli 快速构建 vue.js 项目
date: 2018-01-02 14:59:28
tags:
    - vue.js
    - webpack
    - JavaScript
    - es6
categories:
---
- <a href="#Quickstart">快速上手</a>
- <a href="#Commands">构建命令</a>
- <a href="#Babel">配置Babel</a>

#### <a name="Quickstart">1. 快速上手</a>
本文介绍如何使用vue-cli快速构建vus.js项目，主要用到`webpack`，以及`vue-loader`，所以确保你的环境中安装有webpack。

```bash
# 安装vue-cli脚手架工具
$ npm install -g vue-cli

# 在 my-project 目录中生成一个项目
# 这一步中你还可以选择是否安装vue-router,ESLint,unit tests, e2e tests...
$ vue init webpack my-project

# 进入到项目
$ cd my-project

# 安装依赖
$ npm install

# 构建并启动项目
$ npm run dev
```
如果你在 `vue init webpack my-project` 步骤中选择安装所有的工具，那么我们的项目目录结构应该是这样的：
```
.
├── build/                      # webpack config files
│   └── ...
├── config/
│   ├── index.js                # main project config
│   └── ...
├── src/
│   ├── main.js                 # app entry file
│   ├── App.vue                 # main app component
│   ├── components/             # ui components
│   │   └── ...
│   └── assets/                 # module assets (processed by webpack)
│       └── ...
├── static/                     # pure static assets (directly copied)
├── test/
│   └── unit/                   # unit tests
│   │   ├── specs/              # test spec files
│   │   ├── eslintrc            # config file for eslint with extra settings only for unit tests
│   │   ├── index.js            # test build entry file
│   │   ├── jest.conf.js        # Config file when using Jest for unit tests
│   │   └── karma.conf.js       # test runner config file when using Karma for unit tests
│   │   ├── setup.js            # file that runs before Jest runs your unit tests
│   └── e2e/                    # e2e tests
│   │   ├── specs/              # test spec files
│   │   ├── custom-assertions/  # custom assertions for e2e tests
│   │   ├── runner.js           # test runner script
│   │   └── nightwatch.conf.js  # test runner config file
├── .babelrc                    # babel config
├── .editorconfig               # indentation, spaces/tabs and similar settings for your editor
├── .eslintrc.js                # eslint config
├── .eslintignore               # eslint ignore rules
├── .gitignore                  # sensible defaults for gitignore
├── .postcssrc.js               # postcss config
├── index.html                  # index.html template
├── package.json                # build scripts and dependencies
└── README.md                   # Default README file
```
> 目录/文件介绍：

- `build/`：该目录保存的是开发和生产环境中的webpack配置，一般情况下是不需要进行修改的；当需要自定义webpack配置时，可以从webpack.base.conf.js开始研究。

- `config/index.js`：这是项目构建时需要的一些最常用到的配置文件。

- `src/`：这里存放的就是我们的业务代码了，我们可以根据项目需要自行配置。

- `static/`：在这里，我们可以存放一些我们不希望webpack来处理的静态资源文件，在使用webpack来构建时，这里的文件将会直接复制到构建后的资源目录下。

- `test/unit`：单元测试相关文件。

- `test/e2e`：e2e测试相关文件。

- `index.html`：基于vue.js的SPA单页应用的入口HTML模板，在开发、构建过程中，webpack将生成很多资源文件，文件之间的URL会被自动的注入到该index.html中。

- `package.json`：npm包源文件，包含所有的构建依赖和构建命令。

#### <a name="Commands">2. 构建命令</a>

<strong>所有的构建命令都是通过`npm`脚本执行的，见`package.json//scripts`。<strong>

```
npm run dev
```
在本地开发环境启动一个node.js服务器。
- `webpack` + `vue-loader` 作用于vue的单文件组件
- 状态保存，热加载
- 使用`ESLint`检查js
- 生成资源文件的sourcemap
- ......

```
npm run build
```
在生产环境中构建资源
- 使用`UglifyJS v3`压缩JavaScript
- 使用`html-minifier`压缩HTML
- 使用`cssnano`将所有组件的CSS提取到一个文件中
- 使用版本哈希编译所有的静态文件，以实现资源的持久缓存。为所有的资源自定生成合适的URL，最后注入到`index.html`中，完成整个工程的构建。

```
npm run unit
```
- 使用Jest在JSDOM中运行单元测试

```
npm run lint
```
- 运行ESLint并报告任何linting错误。

> 更多构建命令请查阅相关资料

#### <a name="Babel">3. 配置Babel</a>

> 详见我的[另外一篇文章](/2018/03/01/007/)

`至此，通过vue-cli构建vue工程的基本过程已经结束，查看更多详细配置，`[请转](https://vuejs-templates.github.io/webpack/)