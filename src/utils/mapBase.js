import "ol/ol.css";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileImage from "ol/source/TileImage";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Polygon from "ol/geom/Polygon";
import olStyle from "ol/style/Style";
import olstyleIcon from "ol/style/Icon";
import olstyleText from "ol/style/Text";
import olstyleFill from "ol/style/Fill";
import olstyleStroke from "ol/style/Stroke";
import Draw from "ol/interaction/Draw";
import { get as getProjection } from "ol/proj";
import { getWidth, getTopLeft } from "ol/extent";
import View from "ol/View";
import Map from "ol/Map";
import BingMaps from "ol/source/BingMaps";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import XYZ from "ol/source/XYZ";
import TileArcGISRest from "ol/source/TileArcGISRest";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { defaults as defaultControls } from "ol/control";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { Message } from 'element-ui';
import _this from '../main'

var arcgisMaplayer = new TileLayer({
    source: new TileArcGISRest({
        params: { 'LAYERS': 'show:0' },
        projection: "EPSG:4326",
        url: "http://110.249.159.162:9997/arcgis/rest/services/NCGDJF/HCFW130000/MapServer"
    }),
    opacity: 0.3
});

export function LAYERMANAGER(target, center, zoom) {
    var that = this;
    var target = target || "map";
    var center = center || [116.0, 39.0];
    var zoom = zoom || 7;

    that.mapObject = null;

    //临时高亮图层
    that.lightVector = new VectorLayer({
        name: "高亮图层",
        source: new VectorSource(),
        zIndex: 10000,
        id: "lightVector",
        isBaseMap: false,
        style: function (feature, resolution) {
            var style = new olStyle({
                stroke: new olstyleStroke({
                    color: "#4384DB",
                    width: 5
                }),
                fill: new olstyleFill({
                    color: "rgba(67,132,219,0.7)"
                })
            });
            return style;
        }
    });

    that.changeBaseMap = function (type) {
        var layers = that.mapObject.getLayers();
        layers.forEach((item) => {
            var name = item.get('name');
            var isBaseMap = item.get("isBaseMap");
            if (isBaseMap) {
                if (type != 'wu') {
                    if (name) {
                        if (name.indexOf(type) > -1) {
                            item.setVisible(true)
                        } else {
                            item.setVisible(false)
                        }
                    }
                } else {
                    item.setVisible(false)
                }
            }
        })
    }

    var init = function () {
        //渲染地图
        var projection = getProjection("EPSG:4326");
        var projectionExtent = projection.getExtent();
        var size = getWidth(projectionExtent) / 256;
        var resolutions = new Array(18);
        var matrixIds = new Array(18);
        for (var z = 1; z < 19; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }
        var webKey = "0247d3e7f770fa1ee61333536cf67aca";//天地图key
        var wmtsUrl_1 = "http://t{0-7}.tianditu.com/vec_c/wmts?tk="; //矢量底图
        var wmtsUrl_2 = "http://t{0-7}.tianditu.com/cva_c/wmts?tk="; //矢量注记

        var wmtsUrl_3 = "http://t{0-7}.tianditu.com/img_c/wmts?tk="; //影像底图
        var wmtsUrl_4 = "http://t{0-7}.tianditu.com/cia_c/wmts?tk="; //影像注记

        //矢量底图
        var layerSL = new TileLayer({
            opacity: 0.7,
            visible: false,
            source: new WMTS({
                url: wmtsUrl_1 + webKey,
                layer: "vec",
                matrixSet: "c",
                format: "tiles",
                style: "default",
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                }),
                wrapX: true,
            }),
            name: 'sl',
            zIndex: 0,
            isBaseMap: true
        });
        //矢量注记
        var layerSLZJ = new TileLayer({
            opacity: 0.7,
            visible: false,
            source: new WMTS({
                url: wmtsUrl_2 + webKey,
                layer: "cva",
                matrixSet: "c",
                format: "tiles",
                style: "default",
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                }),
                wrapX: true,
            }),
            name: "sl-zj",
            zIndex: 0,
            isBaseMap: true
        });
        //影像底图
        var layerYX = new TileLayer({
            opacity: 0.7,
            visible: false,
            source: new WMTS({
                url: wmtsUrl_3 + webKey,
                layer: "img",
                matrixSet: "c",
                format: "tiles",
                style: "default",
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                }),
                wrapX: true,
            }),
            maxZoom: 18,
            name: "yx",
            zIndex: 0,
            isBaseMap: true
        });
        //影像注记
        var layerYXZJ = new TileLayer({
            opacity: 0.7,
            visible: false,
            source: new WMTS({
                url: wmtsUrl_4 + webKey,
                layer: "cia",
                matrixSet: "c",
                format: "tiles",
                style: "default",
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                }),
                wrapX: true,
            }),
            name: "yx-zj",
            zIndex: 0,
            isBaseMap: true
        });
        //bing底图
        var bingLayer = new TileLayer({
            visible: true,
            preload: Infinity,
            source: new BingMaps({
                key: "AkBoMD2PPqIDj9380ct3_su980LyR7KlazwIHQ9mpjxf_CSjBcAunwx14l9wGQ6x",
                imagerySet: "Aerial",
                // use maxZoom 19 to see stretched tiles instead of the BingMaps
                // "no photos at this zoom level" tiles
                maxZoom: 19,
            }),
        });
        //高德底图
        var gaodeLayer = new TileLayer({
            source: new XYZ({
                url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}",
            }),
        });
        //mapbox底图
        var mapboxLayer = new TileLayer({
            source: new XYZ({
                url: "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1Ijoid2FuZ2hhaGExIiwiYSI6ImNqeHUycXF5ZDEweDQzYnBiOTcwZGoxMHAifQ.eCGuiA6erHJ7ew-Fkc7dRA",
            }),
            minZoom: 18,
            maxZoom: 25,
            name: 'yx-mapbox',
            zIndex: 0,
            isBaseMap: true
        });

        var mapView = new View({
            center: center,
            projection: projection,
            zoom: zoom,
            maxZoom: 22
        });

        var mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: "EPSG:4326",
            className: "custom-mouse-position",
            target: document.getElementById("mouse-position"),
            undefinesHTML: "&nbsp;",
        });

        that.mapObject = new Map({
            controls: defaultControls().extend([mousePositionControl]),
            layers: [
                mapboxLayer,
                layerSL,
                layerSLZJ,
                layerYX,
                layerYXZJ,
                that.lightVector,//高亮图层
            ],
            target: target,
            view: mapView,
        });

        var mapType = _this.$store.getters.mapType;
        that.changeBaseMap(mapType);
    }();



    that.drawGraphical = function (type, drawend) {
        //实例化绘制对象并添加到地图容器中
        var draw = new Draw({
            source: new VectorSource(),
            type: type,
        });

        document.getElementById('undo').addEventListener('click', function () {
            draw.removeLastPoint();
        });

        that.mapObject.addInteraction(draw);
        draw.on("drawend", function (evt) {
            that.mapObject.removeInteraction(draw);
            return drawend(evt);
        }, this);
    }
}

export function NULAYER(paramObj) {
    var that = this;
    // 属性
    that.layer = null; //openLayers图层
    that.zIndex = paramObj.zIndex || 0;
    that.zoom = paramObj.zoom || 12;
    that.isBaseMap = paramObj.isBaseMap || false; //是否是底图
    that.isView = true; //当前比例尺下是否显示
    that.visible = paramObj.visible || true; //图层是否显示
    that.opacity = paramObj.opacity || 1; //图层透明度
    that.layerId = paramObj.layerId; //对应地图服务的id *
    that.layerName = paramObj.layerName || ""; //对应地图服务的id *
    that.layerUrl = paramObj.layerUrl; //服务地址
    that.layers = paramObj.layers || "0";//要加载服务的图层
    that.layerType = paramObj.layerType || 'MapServer'; //地图服务类型 WMS/WMTS/MapServer
    that.isTileL = paramObj.isTileL || false;
    that.layerStyle = paramObj.layerStyle || null;
    //方法
    that.setOpacity = function (opacity) {
        that.opacity = opacity;
        that.layer.setOpacity(opacity);
    }; //设置地图图片透明度
    that.setVisible = function (visible) { //改变图层显示隐藏
        if (!that.isView) {//在当前比例尺下不显示
            return;
        }
        that.visible = visible;
        that.layer.setVisible(visible);
    };
    that.setView = function (isView) { //不改变that.visible的值
        //设置当前比例尺下 显示隐藏
        that.isView = isView;
        if (isView) {//如果当前比例尺下应该显示
            if (that.visible) {//同时之前是显示状态
                that.layer.setVisible(true);//设置为显示
            }
        } else {//如果当前比例尺下不应该显示
            that.layer.setVisible(false);
        }
    };
    //设置图层排序
    that.setZIndex = function (zIndex) {
        that.zIndex = zIndex;
        that.layer.zIndex = zIndex;
    };
    that.createLayer = function () { //创建openLayers图层
        if (that.layerType == 'MapServer') {
            var EPSG = "EPSG:4326";
            if (that.isTileL) {//如果是切片
                that.layer = new TileLayer({
                    source: new XYZ({
                        params: { 'LAYERS': that.layers },
                        url: that.layerUrl + '/tile/{z}/{y}/{x}',
                        projection: EPSG
                    }),
                    zIndex: that.zIndex,
                    isBaseMap: that.isBaseMap,
                    name: that.layerName,
                    id: that.layerId
                });
            } else {
                that.layer = new TileLayer({
                    source: new TileArcGISRest({
                        params: { 'LAYERS': 'show:' + that.layers },
                        projection: EPSG,
                        url: that.layerUrl
                    }),
                    zIndex: that.zIndex,
                    isBaseMap: that.isBaseMap,
                    name: that.layerName,
                    id: that.layerId
                });
            }
        } else if (that.layerType == 'XYZ') {//XYZ;
            that.layer = new TileLayer({
                source: new XYZ({
                    url: that.layerUrl
                }),
                zIndex: that.zIndex,
                isBaseMap: that.isBaseMap,
                id: that.layerId,
                name: that.layerName
            });
        } else if (that.layerType == 'vectorLayer') {//XYZ;
            that.layer = new VectorLayer({
                source: new VectorSource({ features: [], wrapX: false }),
                zIndex: that.zIndex,
                isBaseMap: that.isBaseMap,
                id: that.layerId,
                name: that.layerName,
                style: that.layerStyle
            })
        }
    };
    var init = function () {
        //初始化方法 判断必传参数
        if (!paramObj.layerId) {
            Message({ message: "新建图层必须传入‘layerId’", type: "error" });
            return;
        }
        if (that.layerType != "vectorLayer" && !paramObj.layerUrl) {
            Message({ message: "新建图层必须传入‘mapUrl’", type: "error" });
            return;
        }

        //初始化完成后创建图层
        that.createLayer();

        if (paramObj.visible === false) {
            that.visible = false;
            that.setVisible(false);
        }

        if (paramObj.opacity) {
            that.opacity = paramObj.opacity;
            that.setOpacity(that.opacity);
        }
    }();

    return that.layer;
}