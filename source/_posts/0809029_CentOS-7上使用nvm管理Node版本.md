---
id: 0809029
title: CentOS 7上使用nvm管理Node版本
date: 2018-01-10 11:15:22
tags:
  - Node.js
  - nvm
categories:
---

> NVM（Node version manager）顾名思义，就是Node.js的版本管理软件，可以轻松的在Node.js各个版本间切换，项目源码GitHub

1. 下载并安装NVM脚本
```sh
# 下载安装
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash

# 重新 source 一下环境变量
$ source ~/.bash_profile
```

2. 查看版本号
```sh
# 查看远程所有的 `Node` 版本
$ nvm ls-remote

# 查看当前系统 node 版本
$ nvm ls

$ nvm ls
->       v8.9.4
         system
default -> v8.9.4
node -> stable (-> v8.9.4) (default)
stable -> 8.9 (-> v8.9.4) (default)
iojs -> N/A (default)
lts/* -> lts/carbon (-> N/A)
lts/argon -> v4.8.7 (-> N/A)
lts/boron -> v6.13.1 (-> N/A)
lts/carbon -> v8.10.0 (-> N/A)
```

3. 安装所需的版本
```sh
$ nvm install v8.9.4
```

4. 切换版本
```sh
$ nvm use v8.10.0
```

5. 设置默认版本
```sh
$ nvm alias default v8.9.4
```