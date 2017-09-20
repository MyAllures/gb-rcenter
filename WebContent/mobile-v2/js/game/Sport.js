/**
 * 体育赛事
 * Created by fei on 16-11-29.
 */
define([], function() {
    return Class.extend({
        init: function () {
            this.onPageLoad();
        },

        onPageLoad: function () {
            // mui('.mui-scroll-wrapper').scroll();
            mui('#mui-refresh').pullRefresh(window.top.game.pullRefresh).refresh(false);
            $('.mui-pull-bottom-pocket').addClass('mui-hidden');
        }
    })
});