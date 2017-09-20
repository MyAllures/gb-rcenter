/**
 * 管理首页-首页js
 */
define(['common/BasePage', 'highcharts', 'exporting','inspinia'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=mainFrameForm]";
            this._super(this.formSelector);
            this.checkBrowser();
            this.syncUserTime();
        },
        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            var _this = this;
            //运营概况数据按钮交替效果
            $(_this.formSelector).on('click', 'ul.type-tab-wrap li', function (e) {
                var current = $('ul.type-tab-wrap').children(".current");
                $(current).removeClass("current");
                $(e.currentTarget).addClass("current");
                var dataType = $(e.currentTarget).attr("dataType");
                _this.loadCurve(dataType);
            });
            $(_this.formSelector).on('click', 'div.game-data-con dt', function (e) {
                var gameTypeInput = $(e.currentTarget).find("input");
                var gameType = $(gameTypeInput).val();
                $("#selectedGameType").val(gameType);
                _this.loadGameSurvey();
            });

        },
        onPageLoad: function () {
            this._super();
            this.loadOperationalOverview();
            this.loadGameSurvey();
            this.loadRecentData();
            this.loadActivityAndSiteInfo();
            this.loadActivityInfo();
            $('div.preloader').hide();
        },
        /**
         * 加载最近24小时数据
         */
        loadRecentData: function () {
            $('#recentData').load(root + "/home/recentData.html");
        },
        /**
         * 加载运营概况
         */
        loadOperationalOverview: function (e, option) {
            var startTime = $("input[name='search.startTime']").val();
            var url = root + "/home/operationalOverview.html";
            if (option != null) {
                var flag = option.flag;//前一天、后一天标识
                if (flag != null) {
                    url = root + "/home/operationalOverview.html?search.startTime=" + startTime + "&flag=" + flag;
                } else if (statisticsTime != null) {
                    url = root + "/home/operationalOverview.html?search.startTime=" + startTime;
                }
            }
            var _this = this;
            $('#operationalOverview').load(url, function (response, status, xhr) {
                _this.initDatePick($(".daterangepickers"));
                _this.loadCurve(1);
            })
        },
        /**
         * 加载游戏概况
         */
        loadGameSurvey: function (e, option) {
            var _this = this;
            var data = {};
            var gameType = $("#selectedGameType").val();
            var statisticsTime = $("#statisticsTime").val();
            if (gameType || statisticsTime) {
                data = {
                    "search.apiTypeId": gameType,
                    "search.statisticsTime": statisticsTime
                };
            }
            if (option) {
                data["beforeOrAfter"] = option.beforeOrAfter;
            }
            var url = root + "/home/gameSurvey.html";
            window.top.topPage.ajax({
                data: data,
                url: url,
                success: function (data) {
                    $("#gameSurvey").html(data);
                    _this.initDatePick($(".daterangepickers"));
                    _this.loadPie();
                    _this.loadBar();
                },
                error: function (data) {
                    _this.initDatePick($(".daterangepickers"));
                    _this.loadPie();
                    _this.loadBar();
                }
            });
        },
        loadPie: function () {
            var playerProportion = $("#playerProportion").val();
            var dataConfig = eval('(' + playerProportion + ')');
            var data = [];
            var label = [];
            var totalCount = 0;
            for (var dataKey in dataConfig) {
                if (dataKey) {
                    label.push(dataKey);
                    data.push(parseInt(dataConfig[dataKey]));
                    totalCount += parseInt(dataConfig[dataKey]);
                }
            }
            var dataArray = [];
            for (var i = 0; i < data.length; i++) {
                var config = {
                    y: data[i] / totalCount,
                    name: label[i]
                };
                dataArray.push(config);
            }
            if (dataArray.length == 0) {
                return;
            }
            $('#pie-container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: window.top.message.home_auto['玩家占比']
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: window.top.message.home_auto['玩家占比'],
                    colorByPoint: true,
                    data: dataArray
                }]
            });
        },
        loadBar: function () {
            var gameProfitLoss = $("#gameProfitLoss").val();
            var dataConfig = eval('(' + gameProfitLoss + ')');
            var categoriesData = [];
            categoriesData.push($("#selectedGameTypeName").val());
            var seriesData = [];
            for (var dataKey in dataConfig) {
                if (dataKey) {
                    var dataArray = [];
                    dataArray.push(parseInt(dataConfig[dataKey]));
                    var config = {
                        name: dataKey,
                        data: dataArray
                    };
                    seriesData.push(config);
                }
            }
            if (seriesData.length == 0) {
                return;
            }
            Highcharts.setOptions({
                global: {
                    useUTC: false //关闭UTC
                },
                credits: { enabled: false },//关闭highcharts右下角标识
                exporting:{ enabled:false }//关闭highcharts左上角标识
            });
            $('#bar-container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: window.top.message.home_auto['盈亏对比']
                },
                xAxis: {
                    categories: categoriesData
                },
                yAxis: {
                    title: {
                        text: window.top.message.home_auto['交易盈亏']
                    }
                },
                credits: {
                    enabled: false
                },
                series: seriesData
            });
        },
        /**
         *加载进行中活动和站点信息
         */
        loadActivityAndSiteInfo: function () {
            $('#activityAndSiteInfo').load(root + "/home/activityAndSiteInfo.html");
        },
        loadCurve: function (dataType) {
            var curveStartDay = $("#curveStartDay").val();
            var day = new Date(curveStartDay);
            var startYear = day.getFullYear();
            var startMonth = day.getMonth();//实际月份需要加1,即7代表8月份
            var startDay = day.getDate();
            var operationProfileJson = $("#operationProfileJson").val();
            var dataConfig = eval('(' + operationProfileJson + ')');
            var title;
            var yAxisTitle;
            var seriesName;
            var curveDate = [];
            var operationTotalMapJson = $("#operationTotalMap").val();
            var operationTotalMap = jQuery.parseJSON(operationTotalMapJson);
            for (var dataKey in dataConfig) {
                if (dataKey) {
                    var operationProfile = dataConfig[dataKey];
                    switch (parseInt(dataType)) {
                        case 1:
                            title = "近30天累计新增玩家数：" + operationTotalMap['newPlayer'];
                            yAxisTitle = window.top.message.home_auto['人数'];
                            seriesName = window.top.message.home_auto['人数'];
                            if (operationProfile['newPlayer'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['newPlayer']);
                            }
                            break;
                        case 2:
                            title = "近30天新增代理数：" + operationTotalMap['newAgent'];
                            yAxisTitle = window.top.message.home_auto['人数'];
                            seriesName = window.top.message.home_auto['人数'];
                            if (operationProfile['newAgent'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['newAgent']);
                            }
                            break;
                        case 3:
                            title = "近30天存款金额：" + operationTotalMap['depositAmount'];
                            yAxisTitle = window.top.message.home_auto['存款金额'];
                            seriesName = window.top.message.home_auto['存款金额'];
                            if (operationProfile['depositAmount'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['depositAmount']);
                            }
                            break;
                        case 4:
                            title = "近30天取款金额：" + operationTotalMap['withdrawalAmount'];
                            yAxisTitle = window.top.message.home_auto['取款金额'];
                            seriesName = window.top.message.home_auto['取款金额'];
                            if (operationProfile['withdrawalAmount'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['withdrawalAmount']);
                            }
                            break;
                        case 5:
                            title = "近30天有效交易量：" + operationTotalMap['effectiveTransactionVolume'];
                            yAxisTitle = window.top.message.home_auto['有效交易量'];
                            seriesName = window.top.message.home_auto['有效交易量'];
                            if (operationProfile['effectiveTransactionVolume'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['effectiveTransactionVolume']);
                            }
                            break;
                        case 6:
                            title = "近30天盈亏金额：" + operationTotalMap['transactionProfitLoss'];
                            yAxisTitle = window.top.message.home_auto['盈亏金额'];
                            seriesName = window.top.message.home_auto['盈亏金额'];
                            if (operationProfile['transactionProfitLoss'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['transactionProfitLoss']);
                            }
                            break;
                        default:
                            title = "近30天新增玩家：" + operationTotalMap['newPlayer'];
                            if (operationProfile['newPlayer'] == null) {
                                curveDate.push(0);
                            } else {
                                curveDate.push(operationProfile['newPlayer']);
                            }
                            break;
                    }
                }
            }
            if (curveDate.length == 0) {
                return;
            }
            Highcharts.setOptions({
                global: {
                    useUTC: false //关闭UTC
                },
                credits: { enabled: false },//关闭highcharts右下角标识
                exporting:{ enabled:false }//关闭highcharts左上角标识
            });
            $('#curve-chart').highcharts({
                chart: {
                    zoomType: 'x',
                    spacingRight: 20
                },
                title: {text: title},
                xAxis: {
                    type: 'datetime',
                    maxZoom: 14 * 24 * 3600000, // fourteen days
                    title: {text: null},
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%m-%d', this.value);//更改X轴时间格式
                        }
                    }
                },
                yAxis: {
                    title: {text: yAxisTitle}
                },
                tooltip: {
                    shared: true,
                    xDateFormat: '%Y-%m-%d'//更改鼠标移上去显示的时间格式
                },
                legend: {enabled: false},
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        lineWidth: 1,
                        marker: {enabled: false},
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: seriesName,
                    pointInterval: 24 * 3600 * 1000,
                    pointStart: Date.UTC(startYear, startMonth, startDay),
                    data: curveDate
                }]
            });
        },
        /**
         *加载进行中活动和站点信息
         */
        loadActivityInfo: function () {
            //$('#activityAndSiteInfo').load(root + "/home/activityAndSiteInfo.html");
            $('#activityInfo').load(root + "/home/activityInfo.html");
        },
        /**
         * 新增菜单，回调刷新菜单
         * @param e
         * @param option
         */
        refreshMenu: function (e, option) {
            if (e.returnValue == true) {
                $("#page-content").load(root + "/home/homeIndex.html")
            }
        },

        checkBrowser:function(){
            var ie678 = !$.support.leadingWhitespac;
            // IE678, false 是，true 否
            if (!ie678) {
                this.showBrowserTip();
                
            }
            // webkit内核浏览器，包括safari, chrome，opera等
            // var webkit = /webkit/.test(navigator.userAgent.toLowerCase());
            // mozilla内核浏览器，如火狐
            // var firefox = /firefox/.test(navigator.userAgent.toLowerCase());
        },
        showBrowserTip: function(){
            var bol = $.cookie(this.cookieKey);
            if(bol !== 'true'){
                $(".hint-box").show();
            }
        },
        /**
         * 根据用户的时区时间变化页面时间
         */
        userTime: function () {
            var _this=this;
            if(_this.dateTimeFromat!=undefined) {
                var date = new Date();
                //date.setTime(parseInt($("#index-clock").attr("time"))+1000);
                //$("#index-clock").attr("time",date.getTime());
                //var date$go = new Date('2015-08-31')
                $("#index-clock").text(window.top.topPage.formatToMyDateTime(date, _this.dateTimeFromat));
            }
        },
        /**
         * 与服务器同步用用户时间，修正误差
         */
        syncUserTime:function(){
            var _this=this;
            window.top.topPage.ajax({
                url:root + '/index/getUserTimeZoneDate.html',
                dataType:"json",
                success:function(data){
                    _this.dateTimeFromat=data.dateTimeFromat;
                    $("#index-clock").text(data.dateTime);
                    $("#index-clock").attr("time",data.time);
                    $("#index-clock").css("display","inline");
                    window.setTimeout(function() {
                        _this.syncUserTime();
                    }, 360000);
                    if(_this.timeInterval!=null) {
                        window.clearInterval(_this.timeInterval);
                    }
                    _this.timeInterval=window.setInterval(function () {
                        _this.userTime();
                    },1000);
                }
            });
        }
    });
});