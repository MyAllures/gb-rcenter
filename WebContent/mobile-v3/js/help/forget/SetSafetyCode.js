/**
 * Created by snake on 18-5-16.
 */
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-scroll-wrapper'
    }
    muiInit(options);
    initInput();
});

function initInput() {
    window.inputNumber.init($('[name=pwd1]'), {negative: false, decimal: false, initSize: 6});
    window.inputNumber.init($('[name=pwd2]'), {negative: false, decimal: false, initSize: 6});
}

function setSafetyCode() {
    var pwd1 = $('[name=pwd1]').val();
    var pwd2 = $('[name=pwd2]').val();
    if (checkSecurityPasswordForm(pwd1, pwd2)) {
        saveSecurityPassword(pwd1);
    }
}
/*效验提交安全码*/
function checkSecurityPasswordForm(pwd1, pwd2) {
    var reg = /^[0-9]{6}$/;
    var $pwd1 = $('[name=pwd1]');
    var $pwd2 = $('[name=pwd2]');
    if (pwd1 == null || pwd1.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入安全密码']);
        $pwd1.focus();
        return false;
    } else if (!reg.test(pwd1)) {
        toast(window.top.message.passport_auto['安全密码长度2']);
        $pwd1.focus();
        return false;
    }
    if (pwd2 == null || pwd2.trim().length == 0) {
        toast(window.top.message.passport_auto['请再次输入安全密码']);
        $pwd2.focus();
        return false;
    } else if (pwd1 != pwd2) {
        toast(window.top.message.passport_auto['两次密码不一致']);
        $pwd2.focus();
        return false;
    }
    return true;

}

/*设置安全码，并返回到个人页面*/
function saveSecurityPassword(pwd) {
    var options = {
        url: root + '/passport/securityPassword/saveSecurityPassword.html',
        type: 'post',
        data: {'pwd': pwd},
        success: function (data) {
            if (data) {
                showDialog();
            } else {
                toast("修改安全码失败");
            }
        }
    };
    muiAjax(options);
}


/**
 * 修改成功弹窗
 */
function showDialog() {
    mui.alert('<div class="icon-gongxi"></div><div class="txt">新安全码设置成功，请牢记！</div>', ' ');
    $('.mui-popup').addClass('password_set_success_dialog');
    $('.mui-popup').find(".mui-popup-button").html('').append(['<i class="mui-icon mui-icon-close" data-rel=\'{"target":"goLogin","opType":"function"}\'></i>'].join(""));
}

/**
 * 修改成功后跳转到登录页面
 */
function goLogin(){
    login("/mainIndex.html");
    // login("/mine/index.html");
}