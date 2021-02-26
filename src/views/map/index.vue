<template>
  <div id="map" ref="rootmap">
    <el-button-group class="tbBtns">
      <el-button type="primary" size="small" @click="addZD()"
        >新增宗地</el-button
      >
      <el-button type="primary" size="small">删除宗地</el-button>
      <el-button type="primary" size="small">编辑宗地</el-button>
      <el-button type="primary" size="small" id="undo">撤回</el-button>
    </el-button-group>

    <mapTab />
    <div id="mouse-position"></div>
  </div>
</template>
<script>
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import TileImage from 'ol/source/TileImage'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import olStyle from 'ol/style/Style'
import olstyleIcon from 'ol/style/Icon'
import olstyleText from 'ol/style/Text'
import olstyleFill from 'ol/style/Fill'
import olstyleStroke from 'ol/style/Stroke'

import { LAYERMANAGER, NULAYER } from '@/utils/mapBase'

import mapTab from './mapTab'

export default {
  name: 'OlMap',
  components: {
    mapTab,
  },
  data() {
    return {
      layerManager: null,
      mapObject: null,
      view: null,
      vectorSource: null,
      ylVector: null, //院落
      activeFeature: null,
      activityTool: 'default',
      activityData: {},
    }
  },
  mounted() {
    this.layerManager = new LAYERMANAGER()
    this.mapObject = this.layerManager.mapObject
    this.view = this.mapObject.getView()
    var that = this
    //县界
    var xianjie = new NULAYER({
      layerId: 'xianjie',
      layerUrl:
        'http://110.249.159.162:9997/arcgis/rest/services/NCGDJF/HCFW130000/MapServer',
      layerName: 'xianjie',
      opacity: 0.3,
      zIndex: 1,
    })
    this.mapObject.addLayer(xianjie)

    var map = this.mapObject

    map.on('singleclick', (e) => {
      // console.log(' 没有要素被选中.')
      that.activeFeature = null
      that.activityData = {}
      var clickRes = []
      var isclickGL = false
      that.layerManager.lightVector.getSource().clear()

      if (that.activityTool == 'addZD') {
        // that.layerManager.lightVector.getSource().clear()
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
          var keys = that.activeFeature.getKeys()
          keys.forEach(function (v, i) {
            that.activityData[v] = that.activeFeature.get(v)
          })

          that.layerManager.lightVector.getSource().addFeature(feature)
        }
      } else if (clickRes.length > 1) {
        this.$message.warning('当前点击点附近有多个元素')
        console.log(JSON.stringify(clickRes))
      }
    })
    this.initZDLayer()
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
    initZDLayer() {
      // TODO 宗地图斑
      var TBColors = {
        WTB_SCOLOR: '#ccb0c0', //伪图斑
        WTB_FCOLOR: 'rgba(204, 176, 192,0.7)',

        YL_YDC_SCOLOR: '#177BD0', //宗地已调查
        YL_YZC_SCOLOR: '#15ca8f', //宗地已暂存
        // YL_YDC_FCOLOR:"#ffcc33",
        YL_WDC_SCOLOR: '#ffcc33', //宗地未调查
        // YL_WDC_FCOLOR:"#ffcc33",
        YS_SCOLOR: '#ff0000', //疑似图斑
        CUN_SCOLOR: '#000000', //村界
        CUN_FCOLOR: 'rgba(0,0,0,.1)', //村界
      }

      this.ylVector = new NULAYER({
        layerId: 'ylVector',
        layerName: '宗地',
        layerType: 'vectorLayer',
        layerStyle: function (feature, resolution) {
          var isYDC = feature.get('filed3') //是否已经调查过
          var strokeStyle = {
            color: TBColors.YL_WDC_SCOLOR,
            width: 5,
          }

          if (isYDC == '已调查') {
            strokeStyle = {
              color: TBColors.YL_YDC_SCOLOR,
              width: 5,
            }
          } else if (isYDC == '已暂存') {
            strokeStyle = {
              color: TBColors.YL_YZC_SCOLOR,
              width: 5,
            }
          }

          //判断是否是伪图斑
          var isWeiTB = feature.get('filed4')
          if (isWeiTB == '伪图斑') {
            strokeStyle = {
              color: TBColors.WTB_SCOLOR,
              width: 5,
            }
          }

          var style = new olStyle({
            stroke: new olstyleStroke(strokeStyle),
            text: new olstyleText({
              textAlign: 'center', //位置
              textBaseline: 'middle', //基准线
              font: 'normal 14px 微软雅黑', //文字样式
              text: feature.get('id') || '新增宗地', //文本内容
              fill: new olstyleFill({
                color: '#aa3300',
              }),
            }),
          })
          return style
        },
        zIndex: 113,
      })
      this.mapObject.addLayer(this.ylVector)
    },
    addZD() {
      var that = this
      that.activityTool = 'addZD'
      this.layerManager.drawGraphical('Polygon', function (evt) {
        console.log(evt)
        var feature = evt.feature //当前新增完成的feature;
        feature.set('filed3', '未调查')
        that.ylVector.getSource().addFeature(feature)
        that.activityTool = 'default'
        // that.layerManager.lightVector.getSource().addFeature(feature)
      })
    },
  },
}
</script>
<style>
#map {
  height: calc(100vh - 50px);
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
</style>