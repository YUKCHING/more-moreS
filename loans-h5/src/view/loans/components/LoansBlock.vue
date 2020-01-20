<template>
  <div class="block"
       @click="showDetail">
    <div class='top'>
      <span class='title'>{{ data.product_name }}</span>
      <span class='chara'>{{ data.product_label }}</span>
    </div>
    <div class="middle">
      <div>
        <p style="color: #FE3525;">{{ data.monthly_rate }}</p>
        <p class="name">综合月利润</p>
      </div>
      <div>
        <p>{{ data.amount }}</p>
        <p class="name">可贷额度</p>
      </div>
    </div>
    <div class="bottom">
      <span v-for="item in data.feature"
            :key="item">{{item}}</span>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.block {
  word-spacing: -0.5em;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  border-radius: 2rpx;
  display: flex;
  flex-direction: column;
  margin-bottom: 15rpx;
  padding: 5rpx 5rpx;
  cursor: pointer;
  font-family: PingFangSC-Regular;

  .top {
    flex-direction: row;
    justify-content: center;
    margin-left: 5rpx;

    .title {
      font-size: 15rpx;
      display: inline-block;
      margin-right: 5rpx;
    }

    .chara {
      display: inline-block;
      margin-left: 5rpx;
      padding: 2rpx 5rpx;
      font-size: 8rpx;
      color: #ff9900;
      background: #fef2e0;
      border-radius: 8rpx;
    }
  }

  .middle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10rpx 0;
    height: 100%;
    font-size: 18rpx;

    div {
      width: 48%;
      display: inline-block;
      text-align: left;
      color: #000000;

      .name {
        font-size: 13rpx;
        opacity: 0.42;
        margin-top: 5rpx;
      }
    }
  }

  .bottom {
    border-top: 0.1px solid #f7f7f7;
    padding-top: 5rpx;

    span {
      font-size: 13rpx;
      color: #9e9e9e;
      display: inline-block;
      margin-left: 5rpx;
      font-family: PingFangSC-Regular;
    }
  }
}
</style>
<script>
export default {
  props: ['data'],
  methods: {
    showDetail () {
      this.$emit('click', this.data.id)
    }
  }
}
</script>
