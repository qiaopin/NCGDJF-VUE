<template>
  <div id="map" ref="rootmap">
    <div id="mouse-position"></div>
    <mapTab />
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

import { initMap, changeBaseMap } from '@/utils/mapBase'

import mapTab from './mapTab'

export default {
  name: 'OlMap',
  components: {
    mapTab,
  },
  data() {
    return {
      mapObject: null,
      view: null,
      vectorSource: null,
    }
  },
  mounted() {
    //渲染地图
    this.mapObject = initMap()
    this.view = this.mapObject.getView()

    var vector = new VectorLayer({
      source: new VectorSource({ features: [], wrapX: false }),
      zIndex: 11,
    })

    this.mapObject.addLayer(vector)

    this.vectorSource = vector.getSource()

    // this.addMarker('hheheh', 116, 39)
    var mapType = this.$store.getters.mapType
    console.log(mapType)
  },
  computed: {
    getMapType() {
      return this.$store.getters.mapType //需要监听的数据
    },
  },
  watch: {
    getMapType(newVal, oldVal) {
      //监听切换底图
      changeBaseMap(this.mapObject, newVal)
    },
  },
  methods: {
    /*
     *标注点
     */
    addMarker(username, lon, lat) {
      var newFeature = new Feature({
        geometry: new Point([lon, lat]),
        name: username,
      })
      //设置样式
      newFeature.setStyle(createLabelStyle(newFeature))
      //将当前要素加入矢量数据源
      this.vectorSource.addFeature(newFeature)
      //创建标注的样式
      function createLabelStyle(fe) {
        //返回一个样式
        return new olStyle({
          image: new olstyleIcon({
            anchor: [0.5, 70],
            anchorOrigin: 'top-right',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offsetOrigin: 'top-right',
            opacity: 0.75,
            scale: 0.5,
            src: require('../../assets/ncgdjfAppSJZ.png'),
          }),
          text: new olstyleText({
            textAlign: 'center',
            textBaseline: 'middle',
            font: 'normal 20px 微软雅黑',
            text: fe.get('name'),
            fill: new olstyleFill({ color: '#000' }),
            scale: 0.7,
            stroke: new olstyleStroke({ color: 'pink', width: 2 }),
          }),
        })
      }
    },
  },
}
</script>
<style>
#map {
  height: calc(100vh - 50px);
}
#mouse-position {
  float: right;
  position: absolute;
  right: 3px;
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
</style>