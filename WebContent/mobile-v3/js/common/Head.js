/**是否登录标识*/
var isLogin = false;
/*一键回收时间间隔*/
var RECOVER_TIME_INTERVAL = 10;
$(function () {
    headInfo();
    //左侧菜单滚动
    var leftMenuScroller = mui(".index-canvas-wrap.side-menu-scroll-wrapper");
    if (leftMenuScroller && leftMenuScroller.length > 0) {
        muiScrollY(leftMenuScroller);
    }
    closeLeftMenu();
});

/**
 *  点击侧边空白隐藏侧边栏
 */
function closeLeftMenu() {
    $(".index-canvas-wrap").on("tap", function (e) {// 点击侧边空白隐藏侧边栏
        if (!$(e.detail.target).parents(".mui-off-canvas-left")[0]) {
            $("html").toggleClass("index-canvas-show");
        }
    });
}
/**
 * 点击右侧玩家信息展示玩家api金额
 */
function userAssert(obj, options) {
    if ($(obj).find(".ex").attr("class") === "ex") {
        if (sessionStorage.getItem("isAutoPay") === "true") {//是否免转
            $("#recovery").removeClass("mui-hidden");
        } else {
            $("#refresh").removeClass("mui-hidden");
        }
    }
    var $siteApi = $('table#api-balance tbody tr');
    if (!$siteApi || $siteApi.length <= 0) {
        getSiteApi();
    }

    $(obj).find(".ex").toggleClass("open");
}
/**
 * 获取头部用户信息
 */
function headInfo() {
    var options = {
        url: root + '/getHeadInfo.html',
        success: function (data) {
            if (data.isLogin == false) {
                $("#notLogin").show();
                $("div.login").hide();
                $("div.un-login").show();
                $("#login-info").addClass("mui-hidden");
                isLogin = false;
                sessionStorage.setItem("isLogin", isLogin);
                $(".side-nav .btn-logout").hide();
            } else {
                $("#notLogin").hide();
                $(".user_name").text(data.name);
                //左侧菜单用户信息显示
                $("div.login p").text(data.name);
                $("div.login").show();
                $("div.un-login").hide();
                $(".money").text(data.currencySign + data.totalAssert);
                //右上角显示用户信息
                $("#login-info").removeClass("mui-hidden");
                isLogin = true;
                sessionStorage.setItem("isLogin", isLogin);
                sessionStorage.setItem("isAutoPay", data.isAutoPay);
            }
        }
    };
    muiAjax(options);
}

/**
 * 打开左侧菜单
 */
function leftMenu(obj) {
    $("html").toggleClass("index-canvas-show");
    $(obj).unlock();
}

/**
 * 请求右侧信息
 * */
function getSiteApi() {
    var options = {
        url: root + '/api/getSiteApi.html',
        success: function (data) {
            if (data) {
                var d = eval(data);
                //$('#bar-username').html(d.username);
                $(".money").text(d.currSign + d.playerAssets);
                $('.bar-wallet').html(d.currSign + d.playerWallet);
                $('.bar-asset').html(d.currSign + d.playerAssets);
                var apis = d.apis;
                for (var i = 0; i < apis.length; i++) {
                    var html = '<tr><td>' + apis[i].apiName + '</td>';
                    if (apis[i].status == 'maintain') {
                        html += '<td class="_money" id="_api_' + apis[i].apiId + '"><span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span></td></tr>';
                    } else {
                        html += '<td class="_money" id="_api_' + apis[i].apiId + '">' + d.currSign + '' + apis[i].balance + '</td></tr>';
                    }
                    $('table#api-balance').append(html);
                }
            } else {
                isLogin = false;
            }
        }
    };
    muiAjax(options);
}
/**
 * 刷新额度
 * */
function refreshApi() {
    //防止事件冒泡
    if (event) {
        event.stopPropagation();
    }
    var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"><div></div><div></div><div></div></div></div>';
    $('.bar-wallet').html(loading);
    $('.bar-asset').html(loading);
    $('table#api-balance').find('td._money').html(loading);
    var options = {
        url: root + '/api/refreshApi.html',
        success: function (data) {
            var d = eval(data);
            $('.bar-wallet').html(d.currSign + d.playerWallet);
            $('.bar-asset').html(d.currSign + d.playerAssets);
            var apis = d.apis;
            for (var i = 0; i < apis.length; i++) {
                var html;
                if (apis[i].status == 'maintain') {
                    html = '<span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span>';
                } else {
                    html = data.currSign + apis[i].balance;
                }
                $('td#_api_' + apis[i].apiId).html(html);
            }
        }
    };
    muiAjax(options);
}

function recovery(obj) {
    if (!isAllowRecovery(obj)) {
        toast(window.top.message.transfer_auto["太频繁"]);
        return;
    }
    var title = $(obj).text();
    $(obj).attr("disabled", true);
    $(obj).text(window.top.message.transfer_auto["回收中"]);
    var url = root + "/transfer/auto/recovery.html";
    var options = {
        url: url,
        success: function (data) {
            if (data) {
                if (data.msg) {
                    toast(data.msg);
                } else {
                    toast(window.top.message.transfer_auto["没有可回收"]);
                }
            } else {
                toast(window.top.message.transfer_auto["系统繁忙"]);
            }
        },
        complete: function () {
            $(obj).attr("disabled", false);
            $(obj).text(title);
            $(obj).attr('lastTime', new Date().getTime());
        }
    };
    muiAjax(options);
}

/**
 * 一键刷新
 */
function reload() {
    if (isNative) {
        nativeRefreshPage();
    } else {
        window.location.reload();
    }
}

/**
 * 是否允许回收
 */
function isAllowRecovery(obj) {
    var lastTime = $(obj).attr("lastTime");
    if (!lastTime) {
        return true;
    }
    var timeInterval = parseInt((new Date().getTime() - lastTime) / 1000);
    if (timeInterval >= RECOVER_TIME_INTERVAL) {
        return true;
    }
    return false;
}
