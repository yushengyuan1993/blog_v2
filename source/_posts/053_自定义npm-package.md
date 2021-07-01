---
title: 自定义npm-package
date: 2021-02-11 10:38:02
tags:
---

在日常的前端开发过程中，我们少不了会使用`npm`包。光会用是不行的，那如何发布一个自己的`npm`包呢？

#### 创建并发布一个npm package
1. 首先在本地创建一个初始化的包：
```sh
  # 创建一个初始的文件夹
  mkdir initial-package && cd initial-package

  # 使用默认配置初始化一个package.json文件
  npm init --yes
```

2. 执行完毕会生成一个默认的`package.json`文件：
```sh
  # "main" 指定这个包的入口文件
  {
    # 为了避免包名重复，请输入一个应该不会重名的包名 "name": "initial-package-yushare"
    "name": "initial-package-yushare",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "https://www.yvshare.cn",
    "license": "ISC",

    # 为了使用 ESModule，我们加上一个类型 "type": "module"
    "type": "module"
  }
```

3. 在当前目录创建一个入口文件`index.js`：
```js
  // 在这里返回一个可以获取 package.json 中属性的函数
  import fs from 'fs';

  export const getPackageInfo = (path = './package.json', key) => {
    const raw = fs.readFileSync(path);
    const data = JSON.parse(raw);

    return data[key];
  }
```
现在当他人`import`我们的这个package时，就可以使用这个函数啦。

4. 注册[npmjs](https://www.npmjs.com/)账号并发布：
  ```sh
  # 使用npmjs账号登录(可能要求设置token，自行设置)
  npm login

  # 依次输入账号、密码、email

  # 检查是否登录成功，会输出你的用户名
  npm whoami

  # 开始发布
  npm publish
  ```
  发布成功后，CLI上会输出信息：
  ```sh
    ➜  initial-package npm publish
    npm notice 
    npm notice 📦  initial-package-yushare@1.0.0
    npm notice === Tarball Contents === 
    npm notice 193B index.js    
    npm notice 279B package.json
    npm notice === Tarball Details === 
    npm notice name:          initial-package-yushare                 
    npm notice version:       1.0.0                                   
    npm notice package size:  437 B                                   
    npm notice unpacked size: 472 B                                   
    npm notice shasum:        832fbccc40052c9df9358ed88a50064abd0bb9
    npm notice integrity:     sha512-Qa49RdcW18nW[...]eOi6ScM2VPcA==
    npm notice total files:   2                                       
    npm notice 
    + initial-package-yushare@1.0.0
  ```
  现在为止，我们的包就成功发布了，可以去看看[initial-package-yushare](https://www.npmjs.com/package/initial-package-yushare)。

5. 安装刚才发布的包试试吧：
```sh
  mkdir my-test-project && cd my-test-project

  npm init --yes
  # 记得在package.json中添加"type": "module"

  npm i initial-package-yushare -S
```
安装完毕后，创建一个 `app.js` 文件引入试试：
```js
  // app.js
  import { getPackage } from 'initial-package-yushare';

  console.log(getPackage('./package.json', 'name'));
```
执行这个文件
```sh
  node app.js

  # 成功输出
  # my-test-project
```

6. 更新一个包：
当我们对包内容进行了修改，比如发布新功能或者修改一些bug，我们需要更新它
```sh
  # 1. 修改了包内容之后，可以执行，这样版本号会自动更新
  npm version patch

  # 2. 再次发布
  npm publish
```

7. 其它操作
```sh
  # 1. 删除指定版本的包
  # npm unpublish 包名@版本号
  npm unpublish initial-package-yushare@1.0.5

  # 2.删除整个包(慎用)
  # npm unpublish 包名 --force
  npm unpublish initial-package-yushare --force
```
到此为止，我们就成功的发布了自己的`npm package`啦，✿✿ヽ(°▽°)ノ✿

#### 如何把包发布在gitlab OR github
有些时候，公司内部项目希望把内部的包发布在`gitlab`上，同理也可以发布在`github`上，我们继续看。
参考[创建并发布一个npm package](#创建并发布一个npm-package)，一直操作到第`3`步完成。后面就很简单了，我们生成`git repo`之后，然后提交到远端，比如说这个包[my-npm-package-git-test](https://github.com/yushengyuan1993/my-npm-package-git-test)。
操作如下：
1. 手动写入依赖包信息：
  在`dependencies`或者`devDependencies`中写入
  ```json
    // package.json
    "dependencies": {
      "my-npm-package-git-test": "git@github.com:yushengyuan1993/my-npm-package-git-test.git"
    }
  ```
2. 安装包：
  ```sh
    npm install
  ```

#### 如何安装一个本地的包
除了可以将包发布到`npm`、`gitlab/github`，还可以直接创建并安装一个本地包，操作步骤如[如何把包发布在gitlab/github](#如何把包发布在gitlab-or-github)，只不过不用发布了，直接在本地使用：
1. 手动写入依赖包信息：
  在`dependencies`或者`devDependencies`中写入
  ```json
    // package.json
    "dependencies": {
      "my-npm-package-local": "file:./my-npm-package-local",
    }
  ```
2. 安装包：
  ```sh
    npm install
  ```

> 好啦，几种常见的`npm package`包的发布与使用方法就是这样啦，赶紧用起来吧！