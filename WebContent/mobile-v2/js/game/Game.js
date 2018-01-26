/**
 * Created by fei on 16-12-11.
 */
define(['site/game/ApiLogin'], function(ApiLogin) {
    return ApiLogin.extend({
        init: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();

            this.initPage();
            this.changeTab($('input#nav-type').val());
            this.enterGame();
            // this.startMarquee(22, 22, 3000);
            this.userTime(true);
            // 刷新页面后获取容器高度，解决IOS设备刷新时出现空白页问题
            $('.mui-inner-wrap').height();
        },
        initPage: function () {
            var _this = this;
            _this.initTab($('#tid').val());
            mui(document.body).on('tap','.index-action-menu',function(){
                mui('.mui-off-canvas-wrap').offCanvas('show');
            });
            mui('body').on('tap', 'a.btn-login', function() {
                var _href="/index.html";
                _this.toLogin(_href);
            });

            mui('body').on('tap', 'a[data-url]', function () {
                var _href = $(this).data('url');
                if (isLogin == 'false' && _href != "/") {
                    _this.toLogin(_href);
                } else {
                    _this.gotoUrl(root + $(this).data('url'));
                }
            });
            mui('body').on('tap', '[data-href]', function () {
                _this.gotoUrl($(this).data("href"));
            });
            mui('header').on('tap', 'div.logo-box', function () {
                mui.back();
            });

            mui('.mui-banner').slider({
                interval: 3000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
            });

            $('#mui-nav').find('a').removeClass('mui-active');
            $('#mui-nav').find('a.ico' + $('#nav-type').val()).addClass('mui-active');

            mui('.gb-banner').on('tap', '.mui-icon', function () {
                $('.gb-banner').slideUp();

                var $ele = $('.mui-no-data');
                var height = $ele.height();
                if (height != null) {
                    height = height + 138;
                    var lineHeight = (height - 10) + 'px';
                    setTimeout(function () {
                        $ele.css({'height': height, 'line-height': lineHeight});
                    }, 500);
                }
                return false;
            });

            mui('.gb-notice').on('tap', 'a[data-idx]', function (event) {
                var winHeight = $(window).height();
                // 此句非常重要，否则item初始化错误
                $('#box-notice').addClass('mui-slider');
                var boxHeight = $('.gb-notice-box').height();
                var boxTop = (winHeight - boxHeight) / 2;
                $('.gb-notice-box').css({'top': boxTop});
                var idx = $(this).data('idx');
                $('.masker-notice-box').css({'min-height':winHeight - 44}).show();
                $('.gb-notice-box').slideDown(function () {
                    mui('#box-notice').slider().gotoItem(idx, 500);
                });
            });
            mui('body').on('tap', '.masker-notice-box', function (event) {
                $('.gb-notice-box').slideUp(function(){
                    $('body').removeClass('has-menu-ex');
                    $('.mui-hide-bar').hide();
                    $('.masker-notice-box').hide();
                });
            });

            mui('#mui-nav').on('tap', 'a[data-id]', function() {
                var id = $(this).data('id');
                _this.initTab(id);

                var onOff = $(this).data('of');
                if (onOff != 'off') {
                    _this.changeTab(id);
                    $(this).data('of', 'off');
                }
            });

            mui('#mui-nav').on('tap', 'a[data-terminal]', function () {
                var terminal = $(this).data('terminal');
                if (terminal === 'pc') {
                    document.cookie = "ACCESS_TERMINAL=pc;expires=0";
                    window.location.replace(root + '/');
                }
            });
        },

        changeTab: function(id) {
            var _this = this;
            if (id > 0) {
                _this.showLoading(214);
                _this.getGameByApiId(id);
            } else if (id < 0) {   // 代理,关于,条款
                _this.loadOther(id);
            }
        },

        initTab: function(id) {
            var _this = this;
            var hasClass = $("#_games").hasClass('mui-active');
            if (id < 5 && !hasClass) {
                $('div#mui-refresh').find('div.mui-nav').removeClass('mui-active');
                $('div#_games').addClass('mui-active');
            }
            $('div.mui-container').children().removeClass('mui-show').addClass('mui-hide');
            $('div#container' + id).addClass('mui-show');
            $('#nav-type').val(id);
            if (id == 2 || id == 4 || id == -1 || id == 5) {
                mui('#mui-refresh').pullRefresh(_this.pullRefresh).enablePullupToRefresh();
            }else
                mui('#mui-refresh').pullRefresh(_this.pullRefresh).disablePullupToRefresh();
        },

        getGameByApiId: function(id) {
            var _this = this;
            mui.ajax(root + '/game/getGame.html', {
                type: 'GET',
                data: {'apiType': id},
                headers: {'Soul-Requested-With':'XMLHttpRequest'},
                dataType: 'text/html',
                success: function (data) {
                    setTimeout(function() {
                        $('div#container' + id).html(data);
                        if (id == 1) {
                            window.top.game.live.onPageLoad();
                        } else if (id == 2) {
                            window.top.game.casino.onPageLoad();
                        } else if (id == 3) {
                            window.top.game.sport.onPageLoad();
                        } else if (id == 4) {
                            window.top.game.lottery.onPageLoad();
                        } else if (id == 5){
                            window.top.game.chess.onPageLoad();
                        }
                        mui('.mui-slider').slider();
                    }, 1000);
                },
                complete: function () {
                    // 进入游戏
                    _this.enterGame();
                    if (id == 1 || id == 3) {
                        _this.hideLoading();
                    }
                }
            })
        },

        /** 刷新数据 */
        refreshData: function () {
            var id = $('#nav-type').val();
            if (id > 0) {
                window.location.replace(root + '/game.html?typeId=' + id);
            } else if (id == -1) {   // 优惠
                game.loadOther(id);
            } else if (id < 0) {   // 关于,条款
                game.loadOther(id);
            }
        },

        loadOther: function (id) {
            var _this = this;
            var other;
            //优惠
            if (id == -1) {
                other = 'promo';
                _this.showLoading(214);
                if(window.top.game&&window.top.game.promo){
                    window.top.game.promo.loadMoreActivity(true);
                    mui('#mui-refresh').pullRefresh(_this.pullRefresh).enablePullupToRefresh();
                    return ;
                }
            } else if (id == -2) {//代理
                other = 'agent';
            } else if (id == -3) {//关于
                other = 'about';
            } else if (id == -4) {//条款
                other = 'terms';
            }
            mui('#mui-refresh').pullRefresh(_this.pullRefresh).endPulldownToRefresh();
            if (id != -1) {
                mui('#mui-refresh').pullRefresh(_this.pullRefresh).disablePullupToRefresh();
            }

            var url = root + (id == -1 ? '/promo/' + other : '/index/' + other) + '.html';
            mui.ajax(url, {
                type: 'GET',
                headers: {'Soul-Requested-With':'XMLHttpRequest'},
                success: function(data) {
                    $('#_' + other).html(data);
                }
            })
        },

        /** 滚动加载更多 */
        loadMore: function() {
            var apiTypeId = $('#nav-type').val();

            var apiId, apiType;
            if (apiTypeId == 1 || apiTypeId == 3) {
                game.toRefresh(2, 1, false);
                return false;
            } else if (apiTypeId == 2) {
                apiId = $('#casino-id').val();
                apiType = 'casino';
            } else if (apiTypeId == 4) {
                apiId = $('#lottery-id').val();
                apiType = 'lottery';
            } else if (apiTypeId == -1) {
                window.top.game.promo.loadMoreActivity();
                return true;
            } else {
                return false;
            }
            var pageNumber = $('input#paging-' + apiId).val();
            var totalPage = $('input#total-page-' + apiId).val();

            if ((typeof pageNumber == "undefined") || (typeof totalPage == "undefined") || pageNumber >= totalPage) {
                game.toRefresh(pageNumber, totalPage, false);
                return false;
            }
            pageNumber = parseInt(pageNumber) + 1;
            setTimeout(function () {
                mui.ajax(root + '/game/getGameByApiId.html', {
                    type: 'GET',
                    timeout: 10000,
                    data: {'search.apiId': apiId, 'search.apiTypeId': apiTypeId, 'paging.pageNumber': pageNumber},
                    headers: {
                        'Content-Type': 'application/json',
                        'Soul-Requested-With': 'XMLHttpRequest'
                    },
                    success: function(data) {
                        $('input#paging-' + apiId).val(pageNumber);
                        $('div.' + apiType + '-content-' + apiId).append(data);

                        var totalPage = $('input#total-page-' + apiId).val();
                        game.toRefresh(pageNumber, totalPage, false);
                    }
                });
            }, 1000);
        }
    });
});