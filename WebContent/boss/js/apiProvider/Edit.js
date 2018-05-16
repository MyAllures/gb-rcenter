//模板页面
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,
        ue:[],
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
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            _this.isEnableResend();
        },
        /**
         * 启用重发或禁用重发
         */
        isEnableResend :function(){
            $("input[name='result.isResend']").on('click', function () {
                var table = $('#edit_table tbody:last');
                if ($(this).val() == 'true') // 判断是否开启重发
                    $('#resend_intervals').show();
                else{  // 禁用的时候恢复原来的默认时间
                    var h = $("input[name='result.resendIntervals']");
                    $(h).val($(h).attr('lang'));
                    $('#resend_intervals').hide();
                }
            });
        }
    });
});