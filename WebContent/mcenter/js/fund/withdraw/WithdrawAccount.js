/**
 * 出款账户
 */
define(['common/BaseEditPage','bootstrapswitch'], function (BaseEditPage) {
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
            this.initSwitch();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        initSwitch:function(){
            var _this=this;
            var $bootstrapSwitch = $("[name='my-checkbox']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['enable'],
                        offText: window.top.message.common['forbidden'],
                        onSwitchChange: function (e, state) {
                            $("[name='result.isSwitch']").val(state);
                        }
                    }
                );
        }

    });
});