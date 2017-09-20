/**
 * Created by orange on 2016-03-10
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
        },
        editRealName: function (e,q) {
            var datas = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type:"POST",
                url:root+'/player/editRealName.html',
                data:datas,
                dataType: "json",
                error:function(data){
                    window.top.topPage.showWarningMessage(data.msg);
                },
                success:function(data){
                    if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg, function () {
                            window.top.topPage.closeDialog();
                        });
                    }
                }
            });
        }

    });

})