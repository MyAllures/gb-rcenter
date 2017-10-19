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
         * 注数-组选4
         */
        zhushu_rx4zu4:  function () {
            var sanChongHaoArr = [], danHaoArr = [], tempArr = [], nowArr = [];
            $.each($(".recl-1007-zux4 ul li[data-name = '三重号'] span.acti"), function (index, value) {
                sanChongHaoArr.push($.trim($(this).find("i").html()));
            });

            $.each($(".recl-1007-zux4 ul li[data-name = '单号'] span.acti"), function (index, value) {
                danHaoArr.push($.trim($(this).find("i").html()));
            });

            for (var d = 0; d < sanChongHaoArr.length; d++) {
                for (var n = 0; n < danHaoArr.length; n++) {
                    if (sanChongHaoArr[d] != danHaoArr[n]) {
                        tempArr.push(sanChongHaoArr[d] + "" + danHaoArr[n]);
                    }
                }
            }
            if (tempArr.length < 1) {
                return 0;
            }
            var zhushu = tempArr.length;
            var shu = $("#positioninfo-zux4").html();
            var lengthArr = zhushu * shu;
            return lengthArr;
        }
        ,
        /**
         * 注数-组选6
         */
        zhushu_rx4zu6:  function () {
            var erChongHaoArr = [], tempArr = [], nowArr = [];
            $.each($(".recl-1006-zux6 ul li[data-name = '二重号'] span.acti"), function (index, value) {
                erChongHaoArr.push($.trim($(this).find("i").html()));
            });
            if (erChongHaoArr.length < 2) {
                return;
            }
            for (var d = 0; d < erChongHaoArr.length; d++) {
                for (var n = 0; n < erChongHaoArr.length; n++) {
                    if (erChongHaoArr[d] != erChongHaoArr[n]) {
                        var arr = [];
                        arr.push(erChongHaoArr[d]);
                        arr.push(erChongHaoArr[n]);
                        arr.sort();
                        tempArr.push(arr.join(""));
                    }
                }
            }
            tempArr = tempArr.uniqueArr();
            var zhushu = tempArr.length;
            var shu = $("#positioninfo-zux6").html();
            var lengthArr = zhushu * shu;
            return lengthArr;
        },

        /**
         * 注数-组选12
         */
        zhushu_rx4zu12:function () {
            var erChongHaoArr = [], danHaoArr = [], tempArr = [], nowArr = [];
            $.each($(".recl-1005-zux12 ul li[data-name = '二重号'] span.acti"), function (index, value) {
                erChongHaoArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1005-zux12 ul li[data-name = '单号'] span.acti"), function (index, value) {
                danHaoArr.push($.trim($(this).find("i").html()));
            });

            if (danHaoArr.length < 2 && erChongHaoArr.length < 1) {
                return;
            }
            //单号两两组合一共有若干对
            for (var d = 0; d < danHaoArr.length; d++) {
                for (var n = 0; n < danHaoArr.length; n++) {
                    if (danHaoArr[d] != danHaoArr[n]) {
                        var arr = [];
                        arr.push(danHaoArr[d]);
                        arr.push(danHaoArr[n]);
                        arr.sort();
                        tempArr.push(arr.join(""));
                    }
                }
            }
            tempArr = tempArr.uniqueArr();

            for (var i = 0; i < erChongHaoArr.length; i++) {
                for (var m = 0; m < tempArr.length; m++) {
                    var onestr = (tempArr[m].toString()).substr(0, 1);
                    var twostr = (tempArr[m].toString()).substr(1, 1);
                    if (parseInt(onestr) != erChongHaoArr[i] && parseInt(twostr) != erChongHaoArr[i]) {
                        var arr = [];
                        arr.push(onestr);
                        arr.push(twostr);
                        arr.sort();
                        nowArr.push(erChongHaoArr[i] + "" + arr.join(""));
                    }
                }
            }
            nowArr = nowArr.uniqueArr();
            var zhushu = nowArr.length;
            var shu = $("#positioninfo-zux12").html();
            var lengthArr = zhushu * shu;
            return lengthArr;
        },
        /**
         * 注数-组选24
         */
        zhushu_rx4zu24: function () {
            var fuShiArr = [], newArr = [];
            $.each($(".recl-1004-zux24 ul li[data-name = '组选24'] span.acti"), function (index, value) {
                fuShiArr.push($.trim($(this).find("i").html()));
            });
            var zlLength = fuShiArr.length;
            if (zlLength < 4) {
                return 0;
            }

            for (var n1 = 0; n1 < fuShiArr.length; n1++) {
                for (var n2 = 0; n2 < fuShiArr.length; n2++) {
                    for (var n3 = 0; n3 < fuShiArr.length; n3++) {
                        for (var n4 = 0; n4 < fuShiArr.length; n4++) {
                            if (fuShiArr[n1] != fuShiArr[n2] && fuShiArr[n1] != fuShiArr[n3] && fuShiArr[n1] != fuShiArr[n4] && fuShiArr[n2] != fuShiArr[n3] && fuShiArr[n2] != fuShiArr[n4] && fuShiArr[n3] != fuShiArr[n4]) {
                                var arr = [];
                                arr.push(fuShiArr[n1]);
                                arr.push(fuShiArr[n2]);
                                arr.push(fuShiArr[n3]);
                                arr.push(fuShiArr[n4]);
                                arr.sort();
                                newArr.push(arr.join(""));
                            }
                        }
                    }
                }
            }
            newArr = newArr.uniqueArr();
            var zhushu = newArr.length;
            var shu = $("#positioninfo-zux24").html();
            var lengthArr = zhushu * shu;
            return lengthArr;
        },

        /**
         * 注数-直选单式
         */
        zhushu_rx4zxds: function () {
            var tempArr = [];
            var textStr = $(".recl-1003-zxds .content_jiang .content_tex").val();
            var newArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 4) {
                    newArr.push(arr_new[i]);
                }
            }

            var temp = newArr.length;
            var shu = $("#positioninfo-ds").html();
            return temp * shu;
        },

        /**
         * 注数-直选复式
         */
        zhushu_rx4zxfs: function () {
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];
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

            var numArr = [];
            var indexArr = [wanArr, qianArr, baiArr, shiArr, geArr];

            if (wanArr.length > 0) {
                numArr.push(0);
            }
            if (qianArr.length > 0) {
                numArr.push(1);
            }
            if (baiArr.length > 0) {
                numArr.push(2);
            }
            if (shiArr.length > 0) {
                numArr.push(3);
            }
            if (geArr.length > 0) {
                numArr.push(4);
            }

            if (numArr.length < 4) {
                return 0;
            }

            var tmpArr = getFlagArrs(numArr, 4);
            var result = 0;
            $.each(tmpArr, function (index, value) {
                var tmpResult = 0;
                var tmpIndexArr = value.split(" ");
                $.each(tmpIndexArr, function (index2, value2) {
                    tmpResult = tmpResult == 0 ? 1 : tmpResult;
                    tmpResult *= indexArr[parseInt(value2)].length;

                });
                result += tmpResult;
            });
            return result;
        },
        /**
         * 任选4-组选4
         */
        suiji_rx4zu4:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkStrArr = [], checkArr = [];
        var arrZux4 = [], str1 = '', str2 = '';
        while (arrZux4.length < 1) {
            var x1 = parseInt(Math.random() * 10);
            var x2 = parseInt(Math.random() * 10);
            if (x1 != x2) {
                arrZux4.push("三重号: (" + x1 + "), 单号: (" + x2 + ")");
                str1 = x1;
                str2 = x2;
            }
        }

        //选取选中checkbox
        $.each($(".re-select-zux4 input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }

        var shu = $("#positioninfo-zux4").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任四组选-组选4";
        showContent = arrZux4.join("");
        betContent = checkStrArr.join(',') + "|" + str1 + "|" + str2;
        betZhushu = shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        }
    },

    /**
     * 任选4-组选6
     */
    suiji_rx4zu6:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkStrArr = [], checkArr = [];
        var arrZux6 = [];
        var str1 = '', str2 = '';
        ;
        while (arrZux6.length < 1) {
            var x1 = parseInt(Math.random() * 10);
            var x2 = parseInt(Math.random() * 10);
            if (x1 != x2) {
                arrZux6.push("二重号: (" + x1 + "," + x2 + ")");
                str1 = x1;
                str2 = x2;
            }
        }

        //选取选中checkbox
        $.each($(".re-select-zux6 input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }

        var shu = $("#positioninfo-zux6").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任四组选-组选6";
        showContent = arrZux6.join("");
        betContent = checkStrArr.join(',') + "|" + str1 + "," + str2;
        betZhushu = shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选4-组选12
     */
    suiji_rx4zu12: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkStrArr = [], checkArr = [];
        var arrZux12 = [];
        var str1 = '', str2 = '';
        while (arrZux12.length < 1) {
            var x1 = parseInt(Math.random() * 10);
            var x2 = parseInt(Math.random() * 10);
            var x3 = parseInt(Math.random() * 10);
            if (x1 != x2 && x1 != x3 && x2 != x3) {
                arrZux12.push("二重号: (" + x1 + "), " + "单号: (" + x2 + "," + x3 + ")");
                str1 = x1;
                str2 = x2 + "," + x3;
            }
        }

        //选取选中checkbox
        $.each($(".re-select-zux12 input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }

        var shu = $("#positioninfo-zux12").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任四组选-组选12";
        showContent = arrZux12.join("");
        betContent = checkStrArr.join(',') + "|" + str1 + "|" + str2;
        betZhushu = shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选4-组选24
     */
    suiji_rx4zu24:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkStrArr = [], checkArr = [];
        var arrZu6 = [];
        var arrZux24 = [];
        while (arrZux24.length < 1) {
            var x1 = parseInt(Math.random() * 10);
            var x2 = parseInt(Math.random() * 10);
            var x3 = parseInt(Math.random() * 10);
            var x4 = parseInt(Math.random() * 10);
            if (x1 != x2 && x1 != x3 && x1 != x4 && x2 != x3 && x2 != x4 && x3 != x4) {
                arrZux24.push(x1 + "," + x2 + "," + x3 + "," + x4);
            }
        }

        //选取选中checkbox
        $.each($(".re-select-zux24 input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }

        var shu = $("#positioninfo-zux24").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任四组选-组选24";
        showContent = "组选24: (" + arrZux24.join("") + ")";
        betContent = checkStrArr.join(',') + "|" + arrZux24.join(",");
        betZhushu = shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选4-直选单式
     */
    suiji_rx4zxds:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkStrArr = [], checkArr = [];
        var arrZu6 = [];
        while (arrZu6.length < 1) {
            var x1 = parseInt(Math.random() * 10);
            var x2 = parseInt(Math.random() * 10);
            var x3 = parseInt(Math.random() * 10);
            var x4 = parseInt(Math.random() * 10);
            arrZu6.push(x1 + "" + x2 + "" + x3 + "" + x4);

        }
        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }

        var shu = $("#positioninfo-ds").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任四直选-直选单式";
        showContent = "号码: (" + arrZu6[0] + ")";
        betContent = checkStrArr.join(',') + "|" + arrZu6[0];
        betZhushu = shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选4-直选复式
     */
    suiji_rx4zxfs: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var arr = [];

        while (arr.length < 5) {
            var num1 = parseInt(Math.random() * 10);
            arr.push(num1);
        }

        showPlayName = "任四直选-直选复式";
        showContent = "万位: " + arr[0] + " 千位: " + arr[1] + " 百位: " + arr[2] + " 十位: " + arr[3] + " 个位: " + arr[4];
        betContent = arr[0] + '|' + arr[1] + '|' + arr[2] + '|' + arr[3] + '|' + arr[4];
        betZhushu = 5;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },
        /**
         * 任选4-组选4
         */
        content_rx4zu4:function () {
        var sanChongHaoArr = [], danHaoArr = [];
        var checkStrArr = [], checkArr = [];

        $.each($(".recl-1007-zux4 ul li[data-name = '三重号'] span.acti"), function (index, value) {
            sanChongHaoArr.push($.trim($(this).find("i").html()));
        });

        $.each($(".recl-1007-zux4 ul li[data-name = '单号'] span.acti"), function (index, value) {
            danHaoArr.push($.trim($(this).find("i").html()));
        });

        $(".re-select-zux4 input[name='position_zux4']:checked").each(function () {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任四组选-组选4";
        showContent = "三重号: (" + sanChongHaoArr.join(",") + "), " + "单号: (" + danHaoArr.join(",") + ")";
        betContent = checkStrArr.join(',') + "|" + sanChongHaoArr.join(",") + "|" + danHaoArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },

    /**
     * 任选4-组选6
     */
    content_rx4zu6:function () {
        var erChongHaoArr = [];
        var checkStrArr = [], checkArr = [];
        $.each($(".recl-1006-zux6 ul li[data-name = '二重号'] span.acti"), function (index, value) {
            erChongHaoArr.push($.trim($(this).find("i").html()));
        });

        $(".re-select-zux6 input[name='position_zux6']:checked").each(function () {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任四组选-组选6";
        showContent = "二重号: (" + erChongHaoArr.join(",") + ")";
        betContent = checkStrArr.join(',') + "|" + erChongHaoArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },

    /**
     * 任选4-组选12
     */
    content_rx4zu12: function () {
        var erChongHaoArr = [], danHaoArr = [];
        var checkStrArr = [], checkArr = [];
        $.each($(".recl-1005-zux12 ul li[data-name = '二重号'] span.acti"), function (index, value) {
            erChongHaoArr.push($.trim($(this).find("i").html()));
        });

        $.each($(".recl-1005-zux12 ul li[data-name = '单号'] span.acti"), function (index, value) {
            danHaoArr.push($.trim($(this).find("i").html()));
        });

        $(".re-select-zux12 input[name='position_zux12']:checked").each(function () {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任四组选-组选12";
        showContent = "二重号: (" + erChongHaoArr.join(",") + "), " + "单号: (" + danHaoArr.join(",") + ")";
        betContent = checkStrArr.join(',') + "|" + erChongHaoArr.join(",") + "|" + danHaoArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },

    /**
     * 任选4-组选24
     */
    content_rx4zu24:function () {
        var zu24Arr = [];
        var checkArr = [], checkStrArr = [];
        $.each($(".recl-1004-zux24 ul li[data-name = '组选24'] span.acti"), function (index, value) {
            zu24Arr.push($.trim($(this).find("i").html()));
        });

        $(".re-select-zux24 input[type='checkbox']:checked").each(function () {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任四组选-组选24";
        showContent = "组选24: (" + zu24Arr.join(",") + ")";
        betContent = checkStrArr.join(',') + "|" + zu24Arr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },

    /**
     * 任选4-组选24cyd
     */
    content_gd11x5_rxsizs: function () {
        var zu24Arr = [];
        $.each($(".recl-1002 ul li[data-name = '选4中4'] span.acti"), function (index, value) {
            zu24Arr.push($.trim($(this).find("i").html()));
        });

        if (zu24Arr.length < 4) {
            alert("[选四中四]至少需要选择4个位置");
            return -1;
        }
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任选复式-4中4";
        showContent = "任选复式-4中4: (" + zu24Arr.join(",") + ")";
        betContent = zu24Arr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    }
,
    /**
     * 任选4-组选24cyd
     */
    content_gd11x5_rxwzw: function () {
        var zu24Arr = [];
        $.each($(".recl-1002 ul li[data-name = '选5中5'] span.acti"), function (index, value) {
            zu24Arr.push($.trim($(this).find("i").html()));
        });

        if (zu24Arr.length < 5) {
            alert("[选5中5]至少需要选择5个位置");
            return -1;
        }
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任选复式-5中5";
        showContent = "任选复式-5中5: (" + zu24Arr.join(",") + ")";
        betContent = zu24Arr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },


        content_gd11x5_rxlzw:  function () {
        var zu24Arr = [];
        $.each($(".recl-1002 ul li[data-name = '选6中5'] span.acti"), function (index, value) {
            zu24Arr.push($.trim($(this).find("i").html()));
        });

        if (zu24Arr.length < 6) {
            alert("[选6中5]至少需要选择6个位置");
            return -1;
        }
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任选复式-6中5";
        showContent = "任选复式-6中5: (" + zu24Arr.join(",") + ")";
        betContent = zu24Arr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },

        content_gd11x5_rxqzw:  function () {
        var zu24Arr = [];
        $.each($(".recl-1002 ul li[data-name = '选7中5'] span.acti"), function (index, value) {
            zu24Arr.push($.trim($(this).find("i").html()));
        });

        if (zu24Arr.length < 7) {
            alert("[选7中5]至少需要选择7个位置");
            return -1;
        }
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任选复式-7中5";
        showContent = "任选复式-7中5: (" + zu24Arr.join(",") + ")";
        betContent = zu24Arr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },

        content_gd11x5_rxbzw: function () {
        var zu24Arr = []
        $.each($(".recl-1002 ul li[data-name = '选8中5'] span.acti"), function (index, value) {
            zu24Arr.push($.trim($(this).find("i").html()));
        });

        if (zu24Arr.length < 8) {
            alert("[选8中5]至少需要选择8个位置");
            return -1;
        }
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任选复式-8中5";
        showContent = "任选复式-8中5: (" + zu24Arr.join(",") + ")";
        betContent = zu24Arr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },


    /**
     * 任选4-直选单式
     */
    content_rx4zxfs:   function () {
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

        var wanStr = wanArr.length > 0 ? ("万位: " + wanArr.join("")) : '';
        var qianStr = qianArr.length > 0 ? (" 千位: " + qianArr.join("")) : '';
        var baiStr = baiArr.length > 0 ? (" 百位: " + baiArr.join("")) : '';
        var shiStr = shiArr.length > 0 ? (" 十位: " + shiArr.join("")) : '';
        var geStr = geArr.length > 0 ? (" 个位: " + geArr.join("")) : '';

        var strTemp = $.trim(
            (wanStr == ' ' ? ' ' : wanArr.join(",") + "|") +
            (qianStr == ' ' ? ' ' : qianArr.join(",") + "|") +
            (baiStr == ' ' ? ' ' : baiArr.join(",") + "|") +
            (shiStr == ' ' ? ' ' : shiArr.join(",") + "|") +
            (geStr == ' ' ? ' ' : geArr.join(","))
        );

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任四直选-直选复式";
        showContent = $.trim(wanStr + qianStr + baiStr + shiStr + geStr);
        betContent = strTemp;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },
    /**
     * 任选4-直选单式
     */
    content_rx4zxds:  function () {
        var errorStr = '';
        var repeatArr = [], allErrorArr = [];
        var errorArr = [];
        var checkArr = [], checkStrArr = [];
        var textStr = $(".recl-1003-zxds .content_jiang .content_tex").val();
        var newArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 4) {
                newArr.push(arr_new[i]);
            } else {
                if (arr_new[i] != "") {
                    errorArr.push(arr_new[i]);
                }
            }
        }

        // repeatArr = newArr.duplicateNew(); //重复号码
        // newArr = newArr.uniqueArr();
        var arrTemp = [];
        $(".re-select-ds input[type='checkbox']:checked").each(function () {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 4) {
            alert("[任选四]至少需要选择4个位置");
            return -1;
        }

        if (newArr.length <= 0) {
            return 0;
        }

        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        // if (repeatArr.length > 0) {
        //     allErrorArr.push("自动过滤重复号码:");
        //     for(var r = 0; r < repeatArr.length; r++){
        //         allErrorArr.push(repeatArr[r]);
        //     }
        // }
        if (errorArr.length > 0) {
            allErrorArr.push(" 被过滤掉的错误号码");
            for (var l = 0; l < errorArr.length; l++) {
                allErrorArr.push(errorArr[l]);
            }
        }

        if (allErrorArr.length > 0) {
            for (var e = 0; e < allErrorArr.length; e++) {
                errorStr += allErrorArr[e] + " ";
            }
            alert(errorStr);
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任四直选-直选单式";
        showContent = "号码: (" + newArr.join(",") + ")";
        betContent = checkStrArr.join(',') + "|" + newArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        }
    },
        //获取下注号码
        getBetNum:function(betNum) {
            return betNum;
        }


})
});