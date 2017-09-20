define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "#editDataRightForm";
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },

        saveAndUpdate:function (e) {
            var _this = this;
            var option = {};
            window.top.topPage.ajax({
                url: root + "/sysUserDataRight/saveAndUpdate.html",
                dataType: 'json',
                cache: false,
                type: "post",
                data: this.getCurrentFormData(e),
                success: function (data) {
                    if (data.state) {
                        option.callback = function (e,option) {
                            _this.returnValue = true;
                            window.top.topPage.closeDialog();
                        };
                        page.showPopover(e, option, 'success', data.msg, true);
                    } else {
                        page.showPopover(e, option, 'danger', data.msg, true);
                    }
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            })
        },

        /**
         * 全选
         */
        checkAll: function (e) {
            $(e.currentTarget).parent("div").find('input[type=checkbox]').prop("checked", true);
            $(e.currentTarget).unlock();
        },
        /**
         * 清楚所有
         */
        clearAll: function (e) {
            $(e.currentTarget).parent("div").find('input[type=checkbox]').prop("checked", false);
            $(e.currentTarget).unlock();
        }
    });
});