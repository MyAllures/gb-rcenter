var BaseDeposit = function () {
    var _this = this;
    var active_dialog = null;
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
                _this.active_dialog  = mui.alert(data, '消息');
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
        //将提示层删除...
        if(_this.active_dialog){
            _this.active_dialog.close();
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
                        if (payUrl) {
                            var newWindow = window.open("about:blank", '_blank');
                            newWindow.document.write("<div style='text-align:center;'><img style='margin-top:" + document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/oval.svg'></div>");
                            newWindow.location = payUrl;
                            _this.sendComm(orderNo);
                            _this.success();
                        } else {
                            $("#successMasker , .window-ok").attr("style", "display: block;");
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
    //下一步，一般为公司入款才用到
    this.nextStep = function (obj, options) {
        var rechargeAmount = $("input[name='result.rechargeAmount']");
        if (!_this.verificationAmount(rechargeAmount)) {
            return false;
        }
        var key = $("#account").val();
        if (key == '' || key == null) {
            toast("请选择一个银行或账号.");
            return false;
        }
        var url = "/wallet/v3/deposit/nextStep.html?rechargeType=" + $("input[name='result.rechargeType']").val() + "&depositCash=" + rechargeAmount.val() + "&channel=" + $("#channel").val() + "&searchId=" + key + "&v=" + Math.random();
        goToUrl(url);
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


    //存款完成后调用:在线支付
    this.success = function () {
        /**存款成功后弹窗提示*/
        var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
        var options = {
            title: window.top.message.deposit_auto["提交订单"],
            confirm: window.top.message.deposit_auto["第三方对接"]
        };
        mui.confirm(options.confirm, options.title, btnArray, function (e) {
            if (e.index == 0) {
                goToUrl(root + "/fund/record/index.html?search.transactionType=deposit");
            } else {
                goToUrl(root + "/wallet/v3/deposit/index.html");
            }
        });
    };
}
var baseDeposit = new BaseDeposit();