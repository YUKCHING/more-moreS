<template>
  <div class="popup-panel">
    <div class="select-city">
      <van-index-bar :index-list="proIndexList" :sticky="false">
        <div v-for="(key, i) in proIndexList" :key="key">
          <div v-if="i === 0">
            <div v-show="recentCity.length > 0">
              <van-index-anchor :index="key">最近选择</van-index-anchor>
              <div class="recent-block">
                <span
                  v-for="item in proData[key]"
                  :key="item.name"
                  @click="selectRecent(item)"
                >{{item.name}}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <van-index-anchor :index="key" />
            <van-cell
              v-for="item in proData[key]"
              :key="item.name"
              :title="item.name"
              @click="selectProvinceItem(item)"
            />
          </div>
        </div>
      </van-index-bar>
    </div>
    <van-popup
      v-model="showPopup"
      position="right"
      :close-on-click-overlay="false"
      :style="{ height: '100%', width: '60%' }"
    >
      <city-sec-popup :info="selectPro" @back="backAction" @select="selectAction"></city-sec-popup>
    </van-popup>
  </div>
</template>
<script>
import { evaluateCityRequest } from '@/apis/api.js'
import CitySecPopup from './CitySecPopup'
import py from '@/common/js/vue-py'
export default {
  components: {
    CitySecPopup
  },
  created () {
    this.init()
  },
  data () {
    return {
      showPopup: false,
      proIndexList: [],
      proData: {},
      selectPro: {},
      recentCity: []
    }
  },
  methods: {
    init () {
      if (this.$store.getters.recentCity) {
        this.recentCity = JSON.parse(this.$store.getters.recentCity)
      }
      this.loadCity()
    },
    selectProvinceItem (item) {
      this.showPopup = true
      this.selectPro = item
    },
    loadCity () {
      evaluateCityRequest({}).then(res => {
        if (res.code === 0) {
          let arr = res.data.map(ele => {
            return py.chineseToPinYinFirst(ele.name)
          })
          this.proIndexList = Array.from(new Set(arr)).sort()
          this.proIndexList.unshift('最')
          this.proIndexList.forEach((ele, index) => {
            if (index === 0) {
              this.proData[ele] = this.recentCity
            } else {
              this.proData[ele] = []
            }
          })

          res.data.forEach((ele, index) => {
            let first = py.chineseToPinYinFirst(ele.name)
            this.proData[first].push({
              name: ele.name,
              children: ele.citys
            })
          })
          Object.keys(this.proData).forEach(key => {
            this.proData[key].sort((a, b) => {
              return a.name.localeCompare(b.name)
            })
          })
        }
      })
    },
    backAction () {
      this.showPopup = false
      this.selectPro = {}
    },
    selectAction (item) {
      if (this.recentCity.filter(ele => ele.name === item.name).length === 0) {
        this.recentCity.unshift(item)
        if (this.recentCity.length > 5) this.recentCity.pop()
        console.log(this.recentCity)
        this.$store.dispatch('setRecentCity', {
          recentCity: JSON.stringify(this.recentCity)
        })
      }

      this.backAction()
      this.$emit('select', item)
    },
    selectRecent (item) {
      this.backAction()
      this.$emit('select', item)
    }
  }
}
</script>
<style lang='scss' scoped>
.popup-panel /deep/ {
  background: #ffffff;
  height: 100vh;

  .van-index-anchor {
    background: rgb(239, 240, 242);
  }

  .van-cell:not(:last-child)::after {
    left: 0;
  }

  .select-city {
    height: calc(100%);
    overflow: auto;
  }

  .recent-block {
    padding: 11px 20px 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    span {
      border-radius: 2px;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 5px 17px;
      left: 36.5px;
      color: rgba(157, 157, 157, 1);
      font-size: 11px;
      font-family: PingFangSC-Regular;
      margin: 5px 10px 0px 0px;
    }
  }
}
</style>
