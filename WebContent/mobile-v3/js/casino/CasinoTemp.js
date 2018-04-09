/**
 * Created by legend on 18-3-2.
 */
var lazyLoadApi;

$(function () {

    var siledSize = $(".g-t-slide-indicators div.swiper-slide").length;
    if (siledSize > 1) {
        // api滑动
        var slideContent = new Swiper('.g-t-slide-content', {
            loop: true,
            loopedSlides: siledSize,
            autoHeight: true,
            on: {
                slideChange: function () {
                }
            }
        });
        var slideIndicators = new Swiper('.g-t-slide-indicators', {
            loop: true,
            loopedSlides: siledSize,
            slidesPerView: siledSize,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            on: {
                slideChangeTransitionEnd: function () {
                    //处理图片延迟加载
                    if ($(".swiper-slide-active").find("img[data-lazyload]").length > 0 || $(".g-t-slide-content .swiper-slide-active").find("img[data-lazyload-id]").length > 0) {
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

    if (!lazyLoadApi) {
        //图片懒加载
        lazyLoadApi = lazyLoadImg("body");
    }
    lazyLoadApi.refresh(true);
});

/**
 * 滑动后重设高度
 */
function resizeSlideHeight() {
    var targetSlide = $(".g-t-slide-content .swiper-slide-active");
    setTimeout(function () {// 滑动循环最后一个有延迟，设个定时器抵消延迟的效果
        $(".g-t-slide-content>.swiper-wrapper").css({height: $(targetSlide).outerHeight()});
    }, 100);
}