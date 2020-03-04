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
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 5px 5px;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  box-shadow: 0px 3px 5px 0px rgba(191, 192, 197, 0.5);

  .top {
    flex-direction: row;
    justify-content: center;
    margin-left: 5px;

    .title {
      font-size: 15px;
      display: inline-block;
      margin-right: 5px;
    }

    .chara {
      display: inline-block;
      margin-left: 5px;
      padding: 2px 5px;
      font-size: 8px;
      color: #ff9900;
      background: #fef2e0;
      border-radius: 8px;
    }
  }

  .middle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 0;
    height: 100%;
    font-size: 18px;

    div {
      width: 48%;
      display: inline-block;
      text-align: left;
      color: #000000;

      .name {
        font-size: 13px;
        opacity: 0.42;
        margin-top: 5px;
      }
    }
  }

  .bottom {
    border-top: 0.1px solid #f7f7f7;
    padding-top: 5px;

    span {
      font-size: 13px;
      color: #9e9e9e;
      display: inline-block;
      margin-left: 5px;
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
