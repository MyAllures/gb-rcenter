$(function () {
    //初始化获取教程
    initMySwiper();
});
/*线上支付银行下拉*/
var bankPick = null;
/**
 * 初始化银行列表
 */
function initOnlineBankList() {
    if (document.getElementById('bankJson')) {
        var bankList = document.getElementById('bankJson').value;
        var data = JSON.parse(bankList);
        var siteCurrencySign = document.getElementById('siteCurrencySign').value;
        bankPick = new mui.PopPicker();
        bankPick.setData(data);
    }
}
/**
 * 初始化获取教程
 */
function initMySwiper() {
    var mySwiper = new Swiper('.swiper-container', {
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination'
        }
    });
    for (var i = 0; i < mySwiper.length; i++) {
        mySwiper[i].init();
    }
}

/**线上支付确认存款，查询是否有优惠*/
function confirmDeposit(obj, payType) {
    //验证存款金额
    var rechargeAmount = $("input[name='result.rechargeAmount']");
    if (rechargeAmount && payType == "online" && $("input[name='result.randomCash']").val()) {
        if (!verificationAmount(rechargeAmount)) {
            return false;
        }
    }

    var href = "";
    var $form;
    if (payType == "online") {
        href = "/wallet/deposit/online/submit.html";
        $form = $("#onlineForm");
    } else if (payType == "scan") {
        href = "/wallet/deposit/online/scan/submit.html";
        $form = $("#scanForm");
    }
    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }
    var activityId = $("input[name=activityId][type=radio]:checked").val();
    if (activityId) {
        $form.find("input[name=activityId]").val(activityId);
    }
    var options = {
        url: root + href,
        data: $form.serialize(),
        type: 'post',
        async: false,
        dataType: 'text/html',
        success: function (data) {
            if ($("#depositSalePop").length > 0) {
                $("#depositSalePop").remove();
            }
            $(".mui-content").append(data);
            var unCheckSuccess = $("#unCheckSuccess").attr("unCheckSuccess");
            if (unCheckSuccess == "true") {
                var pop = $("#pop").attr("pop");
                if (pop === "true") {
                    $("#activityId").val($("input[type=radio]:checked").val());
                    muiScrollY(".gb-withdraw-box .mui-scroll-wrapper");
                } else {
                    onlinePaySubmit(payType);
                }
            } else {
                //验证提示
                toast($("#tips").attr("tips"));
            }
        },
        error: function (xhr) {
            toast(xhr);
            toast(window.top.message.deposit_auto['网络繁忙']);
        }
    };
    muiAjax(options);
}

/**当玩家开启随机额度提交时，对金额进行前台验证*/
function verificationAmount(rechargeAmount) {
    if (rechargeAmount.val() == null || rechargeAmount.val() == "") {
        toast(window.top.message.deposit_auto['请输入金额']);
        return false;
    } else if (!/^[0-9]*$/.test(rechargeAmount.val())) {
        toast(window.top.message.deposit_auto['请输入整数金额']);
        return false;
    } else {
        var min = Number($("#onlinePayMin").val());
        var max = Number($("#onlinePayMax").val());
        var amount = Number(rechargeAmount.val()) + Number($("input[name='result.randomCash']").val()) / 100;
        if (!/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(amount.toFixed(2))) {
            toast(window.top.message.deposit_auto['金额格式不对']);
            return false;
        } else if (amount >= min && amount <= max) {
            return true;
        } else {
            toast(window.top.message.deposit_auto['单笔存款金额为'] + min + "~" + max);
            return false;
        }
    }
}

/**展示所有存款银行*/
function showBankList() {
    if (!bankPick) {
        initOnlineBankList();
    }
    bankPick.show(function (items) {
        var item = items[0];
        var min = isNaN(item.min) ? 0.01 : item.min;
        var max = isNaN(item.max) ? 99999999 : item.max;
        document.getElementById('result.payerBank').value = item.value;
        document.getElementById('selectText').innerHTML = item.text;
        document.getElementById('onlinePayMin').value = min;
        document.getElementById('onlinePayMax').value = max;
        document.getElementsByName('account').value = item.account;
        document.getElementById('result.rechargeAmount').setAttribute("placeholder", "" + siteCurrencySign + Number(min).toFixed(2) + "~" + siteCurrencySign + Number(max).toFixed(2));
    });
}
/**线上支付提交存款*/
function onlinePaySubmit(depositChannel) {
    var $form;
    var url = "";  //本地提交存款订单路径，
    var href = ""; //第三方支付页面路径
    if (depositChannel == "online") {
        url = "/wallet/deposit/online/deposit.html";
        href = root + "/wallet/deposit/online/pay.html?pay=online&search.transactionNo=";
        $form = $("#onlineForm");
    } else {
        href = root + "/wallet/deposit/online/scan/pay.html?pay=online&search.transactionNo=";
        $form = $("#scanForm");
        if ($("input[name='result.randomCash']").val()) {
            url = "/wallet/deposit/online/scan/scanRandomCodeSubmit.html"
        } else {
            url = "/wallet/deposit/online/scan/scanCodeSubmit.html";
        }
    }
    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }
    if (!isNative) {
        var newWindow = window.open("about:blank", '_blank');
        if (newWindow) {
            newWindow.document.write("<div style='text-align:center;'><img style='margin-top:" + document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/oval.svg'></div>");
        }
    }

    var options = {
        url: url,
        dataType: 'json',
        data: $form.serialize(),
        type: 'post',
        async: false,
        success: function (data) {
            if (!data) {
                toast("提交失败！");
                if (newWindow) {
                    newWindow.close();
                }
            } else {
                var state = data.state;
                $("input[name='gb.token']").val(data.token);
                if (state == true) {
                    var orderNo = data.orderNo;
                    var payUrl = href + orderNo;
                    if (newWindow) {
                        newWindow.location = payUrl;
                    } else {
                        if (isNative) {
                            nativeOpenWindow(payUrl, '0');
                        } else {
                            goToUrl(payUrl)
                        }
                    }
                    sendComm(orderNo);
                    if (newWindow) {
                        success();
                    }

                } else {
                    toast(data.msg);
                }
            }

        },
        error: function (data) {
            $("input[name='gb.token']").val(data.token);
        }
    };
    muiAjax(options);
}

/**存款成功后弹窗提示*/
function success() {
    var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
    var options = {
        title: window.top.message.deposit_auto["提交订单"],
        confirm: window.top.message.deposit_auto["第三方对接"]
    };
    mui.confirm(options.confirm, options.title, btnArray, function (e) {
        if (e.index == 0) {
            goToFundRecord();
        } else {
            goToUrl(root + "/wallet/deposit/index.html");
        }
    });
}

/**
 * 跳转资金记录
 */
function goToFundRecord() {
    if (isNative) { //原生
        nativeGotoTransactionRecordPage();
    } else {
        goToUrl(root + "/fund/record/index.html?search.transactionType=deposit");
    }
}

function linkResult(data) {
    goToUrl(root + '/wallet/deposit/online/result.html?search.transactionNo=' + data);
    var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
    var options = {
        title: window.top.message.deposit_auto["订单结果"],
        confirm: ''
    };
    mui.confirm(options.confirm, options.title, btnArray, function (e) {
        if (e.index == 0) {
            goToFundRecord();
        } else {
            goToUrl(root + "/wallet/deposit/index.html");
        }
    });
}

/**
 * 监听返回页面订单
 */
function sendComm(transactionNo) {
    var param = {
        url: mdRoot,
        localeType: language.replace("-", "_"), isImmediatelyConnect: true
    };
    param.success = function () {
        console.info(window.top.message.deposit_auto['连接成功']);
        subscribeMsg("MSITE-ONLINERECHARGE", function (data) {
            var result = eval("(" + eval("(" + data + ")").msgBody + ")");
            var orderId = result.orderId;
            if (orderId == transactionNo) {
                linkResult(orderId);
            }
        });
    };
    param.failure = function () {
        console.info('连接失败');
    };
    // init(param);
}

/**展示反扫教程*/
function reScanCourse(obj, opotions) {
    var accountType = opotions.accountType;
    var depositHelpBox = $("div#depositHelpBox" + accountType);
    depositHelpBox.show();
}

/**关闭反扫教程*/
function closeHelpBox(obj, options) {
    $(obj).parent().parent().hide();
}
