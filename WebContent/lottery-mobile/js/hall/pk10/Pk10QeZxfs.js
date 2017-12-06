define(['site/hall/pk10/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable("前二","官方玩法-前二","zxfs","","");
            this._super();
        },


    /************************************************PK10**********************************************/
    /**
     * PK10-前二
     */
    content_qe:function (){
        var arr1 = [], arr2 = [], strContent = '';
        $.each($(".guanjunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr1.push($.trim($(this).html()));
        });

        $.each($(".yajunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr2.push($.trim($(this).html()));
        });

        if (arr1.length <= 0 && arr2.length <= 0) {
            return 0;
        }

        var strContent1 = arr1.length > 0 ? arr1.join(",") : "";
        var strContent2 = arr2.length > 0 ? arr2.join(",") : "";

        return $.trim(
            strContent1 + "|" + strContent2
        );
    },

    /**
     * 注数-PK10前二
     */
    zhushu_qe:function (){
        var arr1 = [], arr2 = [], newArr = [];
        $.each($(".guanjunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr1.push($.trim($(this).html()));
        });
        $.each($(".yajunStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr2.push($.trim($(this).html()));
        });

        if (arr1.length <= 0 || arr2.length <= 0) {
            return 0;
        }

        for(var i = 0; i < arr1.length; i++){
            for(var j = 0; j < arr2.length; j++){
                if(arr1[i] != arr2[j]){
                    newArr.push(arr1[i] + ',' + arr2[j]);
                }
            }
        }

        return newArr.length;
    },
    /**
     * 随机算法-pk10前二
     */
    random_qe:function() {
        var arrTemp = [];
        var random_1 = 0;
        var random_2 = 0;

        while (arrTemp.length <= 1) {
            random_1 = parseInt(Math.random() * 10)+1;
            random_2 = parseInt(Math.random() * 10)+1;
            if(random_1 != random_2){
                arrTemp.push(random_1 + ',' + random_2);
            }
        }

        $(".guanjunStr a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
        $(".yajunStr a.n-btn").eq(random_2-1).removeClass("mui-active").addClass("mui-active");
    },


    checkBaodan : function (obj) {
        var len=parseInt(obj.text());
        var name=obj.attr("class").substring(6,10);
        if(name=="yjqe"){
            $("a.n-btn.gjqe."+len).removeClass("mui-active");
        }else{
            $("a.n-btn.yjqe."+len).removeClass("mui-active");
        }
    }




    });
});
/**
 * Created by diego on 17-10-17.
 */
