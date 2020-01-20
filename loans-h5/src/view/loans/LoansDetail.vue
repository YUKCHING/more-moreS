<template>
  <div class='loans-detail'>
    <div>
      <div class="fir-block">
        <p style="font-size: 18px;">{{detail.product_name}}</p>
        <p style="color: #FF9900; font-size: 13px;">{{detail.product_label}}</p>
        <p class='feature'>
          <span v-for='item in detail.feature'
                :key='item'>{{item}}</span>
        </p>
        <p style="font-size: 13px;">{{detail.advantage}}</p>
      </div>
      <div class="sec-block">
        <p style="font-size: 16px; margin-bottom: 10px;">产品要素</p>
        <p v-for='item in productEle'
           :key='item.name'
           style="font-size: 14px; margin-bottom: 7px;">
          <span>{{item.name}}</span>
          <span style="float: right;">{{item.value}}</span>
        </p>
      </div>
      <div class="thr-block">
        <p style="font-size: 16px; margin-bottom: 10px;">利率说明</p>
        <table class="table"
               cellspacing="0"
               cellpadding="0">
          <thead>
            <th>贷款期限(月)</th>
            <th>月利率(%)</th>
          </thead>
          <tbody>
            <tr>
              <td>{{detail.product_element.loan_years}}</td>
              <td>{{detail.product_element.monthly_rate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="thr-block">
        <p style="font-size: 16px; margin-bottom: 10px;">订单流程</p>
        <img src="@/assets/imgs/progress.jpg"
             alt="progress">
      </div>
      <div class="bar-block"></div>
    </div>
    <div class="bar">
      <div class="bar-btn"
           @click="btnActionHome">
        <img src="@/assets/imgs/home.png"
             alt="home"
             style="width: 21px; height: 21px;">
        <span>首页</span>
      </div>
      <div class="bar-btn"
           @click="btnActionPhone">
        <img src="@/assets/imgs/phone.png"
             alt="home"
             style="width: 21px; height: 21px;">
        <span>电话咨询</span>
      </div>
      <div class="bar-btn bar-submit"
           @click="btnActionSubmit">申请贷款

      </div>
      <!-- <button class="bar-btn"
              @click="btnActionHome">
        <img src="@/assets/imgs/home.png"
             alt="home"
             style="width: 21px; height: 21px;">
        <span>首页</span>
      </button>
      <button class="bar-btn"
              @click="btnActionPhone">
        <img src="@/assets/imgs/phone.png"
             alt="home"
             style="width: 21px; height: 21px;">
        <span>电话咨询</span>
      </button>
      <button class="bar-btn bar-submit"
              @click="btnActionSubmit">申请贷款</button> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loans-detail {
  display: flex;
  flex-direction: column;
  background: #f6f5f5;
  height: 100%;
  color: #030303;
  padding-bottom: 10px;

  .bar {
    background: #fff;
    border-top: 0.5px solid #c0bfbf;
    position: fixed;
    height: 49px;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 0;
    display: flex;
    flex-direction: row;
    z-index: 10;

    .bar-btn {
      width: 30%;
      height: 100%;
      display: inline-block;
      text-align: center;
      font-size: 10px;
      color: #030303;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // vertical-align: bottom;
      // border: none;
    }
    .bar-submit {
      width: 40%;
      height: 100%;
      font-size: 14px;
      // background: -webkit-linear-gradient(left, #ff7952, #fe3525);
      // background: -moz-linear-gradient(left, #ff7952, #fe3525);
      // background: -ms-linear-gradient(left, #ff7952, #fe3525);
      // background: linear-gradient(left, #ff7952, #fe3525);
      background: #ff7952;
    }
  }

  .fir-block {
    background: #fff;
    padding: 14rpx 20rpx 9rpx;
    margin-bottom: 6rpx;

    p + p {
      margin: 10rpx 0;
    }

    .feature {
      span {
        font-size: 12px;
        border: 1px solid #bebebe;
        display: inline-block;
        padding: 2rpx 6rpx;
        border-radius: 3rpx;
        margin-right: 7rpx;
      }
    }
  }

  .sec-block {
    background: #fff;
    padding: 14rpx 20rpx 9rpx;
    margin-bottom: 6rpx;
    color: #030303;
  }

  .thr-block {
    background: #fff;
    padding: 14rpx 20rpx;
    margin-bottom: 6rpx;
    color: #030303;

    .table {
      border: 1px solid #ddd;
      border-collapse: collapse;
      width: 100%;
    }

    .table thead th,
    .table tbody tr td {
      padding: 8px 12px;
      text-align: center;
      width: 50%;
      color: #333;
      border: 1px solid #ddd;
      border-collapse: collapse;
      background-color: #fff;
    }

    img {
      width: 100%;
      height: 60rpx;
    }
  }

  .bar-block {
    background: #f6f5f5;
    height: 49px;
  }
}
</style>
<script>
import { getProductDetail, getApplyLoan } from '@/apis/loansRequest'
import { MessageBox, Toast } from 'mint-ui'

export default {
  computed: {
    productEle () {
      if (!this.detail) return []
      return [
        {
          name: '额度范围',
          value: this.detail.product_element.amount
        },
        {
          name: '贷款期限',
          value: this.detail.product_element.loan_years + '月'
        },
        {
          name: '放贷时效',
          value: this.detail.product_element.loan_aging
        },
        {
          name: '还款方式',
          value: this.detail.product_element.repayment_way
        },
        {
          name: '可设置区间',
          value: this.detail.product_element.monthly_rate
        },
        {
          name: '手续费',
          value: this.detail.product_element.handling_fee
        },
        {
          name: '违约金',
          value: this.detail.product_element.penalty
        }
      ]
    }
  },
  created () {
    this.getProductDetail()
  },
  data () {
    return {
      detail: {
        product_element: {}
      }
      // detail: {
      //   product_name: '泰信贷',
      //   product_label: '快速放款',
      //   feature: ['全国车牌', '当天放款'],
      //   advantage: '唯一不押证全国车牌纯正信用贷产品',
      //   product_element: {
      //     amount: '2-50万',
      //     loan_years: '3年',
      //     loan_aging: 'T+1',
      //     repayment_way: '等额本息',
      //     monthly_rate: '1.17%',
      //     handling_fee: '0.0',
      //     penalty: '借款本金5%',
      //     rate_description: 1
      //   }
      // }
    }
  },
  methods: {
    getProductDetail () {
      let req = {
        token: this.$router.history.current.query.token,
        product_id: this.$router.history.current.query.productid
      }
      getProductDetail(req).then(res => {
        if (res.code === 0 && res) {
          this.detail = {
            ...res.data,
            feature: this._.compact(res.data.feature)
          }
        }
      }).catch(() => {

      })
    },
    getApplyloans () {
      let req = {
        token: this.$router.history.current.query.token,
        product_id: this.$router.history.current.query.productid
      }
      getApplyLoan(req).then(res => {
        if (res.code === 0) {
          this.$router.push('/success')
        }
      }).catch(err => {
        Toast(err)
      })
    },
    btnActionHome () {
      window.wx.miniProgram.navigateBack({
        delta: 1
      })
    },
    btnActionConsult () {
    },
    btnActionPhone () {
      window.location.href = `tel://${13760430001}`
    },
    btnActionSubmit () {
      MessageBox.confirm('您确定要提交申请贷款吗?', '温馨提示').then(action => {
        if (action === 'confirm') {
          this.getApplyloans()
        }
      })
    }
  }
}
</script>
