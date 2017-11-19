$(function () {
    muiInit(muiDefaultOptions);
    initBanner();
});

function initBanner() {
    mui('.mui-banner').slider({
        interval: 3000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
    });

    //关闭轮播图
    mui('.gb-banner').on('tap', '.mui-icon', function () {
        $('.gb-banner').slideUp();
        return false;
    });
}