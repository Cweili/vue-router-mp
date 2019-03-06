---
sidebar: auto
---

# API 参考

## Router 构建选项

### routes

- 类型: `Array<RouteConfig>`

  `RouteConfig` 的类型定义：

  ``` js
  declare type RouteConfig = {
    path: string;
    name?: string; // 命名路由
    beforeEnter?: (to: Route, from: Route, next: Function) => void;
    meta?: any;
  }
  ```

### base

- 类型: `string`

- 默认值: `"/"`

  应用的基路径。例如，如果整个单页应用服务在 `/app/` 下，然后 `base` 就应该设为 `"/app/"`。

## Router 实例属性

### router.app

- 类型: `Vue instance`

  配置了 `router` 的 Vue 根实例。

### router.currentRoute

- 类型: `Route`

  当前路由对应的[路由信息对象](#路由对象)。

## Router 实例方法

### router.beforeEach
### router.afterEach

函数签名：

``` js
router.beforeEach((to, from, next) => {
  /* must call `next` */
})

router.afterEach((to, from) => {})
```

增加全局的导航守卫。参考[导航守卫](../guide/advanced/navigation-guards.md)。

这三个方法都返回一个移除已注册的守卫/钩子的函数。

### router.push
### router.replace
### router.go
### router.back
### router.forward

函数签名：

``` js
router.push(location, onComplete?, onAbort?)
router.replace(location, onComplete?, onAbort?)
router.go(n)
router.back()
router.forward()
```

动态的导航到一个新 URL。参考[编程式导航](../guide/essentials/navigation.md)。

### router.addRoutes

函数签名：

``` js
router.addRoutes(routes: Array<RouteConfig>)
```

动态添加更多的路由规则。参数必须是一个符合 `routes` 选项要求的数组。

### router.onError

函数签名：

``` js
router.onError(callback)
```

注册一个回调，该回调会在路由导航过程中出错时被调用。注意被调用的错误必须是下列情形中的一种：

- 错误在一个路由守卫函数中被同步抛出；

- 错误在一个路由守卫函数中通过调用 `next(err)` 的方式异步捕获并处理；

- 渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误。

## 路由对象

一个**路由对象 (route object)** 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的**路由记录 (route records)**。

路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

路由对象出现在多个地方:

- 在组件内，即 `this.$route`

- 在 `$route` 观察者回调内

- `router.match(location)` 的返回值

- 导航守卫的参数：

  ``` js
  router.beforeEach((to, from, next) => {
    // `to` 和 `from` 都是路由对象
  })
  ```

### 路由对象属性

- **$route.path**

  - 类型: `string`

    字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`。

- **$route.query**

  - 类型: `Object`

    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。

- **$route.fullPath**

  - 类型: `string`

    完成解析后的 URL，包含查询参数和 hash 的完整路径。

- **$route.name**

  当前路由的名称，如果有的话。(查看[命名路由](../guide/essentials/named-routes.md))

## 组件注入

### 注入的属性

通过在 Vue 根实例的 `router` 配置传入 router 实例，下面这些属性成员会被注入到每个子组件。

- **this.$router**

  router 实例。

- **this.$route**

  当前激活的[路由信息对象](#路由对象)。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它。
