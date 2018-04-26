/**
 * Created by legend on 18-3-15.
 */


$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        // disabledHandSlip: ['mui-scroll']
    };
    muiInit(options);

    getBankList();

});

/**
 * 获取银行列表
 */
function getBankList() {
    var options = {
        url: root + '/bankCard/bankList.html',
        dataType:'json',
        type: 'post',
        async: true,
        success: function (data) {
            var userPicker = new mui.PopPicker();
            userPicker.setData(data);
            var selectBank = document.getElementById("selectBank");
            if (selectBank != null) {
                selectBank.addEventListener('tap', function (event) {
                    userPicker.show(function (items) {
                        document.getElementById("bankLabel").innerHTML = items[0].text;
                        $("input[name='result.bankName']")[0].defaultValue = items[0].value;
                    });
                })
            }

        }
    };
    muiAjax(options);
}

/**
 * 保存银行卡
 */
function submitBankCard() {
    var $submit = $("#submitBankCard");
    var $form = $("form[name=bankcardForm]");
    if (!$form.valid()) {
        return false;
    }
    $submit.attr("disabled", true);
    var data = $form.serialize();
    var options = {
        url: root + '/fund/userBankcard/submitBankCard.html?userType=24',
        dataType:'json',
        data: data,
        type: 'post',
        async: true,
        beforeSend: function () {
            showLoading();
        },
        success: function (data) {
            $submit.attr("disabled", false);
            if (data.state) {
                toast(data.msg);
                setTimeout(function () {
                    if (data.action == 'withdraw') {
                        var _href = root + '/wallet/withdraw/index.html';
                        goToUrl(_href);
                    } else {
                        goToLastPage();
                    }
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