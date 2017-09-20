//模板页面
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            /*$(".pay-bank-label").each(function (idx,item) {
                $(item).click(function () {
                    //$(this).find("[name='bankName']").click();
                    $(_this.formSelector + " label.bank").removeClass("select");
                    $(item).addClass("select");
                    var bn = $(this).find("[name='bankName']").val();
                    $("[name='result.bankName']").val(bn);
                });
            });*/

            //更换银行样式
            $('[name=addBankForm]').on("click", "label.bank", function (e) {
                $(_this.formSelector + " label.bank").removeClass("select");
                $(e.currentTarget).addClass("select");
                var bn = $(this).find("[name='bankName']").val();
                $("[name='result.bankName']").val(bn);
            });

        },
        /*showMoreBank: function () {
            $(".hide-bank-div").removeClass("hide");
            page.resizeDialog();
        },*/

        showMoreBank: function (e, option) {
            $("div[name=hideBank]").toggle();
            $(e.currentTarget).parent().parent().children().show();
            $(e.currentTarget).parent().hide();
            $(e.currentTarget).unlock();
        }
    });
});