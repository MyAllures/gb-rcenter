define(['site/hall/k3-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            var _this=this;
            if(_this.getBetCode =="k3_tongxuan_santong"){
                $("span.x_1.gfwf-tit").text("三同号通选");
                $(".s-title.title1 span").text("三同号通选");
                $("a[data-code='bzxh']").addClass("mui-active");
            }else{
                $("span.x_1.gfwf-tit").text("三连号通选");
                $(".s-title.title1 span").text("三连号通选");
                $("a[data-code='bzxh']").addClass("mui-active");
            }
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