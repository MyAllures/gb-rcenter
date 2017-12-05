define(['site/hall/k3/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable("三同号单选","官方玩法-三同号单选","bzxh","","");
            this._super();
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