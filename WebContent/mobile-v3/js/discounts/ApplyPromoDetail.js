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
                $('.promo_con_list').addClass('mui-hidden');
                $('.status_failure').addClass('mui-hidden');
                $('.btn_cust_serv').addClass('mui-hidden');
            } else {
                $('.status_success').addClass('mui-hidden');
                $('.promo_con_list').removeClass('mui-hidden');
                $('.status_failure').removeClass('mui-hidden');
                $('.btn_cust_serv').removeClass('mui-hidden');
                if (data.msg) {
                    var html = ['<li class="mui-table-view-cell">' + window.top.message.apply_activity[data.msg],
                        '<span class="icon-fail"></span>',
                        '</li>'].join("");
                    $('.promo_con_list .mui-table-view').append(html);
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
            if (code == 'deposit_send' && data.transactions) {
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
            } else if (data.preferentialRelations) {
                var preferentialRelations = data.preferentialRelations;
                var icon;
                var text;
                for (var j = 0; j < preferentialRelations.length; j++) {
                    if (data.effectivetransaction > preferentialRelations[j].preferentialValue) {
                        icon = 'icon-pass';
                    } else {
                        icon = 'icon-fail';
                    }

                    if (preferentialRelations[j].preferentialCode == 'total_transaction_ge') {
                        text = '有效投注额';
                    } else if (preferentialRelations[j].preferentialCode == 'profit_ge') {
                        text = '盈利';
                    }

                    var html = ['<li class="mui-table-view-cell">' + text + data.effectivetransaction,
                        '<span class="' + icon + '"></span>',
                        '</li>'].join("");
                    $('.promo_con_list .mui-table-view').append(html);
                    html = '';
                }
            } else {
                $('.status_failure').removeClass('mui-hidden');
                $('.btn_cust_serv').removeClass('mui-hidden');
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
            if(data.state){
                $(obj).removeAttr('data-rel');
                $(obj).find('.promo_item_sta').removeClass('awa');
                $(obj).find('.promo_item_sta').addClass('suc');
                $(obj).find('.promo_item_sta').html("申请成功");
            }else{
                toast(window.top.message.apply_activity[data.msg]);
            }
        }
    };
    muiAjax(ajaxOption);
}

/*
 $(function () {// 申请成功弹窗
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
 }
 }, 1000);
 });
 $(function () {// 申请失败
 $('#test').on('tap', function () {
 mui.toast('网络异常，请稍后重试', {duration: 2000});
 $('.mui-toast-container').addClass('app_fai');
 var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
 mask.show();//显示遮罩
 setTimeout(function () {
 mask.close();//关闭遮罩
 }, 2000)
 });
 })*/
