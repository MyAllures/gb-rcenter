/**
 * 跨度
 */
define(['site/hall/pl3/Pl3Gfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },

        /**
         * 注数-前三一码
         */
        zhushu_qsym: function () {
            var budwArr = [];
            $.each($(".cl-1002 ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });

            return budwArr.length;
        },

        //获取两位0到9之间的随机数
        getRandom2num:  function () {
            var arr = [];
            while (arr.length < 2) {
                var zhiHao1 = parseInt(Math.random() * 10);
                var zhiHao2 = parseInt(Math.random() * 10);
                if (zhiHao1 != zhiHao2) {
                    arr.push(zhiHao1);
                    arr.push(zhiHao2);
                }
            }
            return arr;
        },

        /**
         * 不定位-前三一码"
         */
        suiji_qsym:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arrTsh = [], newArr = [];
            while (newArr.length < 1) {
                var zhiTsh = parseInt(Math.random() * 10);
                newArr.push(zhiTsh);
            }

            showPlayName = "三星-前三一码";
            showContent = "不定位: (" + newArr[0] + ")";
            betContent = newArr.join("");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 不定位-前三一码
         */
        content_qsym:function () {
        var budwArr = [];
        $.each($(".cl-1002 ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "三星-前三一码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",")

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },
        //获取下注号码
        getBetNum:function(betNum) {
            return betNum;
        }
    })
});