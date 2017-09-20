define(['common/BaseEditPage', 'bootstrap-dialog'], function (BaseEditPage, BootstrapDialog) {
    var _this = null;
    return BaseEditPage.extend({
        formSelector: '#agent_main',
        init: function () {
            this._super('#agent_main');
            _this = this;
        },
        bindEvent: function () {
            this._super();
            //输入卡号，自动识别银行


        },
        buildBankcardEvent: function () {
            var _this = this;
            $("input#bankNo").blur(function () {
                var bankAccount = $(this).val();
                var len = bankAccount.trim().length;
                if (len >= 4 && len <= 25) {
                    window.top.topPage.ajax({
                        url: root + '/vAgentFundRecord/getBankExtendInfo.html',
                        type: "POST",
                        dataType: "json",
                        data: {"search.bankCardBegin": bankAccount},
                        success: function (data) {
                            if (data.bank != null) {
                                _this.setBankName(data.bank.bankName);
                            } else {
                                _this.setBankName("");
                            }
                        },
                        error: function (data) {
                            _this.setBankName("");

                        }
                    })
                }
            });
        },
        setBankName: function (bankName) {
            $("[name='result.bankName']").val(bankName);
            var cnName = bankName;
            if (bankName != null && bankName != "") {
                cnName = window.top.message.common[bankName];
            } else {
                cnName = window.top.message.common['pleaseSelect'];
            }
            $(".dropdown-toggle").children("span").each(function (idx, item) {
                if ($(item).attr("prompt")) {
                    $(item).html(cnName);
                }
            });
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            $('.help-popover').popover();
            var val = $("#setting").val();
            if (val == 1) {
                this.showBank(val);
                setTimeout(function () {
                    _this.buildBankcardEvent();
                }, 500);

            }
        },
        myValidateForm: function (e, option) {
            var money = $("#money").val();
            var minMoney = $("#minMoney").val();
            var maxMoney = $("#maxMoney").val();
            var balance = $("#balance").val();
            if (money == null || money == '') {
                $("#errMsg").text(window.top.message.fundrecord_auto['提现金额不能为空']);
                return false;
            }
            var reg = /^[0-9]+(.[0-9]{1,2})?$/;
            if (!reg.test(money)) {
                $("#errMsg").text(window.top.message.fundrecord_auto['仅支持正数和2位小数']);
                return false;
            }
            var int_money = parseInt(money * 100);
            var int_minMoney = parseInt(minMoney * 100);
            var int_maxMoney = parseInt(maxMoney * 100);
            var int_balance = parseInt(balance * 100);
            if (int_money < int_minMoney) {
                $("#errMsg").text(window.top.message.fundrecord_auto['单次取款不得小于'] + minMoney);
                return false;
            }
            if (int_money > int_maxMoney) {
                $("#errMsg").text(window.top.message.fundrecord_auto['单次取款不得大于'] + maxMoney);
                return false;
            }
            if (int_money > int_balance) {
                $("#errMsg").text(window.top.message.fundrecord_auto['余额不足']);
                return false;
            }
            return true;
        },
        updateStatus: function () {
            $("#freeze_status").val("1");
        },
        withdrawals: function (e, opt) {
            var that = this;
            window.top.topPage.ajax({
                url: root + "/vAgentFundRecord/withdrawals.html",
                type: "post",
                dataType: "json",
                data: window.top.topPage.getCurrentFormData(e),
                success: function (data) {
                    if (data.state) {
                        that.showSuccess(e, opt);
                    } else {
                        that.showFail(data.msg, e, opt);
                    }
                }
            });
        },
        showSuccess: function (e, opt) {
            $('#div_success').show();
            var $div = $('<div></div>');
            $div.append($('#div_success').html());
            var option = {
                title: opt.text,
                type: BootstrapDialog.TYPE_PRIMARY,
                message: $div,
                buttons: [{
                    label: window.top.message.fundrecord_auto['好的'],
                    cssClass: 'btn btn-filter',
                    action: function (dialogItself) {
                        dialogItself.close();
                        $("#reback_btn").click();
                    }
                }, {
                    label: window.top.message.fundrecord_auto['查看资金记录'],
                    cssClass: 'btn btn-filter',
                    action: function (dialogItself) {
                        dialogItself.close();
                        $("#reback_btn").click();
                    }
                }]
            };
            BootstrapDialog.show(option);
            $(e.currentTarget).unlock();
            e.page.onPageLoad();
        },
        showFail: function (msg, e, opt) {
            $('#div_fail').show();
            $("#fail_msg").text(msg);
            var $div = $('<div></div>');
            $div.append($('#div_fail').html());
            var option = {
                title: opt.text,
                type: BootstrapDialog.TYPE_PRIMARY,
                message: $div,
                buttons: [{
                    label: window.top.message.fundrecord_auto['再取一次'],
                    cssClass: 'btn btn-filter',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }]
            };
            BootstrapDialog.show(option);
            $(e.currentTarget).unlock();
            e.page.onPageLoad();
        },
        showBank: function (val) {
            var labelName = window.top.message.fundrecord_auto['下一步'];
            if (val == 1) {
                labelName = window.top.message.fundrecord_auto['确定'];
            }
            var $div = $('<div></div>');
            $div.append($('#div_bank').html());
            $('#div_bank').remove();
            var option = {
                title: window.top.message.fundrecord_auto['设置收款银行卡'],
                type: BootstrapDialog.TYPE_PRIMARY,
                closable: false,
                message: $div,
                buttons: [{
                    label: window.top.message.fundrecord_auto['重置'],
                    cssClass: 'btn btn-outline btn-filter',
                    action: function (dialogItself) {
                        $div.find("input[name='result.bankcardNumber']").val("");
                        $div.find("#bank_deposit").val("");
                        $div.find("#bank_pwd").val("");
                    }
                }, {
                    label: labelName,
                    cssClass: 'btn btn-filter',
                    action: function (dialogItself) {
                        if (_this.yzBank()) {
                            _this.saveBank($div, val, dialogItself);
                        }
                    }
                }]
            };
            BootstrapDialog.show(option);
        },
        saveBank: function ($div, val, dialogItself) {
            window.top.topPage.ajax({
                url: root + "/vAgentFundRecord/saveBank.html",
                type: "post",
                dataType: "json",
                data: {
                    'result.bankcardNumber': $div.find("input[name='result.bankcardNumber']").val(),
                    'result.bankName': $div.find("input[name='result.bankName']").val(),
                    'result.bankDeposit': $div.find("#bank_deposit").val(),
                    'permissionPwd': $div.find("#bank_pwd").val()
                },
                success: function (data) {
                    if (data.state) {
                        dialogItself.close();
                        $("#tot").click();
                    } else {
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                }
            });
        },
        /**
         * 绑定银行卡规则
         */
        bindBankRule: function () {
            var $ruleDiv = $("#bankValidateRule");
            var rule = null;
            if ($ruleDiv.length > 0) {
                rule = eval("({" + $ruleDiv.text() + "})");
                rule.ignore = ".ignore";
            }
            var $form = $("form[name=bankForm]");
            if (rule) {
                if ($.data($form[0], "validator")) {
                    $.data($form[0], "validator", null);
                }
                $form.validate(rule);
            }
        },
        yzBank: function () {
            if(!$.data($("form[name=bankForm]"), "validator")) {
                this.bindBankRule();
            }
            return $("form[name=bankForm]").valid();
            /* var bankNo = $div.find("#bankNo").val();
             var bankName = $div.find("input[name='result.bankName']").val();
             var bank_deposit = $div.find("#bank_deposit").val();
             var bank_pwd = $div.find("#bank_pwd").val();
             if(bankNo==null || $.trim(bankNo)==''){
             window.top.topPage.showErrorMessage(window.top.message.fundrecord_auto['请输入卡号']);
             return false;
             }
             var reg = /^[0-9]*$/;
             if(!reg.test(bankNo) || $.trim(bankNo).length<10){
             window.top.topPage.showErrorMessage(window.top.message.fundrecord_auto['请输入正确卡号']);
             return false;
             }
             if(bankName==null || $.trim(bankName)==''){
             window.top.topPage.showErrorMessage(window.top.message.fundrecord_auto['请选择银行']);
             return false;
             }
             var patrn=/^[a-zA-Z\u4E00-\u9FA5]+$/;
             if(bank_deposit==null || $.trim(bank_deposit)==''||bank_pwd.length>50||!patrn.exec(bank_deposit)){
             window.top.topPage.showErrorMessage(window.top.message.fundrecord_auto['开户行格式不对']);
             return false;
             }

             if(bank_pwd==null || $.trim(bank_pwd)==''||bank_pwd.length>20){
             window.top.topPage.showErrorMessage(window.top.message.fundrecord_auto['请填写正确安全密码']);
             return false;
             }
             return true;*/
        }

    });
});