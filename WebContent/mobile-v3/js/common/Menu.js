$(function () {
    //app不展示跳转电脑版
    if (os == 'app_ios' || os == 'app_android') {
        $(".side-nav .mui-list-unstyled .pc").remove();
        $(".download").hide();
    }
    //h5展示底部菜单
    showFooter();
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

function changeLanguage(obj,options){
    mui(".mui-off-canvas-left").offCanvas('close');
    var language = options.lang;
    if(language != null && language.length > 0){
        var index = language.indexOf('-');
        var lang = language.substring(0,index);
        var country = language.substring(index+1,language.length);
        var options = {
            url:root+'/index/language/change.html',
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

/* 关闭侧滑菜单隐藏语言弹窗 */
$('.mui-off-canvas-wrap').on('hidden', function (event) {
    $(".lang-menu").hide();
});

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

    if (os == 'app_ios') {
        gotoTab(skip);
    } else if (os == 'app_android') {
        window.gamebox.gotoFragment(skip);
    } else {
        if (skip == 3) {
            loadCustomer(obj, options);
        } else {
            goToUrl(dataHref);
        }
    }
}

/**
 * 跳转到页面同时关闭左侧菜单
 * @param obj
 * @param options
 */
function goUrl(obj,options){
    var dataHref = root + options.dataHref;
    var isLeft  = options.isLeft;
    if(isLeft == "true"){
        mui(".mui-off-canvas-left").offCanvas('close');
    }
    goToUrl(dataHref);
}

function showFooter() {
    if (os != 'app_ios' && os != 'app_android') {
        $("footer.footerMenu").removeClass('mui-hidden');
    }
}
