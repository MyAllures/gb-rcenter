define(['common/MobileBasePage'], function (Mobile) {
    var url = root + "/promo/myPromo.html";
    var pageNumber = 2;
    return Mobile.extend({

        init: function (formSelector) {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var t = this;
            mui('#refreshContainer').pullRefresh({
                container: '#refreshContainer',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.promo_auto['上拉加载'],
                    auto:true,
                    contentrefresh: window.top.message.promo_auto["正在加载"],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.promo_auto['已经到底了'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: promoPulldownRefresh
                }
            });
            //主体内容滚动条
            // mui('.mui-scroll-wrapper').scroll();
            function promoPulldownRefresh() {
                var data = {"paging.pageNumber": pageNumber};
                pageNumber = t.pullRefreshUp(url, "content", pageNumber, "lastPageNumber", mui("#refreshContainer"), data, false);
                $(".mui-pull-bottom-pocket").remove();
            }
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            //data-href
            mui("body").on("tap", "[data-href]", function () {
                var _href = $(this).data('href');
                _this.gotoUrl(_href);
            });
        }

    });
});






