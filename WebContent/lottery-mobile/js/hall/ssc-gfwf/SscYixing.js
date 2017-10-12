define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //筛选数字组合
        // screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            this.showTable();
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
        zhushu_dwd :function(){
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];
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
            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (wanLength <= 0 && qianLength <= 0 && baiLength <= 0 && shiLength <= 0 && geLength <= 0) {
                return 0;
            }

            if (wanLength > 0) {
                newArr = newArr.concat(wanArr);
            }
            if (qianLength > 0) {
                newArr = newArr.concat(qianArr);
            }
            if (baiLength > 0) {
                newArr = newArr.concat(baiArr);
            }
            if (shiLength > 0) {
                newArr = newArr.concat(shiArr);
            }
            if (geLength > 0) {
                newArr = newArr.concat(geArr);
            }
            return newArr.length;
        },

        /**
         * 定位胆
         */
        content_dwd : function(){
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
        },

        showTable : function(){
            //定位胆
            $("div.s-menu.second").hide();
            $("#zxfs").show();
            $("a[data-code='zxfs']").addClass("mui-active");
            $("x_3.gfwf-playName").text("直选复式");
            $(".s-title.title1 span").text("定位胆");
            $(".s-title.title2 span").text("直选复式")
        }

    });
});