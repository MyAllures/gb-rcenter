/**
 * Created by snake on 18-4-22.
 */

var item1 = false, item2 = false, item3 = false;//用来判断是否已经加载
var eitem1 = false, eitem2 = false, eitem3 = false;//用来判断是否已经加载


var pageNumberSys = 1;
var pageNumberSite1 = 1;
var pageNumberSite2 = 1;

var pageNumber = 2;
var pageNumberGame = 2;

var gameStartTime = "";//游戏公告开始时间
var gameEndTime = "";//游戏公告结束时间
var sysStartTime = "";//系统公告开始时间
var sysEndTime = "";//系统公告结束时间

var popoverType = "noticeGame";
var gameType = "";
var t;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left'],
        init: pullUpRefreshOption('#refreshContainer', pullfresh, false)
    };
    /*初始化mui框架*/
    muiInit(options);
    // initMui ();
    /*游戏类型上下滑动*/
    scrollPopver();
    /*控制页面的初始化*/
    unReadMessage();
});

function scrollPopver() {//初始化游戏类型弹出菜单
    muiScrollY('.mui-scroll-wrapper.popover-scroll');
}

//点击一级选项卡时切换页面
function segmentedControl1(obj, options) {
    var href = obj.getAttribute("data-href");
    changeBlur();
    $(".mui-control-content[name=notice]").removeClass("mui-active");
    $("#" + href).addClass("mui-active");
    if (href == "noticeSite") {//站点消息
        if (!item3) {
            site1Notice();
        }
        item3 = true;
    } else if (href == "noticeSys") {//系统公告
        if (!item2) {
            sysNotice(false);
        }
        popoverType = "noticeSys";
        item2 = true;
    } else if (href == 'noticeGame') {//游戏公告
        if (!item1) {
            gameNotice(true);
        }
        popoverType = "noticeGame";
        item3 = true;
    }
}

//点击二级选项卡时切换页面
function segmentedControl2(obj, options) {
    var href = obj.getAttribute("data-href");
    $(".mui-control-content[name=noticeSite]").removeClass("mui-active");
    changeBlur();
    $("#" + href).addClass("mui-active");
    if (href == "noticeSite2") {
        if (!eitem2) {
            site2Notice(!eitem2);
        }
        eitem2 = true;
    } else if (href == "noticeSite3") {
        if (!eitem3) {
            sendMessage();
        }
        eitem3 = true;
    } else if (href == "noticeSite1") {
        if (!eitem1) {
            site1Notice();
        }
        eitem1 = true;
    }
}

/**
 * 发送消息提交
 */
function advisorySubmit() {
    var advisoryType = document.getElementsByName("result.advisoryType");
    var advisoryTitle = document.getElementsByName("result.advisoryTitle");
    var advisoryContent = document.getElementsByName("result.advisoryContent");
    var captcha = document.getElementsByName("captcha");
    if (advisoryType[0].value == "")
        toast(window.top.message.my_auto["请选择类型"]);
    else if (advisoryTitle[0].value == "")
        toast(window.top.message.my_auto["标题不能为空"]);
    else if (advisoryTitle[0].value.length < 4 || advisoryTitle[0].value.length > 100)
        toast(window.top.message.my_auto["标题长度"]);
    else if (advisoryContent[0].value == "")
        toast(window.top.message.my_auto["内容不能为空"]);
    else if (advisoryContent[0].value.length < 10)
        toast(window.top.message.my_auto["内容长度"]);
    else {
        var data = $('#messageForm').serialize();
        if ($('#captcha_div').css("display") == "block" && (captcha[0].value == "" || captcha[0].value.length != 4)) {
            toast(window.top.message.my_auto["验证码格式错误"]);
            return;
        }

        var options = {
            url: root + "/message/sendMessage.html",
            type: 'post',//HTTP请求类型
            timeout: 20000,//超时时间设置为10秒；
            data: data,
            dataType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Soul-Requested-With': 'XMLHttpRequest'
            },
            success: function (data) {
                if (data.state) {
                    toast(window.top.message.my_auto['提交成功']);
                    formReset();
                    eitem2 = false;
                } else {
                    if (data.msg == 'captchaError') {
                        toast(window.top.message.my_auto['验证码有误']);
                    } else
                        toast(window.top.message.my_auto["提交失败"]);
                }
                var captcha_img = $('#_captcha_img');
                var _src = captcha_img.data("src");
                captcha_img.attr("src", _src);
                if (data.isOpenCaptcha) {
                    $('#captcha_div').css('display', 'block');
                }
                document.getElementsByName("gb.token")[0].setAttribute("value", data.token);
            }
        }
        muiAjax(options);
    }
}

//系统消息的删除和标记已读
function deleteSysMessage(obj, options) {
    $("[name='site1_allCheck'] >span").removeClass("on");
    if (obj.getAttribute("name") == "delete") {
        var ids = getSelectIdsArray("site1_check").join(",");
        if (ids == '') {
            toast(window.top.message.my_auto["请选择需要删除的记录"]);
        } else {
            var options = {
                type: "post",
                url: root + "/message/deleteNoticeReceived.html",
                data: {"ids": ids},
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        toast(window.top.message.my_auto['删除成功']);
                        unReadCount();
                        var data = {"paging.pageNumber": 1};
                        pageNumberSite1 = pullRefreshUp(root + "/message/messageList.html", "noticeSite1Partial",
                            1, "site1LastPageNumber", mui("#noticeSite1Scroll"), data, true);
                    }
                }
            }
            muiAjax(options);
        }
    } else if (obj.getAttribute("name") == "editStatus") {
        var ids = getSelectIdsArray("site1_check").join(",");
        if (ids == '') {
            toast(window.top.message.my_auto["请选择消息记录"]);
        } else {
            var options = {
                type: "post",
                url: root + "/message/systemMessageEditStatus.html",
                data: {"ids": ids},
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        toast(window.top.message.my_auto['标记成功']);
                        unReadCount();
                        var data = {"paging.pageNumber": 1};
                        pageNumberSite1 = pullRefreshUp(root + "/message/messageList.html", "noticeSite1Partial",
                            1, "site1LastPageNumber", mui("#noticeSite1Scroll"), data, true);
                    }
                }
            }
            muiAjax(options);
        }
    }
}

//我的消息的删除和标记已读
function deleteMyMessage(obj, options) {
    $("[name='site2_allCheck'] >span").removeClass("on");
    if (obj.getAttribute("name") == "delete") {
        var ids = getSelectIdsArray("site2_check").join(",");
        if (ids == '') {
            toast(window.top.message.my_auto["请选择需要删除的记录"]);
        } else {
            var options = {
                type: "post",
                url: root + "/message/deleteAdvisoryMessage.html",
                data: {"ids": ids},
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        toast(window.top.message.my_auto['删除成功']);
                        unReadCount();
                        var data = {"paging.pageNumber": 1};
                        pageNumberSite2 = pullRefreshUp(root + "/message/advisoryMessage.html", "noticeSite2Partial",
                            1, "site2LastPageNumber", mui("#noticeSite2Scroll"), data, true);
                    }
                }
            }
            muiAjax(options);
        }
    } else if (obj.getAttribute("name") == "editStatus") {
        var ids = getSelectIdsArray("site2_check").join(",");
        if (ids == '') {
            toast(window.top.message.my_auto["请选择消息记录"]);
        } else {
            var options = {
                type: "post",
                url: root + "/message/getSelectAdvisoryMessageIds.html",
                data: {"ids": ids},
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        toast(window.top.message.my_auto['标记成功']);
                        unReadCount();
                        var data = {"paging.pageNumber": 1};
                        pageNumberSite2 = pullRefreshUp(root + "/message/advisoryMessage.html", "noticeSite2Partial",
                            1, "site2LastPageNumber", mui("#noticeSite2Scroll"), data, true);
                    }
                }
            }
            muiAjax(options);
        }
    }
}

//点击刷新验证码
function refreshCode(obj, options) {
    $(obj).attr("src", options.src);
}
//点击快选
function dateFastSelection(obj) {
    mui('#selectDate').popover('toggle');
    var begiTime = $('[name=beginTime]');
    var endTime = $('[name=endTime]');
    var dateValue = obj.getAttribute("value");
    var dateTime = getDatePopover(dateValue).split("&");
    if (new Date(dateTime[1]).getTime() < new Date(endTime.attr("minDate")).getTime()) {
        dateTime[1] = begiTime.attr("minDate")
    }
    //共用一个popover
    $("#" + popoverType).find(".date[name=beginTime]").val(dateTime[0]);
    $("#" + popoverType).find(".date[name=endTime]").val(dateTime[1]);
    if (popoverType == 'noticeGame') {
        gameStartTime = dateTime[0];
        gameEndTime = dateTime[1];
        gameNotice(true);
    } else if (popoverType == 'noticeSys') {
        sysStartTime = dateTime[0];
        sysEndTime = dateTime[1];
        sysNotice(true);
    }
}

//全选
function siteCheck(obj, options) {
    var name = obj.name;
    if ("site2_check" == name) {//单选
        $(obj).removeClass("ui-button-disable");
        if (obj.className == "gb-radio") {
            $(obj).addClass("on");
        } else {
            $(obj).removeClass("on");

        }
    } else if ("site2_allCheck" == name) {
        if ($(obj).find("span").attr("class") == "gb-checkbox2") {
            changeStatus("site2_check", true);
            $(obj).find("span").addClass("on");
        } else {
            changeStatus("site2_check", false);
            $(obj).find("span").removeClass("on");
        }
    } else if (name == "site1_allCheck") {
        if (obj.firstChild.className == "gb-checkbox2") {
            changeStatus("site1_check", true);
            $(obj).find("span").addClass("on");
        } else {
            changeStatus("site1_check", false);
            $(obj).find("span").removeClass("on");
        }
    }
}

//(游戏公告)开始时间
function setBeginTime() {
    var begiTime = $('[name=beginTime]');
    var endTime = $('[name=endTime]');
    var dtpicker = new mui.DtPicker({
        type: "date",
        value: begiTime.val(),
        beginDate: new Date(begiTime.attr("minDate")),
        endDate: new Date(endTime.attr("endTime"))
    });
    dtpicker.show(function (e) {
        var day = dateFmt(new Date(e.value), 'YYYY-MM-DD');
        $("#" + popoverType).find(".date[name=beginTime]").val(day);
        if (new Date(endTime.val()).getTime() < new Date(e.value).getTime()) {
            $("#" + popoverType).find(".date[name=endTime]").val(day)
        }
        dtpicker.dispose()
    })
}

//(游戏公告)结束时间
function setEndTime() {
    var begiTime = $('[name=beginTime]');
    var endTime = $('[name=endTime]');
    var dtpicker = new mui.DtPicker({
        type: "date",
        value: endTime.val(),
        beginDate: new Date(begiTime.val()),
        endDate: new Date(endTime.attr("endTime"))
    });
    dtpicker.show(function (e) {
        endTime.val(dateFmt(new Date(e.value), 'YYYY-MM-DD'));
        dtpicker.dispose()
    })
}

/*上拉请求数据*/
function pullfresh() {
    if (popoverType == 'noticeGame') {
        gameStartTime = $("#" + popoverType).find(".date[name=beginTime]").val();
        gameEndTime = $("#" + popoverType).find(".date[name=endTime]").val();
        gameNotice(false);
    } else if (popoverType == 'noticeSys') {
        sysStartTime = $("#" + popoverType).find(".date[name=beginTime]").val();
        sysEndTime = $("#" + popoverType).find(".date[name=endTime]").val();
        sysNotice(false);
    } else if (popoverType == 'noticeSite1') {
        site1Notice();
    } else if (popoverType == 'noticeSite2') {
        site2Notice(false);
    }
}

/*加载数据*/
function pullRefreshUp(url, contentId, pagenumber, lastPageNumberId, scrollView, data, isReload) {
    scrollView = mui("#refreshContainer");
    var lastPageNumber = document.getElementById(lastPageNumberId);
    if (lastPageNumber == null || pagenumber <= parseInt(lastPageNumber.value)) {
        scrollView.pullRefresh().disablePullupToRefresh();
        mui.ajax(url, {
            type: 'post',//HTTP请求类型
            timeout: 10000,//超时时间设置为10秒；
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Soul-Requested-With': 'XMLHttpRequest'
            },
            success: function (data) {
                var info = document.getElementById(contentId);
                scrollView.pullRefresh().enablePullupToRefresh();
                if (isReload) {
                    info.innerHTML = data;
                    scrollView.pullRefresh().endPullupToRefresh(false);
                } else {
                    info.innerHTML = info.innerHTML + data;
                }
                if (document.getElementById(lastPageNumberId).value == pagenumber) {
                    scrollView.pullRefresh().endPullupToRefresh(true);
                    // return pagenumber;/
                } else {
                    scrollView.pullRefresh().endPullupToRefresh(false);
                    // return pagenumber+1;
                }
                // t.dismissProgress();
            },
            error: function (e) {
                toast("加载失败");
                scrollView.pullRefresh().enablePullupToRefresh();
                //scrollView.pullRefresh().endPullupToRefresh(true);
                //异常处理；
                console.log(e);
                //t.dismissProgress();
            }
        });
        return pagenumber + 1;
    } else {
        scrollView.pullRefresh().endPullupToRefresh(true);
        return pagenumber;
    }
}

/**
 * 日期快选
 * @param dateValue
 * @returns {string}
 */
function getDatePopover(dateValue) {
    var startTime;
    var endTime;
    var date = new Date();
    var format = dateFormat.day;
    var currentDate = dateFmt(date, format);

    if (dateValue == "today") {
        startTime = currentDate;
        endTime = currentDate;
    } else if (dateValue == "yesterday") {
        date.setDate(date.getDate() - 1);
        startTime = dateFmt(date, format);
        endTime = dateFmt(date, format);
    } else if (dateValue == "thisWeek") {
        var weekDay = date.getDay();
        date.setDate(date.getDate() - (weekDay == 0 ? 6 : weekDay - 1));
        startTime = dateFmt(date, format);
        endTime = currentDate;
    } else if (dateValue == "lastWeek") {
        var weekDay = date.getDay();
        date.setDate(date.getDate() - (weekDay == 0 ? 7 : weekDay));
        endTime = dateFmt(date, format);
        date.setDate(date.getDate() - 6);
        startTime = dateFmt(date, format);
    } else if (dateValue == "thisMonth") {
        startTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-01";
        startTime = dateFmt(new Date(startTime), format);
        endTime = currentDate;
    } else if (dateValue == "lastMonth") {
        endTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-01";
        endTime = dateFmt(new Date(endTime), format);
        startTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth()) : date.getMonth()) + "-01";
        startTime = dateFmt(new Date(startTime), format);
    } else if (dateValue == "7days") {
        date.setDate(date.getDate() - 6);
        startTime = dateFmt(date, format);
        endTime = currentDate;
    } else if (dateValue == "30days") {
        date.setDate(date.getDate() - 29);
        startTime = dateFmt(date, format);
        endTime = currentDate;
    }

    return startTime + "&" + endTime;
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
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}

//(站点消息)选择发送消息类型
function advisoryType(obj, options) {
    mui('#advisoryType').popover('toggle');
    var displayType = document.getElementById("displayType");
    var inputType = document.getElementsByName("result.advisoryType");
    inputType[0].setAttribute('value', obj.getAttribute('value'));
    displayType.innerText = obj.innerHTML;
}

//(游戏公告)点击游戏类型时
function selectGameType(obj, options) {
    mui('#popover').popover('toggle');//show hide toggle
    gameType = obj.getAttribute('value');
    var displayGameType = document.getElementById("displayGameType");
    var typeHtml = obj.innerHTML;
    displayGameType.innerText = typeHtml;
    var data = {//只有游戏公告会进，如有其他也可设置成变量
        "paging.pageNumber": 1,
        "search.startTime": $("#noticeGame").find(".date[name=beginTime]").val(),
        "search.endTime": $("#noticeGame").find(".date[name=endTime]").val(),
        "search.apiId": gameType
    };
    pageNumberGame = pullRefreshUp(root + "/message/gameNotice.html", "noticeGamePartial", 1, "gameLastPageNumber", mui("#noticeGameScroll"), data, true);
}
/**
 * 获取发送消息页
 */
function sendMessage() {
    var options = {
        url: root + "/message/beforeSendMessage.html",
        type: 'get',//HTTP请求类型
        timeout: 10000,//超时时间设置为10秒；
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        dataType: 'html',
        success: function (data) {
            document.getElementById("sendMessage").innerHTML = data;
            pageNumberSite2 = 1;
            if ($('#unReadType').attr("value") == "sendMessage") {
                $('#displayType').text(window.top.message.my_auto['优惠申请']);
                $("input[name='result.advisoryType']").val("offerApplication");
            }
        }
    }
    muiAjax(options);
}

/**
 * 获取游戏公告
 */
function gameNotice(isReload) {
    if (isReload) {
        pageNumberGame = 1;
    }
    var data = {
        "paging.pageNumber": pageNumberGame,
        "search.startTime": gameStartTime,
        "search.endTime": gameEndTime,
        "search.apiId": gameType
    };
    pageNumberGame = pullRefreshUp(root + "/message/gameNotice.html", "noticeGamePartial", pageNumberGame, "gameLastPageNumber", mui("#noticeGameScroll"), data, isReload);
}
/**
 * 获取系统公告
 */
function sysNotice(isReload) {
    if (isReload)
        pageNumberSys = 1;
    var data = {"paging.pageNumber": pageNumberSys, "search.startTime": sysStartTime, "search.endTime": sysEndTime};
    pageNumberSys = pullRefreshUp(root + "/message/systemNotice.html", "noticeSysPartial", pageNumberSys, "sysLastPageNumber", mui("#noticeSysScroll"), data, isReload);
}
/**
 * 获取站点消息1
 */
function site1Notice() {
    var data = {"paging.pageNumber": pageNumberSite1};
    pageNumberSite1 = pullRefreshUp(root + "/message/messageList.html", "noticeSite1Partial", pageNumberSite1, "site1LastPageNumber", mui("#noticeSite1Scroll"), data, false);
}
/**
 * 获取站点消息2
 */
function site2Notice(isReload) {
    if (isReload)
        pageNumberSite2 = 1;
    var data = {"paging.pageNumber": pageNumberSite2};
    pageNumberSite2 = pullRefreshUp(root + "/message/advisoryMessage.html", "noticeSite2Partial", pageNumberSite2, "site2LastPageNumber", mui("#noticeSite2Scroll"), data, isReload);
}

function unReadMessage() {
    var unReadType = $('#unReadType').attr("value");
    if (unReadType == 'sysMessage') {
        site1Notice();
        eitem1 = true;
    } else if (unReadType == 'advisoryMessage') {
        site2Notice(true);
        eitem2 = true;
    } else if (unReadType == 'sendMessage') {
        sendMessage();
        eitem3 = true;
    } else if (unReadType == 'noticeSys') {
        sysNotice(true);
    }
}


function changeStatus(name, isChecked) {
    var site_check = document.getElementsByName(name);
    for (var i = 0; i < site_check.length; i++) {
        if (isChecked) {
            if (site_check[i].className == "gb-radio") {
                site_check[i].classList.add("on")
            }
        } else {
            if (site_check[i].className == "gb-radio on") {
                site_check[i].classList.remove("on")
            }
        }
    }
}

/**
 * 显示未读消息数量
 */
function unReadCount() {
    var options = {
        url: root + "/message/unReadCount.html",
        type: 'get',//HTTP请求类型
        timeout: 20000,//超时时间设置为10秒；
        dataType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        success: function (data) {
            var totalCount = data.sysMessageUnReadCount + data.advisoryUnReadCount;
            if (totalCount > 0)
                $("[data-href='noticeSite']").html(window.top.message.my_auto['站点消息'] + "<span class='unread-count-icon'></span><i></i>");
            else
                $("[data-href='noticeSite']").html(window.top.message.my_auto['站点消息'] + "<i></i>");
            if (data.sysMessageUnReadCount > 0)
                $("[data-href='noticeSite1']").html(window.top.message.my_auto['系统消息'] + "<span class='unread2-count-icon'></span>");
            else
                $("[data-href='noticeSite1']").html(window.top.message.my_auto['系统消息']);
            if (data.advisoryUnReadCount > 0)
                $("[data-href='noticeSite2']").html(window.top.message.my_auto['我的消息'] + "<span class='unread2-count-icon'></span>");
            else
                $("[data-href='noticeSite2']").html(window.top.message.my_auto['我的消息']);
        }
    }
    muiAjax(options);
}

function changeBlur() {
    if (document.activeElement)
        document.activeElement.blur();//当输入域失去焦点 (blur) 时改变其颜色
}
//清空表单
function formReset() {
    $('#messageForm').get(0).reset();
    document.getElementsByName("result.advisoryType")[0].setAttribute("value", "");
    document.getElementById("displayType").innerText = window.top.message.my_auto['请选择'];
}

function getSelectIdsArray(name) {
    var checkedItems = [], counter = 0;
    var site_check = document.getElementsByName(name);
    for (var i = 0; i < site_check.length; i++) {
        if (site_check[i].className == "gb-radio on") {
            checkedItems[counter] = site_check[i].getAttribute("value");
            counter++;
        }
    }
    return checkedItems;
}