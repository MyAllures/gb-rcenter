/**
 * Created by legend on 18-2-18.
 */
/*单个api回收时间间隔*/
var API_RECOVERY_TIME_INTERVAL = 3;
/*一键回收时间间隔*/
var RECOVER_TIME_INTERVAL = 10;

$(function () {
    // //主体内容滚动条
    muiInit(muiDefaultOptions);
});

function recovery(obj) {
    if (!this.isAllowRecovery(obj)) {
        this.toast(window.top.message.transfer_auto["太频繁"]);
        return;
    }
    var title = $(obj).text();
    $(obj).attr("disabled", true);
    $(obj).text(window.top.message.transfer_auto["回收中"]);
    var apiId = $(obj).attr("apiId");
    var url = root + "/transfer/auto/recovery.html";
    if (apiId) {
        url = url + "?search.apiId=" + apiId;
    }
    var options = {
        url: url,
        success: function (data) {
            if (data) {
                if (data.msg) {
                    toast(data.msg);
                } else if (!apiId) {
                    toast(window.top.message.transfer_auto["正在回收"]);
                } else if (data.resultStatus) {
                    if (data.resultStatus == 'SUCCESS') {
                        toast(window.top.message.transfer_auto["回收成功"]);
                        recoveryCallback(obj, apiId);
                    } else if (data.resultCode == 1) {
                        toast(window.top.message.transfer_auto["回收失败"].replace('{0}', data.resultStatus));
                    } else {
                        toast(window.top.message.transfer_auto["正在回收中"]);
                        recoveryCallback(obj, apiId);
                    }
                } else {
                    toast(window.top.message.transfer_auto["正在回收中"]);
                    recoveryCallback(obj, apiId);
                }
            } else {
                toast(window.top.message.transfer_auto["系统繁忙"]);
            }
        },
        error: function (data) {
            toast(window.top.message.transfer_auto["系统繁忙"]);
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
    if(isNative){
        nativeRefreshPage();
    }else{
        window.location.reload();
    }
}

/**
 * 是否允许回收
 */
function isAllowRecovery(obj) {
    var apiId = $(obj).attr("apiId");
    var lastTime = $(obj).attr("lastTime");
    if (!lastTime) {
        return true;
    }
    var date = new Date();
    var timeInterval = parseInt(date.getTime() - lastTime) / 1000;
    if (apiId && timeInterval >= API_RECOVERY_TIME_INTERVAL) {
        return true;
    } else if (!apiId && timeInterval >= RECOVER_TIME_INTERVAL) {
        return true;
    }
    return false;
}

/**
 * 回收回调
 */
function recoveryCallback(obj, apiId) {
    if (!apiId) {
        window.location.reload();
    } else {
        var options = {
            url: root + "/transfer/auto/getApiBalance.html?apiId=" + apiId,
            success: function (data) {
                $("._apiMoney_" + apiId).text(data.money);
                $("#bar-asset").text(data.playerAssets);
                $("header .bar-wallet").text(data.playerWallet);
                $("header #_api_" + apiId).text(data.money);
            }
        };
        muiAjax(options);
    }
    if (isNative) {
        nativeAccountChange();
    }
}
