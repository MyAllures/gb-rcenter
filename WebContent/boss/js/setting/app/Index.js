define(['common/BaseListPage'], function(BaseListPage) {
    var _this ;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            _this=this;
        },
        bindEvent:function() {
            this._super();
        },
        beforeUpVersionCode: function (e, opt) {
            window.top.topPage.showConfirmDynamic("提示","确认升级版本号吗?","确认","取消", function (state) {
                if(state){
                    window.top.topPage.doAjax(e,opt);
                }
            })
            return false;
        }
    });
});