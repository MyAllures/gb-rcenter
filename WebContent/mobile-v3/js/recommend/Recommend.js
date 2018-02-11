/**
 * Created by legend on 18-2-11.
 */
$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper.invite-content',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    copyUrl();
});


function copyUrl() {
    var clipboard = new Clipboard('#copyCode');
    clipboard.on('success',function (e) {
        _this.toast(window.top.message.deposit_auto['复制成功']);
    });

    clipboard.on('error', function(e) {
        _this.toast("复制按钮不可用，请长按文字手动复制信息");
    });
    
}