/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper'
    };
    muiInit(options);
});
function download(obj, options) {
    var url = options.url;
    if (!url) {
        toast("暂无设置下载地址，请联系客服！");
        return;
    }
    //谷歌浏览器不支持新开跳转打开下载
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('chrome') !== -1) {
        goToUrl(url);
        return;
    }
    var win = window.open(url);
    if (!win) {
        window.location.href = url;
    }
}
