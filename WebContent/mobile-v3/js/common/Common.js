/**终端标志*/
var os = whatOs();
/*是否原生*/
var isNative = isNative();
/*登录跳转后地址*/
var LOGIN_TARGET_URL = "loginTargetUrl";
//sessionStorage存放api相关对象 用来登录后直接进入游戏
var SESSION_API_OBJ = "api_object";

/*mui 初始化配置选项*/
var muiDefaultOptions = {
    /*主页面滚动指定容器，可自行指定范围*/
    containerScroll: '.mui-content.mui-scroll-wrapper',
    /*右侧菜单上下滚动，可自行指定范围*/
    rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
    /*禁用侧滑手势指定样式*/
    disabledHandSlip: ['.mui-off-canvas-left'],
    /*支持横向滚动样式*/
    horizontalScroll: [''],
    /**支持横向纵向样式*/
    horizontalVerticalScroll: ['']
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
        options = {};
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
    if (options.disabledHandSlip) {
        var disableClass = options.disabledHandSlip;
        for (var i = 0; i < disableClass.length; i++) {
            if (document.querySelector(disableClass[i])) {
                document.querySelector(disableClass[i]).addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
        }
    }
    //同时支持横向纵向滚动
    var horizontalVerticalScroll = options.horizontalVerticalScroll;
    if (horizontalVerticalScroll && horizontalVerticalScroll.length > 0) {
        for (var i = 0; i < horizontalVerticalScroll.length; i++) {
            if (horizontalVerticalScroll[i]) {
                muiScrollXY(horizontalVerticalScroll[i]);
            }
        }
    }

    //默认处理mui ajax错误
    muiAjaxError();
    //绑定事件
    bindButtonEvent();
    //键盘适应性
    resizeKeyboard();
    //重写返回方法，以适应登录后直接跳转页面。
    muiBack();
    //绑定后台设置的相关链接事件
    bindHrefTarget();
}

/**
 * 绑定后台设置的相关链接事件
 */
function bindHrefTarget() {
    $("a[href][target='_blank']").on("tap", function () {
        var url = $(this).attr("href");
        if (url) {
            openWindow(url);
        }
    })
}

/**
 * 重写返回方法，以适应登录后直接跳转页面。
 */
function muiBack() {
    mui.back = function () {
        sessionStorage.removeItem(SESSION_API_OBJ);
        sessionStorage.removeItem(LOGIN_TARGET_URL);
        if (typeof mui.options.beforeback === 'function') {
            if (mui.options.beforeback() === false) {
                return;
            }
        }
        mui.doAction('backs');
    }
}

/**
 * 页面重新适应行，键盘在输入框下面
 */
function resizeKeyboard() {
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
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
            bounce: true //是否启用回弹
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
 * 支持横向纵向样式
 * @param obj
 * @param options
 */
function muiScrollXY(obj, options) {
    if (!options) {
        options = {
            scrollY: true, //是否竖向滚动
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
    mui.ajaxSettings.complete = function (error, type, xhr, settings) {
        var status = error.getResponseHeader("headerStatus") || error.status;
        if (status == 600) {//Session过期 跳转登录页面
            var targetUrl = window.location.href;
            var index = targetUrl.indexOf("&v=");
            if (index <= 0) {
                index = targetUrl.indexOf("?v=");
            }
            targetUrl = targetUrl.substr(0, index);
            login(targetUrl);
        } else if (status == 606) {// 踢出
            goToUrl(root + "/errors/" + status + ".html");
        } else if (status == 608) {
            var token = error.getResponseHeader("gb.token");
            if (token) {
                $("[name='gb.token']").val(token);
            }
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
        beforeSend: options.beforeSend,
        async: options.async,
        contentType: options.contentType,
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
 * 是否原生
 * @returns {*}
 */
function isNative() {
    var ua = navigator.userAgent;
    if (/(is_native)/i.test(ua)) {
        return true;
    } else {
        return false;
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
 * @param url 跳转链接
 * isExternalLink 是否是外部链接，外部链接无需加版本号
 * targetUrl 登录成功后跳转链接
 */
function goToUrl(url, isExternalLink, targetUrl) {
    if (isExternalLink != true && url.indexOf("?") < 0) {
        url = url + "?v=" + rcVersion;
    } else if (isExternalLink != true) {
        url = url + "&v=" + rcVersion;
    }
    //登录页面
    if (url.indexOf("commonLogin.html") > 0) {
        login(targetUrl);
        return;
    } else if (url.indexOf("/deposit/index.html") > 0) { //存款页面
        deposit(url);
        return;
    } else if (url.indexOf(root + "/mainIndex.html") > 0) { //首页
        goToHome(url);
        return;
    }
    openWindow(url);
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
        //防止提交事件软键盘弹出
        if (document.activeElement) {
            document.activeElement.blur();
        }
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
    } else if (opType == 'openWindow') { //新打开弹窗页面
        var win = window.open(options.target);
        if (!win) {
            window.location.href = options.target;
        }
    }
}

/**
 * 封装事件执行function
 * @param obj
 * @param options
 */
function doFunction(obj, options) {
    var func = this[options.target];
    if (func == null && options.target && options.target.indexOf(".") != -1) {
        var args = options.target.split('.');
        func = this[args[0]][args[1]];
    }
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
    mui.toast(msg);
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
                return applyFunction(func, options, obj);
            }
        } else if (e.index == 1) {
            var func = options.cancelFunc;
            if (func) {
                return applyFunction(func, options, obj);
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
function showWarningMsg(title, msg, callback, options) {
    mui.alert(msg, title, function () {
        if (callback) {
            applyFunction(callback, options);
        }
    });
}

/**
 * 统一登录入口
 * @param url
 */
function login(targetUrl) {
    if (isNative) {
        nativeLogin();
    } else {
        var url = '/login/commonLogin.html?v=' + rcVersion;
        if (targetUrl && targetUrl != '/') {
            //登录成功后跳转页面
            sessionStorage.setItem(LOGIN_TARGET_URL, targetUrl);
        }
        openWindow(url);
    }
}

/**
 * 统一首页入口
 */
function goToHome(url) {
    if (isNative) {
        gotoHomePage();
    } else {
        openWindow(url);
    }
}

/**
 * 统一存款入口
 */
function deposit(url) {
    if (isNative) {
        nativeGotoDepositPage();
    } else {
        openWindow(url);
    }
}

/**
 * 统一退出登录入口
 */
function logout(e, options) {
    sessionStorage.is_login = false;
    isLogin = false;
    sessionStorage.setItem("isLogin", false);
    goToUrl("/passport/logout.html");
}

/**
 * 返回上一页
 */
function goToLastPage() {
    if (isNative) {
        nativeGoBackPage();
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
    if (value == null) {
        document.cookie = name + "=" + escape(value) + ";expires=-1";
    } else if (!time || time == 0) {
        document.cookie = name + "=" + escape(value) + ";expires=0";
    } else {
        var strsec = getSecond(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
}

function getSecond(str) {
    if (!str || str == 0) return 0;
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s")
        return str1 * 1000;
    else if (str2 == "h")
        return str1 * 60 * 60 * 1000;
    else if (str2 == "d")
        return str1 * 24 * 60 * 60 * 1000;
}


/**
 * 获取cookie值
 * @param name
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    return null;
}

/**
 * 绑定表单验证规则
 * @private
 */
function bindFormValidation($form) {
    if (!$form) {
        return;
    }
    var $ruleDiv = $form.find('div[id=validateRule]');
    var rule;
    if ($ruleDiv.length > 0) {
        rule = eval("({" + $ruleDiv.text() + "})");
        rule.ignore = ".ignore";
    }
    if (rule) {
        if ($.data($form[0], "validator")) {
            $.data($form[0], "validator", null);
        }
        $form.validate(rule);
    }
}

/**
 * 延迟加载图片
 */
function lazyLoadImg(self, placeholder) {
    //为了解决重新加载页面的时候，原先加载的图片无法重新加载
    document.body.removeAttribute('data-imagelazyload');
    if (!placeholder) {
        placeholder = '';
    }
    var lazyLoadApi = mui(self).imageLazyload({
        autoDestroy: false,
        placeholder: placeholder
    });
    return lazyLoadApi;
}

/**
 * 只是跳转到首页，不进行游戏跳转，
 * 为了处理跳转登录后返回之前一个页面点击首页，就一直跳回到登录页面
 */
function goToHomePageOnly() {
    sessionStorage.removeItem(SESSION_API_OBJ);
    sessionStorage.removeItem(LOGIN_TARGET_URL);
    goToHome(root + "/mainIndex.html");
}

/**
 * 获取当前url
 * @returns {string}
 */
function getCurrentUrl() {
    var targetUrl = window.location.href;
    var index = targetUrl.indexOf("&v=");
    if (index <= 0) {
        index = targetUrl.indexOf("?v=");
    }
    targetUrl = targetUrl.substr(0, index);
    return targetUrl;
}