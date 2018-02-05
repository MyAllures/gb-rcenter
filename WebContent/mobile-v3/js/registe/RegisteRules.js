/**
 * Created by legend on 18-2-5.
 */
$(function(){

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



/*
mui.init({
    swipeBack: true //启用右滑关闭功能
});
mui('.fund-type-scroll').scroll();
mui('body').on('shown', '.mui-popover', function(e) {
    //console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
    //console.log('hidden', e.detail.id);//detail为当前popover元素
});*/
