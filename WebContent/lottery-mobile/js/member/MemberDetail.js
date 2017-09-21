define(['site/common/BasePage'], function (BasePage) {

    return BasePage.extend({
        t: null,
        init: function (formSelector) {
            this._super();
            t = this;
        },

        onPageLoad: function () {
            this.loadUserInfo();
            var _this = this;
            mui('body').on('tap', '.mui-pull-right a[data-href]', function () {
                _this.gotoUrl($(this).data('href'));
            });
        },


        loadUserInfo: function () {
            mui.ajax(root + "/member/getMemberDetail.html", {
                type: 'post',//HTTP请求类型
                timeout: 20000,//超时时间设置为10秒；
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                dataType: "json",
                success: function (data) {
                    $("#username").text(data.username);
                    $("#lastLoginIp").text(data.lastLoginIp);
                    $("#lastLoginTime").text(data.lastLoginTime);
                    if (data.balance != null && data.balance != 0)
                        $("#balance").text(data.balance);
                    else {
                        $("#balance").text("0.00");
                    }
                    if (data.lastWeekOrder != null && data.lastWeekOrder != 0) {
                        $("#lastWeekOrder").text(data.lastWeekOrder);
                    } else {
                        $("#lastWeekOrder").text("0.00");
                    }
                    if (data.thisWeekOrder != null && data.thisWeekOrder != 0) {
                        $("#thisWeekOrder").text(data.thisWeekOrder);
                    } else {
                        $("#thisWeekOrder").text("0.00");
                    }
                    $("#deposit").text(data.deposit);
                    $("#withdraw").text(data.withdraw);
                }
            });
        }

    })
});