/**
 * 跨度
 */
define(['site/hall/ssc/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },

        /**
         * 注数-4星直选复式
         */
        zhushu_4xzxfs: function() {
            var _this = this;
            var qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '十'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '个'] span.acti"), function (index, value) {
                geArr.push($.trim($(this).find("i").html()));
            });

            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
                return 0;
            }

            var newArr = _this.getFourNewArrs(qianArr, baiArr, shiArr, geArr);
            if (typeof newArr == "undefined" || newArr.length <= 0) {
                if (typeof _this.clearStateTouZhu == 'function') {
                    _this.clearStateTouZhu();
                }
                return;
            }
            return newArr.length;
        },

        /**
         * 4星直选复式
         */
        content_4xzxfs:function() {
            var qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '十'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '个'] span.acti"), function (index, value) {
                geArr.push($.trim($(this).find("i").html()));
            });

            if (qianArr.length <= 0 || baiArr.length <= 0 || shiArr.length <= 0 || geArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "四星直选-复式";
            showContent = "千位：({0})，百位：({1})，十位：({2})，个位：({3})".format(
                qianArr.join(","),
                baiArr.join(","),
                shiArr.join(","),
                geArr.join(",")
            );
            betContent = this.gfwf_4xfs(
                qianArr,
                baiArr,
                shiArr,
                geArr
            );

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        gfwf_4xfs: function(qianArr,baiArr,shiArr,geArr) {
            var tmpStr_1 = qianArr.join(",");
            var tmpStr_2 = baiArr.join(",");
            var tmpStr_3 = shiArr.join(",");
            var tmpStr_4 = geArr.join(",");

            return "{0}|{1}|{2}|{3}".format(
                tmpStr_1,
                tmpStr_2,
                tmpStr_3,
                tmpStr_4
            );
        },
        /**
         * 4星直选复式
         */
        suiji_4xzxfs: function() {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 4) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "四星直选-复式";
            showContent = "千位: ({0}), 百位: ({1}), 十位: ({2}), 个位: ({3})".format(arr[0], arr[1], arr[2], arr[3]);
            betContent = "{0}|{1}|{2}|{3}".format(arr[0], arr[1], arr[2], arr[3]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 注数-4星直选单式
         */
        zhushu_4xzxds:function() {
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 4) {
                    newArr.push(arr_new[i]);
                }
            }
            return newArr.length;
        },
        /**
         * 4星直选单式
         */
        content_4xzxds:function() {
            var _this = this;
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var errorStr = '';
            var zhushu = 0;
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 4) {
                    newArr.push(arr_new[i]);
                } else {
                    if (arr_new[i] != '') {
                        errorArr.push(arr_new[i]);
                    }
                }
            }

            if (newArr.length <= 0) {
                return 0;
            }

            if (errorArr.length > 0) {
                for (var e = 0; e < errorArr.length; e++) {
                    errorStr += errorArr[e] + ",";
                }
                _this.alertmsg("被过滤掉的错误号码:" + errorStr.substring(0,errorStr.length-1));
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "四星直选-单式";
            showContent = "号码: (" + newArr.join(",") + ")";
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 4星直选单式
         */
         suiji_4xzxds: function() {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var arr = [];
        while (arr.length < 4) {
            arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
        }

        showPlayName = "4星直选-单式";
        showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + "" + arr[3] + ")";
        betContent = "{0}{1}{2}{3}".format(arr[0], arr[1], arr[2], arr[3]);

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    }

    })
});