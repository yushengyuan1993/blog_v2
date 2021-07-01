常用的webpack-loader:
  - sass-loader 把sass文件转为css文件
  - css-loader 处理@import和url这样的外部资源
  - style-loader 在head中创建style标签把样式文件插入
  - file-loader 文件加载
  - url-loader 文件加载，可以设置阈值，小于阈值把文件转为base64格式(常用在小图标中2k)
  - postcss-loader 扩展css语法，使用postcss的插件，如autoprefixer，cssnext，cssnano
  - babel-loader ES6语法转为ES5语法
  - source-map-loader 加载source map文件，方便调试
  - vue-loader 加载vue单文件组件

常用的webpack-plugins:
  - clean-webpack-plugin 清理目录
  - html-webpack-plugin 可以根据模板自动生成html代码，并自动引入css和js文件
  - hot-module-replacement-plugin 模块热更新
  - mini-css-extract-plugin 分离样式文件，将css提取为独立文件，支持按需加载
  - terser-webpack-plugin 支持压缩ES6
  - webpack内置的UglifyJSPlugin 压缩和混淆代码