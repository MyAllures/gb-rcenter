/**
 * Created by eagle on 15-12-11.
 */
define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件

        },

        allQuery:function(event,opt) {
            var that = this;
            if(event.returnValue==true) {
                window.top.topPage.ajax({
                    url: window.top.topPage.getCurrentFormAction(event),
                    type: "post",
                    data: window.top.topPage.getCurrentFormData(event),
                    success: function (data) {
                        var form = window.top.topPage.getCurrentForm(event);
                        var $result = $("#mainFrame");
                        $result.html(data);
                        event.page.onPageLoad();
                        //$(event.currentTarget).unlock();
                    }
                });
            }
        },
    });
});