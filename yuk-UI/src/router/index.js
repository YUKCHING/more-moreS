import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/layout',
      name: 'layout',
      redirect: '/layout/sample9',
      component: resolve => require(['@/views/layout/layout'], resolve),
      children: [
        {
          path: 'sample1',
          name: '旋转条',
          component: resolve => require(['@/views/sample/sample1'], resolve)
        },
        {
          path: 'sample2',
          name: '颜色渐变',
          component: resolve => require(['@/views/sample/sample2'], resolve)
        },
        {
          path: 'sample3',
          name: '正方体',
          component: resolve => require(['@/views/sample/sample3'], resolve)
        },
        {
          path: 'sample4',
          name: 'Loading-球',
          component: resolve => require(['@/views/sample/sample4'], resolve)
        },
        {
          path: 'sample5',
          name: 'Loading-条',
          component: resolve => require(['@/views/sample/sample5'], resolve)
        },
        {
          path: 'sample6',
          name: 'Loading-卡片',
          component: resolve => require(['@/views/sample/sample6'], resolve)
        },
        {
          path: 'sample7',
          name: 'Loading-三棱柱',
          component: resolve => require(['@/views/sample/sample7'], resolve)
        },
        {
          path: 'sample8',
          name: '斜体',
          component: resolve => require(['@/views/sample/sample8'], resolve)
        },
        {
          path: 'sample9',
          name: '抽奖',
          component: resolve => require(['@/views/sample/sample9'], resolve)
        },
        {
          path: 'sample10',
          name: '分体转屏',
          component: resolve => require(['@/views/sample/sample10'], resolve)
        },
        {
          path: 'sample11',
          name: '滚屏进度条',
          component: resolve => require(['@/views/sample/sample11'], resolve)
        },
        {
          path: 'sample12',
          name: '字体阴影',
          component: resolve => require(['@/views/sample/sample12'], resolve)
        }
      ]
    }
  ]
})
