/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left']
        /*表格添加横向滚动*/
        //horizontalScroll: ['li .ct']
    };
    muiInit(options);
    onPageLoad();
    tableScroll('li .ct');
});

function onPageLoad() {
    $(".gb-select *").css({"background": "", "margin": "", "padding": ""});
    tableScroll(this);
    var isLogin = sessionStorage.getItem("isLogin");
    if (isLogin && isLogin == "true") {
        var $submit = $("#submit");
        var options = eval("(" + $submit.attr("data-rel") + ")");
        changeApplyStatus();
        promoCheck($submit, options);
    }
}

/**
 * 表格横向滚动
 * @param value
 */
function tableScroll(value) {
    var $table = $(value).parent().find("table");
    for (var i = 0; i <= $table.size(); i++) {
        if (!($($table.get(i)).parent().attr("class") == 'mui-scroll')) {
            //给表格添加横向滚动
            $($table.get(i)).wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control " +
                "mui-segmented-control-inverted'> " +
                "<div class='mui-scroll'></div></div>");
            muiScrollY(".scroll2");
            var scrollHeight = $($table.get(i)).height();
            $($table.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
        }
    }
}

/**
 * 活动初始化按钮状态
 * @param obj
 * @param options
 */
function promoCheck(obj, options) {
    var nowTime = new Date($("._now_time").attr("value")).getTime();
    var $obj = $("#submit");
    var st = $("._vr_promo_ostart").attr("value");
    var et = $("._vr_promo_oend").attr("value");
    var sTime = new Date(st).getTime();
    var eTime = new Date(et).getTime();

    if (nowTime < sTime) {
        //未开始
        $obj.html(window.top.message.promo_auto['未开始']);
    } else if (nowTime > eTime) {
        //已结束
        var oldClass = $obj.data("oldClass");
        var newClass = $obj.data("newClass");
        $obj.removeClass(typeof oldClass == "undefined" ? "" : oldClass).addClass(typeof newClass == "undefined" ? "" : newClass).attr("onclick", "").html(window.top.message.promo_auto['已结束']);
    }
}

/**
 * 获取活动状态
 */
function changeApplyStatus() {
    var url = "/promo/getPlayerActivityIds.html";
    var options = {
        url: url,
        success: function (data) {
            filterActyByPlayer(data);
        }
    };
    muiAjax(options);
}

/**
 * 根据活动状态设置申请按钮
 * @param data
 */
function filterActyByPlayer(data) {
    var $obj = $("#submit");
    var startTimeObj = $('._vr_promo_ostart');
    var flag = new Date(startTimeObj.attr("value")) < new Date();
    var oldClass = $obj.data("oldClass");
    oldClass = typeof oldClass == "undefined" ? "" : oldClass;
    var newClass = $obj.data("newClass");
    newClass = typeof newClass == "undefined" ? "" : newClass;
    var options = eval("(" + $obj.attr("data-rel") + ")");
    var code = (options != null) ? options.dataCode : '';
    var rankid = (options != null) ? options.dataRankId : '';
    var searchid = (options != null) ? options.dataSearchId : '';
    //判断用户是否可以参与该活动
    var isContain = false;
    if (rankid == 'all') {
        isContain = true;
    } else if (data.length > 0) {
        for (var j = 0; j < data.length; j++) {
            if (searchid == data[j]) {
                isContain = true;
            }
        }
    }
    if (isContain == false) {
        //$obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").html(window.top.message.promo_auto['未满足条件']);
        $('#submit').addClass("mui-hidden");
        $('#notFit').removeClass("mui-hidden");
    } else if (code == "content") {
        $obj.addClass("mui-hidden");
    }
}

/**
 * 提交优惠申请
 * @param obj
 * @param options
 */
function submitPromo(obj, options) {
    //判断是否有登录，如果没有登录跳转到登录页面
    var isLogin = sessionStorage.getItem("isLogin");
    if (isLogin != 'true') {
        goToUrl(root + "/login/commonLogin.html", null, window.top.location.href);
        return;
    }
    //判断是否是试玩账号，试玩账号无权参与
    var isDemo = sessionStorage.isDemo;
    if (isDemo == 'true') {
        toast('试玩账号无权限参与活动');
        return;
    }
    var code = options.dataCode;
    if (code == 'back_water') {
        toast(window.top.message.promo_auto['参与中']);
    } else {
        joinPromo(obj);
    }
}

/**
 * 申请活动
 * @param aplyObj
 * @param isRefresh
 */
function joinPromo(aplyObj) {
    $(aplyObj).attr("disabled", "disabled");
    var nowTime = new Date($("._now_time").attr("value")).getTime();
    var st = new Date($('._vr_promo_ostart').attr('value')).getTime();
    var et = new Date($('._vr_promo_oend').attr('value')).getTime();
    //活动未开始
    if (st > nowTime || et < nowTime) {
        toast(window.top.message.activity['apply.tip.unstart']);
        return;
    }
    var options = eval("(" + $(aplyObj).attr("data-rel") + ")");
    var code = options.dataCode;
    if (code == "back_water") {
        showWarningMsg(window.top.message.promo_auto['提示'], window.top.message.promo_auto['参与中']);
    } else if (code == 'money') {
        var searchId = options.dataSearchId;
        canShowLottery(searchId);
        $(aplyObj).removeAttr("disabled");
    } else if (code == 'deposit_send' || code == 'effective_transaction' || code == 'profit_loss') {//存就送,有效投注额,盈亏送fetchActivityProcess
        applyActivities(aplyObj, 'fetch');
    } else {// applyActivities
        applyActivities(aplyObj, 'apply');
    }
}

function applyActivities(aplyObj, type) {
    var options = eval("(" + $(aplyObj).attr("data-rel") + ")");
    var url = root + '/promo/applyPromoDetail.html?resultId=' + options.dataSearchId
        + '&activityName=' + encodeURI(encodeURI(options.activityName))
        + '&code=' + options.dataCode
        + '&type=' + type;
    goToUrl(url);
}

/**
 * 跳到优惠记录
 */
function goPromoDetail(obj, options) {
    if (isNative) {
        nativeGotoPromoRecordPage();
    } else {
        goToUrl(options.src);
    }
}

/**
 * 跳转到注册
 * @param obj
 * @param options
 */
function goRegister(obj, options) {
    if (isNative) {
        nativeGoToRegisterPage();
    } else {
        goToUrl(options.src);
    }
}