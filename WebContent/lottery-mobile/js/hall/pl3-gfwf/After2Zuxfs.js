define(['site/hall/pl3-gfwf/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            $("a[data-code='After2']").addClass("mui-active");
            $("#After2").show();
            $("span.x_1.gfwf-tit").text("后二");
            $(".s-title.title1 span").text("后二");
            $(".s-title.title2 span").text("组选复式");
            $(".x_3.gfwf-playName").text("组选复式");
            $("a[data-code='pl3_erxing_zuxuan_hefs']").addClass("mui-active");

        },

        /*================================前二直选复式===============================*/

        /**
         * 注数-直选复式
         */
        zhushu_q2zxfs :function () {
            var tempArr = [];
            var wanArr = [], qianArr = [];
            $.each($("ul.wanweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;

            if (wanLength <= 0 || qianLength <= 0) {
                return 0;
            }

            for(var i = 0; i < wanArr.length; i++){
                for(var i1 = 0; i1 < qianArr.length; i1++){
                    tempArr.push(wanArr[i] + "" + qianArr[i1]);
                }
            }
            return tempArr.length;
        },


        /***************前二****************/
        /**
         * 前二直选-直选复式
         */
        content_q2zxfs : function (){
            var wanArr = [], qianArr = [];
            $.each($("ul.wanweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });

            return _this.gfwf_2xfs(
                wanArr,
                qianArr
            );
        },

        gfwf_2xfs :function (shiArr,geArr) {
            var tmpStr_1 = shiArr.join(",");
            var tmpStr_2 = geArr.join(",");
            return "{0}|{1}".format(tmpStr_1,tmpStr_2);
        },

        // 前二
        /**
         * 随机算法-前二直选复式
         */
        random_q2zxfs : function () {
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            $(".wanweisStr  a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $(".qianweisStr  a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
        },


        /*================================前二直选和值===============================*/
        //注数-直选和值
        zhushu_q2zxhz : function () {
            var tempArr = [];
            var hzArr = [], temp = [], nowTemp = [];
            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                nowTemp.push($.trim($(this).html()));
            });

            if (typeof valArr != "undefined") {
                hzArr = valArr;
            } else {
                hzArr = nowTemp;
            }

            var hzLength = hzArr.length;
            if (hzLength <= 0) {
                return 0;
            }

            for (var n = 0; n < hzArr.length; n++) {
                sumTemp = parseInt(hzArr[n]);
                num = parseInt(hzArr[n]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                for (var i = 0; i < temp.length; i++) {
                    for (var i1 = 0; i1 < temp.length; i1++) {
                        if (temp[i] + temp[i1] == num && temp[i] <= 9 && temp[i1] <= 9) {
                            tempArr.push(temp[i] + "" + temp[i1]);
                        }
                    }
                }
            }

            tempArr = _this.uniqueArr(tempArr);
            return tempArr.length;
        },

        /**
         * 前二直选-直选和值
         */
        content_q2zxhz : function (){
            var hzArr = [];
            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                hzArr.push($.trim($(this).html()));
            });

            return hzArr.join("|");
        },

        /**
         * 随机算法-前二直选和值
         */
        random_q2zxhz : function () {
        var random_1 = parseInt(Math.random() * 19);
            // console.log(random_1);
            $("a.n-btn.hz").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },

        /*================================前二直选跨度===============================*/
        //注数-直选跨度
        zhushu_q2zxkd : function () {
            var tempArr = [];
            var kdArr = [], numTemp = [];
            var num = 0;

            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                numTemp.push($.trim($(this).html()));
            });

            if (typeof valArr != "undefined") {
                kdArr = valArr;
            } else {
                kdArr = numTemp;
            }

            var hzLength = kdArr.length;
            if (hzLength <= 0) {
                return 0;
            }

            for (var n = 0; n < kdArr.length; n++) {
                num = kdArr[n];
                for (var i = 0; i < 10; i++) {
                    for (var i1 = 0; i1 < 10; i1++) {
                        var numTemp = [];
                        numTemp.push(i);
                        numTemp.push(i1);
                        numTemp.sort();
                        if (numTemp[1] - numTemp[0] == num) {
                            tempArr.push(i + "" + i1);
                        }
                    }
                }
            }

            tempArr = _this.uniqueArr(tempArr);
            return tempArr.length;
        },

        /**
         * 前二直选-直选跨度
         */
        content_q2zxkd : function (){
            var kdArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                kdArr.push($.trim($(this).html()));
            });
            return kdArr.join(",");
        },

        /**

         * 随机算法-前二直选跨度
         */
        random_q2zxkd : function () {
            var random_1 = parseInt(Math.random() * 10);
            $("a.n-btn.kuadu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },


        /*================================前二组选复式===============================*/

        //注数-组选复式
        zhushu_pl3_erxing_zuxuan_hefs : function () {
            var tempArr = [], zuxArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                zuxArr.push($.trim($(this).html()));
            });

            var xLength = zuxArr.length;
            if (xLength < 2) {
                return 0;
            }

            for(var i = 0; i < zuxArr.length; i++){
                for(var i1 = 0; i1 < zuxArr.length; i1++){
                    if(zuxArr[i] != zuxArr[i1]){
                        var xArr =[];
                        xArr.push(zuxArr[i]);
                        xArr.push(zuxArr[i1]);
                        xArr.sort();
                        tempArr.push(xArr.join(""));
                    }
                }
            }
            tempArr = _this.uniqueArr(tempArr);
            return tempArr.length;
        },

        /**
         * 前二组选-组选复式
         */
        content_pl3_erxing_zuxuan_hefs : function (){
        var zuxArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                zuxArr.push($.trim($(this).html()));
            });
            return zuxArr.join(",");
        },

        /**
         * 随机算法-前二组选复式
         */
        random_pl3_erxing_zuxuan_hefs : function () {
            var random_1 = 0;
            var random_2 = 0;
            while (random_1 ==random_2){
                random_1 = parseInt(Math.random() * 10);
                random_2 = parseInt(Math.random() * 10);
            }
            // console.log(random_1+","+random_2);
            $("a.n-btn.kuadu").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $("a.n-btn.kuadu").eq(random_2).addClass("mui-active");

        },


        /*================================前二组选和值===============================*/
        /**
         * 注数-组选和值
         */
        zhushu_q2zuxhz : function (){
            var tempArr = [];
            var hzArr = [], temp = [];
            var sumTemp = 0, num = 0;
            $.each($("a.n-btn.hezhi.mui-active"), function () {
                hzArr.push($.trim($(this).html()));
            });

            var hzLength = hzArr.length;
            if (hzLength <= 0) {
                return 0;
            }

            for (var n = 0; n < hzArr.length; n++) {
                sumTemp = parseInt(hzArr[n]);
                num = parseInt(hzArr[n]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                for (var i = 0; i < temp.length; i++) {
                    for (var i1 = 0; i1 < temp.length; i1++) {
                        if (temp[i] + temp[i1] == num && temp[i] <= 9 && temp[i1] <= 9) {
                            if (temp[i] != temp[i1]) {
                                var arr1 = [];
                                arr1.push(temp[i]);
                                arr1.push(temp[i1]);
                                arr1.sort();
                                tempArr.push(arr1.join(""));
                            }
                        }
                    }
                }
            }
            if (tempArr.length <= 0) {
                return 0;
            }
            tempArr = _this.uniqueArr(tempArr);
            return tempArr.length;
        },

        /**
         * 前二组选-组选和值
         */
        content_q2zuxhz : function (){
            var hzArr = [];
            $.each($("a.n-btn.hezhi.mui-active"), function () {
                hzArr.push($.trim($(this).html()));
            });
            return hzArr.join("|");
        },

        /**
         * 随机算法-前二组选和值
         */
        random_q2zuxhz : function () {
            var random_1 = (parseInt(Math.random() * 17) + 1);
            // console.log(random_1);
            $("a.n-btn.hezhi").removeClass("mui-active").eq(random_1-1).addClass("mui-active");
        },


        /*================================前二组选包胆===============================*/
        //注数-组选包胆
        zhushu_q2zuxbd : function () {
            var tempArr = [];
            var bdArr = [], nowTemp = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                nowTemp.push($.trim($(this).html()));
            });

            if (typeof valArr != "undefined") {
                bdArr = valArr;
            } else {
                bdArr = nowTemp;
            }
            var bdLength = bdArr.length;
            if (bdLength <= 0) {
                return 0;
            }
            for (var n = 0; n < bdArr.length; n++) {
                for (var i = 0; i < 10; i++) {
                    if (i != bdArr[n]) {
                        tempArr.push(i + "" + bdArr[n]);
                    }
                }
            }
            return tempArr.length;
        },

        /**
         * 前二组选-组选包胆
         */
        content_q2zuxbd : function (){
            var dmArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function () {
                dmArr.push($.trim($(this).html()));
            });

            return dmArr.join(",");
        },

        /**
         * 随机算法-前二组选包胆
         */
        random_q2zuxbd : function () {
            var random_1 = parseInt(Math.random() * 10);
            $("a.n-btn.kuadu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        }

    });
});