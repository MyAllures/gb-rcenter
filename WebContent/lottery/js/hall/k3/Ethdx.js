
define(['site/hall/k3/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'ethdx',
        init: function () {
            this._super();
        },/**
         * 注数-二同号单选
         */
        zhushu_ethdx: function() {
            var _this = this;
            var tongArr = [];
            var butongArr = [];
            $.each($(".cl-1002 ul li[data-name = '二同号'] span.acti"), function (index, value) {
                tongArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '二不同'] span.acti"), function (index, value) {
                butongArr.push($.trim($(this).find("i").html()));
            });
            return tongArr.length * butongArr.length;
        },

        content_ethdx: function () {
            var _this = this;
            var tong = [];
            var butong = [];
            $.each($(".cl-1002 ul li[data-name = '二同号'] span.acti"), function (index, value) {
                tong.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '二不同'] span.acti"), function (index, value) {
                butong.push($.trim($(this).find("i").html()));
            });

            if (tong.length <= 0 || butong.length <=0) {
                return;
            }

            var tongStr = tong.length > 0 ? tong.join(",") : "";
            var butongStr = butong.length > 0 ? butong.join(",") : "";


            // 初始化变量
            var showPlayName = "二同号-单选";
            var showContent = $.trim((tongStr == ' ' ? ' ' : tongStr ) + "|" +(butongStr == ' ' ? ' ' : butongStr));
            var betContent = $.trim((tongStr == ' ' ? ' ' : tongStr ) + "|" +(butongStr == ' ' ? ' ' : butongStr));
            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 5二同号复选
         */
        suiji_ethdx: function() {
            var _this = this;
            var tongArr = [11, 22, 33, 44, 55, 66];
            var butongArr = [1, 2, 3, 4, 5, 6];
            var tong = 0;
            var butong = 0;
            while (tong ==butong){
                tong = parseInt(Math.random() * 6);
                butong = parseInt(Math.random() * 6);
            }
            console.log(tongArr[tong]+","+butongArr[butong]);
            // 初始化变量
            var showPlayName = "二同号-单选";
            var showContent = tongArr[tong]+"|"+butongArr[butong];
            var betContent = tongArr[tong]+"|"+butongArr[butong];

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: _this.playGroupId
            };
        },
        getBetNum:function(betNum) {
            return betNum;
        },

    })
});