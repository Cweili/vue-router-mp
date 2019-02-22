/* globals wx */

import {
  transitionTo,
} from './base';

export function push(router, location, onComplete, onAbort) {
  return transitionTo(router, location, (route) => {
    if (route) {
      const params = {
        url: decodeURIComponent(route.fullPath),
        fail: onAbort,
        success: onComplete,
      };

      if (route.isTab) {
        wx.switchTab(params);
      } else if (route.reLaunch) {
        wx.reLaunch(params);
      } else if (route.replace) {
        wx.redirectTo(params);
      } else {
        wx.navigateTo(params);
      }
    }
  }, onAbort);
}

export function go(delta) {
  wx.navigateBack({ delta });
}
