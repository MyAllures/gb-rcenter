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

/**
 * 判断手机端的下载界面和到pc端隐藏
 */
if(os == "app_ios" || os == "app_android"){
    $(".download").hide();
    $(".pc").hide();
}

/**
 * 返回下标链接
 */
function goTab(obj,options){
    var skip = options.skip;
    var dataHref = root + options.dataHref;
    if(os == 'app_ios'){
        gotoTab(skip);
    }else if(os == 'app_android'){
        window.gamebox.gotoTab(skip);
    }else{
        goToUrl(dataHref);
    }
    mui(".mui-off-canvas-left").offCanvas('close');
}
