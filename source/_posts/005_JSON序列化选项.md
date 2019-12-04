---
id: 005
title: JSON 序列化选项
date: 2016-09-16 11:46:18
tags:
    - JavaScript
categories:
---

实际上，JSON.stringify()除了要序列化JavaScript对象外，还可以接受另外两个参数，这两个参数用于指定以不同的方式序列化JavaScript对象。**第一个**参数是个过滤器，可以使一个数组，也可以是个函数；**第二个**参数是一个选项，表示是否在JSON字符串中保留缩进。单独或组合使用者两个参数，可以更全面深入地控制JSON的序列化。
#### 1. 过滤器（第一个参数）
1.数组
```JavaScript
var hero = {
    "name": "MasterYi",
    "skills": [
        "AlphaStrike"
    ],
    "type": "Warrior"
}

var jsonTxt = JSON.stringify(hero, ["name", "type"]);
jsonTxt --> "{"name":"MasterYi","type":"Warrior"}"
```
2.函数
```JavaScript
var jsonTxt = JSON.stringify(hero, function(k, v){
    switch(k){
        case "name":
            return "Annie";
        case "type":
            return "Mage";
        default:
            return v;
    }
});
jsonTxt --> "{"name":"Annie","skills":["AlphaStrike"],"type":"Mage"}"
```
*值得注意的是，如果函数返回了undefined，那么相应的属性会被忽略。另外请务必写上default，此时返回传入的值，以便其他值都能正常出现在结果中*
#### 2. 选项（字符串缩进）
```JavaScript
var jsonTxt1 = JSON.stringify(hero, null, 2);
jsonTxt1 -->
"{
  "name": "MasterYi",
  "skills": [
    "AlphaStrike"
  ],
  "type": "Warrior"
}"

var jsonTxt2 = JSON.stringify(hero, null, 4);
jsonTxt2 -->
"{
    "name": "MasterYi",
    "skills": [
        "AlphaStrike"
    ],
    "type": "Warrior"
}"
```
*如上，结果字符串中也插入了换行符，这样一来就提高了可读性。只要传入有效的控制缩进的参数值，结果字符串就会包含换行符。最大缩进空格数为10，大于10会默认转换为10.*
