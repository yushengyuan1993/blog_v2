---
id: 044
title: script标签中的async和defer
date: 2020-01-21 19:49:31
tags:
  - JavaScript
---

#### 先看看区别，当页面解析到以下标签时：
  - `<script>`，HTML解析会中断，脚本会被立即下载并开始执行，执行结束后，HTML解析继续。
  - `<script async>`，脚本的下载、执行过程域HTML解析过程并行，脚本执行完毕可能是在HTML解析完毕之前。当该脚本与页面其它脚本独立时，可以使用`acync`，比如用作页面统计分析时。
  - `<script async>`，脚本仅在下载的过程与HTML解析过程并行，脚本的执行将在HTML解析完毕之后进行。如有多个含有defer的脚本，则脚本的执行顺序将按照document中出现的位置，从上到下依次顺序执行。

  注意，在没有src属性的情况下，async和defer属性会被忽略。
