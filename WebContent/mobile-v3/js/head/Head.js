/*跳转到下载页面*/
$(".mui-bar-nav").on("tap", ".btn-download", function () {
    var url = root + "/downLoad/downLoad.html";
    goToUrl(url);
});

/*跳转到ios下载界面*/
$(".btn-wrap").on("tap", ".btn-download.ios", function () {
    var url = root + "/downLoad/downLoadIOS.html";
    goToUrl(url);
});

muiScrollY(".download-content-ios");

/*安卓下载*/
$(".btn-wrap").on("tap", ".btn-download.android", function () {
    var url = $(".btn-download.android").attr("data-value");
    goToUrl(url);
});

/*ios下载*/
$(".download-content-ios").on("tap", ".btn-install", function () {
    var url = $(".btn-install").attr("data-value");
    goToUrl(url);
});

/*左菜单进入下载界面*/
$(".side-nav").on("tap", ".downLoad", function () {
    var url = root + "/downLoad/downLoad.html";
    goToUrl(url);
});