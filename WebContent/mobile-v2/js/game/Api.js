/**
 * API
 * Created by bill on 17-02-21.
 */
define(['site/game/ApiLogin'], function (ApiLogin) {
    return ApiLogin.extend({
        init: function () {
            /*内容区域滚动*/
            mui('.mui-content.mui-scroll-wrapper').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            });
            mui('.popover-scroll').scroll();
            this.onPageLoad();
            this.bindEvent();
        },
        onPageLoad: function () {
            // mui('.mui-scroll-wrapper').scroll();
            this._super();
            this.getApiBalance();

        },
        bindEvent: function () {
            var _this = this;
            /*金额转入弹窗*/
            $('.btn-in').click(function () {
                var demoModel = sessionStorage.demoModel;
                if (demoModel && demoModel != 'undefined') {
                    _this.toast(window.top.message.game_auto['试玩模式不支持额度转换']);
                    return;
                }
                mui.confirm("<input type='text' id='transferIn' name='transferAmount' placeholder='¥'>", window.top.message.game_auto['转入金额'], [window.top.message.game_auto['确认'], window.top.message.game_auto['取消']], function (e) {
                    if (e.index === 0) {
                        var transferIn = $("#transferIn").val();
                        var $this = $($(".mui-popup-buttons .mui-popup-button").get(0));
                        if (transferIn != "" && transferIn != "0") {
                            mui.ajax("/transfer/checkTransferAmount.html", {
                                type: 'POST',
                                data: {'result.transferAmount': transferIn, 'transferOut': 'wallet'},
                                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                                dataType: 'String',
                                beforeSend: function () {
                                    $this.attr("disabled", "disabled").text(window.top.message.game_auto['提交中']);
                                },
                                success: function (data) {
                                    if (data == 'true') {
                                        _this.submitTransfer(true, transferIn);
                                    } else {
                                        _this.toast(window.top.message.game_auto['当前钱包余额不足']);
                                        $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
                                    }
                                },
                                error: function () {
                                    $('.mui-popup').attr("style", "");
                                    $this.text('确认提交').removeAttr("disabled");
                                    _this.toast(window.top.message.game_auto['转账异常']);
                                }
                            });
                            $('.mui-popup').attr("style", "opacity:1;display:block");//不关闭对话框
                        }
                        return false;
                    } else {
                        //点击取消删除弹窗内容，以防止出现异常时，无法点击取消弹窗
                        $('.mui-popup').remove();
                    }
                }, 'div');
                $('.mui-popup').addClass('money-window');
                inputNumber.init($('[name=transferAmount]'), {
                    negative: false,
                    decimal: false,
                    intSize: 9
                });
            });
            /*金额转出弹窗*/
            $('.btn-out').click(function () {
                var demoModel = sessionStorage.demoModel;
                if (demoModel && demoModel != 'undefined') {
                    _this.toast(window.top.message.game_auto['试玩模式不支持额度转换']);
                    return;
                }
                mui.confirm("<input type='text' id='transferOut' placeholder='¥'>", window.top.message.game_auto['转出金额'], [window.top.message.game_auto['确认'], window.top.message.game_auto['取消']], function (e) {
                    if (e.index === 0) {
                        var transferOut = $("#transferOut").val();
                        var $this = $($(".mui-popup-buttons .mui-popup-button").get(0));
                        if (transferOut != "" && transferOut != "0") {
                            mui.ajax("/transfer/checkTransferAmount.html", {
                                type: 'POST',
                                data: {'result.transferAmount': transferOut, 'transferOut': $("#apiId").val()},
                                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                                dataType: 'String',
                                beforeSend: function () {
                                    $this.attr("disabled", "disabled").text(window.top.message.game_auto['提交中']);
                                },
                                success: function (data) {
                                    if (data == 'true') {
                                        _this.submitTransfer(false, transferOut);
                                    } else {
                                        _this.toast(window.top.message.game_auto['当前游戏余额不足']);
                                        $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
                                    }
                                },
                                error: function () {
                                    $('.mui-popup').attr("style", "");
                                    $this.text('确认提交').removeAttr("disabled");
                                    _this.toast(window.top.message.game_auto['转账异常']);
                                }
                            });
                            $('.mui-popup').attr("style", "opacity:1;display:block");//不关闭对话框
                        }

                        return false;
                    } else {
                        //点击取消删除弹窗内容，以防止出现异常时，无法点击取消弹窗
                        $('.mui-popup').remove();
                    }
                }, 'div');
                $('.mui-popup').addClass('money-window');
                inputNumber.init($('#transferOut'), {
                    negative: false,
                    decimal: false,
                    intSize: 9
                });
            });
            mui('body').on('tap', '#refreshApi', function () {
                $(this).addClass("gb-spin");
                _this.getApiBalance(true);
            });
            mui('body').on('tap', 'a[data-href]', function () {
                _this.gotoUrl($(this).data("href"));
            });
            mui('body').on('tap', "#startGame", function () {
                var apiId = $("#apiId").val();
                var apiTypeId = $("#apiTypeId").val();
                var data = new Object({'apiId': apiId, 'apiTypeId': apiTypeId});
                if (apiId == '3' && apiTypeId == '1')
                    data.gameCode = "1179";
                if (apiId != "") {
                    if (apiId == "10") {
                        _this.apiLogin(data);
                        _this.showGameLoading();
                    } else if (apiTypeId != "" && (apiTypeId == "1" || apiTypeId == "3" || apiTypeId == "4")) {
                        _this.apiLogin(data);
                        _this.showGameLoading();
                    } else if (apiTypeId != "" && (apiTypeId == "2")) {
                        if (os == 'app_ios')
                            gotoPay("/game/apiGames.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        else
                            _this.gotoUrl("/game/apiGames.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                    }
                }
            });
        },
        getApiBalance: function (isRefresh, apiId) {
            var _this = this;
            if (apiId == null)
                apiId = $("#apiId").val();
            if (apiId != "" && $("#apiBalance").size() != 0)
                mui.ajax('/api/apiBalance.html', {
                    type: 'POST',
                    data: {'search.apiId': apiId, 'isRefresh': isRefresh || false},
                    headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                    dataType: 'json',
                    success: function (data) {
                        $('#apiBalance').html(data.apiMoney);
                        if (isRefresh) {
                            $("#refreshApi").removeClass("gb-spin");
                            _this.toast(window.top.message.game_auto['刷新成功']);
                        }
                    },
                    error: function () {
                        if (isRefresh) {
                            $("#refreshApi").removeClass("gb-spin");
                            _this.toast(window.top.message.game_auto['刷新失败']);
                        }
                    }
                });
            else
                $("#refreshApi").removeClass("gb-spin");
        },
        submitTransfer: function (isOut, amount) {
            var _this = this;
            var gbToken = $("[name='gb.token']").val();
            var apiId = $("#apiId").val();
            var $this = $($(".mui-popup-buttons .mui-popup-button").get(0));
            if (isOut)
                var data = {
                    'gb.token': gbToken,
                    'transferOut': 'wallet',
                    'transferInto': apiId,
                    'result.transferAmount': amount
                };
            else
                var data = {
                    'gb.token': gbToken,
                    'transferOut': apiId,
                    'transferInto': 'wallet',
                    'result.transferAmount': amount
                };
            mui.ajax(root + '/transfer/transfersMoney.html', {
                dataType: 'json',
                data: data,
                type: 'post',
                async: true,
                beforeSend: function () {
                    $this.attr("disabled", "disabled").text(window.top.message.game_auto['提交中']);
                },
                success: function (data) {
                    _this.transferBack(data);
                    $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
                },
                error: function (xhr, type, errorThrown) {
                    $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
                }
            });
        },
        /**
         * 转账回调
         */
        transferBack: function (data) {
            $('.mui-popup').attr("style", "");
            var _this = this;
            var apiId = $("#apiId").val();
            var apiTypeId = $("#apiTypeId").val();
            if (!data) {
                _this.toast(window.top.message.game_auto["转账异常2"]);
            } else if (data.state == true && data.result == 0) {
                if (_this.os == 'app_android') {
                    window.gamebox.backRefresh();
                }
                //转账成功
                layer.open({
                    title: window.top.message.game_auto['转账成功'],
                    content: '',
                    btn: [window.top.message.game_auto['好的'], ''],
                    shadeClose: false,
                    yes: function (index) {
                        window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        layer.close(index);
                    }
                })
            } else if (data.state == true && data.result == 1) {
                //转账失败
                layer.open({
                    title: window.top.message.game_auto['转账失败'],
                    content: window.top.message.game_auto['失败提示'],
                    btn: [window.top.message.game_auto['确定'], ''],
                    shadeClose: false,
                    yes: function (index) {
                        window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        layer.close(index);
                    }
                })
            } else if (data.state == true && data.result) {
                var orderId = data.orderId;
                var btnArray = [window.top.message.game_auto['返回'], window.top.message.game_auto['再试一次']];
                layer.open({
                    title: window.top.message.game_auto['转账超时'],
                    content: window.top.message.game_auto['订单超时'],
                    btn: btnArray,
                    shadeClose: false,
                    yes: function (index) {
                        window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        layer.close(index);
                    },
                    no: function (index) {
                        window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                        layer.close(index);
                    }
                })
            } else {
                _this.toast(data.msg);
                $("[name='gb.token']").val(data.token);
            }
        }
    });
});
