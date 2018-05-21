/**
 * Created by legend on 18-3-2.
 */
var lazyLoadApi;
var alloyT = null;
$(function () {
    pullApiScroll();
    initApiSwiper();
    if (!lazyLoadApi) {
        //图片懒加载
        lazyLoadApi = lazyLoadImg("body");
    }
    lazyLoadApi.refresh(true);
});

function initApiSwiper() {
    //	  api滚动区域:
    var swiper = new Swiper('.api-scroll', {
        slidesPerView: 5,
        spaceBetween: 0,
        loop: true,
        //    slideToClickedSlide: true,
        watchSlidesProgress: true,
        on: {
            slideChangeTransitionEnd: function() {
                $('.swiper-slide-next').next('.swiper-slide').addClass('api-index').siblings().removeClass('api-index');
            }
        }
    });
    var siledSize = $(".g-t-slide-indicators div.swiper-slide").length;
    if (siledSize > 1) {
        // api滑动
        var slideContent = new Swiper('.g-t-slide-content', {
            loop: true,
            loopedSlides: 5,
            autoHeight: true,
            on: {
                slideChangeTransitionEnd: function() {
                    resizeSlideHeight();
                }
            }
        });
        var slideIndicators = new Swiper('.g-t-slide-indicators', {
            loop: true,
            loopedSlides: 5,
            slidesPerView: 'auto',
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
    } else {
        resizeSlideHeight();
    }
}

//下拉显示顶部api滚动区域.
function pullApiScroll() {
    var scroller = document.querySelector("#apiScroll-cont"),
        wrapper = document.querySelector("#apiScroll-wrap"),
        pull_refresh = document.querySelector("#pull_apiScroll"),
        index = 0;

    Transform(pull_refresh, true);
    Transform(scroller, true);
    var min_h = $('#apiScroll-cont').height() > $('.casino-game-type').height() ? $('#apiScroll-cont').height() : $('.casino-game-type').height();
    alloyT = new AlloyTouch({
        touch: "#apiScroll-wrap", //反馈触摸的dom
        vertical: true, //不必需，默认是true代表监听竖直方向touch
        target: scroller, //运动的对象
        property: "translateY", //被滚动的属性
        sensitivity: 1, //不必需,触摸区域的灵敏度，默认值为1，可以为负数
        factor: 1, //不必需,默认值是1代表touch区域的1px的对应target.y的1
        min: window.innerHeight - 44 - min_h, //不必需,滚动属性的最小值
        max: 0, //不必需,滚动属性的最大值
        change: function(value) {
            if(value < 105) {
                pull_refresh.translateY = value;
                // scroller.translateY = value;
            } else {
                pull_refresh.translateY = 105;
                // scroller.translateY = 70;
            }

        },
        touchMove: function(evt, value) {
            $('.electronic-search').hide();
        },
        touchEnd: function(evt, value) {
            if(value >= 105) {
                this.to(105);
                return false;
            }
        }
    })
}

/**
 * 滑动后重设高度
 */
function resizeSlideHeight() {
    var $slide = $('.g-t-slide-content .swiper-slide.swiper-slide-active');
    if($slide.length == 0) {
        $slide = $('.g-t-slide-content .swiper-slide');
    }
    $('.g-t-slide-content').height($slide.height());// 左右滑动内容区域时，动态设定swiper的高度
    var min_h = $('#apiScroll-cont').height() > $('.casino-game-type').height() ? $('#apiScroll-cont').height() : $('.casino-game-type').height(); // 滑动内容区域的高度
    alloyT.min = window.innerHeight - 44 - min_h;
}

/**
 * 显示或隐藏搜索框
 */
function toggleSearch() {
    $("div[name=searchDiv]").toggle();
}

/**
 * 名称搜索
 */
function searchGame(){
    var name = $("input[name=gameName]").val();
    if(!name || name == '') {
        $("div[name=game]").show();
    } else {
        $("div[name=game]").each(function(){
            var gameName = $(this).attr("gameName");
            if(gameName){
                if(gameName.indexOf(name) != -1){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            }
        });
    }
}

/**
 * 列表展示
 */
function listDisplay() {
    $(' .casino-wrap .mui-row .mui-col-xs-12').addClass('mui-col-xs-4').removeClass('mui-col-xs-12 item');
    resizeSlideHeight();
}

/**
 * 图标展示
 */
function iconDisplay() {
    $(' .casino-wrap .mui-row .mui-col-xs-4').addClass('mui-col-xs-12 item').removeClass('mui-col-xs-4');
    resizeSlideHeight();
}