/**
 * Created by legend on 18-3-2.
 */
var lazyLoadApi;
var alloyT = null;
$(function () {
    pullApiScroll();
    initApiSwiper();
    //屏蔽部浏览器下拉刷新
    disableSysScroll();
    if (!lazyLoadApi) {
        //图片懒加载
        lazyLoadApi = lazyLoadImg("body");
    }
    lazyLoadApi.refresh(true);
});

function disableSysScroll() {
    overscroll(document.querySelector('.mui-inner-wrap'));
    document.body.addEventListener('touchmove', function(evt) {
        //In this case, the default behavior is scrolling the body, which
        //would result in an overflow.  Since we don't want that, we preventDefault.
        if(!evt._isScroller) {
            evt.preventDefault();
        }
    });
}

/**
 * 屏蔽部浏览器下拉刷新
 **/
function overscroll(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop
            , totalScroll = el.scrollHeight
            , currentScroll = top + el.offsetHeight;
        //If we're at the top or the bottom of the containers
        //scroll, push up or down one pixel.
        //
        //this prevents the scroll from "passing through" to
        //the body.
        if(top === 0) {
            el.scrollTop = 1;
        } else if(currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });
    el.addEventListener('touchmove', function(evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if(el.offsetHeight < el.scrollHeight)
            evt._isScroller = true;
    });
}

function refreshLoadImg() {
    var $slide = $(".swiper-slide-active");
    if ($slide.length == 0) {
        $slide = $('.g-t-slide-content .swiper-slide');
    }
    var $gtSlide = $(".g-t-slide-content .swiper-slide-active");
    if ($gtSlide.length == 0) {
        $gtSlide = $('.g-t-slide-content .swiper-slide');
    }
    if ($slide.find("img[data-lazyload]").length > 0 || $gtSlide.find("img[data-lazyload-id]").length > 0) {
        if (!lazyLoadApi) {
            lazyLoadApi = lazyLoadImg("body");
        }
        lazyLoadApi.refresh(true);
    }
}

function initApiSwiper() {
    //	  api滚动区域:
    var swiper = new Swiper('.api-scroll', {
        slidesPerView: 5,
        spaceBetween: 0,
        loop: false,
        watchSlidesProgress: true
    });

    var siledSize = $(".g-t-slide-indicators div.swiper-slide").length;
    if (siledSize > 1) {
        // api滑动
        var slideContent = new Swiper('.g-t-slide-content', {
            loop: true,
            loopedSlides: siledSize,
            autoHeight: true
        });
        var slideIndicators = new Swiper('.g-t-slide-indicators', {
            loop: true,
            loopedSlides: siledSize,
            slidesPerView: siledSize,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            on: {
                slideChangeTransitionEnd: function () {
                    resizeSlideHeight();
                    scrollToTop();
                    //处理图片延迟加载
                    window.setTimeout(function () {
                        refreshLoadImg();
                    }, 600);
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
        change: function (value) {
            if (value < 105) {
                pull_refresh.translateY = window.innerHeight - 44 - min_h;
            } else {
                pull_refresh.translateY = 105;
            }
        },
        touchMove: function (evt, value) {
            $('.electronic-search').hide();
        },
        touchEnd: function (evt, value) {
            window.setTimeout(function () {
                refreshLoadImg();
            }, 500);
            if (value >= 105) {
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
    var $slide = $('.g-t-slide-content .swiper-slide.swiper-slide-active .mui-row');
    if ($slide.length == 0) {
        $slide = $('.g-t-slide-content .swiper-slide .mui-row');
    }
    $('.g-t-slide-content').height($slide.height());// 左右滑动内容区域时，动态设定swiper的高度
    var min_h = $('#apiScroll-cont').height() > $('.casino-game-type').height() ? $('#apiScroll-cont').height() : $('.casino-game-type').height(); // 滑动内容区域的高度
    alloyT.min = window.innerHeight - 44 - min_h;
}

/**
 * 显示或隐藏搜索框
 */
function toggleSearch() {
    if ($("div[name=searchDiv]").is(":hidden")) {
        $("div[name=searchDiv]").show();
        $('.search-shadow').show();
    } else {
        $("div[name=searchDiv]").hide();
        $('.search-shadow').hide();
    }
}

/**
 * 隐藏遮罩层
 */
function hideShadow() {
    $('.search-shadow').hide();
    $("div[name=searchDiv]").hide();
}

/**
 * 名称搜索
 */
function searchGame() {
    var name = $("input[name=gameName]").val();
    if (!name || name == '') {
        $("div[name=game]").show();
    } else {
        $("div[name=game]").each(function () {
            var gameName = $(this).attr("gameName");
            if (gameName) {
                if (gameName.indexOf(name) != -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            }
        });
    }
    resizeSlideHeight();
    scrollToTop();
    //处理图片延迟加载
    refreshLoadImg();
    hideShadow();
}

function scrollToTop() {
    if($("#pull_apiScroll").offset().top<0) {
        alloyT.to(0);
    } else {
        alloyT.to(105);
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