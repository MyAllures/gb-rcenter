/*常用公用js**/
define([], function () {
    return Class.extend({
        /* form选择器，主要目的是为了限定Jquery事件绑定的范围，防止重复绑定*/
        formSelector: "",
        /*终端标识*/
        os: null,

        init: function (formSelector) {
            if(sessionStorage.returnFlag == undefined || sessionStorage.returnFlag == 'false'){
                if(!sessionStorage.currentLength){
                    sessionStorage.currentLength=0
                }
                sessionStorage.currentLength = parseInt(sessionStorage.currentLength)+1;
            }
            sessionStorage.returnFlag=false;
            this.formSelector = formSelector || this.formSelector;
            this.onPageLoad();
            this.bindButtonEvents();
            this.ajaxError();
        },
        /**
         * ajax error处理
         */
        ajaxError: function () {
            var _this = this;
            mui.ajaxSettings.error = function (error, type, xhr, settings) {
                var status = error.getResponseHeader("headerStatus") || error.status;
                if (status == 600) {//Session过期 跳转登录页面
                    _this.gotoUrl("/login/commonLogin.html");
                } else if (status == 606) {// 踢出
                    _this.gotoUrl(root + "/errors/" + status + ".html");
                    /* mui.toast("您已被強制踢出,如有任何疑問，請與我們聯絡");
                     window.setTimeout(_this.gotoUrl(root + "login/commonLogin.html"), 2000);*/
                } else if (status == 608) {
                    mui.toast(window.top.message.common["repeat.request.error"]);
                } else if (status >= 0 && settings && settings.comet != true) { //服务器忙
                    if (!settings.error) {
                        window.top.location.href = window.top.root + "/errors/" + status + ".html";
                    }
                } else if (settings && !settings.error && status != 200 && status != 0) {
                    if (settings.comet == true) {
                        mui.toast(window.top.message.common["online.message.error"]);
                    } else {
                        mui.toast(error.responseText);
                    }
                } else {
                    console.log(error);
                }
            }

        },
        /**
         * mui初始化
         */
        muiInit: function () {
            mui.init({
                    beforeback: function() {
                        sessionStorage.currentLength = parseInt(sessionStorage.currentLength)-1;
                        sessionStorage.returnFlag = true;
                        return true;
                    }
                });
            //禁用侧滑手势
            if (document.querySelector('.mui-inner-wrap')) {
                document.querySelector('.mui-inner-wrap').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
            if (document.querySelector('#offCanvasSide')) {
                document.querySelector('#offCanvasSide').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
            if (document.querySelector('#offCanvasSideRight')) {
                document.querySelector('#offCanvasSideRight').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }

            /*内容区域滚动*/
            mui('.mui-scroll-wrapper.middle-content').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: false //是否启用回弹
            });
            /*左右两侧菜单滚动*/
            mui('.mui-scroll-wrapper#offCanvasSideScroll').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: false //是否启用回弹
            });
            /*滚动菜单*/
            mui('.ssc-method-list').scroll({
                scrollY: false, //是否竖向滚动
                scrollX: true, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: false //是否启用回弹
            });
        },
        /**
         * 页面加载后事件
         */
        onPageLoad: function () {
            var _this = this;
            this.os = _this.whatOs();
            this.resetScreen();
            $(window).bind('orientationchange', function (e) {
                _this.resetScreen();
            });
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
        },
        /**
         * 上拉加载公用方法
         * url:访问地址
         * contentId:内容加载区id
         * pagenumber：下一页页码
         * lastPageNumberId：最后一页页码
         * scrollView：滚动区
         * data:请求的参数
         * isReload:重新加载或者显示更多
         */
        pullRefreshUp: function (url, contentId, pagenumber, lastPageNumberId, scrollView, data, isReload) {
            var t = this;
            var lastPageNumber = document.getElementById(lastPageNumberId);
            if (lastPageNumber == null || pagenumber <= parseInt(lastPageNumber.value)) {
                mui.ajax(url, {
                    type: 'post',//HTTP请求类型
                    timeout: 10000,//超时时间设置为10秒；
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Soul-Requested-With': 'XMLHttpRequest'
                    },
                    success: function (data) {
                        var info = document.getElementById(contentId);
                        if (isReload) {
                            info.innerHTML = data;
                            scrollView.pullRefresh().endPullupToRefresh(false);
                        } else {
                            info.innerHTML = info.innerHTML + data;
                        }
                        if (document.getElementById(lastPageNumberId).value == pagenumber) {
                            scrollView.pullRefresh().endPullupToRefresh(true);
                            // return pagenumber;
                        } else {
                            scrollView.pullRefresh().endPullupToRefresh(false);
                            // return pagenumber+1;
                        }
                        t.dismissProgress();
                    },
                    error: function (e) {
                        t.toast("加载失败");
                        scrollView.pullRefresh().endPullupToRefresh(true);
                        //异常处理；
                        console.log(e);
                        t.dismissProgress();
                    },
                });
                return pagenumber + 1;
            } else {
                scrollView.pullRefresh().endPullupToRefresh(true);
                return pagenumber;
            }
        },
        showProcess: function () {
            if (this.os == 'app_android')
                window.gamebox.showPro();
        },
        dismissProgress: function () {
            if (this.os == 'app_android')
                window.gamebox.disPro();
        },
        /**
         * 返回上一个页面的回调
         * @param url
         */
        goToLastPage: function (e, option) {
            if (!this.isEmpty(this.lastHash)) {
                this.pages[this.lastHash].refresh = (option.refresh || false);
                window.location.hash = this.lastHash;
            } else {
                window.location = root;
            }
        },
        /**
         * 消息提示
         * @param msg
         */
        toast: function (msg) {
            if (this.os == 'ios') {
                mui.toast(msg);
            } else if (this.os == 'app_android') {
                window.gamebox.toast(msg);
            } else {
                mui.toast(msg);
            }
        },
        /**
         * 消息弹窗提示
         * @param content
         */
        alert: function (content) {
            layer.open({
                content: content,
                title: '提示',
                btn: ['确定', ''],
                yes: function (index) {
                    layer.close(index)
                }
            })
        },
        /**
         * 跳转链接地址
         * @param url
         */
        gotoUrl: function (url) {
            var _this = this;
            var sos = this.whatOs();
            var domain = window.location.origin + '/';
            if (url.indexOf("/commonLogin.htm") > 0 && sos == 'app_android') {
                window.gamebox.goLogin();
            } else if ((sos === 'app_android') && url != domain && url != "/") {
                window.gamebox.gotoActivity(url);
            } else if (sos === 'app_ios') {
                gotoCustom(url);
            } else {
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
                        loading: _this.showLoading,
                        close: _this.hideLoading
                    }
                })
            }
        },
        /**
         * 前进后退清除内容，以便重新初始化
         */
        unInitFileInput: function ($ele) {
            //前进后退清除内容，以便重新初始化
            $.each($ele, function (index, item) {
                if ($(item).parent().hasClass("btn-file")) {
                    var $cont = $(item).parent().parent().parent().parent();
                    $cont.find('.file-drop-zone').off();
                    $(item).insertBefore($cont).off('.fileinput').removeData();
                    $cont.off().remove();
                }
            });
            return $ele;
        },
        /**
         * 前进后退清除内容，以便重新初始化
         * @param el
         */
        unInitSwitch: function ($bootstrapSwitch) {
            $.each($bootstrapSwitch, function (index, item) {
                var bootstrap = $(item).parent().parent();
                if (bootstrap.hasClass("bootstrap-switch")) {
                    $(item).insertBefore(bootstrap);
                    bootstrap.remove();
                }
            });
            return $bootstrapSwitch;
        },
        /** 是否支持本地存储（Safari非无痕模式） */
        isLocalStorageSupport: function () {
            var testKey = 'test';
            var storage = window.sessionStorage;
            try {
                storage.setItem(testKey, 'testValue');
                storage.removeItem(testKey);
                return true;
            } catch (error) {
                return false;
            }
        },
        /**
         * 判断终端
         * @returns {*}
         */
        whatOs: function () {
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
        },
        /**
         * 手机屏幕方向
         * @returns {boolean}
         */
        orient: function () {
            if (this.os != 'pc') {
                var orient = window.orientation;
                if (typeof orient === 'undefined') {
                    return (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
                } else {
                    if (orient == 90 || orient == -90) {
                        return 'landscape';
                    } else if (orient == 0 || orient == 180) {
                        return 'portrait';
                    }
                }
            }
        },
        resetScreen: function () {
            var sm = this.orient();
            if (sm == 'landscape') {
                if ($('.ori-mask').length == 0) {
                    var tip = '<div class="ori-mask"></div>';
                    $('body').append(tip);
                }
            } else {
                if ($('.ori-mask').length > 0) {
                    $('.ori-mask').remove();
                }
            }
        },
        /** 显示Loading */
        showLoading: function () {
            if ($("#loadingPopover").length > 0) {
                $("#loadingPopover").addClass("mui-active");
            } else {
                var html = '<div id="loadingPopover" class="mui-popover popup-up-diy loading-diy mui-active">'
                    + '<div id="loading"><img src="' + resRoot + '/images/three-dots.svg"></div>'
                    + '<div class="mui-backdrop mui-active" style=""></div></div>';
                $("body").append(html);
            }
        },
        /** 隐藏Loading */
        hideLoading: function () {
            setTimeout(function () {
                $("#loadingPopover").removeClass('mui-active');
            }, 1000);
        },

            iosGoBack: function () {
            var sos = this.whatOs();
            mui.toast("sos:"+sos+"  length:"+window.history.length+" sessionStorage.currentLength:"+sessionStorage.currentLength);
            if (sos == 'app_ios' && sessionStorage.currentLength == "1") {
                $('header').on('tap', '.mui-action-back', function () {
                    var canvasRight = $('.mui-off-canvas-right').hasClass('mui-active');
                    if (canvasRight) {
                        mui('.mui-off-canvas-right').offCanvas('close');
                    }
                    var target = $('input#_from').val();
                    if (target) {
                        gotoTab(target);
                    } else {
                        goBack();
                    }
                })
            }
        }
    })
});
