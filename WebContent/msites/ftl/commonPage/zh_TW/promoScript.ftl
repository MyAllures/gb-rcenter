<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/zh_TW/msiteCommonScript/promoScript.ftl">-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery.countdown.js"></script>
<script>
    $(function () {
        ctime = 0;
        //活动类型为content的不显示申请按钮
        $("div [data-code=content] ._vr_promo_join").remove();

        //判断优惠活动是否显示历史优惠按钮
        if($("._vr_promo_check.historyActivitys").length>0){
            $(".hisActivityButton").removeClass("hide");
        }

        // 优惠手风琴
        $(".sidePromo dd").fadeOut(0);
        $(".sidePromo dt").click(function() {
            $(".sidePromo dd").not($(this).next()).slideUp('fast');
            $(this).next().slideToggle(400);
        });

        //我能参加的活动
        $(".getMyRankActivity").on("click", function () {
            getMyRankActivity();
            if (sessionStorage.is_login == "true") {
                $(this).parent().hide();
            }
        });
        //选择分类
        $(".changeType").change(function (e) {
            var val = $(e.target).val();
            var type = $(e.target).data("type");
            var commonSelector = "._vr_promo_check[data-type^='" + type + "']";
            var typeSelector = "." + val + "[data-type^='" + type + "']";
            if (val == "_all_") {
                $(commonSelector).show();
            } else {
                $(commonSelector).hide();
                $(typeSelector).show();
            }
        });
        promoCheck();
        if (sessionStorage.is_login == "true") {
            changeApplyStatus();
        }

        //异步获取活动内容数据
        $(".messageContent").on("click",function (e) {
            if($(this).attr("disContent")==undefined || $(this).attr("disContent").indexOf("disContent")<0){
                var promoId = $(this).parents("div").attr("id");
                var id = promoId.substring(4,promoId.length);
                $.ajax({
                    url:"/ntl/activity/getByIdApplyActivity.html",
                    type: "POST",
                    dataType: "json",
                    data:{searchId:id},
                    success: function (data) {
                        $(".messageContent_"+id).html(data.activityMessage);
                    }
                })
                $(this).attr("disContent","disContent");
            }

        })
    });

    function promoCheck() {
        var nowTime = $("._user_time").attr("time");
        $("._vr_promo_check").each(function () {
            var $this = $(this);
            var st = $this.find("._vr_promo_ostart").val();
            var et = $this.find("._vr_promo_oend").val();
            var sTime = moment(Number(st)).utcOffset(sessionStorage.getItem("timezone"));
            var eTime = moment(Number(et)).utcOffset(sessionStorage.getItem("timezone"));
            $this.find("._vr_promo_start").each(function () {
                $(this).text(sTime.format($(this).data("format")));
            })
            $this.find("._vr_promo_end").each(function () {
                $(this).text(eTime.format($(this).data("format")));
            })
            if (nowTime < sTime) {
                //未开始
                $this.find("._vr_promo_processing").hide();
                $this.find("._vr_promo_nostart").show();
                $this.find("._vr_promo_over").hide();
                $this.find("._vr_promo_join").text("未開始");
            } else if (nowTime > sTime && nowTime < eTime) {
                //进行中
                $this.find("._vr_promo_processing").show();
                $this.find("._vr_promo_nostart").hide();
                $this.find("._vr_promo_over").hide();
                $this.find("._vr_promo_join").text("立即申请");
                var endTimeVal = new Date(parseInt(et));
                $this.find("._vr_promo_countdown").ccountdown(endTimeVal.getFullYear(), endTimeVal.getMonth() + 1, endTimeVal.getDate(), endTimeVal.getHours() + ':' + endTimeVal.getSeconds());
            } else if (nowTime > eTime) {
                //已结束
                $this.attr("data-type", "over");
                $this.children("dt").addClass("status-over");
                $this.find("._vr_promo_over").show();
                $this.find("._vr_promo_processing").hide();
                $this.find("._vr_promo_nostart").hide();
                if(typeof  $this.find("._vr_promo_join").attr("join-over-hide")!="undefined"){
                    $this.find("_vr_promo_join").hide();
                }
                var oldClass = $this.find("._vr_promo_join").data("oldClass");
                var newClass = $this.find("._vr_promo_join").data("newClass");
                $this.find("._vr_promo_join").removeClass(typeof oldClass=="undefined"?"":oldClass).addClass(typeof newClass=="undefined"?"":newClass).attr("onclick", "").text("已结束");
                $("._vr_promo_overparent").append($this);
            }
        })
    }

    function getMyRankActivity() {
        if (sessionStorage.is_login == "true") {
            $(".notfit").each(function (i, btn) {
                $(btn).parents("._vr_promo_check").hide();
            });
            $('body,html').animate({scrollTop: 0}, 1000);

        } else {
            loginObj.getLoginPopup(function (bol) {
                if (sessionStorage.is_login == "true") {
                    window.location.href = "/promo.html";
                }
            });
        }
    }

    function changeApplyStatus() {
        var backwaterObj = $("._vr_promo_join").parents("._vr_promo_check[data-code^='back_water'][data-type='processing']");
        backwaterObj.each(function (i, obj) {
            $(obj).find("._vr_promo_join").text("參與中");
        });
        $.ajax({
            url: "/ntl/activity/getPlayerActivityIds.html",
            type: "POST",
            dataType: "json",
            success: function (data) {
                filterActyByPlayer(data);
            }
        });
    }

    function filterActyByPlayer(data) {
        var rankActvyObj = $("._vr_promo_check[data-rank-id][data-type='processing']");
        rankActvyObj.each(function (j, actObj) {
            var startTimeObj = $(actObj).find("._vr_promo_ostart");
            var flag = new Date(parseInt(startTimeObj.val())) < new Date();
            var oldClass = $(actObj).find("._vr_promo_join").data("oldClass");
            oldClass = typeof oldClass=="undefined"?"":oldClass;
            var newClass = $(actObj).find("._vr_promo_join").data("newClass");
            newClass = typeof newClass=="undefined"?"":newClass;
            if (($(actObj).data("code") == "first_deposit" || $(actObj).data("code") == "deposit_send") && flag) {
                if (data.length < 1) {
                    if ($(actObj).data("rankId") === "all") {
                        $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled").text("存款時申請");
                    } else {
                        $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未滿足條件");
                    }
                } else {
                    var isContain = false;
                    for (var j = 0; j < data.length; j++) {
                        if ($(actObj).data("searchid") === data[j]) {
                            isContain = true;
                        }
                    }
                    if (isContain || $(actObj).data("rankId") === "all") {
                        $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled").text("存款時申請");
                    } else {
                        $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未滿足條件");
                    }
                }
            }
            if ($(actObj).data("code") == "regist_send" || $(actObj).data("code") == "relief_fund" || $(actObj).data("code") == "profit_loss"
                    || $(actObj).data("code") == "effective_transaction"|| $(actObj).data("code") == "money") {
                if (data.length < 1) {
                    if ($(actObj).data("rankId") != "all" && flag) {
                        $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未滿足條件");
                    }
                }
                if (data.length > 0 && $(actObj).data("rankId") != "all" && flag) {
                    var isContain = false;
                    for (var j = 0; j < data.length; j++) {
                        if ($(actObj).data("searchid") === data[j]) {
                            isContain = true;
                        }
                    }
                    if (!isContain) {
                        $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未滿足條件");
                    }
                }
            }
        });
    }

    function joinPromo(aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        $(aplyObj).attr("disabled","disabled");
        if(ctime > 0){
            return false;
        }
        if(code!='money'){
            ctime++;

        }
        var nowTime = $("._user_time").attr("time");
        if ($(aplyObj).parents("._vr_promo_check").find("._vr_promo_ostart").val() > nowTime || $(aplyObj).parents("._vr_promo_check").find("._vr_promo_oend").val() < nowTime) {
            return false;
        }
        if (sessionStorage.is_login == "true") {
            if (code == "back_water" || code == "first_deposit" || code == "deposit_send") {
                if (isRefresh) {
                    /*BootstrapDialog.alert({
                        title: "提示",
                        type: BootstrapDialog.TYPE_WARNING,
                        message: "参与中",
                        callback: function () {
                            window.location.href = "/promo.html";
                        }
                    });*/
                    layer.open({
                        content:'參與中',
                        title:'提示',
                        skin:'layui-layer-brand',
                        btn:["確定"],
                        success: function(layer){
                            // 重写关闭按钮
                            $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                            // 提示框类型
                            $(layer).addClass("normal-dialog");
                        },
                        yes: function () {
                            window.location.href = "/promo.html";
                        }
                    });
                }
                return false;

            } else {
                if (isRefresh&&code!='money') {
                    applyActivities(aplyObj, true);
                } else {
                    if(code=='money'){
                        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
                        canShowLottery(searchId);
                        $(aplyObj).removeAttr("disabled");
                    }else{
                        applyActivities(aplyObj);
                    }

                }
            }
        } else {
            loginObj.getLoginPopup(function (bol) {
                if (sessionStorage.is_login == "true") {
                    joinPromo(aplyObj, true);
                }
            });
        }
    }
    function setDivCss() {
        $('#containerOut').css({
            "height": function () { return $(document).height(); },
            "width": function () { return $(document).width(); }
        });
    }

    function applyActivities(aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
        $.ajax({
            url: "/ntl/activity/applyActivities.html",
            type: "POST",
            dataType: "json",
            data: {
                code: code,
                resultId: searchId
            },
            success: function (data) {
                showWin(data, isRefresh);
                $(aplyObj).removeAttr("disabled");
                ctime--;
            }
        })
    }

    function showWin(data, isRefresh) {
        if (typeof data.state == "undefined") {
            return false;
        }
        if (data.state) {
            $("._fail").hide();
            $("._success").show();
        } else {
            $("._success").hide();
            $("._fail").show();
        }

        $("._msg").html('<p class="text-center">' + data.msg + '</p>');

        /*var dialog = BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: function (dialog) {
                var $content = $(".promoTip").html();
                return $content;
            },
            title: "消息",
            closable: 'true',
            buttons: [{
                label: '好的',
                cssClass: 'btn btn-info',
                action: function (dialogItself) {
                    if (isRefresh) {
                        dialogItself.close();
                        window.location.href = "/promo.html";
                    } else {
                        dialogItself.close();
                    }
                }
            }, {
                label: '查看优惠记录',
                cssClass: 'btn btn-default',
                action: function () {
                    window.open(
                            '${data.contextInfo.playerCenterContext}#/preferential/list.html',
                            '_blank' // <- This is what makes it open in a new window.
                    );
                }
            }]
        });*/
        var dialog = layer.open({
            content:$(".promoTip").html(),
            title:'訊息',
            skin:'layui-layer-brand',
            btn:["好的","檢視優惠記錄"],
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
            },
            yes: function () {
                if (isRefresh) {
                    layer.close(dialog);
                    window.location.href = "/promo.html";
                } else {
                    layer.close(dialog);
                }
            },
            btn2: function () {
                window.open(
                        '${data.contextInfo.playerCenterContext}#/preferential/list.html',
                        '_blank' // <- This is what makes it open in a new window.
                );
            }
        });
    }

    $(function(){
        var hash = window.location.hash;
        if(hash!=undefined){
        var id = hash.substr(1);
        $("#"+id).find("img").trigger("click");
        }
    })
</script>