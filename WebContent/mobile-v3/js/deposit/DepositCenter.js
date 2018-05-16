/**全局map变量*/
var depositMap = {};

$(function () {
    copy();
    muiInit(muiDefaultOptions);
    //原生返回按钮不展示
    if (!isNative) {
        $("#depositBack").show();
    }
});

/**
 * 跳转快充
 * @param obj
 * @param options
 */
function fastRecharge(obj, options) {
    var url = options.url;
    if (isNative) {
        nativeOpenWindow(url, '1');
    } else {
        goToUrl(url, true);
    }
}

/**加载存款金额输入框*/
function toolBarClick(obj, options) {
    $("#list_pay").find(".list_pay_item").removeClass("cur");
    $(obj).find(".list_pay_item").addClass("cur");
    $("#depositInput").html("");
    //存款渠道类型
    var payType = options.payType;
    //跳转路径
    var _url = options.url;
    if (_url && _url != "undefined" && !depositMap[payType]) {
        var ajaxOptions = {
            url: root + _url,
            headers: {'Soul-Requested-With': 'XMLHttpRequest'},
            dataType: 'text/html',
            type: 'post',
            async: true,
            success: function (data) {
                $("#depositInput").html(data);
                depositMap[payType] = data;
            },
            error: function () {
                toast(window.top.message.deposit_auto['网络繁忙']);
            }
        };
        muiAjax(ajaxOptions);
    } else {
        $("#depositInput").html(depositMap[payType]);
    }
}

/**
 * 复制文本
 * @param obj
 */
function copy() {
    var clipboard = new Clipboard(".copy");
    clipboard.on('success', function (e) {
        toast(window.top.message.deposit_auto['复制成功']);
    });

    clipboard.on('error', function (e) {
        toast(window.top.message.deposit_auto['复制失败']);
    });
}

/**关闭弹窗*/
function closeProWindow(obj, options) {
    $('#masker').hide();
    $('#successMasker').hide();
    $(obj).parents('.gb-withdraw-box').hide();
    if ($("#applySale")) {
        $("#applySale").removeClass("mui-active");
        $("#applySale").html("");
    }


}

/**保存图片*/
function savePicture(obj, options) {
    var imgUrl = options.url;
    if (imgUrl) {
        if (isNative) {
            nativeSaveImage(imgUrl);
        } else if (/.(gif|jpg|jpeg|png)$/.test(imgUrl)) {
            var a = document.createElement('a');
            a.href = imgUrl;
            a.download = imgUrl;
            a.click();
        }
    }
}

/**
 * 返回至首页
 */
function goToHome() {
    if (isNative) {
        gotoHomePage();
    } else {
        goToUrl(root + '/mainIndex.html');
    }
}

/**跳转到存款页面*/
function goToDepositPage() {
    if (isNative) {
        nativeGotoDepositPage();
    } else {
        goToUrl(root + '/wallet/v3/deposit/index.html?v=' + Math.random());
    }
}