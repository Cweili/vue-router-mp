# 导航守卫

正如其名，`vue-router-mp` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的。

## 全局守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

``` js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](../../api/#路由对象)

- **`from: Route`**: 当前导航正要离开的路由

- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。

  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。

  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router.push`](../../api/#router-push) 中的选项。

  - **`next(error)`**: 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止。

**确保要调用 `next` 方法，否则钩子就不会被 resolved。**

## 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

``` js
router.afterEach((to, from) => {
  // ...
})
```

## 路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

``` js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。

## 组件内的守卫

由于小程序并非单页应用，在路由跳转前无法完成页面组件的解析，因此“组件内的守卫”暂时无法实现

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在路由配置里调用 `beforeEnter`。
5. 导航被确认。
6. 调用全局的 `afterEach` 钩子。
7. 触发页面更新。

> 对应 [vue-router 文档](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)。
