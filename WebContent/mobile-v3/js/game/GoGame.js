var apiTypeId;
var apiId;
var apiName;
var gameCode;
var status;
var isAutoPay;
var gameId;
var isLogin = sessionStorage.getItem("isLogin");

/*点击游戏（电子类、彩票类）进入*/
function goGame(obj,options){
    apiTypeId = options.dataApiTypeId;
    apiId = options.dataApiId;
    apiName = options.dataApiName;
    status = options.dataStatus;
    gameCode = options.dataGameCode;
    gameId = options.dataGameId;
    isAutoPay = sessionStorage.getItem("isAutoPay");//$("#isAutoPay").val();
    if (status == 'maintain' || status == 'disable') {
        gameMaintaing();
    } else {
        if (isLogin == true) {
            layer.open({
                title: window.top.message.game_auto['提示'],
                content: window.top.message.game_auto['是否进入游戏'],
                btn: [window.top.message.game_auto['是'], window.top.message.game_auto['否']],
                yes: function (index) {
                    if (isAutoPay == 'true') {
                        showGameLoading();
                        autoLoginAndTransfer();
                    } else {
                        showGameLoading();
                        apiLogin(obj);
                        layer.close(index);

                    }
                    if (apiId == 6 && os != 'android' && os != 'app_ios') {
                        obj.newWindow = window.open("about:blank", '_blank');
                        if (obj.newWindow) {
                            obj.newWindow.document.write("<div style='text-align:center;'><img style='margin-top:" +
                                document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
                        }
                    }
                },
                no: function (index) {
                    layer.close(index);
                }
            })
        } else {
            signIn(obj);
        }
    }
}

function goApiGame(obj,options){
    /*点击api进入游戏*/
        apiId = options.dataApiId;
        apiTypeId = options.dataApiTypeId;
        status = options.dataStatus;
        gameCode = options.dataGameCode;
        isAutoPay = sessionStorage.getItem("isAutoPay");//$("#isAutoPay").val();
        var obj = {};
        obj.apiId = apiId;
        obj.apiTypeId = apiTypeId;
        obj.gameCode = gameCode;
        if (status == "maintain") {
            openLayer(window.top.message.game_auto['游戏维护中']);
            $("[class='mui-backdrop mui-active']").remove();
        } else {
            if (isLogin == true) {
                //判断ｂｓｇ就直接到游戏列表，不到转账页面
                if (apiId == '20') {
                    goToUrl("/game/apiGames.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                } else if ((isAutoPay == 'true' && apiTypeId != "2")) {
                    //判断是否免转，如果免转,则直接登陆游戏，不跳到游戏中转页面
                    showGameLoading();
                    autoLoginAndTransfer();
                } else {
                    goToUrl(root + "/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                }

            } else{
                //_this.toLogin("/");
                login("/");
            }
        }
        if ($(".mui-popover")) {
            mui('.mui-popover').popover('hide');
        }
}

function gameMaintaing() {
    layer.open({
        title: window.top.message.game_auto['提示'],
        content: window.top.message.game_auto['游戏维护中'],
        btn: [window.top.message.game_auto['确定'], ''],
        yes: function (index) {
            layer.close(index);
        }
    })
}

function apiLogin(obj) {
    if(obj != null){
        apiId = obj.apiId;
        apiTypeId = obj.apiTypeId;
        gameCode = obj.gameCode;
    }
    /*var _this = this;
    var apiId = obj.apiId;
    var gameId = obj.gameId;
    var gameCode = obj.gameCode;
    var apiTypeId = obj.apiTypeId;*/
    var postData = {};
    if (apiId) {
        postData.apiId = apiId;
    }
    if (gameId && gameId != 0) {
        postData.gameId = gameId;
    }
    if (gameCode) {
        postData.gameCode = gameCode;
    }
    if (apiTypeId) {
        postData.apiTypeId = apiTypeId;
    }

    var options={
        url:root + "/api/login.html",
        type:"POST",
        dataType:"json",
        data:postData,
        success:function(data){
            hideLoading();
            if (data.loginSuccess) {
                var result = data.gameApiResult;
                if (apiId == 6) {
                    if (os == 'android' || os == 'app_ios') {
                        gotoGame(result.defaultLink, apiId);
                    } else {
                        //_this.newWindow.location.href = result.defaultLink;
                        goToUrl(result.defaultLink);
                    }
                } else {
                    if (result.defaultLink) {
                        gotoGame(result.defaultLink, apiId)
                    } else {
                        gotoGame(result.links[apiTypeId], apiId)
                    }
                }
            } else {
                if (!data.loginSuccess && ( data.errMsg == '' || data.errMsg == null)) {
                    if (data.maintain) {
                        gameMaintaing();
                    } else {
                        toast(window.top.message.game_auto['无法登录']);
                    }
                } else {
                    toast(data.errMsg);
                }
                reload();
            }
        },
        error:function(error){
            if (error.status === 600) {
                signIn(obj);
            } else if (error.status === 606) {
               goToUrl(root + '/errors/606.html');
            } else {
                toast('暂时无法登录游戏！');
                reload();
            }
        },
        complete:function(){
            hideGameLoading();
        }
    };
    muiAjax(options);
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
        var options = {
            url:root + "/transfer/auto/loginAndAutoTransfer.html",
            dataType:'json',
            data:postData,
            type:"POST",
            success:function(data){
                hideLoading();
                if (data) {
                    if (data.isSuccess == true) {
                        var result = data.gameApiResult;
                        if (apiId == 6) {
                            if (os == 'android' || os == 'app_ios') {
                                gotoGame(result.defaultLink, apiId);
                            } else {
                                //newWindow.location.href = result.defaultLink;
                                goToUrl(result.defaultLink);
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
            error:function(error){
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
            complete:function(){
                hideGameLoading();
            }
        };
        muiAjax(options);
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
    if (isLocalStorageSupport()) {
        //如果为空不组成数值，以防解析json报错(gameId与gamecode可能为空)
        var objKey = '{"status":"' + status + '",';
        if (gameId) {
            objKey = objKey + '"gameId":' + gameId + ',';
        }
        if (gameCode) {
            objKey = objKey + '"gameCode":"' + gameCode + '",';
        }
        objKey = objKey + '"apiId":' + apiId + ', "apiTypeId":' + apiTypeId + '}';
        localStorage.setItem('api_object', objKey);
    }
    if (os == 'ios') {
        goToUrl('/login/commonLogin.html');
    } else if (os == 'app_android') {
        window.gamebox.gotoLogin('/index.html');
    } else {
        goToUrl('/login/commonLogin.html');
    }
}

/** 是否支持本地存储（Safari非无痕模式） */
function isLocalStorageSupport() {
    var testKey = 'test';
    var storage = window.sessionStorage;
    try {
        storage.setItem(testKey, 'testValue');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
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
        gotoGame(url);
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