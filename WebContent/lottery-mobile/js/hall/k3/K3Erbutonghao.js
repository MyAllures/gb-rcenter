define(['site/hall/k3/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable("二不同号","官方玩法-二不同号","bzxh","","");
            this._super();

        },

        /**************二不同号***************/
        /**
         * 注数-二不同号
         */
        zhushu_ebth :function(){
            var erbutonghaoArr = [];
            var len;
            $.each($("ul.butonghao a.n-btn.mui-active"), function () {
                erbutonghaoArr.push($.trim($(this).html()));
            });
            var len1=erbutonghaoArr.length;
            if(len1>=2){
                if(len1==2){
                    len=1;
                }
                if(len1==3){
                    len=3;
                }
                if(len1==4){
                    len=6;
                }
                if(len1==5){
                    len=10;
                }
                if(len1==6){
                    len=15;
                }
            }else{
                len=0;
            }
            return len;
        },

        /**
         * 二不同号
         */
        content_ebth : function(){
            var erbutonghaoArr = [];
            $.each($("ul.butonghao a.n-btn.mui-active"), function () {
                erbutonghaoArr.push($.trim($(this).html()));
            });
            return  erbutonghaoArr.join(",");
        },

        //二不同号
        random_ebth : function () {
            var random_1 = (parseInt(Math.random() * 6) + 1);
            var random_2 = (parseInt(Math.random() * 6) + 1);
            while (random_1 ==random_2  ){
                random_1 = (parseInt(Math.random() * 6) + 1);
                random_2 = (parseInt(Math.random() * 6) + 1);
            }
            $("a.n-btn.butonghao").removeClass("mui-active").eq(random_1-1).addClass("mui-active");
            $("a.n-btn.butonghao").eq(random_2-1).addClass("mui-active");
        }

    });
});