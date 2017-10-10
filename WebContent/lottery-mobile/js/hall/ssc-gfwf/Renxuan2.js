define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //active_a:$("a.selected-btn.mui-col-xs-4.main.mui-active"),
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();

        },

        //定位胆机选
        sscYixing_random : function () {
            var random = parseInt(Math.random() * 10);
            var wei = parseInt(Math.random() * 5);
            if(wei == 0){
                $("a.n-btn.wang").removeClass("mui-active");
                $("a.n-btn.wang."+random).addClass("mui-active");
            } else if(wei == 1){
                $("a.n-btn.qian").removeClass("mui-active");
                $("a.n-btn.qian."+random).addClass("mui-active");
            } else if(wei == 2){
                $("a.n-btn.bai").removeClass("mui-active");
                $("a.n-btn.bai."+random).addClass("mui-active");
            } else if(wei == 3){
                $("a.n-btn.shi").removeClass("mui-active");
                $("a.n-btn.shi."+random).addClass("mui-active");
            } else if(wei == 4){
                $("a.n-btn.ge").removeClass("mui-active");
                $("a.n-btn.ge."+random).addClass("mui-active");
            }
        },


        /**************定位胆***************/
        /**
         * 注数-定位胆 / 时时彩与11选5共用注数方法
         */
        zhushu_ssc_renxuan2_zxfs :function(){

            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], arrNew = [], tempArr = [];
            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                geArr.push($.trim($(this).html()));
            });


            if (wanArr.length > 0) {
                arrNew.push(wanArr);
            }
            if (qianArr.length > 0) {
                arrNew.push(qianArr);
            }
            if (baiArr.length > 0) {
                arrNew.push(baiArr);
            }
            if (shiArr.length > 0) {
                arrNew.push(shiArr);
            }
            if (geArr.length > 0) {
                arrNew.push(geArr);
            }

            if (arrNew.length < 2) {
                return 0;
            }

            for (var i = 0; i < arrNew.length; i++) {
                for (var i1 = 0; i1 < arrNew[i].length; i1++) {
                    for (var x = i + 1; x < arrNew.length; x++) {
                        for (var n = 0; n < arrNew[x].length; n++) {
                            tempArr.push(arrNew[i][i1] + "" + arrNew[x][n]);
                        }
                    }
                }
            }
            return tempArr.length;
        },

        /**
         * 直选复式
         */
        content_ssc_renxuan2_zxfs : function(){
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

            var wanStr = wanArr.length > 0 ? wanArr.join(",") : "";
            var qianStr = qianArr.length > 0 ? qianArr.join(",") : "";
            var baiStr = baiArr.length > 0 ? baiArr.join(",") : "";
            var shiStr = shiArr.length > 0 ? shiArr.join(",") : "";
            var geStr = geArr.length > 0 ? geArr.join(",") : "";

            return $.trim(
                (wanStr == ' ' ? ' ' : wanStr ) + "|" +
                (qianStr == ' ' ? ' ' : qianStr) + "|" +
                (baiStr == ' ' ? ' ' : baiStr) + "|" +
                (shiStr == ' ' ? ' ' : shiStr) + "|" +
                (geStr == ' ' ? ' ' : geStr)
            );
        }

    });
});