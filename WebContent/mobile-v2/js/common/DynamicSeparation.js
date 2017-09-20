define([''], function () {
    return Class.extend({
        init: function () {
            this.onPageLoad();
        },
        onPageLoad: function () {
            this.loginStatus();
            this.osStatus();
        },
        /*
        登录状态判断,是否显示相应内容
         */
        loginStatus: function () {
            setTimeout(function () {
                mui.ajax(root + '/sysUser.html', {
                    type: 'POST',
                    dataType: 'JSON',
                    success: function (data) {
                        if (data == 'unLogin') {
                            sessionStorage.is_login = false;
                            isLogin = "false";
                            $('._leftUnLogin').removeClass('mui-hide');
                            $('._rightUnLogin').removeClass('mui-hide');
                            $('._rightLogin').addClass('mui-hide');
                            $('#avatarImg').attr('src', $('#resRoot').val() + "/images/avatar.png");
                        } else {
                            var d = eval('(' + data + ')');
                            sessionStorage.is_login = true;
                            isLogin = "true";
                            $('._leftLogin').removeClass('mui-hide');
                            $('._leftLogout').removeClass('mui-hide');
                            $('._userAsset').removeClass('mui-hide');
                            $('._rightUnLogin').addClass('mui-hide');
                            $('._rightLogin').removeClass('mui-hide');
                            $('._leftUsername').text(d.username);
                            //设置头像
                            if(!d.avatarUrl)
                                $('#avatarImg').attr('src', $('#resRoot').val() + "/images/avatar.png");
                        }
                    }
                });
            },500);
        },
        /*
         操作系统判断,是否显示相应内容
         */
        osStatus: function () {
            var os = this.whatOs();
            if (os == 'app_android') {
                $('._cacheContent').attr('style', 'padding-top:0;padding-bottom:0;top:0;bottom:0;');
            } else if (os == 'app_ios') {
                $('._siteHeader').removeClass('mui-hide');
                $('._cacheContent').attr('style', 'bottom:0;padding-top:44px;top:0;');
            } else {
                $('._siteHeader').removeClass('mui-hide');
                $('._indexDomain').removeClass('mui-hide');
                $('._footerMenu').removeClass('mui-hide');
                $('._downloadApp').removeClass('mui-hide');
                $('._goPc').removeClass('mui-hide');
            }
        },
        whatOs: function () {
            var ua = navigator.userAgent;
            // var ua = "Mozilla/5.0 (iPhone; CPU app_ios OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            //var ua = "Mozilla/5.0 (Linux; app_android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36";
            if (/(app_ios)/i.test(ua)) {
                return 'app_ios';
            } else if (/(app_android)/i.test(ua)) {
                return 'app_android';
            } else {
                return 'other';
            }
        }
    });
});

