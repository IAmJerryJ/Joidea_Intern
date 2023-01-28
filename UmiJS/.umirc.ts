import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/user',
      component: '@/pages/user',
      routes: [
        {
          path: '/user/center',
          component: '@/pages/user/center',
          title: 'User center 1',
        },
      ],
    },
  ],
});
