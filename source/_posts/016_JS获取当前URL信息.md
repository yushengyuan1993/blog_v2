---
id: 016
title: JS获取当前URL信息
date: 2017-10-23 10:56:54
tags:
    - JavaScript
categories:
---

1. 获取当前域名：
```js
// 方法一
var domain = document.domain;
// 方法二
var domain = window.location.host;

// 由于获取到的当前域名不包括 `http://`，所以把获取到的域名赋给 a 标签的 href 时，别忘了加上 `http://`，否则单击链接时导航会出错,
// 当然也可以使用 `var origin = window.location.origin` 获取协议名+域名
```
2. 获取当前 `Url` 的4种方法：
```js
var url = window.location.href;
var url = self.location.href;
var url = document.URL;
var url = document.location;

// 地址栏显示的是什么，获取到的 `url` 就是什么。
```
3. 获取当前相对路径：
```js
//首先获取 `Url`，然后把 `Url` 通过 `//` 截成两部分，再从后一部分中截取相对路径。如果截取到的相对路径中有参数，则把参数去掉。
function GetUrlRelativePath() {
var url = document.location.toString();
var arrUrl = url.split("//");

var start = arrUrl[1].indexOf("/");
var relUrl = arrUrl[1].substring(start);  //stop省略，截取从start开始到结尾的所有字符

if(relUrl.indexOf("?") != -1){
    relUrl = relUrl.split("?")[0];
}
return relUrl;
}

// 调用方法：GetUrlRelativePath();
// 假如当前 `Url` 是 `https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1`，
// 则截取到的相对路径为：`/s`。
```
4. 获取当前 `Url` 的参数
```js
// 获取 Url 参数部分
function GetUrlPara(){
var url = document.location.toString();
var arrUrl = url.split("?");

var para = arrUrl[1];
return para;
}

// 调用方法：GetUrlPara()

// 举例：假如当前 `Url` 是 `https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1`，
// 则截取到的参数部分为：`ie=utf-8&f=3&rsv_bp=1&rsv_idx=1`。
```
5. 获取指定 `Url` 参数的方法
```js
function GetUrlParam(paraName) {
var url = document.location.toString();
var arrObj = url.split("?");

if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
    arr = arrPara[i].split("=");

    if (arr != null && arr[0] == paraName) {
        return arr[1];
    }
    }
    return "";

} else {
    return "";
}
}

// 调用方法：GetUrlParam("id");
// 假如当网页的网址有这样的参数 `test.htm?id=896&s=q&p=5`，则调用 `GetUrlParam("p")`，返回 5。
```