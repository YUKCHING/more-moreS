<template>
  <div class='EmployeesList'>
    <van-cell-group>
      <van-cell
        v-for="item in listData"
        :key="item.id"
        :title="item.name">
        <van-checkbox slot="right-icon" v-model="item.isSelect" @change="checkboxChange(item.isSelect, item)" checked-color="#E02020"></van-checkbox>
      </van-cell>
    </van-cell-group>
    <van-button class="confirmButton" @click="confirmAction" :disabled="!selectId">确 定</van-button>
  </div>
</template>
<script>
import { getGeneralEmployees } from '@/apis/api.js'
export default {
  data () {
    return {
      listData: [],
      selectId: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getGeneralEmployees({}).then(res => {
        if (res.code === 0) {
          this.listData = res.data.map(ele => {
            return {
              ...ele,
              isSelect: false
            }
          })
        }
      })
    },
    confirmAction () {
      this.$emit('select', this.selectId)
    },
    checkboxChange (val, item) {
      if (val) {
        this.listData.forEach(ele => {
          ele.isSelect = ele.id === item.id
        })
        this.selectId = item.id
      } else {
        this.selectId = ''
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.EmployeesList
  height 100%
  overflow auto

  .confirmButton
    position fixed
    bottom 2%
    left calc(50% - 89px)
    background #EE5150
    color #FFFFFF
    padding 10px 70px
    border-radius 5px
    font-size 16px
    height 40px
    line-height 12px
</style>
