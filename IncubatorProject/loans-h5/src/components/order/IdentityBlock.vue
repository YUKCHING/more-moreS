<template>
  <div class='IdentityBlock'>
    <van-field v-model="identityName" label="当前身份" readonly @click="showList">
      <img src="@/assets/icon/icon-arrow-down2.png" slot="right-icon" style="width: 18px;">
    </van-field>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="list"
        @cancel="showPicker = false"
        @confirm="onPickerConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Number,
      default: -1
    }
  },
  watch: {
    'value' () {
      this.getName()
    }
  },
  created () {
    this.getName()
  },
  data () {
    return {
      showPicker: false,
      identityName: ''
    }
  },
  methods: {
    getName () {
      if (this.value !== -1) {
        let item = this.list.find(ele => ele.value === this.value)
        if (item) {
          this.identityName = item.text
        }
      }
    },
    showList () {
      this.showPicker = true
    },
    onPickerConfirm (value) {
      this.showPicker = false
      this.$emit('change', value)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.IdentityBlock /deep/
  .van-field__label
    width 70px
    margin-right 20px
    line-height 32px

  .van-field__body
    border 1px solid #BBBBBB
    border-radius 3px
    box-sizing border-box
    padding 3px 5px
</style>
