<template>
  <div class="appointment-training">
    <van-cell-group>
      <van-field
        v-model="info.company_name"
        required
        clearable
        label="公司名"
        placeholder="请输入"
        label-width="90px"
        input-align="right"
      ></van-field>
      <van-field
        v-model="info.contact_address"
        required
        clearable
        label="联系地址"
        placeholder="请输入"
        label-width="90px"
        input-align="right"
      ></van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="info.contact_name"
        required
        clearable
        label="联系人"
        placeholder="请输入"
        label-width="90px"
        input-align="right"
      ></van-field>
      <van-field
        v-model="info.contact_phone"
        required
        clearable
        label="联系方式"
        placeholder="请输入"
        label-width="90px"
        input-align="right"
      ></van-field>
      <van-field
        v-model="info.content"
        required
        clearable
        label="培训内容"
        placeholder="请输入"
        label-width="90px"
        input-align="left"
        type="textarea"
        class="content-block"
      ></van-field>
      <van-field
        v-model="info.book_time"
        required
        clearable
        disabled
        label="预约时间"
        placeholder="请选择"
        label-width="90px"
        input-align="right"
        right-icon="arrow"
        @click="traningTimeClick"
      >
      </van-field>
    </van-cell-group>
    <div class="submit-block">
      <van-button class="submit-button" @click="submitAction">提交</van-button>
    </div>
    <van-popup
      v-model="showDatePicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="minDate"
        type="datetime"
        :min-date="minDate"
        @cancel="onDateCancel"
        @confirm="onDateConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { bookTraning } from '@/apis/api'
import { Toast } from 'vant'
export default {
  computed: {
    minDate () {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth()
      let strDate = time.getDate()
      let hour = time.getHours()
      let min = time.getMinutes()
      var date = new Date(year, month, strDate)
      date.setHours(hour)
      date.setMinutes(min)
      return date
    }
  },
  data () {
    return {
      showDatePicker: false,
      info: {
        company_name: '',
        contact_address: '',
        contact_name: '',
        contact_phone: '',
        content: '',
        book_time: ''
      }
    }
  },
  methods: {
    traningTimeClick () {
      this.showDatePicker = true
    },
    onDateCancel () {
      this.showDatePicker = false
    },
    onDateConfirm (value) {
      this.showDatePicker = false
      var year = value.getFullYear()
      var month = value.getMonth() + 1
      var strDate = value.getDate()
      var hour = value.getHours()
      var min = value.getMinutes()
      this.info.book_time = year + '-' + month + '-' + strDate + ' ' + hour + ':' + min
    },
    submitAction () {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          const ele = this.info[key]
          if (ele.length === 0) {
            Toast.fail('请完善内容')
            return
          }
        }
      }
      bookTraning(this.info).then(res => {
        console.log(res)
        if (res.code === 200) {
          Toast.success('提交成功')
          this.info = {
            company_name: '',
            contact_address: '',
            contact_name: '',
            contact_phone: '',
            content: '',
            book_time: ''
          }
        } else {
          Toast.fail('提交失败')
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.appointment-training {
  position: relative;
  width: 100%;
  background: #F6F6F6;
  height: 100%;
  box-sizing: content-box;

  .content-block {
    flex-direction: column;
  }

  .submit-block {
    height: 49px;
    position: fixed;
    width: 100%;
    bottom: 5px;
    padding: 0 14px;
  }
  .submit-button {
    height: 100%;
    width: calc(100vw - 28px);
    background: #FF4141;
    color: #ffffff;
    border-radius: 4px;
    font-size: 15px;
  }
}
.van-cell-group {
  margin-bottom: 10px;
}
.van-cell /deep/ {
  padding: 15px 16px;
}
</style>
