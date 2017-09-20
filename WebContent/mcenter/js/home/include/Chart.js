/**
 * 管理首页-首页js
 */
define(['common/BasePage', 'highcharts'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=mainFrame]";
            this._super();
        },
        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            /**
             * 是否显示数值
             */
            $(this.formSelector).on("change", ".showData", function () {
                var isCheck = $(this).is(':checked');
                _this.loadSiteData(isCheck);
                _this.loadDepositData(isCheck);
                _this.loadGameData($('#currDay').val(), isCheck);
            });
        },
        onPageLoad: function() {
            this._super();
            this.loadSiteData(false);
            this.loadDepositData(false);
            this.loadGameData(-1, false);
        },

        /** 站点概况 */
        loadSiteData: function (showData) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/home/siteData.html',
                dateType: 'json',
                success: function (data) {
                    var json = eval("(" + data + ")");
                    _this.fillSiteData(json, showData);
                    _this.fillPlayerData(json, showData);
                    $('#siteData [data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover'
                    });
                    $('#playerData [data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover'
                    });
                }
            });
        },

        /** 站点概况 */
        fillSiteData: function (json, showData) {
            $('#siteData').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: json.date
                },
                yAxis: {
                    title: {
                        text: window.top.message.home_auto['单位']
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                plotOptions: {
                    column:{
                        dataLabels:{
                            enabled: showData,
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 20,
                    useHTML: true
                },
                series: [{
                    name: '<span tabindex="0" data-placement="bottom" data-trigger="focus" data-toggle="popover" data-container="body" role="button" data-html="true" data-content="'+window.top.message.home_auto['存取差额']+'"><i class="fa fa-question-circle"></i></span>'+window.top.message.home_auto['存取差额存取差额']+'', data: json.profit
                }, {
                    name: '<span tabindex="0" data-placement="bottom" data-trigger="focus" data-toggle="popover" data-container="body" role="button" data-content="'+window.top.message.home_auto['本站点所有玩家的派彩总和']+'"><i class="fa fa-question-circle"></i></span>'+window.top.message.home_auto['报表损益']+'', data: json.payout
                }]
            });
        },
        /** 玩家概况 */
        fillPlayerData: function (json, showData) {
            $('#playerData').highcharts({
                title: {
                    text: ''
                },
                xAxis: {
                    categories: json.date
                },
                yAxis: {
                    title: {
                        text: window.top.message.home_auto['单位']
                    },
                    min: 0,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: showData
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 20,
                    useHTML: true
                },
                series: [{
                    name: window.top.message.home_auto['新增玩家'],
                    data: json.player
                }, {
                    name: '<span tabindex="0" class=" help-popover m-r-xs" role="button" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="bottom"'+
                    'data-html="true" data-content="'+window.top.message.home_auto['含人工存入的']+'"> <i class="fa fa-question-circle"></i> </span>'+window.top.message.home_auto['新增存款玩家']+'', data: json.deposit
                },{
                    name: '<span tabindex="0" class=" help-popover m-r-xs" role="button" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="bottom"'+
                    'data-html="true" data-content="'+window.top.message.home_auto['含人工存入的']+'"> <i class="fa fa-question-circle"></i> </span>'+window.top.message.home_auto['存款总人数']+'',
                    data: json.depoistPlayer
                }, {
                    name: window.top.message.home_auto['投注人数'],
                    data: json.bet
                }]
            });
        },
        loadDepositData: function (showData) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/home/depositData.html',
                dateType: 'json',
                success: function (data) {
                    var json = eval("(" + data + ")");
                    _this.fillDepositData(json, showData);
                    $('#depositData [data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover'
                    });
                }
            });
        },
        /** 存款走势 */
        fillDepositData: function (json, showData) {
            $('#depositData').highcharts({
                title: {
                    text: ''
                },
                xAxis: {
                    categories: json.date
                },
                yAxis: {
                    title: {
                        text: window.top.message.home_auto['单位']
                    },
                    min: 0,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: showData
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 20,
                    useHTML: true
                },
                series: [{
                    name: '<span tabindex="0" data-content="'+window.top.message.home_auto['来自端提交的线上支付存款总额']+'" data-placement="bottom" data-trigger="focus" data-toggle="popover" data-container="body" role="button"><i class="fa fa-question-circle"></i></span>'+window.top.message.home_auto['线上支付']+'',
                    data: json.online
                }, {
                    name: '<span tabindex="0" data-content="'+window.top.message.home_auto['来自端提交的公司入款存款总额']+'" data-placement="bottom" data-trigger="focus" data-toggle="popover" data-container="body" role="button"><i class="fa fa-question-circle"></i></span>'+window.top.message.home_auto['公司入款']+'',
                    data: json.company
                }, {
                    name: '<span tabindex="0" class=" help-popover m-r-xs" role="button" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="bottom"'+
                    'data-html="true" data-content="'+window.top.message.home_auto['含人工存入的']+'"> <i class="fa fa-question-circle"></i> </span>'+window.top.message.home_auto['人工存入']+'',
                    data: json.manualDeposit
                }, {
                    name: '<span tabindex="0" data-content="'+window.top.message.home_auto['来自手机提交的所有存款总额']+'" data-placement="bottom" data-trigger="focus" data-toggle="popover" data-container="body" role="button"><i class="fa fa-question-circle"></i></span>'+window.top.message.home_auto['手机支付']+'',
                    data: json.mobile
                }]
            });
        },

        loadGameData: function (num, showData) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/home/gameData.html?num=' + num,
                dateType: 'json',
                success: function (data) {
                    var json = eval("(" + data + ")");
                    _this.fillGameData(json, showData);
                }
            });
        },

        changeGameData: function (e, opt) {
            $('span.stat-day a').removeClass('sel');
            $(e.currentTarget).addClass('sel');
            $('#currDay').val(opt.data_day);
            var showData = $('.showData').is(':checked');
            this.loadGameData(opt.data_day, showData);
            $(e.currentTarget).unlock();
        },

        /** 游戏盈亏 */
        fillGameData: function (json, showData) {
            $('#gameData').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: json.apiType
                },
                yAxis: {
                    title: {
                        text: window.top.message.home_auto['单位']
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                plotOptions: {
                    column:{
                        dataLabels:{
                            enabled: showData,
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 20,
                    useHTML: true
                },
                series: [{
                    name: window.top.message.home_auto['有效投注额'],
                    data: json.amount
                }, {
                    name: window.top.message.home_auto['报表损益'],
                    data: json.payout
                }]
            });
        }
    });
});