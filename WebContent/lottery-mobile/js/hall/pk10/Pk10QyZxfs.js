define(['site/hall/pk10/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,

        init: function () {
            _this = this;
            this.showTable("前一","官方玩法-前一","zxfs","","");
            this._super();
        },

        /************************************************PK10**********************************************/
        /**
         * PK10-前一
         */
        content_qy:function (){
        var arr1 = [], newArr = [];
        $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr1.push($.trim($(this).html()));
        });

        if (arr1.length <= 0) {
            return 0;
        }

        if (arr1.length > 0) {
            newArr = newArr.concat(arr1);
        }

        return newArr.join(',');
    },

        /**
         * 注数-PK10前一
         */

        zhushu_qy:function (){
        var arr1 = [], newArr = [];
        $.each($(".screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
            arr1.push($.trim($(this).html()));
        });


        if (arr1.length <= 0) {
            return 0;
        }

        if (arr1.length > 0) {
            newArr = newArr.concat(arr1);
        }

        return newArr.length;
    },
        /**
         * 随机算法-pk10前一
         */
        random_qy:function () {
        var random_1 = parseInt(Math.random() * 10)+1;

        $("a.n-btn").eq(random_1-1).removeClass("mui-active").addClass("mui-active");
    }




});
});
/**
 * Created by diego on 17-10-17.
 */
