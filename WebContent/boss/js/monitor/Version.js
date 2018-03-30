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
            this.formSelector = "#mainFrame form";
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            $("#serviceUl li a").on("click", function (e) {
                var $href = $(this).attr("data-href");
                $("#serviceDiv .tab-content").addClass("hide");
                $("#serviceDiv #tab-content" + $(this).attr("index")).load(root + $href);
                $("#serviceDiv #tab-content" + $(this).attr("index")).removeClass("hide");
            });

            $("#appUl li a").on("click", function (e) {
                var $href = $(this).attr("data-href");
                $("#appDiv .tab-content").addClass("hide");
                $("#appDiv #tab-content" + $(this).attr("index")).load(root + $href);
                $("#appDiv #tab-content" + $(this).attr("index")).removeClass("hide");
            });

            $(this.formSelector).on("click", "table thead input[type=checkbox]", function (e) {
                e.page = _this;
                $("tbody input[type=checkbox]", _this.getFirstParentByTag(e, "table")).each(function (node, obj) {
                    var $this = $(obj);
                    if (e.currentTarget.checked && !$this.prop("disabled")) {
                        $this.parents('tr').addClass('open');
                    }
                    else {
                        $this.parents('tr').removeClass('open');
                    }
                    if (!$this.prop("disabled")) {
                        obj.checked = e.currentTarget.checked;
                    }
                });
            });
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
                       /* window.setTimeout(function () {
                            _this.query(e, opt);
                        },1000);*/
                        window.top.topPage.ajax({
                            url: root + '/Monitor/Version.html',
                            success: function (data) {
                                $("#mainFrame", this.formSelector).html(data);
                                $(e.currentTarget).unlock();
                            }
                        });
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
            var _this =this
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
                    hostName:opt.hostName,
                    serverApp:opt.serverApp,
                    port:opt.port,
                    applicationName:opt.applicationName
                },
                type:"post",
                url:root+'/Monitor/removeInvoke.html',
                success:function(data){
                    if(data==true){
                        console.log("操作成功!");
                    }else{
                        console.log("操作失败!");
                    }
                }
            });
        },
        /**
         * 搜索按钮
         * @param e
         */
        queryView: function (e) {
            window.top.topPage.ajax({
                url: root + '/Monitor/Version.html',
                success: function (data) {
                    $("#mainFrame", this.formSelector).html(data);
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 移除调用
         * @param e
         * @param opt
         */
        appSwitch:function (e, opt) {
            var _this =this;
            window.top.topPage.ajax({
                dataType:'json',
                data:{
                    hostIp:opt.hostIp,
                    hostName:opt.hostName,
                    version:opt.version,
                    isServer:opt.isServer,
                    applicationName:opt.applicationName
                },
                type:"post",
                url:root+'/Monitor/appSwitch.html',
                success:function(data){
                    if(data==true){
                        console.log("操作成功!");
                    }else{
                        console.log("操作失败!");
                    }
                }
            });
        }
    });
});