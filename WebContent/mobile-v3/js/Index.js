$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left'],
        init: pullUpRefreshOption('#pullfresh', pullfresh, true),
        /*游戏分类api tab横向滚动*/
        horizontalScroll: ['.lottery-nav .mui-scroll-wrapper']
    };
    muiInit(options);
    initBanner();
});

/*轮播图*/
function initBanner() {
    mui('.mui-banner').slider({
        //interval: 3000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
    });
}

/**
 * 关闭轮播图
 * @param e
 * @param options
 */
function closeBanner(obj, options) {
    $('.gb-banner').slideUp();
}

/*公告弹窗*/
function showNotice(obj, options) {
    var noticeA = noticeIndicator = "";
    $(".notice .notice-list p a").each(function () {//生成公告html和indicator
        noticeA += "<div class='mui-slider-item'><a href='javascript:'>" + $(this).html() + "</a></div>";
        noticeIndicator += "<div class='mui-indicator'></div>"
    });
    var noticeHtml = $('<div><div class="mui-slider notice-slider"><div class="mui-slider-group">' + noticeA + '</div><div class="mui-slider-indicator">' + noticeIndicator + '</div></div></div></div>');
    var alertNotice = mui.alert(noticeHtml.html(), "公告", "关闭");
    $(alertNotice.element).addClass('notice-alert');// 定义弹窗的class,方便修改样式
    var index = $(obj).index();//当前点击的公告index
    //初始化notice-slider
    var notice = mui('.mui-slider');
    notice.slider({
        //interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    //点击公告，轮播跳转到对应的位置
    $(".notice-slider .mui-indicator").removeClass("mui-active");
    $(".notice-slider .mui-indicator:eq(" + index + ")").addClass("mui-active");
    notice.slider().gotoItem(index);
}

/**
 * 导航游戏分类切换
 */
function changeApiTypeTab(obj, options) {
    $(".api-grid ul").removeClass('active');
    $(".api-grid div").removeClass('active');
    var item = options.item;
    $(".api-grid ul[data-list='" + item + "']").addClass('active');
}

/**
 * 彩票切换
 * @param obj
 * @param options
 */
function changeLottery(obj, options) {
    $(".lottery-nav li a.mui-tab-item.mui-active").removeClass("mui-active");
    $(".lottery-content .mui-control-content.mui-active").removeClass("mui-active");
    $(obj).addClass("mui-active");
    var isLoadData = $(obj).attr("loadData");
    var apiId = options.apiId;
    $('#lottery-id').val(apiId);
    if (!isLoadData) {
        pullfresh();
    }
    $('div#lottery-' + apiId).addClass("mui-active");
    $(obj).attr("loadData", true);
}

/*彩票上拉请求数据*/
function pullfresh() {
    setTimeout(function () {
        mui('#pullfresh').pullRefresh().endPullupToRefresh(false);
        var $apiTypeTab = $(".nav .mui-scroll .mui-active");
        var options = eval("(" + $($apiTypeTab).attr('data-rel') + ")");
        if(options != null){
            var type = options.item;
            if (type == "lottery") {
                mui('#pullfresh').pullRefresh().endPullupToRefresh(false);
                var $api = $(".lottery-nav a.mui-tab-item.mui-active");
                var apiOption = eval("(" + $($api).attr('data-rel') + ")");
                var apiId = apiOption.apiId;
                var pageNumber = parseInt($('#total-page-' + apiId).attr("pageNumber"));
                if (!pageNumber) {
                    pageNumber = 0;
                }
                var lastPageNumber = parseInt($('#total-page-' + apiId).val());
                if (pageNumber == lastPageNumber) {
                    mui('#pullfresh').pullRefresh().endPullupToRefresh(true);
                } else {
                    pullUpLoadData(apiId, pageNumber + 1);
                }
                $api.attr("loadData", true);
            }
        }
    }, 100);
}

function pullUpLoadData(apiId, pageNumber) {
    var url = root + '/game/getGameByApiId.html?search.apiId=' + apiId + '&search.apiTypeId=4&paging.pageNumber=' + pageNumber;
    var options = {
        url: url,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
            $('div.api-loading').show();
        },
        success: function (data) {
            $('#lottery-id').val(apiId);
            $('input#loading-' + apiId).val('false');
            $('div#lottery-' + apiId).append(data);
            $(".lottery-nav a[data-lottery-id='" + apiId + "']").attr("loadData", "true");
            $("#total-page-" + apiId).attr("pageNumber", pageNumber);
        },
        complete: function () {
            $('div.api-loading').hide();
        }
    };
    muiAjax(options);
}

