<template>
  <div class="success">
    <img src="@/assets/imgs/chenggong.png"
         alt="success">
    <span class="tak1">提交成功!</span>
    <span class="tak2">
      我们的工作人员将会在24小时内与您联系,请保持手机畅通,谢谢!
    </span>
  </div>
</template>
<style lang='scss' scoped>
.success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 37px;

  img {
    width: 50px;
    height: 50px;
    margin-bottom: 37px;
  }
  span {
    font-family: PingFangSC-Regular;
    display: inline-block;
    color: #000;
  }
  .tak1 {
    font-size: 16px;
    margin-bottom: 25px;
  }
  .tak2 {
    font-size: 13px;
    width: 185px;
  }
}
</style>
