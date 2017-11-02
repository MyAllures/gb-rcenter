/**
 * 跨度
 */
define(['site/hall/ssc/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },/**
         * 注数-前3组合
         */
        zhushu_q3zh:function() {
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;

            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
                return;
            }

            var newArr = this.getHszhNewArrs(wanArr, qianArr, baiArr);

            return newArr.length;
        },

        /**
         * 注数-前3直选单式
         */
        zhushu_q3zxds:function() {
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var errorStr = '';
            var zhushu = 0;
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            return newArr.length;
        },

        /**
         * 注数-前3直选复式
         */
        zhushu_q3zxfs:function() {
            var newArr = [];
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            newArr = this.getThreeNewArrs(wanArr, qianArr, baiArr);
            return newArr.length;
        },

        /**
         * 注数-组六复式
         */
        zhushu_q3z6fs:function() {
            var fuShiArr = [], newArr = [];
            $.each($(".cl-1009-zlfs ul li[data-name = '组六'] span.acti"), function (index, value) {
                fuShiArr.push($.trim($(this).find("i").html()));
            });
            var zlLength = fuShiArr.length;
            if (zlLength < 3) {
                return 0;
            }
            newArr = this.getZuLiuNewArrs(fuShiArr);

            return newArr.length;
        },

        /**
         * 注数-组三单式
         */
        zhushu_q3z3ds:function () {
            var zhushu = 0;
            var textStr = $(".cl-1008-zsds .content_jiang .content_tex").val();
            var newArr = [], tempArr = [], errorStr = '', errorArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 1);
                var twoStr = temp.substr(1, 1);
                var threeStr = temp.substr(2, 1);
                if (oneStr == twoStr && twoStr != threeStr || twoStr == threeStr && oneStr != threeStr || threeStr == oneStr && twoStr != oneStr) {
                    tempArr.push(newArr[n]);
                }
            }

            return tempArr.length;
        },


        /**
         * 注数-组三复式
         */
        zhushu_q3z3fs: function () {
            var fuShiArr = [], newArr = [];
            $.each($(".cl-1007-zsfs ul li[data-name = '组三'] span.acti"), function (index, value) {
                fuShiArr.push($.trim($(this).find("i").html()));
            });

            var heZhiLength = fuShiArr.length;
            if (heZhiLength <= 1) {
                return 0;
            }
            newArr = this.getZuXuanNewArrs(fuShiArr);
            return newArr.length;
        },

        /**
         * 注数-组三复式
         */
        zhushu_gd11x5_qszuxfs: function () {
            var fuShiArr = [], newArr = [];
            var tim =[];
            $.each($(".recl-1002 ul li[data-name = '组选'] span.acti"), function () {
                fuShiArr.push($.trim($(this).find("i").html()));
            });

            var heZhiLength = fuShiArr.length;
            if (heZhiLength <= 1) {
                return 0;
            }

            newArr = this.getZuLiuNewArrs(fuShiArr);
            var zhushu=newArr.length;
            return zhushu;
        },
        zhushu_q3tsh:function () {
            var tsArr = [];
            $.each($(".cl-1015-tsh ul li.tsh_li[data-name = '特殊号'] span.acti_tsh"), function (index, value) {
                tsArr.push($.trim($(this).html()));
            });
            var zlLength = tsArr.length;
            if (zlLength <= 0) {
                return 0;
            }
            return tsArr.length;
        },

        /**
         * 注数-和值尾数
         */
        zhushu_q3hzws:function () {
            var wsArr = [], newArr = [];
            $.each($(".cl-1014-hzws ul li[data-name = '和值尾数'] span.acti"), function (index, value) {
                wsArr.push($.trim($(this).find("i").html()));
            });
            var zlLength = wsArr.length;
            if (zlLength < 0) {
                return 0;
            }
            return zlLength;
        },

        /**
         * 注数-组选包胆
         */
        zhushu_q3zxbd:function () {
            var baoDanArr = [], newArr = [];
            $.each($(".cl-1013-zxbd ul li[data-name = '包胆'] span.acti"), function (index, value) {
                baoDanArr.push($.trim($(this).find("i").html()));
            });
            var zlLength = baoDanArr.length;
            if (zlLength < 0) {
                return 0;
            }
            newArr = this.getZxbdNewArrs(baoDanArr);
            return newArr.length;
        },

        /**
         * 注数-组选和值
         */
        zhushu_q3zuxhz:  function () {
            var fuShiArr = [], newArr = [];
            $.each($(".cl-1012-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                fuShiArr.push($.trim($(this).find("i").html()));
            });
            var zlLength = fuShiArr.length;
            if (zlLength <= 0) {
                return 0;
            }
            newArr = this.getZxhzNewArrs(fuShiArr);
            return newArr.length;
        },

        /**
         * 注数-混合组选
         */
        zhushu_q3hhzx: function () {
            var textStr = $(".cl-1011-hhzx .content_jiang .content_tex").val();
            var newArr = [], tempArr = [], errorStr = '';
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 1);
                var twoStr = temp.substr(1, 1);
                var threeStr = temp.substr(2, 1);
                if (twoStr != threeStr && oneStr != threeStr && twoStr != oneStr || oneStr == twoStr && twoStr != threeStr || twoStr == threeStr && oneStr != threeStr || threeStr == oneStr && twoStr != oneStr) {
                    tempArr.push(newArr[n]);
                }
            }
            return tempArr.length;
        },

        /**
         * 注数-组六单式
         */
        zhushu_q3z6ds:  function () {
            var textStr = $(".cl-1010-zlds .content_jiang .content_tex").val();
            var newArr = [], tempArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 1);
                var twoStr = temp.substr(1, 1);
                var threeStr = temp.substr(2, 1);
                if (twoStr != threeStr && oneStr != threeStr && twoStr != oneStr) {
                    tempArr.push(newArr[n]);
                }
            }
            return tempArr.length;
        },
        /**
         * 前三组选-组六复式
         */
        content_q3z6fs:  function () {
            var zuLiuArr = [];

            $.each($(".cl-1009-zlfs ul li[data-name = '组六'] span.acti"), function (index, value) {
                zuLiuArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-组六复式";
            showContent = "组六: (" + zuLiuArr.join(",") + ")";
            betContent = zuLiuArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三组选-组三单式
         */
        content_q3z3ds:function () {
            var _this = this;
            var textStr = $(".cl-1008-zsds .content_jiang .content_tex").val();
            var newArr = [], tempArr = [], errorStr = '', errorArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 1);
                var twoStr = temp.substr(1, 1);
                var threeStr = temp.substr(2, 1);
                if (oneStr == twoStr && twoStr != threeStr || twoStr == threeStr && oneStr != threeStr || threeStr == oneStr && twoStr != oneStr) {
                    tempArr.push(newArr[n]);
                } else {
                    if (newArr[n] != '') {
                        errorArr.push(newArr[n]);
                    }
                }
            }
            if (tempArr.length <= 0) {
                return 0;
            }

            if (errorArr.length > 0) {
                for (var e = 0; e < errorArr.length; e++) {
                    errorStr += errorArr[e] + ",";
                }
                _this.alertmsg("被过滤掉的错误号码" + errorStr);
            }


            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-组三单式";
            showContent = "号码: (" + tempArr.join(',') + ")";
            betContent = tempArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三组选-组三复式
         */
        content_q3z3fs:   function () {
            var zuSanArr = [];
            $.each($(".cl-1007-zsfs ul li[data-name = '组三'] span.acti"), function (index, value) {
                zuSanArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-组三复式";
            showContent = "组三: (" + zuSanArr.join(",") + ")";
            betContent = zuSanArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三直选-前三组合
         */
        content_q3zh: function () {
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($(".cl-1004-hszh ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1004-hszh ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1004-hszh ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三直选-组合";
            showContent = "万位：({0})，千位：({1})，百位：({2})".format(
                wanArr.join(","),
                qianArr.join(","),
                baiArr.join(",")
            );
            betContent = this.gfwf_3xfs(
                wanArr,
                qianArr,
                baiArr
            );

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },


        /**
         * 后三直选-跨度
         */
        content_q3zxkd: function () {
            var kaDuArr = [];
            $.each($(".cl-1006-zxkd ul li[data-name = '跨度'] span.acti"), function (index, value) {
                kaDuArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三直选-跨度";
            showContent = "跨度: (" + kaDuArr.join(",") + ")";
            betContent = kaDuArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三直选-和值
         */
        content_q3zxhz:  function () {
            var heZhiArr = [];
            var zhushu = 0;
            $.each($(".cl-1005-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                heZhiArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三直选-和值";
            showContent = "和值: (" + heZhiArr.join(",") + ")";
            betContent = heZhiArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },


        /**
         * 前三直选-直选单式
         */
        content_q3zxds: function () {
            var _this = this;
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var errorStr = '';
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
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
                _this.alertmsg("被过滤掉的错误号码" + errorStr);
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三直选-单式";
            showContent = "号码: (" + newArr.join(",") + ")";
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三直选复式
         */
        content_q3zxfs:  function () {
            var wanArr = [], qianArr = [], shiArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三直选-复式";
            showContent = "万位：({0})，千位：({1})，百位：({2})".format(
                wanArr.join(","),
                qianArr.join(","),
                shiArr.join(",")
            );
            betContent = this.gfwf_3xfs(
                wanArr,
                qianArr,
                shiArr
            );

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        content_q3tsh: function () {
            var thArr = [];
            $.each($(".cl-1015-tsh ul li[data-name = '特殊号'] span.acti_tsh"), function (index, value) {
                thArr.push($.trim($(this).html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三其它-特殊号";
            showContent = "特殊号: (" + thArr.join(",") + ")";
            betContent = thArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },


        /**
         * 前三组选-前三和值尾数
         */
        content_q3hzws:  function () {
            var hzArr = [];
            $.each($(".cl-1014-hzws ul li[data-name = '和值尾数'] span.acti"), function (index, value) {
                hzArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三其它-前三和值尾数";
            showContent = "和值尾数: (" + hzArr.join(",") + ")";
            betContent = hzArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },


        /**
         * 前三组选-组选包胆
         */
        content_q3zxbd:   function () {
            var bdArr = [];
            $.each($(".cl-1013-zxbd ul li[data-name = '包胆'] span.acti"), function (index, value) {
                bdArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-组选包胆";
            showContent = "包胆: (" + bdArr.join(",") + ")";
            betContent = bdArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三组选-组选和值
         */
        content_q3zuxhz: function () {
            var heZhiArr = [];
            $.each($(".cl-1012-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                heZhiArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-组选和值";
            showContent = "和值: (" + heZhiArr.join(",") + ")";
            betContent = heZhiArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前三组选-组六混合
         */
        content_q3hhzx: function () {
            var _this = this;
            var textStr = $(".cl-1011-hhzx .content_jiang .content_tex").val();
            var newArr = [], tempArr = [], errorStr = '', errorArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                } else {
                    errorArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 1);
                var twoStr = temp.substr(1, 1);
                var threeStr = temp.substr(2, 1);
                if (twoStr != threeStr && oneStr != threeStr && twoStr != oneStr || oneStr == twoStr && twoStr != threeStr || twoStr == threeStr && oneStr != threeStr || threeStr == oneStr && twoStr != oneStr) {
                    tempArr.push(newArr[n]);
                } else {
                    errorArr.push(newArr[n]);
                }
            }

            if (tempArr.length <= 0) {
                return 0;
            }

            if (errorArr.length > 0) {
                for (var e = 0; e < errorArr.length; e++) {
                    errorStr += errorArr[e] + ",";
                }
                _this.alertmsg("被过滤掉的错误号码" + errorStr);
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-混合组选";
            showContent = "号码: (" + tempArr.join(',') + ")";
            betContent = tempArr.join(',');

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 后三组选-组六单式
         */
        content_q3z6ds: function () {
            var _this = this;
            var textStr = $(".cl-1010-zlds .content_jiang .content_tex").val();
            var newArr = [], tempArr = [], errorStr = '', errorArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 1);
                var twoStr = temp.substr(1, 1);
                var threeStr = temp.substr(2, 1);
                if (twoStr != threeStr && oneStr != threeStr && twoStr != oneStr) {
                    tempArr.push(newArr[n]);
                } else {
                    if (newArr[n] != '') {
                        errorArr.push(newArr[n]);
                    }
                }
            }

            if (tempArr.length <= 0) {
                return 0;
            }

            if (errorArr.length > 0) {
                for (var e = 0; e < errorArr.length; e++) {
                    errorStr += errorArr[e] + ",";
                }
                _this.alertmsg("被过滤掉的错误号码" + errorStr);
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-组六单式";
            showContent = "号码: (" + tempArr.join(',') + ")";
            betContent = tempArr.join(',');

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },


        /**
         * 前三组选-单式
         */
        content_gd11x5_qszuxds:function () {
            var _this = this;
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var newArr = [], tempArr = [], chongfuArr = [], errorArr = [], allStrError = [],errorArrs=[];
            textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
            textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
            textStr = $.trim(textStr.replace(/\s/g,""));
            var arr_new = textStr.split(',');
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 6) {
                    newArr.push(arr_new[i]);
                } else {
                    if (arr_new[i] != '') {
                        errorArr.push(arr_new[i]);
                        errorArr.toString();
                        var stnum= this.getReNum(errorArr);
                        errorArrs.push(stnum);
                    }
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 2);
                var twoStr = temp.substr(2, 2);
                var threeStr = temp.substr(4, 2);

                if(oneStr != twoStr && oneStr != threeStr && threeStr != twoStr){
                    var sotrArr = [];
                    sotrArr.push(parseInt(oneStr));
                    sotrArr.push(parseInt(twoStr));
                    sotrArr.push(parseInt(threeStr));
                    sotrArr.sort();

                    var oneStr1 = sotrArr[0] >= 10 ? sotrArr[0] : ('0' + sotrArr[0]);
                    var twoStr2 = sotrArr[1] >= 10 ? sotrArr[1] : ('0' + sotrArr[1]);
                    var threeStr3 = sotrArr[2] >= 10 ? sotrArr[2] : ('0' + sotrArr[2]);
                    tempArr.push(oneStr1+" " + twoStr2+" " + threeStr3);
                }
            }

            if (tempArr.length <= 0) {
                return 0;
            }

            chongfuArr = tempArr.duplicateNew();
            tempArr = tempArr.uniqueArr();

            if (chongfuArr.length > 0) {
                chongfuArr = chongfuArr.uniqueArr();
                allStrError.push(" 被过滤掉的重复号码 " + chongfuArr.join(' '));
            }

            if (errorArrs.length > 0){
                allStrError.push(" 被过滤掉的错误号码 " + errorArrs.join(' '));
            }

            if (allStrError.length > 0) {
                _this.alertmsg(allStrError.join(""));
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三组选-单式";
            showContent = "号码: (" + tempArr.join(',') + ")";
            betContent = tempArr.join(',');

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 前三组选复式
         */
        suiji_gd11x5_qszuxfs:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11'];
            var arr = [];
            while (arr.length < 3) {
                var xZlfs = tempArr[parseInt(Math.random()* 10+1)];
                var yZlfs = tempArr[parseInt(Math.random()* 10+1)];
                var zZlfs = tempArr[parseInt(Math.random()* 10+1)];

                if (xZlfs != yZlfs && yZlfs != zZlfs && zZlfs != xZlfs) {
                    arr.push(xZlfs);
                    arr.push(yZlfs);
                    arr.push(zZlfs);
                }
            }

            showPlayName = "前三组选复式";
            showContent = "前三组选复式: ({0},{1},{2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0},{1},{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前三组选-组六复式
         */
        suiji_q3z6fs: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 3) {
                var xZlfs = parseInt(Math.random() * 10);
                var yZlfs = parseInt(Math.random() * 10);
                var zZlfs = parseInt(Math.random() * 10);
                if (xZlfs != yZlfs && yZlfs != zZlfs && zZlfs != xZlfs) {
                    arr.push(xZlfs);
                    arr.push(yZlfs);
                    arr.push(zZlfs);
                }
            }

            showPlayName = "前三组选-组六复式";
            showContent = "组六: ({0},{1},{2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0},{1},{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },


        /**
         * 前三组选-组三单式
         */
        suiji_q3z3ds:  function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 3) {
                var xZxds = parseInt(Math.random() * 10);
                var yZxds = parseInt(Math.random() * 10);
                var zZxds = parseInt(Math.random() * 10);
                if (xZxds == yZxds && yZxds != zZxds || xZxds == zZxds && zZxds != yZxds || yZxds == zZxds && zZxds != xZxds) {
                    arr.push(xZxds);
                    arr.push(yZxds);
                    arr.push(zZxds);
                }
            }

            showPlayName = "前三组选-组三单式";
            showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + ")";
            betContent = "{0}{1}{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 后三组选-组三复式
         */
        suiji_q3z3fs:   function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';
            var betZhushu = 0;

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 2) {
                var x = parseInt(Math.random() * 10);
                var y = parseInt(Math.random() * 10);
                if (x != y) {
                    arr.push(x);
                    arr.push(y);
                }
            }

            showPlayName = "前三组选-组三复式";
            showContent = "组三: ({0},{1})".format(arr[0], arr[1]);
            betContent = "{0},{1}".format(arr[0], arr[1]);
            betZhushu = 2; //默认两个号码两注
            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 后三直选-跨度
         */
        suiji_q3zxkd: function () {
            // 初始化变量
            var betZhushu = 0;
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 1) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }
            betZhushu = this.getKaduNewArrs(arr).length;
            showPlayName = "前三直选-跨度";
            showContent = "跨度: ({0})".format(arr[0]);
            betContent = "{0}".format(arr[0]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前三直选-和值
         */
        suiji_q3zxhz:  function () {
            var betZhushu = 0;
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
            var arr = [];
            while (arr.length < 1) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }
            betZhushu = this.getHezNewArrs(arr).length;
            showPlayName = "前三直选-和值";
            showContent = "和值: ({0})".format(arr[0]);
            betContent = "{0}".format(arr[0]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前三直选-组合
         */
        suiji_q3zh:function () {
            var baiArr = [], shiArr = [], geArr = [];
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';
            var betZhushu = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 3) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }
            baiArr.push(arr[0]);
            shiArr.push(arr[1]);
            geArr.push(arr[2]);
            betZhushu = (this.getHszhNewArrs(baiArr, shiArr, geArr)).length
            showPlayName = "前三直选-组合";
            showContent = "万位: ({0}), 千位: ({1}), 百位: ({2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前三直选-单式
         */
        suiji_q3zxds: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 3) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "前三直选-单式";
            showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + ")";
            betContent = "{0}{1}{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前三直选复式
         */
        suiji_q3zxfs:  function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 3) {
                arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
            }

            showPlayName = "前三直选-复式";
            showContent = "万位: ({0}), 千位: ({1}), 百位: ({2})".format(arr[0], arr[1], arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },/**
         * 注数-直选跨度
         */
        zhushu_q3zxkd: function () {
            var newArr = [];
            var kaDuArr = [];
            $.each($(".cl-1006-zxkd ul li[data-name = '跨度'] span.acti"), function (index, value) {
                kaDuArr.push($.trim($(this).find("i").html()));
            });
            if (kaDuArr.length <= 0) {
                return 0;
            }
            newArr = this.getKaduNewArrs(kaDuArr);
            return newArr.length;
        },

        /**
         * 注数-直选和值
         */
        zhushu_q3zxhz: function () {
            var heZhiArr = [], newArr = [];
            $.each($(".cl-1005-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                heZhiArr.push($.trim($(this).find("i").html()));
            });

            var heZhiLength = heZhiArr.length;
            if (heZhiLength <= 0) {
                return 0;
            }

            newArr = this.getHezNewArrs(heZhiArr);
            return newArr.length;
        },

        /**
         * 注数-前3组合
         */
        zhushu_q3zh:function () {
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;

            if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
                return 0;
            }

            var newArr = this.getHszhNewArrs(wanArr, qianArr, baiArr);

            return newArr.length;
        },

        /**
         * 注数-前3直选单式
         */
        zhushu_q3zxds:function () {
            var textStr = $(".content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var errorStr = '';
            var zhushu = 0;
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                    newArr.push(arr_new[i]);
                }
            }
            return newArr.length;
        },

        /**
         * 注数-前3直选复式
         */
        zhushu_q3zxfs:   function () {
            var newArr = [];
            var wanArr = [], qianArr = [], baiArr = [];
            $.each($(".cl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            newArr = this.getThreeNewArrs(wanArr, qianArr, baiArr);
            return newArr.length;
        },

        gfwf_3xfs: function (baiArr, shiArr, geArr) {
            var tmpStr_1 = baiArr.join(",");
            var tmpStr_2 = shiArr.join(",");
            var tmpStr_3 = geArr.join(",");

            return "{0}|{1}|{2}".format(
                tmpStr_1,
                tmpStr_2,
                tmpStr_3
            );
        },
        /**
         * 前三组选-组六单式
         */
        suiji_q3z6ds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr = [];
            while (arr.length < 3) {
                var xZlfs = parseInt(Math.random() * 10);
                var yZlfs = parseInt(Math.random() * 10);
                var zZlfs = parseInt(Math.random() * 10);
                if (xZlfs != yZlfs && yZlfs != zZlfs && zZlfs != xZlfs) {
                    arr.push(xZlfs);
                    arr.push(yZlfs);
                    arr.push(zZlfs);
                }
            }

            showPlayName = "前三组选-组六单式";
            showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + ")";
            betContent = "{0}{1}{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        suiji_q3tsh:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arrTsh = [], newArr = [];
        arrTsh[0] = "对子";
        arrTsh[1] = "顺子";
        arrTsh[2] = "豹子";
        while (newArr.length != 1) {
            var zhiTsh = parseInt(Math.random() * 3);
            newArr.push(arrTsh[parseInt(zhiTsh)]);
        }

        showPlayName = "前三其它-特殊号";
        showContent = "特殊号: (" + newArr[0] + ")";
        betContent = newArr[0];

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 前三其它-前三和值尾数"
     */
    suiji_q3hzws: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var arr = [];
        while (arr.length < 1) {
            arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
        }

        showPlayName = "前三其它-前三和值尾数";
        showContent = "尾数: ({0})".format(arr[0]);
        betContent = "{0}".format(arr[0]);

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },


    /**
     * 前三直选-组选包胆
     */
    suiji_q3zxbd:   function () {
        var baoDanArr = [];
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = '';

        var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var arr = [];
        while (arr.length < 1) {
            arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
        }
        baoDanArr.push(arr);
        betZhushu = this.getZxbdNewArrs(baoDanArr).length;
        showPlayName = "前三直选-组选包胆";
        showContent = "包胆: ({0})".format(arr[0]);
        betContent = "{0}".format(arr[0]);

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 前三直选-组选和值
     */
    suiji_q3zuxhz: function () {
        var fuShiArr = [];
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;

        var tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
        var arr = [];
        while (arr.length < 1) {
            arr.push(tempArr[parseInt(Math.random() * tempArr.length)]);
        }

        fuShiArr.push(arr);
        betZhushu = this.getZxhzNewArrs(fuShiArr).length;
        showPlayName = "前三直选-组选和值";
        showContent = "和值: ({0})".format(arr[0]);
        betContent = "{0}".format(arr[0]);

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 前三组选-混合组选
     */
    suiji_q3hhzx: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var arr = [];
        while (arr.length < 3) {
            var xHhzx = parseInt(Math.random() * 10);
            var yHhzx = parseInt(Math.random() * 10);
            var zHhzx = parseInt(Math.random() * 10);
            if (xHhzx == yHhzx && yHhzx != zHhzx || xHhzx == zHhzx && zHhzx != yHhzx || yHhzx == zHhzx && zHhzx != xHhzx || xHhzx != yHhzx && yHhzx != zHhzx && zHhzx != xHhzx) {
                arr.push(xHhzx);
                arr.push(yHhzx);
                arr.push(zHhzx);
            }
        }

        showPlayName = "前三组选-混合组选";
        showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + ")";
        betContent = "{0}{1}{2}".format(arr[0], arr[1], arr[2]);

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
                var betCode = this.getPlayId();
                if (betCode == 'ssc_sanxing_zhixuan_qskd' || betCode =='ssc_sanxing_zuxuan_qsz3fs' || betCode =='ssc_sanxing_zuxuan_qsz6fs' ){

                }else {
                    betNum = betNum.replace(new RegExp(",", "gm"), "|");
                }
            }
            return betNum;
        }

    })
});