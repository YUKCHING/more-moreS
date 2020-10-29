<template>
  <div class='AboutTainuo'>
    <p class="text-block" style="margin-top: 2rem;">
      深圳市泰诺信息服务有限公司（简称“泰诺汽车金融”），成立于2016年5月，位于交通方便的深圳金融CBD中心车公庙，主要为企业和个人提供全面的汽车金融服务，包括贷款方案的设计、贷款申请以及贷款相关手续的办理，月均放款量达2000万，已正式签约平安银行及各大城市商业银行汽车金融深圳分部车抵贷一级核心渠道，以不断超越的时效，丰富的市场经验，力求为客户用最低的成本贷到满意的额度，短短两年时间就为深圳超过30万人提供金融服务。
    </p>
    <p class="text-block">
      凭借不断突破的放款量，于2017年荣获“平安银行汽车金融2017年度车抵贷优秀合作渠道”，在2018年7月举办第一届新概念车贷产品推介会，同月放款量超过2500万。2018年9月29日成立宝安分公司，11月惠州分公司和龙岗分公司紧密筹划中。
    </p>
    <p class="text-block">
      我们从一支十几人的精英团队，发展到今天的即将开业的第二家分公司，一直秉承稳如泰山，一诺千金的经营理念，以诚信使命、合作共赢、专业高效、卓越创新的价值观，立志成为车贷行业中的领袖企业！
    </p>
    <div class="label-block">
      <p class="label-item">地址 : 深圳市福田区深南大道英龙大厦2701B</p>
      <p class="label-item">地址 : 深圳市宝安区广场大厦606</p>
      <p class="label-item">电话 : 13760430001</p>
    </div>
    <div class="qr-block">
      <!-- <div class="item">
        <img src="@/assets/icon/icon-qr1.jpg">
        <span>客服微信</span>
      </div>
      <div class="item">
        <img src="@/assets/icon/icon-qr2.jpg">
        <span>客服微信</span>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.AboutTainuo
  background #ffffff
  display flex
  flex-direction column
  align-items center
  padding 1rem 1.5rem

  .logo
    width 4.42rem
    height 4.42rem

  .text-block
    text-indent 2em
    margin-top 1rem

  .label-block
    width 100%
    margin-top 2rem

  .qr-block
    margin-top 2rem
    display flex
    justify-content space-around

    .item
      display inline-flex
      flex-direction column
      align-items center;

      img
        width 7.5rem
        height 7.5rem

    .item:nth-child(2)
      margin-left 1rem
</style>
