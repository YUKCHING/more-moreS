<template>
  <div class="sampling">
    <div class="bg-block">
      <span>Service</span>
      <span>喜 圈</span>
    </div>
    <div class="fields-block">
      <van-field
        v-model="boxCode"
        clearable
        label="采样盒编号："
        label-width="120px"
        label-align="right"
        :readonly=true
      ></van-field>
      <div class="line1"></div>
      <van-field
        v-model="info.name"
        clearable
        label="姓名："
        placeholder="请输入姓名"
        label-width="90px"
        label-align="center"
        class="field-block"
        :readonly=isHaveInfo
      >
        <span class="slot-block" slot="button" @click="sexAction">
          {{info.sex === 1 ? '男' : '女'}}
          <img v-if="!isHaveInfo" class="arrow-block" src="@/assets/imgs/arrow-down.png" />
        </span>
      </van-field>
      <div class="line2">
        <div class="line"></div>
      </div>
      <van-field
        v-model="info.phone"
        clearable
        label="手机："
        placeholder="请输入手机"
        label-width="90px"
        label-align="center"
        class="field-block"
        :readonly=isHaveInfo
      >
        <div slot="button" v-if="!isHaveInfo" @click="getVerifyCodeAction">{{isLoading ? codeDown : '验证码'}}</div>
      </van-field>
      <div class="line2">
        <div class="line"></div>
      </div>
      <van-field
        v-if="!isHaveInfo"
        v-model="info.code"
        clearable
        label="验证码："
        placeholder="请输入验证码"
        label-width="90px"
        label-align="center"
        class="field-block"
      ></van-field>
      <div class="line2" v-if="!isHaveInfo">
        <div class="line"></div>
      </div>
      <van-field
        v-model="info.nation"
        clearable
        label="民族："
        placeholder="如：汉族"
        label-width="90px"
        label-align="center"
        class="field-block"
        :readonly=isHaveInfo
      ></van-field>
      <div class="line2">
        <div class="line"></div>
      </div>
      <van-field
        clearable
        label="生日："
        placeholder="请输入生日"
        label-width="90px"
        label-align="center"
        class="field-block"
      >
        <span class="slot-block" slot="input" @click="dataAction">
          {{info.birthday}}
          <img v-if="!isHaveInfo" class="arrow-block" src="@/assets/imgs/arrow-down.png" />
        </span>
      </van-field>
      <van-field
        v-model="info.anamnesis"
        clearable
        label="既往病史："
        placeholder="请输入既往病史"
        label-width="90px"
        label-align="center"
        class="field-block"
        type="textarea"
        :autosize="{minHeight: 100}"
        :readonly=isHaveInfo
      ></van-field>
      <van-field
        v-model="info.family_medical_history"
        clearable
        label="家族病史："
        placeholder="请输入家族病史"
        label-width="90px"
        label-align="center"
        class="field-block"
        type="textarea"
        :autosize="{minHeight: 100}"
        :readonly=isHaveInfo
      ></van-field>
    </div>
    <div class="button-block" v-if="!isHaveInfo" >
      <van-button @click="submitAction" style="background: #FD95BB; color: #ffffff;">提交</van-button>
      <van-button @click="clearAction" style="color: #FD95BB;">清空</van-button>
    </div>
    <div class="button-block" v-else>
      <van-button @click="collectionAction" style="background: #FD95BB; color: #ffffff;">采集流程</van-button>
    </div>
    <div class="code-block">
      <img src="@/assets/imgs/qrcode.png" />
      <span>关注我们</span>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        title="性别"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      ></van-picker>
    </van-popup>
    <van-popup
      v-model="showDatePicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="onDateCancel"
        @confirm="onDateConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { Toast, Dialog, ImagePreview } from 'vant'
import { getSamplingBoxInfo, checkBindStatus, getVerifyCode, submitUserInfo } from '@/apis/ApiRequest'
export default {
  computed: {
    columns () {
      return [
        {
          values: this.sexs.map(ele => {
            return ele.name
          }),
          className: 'column1'
        }
      ]
    }
  },
  data () {
    return {
      isLoading: false,
      codeDown: 60,
      boxCode: this.$route.query.box_code,
      showPicker: false,
      showDatePicker: false,
      currentDate: new Date(1990, 0, 1),
      minDate: new Date(1960, 0, 1),
      sexs: [
        {
          id: 1,
          name: '男'
        },
        {
          id: 2,
          name: '女'
        }
      ],
      isHaveInfo: false,
      info: {
        box_code: this.$route.query.box_code,
        name: '',
        phone: '',
        sex: 1,
        nation: '',
        birthday: '请选择',
        anamnesis: '',
        family_medical_history: '',
        code: ''
      }
    }
  },
  created () {
    this.getSamplingBoxInfoAction()
  },
  methods: {
    getSamplingBoxInfoAction () {
      let req = {
        code: this.boxCode
      }
      getSamplingBoxInfo(req).then(res => {
        console.log(res)
        if (res.data.user_id) {
          this.info = {
            ...res.data.user_info
          }
          this.isHaveInfo = true
        } else {
          this.isHaveInfo = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    sexAction () {
      if (this.isHaveInfo) return
      this.showPicker = true
    },
    onCancel () {
      this.showPicker = false
    },
    onConfirm (value, index) {
      this.showPicker = false
      this.info.sex = this.sexs[index].id
    },
    onDateCancel () {
      this.showDatePicker = false
    },
    onDateConfirm (value) {
      this.showDatePicker = false
      var year = value.getFullYear()
      var month = value.getMonth() + 1
      var strDate = value.getDate()
      this.info.birthday = year + '-' + month + '-' + strDate
    },
    clearAction () {
      var keys = Object.keys(this.info)
      keys.forEach(key => {
        if (key !== 'sex' && key !== 'birthday' && key !== 'number') {
          this.info[key] = ''
        }
      })
    },
    dataAction () {
      if (this.isHaveInfo) return
      this.showDatePicker = true
    },
    submitAction () {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          const ele = this.info[key]
          if (!ele) {
            Toast('请完善信息')
            return
          }
        }
      }
      let req = {
        ...this.info
      }
      submitUserInfo(req).then(res => {
        console.log(res)
        if (res.code === 200) {
          Toast.success('提交成功')
          this.getSamplingBoxInfoAction()
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    getVerifyCodeAction () {
      if (this.info.phone.length === 11) {
        if (this.isLoading) {
          return
        }
        this.checkBindStatusRequest()
      } else {
        if (!this.isLoading) {
          Toast('请输入正确手机号')
        }
      }
    },
    checkBindStatusRequest () {
      let req = {
        phone: this.info.phone
      }
      checkBindStatus(req).then(res => {
        console.log(res)
        if (res.data.is_bind === 0) {
          this.getVerifyCodeRequest()
        } else {
          Dialog.confirm({
            title: '标题',
            message: '该手机已绑定过其它采样盒，如继续提交将更新该手机号对应信息。'
          }).then(() => {
            this.getVerifyCodeRequest()
            // on confirm
          }).catch(() => {
            // on cancel
          })
        }
      })
    },
    getVerifyCodeRequest () {
      this.isLoading = true

      let req = {
        phone: this.info.phone,
        scene: 'register-login'
      }
      getVerifyCode(req).then(res => {
        if (res.code === 200) {
          Toast.success('获取验证码成功')
        }
      })

      let timer = setInterval(() => {
        this.codeDown--
        if (this.codeDown < 0) {
          clearInterval(timer)
          this.isLoading = false
        }
      }, 1000)
    },
    collectionAction () {
      ImagePreview([
        'http://file.xiquan.live/admin/image/caijiliucheng.jpg'
      ])
    }
  }
}
</script>
<style lang='scss' scoped>
.sampling /deep/ {
  background: #efefef;

  $bgWidth: 100vw;
  $bgHeight: calc(100vw * 203.0 / 414.0);
  .bg-block {
    width: $bgWidth;
    height: $bgHeight;
    background: url(~@/assets/imgs/xiquan.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom: -30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-family: 'AlibabaPuHuiTiR';
      color: #ffffff;
      font-size: 32px;
    }
    span:nth-child(1) {
      font-size: 12px;
      opacity: .68;
    }
  }

  .van-cell {
    box-shadow: 0px 22px 59px 0px rgba(0, 0, 0, .09);
    border-radius: 4px;
  }

  .van-cell:nth-child(1) {
    line-height: 44px;
  }

  .line1 {
    width: 30px;
    height: 2px;
    background: #FD95BB;
    margin-top: 1px;
  }

  .line2 {
    width: 70%;
    padding-left: 95px;

    .line {
      width: 12px;
      height: 2px;
      background: #FD95BB;
      margin-top: 1px;
    }
  }

  .fields-block {
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .field-block {
      width: 100%;
      margin-top: 20px;
    }

    .slot-block {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      .arrow-block {
        width: 25px;
        height: 25px;
      }
    }
  }
  .button-block {
    background: #efefef;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 80px 30px;

    .van-button {
      width: 45%;
    }
  }
  .code-block {
    background: #efefef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 126px;
      height: 126px;
    }
    span {
      color: #FD95BB;
      font-family: "AlibabaPuHuiTiR";
      font-size: 16px;
    }
  }
}

</style>
