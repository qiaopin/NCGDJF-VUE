<template>
  <div class="mapTab">
    <div
      :class="item.type == activeType ? 'active tabItem' : 'tabItem'"
      v-for="(item, index) in mapTabArr"
      :key="index"
      @click="changeBaseMap(item.type)"
    >
      <img :src="item.imgSrc" alt="" />
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeType: 'sl',
      mapTabArr: [
        {
          imgSrc: require('../../../assets/images/mapTab/ditu.jpg'),
          title: '矢量图',
          type: 'sl',
        },
        {
          imgSrc: require('../../../assets/images/mapTab/yingxiang.jpg'),
          title: '影像图',
          type: 'yx',
        },
        {
          imgSrc: require('../../../assets/images/mapTab/wu.jpg'),
          title: '无底图',
          type: 'wu',
        },
      ],
    }
  },
  methods: {
    changeBaseMap(type) {
      this.activeType = type
    },
  },
}
</script>

<style lang="scss" scoped>
.mapTab {
  position: absolute;
  right: 15px;
  bottom: 50px;
  width: mapTabWidth;
  z-index: 12;
  // border: 1px solid #aaa;

  .tabItem {
    position: relative;
    margin-bottom: 8px;
    border: 1px solid #eee;
    cursor: pointer;
  }

  .title {
    position: absolute;
    bottom: 0px;
    background: #aaa;
    padding: 2px 0;
    width: 100%;
    left: 0;
    text-align: center;
    font-size: 14px;
  }

  .active .title {
    background: #83a1ff;
    color: #fff;
  }
}
</style>