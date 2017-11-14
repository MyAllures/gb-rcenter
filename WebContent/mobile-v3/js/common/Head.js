/**是否登录标识*/
var isLogin = false;
$(function () {
    headInfo();
});

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