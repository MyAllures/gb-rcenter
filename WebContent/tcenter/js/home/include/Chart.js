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
            });
        },
        onPageLoad: function() {
            this._super();
            this.loadSiteData(false);
        },

        /** 站点概况 */
        loadSiteData: function (showData) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/home/siteData.html',
                dateType: 'json',
                loading:true,
                success: function (data) {
                    var json = eval("(" + data + ")");
                    _this.fillPlayerData(json, showData);
                    _this.fillDepositData(json, showData);
                    $('[data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover',
                        html: true
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
                        text: window.top.message.home_auto['单位元']
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
                    name: window.top.message.home_auto['存取差额'],
                    data: json.profit
                }, {
                    name: window.top.message.home_auto['本站点所有玩家的派彩总和报表损益'],
                    data: json.payout
                }]
            });
        },
        /** 玩家概况 */
        fillPlayerData: function (json, showData) {
            var _this = this;
            $('#playerData').highcharts({
                title: {
                    text: ''
                },
                xAxis: {
                    categories: json.date
                },
                yAxis: {
                    title: {
                        text: window.top.message.home_auto['单位位']
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
                    data: json.agentNewPlayerCount
                }, {
                    name: _this.formatStr(window.top.message.home_auto['新增有效玩家'],typeof (json.deposit)=='undefined'?'0':json.deposit,typeof (json.depositCount)=='undefined'?'0':json.depositCount,typeof (json.effective)=='undefined'?'0':json.effective),
                    data: json.agentNewEffectivePlayerCount
                }, {
                    name: window.top.message.home_auto['新增存款玩家'],
                    data: json.agentNewDepositPlayerCount
                },{
                    name: window.top.message.home_auto['存款总人数'],
                    data: json.allDepositPlayerCount
                },{
                    name: _this.formatStr(window.top.message.home_auto['有效投注人数'],typeof (json.agentRebate)=='undefined'?'0':json.agentRebate),
                    data: json.effectiveBetCount
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
                        text: window.top.message.home_auto['单位元']
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
                    name: window.top.message.home_auto['新玩家存款'],
                    data: json.agentNewPlayerDepositCount
                }, {
                    name: window.top.message.home_auto['新玩家取款'],
                    data: json.agentNewPlayerWithdrawCount
                }, {
                    name: window.top.message.home_auto['存款总额'],
                    data: json.allDepositCount
                }, {
                    name: window.top.message.home_auto['取款总额'],
                    data: json.allWithdrawCount
                }]
            });
        },


    });
});