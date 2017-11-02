/**
 * 时时彩js
 */
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            page.refreshView();
        }

    })
});