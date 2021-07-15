---
title: 自动化构建工具gulp
date: 2021-04-07 18:01:06
tags:
  - 前端工程化
  - gulp
---

1. [前端工程化-初识前端工程化](https://blog.yvshare.cn/2021/04/06/055_%E5%88%9D%E8%AF%86%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/)
2. [前端工程化-自动化构建工具gulp](https://blog.yvshare.cn/2021/04/07/056_%E8%87%AA%E5%8A%A8%E5%8C%96%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7gulp/)

[gulp](https://gulpjs.com/) 是一个前端自动化构建工具。他可以将开发流程中让人痛苦或耗时的任务自动化，从而减少你所浪费的时间、创造更大价值。

查看本文对应的的演示项目请点击这里 [hello-gulp](https://github.com/yushengyuan1993/hello-gulp)。

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
#### gulp 的基本使用方法
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
#### gulp 组合任务
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

#### gulp 异步任务
gulp也可以用来处理异步任务
```js
exports.promise = () => {
  console.log('promise task')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise error task')
  Promise.reject(new Error('promise task faild!')) // 错误优先，结束后续所有的任务
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
exports.async = async () => {
  await timeout(1000)
  console.log('async task')
}
```
```sh
# 执行异步任务
yarn gulp promise

# 异步任务抛出错误
yarn gulp promise_error

# 使用 async/await 处理异步
yarn gulp async
```

#### gulp 构建流程的基本原理
gulp是一个基于文件流的构建工具，可以简单的理解为：
```
输入一个文件流 ==> 通过 gulp 处理文件流 ==> 输出文件流。
```
一个例子：
```js
const fs = require('fs')
const { Transform } = require('stream')

exports.build_process = () => {
  // 文件读取流
  const readStream = fs.createReadStream('./src/normalize.css')

  // 文件写入流
  const writeStream = fs.createWriteStream('./src/normalize.min.css')

  // 文件转换流
  const transformStream = new Transform({
    // 核心转换过程
    // chunk => 读取流中读取到的内容（Buffer）
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString()
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      callback(null, output)
    }
  })

  return readStream
    .pipe(transformStream) // 转换
    .pipe(writeStream) // 写入
}
```
上例中，我们通过 `nodejs` 的 `fs` 模块创建文件读取流，用于读取一个CSS文件，然后创建`文件转换流`用于将CSS文件中的空格、换行符、注释去掉，然后创建写入流写入一个转换后的文件到指定目录。

#### 使用 gulp 处理文件
1. 基本使用示例：
```js
const { src, dest } = require('gulp')
const cleanCSS = require('gulp-clean-css') // 压缩CSS代码
const rename = require('gulp-rename') // 重命名文件

exports.files_api = () => {
  return src('src/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}
```
  - a. gulp提供 `src` 和 `dest` 两个方法用于读取和写入一个文件流；
  - b. `src` 方法中有一个 `pipe` 方法，用于转换一个文件流；
  - c. `pipe` 方法中允许我们传入gulp插件（示例中的 `gulp-clean-css`、`gulp-rename`），用于对一类文件进行指定的转换。
2. 向文件流中添加文件：
```js
const { src, dest } = require('gulp');
const babel = require('gulp-babel'); // 将 ES6/ES6+ 代码转换为 ES5 代码
const uglify = require('gulp-uglify'); // 压缩并混淆 JS 代码

exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(uglify())
    .pipe(dest('output/'));
}
```
  - a. 读取 `src/` 目录下的所有 js 文件
  - b. 使用 `gulp-babel` 插件转换 `a` 中的 js 文件
  - c. 读取 `vender/` 目录下的所有 js 文件
  - d. 使用 `gulp-uglify` 插件压缩并混淆 `a` 和 `c` 中读取的文件
  - e. 将 `d` 中被处理的文件一并输出到 `output/` 目录下

3. 分阶段输出：
```js
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}
```
  - a. 读取 `src/` 目录下的所有 js 文件
  - b. 使用 `gulp-babel` 插件转换 `a` 中的 js 文件
  - c. 读取 `vender/` 目录下的所有 js 文件
  - d. 将 `a` 和 `c` 中被处理的文件一并输出到 `output/` 目录下
  - e. 使用 `gulp-uglify` 插件压缩并混淆 `d` 中的 js 文件
  - f. 使用 `gulp-rename` 插件修改 `e` 中文件的后缀为 `.min.js`
  - g. 将 `f` 中被处理的文件一并输出到 `output/` 目录下

#### 使用通配符选取文件
在 `src` 方法中我们可以通过传入 字符串 或者 数组 的方式匹配文件
```js
// 匹配 src/ 一级子目录下的所有 js 文件
src('src/*.js')

// 匹配 src/ 所有目录下的所有 js 文件
src('src/**/*.js')

// 匹配 src/ 一级子目录下的所有 js 文件
// 不匹配 node_modules/ 目录下的文件
src(['src/*.js', '!node_modules/'])
```

#### 文件监控
gulp 中提供的 `watch` 方法用于监控被匹配到的文件，如果有文件被修改了就执行关联的任务（task）。如果被执行的任务（task）没有触发 异步完成 信号，它将永远不会再次运行了。
1. 基本使用：
```js
const { watch, series } = require('gulp');

function clean(done) {
  // body omitted
  done();
}

function javascript(done) {
  // body omitted
  done();
}

function css(done) {
  // body omitted
  done();
}

// 可以只关联一个任务
watch('src/*.css', css);
// 或者关联一个任务组合
watch('src/*.js', series(clean, javascript));
```