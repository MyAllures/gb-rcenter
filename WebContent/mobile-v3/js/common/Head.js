/**是否登录标识*/
var isLogin = false;
$(function () {
    headInfo();
});

/**
 * 获取头部用户信息
 */
function headInfo() {
    var options = {
        url: root + '/userInfo.html',
        success: function (data) {
            if (data.isLogin == true) {
                $("#notLogin").hide();
                $(".user_name").text(data.name);
                $(".bar-asset").text(data.asset);
                $(".money").text(data.asset);
                //左侧菜单用户信息显示
                $("div.login p").text(data.name);
                $("div.login").show();
                $("div.un-login").hide();
                //右上角显示用户信息
                $("#login-info").show();
                isLogin = true;
            } else {
                $("#notLogin").show();
                $("div.login").hide();
                $("div.un-login").show();
                $("#login-info").hide();
                isLogin = false;
            }
        }
    };
    muiAjax(options);
}
/**
 * 打开左侧菜单
 */
function leftMenu(obj) {
    if(mui('.mui-off-canvas-wrap').offCanvas().isShown('left')){
        mui('.mui-off-canvas-wrap').offCanvas().close();
        $(".lang-menu").hide();
    } else {
        mui('.mui-off-canvas-wrap').offCanvas().show();
    }
    $(obj).unlock();
}