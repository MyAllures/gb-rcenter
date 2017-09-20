/**
 * 管理首页-首页js
 */
define(['common/BasePage', 'Util', 'tooltips'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "div[name=homeIndex]";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();

            this._hour();//问候语显示
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //提升安全
            $("div.auth-level").on("click", "a.accountSet", function () {
                _this.accountSetting();
            });
        },
        //左侧-个人信息--author:orange
        //实名认证
        viewRealName: function (e) {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        editRealName: function (e) {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        //银行卡
        bankInfo: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        //email
        email: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        //手机
        phone: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        /**
         * 问候语显示
         * @private
         */
        _hour: function () {
            var _hours = new Date().getHours();
            var message = window.top.message.common['goodevening'];
            if (_hours >= 0 && _hours < 6) {
                message = window.top.message.common['goodnight'];
            } else if (_hours >= 6 && _hours < 12) {
                message = window.top.message.common['goodmorning'];
            } else if (_hours == 12) {
                message = window.top.message.common['goodnoon'];
            } else if (_hours > 12 && _hours < 18) {
                message = window.top.message.common['goodafternoon'];
            }
            $("._hours").text(message);
        },
        /**
         * 跳转至账户设置
         */
        accountSetting: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        }
    });
})
;