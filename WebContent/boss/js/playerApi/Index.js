/**
 * Created by Jimmy 2018-05-04 20:45:16
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
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },
        /**
         * 批量同步API玩家余额
         */
        batchFetchApiBalance: function (e, opt) {
            var _this = this;
            var el_site_id = $('#site_id').val(); // 站点 ID
            if ($('.player').length > 0 && (el_site_id && el_site_id != null && el_site_id != "")) {
                // 必须保证site_id存在才可以发起批量更新
                window.top.topPage.showConfirmMessage("确定同步当前页面所有玩家余额吗?", function (callback) {
                    if (callback) {
                        _this.doBatchFetch(e, opt, el_site_id); // 开始同步
                    }
                });
            } else {
                window.top.topPage.showWarningMessage("当前页面没有数据需要同步!");
            }
            $(e.currentTarget).unlock();
        },
        doBatchFetch: function (e, opt, el_site_id) {
            var _this = this;
            var el_user_id = $('.user_id'); // 玩家编号
            var el_api_id = $('.api_id'); // API ID
            if (el_user_id.length > 0) {
                var players = []; // 玩家列表
                $(el_user_id).each(function (i) { // 用户信息填充到JSON数组中
                    players.push({
                        "apiId": $(el_api_id[i]).val(),
                        "siteId": el_site_id,
                        "userId": $(this).val()
                    });
                });
                window.top.topPage.ajax({
                    url: root + "/VPlayerApi/batchFetchApiBalance.html",
                    type: "POST",
                    dataType: "json",
                    data: {"players": JSON.stringify(players)},
                    success: function (data) {
                        if (data) {
                            if (data.state) {
                                window.top.topPage.showSuccessMessage(data.msg, function () {
                                    // 重新拉取列表数据
                                    _this.query(e, opt);
                                });
                            } else {
                                window.top.topPage.showErrorMessage(data.msg);
                            }
                        }
                    }, error: function () {
                        window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                    }
                })
            }
        }
    })
});
