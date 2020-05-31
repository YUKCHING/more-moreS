<template>
  <div class='ScreenInfoPreview'>
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
    <van-image-preview v-model="showPreview" :images="showImages" :startPosition="previewIndex" @change="onChange">
      <template v-slot:index>第{{ previewIndex + 1 }}页</template>
    </van-image-preview>
  </div>
</template>
<script>
export default {
  props: {
    screenInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showImages: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      showPreview: false,
      previewIndex: 0
    }
  },
  methods: {
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
.ScreenInfoPreview
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
