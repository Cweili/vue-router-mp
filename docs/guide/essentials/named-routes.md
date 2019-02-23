# 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

``` js
const router = new VueRouter({
  routes: [
    {
      path: '/pages/user',
      name: 'user'
    }
  ]
})
```

``` js
router.push({ name: 'user', query: { userId: 123 }})
```

会把路由导航到 `/pages/user?userId=123` 路径。

> 对应 [vue-router 文档](https://router.vuejs.org/zh/guide/essentials/named-routes.html)。
