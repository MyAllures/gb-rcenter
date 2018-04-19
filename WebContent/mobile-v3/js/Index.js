var lazyLoadApi;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    initBanner();
    //默认打开弹窗消息
    initDialog();
    initNotice();
    //初始化api nav滑动
    swiper();
    //判断desk是否需要隐藏
    hideDesk();
});

/**
 * 导航点击下面滑块高度问题bug解决
 */
function slideHeight(obj, options) {
    var index = $(obj).data("swiper-slide-index");
    var targetSlide = $(".nav-slide-content .swiper-slide[data-swiper-slide-index=" + index + "]")[0];
    setTimeout(function () {// 滑动循环最后一个有延迟，设个定时器抵消延迟的效果
        $(".nav-slide-content>.swiper-wrapper").css({height: $(targetSlide).outerHeight()});
    }, 100);
}

/**
 * 滑动后重设高度
 */
function resizeSlideHeight() {
    var targetSlide = $(".nav-slide-content .swiper-slide-active");
    setTimeout(function () {// 滑动循环最后一个有延迟，设个定时器抵消延迟的效果
        $(".nav-slide-content>.swiper-wrapper").css({height: $(targetSlide).outerHeight()});
    }, 100);
}

/**
 * 关闭下载提示
 */
function closeDownLoad() {
    $(".banner-ads").hide();
}

/**
 * 初始化api nav滑动
 */
function swiper() {
    var siledSize = $(".nav .swiper-container a.swiper-slide").length;
    if(siledSize >1){
        var apiTypeLength = $("#apiTypeLength").val();
        // api滑动
        var slideContent = new Swiper('.nav-slide-content', {
            loop: true,
            loopedSlides: siledSize,
            autoHeight: true,
            on: {
                slideChangeTransitionEnd: function () {

                }
            }
        });
        var slideIndicators = new Swiper('.nav-slide-indicators', {
            loop: true,
            loopedSlides: siledSize,
            slidesPerView: apiTypeLength,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            on: {
                slideChangeTransitionEnd: function () {
                    //处理图片延迟加载
                    if ($(".nav-slide-content .swiper-slide-active").find("img[data-lazyload]").length > 0 || $(".nav-slide-content .swiper-slide-active").find("img[data-lazyload-id]").length > 0) {
                        if (!lazyLoadApi) {
                            lazyLoadApi = lazyLoadImg("body");
                        }
                        lazyLoadApi.refresh(true);
                    }
                    resizeSlideHeight();
                }
            }
        });
        slideContent.controller.control = slideIndicators;
        slideIndicators.controller.control = slideContent;
    }
}

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
    /* 公告初始化 */
    $('.marquee').marquee({
        duration: 6000
    });
}

/*消息弹窗*/
function initDialog() {
    mui('.mui-popover').popover('toggle', document.getElementById("openPopover"));
}

function dialog(obj, options) {
    var link = options.dataLink;
    if (link) {
        goToUrl(link);
    } else {
        initDialog();
    }
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
    $(".notice .notice-list a").each(function () {//生成公告html和indicator
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
 * 彩票切换
 * @param obj
 * @param options
 */
function changeNavGame(obj, options) {
    $(obj).parent().parent().find(".mui-active").removeClass("mui-active");
    $(obj).addClass("mui-active");
    var apiId = options.apiId;
    var apiTypeId = options.apiTypeId;
    $("div[name='nav-content-" + apiTypeId + "'] .mui-active").removeClass("mui-active");
    var navTarget = $('div#nav-' + apiTypeId + '-' + apiId);
    navTarget.addClass("mui-active");
    //处理图片延迟加载
    if ($(navTarget).find("img[data-lazyload]").length > 0) {
        lazyLoadApi.refresh(true);
    }
    resizeSlideHeight();
    $(obj).unlock();
}

//添加到桌面图标
function closeDesk(obj, options) {
    $("#deskTip").hide();
    localStorage.setItem("destHide", true);
}

//判断desk是否需要隐藏
function hideDesk(){
    if(os != 'app_ios' || localStorage.getItem("destHide")){
        $("#deskTip").hide();
    }
}