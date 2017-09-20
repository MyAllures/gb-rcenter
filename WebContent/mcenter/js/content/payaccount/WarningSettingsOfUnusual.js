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

        },
        /**
         * 验证表单并提交
         * @param e
         * @returns {boolean|*}
         */
        validateFormAndSubmit: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            var valid = !$form.valid || $form.valid();
            if (valid) {
                var va = $('[name="p11.active"]:checked').val();
                if (va) {
                    var v1 = $('input[name="pv[11].v1"]').val();
                    var v2 = $('input[name="pv[11].v2"]').val();
                    var v3 = $('input[name="pv[11].v3"]').val();
                    $form.append('<input type="hidden" name="pv[11].paramValue1" value="'+ v1 + ',' + v2 + ',' + v3 +'">');
                    $form.append('<input type="hidden" name="pv[11].active" value="true">');
                } else {
                    $form.append('<input type="hidden" name="pv[11].paramValue1" value="">');
                    $form.append('<input type="hidden" name="pv[11].active" value="false">');
                }
                var vb = $('[name="p12.active"]:checked').val();
                if (vb) {
                    $form.append('<input type="hidden" name="pv[12].active" value="true">');
                } else {
                    $('input[name="pv[12].paramValue"]').val('');
                    $form.append('<input type="hidden" name="pv[12].active" value="false">');
                }
            }
            return valid;
        }
    });
});