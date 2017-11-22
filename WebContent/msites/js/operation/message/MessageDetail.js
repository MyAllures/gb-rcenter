/**
 * Created by admin on 2015-11-17
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            window.top.index.loadPlayerMessage();
        }
    });

});

