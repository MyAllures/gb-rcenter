/**
 * 资金管理-提现管理审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        showPlayerDetail: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/playerView.html?search.id=' + opt.playerId);
        },
        toSameRegisterIp: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true&search.registerIp=' + opt.ip);
        },
        toSameLoginIp: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true&search.lastLoginIp=' + opt.ip);
        },
        toSameQq: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true&search.qq=' + opt.qq);
        },
        toSameWeixin: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true&search.weixin=' + opt.data);
        },
        toSameMail: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true&search.mail=' + opt.data);
        },
        toSamePhone: function (e, opt) {
            window.top.topPage.closeDialog();
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true&search.mobilePhone=' + opt.data);
        },
        toSameName: function (e, opt) {
            window.top.topPage.closeDialog();
            var data = {'search.realName': opt.data};
            window.top.topPage.showMainPage('/player/list.html?search.hasReturn=true', data);
        }
    });
});