/**
 * 跨度
 */
define(['site/hall/ssc/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },/**
         * 注数-5星直选复式
         */
        zhushu_5xzxfs: function() {
            var _this = this;
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
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

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
                return 0;
            }

            var newArr = this.getNewArrs(wanArr, qianArr, baiArr, shiArr, geArr);
            if (typeof newArr == "undefined" || newArr.length <= 0) {
                if (typeof clearStateTouZhu == 'function') {
                    _this.clearStateTouZhu();
                }
                return;
            }
            return newArr.length;
        },
        content_5xzxfs: function () {
            var _this = this;
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
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

            if (wanArr.length <= 0 || qianArr.length <= 0 || baiArr.length <= 0 || shiArr.length <= 0 || geArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "五星直选-复式";
            _this.getStringFormat();
            showContent = "万位：({0})，千位：({1})，百位：({2})，十位：({3})，个位：({4})".format(
                wanArr.join(","),
                qianArr.join(","),
                baiArr.join(","),
                shiArr.join(","),
                geArr.join(",")
            );
            betContent = _this.gfwf_5xfs(
                wanArr,
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

        /**
         * 时时彩-五星复选
         * @param wanArr 万数组
         * @param qianArr 千数组
         * @param baiArr 百数组
         * @param shiArr 十数组
         * @param geArr 个数组
         */
        gfwf_5xfs: function(wanArr,qianArr,baiArr,shiArr,geArr) {
            var tmpStr_1 = wanArr.join(",");
            var tmpStr_2 = qianArr.join(",");
            var tmpStr_3 = baiArr.join(",");
            var tmpStr_4 = shiArr.join(",");
            var tmpStr_5 = geArr.join(",");

            return "{0}|{1}|{2}|{3}|{4}".format(
                tmpStr_1,
                tmpStr_2,
                tmpStr_3,
                tmpStr_4,
                tmpStr_5
            );
        },
        /**
         * 5星直选复式
         */
        suiji_5xzxfs: function() {
            var _this = this;
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 5) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "五星直选-复式";
            // this.getStringFormat();
            showContent = "万位: ({0}), 千位: ({1}), 百位: ({2}), 十位: ({3}), 个位: ({4})".format(arr[0], arr[1], arr[2], arr[3], arr[4]);
            betContent = "{0}|{1}|{2}|{3}|{4}".format(arr[0], arr[1], arr[2], arr[3], arr[4]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: _this.playGroupId
            };
        },
        /**
         * 注数-5星直选单式
         */
        zhushu_5xzxds: function() {
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 5) {
                    newArr.push(arr_new[i]);
                }
            }
            return newArr.length;
        },

        /**
         * 5星直选单式
         */
        content_5xzxds: function() {
            var _this = this;
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var errorStr = '';
            var zhushu = 0;
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 5) {
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

            showPlayName = "五星直选-单式";
            showContent = "号码: (" + newArr.join(",") + ")";
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 5星直选单式
         */
         suiji_5xzxds: function() {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var arr = [];
        while (arr.length < 5) {
            arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
        }

        showPlayName = "五星直选-单式";
        showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + "" + arr[3] + "" + arr[4] + ")";
        betContent = "{0}{1}{2}{3}{4}".format(arr[0], arr[1], arr[2], arr[3], arr[4]);

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    }



    })
});