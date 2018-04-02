//模板页面
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput'], function(BaseEditPage,fileinput) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,

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
            var timing=$("#is_task").val();
            if(timing=="true"){
                $(".i-checks").click();
            }
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    $(".a_"+attr).formtip(message);
                    $(".a_"+attr).click();
                    e.result=true;
                }
                else{
                    e.result=false;
                }
            });
        },
        saveCallbak: function (e, option) {
            if(e.returnValue) {
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
        }
    });
});