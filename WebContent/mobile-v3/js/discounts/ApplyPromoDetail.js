/*界面初始化*/
var type;
var resultId;
var code;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left']
    };
    muiInit(options);
    goApplyOrFetch();
});

/**
 * type：fetch 获取订单(存就送,有效投注额,盈亏送)，
 * :apply 申请优惠
 */
function goApplyOrFetch() {
    type = $('#type').val();
    if (type == 'fetch') {
        fetchActivityProcess();
    } else {
        applyActivity();
    }
}

/**
 * 申请活动
 */
function applyActivity() {
    resultId = $('#resultId').val();
    code = $('#code').val();
    var dataParam = {};
    dataParam.code = code;
    dataParam.resultId = resultId;
    var ajaxOption = {
        url: root + "/ntl/activityHall/applyActivities.html",
        data: JSON.stringify(dataParam),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == null) {
                $('.status_failure').removeClass('mui-hidden');
                $('.btn_cust_serv').removeClass('mui-hidden');
                return;
            }
            if (data.state) {
                $('.status_success').removeClass('mui-hidden');
                $('.status_failure').addClass('mui-hidden');
                $('.btn_cust_serv').addClass('mui-hidden');
                if (data.transactionErrorList) {
                    for (j = 0; j < data.transactionErrorList.length; j++) {
                        var iconHtml;
                        if (data.transactionErrorList[j].state) {
                            iconHtml = 'icon-pass';
                        } else {
                            iconHtml = 'icon-fail';
                        }
                        if (data.transactionErrorList[j].transactionNo) {
                            var html = ['<li class="mui-table-view-cell">订单号：' + data.transactionErrorList[j].transactionNo,
                                '<span class="' + iconHtml + '"></span>',
                                '</li>'].join("");
                            $('.promo_con_list .mui-table-view').append(html);
                        }
                        if (data.transactionErrorList[j].amount) {
                            var html = ['<li class="mui-table-view-cell">金额：￥' + data.transactionErrorList[j].amount,
                                '<span class="' + iconHtml + '"></span>',
                                '</li>'].join("");
                            $('.promo_con_list .mui-table-view').append(html);
                        }
                    }
                } else {
                    $('.promo_con_list').addClass('mui-hidden');
                }
            } else {
                $('.status_success').addClass('mui-hidden');
                $('.promo_con_list').removeClass('mui-hidden');
                $('.status_failure').removeClass('mui-hidden');
                $('.btn_cust_serv').removeClass('mui-hidden');
                if (data.msg && typeof data.msg != 'undefined') {
                    var message = window.top.message.apply_activity[data.msg];
                    if (typeof message == 'undefined') {
                        message = data.msg;
                    }
                    var html = ['<li class="mui-table-view-cell">' + message,
                        '<span class="icon-fail"></span>',
                        '</li>'].join("");
                    $('.promo_con_list .mui-table-view').append(html);
                }
                if (data.transactionErrorList) {
                    for (j = 0; j < data.transactionErrorList.length; j++) {
                        var iconHtml;
                        var addOrder;
                        var addAmount;
                        if (data.transactionErrorList[j].state) {
                            iconHtml = 'icon-pass';
                        } else {
                            iconHtml = 'icon-fail';
                        }
                        if (data.transactionErrorList[j].msg) {
                            if (data.transactionErrorList[j].transactionNo) {
                                addOrder = ",订单号：" + data.transactionErrorList[j].transactionNo;
                                var html = ['<li class="mui-table-view-cell">' + window.top.message.apply_activity[data.transactionErrorList[j].msg] + addOrder,
                                    '<span class="' + iconHtml + '"></span>',
                                    '</li>'].join("");
                                $('.promo_con_list .mui-table-view').append(html);
                            }
                            if (data.transactionErrorList[j].money) {
                                addAmount = ",金额：￥" + data.transactionErrorList[j].money;
                                var html = ['<li class="mui-table-view-cell">' + window.top.message.apply_activity[data.transactionErrorList[j].msg] + addAmount,
                                    '<span class="' + iconHtml + '"></span>',
                                    '</li>'].join("");
                                $('.promo_con_list .mui-table-view').append(html);
                            }

                        }
                    }
                }
            }
        }
    };
    muiAjax(ajaxOption);
}

/**
 * 获取订单
 */
function fetchActivityProcess() {
    resultId = $('#resultId').val();
    code = $('#code').val();
    var ajaxOption = {
        url: "/ntl/activityHall/fetchActivityProcess.html",
        type: "POST",
        dataType: "json",
        data: {
            code: code,
            resultId: resultId
        },
        success: function (data) {
            if (typeof data == 'undefined') {
                $('.status_failure').addClass('mui-hidden');
                $('.btn_cust_serv').addClass('mui-hidden');
                return;
            }
            if (code == 'deposit_send' && data.transactions) {//存就送
                var transactions = data.transactions;
                var text;
                for (var j = 0; j < transactions.length; j++) {
                    if (transactions[j].rechargeType == 'online_bank' || transactions[j].rechargeType == 'online_deposit') {
                        text = window.top.message.common['bankname.' + transactions[j].payerBank];
                    } else {
                        text = window.top.message.common['recharge_type.' + transactions[j].rechargeType];
                    }

                    var html = ['<div class="promo_item" data-rel=\'{"target":"applyDepositSend","opType":"function","code":"' + code + '","resultId":"' + resultId + '","trancNo":"' + transactions[j].transactionNo + '"}\'>',
                        '<div class="ite">',
                        '<span class="ti">存款订单号：</span>' + transactions[j].transactionNo,
                        '</div>',
                        '<div class="ite">',
                        '<span class="ti">交易时间：</span> ' + transactions[j].checkTime,
                        '</div>',
                        '<div class="ite">',
                        '<span class="ti">存款金额：</span> ¥' + transactions[j].rechargeAmount,
                        '</div>',
                        '<div class="ite">',
                        '<span class="ti">公司入款：</span> ' + text,
                        '</div>',
                        '<div class="promo_item_sta awa">',
                        '申请奖励',
                        '</div>',
                        '</div>'].join("");
                    $('.promo_item_list').append(html);
                    html = '';
                }
            } else if (code == 'effective_transaction' && data.preferentialRelations) {//有效投注额
                var preferentialRelations = data.preferentialRelations;
                var icon;
                for (var j = 0; j < preferentialRelations.length; j++) {
                    if (data.effectivetransaction >= preferentialRelations[j].preferentialValue) {
                        icon = 'icon-pass';
                    } else {
                        icon = 'icon-fail';
                    }
                    var html = ['<li class="mui-table-view-cell">条件' + preferentialRelations[j].orderColumn + ":有效投注额满" + preferentialRelations[j].preferentialValue + '元',
                        '<span class="' + icon + '"></span>',
                        '</li>'].join("");
                    $('.promo_con_list .mui-table-view').append(html);
                    html = '';
                }
                $('.pro_mone .mui-pull-left').html('有效投注额：<span class="color-gray">¥ ' + data.effectivetransaction + '</span>');
                $('#join .app_num').html('派奖时间：<span class="color-blue">' + data.deadLineTime + '</span>');
                $('#unCommit .app_num').html('已有 <span class="color-blue">' + data.ApplyNum + '</span>人，报名成功');
                if (data.hasApply) {
                    $('#join').removeClass('mui-hidden');
                } else {
                    $('#unCommit').removeClass('mui-hidden');
                }
            } else if (code == 'profit_loss' && data.preferentialRelations) { //盈亏返利
                var preferentialRelations = data.preferentialRelations;
                var proMoneText;
                var profitHtml = false;
                var lossHtml = false;
                for (var j = 0; j < preferentialRelations.length; j++) {
                    if (preferentialRelations[j].preferentialCode == 'profit_ge') {//盈利时只展示盈利
                        proMoneText = '当前盈利';
                        profitHtml = true;
                        var icon;
                        if (data.profitloss >= preferentialRelations[j].preferentialValue) {
                            icon = 'icon-pass';
                        } else {
                            icon = 'icon-fail';
                        }
                        var html = ['<li class="mui-table-view-cell">条件' + preferentialRelations[j].orderColumn + ":盈利" + preferentialRelations[j].preferentialValue + '元',
                            '<span class="' + icon + '"></span>',
                            '</li>'].join("");
                        $('.promo_con_list .mui-table-view').append(html);
                        html = '';
                    } else if (preferentialRelations[j].preferentialCode == 'loss_ge' && preferentialRelations[j].orderColumn == '1') {//亏损时只展示亏损
                        proMoneText = '当前亏损';
                        lossHtml = true;
                    }
                }
                //盈利亏损同时存在 优先取盈利,亏损不展示梯度
                if (profitHtml && lossHtml) {
                    if (data.profitloss >= 0) {
                        proMoneText = '当前盈利';
                    } else {
                        $('.promo_con_list .mui-table-view').html('');
                        proMoneText = '当前亏损';
                    }
                }
                $('.pro_mone .mui-pull-left').html(proMoneText + '：<span class="color-gray">¥ ' + data.profitloss + '</span>');
                $('#join .app_num').html('派奖时间：<span class="color-blue">' + data.deadLineTime + '</span>');
                $('#unCommit .app_num').html('已有 <span class="color-blue">' + data.ApplyNum + '</span>人，报名成功');
                if (data.hasApply) {
                    $('#join').removeClass('mui-hidden');
                } else {
                    $('#unCommit').removeClass('mui-hidden');
                }
            } else {
                $('.status_failure').removeClass('mui-hidden');
                $('.btn_cust_serv').removeClass('mui-hidden');
                $('.promo-apply-content').removeClass('promo-apply2-content');
            }
        }
    };
    muiAjax(ajaxOption);
}

/**
 * 存就送活动申请
 */
function applyDepositSend(obj, options) {
    var dataParam = {};
    dataParam.code = options.code;
    dataParam.resultId = options.resultId;
    var tansactionObj = [];
    tansactionObj.push(options.trancNo);
    dataParam.transactionNos = tansactionObj;
    var ajaxOption = {
        url: root + "/ntl/activityHall/applyActivities.html",
        data: JSON.stringify(dataParam),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.state) {
                var successIsAudit = "申请成功";
                var successState = "suc";
                $(obj).removeAttr('data-rel');
                $(obj).find('.promo_item_sta').removeClass('awa');
                if (data.transactionErrorList) {
                    for (var j = 0; j < data.transactionErrorList.length; j++) {
                        if (data.transactionErrorList[j].state && data.transactionErrorList[j].isAudit) {
                            successIsAudit = "申请中...";
                            successState = "proc";
                        }
                    }
                }
                $(obj).find('.promo_item_sta').html(successIsAudit);
                $(obj).find('.promo_item_sta').addClass(successState);
            } else {
                toast(window.top.message.apply_activity[data.msg]);
            }
        }
    };
    muiAjax(ajaxOption);
}

/**
 * 盈亏送，有效投注额申请
 */
function applyProfit(obj, options) {
    resultId = $('#resultId').val();
    code = $('#code').val();
    var dataParam = {};
    dataParam.code = code;
    dataParam.resultId = resultId;
    var ajaxOption = {
        url: root + "/ntl/activityHall/applyActivities.html",
        data: JSON.stringify(dataParam),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.state) {
                successShow(data.msg);
            } else {
                defailShow(data.msg);
            }
        }
    };
    muiAjax(ajaxOption);
}

/**
 * 申请成功弹窗
 */
function successShow(msg) {
    var t = 3, timer1 = null;
    mui.alert('<i class="icon-sus"></i><div class="tips">您已申请成功！</div><div class="p_tim">(<span class="tim"></span>s)</div>', ' ', null);
    $('.mui-popup').addClass('app_suc');
    $('.tim').html(t)
    timer1 = setInterval(function () {
        t--;
        $('.tim').html(t)
        if (t === 0) {
            mui.closePopup();
            clearInterval(timer1);
            goToLastPage();
        }
    }, 1000);
}

/**
 * 申请失败
 */
function defailShow(msg) {
    toast(msg, {duration: 2000});
    $('.mui-toast-container').addClass('app_fai');
    var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
    mask.show();//显示遮罩
    setTimeout(function () {
        mask.close();//关闭遮罩
    }, 2000);
}