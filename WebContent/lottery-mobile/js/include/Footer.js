/**
 * Created by fei on 16-10-15.
 */

/**
 * 底部菜单js
 * Created by fei on 16-12-5.
 */
define([], function () {
    return Class.extend({
        init: function () {
            this.onPageLoad();
        },

        onPageLoad: function () {
            mui('body').on('tap', '.mui-bar-tab .mui-tab-item[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });
        }
    });
});

