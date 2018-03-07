/**全局map变量*/
var depositMap = {};

$(function () {
    copy();
    muiInit(muiDefaultOptions);
    //原生返回按钮不展示
    if(!isNative) {
        $("#depositBack").show();
    }
    //如果第一个元素不是比特币支付或数字货币支付则默认选中
    var $depositWay = $("#payList li>a:first");
    if ($depositWay) {
        var key = $("#payList li:first").attr("key");
        if (key && (key != 'bitcoin_fast' && key != 'digiccyAccountInfo' && key != 'isFastRecharge')) {
            amountInput($depositWay, JSON.parse($depositWay.attr("data-rel")));
        }
    }
});
/**
 * 跳转快充
 * @param obj
 * @param options
 */
function fastRecharge(obj, options) {
    var url = options.url;
    if (isNative) {
        nativeOpenWindow(url, '1');
    } else {
        goToUrl(url, true);
    }
}

/**加载存款金额输入框*/
function amountInput(obj, options) {
    $("#payList li>a").removeClass("active");
    $("#depositInput").html("");
    //存款渠道类型
    var payType = options.payType;
    //跳转路径
    var _url = options.url;
    $(obj).addClass("active");
    var key = $(obj).parent().attr("key");
    if (_url && _url != "undefined" && !depositMap[key]) {
        var ajaxOptions = {
            url: root + _url,
            headers: {'Soul-Requested-With': 'XMLHttpRequest'},
            dataType: 'text/html',
            type: 'post',
            async: true,
            success: function (data) {
                $("#depositInput").html(data);
                depositMap[key] = data;
            },
            error: function () {
                toast(window.top.message.deposit_auto['网络繁忙']);
            }
        };
        muiAjax(ajaxOptions);
    } else {
        $("#depositInput").html(depositMap[key]);
    }
}

/**输入存款金额后点击下一步*/
function nextStep(obj) {
    var aTag = $("#payList li>a.active");
    if (aTag) {
        var payType = JSON.parse(aTag.attr("data-rel")).payType;
        var key = aTag.parent().attr("key");
        if (payType == "online" || payType == "scan") {
            confirmDeposit(obj, payType);
        } else if (payType == "company" || payType == "electronicPay") {
            confirmationAccount(obj, payType, key);
        }
    }
}

/**快选金额*/
function quickSelection(obj, options) {
    $("#selectMoney").find("a").removeClass("active");
    $(obj).addClass("active");
    $("input[name='result.rechargeAmount']").val(options.money);
}

/**
 * 复制文本
 * @param obj
 */
function copy() {
    var clipboard = new Clipboard(".copy");
    clipboard.on('success', function (e) {
        toast(window.top.message.deposit_auto['复制成功']);
    });

    clipboard.on('error', function (e) {
        toast(window.top.message.deposit_auto['复制失败']);
    });
}

/**提交存款*/
function submitDeposit(obj, options) {
    $("body>#activityId").val($("input[name='activityId']:checked").val());
    $('#masker').hide();
    $(obj).parents('.gb-withdraw-box').hide();
    var depositChannel = $("input[name='depositChannel']").val();
    if (depositChannel == "scan" || depositChannel == "online" || depositChannel == "reverseSacn") {
        onlinePaySubmit(depositChannel);
    } else if (depositChannel == "company" || depositChannel == "electronic" || depositChannel == "bitcoin") {
        companyDepositSubmit(depositChannel);
    }
}

/**关闭弹窗*/
function closeProWindow(obj, options) {
    $('#masker').hide();
    $('#successMasker').hide();
    $(obj).parents('.gb-withdraw-box').hide();
    if ($("#applySale")) {
        $("#applySale").removeClass("mui-active");
        $("#applySale").html("");
    }
}

/**保存图片*/
function savePicture(obj, options) {
    var imgUrl = options.url;
    if (imgUrl) {
        if (isNative) {
            nativeSaveImage(imgUrl);
        } else if (/.(gif|jpg|jpeg|png)$/.test(imgUrl)) {
            var a = document.createElement('a');
            a.href = imgUrl;
            a.download = imgUrl;
            a.click();
        }
    }
}

/**
 * 返回至首页
 */
function goToHome() {
    if (isNative) {
        gotoHomePage();
    } else {
        goToUrl(root + '/mainIndex.html');
    }
}

/**跳转到存款页面*/
function goToDepositPage(){
    if (isNative) {
        nativeGotoDepositPage();
    } else {
        goToUrl(root + '/wallet/deposit/index.html?v=' + Math.random());
    }
}

/**
 * 连续失败后仍继续选择该渠道
 */
function continueDeposit(e,option){
    $("#failureHints").hide();
    $("#failureHintsMasker").hide();
    var channel = $("#channel").val();
    if(channel == "online" || channel == "scan"){
        onlineContinueDeposit(channel);
    }else if(channel == "company" || channel == "electronic"){
        companyContinueDeposit(channel);
    }

}
