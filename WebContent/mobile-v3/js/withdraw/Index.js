/*界面初始化*/
var errorMap;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left']
    };
    muiInit(options);
    initPage();
    hasBank();
    errorMap = new Map();
});

/**
 * 初始化输入框，只输入数值
 */
function initPage() {
    inputNumber.init($('[name=withdrawAmount]'), {
        negative: false,
        decimal: false,
        intSize: 9
    });
}

/**
 * 是否需添加银行卡、比特币
 * @returns {boolean}
 */
function hasBank() {
    var $target = $(".account_tab .mui-segmented-control a.mui-active[data]");
    var id = $target.attr("data");
    if ($target.length == 0) {
        var noBank = $("input[name=noBank]").val();
        if (noBank == 'true') {
            noBankLayer();
            return false;
        }
        var noBtc = $("input[name=noBtc]").val();
        if (noBtc == 'true') {
            noBtcLayer();
            return false;
        }
    } else if (id == 'bank_account') {
        $("input[name=remittanceWay]").val("1");
        var noBank = $("input[name=noBank]").val();
        if (noBank == 'true') {
            noBankLayer();
            return false;
        }
    } else if (id == 'bit_account') {
        $("input[name=remittanceWay]").val("2");
        var noBtc = $("input[name=noBtc]").val();
        if (noBtc == 'true') {
            noBtcLayer();
            return false;
        }
    }
    return true;
}

/**
 * 无银行卡弹窗提示
 */
function noBankLayer() {
    var options = {
        confirm: window.top.message.withdraw_auto['没有取款银行卡'],
        title: window.top.message.withdraw_auto['提示'],
        btnArray: [window.top.message.withdraw_auto['立即添加'], window.top.message.withdraw_auto['取消']],
        func: addBankCard
    };
    showConfirmMsg(options);
}

function addBankCard() {
    goToUrl(root + '/bankCard/page/addCard.html?action=withdraw');
}

/**
 * 无比特币地址弹窗提示
 */
function noBtcLayer() {
    var options = {
        confirm: window.top.message.withdraw_auto['没有绑定比特币地址'],
        title: window.top.message.withdraw_auto['提示'],
        btnArray: [window.top.message.withdraw_auto['立即添加'], window.top.message.withdraw_auto['取消']],
        func: addBtcCard
    };
    showConfirmMsg(options);
}

function addBtcCard() {
    goToUrl(root + '/bankCard/page/addBtc.html?action=withdraw');
}

/**
 * 切换银行卡按钮
 * @param obj
 * @param options
 */
function changeBank(obj, options) {
    $(".account_tab .mui-segmented-control a.mui-control-item[data]").removeClass("mui-active");
    $(obj).addClass("mui-active");
    var id = options.data;
    $(".bankcard").hide();
    $("#" + id).show();
    hasBank();
}

/**
 * 确认提交
 */
function confirmWithdraw() {
    if (!checkAmout()) {
        return;
    }
    var amount = parseFloat($("input[name='withdrawAmount']").val());
    // 计算各种费
    var options = {
        url: root + '/wallet/withdraw/withdrawFee.html',
        dataType: 'json',
        data: {"withdrawAmount": amount},
        type: 'post',
        success: function (data) {
            if (data) {
                if (data.legalNum) {    // 不在规定范围内
                    toast(data.legalNum);
                    return false;
                }
                var sign = $('#sign').val();
                $("#confirmWithdrawAmount").text(amount);
                // 手续费
                var poundage = data.poundage;
                if (poundage && poundage != '0.00') {
                    $("#confirmWithdrawFee").text('-' + poundage);
                } else {
                    $("#confirmWithdrawFee").text('0.00');
                }
                // 实际可取款金额
                var actualWithdraw = data.actualWithdraw;
                $("#confirmWithdrawActualAmount").text(actualWithdraw);

                var tooSmall = data.amountTooSmall;
                var actualLess0 = data.actualLess0;
                if (tooSmall == "true") {
                    errorMap.set('errMsg', window.top.message.withdraw_auto['取款金额需大于手续费']);
                } else if (actualLess0) {
                    errorMap.set('errMsg', window.top.message.withdraw_auto['实际取款金额需大于0']);
                } else {
                    errorMap.set('errMsg', "");
                }
                $(".masker").show();
                $("#confirmWithdrawDialog").show();
            } else {
                toast("网络忙，请稍候再试！");
                return false;
            }
        }
    };
    muiAjax(options);
}

/**
 * 验证金额
 * @returns {boolean}
 */
function checkAmout() {
    var $amount = $('[name=withdrawAmount]');
    var min = parseFloat($amount.attr('min'));
    var max = parseFloat($amount.attr('max'));
    var amount = parseFloat($amount.val());
    var balance = parseFloat($('[name=walletBalance]').val());

    if (!/^[1-9]\d*$/.test($amount.val())) {
        toast(window.top.message.withdraw_auto['取款金额为正整数']);
        recoverAmount();
        $amount.focus();
        return false;
    } else if (amount > balance) {
        toast(window.top.message.withdraw_auto['取款金额不得大于钱包余额']);
        recoverAmount();
        $amount.focus();
        return false;
    } else if (amount > max) {
        toast(window.top.message.withdraw_auto['单笔取款金额不得大于'].replace('{0}', max));
        recoverAmount();
        $amount.focus();
        return false;
    } else if (amount < min) {
        toast(window.top.message.withdraw_auto['单笔取款金额不得小于'].replace('{0}', min));
        $amount.focus();
        return false;
    }

    return true;
}

function recoverAmount() {
    $('span.poundage').html($('[name="poundageHide"]').val());
    $('span.actual').html($('[name="actualHide"]').val());
    $('div.final').removeClass('bg-error');
}

/**
 * 关闭弹窗
 */
function closeConfirmDialog() {
    $("#confirmWithdrawDialog").hide();
    $(".masker").hide();
}

/**
 * 提交取款
 */
function submitWithdraw() {
    if (!hasBank()) {
        return;
    }
    if (!checkAmout()) {
        return;
    }
    var errMsg = errorMap.get('errMsg');
    if (!errMsg) {
        closeConfirmDialog();
        /*window.top.page.security.checkSecurityPassword(function () {
            comitWithdraw();
        });*/
        comitWithdraw();
    } else {
        toast(errMsg);
    }
}

/**
 * 请求提交取款
 */
function comitWithdraw() {
    var options = {
        url: root + '/wallet/withdraw/submitWithdraw.html',
        dataType: 'json',
        data: $("form").serialize(),
        type: 'post',
        success: function (data) {
            if (data.state) {
                withdrawSuccess();
            } else {
                withdrawFail(data);
            }
        }
    };
    muiAjax(options);
}

/**
 * 取款成功弹出提示
 * @param data
 */
function withdrawSuccess(){
    var options = {
        confirm: window.top.message.withdraw_auto['取款提交成功'],
        title: window.top.message.withdraw_auto['提示'],
        btnArray: [window.top.message.withdraw_auto['好的'], window.top.message.withdraw_auto['取款记录']],
        func: successOk,
        cancelFunc:gotoRecord
    };
    showConfirmMsg(options);
}

function successOk(){
    goToUrl(root + '/mine/index.html');
}

function gotoRecord(){
    goToUrl(root + '/fund/record/index.html?search.transactionType=withdrawals');
}

/**
 * 取款失败弹出提示
 * @param data
 */
function withdrawFail(data){
    var options = {
        confirm: data.msg,
        title: window.top.message.withdraw_auto['提示'],
        btnArray: [window.top.message.withdraw_auto['联系客服'], window.top.message.withdraw_auto['取消']],
        func: failOk,
        cancelFunc:successOk
    };
    showConfirmMsg(options);
}

function failOk(){
    goToUrl(root + '/index/gotoCustomerService.html');
}