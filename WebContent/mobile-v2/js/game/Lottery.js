/**
 * 彩票投注
 * Created by fei on 16-11-29.
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
            var apiId = $('#lottery-id').val();
            if (typeof apiId !== 'undefined') {
                _this.loadData($('#lottery-id').val());
            }
        },
        initPage: function () {
            var _this = this;
            mui('#mui-lottery').on('tap', 'a[data-lottery-id]', function () {
                _this.activeItem($(this).data('lotto-idx'));

                $('div.lottery-list').removeClass('mui-show');
                var id = $(this).data('lottery-id');
                var isLoading = $('input#loading-' + id).val();
                if (isLoading == 'true') {
                    _this.loadData(id);
                } else {
                    $('#lottery-id').val(id);
                    var pageNumber = $('input#paging-' + id).val();
                    $('div.lottery-content-' + id).parent().addClass('mui-show');

                    var totalPage = $('input#total-page-' + id).val();
                    game.toRefresh(pageNumber, totalPage, true);
                }
            });
        },

        activeItem: function (idx) {
            var $ele = $('a[data-lotto-idx=' + idx + ']');
            var isActive = $ele.hasClass('active');
            if (!isActive) {
                $('a[data-lotto-idx]').removeClass('active');
                $ele.addClass('active');
            }
        },

        /** 切换TAB加载数据 */
        loadData: function(apiId) {
            var _this = this;
            var pageNumber = 1;
            mui.ajax(root + '/game/getGameByApiId.html', {
                type: 'GET',
                data: {'search.apiId': apiId, 'search.apiTypeId': 4, 'paging.pageNumber': pageNumber},
                headers: {
                    'Content-Type': 'application/json',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                beforeSend: function () {
                    _this.showLoading(338);
                    $('div.lottery-content-' + apiId).parent().addClass('mui-show');
                },
                success: function (data) {
                    setTimeout(function() {
                        $('#lottery-id').val(apiId);
                        $('input#loading-' + apiId).val('false');
                        $('div.lottery-content-' + apiId).append(data);

                        var totalPage = $(data).filter('input#total-page-' + apiId).val();
                        game.toRefresh(pageNumber, totalPage, true);
                    }, 1000);
                },
                complete: function () {
                    _this.hideLoading();
                }
            });
        }
    });
});