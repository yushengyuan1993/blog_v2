---
title: 在微信小程序开发中使用sass
date: 2021-03-27 10:21:53
tags:
---

在微信小程序中使用`sass`，需要自己做一些相关配置，这里有一个[demo](https://github.com/yushengyuan1993/wechat-miniprogram-scss)，这里介绍两种常见的配置方式，亲测可用。

#### 使用VSCode的插件进行配置(推荐)
1. 安装 `easy sass` 插件
2. 修改 `settings.json` 配置
```json
"easysass.formats": [
  {
    "format": "expanded",
    "extension": ".wxss"
  },
  {
    "format": "compressed",
    "extension": ".min.wxss"
  }
]
```
3. 上面 `expanded` 是编译生成的 `.wxss` 文件，`compressed` 是压缩之后的 `.wxss` 样式文件，这些配置都是可以自定义的
4. 配置完毕，我们直接在vscode中编码，就会发现插件会自动将 `.scss` 文件转为 `.wxss` 文件。

#### 使用gulp转换
1. 安装如下的package：
```sh
gulp
gulp-changed
gulp-rename
gulp-sass
gulp-watch
sass
```
2. 在项目根目录添加`gulpfile.js`配置文件
```js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const watcher = require('gulp-watch');

// 自动监听
gulp.task('default', gulp.series(function() {
  watcher('./pages/**/*.scss', function(){
    miniSass();
  });
}));

// 手动编译
gulp.task('init', function(){
  miniSass();
});

function miniSass(){
  return gulp.src('./pages/**/*.scss')//需要编译的文件
    .pipe(sass({
      outputStyle: 'expanded'//展开输出方式 expanded
     }))
     .pipe(rename((path)=> {
      path.extname = '.wxss'
    }))
    .pipe(changed('./pages')) //只编译改动的文件
    .pipe(gulp.dest('./pages')) //编译
    .pipe(rename((path)=> {
      console.log(`编译完成文件：'pages/${path.dirname}/${path.basename}.scss'`)
    }))
}
```
3. 修改npm scripts
```json
"scripts": {
  "scss": "gulp init default",
}
```
4. 运行gulp
```sh
npm run scss
```
这时，`gulp` 就会监听pages/目录下的修改过的 `.scss` 文件，并实时的转为 `.wxss` 文件。这里有一点就是当编写的scss文件有错误时，监听会停止，需要手动重启。