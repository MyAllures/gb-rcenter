//重置登录密码
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
        resetPwdByEmail: function (e, option) {
            var userId = option.userId;
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/platform/operatorsManage/resetPwdByEmail.html?search.id=" + userId,
                dataType: 'json',
                success: function (data) {
                    if (data.email == null) {
                        window.top.topPage.showWarningMessage(window.top.message.platform['resetPwdByEmail.noEmail']);
                        $(e.currentTarget).unlock();
                    } else if (data.isOnline) {
                        window.top.topPage.showConfirmMessage(window.top.message.platform['resetPwdByEmail.isOnline'].replace('{username}', data.username), function (bol) {
                            if (bol) {
                                _this.resetPwdByEmailAjax(e, userId);
                            } else {
                                $(e.currentTarget).unlock();
                            }
                        });
                    } else {
                        window.top.topPage.showConfirmMessage(window.top.message.platform['resetPwdByEmail.confirm'].replace('{username}', data.username), function (bol) {
                            if (bol) {
                                _this.resetPwdByEmailAjax(e, userId);
                            } else {
                                window.top.topPage.closeDialog();
                                $(e.currentTarget).unlock();
                            }
                        });
                    }
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            })
        },
        resetPwdByEmailAjax: function (e, userId) {
            window.top.topPage.ajax({
                url: root + "/platform/operatorsManage/confirmResetPwdByEmail.html?search.id=" + userId,
                success: function (data) {
                    window.top.topPage.showSuccessMessage(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            })
        }

    });
});