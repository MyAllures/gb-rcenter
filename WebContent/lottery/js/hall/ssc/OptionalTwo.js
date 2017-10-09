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
         * 注数-组选和值
         */
        zhushu_rx2zuxhz:function () {
        var hzArr = [];
        $.each($(".recl-1007-zuxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });

        if (hzArr.length <= 0) {
            return 0;
        }
        var newArr = [];
        for (var i = 0; i < hzArr.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    if ((x + y) == hzArr[i] && x != y) {
                        var arr = [];
                        arr.push(x);
                        arr.push(y);
                        arr.sort();
                        newArr.push(arr.join(""));
                    }
                }
            }
        }
        newArr = newArr.uniqueArr();
        var zhushu = newArr.length;
        var shu = $("#positioninfo-zuhz").html();
        var lengthArr = zhushu * shu;
        return lengthArr;
    },

    /**
     * 注数-直选单式
     */
    zhushu_rx2zuxds: function () {
        var checkStrArr = [], checkArr = [];
        var zhushu = 0;
        //选取选中checkbox
        $.each($(".re-select-zuxds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });

        var errorStr = '';
        var repeatArr = [], allErrorArr = [];
        var errorArr = [], arrTemp = [];
        var textStr = $(".recl-1006-zuxds .content_jiang .content_tex").val();
        var newArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                var oneStr = (arr_new[i].toString()).substr(0, 1);
                var twoStr = (arr_new[i].toString()).substr(1, 1);
                var arr = [];
                arr.push(parseInt(oneStr));
                arr.push(parseInt(twoStr));
                arr.sort();
                newArr.push(arr.join(""));
            }
        }

        repeatArr = newArr.duplicateNew().uniqueArr(); //重复号码
        newArr = newArr.uniqueArr();
        var temp = newArr.length;
        var shu = $("#positioninfo-zuds").html();
        zhushu = temp * shu;
        return zhushu;
    },

    /**
     * 注数-组选复式
     */
    zhushu_rx2zuxfs:function () {
        var zuArr = [];
        var tempArr = [];
        $.each($(".recl-1005-zuxfs ul li[data-name = '组选'] span.acti"), function (index, value) {
            zuArr.push($.trim($(this).find("i").html()));
        });

        var zuLength = zuArr.length;

        if (zuLength < 2) {
            return;
        }

        for (var i = 0; i < zuArr.length; i++) {
            for (var i1 = 0; i1 < zuArr.length; i1++) {
                if (zuArr[i] != zuArr[i1]) {
                    var arr = [];
                    arr.push(zuArr[i]);
                    arr.push(zuArr[i1]);
                    arr.sort();
                    tempArr.push(arr.join(""));
                }
            }
        }

        tempArr = tempArr.uniqueArr();
        var zhushu = tempArr.length;
        var shu = $("#positioninfo-zufs").html();
        var lengthArr = zhushu * shu;
        return lengthArr;
    },

    /**
     * 注数-直选和值
     */
    zhushu_rx2zxhz:  function () {
        var hzArr = [];
        var newArr = [];
        $.each($(".recl-1004-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });

        if (hzArr.length <= 0) {
            return 0;
        }
        for (var i = 0; i < hzArr.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    if (x + y == hzArr[i]) {
                        newArr.push(x + "" + y);
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
    zhushu_rx2zxds: function () {
        var checkStrArr = [], checkArr = [];
        var textStr = $(".recl-1003-zxds .content_jiang .content_tex").val();
        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        var newArr = [], arrTemp = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                newArr.push(arr_new[i]);
            }
        }

        var temp = newArr.length;
        var shu = $("#positioninfo-ds").html();
        var zhushu = temp * shu;
        return zhushu;
    },

    /**
     * 注数-直选复式
     */
    zhushu_rx2zxfs:function () {
        var arrNew = [], tempArr = [];
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

        if (wanArr.length > 0) {
            arrNew.push(wanArr);
        }
        if (qianArr.length > 0) {
            arrNew.push(qianArr);
        }
        if (baiArr.length > 0) {
            arrNew.push(baiArr);
        }
        if (shiArr.length > 0) {
            arrNew.push(shiArr);
        }
        if (geArr.length > 0) {
            arrNew.push(geArr);
        }

        if (arrNew.length < 2) {
            return 0;
        }

        for (var i = 0; i < arrNew.length; i++) {
            for (var i1 = 0; i1 < arrNew[i].length; i1++) {
                for (var x = i + 1; x < arrNew.length; x++) {
                    for (var n = 0; n < arrNew[x].length; n++) {
                        tempArr.push(arrNew[i][i1] + "" + arrNew[x][n]);
                    }
                }
            }
        }
        return tempArr.length;

    },
        /**
         * 任选2-组选和值
         */
        suiji_rx2zuxhz:  function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var zuxhz = [];
        var checkArr = [], checkStrArr = [];
        var newArr = [];
        //选取选中checkbox
        $.each($(".re-select-zuxhz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        zuxhz.push(parseInt(Math.random() * 17) + 1);

        for (var i = 0; i < zuxhz.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    if ((x + y) == zuxhz[i] && x != y) {
                        var arr = [];
                        arr.push(x);
                        arr.push(y);
                        arr.sort();
                        newArr.push(arr.join(""));
                    }
                }
            }
        }
        newArr = newArr.uniqueArr();
        var shu = $("#positioninfo-zuhz").html();
        showPlayName = "任二直选-组选和值";
        betZhushu = newArr.length * shu;
        showContent = "号码: (" + zuxhz[0] + ")";
        betContent = checkStrArr.join(',') + "|" + zuxhz.join(',');

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选2-组选单式
     */
    suiji_rx2zuxds: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkArr = [], checkStrArr = [];
        var arr = [];

        while (arr.length < 2) {
            var num1 = parseInt(Math.random() * 10);
            var num2 = parseInt(Math.random() * 10);
            if (num1 != num2) {
                arr.push(num1);
                arr.push(num2);
            }
        }

        //选取选中checkbox
        $.each($(".re-select-zuxds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        var shu = $("#positioninfo-zuds").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        betZhushu = shu;
        showPlayName = "任二组选-组选单式";
        showContent = "号码: (" + arr[0] + "" + arr[1] + ")";
        betContent = checkStrArr.join(',') + "|" + arr[0] + "" + arr[1];
        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选2-组选复式
     */
    suiji_rx2zuxfs: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var arr = [];

        while (arr.length < 2) {
            var num1 = parseInt(Math.random() * 10);
            var num2 = parseInt(Math.random() * 10);
            if (num1 != num2) {
                arr.push(num1);
                arr.push(num2);
            }
        }
        var checkArr = [], checkStrArr = [];
        var shu = $("#positioninfo-zufs").html();
        //选取选中checkbox
        $.each($(".recl-1005-fs input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        showPlayName = "任二组选-组选复式";
        showContent = "号码: (" + arr[0] + "," + arr[1] + ")";
        betContent = checkStrArr.join(',') + "|" + arr[0] + "," + arr[1];
        betZhushu = shu;

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
     * 任选2-直选和值
     */
    suiji_rx2zxhz: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var hzsj = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".recl-1004-hz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        hzsj.push(parseInt(Math.random() * 19));
        var newArr = [];
        for (var i = 0; i < hzsj.length; i++) {
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    if (x + y == hzsj[i]) {
                        newArr.push(x + "" + y);
                    }
                }
            }
        }

        var shu = $("#positioninfo-hz").html();

        showPlayName = "任二直选-直选和值";
        betZhushu = newArr.length * shu;
        showContent = "号码: (" + hzsj[0] + ")";
        betContent = checkStrArr.join(',') + "|" + hzsj.join(',');

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
     * 任选2-直选单式
     */
    suiji_rx2zxds: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var checkArr = [], checkStrArr = [];
        var arr = [];

        while (arr.length < 2) {
            var num = parseInt(Math.random() * 10);
            arr.push(num);
        }

        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        var shu = $("#positioninfo-ds").html();
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        betZhushu = shu;
        showPlayName = "任二直选-直选单式";
        showContent = "号码: (" + arr[0] + "" + arr[1] + ")";
        betContent = checkStrArr.join(',') + "|" + arr[0] + "" + arr[1];
        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            betZhushu: betZhushu,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 任选2-直选复式
     */
    suiji_rx2zxfs:  function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';
        var betZhushu = 0;
        var tempArr = [];
        var arr = [];

        for (var i = 0; i <= 9; ++i) {
            tempArr[i] = 0;
        }

        while (arr.length < 5) {
            var num = parseInt(Math.random() * 10);
            arr.push(num);
        }

        showPlayName = "任二直选-直选复式";
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
         * 任选二-组选和值
         */
        content_rx2zuxhz:function () {
        var hzArr = [], arrTemp = [];
        var checkArr = [], checkStrArr = [];
        //选取选中checkbox
        $.each($(".re-select-zuxhz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        $.each($(".recl-1007-zuxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });

        $(".recl-1007-zuxhz input[name='position_zuxhz']:checked").each(function () {
            arrTemp.push($(this).val());
        });
        if (arrTemp.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任二组选-组选和值";
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
     * 任选二-组选单式
     */
    content_rx2zuxds: function () {
        var checkStrArr = [], checkArr = [];
        //选取选中checkbox
        $.each($(".re-select-zuxds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        var errorStr = '';
        var repeatArr = [], allErrorArr = [];
        var errorArr = [], arrTemp = [];
        var textStr = $(".recl-1006-zuxds .content_jiang .content_tex").val();
        var newArr = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                var oneStr = (arr_new[i].toString()).substr(0, 1);
                var twoStr = (arr_new[i].toString()).substr(1, 1);
                var arr = [];
                arr.push(parseInt(oneStr));
                arr.push(parseInt(twoStr));
                arr.sort();
                newArr.push(arr.join(""));
            } else {
                if (arr_new[i] != "") {
                    errorArr.push(arr_new[i]);
                }
            }
        }

        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
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

        $(".re-select-zuxds input[type='checkbox']:checked").each(function () {
            arrTemp.push($(this).val());
        });
        if (arrTemp.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任二组选-组选单式";
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
     * 任选二-组选复式
     */
    content_rx2zuxfs:  function () {
        var checkStrArr = [], checkArr = [];
        //选取选中checkbox
        $.each($(".recl-1005-fs input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        var zuArr = [], arrTemp = [];
        $.each($(".recl-1005-zuxfs ul li[data-name = '组选'] span.acti"), function (index, value) {
            zuArr.push($.trim($(this).find("i").html()));
        });

        if (checkArr.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任二组选-组选复式";
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
     * 任选二-直选和值
     */
    content_rx2zxhz: function () {
        var hzArr = [], arrTemp = [], checkStrArr = [], checkArr = [];
        $.each($(".recl-1004-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
            hzArr.push($.trim($(this).find("i").html()));
        });
        //选取选中checkbox
        $.each($(".recl-1004-hz input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);

        $(".recl-1004-zxhz input[name='position_hz']:checked").each(function () {
            arrTemp.push($(this).val());
        });
        if (arrTemp.length < 2) {
            alert("[任选二]至少需要选择2个位置");
            return -1;
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "任二直选-直选和值";
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
     * 任选二-直选单式
     */
    content_rx2zxds:  function () {
        var checkStrArr = [], checkArr = [];
        var errorStr = '';
        var repeatArr = [], allErrorArr = [];
        var errorArr = [];

        var textStr = $(".recl-1003-zxds .content_jiang .content_tex").val();
        //选取选中checkbox
        $.each($(".re-select-ds input[type='checkbox']:checked"), function (index, value) {
            checkArr.push($(this).val());
        });
        //获取位数字符串
        checkStrArr = this.getNoWeiStr(checkArr);
        var newArr = [], arrTemp = [];
        textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
        var arr_new = textStr.split(",");
        for (var i = 0; i < arr_new.length; i++) {
            if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                newArr.push(arr_new[i]);
            } else {
                if (arr_new[i] != "") {
                    errorArr.push(arr_new[i]);
                }
            }
        }

        $(".recl-1003-zxds input[name='position_ds']:checked").each(function () {
            arrTemp.push($(this).val());
        });
        if (arrTemp.length < 2) {
            alert("[任选二]至少需要选择2个位置");
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

        showPlayName = "任二直选-直选单式";
        showContent = "号码: (" + newArr.join(",") + ")";
        // 转换投注格式
        betContent = checkStrArr.join(',') + "|" + newArr.join(',');

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 任选二-直选复式
     */
    content_rx2zxfs:function () {
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

        showPlayName = "任二直选-直选复式";
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
        getBetNum:function(obj) {
            var betNum = obj.attr("data-bet_content");
            if (betNum.toString().indexOf('|') >= 0) {
                var betCode = this.getPlayId()
                if (betCode=='ssc_renxuan2_zxfs'){
                    betNum = betNum.replace(new RegExp(",","gm"),"");
                }
            }
            return betNum;
        },
    })
});