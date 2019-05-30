---
title: I Don't Know Conditional-Statement
date: 2019-01-15 13:34:46
tags:
---

1. 适合使用 `if-else` 语句的情况：
   - 具有复杂的逻辑关系。
   - 表达式的值具有线性特征，如对连续的区间值进行判断。
   - 表达式的值是动态的。
   - 测试任意类型的数据。

2. 适合使用 `switch-case` 语句的情况：
   - 枚举表达式的值。这种枚举是可以期望的、平行逻辑关系的。
   - 表达式的值具有离散性，不具有线性的非连续的区间值。
   - 表达式的值是固定的，不是动态变化的。
   - 表达式的值是有限的，而不是无限的，一般情况下表达式应该比较少。
   - 表达式的值一般为整数、字符串等类型的数据。
3. 查找表：
   - 当数据量很大的时候，查找表的效率通常要比if-else语句和swtich-case语句高，查找表能用数字和字符串作为索引，而如果是字符串的情况下，最好用对象来代替数组。当然查找表的使用是有局限性的，每个case对应的结果只能是一个取值而不能是一系列的操作。
      ```js
      var results = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10];

      //return the correct result
      return results[value];
      ```
- 在选择分支较多时，选用switch...case结构会提高程序的效率，但switch不足的地方在于只能处理字符或者数字类型的变量，if...else结构更加灵活一些，if...else结构可以用于判断表达式是否成立，比如if(a+b>c),if...else的应用范围更广，switch...case结构在某些情况下可以替代if...else结构。
4. 小结：
- 当只有两个case或者case的value取值是一段连续的数字的时候，我们可以选择if-else语句;
- 当有3~10个case数并且case的value取值非线性的时候，我们可以选择switch-case语句;
- 当case数达到10个以上并且每次的结果只是一个取值而不是额外的JavaScript语句的时候，我们可以选择查找表.