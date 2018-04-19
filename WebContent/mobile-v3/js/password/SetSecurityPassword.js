/**
 * Created by snake on 18-4-18.
 */
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-scroll-wrapper'
    };
    /*初始化mui框架*/
    muiInit(options);
    /*检查真实姓名*/
    checkHasRealName();
    /*初始化设置安全码*/
    initInput();
});

/*点击确认触发提交安全码*/
function submitSafeCode() {
    var pwd1 = $('[name=pwd1]').val();
    var pwd2 = $('[name=pwd2]').val();
    if (checkSecurityPasswordForm(pwd1, pwd2)) {

        saveSecurityPassword(pwd1, function () {
            goToUrl(root + '/mine/index.html');
        });
    }
}
