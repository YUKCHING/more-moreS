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
      redirect: '/sample1',
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
          name: '颜色渐变3',
          component: resolve => require(['@/views/sample/sample4'], resolve)
        }
      ]
    }
  ]
})
