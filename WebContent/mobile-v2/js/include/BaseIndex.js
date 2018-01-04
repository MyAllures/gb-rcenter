/**
 * Created by fei on 16-12-11.
 */
define(['common/MobileBasePage'], function (Mobile) {

    return Mobile.extend({

        pullRefresh: {},
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            var _this = this;
            _this.pullRefresh = {
                container: '#mui-refresh',
                down: {
                    height: 50,
                    contentdown: window.top.message.game_auto['下拉可以刷新'],
                    contentover: window.top.message.game_auto['释放立即刷新'],
                    contentrefersh: window.top.message.game_auto['正在刷新'],
                    callback: this.refreshData
                },
                up: {
                    height: 50,
                    contentinit: window.top.message.game_auto['上拉加载更多'],
                    contentrefresh: window.top.message.game_auto['正在加载'],
                    contentnomore: window.top.message.game_auto['已经到底了'],
                    callback: this.loadMore
                }
            };
            this._super();
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
            mui('body').on('tap', 'a[data-url]', function () {
                var _href = $(this).data('url');
                var demo = $(this).data('demo');
                if (demo) {
                    window.top.page.openLayer('试玩账号无权限访问');
                } else if ((isLogin == 'false' && (_href.indexOf('lotteryResultHistory') > 0) || ( _href.indexOf('mainIndex.html') > 0 && _href!='/lottery/mainIndex.html'))) {
                    _this.gotoUrl(_href);
                } else if (isLogin == 'false' && _href != "/") {
                    _this.toLogin(_href);
                } else {
                    var auto = $(this).data("auto");
                    if (auto) {
                        _this.autoLoginPl(_href);
                    } else {
                        _this.gotoUrl(_href);
                    }
                }
            });
        },
        /**
         * 启用停用加载
         * @param pageNumber
         * @param totalPage
         * @param enable
         */
        toRefresh: function (pageNumber, totalPage, enable) {
            var _this = this;
            if (pageNumber < parseInt(totalPage)) {
                if (enable) {
                    mui('#mui-refresh').pullRefresh(_this.pullRefresh).enablePullupToRefresh();
                }
                mui('#mui-refresh').pullRefresh(_this.pullRefresh).endPullupToRefresh(false);
            } else {
                mui('#mui-refresh').pullRefresh(_this.pullRefresh).endPullupToRefresh(true);
            }
        },

        /** 显示Loading */
        showLoading: function (oth) {
            var winHeight = $(window).height();
            var navHeight = $('div#menu-slider').height();
            var banHeight = $('div#slider').height();
            $('div.loader').css({'height': winHeight - oth - navHeight - banHeight});
            $('div.com-loading').addClass('mui-show');
        },


        showGameLoading: function () {
            var content = '<div class="game-mask"><div class="game-loading"></div></div>';
            var loading = '<div class="com-loading" style="display: block"><div class="loader">' +
                '<div class="loader-inner ball-pulse"><div></div><div></div><div></div></div></div></div>' +
                '<div class="loader-tip">' + window.top.message.game_auto["游戏载入中"] + '</div>';
            $('body').append(content);
            var $gl = $('div.game-loading');
            $gl.html(loading);
            var winHeight = $(window).height();
            $gl.css({'top': (winHeight - 100) / 2});
            $('div.game-mask').show();
        },

        loadingShow: function (ballColor, parent, height) {
            var content = '<div class="game-loading no-bg"></div>';
            var loading = '<div class="com-loading" style="display: block"><div class="loader" style="min-height: ' + height + '">' +
                '<div class="loader-inner ball-pulse ball-' + ballColor +
                '"><div></div><div></div><div></div></div></div></div>';
            $(parent).append(content);
            var $gl = $('div.game-loading');
            $gl.html(loading);
            $('div.game-mask').fadeIn();
        }

    });

});