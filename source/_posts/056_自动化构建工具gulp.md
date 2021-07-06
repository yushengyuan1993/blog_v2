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
#### 创建gulp任务
##### gulp 的基本使用方法
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

# 运行会出现以下提示
# 意思是 foo 任务没有执行完成
# 您是否忘记发出异步完成信号？

# 这是因为 gulp从 v4 之后取消了同步代码模式，约定每个任务必须是异步任务
# 所以当任务执行完毕后，需要标记任务的完成

$ yarn gulp foo
yarn run v1.22.4
$ C:\USERFILES\code\github\hello-gulp\node_modules\.bin\gulp foo      
[21:25:02] Using gulpfile C:\USERFILES\code\github\hello-gulp\gulpfile
.js
[21:25:02] Starting 'foo'...
foo 任务执行了
[21:25:02] The following tasks did not complete: foo
[21:25:02] Did you forget to signal async completion?
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about
 this command.
```
改进上面的代码：
```js
// gulpfile.js

exports.foo = (done) => {
  console.log('foo 任务执行了')
  done() // 表示任务完成
}
```
2. 默认的 gulp 任务：
```js
// gulpfile.js

// yarn gulp foo
exports.foo = (done) => {
  console.log('foo任务完成了')

  done()
}

// yarn gulp
exports.default = done => {
  console.log('默认任务完成了')
  done()
}
``` 
3. 老版本(v4之前) gulp 任务注册（不推荐）：
```js
const gulp = require('gulp')

gulp.task('bar', done => {
  console.log('bar任务完成了')
})
```
##### gulp 组合任务
假设我们有如下任务：
```js
const task1 = done => {
  setTimeout(() => {
    console.log('task1 working!')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working!')
    done()
  }, 1000)
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working!')
    done()
  }, 1000)
}
```
1. 串行任务 `series`：
```js
const { series } = require('gulp')

exports.series1 = series(task1, task2, task3)
```
执行上面的 series1 任务：
```sh
# 执行命令
yarn gulp series1

# 输出
[22:11:56] Starting 'series1'...
[22:11:56] Starting 'task1'...
task1 working!
[22:11:57] Finished 'task1' after 1.02 s
[22:11:57] Starting 'task2'...
task2 working!
[22:11:58] Finished 'task2' after 1.01 s
[22:11:58] Starting 'task3'...
task3 working!
[22:11:59] Finished 'task3' after 1.01 s
[22:11:59] Finished 'series1' after 3.05 s
Done in 3.86s.
```
2. 并行任务 `parallel`：
```js
const { parallel } = require('gulp')

exports.parallel1 = parallel(task1, task2, task3)
```
```sh
# 执行命令
yarn gulp parallel1

# 输出
[22:19:59] Starting 'parallel1'...
[22:19:59] Starting 'task1'...
[22:19:59] Starting 'task2'...
[22:19:59] Starting 'task3'...
task1 working!
[22:20:00] Finished 'task1' after 1.01 s
task2 working!
[22:20:00] Finished 'task2' after 1.01 s
task3 working!
[22:20:00] Finished 'task3' after 1.01 s
[22:20:00] Finished 'parallel1' after 1.01 s
Done in 1.81s.
```