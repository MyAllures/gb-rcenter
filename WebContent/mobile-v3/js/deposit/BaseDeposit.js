var BaseDeposit = function () {
    var _this = this;
    this.quickCheckMoney = function (obj, options) {
        document.getElementById("result.rechargeAmount").value = options.mone;
    };
    //验证金额
    this.verificationAmount = function (rechargeAmount) {
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
    };
    //弹出活动提醒
    this.activity = function () {
        var rechargeAmount = $("input[name='result.rechargeAmount']");
        if (rechargeAmount && $("input[name='result.randomCash']").val()) {
            if (!_this.verificationAmount(rechargeAmount)) {
                return false;
            }
        }
        var $form = $("#rechargeForm");
        bindFormValidation($form);
        if (!$form || !$form.valid()) {
            return false;
        }
        var href = "/wallet/v3/deposit/activity.html";
        var options = {
            url: root + href,
            data: $form.serialize(),
            type: 'post',
            async: false,
            dataType: 'text/html',
            success: function (data) {
                mui.alert(data, '消息');
                $('.mui-popup').addClass('deposit_promo_dialog');
                mui('.pro_lis .mui-scroll-wrapper').scroll();
                $('.mui-popup').find(".mui-popup-button").html('').append("<i class='mui-icon mui-icon-close'></i>");
                $('.mui-popup-inner').find('br').remove();
            },
            error: function (xhr) {
                toast(window.top.message.deposit_auto['提交失败请刷新']);
                //goToHome(root+"/wallet/deposit/index.html?v="+Math.random());
            }
        };
        muiAjax(options);
    };
    //提交充值信息
    this.submitDeposit = function (obj, options) {
        var url = "/wallet/v3/deposit/submit.html";
        var $form = $("#rechargeForm");
        bindFormValidation($form);
        var activityId = $("input[name=activityId][type=radio]:checked").val();
        if (activityId) {
            $form.find("input[name=activityId]").val(activityId);
        }
        var options = {
            url: url,
            dataType: 'json',
            data: $form.serialize(),
            type: 'post',
            async: false,
            success: function (data) {
                if (!data) {
                    toast(window.top.message.deposit_auto['提交失败请刷新']);
                } else {
                    var state = data.state;
                    $("input[name='gb.token']").val(data.token);
                    if (state == true) {
                        var orderNo = data.orderNo;
                        var payUrl = data.payUrl;
                        goToUrl(payUrl)
                        sendComm(orderNo);
                        if (newWindow) {
                            success();
                        }
                    } else {
                        toast(data.msg);
                        if (data.accountNotUsing) {
                            setTimeout(function () {
                                this.goToDepositPage();
                            }, 2000);
                        }
                    }
                }
            },
            error: function (data) {
                $("input[name='gb.token']").val(data.token);
            }
        };
        muiAjax(options);
    };
    //等待通知信息
    this.sendComm = function (transactionNo) {
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
    };
    //下一步，一般为公司入款才用到
    this.nextStep = function (obj, options) {
        var rechargeAmount = $("input[name='result.rechargeAmount']");
        if (!_this.verificationAmount(rechargeAmount)) {
            return false;
        }
        var key = $("#account").val();
        if(key==''||key==null){
            toast("请选择一个银行或账号.");
            return false;
        }
        var url = "/wallet/v3/deposit/nextStep.html?payType="+$("input[name='result.rechargeType']").val()+"&depositCash="+rechargeAmount.val()+"&channel=" + $("#channel").val() + "&search.id=" + key + "&v=" + Math.random();
        goToUrl(url);
    }
}
var baseDeposit = new BaseDeposit();