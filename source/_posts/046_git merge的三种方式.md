---
id: 046
title: git merge的三种方式merge、squash merge、rebase merge
date: 2019-11-13 18:55:59
tags:
  - git
---

### 前提
  假设在master分支的B点拉出一个新的分支dev，经过一段时间的开发后：

  - master分支上有两个新的提交M1和M2
  - dev分支上有三个提交D1、D2和D3

  如下图所示：
  ![git](/images/46/1.webp)

  现在我们完成了dev分支的开发测试工作，需要把dev分支合并到master分支......
### merge
  这是最基本的merge方式，就是把提交历史原封不动的拷贝下来，包含完整的提交历史记录。
  ```sh
  $ git checkout master // 切换到master分支
  $ git merge dev // 把dev分支合并到当前分支(master)
  ```
  ![merge](/images/46/merge.webp)

  此时还会产生一个merge commit(D4')，这个merge commit不包含任何代码改动，而包含在dev分支上的几个commit列表(D1、D2和D3)。查看git的提交历史(git log)可以看到所有的这些提交历史记录。
### squash merge
  根据字面意思，这个操作完成的是压缩的提交，解决的问题是什么呢，由于在dev分支上执行的是开发工作，有一些很小的提交，或者是纠正前面的错误的提交，这类提交对整个工程来说不需要单独显示出一次提交，不然会导致项目的提交历史过于复杂。所以，我们可以把dev上的所有提交都合并成一个提交，然后提交到主干上。
  ```sh
  $ git checkout master
  $ git merge --squash dev
  ```
  ![squash-merge](/images/46/squash-merge.webp)

  在这个例子中，我们把D1、D2和D3的改动合并成了一个D。

  注意，squash merge并不会替你产生提交，它只是把所有的改动合并，然后放在本地文件，需要你再次手动执行git commit操作；此时又要注意了，由于你要手动commit，也就是说这个commit是你产生的，不是原来dev分支的开发人员产生的，提交者身份发生了改变。也可以这么理解，就是你把dev分支上的所有代码改动一次性移植到master分支上了。
### rebase merge
  由于squash merge会变更提交者身份，这是一个问题，后期在问题追溯上不好处理（当然也可以由dev分支上的开发者来执行squash merge 操作，已解决部分问题），rebase merge可以保留提交的作者信息，同时可以合并commit历史，完美的解决了上面的问题。
  ```sh
  $ git checkout dev
  $ git rebase -i master
  $ git checkout master
  $ git merge dev
  ```

  **`rebase merge`分两步完成：**

  - 第一步：

  执行rebase操作，结果是看起来dev分支是从M2拉出来的，而不是从B拉出来的，然后使用 -i 参数手动调整commit历史，是否合并、如何合并。如下例的 rebase -i 命令会弹出文本编辑框：
  ```
  pick <D1> Message for commit #1
  pick <D2> Message for commit #2
  pick <D3> Message for commit #3
  ```
  假设D2是对D1的一个拼写错误修正，因此可以不需要显式的指出来，我们把D2修改为fixup：
  ```
  pick <D1> Message for commit #1
  fixup <D2> Message for commit #2
  pick <D3> Message for commit #3
  ```
  rebase之后的状态变为：
  ![rebase-merge-1](/images/46/rebase-merge-1.webp)
  D1'是D1和D2的合并。

  - 第二步：

  继续执行merge操作，把dev分支合并到master分支：
  ![rebase-merge-2](/images/46/rebase-merge-2.webp)
  注意：在执行rebase的时候可能会出现冲突的问题，此时需要手动去解决冲突，然后执行`git add`命令；所有冲突解决完毕之后，这时不需要执行`git commit`命令，而是运行`git rebase --continue`命令，一直到rebase完成；如果中途想要放弃rebase操作，可以运行`git rebase --abort`命令回到rebase之前的状态。