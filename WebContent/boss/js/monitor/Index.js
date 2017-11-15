/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        refreshData:function (e, opt) {
            var _this =this
            window.top.topPage.ajax({
                dataType:'json',
                type:"post",
                url:root+'/Monitor/refresh.html',
                success:function(data){
                    if(data==true){
                        window.setTimeout(function () {
                            _this.query(e, opt);
                        },1000);
                    }
                },
                error:function(data) {

                }
            });
        }
    });
});