
define(['site/hall/k3/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'ebth',
        init: function () {
            this._super();
        },/**
         * 注数-二不同号
         */
        zhushu_ebth: function() {
            var _this = this;
            var erbutonghaoArr = [];
            var len;
            $.each($(".cl-1002 ul li[data-name = '二不同'] span.acti"), function (index, value) {
                erbutonghaoArr.push($.trim($(this).find("i").html()));
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

        content_ebth: function () {
            var _this = this;
            var erbutonghaoArr = [];
            $.each($(".cl-1002 ul li[data-name = '二不同'] span.acti"), function (index, value) {
                erbutonghaoArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = "二不同号";
            var showContent = erbutonghaoArr.join(",");
            var betContent = erbutonghaoArr.join(",");
            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 二不同号
         */
        suiji_ebth: function() {
            var _this = this;
            var sanbutonghaoArr = [];
            var random_1 = (parseInt(Math.random() * 6) + 1);
            var random_2 = (parseInt(Math.random() * 6) + 1);
            while (random_1 ==random_2){
                random_1 = (parseInt(Math.random() * 6) + 1);
                random_2 = (parseInt(Math.random() * 6) + 1);
            }
            sanbutonghaoArr.push(random_1);
            sanbutonghaoArr.push(random_2);
            // 初始化变量
            var showPlayName = "二不同号";
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