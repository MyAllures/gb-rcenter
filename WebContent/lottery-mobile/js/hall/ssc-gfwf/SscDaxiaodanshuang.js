/**
 * Created by diego on 17-10-11.
 */
define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            this.showTable();
        },
        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            $("a[data-code='ssc_daxiaodanshuang']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#daxiaodanshuang").show();
            $("span.x_1.gfwf-tit").text("大小单双");
            $(".s-title.title1 span").text("大小单双");
            if(betCode =="ssc_daxiaodanshuang"){
                $("a[data-code='ssc_daxiaodanshuang_q2']").addClass("mui-active");

            }else{
                $("#daxiaodanshuang a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }
            if(betCode =="ssc_daxiaodanshuang_q2"){
                $(".x_3.gfwf-playName").text("前二大小单双")
                $(".s-title.title2 span").text("前二大小单双");
            }
            if(betCode =="ssc_daxiaodanshuang_h2"){
                $(".x_3.gfwf-playName").text("后二大小单双")
                $(".s-title.title2 span").text("后二大小单双");
            }
            if(betCode =="ssc_daxiaodanshuang_q3"){
                $(".x_3.gfwf-playName").text("前三大小单双")
                $(".s-title.title2 span").text("前三大小单双");
            }
            if(betCode =="ssc_daxiaodanshuang_h3"){
                $(".x_3.gfwf-playName").text("后三大小单双")
                $(".s-title.title2 span").text("后三大小单双");
            }
        },


        /**************前2大小单双*************/
        /**
         * 前2大小单双
         */
        content_q2dxds:function () {
        var zhushu = 0;
        var dxdsWArr = [], dxdsQArr = [], tempArr = [];

        $.each($(".qianStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsWArr.push($.trim($(this).html()));
        });

        $.each($(".houStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsQArr.push($.trim($(this).html()));
        });

        for (var n = 0; n < dxdsWArr.length; n++) {
            for (var m = 0; m < dxdsQArr.length; m++) {
                tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m]);
            }
        }

        if(dxdsWArr.length <= 0 || dxdsQArr.length <= 0){
            return;
        }

        var arr = [
            dxdsWArr.join(","),
            dxdsQArr.join(",")
        ];

        return "{0}|{1}".format(arr[0], arr[1]);
    },
        //注数-前二大小单双
        zhushu_q2dxds:function () {
        var dxdsWArr = [], dxdsQArr = [], tempArr = [];
        $.each($(".qianStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsWArr.push($.trim($(this).html()));
        });
        $.each($(".houStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsQArr.push($.trim($(this).html()));
        });

        for (var n = 0; n < dxdsWArr.length; n++) {
            for (var m = 0; m < dxdsQArr.length; m++) {
                tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m]);
            }
        }
        return tempArr.length;
    },
        /**
         * 随机算法-前二大小单双
         */

        random_q2dxds:function () {
        var random_1 = parseInt(Math.random() * 4);
        var random_2 = parseInt(Math.random() * 4);

        $(".qianStr a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(".houStr a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
    },
        /**************后2大小单双*************/
        /**
        * 后2大小单双
        */
        content_h2dxds:function () {
            var zhushu = 0;
            var dxdsSArr = [], dxdsGArr = [], tempArr = [];
            $.each($(".qianStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                dxdsSArr.push($.trim($(this).html()));
            });
            $.each($(".houStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                dxdsGArr.push($.trim($(this).html()));
            });

            for (var n = 0; n < dxdsSArr.length; n++) {
                for (var m = 0; m < dxdsGArr.length; m++) {
                    tempArr.push(dxdsSArr[n] + "" + dxdsGArr[m]);
                }
            }
            if(dxdsSArr.length <= 0 || dxdsGArr.length <= 0){
                return;
            }
            var arr = [
                dxdsSArr.join(","),
                dxdsGArr.join(",")
            ];
            return "{0}|{1}".format(arr[0], arr[1]);
        },
        //注数-后二大小单双
        zhushu_h2dxds:function (){
        var dxdsSArr = [], dxdsGArr = [];
        $.each($(".qianStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsSArr.push($.trim($(this).html()));
        });
        $.each($(".houStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsGArr.push($.trim($(this).html()));
        });

        return dxdsSArr.length * dxdsGArr.length;
    },
        /**
         * 随机算法-后二大小单双
         */

        random_h2dxds:function () {
        var random_1 = parseInt(Math.random() * 4);
        var random_2 = parseInt(Math.random() * 4);

        $(".qianStr a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(".houStr a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
    },
        /**************前三大小单双*************/
        /**
         * 前三大小单双
         */
        content_q3dxds:function () {
        var zhushu = 0;
        var dxdsWArr = [], dxdsQArr = [], dxdsBArr = [], tempArr = [];
        $.each($(".yiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            dxdsWArr.push($.trim($(this).html()));
        });
        $.each($(".erStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            dxdsQArr.push($.trim($(this).html()));
        });
        $.each($(".sanStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            dxdsBArr.push($.trim($(this).html()));
        });


        for (var n = 0; n < dxdsWArr.length; n++) {
            for (var m = 0; m < dxdsQArr.length; m++) {
                for (var h = 0; h < dxdsQArr.length; h++) {
                    tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m] + "" + dxdsBArr[h]);
                }
            }
        }
        if(dxdsWArr.length <= 0 || dxdsQArr.length <= 0|| dxdsBArr.length <= 0){
            return;
        }
        var arr = [
            dxdsWArr.join(","),
            dxdsQArr.join(","),
            dxdsBArr.join(",")
        ];
        return "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);
    },
        //注数-前三大小单双
        zhushu_q3dxds:function (){
        var dxdsWArr = [], dxdsQArr = [], dxdsBArr = [];
        $.each($(".yiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsWArr.push($.trim($(this).html()));
        });
        $.each($(".erStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsQArr.push($.trim($(this).html()));
        });
        $.each($(".sanStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsBArr.push($.trim($(this).html()));
        });
        return dxdsWArr.length * dxdsQArr.length * dxdsBArr.length;
    },
        /**
         * 随机算法-前三大小单双
         */

        random_q3dxds:function () {
        var random_1 = parseInt(Math.random() * 4);
        var random_2 = parseInt(Math.random() * 4);
        var random_3 = parseInt(Math.random() * 4);

        $(".yiStr a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(".erStr a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
        $(".sanStr a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
    },
        /**************后三大小单双*************/
        /**
         * 后三大小单双
         */
        content_h3dxds:function () {
        var zhushu = 0;
        var dxdsBArr = [],dxdsSArr = [], dxdsGArr = [], tempArr = [];
        $.each($(".yiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            dxdsBArr.push($.trim($(this).html()));
        });
        $.each($(".erStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            dxdsSArr.push($.trim($(this).html()));
        });
        $.each($(".sanStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            dxdsGArr.push($.trim($(this).html()));
        });

        for (var i = 0; i < dxdsBArr.length; i++) {
            for (var n = 0; n < dxdsSArr.length; n++) {
                for (var m = 0; m < dxdsGArr.length; m++) {
                    tempArr.push(dxdsBArr[i] + "" + dxdsSArr[n] + "" + dxdsGArr[m]);
                }
            }
        }
        if(dxdsBArr.length <= 0 || dxdsSArr.length <= 0 || dxdsGArr.length <= 0){
            return;
        }
        var arr = [
            dxdsBArr.join(","),
            dxdsSArr.join(","),
            dxdsGArr.join(",")
        ];
        return "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);
    },
        //注数-后三大小单双
        zhushu_h3dxds:function (){
        var dxdsBArr = [],dxdsSArr = [], dxdsGArr = [];
        $.each($(".yiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsBArr.push($.trim($(this).html()));
        });
        $.each($(".erStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsSArr.push($.trim($(this).html()));
        });
        $.each($(".sanStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            dxdsGArr.push($.trim($(this).html()));
        });
        return dxdsBArr.length * dxdsSArr.length * dxdsGArr.length;
    },
        /**
         * 随机算法-后三大小单双
         */

        random_h3dxds:function () {
        var random_1 = parseInt(Math.random() * 4);
        var random_2 = parseInt(Math.random() * 4);
        var random_3 = parseInt(Math.random() * 4);

        $(".yiStr a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(".erStr a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
        $(".sanStr a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
    }


});
});
