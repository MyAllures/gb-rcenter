define(['site/hall/k3/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable(this.getSecondText(),"官方玩法-"+this.getSecondText(),"bzxh","","");
            this._super();

        },

        getSecondText:function () {
            return _this.getBetCode() =="k3_tongxuan_santong"?"三同号通选":"三连号通选";
        },

        getBetCode : function () {
            return $("#gfwfBetCode").val();
        },

        /**************三同号通选***************/
        /**
         * 注数-三同号通选
         */
        zhushu_sth :function(){
            var tongxuanArr = [];
            $.each($("ul.tongxuan a.n-btn.mui-active"), function () {
                tongxuanArr.push($.trim($(this).html()));
            });
            return tongxuanArr.length;
        },

        /**
         * 三同号通选
         */
        content_sth : function(){
            var tongxuanArr = [];
            $.each($("ul.tongxuan a.n-btn.mui-active"), function () {
                tongxuanArr.push($.trim($(this).html()));
            });
            return tongxuanArr.length>0?"通选":"";
        },

        //三同号通选机选
        random_sth : function () {
            $("ul.tongxuan a.n-btn").removeClass("mui-active");
            $("ul.tongxuan a.n-btn").addClass("mui-active");
        },


        /**************三连号通选***************/
        /**
         * 注数-三连号通选
         */
        zhushu_slh :function(){
            var tongxuanArr = [];
            $.each($("ul.tongxuan a.n-btn.mui-active"), function () {
                tongxuanArr.push($.trim($(this).html()));
            });
            return tongxuanArr.length;
        },

        /**
         * 三连号通选
         */
        content_slh : function(){
            var tongxuanArr = [];
            $.each($("ul.tongxuan a.n-btn.mui-active"), function () {
                tongxuanArr.push($.trim($(this).html()));
            });
            return tongxuanArr.length>0?"通选":"";
        },

        //三连号通选机选
        random_slh : function () {
            $("ul.tongxuan a.n-btn").removeClass("mui-active");
            $("ul.tongxuan a.n-btn").addClass("mui-active");
        },

    });
});