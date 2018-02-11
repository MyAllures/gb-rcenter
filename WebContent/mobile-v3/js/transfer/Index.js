/**
 * Created by fei on 16-10-15.
 */

$(function () {
    //主体内容滚动条
    muiInit(muiDefaultOptions);

        mui.ready(function () {
            /**
             * 初始化转入/转出下拉对象
             */
            var options = {
                url: root + '/transfer/queryApis.html',
                dataType: 'json',
                type: 'post',
                async: true,
                success: function (data) {
                    //普通示例
                    $("a.turn").each(function (obj) {
                        var _this = this;
                        var transferPicker = new mui.PopPicker();
                        transferPicker.setData(data);
                        if (this != null) {
                            this.addEventListener('tap', function (event) {
                                transferPicker.show(function (items) {
                                    var text = items[0].text;
                                    var value = items[0].value;

                                    var toggleId = _this.dataset.value;
                                    var toggleObj = document.getElementById(toggleId);
                                    var toggleInput = toggleObj.children[1];

                                    //另外一个已是 我的钱包
                                    if (toggleInput.defaultValue == 'wallet') {
                                        if (value == 'wallet') {
                                            toggleInput.defaultValue = '';
                                            toggleObj.children[0].innerHTML = window.top.message.transfer_auto['请选择'];
                                        }
                                    } else {
                                        //另外一个不是 我的钱包
                                        if (value != 'wallet') {
                                            toggleInput.defaultValue = 'wallet';
                                            toggleObj.children[0].innerHTML = window.top.message.transfer_auto['我的钱包'];
                                        }
                                    }
                                    _this.children[0].innerHTML = text;
                                    _this.children[1].defaultValue = value;
                                    changeMsg();
                                    amountValid();
                                });
                            }, false);
                        }
                    });
                },
                error: function (xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                }
            };
            muiAjax(options)
        });
    (mui, document);
});
    


resetScreen();
$(window).bind( 'orientationchange', function(e){
    resetScreen();
});

mui.back = function(){
    gotoUrl("/mine/index.html");
};

/**
 * 变换提示消息
 */
function changeMsg() {
    var $form = $("form");
    var transferOut = $("input[name=transferOut]").val();
    var msg;
    if (transferOut == 'wallet') {
        msg = message.fund['transferForm.transferAmountCheck'];
    } else {
        msg = message.fund['transferForm.apiAmountInsufficientBalance'];
    }
    var validate = $form.validate();
    $.extend(true, validate.settings.messages, {"result.transferAmount": {remote: msg}});
}

function resetScreen() {
    var sm = this.orient();
    if (sm == 'landscape') {
        if ($('.ori-mask').length == 0) {
            var tip = '<div class="ori-mask"></div>';
            $('body').append(tip);
        }
    } else {
        if ($('.ori-mask').length > 0) {
            $('.ori-mask').remove();
        }
    }
}

function orient() {
    var orient = window.orientation;
    if (typeof orient === 'undefined') {
        return (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
    } else {
        if (orient == 90 || orient == -90) {
            return 'landscape';
        } else if (orient == 0 || orient == 180) {
            return 'portrait';
        }
    }
}



/**
 * 转账金额验证（在每次更换转入转出对象时，需重新验证转账金额）
 */
function amountValid() {
    var ele = $("input[name='result.transferAmount']");
    $.data(ele[0], "previousValue", null);
    if ($(ele).val()) {
        $(ele).valid();
    }
}

/**
 * 刷新单个api余额
 */
function refreshApi(apiId, type) {
    var $api = $("._apiMoney_" + apiId);
    var refreshApi = $api.parent().children("._refresh_api");
    $(refreshApi).addClass("gb-spin");

    var url = root + "/transfer/refreshApi.html?search.apiId=" + apiId;
    if (type) {
        url = url + "&type=" + type;
    }

    var options = {
        url: url,
        type: 'post',
        timeout: 10000,
        dataType: "json",

        success: function (data) {
            var apiId = data.apiId;
            var apiMoney = data.apiMoney;
            var status = data.status;
            var msg = '';
            if (status == 'disable') {
                msg = window.top.message.transfer_auto['暂停转账'];
            } else if (status == 'maintain') {
                msg = window.top.message.transfer_auto['维护中'];
            }
            $api.text(apiMoney + msg);

            //玩家余额
            var player = data.player;
            if(player.walletBalance) {
                $("#walletBalance").text(player.currencySign + player.walletBalance);
            }
            if(player.freezingBalance) {
                $("#freezingBalance").text(player.currencySign + player.freezingBalance);
            } else {
                $("#freezingBalance").text(player.currencySign + '0.00');
            }
            $(refreshApi).removeClass("gb-spin");
            if (!type) {
                // toast(window.top.message.transfer_auto['刷新成功']);
                toast("mobile-v3刷新成功");
            }
        },
        error: function (e) {
            $(refreshApi).removeClass("gb-spin");
            mui("#refreshContainer").pullRefresh().endPullupToRefresh();
            toast(window.top.message.transfer_auto['暂无更多数据']);
        }
    };
    muiAjax(options);
}

/**
 * 刷新所有api余额
 */
function refreshAllApiBalance() {
    $("#refreshAllApiBalance").attr("disabled","disabled");

    var options = {
        url:root + "/transfer/refreshAllApiBalance.html",
        type: 'post',
        dataType: 'text/html',
        success: function (data) {
            $("#apiBalance").html(data);
            toast(window.top.message.transfer_auto['刷新成功']);
            $("#refreshAllApiBalance").removeAttr("disabled");
        },
        error: function (e) {
            $("#refreshAllApiBalance").removeAttr("disabled");
            mui("#refreshContainer").pullRefresh().endPullupToRefresh();
            toast(window.top.message.transfer_auto['刷新游戏余额失败']);
        }
    };
    muiAjax(options);
}


function refreshAllBalance() {
    refreshAllApiBalance();
}

/**
 * 重新初始化转账form表单
 */
function initTransfer() {

    var options = {
        url:root + '/transfer/transferBack.html',
        dataType: 'json',
        type: 'post',
        async: true,
        success: function (data) {
            var $transferOut = $("#transferOut");
            var $transferInto = $("#transferInto");
            $("input[name=transferInto]").val('');
            $("input[name=transferOut]").val($transferOut.attr("defaultValue"));
            $transferOut.children("span").text($transferOut.attr("default"));
            $transferInto.children("span").text($transferInto.attr("default"));
            $("input[name='result.transferAmount']").val("");
            $("[name='gb.token']").val(data.token);
        }
    };
    muiAjax(options);
}

/**
 *转账成功后回调（更新玩家余额、api余额）
 */
function successBack(data) {
    var apiId = data.apiId;
    var type = true;
    var os = whatOs();
    if(os == 'app_android')
        window.gamebox.refreshApiBalance(apiId);
    refreshApi(apiId, type);
    initTransfer();
}

/**
 * 再试一次
 */
function reconnectAgain(orderId) {
    var options = {
        url:root + '/transfer/reconnectTransfer.html?search.transactionNo='+ orderId,
        dataType: 'json',
        type: 'post',
        async: true,
        success: function (data) {
            transferBack(data);
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
        }

    };
    muiAjax(options);
}

/**
 * 转账回调
 */
function transferBack(data) {
    if (!data){
        toast(window.top.message.transfer_auto["转账异常"]);
        initTransfer();
    } else if (data.state == true && data.result == 0) {
        //转账成功
        layer.open({
            title: window.top.message.transfer_auto['转账成功'],
            content: window.top.message.transfer_auto['转账成功2'],
            btn: [window.top.message.transfer_auto['好的'],''],
            shadeClose:false,
            yes: function(index) {
                successBack(data);
                getSiteApi();
                layer.close(index);
            }
        })
    } else if (data.state == true && data.result == 1) {
        //转账失败
        layer.open({
            title: window.top.message.transfer_auto['转账失败'],
            content: window.top.message.transfer_auto['转账已失败'],
            btn: [window.top.message.transfer_auto['确定'],''],
            shadeClose:false,
            yes: function(index) {
                successBack(data);
                getSiteApi();
                layer.close(index);
            }
        })
    } else if (data.state == true && data.result) {
        var orderId = data.orderId;
        var btnArray = [window.top.message.transfer_auto['返回'], window.top.message.transfer_auto['再试一次']];
        layer.open({
            title: window.top.message.transfer_auto['转账超时'],
            content: window.top.message.transfer_auto['订单已超时'],
            btn: btnArray,
            shadeClose:false,
            yes: function(index) {
                successBack(data);
                layer.close(index);
            },
            no: function(index) {
                reconnectAgain(orderId);
                layer.close(index);
            }
        })
    } else {
        toast(data.msg);
        $("[name='gb.token']").val(data.token);
    }
}


/**
 * 提交转账
 */
function submitTransactionMoney() {
    toast("提交");
    var $form = $('#transferForm');
    var $this = $(this);

    if (!$form.valid()) {
        return false;
    }

    var options = {
        url: root + '/transfer/transfersMoney.html',
        data: $form.serialize(),
        type: 'post',
        beforeSend:function(){
            $this.attr("disabled", "disabled").text(window.top.message.transfer_auto['提交中']);
        },
        success: function (data) {
            transferBack(data);
            $this.text(window.top.message.transfer_auto['确认提交']).removeAttr("disabled");
        },
    };
    muiAjax(options)
}




/**
 * 刷新单个api余额
 */
function freshApi(obj, options) {
    var apiId = options.dataApiId;
    refreshApi(apiId);
}
