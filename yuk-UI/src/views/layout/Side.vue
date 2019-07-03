<template>
  <div class="side">
    <p class="item-bar" v-for="(item, index) in menu" :key="item.path" @click="clickItem(item)">
      {{index + 1}}、
      {{item.name}}
    </p>
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
  methods: {
    clickItem (item) {
      console.log(item)
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
  padding: 20px;

  .item-bar {
    color: #fff;
    line-height: 26px;
    font-size: 16px;
    cursor: pointer;
  }
  .item-bar:hover {
    text-decoration: underline;
  }
}
</style>
