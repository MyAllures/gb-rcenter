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
        $(".list-type2 .btn-detail").on('click', function () {
            $(this).toggleClass('open');
            $(this).parents(".promo-item").find(".promo-detail").stop().slideToggle();
        });

        //切换主题
        $("#toggleThemes").on('click', function () {
            if ($('.main-promo').hasClass("theme-white")) {
                $('.main-promo').removeClass("theme-white").addClass('theme-black');
            } else {
                $('.main-promo').removeClass("theme-black").addClass('theme-white');
            }
        });

        //优惠类型切换
        $("._vr_promo li").each(function(){
            $(this).on("click","a",function(){
                if(!$(this).parent().hasClass("active")){
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var val = $(this).data("item");
                    if (val=="_all_"){
                        $("._vr_all").removeClass("hide");
                        $("._vr_process").addClass("hide");
                    }else {
                        $("._vr_all").addClass("hide");
                        $("._vr_process").removeClass("hide");
                        $("._vr_actContain").parent().addClass("hide");
                        $("."+val).parent().removeClass("hide");
                    }
                }
            })
        });

        //进入对应的活动
        var hash = window.location.hash;
        if(hash!=undefined){
            var id = hash.substr(1);
            $("#"+id).find("img").trigger("click");
        };

        //根据时间来初始化活动的按钮展现和状态
        promoCheck();

        //登录后改变按钮展现和状态
        if (sessionStorage.is_login == "true") {
            changeApplyStatus();
        }
    });


    //根据时间来初始化活动的按钮等展现,还没有层级的概念
    function promoCheck() {
        var nowTime = $("._user_time").attr("time");
        $("._vr_promo_check").each(function () {
            var $this = $(this);
            var st = $this.find("._vr_promo_ostart").val();
            var et = $this.find("._vr_promo_oend").val();
            var sTime = moment(Number(st)).utcOffset(sessionStorage.getItem("timezone"));
            var eTime = moment(Number(et)).utcOffset(sessionStorage.getItem("timezone"));
            //填充小标题那里的开始时间和结束时间
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
                $this.find("._vr_promo_join").text("未开始");
            } else if (nowTime > sTime && nowTime < eTime) {
                //进行中
                $this.find("._vr_promo_processing").show();
                $this.find("._vr_promo_nostart").hide();
                $this.find("._vr_promo_over").hide();
                $this.find("._vr_promo_join").text("立即申请");
                //倒计时
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


    function changeApplyStatus() {
        var backwaterObj = $("._vr_promo_join").parents("._vr_promo_check[data-code^='back_water'][data-type='processing']");
        backwaterObj.each(function (i, obj) {
            $(obj).find("._vr_promo_join").text("参与中");
        });
        $.ajax({
            url: "/ntl/activityHall/getPlayerActivityIds.html",
            type: "POST",
            dataType: "json",
            success: function (data) {
                filterActyByPlayer(data);
            }
        });
    }

    //根据该层级不能参加的活动添加disable属性和改变按钮提示
    function filterActyByPlayer(data) {
        var rankActvyObj = $("._vr_promo_check[data-rank-id][data-type='processing']");
        rankActvyObj.each(function (j, actObj) {
            var startTimeObj = $(actObj).find("._vr_promo_ostart");
            var flag = new Date(parseInt(startTimeObj.val())) < new Date();
            var oldClass = $(actObj).find("._vr_promo_join").data("oldClass");
            oldClass = typeof oldClass=="undefined"?"":oldClass;
            var newClass = $(actObj).find("._vr_promo_join").data("newClass");
            newClass = typeof newClass=="undefined"?"":newClass;

            if (data.length < 1) {
                if ($(actObj).data("rankId") != "all" && flag) {
                    $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " notfit").attr("onclick","").text("未满足条件");
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
                    $(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " notfit").attr("onclick","").text("未满足条件");
                }
            }

        });
    }

    //参加优惠点击事件
    function joinPromo(aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        /*$(aplyObj).attr("onclick","");*/
        /*if(ctime > 0){
            return false;
        }*/
        if(code!='money'){
            ctime++;
        }
        var nowTime = $("._user_time").attr("time");
        if ($(aplyObj).parents("._vr_promo_check").find("._vr_promo_ostart").val() > nowTime
                || $(aplyObj).parents("._vr_promo_check").find("._vr_promo_oend").val() < nowTime) {
            return false;
        }
        if (sessionStorage.is_login == "true") {
            if (code == "back_water") {
                if (isRefresh) {
                    layer.open({
                        content:'参与中',
                        title:'提示',
                        skin:'layui-layer-brand',
                        btn:["确定"],
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

            }else if (code == 'effective_transaction' || code == 'profit_loss' || code == 'deposit_send') {
                fetchActivityProcess(aplyObj, isRefresh);
            } else {
                if (isRefresh&&code!='money') {
                    applyActivities(aplyObj, true);
                } else {
                    if(code=='money'){
                        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
                        canShowLottery(searchId);
                        $(aplyObj).attr("onclick","joinPromo(this)");
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


    function fetchActivityProcess(aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
        $.ajax({
            url: "/ntl/activityHall/fetchActivityProcess.html",
            type: "POST",
            dataType: "json",
            data: {
                code: code,
                resultId: searchId
            },
            success: function (data) {
                showActivityProcessDialog(data, aplyObj, isRefresh);
                $(aplyObj).attr("onclick","joinPromo(this)");
            }
        });

    }

    function showActivityProcessDialog(data, aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var title = $(aplyObj).parents("._vr_promo_check").find(".tit").text();
        $(".tip_tit").text('《' + title + '》');
        var content;
        var addClass;
        var item;
        var icon;
        var btn;
        if (code == 'deposit_send') {
            $(".deposit_send_transaction").remove();
            var transactions = data.transactions;
            if (transactions) {
                for (j = 0; j<transactions.length; j++) {
                    item = '<tr class="deposit_send_transaction"><td><label class="checkbox_wrap"><input type="checkbox" name="transactionNos" value=' + transactions[j].transactionNo + '><span class="checkbox_icon"></span></label></td><td>' + transactions[j].transactionNo + '</td><td>' +
                            transactions[j].checkTime + '</td><td>' + transactions[j].rechargeAmount + '</td></tr>';
                    $(".deposit_sent_transactionNo").append(item);
                }
                $(".tip_noTransaction").hide();
                $(".tab_wrap").show();
                btn = ["联系客服","申请奖励"];
            } else {
                $(".tip_noTransaction").show();
                $(".tab_wrap").hide();
                btn = ["申请奖励"];
            }
            content = $(".deposit_send").html();
            addClass = 'promo_CJS';
        } else if (code == 'effective_transaction') {
            $(".process").remove();
            var preferentialRelations = data.preferentialRelations;
            for (j = 0; j<preferentialRelations.length; j++) {
                var width = (data.effectivetransaction/preferentialRelations[j].preferentialValue)*100;
                if (data.effectivetransaction >= preferentialRelations[j].preferentialValue){
                    item = '<div class="item-success-with-bar process">'+ '<i class="icon-pass"></i>' + '<div class="txt"><span>有效投注额' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' +
                            data.effectivetransaction + '</span>/' + preferentialRelations[j].preferentialValue + '</div></div>' + '<div class="bar"><div class="bar-inner"></div></div></div>';
                } else {
                    item = '<div class="item-failure-with-bar process">'+ '<i class="icon-fail"></i>' + '<div class="txt"><span>有效投注额' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' +
                            data.effectivetransaction + '</span>/' + preferentialRelations[j].preferentialValue + '</div></div>' + '<div class="bar"><div class="bar-inner" style="' + 'width:'+ width + '%' + '"></div></div></div>';
                }
                $(".effective_transaction").append(item);
            }
            if (data.hasApply) {
                btn = ["联系客服"];
                var time = moment(Number(data.deadLineTime)).utcOffset(sessionStorage.getItem("timezone"));
                $(".deadlineTime").html('派奖时间:' + '<span>' + time.format() + '</span>');
            } else {
                btn = ["联系客服","申请奖励"];
                $(".deadlineTime").html('参加活动人数:' + '<span>' + data.ApplyNum + '</span>');
            }
            content = $(".activityProcess").html();
            addClass = 'promo_may_apply';
        } else if (code == 'profit_loss') {
            $(".process").remove();
            var preferentialRelations = data.preferentialRelations;
            for (j = 0; j<preferentialRelations.length; j++) {
                if (preferentialRelations[j].preferentialCode == 'profit_ge' && data.profitloss>=0) {//盈利时只展示盈利
                    var width = (data.profitloss/preferentialRelations[j].preferentialValue)*100;//计算进度
                    if (data.profitloss >= preferentialRelations[j].preferentialValue){
                        item = '<div class="item-success-with-bar process">'+ '<i class="icon-pass"></i>' + '<div class="txt"><span>盈利' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' + data.profitloss +
                                '</span>/' + preferentialRelations[j].preferentialValue + '</div></div>' + '<div class="bar"><div class="bar-inner"></div></div></div>';
                    } else {
                        item = '<div class="item-failure-with-bar process">'+ '<i class="icon-fail"></i>' + '<div class="txt"><span>盈利' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' + data.profitloss +
                                '</span>/' + preferentialRelations[j].preferentialValue + '</div></div>' + '<div class="bar"><div class="bar-inner" style="' + 'width:'+ width + '%' + '"></div></div></div>';
                    }
                    $(".profit_loss.profit").append(item);
                }else if (preferentialRelations[j].preferentialCode == 'loss_ge' && preferentialRelations[j].orderColumn == '1' && data.profitloss < 0) {//亏损时只展示亏损
                    if (Math.abs(data.profitloss) >= preferentialRelations[j].preferentialValue && data.profitloss < 0){
                        icon = '<i class="icon-pass"></i>';
                    } else {
                        icon = '<i class="icon-fail"></i>';
                    }
                    item = '<div class="item-success-without-bar process">'+
                            icon +
                            '<div class="txt"><span>亏损金额:'  + data.profitloss  +'</span></div>'+
                            '</div>';
                    $(".profit_loss.loss").append(item);
                }
            }
            if (data.hasApply) {
                btn = ["联系客服"];
                var time = moment(Number(data.deadLineTime)).utcOffset(sessionStorage.getItem("timezone"));
                $(".deadlineTime").html('派奖时间:' + '<span>' + time.format() + '</span>');
            } else {
                btn = ["联系客服","申请奖励"];
                $(".deadlineTime").html('当前报名人数:' + '<span>' + data.ApplyNum + '</span>');
            }
            content = $(".activityProcess").html();
            addClass = 'promo_may_apply';
        } else {
            content = '<div>本次操作异常,请稍后再试</div>';
            addClass = 'promo_may_apply';
            btn = ["联系客服"];
        }
        var url =  $(".openNewWindow").data("url");
        var dialog = layer.open({
            content:content,
            title:"提示",
            skin:"layui-layer-warning",
            area: ['640px', 'auto'],
            btn: btn,
            url: url,
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass(addClass);
                // 内容启用滚动条
                $(layer).find(".layui-layer-content .tab_wrap").niceScroll({
                    cursorcolor:"#999",
                    cursorwidth:"8px"
                });
                $(layer).find(".layui-layer-content .tab_wrap tr:even").addClass('even')
            },
            yes: function () {
                window.open(
                         url,
                        'NewWindow',
                        'width=960,height=600,top=50,left=50'
                );
            },
            btn2: function () {
                applyActivities(aplyObj, isRefresh);
            }
        });
    }

    function applyActivities(aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
        var transactionNos;
        var tansactionObj = [];
        if (code == 'deposit_send') {//存就送时需要组装订单号.
            transactionNos = $("input[name='transactionNos']:checked");
            for (j = 0; j<transactionNos.length; j++) {
                tansactionObj.push($(transactionNos[j]).val());
            }
        }
        var dataParam = {};
        dataParam.code=code;
        dataParam.resultId=searchId;
        dataParam.transactionNos=tansactionObj;
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            url: "/ntl/activityHall/applyActivities.html",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(dataParam),
            success: function (data) {
                showApplyActivityResult(data, isRefresh, aplyObj);
                $(aplyObj).attr("onclick","joinPromo(this)");

            },
            error: function () {
                ctime--;
            }
        })
    }

    function showApplyActivityResult(data, isRefresh, aplyObj) {
        if (typeof data.state == "undefined") {
            return false;
        }
        $(".tip_tit").text('');
        $(".ext-inf").text('');
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var title = $(aplyObj).parents("._vr_promo_check").find(".tit").text();
        $(".tip_tit").text('《' + title + '》');
        var msg;
        if (code == 'first_deposit' || code == 'second_deposit' || code =='third_deposit' || code == 'everyday_first_deposit') {
           msg = window.top.message.apply_activity[data.msg];
        }else {
            msg = data.msg;
        }
        $(".ext-inf").text(msg);
        var content;
        var title;
        var skin;
        var area = ['640px', 'auto'];
        var icon;
        if (data.state) {
            content = $(".promoSuccessTip").html();
            title = "申请成功";
            skin = "layui-layer-success";
            icon = "promo_success";
        } else {
            content = $(".promoFailureTip").html();
            title = "申请失败";
            skin =  "layui-layer-danger";
            icon="promo_failure";
        }

        var dialog = layer.open({
            content:content,
            title:title,
            skin:skin,
            area: area,
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass(icon);
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

</script>