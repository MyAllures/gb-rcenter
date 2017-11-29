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
        /**
         * 刷新监控数据
         * @param e
         * @param opt
         */
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
                }
            });
        },
        /**
         *
         * @param e
         * @param opt
         */
        clearMonitorData:function (e, opt) {
            var _this =this
            window.top.topPage.ajax({
                dataType:'json',
                type:"post",
                url:root+'/Monitor/clearMonitorData.html',
                success:function(data){
                    if(data==true) {
                        window.top.topPage.showSuccessMessage("操作成功!");
                    }else{
                        window.top.topPage.showErrorMessage("操作失败!");
                    }
                }
            });
        },
    });
});