define(['site/hall/k3/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable("二同号复选","官方玩法-二同号复选","bzxh","","");
            this._super();

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