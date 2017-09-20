/**
 * 资金管理-提现管理审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            //判断有没有设置真实姓名
            // this.setRealName();
        },

        onPageLoad: function (e, option) {
            this._super();
            $(".gotoDespoit").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/fund/playerTransfer/transfers.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
            });
        },

        /*setRealName: function(e) {
         var realName = $("[name=realName]").val();
         if (realName != undefined && realName == "") {
         var btnOption = {};
         btnOption.target = root + "/player/withdraw/toSettingRealName.html";
         btnOption.text=window.top.message.fund_auto['设置真实姓名'];
         btnOption.callback = function (e) {
         if(e.returnValue){
         $("#mainFrame").load(root + "/player/withdraw/withdrawList.html");
         }
         };
         window.top.topPage.doDialog({}, btnOption);
         }
         if (e != undefined) {
         $(e.currentTarget).unlock();
         }
         },*/

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $("[name='withdrawAmount']").keyup(function () {
                var oldStr = this.value;
                var newStr = oldStr.replace(/^\s+|\s+$/g, '');
                if (oldStr != newStr) {
                    this.value = newStr;
                }
            });
            //更换银行样式
            $('[name=addBankForm]').on("click", "label.bank", function (e) {
                $(_this.formSelector + " label.bank").removeClass("select");
                $(e.currentTarget).addClass("select");
            });

            //银行卡四位分割
            $("[name='bankcardNumber2']").on("keyup", function () {
                $("[name='bankcardNumber2']").val($("[name='bankcardNumber2']").val().replace(/\D/g, '').replace(/....(?!$)/g, '$& '));
                $("[name='result.bankcardNumber']").val(_this._trim($("[name='bankcardNumber2']").val(), "g"));
                $("[name='result.bankcardNumber']").valid();
            });

            //设置安全密码
            $("[name='permissionPwd']").on("click", function (e) {
                var _this = e.currentTarget;
                var pwd = $(_this).attr("data-pwd");
                if (pwd == "false") {
                    var $select = $(".sidebar-nav .select", window.top.document);
                    $select.removeClass("select");
                    var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
                    $current.parent().addClass("select");
                    $current.click();
                }
            });

            $("[name='withdrawAmount']").change(function () {
                if (this.value == "") {
                    $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
                    $(".my-tips").html("");
                } else {
                    if (_this.checkAmout(this.value)) {
                        window.top.topPage.ajax({
                            url: root + '/player/withdraw/withdrawFeeNum.html',
                            data: {"withdrawAmount": this.value},
                            dataType: 'json',
                            beforeSend: function () {
                                $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
                            },
                            success: function (data) {
                                if (data == null) {
                                    $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
                                    return;
                                }
                                var num = data.fee;//要四舍五入的数字
                                if (num) {
                                    var feeMoney = num.replace(/,/g, "");
                                    if (parseFloat(feeMoney) > 0) {
                                        $("#withdrawFee").val(feeMoney);
                                        var x = feeMoney > 0 ? '-' : '';
                                        $("#withdrawFee-span").html(x + num);
                                    }
                                }
                                var money = data.actualWithdraw;
                                if (money) {
                                    money = money.replace(/,/g, "");
                                }
                                var money = parseFloat(money);
                                if (money <= 0) {
                                    var message = window.top.message.fund_auto['请重新输入取款金额'];//window.top.message.fund['withdrawForm.withdrawAmountZero'];//"扣除手续费后,您最终可取款的金额未大于0,请重新输入取款金额!";
                                    $("#actualWithdraw-span").html(data.actualWithdraw);
                                    $("#actualWithdraw-tips-div").html(message);
                                    $(".withdrawing-result").addClass("result-minus");
                                } else {
                                    $("#actualWithdraw-tips-div").html("&nbsp;");
                                    $(".withdrawing-result").removeClass("result-minus");
                                    $("#actualWithdraw-span").html(data.actualWithdraw);

                                }

                                $("[name='actualWithdraw']").val(money);

                                var tooSmall = data.withdrawAmountTooSmall;
                                if (tooSmall != "true") {
                                    $(".withdraw-btn-css").removeClass("disable-gray ui-button-disable disabled");
                                    if (money > 0) {
                                        $(".withdraw-btn-css").removeClass("disable-gray ui-button-disable disabled");
                                    } else {
                                        $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
                                    }
                                    $(".feetips").addClass("tiphide");
                                    $(".feetips").html("");
                                }
                            }
                        });
                    } else {
                        $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
                    }
                }
            });

            /*$(this.formSelector).on("change", "input[name='bankName']", function () {
             $("input[name='result.bankName']").val($("input[name=bankName]:checked").val());
             });*/

            $(this.formSelector).on("validate", "input[name='result.bankName']", function (e, message) {
                if (message) {
                    $("div[name=bankNameMsg]").children().html("<span class=\"tips orange\"><i class=\"mark plaintsmall\"></i>" + message + "</span>");
                    $("div[name=bankNameMsg]").show();
                    e.result = true;
                }
                else {
                    $("div[name=bankNameMsg]").hide();
                    $("input[name='result.bankName']").parent().removeClass("error");
                    e.result = false;
                }
            });

            //选择收款账号
            $(this.formSelector).on("click", "div#bankcardMenu li a", function (e) {
                var html = $(e.currentTarget).html();
                html = html + '<span class="carat"></span>';
                $(_this.formSelector + " div#bankcardMenu button").html(html);
                var key = $(e.currentTarget).attr("key");
                $("input[name=remittanceWay]").val(key);
            });
        },

        checkAmout: function (amount) {
            if (amount == null || amount == "") {
                var msg = "<span class=\"tips-customer orange\"><i class=\"mark plaintsmall\"></i>" + window.top.message.fund_auto['取款金额不能为空'] + "</span>";
                $(".my-tips").html("");
                $(".my-tips").append(msg);
                return false;
            } else {
                $(".my-tips").html("");
            }

            var g = /^[1-9]*[1-9][0-9]*$/;
            if (isNaN(amount) || !g.test(amount)) {
                var msg = "<span class=\"tips-customer orange\"><i class=\"mark plaintsmall\"></i>" + window.top.message.fund_auto['请输入正整数'] + "</span>";
                $(".my-tips").html("");
                $(".my-tips").append(msg);
                return false;
            } else {
                $(".my-tips").html("");
            }

            amount = parseFloat(amount);
            var withdrawMaxNum = $(this.formSelector).find("input[name=withdrawMaxNum]").val();
            var withdrawMinNum = $(this.formSelector).find("input[name=withdrawMinNum]").val();
            var walletBalance = $(this.formSelector).find("input[name=walletBalance]").val();
            var msg;
            if (walletBalance < parseFloat(withdrawMinNum)) {
                //单笔存款不得小于/大于XXX
                if (amount > walletBalance) {
                    msg = window.top.message.fund_auto['取款金额不得大于钱包余额请重新输入'];
                } else {
                    msg = window.top.message.fund_auto['单笔取款不得小于'] + withdrawMinNum;
                }
            } else if (walletBalance > parseFloat(withdrawMaxNum)) {
                if (amount > walletBalance) {
                    msg = window.top.message.fund_auto['取款金额不得大于钱包余额请重新输入'];
                }
            }
            if (amount > parseFloat(withdrawMaxNum)) {
                msg = window.top.message.fund_auto['单笔取款不得大于'] + withdrawMaxNum;
            } else if (amount < parseFloat(withdrawMinNum)) {
                msg = window.top.message.fund_auto['单笔取款不得小于'] + withdrawMinNum;
            } else if (amount > walletBalance) {
                msg = window.top.message.fund_auto['取款金额不得大于钱包余额请重新输入'];
            }
            if (msg) {
                $("#actualWithdraw-tips-div").html("&nbsp;");
                this.showAmountTips(msg);
                return false;
            } else {
                $(".my-tips").html("");
            }

            return true;
        },

        showAmountTips: function (msg) {
            msg = "<span class=\"tips-customer orange\">" + msg + "</span>";
            $(".my-tips").html("");
            $(".my-tips").append(msg);
            $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
            $("#actualWithdraw-span").html("--");
            $("#withdrawFee-span").html("--");
            $("[name='actualWithdraw']").val(0);
        },

        checkRate: function (e, opt) {
            var amount = $("[name='withdrawAmount']").val();
            if (!this.checkAmout(amount)) {
                $(e.currentTarget).unlock();
                return false;
            }
            if ($("[name='actualWithdraw']").val() <= 0) {
                $(e.currentTarget).unlock();
                $(".withdraw-btn-css").addClass("disable-gray ui-button-disable disabled");
                return false;
            }
            return true;
        },

        checkSecurityPwd: function (e) {
            var permissionBtn = $("input[name='permissionPwd']");
            window.top.topPage.ajax({
                url: root + '/accountSettings/checkPermissionPwd.html',
                data: {"permissionPwd": permissionBtn.val()},
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        $(".step1").hide();
                        $(".step2").show();
                    } else {
                        return false;
                    }
                    $(e.currentTarget).unlock();
                },
                error: function () {
                    $(e.currentTarget).unlock();
                }
            })
        },

        /**
         * 更改验证消息
         */
        bindFormValidation: function () {
            this._super();
        },

        /**
         * 清楚所有空格
         * @param str
         * @param is_global
         * @returns {*|string|XML|void}
         */
        _trim: function (str, is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global.toLowerCase() == "g") {
                result = result.replace(/\s/g, "");
            }
            return result;
        },

        /**
         * 返回资金记录，进行标识
         * @param e
         */
        fundRecord: function (e) {
            this.returnValue = "fundRecord";
            this.closePage();
        },

        /**
         * 稽核失败可以返回资金记录，可以返回取款页面
         * @param e
         */
        queryCallback: function (e) {
            if (e.returnValue === "fundRecord") {
                $("a[name=fundRecord]").click();
            } else if (e.returnValue === "SecurityPwdClose") {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
            } else {
                $("a[name=returnView]").click();
            }
        },

        setReturnValue: function (e, opt) {
            this.closeDialog();
        },

        /**
         * 添加银行卡
         * @param e
         */
        submitBankCard: function (e, option) {
            $("#submitInfo").find(".btn-bank").addClass("disable-gray ui-button-disable");
            var _msgTitle = "<h3 class='al-center'>" + window.top.message.fund_auto['确认提交吗'] + "</h3><div class='al-center'>" + window.top.message.fund_auto['提交后不能自行修改只能联系客服修改'] + "</div>";
            window.top.topPage.showConfirmDynamic(window.top.message.fund_auto['消息'], _msgTitle, window.top.message.fund_auto['提交'], window.top.message.fund_auto['返回修改'], function (confirm) {
                if (confirm) {
                    var data = window.top.topPage.getCurrentFormData(e);
                    window.top.topPage.ajax({
                        type: "post",
                        url: root + "/fund/userBankcard/submitBankCard.html",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            if (data.state) {
                                option.callback = function () {
                                    $("a[name='returnMain']").click();
                                };
                                page.showPopover(e, option, 'success', data.msg, true);
                            } else {
                                page.showPopover(e, option, 'danger', data.msg, true);
                            }
                        },
                        error: function () {
                            window.top.topPage.showErrorMessage(window.top.message.fund_auto['绑定银行卡出错请再试一次'], function (result) {
                                $(e.currentTarget).unlock();
                            });
                        }
                    });
                } else {
                    $("#submitInfo").find(".btn-bank").removeClass("disable-gray ui-button-disable");
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 重置银行卡信息
         * @param e
         */
        resetBankCard: function (e) {
            $("input[name='result.bankcardMasterName'][type='text']").val("");
            $("input[name='result.bankcardNumber']").val("");//银行号
            $("input[name='bankcardNumber2']").val("");//银行号
            $(".bank-deposit").find(".select").removeClass("select");
            $(".bank-deposit input[type=radio]:checked").removeProp("checked", "");
            $(".bank-total").children(":eq(0)").addClass("select");
            $(".bank-total").children(":eq(0)").find(":radio").prop("checked", "checked");
            $("input[name='result.bankDeposit']").val("");//开户行
            $(".successsmall").remove();
            $(e.currentTarget).unlock();
        },

        /**
         * 展示/收起部分银行
         * @param e
         * @param option
         */
        showMoreBank: function (e, option) {
            $("div[name=hideBank]").toggle();
            $(e.currentTarget).parent().parent().children().show();
            $(e.currentTarget).parent().hide();
            $(e.currentTarget).unlock();
        },
        /**
         * 保存取款
         * @param e
         * @param opt
         */
        saveWithdraw: function (e, option) {
            var _this = this;
            option.eventCall = function (e) {
                _this.toWithdraw(e, option);
            };
            this.toWithdraw(e, option);

        },
        toWithdraw: function (e, option) {
            var url = root + "/player/withdraw/pleaseWithdraw.html";
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                dataType: 'json',
                data: this.getCurrentFormData(e),
                type: 'POST',
                eventCall: option.eventCall,
                success: function (data) {
                    if (data.state) {
                        var transactionNo = data.transactionNo;
                        var btnOption = {};
                        btnOption.target = root + "/player/withdraw/withdrawSuccess.html?search.transactionNo=" + transactionNo;
                        btnOption.callback = _this.queryCallback;
                        btnOption.text = "";
                        window.top.topPage.doDialog(e, btnOption);
                    } else {
                        if (data.type) {
                            var btnOption = {};
                            btnOption.target = root + "/player/withdraw/withdrawError.html?type=" + data.type;
                            btnOption.callback = _this.queryCallback;
                            btnOption.text = "";
                            window.top.topPage.doDialog(e, btnOption);
                        } else {
                            if (data.msg) {
                                e.page.showPopover(e, btnOption, "danger", data.msg, true);
                            } else {
                                e.page.showPopover(e, btnOption, "danger", window.top.message.common['save.failed'], true);
                            }
                        }

                    }
                    if (data.token) {
                        $("[name='gb.token']").val(data.token);
                    }
                }
            })
        }
    });
});