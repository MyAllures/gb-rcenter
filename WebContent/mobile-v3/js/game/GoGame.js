var apiTypeId;
var apiId;
var apiName;
var gameCode;
var status;
var isAutoPay;
var gameId;

//初始化
$(function () {
    var apiObj = sessionStorage.getItem(SESSION_API_OBJ);
    //从游戏跳转未登录直接进入游戏
    if (apiObj && apiObj != 'undefined') {
        var data = JSON.parse(apiObj);
        sessionStorage.removeItem(SESSION_API_OBJ);
        if (data) {
            apiId = data.apiId;
            apiTypeId = data.apiTypeId;
            gameCode = data.gameCode;
            var targetName = data.targetName;
            if (targetName && apiTypeSlideIndicators) {
                var target = $("a[name='" + targetName + "']")[0];
                var index = $(target).attr("data-swiper-slide-index");
                apiTypeSlideIndicators.slideTo(index);
            }
            readGame();
        }
    }
});

/*点击游戏（电子类、彩票类）进入*/
function goGame(obj, options) {
    apiTypeId = options.dataApiTypeId;
    apiId = options.dataApiId;
    apiName = options.dataApiName;
    status = options.dataStatus;
    gameCode = options.dataGameCode;
    gameId = options.dataGameId;
    isAutoPay = sessionStorage.getItem("isAutoPay");
    if (status == 'maintain' || status == 'disable') {
        showWarningMsg(window.top.message.game_auto['提示'], window.top.message.game_auto['游戏维护中']);
    } else {
        if (sessionStorage.getItem("isLogin") == 'true') {
            var options = {
                title: window.top.message.game_auto['提示'],
                confirm: window.top.message.game_auto['是否进入游戏'],
                btnArray: [window.top.message.game_auto['是'], window.top.message.game_auto['否']],
                func: readGame
            };
            showConfirmMsg(options, obj);
        } else {
            var postData = getApiLoginPostData(apiTypeId, apiId, gameCode);
            signIn(postData);
        }
    }
}

function getApiLoginPostData(apiTypeId, apiId, gameCode) {
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
    return postData;
}

function readGame() {
    if (isAutoPay == 'true' || isAutoPay == true) {
        autoLoginAndTransfer();
    } else {
        apiLogin();
    }
}

function goApiGame(obj, options) {
    /*点击api进入游戏*/
    apiId = options.dataApiId;
    apiTypeId = options.dataApiTypeId;
    status = options.dataStatus;
    gameCode = options.dataGameCode;
    isAutoPay = sessionStorage.getItem("isAutoPay");
    if (status == "maintain") {
        showWarningMsg(window.top.message.game_auto['提示'], window.top.message.game_auto['游戏维护中']);
    } else {
        if (sessionStorage.getItem("isLogin") == 'true') {
            //判断ｂｓｇ就直接到游戏列表，不到转账页面
            if (apiId == '20') {
                goToUrl("/game/apiGames.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
            } else if ((isAutoPay == 'true')) {
                //判断是否免转，如果免转,则直接登陆游戏，不跳到游戏中转页面
                autoLoginAndTransfer();
            } else {
                goToUrl(root + "/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
            }
        } else {
            var postData = getApiLoginPostData(apiId, apiTypeId, gameCode);
            signIn(postData);
        }
    }
}

function apiLogin(obj) {
    //详情页调用
    if (obj != null) {
        apiId = obj.apiId;
        apiTypeId = obj.apiTypeId;
        gameCode = obj.gameCode;
    }
    var postData = getApiLoginPostData(apiTypeId, apiId, gameCode);
    var options = {
        url: root + "/api/login.html",
        type: "POST",
        dataType: "json",
        data: postData,
        success: function (data) {
            gameLogin(data, apiId);
        },
        error: function (error) {
            if (error.status === 600) {
                signIn(postData);
            } else if (error.status === 606) {
                goToUrl(root + '/errors/606.html');
            } else {
                toast('暂时无法登录游戏！');
            }
        },
        complete: function () {
            hideLoading();
        }
    };
    muiAjax(options);
}

//捕鱼和棋牌游戏登录
function fishGameLogin(obj, options) {
    apiId = options.dataApiId;
    apiTypeId = options.dataApiTypeId;
    status = options.dataStatus;
    gameCode = options.dataGameCode;
    gameId = options.dataGameId;
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
    isAutoPay = sessionStorage.getItem("isAutoPay");
    if ((isAutoPay == 'true')) {
        //判断是否免转，如果免转,则直接登陆游戏，不跳到游戏中转页面
        autoLoginAndTransfer();
    } else {
        var options = {
            url: root + "/api/login.html",
            type: "POST",
            dataType: "json",
            data: postData,
            success: function (data) {
                gameLogin(data, apiId);
            },
            error: function (error) {
                if (error.status === 600) {
                    signIn(postData);
                } else if (error.status === 606) {
                    goToUrl(root + '/errors/606.html');
                } else {
                    toast('暂时无法登录游戏！');
                }
            },
            complete: function () {
                hideLoading();
            }
        };
        muiAjax(options);
    }
}

/**
 * 请求成功后进入游戏
 * @param data
 */
function gameLogin(data, apiId) {
    hideLoading();
    if (data.loginSuccess) {
        var result = data.gameApiResult;
        if (result.defaultLink) {
            gotoGameUrl(result.defaultLink, apiId);
        } else {
            gotoGameUrl(result.links[apiTypeId], apiId)
        }
    } else {
        if (!data.loginSuccess && ( data.errMsg == '' || data.errMsg == null)) {
            if (data.maintain) {
                showWarningMsg(window.top.message.game_auto['提示'], window.top.message.game_auto['游戏维护中']);
            } else {
                toast(window.top.message.game_auto['无法登录']);
            }
        } else {
            toast(data.errMsg);
        }
    }
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
            url: root + "/transfer/auto/loginAndAutoTransfer.html",
            dataType: 'json',
            data: postData,
            type: "POST",
            success: function (data) {
                hideLoading();
                if (data) {
                    if (data.isSuccess == true) {
                        var result = data.gameApiResult;
                        if (result.defaultLink) {
                            gotoGameUrl(result.defaultLink, apiId);
                        } else {
                            gotoGameUrl(result.links[apiTypeId], apiId);
                        }
                    } else if (data.msg) {
                        showWarningMsg(window.top.message.game_auto['提示'], data.msg);
                    }
                } else {
                    showWarningMsg(window.top.message.game_auto['提示'], window.top.message.game_auto['无法登录']);
                }
            },
            error: function (error) {
                if (error.status === 600) {
                    signIn(postData);
                } else if (error.status === 606) {
                    goToUrl(root + '/errors/606.html');
                } else {
                    showWarningMsg(window.top.message.game_auto['提示'], window.top.message.game_auto['无法登录']);
                }
            },
            complete: function () {
                hideLoading();
            }
        };
        muiAjax(options);
    }
}

function signIn(data) {
    if (isNative) {
        nativeLogin();
        return;
    }
    // 存储API登录信息，以便登录成功后进入游戏
    if (data) {
        data.targetName = $("div.nav-slide-indicators a.swiper-slide-active").attr("name");
        sessionStorage.setItem(SESSION_API_OBJ, JSON.stringify(data));
    }
    //用来记录跳转页面
    var targetUrl = window.location.href;
    var index = targetUrl.indexOf("&v=");
    if (index <= 0) {
        index = targetUrl.indexOf("?v=");
    }
    targetUrl = targetUrl.substr(0, index);
    login(targetUrl);
}

/** 是否支持本地存储（Safari非无痕模式） */
/*function isLocalStorageSupport() {
 var testKey = 'test';
 var storage = window.sessionStorage;
 try {
 storage.setItem(testKey, 'testValue');
 storage.removeItem(testKey);
 return true;
 } catch (error) {
 return false;
 }
 }*/

/**
 * 进入游戏
 * @param url
 * @param apiId
 */
function gotoGameUrl(url, apiId) {
    if (url.indexOf('http') === -1) {
        url = window.location.origin + url;
    }
    //游戏中带v版本的游戏会找不到地址
    openWindow(url);
}
