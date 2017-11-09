<div id="containerOut" style="display: none">
    <!--容器-->
    <input type="hidden" id="activity_message_id" value="">
    <input type="hidden" id="win_id" value="">
    <input type="hidden" id="record_id" value="">
    <input type="hidden" id="applyId" value="">
    <input type="hidden" name="gb.token" value="">
    <div id="container" class="divBg">
        <!--抽奖页面-->
        <div id="lotteryPage" class="divBg divClass" >
            <input class="inputClass btnFont" onclick="closePage('containerOut','')" id="lotteryPageBtn_0" value="关闭" type="button"/>
            <input class="inputClass btnFont" id="lotteryPageBtn_1" value="拆红包" onclick="lottery()" type="button"/>
            <div style="position: absolute;top: 360px;width: 100%">
                <div style="text-align: center;font-size: 18px;color: #fff;" id="tip-msg">
                    你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会
                </div>
                <div style="text-align: center;font-size: 18px;color: #fff;" id="lottery_time_tip-msg" class="hide">
                     下次拆红包开始时间为<br>
                    <span id="money_lottery_timezone" style="font-size: 22px;padding: 0 5px;color: gold"></span><br>
                    <span style="font-size: 22px;padding: 0 5px;color: gold" id="next_lottery_time"></span>
                </div>
            </div>
            <#--<input class="inputClass btnFont" id="lotteryPageBtn_2" value="游戏规则" onclick="showExplain()" type="button"/> -->
        </div>
        <!--中奖页面-->
        <div id="haveAwardPage" class="divBg divClass">
            <input class="inputClass btnFont" onclick="onceAgain()" id="haveAwardPageBtn_0" type="button"/>
            <p class="ab" id="awardname">
                获得了0元
            </p>
            <input class="inputClass btnFont" onclick="onceAgain()" id="haveAwardPageBtn_2" type="button"/>
            <#--<input class="inputClass btnFont" onclick="applyMoney()" id="haveAwardPageBtn_2" value="领取红包" type="button"/>-->
        </div>
        <!--规则页面-->
        <div class="divBg divClass" id="explainPage">
            <div id="explainContent" class="ab">

            </div>
            <input class="inputClass btnFont" onclick="closePage('explainPage','lotteryPage')" id="explainPageBtn_0" value="返回" type="button"/>
        </div>
        <!--未中奖页面-->
        <div class="divBg divClass" id="noAwardPage">
            <input class="inputClass btnFont" onclick="onceAgain()" id="noAwardPageBtn_0" value="关闭" type="button"/>
            <input class="inputClass btnFont" onclick="onceAgain()" id="noAwardPageBtn_1" value="再来一次" type="button"/>
        </div>
        <!--领取页面-->
        <div class="divBg divClass" id="rewardPage">
            <input class="inputClass btnFont" onclick="onceAgain()" id="rewardPageBtn_0" value="确定" type="button"/>
        </div>
        <!--提示-->
        <div class="divBg divClass" id="hitPage" onclick="closePage('hitPage','')">

        </div>
    </div>
</div>

<script>

    function closePage(page_0,page_1){
        if(page_0){
            $('#'+page_0).hide();
        }
        if(page_1){
            $('#'+page_1).show();
        }
    }
    /*拆红包*/
    function lottery(){
        $("#lotteryPageBtn_1").attr("disabled",true);
        $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
        $("#win_id").val("");
        $("#record_id").val("");
        $("#applyId").val("");
        var id = $("#activity_message_id").val();
        if(!id){
            $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
            $("#tip-msg").html('红包活动已经结束!');
            $("#lotteryPageBtn_1").hide();
            $("#lottery_time_tip-msg").addClass("hide");
            return;
        }
        var oldToken = $("[name='gb.token']").val();
        $("[name='gb.token']").val("");
        $.ajax({
            url:"/ntl/activity/getPacket.html",
            type: "POST",
            dataType: "json",
            data:{"gb.token":oldToken,"activityMessageId":id},
            success: function(data){
                $("[name='gb.token']").val(data.token);
                if(data.gameNum==-1){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#tip-msg").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会');
                    if(data.nextLotteryTime!=""){
                        $("#next_lottery_time").text(data.nextLotteryTime);
                        $("#lottery_time_tip-msg").removeClass("hide");
                    }else{
                        $("#lottery_time_tip-msg").addClass("hide");
                    }
                    $("#lotteryPageBtn_1").hide();
                    $("#lottery_time_tip-msg").removeClass("hide");
                    return;
                }
                if(data.gameNum==-2){
                    $("#tip-msg").html("抽奖出现异常<br/>请退出重新登录再继续操作");
                    return;
                }
                if(data.gameNum==-3){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#tip-msg").html('红包活动已经结束!');
                    $("#lotteryPageBtn_1").hide();
                    $("#lottery_time_tip-msg").addClass("hide");
                    return;
                }//
                if(data.gameNum==-4){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#tip-msg").html('条件不满足，不能参与红包活动!');
                    $("#lotteryPageBtn_1").hide();
                    $("#lottery_time_tip-msg").addClass("hide");
                    return;
                }
                if(data.gameNum==-5){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#tip-msg").html('本次红包已经抢光了');
                    if(data.nextLotteryTime!=""){
                        $("#next_lottery_time").text(data.nextLotteryTime);
                        $("#lottery_time_tip-msg").removeClass("hide");
                    }else{
                        $("#lottery_time_tip-msg").addClass("hide");
                    }
                    $("#lotteryPageBtn_1").hide();
                    $("#lottery_time_tip-msg").removeClass("hide");
                    return;
                }
                /*$("#lotteryPageBtn_1").show();
                $("#lottery_time_tip-msg").addClass("hide");*/
                if(data.award==0){
                    $("#ramain-count").text(data.gameNum);
                    $("#noAwardPage").show();
                }else {
                    $("#lotteryPageBtn_1").removeAttr("disabled");
                    $("#win_id").val(data.id);
                    $("#record_id").val(data.recordId);
                    $("#applyId").val(data.applyId);
                    $("#awardname").html('获得了'+data.award+'元');
                    $("#tip-msg").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会');
                    $("#ramain-count").text(data.gameNum);
                    $("#haveAwardPage").show();
                }
                if(data.gameNum==0){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#lotteryPageBtn_1").hide();
                    if(data.nextLotteryTime!=""){
                        $("#next_lottery_time").text(data.nextLotteryTime);
                        $("#lottery_time_tip-msg").removeClass("hide");
                    }else{
                        $("#lottery_time_tip-msg").addClass("hide");
                    }
                    $("#noAwardPageBtn_0").click(function () {
                        closePage('noAwardPage','lotteryPage');
                        $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    });
                    $("#noAwardPageBtn_1").click(function () {
                        closePage('noAwardPage','lotteryPage');
                        $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    });
                    $("#rewardPageBtn_0").click(function () {
                        closePage('rewardPage','lotteryPage');
                        $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    });
                    closePage('lotteryPage','');
                    return;
                }else{
                    $("#noAwardPageBtn_0").click(function () {
                        onceAgain();
                    });
                    $("#noAwardPageBtn_1").click(function () {
                        onceAgain();
                    });
                    $("#rewardPageBtn_0").click(function () {
                        onceAgain();
                    });
                }
                //$("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/lottery_pc.png)'});
                closePage('lotteryPage','');
            }
        });
    }

    function showExplain(){
        $("#explainContent").html(explainContent);
        $("#explainPage").show();
        closePage('lotteryPage','');
    }

    function applyMoneyActivity(searchId, isRefresh) {
        var code = "money";
        var win_id = $("#win_id").val();
        var applyId = $("#applyId").val();
        $.ajax({
            url: "/ntl/activity/applyActivities.html",
            type: "POST",
            dataType: "json",
            data: {
                code: code,
                resultId: searchId,
                "winId":win_id,
                "applyId":applyId
            },
            success: function (data) {
                if(data.state){
                    closePage('haveAwardPage','rewardPage');
                }else{
                    closePage('haveAwardPage','');
                    closePage('lotteryPage','');
                    $("#containerOut").css("display","none");
                    showWin(data, isRefresh);
                }
                //
            }
        })
    }

    function applyMoney() {
        $.ajax({
            url: "/ntl/activity/isNeedApply.html",
            type: "POST",
            dataType: "json",
            success: function (data) {
                if(!data){
                    return;
                }
                if(data.isNull){
                    return;
                }
                //需要申请
                if(data.state){
                    applyMoneyActivity(data.resultId,true);
                }else{
                    rewardFn();
                }
            }
        });
    }

    function rewardFn(){
        var winId = $("#win_id").val();
        var recordId = $("#record_id").val();
        var applyId = $("#applyId").val();
        if(winId==""||recordId==""||applyId==""){
            console.log('参数不全');
            return;
        }
        var dataParam = {"winId":winId,"recordId":recordId,"applyId":applyId}
        $.ajax({
            url:"/ntl/activity/getReward.html",
            type: "POST",
            dataType: "json",
            data:dataParam,
            success: function(data){
                if(data.state){
                    closePage('haveAwardPage','rewardPage');
                }else{
                    console.log("领取红包失败")
                }
            }
        })

    }
    function onceAgain() {
        $("#lotteryPageBtn_1").removeAttr("disabled");
        $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/lottery_pc.png)'});
        closePage('rewardPage','')
        closePage('haveAwardPage','')
        closePage('noAwardPage','lotteryPage');
    }
</script>