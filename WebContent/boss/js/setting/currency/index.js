/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,bootstrapswitch) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            $(".tabList li").each(function(index){
                $(this).on("click",function(){
                    var tabindex = $(this).attr("index");
                   $(".tab"+tabindex).removeClass("tabbox");
                   $(".tab"+tabindex).css("display","block");
                   $(".tabbox").css("display","none");
                   $(".tab"+tabindex).addClass("tabbox");
                })
            });


        }
    });
});