/**
 * Created by fei on 17-6-19.
 */
function closePage(page_0, page_1){
    if (page_0) $('#' + page_0).hide();
    if (page_1) $('#' + page_1).show();
}

/** 拆红包 */
function lottery() {
    $("#win_id").val("");
    $("#record_id").val("");
    $("#applyId").val("");
    var id = $("#activity_message_id").val();
    var $lotteryPage = $('#lotteryPage');
    var $btn1 = $('#lotteryPageBtn_1');
    var $winId = $('#win_id');
    var $recordId = $('#record_id');
    if(!id){
        $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
        $("#tip-msg").html('红包活动已经结束!');
        $("#lotteryPageBtn_1").hide();
        $("#lottery_time_tip-msg").addClass("mui-hide");
        return;
    }

    $btn1.attr('disabled', true);
    
    $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
    $winId.val('');
    $recordId.val('');
    var oldToken = $("[name='gb.token']").val();
    $("[name='gb.token']").val("");
    $.ajax({
        url: '/ntl/activity/getPacket.html',
        type: 'POST',
        dataType: 'json',
        data:{"gb.token":oldToken,"activityMessageId":id},
        success: function (data) {
            var $lotteryPage = $('#lotteryPage');
            var $tipMsg = $('#tip-msg');
            var $nextTime = $('#next_lottery_time');
            var $timeMsg = $('#lottery_time_tip-msg');
            var $remainCount = $('#ramain-count');
            var $noAwardBtn0 = $('#noAwardPageBtn_0');
            var $noAwardBtn1 = $('#noAwardPageBtn_1');
            var $rewardBtn0 = $('#rewardPageBtn_0');
            var $apply = $('#applyId');
            var $awardname = $('#awardname');
            $("[name='gb.token']").val(data.token);
            if (data.gameNum === -1) {
                $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                $tipMsg.html(window.top.message.promo_auto['剩余抽奖次数'].replace('{0}', 0));
                if(data.nextLotteryTime!=""){
                    $nextTime.text(data.nextLotteryTime);
                    $timeMsg.removeClass("mui-hide");
                }else{
                    $timeMsg.addClass("mui-hide");
                }

                $btn1.hide();
                return;
            }
            if (data.gameNum === -2) {
                $tipMsg.html(window.top.message.promo_auto['抽奖出现异常']);
                return;
            }
            if (data.gameNum === -3) {
                $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                $tipMsg.html(window.top.message.promo_auto['红包活动已经结束']);
                $btn1.hide();
                $timeMsg.addClass("mui-hide");
                return;
            }
            if(data.gameNum==-4){
                $("#lotteryPage").css({'background-image':'url('+resRoot+'/themes/hb/images/noChance_pc.png)'});
                $("#tip-msg").html('条件不满足，不能参与红包活动!');
                $("#lotteryPageBtn_1").hide();
                $("#lottery_time_tip-msg").addClass("mui-hide");
                return;
            }
            if(data.gameNum==-5){
                $("#lotteryPage").css({'background-image':'url('+resRoot+'/themes/hb/images/noChance_pc.png)'});
                $("#tip-msg").html('本次红包已经抢光了');
                if(data.nextLotteryTime!=""){
                    $("#next_lottery_time").text(data.nextLotteryTime);
                    $("#lottery_time_tip-msg").removeClass("mui-hide");
                }else{
                    $("#lottery_time_tip-msg").addClass("mui-hide");
                }
                $("#lotteryPageBtn_1").hide();
                $("#lottery_time_tip-msg").removeClass("mui-hide");
                return;
            }
            if (data.award === 0) {
                $remainCount.text(data.gameNum);
                closePage('lotteryPage', 'noAwardPage');
            } else {
                $winId.val(data.id);
                $recordId.val(data.recordId);
                $apply.val(data.applyId);
                var msg = ""+window.top.message.promo_auto['获得奖励']+"";
                msg = msg.replace('{0}', data.award);
                $awardname.html(msg);
                $tipMsg.html(window.top.message.promo_auto['剩余抽奖次数'].replace('{0}', data.gameNum));
                closePage('lotteryPage', 'haveAwardPage');
            }
            console.log(data.gameNum);

            if (data.gameNum === 0) {
                $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                $btn1.hide();
                if(data.nextLotteryTime!=""){
                    $nextTime.text(data.nextLotteryTime);
                    $timeMsg.removeClass("mui-hide");
                }else{
                    $timeMsg.addClass("mui-hide");
                }

                $noAwardBtn0.click(function () {
                    closePage('noAwardPage', 'lotteryPage');
                    $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                });
                $noAwardBtn1.click(function () {
                    closePage('noAwardPage', 'lotteryPage');
                    $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                });
                $rewardBtn0.click(function () {
                    closePage('rewardPage', 'lotteryPage');
                    $lotteryPage.css({'background-image': 'url(' + resRoot + '/themes/hb/images/noChance.png)'});
                });
                closePage('lotteryPage', '');
                return;
            } else {
                $noAwardBtn0.on('tab', function () {
                    onceAgain();
                });
                $noAwardBtn1.on('tab', function () {
                    onceAgain();
                });
                $rewardBtn0.on('tab', function () {
                    onceAgain();
                });
            }
            closePage('lotteryPage', '');
        }
    });
}

function showExplain() {
    $('#explainContent').html(explainContent);
    $('#explainPage').show();
    closePage('lotteryPage', '');
}

function applyMoneyActivity(searchId, isRefresh) {
    var code = 'money';
    var win_id = $('#win_id').val();
    var applyId = $("#applyId").val();
    $.ajax({
        url: '/ntl/activity/applyActivities.html',
        type: 'POST',
        dataType: 'json',
        data: {
            code: code,
            resultId: searchId,
            winId: win_id,
            "applyId":applyId
        },
        success: function (data) {
            if (data.state) {
                closePage('haveAwardPage', 'rewardPage');
            } else {
                closePage('haveAwardPage', '');
                closePage('lotteryPage', '');
                $('#containerOut').css('display', 'none');
                showWin(data, isRefresh);
            }
        }
    })
}

function applyMoney() {
    $.ajax({
        url: '/ntl/activity/isNeedApply.html',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (!data) return;
            if (data.isNull) return;
            //需要申请
            if (data.state) {
                applyMoneyActivity(data.resultId, true);
            } else {
                rewardFn();
            }
        }
    });
}

function rewardFn() {
    var winId = $('#win_id').val();
    var recordId = $('#record_id').val();
    var applyId = $("#applyId").val();
    if (winId === '' || recordId === ''||applyId==='') {
        console.log('参数不全');
        return;
    }
    var dataParam = {'winId': winId, 'recordId': recordId,"applyId":applyId};
    $.ajax({
        url: '/ntl/activity/getReward.html',
        type: 'POST',
        dataType: 'json',
        data: dataParam,
        success: function (data) {
            if (data.state) {
                closePage('haveAwardPage', 'rewardPage');
            } else {
                console.log('领取红包失败');
            }
        }
    })
}

function onceAgain() {
    $('#lotteryPageBtn_1').removeAttr('disabled');
    $('#lotteryPage').css({'background-image': 'url(' + resRoot + '/themes/hb/images/lottery.png)'});
    closePage('rewardPage', '');
    closePage('haveAwardPage', '');
    closePage('noAwardPage', 'lotteryPage');
}
