<template>
  <div class="mapTab">
    <div class="tabItem" v-for="(item, index) in mapTabArr" :key="index">
      <img :src="item.imgSrc" alt="" />
      <div class="title">{{ item.title }}</div>
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
}
</script>

<style lang="scss" scoped>
.mapTab {
  position: absolute;
  right: 15px;
  bottom: 50px;
  width: mapTabWidth;
  z-index: 12;
  border: 1px solid #aaa;

  .title {
    position: absolute;
    bottom: 0px;
    background: #aaa;
    padding: 2px 0;
    width: 100%;
    left: 0;
  }
}
</style>