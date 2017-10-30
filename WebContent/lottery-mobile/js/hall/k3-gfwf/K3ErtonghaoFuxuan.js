define(['site/hall/k3-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            var _this=this;
            $("span.x_1.gfwf-tit").text("二同号复选");
            $(".s-title.title1 span").text("二同号复选");
            $("a[data-code='bzxh']").addClass("mui-active");
        },

        /**************二同号复选***************/
        /**
         * 注数-二同号复选
         */
        zhushu_ethfx :function(){
            var santonghaoArr = [];
            $.each($("ul.ertonghao a.n-btn.mui-active"), function () {
                santonghaoArr.push($.trim($(this).html()));
            });
            return santonghaoArr.length;
        },

        /**
         * 二同号复选
         */
        content_ethfx : function(){
            var santonghaoArr = [];
            $.each($("ul.ertonghao a.n-btn.mui-active"), function () {
                santonghaoArr.push($.trim($(this).html()));
            });
            return  santonghaoArr.join("|");
        },

        //二同号复选
        random_ethfx : function () {
            var random_1 = (parseInt(Math.random() * 6) + 1);
            $("a.n-btn.ertonghao").removeClass("mui-active").eq(random_1-1).addClass("mui-active");
        }

    });
});