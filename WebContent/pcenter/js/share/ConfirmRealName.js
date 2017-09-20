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
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        submit: function (e, option) {
            window.top.topPage.ajax({
                url: this.getCurrentFormAction(e),
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data) {
                        option.back = "saveCallbak";
                        e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
                    } else {
                        e.page.showPopover(e, option, 'danger', window.top.message.common['save.success'], true);
                    }
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            })
        }
    });
});