define(['common/MobileBasePage'], function (Mobile) {
    var t;
    return Mobile.extend({
        init: function (formSelector) {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            t = this;
            mui(".mui-scroll-wrapper").scroll();
            //给表格添加横向滚动
            t.tableScroll();
            // t.setImgWidth();
            // mui.init({});
            // mui(".scroll2").scroll();
            if (isLogin && isLogin === "true") {
                var $submit = $(".submit");
                var code = $submit.data("code");
                if (code === 'content') {
                    $submit.text(window.top.message.promo_auto['立即加入']);
                    $submit.on("tap", function () {
                        t.gotoUrl("/message/gameNotice.html?isSendMessage=true");
                    })
                } else if (code === 'back_water') {
                    $submit.text(window.top.message.promo_auto['参与中']);
                    $submit.attr("disabled", "disabled");
                } else {
                    if (code === 'money') {
                        $submit.text(window.top.message.promo_auto['抢红包']);
                    }
                    $submit.on("tap", function () {
                        t.joinPromo(this);
                    });
                }
                t.changeApplyStatus();
            } else {
                $("body").on("tap", "button.submit", function () {
                    t.toLogin("/game.html?typeId=5");
                });
            }
            // if (submit.data("states") == "processing" || submit.data("code") == "back_water") {
            //     submit.text(window.top.message.promo_auto['参与中']);
            // }
            t.promoCheck();
            
            mui('body').on('tap', 'a', function () {
                var href = $(this).attr('href');
                t.gotoUrl(href);
            })
        },
        bindEvent: function () {
            this._super();
            /*window.onresize = function () {
                t.setImgWidth();
            };*/
            mui("body").on("tap", "[data-href]", function () {
                var href = $(this).data("href");
                t.gotoUrl(href);
            });
            var ad = $("[name='activityDetail']");
            var ad_length = ad.find("a").length;
            if (ad_length > 0) {
                mui(ad).on("tap", "a", function (e) {
                    if(t.os=="app_android")
                        t.gotoUrl($(this).attr("href"));
                    else
                        window.open($(this).attr("href"), "_blank");
                })
            }
        },
        setImgWidth: function () {
            var width = window.outerWidth;
            var img = $("img");
            for (var i = 0; i < img.size(); i++) {
                if (img[i].width >= width - 20)
                    img[i].setAttribute("style", "width:100%");
            }
            var tables = $(".scroll2 table");
            for (var i = 0; i < tables.size(); i++) {
                var scrollHeight = $(tables.get(i)).height();
                $(tables.get(i)).parent().parent().css("height", scrollHeight + 2+"px");
            }
        },
        tableScroll: function (value) {
            var $table = $("table");
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
        changeApplyStatus: function () {
            mui.ajax({
                url: "/promo/getPlayerActivityIds.html",
                type: "POST",
                dataType: "json",
                success: function (data) {
                    t.filterActyByPlayer(data);
                },
                error: function () {

                }
            });
        },
        promoCheck: function () {
            var nowTime = new Date($("._now_time").attr("value")).getTime();
            var $obj = $("button.submit");
                var st = $obj.parent().parent().find("._vr_promo_ostart").attr("value");

                var et = $obj.parent().parent().find("._vr_promo_oend").attr("value");
                var sTime = new Date(st).getTime();
                var eTime = new Date(et).getTime();

                if (nowTime < sTime) {
                    //未开始
                    $obj.text(window.top.message.promo_auto['未开始']);
                } else if (nowTime > sTime && nowTime < eTime) {
                    var code = $obj.data("code");
                    //进行中
                    if (code === 'money') {
                        $(".submit").text(window.top.message.promo_auto['抢红包']);
                    } else if(code !== "back_water") {
                        $obj.text(window.top.message.promo_auto['立即加入']);
                    }
                } else if (nowTime > eTime) {
                    //已结束
                    var oldClass = $obj.data("oldClass");
                    var newClass = $obj.data("newClass");
                    $obj.removeClass(typeof oldClass == "undefined" ? "" : oldClass).addClass(typeof newClass == "undefined" ? "" : newClass).attr("onclick", "").text(window.top.message.promo_auto['已结束']);
                    // $("._vr_promo_overparent").append($this);
                }
        },
        filterActyByPlayer: function (data) {
            var $obj = $("button.submit");
            var startTimeObj = $obj.parent().parent().find("._vr_promo_ostart");
            var flag = new Date(startTimeObj.attr("value")) < new Date();
            var oldClass = $obj.data("oldClass");
            oldClass = typeof oldClass == "undefined" ? "" : oldClass;
            var newClass = $obj.data("newClass");
            newClass = typeof newClass == "undefined" ? "" : newClass;
            if (($obj.data("code") == "first_deposit" || $obj.data("code") == "deposit_send") && flag) {
                if (data.length < 1) {
                    if ($obj.data("rankid") === "all") {
                        $obj.removeClass(oldClass).addClass(newClass + " mui-disabled").text(window.top.message.promo_auto['存款时申请']);
                    } else {
                        $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
                    }
                } else {
                    var isContain = false;
                    for (var j = 0; j < data.length; j++) {
                        if ($("obj").data("searchid") === data[j]) {
                            isContain = true;
                        }
                    }
                    if (isContain || $obj.data("rankid") === "all") {
                        $obj.removeClass(oldClass).addClass(newClass + " mui-disabled").text(window.top.message.promo_auto['存款时申请']);
                    } else {
                        $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
                    }
                }
            }
            if ($obj.data("code") == "regist_send" || $obj.data("code") == "relief_fund" || $obj.data("code") == "profit_loss" || $obj.data("code") == "effective_transaction") {
                if (data.length < 1) {
                    if ($obj.data("rankid") != "all" && flag) {
                        $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
                    }
                }
                if (data.length > 0 && $obj.data("rankid") != "all" && flag) {
                    var isContain = false;
                    for (var j = 0; j < data.length; j++) {
                        if ($obj.data("searchid") === data[j]) {
                            isContain = true;
                        }
                    }
                    if (!isContain) {
                        $obj.removeClass(oldClass).addClass(newClass + " mui-disabled notfit").text(window.top.message.promo_auto['未满足条件']);
                    }
                }
            }
        },
        joinPromo: function (aplyObj, isRefresh) {
            // t.toast(window.top.message.promo_auto['请在电脑版上申请活动']);
            $(aplyObj).attr("disabled", "disabled");
            var nowTime = new Date($("._now_time").attr("value")).getTime();
            var st = new Date($(aplyObj).parent().parent().find("._vr_promo_ostart").attr("value")).getTime();
            var et = new Date($(aplyObj).parent().parent().find("._vr_promo_oend").attr("value")).getTime();
            if (st > nowTime || et < nowTime) {
                return false;
            }

            var code = $(aplyObj).data("code");
            if (code == "back_water" || code == "first_deposit" || code == "deposit_send") {
                if (isRefresh) {
                    mui("body").alert({
                        title: window.top.message.promo_auto['提示'],
                        message: window.top.message.promo_auto['参与中'],
                        callback: function () {
                            window.location.reload();
                        }
                    });
                }
                return false;
            } else {
                if (isRefresh) {
                    t.applyActivities(aplyObj, true);
                } else {
                    if(code === 'money') {
                        var searchId = $(aplyObj).data("searchid");
                        t.canShowLottery(searchId);
                        $(aplyObj).removeAttr("disabled");
                    }else{
                        t.applyActivities(aplyObj);
                    }
                }
            }

        },
        applyActivities: function (aplyObj, isRefresh) {
            var _this = this;
            var code = $(aplyObj).data("code");
            var searchId = $(aplyObj).data("searchid");
            mui.ajax({
                url: "/promo/applyActivities.html",
                type: "POST",
                dataType: "json",
                data: {
                    code: code,
                    resultId: searchId
                },
                success: function (data) {
                    t.showWin(data, isRefresh);
                    $(aplyObj).removeAttr("disabled");
                },
                error : function (xhr) {
                    _this.toast(window.top.message.promo_auto['申请失败']);
                    $(aplyObj).removeAttr("disabled");
                }
            })
        },
        showWin: function (data, isRefresh) {
            if (typeof data.state == "undefined") {
                return false;
            }
            var title;
            if (data.state) {
                title = window.top.message.promo_auto['申请成功'];
            } else {
                title = window.top.message.promo_auto['申请失败'];
            }

            layer.open({
                title: title,
                content: data.msg,
                btn: [window.top.message.promo_auto['查看优惠记录'], window.top.message.promo_auto['好的']],
                yes: function() {
                    t.gotoUrl("/promo/myPromo.html");
                },
                no: function () {
                    window.location.reload();
                }
            });
        },

        /** 抢红包 */
        canShowLottery: function(id){
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

                    }
                }
            });
        }

    })
});