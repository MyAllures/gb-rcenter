/**
 * 棋牌
 * Created by ed on 16-11-29.
 */
define(['site/include/BaseIndex'], function(BaseIndex) {
    return BaseIndex.extend({

        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            _this.initPage();
            var apiId = $('#chess-id').val();
            if (typeof apiId !== 'undefined') {
                _this.loadData($('#chess-id').val());
            }
        },
        initPage: function () {
            var _this = this;
            mui(".electronic-type").scroll();
            mui('.mui-chess').on('tap', '[data-chess-id]', function() {
                $('input#game-name').val('');
                var id = $(this).data('chess-id');
                var isLoading = $('input#loading-' + id).val();
                if (isLoading == 'true') {
                    _this.loadData(id);
                } else {
                    $('#casino-id').val(id);
                    var pageNumber = $('input#paging-' + id).val();

                    var totalPage = $('input#total-page-' + id).val();
                    game.toRefresh(pageNumber, totalPage, true);
                }
            });

            var finish = $('#game-name').val();
            if (typeof finish !== 'undefined') {
                mui('#game-name')[0].addEventListener('input',function(){
                    var name = $(this).val();
                    if (name != null && name.trim().length > 0) {
                        $('i.mui-search-clear').show();
                    } else {
                        $('i.mui-search-clear').hide();
                    }
                });
            }

            mui('.electronic-srch').on('tap', 'i.mui-search-clear', function () {
                $(this).hide();
                $('#game-name').val('');
            });

            mui('.electronic-srch').on('tap', '#search-game', function() {
                $(this).focus();
                var apiId = $('#chess-id').val();
                var gameName = $('input#game-name').val();
                var pageNumber = 1;
                mui.ajax(root + '/game/getGameByApiId.html', {
                    type: 'GET',
                    data: {'search.apiId': apiId, 'search.apiTypeId': 5, 'search.name': gameName, 'paging.pageNumber': pageNumber},
                    headers: {
                        'Content-Type':'application/json',
                        'Soul-Requested-With':'XMLHttpRequest'
                    },
                    beforeSend: function () {
                        $('div.casino-content-' + apiId).html('');
                        _this.showLoading(340);
                    },
                    success: function(data) {
                        setTimeout(function() {
                            $('#chess-id').val(apiId);
                            $('input#loading-' + apiId).val('true');
                            $('div.chess-content-' + apiId).html(data);

                            var totalPage = $(data).filter('input#total-page-' + apiId).val();
                            _this.showNoData();
                            game.toRefresh(pageNumber, totalPage, true);
                        }, 1000);
                    },
                    complete: function () {
                        _this.hideLoading();
                    }
                });
            });

            $('.mui-content.mui-scroll-wrapper').scroll(function(event) {
                var isFocus = $('#game-name').is(':focus');
                if (isFocus == false) {
                    var scroll_top = $('div#mui-nav').offset().top;
                    if (scroll_top < 0) {
                        $('.electronic-srch').slideUp();
                    } else {
                        $('.electronic-srch').slideDown();
                    }
                }
            });
        },

        /** 切换TAB加载数据 */
        loadData: function(apiId) {
            var _this = this;
            var pageNumber = 1;
            
            mui.ajax(root + '/game/getGameByApiId.html', {
                type: 'GET',
                data: {'search.apiId': apiId, 'search.apiTypeId': 5, 'paging.pageNumber': pageNumber},
                headers: {
                    'Content-Type':'application/json',
                    'Soul-Requested-With':'XMLHttpRequest'
                },
                beforeSend: function () {
                    _this.showLoading(340);
                },
                success: function(data) {
                    setTimeout(function() {
                        $('#chess-id').val(apiId);
                        $('input#loading-' + apiId).val('false');
                        $('div.chess-content-' + apiId).html(data);

                        var totalPage = $(data).filter('input#total-page-' + apiId).val();
                        _this.showNoData();
                        game.toRefresh(pageNumber, totalPage, true);
                    }, 1000);
                },
                complete: function () {
                    _this.hideLoading();
                }
            });
        },

        showNoData: function () {
            var winHeight = $(window).height();
            var navHeight = $('div#menu-slider').height();
            var banHeight = $('div#slider').height();
            var height = winHeight - 240 - navHeight - banHeight;
            var lineHeight = (height - 10) + 'px';
            $('div.mui-no-data').css({'height': height, 'line-height': lineHeight});
        }
    });
});