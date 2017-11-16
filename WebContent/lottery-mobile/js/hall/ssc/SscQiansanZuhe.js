define(['site/hall/ssc/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },


        showTable : function(){
            $("a[data-code='ssc_sanxing_qs']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#qiansan").show();
            $("span.x_1.gfwf-tit").text("前三");
            $(".s-title.title1 span").text("前三");
            $("#qiansan a").removeClass("mui-active");
            $("a[data-code='ssc_sanxing_zhixuan_qszh']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("前三组合")
            $(".s-title.title2 span").text("前三组合");

        },

        checkSanxingZuhe:function () {
            return true;
        },



        /*===============================前3组合==============================*/

        /**
         * 注数-前3组合
         */
        zhushu_q3zh : function () {
            var _this=this;
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($("ul.wanweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                baiArr.push($.trim($(this).html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;

            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
                return 0;
            }

            var newArr = _this.getHszhNewArrs(wanArr, qianArr, baiArr);
            return newArr.length;
        },

        // 获取百、十、个固定位数的个数所组成(后三直选--后三组合)
        getHszhNewArrs :function (baiA, shiA, geA) {
            var bArr = [], sArr = [], gArr = [];
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                        tempArr.push(sArr[s] + "" + gArr[g]);
                        tempArr.push(gArr[g]);
                    }
                }
            }
            return tempArr;
        },


        /**
         * 前三直选-前三组合
         */
        content_q3zh : function () {
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($("ul.wanweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });

            return _this.gfwf_3xfs(
                wanArr,
                qianArr,
                baiArr
            );
        },

        gfwf_3xfs :function (baiArr,shiArr,geArr) {
            var tmpStr_1 = baiArr.join(",");
            var tmpStr_2 = shiArr.join(",");
            var tmpStr_3 = geArr.join(",");

            return "{0}|{1}|{2}".format(
                tmpStr_1,
                tmpStr_2,
                tmpStr_3
            );
        },

        /**
         * 随机算法-前三组合
         */
        random_q3zh : function () {
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);

            $(".wanweisStr  a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $(".qianweisStr  a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
            $(".baiweisStr  a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
        },

    });
});