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
        goToUrl(url, true);
        $(obj).unlock();
    }
}

/**
 * 下载客户端
 * @param obj
 * @param options
 */
function downLoadApp(obj, options) {
    //是否要先登录再跳转登录页面
    var ajaxOption = {
        url: root + '/downLoad/downLoadShowQrcode.html',
        success: function (data) {
            var targetUrl = root + "/downLoad/downLoad.html";
            if (data.showQrCode == true && data.isLogin != true) {
                toast("请登入下载");
                window.setTimeout(function () {
                    login(targetUrl);
                }, 1500);
            } else {
                goToUrl(targetUrl);
            }
        }
    };
    muiAjax(ajaxOption);
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

function changeLanguage(obj, options) {
    mui(".mui-off-canvas-left").offCanvas('close');
    var language = options.lang;
    if (language != null && language.length > 0) {
        var index = language.indexOf('-');
        var lang = language.substring(0, index);
        var country = language.substring(index + 1, language.length);
        var options = {
            url: root + '/index/language/change.html',
            dataType: 'json',
            cache: false,
            data: {'lang': lang, 'country': country},
            type: "get",
            success: function (data) {
                location.reload();
            }
        };
        muiAjax(options);
    }
}

/**
 * 跳转到电脑端
 * */
function goPC() {
    mui(".mui-off-canvas-left").offCanvas('close');
    setCookie('ACCESS_TERMINAL', 'pc', 0);
    window.location.replace(root + '/');
}

/**
 * 返回下标链接
 */
function goTab(obj, options) {
    var skip = options.skip;
    var dataHref = root + options.dataHref;
    var isLeft = options.isLeft;
    //左侧进入隐藏左侧，其他地方不用隐藏
    if (isLeft == "true") {
        mui(".mui-off-canvas-left").offCanvas('close');
    }
    goToUrl(dataHref);
}
