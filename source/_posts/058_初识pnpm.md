---
title: 初始pnpm
date: 2021-07-11 20:21:19
tags:
  - 前端工程化
---

### 缘起node_modules
很久以前，前端圈子里就流传着这么一张关于`node_modules`的图
![node_modules](/images/58/node_modules.webp)

这就是当时的node_modules困境，当使用 npm 或 yarn 时，如果你有100个项目使用了某个依赖（dependency），就会有100份该依赖的副本保存在硬盘上。

虽然，从 `npm3` 开始，npm 维护了一个扁平依赖树 这导致磁盘空间减少， 但是 node_modules 目录依旧是混乱的。

这就催生出了后面的 [`pnpm`](https://pnpm.io/)

### 为什么会有pnpm
如上所述，当使用 npm 或 yarn 时，如果你有100个项目使用了某个依赖（dependency），就会有100份该依赖的副本保存在硬盘上。

而在使用 pnpm 时，依赖会被存储在内容可寻址的存储中，所以：
1. 如果你用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。 例如，如果某个包有100个文件，而它的新版本只改变了其中1个文件。那么 pnpm update 时只会向存储中心额外添加1个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。

2. 所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。 这允许你跨项目地共享同一版本的依赖。

因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

![node_modules](/images/58/node-modules-structure.jpeg)
<center>创建非扁平化的 node_modules 文件夹</center> -->

使用 npm 或 Yarn Classic 安装依赖项时，所有包都被提升到模块目录的根目录。 因此，项目可以访问到未被添加进当前项目的依赖。

默认情况下，pnpm 使用软链的方式将项目的直接依赖添加进模块文件夹的根目录。

pnpm的特点：
- 创建非扁平化的 node_modules 文件夹；
- 使用软链的方式将项目的直接依赖添加进模块文件夹的根目录。

### 安装pnpm
如果我们的设备安装了Node.js，那么可以直接使用npm进行安装
  ```sh
  npm install -g pnpm
  ```
[更多安装方式](https://pnpm.io/zh/installation)

### 使用pnpm
与 npm 不同的是，pnpm 会校验所有的参数。 比如，pnpm install --target_arch x64 会执行失败，因为 --target_arch x64 不是 pnpm install 的有效参数。

| npm命令 | pnpm等效 |
| - | - |
| npm install | pnpm install |
| npm i `<pkg>` | pnpm add `<pkg>` |
| npm run `<cmd>` | pnpm `<cmd>` |

当你使用一个未知命令时, pnpm 会查找一个具有指定名称的脚本, 所以 pnpm run lint 和 pnpm lint相同. 如果没有指定名称的脚本，那么pnpm将以shell脚本的形式执行该命令，所以你可以做类似pnpm eslint的事情

[更多命令](https://pnpm.io/zh/cli/add)

### pnpm VS. npm
#### npm的扁平树
从 npm v3 开始，npm 维护了一个扁平依赖树 这导致磁盘空间减少， 并且node_modules 目录是混乱的。

另一方面，pnpm 通过使用硬链接和符号链接链接到全局硬盘来管理node_modules。 这将使你的磁盘空间使用量大大减少，同时保持node_modules 的整洁。

pnpm 正确的 node_modules 结构的好处在于，它"有助于避免愚蠢的错误"，因为它让你无法使用不是 package.json 中指定的模块。

#### 安装
pnpm 不允许安装 package.json 中没有包含的包。如果没有参数传递给 pnpm add，包将保存为常规依赖项。 与 npm 一样， --save-dev 和 --save-optional 可以是用于安装包作为开发或可选的依赖。

由于此限制，项目在使用 pnpm 时不会有任何无关的包，除非它们删除依赖项并将其保留为孤立的。这就是为什么 pnpm 的实现的 prune command 不允许你指定包来修剪 - 它总是去除所有多余的和孤儿包。

#### 目录依赖
目录依赖以 file: 前缀开始，指向文件系统的目录。 与 npm 一样，pnpm 符号链接这些依赖项。 与 npm 不同的是，pnpm 不执行这些文件依赖项的安装。

这意味着如果您有一个名为 foo (`<root>/foo`) 的包，它有 bar@file:../bar 作为依赖项，则当你在 foo 上执行 pnpm install 时， pnpm 将不会为 `<root>/bar` 安装。

如果您需要同时在多个包中运行安装，例如在 monorepo 的情况下，您应该查看 pnpm -r 的文档。
