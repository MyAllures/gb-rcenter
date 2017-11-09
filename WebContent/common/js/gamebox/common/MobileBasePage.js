define(['moment'], function (moment) {

    return Class.extend({
        /**
         * 用于远程验证数组时，获取当前验证的element的索引
         */
        rowIndex: null,
        /**
         * 上次事件对象目标，用于需要两次的重复调用时，比如执行某项操作时需要验证安全密码，安全密码验证完成后自动继续执行相关操作
         */
        parentTarget: null,
        /**
         * form选择器，主要目的是为了限定Jquery事件绑定的范围，防止重复绑定
         */
        config: null,
        os: null,
        apiObjKey: 'api_object',   // 登录成功保存在localStorage的API信息

        formSelector: "",
        /*翻译过的时区*/
        displayName: "",
        dateTimeFromat: "",
        userTimeTimerId: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = formSelector || this.formSelector;
            this.bindEvent();
            this.onPageLoad();
        },
        onPageLoad: function () {
            var _this = this;
            //暂时去除滚动条初始化，mui.js中已有初始化
            // mui('.mui-scroll-wrapper').scroll();
            this.os = _this.whatOs();

            this.resetScreen();
            $(window).bind('orientationchange', function (e) {
                _this.resetScreen();
            });
            _this.goBack();

            this.gotoDemo();
            this.iosBug();
        },
        /** 试玩 */
        gotoDemo: function () {
            var _this = this;
            mui('body').on('tap', '.btn-try', function () {
                layer.open({
                    title: window.top.message.game_auto['提示'],
                    content: window.top.message.game_auto['欢迎使用试玩模式'],
                    btn: [window.top.message.game_auto['确定'], ''],
                    yes: function (index) {
                        layer.close(index);
                        sessionStorage.is_login = true;
                        if (_this.os === 'app_ios') {
                            demoEnter();
                        } else {
                            mui.ajax('/signUp/createFreeAccount.html', {
                                dataType: 'json',
                                type: 'POST',
                                success: function (data) {
                                    if (data.status) {
                                        var demoModel = data.demoModel;
                                        sessionStorage.demoModel = demoModel;
                                        _this.gotoUrl('/mainIndex.html');
                                    }
                                }
                            })
                        }
                    }
                })
            });
        },

        /** 一些IOS上有的Bug */
        iosBug: function () {
            var _this = this;
            // 刷新页面后获取容器高度，解决IOS设备刷新时出现空白页问题
            $('.mui-inner-wrap').height();
            //苹果safari浏览器首页的底部导航栏,首页和我的图标不显示问题
            $(window).bind("pageshow", function () {
                if (isLoad && _this.os === 'ios') {
                    $("#footer_index").addClass("mui-active");
                    $("[id!='footer_index'][id*='footer_']").removeClass("mui-active");
                }
                isLoad = true;
            });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
        },

        whatOs: function () {
            var ua = navigator.userAgent;
            // var ua = "Mozilla/5.0 (iPhone; CPU app_ios OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
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

        toast: function (msg) {
            if (this.os == 'ios') {
                mui.toast(msg);
            } else if (this.os == 'app_android') {
                window.gamebox.toast(msg);
            } else {
                mui.toast(msg);
            }
        },

        gotoUrl: function (url) {
            var domain = window.location.origin + '/';
            if (url.indexOf("?") < 0) {
                url = url + "?t=" + random;
            } else {
                url = url + "&t=" + random;
            }
            if ((this.os == 'app_android') && url.indexOf('api/detail.') > 0) {
                window.gamebox.gotoApi(url);
            } else if ((this.os == 'app_android' || this.os == 'app_ios') && url.indexOf("/game.", 0) == -1
                && url != domain && url != "/") {
                if (this.os == 'app_android') {
                    window.gamebox.gotoActivity(url);
                } else if (this.os == 'app_ios') {
                    gotoCustom(url);
                }
            } else {
                mui.openWindow({
                    url: url,
                    id: url,
                    extras: {},
                    createNew: false,
                    show: {autoShow: true},
                    waiting: {
                        autoShow: true,
                        title: '正在加载...'
                    }
                })
            }
        },

        toLogin: function (url) {
            if (this.os == 'app_ios') {
                gotoCustom("/login/commonLogin.html");
            } else if (this.os == 'app_android') {
                window.gamebox.gotoLogin(url);
            } else {
                url = '/login/commonLogin.html';
                mui.openWindow({
                    url: url,
                    id: url,
                    extras: {},
                    createNew: false,
                    show: {autoShow: true},
                    waiting: {
                        autoShow: true,
                        title: '正在加载...'
                    }
                })
            }
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

        /** 公告上下定时滚动 */
        startMarquee: function (lh, speed, delay) {
            var p = false;
            var t;
            var o = document.getElementById("marquee-box");
            o.innerHTML += o.innerHTML;
            o.style.marginTop = 0;
            o.onmouseover = function () {
                p = true;
            };
            o.onmouseout = function () {
                p = false;
            };

            function start() {
                t = setInterval(scrolling, speed);
                if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            }

            function scrolling() {
                if (parseInt(o.style.marginTop) % lh != 0) {
                    o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
                    if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2) o.style.marginTop = 0;
                } else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            }

            setTimeout(start, delay);
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

        alert: function (content) {
            layer.open({
                title: '提示',
                content: content,
                btn: ['确定', ''],
                yes: function (index) {
                    layer.close(index)
                }
            })
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

        initBanner: function () {
            var _this = this;
            mui('.mui-banner').slider({
                interval: 3000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
            });

            mui('.gb-banner').on('tap', '.mui-icon', function () {
                $('.gb-banner').slideUp();

                var $ele = $('.mui-no-data');
                var height = $ele.height();
                if (height != null) {
                    height = height + 138;
                    var lineHeight = (height - 10) + 'px';
                    setTimeout(function () {
                        $ele.css({'height': height, 'line-height': lineHeight});
                    }, 500);
                }
                return false;
            });

            var bannerSize = $('#bannerSize').val();
            for (var i = 0; i < bannerSize; i++) {
                mui('body').on('tap', '#_banner_' + i, function () {
                    var $b = $(this);
                    $b.addClass('mui-disabled');
                    setTimeout(function () {
                        $b.removeClass('mui-disabled');
                    }, 1000);
                    if ($b.attr('_url')) {
                        if (os == 'app_ios') {
                            gotoPay($b.attr('_url'));
                        } else {
                            _this.gotoUrl($b.attr('_url'));
                        }
                    }
                });
            }

            mui('.gb-notice').on('tap', 'a[data-idx]', function (event) {
                var winHeight = $(window).height();
                // 此句非常重要，否则item初始化错误
                $('#box-notice').addClass('mui-slider');
                var boxHeight = $('.gb-notice-box').height();
                var boxTop = (winHeight - boxHeight) / 2;
                $('.gb-notice-box').css({'top': boxTop});
                var idx = $(this).data('idx');
                $('.masker-notice-box').css({'min-height': winHeight - 44}).show();

                $('.gb-notice-box').slideDown(function () {
                    mui('#box-notice').slider().gotoItem(idx, 500);
                });
                if (_this.os == 'ios' || _this.os == 'app_ios')
                    setTimeout(function () {
                        mui.toast("");
                        $(".mui-toast-message").remove();
                    }, 510);
            });
            mui('body').on('tap', '.masker-notice-box', function (event) {
                $('.gb-notice-box').slideUp(function () {
                    $('body').removeClass('has-menu-ex');
                    $('.mui-hide-bar').hide();
                    $('.masker-notice-box').hide();
                });
            });
        },

        /**
         * 自动绑定Button标签的所有按钮事件
         */
        bindButtonEvents: function () {
            var _this = this;
            var page = this;
            $(page.formSelector, document).on("click", "[data-rel]", function (e) {
                var isLocked = $(e.currentTarget).isLocked();
                if (isLocked) {
                    return false;
                }
                $(e.currentTarget).lock();
                var _target = e.currentTarget;
                e.preventDefault();
                var _e = {currentTarget: _target, page: e.page || page};
                var btnOption = eval("(" + $(_target).data('rel') + ")");
                if (_target.title) {
                    btnOption.text = _target.title;
                }
                //lock

                if (btnOption.confirm) {
                    _this.showConfirmMessage(btnOption.confirm, function (result) {
                        if (result) {
                            _this._doEvents(page, _e, btnOption);
                        }
                        else {
                            $(_target).unlock();

                        }
                    })
                }
                else {
                    return _this._doEvents(page, _e, btnOption);
                }
            });
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
        /**
         * 初始化验证码
         */
        initCaptcha: function () {
            var _this = this;
            var url = null;
            $(this.formSelector, document).on("click", "[reloadable]", function (e) {
                //lock
                var isLocked = $(e.currentTarget).isLocked();
                if (isLocked) {
                    return;
                }
                if (!url) {
                    url = e.currentTarget.src;
                }
                e.currentTarget.src = url + '?t=' + Math.random();
                $("input[name=code]").val("");
            });
        },
        /**
         * 获取表单验证规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            var $ruleDiv = $form.find('div[id=validateRule]');
            if ($ruleDiv.length > 0) {
                var rule = eval("({" + $ruleDiv.text() + "})");
                rule.ignore = ".ignore";
                return rule;
            }
            return null;
        },

        /**
         * 绑定表单验证规则
         * @private
         */
        bindFormValidation: function () {
            var $form = $(this.formSelector);
            var rule = this.getValidateRule($form);
            if (rule) {
                if ($.data($form[0], "validator")) {
                    $.data($form[0], "validator", null);
                }
                $form.validate(rule);
            }
        },

        /*bindFormValidation: function ($form) {
         $form.validate(this.getValidateRule($form));
         },*/

        /**
         * 判断给定的数组中不为空的元素是否小于给定的count值
         *
         * @param values 值数组
         * @param count 预期不为空的元素个数
         * @returns {boolean}
         */
        testNotBlankCount: function (values, count) {
            var c = 0;
            if (values.length) {
                for (i in values) {
                    (typeof values[i] == "object" ? values[i].val() : values[i]) && c++;
                }
            }
            return count != 0 && c < count;
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
                scrollView.pullRefresh().disablePullupToRefresh();
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
         * 日期快选
         * @param dateValue
         * @returns {string}
         */
        getDatePopover: function (dateValue) {
            var startTime;
            var endTime;
            var t = this;
            var date = new Date();
            var format = dateFormat.day;
            var currentDate = this.formatDateTime(date, format);

            if (dateValue == "today") {
                startTime = currentDate;
                endTime = currentDate;
            } else if (dateValue == "yesterday") {
                date.setDate(date.getDate() - 1);
                startTime = this.formatDateTime(date, format);
                endTime = this.formatDateTime(date, format);
            } else if (dateValue == "thisWeek") {
                var weekDay = date.getDay();
                date.setDate(date.getDate() - (weekDay == 0 ? 6 : weekDay - 1));
                startTime = this.formatDateTime(date, format);
                endTime = currentDate;
            } else if (dateValue == "lastWeek") {
                var weekDay = date.getDay();
                date.setDate(date.getDate() - (weekDay == 0 ? 7 : weekDay));
                endTime = this.formatDateTime(date, format);
                date.setDate(date.getDate() - 6);
                startTime = this.formatDateTime(date, format);
            } else if (dateValue == "thisMonth") {
                startTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-01";
                startTime = this.formatDateTime(new Date(startTime), format);
                endTime = currentDate;
            } else if (dateValue == "lastMonth") {
                endTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-01";
                endTime = this.formatDateTime(new Date(endTime), format);
                startTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth()) : date.getMonth()) + "-01";
                startTime = this.formatDateTime(new Date(startTime), format);
            } else if (dateValue == "7days") {
                date.setDate(date.getDate() - 6);
                startTime =  this.formatDateTime(date, format);
                endTime = currentDate;
            } else if (dateValue == "30days") {
                date.setDate(date.getDate() - 29);
                startTime =this.formatDateTime(date, format);
                endTime = currentDate;
            }

            return startTime + "&" + endTime;
        },
        /**
         * 日期格式化后的字符串
         * @param date
         * @returns {string}
         */
        getDateString: function (date) {
            var dateStr = date.getFullYear() + "-";
            if (date.getMonth() + 1 < 10)
                dateStr = dateStr + '0' + (date.getMonth() + 1) + "-";
            else
                dateStr = dateStr + (date.getMonth() + 1) + "-";
            if (date.getDate() < 10)
                dateStr = dateStr + '0' + date.getDate();
            else
                dateStr = dateStr + date.getDate();
            return dateStr;
        },
        userTime: function (isTranslate) {
            var _this = this;
            $.ajax({
                url: '/index/getUserTimeZoneDate.html',
                dataType: "json",
                async: false,
                success: function (data) {
                    _this.displayName = data.displayName;
                    if (isTranslate != undefined) {
                        _this.displayName = _this.displayNameFun(_this.displayName)
                    }
                    _this.dateTimeFromat = data.dateTimeFromat;
                    $("._user_time").text(_this.displayName + " " + data.dateTime);
                    $("._user_time").attr("time", data.time);
                    $("._user_time").css("display", "inline");

                    if (_this.userTimeTimerId) {
                        window.clearInterval(_this.userTimeTimerId);
                    }
                    _this.userTimeTimerId = window.setInterval(function () {
                        _this.changeTimeTimer(_this.displayName);
                    }, 1000);
                }
            });
        },
        displayNameFun: function (timezone) {
            var trans = timezone;
            switch (timezone) {
                case "GMT+08:00":
                    trans = "北京时间";
                    break;
                case "GMT-04:00":
                    trans = "美东时间";
                    break;
            }
            return trans;
        },
        changeTimeTimer: function (displayName) {
            var _this = this;
            var $userTime = $("._user_time");
            if (_this.dateTimeFromat && $userTime.attr("time")) {
                var date = new Date();
                date.setTime(parseInt($userTime.attr("time")) + 1000);
                $userTime.attr("time", date.getTime());
                if (displayName != null && (displayName == "美东时间" || displayName == "GMT-04:00"))
                    date.setUTCMilliseconds(-1000 * 60 * 60 * 12);
                //时间日期格式化
                // var theMoment=moment(date);
                // theMoment.utcOffset(sessionStorage.getItem("timezone"),false);
                $userTime.text(_this.displayName + " " + _this.getDateString(date)
                    + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
                    + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
                    + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()));
            }
        },
        /**
         * 消息提示弹窗
         * @param msg
         */
        openLayer: function (msg) {
            layer.open({
                title: '提示',
                content: msg,
                btn: ['确定', ''],
                yes: function (index) {
                    layer.close(index);
                }
            })
        },
        /**
         *ios顶部后退
         */
        goBack: function () {
            var _this = this;
            if (_this.os == 'app_ios') {
                mui("body").on("tap", "[class*='mui-action-back']", function () {
                    goBack();
                });
            }
        },
        /**
         * 格式化指定格式日期时间
         * @param date
         * @param format 时间格式 例如 dateForm.date
         */
        formatDateTime: function (date, format) {
            var theMoment = moment();
            theMoment._d = date;
            return theMoment.format(format);
        },
        /**
         * 免转登录彩票
         */
        autoLoginPl: function (url) {
            var postData = {};
            postData.apiId = 22;
            var _this = this;
            if(isLogin == 'false') {
                if (_this.os === 'app_ios') {
                    window.page.apiLogin.gotoGame(url, postData.apiId);
                } else {
                    if (url.indexOf('http') === -1) {
                        url = window.location.origin + url;
                    }
                    if (_this.os === 'app_android' && siteType === 'lottery') {
                        window.gamebox.gotoBet(url);
                    } else {
                        _this.gotoUrl(url);
                    }
                }
                return;
            }
            mui.ajax(root + "/transfer/auto/loginAndAutoTransfer.html", {
                dataType: 'json',
                data: postData,
                type: "POST",
                success: function (data) {
                    _this.hideLoading();
                    if (data) {
                        if (data.isSuccess == true) {
                            if (_this.os === 'app_ios') {
                                window.page.apiLogin.gotoGame(url, postData.apiId);
                            } else {
                                if (url.indexOf('http') === -1) {
                                    url = window.location.origin + url;
                                }
                                if (_this.os === 'app_android' && siteType === 'lottery') {
                                    window.gamebox.gotoBet(url);
                                } else {
                                    _this.gotoUrl(url);
                                }
                            }
                        } else {
                            _this.openLayer('转账功能未开启');
                        }
                    } else {
                        _this.openLayer(window.top.message.game_auto['无法登录']);
                        $("[class='mui-backdrop mui-active']").remove();
                        _this.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 600) {
                        _this.signIn(postData);
                    } else if (error.status === 606) {
                        _this.gotoUrl(root + '/errors/606.html');
                    } else {
                        _this.openLayer(window.top.message.game_auto['无法登录']);
                        $("[class='mui-backdrop mui-active']").remove();
                        _this.reload();
                    }
                },
                complete: function () {
                    _this.hideGameLoading();
                }
            });
        },
        signIn: function (obj) {
            // 存储API登录信息，以便登录成功后进入游戏
            if (page.isLocalStorageSupport()) {
                //如果为空不组成数值，以防解析json报错(gameId与gamecode可能为空)
                var objKey = '{"apiId":' + obj.apiId + '}';
                localStorage.setItem(page.apiObjKey, objKey);
            }
            this.toLogin("/index.html");
        },
        reload: function () {
            if (isLogin == 'false') {
                setTimeout(function () {
                    page.gotoUrl(window.location.href);
                }, 1000);
            }
        },
        /** 隐藏Loading */
        hideLoading: function () {
            setTimeout(function () {
                $('div.com-loading').removeClass('mui-show');
            }, 1000);
        },
        hideGameLoading: function () {
            setTimeout(function () {
                $('div.game-mask').remove();
            }, 1000);
        },
        /** 抢红包 */
        canShowLottery: function(id){
            if (!isLogin || isLogin === "false") {
                window.location.href="/login/commonLogin.html";
                return;
            }
            mui.ajax({
                url:"/ntl/activity/countDrawTimes.html",
                type: "POST",
                dataType: "json",
                data:{activityMessageId:id},
                success: function(data) {
                    $("[name='gb.token']").val(data.token);
                    $("#activity_message_id").val(id);
                    if (data.drawTimes && data.drawTimes > 0) {
                        $("#tip-msg").removeClass("mui-hide");
                        $("#lottery_time_tip-msg").addClass("mui-hide");
                        $("#tip-msg").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">'+data.drawTimes+'</span>次抽奖机会');
                        //$("#ramain-count").text(data.drawTimes);
                        $("#containerOut").css("display", "block");
                        $("#lotteryPageBtn_1").removeAttr("disabled");
                        $("#lotteryPageBtn_1").show();
                        $("#lotteryPage").css({'background-image': 'url(' + resRoot + '/themes/hb/images/lottery.png)'});
                        $("#lottery_time_tip-msg").addClass("mui-hide");
                    } else if (data.drawTimes === 0) {
                        if (data.isEnd === "false") {
                            $("#tip-msg").removeClass("mui-hide");
                            $("#ramain-count").text(data.drawTimes);
                            $("#containerOut").css("display", "block");
                            $("#lotteryPage").css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                            $("#lotteryPageBtn_1").hide();
                        } else {
                            $("#tip-msg").addClass("mui-hide");
                            $("#containerOut").css("display", "block");
                            $("#lotteryPage").css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                            $("#lotteryPageBtn_1").hide();
                        }
                        if(data.nextLotteryTime!=""){
                            $("#next_lottery_time").text(data.nextLotteryTime);
                            $("#lottery_time_tip-msg").removeClass("mui-hide");
                        }else{
                            $("#lottery_time_tip-msg").addClass("mui-hide");
                        }
                    } else if (data.drawTimes === -1) {
                        $("#lotteryPage").css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                        $("#tip-msg").html('红包活动已经结束!');
                        $("#tip-msg").removeClass("mui-hide");
                        $("#lotteryPageBtn_1").hide();
                        $("#lottery_time_tip-msg").addClass("mui-hide");
                        $("#containerOut").css("display", "block");

                    }else if(data.drawTimes==-5){
                        $("#lotteryPage").css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                        $("#tip-msg").html('本次红包已经抢光了');
                        $("#tip-msg").removeClass("mui-hide");
                        if(data.nextLotteryTime!=""){
                            $("#next_lottery_time").text(data.nextLotteryTime);
                            $("#lottery_time_tip-msg").removeClass("mui-hide");
                        }else{
                            $("#lottery_time_tip-msg").addClass("mui-hide");
                        }
                        $("#lotteryPageBtn_1").hide();
                        $("#lottery_time_tip-msg").removeClass("mui-hide");
                        $("#containerOut").css("display","block");
                        return;
                    }
                }
            });
        }
    });
});