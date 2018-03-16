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
            var _this = this;
        },
        /**
         * 刷新版本数据
         * @param e
         * @param opt
         */
        refreshData:function (e, opt) {
            var _this =this
            window.top.topPage.ajax({
                dataType:'json',
                type:"post",
                url:root+'/Version/refresh.html',
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
        },
        /**
         * 切换版本号
         * @param e
         * @param opt
         */
        changeVersion:function (e, opt) {
            var _this =this;
            window.top.topPage.ajax({
                dataType:'json',
                data:{
                    appKey:opt.appKey,
                    hostIp:opt.hostIp,
                    appVersion:opt.appVersion,
                    versionName:opt.versionName,
                    serverApp:opt.serverApp
                },
                type:"post",
                url:root+'/Monitor/ChangeVersion.html',
                success:function(data){
                    if(data==true){
                        window.top.topPage.showSuccessMessage("操作成功!");
                        window.setTimeout(function () {
                            _this.refreshData(e, opt);
                        },2000);
                    }else{
                        window.top.topPage.showErrorMessage("操作失败!");
                    }
                }
            });
        },

        /**
         * 移除调用
         * @param e
         * @param opt
         */
        removeInvoke:function (e, opt) {
            var _this =this;
            window.top.topPage.ajax({
                dataType:'json',
                data:{
                    appKey:opt.appKey,
                    hostIp:opt.hostIp,
                    appVersion:opt.appVersion,
                    versionName:opt.versionName,
                    serverApp:opt.serverApp,
                    port:opt.port,
                    applicationName:opt.applicationName
                },
                type:"post",
                url:root+'/Monitor/removeInvoke.html',
                success:function(data){
                    if(data==true){
                        window.top.topPage.showSuccessMessage("操作成功!");
                        window.setTimeout(function () {
                            _this.refreshData(e, opt);
                        },2000);
                    }else{
                        window.top.topPage.showErrorMessage("操作失败!");
                    }
                }
            });
        }
    });
});