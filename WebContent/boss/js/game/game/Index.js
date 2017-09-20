/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({

        selectIds:null,
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
            var _this = this;
        },

        getSelectIds: function (e,opt) {
            selectIds = this.getSelectIdsArray(e);
            return true;
        },
        getIds: function () {
            return selectIds;
        }
    })
})
