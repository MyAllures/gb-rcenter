/**
 * 绑定银行卡js
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=bindBankcardForm]";
            this._super(this.formSelector);
        },
        onPageLoad: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var _this=this;
            $(this.formSelector).on("click", "label.bank", function (e) {
                $(_this.formSelector + " label.bank").removeClass("select");
                $(e.currentTarget).addClass("select");
            });

            //银行卡四位分割
            $("[name='bankcardNumber2']").on("keyup", function () {
                $("[name='bankcardNumber2']").val($("[name='bankcardNumber2']").val().replace(/\D/g, '').replace(/....(?!$)/g, '$& '));
                $("[name='result.bankcardNumber']").val(_this._trim($("[name='bankcardNumber2']").val(), "g"));
                $("[name='result.bankcardNumber']").valid();
            });

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
         * 成功保存银行卡后回调
         * @param e
         * @param option
         */
        saveBankcardCallback: function (e, option) {
            if (e.returnValue) {
                $("#mainFrame").load(root + "/personInfo/index.html");
            }
        },
        /**
         * 提交银行卡
         * @param e
         * @param option
         */
        submitBank: function (e, option) {
            var data = this.getCurrentFormData(e);
            var _msgTitle = "<h3 class='al-center'>" + window.top.message.fund_auto['确认提交吗'] + "</h3><div class='al-center'>" + window.top.message.fund_auto['提交后不能自行修改只能联系客服修改'] + "</div>";
            window.top.topPage.showConfirmDynamic(window.top.message.fund_auto['消息'], _msgTitle, window.top.message.fund_auto['提交'], window.top.message.fund_auto['返回修改'], function (confirm) {
                if (confirm) {
                    window.top.topPage.ajax({
                        type: "post",
                        url: root + "/fund/userBankcard/submitBankCard.html?userType=24",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            e.returnValue = data.state;
                            option.callback = "saveBankcardCallback";
                            if (data.state) {
                                page.showPopover(e, option, 'success', data.msg, true);
                            } else {
                                page.showPopover(e, option, 'danger', data.msg, true);
                            }
                            $(e.currentTarget).unlock();
                        },
                        error: function () {
                            window.top.topPage.showErrorMessage(window.top.message.fund_auto['绑定银行卡出错请再试一次'], function (result) {
                                $(e.currentTarget).unlock();
                            });
                        }
                    });
                } else {
                    $(e.currentTarget).unlock();
                }
            });
        }
    })
});