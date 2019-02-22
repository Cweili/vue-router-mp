# vue-router-mp

[![npm][badge-version]][npm]
[![bundle size][badge-size]][bundlephobia]
[![npm downloads][badge-downloads]][npm]
[![license][badge-license]][license]


[![github][badge-issues]][github]
[![travis][badge-build]][travis]
<!-- [![coverage][badge-coverage]][codecov] -->


mpvue 中使用的 vue-router 兼容路由，兼容大部分 vue-router API，含导航守卫、命名路由等。

## 安装

### NPM

```
npm install vue-router-mp --save
```

或者 [下载源码](https://cdn.jsdelivr.net/npm/vue-router-mp) 并复制到你的工程。

### 小程序中引入

```js
import VueRouter from 'vue-router-mp';

// or

const VueRouter = require('vue-router-mp');

Vue.use(VueRouter);
```

## 起步

```js
// 1. 定义路由
// 此处由于小程序页面路径与源码一一对应，故无需配置组件
const routes = [
  { path: '/pages/foo' },
  { path: '/pages/bar' }
]

// 2. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
```

通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由：

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

[badge-version]: https://img.shields.io/npm/v/vue-router-mp.svg
[badge-downloads]: https://img.shields.io/npm/dt/vue-router-mp.svg
[npm]: https://www.npmjs.com/package/vue-router-mp

[badge-size]: https://img.shields.io/bundlephobia/minzip/vue-router-mp.svg
[bundlephobia]: https://bundlephobia.com/result?p=vue-router-mp

[badge-license]: https://img.shields.io/npm/l/vue-router-mp.svg
[license]: https://github.com/Cweili/vue-router-mp/blob/master/LICENSE

[badge-issues]: https://img.shields.io/github/issues/Cweili/vue-router-mp.svg
[github]: https://github.com/Cweili/vue-router-mp

[badge-build]: https://travis-ci.org/Cweili/vue-router-mp.svg?branch=master
[travis]: https://travis-ci.org/Cweili/vue-router-mp

[badge-coverage]: https://img.shields.io/codecov/c/github/Cweili/vue-router-mp.svg
[codecov]: https://codecov.io/gh/Cweili/vue-router-mp
