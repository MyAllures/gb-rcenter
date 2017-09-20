/**
 * 公司入款账号-详细页
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        editDepositDefaultCount:function (e) {
            $("#depositDefaultCountTD").addClass("hide");
            $("#depositDefaultCountTD2").removeClass("hide");
            $(e.currentTarget).unlock();
        },

        cancleDepositDefaultCount:function (e) {
            $("#depositDefaultCountTD").removeClass("hide");
            $("#depositDefaultCountTD2").addClass("hide");
            $(e.currentTarget).unlock();
        },

        editDepositDefaultTotal:function (e) {
            $("#depositDefaultTotalTD").addClass("hide");
            $("#depositDefaultTotalTD2").removeClass("hide");
            $(e.currentTarget).unlock();
        },

        cancleDepositDefaultTotal:function (e) {
            $("#depositDefaultTotalTD").removeClass("hide");
            $("#depositDefaultTotalTD2").addClass("hide");
            $(e.currentTarget).unlock();
        },

        /**
         * 编辑累计存款次数和累计存款金额
         * @param e
         * @param option
         */
        saveDepositDefault:function (e,option) {
            var opt = {};
            window.top.topPage.ajax({
                url: option.url,
                dataType: 'json',
                data: this.getCurrentFormData(e),
                type:'post',
                success: function (data) {
                    var msgType = data.state == true ? 'success' : 'danger';
                    if (data.state) {
                        opt.callback = 'saveCallback';
                        opt.payAccountValue = data.payAccountValue;
                    }
                    e.page.showPopover(e, opt, msgType, data.msg, true);
                },
                error: function (data) {
                    e.page.showPopover(e, opt, 'danger', window.top.message.common['save.failed'], true);
                }
            })
        },

        
        saveCallback:function (e,option) {
            $(e.currentTarget).parents("td").prev().removeClass("hide");
            $(e.currentTarget).parents("td").addClass("hide");
            $(e.currentTarget).parents("td").prev().children().eq(0).text(option.payAccountValue);
            $(e.currentTarget).unlock();
        },

        /**
         * 恢复累计存款次数和累计存款金额
         * @param e
         */
        recoveryData:function (e,option) {
            var that = this;
            var _msgTitle="<h3 class='al-center'>确认恢复吗?</h3><div class='al-center'>确认后,将恢复为系统记录的数据!</div>";
            var opt = {};
            window.top.topPage.showConfirmDynamic(window.top.message.content_auto['消息'],_msgTitle,window.top.message.content_auto['确认'],window.top.message.content_auto['取消'],function (confirm) {
                if(confirm){
                    window.top.topPage.ajax({
                        url: option.url,
                        dataType: 'json',
                        data: that.getCurrentFormData(e),
                        type:'post',
                        success: function (data) {
                            var msgType = data.state == true ? 'success' : 'danger';
                            if (data.state) {
                                opt.callback = 'recoveryDataCallback';
                                opt.payAccountValue = data.payAccountValue;
                            }
                            e.page.showPopover(e, opt, msgType, data.msg, true);
                        },
                        error: function (data) {
                            e.page.showPopover(e, opt, 'danger', window.top.message.common['save.failed'], true);
                        }
                    })
                }
                $(e.currentTarget).unlock();
            })
        },

        recoveryDataCallback:function (e,option) {
            $(e.currentTarget).parents("td").children().eq(0).text(option.payAccountValue);
            $(e.currentTarget).parents("td").next().children('input').val(option.payAccountValue);
            $(e.currentTarget).unlock();
        }

    });
});