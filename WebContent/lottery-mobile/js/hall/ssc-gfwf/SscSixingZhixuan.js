define(['site/hall/ssc-gfwf/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        /**
         * 随机算法-4星直选复式
         */
        random_4xzxfs :function() {
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);
            var random_4 = parseInt(Math.random() * 10);

            $(".qianweisStr a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $(".baiweisStr  a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
            $(".shiweisStr  a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
            $(".geweisStr   a.n-btn").removeClass("mui-active").eq(random_4).addClass("mui-active");
        },

        /**
         * 四星直选复式
         */
        content_4xzxfs :function() {
            var qianArr = [], baiArr = [], shiArr = [], geArr = [];
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

            if(qianArr.length <= 0|| baiArr.length <= 0|| shiArr.length <= 0|| geArr.length <= 0){
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "四星直选-复式";
            showContent = "千位：({0})，百位：({1})，十位：({2})，个位：({3})".format(
                qianArr.join(","),
                baiArr.join(","),
                shiArr.join(","),
                geArr.join(",")
            );
            betContent = _this.gfwf_4xfs(qianArr,baiArr,shiArr,geArr);
            return betContent;
        },

        /***********四星直选复式*************/
        /**
         * 注数-4星直选复式
         */
        zhushu_4xzxfs : function() {
            var qianArr = [], baiArr = [], shiArr = [], geArr = [];
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

            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
                return 0;
            }

            var newArr = _this.getFourNewArrs(qianArr, baiArr, shiArr, geArr);

            return newArr.length;
        },

        gfwf_4xfs :function(qianArr,baiArr,shiArr,geArr) {
            var tmpStr_1 = qianArr.join(",");
            var tmpStr_2 = baiArr.join(",");
            var tmpStr_3 = shiArr.join(",");
            var tmpStr_4 = geArr.join(",");

            return "{0}|{1}|{2}|{3}".format(
                tmpStr_1,
                tmpStr_2,
                tmpStr_3,
                tmpStr_4
            );
        },

        // 获取千、百、十、个固定位数的个数所组成4位所有组合
        getFourNewArrs :function(qianA, baiA, shiA, geA) {
            var qArr = [], bArr = [], sArr = [], gArr = [];
            qArr = qianA;
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var q = 0; q < qArr.length; q++) {
                for (var b = 0; b < bArr.length; b++) {
                    for (var s = 0; s < sArr.length; s++) {
                        for (var g = 0; g < gArr.length; g++) {
                            tempArr.push(qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                        }
                    }
                }
            }
            return tempArr;
        },

        showTable : function(){
            //四星
            $("div.s-menu.second").hide();
            $("#zxfs").show();
            $("a[data-code='zxfs']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("直选复式");
            $("span.x_1.gfwf-tit").text("四星");
            $(".s-title.title1 span").text("四星");
            $(".s-title.title2 span").text("直选复式");
        }

    });
});