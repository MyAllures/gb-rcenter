/**
 * Created by fei on 16-12-11.
 */
define(['site/include/BaseIndex', '../js/template', '../js/Zodiac'], function (BaseIndex, Template, Zodiac) {
    var isLoad = false;
    return BaseIndex.extend({
        zodiac: null,
        init: function () {
            this._super();
            this.zodiac = new Zodiac();
            mui(document.body).on('tap', '.index-action-menu', function () {
                mui('.mui-off-canvas-wrap').offCanvas('show');
            });
            this.muiInit();
        },
        /**
         * mui初始化
         */
        muiInit: function () {
            mui.init();
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

            /*侧滑菜单滚动*/
            mui('.index-canvas aside .mui-scroll-wrapper').scroll({
                scrollY: true,
                scrollX: false,
                startX: 0,
                startY: 0,
                indicators: false,
                deceleration: 0.0005,
                bounce: true
            });
        },
        onPageLoad: function () {
            var slider = mui("#slider");
            slider.slider({interval: 3000});
            this._super();
            if(this.os == 'app_android' || this.os=='app_ios') {
                $(".pcAndMobile").hide();
            }
            this.initPage();
            this.openNotice();
            //this.getLottery();
            this.getOpenResult();
            this.iosLauncher();
            this.iosBug();
            this.gotoBet();
            this.gotoDemo();
            this.updateOpenHistoryHref();
        },
        initPage: function () {
            var _this = this;

            mui('body').on('tap', 'a.btn-login', function () {
                var _href = "/index.html";
                _this.toLogin(_href);
            });
            mui('body').on('tap', '[data-href]', function () {
                _this.gotoUrl($(this).data("href"));
            });
            mui('body').on('tap', 'a[name=toPc]', function () {
                var terminal = $(this).data('terminal');
                if (terminal === 'pc') {
                    document.cookie = "ACCESS_TERMINAL=pc;expires=0";
                    window.location.replace(root + '/');
                }
            });
        },

        /** 刷新数据 */
        refreshData: function () {
            /*   setTimeout(function () {
             window.location.replace('/mainIndex.html?t=' + new Date().getTime());
             }, 1000);*/
        },

        openNotice: function () {
            mui('.gb-notice').on('tap', 'a[data-idx]', function (event) {
                var winHeight = $(window).height();
                // 此句非常重要，否则item初始化错误
                $('#box-notice').addClass('mui-slider');
                var boxHeight = $('.gb-notice-box').height();
                var boxTop = (winHeight - boxHeight - 90) / 2;
                $('.gb-notice-box').css({'top': boxTop});
                var idx = $(this).data('idx');
                $('.masker-notice-box').css({'min-height': winHeight - 44}).show();
                $('.gb-notice-box').slideDown(function () {
                    mui('#box-notice').slider().gotoItem(idx, 500);
                });
            });
            mui('body').on('tap', '.masker-notice-box', function (event) {
                $('.gb-notice-box').slideUp(function () {
                    $('body').removeClass('has-menu-ex');
                    $('.mui-hide-bar').hide();
                    $('.masker-notice-box').hide();
                });
            });
        },

        /** ios保存桌面图标提示 */
        iosLauncher: function () {
            if (this.os === 'ios') {
                var hasShow = localStorage.getItem('DESK_TIP');
                if (!hasShow || hasShow === 'no') {
                    var win = $(window).height();
                    $('div.desk').css({'top': win - 170}).slideDown();
                    localStorage.setItem('DESK_TIP', 'yes');
                    mui('.desk').on('tap', '.close', function () {
                        $(this).parent().slideUp();
                    })
                }
            }
        },

        /** 一些IOS上有的Bug */
        iosBug: function () {
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

        /** 查询开奖结果 */
        getOpenResult: function () {
            var _this = this;
            mui.ajax(root + "/lotteryResult/getOpenResult.html", {
                type: "post",
                dataType: "json",
                success: function (data) {
                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var ball = [];
                            var sx = [];
                            if (data[i].openCode) {
                                var spball = data[i].openCode.split(",");
                                for (var j = 0; j < spball.length; j++) {
                                    ball.push(spball[j]);
                                    if (data[i].type == "lhc") {
                                        sx.push(_this.zodiac.getSxName(spball[j]));
                                    }
                                }
                                data[i].sx = sx;
                                data[i].ball = ball;
                            }
                        }

                        var html = Template('template_myLotteryTemplate', {list: data});
                        $("ul._result").html(html);
                    }
                }
            })
        },

        gotoBet: function () {
            var _this = this;
            mui('body').on('tap', '[data-bet]', function () {
                var href = $(this).data('bet');
                _this.autoLoginPl(href);
            });
        },

        getLottery: function () {
            mui.ajax(root + "/index/lottery.html", {
                type: "post",
                dataType: "json",
                success: function (data) {
                    var html = Template('template_myLotteryTemplate', {list: data});
                    $("#container").html(html);
                }
            })
        },

        /** 试玩 */
        gotoDemo: function () {
            var _this = this;
            mui('body').on('tap', '.btn-try', function () {
                layer.open({
                    title: window.top.message.game_auto['提示'],
                    content: window.top.message.game_auto['游客盘口只供试玩'],
                    btn: [window.top.message.game_auto['确定'], ''],
                    yes: function (index) {
                        layer.close(index);
                        sessionStorage.is_login = true;
                         if (_this.os === 'app_ios') {
                            demoEnter();
                         } else {
                             mui.ajax('/lotteryDemo/demoAccount.html', {
                                 dataType: 'json',
                                 success: function (data) {
                                     if (data) {
                                         _this.gotoUrl('/mainIndex.html');
                                     }
                                 }
                             })
                         }
                    }
                })
            });
        },

        //获取头部信息
        getHeadInfo: function () {
            var _this = this;
            mui.ajax(root + "/getHeadInfo.html", {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.isLogin === true) { //已登录
                        $('._rightUnLogin').hide();
                        $('._rightLogin').removeClass('mui-hide').show();
                        $(".right_username").text(data.name);
                        if (data.avatar) {
                            $(".avatar").attr("src", data.avatar);
                        }
                        $('.is-login').show();
                        $('.un-login').hide();
                        _this.getBalance();
                    } else { //未登录
                        $("._rightLogin").hide();
                        $("._rightUnLogin").show();
                        $('.is-login').hide();
                        $('.un-login').show();
                    }
                }
            })
        },
        /**
         * 获取余额
         */
        getBalance: function () {
            mui.ajax(root + '/lottery/hall/getBalance.html', {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $("#_balance").text('￥' + data.balance);
                }
            });
        },
        updateOpenHistoryHref: function () {
            var href = $('a._open_lottery').attr('data-href');
            $('a._open_lottery').attr('data-href', href + "0");
        }

    });
});