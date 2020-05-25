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
    <div>
      <violation-step :list="report" v-if="report.length > 0" />
    </div>
    <p class="explain">本报告所包含的内容，仅基于截至查询日期收到的相关违章记录，其他记录可能存在未被采集和收录，本报告仅供参考。</p>
  </div>
</template>
<script>
import { getBreakRule, createBreakRule } from '@/apis/api.js'
import ViolationStep from './component/ViolationStep'
export default {
  components: {
    ViolationStep
  },
  data () {
    return {
      vin: '',
      engine_number: '',
      license_no: '',
      ocr_id: '',
      query_time: '',
      need_push: '',
      report: [],
      cardInfo: {},
      allTime: 0,
      allDegree: 0,
      allCount: 0,
      reportTimer: ''
    }
  },
  mounted () {
    this.vin = this.$route.query.vin
    this.engine_no = this.$route.query.engine_no
    this.license_no = this.$route.query.license_no
    this.ocr_id = this.$route.query.ocr_id
    this.need_push = this.$route.query.need_push
    this.init()
  },
  destroyed () {
    clearInterval(this.reportTimer)
  },
  methods: {
    init () {
      if (this.$store.getters.violationInfo) {
        this.cardInfo = this.$store.getters.violationInfo
      }
      this.getRule()
    },
    getRule () {
      let req = {
        vin: this.vin,
        engine_number: this.engine_no,
        license_no: this.license_no,
        need_push: this.need_push
        // ocr_id: this.ocr_id
      }
      this.tLoading('查询中...')
      createBreakRule(req).then(res => {
        if (res.code === 0) {
          if (res.data.query_id) {
            this.reportTimer = setInterval(() => {
              this.getReport(res.data.query_id)
            }, 1000)
          }
        }
      })
    },
    getReport (queryId) {
      let req = {
        token: this.$store.getters.token,
        query_id: queryId
        // ocr_id: this.ocr_id
      }
      getBreakRule(req).then(res => {
        clearInterval(this.reportTimer)
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
