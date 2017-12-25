define(['site/common/BasePage'], function (BasePage) {
    return BasePage.extend({
        init: function () {
            this._super();
            $(".czqh").hover(function(){
                $(".min").show()
            },function(){
                $(".min").hide()
            })
            this.bindButtonEvents();
            this.onPageLoad();
            this.getLotteryHistory(30);
            var success_time;
            this.setshuomingrigtht();
        },
        bindButtonEvents: function () {
            var _this = this;
            var code = $("#lotteryCode").attr("data-code");
            var type = $("#lotteryCode").attr("data-type");
            var sdataId = $("#lotteryCode").attr("data-id");
            $(".btn-navs li").click(function () {
                var ddId = $(this).attr("data-id");
                if (ddId=='shuju1'){
                    $("#zssearchDiv").show();
                }else{
                    $("#zssearchDiv").hide();
                }
                $(".search").css("display","block");
                $(".shuju").hide();
                $("#" + $(this).attr("data-id")).show();    //data() 方法向被选元素附加数据，或者从被选元素获取数据
                $(this).attr("class", "fff").siblings().removeClass(); //attr()设置或返回被选元素的属性和值 //siblings()返回被选元素的所有同级元素
                if($(this).data("id") == 'shuju1' || $(this).data("id") == 'shuju2' || $(this).data("id") == 'shuju3') {
                    _this.initHuatu($(this).data("contentid"));
                } else {
                    _this.clearHuatu();
                }
            });
            if (type == 'lhc' || type == 'keno' || type == 'pk10' && sdataId =='shuju3'){
                $("[data-id=shuju1]").trigger("click");
            }else {
            $("[data-id="+sdataId+"]").trigger("click");
            }
            $("#checkboxZhexian").change(function() { //当元素的值发生改变时，会发生 change 事件。该事件仅适用于文本域（text field），以及 textarea 和 select 元素。hange() 函数触发 change 事件，或规定当发生 change 事件时运行的函数。
                if($(this).is(":checked")) {
                    $(".zhexian").show();
                } else {
                    $(".zhexian").hide();
                }
            });

            $("#checkboxYlsj").change(function() {
                if($(this).is(":checked")) {
                    $(".transparent").addClass("not-transparent");
                } else {
                    $(".transparent").removeClass("not-transparent");
                }
            });

            $("#checkboxYlfc").change(function() {
                if($(this).is(":checked")) {
                    $(".ylfc").addClass("ylfc-bg");
                } else {
                    $(".ylfc").removeClass("ylfc-bg");
                }
            });
            $(".search-right .qi a").click(function () {
                $(".search-right .qi.xuan").removeClass("xuan");    //方法从被选元素移除一个或多个类.
                $(this).parent().addClass("xuan");   //addClass向被选元素添加一个或多个类 //parent)_返回被选元素的直接父元素。
                _this.getLotteryHistory($(this).attr("data-num"))
            });
            //悬停
            $(".czqh").hover(function(){
                $(".min").show()
            },function(){
                $(".min").hide()
            })

            //点击绘图工具
            $(".kuang1 .div").click(function(){
                $(".kuang1 .btn-box").show();
                $("#canvas,#canvas2").css("z-index","10000");
            })
            $(".btn-cos").click(function(){
                $(".kuang1 .btn-box").hide();
                $("#canvas,#canvas2").css("z-index","-10");
                clear_canvas()
            });

            $("#getljtzpage,.ljtzpage").click(function(){
                window.location.href = root + '/' + type + '/' + code + '/index.html';
            });
        },
        getLotteryHistory: function (cxsl) {
            var _this = this;
            var code = $("#lotteryCode").attr("data-code");
            if(code ==''){
                return;
            }
            $.ajax({
                url: root + '/lotteryTrendChart/getLotteryHistory.html',
                data: {"paging.pageSize": cxsl,"search.code":code},
                beforeSend: function () {
                    _this.showLoading();
                },
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        var ddata = eval(data);
                        ddata = ddata.reverse();
                        _this.zhexian(ddata);
                        _this.kxian(ddata);
                        _this.zhifang(ddata);
                        _this.zhexianSm(ddata);
                        _this.lssj(ddata);
                    } else {
                        console.log(name + ":odd is null");
                    }
                },
                complete: function () {
                    var dataId = $(".btn-navs li.fff").attr("data-id");
                    if(dataId == 'shuju1' || dataId == 'shuju2' || dataId == 'shuju3') {
                        _this.initHuatu($(".btn-navs li.fff").attr("data-contentid"));
                    }
                    $('div.loader').remove();
                }

            });
        },
        onPageLoad: function () {
            $('div.loader', parent.document).remove();
        },
        zhexian: function (data) {//折线
            var _this = this;
            var str = '';
            for(var i = 0; i < data.length; i++) {
                // qihao
                str += '<div class="cl-30 clean">';
                str += '<div class="left cl-31 number">' + data[i].expect + '</div>';
                str += '<div class="left cl-32 openCode">' + data[i].openCode + '</div>';
                var kjData = data[i].openCode.split(",");

                for(var j = 0; j < kjData.length; ++j) {
                    var haoma = kjData[j];
                    var bc1 = 0;
                    var Left = 0;

                    str += '<div class="cl-35 cl-36">';
                    if(i < data.length - 1) {
                        bc1 = (data[i].openCode.split(",")[j]) - (data[i + 1].openCode.split(",")[j]);
                    }

                    if(bc1 > 0) {
                        Left = (bc1) * (-20);
                    } else if(bc1 < 0) {
                        bc1 = -bc1;
                    }
                    for(var k = 0; k < 10; ++k) {
                        str += '<var class="' + (j % 2 == 0 ? 'bg-1' : 'bg-2') + ' i_' + j + "_" + k + '">';
                        if(k == haoma) {
                            str += '<i data-num="' + k + '" class="' + (j % 2 == 0 ? 'bg-4' : 'bg-5') + '">';
                            str += k;
                            str += '<canvas class="zhexian" id="canvas' + i + j + '" width="' + (bc1 + 1) * 20 + '" height="32px" style="z-index: 10; left:' + Left + 'px; display: none;"></canvas>';
                            str += '</i>';
                        } else {
                            str += '<i></i>';
                        }
                        str += '</var>';
                    }

                    str += '</div>';
                }
                str += '</div>';
            }
            $("#zhexianData").html(str); //html() 方法返回或设置被选元素的内容  //如果该方法未设置参数，则返回被选元素的当前内容

            for(var i = 0; i < data.length - 1; ++i) {
                for(var j = 0; j < 5; ++j) {
                    bc1 = Tools.parseInt(data[i].openCode.split(',')[j]) - Tools.parseInt(data[i + 1].openCode.split(',')[j]);
                    var Left = 0;
                    if(bc1 < 0) {
                        bc1 = -bc1;
                        Left = (bc1) * (-20);
                    }
                    var canvas = document.getElementById("canvas" + i + j);
                    var context = canvas.getContext("2d");
                    var bc1 = (data[i].openCode.split(',')[j]) - data[i + 1].openCode.split(',')[j];
                    if(bc1 < 0) {
                        context.moveTo(17, 13);
                        context.lineTo(canvas.width - 13, canvas.height - 8);
                    } else if(bc1 > 0) {
                        context.moveTo(canvas.width - 13, 13);
                        context.lineTo(8, canvas.height - 5);
                    } else {
                        context.moveTo(10, 12);
                        context.lineTo(10, 30);
                    }
                    if(j % 2 != 0) {
                        context.strokeStyle = "#cc0000";
                    }
                    context.stroke();
                }
            }
            if($("#checkboxZhexian").is(":checked")) {
                $(".zhexian").show();
            } else {
                $(".zhexian").hide();
            }

            // 遗漏
            _this.renderYilou(data);

            if($("#checkboxYlsj").is(":checked")) {
                $(".transparent").addClass("not-transparent");
            } else {
                $(".transparent").removeClass("not-transparent");
            }
        },
        kxian:  function(data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart1 = echarts.init(document.getElementById('main1'));

            // 指定图表的配置项和数据
            var subtext = $("#lotteryCode span").text();
            if(data.length > 0) {
                subtext += " 第" + data[0].expect + '期 ~ ' + "第" + data[data.length - 1].expect + '期';
            }
            var option = {
                title: {
                    text: $("#lotteryCode span").text()+'K线图',
                    subtext: subtext,
                    x: 'center'
                },
                xAxis: [{
                    axisLabel: {
                        rotate: -90,
                        interval: 0
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        var openCode = params[0].data.openCode;

                        var res = '';
                        res += '数值：' + Tools.parseInt(openCode.split(",")[0]);
                        res += '<br/>期数：' + params[0].name;
                        res += '<br/><font class="red">奖号：' + openCode + "</font>";
                        return res;
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '号码'
                }],
                grid: {
                    left: '1%',
                    right: '2%',
                    containLabel: true,
                    y2: 120
                },
                series: [{
                    symbol: 'circle', //图标形状
                    symbolSize: 6, //图标尺寸
                    type: 'line',
                    stack: '',
                    itemStyle: {
                        normal: {
                            color: "#6DB8FF",
                            lineStyle: {
                                color: '#6DB8FF'
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#000'
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            textStyle: {
                                fontSize: 20,
                                color: 'red'
                            }
                        }
                    },
                    data: [],
                }]
            };
            $.each(data, function(index, value) {
                option.xAxis[0].data.push(value.expect);
                option.series[0].data.push({
                    value: Tools.parseInt(value.openCode.split(",")[0]),
                    openCode: value.openCode
                });
            });

            myChart1.setOption(option);
        },
        zhifang : function(data) {
            var _this = this;
            // 基于准备好的dom，初始化echarts实例
            var myChart2 = echarts.init(document.getElementById('main2'));
            // 指定图表的配置项和数据
            var subtext = $("#lotteryCode span").text();
            var zfsl = Number($("#lotteryCode").attr("data-num"));
            var jjsl = Number($("#lotteryCode").attr("data-jjnum"));
            if(data.length > 0) {
                subtext += " 第" + data[0].expect + '期 ~ 第' + data[data.length - 1].expect + '期';
            }
            var option = {
                title: {
                    text: $("#lotteryCode span").text()+'直方图',    //主标题文本
                    subtext: subtext,     //副标题文本
                    x: 'center'
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    //show: true,   //default true
                    showDelay: 0, //显示延时，添加显示延时可以避免频繁切换
                    hideDelay: 50, //隐藏延时
                    transitionDuration: 0, //动画变换时长
                    backgroundColor: 'rgba(0,0,0,0.7)', //背景颜色（此时为默认色）
                    borderRadius: 8, //边框圆角
                    padding: 10, // [5, 10, 15, 20] 内边距
                    position: function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] + 10, p[1] - 10];
                    },
                    formatter: function(params, ticket, callback) {
                        var res = "基本号码" + ' : ' + params[0].name;
                        for(var i = 0, l = params.length; i < l; i++) {
                            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value; //鼠标悬浮显示的字符串内容
                        }
                        return res;
                    }
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: [],
                    name: '号码'
                },
                yAxis: [{
                    type: 'value',
                    splitNumber: 10,
                    triggerEvent: true,
                    name: '出现次数'
                }],
                series: [{
                    name: '出现次数',
                    type: 'bar',
                    data: [],
                    legendHoverLink: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#000'
                            }
                        }
                    },
                    markPoint: {
                        symbol: 'pin',
                        symbolSize: 50,
                        silent: true,
                        animation: true,
                    },
                    barWidth: '27px',
                    barGap: '10px',
                    //            barCategoryGap:'30%',
                    markArea: {
                        //              silent:true
                    },
                    itemStyle: {
                        normal: {
                            color: ['#6DB8FF']
                        }
                    }
                }]
            };
            var yData = [];
            _this.setzhifang(yData,option,data);
            option.series[0].data = yData;
            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option);
        },
        setzhifang: function (yData,option,data) {
            for(var i = 0; i < 10; ++i) {
                yData[i] = 0;
                option.xAxis.data.push(i);
            }
            $.each(data, function(index, value) {
                var openCode = value.openCode;
                var arr = openCode.split(",");
                for(var i = 0; i < arr.length; ++i) {
                    yData[Tools.parseInt(arr[i])]++;
                }
            });
        },
        lssj: function (data) {
            var _this = this;
            var str = '';
            $.each(data, function(index, value) {   //each() 方法为每个匹配元素规定要运行的函数
                str += '<tr>';
                str += '<td>' + value.expect + '</td>';
                str += '<td>' + _this.formatDateTime(new Date(value.openTime), "yyyy-MM-dd HH:mm:ss")+ '</td>';
                str += '<td>';
                var arr = value.openCode.split(",");
                for(var i = 0; i < arr.length; ++i) {
                    str += '<span class="bg-10">' + arr[i] + '</span>';
                }
                str += '</td>';
                str += '</tr>';
            });
            $("#shuju5 table tbody").html(str);
        },
        renderYilou: function(data) {
            // 遗漏统计
            var yilou = [];
            for(var i = 0; i < 5; ++i) {
                yilou[i] = [];
                for(var j = 0; j < 10; ++j) {
                    yilou[i][j] = {
                        cxCs: 0, // 出现次数
                        maxLcCs: 0, // 最大连出次数
                        ylArr: [] // 遗漏次数
                    };
                }
            }
            var datalength = data.length-1;
            for(var i =0; i < 5; ++i) {
                for(var j = 0; j < 10; ++j) {
                    var obj = yilou[i][j];

                    var tmpYlCs = 0; // 连续遗漏次数
                    var tmpLcCs = 0; // 连出次数
                    $.each(data, function(index, value) {
                        var openCodeArr = value.openCode.split(",");
                        var tmpValue = Tools.parseInt(openCodeArr[i]);

                        if(tmpValue != j) { // 遗漏
                            tmpYlCs++;
                            tmpLcCs = 0;
                            if (index==datalength){
                                obj.ylArr.push(tmpYlCs);
                            }
                        } else { // 中
                            obj.cxCs++;
                            tmpLcCs++;
                            if(tmpYlCs !=0){
                                obj.ylArr.push(tmpYlCs);
                            }
                            tmpYlCs = 0;
                        }
                        if(tmpLcCs > obj.maxLcCs) {
                            obj.maxLcCs = tmpLcCs;
                        }
                    });
                }
            }
            var str1 = '',
                str2 = '',
                str3 = '',
                str4 = '';
            for(var i = 0; i < 5; ++i) {
                for(var j = 0; j < 10; ++j) {
                    var obj = yilou[i][j];
                    // 出现次数
                    str1 += '<var><i>' + obj.cxCs + '</i></var>';

                    // 平均遗漏值&最大遗漏值
                    var maxYl = 0;
                    if(obj.ylArr.length > 0) {
                        var sumYl = 0;
                        $.each(obj.ylArr, function(index, value) {
                            sumYl += value;
                            maxYl = value > maxYl ? value : maxYl;
                        });
                        str2 += '<var><i>' + Math.floor(sumYl / obj.ylArr.length) + '</i></var>';
                        str3 += '<var><i>' + maxYl + '</i></var>';
                    } else {
                        str2 += '<var><i>0</i></var>';
                        str3 += '<var><i>0</i></var>';
                    }

                    // 最大连出值
                    str4 += '<var><i>' + obj.maxLcCs + '</i></var>';
                }
            }

            $("#cxzcs").html(str1);
            $("#pjylz").html(str2);
            $("#zdylz").html(str3);
            $("#zdlcz").html(str4);

            var str5 = '';
            for(var i = 0; i < 5; ++i) {
                for(var j = 0; j < 10; ++j) {
                    str5 += '<tr>';
                    if(j == 0) {
                        if(i == 0) {
                            str5 += '<td rowspan="10">万位</td>';
                        } else if(i == 1) {
                            str5 += '<td rowspan="10">千位</td>';
                        } else if(i == 2) {
                            str5 += '<td rowspan="10">百位</td>';
                        } else if(i == 3) {
                            str5 += '<td rowspan="10">十位</td>';
                        } else if(i == 4) {
                            str5 += '<td rowspan="10">个位</td>';
                        }
                    }

                    str5 += '<td>' + j + '</td>';

                    var obj = yilou[i][j];
                    // 出现次数
                    str5 += '<td>' + obj.cxCs + '</td>';

                    // 平均遗漏值&最大遗漏值
                    var maxYl = 0;
                    if(obj.ylArr.length > 0) {
                        var sumYl = 0;
                        $.each(obj.ylArr, function(index, value) {
                            sumYl += value;
                            maxYl = value > maxYl ? value : maxYl;
                        });
                        str5 += '<td>' + Math.floor(sumYl / obj.ylArr.length) + '</td>';
                        str5 += '<td>' + maxYl + '</td>';
                    } else {
                        str5 += '<td>0</td>';
                        str5 += '<td>0</td>';
                    }

                    // 最大连出值
                    str5 += '<td>' + obj.maxLcCs + '</td>';
                    str5 += '</tr>';
                }
            }
            $("#shuju4 table tbody").html(str5);

            // 遗漏数据
            for(var i = 0; i < 5; ++i) {
                for(var j = 0; j < 10; ++j) {
                    var tmpCount = 0;
                    var obj = $(".i_" + i + "_" + j + " i");
                    $(obj).each(function() {
                        if(typeof $(this).data('num') == 'undefined') {
                            tmpCount = tmpCount + 1;
                            $(this).html(tmpCount).addClass("transparent");
                        } else {
                            tmpCount = 0;
                        }
                    });
                }
            }

            // 遗漏分层
            for(var i = 0; i < 5; ++i) {
                for(var j = 0; j < 10; ++j) {
                    var tmpCount = 0;
                    var obj = $(".i_" + i + "_" + j + " i");
                    for(var k = Number($("ul.search-right div.xuan a").attr("data-num")) - 1; k >= 0; --k) {
                        var tmpObj = $(obj)[k];
                        if(typeof $(tmpObj).data('num') == 'undefined') {
                            $(tmpObj).parent().addClass("ylfc")
                        } else {
                            break;
                        }
                    }
                }
            }
        },
        clearHuatu: function() {
            $("#canvas,#canvas2").attr("height","0");
            $("#canvas,#canvas2").attr("width","0");
        },
        initHuatu: function(id) {
            //canvas高
            $("#canvas,#canvas2").attr("height",$("#"+id+"").height()+"px");
            $("#canvas,#canvas2").attr("width",$("#"+id+"").width()+"px");
            $("#canvas,#canvas2").css("top",$("#"+id+"").offset().top+"px");
            $("#canvas,#canvas2").css("left",$("#"+id+"").offset().left+"px");
        },
        goZst: function(url) {
            if ($('div.loader', document).length == 0) {
                var src = resRoot + '/images/tail-spin.svg';
                var content = '<div class="loader"><img src="' + src + '" width="30"><span>载入中...</span></div>';
                $('body',document).append(content);
            }
            var url = root + '/lotteryTrendChart/queryLotteryTrend/'+url;
            window.location.href = url;
        },
        zhexianSm : function(data) {  //折线--双面走势
        },
        getDataExpect: function() {
            var _this = this;
            var successTime = _this.success_time;
            // 30秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
            if (successTime && (new Date()).getTime() - successTime < 10 * 1000) {
                return;
            }
//        this.hall_expect[code] = $("#expect" + code).text();
            var code = $("#lotteryCode").attr("data-code");
            ajaxRequest({
                url: root + '/hall/handicap.html',
                data: {code: code},
                success: function (data) {
                    _this.success_time = new Date().getTime();
                    var json = data.handicap;
                    var obj = [];
                    $("#number").html(json.expect);
                    $("#openDate").html(_this.formatDateTime(new Date(json.openTime), "MM月dd日"));
                    var strNumber = json.expect;
                    var strNum;
                    var lotteryCode = json.code;
                    strNum = strNumber;
                    $("#tip").html( strNum + '期已开盘，距离下一期还有:');
                    $("#leftTime").attr("data-time", json.leftTime);
                    $("#tip").data("opening", true);

                },
                error: function (e) {
                    console.log("error");
                }
            });
        },
        setshuomingrigtht: function() {
            this.getDataExpect();
            var _this = this;
            setInterval(function () {
                _this.getDataExpect();
            }, 10000);

            setInterval(function() {
                var time = $("#leftTime").attr("data-time");
                if (isNaN(time) || time <= 0) {
                    $("#tip").html("正在开奖");
                    $("#leftTime").html("");
                    return;
                }
                --time;

                var str = '';
                var tmp = time;
                var hour = Math.floor(tmp / 60 / 60);
                if (hour > 0) {
                    str += hour + '时';
                }
                tmp = tmp - hour * 60 * 60;
                var minute = Math.floor(tmp / 60);
                str += minute + '分';
                tmp = tmp - minute * 60;
                var second = tmp;
                str += second + '秒';
                $("#leftTime").html(str);

                $("#leftTime").attr("data-time", time);
            }, 1000);
        }
    })
});