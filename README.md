# vue-router-mp

[![npm][badge-version]][npm]
[![bundle size][badge-size]][bundlephobia]
[![npm downloads][badge-downloads]][npm]
[![license][badge-license]][license]


[![github][badge-issues]][github]
[![build][badge-build]][workflows]
<!-- [![coverage][badge-coverage]][coveralls] -->


vue-router-mp 是在 [mpvue](http://mpvue.com/) 中使用的兼容 [vue-router](https://router.vuejs.org/zh/) 的路由管理器，兼容常用大部分 vue-router 的 API。

支持的特性有：

- 编程式的导航
- 命名路由
- 导航守卫
- 路由元信息

请阅读 [完整文档][homepage]。

## 安装

### NPM

```
npm install vue-router-mp --save
```

### 直接下载

[下载源码](https://cdn.jsdelivr.net/npm/vue-router-mp/dist/vue-router-mp.js) 并复制到你的工程。

### 小程序中引入

```js
import Vue from 'vue'
import VueRouter from 'vue-router-mp'

// 或

const Vue = require('vue')
const VueRouter = require('vue-router-mp')

Vue.use(VueRouter)
```

## 起步

由于在小程序中，页面路径是由工程源码的目录结构决定，因此相比 vue-router，不需要再指定路径的组件。

```js
// 1. 定义路由
// 此处由于小程序页面路径与源码一一对应，故无需配置组件
const routes = [
  { path: '/pages/foo' },
  {
    name: 'bar', // 命名路由
    path: '/pages/bar',
    isTab: true // 标记当前路由是一个 Tab
  }
]

// 2. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 现在，应用已经启动了！
```

通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：

```js
export default {
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/pages/foo')
    }
  }
}
```

请阅读 [完整文档][homepage]。

[homepage]: https://cweili.gitee.io/vue-router-mp/

[badge-version]: https://img.shields.io/npm/v/vue-router-mp.svg
[badge-downloads]: https://img.shields.io/npm/dt/vue-router-mp.svg
[npm]: https://www.npmjs.com/package/vue-router-mp

[badge-size]: https://img.shields.io/bundlephobia/minzip/vue-router-mp.svg
[bundlephobia]: https://bundlephobia.com/result?p=vue-router-mp

[badge-license]: https://img.shields.io/npm/l/vue-router-mp.svg
[license]: https://github.com/Cweili/vue-router-mp/blob/master/LICENSE

[badge-issues]: https://img.shields.io/github/issues/Cweili/vue-router-mp.svg
[github]: https://github.com/Cweili/vue-router-mp

[badge-build]: https://img.shields.io/github/workflow/status/Cweili/vue-router-mp/ci/master
[workflows]: https://github.com/Cweili/vue-router-mp/actions/workflows/ci.yml?query=branch%3Amaster

[badge-coverage]: https://img.shields.io/coveralls/github/Cweili/vue-router-mp/master.svg
[coveralls]: https://coveralls.io/github/Cweili/vue-router-mp?branch=master
