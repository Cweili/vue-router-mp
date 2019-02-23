# 安装

### NPM

```
npm install vue-router-mp --save
```

### 直接下载

[下载源码](https://cdn.jsdelivr.net/npm/vue-router-mp/dist/vue-router-mp.js) 并复制到你的工程。

### 小程序中引入

在小程序中使用它，必须要通过 `Vue.use()` 明确地安装路由功能：

```js
import Vue from 'vue'
import VueRouter from 'vue-router-mp';

// 或

const Vue = require('vue');
const VueRouter = require('vue-router-mp');

Vue.use(VueRouter);
```
