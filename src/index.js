import install from './install';
import {
  push,
  go,
} from './history/wx';
import {
  parse,
  stringify,
} from './utils/path';
import {
  warn,
} from './utils/warn';

function createRoute(route, location = {}) {
  return route && {
    name: route.name,
    meta: route.meta || {},
    path: route.path || '',
    hash: '',
    query: location.query || {},
    params: {},
    get fullPath() {
      return stringify(route.path, location.query);
    },
    beforeEnter: route.beforeEnter,
    replace: location.replace,
    reLaunch: location.reLaunch,
    isTab: location.isTab || route.isTab,
  };
}

function registerHook(list, fn) {
  list.push(fn);
  return () => {
    const i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function locationObj(location) {
  return typeof location === 'string' ? {
    path: location,
  } : location;
}

const pathMap = {};
const nameMap = {};

const beforeHooks = [];
const afterHooks = [];

const errorCbs = [];

function router({
  routes,
  base = '/',
} = {}) {
  router.addRoutes(routes);
  router.base = base;
  return router;
}

router.currentRoute = createRoute({});

router.beforeHooks = beforeHooks;
router.afterHooks = afterHooks;
router.beforeEach = fn => registerHook(beforeHooks, fn);
router.afterEach = fn => registerHook(afterHooks, fn);

router.errorCbs = errorCbs;
router.onError = fn => registerHook(errorCbs, fn);

router.push = (location, onComplete, onAbort) => {
  location = locationObj(location);
  return push(router, location, onComplete, onAbort);
};
router.replace = (location, onComplete, onAbort) => {
  location = locationObj(location);
  location.replace = true;
  return push(router, location, onComplete, onAbort);
};

router.go = go;
router.back = () => go(-1);
router.forward = () => go(1);

router.addRoutes = (routes = []) => {
  routes.forEach((route) => {
    pathMap[route.path] = route;
    if (route.name) {
      nameMap[route.name] = route;
    }
  });
};

router.match = (location) => {
  location = locationObj(location);
  const {
    name,
    path,
    query,
  } = location;
  let p = path;
  let q = query;
  let matched;
  if (name) {
    matched = nameMap[name];
  } else if (path) {
    const parsed = parse(path);
    p = parsed.path;
    q = Object.assign({}, parsed.query, query);
    matched = pathMap[p];
  }
  warn(matched, 'Can\'t match any router');
  return createRoute(matched, Object.assign({}, location, {
    name,
    path: p,
    query: q,
  }));
};

router.install = install(router);

export default router;
