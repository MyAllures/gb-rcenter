define(['moment'], function (moment) {
    return Class.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {

        },
        // 在线客服
        blinkColorArr: "#fa6200|#0f3f94".split("|"),
        initBlink: function () {
            var _this = this;
            $(".blink").each(function () {
                var obj = $(this);
                setInterval(function () {
                    var tmpColor = _this.blinkColorArr[parseInt(Math.random() * blinkColorArr.length)];
                    $(obj).css("color", tmpColor);
                }, 200);
            });
        },
        showLoading: function () {
            if ($('div.loader', document).length == 0) {
                var src = resRoot + '/images/tail-spin.svg';
                var content = '<div class="loader"><img src="' + src + '" width="30"><span>载入中...</span></div>';
                $('body',document).append(content);
            }
        },
        /**
         * 关闭加载中效果
         */
        hideLoading: function () {
            if ($('div.loader', document).length != 0) {
                $("div.loader", document).remove();
            }if ($('div.loader', parent.document).length != 0) {
                $("div.loader", parent.document).remove();
            }
        },
        getPage: function (url) {
            this.showLoading();
            $("#rightContent").attr("src", root + url);
        },
        getPlay: function (type) {
            this.showLoading();
            $("#rightContent").attr("src", root + "/hall/" + type + ".html");
        },
        autoHeight: function () {
            var rightContentHeight = $(window).height() - 80;
            $("#rightContent").css("height", rightContentHeight + "px");
            var leftContentHeight = $(window).height();
            $(".menu_left").css("height", leftContentHeight + "px");
        },
        bodyResize: function (leftWidth, rightWidth) {
            $("body").css("width", leftWidth + rightWidth + "px");
        },
        resize: function (isAnimate) {
            this.autoHeight();
            var winWidth = $(window).width();
            var leftWidth, rightWidth;
            if ($(window).width() < 1250) {
                leftWidth = 40;
                rightWidth = winWidth - leftWidth;
            } else {
                leftWidth = 250;
                rightWidth = winWidth - leftWidth;
            }
            if (rightWidth < 1000) {
                rightWidth = 1000;
            }
            this.bodyResize(leftWidth, rightWidth);
            if (leftWidth <= 40) {
                this.minLeftMenu(leftWidth, isAnimate);
            } else {
                this.maxLeftMenu(leftWidth, isAnimate);
            }
            this.rightResize(rightWidth, isAnimate);
        },
        rightResize: function (rightWidth, isAnimate) {
            if (rightWidth < 1000) {
                rightWidth = 1000;
                isAnimate = false;
            }
            if (isAnimate) {
                $(".con_right, #rightContent, .con_right .top, .con_right .Account")
                    .animate({"width": rightWidth + "px"}, 400, function () {
                    });
            } else {
                $(".con_right, #rightContent, .con_right .top, .con_right .Account").css("width", rightWidth + "px");
            }
        },
        minLeftMenu: function (leftWidth, isAnimate) {
            $(".menu_left .list_menu ul li a.Refresh").hide();
            $(".menu_left").addClass("add_menu");
            $(".con_right .arrows-btn").addClass("add_menu");
            if (isAnimate) {
                $(".menu_left").animate({"width": leftWidth + "px"}, 400, function () {
                });
            } else {
                $(".menu_left").css("width", leftWidth + "px");
            }
            $(".con_right .arrows-btn a").attr("opent", "1");
        },
        maxLeftMenu: function (leftWidth, isAnimate) {
            if (isAnimate) {
                $(".menu_left").animate({"width": leftWidth + "px"}, 400, function () {
                    $(".con_right .arrows-btn").removeClass("add_menu");
                    $(".menu_left").removeClass("add_menu");
                    $(".menu_left .list_menu ul li a.Refresh").show();
                });
            } else {
                $(".menu_left").css("width", leftWidth + "px");
                $(".con_right .arrows-btn").removeClass("add_menu");
                $(".menu_left").removeClass("add_menu");
                $(".menu_left .list_menu ul li a.Refresh").show();
            }
            $(".con_right .arrows-btn a").attr("opent", "0");
        }
    })
});

