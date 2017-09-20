define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
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
        },
        /**
         * 结算返水成功
         * @param e
         * @param option
         */
        rakebackSuccess: function (e, option) {
            window.top.topPage.ajax({
                url: option.url,
                dataType: 'json',
                data: this.getCurrentFormData(e),
                success: function (data) {
                    var msgType = data.state == true ? 'success' : 'danger';
                    if (data.state) {
                        option.callback = 'saveCallbak';
                    }
                    e.page.showPopover(e, option, msgType, data.msg, true);
                },
                error: function (data) {
                    e.page.showPopover(e, option, 'danger', window.top.message.common['save.failed'], true);
                }
            })
        }
    });

});