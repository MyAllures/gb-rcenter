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

            $("ul li a", "#mainFrame div.panel").on("click", function (e) {
                var $href = $(this).attr("data-href");
                $(".tab-content").addClass("hide");
                $("#tab-content" + $(this).attr("index")).load(root + $href);
                $("#tab-content" + $(this).attr("index")).removeClass("hide");
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
        }
    });
});