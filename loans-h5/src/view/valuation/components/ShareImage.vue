<template>
  <div class="share-image">
    <div class="content" id="content" ref="content" >
      <div class="block1">
        {{info.brand_name}} {{info.model_name}}
      </div>
      <div class="block2">
        <share-card title="所在城市" :value="info.city_name"></share-card>
        <share-card title="上牌日期" :value="info.reg_date"></share-card>
        <share-card title="行程里程" :value="info.mile_age + '万公里'"></share-card>
      </div>
      <div class="block3">
        <div class="part1">
          <p>可贷款额度</p>
          <p>
            {{loanMin}}~{{loanMax}}
            <span> 万</span>
          </p>
          <div class="share-button">
            <img src="@/assets/imgs/icon-share.png">
            <span>分享</span>
          </div>
        </div>
        <div class="part2">
          <select-button v-for="item in tabInfo" :key="item.value" :info="item"></select-button>
        </div>
        <div class="part3">
          <div class="line1">
            <div class="left">
              <p>估值(万)</p>
              <div class="mask">
                扫码查看结果
              </div>
            </div>
            <div class="line"></div>
            <div class="right">
              <span class="button">
                选择产品
              </span>
              <p>超<span style="color: #EE5150;">*款</span>产品可选</p>
            </div>
          </div>
          <img ref="img1" src="@/assets/valuation/mask-img.png" class="mask-panel">
        </div>
      </div>
      <div class="block4">
        <div class="mask">
          扫码查看结果
        </div>
      </div>
      <div class="block5">
        <img ref="img2" src="@/assets/valuation/share-bottom.png" alt="">
        <p class="exp">长按可保存图片</p>
        <img class="qrcode-img" :src="qrcode">
      </div>
    </div>
    <img class="show-img" :src="dataURL" :style="{height: contentHeight}">
  </div>
</template>
<script>
import { createValQrcode } from '@/apis/loansRequest.js'
import ShareCard from '@/components/card/ShareCard'
import SelectButton from './SelectButton'
import html2canvas from 'html2canvas'
import jrQrcode from 'jr-qrcode'
export default {
  components: {
    ShareCard, SelectButton
  },
  data () {
    return {
      dataURL: '',
      qrcode: '',
      contentHeight: '',
      valId: '',
      loanMin: '',
      loanMax: '',
      info: {
        brand_name: '',
        model_name: '',
        city_name: '',
        reg_date: '',
        mile_age: ''
      },
      tabInfo: [
        {title: '车况普通', value: '1', select: false},
        {title: '车况良好', value: '2', select: false},
        {title: '车况优秀', value: '3', select: false}
      ]
    }
  },
  created () {
    let query = this.$route.query
    this.valId = query.valId
    this.info.brand_name = query.brand_name
    this.info.model_name = query.model_name
    this.info.city_name = query.city_name
    this.info.reg_date = query.reg_date
    this.info.mile_age = query.mile_age
    this.loanMin = query.loanMin
    this.loanMax = query.loanMax

    let tabValue = query.tabValue
    this.tabInfo.forEach(ele => {
      ele.select = ele.value === tabValue
    })
  },
  mounted () {
    this.createQrcode()
  },
  methods: {
    createQrcode () {
      this.tLoading('请稍等...')
      let req = {
        valuation_id: this.valId
      }
      createValQrcode(req).then(res => {
        if (res.code === 0) {
          let url = res.data.url
          this.getQrcodeImage(url)
        }
      })
    },
    getQrcodeImage (url) {
      let option = {
        padding: 0,
        width: 80, // 二维码图片宽度（默认为256px）
        height: 80, // 二维码图片高度（默认为256px
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: '#ffffff', // 二维码背景颜色（默认白色）
        foreground: '#000000' // 二维码颜色（默认黑色
      }
      this.qrcode = jrQrcode.getQrBase64(url, option)

      var timer = null
      timer = setInterval(() => {
        let img1Height = window.getComputedStyle(this.$refs.img1).height
        let img2Height = window.getComputedStyle(this.$refs.img2).height
        console.log('setInterval')
        if (img1Height !== '0px' && img2Height !== '0px') {
          console.log('getHtmlImage')
          this.contentHeight = window.getComputedStyle(this.$refs.content).height
          clearInterval(timer)
          this.getHtmlImage()
        }
      }, 100)
    },
    getHtmlImage () {
      html2canvas(document.querySelector('#content'), {
        async: true
      }).then(canvas => {
        let dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
        this.tClear()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.share-image {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  // padding-bottom: 50px;
  // width: 80vw;
  // height: 80vh;
  background: #F2F3F4;
  font-family: 'PingFangSC-Medium';

  .show-img {
    position: absolute;
    // top: 50%;
    // left: 50%;
    // -webkit-transform: translate3d(-50%,-50%,0);
    // transform: translate3d(-50%,-50%,0);

    top: 0;
    left: 0;
    // right: 0;
    // bottom: 0;
    width: 100%;
    // height: 452.7px;
  }

  .content {
    width: 100%;
    // height: 100%;
    background: #fff;

    .block5 {
      position: relative;
      // background: red;

      .exp {
        padding: 0 6% 5px;
        margin-top: -10px;
      }

      img {
        width: 100%;
      }

      .qrcode-img {
        display: inline-block;
        position: absolute;
        right: 3%;
        top: 12%;
        width: 80px;
        height: 80px;
      }
    }

    .block4 {
      background: #ffffff;
      // border-bottom: 8px solid #F2F3F4;
      text-align: center;
      color: rgba(0, 0, 0, 0.25);
      font-size: 11px;
      padding: 4px 0 4px;

      .mask {
        display: inline-block;
        padding: 6px 25px;
        color: rgba(238, 81, 80, 1);
        font-size: 10.53px;
        font-family: PingFangSC-Regular;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    .block3 {
      background: #ffffff;
      border-bottom: 2px solid #F2F3F4;
      text-align: center;

      .part1 {
        position: relative;
        padding: 18px 0;

        p:nth-child(1) {
          color: rgba(0, 0, 0, 0.85);
          font-size: 17px;
          font-family: PingFangSC-Medium;
        }

        p:nth-child(2) {
          margin-top: 10px;
          color: rgba(238, 81, 80, 1);
          font-size: 24px;
          line-height: 24px;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          span {
            display: inline-block;
            font-size: 15px;
            line-height: 15px;
            padding-bottom: 2px;
          }
        }

        .share-button {
          position: absolute;
          top: 18px;
          right: 7%;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #efefef;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: rgba(146, 146, 146, 1);

          img {
            width: 12px;
            height: 12px;
            margin-right: 6px;
          }
        }
      }

      .part2 {
        display: flex;
        justify-content: space-between;
        padding: 0 38px;
      }

      .part3 {
        box-sizing: border-box;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.02) , rgba(0, 0, 0, 0.04));
        border-radius: 4px;
        margin: 16px 16px 8px;

        .line1 {
          display: flex;
          justify-content: center;
          align-items: center;

          .line {
            margin: 0 29px;
            width: 1px;
            height: 50px;
            background: rgba($color: #000000, $alpha: .1);
          }

          $lrWidth: 25%;
          .left {
            width: $lrWidth;
            padding: 18px 0;
            text-align: center;

            p:nth-child(1) {
              color: rgba(0, 0, 0, 0.5);
              font-size: 11px;
              text-align: center;
              font-family: PingFangSC-Medium;
            }
            .mask {
              display: inline-block;
              margin-top:4px;
              padding: 6px 5px;
              color: rgba(238, 81, 80, 1);
              font-size: 10.53px;
              font-family: PingFangSC-Regular;
              border-radius: 3px;
              background-color: rgba(0, 0, 0, 0.1);
            }
          }

          .right {
            text-align: center;
            width: $lrWidth;
            padding: 18px 0;
            display: inline-flex;
            flex-direction: column;
            align-items: center;

            .button {
              display: inline-block;
              border: 1.6px solid #EE5150;
              border-radius: 20px;
              font-size: 13px;
              color: rgba(238, 81, 80, 1);
              padding: 5px 10px;
            }

            p {
              margin-top: 5px;
              color: rgba(0, 0, 0, 0.5);
              font-size: 11px;
              text-align: center;
              font-family: PingFangSC-Medium;
            }
          }
        }

        .mask-panel {
          width: 100%;
        }
      }
    }

    .block2 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 6px solid #F2F3F4;
    }

    .block1 {
      padding: 14px;
      color: #000;
      font-size: 15px;
      border-bottom: 3px solid #F2F3F4;
      text-align: center;
    }
  }
}
</style>
