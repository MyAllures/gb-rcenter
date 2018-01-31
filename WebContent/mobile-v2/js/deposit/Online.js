/**
 * Created by fei on 16-10-15.
 */
define(['site/deposit/BaseDeposit', 'gb/components/Comet'], function (BaseDeposit) {
    return BaseDeposit.extend({

        init: function (formSelector) {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            $("body").on("click", "ul :radio", function () {
                $("#activityId").val($(this).val());
            });
        },

        success: function () {
            var _this = this;
            var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
            layer.open({
                title: window.top.message.deposit_auto["提交订单"],
                content: window.top.message.deposit_auto["第三方对接"],
                btn: btnArray,
                shadeClose: false,
                yes: function (index) {
                    _this.completion();
                    layer.close(index);
                },
                no: function (index) {
                    _this.back();
                    layer.close(index);
                }
            });
        },

        completion: function () {
            var url = root + "/fund/record/index.html?search.transactionType=deposit";
            if (this.os == 'app_android') {
                this.back();//app跳转时需要刷新页面
                this.gotoUrl(url);
            } else if (this.os == 'app_ios') {
                this.back();
                gotoCustom(url);
            } else {
                this.openWindow(url);
            }
        },

        openWindow: function (url) {
            mui.openWindow({
                url: url,
                id: url,
                extras: {},
                createNew: true,
                show: {
                    autoShow: true
                },
                waiting: {
                    autoShow: true,
                    title: window.top.message.deposit_auto["正在加载"]
                }
            })
        },

        back: function () {
           this.linkDeposit();
        },

        /**
         * 跳转第三方支付
         * @param orderNo
         * @param newWindow
         */
        pay: function (orderNo, newWindow) {
            var url = root + "/wallet/deposit/online/pay.html?pay=online&search.transactionNo=" + orderNo;
            var os = this.whatOs();
            if (os == 'app_ios') {
                gotoPay(url);
            } else if (os == 'app_android') {
                window.gamebox.gotoPay(url);
            } else {
                if (newWindow) {
                    newWindow.location = url;
                } else {
                    this.openWindow(url);
                }
            }
        },

        /**
         * 监听返回页面订单
         */
        sendComm: function (transactionNo) {
            var param = {
                url: mdRoot,
                localeType: language.replace("-", "_"), isImmediatelyConnect: true
            };
            var _this = this;
            param.success = function () {
                console.info(window.top.message.deposit_auto['连接成功']);
                _this.subscribeMsg("MSITE-ONLINERECHARGE", function (data) {
                    var result = eval("(" + eval("(" + data + ")").msgBody + ")");
                    var orderId = result.orderId;
                    if (orderId == transactionNo) {
                        _this.linkResult(orderId);
                    }
                });
            };
            param.failure = function () {
                console.info('连接失败');
            };
            _this.init(param);
        },

        linkResult: function (data) {
            var _this = this;
            var _href = root + '/wallet/deposit/online/result.html?search.transactionNo=' + data;
            this.openWindow(_href);

            var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
            layer.open({
                title: window.top.message.deposit_auto["订单结果"],
                content: '',
                btn: btnArray,
                yes: function (index) {
                    _this.completion();
                    layer.close(index);
                },
                no: function (index) {
                    _this.back();
                    layer.close(index);
                }
            });
        },

        //选择银行种类
        bindChooseBank: function () {
            if (document.getElementById('bankJson')) {
                var bankPick = new mui.PopPicker();
                var bankList = document.getElementById('bankJson').value;
                bankPick.setData(JSON.parse(bankList));

                var selectBank = document.getElementById('selectBank');
                selectBank.addEventListener('tap', function (event) {
                    $("input[name='result.rechargeAmount']").blur();
                    bankPick.show(function (items) {
                        var item = items[0];
                        document.getElementById('result.payerBank').value = item.value;
                        document.getElementById('selectText').innerHTML = item.text;
                        document.getElementById('onlinePayMin').value = item.min;
                        document.getElementById('onlinePayMax').value = item.max;
                        document.getElementsByName('account').value = item.account;
                    });
                }, false);
            }

        },

        submit: function () {
            var _this = this;

            mui(".main-contents").off("tap", "#submitAmount");
            mui(".main-contents").on("tap", "#submitAmount", function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                if($("#submitAmount").attr("category") == "isNull"){
                    _this.toast(window.top.message.deposit_auto['请输入金额']);
                    return false;
                }else if($("#submitAmount").attr("category") == "error"){
                    _this.toast(window.top.message.deposit_auto['金额格式不对']);
                    return false;
                }else if($("#submitAmount").attr("category") == "notThrough") {
                    _this.toast(window.top.message.deposit_auto['请输入整数金额']);
                    return false;
                }else if($("#submitAmount").attr("category") =="excess"){
                    var min = $("#onlinePayMin").val();
                    var max = $("#onlinePayMax").val();
                    _this.toast(window.top.message.deposit_auto['单笔存款金额为']+min+"~"+max);
                    return false;
                }else if($("#submitAmount").attr("category") !="through"){
                    $("#submitAmount").attr("category","");
                    var $form = $(page.formSelector);
                    if (!$form.valid()) {
                        return false;
                    }
                }
                var rechargeAmount = $("input[name='result.rechargeAmount']").val();
                var payerBank = $("input[name='result.payerBank']").val();
                var rechargeType = $("input[name='result.rechargeType']").val();
                var account = $("input[name='account']").val();
                var randomCash = $("input[name='result.randomCash']").val();
                if (!randomCash) {
                    randomCash = 0;
                }
                mui.ajax(root + '/wallet/deposit/online/submit.html', {
                    data: {
                        "result.rechargeAmount": rechargeAmount,
                        "result.payerBank": payerBank,
                        "result.rechargeType": rechargeType,
                        "account": account,
                        "result.randomCash": randomCash
                    },
                    type: 'post',
                    async: false,
                    success: function (data) {
                        if ($("#depositSalePop").length > 0) {
                            $("#depositSalePop").remove();
                        }
                        $(".mui-content").append(data);
                        var unCheckSuccess = $("#unCheckSuccess").attr("unCheckSuccess");
                        if (unCheckSuccess === "true") {
                            var pop = $("#pop").attr("pop");
                            if (pop === "true") {
                                $("#activityId").val($("input[type=radio]:checked").val());
                                _this.bindReWriteAmount();
                                _this.deposit();
                            } else {
                                _this.submitDeposit();
                            }
                        } else {
                            //验证提示
                            _this.toast($("#tips").attr("tips"));
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        console.log('提交失败');
                    }
                });
            });
        },

        deposit: function () {
            var _this = this;
            /**
             * 提交存款订单
             */
            mui(".cont").on("tap", ".next-btn", function () {
                _this.submitDeposit();
            });
        },

        submitDeposit: function () {
            var _this = this;

            var $form = $(page.formSelector);
            if (!$form.valid()) {
                return false;
            }

            var data = $form.serialize();
            if (_this.os != "app_android" && _this.os != "app_ios") {
                var newWindow = window.open("about:blank", '_blank');
                if (newWindow) {
                    newWindow.document.write("<div style='text-align:center;'><img style='margin-top:" + document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
                }
            }
            mui.ajax(root + '/wallet/deposit/online/deposit.html', {
                dataType: 'json',
                data: data,
                type: 'post',
                async: false,
                success: function (data) {
                    if (!data) {
                        _this.toast("提交失败！", _this.back());
                        if (newWindow) {
                            newWindow.close();
                        }
                    } else {
                        var state = data.state;
                        $("input[name='gb.token']").val(data.token);
                        if (state == true) {
                            var orderNo = data.orderNo;
                            _this.pay(orderNo, newWindow);
                            _this.sendComm(orderNo);
                            if (newWindow || _this.os == "app_android" || _this.os == "app_ios") {
                                _this.reWriteAmount();
                                _this.success(data);
                            }
                        } else {
                            _this.toast(data.msg);
                            if (newWindow) {
                                newWindow.close();
                            }
                        }
                    }

                },
                error: function (xhr, type, errorThrown) {
                    // $("input[name='gb.token']").val(data.token);
                    if (newWindow) {
                        newWindow.close();
                    }
                }
            });
        }
    });
});
