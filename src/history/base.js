import { runQueue } from '../utils/async';
import {
  warn,
  isError,
} from '../utils/warn';

const noop = () => {};

export function transitionTo(
  router,
  location,
  onComplete = noop,
  onAbort = noop,
) {
  const route = router.match(location);
  if (!route) {
    onAbort();
    return;
  }
  const { currentRoute } = router;
  if (currentRoute && route.fullPath === currentRoute.fullPath) {
    onAbort();
    return;
  }
  const abort = (err) => {
    if (isError(err)) {
      if (router.errorCbs.length) {
        router.errorCbs.forEach((cb) => { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort(err);
  };
  const queue = router.beforeHooks.concat(route.beforeEnter);
  let pending = route;
  const iterator = (hook, next) => {
    if (pending !== route) {
      abort();
      return;
    }
    try {
      hook(route, currentRoute, (to) => {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure currentURL
          abort(to);
        } else if (
          typeof to === 'string'
            || (typeof to === 'object' && (
              typeof to.path === 'string'
              || typeof to.name === 'string'
            ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          transitionTo(router, to, onComplete, onAbort);
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, () => {
    if (pending !== route) {
      abort();
      return;
    }
    pending = null;

    // update route
    const prev = currentRoute;
    router.currentRoute = route;
    router.afterHooks.forEach((hook) => {
      if (hook) hook(route, prev);
    });

    onComplete(route);
  });
}

export default 0;
