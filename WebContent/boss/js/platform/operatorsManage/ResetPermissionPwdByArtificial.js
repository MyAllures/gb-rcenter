//重置安全密码
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
        },
        resetPwd: function (e, option) {
            var userName = option.username;
            var isOnline = option.isOnline;
            var msg;
            if (isOnline='true') {
                msg = window.top.message.platform['resetPermissionPwd.artificial.onlineWarning'].replace('{username}', userName);
            } else {
                msg = window.top.message.platform['resetPermissionPwd.artificial.warning'].replace('{username}', userName);
            }
            var _this = this;
            window.top.topPage.showConfirmMessage(msg, function (bol) {
                if (bol) {
                    window.top.topPage.ajax({
                        url: root + '/platform/operatorsManage/saveResetPermissionPwd.html',
                        data: _this.getCurrentFormData(e),
                        dataType: 'JSON',
                        success: function (data) {
                            if (data.state) {
                                window.top.topPage.showSuccessMessage(data.msg);
                            } else {
                                window.top.topPage.showErrorMessage(data.msg);
                            }
                            $(e.currentTarget).unlock();
                        }
                    });
                } else {
                    $(e.currentTarget).unlock();
                }
            });
        }
    });
});