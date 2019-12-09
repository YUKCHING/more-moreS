import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  base: process.env.NODE_ENV === 'production' ? '/loansh5/' : '',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/etcmember'
    },
    {
      path: '/loanslist',
      name: '贷款',
      component: resolve => require(['@/view/loans/LoansList'], resolve),
      meta: {
        title: '车抵贷'
      }
    },
    {
      path: '/loansdetail',
      name: '详情',
      component: resolve => require(['@/view/loans/LoansDetail'], resolve),
      meta: {
        title: '车抵贷'
      }
    },
    {
      path: '/success',
      name: '成功',
      component: resolve => require(['@/view/loans/components/Success'], resolve),
      meta: {
        title: '车抵贷'
      }
    },
    {
      path: '/etcmember',
      name: 'etcmember',
      component: resolve => require(['@/view/etc/EtcMember'], resolve),
      meta: {
        title: 'ETC-88会员'
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
