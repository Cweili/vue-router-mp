# 起步

::: tip 注意
教程中的案例代码将使用 [ES2015](https://github.com/lukehoban/es6features) 来编写。

对比 [vue-router](https://router.vuejs.org/zh/)，文档中未提及的特性，为暂不支持或无需支持的特性。
:::

由于在小程序中，页面路径是由工程源码的目录结构决定，因此相比 vue-router，不需要再指定路径的组件。

``` js
// 1. 定义路由
// 此处由于小程序页面路径与源码一一对应，故无需配置组件
const routes = [
  { path: '/pages/foo' },
  {
    path: '/pages/bar',
    isTab: true // 标志当前路由是一个 Tab
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
        : this.$router.push('/')
    }
  }
}
```

该文档通篇都常使用 `router` 实例。留意一下 `this.$router` 和 `router` 使用起来完全一样。我们使用 `this.$router` 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由。
