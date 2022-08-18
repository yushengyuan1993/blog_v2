---
title: Pinia-下一代vue状态管理工具
date: 2022-08-15 19:23:45
updated: 2022-08-15 20:23:45
tags:
---

## 定义Store

### vuex

```js
/**
 * store/vuexStore.js
 */
import { createStore } from 'vuex'

// 创建一个新的 store 实例
export const vuexStore = createStore({
  // ...
})

/**
 * main.js
 */
import { vuexStore } from "./store/vuexStore"
app.use(vuexStore)
```

### pinia

```js
/**
 * store/counter.js
 */
import { defineStore } from 'pinia'

// id: 'counter'
export const useCounterStore = defineStore('counter', {
  // ...
})

/**
 * main.js
 */
import { createPinia } from 'pinia'
app.use(createPinia())
```

## State

### vuex

```js
/**
 * store/vuexStore.js
 */
export const vuexStore = createStore({
  state () {
    return {
      count: 0
    }
  }
})

/**
 * views/home.vue
 */
import { useStore } from 'vuex'
const store = useStore()

<p>{{ store.state.count }}</p>
```

### pinia

```js
/**
 * store/piniaStore.js
 */
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      msg: 'hello'
    }
  },
  actions: {
    async setCount(ctx) {
      const count = await getCount()
      this.count = count
    }
  }
})

/**
 * views/home.vue
 */
import { useCounterStore } from '../store/piniaStore.js';
const store = useCounterStore()

<p>{{ store.count }}</p>
```

`pinia` 支持响应式的 解构 `state`，同时也可以解构出 `actions`：
```js
import { storeToRefs } from 'pinia'
const store = useCounterStore()

// 解构 state， 并使其保持响应式
const { count, msg } = storeToRefs(store)

// 解构 actions
const { setCount } = store
```

## Getters

### vuex

```js
/**
 * store/vuexStore.js
 */
export const vuexStore = createStore({
  state() {
    return {
      count: 0
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})

/**
 * views/home.vue
 */
<p>{{ store.getters.doubleCount }}</p>
```

### pinia

```js
/**
 * store/piniaStore.js
 */
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    increment() {
      this.count++
    },
  },
})

/**
 * views/home.vue
 */
<p>{{ store.doubleCount }}</p>
```

## Actions

在 `vuex` 中，我们会使用分发 `action` 的方式来触发 `mutation` ，以达到修改状态的目的，并且会在 `action` 中完成异步操作（比如接口请求等），等到异步数据后通过调用 `mutation` 的方式进行后续操作。

而 `pinia` 移除了 `mutation` 操作，我们可以在 `action` 一次性完成对所有操作，API更加简洁，少了一步操作。

### vuex

```js
export const vuexStore = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    setCount(state, value) {
      state.count = value
    },
  },
  actions: {
    async setCount(ctx) {
      const count = await getCount()
      ctx.commit("setCount", count)
    }
  }
})
```

### pinia

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    async setCount(ctx) {
      const count = await getCount()
      this.count = count
    }
  }
})
```

另外，`pinia` 还支持直接（批量）修改 `state`：
```js
import { useCounterStore } from '../store/piniaStore.js'
const store = useCounterStore()

// 直接修改state
store.count = 2

// 还可以批量修改state
store.$patch({
  count: 2022,
  msg: "aha",
});
```

## Modules

### vuex

`vuex` 通过定义不同的 `module` ，然后组合起来使用，通过 `namespace` 来区分模块：

```js
// 定义
import { createStore } from 'vuex'

const moduleA = {
  namespace: 'moduleA',
  state() {
    return {
      count: 2022
    }
  },
  mutations: {
    setCount(state, value) {
      state.count = value
    }
  }
}

const moduleB = {
  namespace: 'moduleB',
  state() {
    return {
      msg: 'hello'
    }
  },
  mutations: {
    setMsg(state, value) {
      state.msg = value
    }
  }
}

export default createStore({
  strict: true,
  state() {
    return {
      name: 'yushare'
    }
  },
  modules: {
    moduleA,
    moduleB
  }
})

// 使用
import { useStore } from 'vuex'
const store = useStore()

console.log(store.state.moduleA.count) // 2022
store.commit('setCount', 10086)

console.log(store.state.moduleA.msg) // 'hello'
store.commit('setMsg', 'aha.')
```

### pinia

`pinia` 使用 `id` 来区分模块：
```js
// 定义
import { defineStore } from 'pinia'

export const useStoreA = defineStore({
  id: 'useStoreA',
  state: () => {/* ... */}
})

export const useStoreB = defineStore({
  id: 'useStoreB',
  state: () => {/* ... */}
})

// 使用
import { useStoreA } from '../store/useStoreA.js'
import { useStoreB } from '../store/useStoreB.js'
const storeA = useStoreA()
const storeB = useStoreB()
```

## typescript支持

### vuex 

`vuex` 默认并没有提供对 ts 的完整支持，声明文件需要自己编写，官方提供了相应的文档 [TypeScript 支持](https://vuex.vuejs.org/zh/guide/typescript-support.html)。

### pinia 

`pinia` 官方提供了很好的 ts 支持。

## 总结

1. `pinia` 中没有 `module` 的概念，保持了不同 store 之间的独立性；
2. `pinia` 中移除了 `mutation`，API更简洁；
3. `pinia` 拥有完整的 `typescript` 支持；
4. `pinia` 支持使用插件扩展；
5. 。。。。。。

[🌰](https://github.com/yushengyuan1993/pinia-vuex)
