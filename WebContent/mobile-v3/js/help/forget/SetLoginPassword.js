$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
});

/**
 * 设置登录密码
 */
function setLoginPassword() {
    var encryptedId = $("#encryptedId").val();
    var password = $("#password").val();
    var repeatPassword = $("#repeatPassword").val();
    var ajaxOptions = {
        url: root + '/forgetPassword/changePasswordByPhone.html',
        data: {"encryptedId": encryptedId, "newPassword": password},
        type: 'post',
        dataType: "json",
        success: function (data) {
            if(data){
                showDialog();
            }else{
                toast("修改密码失败");
            }
        }
    };
    muiAjax(ajaxOptions);
}

/**
 * 修改成功弹窗
 */
function showDialog(){
    mui.alert('<div class="icon-gongxi"></div><div class="txt">新密码设置成功，请牢记！</div>',' ');
    $('.mui-popup').addClass('password_set_success_dialog');
    $('.mui-popup').find(".mui-popup-button").html('').append("<i class='mui-icon mui-icon-close' data-rel='{'target':'${root}/login/commonLogin.html','opType':'href'}'></i>");
}