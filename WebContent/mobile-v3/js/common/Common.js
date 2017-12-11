/**终端标志*/
var os = whatOs();
/*mui 初始化配置选项*/
var muiDefaultOptions = {
    /*主页面滚动指定容器，可自行指定范围*/
    containerScroll: '.mui-content.mui-scroll-wrapper',
    /*左侧菜单上下滚动，可自行指定范围*/
    leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
    /*右侧菜单上下滚动，可自行指定范围*/
    rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
    /*禁用侧滑手势指定样式*/
    disabledHandSlip: ['.mui-off-canvas-left'],
    /*支持横向滚动样式*/
    horizontalScroll: ['']
};
/**
 * mui 向下拉默认参数配置
 * @param container
 * @param callback
 * @param auto
 * @returns {{pullRefresh: {container: *, up: {auto: *, contentrefresh: string, callback: *}}}}
 */
function pullUpRefreshOption(container, callback, auto) {
    if (!auto) {
        auto = false;
    }
    var pullUpRefresh = {
        pullRefresh: {
            container: container,
            up: {
                height: 100,//可选.默认50.触发上拉加载拖动距离
                auto: auto,
                contentdown: window.top.message.promo_auto['上拉加载'],
                contentrefresh: '正在加载...',
                contentnomore: '已经到底了',
                callback: callback
            }
        }
    };
    return pullUpRefresh;
}

/**
 * mui初始化
 */
function muiInit(options) {
    if (!options) {
        var options = {};
    }
    if (options.init) {
        mui.init(options.init);
    } else {
        mui.init();
    }
    //主页面内容上下滚动
    if (options.containerScroll) {
        muiScrollY(options.containerScroll);
    }
    /*左侧菜单上下滚动*/
    if (options.leftMenuScroll) {
        muiScrollY(options.leftMenuScroll);
    }
    /*右侧菜单上下滚动*/
    if (options.rightMenuScroll) {
        muiScrollY(options.rightMenuScroll);
    }
    //支持横向滚动
    if (options.horizontalScroll) {
        var horizontalScroll = options.horizontalScroll;
        for (var i = 0; i < horizontalScroll.length; i++) {
            if (horizontalScroll[i]) {
                muiScrollX(horizontalScroll[i]);
            }
        }
    }
    //禁用侧滑手势
    if (options.disabledClass) {
        var disableClass = options.disabledClass;
        for (var i = 0; i < disableClass.length; i++) {
            if (document.querySelector(disableClass[i])) {
                document.querySelector(disableClass[i]).addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
        }
    }

    //默认处理mui ajax错误
    muiAjaxError();
    //绑定事件
    bindButtonEvent();
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
            toast(window.top.message.common["repeat.request.error"]);
        } else if (status >= 0 && settings && settings.comet != true) { //606、403、404、605等状态码跳转页面
            window.top.location.href = window.top.root + "/errors/" + status + ".html";
        } else if (settings && !settings.error && status != 200 && status != 0) {
            if (settings.comet == true) {
                toast(window.top.message.common["online.message.error"]);
            } else {
                toast(error.responseText);
            }
        } else {
            console.log(error.context);
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
    if (url.indexOf("?") > 0) {
        url = url + '&t=' + random;
    } else {
        url = url + '?t=' + random;
    }
    //是否出现加载中样式
    if (options.loading == true) {
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
        headers: options.headers,
        timeout: options.timeout,
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
    var loading = '<div class="loading-wrap"><span class="loading-img loading-entirety"><img src="' + resRoot + '/images/oval.svg"></span></div>';
    $("body").append(loading);
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
    if ($(".loading-wrap").length > 0) {
        $(".loading-wrap").remove();
    }
}

/**
 * 统一请求跳转页面
 * @param url
 *
 */
function goToUrl(url) {
    if (url.indexOf("?") < 0) {
        url = url + "?v=" + rcVersion;
    } else {
        url = url + "&v=" + rcVersion;
    }
    //登录页面
    if (url.indexOf("commonLogin.html") > 0) {
        login(url);
        return;
    }
    //todo::终端标识，以判断ｕrl走什么入口
    if (os == 'app_ios') {
        gotoCustom(url);
    } else if (os == 'app_android') {
        window.gamebox.gotoActivity(url);
    } else {
        openWindow(url);
    }
}

function openWindow(url) {
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
    });
}

/**
 * 封装绑定button/a标签事件
 * selector 支持动态内容再次绑定事件
 * 由于mui.on对动态增加的元素不能自动绑定事件，动态元素需要重新绑定事件
 */
function bindButtonEvent(selector) {
    /**
     * 绑定使用button.tag标签
     */
    selector = selector || "body";
    mui(selector).on("tap", "[data-rel]", function (e) {
        var $target = $(this);
        var isLocked = $target.isLocked();
        if (isLocked) {
            console.log("事件标签已被锁定");
            return;
        }
        $target.lock();
        var options = eval("(" + $(this).attr('data-rel') + ")");
        var confirm = options.confirm;
        if (confirm) {
            options.func = doEvent(this, options);
            showConfirmMsg(options, this);
        } else {
            doEvent(this, options);
        }

    });
}

function doEvent(obj, options) {
    var precall = options.precall;
    var $target = $(obj);
    //前置函数执行
    if (precall && !applyFunction(precall, options)) {
        $target.unlock();
        return false;
    }
    var opType = options.opType;
    if (opType == 'function') {
        doFunction(obj, options);
    } else if (opType == 'ajax') {
        doAjax(obj, options);
    } else if (opType == 'href') {
        goToUrl(options.target);
        $target.unlock();
    }
}

/**
 * 封装事件执行function
 * @param obj
 * @param options
 */
function doFunction(obj, options) {
    var func = this[options.target];
    var returnVal = applyFunction(func, options, obj);
    $(obj).unlock();
    return returnVal;
}

/**
 * 实现执行function方法
 * @param func 方法名或者function
 * @param options 方法参数
 * @param obj 对象操作
 * @returns {*}
 */
function applyFunction(func, options, obj) {
    if (!obj) {
        obj = this;
    }
    if (func && typeof func == 'function') {
        var rs = func.apply(this, [obj, options]);
        return rs;
    } else if (func && typeof func == 'string' && this[func] && typeof this[func] == 'function') {
        func = this[func];
        var rs = func.apply(this, [obj, options]);
        return rs;
    } else {
        console.log(func + "方法找不到！");
    }
}

/**
 * 封装事件执行ajax
 */
function doAjax(obj, options) {
    var ajaxOption = {
        url: options.target,
        loading: options.loading || false,
        success: function (data) {
            if (data.msg) {
                toast(data.msg);
            }
            options.data = data;
            var func = options.callback;
            if (func) {
                applyFunction(func, options, obj);
            }
            $(obj).unlock();
        },
        error: function () {
            $(obj).unlock();
        }
    };
    //ajax请求参数
    var post = options.post;
    if (post) {
        ajaxOption.data = applyFunction(post, options, obj);
    }
    muiAjax(ajaxOption);
}
/**
 * 消息提示
 *
 * @param msg
 */
function toast(msg) {
    var os = whatOs();
    if (os == 'app_android') {
        window.gamebox.toast(msg);
    } else {
        mui.toast(msg);
    }
}

/**
 * 确认弹窗
 * @param options {btnArray:按钮组合,confirm:确认提示信息,func:确认信息后调用方法}
 * @param obj　target对象
 */
function showConfirmMsg(options, obj) {
    var btnArray = options.btnArray || ['是', '否'];
    mui.confirm(options.confirm, options.title, btnArray, function (e) {
        if (e.index == 0) {
            var func = options.func;
            if (func) {
                applyFunction(func, options, obj);
            }
        }
    })
}

/**
 * 警告消息提示弹窗
 * @param title 标题
 * @param msg 提示信息
 * @param callback 回调函数
 */
function showWarningMsg(title, msg, callback) {
    mui.alert(msg, title, function () {
        if (callback) {
            applyFunction(callback);
        }
    });
}

/**
 * 统一登录入口
 * @param url
 */
function login(url) {
    if (os == 'app_ios') {
        gotoCustom("/login/commonLogin.html");
    } else if (os == 'app_android') {
        window.gamebox.gotoLogin(url);
    } else {
        url = '/login/commonLogin.html?v=' + rcVersion;
        openWindow(url);
    }
}

/**
 * 统一退出登录入口
 */
function logout(e, options) {
    sessionStorage.is_login = false;
    isLogin = false;
    sessionStorage.setItem("isLogin", isLogin);
    if (os == 'app_ios') {
        var ajaxOption = {
            url: root + "/passport/logout.html",
            headers: {
                "Soul-Requested-With": "XMLHttpRequest"
            },
            success: function (data) {
                if (data) {
                    loginOut();
                }
            }
        };
        muiAjax(ajaxOption);
    } else if (os == 'app_android') {
        window.gamebox.logout();
    } else
        goToUrl("/passport/logout.html");
}

/**
 * 返回上一页
 * @param e
 * @param option
 */
function goToLastPage(e, option) {
    if (os == 'app_ios') {
        goBack();
    } else if (os == 'app_android') {
        window.history.go(-1);
    } else {
        mui.back();
    }
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param time
 */
function setCookie(name, value, time) {
    if(value == null) {
        document.cookie = name + "=" + escape(value) + ";expires=-1";
    } else if (time == 0) {
        document.cookie = name + "=" + escape(value) + ";expires=0";
    } else {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
}