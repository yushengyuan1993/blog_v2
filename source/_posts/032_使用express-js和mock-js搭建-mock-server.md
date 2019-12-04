---
id: 032
title: 使用Express.js和Mock.js搭建<mock-server>
date: 2018-03-10 13:21:12
tags:   
  - Express
  - Mock
categories:
---

#### <a>1、安装</a>

- `express.js` 是基于 `Node.js` 环境的服务端框架，所以使用前请确保本地安装有Node.js；

> 安装：

1. 安装 `Express` 应用生成器(快速创建一个应用的骨架)：
  ```sh
  # 安装 `express` 应用生成器
  $ npm install express-generator -g

  # 查看可用命令
  $ express -h
  ```

2. 下面的示例就是在当前工作目录下创建一个命名为 `mock-server` 的应用:
  ```sh
  $ express mock-server

  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options


    create : mock-server
    create : mock-server/package.json
    create : mock-server/app.js
    create : mock-server/routes
    create : mock-server/routes/index.js
    create : mock-server/routes/users.js
    create : mock-server/views
    create : mock-server/views/index.jade
    create : mock-server/views/layout.jade
    create : mock-server/views/error.jade
    create : mock-server/public
    create : mock-server/bin
    create : mock-server/bin/www
    create : mock-server/public/javascripts
    create : mock-server/public/images
    create : mock-server/public/stylesheets
    create : mock-server/public/stylesheets/style.css

    install dependencies:
      $ cd mock-server && npm install

    run the app:
      $ DEBUG=mock-server:* npm start

  ```

3. 完善 `express` 应用：
  ```sh
  # 进入 `mock-server` 目录并安装应用依赖
  $ cd mock-server && npm install

  # 启动该应用
  $ DEBUG=mock-server:* npm start
  ```

#### <a>2、使用</a>

1. 到目前为止我们还只是安装了 `express.js`，还没有安装 `mock.js`，所以先安装mockjs：
  ```sh
  # 安装 mock.js
  $ npm install mockjs --save-dev
  ```

2. 使用 `mock.js`，创建路由接口，在 `routes/` 目录下创建一个 `mock.js` 文件：
  ```js
  var express = require('express');
  var router = express.Router();

  // 引入 mock.js
  var Mock = require('mockjs');

  /* GET mock-api listing. */
  router.get('/', function(req, res, next) {
    var obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};
    // Mock响应模板
    var data = Mock.mock({
      "user|1-3": [{                            // 随机生成1到3个数组元素
        'name': '@cname',                       // 中文名称
        'id|+1': 88,                            // 属性值自动加 1，初始值为88
        'age|18-28': 0,                         // 18至28以内随机整数, 0只是用来确定类型
        'birthday': '@date("yyyy-MM-dd")',      // 日期
        'city': '@city(true)',                  // 中国城市
        'color': '@color',                      // 16进制颜色
        'isMale|1': true,                       // 布尔值
        'isFat|1-2': true,                      // true的概率是1/3
        'fromObj|2': obj,                       // 从obj对象中随机获取2个属性
        'fromObj2|1-3': obj,                    // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'],           // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'],   // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim']            // 重复2次属性值生成一个新数组
      },{
        'gf': '@cname'
      }]
    });

    res.send(data);
  });

  module.exports = router;
  ```

3. 挂载路由接口，在根目录的 `app.js` 文件中添加：
  ```js
  ...

  // mock.js
  var mockApi = require('./routes/mock');

  ...

  // mockjs
  app.use('/api', mockApi);
  ...
  ```

4. 小功告成，这时再启动服务：
  ```sh
  $ DEBUG=mock-server:* npm start

  > mock-server@0.0.0 start D:\START\files\mock-server
  > node ./bin/www

  Tue, 03 Apr 2018 03:25:17 GMT mock-server:server Listening on port 3000

  # 访问 localhost:3000/api 就会得到相应的接口数据

  ```

5. 更多 `mock.js` 配置请 [查看更多](https://github.com/nuysoft/Mock/wiki)