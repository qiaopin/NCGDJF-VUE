<template>
  <div class="tcBox">
    <div class="tabItem" v-for="(item, index) in tcArr" :key="index">
      {{ item.title }}
      <el-switch v-model="item.isShow" @change="toggleTC($event, index)">
      </el-switch>
    </div>
  </div>
</template>

<script>
// import store from '@/store'

export default {
  data() {
    return {
      tcArr: [
        {
          title: '宗地图层',
          isShow: true,
        },
        {
          title: '房屋图层',
          isShow: true,
        },
        {
          title: '疑似图斑',
          isShow: true,
        },
      ],
    }
  },
  mounted() {},
  watch: {},
  methods: {
    toggleTC: function ($event, index) {
      console.log(index, $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.tcBox {
  position: absolute;
  left: 50px;
  top: 15px;
  z-index: 12;
  width: 130px;
  border: 1px solid #eee;

  .tabItem {
    margin-bottom: 5px;

    .el-switch {
      float: right;
    }
  }
}
</style>