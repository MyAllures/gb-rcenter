/*mui 初始化配置选项*/
var muiDefaultOptions = {
    /*主页面滚动指定容器，可自行指定范围*/
    containerScroll: '.mui-content.mui-scroll-wrapper',
    /*左侧菜单上下滚动，可自行指定范围*/
    leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
    /*右侧菜单上下滚动，可自行指定范围*/
    rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
    /*禁用侧滑手势指定样式*/
    disabledHandSlip: ['mui-off-canvas-left']
};
/**
 * mui初始化
 */
function muiInit(options) {
    mui.init();
    if (!options) {
        var options = {};
    }
    //主页面内容上下滚动
    if (options.containerScroll) {
        muiScrollY(settings.containerScroll);
    }
    /*左侧菜单上下滚动*/
    if (options.leftMenuScroll) {
        muiScrollY(settings.leftMenuScroll);
    }
    /*右侧菜单上下滚动*/
    if (options.rightMenuScroll) {
        muiScrollY(settings.rightMenuScroll);
    }

    //禁用侧滑手势
    if (options.disabledClass) {
        var disableClass = options.disabledClass;
        for (var i = 0; i < disableClass; i++) {
            if (document.querySelector(disableClass[i])) {
                document.querySelector(disableClass[i]).addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
        }
    }
    //默认处理mui ajax错误
    muiAjaxError();
}

/**
 * 默认纵向滚动配置
 * @param obj
 */
function muiScrollY(obj, options) {
    if (!options) {
        options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: false //是否启用回弹
        };
    }
    mui(obj).scroll(options)
}
/**
 * 默认横向滚动配置
 * @param obj
 */
function muiScrollX(obj, options) {
    if (!options) {
        options = {
            scrollY: false, //是否竖向滚动
            scrollX: true, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: false //是否启用回弹
        };
    }
    mui(obj).scroll(options)
}

/**
 * mui ajax请求失败统一处理
 */
function muiAjaxError() {
    mui.ajaxSettings.error = function (error, type, xhr, settings) {
        var status = error.getResponseHeader("headerStatus") || error.status;
        if (status == 600) {//Session过期 跳转登录页面
            window.top.location.href = window.top.root + "/login/commonLogin.html";
        } else if (status == 606) {// 踢出
            gotoUrl(root + "/errors/" + status + ".html");
        } else if (status == 608) {
            mui.toast(window.top.message.common["repeat.request.error"]);
        } else if (status >= 0 && settings.comet != true) { //606、403、404、605等状态码跳转页面
            window.top.location.href = window.top.root + "/errors/" + status + ".html";
        } else if (!settings.error && status != 200 && status != 0) {
            if (settings.comet == true) {
                mui.toast(window.top.message.common["online.message.error"]);
            } else {
                mui.toast(error.responseText);
            }
        } else {
            console.log(error);
        }
    }
}

/**
 * 封装 mui.ajax ajax请求方法
 *  options {url:请求地址　lading:是否加载中 data:请求参数}
 * @param options
 */
function muiAjax(options) {
    if (!options) {
        return;
    }
    var url = options.url;
    if (!url) {
        return;
    }
    //是否出现加载中样式
    if (options.loading) {
        showLoading();
        var complete = options.complete;
        options.complete = function () {
            hideLoading();
            complete();
        }
    }
    //ajax请求基本配置
    var settings = {
        data: options.data,
        dataType: options.dataType || 'json',
        type: options.type || 'POST',
        success: options.success,
        error: options.error,
        complete: options.complete,
        beforeSend: options.beforeSend
    };
    mui.ajax(options.url, settings);
}

/**
 * 请求加载loading
 */
function showLoading() {

}

/**
 * 判断终端
 * @returns {*}
 */
function whatOs() {
    var ua = navigator.userAgent;
    if (/(app_ios)/i.test(ua)) {
        return 'app_ios';
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        return 'ios';
    } else if (/(app_android)/i.test(ua)) {
        return 'app_android';
    } else if (/(android)/i.test(ua)) {
        return 'android';
    } else {
        return 'pc';
    }
}

/**
 * 关闭加载loading
 */
function hideLoading() {

}

/**
 * 统一请求跳转页面
 * @param url
 */
function goToUrl(url) {
    //终端标识，以判断ｕrl走什么入口
    var os = whatOs();
    if (url.indexOf("?") < 0) {
        url = url + "?v=" + rcVersion;
    } else {
        url = url + "&v=" + rcVersion;
    }
    mui.openWindow({
        url: url,
        id: url,
        extras: {},
        createNew: false,
        show: {autoShow: true},
        waiting: {
            autoShow: true,
            title: '正在加载...',
            loading: showLoading,
            close: hideLoading
        }
    })
}

/**
 * 封装绑定button/a标签事件
 */
function bindButtonEvent() {
    /**
     * 绑定使用button.tag标签
     */
    mui("body").on("tap", "[data-rel]", function (e) {
        var options = eval("(" + $(this).data('rel') + ")");
        var opType = options.opType;
        if (opType == 'function') {
            doFunction(this, options);
        } else if (opType == 'dialog') {

        }
    });
}

/**
 * 封装事件执行function
 * @param obj
 * @param options
 */
function doFunction(obj, options) {
    var $target = $(obj);
    var isLocked = $target.isLocked();
    if (isLocked) {
        console.log("事件标签已被锁定");
        return;
    }
    $target.lock();
    var func = options.target;
    if (func && typeof func == 'function') {
        func.apply(this, [this, options]);
    } else {
        console.log(func + "方法找不到！");
    }
}
/**
 * 封装事件执行弹窗
 */
function doDialog() {

}

function toast() {
    var os = whatOs();
}