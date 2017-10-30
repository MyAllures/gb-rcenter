define(['site/hall/GfwfPlayWay', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            var _this=this;
            $("span.x_1.gfwf-tit").text("三同号单选");
            $(".s-title.title1 span").text("三同号单选");
            $("a[data-code='bzxh']").addClass("mui-active");
        },

        /**************三同号单选***************/
        /**
         * 注数-三同号单选
         */
        zhushu_sthdx :function(){
            var santonghaoArr = [];
            $.each($("ul.santonghao a.n-btn.mui-active"), function () {
                santonghaoArr.push($.trim($(this).html()));
            });
            return santonghaoArr.length;
        },

        /**
         * 三同号通选
         */
        content_sthdx : function(){
            var santonghaoArr = [];
            $.each($("ul.santonghao a.n-btn.mui-active"), function () {
                santonghaoArr.push($.trim($(this).html()));
            });
            return  santonghaoArr.join("|");
        },

        //三同号通选机选
        random_sthdx : function () {
            var random_1 = (parseInt(Math.random() * 6) + 1);
            $("a.n-btn.santonghao").removeClass("mui-active").eq(random_1-1).addClass("mui-active");
        }

    });
});