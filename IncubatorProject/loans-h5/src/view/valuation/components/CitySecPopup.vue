<template>
  <div class="popup">
    <div class="top" @click="$emit('back')">
      <img src="@/assets/icon/icon-back.png" alt="">
      <span>收起</span>
    </div>
    <div class="content">
      <p class="province">{{info.name}}</p>
      <div class="cell-block">
        <van-cell
          v-for="item in info.children"
          :key="item.id"
          :title="item.name"
          @click="selectCityItem(item)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      require: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    selectCityItem (item) {
      this.$emit('select', item)
    }
  }
}
</script>
<style lang='scss' scoped>
.popup {
  height: 100%;

  .content {
    height: calc(100% - 42px);
    overflow: auto;

    .province {
      background: #F2F3F5;
      padding: 6px 11px;
      left: 158px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 11px;
      font-family: PingFangSC-Medium;
    }

    .cell-block {
      height: calc(100% - 29px);
      overflow: auto;

    }
  }

  .top {
    display: flex;
    align-items: center;
    padding: 12px 10px;
    font-size: 13px;
    color: rgba(0, 0, 0, .85);

    img {
      width: 16px;
      height: 16px;
      transform: rotate(180deg);
      margin-right: 6px;
    }
  }
}
</style>
