<template>
  <div class="side">
    <div class="item-bar" v-for="(item, index) in menu" :key="item.path" @click="clickItem(item)">
      <p class="content"
        :style="{
          color: isSelect(item.path) ? '#ffffff' : '#CBBDE2',
          fontWeight: isSelect(item.path) ? '540' : '100'
        }" >
        {{index + 1}}.
        {{item.name}}
      </p>
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
      return this.$route.path.slice(8) === value
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
  padding: 20px 0px 20px 20px;

  .item-bar {
    display: flex;
    align-items: center;

    .content {
      width: 100%;
      color: #CBBDE2;
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
      background-image: linear-gradient(140deg, transparent 50%, #FFC33D 90%, #E8A038);
      background-size: 200% 100%;
      background-position: 90% 0%;
      animation: showBg .5s ease;
      font-style: italic;
    }
    @keyframes showBg {
      from { background-position: 0% 0%; }
      to { background-position: 90% 0%; }
    }
  }
}
</style>
