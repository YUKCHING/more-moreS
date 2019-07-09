<template>
  <div class="side">
    <div class="item-bar" v-for="(item, index) in menu" :key="item.path" @click="clickItem(item)">
      <p class="content" :style="{background: isSelect(item.path) ? 'red' : ''}" >
        {{index + 1}}.
        {{item.name}}
      </p>
      <div class="selected"></div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    menu () {
      return this.$router.options.routes.filter(ele => {
        return ele.children
      })[0].children
    }
  },
  created () {

  },
  methods: {
    isSelect (value) {
      return this.$route.path.indexOf(value) !== -1
    },
    clickItem (item) {
      this.$router.push('/layout/' + item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.side {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: #00838f;
  padding: 20px 10px 20px 20px;

  .item-bar {
    display: flex;
    align-items: center;

    .content {
      width: 90%;
      color: #fff;
      line-height: 26px;
      font-size: 16px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 0;
    }
    .content:hover {
      text-decoration: underline;
    }
    .selected {
      width: 10px;
      height: 100%;
      background: blue;
      display: inline-block;
    }
  }
}
</style>
