/**
 * Created by legend on 18-3-2.
 */
var lazyLoadApi;

$(function(){

    var siledSize = $(".swiper-container div.swiper-slide").length;
    console.log(siledSize);
    // api滑动
    var slideContent = new Swiper('.g-t-slide-content', {
        loop:true,
        loopedSlides:18,
        slidesPerView: 'auto',
        autoHeight: true,
        on:{
            slideChange:function(){
            }
        }
    });
    var slideIndicators = new Swiper('.g-t-slide-indicators', {
        loop:true,
        loopedSlides: 18,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        on:{
            slideChangeTransitionEnd: function () {
                //处理图片延迟加载
                if ($(".swiper-slide-active").find("img[data-lazyload]").length > 0 || $(".nav-slide-content .swiper-slide-active").find("img[data-lazyload-id]").length > 0) {
                    if (!lazyLoadApi) {
                        lazyLoadApi = lazyLoadImg("body");
                    }
                    lazyLoadApi.refresh(true);
                }

            }
        }
    });
    slideContent.controller.control = slideIndicators;
    slideIndicators.controller.control = slideContent;


    if(!lazyLoadApi) {
        //图片懒加载
        lazyLoadApi = lazyLoadImg("body");
    }
});
