<template>
  <div class="loans-list">
    <loans-block v-for="item in lists"
                 :key="item.id"
                 :data="item"
                 @click="showDetail"></loans-block>
  </div>
</template>
<style lang='scss' scoped>
.loans-list {
  box-sizing: border-box;
  background: #fafafa;
  padding: 15rpx;
  width: 100%;
  height: 100%;
  overflow: auto;

  .no-msg {
    height: 100%;

    p {
      margin: 50% auto;
      text-align: center;
      font-size: 25px;
      color: gray;
    }
  }
}
</style>
<script>
import LoansBlock from './components/LoansBlock'
import { getProductList } from '@/apis/loansRequest'

export default {
  components: {
    LoansBlock
  },
  created () {
    this.getProductList()
  },
  data () {
    return {
      lists: []
      // lists: [
      //   {
      //     id: '1',
      //     product_name: '平安银行车抵贷',
      //     product_label: '通过率高',
      //     monthly_rate: '0.55%',
      //     amount: '3-50万',
      //     loan_reward: '0%',
      //     feature: ['车辆抵押', '不看负债']
      //   },
      //   {
      //     id: '2',
      //     product_name: '平安银行车抵贷',
      //     product_label: '通过率高',
      //     monthly_rate: '0.44~0.55%',
      //     amount: '3-50',
      //     loan_reward: '0',
      //     feature: ['车辆抵押', '不看负债']
      //   },
      //   {
      //     id: '5',
      //     product_name: '平安银行车抵贷',
      //     product_label: '通过率高',
      //     monthly_rate: '0.55%',
      //     amount: '3-50',
      //     loan_reward: '0',
      //     feature: ['车辆抵押', '不看负债']
      //   }
      // ]
    }
  },
  methods: {
    getProductList () {
      let req = {
        token: this.$router.history.current.query.token,
        limit: '99',
        page: '1',
        search: '',
        sort: ''
      }
      getProductList(req)
        .then(res => {
          if (res.code === 0 && res) {
            this.lists = res.data.list.map(ele => {
              return {
                ...ele,
                monthly_rate: ele.monthly_rate + '%'
              }
            })
          }
        })
        .catch(() => {
        })
    },
    showDetail (id) {
      this.$router.push({
        path: '/loansdetail',
        query: {
          token: this.$router.history.current.query.token,
          productid: id
        }
      })
    }
  }
}
</script>
