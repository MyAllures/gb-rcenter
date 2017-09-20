/**
 * 是否弹窗真实姓名js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        realName: function () {
            var isRealName = $("input[name=isRealName]").val();
            if (isRealName == 'true') {
                var e = {};
                e.currentTarget = $("a[name=realNameDialog]");
                e.page = window.top.page;
                var btnOption = {};
                btnOption.target = root + "/accountSettings/toSettingRealName.html";
                btnOption.text = window.top.message.fund['Deposit.realName.fillRealName'];
                window.top.topPage.doDialog(e, btnOption);
            }
        }
    });
});