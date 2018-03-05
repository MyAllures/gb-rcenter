/**
 * Created by legend on 18-3-2.
 */
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
            slideChangeTransitionEnd:{

            }
        }
    });
    slideContent.controller.control = slideIndicators;
    slideIndicators.controller.control = slideContent;
});
