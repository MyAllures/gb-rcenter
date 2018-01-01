/**
 * 扫描支付
 */
define(['site/fund/recharge/BaseOnlinePay'], function (BaseOnlinePay) {
    return BaseOnlinePay.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=scanCode]";
            this._super(this.formSelector);
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            //展示优惠活动
            this.changeSale();
            this.showRandomAmountMsg();
            window.top.onlineTransactionNo = null;
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            $(this.formSelector).on("change", "input[name='result.rechargeType']", function (e) {
                _this.changeValid(e);
                $('[name="result.rechargeAmount"]').val('');
                var amount = $(_this.formSelector).find("input[name='result.rechargeAmount']").val();
                if (!amount) {
                    _this.changeSale();
                }
                _this.showRandomAmountMsg();
                $(_this.formSelector+" input[name=account]").val($(_this.formSelector+" input[name='esult.rechargeType']:checked").attr("account"));
            });
        },
        /**
         * 更换优惠
         */
        changeSale: function () {
            var amount = $("input[name='result.rechargeAmount']").val();
            var rechargeType = $("[name='result.rechargeType']:checked").val();
            var url = root + "/fund/recharge/online/changeScanType.html?rechargeType=" + rechargeType;
            if (amount) {
                url = url + "&amount=" + amount;
            }
            window.top.topPage.ajax({
                url: url,
                dataType: 'json',
                success: function (data) {
                    if (data && data.length > 0) {
                        var len = data.length;
                        var html = $("#rechargeSale").render({
                            sales: data,
                            len: len,
                            isChecked: data[0].preferential
                        });
                        $("div.applysale").html(html);
                    } else {
                        $("div.applysale").find("input[type=radio]").attr("disabled", true);
                        $("input[name=activityId]:eq('')").attr("checked", 'checked');
                    }
                },
                error: function (data) {

                }
            })
        },
        /**
         * 更改存款规则-更改存款金额的remote规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            var rechargeType = $("[name='result.rechargeType']:checked").val();
            return this.changeRemoteRule($form,rechargeType);
        }
    });
});