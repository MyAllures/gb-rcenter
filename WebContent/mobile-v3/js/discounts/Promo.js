/*界面初始化*/
$(function () {
    $(function(){

        /*侧滑菜单脚本*/
        $(".index-canvas-wrap").on("tap",".mui-icon-closeempty",function(e){
            //e.preventDefault();
            $("html").removeClass("index-canvas-show");
        });
        $(".index-canvas-wrap").on("tap",function(e){// 点击侧边空白隐藏侧边栏
            if(!$(e.detail.target).parents(".mui-off-canvas-left")[0]){
                $("html").removeClass("index-canvas-show");
            }
        });
        // api滑动
        var slideContent = new Swiper('.p-t-slide-content', {
            loop:true,
            loopedSlides:5,
            autoHeight: false,
            on:{
                slideChange:function(){
                }
            }
        });
        var slideIndicators = new Swiper('.p-t-slide-indicators', {
            loop:true,
            loopedSlides: 5,
            slidesPerView: '4',
            touchRatio: 0.2,
            slideToClickedSlide: true,
        });
        slideContent.controller.control = slideIndicators;
        slideIndicators.controller.control = slideContent;
    });
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
});

/*点击活动类型*/
function activityType(obj, options) {
    var type =options.activityType;
    $(".promo-sorts a").removeClass("active");
    $(obj).addClass("active");
    $(obj).unlock();
    if(!type){
        $('ul li').show();
    }else{
        $('ul li').hide();
        $('li.'+type+'').show();
    }

}