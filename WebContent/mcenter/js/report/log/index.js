//模板页面
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super(window.top.message.report_auto['更多备注']);
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            this.changeLogMenu();
        },
        changeKey : function(e) {
            $('#operator').attr('name', e.key).val('');
        },
        changeLogMenu: function () {
            /*$(".sys_tab_wrap li").on("click",function(){
                var that = this;
                $(that).siblings().removeClass("active");
                $(that).addClass("active");
                var type = $(that).data("logtype");
                $("input[name='search.roleType']").attr("value",type);
                $(".btnQuery").trigger("click");
            });*/
        },
        toExportHistory:function(e,opt){
            if(e.returnValue=="showProcess"){
                var btnOption = {};
                btnOption.target = root + "/share/exports/showProcess.html";
                btnOption.text=window.top.message['export.exportdata'];
                btnOption.type="post",
                    btnOption.callback = function (e) {
                        $("#toExportHistory").click();
                    };
                window.top.topPage.doDialog({}, btnOption);
            }else if(e.returnValue){
                $("#toExportHistory").click();
            }
        },
        exportData: function (e,opt) {
            var data = $("#conditionJson").val();
            return data;
        },
        validateData: function (e,opt) {
            if($("[name='paging.totalCount']").val()==0){
                window.top.topPage.showWarningMessage(window.top.message.report['tip.warn.export.nodata']);
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        }
    });
});