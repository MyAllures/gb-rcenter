define(['site/common/BasePage', 'nicescroll'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.initModule();
            this.initWindow();
            this.initMenu();
            this.bindButtonEvents();
        },

        initModule: function () {
            $('.alert_col h5 i').click(function () {
                $('.alert').hide();
            });

            newRoll(".top .news ul li");

            var module = '';
            var navIndex = '';
            var nums = '';
            var caizhong = '';
            var type = '';
            var money = '';
            var lotteryType = sessionStorage.lottery_type;
            var lotteryCode = sessionStorage.lottery_code;
            if(lotteryType && lotteryType != 'undefined' && lotteryCode && lotteryCode != 'undefined' ){
                var url = '/' + lotteryType + '/' + lotteryCode + '/index.html';
                sessionStorage.removeItem("lottery_type");
                sessionStorage.removeItem("lottery_code");
                this.getPage(url);
            }else if (typeof module == 'undefined' || module == 'null' || !module || module == '') {
                module = '/hall/lottery';
                this.getPage(module + '.html');
            } else if (module == 'zst') {
                module = 'zst/cqssc';
                this.getPage('./ssc/' + module + '.html');
            } else if (module == 'zstType') {
                this.getPage('./ssc/zst/.html?type=');
            } else if (module == 'zstIndex') {
                this.getPage('./ssc/zst/index.html');
            } else if (module == 'xyxh') {
                this.getPage('./ssc/gcdt/' + caizhong + '.html?navIndex=' + navIndex + '&nums=' + nums + '&money=' + money);
            } else if (module == 'xyxh_shou') {
                this.getPage('./ssc/gcdt/' + caizhong + '.html?navIndex=' + navIndex);
            } else {
                this.getPage('./ssc/' + module + '.html');
            }
        },
        initWindow: function () {
            var _this = this;
            $(window).resize(function () {
                _this.resize(false);
            });
        },
        initMenu: function () {
            this.resize();
            $(".menu_left").niceScroll({
                cursorcolor: "#3f3f3f",
                cursoropacitymax: 1,
                touchbehavior: false,
                cursorwidth: "0px",
                cursorborder: "0",
                cursorborderradius: "0px",
                autohidemode: false
            });
        },
        bindButtonEvents: function () {
            var _this = this;
            $(".menu_left .list_menu ul li.show h2").click(function () {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    $(this).parent().find('.down').slideUp();
                    $(this).find("i").removeClass("show");
                    return;
                }

                $(".menu_left .list_menu ul li.show h2.open i.show").removeClass("show");
                $(".menu_left .list_menu ul li.show h2.open").parent().find(".down").slideUp();
                $(".menu_left .list_menu ul li.show h2.open").removeClass("open");

                $(this).addClass("open");
                $(this).find("i").addClass("show");
                $(this).parent().find('.down').slideDown();
            });


            $(".con_right .arrows-btn a").click(function () {
                if ($(this).attr("opent") == "1") {
                    var winWidth = $(window).width();
                    var leftWidth, rightWidth;
                    leftWidth = 250;
                    rightWidth = winWidth - leftWidth;
                    if (rightWidth < 1000) {
                        rightWidth = 1000;
                    }
                    _this.maxLeftMenu(leftWidth, true);
                    _this.rightResize(rightWidth, true);
                    $(this).attr("opent", "0");
                    _this.bodyResize(leftWidth, rightWidth);
                } else {
                    var winWidth = $(window).width();
                    var leftWidth, rightWidth;
                    leftWidth = 40;
                    rightWidth = winWidth - leftWidth;
                    if (rightWidth < 1000) {
                        rightWidth = 1000;
                    }
                    _this.minLeftMenu(leftWidth, true);
                    _this.rightResize(rightWidth, true);
                    $(this).attr("opent", "1");
                }
            });
            $(".menu_left div.playWay a[data-playway]").on("click", function () {
                _this.getPlay($(this).data("playway"))
            });
            $(".menu_left .list_menu a[data-url]").on("click", function () {
                _this.getPage($(this).data("url"));
            });
            $("#refreshMoney").click(function () {
                _this.refreshPlayer();
            });
            $(".Account a[data-url]").on("click", function () {
                _this.getPage($(this).attr("data-url"));
            });
        },
        refreshPlayer:function(){
            ajaxRequest({
                url: root + '/hall/getAccountAndBalance.html',
                success: function (data) {
                    $(".con_right font#money").text(data.balance);
                    $(".con_right i#player-account").text(data.account);
                },
                error: function (e) {
                    console.log("error");
                }
            });
        },
        getSscPage: function (url) {
            this.getPage("/ssc/" + url + "/index.html");
        },
        getZstPage: function (url) {
            this.getPage("./zst/index.html");
        }
    })
});

