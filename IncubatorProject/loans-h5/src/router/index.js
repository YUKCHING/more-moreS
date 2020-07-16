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
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
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
      component: resolve => require(['@/view/user/MyUser'], resolve),
      meta: {
        title: '我的用户'
      }
    },
    {
      path: '/mutiplefans',
      name: 'mutiplefans',
      component: resolve => require(['@/view/user/MutipleFans'], resolve),
      meta: {
        title: '我的用户'
      }
    },
    {
      path: '/invitefans',
      name: 'invitefans',
      component: resolve => require(['@/view/fans/InviteFans'], resolve),
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
      path: '/violation',
      name: 'violation',
      component: resolve => require(['@/view/violation/violation'], resolve),
      meta: {
        title: '违章查询'
      }
    },
    {
      path: '/violationdetail',
      name: 'violationdetail',
      component: resolve => require(['@/view/violation/violationDetail'], resolve),
      meta: {
        title: '违章报告'
      }
    },
    {
      path: '/loanslist',
      name: 'loanslist',
      component: resolve => require(['@/view/loans/LoansList'], resolve),
      meta: {
        title: '泰诺产品'
      }
    },
    {
      path: '/loansdetail',
      name: 'loansdetail',
      component: resolve => require(['@/view/loans/LoansDetail'], resolve),
      meta: {
        title: '车抵贷'
      }
    },
    {
      path: '/success',
      name: 'success',
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
      path: '/myloans',
      name: 'myloans',
      component: resolve => require(['@/view/loans/MyLoans'], resolve),
      meta: {
        title: '我的贷款'
      }
    },
    {
      path: '/myloansdetail1',
      name: 'myloansdetail1',
      component: resolve => require(['@/view/loans/MyLoansDetail1'], resolve),
      meta: {
        title: '贷款'
      }
    },
    {
      path: '/myloansdetail2',
      name: 'myloansdetail2',
      component: resolve => require(['@/view/loans/MyLoansDetail2'], resolve),
      meta: {
        title: '贷款'
      }
    },
    {
      path: '/myloanssystemscreen',
      name: 'myloanssystemscreen',
      component: resolve => require(['@/view/loans/MyLoansSystemScreen'], resolve),
      meta: {
        title: '贷款'
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
    },
    {
      path: '/ordersignup',
      name: 'ordersignup',
      component: resolve => require(['@/view/order/signUp'], resolve),
      meta: {
        title: '泰诺金融'
      }
    },
    {
      path: '/orderinit',
      name: 'orderinit',
      component: resolve => require(['@/view/order/OrderInit'], resolve),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/ordersubmit',
      name: 'ordersubmit',
      component: resolve => require(['@/view/order/OrderSubmit'], resolve),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/ordersubmit2',
      name: 'ordersubmit2',
      component: resolve => require(['@/view/order/OrderSubmit2'], resolve),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/ordersubmit3',
      name: 'ordersubmit3',
      component: resolve => require(['@/view/order/OrderSubmit3'], resolve),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/approvalreply',
      name: 'approvalreply',
      component: resolve => require(['@/view/order/ApprovalReply'], resolve),
      meta: {
        title: '订单审批'
      }
    },
    {
      path: '/approvalsigning',
      name: 'approvalsigning',
      component: resolve => require(['@/view/order/ApprovalSigning'], resolve),
      meta: {
        title: '订单签约'
      }
    },
    {
      path: '/approvalloan',
      name: 'approvalloan',
      component: resolve => require(['@/view/order/ApprovalLoan'], resolve),
      meta: {
        title: '订单放款'
      }
    },
    {
      path: '/recordprocess',
      name: 'recordprocess',
      component: resolve => require(['@/view/order/OrderRecordDetail'], resolve),
      meta: {
        title: '进度记录'
      }
    },
    {
      path: '/systemscreen',
      name: 'systemscreen',
      component: resolve => require(['@/view/order/SystemScreen'], resolve),
      meta: {
        title: '系统初筛'
      }
    },
    {
      path: '/systemscreen2',
      name: 'systemscreen2',
      component: resolve => require(['@/view/order/SystemScreen2'], resolve),
      meta: {
        title: '系统初筛'
      }
    },
    {
      path: '/systemscreenedit',
      name: 'systemscreenedit',
      component: resolve => require(['@/view/order/SystemScreenEdit'], resolve),
      meta: {
        title: '系统初筛'
      }
    },
    {
      path: '/ordersettlement',
      name: 'ordersettlement',
      component: resolve => require(['@/view/order/OrderSettlement'], resolve),
      meta: {
        title: '订单申请结算'
      }
    },
    {
      path: '/ordersettlementback',
      name: 'ordersettlementback',
      component: resolve => require(['@/view/order/OrderSettlementBack'], resolve),
      meta: {
        title: '结算退回'
      }
    },
    {
      path: '/ordersettlementpass',
      name: 'ordersettlementpass',
      component: resolve => require(['@/view/order/OrderSettlementPass'], resolve),
      meta: {
        title: '结算通过'
      }
    },
    {
      path: '/sucpage',
      name: 'sucpage',
      component: resolve => require(['@/view/order/SuccssPage'], resolve),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/childorder',
      name: 'childorder',
      component: resolve => require(['@/view/order/OrderChildSubmit'], resolve),
      meta: {
        title: '子订单'
      }
    },
    {
      path: '/commission',
      name: 'commission',
      component: resolve => require(['@/view/commission/index'], resolve),
      meta: {
        title: '产品佣金列表'
      }
    },
    {
      path: '/setcommission',
      name: 'setcommission',
      component: resolve => require(['@/view/commission/SetCommission'], resolve),
      meta: {
        title: '设置产品佣金'
      }
    },
    {
      path: '/checkcommission',
      name: 'checkcommission',
      component: resolve => require(['@/view/commission/CheckCommission'], resolve),
      meta: {
        title: '设置产品佣金'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.query.tab) {
    store.dispatch('setNowTab', {
      nowTab: Number(to.query.tab)
    })
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
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
