define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','validate'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
           /* this._super();*/
            this.formSelector = "form";
            this._super();
        },
        bindEvent:function()
        {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 操作回调，event.returnValue==true时才执行 query方法，
         * 其他的操作回调，请参考这里，不要任何时候都执行刷新操作
         * @param event
         * @param option
         */
        callBackQuery:function(event,option)
        {
            if(event.returnValue==true)
            {
                this.query(event,option);
            }
        },

    });
});