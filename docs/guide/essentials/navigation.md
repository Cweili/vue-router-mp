---
sidebarDepth: 0
---

# 编程式的导航

## `router.push(location, onComplete?, onAbort?)`

**注意：在 Vue 实例内部，你可以通过 `$router` 访问路由实例。因此你可以调用 `this.$router.push`。**

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击后退按钮时，则回到之前的 URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

``` js
// 字符串
router.push('/pages/home')

// 对象
router.push({ path: '/pages/home' })

// 命名的路由
router.push({ name: 'user', query: { userId: 123 }})

// 带查询参数，变成 /pages/register?plan=private
router.push({ path: '/pages/register', query: { plan: 'private' }})

// 使用 reLaunch 跳转
router.push({ name: 'user', reLaunch: true})
```

```js
const userId = 123
router.push({ name: 'user', query: { userId }}) // -> /pages/user?userId=123
router.push({ path: `/pages/user/${userId}` }) // -> /pages/user/123
```

可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

## `router.replace(location, onComplete?, onAbort?)`

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

## `router.go(n)`

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

例子

``` js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

## 操作 History

你也许注意到 `router.push`、 `router.replace` 和 `router.go` 跟 [`window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)好像， 实际上它们确实是效仿 `window.history` API 的。

因此，如果你已经熟悉 [Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API)，那么在 Vue Router 中操作 history 就是超级简单的。

还有值得提及的，Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。

> 对应 [vue-router 文档](https://router.vuejs.org/zh/guide/essentials/navigation.html)。
