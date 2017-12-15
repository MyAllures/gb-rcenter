/**
 * Created by bruce on 16-12-8.
 */
define(['site/deposit/BaseDeposit','gb/components/Comet'], function (BaseDeposit) {
    
    return BaseDeposit.extend({
        
        init: function (formSelector) {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },

        /**
         * 跳转第三方支付
         * @param orderNo
         */
        pay:function (orderNo, newWindow) {
            var url = root + "/wallet/deposit/online/scan/pay.html?pay=online&search.transactionNo=" + orderNo;
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

        back:function () {
            var url = root + "/wallet/deposit/index.html";
           this.gotoUrl(url);
        },

        openWindow:function (url) {
            mui.openWindow({
                url: url,
                id: url,
                extras: {},
                createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
                show: {
                    autoShow: true //页面loaded事件发生后自动显示，默认为true
                },
                waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                    title: window.top.message.deposit_auto["正在加载"] //等待对话框上显示的提示内容
                }
            })
        },  

        /**
         * 监听返回页面订单
         */
        sendComm:function (transactionNo) {
            var param = {
                url: mdRoot,
                localeType: language.replace("-", "_"), isImmediatelyConnect: true
            };
            var _this = this;
            param.success = function () {
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

        linkResult:function (data) {
            var _this = this;
            var _href = root + '/wallet/deposit/online/scan/result.html?search.transactionNo=' + data;
            this.openWindow(_href);
    
            var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
            layer.open({
                title: window.top.message.deposit_auto["订单结果"],
                content: '',
                btn: btnArray,
                yes: function(index) {
                    _this.completion();
                    layer.close(index);
                },
                no: function(index) {
                    _this.back();
                    layer.close(index);
                }
            });
        },

        success:function () {
            var _this = this;
            var btnArray = [window.top.message.deposit_auto["完成付款"], window.top.message.deposit_auto["重新存款"]];
            layer.open({
                title: window.top.message.deposit_auto["提交订单"],
                content: window.top.message.deposit_auto["第三方对接"],
                btn: btnArray,
                shadeClose: false,
                yes: function(index) {
                    _this.completion();
                    layer.close(index);
                },
                no: function(index) {
                    if (_this.os === 'app_ios') {
                        reload();
                    } else {
                        _this.back();
                    }
                    layer.close(index);
                }
            });
        },

        completion:function () {
            var url = root + "/fund/record/index.html?search.transactionType=deposit";
            if (this.os == 'app_android') {
                this.goBack();
                this.gotoUrl(url);
            } else if(this.os == 'app_ios'){
                this.goBack();
                gotoCustom(url);
            } else {
                this.openWindow(url);
            }
        },

        submit: function () {
            var _this = this;

            mui(".mui-scroll2").off("tap","#submitAmount");
            mui(".mui-scroll2").on("tap", "#submitAmount", function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }


                var $form = $(page.formSelector);
                if (!$form.valid()) {
                    return false;
                }

                var rechargeAmount = $("input[name='result.rechargeAmount']").val();
                var rechargeType = $("input[name='result.rechargeType']").val();

                mui.ajax(root + '/wallet/deposit/online/scan/submit.html', {
                    data: {"result.rechargeAmount": rechargeAmount, "result.rechargeType": rechargeType},
                    type: 'post',
                    async: false,
                    success: function (data) {
                        if ($(".mui-scroll2").nextAll() && $(".mui-scroll2").nextAll().length > 0) {
                            $(".mui-scroll2").nextAll().remove();
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
                        console.log(window.top.message.deposit_auto['提交失败']);
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

        submitDeposit:function () {
            var _this = this;
            var dataForm = $(page.formSelector).serialize();

            if (!$(page.formSelector).valid()) {
                return false;
            }
            if(_this.os != "app_android" && _this.os != "app_ios"){
                var newWindow= window.open("about:blank", '_blank');
                if (newWindow) {
                    newWindow.document.write("<div style='text-align:center;z-index: 999;'><img style='margin-top:" +
                        document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
                }
            }

            mui.ajax(root+"/wallet/deposit/online/scan/scanCodeSubmit.html", {
                type: 'post',
                data: dataForm,
                dataType: 'json',
                success: function (data) {
                    if (!data) {
                        _this.toast(window.top.message.deposit_auto["提交失败"], _this.back());
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
                            if(newWindow || _this.os == "app_android" || _this.os == 'app_ios') {
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
                    if (newWindow) {
                        newWindow.close();
                    }
                }
            });
        }
    });
});