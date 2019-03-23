export default [
	{path: '/home',name: 'Home',component(resolve) {require(['../views/home/Home.vue'], resolve)}, children: [
    {path: '/',name: 'ConfigIndex',component(resolve) {require(['../views/home/Index.vue'], resolve)}},
    {path: 'config-manager',name: 'ConfigManager',component(resolve) {require(['../views/home/ConfigManager.vue'], resolve)}},
    {path: 'config-detail',name: 'ConfigDetail',component(resolve) {require(['../views/home/Detail.vue'], resolve)}},

  ]},
  {path: '/platforme',name: 'Platforme',component(resolve) {require(['../views/platforme/Platforme.vue'], resolve)}, children: [
      {path: 'config-manager',name: 'ConfigManager',component(resolve) {require(['../views/platforme/ConfigManager.vue'], resolve)}},
    ]},
]
