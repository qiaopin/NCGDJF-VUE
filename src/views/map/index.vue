<template>
  <div id="map" ref="rootmap">
    <el-button-group class="tbBtns">
      <el-button type="primary" size="small" @click="addZD()"
        >新增宗地</el-button
      >
      <el-button type="primary" size="small" @click="removeZD()"
        >删除宗地</el-button
      >
      <el-button type="primary" size="small" @click="modifyZD()"
        >编辑宗地</el-button
      >
      <el-button type="primary" size="small" id="undo">撤回</el-button>
    </el-button-group>

    <mapTab />
    <tcgl ref="tcglRef"></tcgl>
    <leftTable class="leftTableBox" />
    <div id="mouse-position"></div>
  </div>
</template>
<script>
import { LAYERMANAGER, NULAYER } from '@/utils/mapBase'
import mapTab from './mapTab'
import tcgl from './tcgl'
import leftTable from './leftTable'
import { queryCurrentPolygonByxzqdm } from '@/api/TaskManagerController'

export default {
  name: 'OlMap',
  components: {
    mapTab,
    tcgl,
    leftTable,
  },
  data() {
    return {
      layerManager: null,
      mapObject: null,
      lightVector: null, //高亮图层
      ylVector: null, //院落
      activeFeature: null, //当前操作元素
      activityTool: 'default',
    }
  },
  mounted() {
    this.layerManager = new LAYERMANAGER()
    this.mapObject = this.layerManager.mapObject
    var that = this
    that.lightVector = that.layerManager.lightVector

    var nlayers = this.layerManager.nuLayers
    var tcArr = []
    for (let key in nlayers) {
      let val = nlayers[key]
      val.isShow = true
      tcArr.push(val)
      this.$refs.tcglRef.getTCArr(tcArr)
    }

    //县界图层
    var xianjie = new NULAYER(nlayers.xianjie)
    this.mapObject.addLayer(xianjie)
    //宗地图层
    this.ylVector = new NULAYER(nlayers.ylVector)
    this.mapObject.addLayer(this.ylVector)

    //测试加载wkt数据
    var wkt =
      'POLYGON ((115.259376 38.03966, 115.259378 38.039622, 115.259382 38.03957,  115.259552 38.03958, 115.259547 38.039632,  115.259376 38.03966))'
    var testF = this.layerManager.getFeatureByWKT(wkt)
    this.ylVector.getSource().addFeature(testF)

    var map = this.mapObject
    map.on('singleclick', (e) => {
      // console.log(' 没有要素被选中.')
      that.activeFeature = null
      var clickRes = []
      var isclickGL = false
      that.lightVector.getSource().clear()

      if (that.activityTool == 'addZD') {
        // that.lightVector.getSource().clear()
        return false
      }

      map.forEachFeatureAtPixel(
        e.pixel,
        (feature, layer) => {
          // console.log(' 一个要素被选中了!')
          if (!feature || !layer) {
            return false
          }
          var layerName = layer.get('name')
          console.log(layerName)
          if (layerName == '高亮图层') {
            isclickGL = true //点击了高亮图层
          } else {
            clickRes.push({
              layerName: layerName,
              feature: feature,
            })
          }
        },
        {
          hitTolerance: 20,
          // hitTolerance: 1,
        }
      )

      //如果点击了高亮图层就将高亮图层清空
      if (isclickGL || clickRes.length == 0) {
        isclickGL = false
        return false
      }

      console.log(clickRes)
      if (clickRes.length == 1) {
        var layerName = clickRes[0].layerName
        var feature = clickRes[0].feature
        if (layerName == '宗地') {
          that.activeFeature = feature
          // var keys = that.activeFeature.getKeys()
          // keys.forEach(function (v, i) {
          //   that.activityData[v] = that.activeFeature.get(v)
          // })

          that.lightVector.getSource().addFeature(feature)
        }
      } else if (clickRes.length > 1) {
        this.$message.warning('当前点击点附近有多个元素')
        console.log(JSON.stringify(clickRes))
      }
    })

    var postData = {
      xzqdm: '130827210001',
      pageIndex: 1,
      pageSize: 20,
      numberBs: '1',
      village: '',
      id: '',
    }
    queryCurrentPolygonByxzqdm(postData)
      .then((Response) => {
        console.log(Response)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    getMapType() {
      return this.$store.getters.mapType //需要监听的数据
    },
  },
  watch: {
    getMapType(newVal, oldVal) {
      //监听切换底图
      if (this.layerManager) {
        this.layerManager.changeBaseMap(newVal)
      }
    },
  },
  methods: {
    //新增宗地
    addZD() {
      var that = this
      that.activityTool = 'addZD'
      this.layerManager.drawGraphical('Polygon', function (evt) {
        console.log(evt)
        var feature = evt.feature //当前新增完成的feature;
        feature.set('filed3', '未调查')
        that.ylVector.getSource().addFeature(feature)
        that.activityTool = 'default'
        that.lightVector.getSource().clear()
      })
    },
    //删除宗地
    removeZD() {
      var that = this
      if (!that.activeFeature) {
        this.$message('请先选择要删除的宗地')
        return false
      }
      that.ylVector.getSource().removeFeature(that.activeFeature)
      that.lightVector.getSource().clear()
      that.activeFeature = null
    },
    //编辑宗地
    modifyZD() {
      var that = this
      that.layerManager.modifyFeature(
        that.ylVector.getSource(),
        function (geometry) {
          console.log(geometry)
        }
      )
    },
    toggleLayerById(layerId, visible) {
      console.log(layerId, visible)
      var layer = this.layerManager.getLayerByLayerId(layerId)
      try {
        layer.setVisible(visible)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style>
#map {
  height: calc(100vh - 50px);
  width: calc(100% - 500px);
  margin-left: 500px;
}
#mouse-position {
  text-align: center;
  position: absolute;
  right: 3px;
  bottom: 5px;
  width: 200px;
  height: 20px;
  /* 将z-index设置为显示在地图上层 */
  z-index: 2000;
}
/* 显示鼠标信息的自定义样式设置 */
.custom-mouse-position {
  color: black;
  font-size: 16px;
  font-family: 'Arial';
}

.tbBtns {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 11;
}

.leftTableBox {
  position: absolute;
  z-index: 11;
  top: 0;
  left: 0;
  height: 100%;
  width: 500px;
  background: #fff;
}
</style>