/**
 * Created by fei on 16-10-15.
 */

$(function () {
    //主体内容滚动条
    muiInit(muiDefaultOptions);
    //初始化转入转出的api
    initApi();
});

/**
 * 初始化转入/转出下拉对象
 */
function initApi() {
    var options = {
        url: root + '/transfer/queryApis.html',
        dataType: 'json',
        type: 'post',
        async: true,
        success: function (data) {
            //普通示例
            $("a.turn").each(function () {
                var _this = this;
                var transferPicker = new mui.PopPicker();
                transferPicker.setData(data);
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
            });
        }
    };
    muiAjax(options);
}

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
        success: function (data) {
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
            if (player.walletBalance) {
                $("#walletBalance").text(player.currencySign + player.walletBalance);
            }
            if (player.freezingBalance) {
                $("#freezingBalance").text(player.currencySign + player.freezingBalance);
            } else {
                $("#freezingBalance").text(player.currencySign + '0.00');
            }
            $(refreshApi).removeClass("gb-spin");
            if (!type) {
                toast(window.top.message.transfer_auto['刷新成功']);
            }
        },
        error: function (e) {
            $(refreshApi).removeClass("gb-spin");
            toast(window.top.message.transfer_auto['暂无更多数据']);
        }
    };
    muiAjax(options);
}

/**
 * 刷新所有api余额
 */
function refreshAllApiBalance() {
    $("#refreshAllApiBalance").attr("disabled", "disabled");

    var options = {
        url: root + "/transfer/refreshAllApiBalance.html",
        type: 'post',
        dataType: 'text/html',
        success: function (data) {
            $("#apiBalance").html(data);
            toast(window.top.message.transfer_auto['刷新成功']);
            $("#refreshAllApiBalance").removeAttr("disabled");
        },
        error: function (e) {
            $("#refreshAllApiBalance").removeAttr("disabled");
            toast(window.top.message.transfer_auto['刷新游戏余额失败']);
        }
    };
    muiAjax(options);
}

/**
 * 重新初始化转账form表单
 */
function initTransfer() {
    var options = {
        url: root + '/transfer/transferBack.html',
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
function successBack(obj, option) {
    var data = option.data;
    var apiId = data.apiId;
    var type = true;
    if (isNative) {
        nativeAccountChange();
    }
    refreshApi(apiId, type);
    initTransfer();
}

/**
 * 再试一次
 */
function reconnectAgain(obj, option) {
    if (!option.data || !option.data.orderId) {
        toast(window.top.message.transfer_auto['转账超时']);
        return;
    }
    var orderId = option.data.orderId;
    var options = {
        url: root + '/transfer/reconnectTransfer.html?search.transactionNo=' + orderId,
        dataType: 'json',
        type: 'post',
        async: true,
        success: function (data) {
            option.data = data;
            transferBack(obj, option);
        }
    };
    muiAjax(options);
}

/**
 * 转账回调
 */
function transferBack(obj, option) {
    var data = option.data;
    if (!data) {
        toast(window.top.message.transfer_auto["转账异常"]);
        initTransfer();
    } else if (data.state == true && data.result == 0) {
        //转账成功
        showWarningMsg(window.top.message.transfer_auto['转账成功'], window.top.message.transfer_auto['转账成功2'], successBack, option);
    } else if (data.state == true && data.result == 1) {
        //转账失败
        showWarningMsg(window.top.message.transfer_auto['转账失败'], window.top.message.transfer_auto['转账已失败'], successBack, option);
    } else if (data.state == true && data.result) {
        $("[name='gb.token']").val(data.token);
        var orderId = data.orderId;
        var btnArray = [window.top.message.transfer_auto['返回'], window.top.message.transfer_auto['再试一次']];
        var confirmOption = {
            btnArray: btnArray,
            title: window.top.message.transfer_auto['转账超时'],
            confirm: window.top.message.transfer_auto['订单已超时'],
            func: successBack,
            cancelFunc: reconnectAgain
        };
        confirmOption.data = data;
        showConfirmMsg(confirmOption);
    } else {
        toast(data.msg);
        initTransfer();
    }
}


/**
 * 提交转账
 */
function submitTransactionMoney(obj, option) {
    var $form = $('#transferForm');
    var $this = $(this);

    if (!$form.valid()) {
        return false;
    }
    var options = {
        url: root + '/transfer/transfersMoney.html',
        data: $form.serialize(),
        beforeSend: function () {
            $this.attr("disabled", "disabled").text(window.top.message.transfer_auto['提交中']);
        },
        success: function (data) {
            option.data = data;
            transferBack(obj, option);
            $this.text(window.top.message.transfer_auto['确认提交']).removeAttr("disabled");
        }
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
