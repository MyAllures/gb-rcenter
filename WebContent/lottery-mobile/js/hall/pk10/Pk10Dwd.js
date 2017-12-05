define(['site/hall/pk10/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable("定位胆","官方玩法-定位胆","zxfs","","");
            this._super();
        },

        /************************************************PK10**********************************************/
        /**
         * PK10-定位胆
         */
        content_dwd_pk10:function (){
        var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = [], arr10 = [];
        $.each($(".guanjunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr1.push($.trim($(this).html()));
        });

        $.each($(".yajunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr2.push($.trim($(this).html()));
        });

        $.each($(".jijunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr3.push($.trim($(this).html()));
        });

        $.each($(".disiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr4.push($.trim($(this).html()));
        });

        $.each($(".diwuStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr5.push($.trim($(this).html()));
        });

        $.each($(".diliuStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr6.push($.trim($(this).html()));
        });

        $.each($(".diqiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr7.push($.trim($(this).html()));
        });

        $.each($(".dibaStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr8.push($.trim($(this).html()));
        });

        $.each($(".dijiuStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr9.push($.trim($(this).html()));
        });

        $.each($(".dishiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr10.push($.trim($(this).html()));
        });


        if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0 && arr4.length <= 0 && arr5.length <= 0 && arr6.length <= 0 && arr7.length <= 0 && arr8.length <= 0 && arr9.length <= 0 && arr10.length <= 0) {
            return 0;
        }

        var strContent1 = arr1.length > 0 ? arr1.join(",") : "";
        var strContent2 = arr2.length > 0 ? arr2.join(",") : "";
        var strContent3 = arr3.length > 0 ? arr3.join(",") : "";
        var strContent4 = arr4.length > 0 ? arr4.join(",") : "";
        var strContent5 = arr5.length > 0 ? arr5.join(",") : "";
        var strContent6 = arr6.length > 0 ? arr6.join(",") : "";
        var strContent7 = arr7.length > 0 ? arr7.join(",") : "";
        var strContent8 = arr8.length > 0 ? arr8.join(",") : "";
        var strContent9 = arr9.length > 0 ? arr9.join(",") : "";
        var strContent10 = arr10.length > 0 ? arr10.join(",") : "";

        return $.trim(
            strContent1 + "|" + strContent2 + "|" + strContent3 + "|" +
            strContent4 + "|" + strContent5 + "|" + strContent6 + "|" +
            strContent7 + "|" + strContent8 + "|" + strContent9 + "|" + strContent10
        );
    },

        /**
         * 注数-PK10定位胆
         */
        zhushu_dwd_pk10:function (){
        var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = [], arr10 = [];
        var newArr = [];
        $.each($(".guanjunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr1.push($.trim($(this).html()));
        });
        $.each($(".yajunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr2.push($.trim($(this).html()));
        });
        $.each($(".jijunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr3.push($.trim($(this).html()));
        });
        $.each($(".disiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr4.push($.trim($(this).html()));
        });
        $.each($(".diwuStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr5.push($.trim($(this).html()));
        });
        $.each($(".diliuStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr6.push($.trim($(this).html()));
        });
        $.each($(".diqiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr7.push($.trim($(this).html()));
        });
        $.each($(".dibaStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr8.push($.trim($(this).html()));
        });
        $.each($(".dijiuStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr9.push($.trim($(this).html()));
        });
        $.each($(".dishiStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr10.push($.trim($(this).html()));
        });


        if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0 && arr4.length <= 0 && arr5.length <= 0 &&
            arr6.length <= 0 && arr7.length <= 0 && arr8.length <= 0 && arr9.length <= 0 && arr10.length <= 0) {
            return 0;
        }

        if (arr1.length > 0) {
            newArr = newArr.concat(arr1);
        }
        if (arr2.length > 0) {
            newArr = newArr.concat(arr2);
        }
        if (arr3.length > 0) {
            newArr = newArr.concat(arr3);
        }
        if (arr4.length > 0) {
            newArr = newArr.concat(arr4);
        }
        if (arr5.length > 0) {
            newArr = newArr.concat(arr5);
        }
        if (arr6.length > 0) {
            newArr = newArr.concat(arr6);
        }
        if (arr7.length > 0) {
            newArr = newArr.concat(arr7);
        }
        if (arr8.length > 0) {
            newArr = newArr.concat(arr8);
        }
        if (arr9.length > 0) {
            newArr = newArr.concat(arr9);
        }
        if (arr10.length > 0) {
            newArr = newArr.concat(arr10);
        }
        return newArr.length;
    }
    ,
        /**
         * 随机算法-定位胆
         */
        random_dwd_pk10:function () {
            var random_1 = parseInt(Math.random() * 10)+1;
            var wei = parseInt(Math.random() * 10);
            if(wei == 0){
                $(".guanjunStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 1){
                $(".yajunStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 2){
                $(".jijunStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 3){
                $(".disiStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 4){
                $(".diwuStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 5){
                $(".diliuStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 6){
                $(".diqiStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 7){
                $(".dibaStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 8){
                $(".dijiuStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            } else if(wei == 9){
                $(".dishiStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
            }
        },



    });
});
/**
 * Created by diego on 17-10-17.
 */
