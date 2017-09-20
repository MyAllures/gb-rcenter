/**
 * Created by jeff on 15-11-2.
 * 玩家中心-资金记录 列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            page.resizeDialog();
        }
    });
});