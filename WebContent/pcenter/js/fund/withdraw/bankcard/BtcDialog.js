define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=addBankForm]";
            this._super(this.formSelector);
        },
        onPageLoad: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        saveBtc: function (e, option) {
            var url = root + "/fund/userBankcard/submitBtc.html?userType=24";
            var data = this.getCurrentFormData(e);
            var btcAddress = $("input[name='result.bankcardNumber']").val();
            var _msgTitle = '<h3 class="m-sm al-center">'+window.top.message.fund_auto['确认提交吗']+'</h3>'+
                '<div class="form-group clearfix line-hi34 m-b-xxs al-center"><b>'+window.top.message.fund_auto['比特币钱包地址']+'</b>'+ btcAddress +'</div>'+
                '<div class="rgeechar"><div class="title"><span class="tips"><i class="mark plaintsmall"></i><em class="orange">'+window.top.message.fund_auto['比特币钱包地址将直接影响您的正常收款']+'</em></span></div></div>';
            window.top.topPage.showConfirmDynamic(window.top.message.fund_auto['消息'], _msgTitle, window.top.message.fund_auto['提交'], window.top.message.fund_auto['返回修改'], function (confirm) {
                if (confirm) {
                    window.top.topPage.ajax({
                        url: url,
                        dataType: 'json',
                        data: data,
                        type: 'POST',
                        success: function (data) {
                            e.returnValue = data.state;
                            option.callback = "saveBtcBack";
                            if (data.msg) {
                                var msgType = data.state == true ? 'success' : 'danger';
                                e.page.showPopover(e, option, msgType, data.msg, true);
                            }
                        }
                    })
                } else {
                    $(e.currentTarget).unlock();
                }
            });

        },
        saveBtcBack: function (e, option) {
            if (e.returnValue) {
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
        }
    })
});