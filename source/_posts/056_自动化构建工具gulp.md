---
title: 自动化构建工具gulp
date: 2021-04-07 18:01:06
tags:
  - 前端工程化
  - gulp
---
1. [前端工程化-初识前端工程化]()
2. [前端工程化-自动化构建工具gulp]()

[gulp](https://gulpjs.com/) 是一个前端自动化构建工具。他可以将开发流程中让人痛苦或耗时的任务自动化，从而减少你所浪费的时间、创造更大价值。

查看本文对应的的演示项目请点击这里 [hello-gulp]()。

#### gulp的特点
  - **简单**：代码优于配置、node 最佳实践、精简的 API 集，gulp 让工作前所未有的简单。
  - **高效**：基于 node 强大的流(stream)能力，gulp 在构建过程中并不把文件立即写入磁盘，从而提高了构建速度。
  - **生态**：遵循严格的准则，确保我们的插件结构简单、运行结果可控。

#### 安装gulp
1. 在项目根目录下初始化并安装gulp：
```sh
  npm init --y 

  npm i gulp -D
```
安装完成后，会在项目 node_modules/目录下创建一个 gulp 的 cli，后面可以直接使用 `yarn gulp <任务名>` 来运行对应的任务 。
1. 在项目根目录创建 gulp 的任务配置文件 gulpfile.js：
#### gulp任务
1. 在gulpfile.js文件中创建相应的任务：
```js
// gulpfile.js

exports.foo = () => {
  console.log('foo 任务执行了')
}
```
运行任务：
```sh
yarn gulp foo
```
