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
        },
        saveSync:function () {
            window.alert(this);
            window.top.topPage.ajax({
                url: root+'gameI18n/saveSync.html',
                cache: false,
                type: "GET",
                success: function (data) {
                    window.alert(data.msg);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
            $(e.currentTarget).unlock();
        }
    })
})
