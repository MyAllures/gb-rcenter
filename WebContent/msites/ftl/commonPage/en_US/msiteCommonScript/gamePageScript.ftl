<script>
    // 显示游戏弹窗后的逻辑
    $(document).on("click","._game_open",function(e){
        var _this = e.currentTarget;

        if(!$(_this).hasClass("game-demo") && sessionStorage.is_login!="true"){
            loginObj.getLoginPopup();
            return;
        }

        $("html").addClass("game-detail-open");

        var apiId = $(_this).attr("data-api");
        var gameCode = $(_this).attr("data-game-Code");
        var apiTypeId = $(_this).attr("data-apitype");
        var gameId = $(_this).attr("data-game-id");

        var len_rat=$(".wrapper").data("width")/$(".wrapper").data("height");// 获取宽高比
        var w_width=$(".wrapper").css("width");// 当前游戏iframe的宽度
        $(".wrapper iframe").css({width:parseInt(w_width)-260});
        if($(window).width()<=1200){
            $(".wrapper").css({height:"590px"});
        }else{
            $(".wrapper").css({height:((parseInt(w_width))/len_rat)-(len_rat*47)-47});// 根据宽高比计算出游戏iframe的高度
            $("body").css({"min-height":$(window).height()});
        }
        $(window).resize(function(){
            w_width=$(".wrapper").css("width");// 当前游戏iframe的宽度
            if($(window).width()<=1200){
                $(".wrapper").css({height:"590px"});
            }else{
                $(".wrapper iframe").css({width:parseInt(w_width)-260});
                $(".wrapper").css({height:((parseInt(w_width))/len_rat)-(len_rat*47)-47});// 根据宽高比计算出游戏iframe的高度
                $("body").css({"min-height":$(window).height()});
            }
            if($(".game-info").hasClass("hide_G")){
                $(".wrapper iframe").css({width:"100%"});
            }else{
                $(".wrapper iframe").css({width:parseInt(w_width)-260});
            }

        });

        gameSlide();

        //右侧信息拷贝
        var gameImg = "";
        var tags = "";
        var item = $(_this).parents(".game-item");
        if($(item).length>0){
            gameImg = $(item).find("img").prop("src");
            tags = $(item).find(".tags");
        }else{
            if($(_this).find("img").prop("src")!=undefined){
                gameImg = $(_this).find("img").prop("src");
            }else{
                gameImg = $(_this).attr("data-game-img");
            }
        }
        var gameLine = $(_this).attr("data-game-line");
        var gameName = $(_this).attr("data-game-name");
        var apiName = "";
        if($(_this).attr("data-api-name")!=undefined){
            apiName = $(_this).attr("data-api-name");
        }else{
            apiName = $(".swiper-container .swiper-wrapper div.active a em").html();
        }
        var apiName_abb = "";
        var apiImg = "";
        if($(_this).attr("data-api-name-abb")!=undefined){
            apiName_abb = $(_this).attr("data-api-name-abb");
        }else{
            apiName_abb = $(".swiper-container .swiper-wrapper div.active").attr("data-slide");
        }
        if(apiName_abb!=undefined){
            apiImg = "${data.configInfo.ftlRootPath}commonPage/themes/casino/images/api-"+apiName_abb+".png";
            $(".game-info .info-header img").attr("src",apiImg);
            $(".game-detail .body").attr("class","body");
            $(".game-detail .body").addClass(apiName_abb);
        }
        var gameScore = $(_this).attr("data-game-score");
        var introduce = $(_this).attr("data-game-introduce");


        $(".game-info .info-header .info-api-name").text(apiName);
        $(".game-info .game-item img").attr("src",gameImg);
        $(".game-info .game-item .tags").append(tags);
        $(".game-info .game-item .g_title").text(gameName);
        $(".game-info .game-info-content .game-extra-info .fav_a").attr("data-game-id",gameId);
        $(".game-info .game-info-content .game-extra-info .fav_a").attr("data-api",apiId);
        $(".game-info .game-info-content .game-extra-info .gameScore").attr("data-score",gameScore);
        $(".game-info .game-info-content .game-extra-info .gameScore").text(gameScore);
        $("input[name='apiId']","._vr_gameSearch").val(apiId);

        if(Number(gameLine)>0){
            $(".game-info .game-item .g_tx").removeClass("hidden");
            $(".game-info .game-item .g_tx").text(gameLine+"Line");
        }
        if(apiId=="10"){
            $(".game-info .game-info-content .game-extra-info .icon-info").parent().parent().removeClass("hidden");
            $(".game-info .game-info-content .game-extra-info .icon-info").attr("href",introduce);
            $(".game-info .game-info-content .game-extra-info .icon-info").attr("target","_blank");
        }

        // 星级评分插件
        var gameScore = $(".gameScore").data("score");
        var _gameScore = Number(gameScore)>0?Number(gameScore):4;
        $("#star").raty({starType: 'i',half: true,score: _gameScore});
        //页面底部的tag ；默认点击
        $(".game_bottom .list-inline li a").attr("data-api",apiId);
        $(".game_bottom .list-inline li:eq(0) a").click();
        //判断当前游戏是否已经收藏
        $.ajax({
            url: "/siteGame/isCollect.html",
            type: "POST",
            dataType: "json",
            data: {"search.gameId": gameId},
            success: function (data) {
                if (!data.state) {
                    //准备收藏游戏：true
                    $(".fav_a").removeClass("fav_ed")
                    $(".fav_a").attr("data-game-collect", "true");
                } else {
                    $(".fav_a").addClass("fav_ed")
                    $(".fav_a").attr("data-game-collect", "false");
                }
            }
        })

        //游戏评分
        $("#star i").on("click", function (e) {
            var score = $("#star input[name='score']").val()==undefined?4:$("#star input[name='score']").val();
            if (sessionStorage.is_login != "true") {
                loginObj.getLoginPopup();
            } else {
                $.ajax({
                    url: "/siteGame/updateGameScore.html",
                    dataType: "JSON",
                    type: 'POST',
                    data: {"result.gameId": gameId, "result.score": score},
                    success: function (data) {
                        if(data.state){
                            $("#star").raty({starType: 'i',half: true,readOnly:true,score: score});
                        }
                        alert(data.msg);//返回的弹窗内容可以自行更改，也可以不要弹窗。
                    },
                    error: function (data) {
                        alert(data.msg);//返回的弹窗内容可以自行更改，也可以不要弹窗。
                    }
                });
            }
        })

        //右侧显示区隐藏。显示
        $(".wrapper .game-info .hide-btn").off("click").on("click",function(){
            w_width=$(".wrapper").css("width");
            $(this).parent().toggleClass("hide_G");
            if($(this).parent().hasClass("hide_G")){
                $(".wrapper iframe").css({width:"100%"});
            }else{
                $(".wrapper iframe").css({width:parseInt(w_width)-260});
                $(".wrapper").css({height:((parseInt(w_width))/len_rat)-(len_rat*47)-47});// 根据宽高比计算出游戏iframe的高度
                $("body").css({"min-height":$(window).height()});
            }
            return false;
        });

        //侧边栏api切换
        $(".g-s-api-tab a").hover(function(){
            $(this).siblings().removeClass("active");
            $(this).addClass('active');
            $(".g-s-api-content").removeClass("active");
            $(".g-s-api-content[data-api="+$(this).data("api")+"]").addClass("active");
        });
        // ie新窗口打开时配合的代码
        var fullscreen = location.search.substr(1);
        if(fullscreen=="fullscreen"){
            $("html").addClass("fullscreen");
            $(".wrapper .game-info").addClass("hide_G");
            $(".exit-fullscreen").css({top:"-40px"});
            // 提示使用左上角的退出来退出全屏
            layer.msg('Hold down alt+f4 to close the full screen window',{time:3000});
        }

        // 底部栏鼠标移入效果
        $(".game_bottom .icon-arrow-down").on("mouseenter",function () {
            $(this).parents('.game_bottom').addClass("open");
        });
        $('.game_bottom').hover(function (e) {

        },function () {
            $(this).removeClass('open');
        });
        //关闭弹窗
        $('.closeCasinoGame').on('click',function(){
            $(this).parents('html').removeClass('game-detail-open');
            $('.game-info').removeClass('hide_G');
            document.getElementById('box_playGameDemo_iframe').setAttribute('src', "");
            exitFullscreen();
        });

        //判断电子游戏是否试玩
        if($(_this).hasClass("game-demo")){
            demoPayLogin(apiId,gameCode,apiTypeId);
        }else{
            var isAutoPay = getCookie("isAutoPay");
            if(isAutoPay == 'true') {
                fetchAllBalance(apiId,gameCode,apiTypeId);
            } else {
                fetchBalance(apiId,gameCode,apiTypeId);
            }
        }
    });

    /**
     * 试玩登录
     **/
    function demoPayLogin(apiId,gameCode,apiTypeId) {
        var url = "/demo.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId + "&language="+current_language;
        if(gameCode) {
            url = url + "&gameCode=" + gameCode;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                if (data.isSuccess == true) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        /*https协议的请求*/
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            if (apiTypeId == "1" && apiId=="5") {
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                document.getElementById('box_playGameDemo_iframe').setAttribute('src', localStorage.re_url_casino);
                            }else if(apiTypeId == "4" && apiId=="22"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }else{
                                /*游戏调转链接不支持https，所以不能嵌套在对应的-game.ftl里面*/
                                window.location=result.defaultLink;
                                return;
                            }
                        }else{
                            /*http协议的请求*/
                            if(apiTypeId == "3" && apiId =="10"){//BBIN 跳转特殊处理 跳转会不对应游戏类型
                                window.location=result.defaultLink;
                                return;
                            }
                            if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                document.getElementById('box_playGameDemo_iframe').setAttribute('src', localStorage.re_url_casino);
                            }else if(apiTypeId == "3"){
                                if (window.localStorage) {
                                    localStorage.re_url_sport = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            }else if(apiTypeId == "1"){
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }
                        }
                    } else {
                        var redirectUrl = result.links[apiTypeId];
                        if (apiTypeId != "3") {
                            redirectUrl = "/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        } else {
                            redirectUrl = "/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        }
                        window.location=redirectUrl;
                    }
                } else {
                    if(data.msg) {
                        layer.open({
                            content:data.msg,
                            title:'提示',
                            skin:'layui-layer-brand',
                            btn:["确定"],
                            success: function(layer){
                                // 重写关闭按钮
                                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                                // 提示框类型
                                $(layer).addClass("normal-dialog");
                            },
                            yes:function (index) {
                                layer.close(index);
                                $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示页面
                            }
                        });
                    } else {
                        layer.open({
                            content:'游戏暂时无法登录，请稍候再试！',
                            title:'提示',
                            skin:'layui-layer-brand',
                            btn:["确定"],
                            success: function(layer){
                                // 重写关闭按钮
                                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                                // 提示框类型
                                $(layer).addClass("normal-dialog");
                            },
                            yes:function (index) {
                                layer.close(index);
                                $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示页面
                            }
                        });
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    window.close();
                    loginObj.getLoginPopup();
                } else {
                    layer.open({
                        content:'游戏暂时无法登录，请稍候再试！',
                        title:'提示',
                        skin:'layui-layer-brand',
                        btn:["确定"],
                        success: function(layer){
                            // 重写关闭按钮
                            $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                            // 提示框类型
                            $(layer).addClass("normal-dialog");
                        },
                        yes:function (index) {
                            layer.close(index);
                            $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示页面
                        }
                    });
                }
            }
        })
    }

    function fetchAllBalance(apiId,gameCode,apiTypeId){
        var title ='cch';
        $.ajax({
            url: "/ntl/getWalletBalanceAndAllApiBalance.html?t="+ new Date().getTime().toString(36),
            type: "get",
            dataType: "JSON",
            success:function(data){
                if(!data.allBalance>0&&apiId!='20'){
                    showRecharge(data,apiId,gameCode,apiTypeId);
                }else {
                    autoPayLogin(apiId,gameCode,apiTypeId);
                }
            },
            error:function(error){
                console.log("getWalletBalanceAndAllApiBalance error")
            }
        })
    }

    function fetchBalance(apiId,gameCode,apiTypeId){
        $.ajax({
            url:"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            success:function(data){
                if((data.apiBalance==null||data.apiBalance<100)&&apiId!='20'){
                    showTransferWin(data,apiId,gameCode,apiTypeId);
                }else{
                    enterToGame(apiId,gameCode,apiTypeId);
                }
            },
            error:function(error) {
                console.log("getWalletBalanceAndApiBalance error")
            }
        })
    }
    /*var dialog;*/
    function showTransferWin(data,apiId,gameCode,apiTypeId){
        //快速转账弹窗，待处理：转账成功后续请求
        var apiName = data.apiName;
        var dialog = layer.open({
            content:'<div style="width: 400px;margin: 0 auto 10px;"><span style="color: #466488;">Transfer out</span> <span style="background: #466488;color: #fff;width: 90px; display:  inline-block;text-align:  center;height:  33px;line-height: 33px;">My purse</span><span id="walletBalance-value" style="background: #ddd;color: #00b7a4;display:  inline-block;width: 180px;text-align:  center;height:  33px;line-height: 33px;">'+data.walletBalance+'</span> <a href="javascript:refreshWalletBalance('+apiId+')"><span class=" gui gui-refresh" id="wallet-refresh-span"></span></a><a style="float:  right;" class="btn btn-primary" data-win-size="2" target="_blank" href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html">Go to deposit</a></div>' +
            '<div style="width: 400px;margin: 0 auto 10px;"><span style="color: #466488;">Into</span>  <span id="api-name-div" style="background: #466488;color: #fff;width: 90px; display:  inline-block;text-align:  center;height:  33px;line-height: 33px;">'+data.apiName+'</span><span id="apiBalance-value" style="background: #ddd;color: #00b7a4;display:  inline-block;width: 180px;text-align:  center;height:  33px;line-height: 33px;">'+data.apiBalance+'</span> <a href="javascript:refreshApiBalance('+apiId+')"><span class="gui gui-refresh" id="api-refresh-span"></span></a></div>' +
            '<div style="width: 400px;margin: 0 auto 10px;"><span style="background: #466488;color: #fff;width: 90px; display:  inline-block;text-align:  center;margin-left: 31px;height:  33px;line-height: 33px;">￥</span><input style="background: #ddd;color: #00b7a4;display:  inline-block;width: 180px;text-align:  center;vertical-align:  top;border:  0;height:  33px;line-height: 33px;" type="text" class="form-control" id="transferAmount" name="transferAmount" placeholder="Please enter the integer amount"> <span></span><input type="hidden" name="gb.token" id="token"></div>' +
            '<div style="text-align:  center;width:400px;margin: 0 auto 10px;"><button class="btn btn-primary btn-block" type="button" id="confirm-btn" onclick="confirmTransction('+apiId+','+"'"+gameCode+"'"+','+apiTypeId+')"> <span class="gui gui-check-square-o"></span> Confirm transfer         </button></div>' +
            '<div style="text-align:  center;width: 400px;margin: 0 auto 10px;"><button class="btn btn-success btn-block" type="button" onclick="enterToGame('+apiId+','+"'"+gameCode+"'"+','+apiTypeId+')"><span class="gui gui-share"></span> enter the game</button></div>'+
            '<input type="hidden" name="gb.token" id="token">',
            title:apiName + ' Quick transfer',
            area:['600px','285px'],
            skin:'layui-layer-brand',
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $("#token").val(data.token);
            }
        });
    }
    function showRecharge(data,apiId,gameCode,apiTypeId){
        var dialog = layer.open({
            content:'<div style="width: 400px;margin: 0 auto 10px;"><span style="background: #466488;color: #fff;width: 90px;display:  inline-block;text-align:  center;height:  33px;line-height: 33px;">Your balance</span><span id="walletBalance-value" style="background: #ddd;color: #00b7a4;display:  inline-block;width: 280px;text-align:  center;height: 33px;line-height: 33px;">'+data.allBalance+'</span><a href="javascript:refreshWalletBalance('+apiId+')"><span class="gui gui-refresh pull-right" style="color: #337ab7;" id="wallet-refresh-span"></span></a></div>' +
            '<div style="width: 400px;margin: 0 auto 10px;"><a  id="confirm-btn" class="btn btn-primary btn-block" target="_blank" href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html"> <span class="gui gui-check-square-o"></span> Go to deposit </a></div> '+
            '<div style="width: 400px;margin: 0 auto 10px;"><button class="btn btn-success btn-block" type="button" onclick="autoPayLogin('+apiId+','+"'"+gameCode+"'"+','+apiTypeId+')"><span class="gui gui-share"></span> enter the game</button></div>',
            title:'Reminder of balance',
            area:['600px','285px'],
            skin:'layui-layer-brand',
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
            },
            end: function () {
                apiLoginReal(apiId,gameCode,apiTypeId);
            }
        });
    }
    function checkRate(amount){
        if(amount==null||amount==""){
            alert("Incoming amount cannot be empty");
            return false;
        }
        var g = /^[1-9]*[1-9][0-9]*$/;
        if(isNaN(amount)||!g.test(amount)){
            alert("Please enter a positive integer");
            return false;
        }
        var wb = $("#walletBalance-value").text();
        if(wb){
            wb = wb.replace(/,/g, "");;
        }
        if(parseFloat(wb)<parseFloat(amount)){
            alert("Insufficient wallet balance");
            return;
        }
        return true;
    }
    function confirmTransction(apiId,gameCode,apiTypeId){
        var amount = $("[name='transferAmount']").val();
        if(!checkRate(amount)){
            return;
        }
        $("#confirm-btn").attr("disabled",true);
        $.ajax({
            type:"POST",
            data:{
                'transferInto':apiId,
                'transferOut':'wallet',
                'result.transferAmount':$("[name='transferAmount']").val(),
                'result.apiId':apiId,
                'gb.token':$("#token").val()
            },
            url:"${data.contextInfo.playerCenterContext}fund/playerTransfer/transfersMoney.html?t="+ new Date().getTime().toString(36),
            dataType:"JSON",
            beforeSend:function(){
                $("#confirm-btn").html('<span class="loading gui gui-spinner fa-pulse"></span> Transfer');
            },
            success:function(data){
                if (data.isFreeze == true) {
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> Account balance is frozen');
                    alert("Account balance is frozen");
                    return;
                } else if (data.apiStatus == false) {
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> API maintenance or deactivation');
                    alert("This api game is being maintained (or disabled) and cannot be transferred!");
                } else if (data.state == false && data.hasAccount == false) {
                    $("#token").val(data.token);
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> Confirm transfer');
                    alert("The Api cannot be transferred at this time. Please try again later!");
                    setButtonStatus();
                } else if (data.state == false && data.msg) {
                    $("#token").val(data.token);
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> Confirm transfer');
                    alert(data.msg);
                    setButtonStatus();
                } else if (data.state == true) {
                    //转账成功后提示
                    if (data.resultCode == 0) {
                        alert("Successful transfer");
                        $("#confirm-btn").html('<span class="loading gui gui-check"></span> Transfer completed');
                        enterToGame(apiId,gameCode,apiTypeId);
                    }else {//转账不成功或待确认
                        $("#token").val(data.token);
                        $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> Confirm transfer');
                        tryAgain(data);
                    }
                    setButtonStatus();
                }

            },
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                if(textStatus=="608"){
                    alert("Please do not double submit");
                }else{
                    setButtonStatus();
                    alert("Request exception, please contact customer service");
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> Confirm transfer');
                }
            },
            complete: function () {

            }
        });
    }
    function tryAgain(data){
        var dialog =  layer.open({
            content:'I am very sorry, due to an abnormal network connection, this order has timed out. I suggest you try again later!',
            title:'Order timed out',
            skin:'layui-layer-brand',
            area:['360px'],
            btn:['try again','cancel'],
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                // 提示框按钮类型
                if(!!btnRound){
                    $(layer).addClass("dialog-btn-round");
                }
                if(!!btnBorder){
                    $(layer).addClass("dialog-btn-border");
                }
            },
            yes:function () {
                layer.close(dialog);
                reconnectTransfer(data.transactionNo);
            },
            btn2:function(){
                layer.close(dialog);
                $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> Confirm transfer');
            }
        });
    }
    /**
     * 再试一次
     * @param e
     * @param option
     */
    function reconnectTransfer(transactionNo) {
        $("#confirm-btn").attr("disabled",true);
        /*if(dialog){
            dialog.setClosable(false);
        }*/
        $("#confirm-btn").html('<span class="loading gui gui-spinner fa-pulse"></span> Transfer');
        $.ajax({
            url: "${data.contextInfo.playerCenterContext}fund/playerTransfer/reconnectTransfer.html",
            data: {'search.transactionNo':transactionNo},
            dataType: "json",
            loading: true,
            success: function (data) {
                if (data.state == false) {
                    alert("Transfer failed, please try again later");
                    return;
                }
                //转账成功后提示
                if (data.state == true && data.resultCode == 0) {
                    alert("success");
                    return;
                }
                setButtonStatus();
                $("#confirm-btn").html('<span class="loading gui gui-check"></span> Transfer completed');
                tryAgain(data);
            },
            error: function (data) {
            }
        });
    }
    function enterToGame(apiId,gameCode,apiTypeId){
        /*if(dialog!=null){
            layer.close(dialog);
        } else{*/
            apiLoginReal(apiId,gameCode,apiTypeId);
//        }
    }
    function setButtonStatus() {
        $("#confirm-btn").attr("disabled", false);
        /*if (dialog) {
            dialog.setClosable(true);
        }*/
    }
    function refreshWalletBalance(apiId){
        $.ajax({
            url:"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            beforeSend:function(){
                $("#wallet-refresh-span").addClass("gui-pulse")
            },
            success:function(data){
                if(data.walletBalance){
                    $("#walletBalance-value").text(data.walletBalance);
                }else{
                    alert("Refresh failed, no wallet balance was obtained");
                }
                $("#wallet-refresh-span").removeClass("gui-pulse");
            },
            error:function(error) {
                console.log("getWalletBalanceAndApiBalance error")
            }
        })
    }
    function refreshApiBalance(apiId){
        var url = "${data.contextInfo.playerCenterContext}fund/playerTransfer/refreshApi.html?type=api&search.apiId=" + apiId + "&t=" + new Date().getTime();
        $.ajax({
            url: url,
            dataType: "json",
            beforeSend:function(){
                $("#api-refresh-span").addClass("gui-pulse")
            },
            success: function (data) {
                if(data.apiMoney){
                    $("#apiBalance-value").text(data.apiMoney);
                }else{
                    alert("Refresh failed, no API balance was obtained");
                }
                $("#api-refresh-span").removeClass("gui-pulse");
            }
        });
    }
    function autoPayLogin(apiId,gameCode,apiTypeId) {
        var url = "/transfer/auto/loginAndAutoTransfer.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId;
        if(gameCode) {
            url = url + "&gameCode=" + gameCode;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                if (data.isSuccess == true) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        /*https协议的请求*/
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            if (apiTypeId == "1" && apiId=="5") {
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                document.getElementById('box_playGameDemo_iframe').setAttribute('src', localStorage.re_url_casino);
                            }else if(apiTypeId == "4" && apiId=="22"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }else{
                                /*游戏调转链接不支持https，所以不能嵌套在对应的-game.ftl里面*/
                                window.location=result.defaultLink;
                                return;
                            }
                        }else{
                            /*http协议的请求*/
                            if(apiTypeId == "3" && apiId =="10"){//BBIN 跳转特殊处理 跳转会不对应游戏类型
                                window.location=result.defaultLink;
                                return;
                            }
                            if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                document.getElementById('box_playGameDemo_iframe').setAttribute('src', localStorage.re_url_casino);
                            }else if(apiTypeId == "3"){
                                if (window.localStorage) {
                                    localStorage.re_url_sport = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            }else if(apiTypeId == "1"){
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }
                        }
                    } else {
                        var redirectUrl = result.links[apiTypeId];
                        if (apiTypeId != "3") {
                            redirectUrl = "/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        } else {
                            redirectUrl = "/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        }
                        window.location=redirectUrl;
                    }
                    layer.closeAll();
                } else {
                    if(data.msg) {
                        layer.close(layer.index);
                    } else {
                        layer.close(layer.index);
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    window.close();
                    loginObj.getLoginPopup();
                } else {
                    closeIframeAlert("The game is temporarily unable to log in. Please try again later!");
                    $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示滚动条
                }
            }
        })
    }
    function apiLoginReal(apiId, gameCode, apiTypeId) {
        $.ajax({
            type: "POST",
            url: "/api/login.html?t=" + new Date().getTime().toString(36),
            dataType: "JSON",
            data: {
                apiId: apiId,
                gameCode: gameCode,
                apiTypeId: apiTypeId,
                gamesHall: window.location.href
            },
            success: function(data) {
                if (data.loginSuccess) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        /*https协议的请求*/
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                document.getElementById('box_playGameDemo_iframe').setAttribute('src', localStorage.re_url_casino);
                            }else if(apiTypeId == "4" && apiId=="22"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }else{
                                //处理https不兼容的情况
                                /*游戏调转链接不支持https，所以不能嵌套在对应的-game.ftl里面*/
                                window.location=result.defaultLink;
                                return;
                            }
                        }else{
                            /*http协议的请求*/
                            if(apiTypeId == "3" && apiId =="10"){//BBIN 跳转特殊处理 跳转会不对应游戏类型
                                window.location=result.defaultLink;
                                return;
                            }
                            if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                document.getElementById('box_playGameDemo_iframe').setAttribute('src', localStorage.re_url_casino);
                            }else if(apiTypeId == "3"){
                                if (window.localStorage) {
                                    localStorage.re_url_sport = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            }else if(apiTypeId == "1"){
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }
                        }
                    } else {
                        var redirectUrl = result.links[apiTypeId];
                        if (apiTypeId != "3") {
                            redirectUrl = "/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        } else {
                            redirectUrl = "/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        }
                        window.location=redirectUrl;
                    }
                    layer.closeAll();
                } else {
                    if (!data.loginSuccess &&( data.errMsg =='' || data.errMsg == null)){
                        closeIframeAlert("游戏暂时无法登录，请稍候再试！");
                        $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示滚动条
                    }else {
                        closeIframeAlert(data.errMsg);
                        $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示滚动条
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    window.close();
                    loginObj.getLoginPopup();
                }else {
                    closeIframeAlert("游戏暂时无法登录，请稍候再试！");
                    $("html",window.parent.document).removeClass("game-detail-open");//去除样式显示滚动条
                }
            }
        });
    }

    //底部游戏滚动效果
    function gameSlide() {
        // game-slide
        jQuery(".b-g-slide").slide({
            mainCell: ".slide-inner ul",
            effect: "leftLoop",
            autoPlay: false,
            interTime: 2500,
            autoPage: true,
            trigger: "click",
            vis:($(window).width()-80)/140,
            scroll: 1
        });
    }
    function gameFullScreen(){
        var ie = /msie/.test(navigator.userAgent.toLowerCase())||/trident/.test(navigator.userAgent.toLowerCase())||/trident/.test(navigator.userAgent.toLowerCase());
        if(ie){// 如果是ie用新开窗口的模式模拟全屏
            window.open(document.location+"?fullscreen", 'game', 'fullscreen');
        }else{// 如果不是ie正常模式全屏
            launchFullscreen(document.documentElement);
        }
    }
    function fullScreen(){
        var ie = /msie/.test(navigator.userAgent.toLowerCase())||/trident/.test(navigator.userAgent.toLowerCase())||/trident/.test(navigator.userAgent.toLowerCase());
        if(ie){// 如果是ie用新开窗口的模式模拟全屏
            window.open(document.location+"?fullscreen", 'game', 'fullscreen');
        }else{// 如果不是ie正常模式全屏
            launchFullscreen(document.documentElement);
        }
    }
    function launchFullscreen(element) {// 启用全屏
        if(document.documentElement.msRequestFullscreen||document.documentElement.mozRequestFullScreen||document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen){
            $("html").addClass("fullscreen");
            $(".wrapper .game-info").addClass("hide_G");
        }
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }
        // 提示使用左上角的退出来退出全屏
        layer.msg('Click the icon in the upper left corner or press ESC to exit full screen',{time:3000});
    }
    function exitFullscreen() {// 退出全屏
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        $("html").removeClass("fullscreen");
    }
    // 监听全屏状态变化的事件
    document.addEventListener("fullscreenchange", function(e) {
        if(!IsFull()){
            $("html").removeClass("fullscreen");
            $('.wrapper').height($('.wrapper').width()*7.5/16);
        }
    });
    document.addEventListener("mozfullscreenchange", function(e) {
        if(!IsFull()){
            $("html").removeClass("fullscreen");
            $('.wrapper').height($('.wrapper').width()*7.5/16);
        }
    });
    document.addEventListener("webkitfullscreenchange", function(e) {
        if(!IsFull()){
            $("html").removeClass("fullscreen");
            $('.wrapper').height($('.wrapper').width()*7.5/16);
        }
    });
    document.addEventListener("msfullscreenchange", function(e) {
        if(!IsFull()){
            $("html").removeClass("fullscreen");
            $('.wrapper').height($('.wrapper').width()*7.5/16);
        }
    });
    //判断是否全屏
    function IsFull() {
        var fullscreenElement =
                document.fullscreenEnabled
                || document.mozFullscreenElement
                || document.webkitFullscreenElement;
        var fullscreenEnabled =
                document.fullscreenEnabled
                || document.mozFullscreenEnabled
                || document.webkitFullscreenEnabled;
        if (fullscreenElement == null)
        {
            return false;
        } else {
            return true;
        }
    }
</script>