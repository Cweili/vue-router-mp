# 路由元信息

定义路由的时候可以配置 `meta` 字段：

``` js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      // a meta field
      meta: { requiresAuth: true }
    }
  ]
})
```

那么如何访问这个 `meta` 字段呢？

下面例子展示在全局导航守卫中检查元字段：

``` js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

> 对应 [vue-router 文档](https://router.vuejs.org/zh/guide/advanced/meta.html)。
