<template>
  <div class='OrderDetail'>
    <div class="panel">
      <div class="title">
        <span>订单信息</span>
        <div class="right2" @click="addChildOrderAction">
          + 添加子订单
        </div>
      </div>
      <div class="content">
        <div class="info-label">
          <span class="label">订单状态</span>
          <span class="status">
            {{getOrderStatusName(info.status)}}
          </span>
          <span class="value time">
            计时{{info.expire_time}}
          </span>
        </div>
        <div class="info-label">
          <span class="label">客户名称</span>
          <p class="value">{{info.user_name}}</p>
        </div>
        <div class="info-label">
          <span class="label">客户身份证号</span>
          <p class="value">{{info.id_card || '-'}}</p>
        </div>
        <div class="info-label">
          <span class="label">联系电话</span>
          <p class="value">{{info.mobile || '-'}}</p>
        </div>
        <van-button class="button" @click="recordDetailAction">交易记录详情</van-button>
        <div class="loansBlock">
          <div class="loansTitle">
            <span>{{product.product_name || '-'}}</span>
            <van-button class="button" :disabled="!isSetProduct">选择产品</van-button>
          </div>
          <div class="loansInfo">
            <div class="item">
              <p>{{audit.amount ? audit.amount + '万元' : '-'}}</p>
              <p>审批额度</p>
            </div>
            <div class="item">
              <p>{{audit.monthly_rate ? audit.monthly_rate + '%' : '-'}}</p>
              <p>月利率</p>
            </div>
            <div class="item">
              <p>{{audit.time_limit || '-'}}</p>
              <p>申请期限</p>
            </div>
          </div>
          <div class="other">
            <van-field v-model="otherCost" type="number" label="其他费用：" placeholder="请输入" />
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
        <div v-if="!isSetProduct" class="right" @click="screenAction(false)">
          审核系统初筛
          <img src="@/assets/icon/icon-arrow-right2.png">
        </div>
        <div v-else class="right" style="color: #78797A" @click="screenAction(true)">
          查看
          <img src="@/assets/icon/icon-arrow-right3.png">
        </div>
      </div>
      <div class="content">
        <div class="certificates">
          <div class="part">
            <p>身份证</p>
            <div class="imageBlock">
              <div class="image">
                <img @click="showImagePreview(0)" :src="screenInfo.id_card_front_img_url">
              </div>
              <div class="image">
                <img @click="showImagePreview(1)" :src="screenInfo.id_card_back_img_url">
              </div>
            </div>
          </div>
          <div class="part">
            <p>行驶证</p>
            <div class="imageBlock">
              <div class="image">
                <img @click="showImagePreview(2)" :src="screenInfo.vehicle_license_front_img_url">
              </div>
              <div class="image">
                <img @click="showImagePreview(3)" :src="screenInfo.vehicle_license_duplicate_img_url">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonPanel">
      <van-button class="button1" :disabled="!isSetProduct" @click="assignControl">指派内控</van-button>
      <van-button class="button2" :disabled="!isSetProduct" type="danger" @click="submitIncomming">提交进件</van-button>
    </div>
    <van-image-preview v-model="showPreview" :images="showImages" :startPosition="previewIndex" @change="onChange">
      <template v-slot:index>第{{ previewIndex + 1 }}页</template>
    </van-image-preview>
  </div>
</template>
<script>
import { getLoanOrderInfo } from '@/apis/api.js'
export default {
  data () {
    return {
      otherCost: '',
      info: {},
      product: {},
      audit: {},
      screenInfo: {},
      showPreview: false,
      showImages: '',
      previewIndex: 0
    }
  },
  computed: {
    isSetProduct () {
      return this.product.product_name
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      let req = {
        order_id: this.$route.query.order_id
      }
      getLoanOrderInfo(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          let date1 = this.moment(res.data.expire_in * 1000)
          let date2 = this.moment(new Date())
          let date3 = date1.diff(date2, 'minute')// 计算相差的分钟数
          let h = Math.floor(date3 / 60)// 相差的小时数
          let mm = date3 % 60// 计算相差小时后余下的分钟
          this.info = {
            ...res.data,
            expire_time: h + ':' + mm
          }
          this.product = res.data.product
          this.audit = res.data.audit
          this.screenInfo = res.data.screen_info
          this.showImages = [
            this.screenInfo.id_card_front_img_url,
            this.screenInfo.id_card_back_img_url,
            this.screenInfo.vehicle_license_front_img_url,
            this.screenInfo.vehicle_license_duplicate_img_url
          ]
        }
      })
    },
    recordDetailAction () {
      this.$router.push({
        path: '/recordprocess',
        query: {
          order_id: this.info.order_id
        }
      })
    },
    screenAction (val) {
      this.$router.push({
        path: '/systemscreen2',
        query: {
          set: val ? '1' : '0',
          order_id: this.info.order_id
        }
      })
    },
    addChildOrderAction () {
      console.log('添加子订单')
    },
    assignControl () {
      console.log('指派内控')
    },
    submitIncomming () {
      console.log('提交进件')
    },
    showImagePreview (index) {
      this.previewIndex = index
      this.showPreview = true
    },
    onChange (index) {
      this.previewIndex = index
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderDetail
  height 100%
  background #F2F3F5

  .product-popup
    height 100%
    background red

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    margin-top 40px

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150

  .panel
    border-top 10px solid #F2F3F5
    background #ffffff

    .title
      display flex
      justify-content space-between
      align-items center
      padding 6px 10px
      background #E8E9EB
      color rgba(0, 0, 0, .5)
      font-size 1rem
      font-weight 600

      .right
        display inline-flex
        align-items center
        color #6DD400

        img
          width 15px

      .right2
        color rgba(0, 0, 0, .85)

    .content
      padding .8rem

      .info-label
        display flex
        align-items center
        color #000000
        font-size 1.1rem
        margin-bottom 2rem

        .label
          width 25%
          color rgba(0, 0, 0, .5)

        .value
          flex-grow 1

        .status
          border 1px solid #E02020
          color #E02020
          padding 2px 10px
          font-size 12px

        .time
          color #E11B1B
          margin-left 20px

      .button
        display inline-block
        background #EE5150
        color #FFFFFF
        padding 8px 15px
        border-radius 5px
        font-size 12px
        margin-bottom .8rem
        height 32px
        line-height 12px

      .loansBlock
        border .6px solid rgba(0, 0, 0, .25)
        box-shadow 0px 2px 4px 0px rgba(0, 0, 0, .1)
        padding .8rem .8rem 0rem

        .loansTitle
          display flex
          justify-content space-between
          align-items center
          font-size 14px

        .loansInfo
          display flex
          justify-content space-around
          align-items center

          .item
            width 30%
            display inline-flex
            flex-direction column
            align-items center
            font-size 12px

            p
              &:nth-child(2)
                color rgba(0, 0, 0, .25)
                font-size 12px
                transform scale(.9)
                margin-top 1rem
      .other
        .van-cell
          background rgba(0, 0, 0, .1)
          padding 6px 8px
          margin .5rem 0
          font-size 12px

      .certificates
        display flex
        justify-content space-between
        font-size 12px

        .part
          width 45%

          .imageBlock
            display flex
            align-items center
            margin-top 10px

            imageWidth = 18vw
            .image
              display inline-block
              background #D8D8D8
              width imageWidth
              height imageWidth
              border-radius 5px
              margin-right 10px

              img
                width 100%
                height 100%
</style>
