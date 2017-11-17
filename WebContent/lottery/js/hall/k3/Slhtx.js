
define(['site/hall/k3/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'slhtx',
        init: function () {
            this._super();
        },/**
         * 注数-三连号通选
         */
        zhushu_slhtx: function() {
            var _this = this;
            var wanArr = [];
            $.each($(".cl-1002 ul li[data-name = '三连号'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            return wanArr.length;
        },

        content_slhtx: function () {
            var _this = this;
            var wanArr = [];
            $.each($(".cl-1002 ul li[data-name = '三连号'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });

            if (wanArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = "三连号-通选";
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
        suiji_slhtx: function() {
            var _this = this;
            // 初始化变量
            var showPlayName = "三连号-通选";
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