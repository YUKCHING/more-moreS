import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  base: process.env.NODE_ENV === 'production' ? process.env.REDIRECT : '',
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/homepage'
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: resolve => require(['@/view/home/index'], resolve),
      meta: {
        title: '泰诺汽车平台'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/view/home/test'], resolve),
      meta: {
        title: '测试'
      }
    },
    {
      path: '/moreconfig',
      name: 'moreconfig',
      component: resolve => require(['@/view/home/Config'], resolve),
      meta: {
        title: '更多功能'
      }
    },
    {
      path: '/myuser',
      name: 'myuser',
      component: resolve => require(['@/view/home/component/MyUser'], resolve),
      meta: {
        title: '我的用户'
      }
    },
    {
      path: '/mutiplefans',
      name: 'mutiplefans',
      component: resolve => require(['@/view/home/component/MutipleFans'], resolve),
      meta: {
        title: '我的用户'
      }
    },
    {
      path: '/invitefans',
      name: 'invitefans',
      component: resolve => require(['@/view/home/component/InviteFans'], resolve),
      meta: {
        title: '邀请粉丝'
      }
    },
    {
      path: '/myassets',
      name: 'myassets',
      component: resolve => require(['@/view/home/component/MyAssets'], resolve),
      meta: {
        title: '我的资产'
      }
    },
    {
      path: '/carwithdrawal',
      name: 'carwithdrawal',
      component: resolve => require(['@/view/home/component/CashWithdrawal'], resolve),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/abouttainuo',
      name: 'abouttainuo',
      component: resolve => require(['@/view/home/component/AboutTainuo'], resolve),
      meta: {
        title: '关于泰诺'
      }
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: resolve => require(['@/view/home/component/MyOrder'], resolve),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: resolve => require(['@/view/home/component/OrderDetail'], resolve),
      meta: {
        title: '订单详情'
      }
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
      path: '/idauth',
      name: 'idauth',
      component: resolve => require(['@/view/loans/IdAuth'], resolve),
      meta: {
        title: '身份认证'
      }
    },
    {
      path: '/etcmember',
      name: 'etcmember',
      component: resolve => require(['@/view/etc/EtcMember'], resolve),
      meta: {
        title: 'ETC-88会员'
      }
    },
    {
      path: '/policydetail',
      name: 'policydetail',
      component: resolve => require(['@/view/etc/PolicyDetail'], resolve),
      meta: {
        title: '国家新政'
      }
    },
    {
      path: '/training',
      name: 'training',
      component: resolve => require(['@/view/training/AppointmentTraining'], resolve),
      meta: {
        title: '预约培训'
      }
    },
    {
      path: '/valuation',
      name: 'valuation',
      component: resolve => require(['@/view/valuation/valuation'], resolve),
      meta: {
        title: '快速估值'
      }
    },
    {
      path: '/valrecord',
      name: 'valrecord',
      component: resolve => require(['@/view/valuation/valuationRecord'], resolve),
      meta: {
        title: '估值记录'
      }
    },
    {
      path: '/valresult',
      name: 'valresult',
      component: resolve => require(['@/view/valuation/valuationResult'], resolve),
      meta: {
        title: '估值结果'
      }
    },
    {
      path: '/valdetail',
      name: 'valdetail',
      component: resolve => require(['@/view/valuation/valuationDetail'], resolve),
      meta: {
        title: '估值详细'
      }
    },
    {
      path: '/valshare',
      name: 'valshare',
      component: resolve => require(['@/view/valuation/components/ShareImage'], resolve),
      meta: {
        title: '估值分享'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.query.token) {
    store.dispatch('setToken', {
      token: to.query.token
    }).then(() => {
      next()
    })
  } else {
    next()
  }
})

export default router
