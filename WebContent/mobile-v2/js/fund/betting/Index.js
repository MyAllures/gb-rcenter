define(['common/MobileBasePage'], function (Mobile) {
    var url = root + "/fund/betting/index.html";
    var pageNumber = 2;
    var beginTime = "";
    var endTime = "";
    var t;
    return Mobile.extend({
        init: function (formSelector) {
            this._super();
//主体内容滚动条
//             mui('.mui-scroll-wrapper').scroll({
//                 deceleration: 0.0008 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//             });
        },
        onPageLoad: function () {
            this._super();
            t = this;
            this.getList();
            this.getStatisticsData();
            $('.mui-pull-loading').remove();
        },
        bindEvent: function () {
            this._super();
            var _that = this;
            mui("body").on("tap", ".query", function () {
                _that.getList();
            });
            //data-href
            mui("body").on("tap", "[data-href]", function () {
                var _href = $(this).data('href');
                if(os == 'app_ios' && _href == '/')
                    gotoIndex(0);
                else
                    t.gotoUrl(_href);
            });
            var format = dateFormat.day;
            //设置开始时间选择器
            mui("body").on("tap", "#beginTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#beginTime").val(),
                    beginDate: new Date($("#beginTime").attr("beginTime")),
                    endDate: new Date($("#endTime").attr("endTime")),
                    labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var day = _that.formatDateTime(new Date(e.value),format);
                    $("#beginTime").val(day);
                    //结束时间不能小于开始时间
                    if (new Date($("#endTime").val()).getTime() < new Date(e.value).getTime())
                        $("#endTime").val(day);
                    dtpicker.dispose();
                })
            });
            //设置结束时间选择器
            mui("body").on("tap", "#endTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#endTime").val(),
                    beginDate: new Date($("#beginTime").val()),
                    endDate: new Date($("#endTime").attr("endTime")),
                    labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    $("#endTime").val(_that.formatDateTime(new Date(e.value),format));
                })
            });
            //上拉加载数据
            mui('#refreshContainer').pullRefresh({
                container: '#refreshContainer',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.fund_auto['上拉加载'],
                    contentrefresh: window.top.message.fund_auto['正在加载'],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.fund_auto['已经到底'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: _that.bettingPulldownRefresh
                }
            });

        },//异步查询统计数据
        getStatisticsData: function () {
            // if($("#hiddenTotalCount").attr("value")!='0')
            mui.ajax(root + "/fund/betting/statisticsData.html", {
                type: 'post',//HTTP请求类型
                timeout: 20000,//超时时间设置为10秒；
                data: {"search.beginBetTime": beginTime, "search.endBetTime": endTime},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                dataType: "json",
                success: function (data) {
                    var currency = data.currency;
                    //彩池奖金
                    if (data.winning != null)
                        $("#statisticalDataWinning").text(currency + data.winning.toFixed(2)).text;
                    //有效投注额
                    if (data.effective != null)
                        $("#statisticalDataEffective").html(currency + data.effective.toFixed(2));
                    //投注额
                    if (data.single != null)
                        $("#statisticalDataSingle").html(currency + data.single.toFixed(2));
                    //派彩
                    if (data.profit != null)
                        $("#statisticalDataProfit").html(currency + data.profit.toFixed(2));
                },
                error: function (e) {
                    t.toast(window.top.message.fund_auto['加载失败']);
                    //异常处理；
                }
            })
        },
        bettingPulldownRefresh: function (isReload) {
            if (isReload)
                pageNumber = 1;
            var data = {
                "paging.pageNumber": pageNumber,
                "search.beginBetTime": beginTime,
                "search.endBetTime": endTime
            };
            pageNumber = t.pullRefreshUp(url, "content-list", pageNumber, "lastPageNumber", mui("#refreshContainer"), data, isReload);
        },
        getList : function () {
            beginTime = $("#beginTime").val();
            endTime = $("#endTime").val();
            t.getStatisticsData();
            t.showProcess();
            mui.ajax(url, {
                type: 'post',//HTTP请求类型
                timeout: 10000,//超时时间设置为10秒；
                data: {"search.beginBetTime": beginTime, "search.endBetTime": endTime},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                success: function (data) {
                    var info = document.getElementById("content-list");
                    info.innerHTML = data;
                    pageNumber = 2;
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                    mui('#refreshContainer').pullRefresh().refresh(true);
                    t.dismissProgress();
                    /*$("#totalCount").html(window.top.message.fund_auto['加载失败'].replace('{0}', $("#hiddenTotalCount").attr("value")));*/
                },
                error: function (e) {
                    mui.toast(window.top.message.fund_auto['加载失败']);
                    //异常处理；
                    console.log(e);
                    t.dismissProgress();
                }
            })
        }
    });
});



