/**
 * Created by legend on 18-2-19.
 */
$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-scroll-wrapper.fund-type-scroll',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        rightMenuScroll: '.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    recordPulldownRefresh(true);

});

var globalTransactionType=""; //资金类型

//设置开始时间选择器
function clickBeginTime() {
    var dtpicker = new mui.DtPicker({
        "type": "date",
        "value": $("#beginTime").val(),
        beginDate: new Date($("#beginTime").attr("minDate")),
        endDate: new Date($("#endTime").attr("endTime")),
        labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日']]//设置默认标签区域提示语
    });
    dtpicker.show(function (e) {
        $("#beginTime").val(e.value);
        //结束时间不能小于开始时间
        if(new Date($("#endTime").val()).getTime()<new Date(e.value).getTime())
            $("#endTime").val(e.value);
        dtpicker.dispose();
    })
}




//设置结束时间选择器
function clickEndTime() {
    var dtpicker = new mui.DtPicker({
        "type": "date",
        "value": $("#endTime").val(),
        beginDate: new Date($("#beginTime").val()),
        endDate: new Date($("#endTime").attr("endTime")),
        labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日']]//设置默认标签区域提示语
    });
    dtpicker.show(function (e) {
        $("#endTime").val(e.value);
        dtpicker.dispose();
    })
}

//日期快选

function chooseValue(obj) {
    mui('#selectDiv').popover('toggle');
    var _this = $("#selectDiv");
    var dateValue = obj.getAttribute("value");
    var dateTime=getDatePopover(dateValue).split("&");
    /*if(new Date(dateTime[0]).getTime()>new Date($("#beginTime").attr("minDate")).getTime()){
        dateTime[0] = $("#beginTime").attr("minDate");
        toast(window.top.message.fund_auto['最近7天']);
    }*/
    if(new Date(dateTime[1]).getTime()<new Date($("#endTime").attr("minDate")).getTime())
        dateTime[1] = $("#beginTime").attr("minDate");
    $("#beginTime").val(dateTime[0]);
    $("#endTime").val(dateTime[1]);
}

/**
 * 格式化日期
 * @param value
 * @returns {string}
 */
function dateFmt(value) {

    var year = value.getFullYear();
    var month = ("0" + (value.getMonth() + 1)).slice(-2);//js日期是从0开始的,并且讲日期变成两位数
    var day = value.getDate();
    if (day < 10) {//如果当前天是个位数则变为两位数
        day = "0"+day;
    }

    return year+"-"+month+"-"+day;
}


/**
 * 日期快选
 * @param dateValue
 * @returns {string}
 */
function getDatePopover(dateValue) {
    var startTime;
    var endTime;
    var t = this;
    var currentDate = new Date();
    var format = dateFormat.day;

    if (dateValue == "today") {
        startTime = dateFmt(currentDate);
        endTime = dateFmt(currentDate);
    } else if (dateValue == "yesterday") {
        currentDate.setDate(currentDate.getDate() - 1);
        startTime = dateFmt(currentDate);
        endTime = dateFmt(currentDate);
    } else if (dateValue == "thisWeek") {
        var weekDay = currentDate.getDay();//21号
        currentDate.setDate(currentDate.getDate() - (weekDay == 0 ? 6 : weekDay - 1));
        startTime = dateFmt(currentDate);
        endTime = dateFmt(new Date());
    } else if (dateValue == "lastWeek") {
        var weekDay = date.getDay();
        date.setDate(date.getDate() - (weekDay == 0 ? 7 : weekDay));
        endTime = this.formatDateTime(date, format);
        date.setDate(date.getDate() - 6);
        startTime = this.formatDateTime(date, format);
    } else if (dateValue == "thisMonth") {
        startTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-01";
        startTime = this.formatDateTime(new Date(startTime), format);
        endTime = currentDate;
    } else if (dateValue == "lastMonth") {
        endTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-01";
        endTime = this.formatDateTime(new Date(endTime), format);
        startTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth()) : date.getMonth()) + "-01";
        startTime = this.formatDateTime(new Date(startTime), format);
    } else if (dateValue == "7days") {
        currentDate.setDate(currentDate.getDate() - 6);
        startTime = dateFmt(currentDate);
        endTime = dateFmt(new Date());
    } else if (dateValue == "30days") {
        date.setDate(date.getDate() - 29);
        startTime = this.formatDateTime(date, format);
        endTime = currentDate;
    }

    return startTime + "&" + endTime;
}


//点击类型事件
function chooseType(obj) {
    var displayType=document.getElementById("displayType");
    transactionType=obj.getAttribute('value');
    displayType.innerText=obj.innerHTML;
    displayType.setAttribute("value",transactionType);
    globalTransactionType = transactionType;
    mui('#transactionType').popover('toggle');
}

/**
 * 搜索按钮
 */
function searchObj() {
    handleRefresh();
}

/**
 *正在处理中金额，取款转账
 */
function handleRefresh() {
    var options = {
        url:"/fund/record/handleRefresh.html",
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
            recordPulldownRefresh(true);
        },
        error: function (e) {
            t.toast(window.top.message.fund_auto['加载失败']);
            scrollView.pullRefresh().endPullupToRefresh(true);
            //异常处理；
            console.log(e);
            t.dismissProgress();
        }
    };
    muiAjax(options);
}


/**
 * 加载获取资金记录数据
 * @param isReLoad
 */
function recordPulldownRefresh(isReLoad) {
    var displayType=document.getElementById("displayType");
    if(isReLoad)
        pageNumber = 1;

    var beginTime = $("#beginTime").val();
    var endTime = $("#endTime").val();
    var options = {
        url:"/fund/record/index.html?paging.pageNumber="+pageNumber+"&search.beginCreateTime="+beginTime+"&search.endCreateTime="+endTime+"&search.transactionType="+globalTransactionType,
        type: 'post',//HTTP请求类型
        timeout: 10000,//超时时间设置为10秒；
        dataType:"html",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        success: function (data) {
            $("#tBody").html("");//每次获取data前，先清空div元素的东西
            $("#tBody").append(data);
        },
        error: function (e) {
            toast(window.top.message.fund_auto['加载失败']);
        }
    };
    muiAjax(options);

}

