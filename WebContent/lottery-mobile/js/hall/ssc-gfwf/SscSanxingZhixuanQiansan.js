define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
            // this.showTable();
            // this.getJspName();
        },


        // getJspName : function () {
        //     var betCode=$("#gfwfBetCode").val();
        //     if(betCode=="ssc_sanxing_qs"){
        //         return "SscQiansan";
        //     }else{
        //         return "";
        //     }
        // },

        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            $("a[data-code='ssc_sanxing_qs']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#qiansan").show();
            $("span.x_1.gfwf-tit").text("前三");
            $(".s-title.title1 span").text("前三");
            $(".s-title.title2 span").text("直选复式")
            if(betCode =="ssc_sanxing_qs"){
                $("a[data-code='ssc_sanxing_zhixuan_qsfs']").addClass("mui-active");
                $(".x_3.gfwf-playName").text("直选复式");
            }else{
                $("#qiansan a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }
            if(betCode =="ssc_sanxing_zhixuan_qsfs"){
                $(".x_3.gfwf-playName").text("直选复式")
                $(".s-title.title2 span").text("直选复式");
            }
            if(betCode =="ssc_sanxing_zhixuan_qshz"){
                $(".x_3.gfwf-playName").text("直选和值")
                $(".s-title.title2 span").text("直选和值");
            }
            if(betCode =="ssc_sanxing_zhixuan_qskd"){
                $(".x_3.gfwf-playName").text("直选跨度")
                $(".s-title.title2 span").text("直选跨度");
            }
            if(betCode =="ssc_sanxing_zhixuan_qszh"){
                $(".x_3.gfwf-playName").text("前三组合")
                $(".s-title.title2 span").text("前三组合");
            }
            if(betCode =="ssc_sanxing_zuxuan_qsz3fs"){
                $(".x_3.gfwf-playName").text("组三复式")
                $(".s-title.title2 span").text("组三复式");
            }
            if(betCode =="ssc_sanxing_zhixuan_qsfs"){
                $(".x_3.gfwf-playName").text("直选复式")
                $(".s-title.title2 span").text("直选复式");
            }
            if(betCode =="ssc_sanxing_zuxuan_qsz6fs"){
                $(".x_3.gfwf-playName").text("组六复式")
                $(".s-title.title2 span").text("组六复式");
            }
            if(betCode =="ssc_sanxing_zuxuan_qszxhz"){
                $(".x_3.gfwf-playName").text("组选和值")
                $(".s-title.title2 span").text("组选和值");
            }
            if(betCode =="ssc_sanxing_zuxuan_qszxbd"){
                $(".x_3.gfwf-playName").text("组选包胆")
                $(".s-title.title2 span").text("组选包胆");
            }
            if(betCode =="ssc_sanxing_zuxuan_qshzws"){
                $(".x_3.gfwf-playName").text("和值尾数")
                $(".s-title.title2 span").text("和值尾数");
            }
            if(betCode =="ssc_sanxing_zuxuan_qsts"){
                $(".x_3.gfwf-playName").text("特殊号")
                $(".s-title.title2 span").text("特殊号");
            }
        },

        /*================================前3直选复式===============================*/
        /**
         * 注数-前3直选复式
         */
        zhushu_q3zxfs:function () {
            var newArr = [];
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

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
                return 0;
            }
            newArr = _this.getThreeNewArrs(wanArr, qianArr, baiArr);
            return newArr.length;
        },


        // 获取百、十、个固定位数的个数所组成3位所有组合
        getThreeNewArrs :function (baiA, shiA, geA) {
            var bArr = [], sArr = [], gArr = [];
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                    }
                }
            }
            return tempArr;
        },


        /**
         * 前三直选复式
         */
        content_q3zxfs:function () {
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

            if(wanArr.length <= 0|| qianArr.length <= 0|| baiArr.length <= 0){
                return;
            }

            return _this.gfwf_3xfs(
                wanArr,
                qianArr,
                baiArr
            );
        },

        gfwf_3xfs:function (baiArr,shiArr,geArr) {
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
         * 随机算法-前三直选复式
         */
        random_q3zxfs:function () {
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);

            $(".wanweisStr  a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $(".qianweisStr  a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
            $(".baiweisStr   a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
        },




        /*========================================前3直选和值===============================================*/

        /**
         * 注数-直选和值
         */
        zhushu_q3zxhz :function () {
            var heZhiArr = [], newArr = [];
            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                heZhiArr.push($.trim($(this).html()));
            });

            var heZhiLength = heZhiArr.length;
            if (heZhiLength <= 0) {
                return 0;
            }

            newArr = _this.getHezNewArrs(heZhiArr);
            return newArr.length;
        },



        /**
         * 前三直选-和值
         */
        content_q3zxhz :function () {
            var heZhiArr = [];
            var zhushu = 0;
            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                heZhiArr.push($.trim($(this).html()));
            });

            return heZhiArr.join("|");
        },


        // 后三直选--获取所选号码分散为三位所有组合的和值
        getHezNewArrs : function (hZArr) {
            var heZhiArr = [], shuArr = [], tempArr = [];
            var sumTemp = 0;
            var num = 0; //当前号码
            var fjHaoZuhe = []; //分解号组合

            heZhiArr = hZArr;

            //号码分解---所选号分解成所有组合的值等于此号的所有组合
            for (var i = 0; i < heZhiArr.length; i++) {
                var temp = [];
                sumTemp = parseInt(heZhiArr[i]);
                num = parseInt(heZhiArr[i]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                //所选号码分解至零，被分解出所有的号码三个为一组，所组成的所有组合的每一组值等于所选号的值的组合数
                for (var n = 0; n < temp.length; n++) {
                    for(var m = 0; m < temp.length; m++){
                        for(var mn = 0; mn < temp.length; mn++){
                            if(temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9){
                                fjHaoZuhe.push(temp[n] + "" + temp[m] + "" + temp[mn]);
                            }
                        }
                    }
                }
                tempArr = this.uniqueArr(fjHaoZuhe);
            }
            return tempArr;
        },
        /**
         * 随机算法-前三直选和值
         */
        random_q3zxhz :function () {
        var random_1 = parseInt(Math.random() * 28);
            $("a.n-btn.hz").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },


        /*========================================后3直选跨度===============================================*/

        /**
         * 随机算法-前三直选跨度
         */
        random_q3zxkd :function () {
            var random_1 = parseInt(Math.random() * 10);
            $("a.n-btn.kuadu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },


        /**
         * 前三直选-跨度
         */
        content_q3zxkd: function () {
            var kaDuArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                kaDuArr.push($.trim($(this).html()));
            });

            return kaDuArr.join(",");
        },

        /**
         * 注数-直选跨度
         */
        zhushu_q3zxkd : function () {
            var newArr = [];
            var kaDuArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                kaDuArr.push($.trim($(this).html()));
            });
            if (kaDuArr.length <= 0) {
                return 0;
            }
            newArr = _this.getKaduNewArrs(kaDuArr);
            return newArr.length;
        },


        // 前三和后三直选-跨度所选跨度值所有组合
        getKaduNewArrs :function (kDArr) {
            var kaDuArr = [], tempArr1 = [], tempArr2 = [], tempArr3 = [];
            var allArr = [];
            for (var t = 0; t < 10; t++) {
                tempArr1[t] = t;
                tempArr2[t] = t;
                tempArr3[t] = t;
            }
            var maxZhi = 0, minZhi = 0, tempZhi = 0;
            kaDuArr = kDArr;
            for (var i = 0; i < kaDuArr.length; i++) {
                tempZhi = parseInt(kaDuArr[i]);
                for (var n = 0; n < tempArr1.length; n++) {
                    for (var n1 = 0; n1 < tempArr2.length; n1++) {
                        for (var n2 = 0; n2 < tempArr3.length; n2++) {
                            maxZhi = tempArr1[n] > tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                            maxZhi= maxZhi > tempArr3[n2] ? maxZhi :tempArr3[n2];
                            minZhi = tempArr1[n] < tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                            minZhi= minZhi < tempArr3[n2] ? minZhi :tempArr3[n2];
                            if ((maxZhi - minZhi) == tempZhi) {
                                allArr.push(n + "" + n1 + "" + n2);
                                maxZhi = 0;
                                minZhi = 0;
                            }
                        }
                    }
                }
            }
            return allArr;
        },


        /*===============================后3组合==============================*/

        /**
         * 注数-前3组合
         */
        zhushu_q3zh : function () {
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
                return;
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


        /*===============================组三复式=================================*/
        /**
         * 注数-组三复式
         */
        zhushu_q3z3fs :function (){
            var fuShiArr = [], newArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                fuShiArr.push($.trim($(this).html()));
            });

            var heZhiLength = fuShiArr.length;
            if (heZhiLength <= 1) {
                return 0;
            }
            newArr = _this.getZuXuanNewArrs(fuShiArr);
            return newArr.length;
        },


        // 后三组选-组三复式
        getZuXuanNewArrs :function (zuXuanArr) {
            var tempArr = [],zxArr = [];
            zxArr = zuXuanArr;

            for(var i = 0; i < zxArr.length - 1; i++){
                for(var i1 = 1; i1 < zxArr.length; i1++){
                    if(zxArr[i1] != zxArr[i]){
                        tempArr.push(zxArr[i] + "" + zxArr[i1] + "" + zxArr[i1]);
                        tempArr.push(zxArr[i1] + "" + zxArr[i] + "" + zxArr[i]);
                    }
                }
            }
            tempArr = _this.uniqueArr(tempArr);
            return tempArr;
        },

        /**
         * 前三组选-组三复式
         */
        content_q3z3fs : function () {
            var zuSanArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                zuSanArr.push($.trim($(this).html()));
            });

            return zuSanArr.join(",");
        },

        /**
         * 随机算法-后三组三复式
         */
        random_h3z3fs : function () {
            var arrTemp = [];
            while(arrTemp.length < 2){
                var x1 = parseInt(Math.random() * 10);
                var x2 = parseInt(Math.random() * 10);
                if(x1 != x2){
                    arrTemp.push(x1);
                    arrTemp.push(x2);
                }
            }
            $("a.n-btn.kuadu").removeClass("mui-active").eq(arrTemp[0]).addClass("mui-active");
            $("a.n-btn.kuadu").eq(arrTemp[1]).addClass("mui-active");
        },

        /**
         * 随机算法-前三组三复式
         */
        random_q3z3fs : function () {
            var arrTemp = [];
            while(arrTemp.length < 3){
                var x1 = parseInt(Math.random() * 10);
                var x2 = parseInt(Math.random() * 10);
                if(x1 != x2){
                    arrTemp.push(x1);
                    arrTemp.push(x2);
                }
            }
            $("a.n-btn.kuadu").removeClass("mui-active").eq(arrTemp[0]).addClass("mui-active");
            $("a.n-btn.kuadu").eq(arrTemp[1]).addClass("mui-active");
        },


        /*=================================组6复式=====================================*/
        /**
         * 注数-组六复式
         */
        zhushu_q3z6fs : function (){
            var fuShiArr = [], newArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                fuShiArr.push($.trim($(this).html()));
            });
            var zlLength = fuShiArr.length;
            if (zlLength < 3) {
                return 0;
            }
            newArr = _this.getZuLiuNewArrs(fuShiArr);
            return newArr.length;
        },

        // 后三组选-组六复式
        getZuLiuNewArrs : function (zuXuanArr) {
            var tempArr = [], zxArr = [];
            zxArr = zuXuanArr;
            for (var i = 0; i < zxArr.length; i++) {
                for (var i1 = 0; i1 < zxArr.length; i1++) {
                    for (var i2 = 0; i2 < zxArr.length; i2++) {
                        if (zxArr[i] != zxArr[i1] && zxArr[i1] != zxArr[i2] && zxArr[i] != zxArr[i2]) {
                            var sortArr = [];
                            sortArr.push(zxArr[i]);
                            sortArr.push(zxArr[i1]);
                            sortArr.push(zxArr[i2]);
                            sortArr.sort();
                            tempArr.push(sortArr.join(""));
                        }
                    }
                }
            }
            tempArr = _this.uniqueArr(tempArr);
            return tempArr;
        },

        /**
         * 前三组选-组六复式
         */
        content_q3z6fs : function (){
            var zuLiuArr = [];

            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                zuLiuArr.push($.trim($(this).html()));
            });
            return zuLiuArr.join(",");
        },


        /**
         * 随机算法-前三组6复式
         */
        random_q3z6fs : function () {
            var arrTemp = [];
            while(arrTemp.length < 3){
                var x1 = parseInt(Math.random() * 10);
                var x2 = parseInt(Math.random() * 10);
                var x3 = parseInt(Math.random() * 10);
                if(x1 != x2 && x2 != x3 && x1 != x3){
                    arrTemp.push(x1);
                    arrTemp.push(x2);
                    arrTemp.push(x3);
                }
            }
            $("a.n-btn.kuadu").removeClass("mui-active").eq(arrTemp[0]).addClass("mui-active");
            $("a.n-btn.kuadu").eq(arrTemp[1]).addClass("mui-active");
            $("a.n-btn.kuadu").eq(arrTemp[2]).addClass("mui-active");
        },


        /*===================================后3组选和值=======================*/

        /**
         * 注数-组选和值
         */
        zhushu_q3zuxhz : function (){
            var fuShiArr = [], newArr = [];
            $.each($("a.n-btn.hezhi.mui-active"), function (index, value) {
                fuShiArr.push($.trim($(this).html()));
            });

            var zlLength = fuShiArr.length;
            if (zlLength <= 0) {
                return 0;
            }
            newArr = _this.getZxhzNewArrs(fuShiArr);
            return newArr.length;
        },

        // 后三组选-组选和值
        getZxhzNewArrs :function (zuXuanArr) {
            var heZhiArr = [], tempArr = [];
            var sumTemp = 0;
            var num = 0; //当前号码
            var fjHaoZuhe = []; //分解号组合

            heZhiArr = zuXuanArr;
            //号码分解---所选号分解成所有组合的值等于此号的所有组合
            for (var i = 0; i < heZhiArr.length; i++) {
                var temp = [];
                sumTemp = parseInt(heZhiArr[i]);
                num = parseInt(heZhiArr[i]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                //获取所选号的组选三和组选六形态的所有组数（不包含豹子号、顺序不限）
                for (var n = 0; n < temp.length; n++) {
                    for(var m = 0; m < temp.length; m++){
                        for(var mn = 0; mn < temp.length; mn++){
                            if(temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9){
                                if(temp[m] != temp[n] && temp[n] != temp[mn] && temp[mn] != temp[n]){
                                    var sortArr = [];
                                    sortArr.push(temp[n]);
                                    sortArr.push(temp[m]);
                                    sortArr.push(temp[mn]);
                                    sortArr.sort();
                                    fjHaoZuhe.push(sortArr.join(""));

                                }
                            }
                        }
                    }
                }

            }
            tempArr = _this.uniqueArr(fjHaoZuhe);
            return tempArr;
        },

        /**
         * 前三组选-和值
         */
        content_q3zuxhz : function () {
            var heZhiArr = [];
            var zhushu = 0;
            $.each($("a.n-btn.hezhi.mui-active"), function (index, value) {
                heZhiArr.push($.trim($(this).html()));
            });

            return heZhiArr.join("|");
        },

        /**
         * 随机算法-前三组选和值
         */
        random_q3zuxhz : function () {
        var random_1 = (parseInt(Math.random() * 26) + 1);
            $("a.n-btn.hezhi").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },


        /*===================================组选包胆=================================*/
        /**
         * 注数-组选包胆
         */
        zhushu_q3zuxbd : function (){
            var baoDanArr = [], newArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                baoDanArr.push($.trim($(this).html()));
            });
            var zlLength = baoDanArr.length;
            if (zlLength < 0) {
                return 0;
            }
            newArr = _this.getZxbdNewArrs(baoDanArr);
            return newArr.length;
        },


        // 后三组选-组选包胆
        getZxbdNewArrs :function (zuXuanArr) {
            var tempArr = [], bdArr = [];
            bdArr = zuXuanArr;
            for(var n = 0; n < bdArr.length; n++) {
                for(var n1 = 0; n1 < 10; n1++){
                    for(var n2 = 0; n2 < 10; n2++){
                        if(bdArr[n] != n1 && bdArr != n2 && n1 != n2 || n1 == n2 && bdArr[n] != n2 || n2 == bdArr[n] && bdArr[n] != n1 || n1 == bdArr[n] && bdArr[n] != n2){
                            var sortArr = [];
                            sortArr.push(bdArr[n]);
                            sortArr.push(n1);
                            sortArr.push(n2);
                            sortArr.sort();
                            tempArr.push(sortArr.join(""));
                        }
                    }
                }
            }

            tempArr =_this.uniqueArr(tempArr);
            return tempArr;
        },

        /**
         * 前三组选-组选包胆
         */
        content_q3zuxbd : function (){
            var bdArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                bdArr.push($.trim($(this).html()));
            });

            return bdArr.join(",");
         },

        /**
         * 随机算法-前三组选包胆
         */
        random_q3zuxbd : function () {
        var random_1 = parseInt(Math.random() * 10);
            $("a.n-btn.kuadu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },

        /*============================和值尾数===================================*/
        /**
         * 注数-和值尾数
         */
        zhushu_q3hzws : function () {
            var wsArr = [], newArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                wsArr.push($.trim($(this).html()));
            });
            var zlLength = wsArr.length;
            if (zlLength < 0) {
                return 0;
            }
            return zlLength;
        },


        /**
         * 前三组选-前三和值尾数
         */
        content_q3hzws : function (){
            var hzArr = [];
            $.each($("a.n-btn.kuadu.mui-active"), function (index, value) {
                hzArr.push($.trim($(this).html()));
            });

            return hzArr.join("|");
        },

        /**
         * 随机算法-前三和值尾数
         */
        random_q3hzws : function () {
            var random_1 = parseInt(Math.random() * 10);
            $("a.n-btn.kuadu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },

        /*=====================================特殊号========================================*/

        /**
         * 注数-特殊号
         */
        zhushu_q3tsh : function () {
            var tsArr = [];
            $.each($("a.n-btn.teshu.mui-active"), function (index, value) {
                tsArr.push($.trim($(this).html()));
            });
            var zlLength = tsArr.length;
            if (zlLength <= 0) {
                return 0;
            }
            return tsArr.length;
        },

        /**
         * 前三组选-特殊号
         */
        content_q3tsh : function (){
            var thArr = [];
            $.each($("a.n-btn.teshu.mui-active"), function (index, value) {
                thArr.push($.trim($(this).html()));
            });
            if (thArr.length <= 0) {
                alert("至少选择1注号码才能投注");
                return false;
            }
            return thArr.join("|");
        },

        /**
         * 随机算法-前三特殊号
         */
        random_q3tsh : function () {
            var random_1 = parseInt(Math.random() * 3);
            $("a.n-btn.teshu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        }
    });
});