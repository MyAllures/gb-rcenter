define(['site/hall/pl3/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable("定位胆","官方玩法-定位胆","pl3_yixing_dwd",$("#DingWeiDan"),"");
            this._super();
        },

        //定位胆机选
        random_pl3_yixing_dwd : function () {
            var random = parseInt(Math.random() * 6);
            var wei = parseInt(Math.random() * 3);
           if(wei == 0){
                $("a.n-btn.bai").removeClass("mui-active");
                $("a.n-btn.bai."+random).addClass("mui-active");
            } else if(wei == 1){
                $("a.n-btn.shi").removeClass("mui-active");
                $("a.n-btn.shi."+random).addClass("mui-active");
            } else if(wei == 2){
                $("a.n-btn.ge").removeClass("mui-active");
                $("a.n-btn.ge."+random).addClass("mui-active");
            }
        },

        /**************定位胆***************/
        /**
         * 注数-定位胆 / 时时彩与11选5共用注数方法
         */
        zhushu_pl3_yixing_dwd :function(){
            var baiArr = [], shiArr = [], geArr = [], newArr = [];

            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                geArr.push($.trim($(this).html()));
            });
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (baiLength <= 0 && shiLength <= 0 && geLength <= 0) {
                return 0;
            }

            if (baiLength > 0) {
                newArr = newArr.concat(baiArr);
            }
            if (shiLength > 0) {
                newArr = newArr.concat(shiArr);
            }
            if (geLength > 0) {
                newArr = newArr.concat(geArr);
            }
            return newArr.length;
        },

        /**
         * 定位胆
         */
        content_pl3_yixing_dwd : function(){
            var  baiArr = [], shiArr = [], geArr = [];

            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            var baiStr = baiArr.length > 0 ? baiArr.join(",") : "";
            var shiStr = shiArr.length > 0 ? shiArr.join(",") : "";
            var geStr = geArr.length > 0 ? geArr.join(",") : "";

            return $.trim(
                (baiStr == ' ' ? ' ' : baiStr) + "|" +
                (shiStr == ' ' ? ' ' : shiStr) + "|" +
                (geStr == ' ' ? ' ' : geStr)
            );
        }

    });
});