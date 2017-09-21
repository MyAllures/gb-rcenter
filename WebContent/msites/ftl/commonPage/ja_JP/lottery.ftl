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
            <input class="inputClass btnFont" onclick="closePage('containerOut','')" id="lotteryPageBtn_0" value="閉じる" type="button"/>
            <input class="inputClass btnFont" id="lotteryPageBtn_1" value="ラッキーマネーを開ける" onclick="lottery()" type="button"/>
            <div style="position: absolute;top: 360px;width: 100%">
                <div style="text-align: center;font-size: 18px;color: #fff;" id="tip-msg">
                    もう<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>回チャンス
                </div>
                <div style="text-align: center;font-size: 18px;color: #fff;" id="lottery_time_tip-msg" class="hide">
                    次回もらう時間は<br><span style="font-size: 22px;padding: 0 5px;color: gold" id="next_lottery_time"></span>
                </div>
            </div>
            <#--<input class="inputClass btnFont" id="lotteryPageBtn_2" value="游戏规则" onclick="showExplain()" type="button"/> -->
        </div>
        <!--中奖页面-->
        <div id="haveAwardPage" class="divBg divClass">
            <input class="inputClass btnFont" onclick="onceAgain()" id="haveAwardPageBtn_0" value="閉じる" type="button"/>
            <p class="ab" id="awardname">
                0元獲得
            </p>
            <#--<input class="inputClass btnFont" onclick="closePage('haveAwardPage','lotteryPage')" id="noAwardPageBtn_1" value="再来一次" type="button"/>-->
            <input class="inputClass btnFont" onclick="applyMoney()" id="haveAwardPageBtn_2" value="ラッキーマネーを獲得" type="button"/>
        </div>
        <!--规则页面-->
        <div class="divBg divClass" id="explainPage">
            <div id="explainContent" class="ab">

            </div>
            <input class="inputClass btnFont" onclick="closePage('explainPage','lotteryPage')" id="explainPageBtn_0" value="戻る" type="button"/>
        </div>
        <!--未中奖页面-->
        <div class="divBg divClass" id="noAwardPage">
            <input class="inputClass btnFont" onclick="onceAgain()" id="noAwardPageBtn_0" value="閉じる" type="button"/>
            <input class="inputClass btnFont" onclick="onceAgain()" id="noAwardPageBtn_1" value="もう一回" type="button"/>
        </div>
        <!--领取页面-->
        <div class="divBg divClass" id="rewardPage">
            <input class="inputClass btnFont" onclick="onceAgain()" id="rewardPageBtn_0" value="確定" type="button"/>
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
            $("#tip-msg").html('キャンペーン終了!');
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
                    $("#tip-msg").html('もう<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>回チャンス');
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
                    $("#tip-msg").html("抽選に異常が発生しました<br/>再度ログインして試してください");
                    return;
                }
                if(data.gameNum==-3){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#tip-msg").html('キャンペーン終了!');
                    $("#lotteryPageBtn_1").hide();
                    $("#lottery_time_tip-msg").addClass("hide");
                    return;
                }//
                if(data.gameNum==-4){
                    $("#lotteryPage").css({'background-image':'url('+fltRootPath+'commonPage/themes/hb/images/noChance_pc.png)'});
                    $("#tip-msg").html('ラッキーマネー抽選に参加する条件に満たしていません。再度ご挑戦ください!');
                    $("#lotteryPageBtn_1").hide();
                    $("#lottery_time_tip-msg").addClass("hide");
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
                    $("#awardname").html(data.award+'元獲得');
                    $("#tip-msg").html('もう<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>回チャンス');
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
            console.log('情報が足りません');
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
                    console.log("ッキーマネー受取失敗です")
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