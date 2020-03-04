<template>
  <div class="etc-member">
    <div class="block1" @click="$router.push('/policydetail')">
      <img src="@/assets/etc/icon_horn.png" alt="horn">
      <span>国家新政：全国ETC通道覆盖率将到达90%</span>
      <span id="detail">详情</span>
    </div>
    <div class="block2">
      <img src="@/assets/etc/img_banner.png" alt="banner">
    </div>
    <div class="block3">
      <div class="title">
        <img src="@/assets/etc/icon_decorate_left.png" alt="left">
        ETC黄金会员专属权益
        <img src="@/assets/etc/icon_decorate_right.png" alt="right">
      </div>
      <div class="content">
        <div class="card" v-for="item in lists1" :key="item.title">
          <img :src="item.img">
          <span id="p1">{{item.title}}</span>
          <span id="p2">{{item.des}}</span>
        </div>
      </div>
    </div>
    <div class="block4">
      <p>产品介绍</p>
      <p>办理流程</p>
      <p>常见问题</p>
    </div>
    <div class="block5">
      <p id="p1">线上极速办理再也不用跑营业厅排队</p>
      <div class="card-panel">
        <div class="card" v-for="(item, index) in lists2" :key="index">
          {{item.time}}
        </div>
      </div>
      <div class="card-panel">
        <span class="title" v-for="item in lists2" :key="item.title">
          {{item.title}}
        </span>
      </div>
    </div>
    <div class="block6">
      <div class="card-panel">
        <div id="tip">
          <p>免排队</p>
          <p>免跑网点</p>
        </div>
        <div id="tip">
          <p>免办银行卡</p>
        </div>
        <div id="tip">
          <p>无需充值预存</p>
        </div>
      </div>
    </div>
    <div class="block7">
      <img src="@/assets/etc/img_process.png" alt="process">
      <img src="@/assets/etc/img_process.png" alt="process">
      <img src="@/assets/etc/img_process.png" alt="process">
    </div>
    <div class="block8">
      <p>0.1秒过高速，快人一步畅行无阻</p>
      <div class="content">
        <div class="card" v-for="item in lists4" :key="item.title">
          <img :src="item.img">
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="block9">
      <p id="p1">280元ETC设备</p>
      <p id="p2">280元ETC免费 ETC设备全国通用 终身免费维护、升级</p>
    </div>
    <div class="block10">
      <p id="p1">高速公路通行95折</p>
    </div>
    <div class="block11">
      <p>泰诺金融ETC十大特权秒杀传统ETC</p>
      <img src="@/assets/etc/img_form.png" alt="form">
    </div>
    <div class="block12">
      <p>尊享超值ETC黄金会员，你值得拥有</p>
      <div class="content">
        <div class="card">
          <span>全国高速</span>
          <span>通行95折</span>
        </div>
        <div class="card">
          <span>最高1000元</span>
          <span>京东礼品卡</span>
        </div>
      </div>
    </div>
    <div class="block13">
      <div class="title">
        <div class="line"></div>
        <span>常见问题</span>
        <div class="line"></div>
      </div>
      <p class="ques">
        <img src="@/assets/etc/icon_question.png" alt="question">
        已经办理过其他ETC，是否能办理？
      </p>
      <p class="answer">已经办理过其他ETC的车辆，需要在原渠道注销之前的ETC才能重新申请。</p>
    </div>
    <div class="block13">
      <p class="ques">
        <img src="@/assets/etc/icon_question.png" alt="question">
        其他问题？
      </p>
      <p class="answer">可微信搜索【泰诺汽车金融】咨询客服。</p>
    </div>
    <div class="bottom-button" @click="applyAction">立即开通</div>
    <van-dialog
      v-model="show"
      title="温馨提示"
    >
      <img style="width: 200px; height: 200px;" src="@/assets/etc/img_qrcode.png">
      <p>长按图片保存,添加客服微信</p>
      <p>为您开通ETC。</p>
    </van-dialog>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      checked: false,
      show: false,
      lists1: [
        {
          title: '280元设备',
          des: '免费赠送',
          img: require('@/assets/etc/icon_btn1.png')
        },
        {
          title: '95折',
          des: '全国高速通行',
          img: require('@/assets/etc/icon_btn2.png')
        },
        {
          title: '最高1000元',
          des: '京东礼品卡',
          img: require('@/assets/etc/icon_btn3.png')
        },
        {
          title: '免收费排队',
          des: '优先通行',
          img: require('@/assets/etc/icon_btn4.png')
        },
        {
          title: '账单提醒',
          des: '实时通知',
          img: require('@/assets/etc/icon_btn5.png')
        },
        {
          title: '电子发票',
          des: '查询下载',
          img: require('@/assets/etc/icon_btn6.png')
        }
      ],
      lists2: [
        {
          time: '30秒',
          title: '车牌检验支付'
        },
        {
          time: '1分钟',
          title: '上传资料'
        },
        {
          time: '1-3日',
          title: '定制设备'
        },
        {
          time: '1分钟',
          title: '安装激活'
        }
      ],
      lists3: [
        {
          title: '免排队免跑网点'
        },
        {
          title: '免办银行卡'
        },
        {
          title: '无需充值预存'
        }
      ],
      lists4: [
        {
          title: '不停车',
          img: require('@/assets/etc/icon_btn7.png')
        },
        {
          title: '不取卡',
          img: require('@/assets/etc/icon_btn8.png')
        },
        {
          title: '秒过高速',
          img: require('@/assets/etc/icon_btn9.png')
        }
      ]
    }
  },
  created () {
  },
  methods: {
    applyAction () {
      this.show = true
    }
  }
}
</script>
<style lang='scss' scoped>
.etc-member /deep/ {
  font-family: PingFangSC-Regular;
  background: #ffffff;
  padding-bottom: 70px;

  .van-dialog__content {
    text-align: center;
    padding: 10px;

    p {
      text-align: center;
      color: #525050;
      font-family: PingFangSC-Regular;
      font-size: 14px;
    }
  }

  .block1 {
    position: relative;
    background: #FAF8F3;
    padding: 10px 16px;
    color: #543D19;
    display: flex;
    align-items: center;
    font-size: 12px;

    img {
      width: 17px;
      height: 15px;
      margin-right: 6px;
    }

    #detail {
      position: absolute;
      right: 16px;
      top: 10px;
    }
  }
  .block2 {
    $imgHeight: calc(100vw * 8 / 15.0);
    height: $imgHeight;

    img {
      width: 100%;
      height: $imgHeight;
    }
  }
  .block3 {
    padding: 17px 0 10px;

    .title {
      color: #302F2F;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 16px;
        height: 16px;
        margin: 0 5px;
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;

      .card {
        width: 33.3%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 23px 0;

        img {
          width: 40px;
          height: 40px;
        }
        #p1 {
          font-size: 15px;
          color: #080808;
          line-height: 21px;
          margin-top: 13px;
        }
        #p2 {
          font-size: 12px;
          color: #747474;
          line-height: 17px;
        }
      }
    }
  }
  .block4 {
    background: #fbfbfb;
    padding: 17px;
    display: flex;

    p {
      display: inline-block;
      text-align: center;
      width: 33.3%;
    }
  }
  .block5 {
    padding: 14px 25px 22px;

    #p1 {
      font-family: PingFangSC-Medium;
      color: #3B301D;
      font-size: 18px;
      text-align: center;
    }

    .card-panel {
      display: flex;
      margin-top: 17px;

      .card {
        width: 25%;
        height: 28px;
        background: url(~@/assets/etc/icon_arrow.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 28px;
        color: #654810;
        font-size: 12px;
      }
      .title {
        width: 25%;
        color: #656565;
        font-size: 13px;
        text-align: center;
      }
    }
  }
  .block6 {
    padding: 0 14px;

    .card-panel {
      display: flex;
      justify-content: space-between;

      #tip {
        width: 33%;
        color: #746143;
        font-size: 14px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid rgba(169, 150, 106, 1);
        margin: 0 13px;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3px 5px;
      }
    }
  }
  .block7 {
    padding: 0 14px;
    display: flex;
    justify-content: space-between;
    padding: 19px 25px;

    $proWidth: 25vw;
    $proHeight: calc($proWidth * 30.0 / 17.0);
    img {
      width: $proWidth;
      height: 160px;
      box-shadow: 0px 3px 5px 0px rgba(191, 192, 197, 0.5);
    }
  }
  .block8 {
    padding: 10px 19px 18px;

    p {
      color: #3B301D;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      text-align: center;
    }

    .content {
      margin: 14px 0 0;
      background: #FAF8F3;
      border-radius: 2px;
      display: flex;
      justify-content: center;

      .card {
        width: 33.3%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;

        img {
          width: 36px;
          height: 36px;
        }

        span {
          margin-top: 8px;
          line-height: 24px;
          color: #543D19;
          font-size: 14px;
        }
      }
    }
  }
  .block9 {
    $imgHeight: calc(100vw * 196 / 375.0);
    height: $imgHeight;
    width: 100%;
    background: url(~@/assets/etc/img_etc.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding: 25px 0;

    #p1 {
      color: #0A0A0A;
      font-size: 20px;
      font-family: PingFangSC-Medium;
    }
    #p2 {
      color: #543D19;
      font-size: 14px;
      margin-top: 12px;
    }
  }
  .block10 {
    $imgHeight: calc(100vw * 196 / 375.0);
    height: $imgHeight;
    width: 100%;
    background: url(~@/assets/etc/img_car.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding: 25px 0;

    #p1 {
      color: #3B301D;
      font-size: 20px;
      font-family: PingFangSC-Medium;
    }
  }
  .block11 {
    padding: 25px 16px;
    text-align: center;

    p {
      color: #3B301D;
      font-size: 18px;
      font-family: PingFangSC-Medium;
    }

    $imgHeight: calc(100% * 240 / 346.0);
    img {
      margin-top: 10px;
      width: 100%;
      height: $imgHeight;
    }
  }
  .block12 {
    padding: 0px 16px 25px;
    text-align: center;

    p {
      color: #3B301D;
      font-size: 18px;
      font-family: PingFangSC-Medium;
    }

    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;

      .card {
        width: 47%;
        padding: 18px 0px;
        background: #FAF8F3;
        border-radius: 6px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #543D19;
        font-size: 14px;
      }
    }
  }
  .block13 {
    margin: 0 13px;
    padding-bottom: 17px;
    border-bottom: 1px dashed #D6D4D0;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC-Medium;
      color: #3B301D;
      font-size: 18px;

      span {
        margin: 0 9px;
      }

      .line {
        height: 1px;
        background: #EED8A1;
        width: 33%;
      }
    }
    .ques {
      color: #3B301D;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      display: flex;
      align-items: center;
      margin: 11px 0 7px;

      img {
        width: 14px;
        height: 14px;
        margin-right: 3px;
      }
    }
    .answer {
      margin-left: 18px;
      color: #131212;
      font-size: 12px;
    }
  }
  .bottom-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 49px;
    background: #EED8A1;
    color: #3B301D;
    font-family: PingFangSC-Medium;
    text-align: center;
    line-height: 49px;
    font-size: 17px;
  }
}
</style>
