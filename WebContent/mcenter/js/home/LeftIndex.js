/**
 * 管理首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "nav[name=leftIndexForm]";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
           this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 新增菜单，回调刷新菜单
         * @param e
         * @param option
         */
        refreshMenu: function (e, option) {
            if (e.returnValue == true) {
                window.location.reload();
                //$("#index-frame").load(root + "/index.html")
            }
        }
    });
});