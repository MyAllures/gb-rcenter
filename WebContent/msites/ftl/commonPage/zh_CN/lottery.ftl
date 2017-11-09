<!-- 新界面开始-->
<div id="hongbao_detail" class="hongbao_detail">

    <input type="hidden" id="activity_message_id" value="">
    <input type="hidden" id="win_id" value="">
    <input type="hidden" id="record_id" value="">
    <input type="hidden" id="applyId" value="">
    <input type="hidden" name="gb.token" value="">

    <div class="hongbao_inner">
        <div class="icon-close" onclick="closePage()"></div>
        <div class="hongbao"><!--未能拆时加disabled类名-->
            <div id="lotteryPages" style="margin-top: 210px;">
                <div class="icon-open" onclick="lottery()"></div>
                <div class="hongbao-time-txt">下次拆红包开始时间为</div>
                <div class="hongbao-time">2017-11-11  11:11:11</div>
                <div style="text-align: center;font-size: 18px;color: #fff;" id="tip-msgs">
                    你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会
                </div>
                <a href="javascript:" class="btn-rule" id="btn-rule" onclick="openRule()"></a>
                <!--红包规则元素-->
                <div class="hongbao-rule">
                    <div class="txt">
                        <div class="nice-wrapper">
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                            游戏规则游戏规则
                        </div>
                    </div>
                    <a href="javascript:" class="icon-close-rule" onclick="closeRule()"></a>
                </div>
            </div>
            <!--中奖时的提示-->
            <div class="win-hongbao tips">
                <div class="ttxt-1">恭喜您</div>
                <div class="ttxt-2">获得20元</div>
            </div>
            <!--未中奖时的提示-->
            <div class="lose-hongbao tips">
                <div class="ttxt-1">很遗憾</div>
                <div class="ttxt-2">还差一点就中奖了呦！</div>
            </div>
        </div>
        <div class="hongbao_extra"></div>
        <!--拆开红包时的彩带和光环-->
        <div class="caidai"></div>
        <div class="hongbao-light"></div>
        <!--关闭红包继续抽奖按钮-->
        <a href="javascript:" id="btn-ok" class="btn-ok" onclick="onceAgain()"></a>
    </div>
</div>
<!-- 新界面开始-->

<script>

    /*红包脚本开始*/
    /*关闭红包*/
    function closePage(){
        $("#hongbao_detail .icon-close").parents('.hongbao_detail').fadeOut(1000);
        $("#hongbao").removeClass('hide_hongbao');
        $("#lotteryPages").show();
        $(".tips").hide();
        $(".hongbao_inner").removeClass("opened");
    }

    /*打开红包规则*/
    function openRule(){
        $('.hongbao-rule').show();
        /*自定义滚动条*/
        $(".hongbao-rule .txt").niceScroll(".nice-wrapper", {
            cursorwidth: "12px",
            cursorcolor:"#c0111c",
            cursorborder: "1px solid #d2aa48"
        });
    }
    /*关闭红包规则*/
    function closeRule(){
        $(".hongbao-rule").hide();
    }
    /*打开红包*/
    function lottery(){
        var flag = $(".hongbao").hasClass("disabled");
        if(flag){
            return;
        }
        $("#win_id").val("");
        $("#record_id").val("");
        $("#applyId").val("");
        var id = $("#activity_message_id").val();
        if(!id){
            $("#tip-msgs").html('红包活动已经结束!');
            $(".hongbao-time-txt").hide();
            $(".hongbao-time").hide();
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
                console.log(data.nextLotteryTime);
                console.log(data.gameNum);
                console.log(data.award);
                if(data.gameNum==-1){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会');
                    if(data.nextLotteryTime!=""){
                        $(".hongbao-time-txt").show();
                        $(".hongbao-time").show();
                        $(".hongbao-time").text(data.nextLotteryTime);
                    }else{
                        $(".hongbao-time-txt").hide();
                        $(".hongbao-time").hide();
                    }
                    $("#tip-msgs").show();
                    return;
                }
                if(data.gameNum==-2){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html("抽奖出现异常<br/>请退出重新登录再继续操作");
                    $(".hongbao-time-txt").hide();
                    $(".hongbao-time").hide();
                    return;
                }
                if(data.gameNum==-3){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('红包活动已经结束!');
                    $(".hongbao-time-txt").hide();
                    $(".hongbao-time").hide();
                    return;
                }
                if(data.gameNum==-4){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('条件不满足，不能参与红包活动!');
                    $(".hongbao-time-txt").hide();
                    $(".hongbao-time").hide();
                    return;
                }
                if(data.gameNum==-5){
                    $(".hongbao").addClass("disabled");
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('本次红包已经抢光了');
                    if(data.nextLotteryTime!=""){
                        $(".hongbao-time-txt").show();
                        $(".hongbao-time").show();
                        $(".hongbao-time").text(data.nextLotteryTime);
                    }else{
                        $(".hongbao-time-txt").hide();
                        $(".hongbao-time").hide();
                    }
                    return;
                }
                if(data.award==0){
                    $(".icon-open").parents(".hongbao_inner").addClass('opened');
                    $("#lotteryPages").hide();
                    $(".lose-hongbao").show();
                    $("#ramain-count").text(data.gameNum);
                }else {
                    $(".icon-open").parents(".hongbao_inner").addClass('opened');
                    $("#lotteryPages").hide();
                    $(".win-hongbao.tips").show();
                    $("#win_id").val(data.id);
                    $("#record_id").val(data.recordId);
                    $("#applyId").val(data.applyId);
                    $(".win-hongbao　.ttxt-2").html('获得了'+data.award+'元');
                    $("#ramain-count").text(data.gameNum);
                }
                if(data.gameNum==0){
                    $(".hongbao").addClass('disabled');
                    if(data.nextLotteryTime!=""){
                        $(".hongbao-time-txt").show();
                        $(".hongbao-time").show();
                        $(".hongbao-time").text(data.nextLotteryTime);
                    }else{
                        $(".hongbao-time-txt").hide();
                        $(".hongbao-time").hide();
                    }
                    return;
                }else{

                }
            }
        });
    }
    function onceAgain(){
        $(".hongbao_inner").removeClass("opened");
        $("#lotteryPages").show();
        $(".tips").hide();
    }
    /*红包脚本结束*/
</script>