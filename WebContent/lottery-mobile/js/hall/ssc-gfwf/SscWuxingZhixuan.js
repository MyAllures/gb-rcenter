define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            this._super();
        },

        /**
         * 随机算法-五星直选复式
         */
        random_5xzxfs : function() {
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);
            var random_4 = parseInt(Math.random() * 10);
            var random_5 = parseInt(Math.random() * 10);

            $(".wangweisStr a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $(".qianweisStr a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
            $(".baiweisStr  a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
            $(".shiweisStr  a.n-btn").removeClass("mui-active").eq(random_4).addClass("mui-active");
            $(".geweisStr   a.n-btn").removeClass("mui-active").eq(random_5).addClass("mui-active");
        },

        /***********五星直选复式*************/
        /**
         * 注数-5星直选复式
         */
        zhushu_5xzxfs : function() {
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
                return 0;
            }

            var newArr = _this.getNewArrs(wanArr, qianArr, baiArr, shiArr, geArr);
            return newArr.length;
        },


        /**
         * 五星直选复式
         */
        content_5xzxfs : function() {
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
                return 0;
            }

            return "{0}|{1}|{2}|{3}|{4}".format(
                wanArr.join(","),
                qianArr.join(","),
                baiArr.join(","),
                shiArr.join(","),
                geArr.join(",")
            );
        },

        // 获取万、千、百、十、个，固定位数的个数所组成5位所有组合
        getNewArrs : function(wanA, qianA, baiA, shiA, geA) {
            var wArr = [], qArr = [], bArr = [], sArr = [], gArr = [];
            wArr = wanA;
            qArr = qianA;
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var w = 0; w < wArr.length; w++) {
                for (var q = 0; q < qArr.length; q++) {
                    for (var b = 0; b < bArr.length; b++) {
                        for (var s = 0; s < sArr.length; s++) {
                            for (var g = 0; g < gArr.length; g++) {
                                tempArr.push(wArr[w] + "" + qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                            }
                        }
                    }
                }
            }
            return tempArr;
        }

    });
});