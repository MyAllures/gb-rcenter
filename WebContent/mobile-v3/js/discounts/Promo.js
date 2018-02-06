/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
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