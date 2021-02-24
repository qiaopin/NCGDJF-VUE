import "ol/ol.css";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileImage from "ol/source/TileImage";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import olStyle from "ol/style/Style";
import olstyleIcon from "ol/style/Icon";
import olstyleText from "ol/style/Text";
import olstyleFill from "ol/style/Fill";
import olstyleStroke from "ol/style/Stroke";
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

var arcgisMaplayer = new TileLayer({
    source: new TileArcGISRest({
        params: { 'LAYERS': 'show:0' },
        projection: "EPSG:4326",
        url: "http://110.249.159.162:9997/arcgis/rest/services/NCGDJF/HCFW130000/MapServer"
    }),
    opacity: 0.3
});

export function initMap(target) {
    var target = target || "map";
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
        name: 'sl'
    });
    //矢量注记
    var layerSLZJ = new TileLayer({
        opacity: 0.7,
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
        name: "sl-zj"
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
        name: "yx"
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
        name: "yx-zj"
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
        name: 'yx-mapbox'
    });

    var mapView = new View({
        center: [116.0, 39.0],
        projection: projection,
        zoom: 7,
        maxZoom: 22
    });

    var mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: "EPSG:4326",
        className: "custom-mouse-position",
        target: document.getElementById("mouse-position"),
        undefinesHTML: "&nbsp;",
    });

    var baseMapArr = [
        mapboxLayer,
        layerSL,
        layerSLZJ,
        layerYX,
        layerYXZJ,
    ]

    var mapObject = new Map({
        controls: defaultControls().extend([mousePositionControl]),
        layers: baseMapArr,
        target: target,
        view: mapView,
    });

    return mapObject;
}

//切换底图
export function changeBaseMap(mapObject, type) {
    var layers = mapObject.getLayers()
    layers.forEach((item) => {
        var name = item.get('name')
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
    })
}