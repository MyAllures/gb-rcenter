/**
 * 玩家信息-回收资金js
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 某一项api回收资金后资金刷新
         *
         * @param e
         * @param option
         */
        refresh: function (e, option) {
            window.location.reload();
        }
    });

});