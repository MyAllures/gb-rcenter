
define(['site/hall/k3/K3Gfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'sthtx',
        init: function () {
            this._super();
        },/**
         * 注数-三同号通选
         */
        zhushu_sthtx: function() {
            var _this = this;
            var wanArr = [];
            $.each($(".cl-1002 ul li[data-name = '三同号'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            return wanArr.length;
        },

        content_sthtx: function () {
            var _this = this;
            var wanArr = [];
            $.each($(".cl-1002 ul li[data-name = '三同号'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });

            if (wanArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = "三同号-通选";
            var showContent = "通选"
            var betContent = "通选"
            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 5星直选复式
         */
        suiji_sthtx: function() {
            var _this = this;
            // 初始化变量
            var showPlayName = "三同号-通选";
            var showContent = "通选";
            var betContent = "通选";

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: _this.playGroupId
            };
        }

    })
});