/**
 * api登陆js
 */
define(['site/include/BaseIndex'], function (BaseIndex) {
    var page;
    return BaseIndex.extend({
        newWindow: null,
        init: function () {
            this._super();
            page = this;
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            /*点击api进入游戏*/
            mui('body').on('tap', '._api', function () {
                var apiId = $(this).data("api-id");
                var apiTypeId = $(this).data("api-type-id");
                var status = $(this).data("status");
                var code = $(this).data('game-code');
                var obj = {};
                obj.apiId = apiId;
                obj.apiTypeId = apiTypeId;
                obj.gameCode = code;
                if (status == "maintain") {
                    _this.openLayer(window.top.message.game_auto['游戏维护中']);
                    $("[class='mui-backdrop mui-active']").remove();
                } else {
                    if (isLogin == "true") {
                        //判断ｂｓｇ就直接到游戏列表，不到转账页面
                        if (apiId == '20') {
                            _this.gotoUrl("/game/apiGames.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        } else if ((isAutoPay == 'true' && apiTypeId != "2")) {
                            //判断是否免转，如果免转,则直接登陆游戏，不跳到游戏中转页面
                            _this.showGameLoading();
                            _this.autoLoginAndTransfer(obj);
                        } else {
                            _this.gotoUrl(root + "/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        }

                    } else
                        _this.toLogin("/");
                }
                if ($(".mui-popover")) {
                    mui('.mui-popover').popover('hide');
                }
            });
            /*点击游戏（电子类、彩票类）进入*/
            mui("body").on("tap", "._game", function () {
                var $this = $(this);
                var status = $this.data('status');
                var code = $(this).data('game-code');
                var obj = $this.data();
                obj.gameCode = code;
                if (status == 'maintain' || status == 'disable') {
                    _this.gameMaintaing();
                } else {
                    if (isLogin == "true") {
                        layer.open({
                            title: window.top.message.game_auto['提示'],
                            content: window.top.message.game_auto['是否进入游戏'],
                            btn: [window.top.message.game_auto['是'], window.top.message.game_auto['否']],
                            yes: function (index) {
                                if (isAutoPay == 'true') {
                                    _this.showGameLoading();
                                    _this.autoLoginAndTransfer(obj);
                                } else {
                                    _this.showGameLoading();
                                    _this.apiLogin(obj);
                                    layer.close(index);

                                }
                                if (obj.apiId == 6 && os != 'android' && os != 'app_ios') {
                                    _this.newWindow = window.open("about:blank", '_blank');
                                    if (_this.newWindow) {
                                        _this.newWindow.document.write("<div style='text-align:center;'><img style='margin-top:" +
                                            document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
                                    }
                                }
                            },
                            no: function (index) {
                                layer.close(index);
                            }
                        })
                    } else {
                        _this.signIn($this.data());
                    }
                }
            });
        },
        /**
         * 进入游戏
         * @param url
         * @param apiId
         */
        gotoGame: function (url, apiId) {
            if (url.indexOf('http') === -1) {
                url = window.location.origin + url;
            }
            if (this.os === 'app_ios') {
                if (apiId == 22) {
                    url = url + "?ad=" + apiId;
                    this.gotoUrl(url);
                } else {
                    gotoGame(url, apiId);
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
                this.gotoUrl(url);
            }
        },

        /**
         * 自动转账和登陆游戏
         * @param obj
         */
        autoLoginAndTransfer: function (obj) {
            var _this = this;
            var apiId = obj.apiId;
            var gameCode = obj.gameCode;
            var apiTypeId = obj.apiTypeId;
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
                        _this.hideLoading();
                        if (data) {
                            if (data.isSuccess == true) {
                                var result = data.gameApiResult;
                                if (apiId == 6) {
                                    if (os == 'android' || os == 'app_ios') {
                                        _this.gotoGame(result.defaultLink, apiId);
                                    } else {
                                        _this.newWindow.location.href = result.defaultLink;
                                    }
                                } else {
                                    if (result.defaultLink) {
                                        _this.gotoGame(result.defaultLink, apiId);
                                    } else {
                                        _this.gotoGame(result.links[apiTypeId], apiId);
                                    }
                                }
                            } else if (data.msg) {
                                _this.openLayer(data.msg);
                                _this.reload();
                                $("[class='mui-backdrop mui-active']").remove();
                            }
                        } else {
                            _this.openLayer(window.top.message.game_auto['无法登录']);
                            $("[class='mui-backdrop mui-active']").remove();
                            _this.reload();
                        }
                    },
                    error: function (error) {
                        if (error.status === 600) {
                            _this.signIn(obj);
                        } else if (error.status === 606) {
                            _this.gotoUrl(root + '/errors/606.html');
                        } else {
                            _this.openLayer(window.top.message.game_auto['无法登录']);
                            $("[class='mui-backdrop mui-active']").remove();
                            _this.reload();
                        }
                    },
                    complete: function () {
                        _this.hideGameLoading();
                    }
                })
            }
        },
        signIn: function (obj) {
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
                page.gotoUrl('/login/commonLogin.html');
            } else if (page.os == 'app_android') {
                window.gamebox.gotoLogin('/index.html');
            } else {
                page.gotoUrl('/login/commonLogin.html');
            }
        },
        apiLogin: function (obj) {
            var _this = this;
            var apiId = obj.apiId;
            var gameId = obj.gameId;
            var gameCode = obj.gameCode;
            var apiTypeId = obj.apiTypeId;
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

            mui.ajax(root + "/api/login.html", {
                type: "POST",
                dataType: "json",
                data: postData,
                success: function (data) {
                    _this.hideLoading();
                    if (data.loginSuccess) {
                        var result = data.gameApiResult;
                        if (apiId == 6) {
                            if (os == 'android' || os == 'app_ios') {
                                _this.gotoGame(result.defaultLink, apiId);
                            } else {
                                _this.newWindow.location.href = result.defaultLink;
                            }
                        } else {
                            if (result.defaultLink) {
                                _this.gotoGame(result.defaultLink, apiId)
                            } else {
                                _this.gotoGame(result.links[apiTypeId], apiId)
                            }
                        }
                    } else {
                        if (!data.loginSuccess && ( data.errMsg == '' || data.errMsg == null)) {
                            if (data.maintain) {
                                _this.gameMaintaing();
                            } else {
                                _this.toast(window.top.message.game_auto['无法登录']);
                            }
                        } else {
                            _this.toast(data.errMsg);
                        }
                        _this.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 600) {
                        _this.signIn(obj);
                    } else if (error.status === 606) {
                        page.gotoUrl(root + '/errors/606.html');
                    } else {
                        _this.toast('暂时无法登录游戏！');
                        _this.reload();
                    }
                },
                complete: function () {
                    _this.hideGameLoading();
                }
            });
        },
        reload: function () {
            if (isLogin == 'false') {
                setTimeout(function () {
                    page.gotoUrl(window.location.href);
                }, 1000);
            }
        },
        gameMaintaing: function () {
            layer.open({
                title: window.top.message.game_auto['提示'],
                content: window.top.message.game_auto['游戏维护中'],
                btn: [window.top.message.game_auto['确定'], ''],
                yes: function (index) {
                    layer.close(index);
                }
            })
        },
        /** 登录成功后进入游戏 */
        enterGame: function () {
            var _this = this;
            if (isLogin == 'true' && _this.isLocalStorageSupport()) {
                var objKey = localStorage.getItem(_this.apiObjKey);
                if (objKey && (typeof objKey !== 'undefined')) {
                    _this.showGameLoading();
                    setTimeout(function () {
                        var obj = JSON.parse(objKey);
                        _this.apiLogin(obj);
                        localStorage.removeItem(_this.apiObjKey);
                    }, 1500);
                }
            }
        },
        loadingGame: function () {
            _this.newWindow = window.open("about:blank", '_blank');
            if (_this.newWindow) {
                _this.newWindow.document.write("<div style='text-align:center;'><img style='margin-top:" +
                    document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
            }
        }
    })
});