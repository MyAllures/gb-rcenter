define(['site/hall/k3-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            var _this=this;
            $("span.x_1.gfwf-tit").text("二同号单选");
            $(".s-title.title1 span").text("二同号单选");
            $("a[data-code='bzxh']").addClass("mui-active");
        },

        /**************二同号单选***************/
        /**
         * 注数-二同号单选
         */
        zhushu_ethdx :function(){
            var tong = [];
            var butong = [];
            $.each($("ul.tong a.n-btn.mui-active"), function () {
                tong.push($.trim($(this).html()));
            });
            $.each($("ul.butong a.n-btn.mui-active"), function () {
                butong.push($.trim($(this).html()));
            });
            return tong.length * butong.length;
        },

        /**
         * 二同号单选
         */
        content_ethdx : function(){
            var tong = [];
            var butong = [];
            $.each($("ul.tong a.n-btn.mui-active"), function () {
                tong.push($.trim($(this).html()));
            });
            $.each($("ul.butong a.n-btn.mui-active"), function () {
                butong.push($.trim($(this).html()));
            });

            var tongStr = tong.length > 0 ? tong.join(",") : "";
            var butongStr = butong.length > 0 ? butong.join(",") : "";

            return $.trim(
                (tongStr == ' ' ? ' ' : tongStr ) + "|" +
                (butongStr == ' ' ? ' ' : butongStr)
            );
        },

        //二同号单选
        random_ethdx : function () {
            var tong = 1;
            var butong = 1;

            while (tong ==butong){
                tong = parseInt(Math.random() * 6)+1;
                butong = parseInt(Math.random() * 6)+1;
            }
            $("a.n-btn.tong").removeClass("mui-active").eq(tong-1).addClass("mui-active");
            $("a.n-btn.butong").removeClass("mui-active").eq(butong-1).addClass("mui-active");
        },

        checkWanfa : function (obj) {
            var len=obj.text().length;
            if(len>1){
                $("a.n-btn.butong."+parseInt(obj.text())/11).removeClass("mui-active");
            }else{
                $("a.n-btn.tong."+parseInt(obj.text())*11).removeClass("mui-active");
            }
        }

    });
});