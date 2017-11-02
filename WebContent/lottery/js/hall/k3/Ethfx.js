
define(['site/hall/k3/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'ethfx',
        init: function () {
            this._super();
        },/**
         * 注数-二同号复选
         */
        zhushu_ethfx: function() {
            var _this = this;
            var wanArr = [];
            $.each($(".cl-1002 ul li[data-name = '二同号'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            return wanArr.length;
        },

        content_ethfx: function () {
            var _this = this;
            var wanArr = [];
            $.each($(".cl-1002 ul li[data-name = '二同号'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });

            if (wanArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = "二同号-复选";
            var showContent = wanArr.join("|");
            var betContent = wanArr.join("|");
            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 5二同号复选
         */
        suiji_ethfx: function() {
            var _this = this;
            var tempArr = [11, 22, 33, 44, 55, 66];
            var arr = [];
            while (arr.length < 1) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }
            console.log(arr[0]);
            // 初始化变量
            var showPlayName = "二同号-复选";
            var showContent = arr[0];
            var betContent = arr[0];

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

        // 数字批量选择算法
        selectFun_1: function(obj) {
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                if ($.inArray(num, [11, 22, 33, 44, 55, 66]) >= 0) {
                    $(this).addClass("acti");
                }
            });

            var objName = $(obj).parent().parent().parent().find("li").eq(0).find(".numLines").attr('class');
            var maName = '';
            if(typeof objName != 'undefined'){
                maName = objName.split(' ')[1];
                var objBtn = getCommonObj(obj, maName);
                var btnFlag = "quan";
                changeActi(btnFlag, objBtn);
            }

            this.renderZhushu();
        },
    })
});