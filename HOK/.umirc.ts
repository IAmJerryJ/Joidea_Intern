import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   {
  //     path: '/',
  //     component: '@/layouts/index',
  //     routes: [{ path: '/', component: './index' }],
  //   },
  // ],
  dva: {},
  fastRefresh: {},
  // proxy: {
  //   '/api/': {
  //     target: 'https://pvp.qq.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/': '' },
  //   },
  // },
});
