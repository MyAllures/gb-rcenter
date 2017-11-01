/**
 * Created by fei on 16-12-11.
 */
define(['site/include/BaseIndex',"site/promo/PromoDetail"], function (BaseIndex,PromoDetail) {
    var isload = false;
    return BaseIndex.extend({
        promoJs:null,
        init: function () {
            this._super();
            var _this = this;
            _this.promoJs= new PromoDetail();
            /*内容区域滚动*/
            mui("#mui-refresh").pullRefresh().refresh();
            /*滚动菜单*/
            mui('.a').scroll({
                scrollY: false, //是否竖向滚动
                scrollX: true, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            });
            /*侧滑菜单滚动*/
            mui('.index-canvas aside .mui-scroll-wrapper').scroll({
                scrollY: true,
                scrollX: false,
                startX: 0,
                startY: 0,
                indicators: false,
                deceleration: 0.0006,
                bounce: true
            });
            mui(document.body).on('tap', '.index-action-menu', function () {
                mui('.mui-off-canvas-wrap').offCanvas('show');
            });
            mui.init({pullRefresh: _this.pullRefresh});
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            setTimeout(function () {
                _this.getHotGames();
                _this.userTime(true);
                window.top.page.apiLogin.enterGame();
            }, 1000);
            this.initPage();
            this.loadBanner();
            this.loadApi();
            this.getActivity();
            this.changeTab($('input#nav-type').val());
            // this.startMarquee(22, 22, 3000);

            // 刷新页面后获取容器高度，解决IOS设备刷新时出现空白页问题
            $('.mui-inner-wrap').height();
            /* 关闭浮窗广告 */
            mui(".ads-slider").on("tap",".close-ads",function(){
                $(".ads-slider").hide();
            });
            mui(".ads-slider").on("tap",".float_idx",function () {
                var activityId = $(this).attr("objectId");
                if(activityId){
                    _this.promoJs.canShowLottery(activityId);
                }
            })
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
            $('#mui-nav').find('a').removeClass('mui-active');
            $('#mui-nav').find('a.ico' + $('#nav-type').val()).addClass('mui-active');

            mui('#mui-nav').on('tap', 'a[data-id]', function () {
                var id = $(this).data('id');
                _this.gotoUrl(root + '/game.html?typeId=' + id);
            });

            if (_this.os == 'ios') {
                var hasShown = localStorage.getItem('DESK_TIP');
                if (!hasShown || hasShown == 'no') {
                    var win = $(window).height();
                    $('div.desk').css({'top': win - 120}).slideDown();
                    localStorage.setItem('DESK_TIP', 'yes');
                    mui('.desk').on('tap', '.close', function () {
                        $(this).parent().slideUp();
                    })
                }
            }

            mui('body').on('tap', 'a[data-terminal]', function () {
                var terminal = $(this).data('terminal');
                if (terminal === 'pc') {
                    document.cookie = "ACCESS_TERMINAL=pc;expires=0";
                    window.location.replace(root + '/');
                }
            });
            //苹果safari浏览器首页的底部导航栏,首页和我的图标不显示问题
            $(window).bind("pageshow", function () {
                if (isload && _this.os == 'ios') {
                    $("#footer_index").addClass("mui-active");
                    $("[id!='footer_index'][id*='footer_']").removeClass("mui-active");
                }
                isload = true;
            });
            //显示活动详情
            $("body").on("tap", ".activity-a", function () {
                _this.gotoUrl("/promo/promoDetail.html?search.id=" + $(this).data("id"));
            });
            $('.gb-fullpage').on('tap', '._more', function () {
                _this.gotoUrl($(this).attr('_href'));
            })
        },

        changeTab: function (id) {
            var _this = this;
            if (id < 5) {
                _this.showLoading(214);
                _this.getGameByApiId(id);
            } else if (id >= 5 && id < 9) {   // 代理,关于,条款
                _this.loadOther(id);
            }
        },

        getGameByApiId: function (id) {
            var _this = this;
            mui.ajax(root + '/game/getGame.html', {
                type: 'GET',
                data: {'apiType': id},
                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                dataType: 'text/html',
                success: function (data) {
                    setTimeout(function () {
                        $('div#container' + id).html(data);
                        if (id == 1) {
                            window.top.page.live.onPageLoad();
                        } else if (id == 2) {
                            window.top.page.casino.onPageLoad();
                        } else if (id == 3) {
                            window.top.page.sport.onPageLoad();
                        } else if (id == 4) {
                            window.top.page.lottery.onPageLoad();
                        }
                        mui('.mui-slider').slider();
                    }, 1000);
                },
                complete: function () {
                    // 进入游戏
                    window.top.page.apiLogin.enterGame();
                    if (id == 1 || id == 3) {
                        _this.hideLoading();
                    }
                }
            })
        },

        /** 刷新数据 */
        refreshData: function () {
            var id = $('#nav-type').val();
            if (id < 5) {
                window.location.replace(root + '/index.html?typeId=' + id);
            } else if (id == 5) {   // 优惠
                page.loadOther(id);
            } else if (id > 5 && id < 9) {   // 关于,条款
                page.loadOther(id);
            } else {
                window.location.replace('/mainIndex.html');
            }
        },
        
        getActivity: function () {
            mui.ajax(root + '/promo/promo.html', {
                type: 'POST',
                data: {'isTwoCount': true},
                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                success: function (data) {
                    $('#activity-content').html(data);
                }
            })
        },

        getHotGames: function () {
            mui.ajax(root + '/game/hotGames.html', {
                type: 'GET',
                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                success: function (data) {
                    $('div._hot_games').html(data);
                }
            });
        },

        tableScroll: function (value) {
            var $table = $(value).parent().find("table");
            for (var i = 0; i <= $table.size(); i++) {
                if (!($($table.get(i)).parent().attr("class") == 'mui-scroll')) {
                    //给表格添加横向滚动
                    $($table.get(i)).wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control " +
                        "mui-segmented-control-inverted'> " +
                        "<div class='mui-scroll'></div></div>");
                    mui(".scroll2").scroll();

                    var scrollHeight = $($table.get(i)).height();
                    $($table.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
                }
            }
        },

        loadBanner: function () {
            var _this = this;
            mui.ajax(root + '/index/getBanner.html', {
                type: 'GET',
                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                beforeSend: function () {
                    var height = store('c_banner_height');
                    if (typeof height == 'undefined') {
                        height = '100px';
                    }
                    _this.loadingShow('white', '._banner', height);
                },
                success: function (data) {
                    setTimeout(function() {
                        $('div._banner').html(data);
                        _this.initBanner();
                        setTimeout(function() {
                            var h = $('.c_banner')[0].height + 50 + "px";
                            if (store.has('c_banner_height')) {
                                store.remove('c_banner_height');
                            }
                            store('c_banner_height', h);
                        }, 1000)
                    }, 1100);
                }
            })
        },

        loadApi: function () {
            mui.ajax(root + '/index/getApiType.html', {
                type: 'GET',
                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                success: function (data) {
                    $('div._apiType').html(data);
                }
            })
        }
    });
});