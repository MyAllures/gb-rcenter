/**
 * api转账限额
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function (form) {
            this._super(form);
        },

        bindEvent : function() {
            this._super();
        },
        updateTransferLimit:function (e) {
            var ids = this.getSelectIdsArray(e);
            var siteId = $("input[name='search.siteId']").val();
            var transferLimit = $("input[name='search.transferLimit']").val();
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/api/batchTransferLimit.html?search.siteId="+siteId+"&search.transferLimit=" +transferLimit+"&ids="+ids,
                type: "post",
                dataType:"json",
                data: this.getCurrentFormData(event),
                success: function (data) {
                    if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg);
                    }else{
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                    e.returnValue=true;
                    _this.callBackQuery(e);
                },
                error: function (data) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(event.currentTarget).unlock();
                }
            });
        }
    });
});
