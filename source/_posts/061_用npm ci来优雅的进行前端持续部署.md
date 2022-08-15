---
title: 用npm ci来优雅的进行前端持续部署
date: 2022-07-23 16:17:55
updated: 2022-07-23 17:01:32
tags:
  - ci
  - npm
---

### 前言

npm依赖版本管理是前端开发过程中经常遇到的问题，统一依赖版本的重要性不言而喻。但是在实际场景里面，应该怎么做？

#### 不可或缺的 package-lock.json

我们知道 `package.json`(npm init) 文件只记录通过 `npm install` 方式安装的模块信息，而这些模块所依赖的其他子模块的信息不会记录。而`package-lock.json`(npm install) 文件锁定所有模块的版本号，包括主模块和所有依赖子模块。

还有一点需要注意，package-lock.json 文件是需要提交到repo中的，不应该被ignore掉。

#### package.json 和 package-lock.json

在 `npm@5.4.2` 版本之后：

1. 无package-lock.json：npm install 根据package.json进行安装，并生成package-lock.json；
2. package.json和package-lock.json的版本**不兼容**：npm install 会以 `package.json` **为准**进行安装，并更新package-lock.json。
3. package.json和package-lock.json的版本**兼容**：npm install 会以 `package-lock.json` **为准**进行安装；

综上所述，即使有 `package-lock.json` 文件，配合 npm install，我们也不能保证线上构建时的依赖版本与本地开发时的一致。

于是乎，`npm ci` 来了。

### npm ci

#### 什么是npm ci

`npm ci` 是类似于 `npm install` 的命令，适用于 `ci` 时安装依赖，与 `npm install` 主要的差异有：

1. 使用 npm ci 的项目必须存在package-lock.json或npm-shrinkwrap.json文件，否则无法执行（即以上1的情况）
2. 如果package-lock.json或npm-shrinkwrap.json中的依赖与package.json中不一致（即以上2的情况），npm ci 会报错并退出，而不是更新lock文件。

基于以上 2 种特性，使用 npm ci 能够有效防止线上构建的依赖与开发者本地不一致的情况。

#### npm ci 与 install 的区别

- npm ci 要求必需有 package-lock.json 或 npm-shrinkwrap.json 文件存在；
- 如果 lock 与 package.json 中版本不匹配，npm ci 直接报错中断，而不是更新 lock 文件；
- npm ci 不能用来安装单个依赖，只能用来安装整个项目的依赖；
- npm ci 会检测如果 node_modules 已经存在，则先删除再进行安装操作；
- npm ci 会安装 dependencies 和 devDependencies，和 npm install 一样，生产环境下，即通过 -—production 或通过 NODE_ENV 配置，则只会安装 dependencies；
- npm ci 不会更改 package.json 或是 package-locks 文件，整个安装过程是锁死的；
- 缓存 npm ci --cache .npm；
- npm ci 时建议加上 --quiet --no-progress 关闭进度和其他无用 log，否则产生的日志会很大。

> 所以 npm ci 时推荐完整的命令为： npm ci --cache .npm --quiet --no-progress


npm ci 命令会根据 lock 文件（比如 package-lock.json）去下载node_modules。它比npm install命令快2至10倍，因为npm ci安装包之前，会删除掉node_modules文件夹，因此他不需要去校验已下载文件版本与控制版本的关系，也不用校验是否存在最新版本的库，所以下载的速度更快。

使用场景：正因为其安装的稳定和无侵入性质，所以适合集成在发布流程的shell命令里，来替换 npm install