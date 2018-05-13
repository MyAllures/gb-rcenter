<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery.countdown.js"></script>
<script>
    $(function () {
        // 默认配置
        layer.config({
            type: 0,
            move: ".layui-layer-title",
            title: true,
            offset: "auto",
            btnAlign: "r",
            closeBtn: "2",
            shade: [0.7, "#000"],
            shadeClose: true,
            time: 0,
            resize: false
        });


        //平铺点击展示活动详情
        $(".list-type2 .promo-item>img").on('click',function(){
            $(this).toggleClass('open');
            $(this).parents(".promo-item").find(".promo-detail").stop().slideToggle();
        });

        //九宫格点击图片展示详情
        $(".list-type1 .shadow").on("click",function(){
            var $detail  = $(this).parents('.promo-item').find('.promo-detail');
            var img = $(this).parents('.promo-item').find('.promo-img').attr('src');
            var cont = $detail.html();
            var content;
            if (img == "") {
                content = '<div class="promo-content" id="promo-content">' + cont + '<i class="icon-goUp"></i></div>';
            }else {
                content = '<img class="promo-img" src=' + img + '>' + '<div class="promo-content" id="promo-content">' + cont + '<i class="icon-goUp"></i></div>';
            }
            dialogPromoDetail(content,'活动详细','layui-layer-info',['640px','530px'],false,true)
        });

        //切换主题/
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
                        $("#search-input").val('');
                        $("._vr_all").addClass("hide");
                        $("._vr_process").removeClass("hide");
                        $("._vr_actContain").parent().addClass("hide");
                        $("."+val).parent().removeClass("hide");
                    }
                }
                $(".no-result").hide();//隐藏搜索为空时展示的提示
            })
        });

        //进入对应的活动------九宫格的需要优化,因为暂时不清楚俩种模式存在方式TODO by kobe
        var hash = window.location.hash;
        if(hash != undefined){
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

    //按活动名称搜索活动
    function searchActivity(obj) {
        $('[data-item="_all_"]').trigger('click');
        var value = $("#search-input").val();
        if (typeof value != "undefined") {
            $("._vr_all .promo-item").each(function (j, actObj) {
                var activityName = $(actObj).data("activityname");
                if (activityName.indexOf(value) != -1) {
                    $(actObj).parent().removeClass("hide");
                } else {
                    $(actObj).parent().addClass("hide");
                }
            });
        } else {
            $(actObj).parent().removeClass("hide");
        }
        var long1 = $("._vr_all").length;
        var long2 = $("._vr_all.hide").length;
        if (long1 == long2) {
            $(".no-result").show();
        }else {
            $(".no-result").hide();
        }
    }

    //根据时间来初始化活动的按钮，小标题展现,还没有层级的概念
    function promoCheck() {
        var nowTime = $("._user_time").attr("time");
        $("._vr_promo_check").each(function () {
            var $this = $(this);
            var code = $this.data('code');
            var st = $this.find("._vr_promo_ostart").val();
            var et = $this.find("._vr_promo_oend").val();
            var sTime = moment(Number(st)).utcOffset(sessionStorage.getItem("timezone"));
            var eTime = moment(Number(et)).utcOffset(sessionStorage.getItem("timezone"));
            if (nowTime < sTime) {//未开始
                $this.find(".noyet").show();
                $this.find(".processing").hide();
                $this.find(".over").hide();
                $this.find(".shadow").html('');
            } else if (nowTime > sTime && nowTime < eTime) {//进行中
                $this.find(".noyet").hide();
                $this.find(".processing").show();
                $this.find(".over").hide();
                $this.find(".shadow").html('<div class="btn-apply _vr_promo_join" onclick="joinPromo(this, event)">' + '我要申请' + '</div>');
                if (code == 'back_water' || code == 'content') {//根据活动类型处理申请按钮
                    $this.find('.shadow').html('<div class="btn-txt">该活动无需申请</div>');
                } else if (code == 'money') {
                    $this.find('._vr_promo_join').text('试试手气');
                }
            } else if (nowTime > eTime) {//已结束
                $this.find(".noyet").hide();
                $this.find(".processing").hide();
                $this.find(".over").show();
                $this.find(".shadow").html('');
            }
        })
    }


    function changeApplyStatus() {
        $.ajax({
            url: "/ntl/activityHall/getPlayerActivityIds.html",
            type: "POST",
            dataType: "json",
            success: function (data) {
                filterActyByPlayer(data);
            }
        });
    }

    //根据该层级不能参加的活动移除onclick和改变按钮提示
    function filterActyByPlayer(data) {
        promoCheck();
        var ActvyObj = $("._vr_promo_join");
        ActvyObj.each(function (j, actObj) {
            var actObjParent = $(actObj).parents("._vr_promo_check");
            if (data.length < 1) {
                if ($(actObjParent).data("rankId") != "all") {
                    $(actObj).addClass(" notfit").attr("onclick","").text("未满足条件");
                }
            }
            if (data.length > 0 && $(actObjParent).data("rankId") != "all") {
                var isContain = false;
                for (var j = 0; j < data.length; j++) {
                    if ($(actObjParent).data("searchid") === data[j]) {
                        isContain = true;
                    }
                }
                if (!isContain) {
                    $(actObj).addClass(" notfit").attr("onclick","").text("未满足条件");
                }
            }
        });
    }


    //参加优惠点击事件
    function joinPromo(aplyObj,event,isRefresh) {
        event.stopPropagation();
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        if(code!='money'){
            $(aplyObj).attr("onclick","");
        }
        var nowTime = $("._user_time").attr("time");

        if ($(aplyObj).parents("._vr_promo_check").find("._vr_promo_ostart").val() > nowTime
                || $(aplyObj).parents("._vr_promo_check").find("._vr_promo_oend").val() < nowTime) {//还未开始或者结束时提示
            $(aplyObj).attr("onclick","joinPromo(this,event)");
            $(".applyResult").html('很抱歉!当前时间不在活动期间.具体时间请查看活动详情');
            var content = $(".promoFailureTip").html();
            var title = "申请失败";
            var skin =  "layui-layer-danger";
            var addClass ="promo_failure";
            var btn = ["联系客服"];
            var url =  $(".openNewWindow").data("url");
            _layerDialog(content,title,skin,addClass,btn,url);
            return;
        }

        if (sessionStorage.is_login == "true") {
            if (code == 'effective_transaction' || code == 'profit_loss' || code == 'deposit_send') {
                fetchActivityProcess(aplyObj, isRefresh);
            } else {
                if (isRefresh&&code!='money') {
                    applyActivities(aplyObj, true);
                } else {
                    if(code=='money'){
                        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
                        canShowLottery(searchId);
                        $(aplyObj).attr("onclick","joinPromo(this, event)");
                    }else{
                        applyActivities(aplyObj);
                    }

                }
            }
        } else {
            loginObj.getLoginPopup(function (bol) {
                if (sessionStorage.is_login == "true") {
                    joinPromo(aplyObj,event,true);
                } else {
                    $(aplyObj).attr("onclick","joinPromo(this, event)");
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
            },
            error: function (data) {
                $(".errorCode .tit.tip_tit").text('无响应！（错误码：' + data.status + '）');
                var content = $(".errorCode").html();
                var title = "申请失败";
                var skin =  "layui-layer-danger";
                var addClass="promo_failure";
                var btn = ["联系客服"];
                var url =  $(".openNewWindow").data("url");
                _layerDialog(content,title,skin,addClass,btn,url);
            },
            complete: function () {
                $(aplyObj).attr("onclick","joinPromo(this,event)");
            }
        });

    }

    function showActivityProcessDialog(data, aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var title = $(aplyObj).parents("._vr_promo_check").find(".tit").text();
        $(".tip_tit").text('《' + title + '》');
        var content;
        var addClass;
        var icon;
        var btn;
        var item;
        if (code == 'deposit_send') {
            $(".deposit_send_transaction").remove();
            var transactions = data.transactions;
            if (transactions) {
                for (var j = 0; j<transactions.length; j++) {
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
                btn = ["联系客服"];
            }
            content = $(".deposit_send").html();
            addClass = 'promo_CJS';
        } else if (code == 'effective_transaction') {
            $(".process").remove();
            $(".activityProcess .subs-txt").text('');
            var preferentialRelations = data.preferentialRelations;
            for (var j = 0; j< preferentialRelations.length; j++) {
                var width = (data.effectivetransaction/preferentialRelations[j].preferentialValue)*100;
                if (data.effectivetransaction >= preferentialRelations[j].preferentialValue){
                    item = '<div class="item-success-with-bar process">'+ '<i class="icon-pass"></i>' + '<div class="txt"><span>有效投注额' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' +
                            data.effectivetransaction + '</span>/' + preferentialRelations[j].preferentialValueString + '</div></div>' + '<div class="bar"><div class="bar-inner"></div></div></div>';
                } else {
                    item = '<div class="item-failure-with-bar process">'+ '<i class="icon-fail"></i>' + '<div class="txt"><span>有效投注额' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' +
                            data.effectivetransaction + '</span>/' + preferentialRelations[j].preferentialValueString + '</div></div>' + '<div class="bar"><div class="bar-inner" style="' + 'width:'+ width + '%' + '"></div></div></div>';
                }
                $(".effective_transaction").append(item);
            }
            if (data.hasApply) {
                item = '<div class="item-success-without-bar process">'+
                        '<div class="txt"><span class="color-red">派奖时间：' + data.deadLineTime + '</span></div>'+
                        '</div>';
                btn = ["联系客服"];
                $(".activityProcess .subs-txt").text('以下是您当前有效投注额,统计周期请查看活动细则,加油吧!');
            } else {
                item = '<div class="item-success-without-bar process">'+
                        '<div class="txt"><span class="color-red">当前报名人数：' + data.ApplyNum + '人</span></div>'+
                        '</div>';
                btn = ["联系客服","立即报名"];
                $(".activityProcess .subs-txt").text('以下是您当前有效投注额,统计周期请查看活动细则,申请报名活动后显示派奖时间');
            }
            $(".effective_transaction").append(item);
            content = $(".activityProcess").html();
            addClass = 'promo_may_apply';
        } else if (code == 'profit_loss') {
            $(".process").remove();
            $(".activityProcess .subs-txt").text('');
            var preferentialRelations = data.preferentialRelations;
            for (var j = 0; j<preferentialRelations.length; j++) {
                if (preferentialRelations[j].preferentialCode == 'profit_ge') {//盈利时只展示盈利
                    var width = (data.profitloss/preferentialRelations[j].preferentialValue)*100;//计算进度
                    if (data.profitloss >= preferentialRelations[j].preferentialValue){
                        item = '<div class="item-success-with-bar process">'+ '<i class="icon-pass"></i>' + '<div class="txt"><span>盈利' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' + data.profitloss +
                                '</span>/' + preferentialRelations[j].preferentialValueString + '</div></div>' + '<div class="bar"><div class="bar-inner"></div></div></div>';
                    } else {
                        item = '<div class="item-failure-with-bar process">'+ '<i class="icon-fail"></i>' + '<div class="txt"><span>盈利' + preferentialRelations[j].orderColumn + '</span><div class="pull-right"><span class="color-green">' + data.profitloss +
                                '</span>/' + preferentialRelations[j].preferentialValueString + '</div></div>' + '<div class="bar"><div class="bar-inner" style="' + 'width:'+ width + '%' + '"></div></div></div>';
                    }
                    $(".profit_loss.profit").append(item);
                }else if (preferentialRelations[j].preferentialCode == 'loss_ge' && preferentialRelations[j].orderColumn == '1') {//亏损时只对比第一梯度
                    if (Math.abs(data.profitloss) >= preferentialRelations[j].preferentialValue && data.profitloss < 0){
                        icon = '<i class="icon-pass"></i>';
                    } else {
                        icon = '<i class="icon-fail"></i>';
                    }
                    var lossMoney = data.profitloss;
                    if (lossMoney > 0) {
                        lossMoney = 0;
                    }
                    item = '<div class="item-success-without-bar process">'+
                            icon +
                            '<div class="txt"><span>亏损金额:'  + lossMoney  +'</span></div>'+
                            '</div>';
                    $(".profit_loss.loss").append(item);
                }
            }
            //盈亏送都存在时,根据盈亏控制展现
            var profitHtml = $(".profit_loss.profit").html();
            var lossHtml = $(".profit_loss.loss").html();
            if (profitHtml != "" && lossHtml != "") {
                if (data.profitloss >= 0) {
                    $(".profit_loss.loss").html('');
                }else {
                    $(".profit_loss.profit").html('');
                }
            }
            if (data.hasApply) {
                item = '<div class="item-success-without-bar process">'+
                        '<div class="txt"><span class="color-red">派奖时间：' + data.deadLineTime + '</span></div>'+
                        '</div>';
                btn = ["联系客服"];
                $(".activityProcess .subs-txt").text('以下是您当前盈亏,统计周期请查看活动细则,加油吧!');
            } else {
                item = '<div class="item-success-without-bar process">'+
                        '<div class="txt"><span class="color-red">当前报名人数：' + data.ApplyNum + '人</span></div>'+
                        '</div>';
                btn = ["联系客服","立即报名"];
                $(".activityProcess .subs-txt").text('以下是您当前盈亏,统计周期请查看活动细则,申请报名活动后显示派奖时间.');
            }
            $(".profit_loss.loss").append(item);
            content = $(".activityProcess").html();
            addClass = 'promo_may_apply';
        } else {
            content = '<div>本次操作异常,请稍后再试</div>';
            addClass = 'promo_may_apply';
            btn = ["联系客服"];
        }
        var url =  $(".openNewWindow").data("url");
        var title = "提示";
        var skin = "layui-layer-warning";
        _layerDialogProcess(content,title,skin,addClass,btn,url,aplyObj,isRefresh)
    }

    function applyActivities(aplyObj, isRefresh) {
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
        var transactionNos;
        var tansactionObj = [];
        if (code == 'deposit_send') {//存就送时需要组装订单号.
            transactionNos = $("input[name='transactionNos']:checked");
            if (transactionNos.length > 0) {
                for (j = 0; j<transactionNos.length; j++) {
                    tansactionObj.push($(transactionNos[j]).val());
                }
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
            },
            error: function (data) {
                $(".errorCode .tit.tip_tit").text('无响应！（错误码：' + data.status + '）');
                var content = $(".errorCode").html();
                var title = "申请失败";
                var skin =  "layui-layer-danger";
                var addClass="promo_failure";
                var btn = ["联系客服"];
                var url =  $(".openNewWindow").data("url");
                _layerDialog(content,title,skin,addClass,btn,url);
            },
            complete: function () {
                $(aplyObj).attr("onclick","joinPromo(this,event)");
            }
        })
    }

    function showApplyActivityResult(data, isRefresh, aplyObj) {
        if (typeof data.state == "undefined") {
            return false;
        }
        $(".tip_tit").text('');
        $(".applyResult").text('');
        var code = $(aplyObj).parents("._vr_promo_check").data("code");
        var title = $(aplyObj).parents("._vr_promo_check").find(".tit").text();
        $(".tip_tit").text('《' + title + '》');
        var msg;
        var money = " ";
        if (code == 'first_deposit' || code == 'second_deposit' || code =='third_deposit' || code == 'everyday_first_deposit' || code == 'deposit_send') {
            if (data.state) {
                msg = '<div class="item-failure-without-bar"><i class="icon-fail"></i><div class="txt"><span>' + '操作成功,审核通过后彩金将直接发放到您的账户,请注意查收!' + '</span></div></div>';
                $(".applyResult").append(msg);
            } else {
                if (data.transactionErrorList) {
                    for (j = 0; j<data.transactionErrorList.length; j++) {
                        if (data.transactionErrorList[j].money) {
                            money = data.transactionErrorList[j].money;
                        }
                        if (data.transactionErrorList[j].state) {
                            continue;
                        } else {
                            msg = '<div class="item-success-without-bar"><i class="icon-pass"></i><div class="txt"><span>存款订单' + data.transactionErrorList[j].transactionNo + '</span></div></div>' +
                                    '<div class="item-failure-without-bar" style="margin-bottom: 30px"><i class="icon-fail"></i><div class="txt"><span>' + window.top.message.apply_activity[data.transactionErrorList[j].msg] + money + '</span></div></div>';
                        }
                        $(".applyResult").append(msg);
                    }
                } else {
                    msg = '<div class="item-failure-without-bar"><i class="icon-fail"></i><div class="txt"><span>' + window.top.message.apply_activity[data.msg] + '</span></div></div>';
                    $(".applyResult").append(msg);
                }
            }
        }else {
            msg = '<div class="item-failure-without-bar"><i class="icon-fail"></i><div class="txt"><span>' + data.msg + '</span></div></div>';
            $(".applyResult").append(msg);
        }
        var content;
        var title;
        var skin;
        var addClass;
        if (data.state) {
            content = $(".promoSuccessTip").html();
            title = "申请成功";
            skin = "layui-layer-success";
            addClass = "promo_success";
        } else {
            content = $(".promoFailureTip").html();
            title = "申请失败";
            skin =  "layui-layer-danger";
            addClass="promo_failure";
        }
        var btn = ["联系客服"];
        var url =  $(".openNewWindow").data("url");
        _layerDialog(content,title,skin,addClass,btn,url);
    }

    /*九宫格活动详情弹窗*/
    function dialogPromoDetail(content,title,skin,area,btnRound,btnBorder){ // 优惠详细弹窗
        layer.open({
            content:content,
            title:title,
            skin:skin,
            area:area,
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass("promo_detail");
                // 内容启用滚动条
                var nice1 = $(layer).find(".layui-layer-content .promo-content").niceScroll({
                    cursorcolor:"#999",
                    cursorwidth:"8px"
                });
                $("#promo-content").on('scroll',function(){
                    if(nice1.newscrolly > 10){
                        $('.icon-goUp').fadeIn('slow');
                    }else{
                        $('.icon-goUp').fadeOut('slow');
                    }
                });
                $('.icon-goUp').on('click',function(){
                    nice1.doScrollTop(0,'300')
                });
            },
            yes:function(index){
                layer.close(index);
            }
        });
    }

    /*抽取的公共弹窗*/
    function _layerDialog(content,title,skin,addClass,btn,url){
        layer.open({
            content:content,
            title:title,
            skin:skin,
            area: ['640px', '397px'],
            btn: btn,
            url:url,
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass(addClass);
            },
            yes: function () {
                window.open(
                        url,
                        'NewWindow',
                        'width=960,height=600,top=50,left=50'
                );
            }
        });
    }

    /*抽取的进度弹窗*/
    function _layerDialogProcess(content,title,skin,addClass,btn,url,aplyObj,isRefresh) {
        layer.open({
            content:content,
            title:title,
            skin:skin,
            area: ['640px', '397px'],
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

</script>