/**
 * 管理首页-首页js
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
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
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        next: function (e, option) {
            window.top.topPage.ajax({
                url: root + "/share/confirmRealName.html",
                data: this.getCurrentFormData(e),
                type: 'POST',
                success: function (data) {
                    $("body").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            })
        }
    });
});