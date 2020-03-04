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
  padding: 15px;
  width: 100%;
  height: 100%;
  overflow: auto;
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
    }
  },
  methods: {
    getProductList () {
      let req = {
        token: this.$store.getters.token,
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
