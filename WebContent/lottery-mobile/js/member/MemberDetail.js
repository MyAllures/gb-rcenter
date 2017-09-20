
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {

    return BasePage.extend({
        t:null,
        init: function (formSelector) {
            t=this;
            t.onPageLoad();
        },

        onPageLoad: function () {
            this.loadUserInfo();
            mui('body').on('tap', '.mui-pull-right a[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });
        },


        loadUserInfo : function () {
            mui.ajax(root + "/member/getMemberDetail.html", {
                type: 'post',//HTTP请求类型
                timeout: 20000,//超时时间设置为10秒；
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                dataType: "json",
                success: function (data) {
                    if (data.balance != null && data.balance != 0)
                        $("#balance").html(data.balance.toFixed(2));
                    else{
                        $("#balance").html("0.00");
                    }
                    if (data.lastWeekOrder != null && data.lastWeekOrder != 0) {
                        $("#lastWeekOrder").html(data.lastWeekOrder);
                    }else{
                        $("#lastWeekOrder").html("0.00");
                    }
                    if (data.thisWeekOrder != null && data.thisWeekOrder != 0) {
                        $("#thisWeekOrder").html(data.thisWeekOrder);
                    }else{
                        $("#thisWeekOrder").html("0.00");
                    }
                    $("#deposit").html(data.deposit);
                    $("#withdraw").html(data.withdraw);
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                },
                error: function (e) {
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    t.toast("加载失败");
                }
            });
        },

    })
});