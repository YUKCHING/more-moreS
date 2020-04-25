<template>
  <div class='SystemScreen'>
    <div class="panel">
      <van-field v-model="form.name" label="姓名" required placeholder="请输入姓名" />
      <van-field v-model="form.idcard" label="身份证号码" required placeholder="请输入身份证号码" />
      <van-field v-model="form.phone" label="联系电话" required placeholder="请输入联系电话" />
    </div>
    <div class="panel">
      <van-field label="拍摄身份证" required readonly/>
      <div class="img-content">
        <van-uploader
          :after-read="afterRead1"
          :preview-image="false"
          class="img-panel"
        >
          <div class="content">
            <img class="real-img" :src="imgIdcard1" v-if="imgIdcard1">
            <img v-else src="@/assets/order/icon-screen-idcard1.png">
          </div>
          <p class="des">点击上传身份证正面</p>
        </van-uploader>
        <van-uploader
          :after-read="afterRead2"
          :preview-image="false"
          class="img-panel"
        >
           <div class="content">
            <img class="real-img" :src="imgIdcard2" v-if="imgIdcard2">
            <img v-else src="@/assets/order/icon-screen-idcard2.png">
          </div>
          <p class="des">点击上传身份证背面</p>
        </van-uploader>
      </div>
    </div>
    <div class="panel">
      <van-field label="拍摄行驶证" required readonly/>
      <div class="img-content">
        <van-uploader
          :after-read="afterRead3"
          :preview-image="false"
          class="img-panel"
        >
          <div class="content">
            <img class="real-img" :src="imgCar1" v-if="imgCar1">
            <img v-else src="@/assets/order/icon-screen-car1.png">
          </div>
          <p class="des">点击上传行驶证首页</p>
        </van-uploader>
        <van-uploader
          :after-read="afterRead4"
          :preview-image="false"
          class="img-panel"
        >
          <div class="content">
            <img class="real-img" :src="imgCar2" v-if="imgCar2">
            <img v-else src="@/assets/order/icon-screen-car2.png">
          </div>
          <p class="des">点击上传行驶证副页</p>
        </van-uploader>
      </div>
    </div>
    <div class="button-block">
      <div class="button" @click="callButtonAction">通知客户系统初筛</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {},
      imgIdcard1: '',
      imgIdcard2: '',
      imgCar1: '',
      imgCar2: ''
    }
  },
  methods: {
    callButtonAction () {

    },
    afterRead1 (file) {
      console.log(file)
    },
    afterRead2 (file) {
      console.log(file)
    },
    afterRead3 (file) {
      console.log(file)
    },
    afterRead4 (file) {
      console.log(file)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.SystemScreen /deep/
  height 100%
  background #F2F3F5

  .button-block
    text-align center
    padding 3rem 0 1rem

    .button
      display inline-block
      color #ffffff
      font-size 18px
      background #EE5150
      padding .7rem 50px
      border-radius 4px

  .panel
    border-top 10px solid #F2F3F5
    background #ffffff

    .van-field__label
      color rgba(0, 0, 0, .85)

    .img-content
      padding 1rem
      display flex
      justify-content space-between

      .van-uploader__input-wrapper
        width 100%

      .img-panel
        width 47%

        .content
          background #F6F6F6
          width 100%
          height 106px
          border-radius 5px
          display flex
          justify-content center
          align-items center
          overflow hidden

          .real-img
            width 100%
            height 100%

        .des
          text-align center
          color rgba(0, 0, 0, .25)
          font-size 1rem
          margin-top .5rem
</style>
