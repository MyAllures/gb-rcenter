
define(['site/hall/k3/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'sbth',
        init: function () {
            this._super();
        },/**
         * 注数-三不同号
         */
        zhushu_sbth: function() {
            var _this = this;
            var sanbutonghaoArr = [];
            var len;
            $.each($(".cl-1002 ul li[data-name = '三不同'] span.acti"), function (index, value) {
                sanbutonghaoArr.push($.trim($(this).find("i").html()));
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

        content_sbth: function () {
            var _this = this;
            var sanbutonghaoArr = [];
            $.each($(".cl-1002 ul li[data-name = '三不同'] span.acti"), function (index, value) {
                sanbutonghaoArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = "三不同号";
            var showContent = sanbutonghaoArr.join(",");
            var betContent = sanbutonghaoArr.join(",");
            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 5星直选复式
         */
        suiji_sbth: function() {
            var _this = this;
            var sanbutonghaoArr = [];
            var random_1 = (parseInt(Math.random() * 6) + 1);
            var random_2 = (parseInt(Math.random() * 6) + 1);
            var random_3 = (parseInt(Math.random() * 6) + 1);
            while (random_1 ==random_2 || random_1 ==random_3 || random_3 ==random_2 ){
                random_1 = (parseInt(Math.random() * 6) + 1);
                random_2 = (parseInt(Math.random() * 6) + 1);
                random_3 = (parseInt(Math.random() * 6) + 1);
            }
            sanbutonghaoArr.push(random_1);
            sanbutonghaoArr.push(random_2);
            sanbutonghaoArr.push(random_3);
            // 初始化变量
            var showPlayName = "三不同号";
            var showContent = sanbutonghaoArr.join(",");
            var betContent = sanbutonghaoArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: _this.playGroupId
            };
        },

        //获取下注号码
        getBetNum:function(betNum) {
            if (betNum.toString().indexOf('|') < 0) {
                betNum = betNum.replace(new RegExp(",","gm"),",");
            }
            return betNum;
        },

    })
});