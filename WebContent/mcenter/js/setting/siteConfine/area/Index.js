//模板页面
define(['common/BaseListPage', 'bootstrap-dialog'], function(BaseListPage,BootstrapDialog) {
    return BaseListPage.extend({
        bootstrapDialog: BootstrapDialog,
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
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();

        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            $("#li_top_1").addClass("active");
            var _this = this;
            //这里初始化所有的事件
            /**
             * 有标签页时调用
             */
            this.initShowTab();
            /**
             * 有详细展开时调用
             */
            this.initShowDetail();


        },
        confirmMessage: function (e,option) {
            var _this=this;
            window.top.topPage.ajax({
                url: root+"/siteConfineArea/selectIds.html",
                dataType:'json',
                data:_this.getSelectIds(e,option),
                success: function (data) {
                    if(data){
                        _this.getDeleteMsg(e,option,window.top.message.setting['siteConfine.area.delete.usingMsg']);
                    }else{
                        _this.getDeleteMsg(e,option,window.top.message.common['delete.deleteConfirm']);
                    }
                }
            });
        },
        getDeleteMsg:function(e,option,message){
            var _this=this;
            window.top.topPage.bootstrapDialog.show({
                type: BootstrapDialog.TYPE_PRIMARY,
                title: window.top.message.common['msg'],
                message:message,
                buttons: [{
                    label: window.top.message.common['del'],
                    action: function (dialog) {
                        window.top.topPage.doAjax(e, option);
                        dialog.close();
                    }
                }, {
                    label: window.top.message.common['cancel'],
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }
    });
});