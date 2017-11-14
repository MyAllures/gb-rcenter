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
}