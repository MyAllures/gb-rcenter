/**
 * 资金管理-手工存取
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "div[name=manual]";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //回车提交
            this.enterSubmit(".enter-submit");
        },
        /**
         * 跳转人工存入
         * @param e
         * @param option
         */
        manualDeposit: function (e, option) {
            var url = root + "/fund/manual/deposit.html";
            /*var username = $("input[name=username]").val();
            if (username) {
                url = url + "?username=" + username;
            }*/
            $("#manual").load(url);
            $("ul.sys_tab_wrap").children().removeClass("active");
            $($("ul.sys_tab_wrap").children()[0]).addClass("active");
            $(e.currentTarget).unlock();
        },
        /**
         * 跳转人工取出
         * @param e
         * @param option
         */
        manualWithdraw: function (e, option) {
            var url = root + "/fund/manual/withdraw.html";
            /*var username = $("input[name=username]").val();
            if (username) {
                url = url + "?username=" + username;
            }*/
            $("#manual").load(url);
            $("ul.sys_tab_wrap").children().removeClass("active");
            $($("ul.sys_tab_wrap").children()[1]).addClass("active");
            $(e.currentTarget).unlock();
        },
        //为了详细能返回上一步
        query: function (e, option) {
           $("#manual").load(root + "/fund/manual/withdraw.html");
        }
    });
});