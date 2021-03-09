<template>
  <div class="tcBox">
    <div
      class="tabItem"
      v-show="tcArr.length > 0"
      v-for="(item, index) in tcArr"
      :key="index"
    >
      {{ item.layerName }}
      <el-switch
        v-model="item.isShow"
        @change="toggleTC($event, index)"
      ></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tcArr: [],
    }
  },
  mounted() {},
  watch: {},
  methods: {
    getTCArr: function (ptcArr) {
      this.tcArr = JSON.parse(JSON.stringify(ptcArr))
      //   ptcArr.forEach((element, index) => {
      //     this.tcArr[index].layerName = element.layerName
      //     this.tcArr[index].isShow = element.isShow
      //   })
    },
    toggleTC: function ($event, index) {
      var layerId = this.tcArr[index].layerId
      this.$parent.toggleLayerById(layerId, $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.tcBox {
  position: absolute;
  right: 15px;
  top: 55px;
  z-index: 12;
  width: 130px;
  //   border: 1px solid #eee;

  .tabItem {
    margin-bottom: 5px;

    .el-switch {
      float: right;
    }
  }
}
</style>