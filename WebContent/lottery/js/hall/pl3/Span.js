/**
 * 跨度
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        onPageLoad: function () {
            this._super();
            this.refreshTableCommon($(".main-left input.hiddenCode").data('code'));
        }
    })
});