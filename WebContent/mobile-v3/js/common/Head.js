/**是否登录标识*/
var isLogin = false;
/*一键回收时间间隔*/
var RECOVER_TIME_INTERVAL = 10;

$(function () {
    //只有h5需要刷新头部信息，安卓 ios会自己调用方法刷新头部信息
    if (os.indexOf("app") < 0) {
        headInfo();
    }
    //安卓去掉头部部分
    hideHeader();
});
/**
 * 点击右侧玩家信息展示玩家api金额
 */
function userAssert(obj,options) {
    $(obj).find(".ex").toggleClass("open");
}
/**
 * 获取头部用户信息
 */
function headInfo() {
    var options = {
        url: root + '/sysUser.html',
        success: function (data) {
            if (data == 'unLogin') {
                $("#notLogin").show();
                $("div.login").hide();
                $("div.un-login").show();
                $("#login-info").addClass("mui-hide");
                isLogin = false;
                sessionStorage.setItem("isLogin", isLogin);
            } else {
                $("#notLogin").hide();
                $(".user_name").text(data.username);
                //设置头像
                if (!data.avatarUrl) {
                    $('#avatarImg').attr('src', resRoot + "/images/avatar.png");
                }
                //左侧菜单用户信息显示
                $("div.login p").text(data.username);
                $("div.login").show();
                $("div.un-login").hide();
                //右上角显示用户信息
                $("#login-info").removeClass("mui-hide");
                isLogin = true;
                sessionStorage.setItem("isLogin", isLogin);
                getSiteApi();
            }
        }
    };
    muiAjax(options);
}


/**
 * 打开左侧菜单
 */
function leftMenu(obj) {
    if (mui('.mui-off-canvas-wrap').offCanvas().isShown('left')) {
        mui('.mui-off-canvas-wrap').offCanvas().close();
        $(".lang-menu").hide();
    } else {
        mui('.mui-off-canvas-wrap').offCanvas().show();
    }
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
                $(".money").text(d.playerAssets);
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

/**
 * 回收
 * */
function recovery(obj, options) {
    if (isAutoPay == false) {
        toast(window.top.message.common_auto["无免转"]);
        return;
    }
    if (!isAllowRecovery(obj)) {
        toast(window.top.message.common_auto["太频繁"]);
        return;
    }
    var title = $(obj).text();
    $(obj).attr("disabled", true);
    $(obj).text("回收中...");

    var option = {
        url: root + "/transfer/auto/recovery.html",
        success: function (data) {
            if (data) {
                if (data.msg) {
                    toast(data.msg);
                } else {
                    toast(window.top.message.common_auto["正在回收"]);
                }
            } else {
                toast(window.top.message.common_auto["系统繁忙"]);
            }
            recoveryCallBack();
        },
        error: function (data) {
            toast(window.top.message.common_auto["系统繁忙"]);
        },
        complete: function () {
            $(obj).attr("disabled", false);
            $(obj).text(title);
            $(obj).attr('lastTime', new Date().getTime());
        }
    };
    muiAjax(option);
};

function recoveryCallBack() {
    var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"><div></div><div></div><div></div></div></div>';
    $('.bar-wallet').html(loading);
    $('.bar-asset').html(loading);
    $('table#api-balance').find('td._money').html(loading);

    setTimeout(function () {

        var options = {
            url: root + "/transfer/auto/getApiBalances.html",
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
                        html = d.currSign + apis[i].balance;
                    }
                    $('td#_api_' + apis[i].apiId).html(html);
                }
            }
        };
        muiAjax(options);
    }, 1000);
};

/**
 * 是否允许回收
 */
function isAllowRecovery(obj) {
    var lastTime = $(obj).attr("lastTime");
    if (!lastTime) {
        return true;
    }
    var date = new Date();
    var timeInterval = parseInt(date.getTime() - lastTime) / 1000;
    if (timeInterval >= RECOVER_TIME_INTERVAL) {
        return true;
    }
    return false;
}

/**
 * android隐藏头部
 */
function hideHeader() {
    if (os == 'app_android') {
        $('header.mui-bar-nav').remove();
    }
}