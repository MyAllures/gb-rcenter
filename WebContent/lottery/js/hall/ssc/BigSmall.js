/**
 * 跨度
 */
define(['site/hall/ssc/SscGfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },

        /**
         * 注数-前二大小单双
         */
        zhushu_q2dxds:function () {
            var dxdsWArr = [], dxdsQArr = [], tempArr = [];
            $.each($(".recl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                dxdsWArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                dxdsQArr.push($.trim($(this).find("i").html()));
            });

            for (var n = 0; n < dxdsWArr.length; n++) {
                for (var m = 0; m < dxdsQArr.length; m++) {
                    tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m]);
                }
            }
            return tempArr.length;
        },

        /**
         * 注数-后二大小单双
         */
        zhushu_h2dxds:function () {
            var dxdsSArr = [], dxdsGArr = [];
            $.each($(".recl-1003-h2dxds ul li[data-name = '十'] span.acti"), function (index, value) {
                dxdsSArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1003-h2dxds ul li[data-name = '个'] span.acti"), function (index, value) {
                dxdsGArr.push($.trim($(this).find("i").html()));
            });
            return dxdsSArr.length * dxdsGArr.length;
        },

        /**
         * 注数-前三大小单双
         */
        zhushu_q3dxds:function () {
            var dxdsWArr = [], dxdsQArr = [], dxdsBArr = [];
            $.each($(".recl-1004-q3dxds ul li[data-name = '万'] span.acti"), function (index, value) {
                dxdsWArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1004-q3dxds ul li[data-name = '千'] span.acti"), function (index, value) {
                dxdsQArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1004-q3dxds ul li[data-name = '百'] span.acti"), function (index, value) {
                dxdsBArr.push($.trim($(this).find("i").html()));
            });
            return dxdsWArr.length * dxdsQArr.length * dxdsBArr.length;
        },

        /**
         * 注数-后三大小单双
         */
        zhushu_h3dxds:function () {
            var dxdsBArr = [], dxdsSArr = [], dxdsGArr = [];
            $.each($(".recl-1005-h3dxds ul li[data-name = '百'] span.acti"), function (index, value) {
                dxdsBArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1005-h3dxds ul li[data-name = '十'] span.acti"), function (index, value) {
                dxdsSArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1005-h3dxds ul li[data-name = '个'] span.acti"), function (index, value) {
                dxdsGArr.push($.trim($(this).find("i").html()));
            });
            return dxdsBArr.length * dxdsSArr.length * dxdsGArr.length;
        },
        /**
         * 前二大小单双
         */
        suiji_q2dxds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = ["大", "小", "单", "双"];
            var arr = [];
            while (arr.length < 2) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }
            showPlayName = "前二大小单双";
            showContent = "万位: ({0}), 千位: ({1})".format(arr[0], arr[1]);
            betContent = "{0}|{1}".format(arr[0], arr[1]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },


        /**
         * 后二大小单双
         */
        suiji_h2dxds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = ["大", "小", "单", "双"];
            var arr = [];
            while (arr.length < 2) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "后二大小单双";
            showContent = "十位: ({0}), 个位: ({1})".format(arr[0], arr[1]);
            betContent = "{0}|{1}".format(arr[0], arr[1]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前三大小单双
         */
        suiji_q3dxds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = ["大", "小", "单", "双"];
            var arr = [];
            while (arr.length < 3) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "前三大小单双";
            showContent = "万位: ({0}), 千位: ({1}), 百位: ({2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 后三大小单双
         */
        suiji_h3dxds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = ["大", "小", "单", "双"];
            var arr = [];
            while (arr.length < 3) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "后三大小单双";
            showContent = "百位: ({0}), 十位: ({1}), 个位: ({2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },/**
         * 前2大小单双
         */
        content_q2dxds:function () {
            var zhushu = 0;
            var dxdsWArr = [], dxdsQArr = [], tempArr = [];

            $.each($(".recl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                dxdsWArr.push($.trim($(this).find("i").html()));
            });

            $.each($(".recl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                dxdsQArr.push($.trim($(this).find("i").html()));
            });

            for (var n = 0; n < dxdsWArr.length; n++) {
                for (var m = 0; m < dxdsQArr.length; m++) {
                    tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m]);
                }
            }

            if (dxdsWArr.length <= 0 || dxdsQArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arr = [
                dxdsWArr.join(","),
                dxdsQArr.join(",")
            ];

            showPlayName = "前二大小单双";
            showContent = "万位: ({0}), 千位: ({1})".format(arr[0], arr[1]);
            betContent = "{0}|{1}".format(arr[0], arr[1]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 后2大小单双
         */
        content_h2dxds:function () {
            var zhushu = 0;
            var dxdsSArr = [], dxdsGArr = [], tempArr = [];
            $.each($(".recl-1003-h2dxds ul li[data-name = '十'] span.acti"), function (index, value) {
                dxdsSArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1003-h2dxds ul li[data-name = '个'] span.acti"), function (index, value) {
                dxdsGArr.push($.trim($(this).find("i").html()));
            });

            for (var n = 0; n < dxdsSArr.length; n++) {
                for (var m = 0; m < dxdsGArr.length; m++) {
                    tempArr.push(dxdsSArr[n] + "" + dxdsGArr[m]);
                }
            }
            if (dxdsSArr.length <= 0 || dxdsGArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arr = [
                dxdsSArr.join(","),
                dxdsGArr.join(",")
            ];

            showPlayName = "后二大小单双";
            showContent = "十位: ({0}), 个位: ({1})".format(arr[0], arr[1]);
            betContent = "{0}|{1}".format(arr[0], arr[1]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 前三大小单双
         */
        content_q3dxds:function () {
            var zhushu = 0;
            var dxdsWArr = [], dxdsQArr = [], dxdsBArr = [], tempArr = [];
            $.each($(".recl-1004-q3dxds ul li[data-name = '万'] span.acti"), function (index, value) {
                dxdsWArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1004-q3dxds ul li[data-name = '千'] span.acti"), function (index, value) {
                dxdsQArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1004-q3dxds ul li[data-name = '百'] span.acti"), function (index, value) {
                dxdsBArr.push($.trim($(this).find("i").html()));
            });


            for (var n = 0; n < dxdsWArr.length; n++) {
                for (var m = 0; m < dxdsQArr.length; m++) {
                    for (var h = 0; h < dxdsQArr.length; h++) {
                        tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m] + "" + dxdsBArr[h]);
                    }
                }
            }
            if (dxdsWArr.length <= 0 || dxdsQArr.length <= 0 || dxdsBArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arr = [
                dxdsWArr.join(","),
                dxdsQArr.join(","),
                dxdsBArr.join(",")
            ];

            showPlayName = "前三大小单双";
            showContent = "万位: ({0}), 千位: ({1}), 百位: ({2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 后三大小单双
         */
        content_h3dxds:function () {
            var zhushu = 0;
            var dxdsBArr = [], dxdsSArr = [], dxdsGArr = [], tempArr = [];
            $.each($(".recl-1005-h3dxds ul li[data-name = '百'] span.acti"), function (index, value) {
                dxdsBArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1005-h3dxds ul li[data-name = '十'] span.acti"), function (index, value) {
                dxdsSArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1005-h3dxds ul li[data-name = '个'] span.acti"), function (index, value) {
                dxdsGArr.push($.trim($(this).find("i").html()));
            });

            for (var i = 0; i < dxdsBArr.length; i++) {
                for (var n = 0; n < dxdsSArr.length; n++) {
                    for (var m = 0; m < dxdsGArr.length; m++) {
                        tempArr.push(dxdsBArr[i] + "" + dxdsSArr[n] + "" + dxdsGArr[m]);
                    }
                }
            }
            if (dxdsBArr.length <= 0 || dxdsSArr.length <= 0 || dxdsGArr.length <= 0) {
                return;
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arr = [
                dxdsBArr.join(","),
                dxdsSArr.join(","),
                dxdsGArr.join(",")
            ];

            showPlayName = "后三大小单双";
            showContent = "百位: ({0}), 十位: ({1}), 个位: ({2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        //获取下注号码
        getBetNum:function(betNum) {
            return betNum;
        }


    })
});