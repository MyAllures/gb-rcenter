define(['common/BaseEditPage'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this=this;

        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _this=this;

        },

        /**
         * 当前对象事件初始化函数
         */
        checkBankCard : function(e) {
            //验证基本form
            var $form = $(window.top.topPage.getCurrentForm(e));
            var form_val = !$form.valid || $form.valid();
            if (!form_val) {
                return false;
            }
            //验证银行卡号内容
            var bankCardArr = $("textarea[name='result.bankcardNumbers']").val().split(',');
            if (bankCardArr.length > 2000) {
                e.page.showPopover(e, {}, "warning", "银行卡号数量必须该小于2000", true);
                return false;
            }
            for (var i = 0; i < bankCardArr.length; i++) {
                var bankCard = bankCardArr[i];
                console.debug(bankCardArr[i]);
                var regexp = /^[0-9]{10,25}$/;
                if (!regexp.test(bankCard)) {
                    e.page.showPopover(e, {}, "warning", "银行卡号 " + bankCard + " 应是10-25位数字", true);
                    return false;
                }
            }
            return true;
        },

    });

});
