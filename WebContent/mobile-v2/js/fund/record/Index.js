define(['common/MobileBasePage'], function (Mobile) {
    var url = root + "/fund/record/index.html";
    var pageNumber = 2;
    var beginTime="";
    var endTime="";
    var t;
    var transactionType="";
    return Mobile.extend({

        init: function (formSelector) {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            t=this;
            beginTime = $("#beginTime").val();
            endTime = $("#endTime").val();
            $('._userAsset').removeClass('mui-hide');
            mui('#refreshContainer').pullRefresh({
                container: '#refreshContainer',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    auto: true,//可选,默认false.自动上拉加载一次
                    contentdown: window.top.message.fund_auto['上拉加载'],
                    contentrefresh: window.top.message.fund_auto['正在加载'],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.fund_auto['已经到底'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: t.recordPulldownRefresh
                }
            });
            // //主体内容滚动条
            // mui('.mui-scroll-wrapper').scroll({
            //     deceleration: 0.0008 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            // });
        },
        bindEvent: function () {
            this._super();
            transactionType = $("#displayType").attr("value");
            //data-href
            mui("body").on("tap", "[data-href]", function () {
                var _href = $(this).data('href');
                t.gotoUrl(_href);
            });
            var format = dateFormat.day;
            var _this = this;
            //设置开始时间选择器
            mui("body").on("tap", "#beginTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#beginTime").val(),
                    beginDate: new Date($("#beginTime").attr("minDate")),
                    endDate: new Date($("#endTime").attr("endTime")),
                    labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var day = _this.formatDateTime(new Date(e.value),format);
                    $("#beginTime").val(day);
                    //结束时间不能小于开始时间
                    if(new Date($("#endTime").val()).getTime()<new Date(e.value).getTime())
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
                    $("#endTime").val(_this.formatDateTime(new Date(e.value),format));
                    dtpicker.dispose();
                })
            });
            //点击类型事件
            mui('#transactionType').on('tap','a',function () {
                var displayType=document.getElementById("displayType");
                transactionType=this.getAttribute('value');
                displayType.innerText=this.innerHTML;
                displayType.setAttribute("value",transactionType);

                mui('#transactionType').popover('toggle');
            });
            mui("body").on("tap", ".query", function () {
                beginTime = $("#beginTime").val();
                endTime = $("#endTime").val();
                t.recordPulldownRefresh(true);
                t.handleRefresh();
            });

            //日期快选
            mui('#selectDate').on('tap','a',function(){
                mui('#selectDate').popover('toggle');
                var dateValue=this.getAttribute("value");
                var dateTime=t.getDatePopover(dateValue).split("&");

                if(new Date(dateTime[0]).getTime()<new Date($("#beginTime").attr("minDate")).getTime()){
                    dateTime[0] = $("#beginTime").attr("minDate");
                    t.toast(window.top.message.fund_auto['最近7天']);
                }
                if(new Date(dateTime[1]).getTime()<new Date($("#endTime").attr("minDate")).getTime())
                    dateTime[1] = $("#beginTime").attr("minDate");
                beginTime = dateTime[0];
                endTime = dateTime[1];
                $("#beginTime").val(dateTime[0]);
                $("#endTime").val(dateTime[1]);
            });
            //ios应用无需跳转
            if(os != 'app_ios'){
                mui("body").on("tap",".mui-action-backs",function () {
                    t.gotoUrl("/mine/index.html");
                });
            }
        },
        recordPulldownRefresh: function (isReLoad) {
            if(isReLoad)
                pageNumber = 1;
            var data = {
                "paging.pageNumber": pageNumber,
                "search.beginCreateTime": beginTime,
                "search.endCreateTime": endTime,
                "search.transactionType": transactionType
            };
            pageNumber = t.pullRefreshUp(url, "content", pageNumber, "lastPageNumber", mui("#refreshContainer"), data, isReLoad);
            $(".mui-pull-bottom-pocket").remove();
        },
        handleRefresh: function(){
            mui.ajax("/fund/record/handleRefresh.html", {
                type: 'post',//HTTP请求类型
                timeout: 10000,//超时时间设置为10秒；
                data: {"date":new Date()},
                dataType:"json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                success: function (data) {
                    if(data){
                        $(".withdrawSum").text(data.currency + data.withdrawSum);
                        $(".transferSum").text(data.currency + data.transferSum);
                    }
                },
                error: function (e) {
                    t.toast(window.top.message.fund_auto['加载失败']);
                    scrollView.pullRefresh().endPullupToRefresh(true);
                    //异常处理；
                    console.log(e);
                    t.dismissProgress();
                }
            });
        }
    });
});
