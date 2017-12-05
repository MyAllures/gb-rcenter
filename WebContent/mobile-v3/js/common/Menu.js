$(function () {
    //app不展示跳转电脑版
    if(os == 'app_ios' || os == 'app_android') {
        $(".side-nav .mui-list-unstyled .pc").remove();
    }
});
/**
 * 跳转至客服
 * @param obj
 * @param options
 */
function loadCustomer(obj, options) {
    var url = options.url;
    if (!url) {
        var ajaxOpt = {
            url: root + '/index/getCustomerService.html',
            dataType: 'text',
            success: function (data) {
                options.url = data;
                $(obj).data('rel', JSON.stringify(options));
                goToUrl(data);
                $(obj).unlock();
            }
        };
        muiAjax(ajaxOpt);
    } else {
        goToUrl(url);
        $(obj).unlock();
    }
}
/**
 * 切换语言
 * @param obj
 * @param options
 */
function lang(obj, options) {
    $(obj).parent().addClass("active");
    $(".lang-menu").toggle();
    $(obj).unlock();
}
/* 关闭侧滑菜单隐藏语言弹窗 */
$('.mui-off-canvas-wrap').on('hidden',function (event) {
    $(".lang-menu").hide();
});

/**
 * 跳转到电脑端
 * */
function goPC(){
    document.cookie = "ACCESS_TERMINAL=pc;expires=0";
    window.location.replace(root + '/');
}