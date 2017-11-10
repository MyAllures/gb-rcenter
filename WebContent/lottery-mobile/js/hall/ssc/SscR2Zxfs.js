define(['site/hall/ssc/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //active_a:$("a.selected-btn.mui-col-xs-4.main.mui-active"),
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            // this.showTable();
        },

        showTable : function(){
            //大菜单
            $("a[data-code='R2']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#R2").show();
            $("span.x_1.gfwf-tit").text("任选二");
            $(".s-title.title1 span").text("任选二");
            $(".s-title.title2 span").text("直选复式");
            $(".x_3.gfwf-playName").text("直选复式");
            $("#toobarTitle").text("官方玩法-任选二");
            $("a[data-code='ssc_renxuan2_zxfs']").addClass("mui-active");

        },
        
        /**************任选二***************/
        /**
         * 注数-任选二 / 时时彩与11选5共用注数方法
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
                $("a.bottom-bar-btn.btn-jixuan-gfwf").addClass("mui-active");
                $("a.bottom-bar-btn.btn-reset-gfwf").removeClass("mui-active");
                return 0;
            }else {
                $("a.bottom-bar-btn.btn-jixuan-gfwf").removeClass("mui-active");
                $("a.bottom-bar-btn.btn-reset-gfwf").addClass("mui-active");
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
        },

        /**
         * 随机算法-任二直选复式
         */
        random_ssc_renxuan2_zxfs : function() {
            var arrTemp = [];
            var wei_1 = 0;
            var wei_2 = 1;
            while(arrTemp.length < 2){
                wei_1 = parseInt(Math.random() * 5);
                wei_2 = parseInt(Math.random() * 5);
                if(wei_1 != wei_2){
                    arrTemp.push(wei_1);
                    arrTemp.push(wei_2);
                }
            }

            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);
            var random_4 = parseInt(Math.random() * 10);
            var random_5 = parseInt(Math.random() * 10);

            if(wei_1 == 0 || wei_2 == 0){
                $("a.n-btn.wang").removeClass("mui-active");
                $("a.n-btn.wang."+random_1).addClass("mui-active");
            }

            if(wei_1 == 1 || wei_2 == 1){
                $("a.n-btn.qian").removeClass("mui-active");
                $("a.n-btn.qian."+random_2).addClass("mui-active");
            }

            if(wei_1 == 2 || wei_2 == 2){
                $("a.n-btn.bai").removeClass("mui-active");
                $("a.n-btn.bai."+random_3).addClass("mui-active");
            }

            if(wei_1 == 3 || wei_2 == 3){
                $("a.n-btn.shi").removeClass("mui-active");
                $("a.n-btn.shi."+random_4).addClass("mui-active");
            }

            if(wei_1 == 4 || wei_2 == 4){
                $("a.n-btn.ge").removeClass("mui-active");
                $("a.n-btn.ge."+random_5).addClass("mui-active");
            }
        }

    });
});