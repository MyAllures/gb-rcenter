define(['site/hall/pk10/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();

        },
        showTable : function(){
            //前一
            $("div.s-menu.second").hide();
            $("#zxfs").show();
            $("a[data-code='zxfs']").addClass("mui-active");
            // $(".x_3.gfwf-playName").text("直选复式");
            $("span.x_1.gfwf-tit").text("前三");
            $(".s-title.title1 span").text("前三");
            // $(".s-title.title2 span").text("直选复式")

            $("a[data-code='"+$("#gfwfBetCode").val()+"']").addClass("mui-active");
            $("span.x_1.gfwf-tit").text("前三");
            $(".s-title.title1 span").text("前三");
            $("a[data-code='zxfs']").addClass("mui-active");
            $("#toobarTitle").text("官方玩法-前三");
            $(".x_3.gfwf-playName").text("直选复式");
            $(".s-title.title2 span").text("直选复式")
            $("a[data-code='zxfs'] span").text("直选复式");
        },

        /************************************************PK10**********************************************/
        /**
         * PK10-前三
         */
        content_qsan:function (){
            var arr1 = [], arr2 = [], arr3 = [];
            $.each($(".guanjunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                arr1.push($.trim($(this).html()));
            });

            $.each($(".yajunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                arr2.push($.trim($(this).html()));
            });

            $.each($(".jijunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                arr3.push($.trim($(this).html()));
            });

            if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0) {
                return 0;
            }

            var strContent1 = arr1.length > 0 ? arr1.join(",") : "";
            var strContent2 = arr2.length > 0 ? arr2.join(",") : "";
            var strContent3 = arr3.length > 0 ? arr3.join(",") : "";

            return $.trim(
                strContent1 + "|" + strContent2 + "|" + strContent3
            );
    }
    ,

        /**
         * 注数-PK10前三
         */
        zhushu_qsan:function (){
            var arr1 = [], arr2 = [], arr3 = [], newArr = [];
            $.each($(".guanjunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                arr1.push($.trim($(this).html()));
            });
            $.each($(".yajunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                arr2.push($.trim($(this).html()));
            });
            $.each($(".jijunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                arr3.push($.trim($(this).html()));
            });

            if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0) {
                return 0;
            }

            for(var i = 0; i < arr1.length; i++){
                for(var j = 0; j < arr2.length; j++){
                    for(var m = 0; m < arr3.length; m++) {
                        if (arr1[i] != arr2[j] && arr1[i] != arr3[m] && arr2[j] != arr3[m]) {
                            newArr.push(arr1[i] + ',' + arr2[j] + ',' + arr3[m]);
                        }
                    }
                }
            }

            return newArr.length;
    },
        /**
         * 随机算法-pk10前三
         */
        random_qsan:function () {
        var arrTemp = [];
        var random_1 = 0;
        var random_2 = 0;
        var random_3 = 0;

        while (arrTemp.length <= 1) {
            random_1 = parseInt(Math.random() * 10)+1;
            random_2 = parseInt(Math.random() * 10)+1;
            random_3 = parseInt(Math.random() * 10)+1;

            if(random_1 != random_2 && random_1 != random_3 && random_3 != random_2){
                arrTemp.push(random_1 + ',' + random_2 + ',' + random_3);
            }
        }

        $(".guanjunStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
        $(".yajunStr a.n-btn").eq(random_2-1).removeClass("mui-active").addClass("mui-active");
        $(".jijunStr a.n-btn").eq(random_3-1).removeClass("mui-active").addClass("mui-active");
    }




});
});
/**
 * Created by diego on 17-10-17.
 */
