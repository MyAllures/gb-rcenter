/**
 * 玩家信息-地址
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        select: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {

        },
        queryAddress: function (e) {
            var $target = $(e.currentTarget);
            var playerId = $target.parent().children("input[name=playerId]").val();
            var refresh = $target.parent().parent();
            $(refresh).html('<img src="'+resRoot+'/images/022b.gif">');
            $(refresh).load(root + '/player/view/address.html?search.playerId=' + playerId);
        }
    });

});