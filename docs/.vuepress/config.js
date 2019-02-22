module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Vue Router',
      description: 'Vue.js 官方的路由管理器。'
    },
  },
  serviceWorker: true,
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'Cweili/vue-router-mp',
    docsDir: 'docs',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {
            text: '指南',
            link: '/guide/'
          },
          {
            text: 'API 参考',
            link: '/api/'
          },
        ],
        sidebar: [
          '/installation.md',
          '/',
          {
            title: '基础',
            collapsable: false,
            children: [
              '/guide/',
              '/guide/essentials/dynamic-matching.md',
              '/guide/essentials/nested-routes.md',
              '/guide/essentials/navigation.md',
              '/guide/essentials/named-routes.md',
              '/guide/essentials/named-views.md',
              '/guide/essentials/redirect-and-alias.md',
              '/guide/essentials/passing-props.md',
              '/guide/essentials/history-mode.md'
            ]
          },
          {
            title: '进阶',
            collapsable: false,
            children: [
              '/guide/advanced/navigation-guards.md',
              '/guide/advanced/meta.md',
              '/guide/advanced/transitions.md',
              '/guide/advanced/data-fetching.md',
              '/guide/advanced/scroll-behavior.md',
              '/guide/advanced/lazy-loading.md'
            ]
          }
        ]
      },
    }
  }
}
