/**
 * 彩票投注记录js
 * Created by bill on 17-5-20.
 */
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {

    return BasePage.extend({
        _this: null,
        noreCode: '<div class="mui-content"> <div class="no-data-img no-record"></div> </div>',
        timeCode: "today",
        //记录当前页数,投注额度等信息
        bet: new Array(),
        /**
         * 初始化
         */
        init: function () {
            this._super();
            _this = this;
            //mui初始化
            this.muiInit();
            this.iosGoBack();
            this.manualRefresh();
            mui('#betContent').pullRefresh({
                container: '#betContent',
                up: {
                    auto: true,
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: "上拉加载",
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '已经到底了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: _this.getMyOrders
                }
            });
            Template.helper('formatPrice', function (price, type) {
                if (price) {
                    var arrayPrice = price.toString().split(".");
                    if (type == 'integer') {
                        return arrayPrice[0] ? arrayPrice[0] : "0";
                    } else if (type == 'decimal') {
                        if (arrayPrice[1] && arrayPrice[1].length >= 2) {
                            return arrayPrice[0] + '.' + arrayPrice[1].substr(0, 2);
                        }
                        return price;
                    }
                } else {
                    if (type == 'integer') {
                        return "0";
                    } else if (type == 'decimal') {
                        return ".00";
                    }
                }
            });
        },
        /**
         * app调用刷新数据
         */
        refreshBetOrder: function () {
            _this.bet[_this.timeCode].isNoMore = false;
            _this.bet[_this.timeCode].pageNumber = 1;
            mui('#betContent').pullRefresh().refresh(true);
            this.getMyOrders(true);
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            _this = this;
            //初始化当前页面
            _this.bet[_this.timeCode] = {};
            _this.bet[_this.timeCode].pageNumber = 1;
            var title = document.getElementById("title");
            //选项卡点击事件
            var isLoadBet2 = false, isLoadBet3 = false;
            mui('.mui-bar-tab').on('tap', 'a', function (e) {
                var targetTab = $(this).data('target');
                //显示/隐藏对应内容
                if (!(targetTab == "auto")) {
                    $("[id*='bet-']").addClass("mui-hidden");
                    $("#bet-" + targetTab).removeClass("mui-hidden");
                    $("#au").removeClass("auto-active");
                    _this.timeCode = targetTab;
                    if (_this.bet[_this.timeCode] == null) {
                        //初始化对象
                        _this.bet[_this.timeCode] = {};
                        _this.bet[_this.timeCode].pageNumber = 1;
                    }
                }else{
                    if (_this.bet["auto"] == null) {
                        //初始化对象
                        _this.bet["auto"] = {};
                        _this.bet["auto"].pageNumber = 1;
                    }
                }

                //加载投注记录数据
                //已经加载过的不再加载

                if (targetTab == 'yesterday' && !isLoadBet2) {
                    _this.getMyOrders(true);
                    isLoadBet2 = true;
                } else if (targetTab == 'thisMonth' && !isLoadBet3) {
                    _this.getMyOrders(true);
                    isLoadBet3 = true;
                } else if (targetTab == 'auto') {
                    _this.bet["auto"].endTime = $("#endTime").val();
                    _this.bet["auto"].startTime = $("#startTime").val();
                }
                if (!(targetTab == "auto")) {
                    _this.setBetProfit();
                }
                //每次切换页面都启用上啦加载
                mui('#betContent').pullRefresh().refresh(true);
            });
            mui('body').on('tap', '[data-href]', function () {
                var href = $(this).data("href");
                _this.gotoUrl(href);
            });
            //自定义事件，模拟点击“首页选项卡”
            document.addEventListener('gohome', function () {
                var defaultTab = document.getElementById("defaultTab");
                var defaultContent = document.getElementById("defaultTab");
                //模拟首页点击
                mui.trigger(defaultTab, 'tap');
                //切换选项卡高亮
                var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
                if (defaultTab !== current) {
                    current.classList.remove('mui-active');
                    defaultTab.classList.add('mui-active');
                }

            });

            mui('body').on('tap', '.mui-btn-block', function () {
                var st = $("#startTime").val();
                var et = $("#endTime").val();
                var myDate = new Date();
                if (new Date(et).getTime() > myDate.getTime()) {
                    _this.toast("请重新选择时间！");
                    return;
                }
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - 41);
                if (new Date(st).getTime() < myDate.getTime()) {
                    _this.toast("请重新选择时间！");
                    return;
                }
                _this.timeCode = "auto";
                _this.bet[_this.timeCode].endTime = et;
                _this.bet[_this.timeCode].startTime = st;
                _this.bet[_this.timeCode].pageNumber = 1;
                _this.getMyOrders(true);
                //返回顶部
                mui("#betContent").scroll().scrollTo(0, 0, 0);
                $(".mui-scrollbar-indicator").css("transform", "translate3d(0,0,0)");
                //隐藏上个菜单内容和显示当前
                $("[id*='bet-']").addClass("mui-hidden");
                $("#bet-auto").removeClass("mui-hidden");

                $("#offCanvasWrapper").removeClass("mui-active");
                $("#offCanvasSideRight").removeClass("mui-active");
                $(".mui-inner-wrap").css("transform", "translate3d(0,0,0)");
                $(".mui-tab-item").removeClass("mui-active");
                $("#au").addClass("auto-active");
            });

            //设置开始时间选择器
            mui("body").on("tap", "#startTime", function () {
                var myDate = new Date();
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - 40);
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#startTime").val(),
                    beginDate: myDate,
                    endDate: new Date(),
                    labels: ['年', '月', '日']//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    $("#startTime").val(e.value);
                    //结束时间不能小于开始时间
                    if (new Date($("#endTime").val()).getTime() < new Date(e.value).getTime())
                        $("#endTime").val(e.value);
                    dtpicker.dispose();
                })
            });
            //设置结束时间选择器
            mui("body").on("tap", "#endTime", function () {
                var myDate = new Date();
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - 40);
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#endTime").val(),
                    beginDate: myDate,
                    endDate: new Date(),
                    labels: ['年', '月', '日']//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    if (new Date(e.value).getTime() < new Date($("#startTime").val()).getTime()) {
                        $("#endTime").val($("#startTime").val());
                    } else {
                        $("#endTime").val(e.value);
                    }
                })
            });
        },
        /**
         获取我的投注记录
         **/
        getMyOrders: function (isReload) {
            //判断如果该页面没有更多数据则不加载
            if (_this.bet[_this.timeCode].isNoMore) {
                mui('#betContent').pullRefresh().endPullupToRefresh(true);
                return;
            }
            if (!_this.bet[_this.timeCode].betProfit) {
                isReload = true;
            }

            if (isReload)
                _this.getBetProfit();

            mui.ajax(root + "/bet/getMyOrders.html", {
                data: {
                    "timeCode": _this.timeCode,
                    "paging.pageNumber": _this.bet[_this.timeCode].pageNumber++,
                    "queryStartDate": _this.bet[_this.timeCode].startTime,
                    "queryEndDate": _this.bet[_this.timeCode].endTime
                },
                type: "post",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (data) {
                    if (data.length > 0) {
                        //初始化当前页投注记录额
                        var betProfit = _this.bet[_this.timeCode].betProfit;
                        if (!betProfit) _this.bet[_this.timeCode].betProfit = betProfit = {};
                        var currentAmount = betProfit.currentAmount ? betProfit.currentAmount : 0;
                        var payout = betProfit.payout ? betProfit.payout : 0;
                        if (isReload) {
                            currentAmount = 0;
                            payout = 0;
                        }

                        for (var i = 0; i < data.length; i++) {
                            //计算投注记录额
                            currentAmount = currentAmount + data[i].betAmount;
                            if (data[i].payout)
                                payout = payout + data[i].payout;
                            //时间格式转换
                            var betTime = new Date(data[i].betTime);
                            var betDay = betTime.getFullYear() + "-" + _this.getTen(betTime.getMonth() + 1) + "-" + _this.getTen(betTime.getDate());
                            var betSecond = _this.getTen(betTime.getHours()) + ":" + _this.getTen(betTime.getMinutes()) + ":" + _this.getTen(betTime.getSeconds());
                            data[i].betDay = betDay;
                            data[i].betSecond = betSecond;
                        }
                        _this.bet[_this.timeCode].betProfit.currentAmount = currentAmount;
                        _this.bet[_this.timeCode].betProfit.payout = payout;
                        _this.setBetProfit();
                        //填充数据
                        var html = Template('template_myBetTemplate', {list: data});
                        if (isReload)
                            $("#bet-" + _this.timeCode).html(html);
                        else
                            $("#bet-" + _this.timeCode).append(html);

                        mui('#betContent').pullRefresh().endPullupToRefresh(false);
                    } else {
                        if (isReload) {
                            $("#bet-" + _this.timeCode).html(_this.noreCode);
                        }
                        if (!(_this.timeCode == "auto")) {
                            _this.bet[_this.timeCode].isNoMore = true;
                        }
                        mui('#betContent').pullRefresh().endPullupToRefresh(true);
                    }
                }
            })
        },
        getTen: function (k) {
            if (k < 10)
                k = "0" + k;
            return k;
        },
        /**
         * 获取投注记录额度结算
         */
        getBetProfit: function () {

            mui.ajax(root + "/bet/betProfit.html", {
                data: {
                    "timeCode": _this.timeCode,
                    "queryStartDate": _this.bet[_this.timeCode].startTime,
                    "queryEndDate": _this.bet[_this.timeCode].endTime
                },
                type: "post",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (data) {
                    if (data) {
                        _this.bet[_this.timeCode].betProfit = data;
                        _this.setBetProfit();
                    }
                }
            })
        },
        /**
         * 显示投注记录额度结算
         */
        setBetProfit: function () {
            var betProfit = _this.bet[_this.timeCode].betProfit;
            if (!betProfit) betProfit = {};
            var totalBetAmount =0.0;
            var betamount =0.0;
            //设置总投注额
            if (betProfit.betamount && betProfit.betamount != 0) {
                $('#betamount').html(betProfit.betamount.toFixed(2))
                totalBetAmount = betProfit.betamount.toFixed(2)
            }else{
                $('#betamount').html(0);
            }
            //设置总盈亏
            // if (betProfit.profitloss && betProfit.profitloss != 0) {
                $('#profitloss').html((betProfit.profitloss-totalBetAmount).toFixed(2));
            // }else{
            //     $('#profitloss').html(0);
            // }
            //设置当前投注额
            if (betProfit.currentAmount && betProfit.currentAmount != 0){
                $('#currentAmount').html(betProfit.currentAmount.toFixed(2))
                betamount = betProfit.currentAmount.toFixed(2)
            }else{
                $('#currentAmount').html(0);
            }
            //设置当前盈亏
            // if (betProfit.payout && betProfit.payout != 0){
                $('#payout').html((betProfit.payout-betamount).toFixed(2));
            // } else{
            //     $('#payout').html(0);
            // }
        },

        /** 手动刷新 */
        manualRefresh: function () {
            var _this = this;
            mui('header').on('tap', 'a._refresh', function () {
                $(this).hide();
                $('div._refresh').show();
                _this.refreshBetOrder();
                setTimeout(function () {
                    $('div._refresh').hide();
                    $('a._refresh').show();
                    mui.toast('刷新成功');
                }, 1000);
            })
        }
    })

});
