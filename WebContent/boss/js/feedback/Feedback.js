/**
 * Created by eagle on 15-12-4.
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        init:function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },


        /**
         * 批量删除
         * @param e
         * @param opt
         */
        deleteBatch: function (e, opt) {
            var _this = this;
            var ids = _this.getSelectIds(e, opt);
            window.top.topPage.ajax({
                url: root + "/systemFeedback/batchDelete.html",
                type: "post",
                dataType: "json",
                data: ids,
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage(data.okMsg);
                        window.top.page.query(e, opt);
                        //$(e.currentTarget).parent().addClass('hide');
                    } else {
                        window.top.topPage.showErrorMessage(data.errMsg);
                    }
                }
            });
            $(e.currentTarget).unlock();
        },

        /**
         * 已读
         * @param e
         * @param opt
         */
        isRead:function(e,opt) {
            var _this = this;
            var ids = _this.getSelectIds(e, opt);
            window.top.topPage.ajax({
                url: root + "/systemFeedback/isRead.html",
                type: "post",
                dataType: "json",
                data: ids,
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage(data.okMsg);
                        window.top.page.query(e, opt);
                        //$(e.currentTarget).parent().addClass('hide');
                    } else {
                        window.top.topPage.showErrorMessage(data.errMsg);
                    }
                }
            });
            $(e.currentTarget).unlock();
        }
    });

});
