<template>
  <div class='HomePage'>
    <div class="gif">
      <img src="https://tainuocar.oss-cn-zhangjiakou.aliyuncs.com/b63bd85c14b67b82469e013136c8b384.gif" alt="">
    </div>
    <div class="panel">
      <p class="title">泰诺汽车平台</p>
      <p class="des">超10款车贷产品，总有一款适合您！</p>
      <div class="config-block">
        <div
          class="item"
          v-for="item in configs"
          :key="item.code"
          @click="configItemSelect(item)"
          v-show="item.is_show === 1"
        >
          <img :src="item.icon" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="button" @click="loanAction">
        开始贷款
      </div>
    </div>
  </div>
</template>
<script>
import { getControlConfig } from '@/apis/api.js'
export default {
  props: {
    info: {
      require: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    this.getConfig()
  },
  data () {
    return {
      configs: []
    }
  },
  methods: {
    getConfig () {
      getControlConfig({}).then(res => {
        if (res.code === 0) {
          if (res.data.functions.length > 0) {
            let grade = this.$store.getters.userInfo.grade

            let baseData = res.data.functions.filter(ele => {
              return ele.visible_grade.indexOf(String(grade)) !== -1
            })

            // 读缓存的配置
            let configInfo = this.$store.getters.configInfo
            let showArr = []
            if (configInfo) {
              configInfo.forEach(ele => {
                if (ele.is_show === 1) {
                  showArr.push(ele.code)
                }
              })
            }

            if (showArr.length > 0) {
              let temArr = baseData.map((ele, index) => {
                return {
                  ...ele,
                  icon: ele.icon || require('@/assets/icon/icon-config-backup.png'),
                  is_show: showArr.indexOf(ele.code) !== -1 ? 1 : 0
                }
              })
              this.configs = temArr
              this.$store.dispatch('setConfigInfo', {
                configInfo: JSON.stringify(temArr)
              })
            } else {
              let temArr = baseData.map((ele, index) => {
                return {
                  ...ele,
                  icon: ele.icon || require('@/assets/icon/icon-config-backup.png'),
                  is_show: index < 5 ? 1 : 0
                }
              })
              this.configs = temArr
              this.$store.dispatch('setConfigInfo', {
                configInfo: JSON.stringify(temArr)
              })
            }

            this.configs.push({
              name: '更多功能',
              url: '',
              is_show: 1,
              icon: require('@/assets/icon/icon-config-more.png')
            })
          }
        }
      })
    },
    configItemSelect (item) {
      if (item.name === '更多功能') {
        this.$router.push('/moreconfig')
      } else if (item.code === 'invite_fans') {
        this.$router.push({
          path: '/invitefans'
        })
      } else if (item.code === 'break_rule') {
        this.showViolation()
      } else if (item.code === 'common_tools') {
        this.$emit('showTool')
      } else if (item.code === 'rapid_valuation') {
        this.$router.push({
          path: '/valuation'
        })
      } else {
        if (item.url) {
          window.location.href = item.url + '?token=' + this.$store.getters.token
        } else {
          this.toast('尽情期待')
        }
      }
    },
    showViolation () {
      this.$router.push({
        path: '/violation'
      })
    },
    loanAction () {
      this.$router.push('/loanslist')
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.HomePage
  padding 0 2rem 2rem

  .gif
    padding-top 2rem
    text-align center

    img
      width calc(100% - 4rem)

  .panel
    padding 2rem 2rem
    background #FCFCFC
    border-radius .42rem
    position relative

    .title
      font-size 1.83rem
      color #FE4E36

    .des
      font-size 1.08rem
      margin 4px 0 3rem

    .button
      display inline-block
      position absolute
      bottom -43px
      left calc(50% - 43px)
      height 86px
      width 86px
      border-radius 43px
      text-align center
      line-height 86px
      background linear-gradient(to right, #FF7952 0%, #FE3525 100%)
      color #ffffff
      cursor pointer
      box-shadow 0px 0px 10px rgba(0, 0, 0, .5)

    .config-block
      display flex
      justify-content space-between
      align-items center
      flex-wrap wrap

      .item
        width 35%
        display inline-flex
        align-items center
        justify-content center
        padding 1rem
        margin-bottom 1rem
        background #F8FAFD
        border-radius .42rem

        img
          width 2rem
          margin-right 1rem

        span
          color #262626
          font-size 1.17rem

      .item
        &:last-child
          margin-bottom 2rem

</style>
