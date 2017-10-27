
define(['site/hall/pk10/Pk10Gfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'qyzxfs',
        init: function () {
            this._super();
        },


        content_pk10_qy:function () {
            var _this=this;
            var qyArr = [];
            $.each($(".cl-1002 ul li[data-name = '冠军'] span.acti"), function (index, value) {
                qyArr.push($.trim($(this).find("i").html()));
            });


            if (qyArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前一直选复式";
            showContent = "冠军：({0})".format(
                qyArr.join(",")
            );
            betContent = _this.gfwf_qyfs(
                qyArr

            );

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

         gfwf_qyfs :function(qyArr) {
            var tmpStr_1 = qyArr.join(",");


            return "{0}".format(
                tmpStr_1

            );
        },

        zhushu_pk10_qy:function () {
            var qyArr = [];
            $.each($(".cl-1002 ul li[data-name = '冠军'] span.acti"), function (index, value) {
                qyArr.push($.trim($(this).find("i").html()));
            });


            var qianLength = qyArr.length;

            if (qianLength <= 0) {
                return 0;
            }

            return qyArr.length;
        },
        suiji_pk10_qy:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
            var arr = [];
            while (arr.length <= 1) {
                arr.push(tempArr[parseInt(Math.random() * 10)]);
            }

            showPlayName = "前一-直选复式";
            showContent = "冠军: ({0})".format(arr[0]);
            betContent = "{0}".format(arr[0]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
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
