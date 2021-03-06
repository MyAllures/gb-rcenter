/*界面初始化*/
var lazyLoadApi;
var scrollMap = new Array();
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        //containerScroll: '.swiper-slide .mui-scroll-wrapper',
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
            slideChangeTransitionEnd: function (swiper) {
                var slides = $(".p-t-slide-content .swiper-slide");
                for (var i = 0; i < slides.length; i++) {
                    var $slide = $(slides[i]);
                    if($slide.hasClass("swiper-slide-active")) {
                        var scroll = scrollMap[i];
                        if (!scroll) {
                            muiScrollY(mui(".p-t-slide-content .swiper-slide-active .mui-scroll-wrapper"));
                            scrollMap[i] = 'true';
                            break;
                        }
                    }
                }
            }
        }
    });
    var slidesPerView = siledSize >= 4 ? '4' : siledSize;
    var slideIndicators = new Swiper('.p-t-slide-indicators', {
        loop: true,
        loopedSlides: siledSize,
        slidesPerView: slidesPerView,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        on: {
            slideChangeTransitionEnd: function () {
                //处理图片延迟加载
                if ($(".swiper-container .swiper-slide-active").find("img[data-lazyload]").length > 0 || $(".nav-slide-content .swiper-slide-active").find("img[data-lazyload-id]").length > 0) {
                    var defaultSaleImg = $("input[name=defaultSaleImg]").val();
                    if (!lazyLoadApi) {
                        lazyLoadApi = lazyLoadImg("body", defaultSaleImg);
                    }
                    lazyLoadApi.refresh(true);
                }
                mui(".p-t-slide-content .swiper-slide-active .mui-scroll-wrapper").scroll().scrollTo(0, 0);
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