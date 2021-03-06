define(['site/hall/ssc/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable(this.getSecondText(),"官方玩法-不定位",this.getSecondCode(),$("#budingwei"),"ssc_budingwei");
            this._super();
        },

        getSecondText:function () {
            return $("div#budingwei a.main.mui-active span").text()==""?"前三一码":$("div#budingwei a.main.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="ssc_budingwei"?"ssc_budingwei_q3ym":$("#gfwfBetCode").val();
        },

        /***************不定位**************/
        /**
         * 不定位-前三一码
         */
        content_q3ym :function(){
            var budwArr = [];
            $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                budwArr.push($.trim($(this).html()));
            });

            return budwArr.join(",");
        },
        //注数-前三一码
        zhushu_q3ym :function() {
            var budwArr = [];
            $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                budwArr.push($.trim($(this).html()));
            });
            return budwArr.length;
        },
        /**
         * 随机算法-前三一码
         */

        random_q3ym :function () {
            var random_1 = parseInt(Math.random() * 10);
            $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },
        /**
         * 不定位-前三二码
         */
        content_q3em :function (){
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-前三二码
        zhushu_q3em :function () {
            var budwArr = [];
            $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                budwArr.push($.trim($(this).html()));
            });

            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    if (i != j) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }
            newArr = this.uniqueArr(newArr);
            return newArr.length;
        },
        /**
         * 随机算法-前三二码
         */

        random_q3em :function () {
        var arrTemp = [];
        while(arrTemp.length < 2){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            if(random_1 != random_2){
                arrTemp.push(random_1);
                arrTemp.push(random_2);
            }
        }

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(" a.n-btn").eq(random_2).addClass("mui-active");
    },
        /*************后三一码*************/
        /**
         * 不定位-后三一码
         */
         content_h3ym:function(){
        var budwArr = [];
        $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-后三一码
        zhushu_h3ym:function () {
        var budwArr = [];
        $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });
        return budwArr.length;
    },
        /**
         * 随机算法-后三一码
         */

        random_h3ym:function () {
        var random_1 = parseInt(Math.random() * 10);

        $("a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
    },
        /*************后三二码*************/

        /**
        * 不定位-后三二码
        */
        content_h3em:function (){
            var budwArr = [];
            $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                budwArr.push($.trim($(this).html()));
            });

            return budwArr.join(",");
        },
        //注数-后三二码
        zhushu_h3em:function () {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });
        var newArr = [];
        for (var i = 0; i < budwArr.length; i++) {
            for (var j = 0; j < budwArr.length; j++) {
                if (i != j) {
                    var arr = [];
                    arr.push(budwArr[i]);
                    arr.push(budwArr[j]);
                    arr.sort();
                    newArr.push(arr.join(","));
                }
            }
        }
            newArr = this.uniqueArr(newArr);
        return newArr.length;
    },
        /**
         * 随机算法-后三二码
         */

         random_h3em:function() {
        var arrTemp = [];
        while(arrTemp.length < 2){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            if(random_1 != random_2){
                arrTemp.push(random_1);
                arrTemp.push(random_2);
            }
        }

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(" a.n-btn").eq(random_2).addClass("mui-active");
    },
        /*************前四一码*************/
        /**
         * 不定位-前四一码
         */
        content_q4ym:function (){
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-前四一码
         zhushu_q4ym:function() {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });
        return budwArr.length;
    },
        /**
         * 随机算法-前四一码
         */

        random_q4ym:function () {
        var random_1 = parseInt(Math.random() * 10);

        $("a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
    },
        /*************前四二码*************/
        /**
         * 不定位-前四二码
         */
        content_q4em:function (){
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-前四二码
        zhushu_q4em:function () {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });

        var newArr = [];
        for (var i = 0; i < budwArr.length; i++) {
            for (var j = 0; j < budwArr.length; j++) {
                if (i != j) {
                    var arr = [];
                    arr.push(budwArr[i]);
                    arr.push(budwArr[j]);
                    arr.sort();
                    newArr.push(arr.join(","));
                }
            }
        }

            newArr = this.uniqueArr(newArr);
        return newArr.length;
    },
        /**
         * 随机算法-前四二码
         */

        random_q4em:function () {
        var arrTemp = [];
        while(arrTemp.length < 2){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            if(random_1 != random_2){
                arrTemp.push(random_1);
                arrTemp.push(random_2);
            }
        }

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(" a.n-btn").eq(random_2).addClass("mui-active");
    },

    /*************后四一码*************/
        /**
         * 不定位-后四一码
         */
         content_h4ym:function(){
        var budwArr = [];
        $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-后四一码
        zhushu_h4ym:function () {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });
        return budwArr.length;
    },
        /**
         * 随机算法-后四一码
         */

         random_h4ym:function() {
        var random_1 = parseInt(Math.random() * 10);

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
    },

        /*************后四二码*************/
        /**
         * 不定位-后四二码
         */
        content_h4em:function (){
        var budwArr = [];
        $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-后四二码
        zhushu_h4em:function () {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });
        var newArr = [];
        for (var i = 0; i < budwArr.length; i++) {
            for (var j = 0; j < budwArr.length; j++) {
                if (i != j) {
                    var arr = [];
                    arr.push(budwArr[i]);
                    arr.push(budwArr[j]);
                    arr.sort();
                    newArr.push(arr.join(","));
                }
            }
        }

         newArr = this.uniqueArr(newArr);
        return newArr.length;
    },
        /**
         * 随机算法-后四二码
         */

         random_h4em:function() {
        var arrTemp = [];
        while(arrTemp.length < 2){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            if(random_1 != random_2){
                arrTemp.push(random_1);
                arrTemp.push(random_2);
            }
        }

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(" a.n-btn").eq(random_2).addClass("mui-active");
    },


        /*************五星二码*************/
        /**
         * 不定位-五星二码
         */
        content_wxem:function (){
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-五星二码
         zhushu_wxem:function() {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });

        var newArr = [];
        for (var i = 0; i < budwArr.length; i++) {
            for (var j = 0; j < budwArr.length; j++) {
                if (i != j) {
                    var arr = [];
                    arr.push(budwArr[i]);
                    arr.push(budwArr[j]);
                    arr.sort();
                    newArr.push(arr.join(","));
                }
            }
        }
        newArr = this.uniqueArr(newArr);
        return newArr.length;
    },

        /**
         * 随机算法-五星二码
         */

         random_wxem:function() {
        var arrTemp = [];
        while(arrTemp.length < 2){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            if(random_1 != random_2){
                arrTemp.push(random_1);
                arrTemp.push(random_2);
            }
        }

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(" a.n-btn").eq(random_2).addClass("mui-active");
    },


    /*************五星三码*************/

        /**
         * 不定位-五星三码
         */
         content_wx3m:function(){
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            budwArr.push($.trim($(this).html()));
        });

        return budwArr.join(",");
    },
        //注数-五星三码
         zhushu_wx3m:function() {
        var budwArr = [];
        $.each($(" .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
            budwArr.push($.trim($(this).html()));
        });

        var newArr = [];
        for (var i = 0; i < budwArr.length; i++) {
            for (var j = 0; j < budwArr.length; j++) {
                for (var x = 0; x < budwArr.length; x++) {
                    if (i != j && j != x && i != x) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.push(budwArr[x]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }
        }

        newArr = this.uniqueArr(newArr);
        return newArr.length;
    },

        /**
         * 随机算法-五星三码
         */

         random_wx3m:function() {
        var arrTemp = [];
        while(arrTemp.length < 3){
            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);
            if(random_1 != random_2 && random_2 != random_3 && random_3 != random_1){
                arrTemp.push(random_1);
                arrTemp.push(random_2);
                arrTemp.push(random_3);
            }
        }

        $(" a.n-btn").removeClass("mui-active").eq(random_1).addClass("mui-active");
        $(" a.n-btn").eq(random_2).addClass("mui-active");
        $(" a.n-btn").eq(random_3).addClass("mui-active");
    }

});
});
