/*界面初始化*/
var lazyLoadApi;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.swiper-slide .mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    //初始化swiper
    initSwiper();
});

function initSwiper() {
    var siledSize = $(".swiper-container a.swiper-slide").length;
    var slideContent = new Swiper('.p-t-slide-content', {
        loop: true,
        loopedSlides: siledSize,
        autoHeight: false,
        on: {
            slideChange: function () {
            }
        }
    });
    var slideIndicators = new Swiper('.p-t-slide-indicators', {
        loop: true,
        loopedSlides: siledSize,
        slidesPerView: '4',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        on: {
            slideChangeTransitionEnd: function () {
                //处理图片延迟加载
                if ($(".swiper-container .swiper-slide-active").find("img[data-lazyload]").length > 0 || $(".nav-slide-content .swiper-slide-active").find("img[data-lazyload-id]").length > 0) {
                    if (!lazyLoadApi) {
                        var defaultSaleImg = $("input[name=defaultSaleImg]").val();
                        lazyLoadApi = lazyLoadImg("body", defaultSaleImg);
                    }
                    lazyLoadApi.refresh(true);
                }
            }
        }
    });
    slideContent.controller.control = slideIndicators;
    slideIndicators.controller.control = slideContent;
}


/*点击活动类型*/
function activityType(obj, options) {
    var type = options.activityType;
    $(".promo-sorts a").removeClass("active");
    $(obj).addClass("active");
    $(obj).unlock();
    if (!type) {
        $('ul li').show();
    } else {
        $('ul li').hide();
        $('li.' + type + '').show();
    }
}