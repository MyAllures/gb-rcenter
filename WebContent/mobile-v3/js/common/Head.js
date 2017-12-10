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
function userAssert(obj, options) {
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
                sessionStorage.removeItem("")
            } else {
                $("#notLogin").hide();
                $(".user_name").text(data.name);
                //设置头像
                if (data.avatar) {
                    $('#avatarImg').attr('src', data.avatar);
                }
                //左侧菜单用户信息显示
                $("div.login p").text(data.name);
                $("div.login").show();
                $("div.un-login").hide();
                $(".money").text(data.totalAssert);
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

/**
 * android隐藏头部
 */
function hideHeader() {
    if (os == 'app_android') {
        /*$('header.mui-bar-nav').addClass("mui-hidden");*/
        $('header.mui-bar-nav').remove();
    }
}