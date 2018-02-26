/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left'],
        /*表格添加横向滚动*/
        horizontalScroll:['li .ct']
    };
    muiInit(options);
    onPageLoad();
});

function submit(obj,options){
    var isLogin = sessionStorage.getItem("isLogin");
    if (isLogin && isLogin === "true") {
        var isDemo = options.isDemo;
        if (isDemo == 'true') {
            alert('试玩账号无权限参与活动');
        } else {
            joinPromo(obj);
        }
    }else{
        if (os == 'app_android'){
            window.gamebox.goLogin();
        }else{
           login("/");
        }
    }
}

function onPageLoad() {
    var isLogin = sessionStorage.getItem("isLogin");
    $(".gb-select *").css({"background": "", "margin": "", "padding": ""});
    tableScroll(this);
    if (isLogin && isLogin === "true") {
        var $submit = $(".submit");
        var options = eval("("+ $submit.attr("data-rel")+")" );
        var code = options.dataCode;
        var isDemo = options.isDemo;
        //var code = $submit.data("code");
        if (code === 'content') {
            $submit.text(window.top.message.promo_auto['立即加入']);
            $submit.on("tap", function () {
                goToUrl(root+"/message/gameNotice.html?isSendMessage=true");
            })
        } else if (code === 'back_water') {
            $submit.text(window.top.message.promo_auto['参与中']);
            $submit.attr("disabled", "disabled");
        } else {
            if (code === 'money') {
                $submit.text(window.top.message.promo_auto['抢红包']);
            }
            $submit.on("tap", function () {
                if (isDemo == 'true') {
                    alert('试玩账号无权限参与活动');
                } else {
                    joinPromo(this);
                }
            });
        }
        changeApplyStatus();
        promoCheck(options);
        mui('#activity-content').on('tap', 'a', function () {
            var href = $(this).attr('href');
            goToUrl(href);
        })
    }
}

function promoCheck(obj, options) {
    var nowTime = new Date($("._now_time").attr("value")).getTime();
    var $obj = $("button.submit");
    // var st = $obj.parent().parent().find("._vr_promo_ostart").attr("value");
    var st = $("._vr_promo_ostart").attr("value");
    var et = $("._vr_promo_oend").attr("value");
    // var et = $obj.parent().parent().find("._vr_promo_oend").attr("value");
    var sTime = new Date(st).getTime();
    var eTime = new Date(et).getTime();

    if (nowTime < sTime) {
        //未开始
        $obj.text(window.top.message.promo_auto['未开始']);
    } else if (nowTime > sTime && nowTime < eTime) {
        // var code = $obj.data("code");
        var code = obj.dataCode;
        //进行中
        if (code === 'money') {
            $(".submit").text(window.top.message.promo_auto['抢红包']);
        } else if (code !== "back_water") {
            $obj.text(window.top.message.promo_auto['立即加入']);
        }
    } else if (nowTime > eTime) {
        //已结束
        var oldClass = $obj.data("oldClass");
        var newClass = $obj.data("newClass");
        $obj.removeClass(typeof oldClass == "undefined" ? "" : oldClass).addClass(typeof newClass == "undefined" ? "" : newClass).attr("onclick", "").text(window.top.message.promo_auto['已结束']);
    }

}



function tableScroll(value) {

    var $table = $(value).parent().find("table");
    for (var i = 0; i <= $table.size(); i++) {
        if (!($($table.get(i)).parent().attr("class") == 'mui-scroll')) {
            //给表格添加横向滚动
            $($table.get(i)).wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control " +
                "mui-segmented-control-inverted'> " +
                "<div class='mui-scroll'></div></div>");
            mui(".scroll2").scroll();

            var scrollHeight = $($table.get(i)).height();
            $($table.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
        }
    }

}


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

function joinPromo(aplyObj, isRefresh) {
    // t.toast(window.top.message.promo_auto['请在电脑版上申请活动']);
    $(aplyObj).attr("disabled", "disabled");
    var nowTime = new Date($("._now_time").attr("value")).getTime();
    var st = new Date($('.mui-row ._vr_promo_ostart').attr('value')).getTime();
    var et = new Date($('.mui-row ._vr_promo_oend').attr('value')).getTime();
    if (st > nowTime || et < nowTime) {
        toast("活动未开始");
        return;
    }

    var options = eval("(" + $(aplyObj).attr("data-rel") + ")");
    var code = options.dataCode;//$(aplyObj).data("code");
    if (code == "back_water" || code == "first_deposit" || code == "deposit_send") {
        if (isRefresh) {
             showWarningMsg(window.top.message.promo_auto['提示'],window.top.message.promo_auto['参与中'],function(){window.location.reload();});
             mui("body").alert({
                 title: window.top.message.promo_auto['提示'],
                 message: window.top.message.promo_auto['参与中'],
                 callback: function () {
                 window.location.reload();
                 }
             });
         }
        showWarningMsg(
            window.top.message.promo_auto['提示'],
            window.top.message.promo_auto['参与中'],
            function () {
                //window.location.reload();
            }
        );
        return;
    } else {
        if (isRefresh) {
            applyActivities(aplyObj, true);
        } else {
            if (code === 'money') {
                var searchId = options.dataSearchId;// $(aplyObj).data("searchid");
                canShowLottery(searchId);
                $(aplyObj).removeAttr("disabled");
            } else {
                applyActivities(aplyObj);
            }
        }
    }
}

function applyActivities(aplyObj, isRefresh) {
    var _this = this;
    var options = eval("(" + $(aplyObj).attr("data-rel") + ")");
    var code = options.dataCode;//$(aplyObj).data("code");
    var searchId = options.dataSearchId;//$(aplyObj).data("searchid");
    mui.ajax({
        url: "/promo/applyActivities.html",
        type: "POST",
        dataType: "json",
        data: {
            code: code,
            resultId: searchId
        },
        success: function (data) {
            showWin(data, isRefresh);
            $(aplyObj).removeAttr("disabled");
        },
        error: function (xhr) {
            toast(window.top.message.promo_auto['申请失败']);
            $(aplyObj).removeAttr("disabled");
        }
    })
}

function showWin(data, isRefresh) {
    if (typeof data.state == "undefined") {
        return false;
    }
    var title;
    if (!data.msg) {
        data.msg = '';
    }
    if (data.state) {
        title = window.top.message.promo_auto['申请成功'];
    } else {
        title = window.top.message.promo_auto['申请失败'];
    }
    if (data.title) {
        title = data.title;
    }
    var options = {
        btnArray: [window.top.message.promo_auto['查看优惠记录'], window.top.message.promo_auto['好的']],
        title: title,
        confirm: data.msg,
        func: doWin
    };
    showConfirmMsg(options);

    /*layer.open({
     title: title,
     content: data.msg,
     btn: [window.top.message.promo_auto['查看优惠记录'], window.top.message.promo_auto['好的']],
     yes: function() {
     goToUrl("/promo/myPromo.html");
     },
     no: function () {
     window.location.reload();
     }
     });*/
}

function doWin() {
    goToUrl(root + "/promo/myPromo.html");
}

function filterActyByPlayer(obj, data) {
    var $obj = $("button.submit");
    var startTimeObj = $('.mui-row ._vr_promo_ostart');
    var flag = new Date(startTimeObj.attr("value")) < new Date();
    var oldClass = $obj.data("oldClass");
    oldClass = typeof oldClass == "undefined" ? "" : oldClass;
    var newClass = $obj.data("newClass");
    newClass = typeof newClass == "undefined" ? "" : newClass;
    var options = eval("(" + $obj.attr("data-rel") + ")");
    var code = options.dataCode;
    var rankid = options.dataRankId;
    var searchid = options.dataSearchId;
    if ((code == "first_deposit" || code == "deposit_send") && flag) {
        if (obj.length < 1) {
            if (rankid === "all") {
                $obj.removeClass(oldClass).addClass(newClass + " mui-disabled").text(window.top.message.promo_auto['存款时申请']);
            } else {
                $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
            }
        } else {
            var isContain = false;
            for (var j = 0; j < obj.length; j++) {
                if (searchid === obj[j]) {
                    isContain = true;
                }
            }
            if (isContain || rankid === "all") {
                $obj.removeClass(oldClass).addClass(newClass + " mui-disabled").text(window.top.message.promo_auto['存款时申请']);
            } else {
                $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
            }
        }
    }
    if (code == "regist_send" || code == "relief_fund" || code == "profit_loss" || code == "effective_transaction") {
        if (obj.length < 1) {
            if (rankid != "all" && flag) {
                $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
            }
        }
        if (obj.length > 0 && rankid != "all" && flag) {
            var isContain = false;
            for (var j = 0; j < obj.length; j++) {
                if (searchid === obj[j]) {
                    isContain = true;
                }
            }
            if (!isContain) {
                $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
            }
        }
    }
}