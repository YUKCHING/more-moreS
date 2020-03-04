import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  base: process.env.NODE_ENV === 'production' ? '/xiquanlive/' : '',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/sampling'
    },
    {
      path: '/sampling',
      name: 'sampling',
      component: resolve => require(['@/view/sampling/Sampling'], resolve),
      meta: {
        title: '喜圈健康'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
