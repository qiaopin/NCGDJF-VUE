/**
 * 显示底图、违法图斑、县界
 */
var ljfBase = null;
var slider = null;
var layuiform = null;
var layuitable = null;
var layerManager = null;
var Industryresjson = [];//专题图层数组
var sourceClues = null;//采集的面信息
var _mapObject, _mapView, _wktParser = null;
var smc = "";//市名称
var xmc = "";//县名称

var ylVector, fwVector, ystbVector;//宗地，房屋，疑似图斑
var cunPointVector;//村界定位点
var pointLayer;//点图层
var pointYLtb = [];//点数据总
var pointFWtb = [];//点数据总
var pointYStb = [];//点数据总
var pointYDCYLtb = [];//已经调查的宗地图斑
var pointYDCFWtb = [];//已经调查的房屋图斑
var pointYDCYStb = [];//已经调查的疑似图斑
var searchList = []; //查询行政村
var yltb = [], fwtb = [], ystb = [];

var pointYDCWtb = [];//判定为伪图斑

var locationGLFeatureID = null;//定位高亮显示的图斑id

var village1 = '';
var PLID = '';

//图层颜色管理
var TBColors = {
    WTB_SCOLOR: "#ccb0c0",//伪图斑
    WTB_FCOLOR: "rgba(204, 176, 192,0.7)",

    YL_YDC_SCOLOR: "#177BD0",//宗地已调查
    YL_YZC_SCOLOR: "#15ca8f",//宗地已暂存
    // YL_YDC_FCOLOR:"#ffcc33",
    YL_WDC_SCOLOR: "#ffcc33",//宗地未调查
    // YL_WDC_FCOLOR:"#ffcc33",
    YS_SCOLOR: "#ff0000",//疑似图斑
    CUN_SCOLOR: "#000000",//村界
    CUN_FCOLOR: "rgba(0,0,0,.1)",//村界
};

function showPointFeatures() {
    var features = [];
    pointYLtb = pointYLtb || [];
    pointFWtb = pointFWtb || [];
    pointYStb = pointYStb || [];
    var tbArr = pointYLtb.concat(pointFWtb, pointYStb);

    $.each(tbArr, function (i, v) {
        if (v.xy) {

            if (v.xy.indexOf('"coordinates":[[[') > -1) {
                v.xy = v.xy.split('"coordinates":[[[')[1];
            }
            var x = parseFloat(v.xy.split(",")[0]);
            var y = parseFloat(v.xy.split(",")[1]);
            if ((x > 100) && (y > 30)) {
                var feature = new ol.Feature(new ol.geom.Point([x, y]));
                $.each(v, function (s, k) {
                    feature.set(s, k);
                });
                features.push(feature);
            } else {
                console.log("获取用户图斑点错误：" + v.id + " " + v.xy);
            }
        } else {
            console.log("获取用户图斑点错误：" + v.id + " " + v.xy);
        }
    });

    pointLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: features,
        }),
        style: function (feature, resolution) {
            style = [new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 2,
                    fill: new ol.style.Fill({
                        color: "#ff0000"
                    })
                })
            })];
            return style;
        }
    });

    _mapObject.addLayer(pointLayer);
}

//初始化 下发图斑层
var initdlfx = function () {
    // TODO 定位行政村坐标点图层
    cunPointVector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: []
        }),
        style: function (feature, resolution) {
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({
                        // color: "#ff0000"
                        color: "rgba(255, 0, 0,0.3)"
                    })
                }),
                text: new ol.style.Text({
                    textAlign: 'center', //位置
                    textBaseline: 'middle', //基准线
                    font: 'normal 14px 微软雅黑', //文字样式
                    // text: feature.get("code"), //文本内容
                    fill: new ol.style.Fill({
                        color: '#aa3300'
                    }), //文本填充样式（即文字颜色）
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    })
                })
            });
            return style;
        },
        zIndex: 2,
        name: "村界定位点"
    });
    _mapObject.addLayer(cunPointVector);

    initCj();

    // TODO 宗地图斑
    ylVector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: []
        }),
        style: function (feature, resolution) {
            var isYDC = feature.get("filed3");//是否已经调查过
            var strokeStyle = {
                color: TBColors.YL_WDC_SCOLOR,
                width: 5
            };

            if (isYDC == "已调查") {
                strokeStyle = {
                    color: TBColors.YL_YDC_SCOLOR,
                    width: 5
                };
            } else if (isYDC == "已暂存") {
                strokeStyle = {
                    color: TBColors.YL_YZC_SCOLOR,
                    width: 5
                };
            }

            //判断是否是伪图斑
            var isWeiTB = feature.get("filed4");
            if (isWeiTB == "伪图斑" || isWeiTB == "碎图斑" || isWeiTB == "危房图斑" || isWeiTB == "增减挂钩" || isWeiTB == "生态移民") {
                strokeStyle = {
                    color: TBColors.WTB_SCOLOR,
                    width: 5
                };
            }

            var style = new ol.style.Style({
                stroke: new ol.style.Stroke(strokeStyle),
                text: new ol.style.Text({
                    textAlign: 'center', //位置
                    textBaseline: 'middle', //基准线
                    font: 'normal 14px 微软雅黑', //文字样式
                    text: feature.get("id"), //文本内容
                    fill: new ol.style.Fill({
                        color: '#aa3300'
                    }), //文本填充样式（即文字颜色）
                    // stroke: new ol.style.Stroke({
                    //     color: '#ffcc33',
                    //     width: 0.5
                    // })
                })
            });
            return style;
        },
        zIndex: 113,
        name: "宗地"
    });
    _mapObject.addLayer(ylVector);

    // var snap = new ol.interaction.Snap({
    //     source: ylVector.getSource()
    // });
    // _mapObject.addInteraction(snap);//开启捕捉点

    // TODO 房屋图斑
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    var img = new Image();
    img.src = '../../images/xiexian50.png';
    img.onload = function () {
        var pattern = ctx.createPattern(img, 'repeat');

        fwVector = new ol.layer.Vector({
            source: new ol.source.Vector(),
            zIndex: 111,
            name: "房屋",
            style: function (feature, resolution) {
                //判断是否是伪图斑
                var isWeiTB = feature.get("filed4");
                if (isWeiTB == "伪图斑" || isWeiTB == "碎图斑" || isWeiTB == "危房图斑" || isWeiTB == "增减挂钩" || isWeiTB == "生态移民") {
                    strokeStyle = {
                        color: TBColors.WTB_SCOLOR,
                        width: 5
                    };
                    var style = new ol.style.Style({
                        stroke: new ol.style.Stroke(strokeStyle),
                    });
                    return style;
                } else {
                    var style = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "#1e80c6",
                            lineDash: [5],
                            width: 2
                        }),
                        fill: new ol.style.Fill({
                            color: pattern
                        })
                    });
                    return style;
                }
            },
        });
        _mapObject.addLayer(fwVector);
    };

    //TODO 疑似图斑
    ystbVector = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: function (feature, resolution) {
            var fillColor = "rgba(0, 0, 0,0)";
            var strokeStyle = {
                color: TBColors.YS_SCOLOR,
                width: 3
            };
            //判断是否是伪图斑
            var isWeiTB = feature.get("filed4");
            if (isWeiTB == "伪图斑" || isWeiTB == "碎图斑" || isWeiTB == "危房图斑" || isWeiTB == "增减挂钩" || isWeiTB == "生态移民") {
                strokeStyle = {
                    color: TBColors.WTB_SCOLOR,
                    width: 5
                };
            }
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: fillColor
                }),
                stroke: new ol.style.Stroke(strokeStyle),
            });
        },
        zIndex: 112,
        name: "疑似图斑"
    });
    _mapObject.addLayer(ystbVector);
};

//获取所有下发的基础图斑----总体情况使用
function GetBaseXFFeatures(success) {
    parent.layer.loadIndex = parent.layer.load(0, { shade: 0.1 });
    jsonAjax(config.QUERYPOLYGONBYUSER, {
        data: { userId: userInfo.ID }
    }, function (res) {
        if (res.resDate.length == 0) {
            parent.layer.close(parent.layer.loadIndex);
            return false;
        }
        yltb = res.resDate.confirmPolygon;
        ystb = res.resDate.doubtPolygon;
        fwtb = [];
        $.each(yltb, function (i, v) {
            fwtb = fwtb.concat(v.houseList);
        });
        _mapObject.render();
        parent.layer.close(parent.layer.loadIndex);

        if (window.LightVector) {
            window.LightVector.getSource().clear();
        }
        return success();
    });
}


//获取所有用户图斑---点
function GetBasePintFeatures(success) {
    parent.layer.loadIndex = parent.layer.load(0, { shade: 0.1 });
    var postPageSize = pageSize;
    if (numberBs == '5') {
        postPageSize = 10000;
    }
    jsonAjax(config.QUERYCURRENTPOLYGONBYXZQDM, {
        data: {
            xzqdm: userInfo.XZQDM,
            pageIndex: pageIndex,
            pageSize: postPageSize,
            numberBs: numberBs,
            village: searchVillage,
            id: searchId,
        }
    }, function (res) {
        searchId = '';
        if (res.resDate.length == 0) {
            parent.layer.close(parent.layer.loadIndex);
            return false;
        }

        var resStr = JSON.stringify(res.resDate);
        if (resStr.length < 30) {
            if (resStr.split(":")[1] != "[]}" || resStr.split(":")[0] == "{\"无核查区数据\"") {
                parent.layer.alert(resStr.split(":")[0]);
                parent.layer.close(parent.layer.loadIndex);
                return false;
            }
        }

        count = res.basePage.totalCount;
        var cunPointObj = res.listDate;
        var cunFeatures = [];
        cunPointVector.getSource().clear();
        $.each(cunPointObj, function (i, v) {
            var point = v.zb.split(",");
            var feature = new ol.Feature(new ol.geom.Point(point));
            feature.set("code", v.gbCode);
            cunFeatures.push(feature);
        });
        cunPointVector.getSource().addFeatures(cunFeatures);

        pointYLtb = [];
        pointYDCYLtb = [];
        pointYDCWtb = [];//已调查伪图斑
        if (res.resDate.polygonList) {
            $.each(res.resDate.polygonList, function (i, v) {
                v["layerName"] = "宗地";
                if ((v["filed4"]) == "伪图斑") {
                    pointYDCWtb.push(v);
                }
                // else {
                if (v["filed3"] == "已调查") {
                    pointYDCYLtb.push(v);
                }
                pointYLtb.push(v);
                // }
            });
        }

        pointYStb = [];
        pointYDCYStb = [];
        if (res.resDate.gdjfDoubtPolygonList) {
            $.each(res.resDate.gdjfDoubtPolygonList, function (i, v) {
                v["layerName"] = "疑似图斑";
                if ((v["filed4"]) == "伪图斑") {
                    pointYDCWtb.push(v);
                }
                // else {
                if ((v["filed3"] == "已调查")) {
                    pointYDCYStb.push(v);
                }
                pointYStb.push(v)

                // }
            });
        }

        pointFWtb = [];
        pointYDCFWtb = [];
        // if (res.resDate.housePolygonList) {
        if (res.resDate.polygonHouseList) {
            $.each(res.resDate.polygonHouseList, function (i, v) {
                v["layerName"] = "房屋";
                if ((v["filed4"]) == "伪图斑") {
                    pointYDCWtb.push(v);
                }
                // else {
                if (v["filed3"] == "已调查") {
                    pointYDCFWtb.push(v);
                }
                pointFWtb.push(v)

                // }
            });
            try {
                _mapObject.render();
            } catch (e) {

            }
        }
        parent.layer.close(parent.layer.loadIndex);

        if (window.LightVector) {
            window.LightVector.getSource().clear();
        }

        showPointFeatures();
        // pageLimit = $(".layui-laypage-limits select").val() || pageLimit;

        if (numberBs == "1") {
            $('#village1').show();
            $('#PLID').show();
            $('#CGID').hide();
            showXFTable(pointYStb);
        } else if (numberBs == "2") {
            $('#village1').show();
            $('#PLID').show();
            $('#CGID').hide();
            showXFTable(pointYLtb);
        } else if (numberBs == "3") {
            $('#village1').show();
            $('#PLID').show();
            $('#CGID').hide();
            showXFTable(pointYDCYStb);
        } else if (numberBs == "4") {
            $('#village1').show();
            $('#PLID').show();
            $('#CGID').hide();
            showXFTable(pointYDCYLtb);
        } else if (numberBs == "5") {
            $('#village1').show();
            $('#PLID').show();
            $('#CGID').hide();
            showXFTable(pointYDCWtb);
        }
        // else if (numberBs == "6") {
        // 	$('#village1').hide();
        // 	$('#CGID').show();
        //           showXFTable(pointYDCWtb);
        //       }

        if (success) {
            return success();
        }
    });
}


function SearchCGID() {
    let CGID = $('#CGID').val();
    let mapResponseVo = [];
    jsonAjax(config.FINDCOORDINATES, {
        data: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            id: CGID,
            xzqdm: userInfo.XZQDM
        }
    }
        , function (res) {
            if (res.returnMap.returnMSG == '查询成功') {
                showXFTable(res.resDate.mapResponseVo)
            }
            else {
                showXFTable(mapResponseVo)
            }
        }
        , function (err) {
            layer.alert('调用接口失败')
        }
    )
}

function EachList(point) {
    $.each(point, function (i, v) {
        var village = v["village"];
        var id = v["id"];
        village1 = $('#village1').val();
        PLID = $('#PLID').val();
        if (village1 == '' && PLID !== '') {
            if (Boolean(id.match(PLID))) {
                searchList.push(v);
            }
        } else if (PLID == '' && village1 !== '') {
            if (Boolean(village.match(village1))) {
                searchList.push(v);
            }
        } else if (village1 == '' && PLID == '') {
            searchList = point
        } else if (village1 !== '' && PLID !== '') {
            if (Boolean(id.match(PLID)) && Boolean(village.match(village1))) {
                searchList.push(v);
            }
        }
    })
}

//获取所有用户图斑--面
function GetBaseFeatures(success) {
    parent.layer.loadIndex = parent.layer.load(0, { shade: 0.1 });
    // jsonAjax(config.QUERYCURRENTPOLYGONBYUSER, {
    jsonAjax(config.QUERYCURRENTPOLYGONBYXZQDM, {
        data: { xzqdm: userInfo.XZQDM }
        // jsonAjax(config.QUERYPOLYGONBYRELITYCODE, {
        //     data: {code: userInfo.ID}
    }, function (res) {
        if (res.resDate.length == 0) {
            parent.layer.close(parent.layer.loadIndex);
            return false;
        }

        yltb = res.resDate.polygonList;
        ystb = res.resDate.gdjfDoubtPolygonList;
        fwtb = res.resDate.housePolygonList;
        _mapObject.render();
        parent.layer.close(parent.layer.loadIndex);

        if (window.LightVector) {
            window.LightVector.getSource().clear();
        }
        return success();
    });
}

//在指定图层上显示图斑数据
function showFeaturesOnVector(tbDataArr, tbVector) {
    // tbVector.getSource().clear();
    $.each(tbDataArr, function (i, v) {
        tbDataArr[i].layerName = tbVector.get("name");
        if (v.coordinate) {
            try {
                var coor = JSON.parse(v.coordinate).coordinates;
                var type = JSON.parse(v.coordinate).type;
                if (v.coordinate.indexOf('"coordinates":[[[[') > -1) {
                    type = "MultiPolygon"
                }

                if (type == "Polygon") {
                    var feature = new ol.Feature({
                        geometry: new ol.geom.Polygon(coor)
                    });
                } else if (type == "MultiPolygon") {
                    var feature = new ol.Feature({
                        geometry: new ol.geom.MultiPolygon(coor)
                    });
                }
                if (feature) {
                    $.each(v, function (s, k) {
                        feature.set(s, k);
                    });
                    tbVector.getSource().addFeature(feature);
                    if (locationGLFeatureID) {
                        if (feature.get("id") == locationGLFeatureID) {
                            activeFeature = feature;
                            activityData = v;
                            locationGLFeatureID = null;
                            lightPolygonByFeature(_mapObject, feature);
                            _mapObject.getView().fit(feature.getExtent(), _mapObject.getSize());
                        }
                    }
                }
            } catch (e) {

            }
        }
    });
    _mapObject.render();
}