export default [
  {path: '/',name: 'Index',component(resolve) {require(['../views/home/Home.vue'], resolve)}, children: [
    {path: '/tape',name: 'Tape',component(resolve) {require(['../views/tape/Tape.vue'], resolve)}, children: [
      {path: '/',name: 'ConfigIndex',component(resolve) {require(['../views/home/Index.vue'], resolve)}},
      {path: 'config-manager',name: 'ConfigManager',component(resolve) {require(['../views/tape/ConfigManager.vue'], resolve)}},
      {path: 'config-detail',name: 'ConfigDetail',component(resolve) {require(['../views/tape/Detail.vue'], resolve)}},
    ]},
    {path: '/platform',name: 'Platform',component(resolve) {require(['../views/platform/Platform.vue'], resolve)}, children: [
      {path: '/',name: 'ConfigIndex',component(resolve) {require(['../views/home/Index.vue'], resolve)}},
        {path: '/devs',name: 'Devs',component(resolve) {require(['../views/platform/Devs.vue'], resolve)}},
      {path: 'test-codes',name: 'TestCodes',component(resolve) {require(['../views/platform/TestCodes.vue'], resolve)}},
    ]},
  ]},
]
