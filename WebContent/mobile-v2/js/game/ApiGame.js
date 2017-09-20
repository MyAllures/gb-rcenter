/**
 * APIGame
 * Created by bill on 17-02-21.
 */
define(['site/game/ApiLogin'], function(ApiLogin) {
    var _this;
    var pageNumber = 2;
    return ApiLogin.extend({
        init: function () {
            this._super();
            _this = this;
            mui('#game-scroll').pullRefresh({
                container: '#game-scroll',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.game_auto['上拉加载'],
                    contentrefresh: window.top.message.fund_auto['正在加载'],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.fund_auto['已经到底'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: _this.loadData
                }
            });
        },
        onPageLoad: function () {
            this._super();
            _this = this;
            this.loadData(true);
            // mui('.mui-scroll-wrapper').scroll();
            // this.getGameByApiId();
            this.back2Casino();
        },
        bindEvent :function () {
            this._super();
            mui('body').on('tap', 'a.btn-login', function () {
                var _href = "/index.html";
                _this.toLogin(_href);
            });
            mui(document.body).on('tap','.index-action-menu',function(){
                mui('.mui-off-canvas-wrap').offCanvas('show');
            });
            mui('body').on('tap', 'a[data-url]', function () {
                var _href = $(this).data('url');
                if (isLogin == 'false' && _href != "/") {
                    _this.toLogin(_href);
                } else {
                    _this.gotoUrl(root + $(this).data('url'));
                }
            });
            mui('.search-wrap').on('tap', '#search-game', function() {
                $(this).focus();
                var apiId = $('#apiId').val();
                var apiTypeId = $('#apiTypeId').val();
                var gameName = $('input#game-name').val();
                pageNumber = 1;
                var data = {'search.apiId': apiId, 'search.apiTypeId': 2, 'search.name': gameName, 'paging.pageNumber': pageNumber};
                pageNumber = _this.pullRefreshUp("/game/getGameByApiId.html","gameContent",pageNumber,"total-page-"+apiId,mui("#game-scroll"),data,true);
            });
        },
        getGameByApiId: function(id) {
            var _this = this;
            mui.ajax(root + '/game/getGame.html', {
                type: 'GET',
                data: {'apiType': id},
                headers: {'Soul-Requested-With':'XMLHttpRequest'},
                dataType: 'text/html',
                beforeSend: function () {
                    _this.showLoading(100);
                },
                success: function (data) {
                    setTimeout(function() {
                        $('div#container').html(data);
                        if (id == 2) {
                            window.top.page.casino.onPageLoad();
                        } else if (id == 4) {
                            window.top.page.lottery.onPageLoad();
                        }
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
        loadData: function(isReload) {
            var apiId = $("#apiId");
            var apiTypeId= $("#apiTypeId");
            if(isReload){
                pageNumber = 1;
                _this.showLoading(100);
            }
            var data = {'search.apiId': apiId.val(), 'search.apiTypeId': apiTypeId.val(), 'paging.pageNumber': pageNumber};
            pageNumber = _this.pullRefreshUp("/game/getGameByApiId.html","gameContent",pageNumber,"total-page-"+apiId.val(),mui("#game-scroll"),data,isReload);
        },
        pullRefreshUp: function (url, contentId, pagenumber, lastPageNumberId, scrollView, data, isReload) {
            var t=this;
            var lastPageNumber = document.getElementById(lastPageNumberId);
            if (lastPageNumber == null || pagenumber <= parseInt(lastPageNumber.value)) {
                mui.ajax(url, {
                    type: 'GET',//HTTP请求类型
                    timeout: 10000,//超时时间设置为10秒；
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Soul-Requested-With': 'XMLHttpRequest'
                    },
                    beforeSend: function () {
                        // _this.showLoading(240);
                    },
                    success: function (data) {
                        var info = $('#'+contentId);
                        if (isReload) {
                            info.html(data) ;
                            scrollView.pullRefresh().endPullupToRefresh(false);
                        } else {
                            info.append(data);
                        }
                        var lastPageNumber = $('#'+lastPageNumberId);
                        if (lastPageNumber.val()!=null&& lastPageNumber.val()==pagenumber) {
                            scrollView.pullRefresh().endPullupToRefresh(true);
                            // return pagenumber;
                        } else {
                            scrollView.pullRefresh().endPullupToRefresh(false);
                            // return pagenumber+1;
                        }

                        _this.hideLoading();

                    },
                    error: function (e) {
                        t.toast(window.top.message.game_auto['加载失败']);
                        scrollView.pullRefresh().endPullupToRefresh(true);
                        _this.hideLoading();
                        //异常处理；
                        console.log(e);
                        _this.hideLoading();
                    },
                    complete: function () {
                        _this.hideLoading();
                    }
                });
                return pagenumber + 1;
            } else {
                scrollView.pullRefresh().endPullupToRefresh(true);
                return pagenumber;
            }
        },
        showNoData: function () {
            var winHeight = $(window).height();
            var navHeight = $('div#menu-slider').height();
            var banHeight = $('div#slider').height();
            var height = winHeight - 240 - navHeight - banHeight;
            var lineHeight = (height - 10) + 'px';
            $('div.mui-no-data').css({'height': height, 'line-height': lineHeight});
        },
        back2Casino: function () {
            var _this = this;
            mui('.game-type').on('tap', '.btn-back-index', function () {
                var href = $(this).attr('_href');
                if (_this.os == 'app_android') {
                    window.gamebox.gotoHome(href);
                } else if(_this.os == 'app_ios'){
                    goBackUrl(href);
                }else {
                    _this.gotoUrl(href);
                }
            })
        }
    });
});
