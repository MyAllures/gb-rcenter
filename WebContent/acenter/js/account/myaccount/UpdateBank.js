/**
 * Created by cj on 15-8-24.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function (title) {
            this._super();
            this.formSelector = "form";
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var _this = this;

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
        },

        callBackQuery: function (event) {
            if (event.returnValue) {
                window.top.topPage.showPage();
            }
        },

        myCallbak: function (e, option) {
            if (option.data.state) {
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
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
            $("input[name='result.bankcardNumber']").val("");//银行号
            $("input[name='bankcardNumber2']").val("");//银行号
            $(".bank-deposit").find(".select").removeClass("select");
            $(".bank-deposit input[type=radio]:checked").removeProp("checked","");
            $(".bank-total").children(":eq(0)").addClass("select");
            $(".bank-total").children(":eq(0)").find(":radio").prop("checked","checked");
            $("input[name='result.bankDeposit']").val("");//开户行
            $("input[name='permissionPwd']").val("");//权限密码
            $(e.currentTarget).unlock();
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
         * 添加更新银行卡
         * @param e
         * @param option
         */
        submitBankCard: function (e,option) {
            var _this = this;
            var _msgTitle="<h3 class='al-center'>".concat(window.top.message.account_auto['确认提交吗']).concat("</h3><div class='al-center'>").concat(window.top.message.account_auto['提交后不能自行修改只能联系客服修改']).concat("</div>");
            window.top.topPage.showConfirmDynamic(window.top.message.account_auto['消息'],_msgTitle,window.top.message.account_auto['提交'],window.top.message.account_auto['返回修改'],function (confirm) {
                if (confirm) {
                    var data = window.top.topPage.getCurrentFormData(e);
                    window.top.topPage.ajax({
                        type: "post",
                        url: root + "/agentAccount/updateBank.html",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            if (data.state) {
                                option.callback = function (e,option) {
                                    _this.returnValue = true;
                                    window.top.topPage.closeDialog();
                                };
                                page.showPopover(e, option, 'success', data.msg, true);
                            } else {
                                // $("[name=gb\\.token]").val(data.token);
                                page.showPopover(e, option, 'danger', data.msg, true);
                            }
                            $(e.currentTarget).unlock();
                        },
                    });
                } else {
                    $(e.currentTarget).unlock();
                }
            });
        },
    });
});