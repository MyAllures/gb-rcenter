$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left'],
        init: pullUpRefreshOption('#pullfresh', pullfresh, false)
    };
    muiInit(options);
    initBanner();
    floatList();
    loadData($('#lottery-id').val(),1);
});

/*轮播图*/
function initBanner() {
    mui('.mui-banner').slider({
        interval: 3000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
    });

    //关闭轮播图
    mui('.gb-banner').on('tap', '.mui-icon', function () {
        $('.gb-banner').slideUp();
        return false;
    });
}

/*浮窗广告*/
function floatList(){
    /* 关闭浮窗广告 */
    mui(".ads-slider").on("tap",".icon-close",function(){
        $(".ads-slider").hide();
    });

    mui(".ads-slider").on("tap",".float_idx",function () {
        var activityId = $(this).attr("objectId");
        if(activityId){
            canShowLottery(activityId);
        }
    });
}

/** 抢红包 */
function canShowLottery (id){
    if (!isLogin || isLogin === "false") {
        goToUrl(root + "/login/commonLogin.html");
        //window.location.href="/login/commonLogin.html";
        return;
    }
    if (!id){
        $(".hongbao").removeClass('disabled');
        $("#tip-msgs").html('红包活动已经结束!');
        $(".hongbao-time-txt").hide();
        $(".hongbao-time").hide();
        return;
    }
    $("#hongbao").addClass('hide_hongbao');
    $("#hongbao_detail").fadeIn(1000);
    mui.ajax({
        url:"/ntl/activity/countDrawTimes.html",
        type: "POST",
        dataType: "json",
        data:{activityMessageId:id},
        success: function(data){
            if(data.drawTimes&&data.drawTimes>0){
                $(".hongbao").removeClass('disabled');
                $("#tip-msgs").show();
                $("#tip-msgs").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">'+data.drawTimes+'</span>次抽奖机会');
                $(".hongbao-time-txt").hide();
                $(".hongbao-time").hide();
            }else if(data.drawTimes==0){
                if(data.isEnd=="false"){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会');
                    $("#ramain-count").text(data.drawTimes);
                }else{
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").hide();
                }
                if(data.nextLotteryTime!=""){
                    $(".hongbao-time-txt").show();
                    $(".hongbao-time").show();
                    $(".hongbao-time").text(data.nextLotteryTime);
                }else{
                    $(".hongbao-time-txt").hide();
                    $(".hongbao-time").hide();
                }

            }else if(data.drawTimes==-1){
                $(".hongbao").addClass('disabled');
                $("#tip-msgs").show();
                $("#tip-msgs").html('红包活动已经结束!');
                $(".hongbao-time-txt").hide();
                $(".hongbao-time").hide();
                return;
            }else if(data.drawTimes==-5){
                $(".hongbao").addClass('disabled');
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
            //setDivCss();
            $("[name='gb.token']").val(data.token);
            $("#activity_message_id").val(id);
        }
    });
}

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
        $(".hongbao").removeClass('disabled');
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

/* 导航tab切换 */
$(".nav").on("tap",".mui-control-item",function(){
    var target = $(this).data('item');
    $(".api-grid ul").removeClass('active');
    $(".api-grid div").removeClass('active');
    $(".api-grid ul[data-list='"+target+"']").addClass('active');
});
/*彩票导航菜单滚动*/
mui('.lottery-nav .mui-scroll-wrapper').scroll({
    scrollY: false, //是否竖向滚动
    scrollX:true, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});
/*彩票切换*/
$(".lottery-nav li").on("tap",function(){
    $(this).siblings().find("a").removeClass("mui-active");
    $(this).find("a").addClass("mui-active");
    var isLoadData = $(this).find("a").attr("loadData");
    var apiId = $(this).find("a").attr("data-lottery-id");
    $('#lottery-id').val(apiId);
    if(!isLoadData){
        loadData(apiId,1);
    }
    var pageNumber = parseInt($('#total-page-'+apiId).attr("pageNumber"));
    var lastPageNumber = parseInt($('#total-page-'+apiId).val());
    if(pageNumber != lastPageNumber){
        mui('#pullfresh').pullRefresh().refresh(true);
    }

});
/*彩票上拉请求数据*/
function pullfresh() {
    setTimeout(function () {
        mui('#pullfresh').pullRefresh().endPullupToRefresh(false);
        var type = $(".nav .mui-scroll .mui-active").attr("data-item");
        if(type == "lottery"){
            mui('#pullfresh').pullRefresh().endPullupToRefresh(false);

            var apiId = $("#lottery-id").val();
            var pageNumber = parseInt($('#total-page-'+apiId).attr("pageNumber"));
            var lastPageNumber = parseInt($('#total-page-'+apiId).val());
            if(pageNumber == lastPageNumber){
                mui('#pullfresh').pullRefresh().endPullupToRefresh(true);
            }else{
                loadData(apiId,pageNumber+1);
            }
        }

    }, 0);
}
/** 切换TAB加载数据 */
function loadData(apiId,pageNumber) {
    mui.ajax(root + '/game/getGameByApiId.html?search.apiId='+apiId+'&search.apiTypeId=4&paging.pageNumber='+pageNumber, {
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        beforeSend: function () {
            //_this.showLoading(338);
            //$('div.lottery-content-' + apiId).parent().addClass('mui-show');
        },
        success: function (data) {
            setTimeout(function() {
                $('#lottery-id').val(apiId);
                $('input#loading-' + apiId).val('false');
                $('div#lottery-' + apiId).append(data);
                $(".lottery-nav a[data-lottery-id='"+apiId+"']").attr("loadData","true");

                $("#total-page-"+apiId).attr("pageNumber",pageNumber);
            }, 1000);
        },
        complete: function () {
            //_this.hideLoading();
        }
    });
}