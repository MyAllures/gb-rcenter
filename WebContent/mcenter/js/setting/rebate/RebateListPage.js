/**
 * Created by tom on 15-8-27.
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 批量删除
         * @param e
         * @param opt
         */
        /*deleteBatch: function (e, opt) {
            var _this = this;
            var ids = _this.getSelectIds(e, opt);
            window.top.topPage.ajax({
                url: root + "/rebateSet/batchDelete.html",
                type: "post",
                dataType: "json",
                data: ids,
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage(data.msg);
                        window.top.page.query(e, opt);
                        $(e.currentTarget).parent().addClass('hide');
                    } else {
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                }
            });
            $(e.currentTarget).unlock();
        },*/

    });

});
