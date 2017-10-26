define(['site/hall/k3-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            var _this=this;
            $("span.x_1.gfwf-tit").text("三不同号");
            $(".s-title.title1 span").text("三不同号");
            $("a[data-code='bzxh']").addClass("mui-active");
        },

        /**************三不同号***************/
        /**
         * 注数-三不同号
         */
        zhushu_sbth :function(){
            var sanbutonghaoArr = [];
            var len;
            $.each($("ul.butonghao a.n-btn.mui-active"), function () {
                sanbutonghaoArr.push($.trim($(this).html()));
            });
            var len1=sanbutonghaoArr.length;
            if(len1>=3){
                if(len1==3){
                    len=1;
                }
                if(len1==4){
                    len=4;
                }
                if(len1==5){
                    len=10;
                }
                if(len1==6){
                    len=20;
                }
            }else{
                len=0;
            }
            return len;
        },

        /**
         * 三不同号
         */
        content_sbth : function(){
            var sanbutonghaoArr = [];
            $.each($("ul.butonghao a.n-btn.mui-active"), function () {
                sanbutonghaoArr.push($.trim($(this).html()));
            });
            return  sanbutonghaoArr.join(",");
        },

        //三不同号
        random_sbth : function () {
            var random_1 = (parseInt(Math.random() * 6) + 1);
            var random_2 = (parseInt(Math.random() * 6) + 1);
            var random_3 = (parseInt(Math.random() * 6) + 1);
            while (random_1 ==random_2 || random_1 ==random_3 || random_3 ==random_2 ){
                random_1 = (parseInt(Math.random() * 6) + 1);
                random_2 = (parseInt(Math.random() * 6) + 1);
                random_3 = (parseInt(Math.random() * 6) + 1);
            }
            $("a.n-btn.butonghao").removeClass("mui-active").eq(random_1-1).addClass("mui-active");
            $("a.n-btn.butonghao").eq(random_2-1).addClass("mui-active");
            $("a.n-btn.butonghao").eq(random_3-1).addClass("mui-active");
        }

    });
});