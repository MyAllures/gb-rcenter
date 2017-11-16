/**
 * 跨度
 */
define(['site/hall/ssc/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },
        zhushu_rx3zuxhz: function () {
        var hzArr = [];
        $.each($(".recl-1010-zuxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });

        if (hzArr.length <= 0) {
            return 0;
        }

        var newArr = [];
        for (var i = 0; i < hzArr.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    for (var y1 = 0; y1 < 10; y1++) {
                        if (x + y + y1 == hzArr[i] && !(x == y && x == y1 && y == y1)) {
                            var arr = [];
                            arr.push(x);
                            arr.push(y);
                            arr.push(y1);
                            arr.sort();
                            newArr.push(arr.join(""));
                        }
                    }
                }
            }
        }

        newArr = newArr.uniqueArr();
        var zhushu = newArr.length;
        var shu = $("#positioninfo-zuxhz").html();
        var lengthArr = zhushu * shu;
        return lengthArr;
    },

    /**
     * 注数-混合组合
     */
    zhushu_rx3hhzux: function () {
        var zhushu = 0;
        var arrTemp = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-hhzux input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        var textStr = $(".recl-1009-hhzux .content_jiang .content_tex").val();
        var newArr = [], tempArr = [], errorStr = '', errorArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            }
        }
        for (var n = 0; n < newArr.length; n++) {
            var arr = [];
            var temp = newArr[n].toString();
            var oneStr = temp.substr(0, 1);
            var twoStr = temp.substr(1, 1);
            var threeStr = temp.substr(2, 1);
            arr.push(oneStr);
            arr.push(twoStr);
            arr.push(threeStr);
            arr.sort();
            if (!(twoStr == threeStr && oneStr == threeStr && twoStr == oneStr)) {
                tempArr.push(arr.join(""));
            }
        }
        tempArr = tempArr.uniqueArr(); // 去掉重复号码

        zhushu = tempArr.length;
        var tempNum = $("#positioninfo-hhzux").html();
        zhushu = tempNum * zhushu;
        return zhushu;
    },

    /**
     * 注数-组六单式
     */
    zhushu_rx3z6ds: function () {
        var zhushu = 0;
        var arrTemp = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zu6ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        var textStr = $(".recl-1008-zu6ds .content_jiang .content_tex").val();
        var newArr = [], tempArr = [], errorStr = '', errorArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            }
        }
        for (var n = 0; n < newArr.length; n++) {
            var arr = [];
            var temp = newArr[n].toString();
            var oneStr = temp.substr(0, 1);
            var twoStr = temp.substr(1, 1);
            var threeStr = temp.substr(2, 1);
            arr.push(oneStr);
            arr.push(twoStr);
            arr.push(threeStr);
            arr.sort();
            if (twoStr != threeStr && oneStr != threeStr && twoStr != oneStr) {
                tempArr.push(arr.join(""));
            }
        }

        zhushu = tempArr.length;
        var tempNum = $("#positioninfo-zu6ds").html();
        zhushu = tempNum * zhushu;
        return zhushu;
    },

    /**
     * 注数-组六复式
     */
    zhushu_rx3z6fs:  function () {
        var fuShiArr = [], newArr = [];
        $.each($(".recl-1007-zu6fs ul li[data-name = '组六'] span.acti"), function (index, value) {
            fuShiArr.push($.trim($(this).find("i").html()));
        });
        var zlLength = fuShiArr.length;
        if (zlLength < 3) {
            return 0;
        }

        newArr = this.getZuLiuNewArrs(fuShiArr);
        var zhushu = newArr.length;
        var shu = $("#positioninfo-zu6fs").html();
        var lengthArr = zhushu * shu;
        return lengthArr;
    },

    /**
     * 注数-组三单式
     */
    zhushu_rx3z3ds:    function () {
        var zhushu = 0;
        var repeatArr = [], allErrorArr = [];
        var errorArr = [], arrTemp = [];
        var textStr = $(".recl-1006-zu3ds .content_jiang .content_tex").val();
        var newArr = [], tempArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));

        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zu3ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        var arr_new = textStr.split(",");

        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            } else {
                errorArr.push(arr_new[i]);
            }
        }

        for (var n = 0; n < newArr.length; n++) {
            var arr = [];
            var temp = newArr[n].toString();
            var oneStr = temp.substr(0, 1);
            var twoStr = temp.substr(1, 1);
            var threeStr = temp.substr(2, 1);
            arr.push(oneStr);
            arr.push(twoStr);
            arr.push(threeStr);
            arr.sort();
            if (oneStr == twoStr && twoStr != threeStr || twoStr == threeStr && oneStr != threeStr || threeStr == oneStr && twoStr != oneStr) {
                tempArr.push(arr.join(""));
            } else {
                errorArr.push(newArr[n]);
            }
        }

        zhushu = tempArr.length;
        var tempNum = $("#positioninfo-zu3ds").html();
        zhushu = tempNum * zhushu;
        return zhushu;
    },

    /**
     * 注数-组三复式
     */
    zhushu_rx3z3fs:  function () {
        var zuArr = [];
        $.each($(".recl-1005-zu3fs ul li[data-name = '组三'] span.acti"), function (index, value) {
            zuArr.push($.trim($(this).find("i").html()));
        });
        var tempArr = [];
        for (var i = 0; i < zuArr.length; i++) {
            for (var i1 = 0; i1 < zuArr.length; i1++) {
                if (zuArr[i] != zuArr[i1]) {
                    tempArr.push(zuArr[i] + "" + zuArr[i1]);
                }
            }

        }
        var shu = $("#positioninfo-zu3fs").html();
        var lengthArr = tempArr.length * shu;
        return lengthArr;
    },

    /**
     * 注数-直选和值
     */
    zhushu_rx3zxhz:function () {
        var hzArr = [];
        $.each($(".recl-1004-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });

        if (hzArr.length <= 0) {
            return 0;
        }

        var newArr = [];
        for (var i = 0; i < hzArr.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    for (var y1 = 0; y1 < 10; y1++) {
                        if (x + y + y1 == hzArr[i]) {
                            newArr.push(x + "" + y + "" + y1);
                        }
                    }
                }
            }
        }

        var zhushu = newArr.length;
        var shu = $("#positioninfo-hz").html();
        var lengthArr = zhushu * shu;
        return lengthArr;
    },

    /**
     * 注数-直选单式
     */
    zhushu_rx3zxds:    function () {
        var errorStr = '';
        var allErrorArr = [];
        var errorArr = [];
        var newArr = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        var textStr = $(".recl-1003-zxds .content_jiang .content_tex").val();
        var shu = $("#positioninfo-ds").html();
        var zhushu = 0;

        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));

        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            }
        }

        var temp = newArr.length;
        zhushu = temp * shu;
        return zhushu;
    },

    /**
     * 注数-直选复式
     */
    zhushu_rx3zxfs:  function () {
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

        if (numArr.length < 3) {
            return 0;
        }

        var tmpArr = getFlagArrs(numArr, 3);
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
         * 任选3-组选和值
         */
        suiji_rx3zuxhz: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var hzArr = [], checkStrArr = [], checkArr = [];

        while (hzArr.length < 1) {
            var num1 = parseInt(Math.random() * 26) + 1;
            hzArr.push(num1);
        }
        var newArr = [];
        for (var i = 0; i < hzArr.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    for (var y1 = 0; y1 < 10; y1++) {
                        if (x + y + y1 == hzArr[i] && !(x == y && x == y1 && y == y1)) {
                            var arr = [];
                            arr.push(x);
                            arr.push(y);
                            arr.push(y1);
                            arr.sort();
                            newArr.push(arr.join(""));
                        }
                    }
                }
            }
        }
        newArr = newArr.uniqueArr();
        //选取选中checkbox
        $.each($(".re-select-zuxhz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-zuxhz").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三组选-组选和值";
        showContent = "号码: (" + hzArr[0] + ")";
        betContent = checkStrArr.join(',') + "|" + hzArr[0];
        betZhushu = newArr.length * shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    }
,
    /**
     * 任选3-混合组选
     */
    suiji_rx3hhzux:function () {
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
            if (!(x1 == x2 && x2 == x3 && x3 == x2)) {
                arrZu6.push(x1 + "" + x2 + "" + x3);
            }
        }
        //选取选中checkbox
        $.each($(".re-select-hhzux input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-hhzux").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-混合组选";
        showContent = "号码: (" + arrZu6[0] + ")";
        betContent = checkStrArr.join(',') + "|" + arrZu6.join(',');
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
     * 任选3-组六单式
     */
    suiji_rx3z6ds:  function () {
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
            if (x1 != x2 && x2 != x3 && x3 != x2) {
                arrZu6.push(x1 + "" + x2 + "" + x3);
            }
        }
        //选取选中checkbox
        $.each($(".re-select-zu6ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-zu6ds").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-组六单式";
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
     * 任选3-组六复式
     */
    suiji_rx3z6fs:  function () {
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
            if (x1 != x2 && x2 != x3 && x3 != x2) {
                arrZu6.push(x1 + "," + x2 + "," + x3);
            }
        }
        //选取选中checkbox
        $.each($(".re-select-zu6fs input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-zu6fs").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-组六复式";
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
     * 任选3-组三单式
     */
    suiji_rx3z3ds:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var arrZu3ds = [];
        var checkStrArr = [], checkArr = [];
        while (arrZu3ds.length < 1) {
            var num1 = parseInt(Math.random() * 10);
            var num2 = parseInt(Math.random() * 10);
            var num3 = parseInt(Math.random() * 10);
            if (num1 == num2 && num2 != num3 || num2 == num3 && num3 != num1 || num3 == num1 && num1 != num2) {
                arrZu3ds.push(num1 + "" + num2 + "" + num3);
            }
        }
        //选取选中checkbox
        $.each($(".re-select-zu3ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-zu3ds").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-组三单式";
        showContent = "号码: (" + arrZu3ds[0] + ")";
        betContent = checkStrArr.join(',') + "|" + arrZu3ds[0];
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
     * 任选3-组三复式
     */
    suiji_rx3z3fs:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var arr = [];
        var checkStrArr = [], checkArr = [];

        while (arr.length < 2) {
            var num1 = parseInt(Math.random() * 10);
            var num2 = parseInt(Math.random() * 10);
            if (num1 != num2) {
                arr.push(num1);
                arr.push(num2);
            }

        }
        var tempArr = [];
        for (var i = 0; i < arr.length; i++) {
            for (var i1 = 0; i1 < arr.length; i1++) {
                if (arr[i] != arr[i1]) {
                    tempArr.push(arr[i] + "" + arr[i1]);
                }
            }

        }
        //选取选中checkbox
        $.each($(".recl-1005-zu3Rx3 input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-zu3fs").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-组三复式";
        showContent = "号码: (" + arr[0] + "," + arr[1] + ")";
        betContent = checkStrArr.join(',') + "|" + arr[0] + "," + arr[1];
        betZhushu = tempArr.length * shu;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选3-直选和值
     */
    suiji_rx3zxhz: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var hzArr = [], checkStrArr = [], checkArr = [];

        while (hzArr.length < 1) {
            var num1 = parseInt(Math.random() * 28);
            hzArr.push(num1);
        }
        var newArr = [];
        for (var i = 0; i < hzArr.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    for (var y1 = 0; y1 < 10; y1++) {
                        if (x + y + y1 == hzArr[i]) {
                            newArr.push(x + "" + y + "" + y1);
                        }
                    }
                }
            }
        }

        //选取选中checkbox
        $.each($(".recl-1004-zxhz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-hz").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-直选和值";
        showContent = "号码: (" + hzArr[0] + ")";
        betContent = checkStrArr.join(',') + "|" + hzArr[0];
        betZhushu = shu * newArr.length;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },


    /**
     * 任选3-直选单式
     */
    suiji_rx3zxds:  function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var arr = [], checkStrArr = [], checkArr = [];

        while (arr.length < 3) {
            var num1 = parseInt(Math.random() * 10);
            arr.push(num1);
        }
        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        var shu = $("#positioninfo-ds").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-直选复式";
        showContent = "号码: (" + arr[0] + "" + arr[1] + "" + arr[2] + ")";
        betContent = checkStrArr.join(',') + "|" + arr[0] + "" + arr[1] + "" + arr[2];
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
     * 任选3-直选复式
     */
    suiji_rx3zxfs: function () {
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

        showPlayName = "任三直选-直选复式";
        showContent = "万位: " + arr[0] + " 千位: " + arr[1] + " 百位: " + arr[2] + " 十位: " + arr[3] + " 个位: " + arr[4];
        betContent = arr[0] + "|" + arr[1] + "|" + arr[2] + "|" + arr[3] + "|" + arr[4];
        betZhushu = 10;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },
        /**
         * 任选3-组选和值
         */
        content_rx3zuxhz:  function () {
        var hzArr = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zuxhz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        $.each($(".recl-1010-zuxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        })

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        showPlayName = "任三直选-组选和值";
        showContent = "号码: (" + hzArr.join(",") + ")";
        betContent = checkStrArr.join(',') + "|" + hzArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选3-混合组选
     */
    content_rx3hhzux:   function () {
        var errorStr = '', zhushu = 0;
        var repeatArr = [], allErrorArr = [];
        var errorArr = [], arrTemp = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-hhzux input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        var textStr = $(".recl-1009-hhzux .content_jiang .content_tex").val();
        var newArr = [], tempArr = [], errorStr = '', errorArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            } else {
                if(arr_new[i] != ''){
                    errorArr.push(arr_new[i]);
                }
            }
        }
        for (var n = 0; n < newArr.length; n++) {
            var arr = [];
            var temp = newArr[n].toString();
            var oneStr = temp.substr(0, 1);
            var twoStr = temp.substr(1, 1);
            var threeStr = temp.substr(2, 1);
            arr.push(oneStr);
            arr.push(twoStr);
            arr.push(threeStr);
            arr.sort();
            if (twoStr == threeStr && oneStr == threeStr && twoStr == oneStr) {
                errorArr.push(newArr[n]);
            } else {
                tempArr.push(arr.join(""));
            }
        }
        repeatArr = tempArr.duplicate(); //重复号码
        tempArr = tempArr.uniqueArr(); // 去掉重复号码

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        if (repeatArr.length > 0) {
            allErrorArr.push("自动过滤重复号码:");
            for (var r = 0; r < repeatArr.length; r++) {
                allErrorArr.push(repeatArr[r]);
            }
        }

        if (errorArr.length > 0) {
            allErrorArr.push(" 被过滤掉的错误号码:");
            for (var l = 0; l < errorArr.length; l++) {
                allErrorArr.push(errorArr[l]);
            }
        }

        if (allErrorArr.length > 0) {
            for (var e = 0; e < allErrorArr.length; e++) {
                errorStr += allErrorArr[e] + " ";
            }
            alert($.trim(errorStr));
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任三组选-混合组选";
        showContent = "号码: (" + tempArr.join(',') + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + tempArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    }
,
    /**
     * 任选3-组六单式
     */
    content_rx3z6ds:  function () {
        var errorStr = '', zhushu = 0;
        var repeatArr = [], allErrorArr = [];
        var errorArr = [], arrTemp = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zu6ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        var textStr = $(".recl-1008-zu6ds .content_jiang .content_tex").val();
        var newArr = [], tempArr = [], errorStr = '', errorArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            } else {
                if (arr_new[i] != "") {
                    errorArr.push(arr_new[i]);
                }
            }
        }
        for (var n = 0; n < newArr.length; n++) {
            var arr = [];
            var temp = newArr[n].toString();
            var oneStr = temp.substr(0, 1);
            var twoStr = temp.substr(1, 1);
            var threeStr = temp.substr(2, 1);
            arr.push(oneStr);
            arr.push(twoStr);
            arr.push(threeStr);
            arr.sort();
            if (twoStr != threeStr && oneStr != threeStr && twoStr != oneStr) {
                tempArr.push(arr.join(""));
            } else {
                errorArr.push(newArr[n]);
            }
        }

        // repeatArr = tempArr.duplicateNew().uniqueArr(); //重复号码
        // tempArr = tempArr.uniqueArr(); // 去掉重复号码

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        if (tempArr.length <= 0) {
            return 0;
        }

        // if (repeatArr.length > 0) {
        //     allErrorArr.push("自动过滤重复号码:");
        //     for (var r = 0; r < repeatArr.length; r++) {
        //         allErrorArr.push(repeatArr[r]);
        //     }
        // }
        if (errorArr.length > 0) {
            allErrorArr.push(" 被过滤掉的错误号码:");
            for (var l = 0; l < errorArr.length; l++) {
                allErrorArr.push(errorArr[l]);
            }
        }

        if (allErrorArr.length > 0) {
            for (var e = 0; e < allErrorArr.length; e++) {
                errorStr += allErrorArr[e] + " ";
            }
            alert($.trim(errorStr));
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任三组选-组六单式";
        showContent = "号码: (" + tempArr.join(',') + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + tempArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选3-组六复式
     */
    content_rx3z6fs: function () {
        var zuArr = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zu6fs input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        $.each($(".recl-1007-zu6fs ul li[data-name = '组六'] span.acti"), function (index, value) {
            zuArr.push($.trim($(this).find("i").html()));
        });

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任三组选-组六复式";
        showContent = "号码: (" + zuArr.join(",") + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + zuArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选3-组三单式
     */
    content_rx3z3ds:   function () {
        var errorStr = '', zhushu = 0;
        var repeatArr = [], allErrorArr = [];
        var errorArr = [], arrTemp = [];
        var textStr = $(".recl-1006-zu3ds .content_jiang .content_tex").val();
        var newArr = [], tempArr = [], errorStr = '', errorArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));

        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zu3ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        var arr_new = textStr.split(",");

        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            } else {
                if (arr_new[i] != "") {
                    errorArr.push(arr_new[i]);
                }
            }
        }

        for (var n = 0; n < newArr.length; n++) {
            var arr = [];
            var temp = newArr[n].toString();
            var oneStr = temp.substr(0, 1);
            var twoStr = temp.substr(1, 1);
            var threeStr = temp.substr(2, 1);
            arr.push(oneStr);
            arr.push(twoStr);
            arr.push(threeStr);
            arr.sort();
            if (oneStr == twoStr && twoStr != threeStr || twoStr == threeStr && oneStr != threeStr || threeStr == oneStr && twoStr != oneStr) {
                tempArr.push(arr.join(""));
            } else {
                errorArr.push(newArr[n]);
            }
        }
        // repeatArr = tempArr.duplicateNew().uniqueArr(); //重复号码
        // tempArr = tempArr.uniqueArr(); // 去掉重复号码

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        if (tempArr.length <= 0) {
            return 0;
        }

        // if (repeatArr.length > 0) {
        //     allErrorArr.push("自动过滤重复号码:");
        //     for (var r = 0; r < repeatArr.length; r++) {
        //         allErrorArr.push(repeatArr[r]);
        //     }
        // }
        if (errorArr.length > 0) {
            allErrorArr.push(" 被过滤掉的错误号码:");
            for (var l = 0; l < errorArr.length; l++) {
                allErrorArr.push(errorArr[l]);
            }
        }

        if (allErrorArr.length > 0) {
            for (var e = 0; e < allErrorArr.length; e++) {
                errorStr += allErrorArr[e] + " ";
            }
            alert($.trim(errorStr));
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任三组选-组三单式";
        showContent = "号码: (" + tempArr.join(',') + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + tempArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选3-组三复式
     */
    content_rx3z3fs:   function () {
        var zuArr = [], arrTemp = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".recl-1005-zu3Rx3 input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        $.each($(".recl-1005-zu3fs ul li[data-name = '组三'] span.acti"), function (index, value) {
            zuArr.push($.trim($(this).find("i").html()));
        });

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任三组选-组三复式";
        showContent = "号码: (" + zuArr.join(",") + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + zuArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选3-直选和值
     */
    content_rx3zxhz:  function () {
        var hzArr = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".recl-1004-hz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        $.each($(".recl-1004-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });

        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任三直选-直选和值";
        showContent = "号码: (" + hzArr.join(",") + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + hzArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选3-直选单式
     */
    content_rx3zxds:function () {
        var errorStr = '';
        var repeatArr = [], allErrorArr = [];
        var errorArr = [];
        var newArr = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        var textStr = $(".recl-1003-zxds .content_jiang .content_tex").val();

        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 3) {
                newArr.push(arr_new[i]);
            } else {
                if (arr_new[i] != "") {
                    errorArr.push(arr_new[i]);
                }
            }
        }


        if (checkArr.length < 3) {
            alert("[任选三]至少需要选择3个位置");
            return -1;
        }

        if (newArr.length <= 0) {
            return 0;
        }

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

        showPlayName = "任三直选-直选单式";
        showContent = "号码: (" + newArr.join(",") + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + newArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选3-直选复式
     */
    content_rx3zxfs: function () {
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

        showPlayName = "任三直选-直选复式";
        showContent = $.trim(wanStr + qianStr + baiStr + shiStr + geStr);
        // 转换投注格式
        betContent = strTemp;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },
        //获取下注号码
        getBetNum:function(betNum) {
            return betNum;
        },
    })
});