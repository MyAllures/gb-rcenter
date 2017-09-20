/**
 * 真人视讯
 * Created by fei on 16-11-29.
 */
define(['common/MobileBasePage'], function(Mobile) {
    return Mobile.extend({
        init: function () {
            this.onPageLoad();
        },

        onPageLoad: function () {
            mui('#mui-refresh').pullRefresh(window.top.game.pullRefresh).refresh(false);
            $('.mui-pull-bottom-pocket').addClass('mui-hidden');
            this.initBanner();
        }
    })
});
