define(['common/BaseEditPage', 'bootstrap-dialog'], function (BaseEditPage, BootstrapDialog) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=creditPayForm]";
            if (window.top.interval) {
                window.clearInterval(window.top.interval);
            }
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $(this.formSelector).on("click", "label.bank", function (e) {
                var $target = $(e.currentTarget);
                $("label.bank").removeClass("select");
                $target.addClass("select");
                _this.changeAmountMsg();
            });
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            var leftTime = $(this.formSelector + " #leftTime[data-time]");
            if (leftTime && leftTime.length > 0) {
                _this.showPayLeftTime();
                window.top.interval = setInterval(function () {
                    _this.showPayLeftTime(window.top.interval)
                }, 1000);
            }
            _this.changeAmountMsg();
        },
        showPayLeftTime: function (interval) {
            var leftTime = $("#leftTime[data-time]");
            if ((!leftTime || leftTime.length == 0) && interval) {
                window.clearInterval(interval);
                return;
            }
            var time = $(leftTime).attr("data-time");
            if (time < 0 && interval) {
                window.clearInterval(interval);
                window.top.topPage.ajax({
                    url: root + '/credit/pay/disableTransfer.html',
                    dataType: 'json',
                    success: function (data) {
                        if (data.state != true) {
                            console.log("开启禁用转账功能异常");
                        } else {
                            console.log("开启禁用转账功能正常");
                        }
                    }
                })
                return;
            }
            var tmpTime = Number(time);
            var hour = Math.floor(tmpTime / 3600);
            tmpTime = tmpTime - hour * 3600;
            var minute = Math.floor(tmpTime / 60);
            var second = tmpTime - minute * 60;
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            $("span#hour").text(hour);
            $("span#minute").text(minute);
            $("span#second").text(second);
            $("#leftTime[data-time]").attr("data-time", --time);
        },
        /**
         * 更新支付金额的远程验证提示消息
         */
        changeAmountMsg: function () {
            var $target = $(this.formSelector + " label.bank.select");
            var min = $target.find("input[name=min]").val();
            var max = $target.find("input[name=max]").val();

            var payAmount = $(this.formSelector + " input[name='result.payAmount']").val();
            if (min && max) {
                var msg = "请输入" + min + "-" + max + "之间的整数";
                this.extendValidateMessage({"result.payAmount": {remote: msg}});
            }
        },
        /**
         * 快选金额
         * @param e
         * @param option
         */
        quickAmount: function (e, option) {
            var data = option.data;
            $("input[name='result.payAmount']").val(data);
            $("a[data-rel*='quickAmount']").removeClass("btn-info");
            $("a[data-rel*='quickAmount']").addClass("btn-info-hide");
            $(e.currentTarget).removeClass("btn-info-hide");
            $(e.currentTarget).addClass("btn-info");
            $(e.currentTarget).unlock();
            $("input[name='result.payAmount']").blur();
        },
        /**
         * 充值额度
         * @param e
         * @param option
         */
        submit: function (e, option) {
            var _window = window.open("", '_blank');
            _window.document.write("<div style='text-align:center;'><img style='margin-top:" + document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
            var flag = true;
            window.top.topPage.ajax({
                url: root + "/credit/pay/submit.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data && data.transactionNo) {
                        _window.location = data.payUrl;
                        var html = window.top.message.setting_auto['正在与第三方对接'];
                        var dialog = BootstrapDialog.show({
                            title: window.top.message.setting_auto['消息'],
                            message: html,
                            buttons: [{
                                label: window.top.message.setting_auto['重新填写'],
                                action: function (dialog) {
                                    dialog.close();
                                    flag = false;
                                    $("#mainFrame").load(root + "/credit/pay/pay.html");
                                }
                            }, {
                                label: window.top.message.setting_auto['查看记录'],
                                cssClass: 'btn-primary',
                                action: function (dialog) {
                                    dialog.close();
                                    flag = false;
                                    $("#mainFrame").load(root + "/vCreditRecord/list.html");
                                }
                            }],
                            onhidden: function (dialog) {
                                dialog.close();
                                if (flag) {
                                    $("#mainFrame").load(root + "/credit/pay/pay.html");
                                }
                            }
                        });
                        $(e.currentTarget).unlock();
                    } else if (data.token) {
                        e.page.showPopover(e, option, 'danger', window.top.message.setting_auto['已被关闭存款渠道'], true);
                        $(e.currentTarget).unlock();
                        _window.close();
                    } else {
                        $(e.currentTarget).unlock();
                        _window.close();
                    }
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                    _window.close();
                }
            })
        }
    })
});