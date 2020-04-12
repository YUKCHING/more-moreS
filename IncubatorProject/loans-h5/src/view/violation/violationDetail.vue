<template>
  <div class="violationDetail">
    <p class="label">
      VIN码：{{cardInfo.vin}}
    </p>
    <p class="label">
      发动机号：{{cardInfo.engine_no}}
    </p>
    <p class="label">
      车牌号码：{{cardInfo.plate_first}}{{cardInfo.plate_show}}
    </p>
    <p class="label">
      查询日期：{{query_time}}
    </p>
    <div class="tab-block">
      <table border="1">
        <tr>
          <th class="thBlock">违章次数</th>
          <th>总扣分</th>
          <th>总罚款</th>
        </tr>
        <tr>
          <th>{{allTime}}</th>
          <th>{{allDegree}}</th>
          <th>{{allCount}}</th>
        </tr>
      </table>
    </div>
    <p class="label">违章记录（{{allTime}}）</p>
    <div class="step-block">
      <van-steps
        direction="vertical"
        :active="-1">
        <van-step
          v-for="item in report"
          :key="item.id">
          <div
            class="step-icon"
            slot="inactive-icon">
            <div class="step-icon-center"></div>
          </div>
          <p class="step-label">{{item.Location}}</p>
          <p class="step-label">{{item.Time}}</p>
          <p class="step-label">惩罚：扣分{{item.degree}},罚款{{item.count}}元</p>
          <p class="step-label">原因：{{item.Reason}}</p>
          <p class="step-label">备注：null</p>
        </van-step>
      </van-steps>
    </div>
    <p class="explain">本报告所包含的内容，仅基于截至查询日期收到的相关违章记录，其他记录可能存在未被采集和收录，本报告仅供参考。</p>
  </div>
</template>
<script>
import { getBreakRule } from '@/apis/api.js'
export default {
  data () {
    return {
      id: this.$route.query.id,
      ocrId: this.$route.query.ocrId,
      query_time: '',
      report: {},
      cardInfo: {},
      allTime: 0,
      allDegree: 0,
      allCount: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.$store.getters.violationInfo) {
        this.cardInfo = this.$store.getters.violationInfo
      }
      this.getReport()
    },
    getReport () {
      let req = {
        // token: this.$store.getters.token,
        query_id: this.id,
        ocr_id: this.ocrId
      }
      this.tLoading()
      getBreakRule(req).then(res => {
        this.tClear()
        if (res.code === 0) {
          this.report = res.data.report
          this.query_time = res.data.query_time
          this.allTime = res.data.report.length
          this.report.forEach(ele => {
            this.allDegree = this.allDegree + Number(ele.Degree)
            this.allCount = this.allCount + Number(ele.count)
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.violationDetail
  padding 0 1.5rem 1.5rem
  background #ffffff

  .label
    font-size 1.17rem
    margin-top 1rem

  .explain
    margin-top 1rem
    color #5C5C5C
    font-size 1.08rem

  .step-block
    margin-top 1rem

    .step-icon
      width 1.5rem
      height 1.5rem
      border-radius 50%
      background rgba(165, 155, 154, .28)
      display inline-flex
      justify-content center
      align-items center

      .step-icon-center
        display inline-block
        width .67rem
        height .67rem
        border-radius 50%
        background rgba(167, 159, 158, 1)

    .step-label
      color #030303
      font-size 1.17rem

</style>
<style lang='scss' scoped>
$thWidth: calc(100vw - 36px);
.tab-block {
  margin-top: 1rem;
  display: block;
  box-sizing: border-box;
  padding: 4px 0;
  width: 100%;
  color: #000;
  border: none;

  table {
    border: 1px solid rgba(151, 151, 151, .2);
    color: #000;
  }

  th {
    width: calc(#{$thWidth} * 0.33);
    color: #000;
  }

  tr {
    height: 3rem;
  }
}
</style>
