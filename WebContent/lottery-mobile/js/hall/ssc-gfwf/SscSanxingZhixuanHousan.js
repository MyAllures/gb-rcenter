define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        /*================================后3直选复式===============================*/
        /**
         * 注数-后3直选复式
         */
        zhushu_h3zxfs : function () {
            var newArr = [];
            var baiArr = [], shiArr = [], geArr = [];
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;
            if (baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
                return 0;
            }
            newArr = _this.getThreeNewArrs(baiArr, shiArr, geArr);
            return newArr.length;
        },


        // 获取百、十、个固定位数的个数所组成3位所有组合
         getThreeNewArrs : function(baiA, shiA, geA) {
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
         * 后三直选复式
         */
         content_h3zxfs : function() {
            var baiArr = [], shiArr = [], geArr = [];
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            if(baiArr.length <= 0|| shiArr.length <= 0|| geArr.length <= 0){
                return;
            }

            return _this.gfwf_3xfs(
                baiArr,
                shiArr,
                geArr
            );
        },

        /**
         * 随机算法-后三直选复式
         */
         random_h3zxfs : function(){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);

            $(".baiweisStr  a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
            $(".shiweisStr  a.n-btn").removeClass("mui-active").eq(random_2).addClass("mui-active");
            $(".geweisStr   a.n-btn").removeClass("mui-active").eq(random_3).addClass("mui-active");
        },

        gfwf_3xfs : function(baiArr,shiArr,geArr) {
            var tmpStr_1 = baiArr.join(",");
            var tmpStr_2 = shiArr.join(",");
            var tmpStr_3 = geArr.join(",");

            return "{0}|{1}|{2}".format(
                tmpStr_1,
                tmpStr_2,
                tmpStr_3
            );
        },




        /*========================================后3直选和值===============================================*/

        /**
         * 注数-直选和值
         */
         zhushu_h3zxhz :function() {
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
         * 后三直选-和值
         */
         content_h3zxhz :function() {
            var heZhiArr = [];
            var zhushu = 0;
            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                heZhiArr.push($.trim($(this).html()));
            });

            return heZhiArr.join(",");
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
         * 随机算法-后三直选和值
         */
        random_h3zxhz : function () {
            var random_1 = parseInt(Math.random() * 28);
            $("a.n-btn.hz").removeClass("mui-active").eq(random_1).addClass("mui-active");
        }




    });
});