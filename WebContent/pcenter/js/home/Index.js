/**
 * 管理首页-首页js
 */
define(['common/BasePage', 'tooltips', 'Util'], function (BasePage) {
    return BasePage.extend({

        init: function () {
            this.formSelector = "div[name=homeIndex]";
            this._super();
            $('[data-toggle="tooltip"]').tooltip();
            //加载资金概况
            this.loadAssets();
            this.loadCarousel();
            this.loadGameAnnouncement();
            this.loadActivityMessage();
            //刷新页面时判断是否有待处理的取款记录
            // 该判断移到了index/index.js中了 by younger
            //this.loadWithdraw();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //显示隐藏刷新按钮
            $(this.formSelector).on("mouseenter", ".game", function (e) {
                var isHide = $('[name=isHide]').val();
                if (isHide == 0) {
                    $(this).find(".refreshApi").show();
                    $(this).find(".hs-ico").hide();
                }
            });

            $(this.formSelector).on("mouseleave", ".game", function (e) {
                var isHide = $('[name=isHide]').val();
                if (isHide == 0) {
                    $(this).find(".refreshApi").hide();
                    $(this).find(".hs-ico").show();
                }
            });

            //显示或者隐藏余额
            $(this.formSelector).on("click", "div.moneyhide", function (e) {
                _this.moneyToggle(e);
            });

            this._hour();//问候语显示
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },
        /**
         * 问候语显示
         * @private
         */
        _hour: function () {
            var _hours = new Date().getHours();
            if (_hours >= 0 && _hours < 6) {
                $("#_hours").text(window.top.message.home_auto['凌晨好']);
            } else if (_hours >= 6 && _hours < 12) {
                $("#_hours").text(window.top.message.home_auto['上午好']);
            } else if (_hours == 12) {
                $("#_hours").text(window.top.message.home_auto['中午好']);
            } else if (_hours > 12 && _hours < 18) {
                $("#_hours").text(window.top.message.home_auto['下午好']);
            } else {
                $("#_hours").text(window.top.message.home_auto['晚上好']);
            }
        },
        /**
         * 隐藏/显示余额
         * @param e
         *
         */
        moneyToggle: function (e) {
            $(this.formSelector + " .home-money").toggle();
            $(this.formSelector + " span.hide-assets").toggle();
            if ($(e.currentTarget).children("i").hasClass("show")) {
                $(e.currentTarget).children("i").removeClass("show");
                $(e.currentTarget).children("i").addClass("hide");
                $(e.currentTarget).children("span").text(window.top.message.home_auto['余额显示']);
                $('span[name=totalRefresh]').hide();
                $('[name=isHide]').val(1);
            } else {
                $(e.currentTarget).children("i").removeClass("hide");
                $(e.currentTarget).children("i").addClass("show");
                $(e.currentTarget).children("span").text(window.top.message.home_auto['余额隐藏']);
                $('span[name=totalRefresh]').show();
                $('[name=isHide]').val(0);
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 刷新
         * @param e
         * @param option
         */
        refresh: function (e, option) {
            this.loading(e, option);
            var type = option.type;
            var apiId = option.apiId;
            var _this = this;
            var url;
            if (apiId != null) {
                url = root + "/home/refresh.html?type=" + type + "&search.apiId=" + apiId + "&t=" + new Date().getTime();
            } else {
                url = root + "/home/refresh.html?type=" + type + "&t=" + new Date().getTime();
            }
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    _this.refreshAfter(_this, data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            })
        },
        loadAssets: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/refresh.html?type=all&t=" + new Date().getTime(),
                success: function (data) {
                    _this.refreshAfter(_this, data);
                }
            });
        },
        loadCarousel: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadCarousel.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.carousel").html(data);
                    _this.onInitScrollPic();
                }
            });
        },
        loadGameAnnouncement: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadGameAnnouncement.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.gameAnnouncement").html(data);
                    _this.moreGameAnnouncement();
                }
            });
        },
        loadActivityMessage: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadActivityMessage.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.activityMessage").html(data);
                    _this.moreActivityMessage();
                }
            });
        },
        loadWithdraw:function(){
            window.top.topPage.ajax({
                type: "get",
                url: root + "/player/withdraw/searchPlayerWithdraw.html",
                dataType: "json",
                success: function (data) {
                    if (data.state) {
                        var withdrawId = $.parseJSON(data.withdrawId);
                        //稽核不通过,确认是否继续取款
                        var btnOption = {};
                        btnOption.closable = false;
                        btnOption.target = root + "/player/withdraw/masterWithdrawFailDialog.html?withdrawId=" + withdrawId;
                        btnOption.text = window.top.message.fund['withdrawForm.pleaseWithdraw'];
                        btnOption.callback = function (e, opt) {
                            window.location.reload();
                        };
                        window.top.topPage.doDialog({}, btnOption);
                    }
                }
            });
        },
        /**
         * 链接到转账
         */
        linkTransfers: function () {
            $("#mainFrame").load(root + "/fund/playerTransfer/transfers.html");
            $(".sidebar-nav .select").removeClass("select");
            $(".sidebar-nav dl dd").attr("style", "display:none");
            $(".sidebar-nav a[data^='/fund/playerTransfer/transfers.html']").parent().prev().addClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/playerTransfer/transfers.html']").parent();
            $current.attr("style", "display:block").addClass("select");
            $current.siblings().attr("style", "display:block");
        },
        /**
         * 链接到存款
         */
        linkRecharge: function () {
            $("#mainFrame").load(root + "/fund/playerRecharge/recharge.html");
            $(".sidebar-nav .select").removeClass("select");
            $(".sidebar-nav dl dd").attr("style", "display:none");
            $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']").parent().prev().prev().addClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']").parent();
            $current.attr("style", "display:block").addClass("select");
            $current.siblings().attr("style", "display:block");
        },
        /**
         * 链接到取款
         */
        linkWithdraw: function () {
            $("#mainFrame").load(root + "/player/withdraw/withdrawList.html");
            $(".sidebar-nav .select").removeClass("select");
            $(".sidebar-nav dl dd").attr("style", "display:none");
            $(".sidebar-nav a[data^='/player/withdraw/withdrawList.html']").parent().prev().prev().prev().addClass("select");
            var $current = $(".sidebar-nav a[data^='/player/withdraw/withdrawList.html']").parent();
            $current.attr("style", "display:block").addClass("select");
            $current.siblings().attr("style", "display:block");
        },
        /**
         * 刷新资金
         * @param _this
         * @param data
         */
        refreshAfter: function (_this, data) {
            $(_this.formSelector + " div.account").html(data);
            //钱包
            $(_this.formSelector + " div.m-loading-icon").hide();
            $(_this.formSelector + " span.wallet-money").show();
            //取款金额
            $(_this.formSelector + " div.g-loading-icon-x").hide();
            $(_this.formSelector + " span.withdraw-money").show();
            //转账金额
            $(_this.formSelector + " div.transfer-loading").hide();
            $(_this.formSelector + " span.transfer-money").show();
            //api
            var $apis = $(_this.formSelector + " div.balance-right").find("div.game");
            var len = $apis.length;
            var i = 0;
            for (i = 0; i < len; i++) {
                if (i % 2 == 0 && $apis[i].className != 'game hg') {
                    $($apis[i]).hide();
                } else {
                    $($apis[i]).show();
                }
            }
            //资金
            $(_this.formSelector + " div.m-loading-icon-x").hide();
            $(_this.formSelector + " em.total-money").show();
            $(this.formSelector + " span[name=totalRefresh]").show();
        },
        gameDetail: function (e, option) {
            var url = option.url;
            $("#mainFrame").load(url);
            $(".sidebar-nav .select").removeClass("select");
            $(".sidebar-nav dl dd").attr("style", "display:none");
            $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']").parent().prev().prev().prev().addClass("select");
            var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']").parent();
            $current.attr("style", "display:block").addClass("select");
            $current.siblings().attr("style", "display:block");
        },
        /**
         * 加载中效果
         * @param e
         * @param option
         */
        loading: function (e, option) {
            var type = option.type;
            $(this.formSelector + " .total-money").hide();
            $(this.formSelector + " span[name=totalRefresh]").hide();
            $(this.formSelector + " div.m-loading-icon-x").show();
            if (type == 'api') {
                $(e.currentTarget).parent().hide();
                $(e.currentTarget).parent().prev(".loading-api").show();
            } else {
                $(this.formSelector + " .home-money").hide();
                $(this.formSelector + " .game").hide();
                $(this.formSelector + " div.m-loading-icon").show();
                $(this.formSelector + " div.g-loading-icon-x").show();
                $(this.formSelector + " .loading-api").show();
            }
        },

        /**
         * 刷新api
         * @param e
         * @param option
         */
        refreshApi: function (e, option) {
            var _this = this;
            var apiId = option.apiId;
            var url;
            if (apiId) {
                this.loading(e, option);
                url = root + "/fund/playerTransfer/refreshApi.html?type=" + option.type + "&search.apiId=" + apiId + "&t=" + new Date().getTime();
                if (option.isRefresh) {
                    url = url + "&isRefresh=" + option.isRefresh;
                }
                window.top.topPage.ajax({
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        if (data.totalAssets) {
                            $(_this.formSelector + " em.total-money").text(data.totalAssets);
                        }
                        $(_this.formSelector + " div.m-loading-icon-x").hide();
                        $(_this.formSelector + " .total-money").show();
                        $(_this.formSelector + " span[name=totalRefresh]").show();
                        if (data.apiMoney != null) {
                            $(e.currentTarget).parent().children(".game-right").find(".api-money").text(data.apiMoney);
                            $(e.currentTarget).attr("title", data.apiSynTime);
                        }
                        $(_this.formSelector + " .loading-api").hide();
                        $(e.currentTarget).parent().show();
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(_this.formSelector + " .loading-api").hide();
                        $(_this.formSelector + " .home-money").show();
                        $(e.currentTarget).unlock();
                    }
                })
            }
        },
        onInitScrollPic: function () {
            //图片列表切换 #poster
            var promotions = $(".poster-wrap");
            if(!promotions||promotions.length==0){
                return;
            }
            var scrollPic_01 = new ScrollPic();
            scrollPic_01.scrollContId = "poster"; //内容容器ID
            scrollPic_01.arrLeftId = "prev"; //左箭头ID
            scrollPic_01.arrRightId = "next"; //右箭头ID
            scrollPic_01.frameWidth = 890; //显示框宽度
            scrollPic_01.pageWidth = 294; //翻页宽度
            scrollPic_01.speed = 20; //移动速度(单位毫秒，越小越快)
            scrollPic_01.space = 20; //每次移动像素(单位px，越大越快)
            scrollPic_01.autoPlay = true; //自动播放
            scrollPic_01.autoPlayTime = 2; //自动播放间隔时间(秒)
            scrollPic_01.initialize(); //初始化
            //图片列表 Hover
            $('.poster li').hover(function() {
                $(".summary", this).stop().animate({
                    top: '90px'
                }, {
                    queue: false,
                    duration: 180
                });
            }, function() {
                $(".summary", this).stop().animate({
                    top: '132px'
                }, {
                    queue: false,
                    duration: 180
                });
            });
        },
        moreGameAnnouncement:function(){
            $(".gameMore").on("click", function (e) {
                $("#mainFrame").load(root + "/operation/pAnnouncementMessage/gameNotice.html");
                $(".sidebar-nav .select").removeClass("select");
                $(".sidebar-nav dl dd").attr("style", "display:none");
                $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']").parent().prev().prev().prev().addClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']").parent();
                $current.attr("style", "display:block").addClass("select");
                $current.siblings().attr("style", "display:block");
            });
        },
        /**
         * 链接到资金记录
         */
        linkTransaction: function () {
            $("#mainFrame").load(root + "/fund/transaction/list.html");
            $(".sidebar-nav .select").removeClass("select");
            $(".sidebar-nav dl dd").attr("style", "display:none");
            $(".sidebar-nav a[data^='/fund/transaction/list.html']").addClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/transaction/list.html']").parent();
            $current.attr("style", "display:block").addClass("select");
            $current.siblings().attr("style", "display:block");
        }
    });
})
;