/* globals wx */

import eq from 'object-equal';
import throttle from 'async-throttle-cache';
import { transitionTo } from './history/base';

const t = throttle((...args) => Promise.resolve(transitionTo(...args)), 50);
let appHide;

wx.onAppHide(() => {
  appHide = true;
});

export default (router) => (Vue) => {
  Vue.mixin({
    onShow() {
      const app = router.app = this.$root;
      const { $mp } = app;
      if ($mp && $mp.mpType === 'page') {
        appHide = false;
        const { currentRoute } = router;
        const {
          query,
          page = {},
        } = $mp;
        let { route } = page;
        if (route) {
          if (route.indexOf(router.base) !== 0) {
            route = router.base + route;
          }
          if (currentRoute.path !== route || !eq(currentRoute.query, query)) {
            t(router, {
              path: route,
              query,
            });
          }
        }
      }
    },

    onUnload() {
      if (appHide) {
        appHide = false;
        router.currentRoute = {};
      }
    },
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get() { return router; },
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get() { return router.currentRoute; },
  });
};
