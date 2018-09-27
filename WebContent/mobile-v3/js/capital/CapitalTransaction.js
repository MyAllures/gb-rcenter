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
    swiper();
});

/**
 * 初始化api nav滑动
 */
function swiper() {
    /*顶部导航tab*/
    var slideNavTabs = new Swiper('.deposit-sorts', {
        loop: true,      //无限滚动
        loopedSlides:3,
        slidesPerView:  3,
        freeMode: true,
        freeModeMomentum : false,
        setWrapperSize :true,
        allowTouchMove: true,
        slideToClickedSlide: true,
        touchRatio: 0.2,
        observer:true,
        observeParents:true,
    });
    /*tab内容展示*/
    var slideContent = new Swiper('.slide-content', {
        loop: true,
        loopedSlides: 3,
        autoHeight: false,
        controller: {
            control: slideNavTabs,
        },
        on: {
            slideChangeTransitionEnd: function () {
                mui('.slide-content .mui-scroll-wrapper').scroll({
                    indicators: false
                });
                console.log("1")
            }
        },
    });
    slideNavTabs.controller.control = slideContent;
    slideContent.controller.control = slideNavTabs;
}

/**
 * 加载红包浮动图
 */
function loadFloatPic() {
    var showEffect = getCookie("showEffect");
    //如果用户已经设置了隐藏红包，不展示红包浮动图
    if (showEffect == 'true' || showEffect == true) {
        return;
    }
    var options = {
        url: root + "/index/floatPic.html",
        dataType: 'html',
        success: function (data) {
            $("body").append(data);
            //判断浮动图是否隐藏
            hideEffect();
        }
    };
    muiAjax(options);
}