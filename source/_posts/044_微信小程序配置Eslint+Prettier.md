---
id: 044
title: 微信小程序配置Eslint+Prettier
date: 2019-01-19 10:25:32
tags:
  - ESLint
---

#### 安装依赖
  依次安装以下依赖包。
  ```
  "babel-eslint"
  "eslint"
  "eslint-config-prettier"
  "eslint-plugin-import"
  "eslint-plugin-prettier"
  "husky"
  "lint-staged"
  "prettier"
  ```

#### 配置package.json文件
  设置在`commit`前执行`npm run lint`命令，检查代码。
  ```js
  // ......

  "scripts": {
    "precommit": "lint-staged",
    "lint": "eslint -c .eslintrc ./**/*.js"
  },
  "lint-staged": {
    "./**/*.js": [
      "prettier --tab-width 2 --write",
      "eslint --fix --fix-type suggestion .",
      "git add"
    ]
  },

  // ......
  ```
#### 配置.eslintrc文件
  我们选用[`Airbnb`](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js)的JavaScript配置`.eslintrc`文件。
  ```js
  {
    // ......

    // 扩展
    "extends": [
      "prettier",
      "prettier/standard"
    ],
  
    // 插件
    "plugins": [
      "prettier"
    ],

    // 配置解析器
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },

    // 脚本目标的运行环境
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "commonjs": true
    },

    // 全局变量
      "globals": {
        "__DEV__":true,
        "__WECHAT__":true,
        "__ALIPAY__":true,
        "App":true,
        "Page":true,
        "Component":true,
        "Behavior":true,
        "wx":true,
        "getApp":true
      },

      // 规则
      // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js

      // ......
    }
  ......
  ```
#### 配置.eslintignore
  根据自己项目需求配置需要忽略进行lint的文件
  ```js
  // etc.
  /node_modules
  ```