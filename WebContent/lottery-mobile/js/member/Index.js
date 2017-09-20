
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {

    return BasePage.extend({
        t:null,
        init: function (formSelector) {

            var _this=this;
            _this.onPageLoad();
            _this.bindEvents();
        },

        onPageLoad: function () {
             t = this;
            this.getUserInfo();
        },


        getUserInfo : function () {
            mui.ajax(root + "/member/userInfo.html", {
                type: 'post',//HTTP请求类型
                timeout: 20000,//超时时间设置为10秒；
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                dataType: "json",
                success: function (data) {
                    if(data.balance!= null){
                        $("#balance").html(data.balance.toFixed(2));
                    }else{
                        $("#balance").html(0.00);
                    }
                    mui('#mineRefreshContainer').pullRefresh().endPulldownToRefresh();
                },
                error: function (e) {

                    mui('#mineRefreshContainer').pullRefresh().endPulldownToRefresh();
                    t.toast("加载失败");
                    //异常处理；
                    // console.log(e);
                }
            });

        },
        bindEvents:function () {
            mui('body').on('tap', '.mui-pull-right a[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });
        }

    })
});