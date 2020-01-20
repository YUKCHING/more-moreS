<template>
  <div class="id-auth">
    <div class="des">
      <p>仅用于审核。</p>
      <p>请核对身份是被信息，若有错误请更正。</p>
    </div>
    <van-cell-group style="width: 100%;">
      <van-field
        v-model="info.name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="info.id"
        label="身份证号"
        placeholder="请输入身份证号"
      />
    </van-cell-group>
    <van-uploader
      v-model="idFile"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      info: {
        name: '',
        id: ''
      },
      idFile: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.id-auth {
  .des {
    background: #f3f3f3;
    padding: 14px 20px;
    color: #5d5c5c;
    font-size: 13px;
  }
}
</style>
