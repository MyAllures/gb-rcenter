/*界面初始化*/
var url = root + "/fund/betting/index.html";
var pageNumber = 2;
var beginTime = "";
var endTime = "";
var t;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left'],
        init: pullUpRefreshOption('#refreshContainer', pullfresh, false)
    };
    muiInit(options);
    loadData();
    getStatisticsData();
});

/*上拉请求数据*/
function pullfresh() {
    beginTime = $("#beginTime").val();
    endTime = $("#endTime").val();
    var total = parseInt($("#lastPageNumber").val());
    if (total < pageNumber) {
        //mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
    } else {
        var data = {
            "paging.pageNumber": pageNumber,
            "search.beginBetTime": beginTime,
            "search.endBetTime": endTime
        };
        mui.ajax(url, {
            type: 'post',//HTTP请求类型
            timeout: 10000,//超时时间设置为10秒；
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Soul-Requested-With': 'XMLHttpRequest'
            },
            success: function (data) {
                var info = document.getElementById("content-list");
                info.innerHTML = info.innerHTML + data;
                pageNumber = pageNumber + 1;
            },
            error: function (e) {
                mui.toast(window.top.message.fund_auto['加载失败']);
                //异常处理；
                console.log(e);
            }
        });
        /*
        var options = {
            url: url,
            type: 'POST',
            data: data,
            headers: {
                "Soul-Requested-With":"XMLHttpRequest"
            },
            success: function (data) {
                var info = document.getElementById("content-list");
                info.innerHTML = data;
                pageNumber = pageNumber + 1;
            }
        };
        muiAjax(options);*/
    }
    $(".mui-pull-bottom-pocket").addClass("mui-hidden");
    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
}

//开始时间
function loadBeginTime() {
    var dtpicker = new mui.DtPicker({
        type: "date",
        value: $("#beginTime").val(),
        beginDate: new Date($("#beginTime").attr("minDate")),
        endDate: new Date($("#endTime").attr("endTime"))
    });
    dtpicker.show(function (e) {
        var day = formatDateTime(new Date(e.value), 'YYYY-MM-DD');
        $("#beginTime").val(day);
        if (new Date($("#endTime").val()).getTime() < new Date(e.value).getTime()) {
            $("#endTime").val(day)
        }
        dtpicker.dispose()
    })
}
//结束时间
function loadEndTime() {
    var dtpicker = new mui.DtPicker({
        type: "date",
        value: $("#endTime").val(),
        beginDate: new Date($("#beginTime").val()),
        endDate: new Date($("#endTime").attr("endTime"))
    });
    dtpicker.show(function (e) {
        $("#endTime").val(formatDateTime(new Date(e.value), 'YYYY-MM-DD'));
        dtpicker.dispose()
    })
}
//时间格式化
function formatDateTime(date, format) {
    var theMoment = moment();
    theMoment._d = date;
    return theMoment.format(format);
}

function loadData() {
    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
    beginTime = $("#beginTime").val();
    endTime = $("#endTime").val();
    getStatisticsData();
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
        },
        error: function (e) {
            mui.toast(window.top.message.fund_auto['加载失败']);
            //异常处理；
            console.log(e);
        }
    });
}

function getStatisticsData() {
    var options = {
        url: root + "/fund/betting/statisticsData.html",
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
            toast(window.top.message.fund_auto['加载失败']);
        }
    };
    muiAjax(options);
}