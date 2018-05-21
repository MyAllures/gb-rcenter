$(function(){
    window.addEventListener("resize", function() {
        if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
            window.setTimeout(function() {
                document.activeElement.scrollIntoViewIfNeeded();
            },0);
        }
    })
});

/**数字货币支付 切换币种*/
function changeCurrency(obj , options){
    $(".bank-selector li a").removeClass("active");
    $(obj).addClass("active");
    $("div[id^=digiccy]").hide();
    var id = options.id;
    $("div#" + id).show();
}

/**
 * 数字货币支付 刷新金额
 */
function refresh(obj , options){
    var currency = options.currency;
    var $amount = $(obj).prev();
    var text = $amount.text();
    // showLoading();
    // setTimeout(function() {hideLoading() }, 2000);
    var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"></div></div>';
    $amount.html(loading);
    var ajaxOptions = {
        url : root + "/wallet/deposit/digiccy/refresh.html",
        data: {'currency': currency},
        dataType: 'json',
        success: function (data) {
            $amount.text(data.amount);
            if (data.amount <= 0) {
                $("[name=exchange" + currency + "]").hide();
            } else {
                $("[name=exchange" + currency + "]").show();
            }
        },
        error: function () {
            $amount.text(text);
        }
    };
    muiAjax(ajaxOptions);

}

/**
 * 数字货币支付 生成地址
 */
function newAddress(obj , options){
    var currency = options.currency;
    var ajaxOptions = {
        url : root + "/wallet/deposit/digiccy/newAddress.html",
        data: {'currency': currency},
        dataType: 'json',
        success: function (data) {
            var address = data.address;
            if (address) {
                toast(window.top.message.deposit_auto['生成地址成功']);
                window.setTimeout(function () {
                    $("[name=account" + currency + "] .list-xzzf img").attr("src", data.addressQrcodeUrl);
                    $("[name=account" + currency + "] .list-xzzf textarea").val(address);
                    $("[name=account" + currency + "] .mui-input-row").show();
                    $("[name=notAddress" + currency + "]").hide();
                }, 1000);
            } else {
               toast(window.top.message.deposit_auto['生成地址失败请稍后再试']);
            }
        },
        error: function () {
            toast(window.top.message.deposit_auto['生成地址失败请稍后再试']);
        }
    };
    muiAjax(ajaxOptions);
}

/**
 *数字货币支付 兑换
 */
function exchange(obj , options){
    $(obj).attr("disabled", true);
    var currency = options.currency;
    var ajaxOptions = {
        url : root + "/wallet/deposit/digiccy/exchange.html",
        data: {'currency': currency},
        dataType: 'json',
        success: function (data) {
            var state = data.state;
            var msg = window.top.message.fund['Recharge.digiccyRecharge.' + data.msg];
            if (state == false && data.msg && msg) {
                toast(msg);
                window.setTimeout(function () {
                    back(currency);
                }, 1000);
            } else if (state == true) {
                //展示选择优惠内容
                if(data.isOpenActivityHall != true) {
                    sale(data.transactionNo);
                } else {
                    toast(window.top.message.deposit_auto['提交成功']);
                }
                back(currency);
            } else {
                toast(window.top.message.deposit_auto['兑换金额失败']);
            }
        },
        complete: function () {
            $(obj).removeAttr("disabled");
        },
        error: function () {
            toast(window.top.message.deposit_auto['网络繁忙']);
        }
    };
    muiAjax(ajaxOptions);
}

/**
 * 数字货币支付回调 刷新余额
 */
function back(currency){
    var _e = {target: $("[name=account" + currency + "]").find("button[name=refresh]")};
    var options = {"currency" : currency};
    refresh(_e ,options);
}

/**
 *数字货币支付 选择优惠
 */
function sale(transactionNo){
    var options = {
        url : root + '/wallet/deposit/digiccy/sale.html?search.transactionNo=' + transactionNo,
        success: function (data) {
            $("#applySale").html(data);
            muiScrollY(".gb-withdraw-box .mui-scroll-wrapper");
            $("#applySale").addClass("mui-active");
        },
        error: function () {
            toast(window.top.message.deposit_auto['网络繁忙']);
        }
    };
    muiAjax(options);
}

/**数字货币支付 确认选择优惠*/
function confirmSale(obj , options){
    var url = options.saleUrl;
    var transactionNo = $(".gb-withdraw-box input[name='search.transactionNo']").val();
    var activityId = $(".gb-withdraw-box select[name=activityId]").val();
    var ajaxOptions = {
        url : url ,
        dataType: 'json',
        data: {'search.transactionNo': transactionNo, 'activityId': activityId},
        success: function (data) {
            if (data.state == true) {
                toast(window.top.message.deposit_auto['提交成功']);
            } else if (!data.state == false) {
                toast(window.top.message.deposit_auto['提交失败请刷新']);
            }
            $("#applySale").removeClass("mui-active");
            $("#applySale").html("");
        },
        error: function () {
            toast(window.top.message.deposit_auto['网络繁忙']);
        }
    };
}

