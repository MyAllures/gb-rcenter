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
        /*游戏分类api tab横向滚动*/
        horizontalScroll: ['.lottery-nav .mui-scroll-wrapper']
    };
    muiInit(options);
    initBanner();
    initNotice();
});

/*轮播图*/
function initBanner() {
    if ($(".mui-banner .mui-slider-item").length > 1) {
        mui('.mui-banner').slider({
            interval: 5000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
        });
    }
}

/**
 * 公告滚动
 */
function initNotice() {
    var index = 0;
    var len = $("section.notice .notice-list p").length;

    function topScroll() {
        if (index >= len) {
            index = 0
        }
        $("section.notice .notice-list").css({
            "transform": "translate3d(0px, " + index * -28 + "px, 0px)"
        });
        index++;
    }

    setInterval(topScroll, 3600);
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
    var index = options.idx;//当前点击的公告index
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
    var apiId = options.apiId;
    $('#lottery-id').val(apiId);
    $('div#lottery-' + apiId).addClass("mui-active");
}