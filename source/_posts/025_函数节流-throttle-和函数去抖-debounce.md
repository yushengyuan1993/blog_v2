---
id: 025
title: 函数节流(throttle)和函数去抖(debounce)
date: 2017-08-07 20:14:46
tags:
  - JavaScript
categories:
---

> 记得之前有一个需求，就是用户在输入框中输入关键字，然后根据关键字去拉取后台模糊搜索的数据。如果通过监听用户输入 `oninput` 发送请求的话，触发频率就太高了...于是上网搜了一下，最后是使用 `debounce` 解决了问题。本文主要是总结一下函数节流 `throttle` 和函数去抖 `debounce`。

#### <a>1、throttle和debounce是什么？</a>

- 某些场景下，比如响应鼠标移动或者窗口大小调整的事件，触发频率比较高。若稍处理函数微复杂，需要较多的运算执行时间，响应速度跟不上触发频率，往往会出现延迟，导致假死或者卡顿感。


- 在运算资源不够的时候，最直观的解决办法就是升级硬件，诚然通过购买更好的硬件可以解决部分问题，但是也需要为此付出高额的成本。特别是客户端和服务器模式，要求客户端统一升级硬件基本不可能。


- 在资源有限的前提下，处理函数无法即时响应高频调用。退而求其次，只响应部分请求是否可行呢？某些场景下的密集性请求，具备很强的同质和连续性。比如说，鼠标移动的轨迹参数。响应越及时效果越平滑，但是如果响应速度跟不上时，反而会出现卡顿感，如果适当的丢弃一些请求效果更流畅。


- `throttle` 和 `debounce` 是解决请求和响应速度不匹配问题的两个方案。二者的`差异在于选择不同的策略`。


- **如何理解具体的理解 `throttle` 和 `debounce` 呢：**(就拿我们在文本框输入文本，然后发送请求，输出后台返回数据)
  - `throttle：` 当用户第一次输入时，3秒后准时发送请求，不会等待你的第二次输入。如果不输入就不触发请求。
  - `debounce：` 每当用户输入时，都会等待3秒，如果中间持续输入，那么还会等待3秒，直到超过3秒没有输入，才会发送请求。

#### <a>2、使用throttle和debounce</a>

  **来看看 [underscore](http://underscorejs.org/) 是怎么实现的吧：**

- `throttle：`
```js
/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 * 
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数   
 */
_.throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) options = {};
  // 延迟执行函数
  var later = function() {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = _.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now;
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    //如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
```

- `debounce：`
```js
/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数(实际要执行的函数)
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
_.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    // 据上一次触发时间间隔
    var last = _.now() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
```

#### <a>3、使用场景</a>

  **只要牵涉到连续事件或频率控制相关的应用都可以考虑到这两个函数，比如：**
- 游戏射击，keydown 事件
- 文本输入、自动完成，keyup 事件
- 鼠标移动，mousemove 事件
- DOM 元素动态定位，window 对象的 resize 和 scroll 事件

前两者 debounce 和 throttle 都可以按需使用；后两者肯定是用 throttle 了。如果不做过滤处理，每秒种甚至会触发数十次相应的事件。尤其是 mousemove 事件，每移动一像素都可能触发一次事件。如果是在一个画布上做一个鼠标相关的应用，过滤事件处理是必须的，否则肯定会造成糟糕的体验。