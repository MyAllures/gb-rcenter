/**
 * Created by legend on 18-3-19.
 */

$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        // disabledHandSlip: ['mui-scroll']
    };
    muiInit(options);
});

function submitBtc() {
    var $form = $("form[name=btcForm]");
    if (!$form.valid()) {
        return false;
    }
    var btnNum = $("input[name='result.bankcardNumber']").val();
    $("#confirmBtc").text(btnNum);
    //弹出对话框
    $(".gb-bindcard-box.bit_addr").show();
    $(".gb-bindcard-box.bit_addr").prev().show();
}

/**
 * 关闭确认框
 * @returns {boolean}
 */
function closeConfirm() {
    $('.masker, .gb-bindcard-box').hide();
    return false;
}

/**
 * 确认提交
 */
function submitConfirm() {
    this.bindBtc();
}

/**
 * 绑定比特币
 */
function bindBtc() {
    var $submit = $("#bindBtc");
    $submit.attr("disabled", true);
    var options = {
        url: '/fund/userBankcard/submitBtc.html?userType=24',
        dataType: 'json',
        data: $("form[name=btcForm]").serialize(),
        type: 'post',
        async: true,
        beforeSend: function () {
            $(".bit_addr").remove();
            $(".masker").remove();
            showLoading();
        },
        success: function (data) {
            $submit.attr("disabled", false);
            if (data.state) {
                toast(data.msg);
                setTimeout(function () {
                    mui.back();

                }, 1000);
            } else {
                toast(data.msg);
                $(document).find("input[name='gb.token']").val(data.token);
            }
        },
        error: function (xhr, type, errorThrown) {
            if (xhr.status == 608) {
                mui.alert(window.top.message.my_auto['请勿重复提交']);
            }
            $submit.attr("disabled", false);
        },
        complete: function () {
            hideLoading();
        }
    };
    muiAjax(options);
}