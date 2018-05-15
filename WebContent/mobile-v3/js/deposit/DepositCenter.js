/**全局map变量*/
var depositMap = {};

$(function () {
    copy();
    muiInit(muiDefaultOptions);
    //原生返回按钮不展示
    if (!isNative) {
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
    $("#list_pay").find(".list_pay_item").removeClass("cur");
    $(obj).find(".list_pay_item").addClass("cur");
    $("#depositInput").html("");
    //存款渠道类型
    var payType = options.payType;
    //跳转路径
    var _url = options.url;
    if (_url && _url != "undefined" && !depositMap[payType]) {
        var ajaxOptions = {
            url: root + _url,
            headers: {'Soul-Requested-With': 'XMLHttpRequest'},
            dataType: 'text/html',
            type: 'post',
            async: true,
            success: function (data) {
                $("#depositInput").html(data);
                depositMap[payType] = data;
            },
            error: function () {
                toast(window.top.message.deposit_auto['网络繁忙']);
            }
        };
        muiAjax(ajaxOptions);
    } else {
        $("#depositInput").html(depositMap[payType]);
    }
}

/**
 * 快速选择
 * @param obj
 * @param options
 */
function quickCheckMoney(obj, options) {
    document.getElementById("result.rechargeAmount").value = options.mone;
}

/**输入存款金额后点击下一步*/
function nextStep(obj, options) {
    var account = $('#accountId').val();
    if (account == '' || account == null) {
        toast("请选择中一个银行");
        return;
    }
    var rechargeAmount = $("input[name='result.rechargeAmount']");
    if (!verificationAmount(rechargeAmount)) {
        return;
    }
    var payType = options.payType;
    if (payType == "online" || payType == "scan") {
        confirmDeposit(obj, payType);
    } else if (payType == "company" || payType == "electronicPay") {
        confirmationAccount(obj, payType, account);
    }
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
function goToDepositPage() {
    if (isNative) {
        nativeGotoDepositPage();
    } else {
        goToUrl(root + '/wallet/v3/deposit/index.html?v=' + Math.random());
    }
}

/**
 * 连续失败后仍继续选择该渠道
 */
function continueDeposit(e, option) {
    $("#failureHints").hide();
    $("#failureHintsMasker").hide();
    var channel = $("#channel").val();
    if (channel == "online" || channel == "scan") {
        onlineContinueDeposit(channel);
    } else if (channel == "company" || channel == "electronic") {
        companyContinueDeposit(channel);
    }

}

function selectCompanyBank(obj, options) {
    $("#company_bank_list").find(".bank_list_i").removeClass("cur");
    $(obj).find(".bank_list_i").addClass("cur");
    $('#bankCode').val(options.bankCode);
    $('#accountId').val(options.accountId);
}

function selectScanCode(obj, options) {
    $('#scan_Bank_List').find(".bank_list_i").removeClass("cur");
    $(obj).find(".bank_list_i").addClass("cur");
    var account = $(obj).find("input")[0];
    var min = $(account).attr("onlinePayMin") == "" ? "0.01" : $(account).attr("onlinePayMin");
    var max = $(account).attr("onlinePayMax") == "" ? "99999999" : $(account).attr("onlinePayMax");
    var siteCurrencySign = document.getElementById('siteCurrencySign').value;
    //根据所选账号设置隐藏元素
    document.getElementById('result.rechargeAmount').value = "";
    document.getElementById("onlinePayMax").value = $(account).attr("onlinePayMax");
    document.getElementById("onlinePayMin").value = $(account).attr("onlinePayMin");
    document.getElementById("account").value = $(account).attr("account");
    document.getElementById("accountId").value = $(account).attr("account");
    document.getElementById("result.payerBank").value = $(account).attr("payerBank");
    document.getElementById("depositChannel").value = $(account).attr("depositChannel");
    document.getElementById('result.rechargeAmount').setAttribute("placeholder", "" + siteCurrencySign + Number(min).toFixed(2) + "~" + siteCurrencySign + Number(max).toFixed(2));
    //处理随机金额
    var randomAmount = $(account).attr("randomAmount");
    if (randomAmount == "true") {
        $("input[name='result.randomCash']").val($('#randomValue').val());
        $("#random_amount").show();
    } else {
        $("input[name='result.randomCash']").val("");
        $("#random_amount").hide();
    }
    //设置按钮显示
    if ($("#depositChannel").val() == 'electronic') {
        $("#btn_electronicPay").show();
        $("#btn_scan").hide();
        $("#statuNum").val("1");
    } else {
        $("#btn_scan").show();
        $("#btn_electronicPay").hide();
        $("#statuNum").val("");
    }
}