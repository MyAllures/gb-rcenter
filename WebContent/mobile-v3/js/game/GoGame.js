var apiTypeId;
var apiId;
var apiName;
var gameCode;

function goGame(obj,options){
    if(!isLogin){
        goToUrl("/passport/logout.html");
        //loginOut(e,options);
        return;
    }
    apiTypeId = options.dataApiTypeId;
    apiId = options.dataApiId;
    apiName = options.dataApiName;
    gameCode = options.dataGameCode;

    var isAutoPay = $("#isAutoPay").val();
    //判断ｂｓｇ就直接到游戏列表，不到转账页面
    if (apiId == '20') {
        goToUrl(root+"/game/apiGames.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
    } else if (isAutoPay == 'true') {
        //判断是否免转，如果免转,则直接登陆游戏，不跳到游戏中转页面
        showGameLoading();
        autoLoginAndTransfer();
    } else {
        goToUrl(root + "/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
    }

    /*var isAutoPay = getCookie("isAutoPay");
    if(isAutoPay == 'true') {
        autoPayLogin();
    } else {
        fetchBalance();
    }*/
}

/**
 * 自动转账和登陆游戏
 * @param obj
 */
function autoLoginAndTransfer() {
    var postData = {};
    if (apiId) {
        postData.apiId = apiId;
    }
    if (gameCode) {
        postData.gameCode = gameCode;
    }
    if (apiTypeId) {
        postData.apiTypeId = apiTypeId;
    }
    if (apiId != "") {
        mui.ajax(root + "/transfer/auto/loginAndAutoTransfer.html", {
            dataType: 'json',
            data: postData,
            type: "POST",
            success: function (data) {
                hideLoading();
                if (data) {
                    if (data.isSuccess == true) {
                        var result = data.gameApiResult;
                        if (apiId == 6) {
                            if (os == 'android' || os == 'app_ios') {
                                gotoGame(result.defaultLink, apiId);
                            } else {
                               newWindow.location.href = result.defaultLink;
                            }
                        } else {
                            if (result.defaultLink) {
                                gotoGame(result.defaultLink, apiId);
                            } else {
                                gotoGame(result.links[apiTypeId], apiId);
                            }
                        }
                    } else if (data.msg) {
                        //_this.openLayer(data.msg);
                        openLayer(data.msg);
                        reload();
                        $("[class='mui-backdrop mui-active']").remove();
                    }
                } else {
                    //_this.openLayer(window.top.message.game_auto['无法登录']);
                    openLayer(window.top.message.game_auto['无法登录']);
                    $("[class='mui-backdrop mui-active']").remove();
                    reload();
                }
            },
            error: function (error) {
                if (error.status === 600) {
                    signIn(obj);
                } else if (error.status === 606) {
                    goToUrl(root + '/errors/606.html');
                } else {
                    openLayer(window.top.message.game_auto['无法登录']);
                    $("[class='mui-backdrop mui-active']").remove();
                    reload();
                }
            },
            complete: function () {
                hideGameLoading();
            }
        })
    }
}

/**
 * 打开layer提示窗
 * */
function openLayer(msg) {
    layer.open({
        title: '提示',
        content: msg,
        btn: ['确定', ''],
        yes: function (index) {
            layer.close(index);
        }
    })
}

function signIn (obj) {
    // 存储API登录信息，以便登录成功后进入游戏
    if (page.isLocalStorageSupport()) {
        //如果为空不组成数值，以防解析json报错(gameId与gamecode可能为空)
        var objKey = '{"status":"' + obj.status + '",';
        if (obj.gameId) {
            objKey = objKey + '"gameId":' + obj.gameId + ',';
        }
        if (obj.gameCode) {
            objKey = objKey + '"gameCode":"' + obj.gameCode + '",';
        }
        objKey = objKey + '"apiId":' + obj.apiId + ', "apiTypeId":' + obj.apiTypeId + '}';
        localStorage.setItem(page.apiObjKey, objKey);
    }
    if (page.os == 'ios') {
        goToUrl('/login/commonLogin.html');
    } else if (page.os == 'app_android') {
        window.gamebox.gotoLogin('/index.html');
    } else {
        goToUrl('/login/commonLogin.html');
    }
}

function reload () {
    if (isLogin == 'false') {
        setTimeout(function () {
            page.gotoUrl(window.location.href);
        }, 1000);
    }
}

/**
 * 进入游戏
 * @param url
 * @param apiId
 */
function gotoGame (url, apiId) {
    if (url.indexOf('http') === -1) {
        url = window.location.origin + url;
    }
    if (this.os === 'app_ios') {
        if (apiId == 22) {
            url = url + "?ad=" + apiId;
            goToUrl(url);
        } else {
            gotoGame(url);
        }
    } else if (this.os === 'app_android') {
        if (apiId == 22 && url.indexOf('/mainIndex.') == -1 && url.indexOf('/lottery/') == -1) {
            url = url + "mainIndex.html?ad=22";
        } else {
            if (url.indexOf('?') > 0) {
                url = url + "&ad=" + apiId
            } else {
                url = url + "?ad=" + apiId
            }
        }
        window.gamebox.gotoGame(url);
    } else {
        goToUrl(url);
    }
}

function hideLoading () {
    setTimeout(function () {
        $("#loadingPopover").removeClass('mui-active');
    }, 1000);
}

function hideGameLoading () {
    setTimeout(function () {
        $('div.game-mask').remove();
    }, 1000);
}

function showGameLoading () {
    var content = '<div class="game-mask"><div class="game-loading"></div></div>';
    var loading = '<div class="com-loading" style="display: block"><div class="loader">' +
        '<div class="loader-inner ball-pulse"><div></div><div></div><div></div></div></div></div>' +
        '<div class="loader-tip">' + window.top.message.game_auto["游戏载入中"] + '</div>';
    $('body').append(content);
    var $gl = $('div.game-loading');
    $gl.html(loading);
    var winHeight = $(window).height();
    $gl.css({'top': (winHeight - 100) / 2});
    $('div.game-mask').show();
}

/**
 * 免转登录
 **/
function autoPayLogin() {
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
                        if (apiTypeId == "1" && apiId=="1155") {
                            if (window.localStorage) {
                                localStorage.re_url_live = result.defaultLink;
                            }
                            window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                        }else if (apiTypeId == "2" && apiId=="15") {
                            if (window.localStorage) {
                                localStorage.re_url_casino = result.defaultLink;
                            }
                            window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
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
                        if (apiTypeId == "2") {
                            if (window.localStorage) {
                                localStorage.re_url_casino = result.defaultLink;
                            }
                            window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
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
                    BootstrapDialog.alert({
                        title: 'prompt',
                        message: data.msg,
                        type: BootstrapDialog.TYPE_WARNING,
                        buttonLabel: 'ok',
                        callback: function(result) {
                            if (result){
                                window.close();
                            }
                        }
                    });
                } else {
                    BootstrapDialog.alert({
                        title: 'prompt',
                        message: 'The game is temporarily unable to login, please try again later！',
                        type: BootstrapDialog.TYPE_WARNING,
                        buttonLabel: 'ok',
                        callback: function(result) {
                            if (result){
                                window.close();
                            }
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
                BootstrapDialog.alert({
                    title: 'prompt',
                    message: 'The game is temporarily unable to login, please try again later！',
                    type: BootstrapDialog.TYPE_WARNING,
                    buttonLabel: 'ok',
                    callback: function(result) {
                        if (result){
                            window.close();
                        }
                    }
                });
            }
        }
    })
}


function fetchBalance(){
    $.ajax({
        url: root+"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&apiId="+apiTypeId+"&t="+ new Date().getTime().toString(36),
        type:"get",
        dataType:"JSON",
        success:function(data){
            if((data.apiBalance==null||data.apiBalance<100)&&apiId!='20'){
                showTransferWin(data);
            }else{
                enterToGame();
            }
        },
        error:function(error) {
            console.log("getWalletBalanceAndApiBalance error");
        }
    })
}

function showTransferWin(data){
    //快速转账弹窗，待处理：转账成功后续请求
    var apiName = data.apiName;
    dialog = BootstrapDialog.show({
        title: apiName + ' 快速转账',
        //closable: false, // <-- Default value is false
        draggable: true,
        type: BootstrapDialog.TYPE_WARNING,
        data: {
            'walletBalance': data.walletBalance,
            'apiBalance': data.apiBalance,
            'apiName':data.apiName
        },
        message: function(dialog) {
            var $message = $('<div></div>').load('/commonPage/modal/recharge.html', function(){
                $("#api-name-div",$message).text(dialog.getData("apiName"));
                $("#walletBalance-value",$message).text(dialog.getData("walletBalance"));
                $("#apiBalance-value",$message).text(dialog.getData("apiBalance"));
                $("#token",$message).val(data.token);

            });
            return $message;
        },
        onhide: function(dialogRef){
            apiLoginReal(apiId,gameCode,apiTypeId);
            //enterToGame();
        }
    });
}
function enterToGame(){
    if(dialog!=null){
        dialog.close();
    } else{
        apiLoginReal(apiId,gameCode,apiTypeId);
    }
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
                        if (apiTypeId == "1" && apiId=="1155") {
                            if (window.localStorage) {
                                localStorage.re_url_live = result.defaultLink;
                            }
                            window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                        }else if (apiTypeId == "2" && apiId=="15") {
                            if (window.localStorage) {
                                localStorage.re_url_casino = result.defaultLink;
                            }
                            window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                        }else if (apiTypeId == "4" && apiId=="22") {
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
                        if (apiTypeId == "2") {
                            if (window.localStorage) {
                                localStorage.re_url_casino = result.defaultLink;
                            }
                            window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
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
                if (!data.loginSuccess &&( data.errMsg =='' || data.errMsg == null)){
                    BootstrapDialog.alert({
                        title: 'Prompt',
                        message: 'The game is temporarily unable to login, please try again later!',
                        type: BootstrapDialog.TYPE_WARNING,
                        buttonLabel: 'Confirm',
                        callback: function(result) {
                            if (result){
                                window.close();
                            }
                        }
                    });
                }else {
                    BootstrapDialog.alert({
                        title: 'Prompt',
                        message: data.errMsg,
                        type: BootstrapDialog.TYPE_WARNING,
                        buttonLabel: 'Confirm',
                        callback: function(result) {
                            if (result){
                                window.close();
                            }
                        }
                    });
                }
            }
        },
        error: function(error) {
            if (error.status === 600) {
                window.close();
                loginObj.getLoginPopup();
            }else {
                BootstrapDialog.alert({
                    title: 'Prompt',
                    message: 'The game is temporarily unable to login, please try again later!',
                    type: BootstrapDialog.TYPE_WARNING,
                    buttonLabel: 'Confirm',
                    callback: function(result) {
                        if (result){
                            window.close();
                        }
                    }
                });
            }
        }
    });
}