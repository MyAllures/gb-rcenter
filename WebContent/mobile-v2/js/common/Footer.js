/**
 * Created by fei on 16-10-15.
 */

/**
 * 资产 API
 * Created by fei on 16-12-5.
 */
define([], function () {
    return Class.extend({
        init: function () {
            this.loadCustomerService();
            this.onPageLoad();
        },

        onPageLoad: function () {
            mui('body').on('tap', '.mui-bar-tab [data-href]', function () {
                var demo = $(this).data('demo');
                var auto = $(this).data('auto');
                if (demo) {
                    window.top.page.openLayer('试玩账号无权限访问');
                } else if (auto) {
                    window.top.page.autoLoginPl($(this).data('href'));
                } else {
                    window.top.page.gotoUrl($(this).data('href'));
                }
            });
        },
        /***
         * 加载客户服务链接地址
         */
        loadCustomerService: function () {
            if ($('.customer').size() != 0) {
                mui.ajax({
                    url: root + '/index/getCustomerService.html',
                    type: 'GET',
                    async: false,
                    success: function (data) {
                        $('.customer').attr('data-skip', data);
                    }
                });
            }
        }
    });
});

