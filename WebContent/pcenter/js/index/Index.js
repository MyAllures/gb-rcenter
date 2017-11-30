/**
 * Created by jeff on 16-1-5.
 */
define([], function () {

    return Class.extend({
        hasClick:false,
        init: function () {
            //设置时区
            window.top.topPage.ajax({
                url: root + "/index/needSetTimezone.html",
                dataType: "JSON",
                success: function (data) {
                    if (data) {
                        window.top.topPage.doDialog({}, {
                            text: window.top.message.index_auto['消息'],
                            closable: 'false',
                            target: root + "/index/setTimezone.html"
                        })
                    }
                }
            });

            this.loadPlayerInfo();
            this.loadPlayerMessage();
            this.hideBrowserTip();


            //玩家首页-顶部左侧-语言
            $(".select-lang p").click(function () {
                var ul = $(".select-lang ul");
                if (ul.css("display") == "none") {
                    ul.slideDown("fast");
                } else {
                    ul.slideUp("fast");
                }
            });
            $(".select-lang ul li a").click(function () {
                var txt = $(this).text();
                var value = $(this).attr("rel");
                $(".select-lang p").html("<span class='flag " + value + "'></span>" + txt);
                $(".select-lang ul").hide();
            });
            this.syncUserTime();
            this.bindEvent();
            this.checkBrowser();
            this.onPageLoad();
            if(isLotterySite){
                this.initBackgroundBlur();
            }
        },

        initBackgroundBlur:function () {
            var $avatarEl = $('.banner');
            var $avatarHolderEl = $('.banner-bg');
            var images = [];
            var avatars = [];

            // Avatar - based backgrounds
            $avatarEl.each(function(){
                var $avatar = $(this);
                var avatarImage = $avatar.find('img').first().attr('src');
                avatars.push(avatarImage);
                $avatar.click(function(e){
                    e.preventDefault();

                    $avatarHolderEl.backgroundBlur(avatarImage);
                });
            });

            $avatarHolderEl.backgroundBlur({
                imageURL : avatars[0], // URL to the image that will be used for blurring
                blurAmount : 10, // Amount of blur (higher amount degrades browser performance)
                imageClass : 'avatar-blur' // CSS class that will be applied to the image and to the SVG element,
            });
        },
        bindEvent: function () {
            var _this = this;
            $("#moquu_wxin").on("click","a",function(){
                window.top.personalInfomation.viewRealName();
            });
            $("#moquu_wshare").on("click","a",function(){
                _this.moreMessage();
            });
            $("#moquu_wmaps").on("click","a",function(){
                _this.accountSetting();
            });
            $(document).on('mouseover', '.menu-hd', function(){
                //控制查询间隔在3s
                var time = $('em.astrict').attr("time");
                if($('em.astrict').text && time && (new Date().getTime()-time) <= 3000) {
                    return;
                } else {
                    $('em.astrict').attr("time", new Date().getTime());
                    window.top.topPage.ajax({
                        url:root + '/index/queryAssets.html',
                        dataType:"json",
                        success:function(data){
                            $('em.astrict').html(_this.formatCurrency(data.totalAssets));
                        }
                    })
                }
            });
        },
        formatCurrency: function(num) {
            num = num.toString().replace(/\$|\,/g,'');
            if(isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num*100+0.50000000001);
            cents = num%100;
            num = Math.floor(num/100).toString();
            if(cents<10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                num = num.substring(0,num.length-(4*i+3))+','+
                    num.substring(num.length-(4*i+3));
            return (((sign)?'':'-') + num + '.' + cents);
        },
        onPageLoad: function () {
            this.loadWithdraw();
        },
        loadPlayerInfo:function(){
            var _this = this;
            window.top.topPage.ajax({
                url:root +"/playerInfo.html?t=" + new Date().getTime(),
                type:"GET",
                success:function(data){
                    $("#site-nav").html(data);
                    //账户设置
                    $("div.global-account-head").on("click", "a.accountSet", function () {
                        _this.accountSetting();
                    });
                    //交易记录
                    $("div.global-account-head").on("click", "a.transactionRecords", function () {
                        _this.transactionRecord();
                    });
                    //转账
                    $("div.global-account-money").on("click", "a[name=transfer]", function () {
                        _this.transfer();
                    });
                    //存款
                    $("div.global-account-money").on("click", "a[name=recharge]", function () {
                        //防击多次点击
                        if(!_this.hasClick){
                            _this.recharge();
                            _this.hasClick = true;
                            setTimeout(function () {
                                _this.hasClick = false;
                            },1000);
                        }
                    });
                    //取款
                    $("div.global-account-money").on("click", "a[name=withdraws]", function () {
                        //防击多次点击
                        if(!_this.hasClick){
                            _this.withdraw();
                            _this.hasClick = true;
                            setTimeout(function () {
                                _this.hasClick = false;
                            },1000);
                        }

                    });
                    //显示余额
                    $("div.global-account-money").on("click", "a.show-remaining", function () {
                        $(this).toggle();
                        $(this).next().removeClass("hide-astrict");
                    });
                    //隐藏余额
                    $("div.global-account-money").on("click", "i.showsmall", function () {
                        $(this).parent().addClass("hide-astrict");
                        $(this).parent().prev().toggle();
                    });
                }
            })
        },
        loadPlayerMessage : function(){
            var _this = this;
            window.top.topPage.ajax({
                url:root +"/playerMessage.html?t=" + new Date().getTime(),
                type:"GET",
                success:function(data){
                    $("#playerUnread").html(data);
                    //玩家首页-顶部右侧-新消息
                    $(".info-down-btn").click(function () {
                        _this.moreMessage();
                    });
                 /*   //更多信息
                    $(".info-down-btn").on("click", "a.moreMessage", function () {
                        _this.moreMessage();
                    });*/
                }
            })
        },
        /**
         * 根据用户的时区时间变化页面时间
         */
        userTime: function () {
            var _this = this;
            if (_this.dateTimeFromat != undefined) {
                var date = new Date();
                //date.setTime(parseInt($(".clock-show").attr("time")) + 1000);
                //$(".clock-show").attr("time", date.getTime());
                //var date$go = new Date('2015-08-31')
                $(".clock-show").text(window.top.topPage.formatToMyDateTime(date, _this.dateTimeFromat));
            }
        },
        /**
         * 与服务器同步用用户时间，修正误差
         */
        syncUserTime: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/index/getUserTimeZoneDate.html',
                dataType: "json",
                success: function (data) {
                    _this.dateTimeFromat = data.dateTimeFromat;
                    $(".clock-show").text(data.dateTime);
                    $(".clock-show").attr("time", data.time);
                    $(".clock-show").css("display", "inline");
                    //$(".nav-shadow .clock-show label").text(data.dateTime);
                    window.setTimeout(function () {
                        _this.syncUserTime();
                    }, 360000);
                    if (_this.timeInterval != null) {
                        window.clearInterval(_this.timeInterval);
                    }
                    _this.timeInterval = window.setInterval(function () {
                        _this.userTime();
                    }, 1000);
                }
            });
        },
        /**
         * 更多消息
         */
        moreMessage: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
            $current.parent().addClass("select");
            $("#mainFrame").load(root + "/operation/pAnnouncementMessage/messageList.html");
        },
        /**
         * 跳转至账户设置
         */
        accountSetting: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        /**
         * 跳转至交易记录
         */
        transactionRecord: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/gameOrder/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        /**
         * 跳转至转账
         */
        transfer: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/playerTransfer/transfers.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        /**
         * 跳转至存款
         */
        recharge: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        /**
         * 跳转至取款
         */
        withdraw: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/player/withdraw/withdrawList.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },

        checkBrowser:function(){
            var Sys = {};
            var s;
            var ua = navigator.userAgent.toLowerCase();
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
                (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
                    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :0;
                if(! Sys.chrome ){
                    this.showBrowserTip();
                    return;
                }
        },
        showBrowserTip: function(){
            var bol = $.cookie(this.cookieKey);
            if(bol !== 'true' && $("div.hint-box").length>0){
                $('div.top-wrap').css({"margin-top":"40px"});
                $("div.hint-box").slideDown('fast');
            }
        },
        hideBrowserTip: function(){
            $('a.close').on('click', function(){
                $("div.hint-box").slideUp('fast');
                $('div.top-wrap').css({"margin-top": "0"});
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
        }
    });
});