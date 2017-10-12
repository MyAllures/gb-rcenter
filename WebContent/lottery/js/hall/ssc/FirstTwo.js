/**
 * 前二
 */
define(['site/hall/ssc/SscGfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },
        zhushu_q2zuxbd:function(valArr) {
            var tempArr = [];
            var bdArr = [], nowTemp = [];
            $.each($(".recl-1009-zuxbd ul li[data-name = '胆码'] span.acti"), function (index, value) {
                nowTemp.push($.trim($(this).find("i").html()));
            });

            if (typeof valArr != "undefined") {
                bdArr = valArr;
            } else {
                bdArr = nowTemp;
            }
            var bdLength = bdArr.length;
            if (bdLength <= 0) {
                return 0;
            }
            for (var n = 0; n < bdArr.length; n++) {
                for (var i = 0; i < 10; i++) {
                    if (i != bdArr[n]) {
                        tempArr.push(i + "" + bdArr[n]);
                    }
                }
            }
            return tempArr.length;
        },
        /**
         * 注数-组选和值
         */
        zhushu_q2zuxhz:function(valArr) {
            var tempArr = [];
            var hzArr = [], temp = [], nowTemp = [];
            var sumTemp = 0, num = 0;
            $.each($(".recl-1008-zuxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                nowTemp.push($.trim($(this).find("i").html()));
            });
            if (typeof valArr != "undefined") {
                hzArr = valArr;
            } else {
                hzArr = nowTemp;
            }
            var hzLength = hzArr.length;
            if (hzLength <= 0) {
                return 0;
            }

            for (var n = 0; n < hzArr.length; n++) {
                sumTemp = parseInt(hzArr[n]);
                num = parseInt(hzArr[n]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                for (var i = 0; i < temp.length; i++) {
                    for (var i1 = 0; i1 < temp.length; i1++) {
                        if (temp[i] + temp[i1] == num && temp[i] <= 9 && temp[i1] <= 9) {
                            if (temp[i] != temp[i1]) {
                                var arr1 = [];
                                arr1.push(temp[i]);
                                arr1.push(temp[i1]);
                                arr1.sort();
                                tempArr.push(arr1.join(""));
                            }
                        }
                    }
                }
            }
            if (tempArr.length <= 0) {
                return 0;
            }
            tempArr = tempArr.uniqueArr();
            return tempArr.length;
        },

        /**
         * 注数-组选单式
         */
        zhushu_q2zuxds:function () {
            var textStr = $(".recl-1007-zuxds .content_jiang .content_tex").val();
            var newArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                    var strTemp = "", strTemp1 = "";
                    var str1 = arr_new[i].toString();
                    var str2 = arr_new[i].toString();
                    strTemp = str1.substr(0, 1);
                    strTemp1 = str2.substr(1, 1);
                    if (strTemp != strTemp1) {
                        var tempArr = [];
                        tempArr.push(parseInt(strTemp));
                        tempArr.push(parseInt(strTemp1));
                        tempArr.sort();
                        newArr.push(tempArr.join(""));
                    }
                }
            }
            if (newArr.length <= 0) {
                return 0;
            }
            return newArr.length;
        },
        /**
         * 注数-组选复式
         */
        zhushu_q2zuxfs:function () {
            var tempArr = [], zuxArr = [];
            $.each($(".recl-1006-zuxfs ul li[data-name = '组选'] span.acti"), function (index, value) {
                zuxArr.push($.trim($(this).find("i").html()));
            });

            var xLength = zuxArr.length;
            if (xLength < 2) {
                return 0;
            }

            for (var i = 0; i < zuxArr.length; i++) {
                for (var i1 = 0; i1 < zuxArr.length; i1++) {
                    if (zuxArr[i] != zuxArr[i1]) {
                        var xArr = [];
                        xArr.push(zuxArr[i]);
                        xArr.push(zuxArr[i1]);
                        xArr.sort();
                        tempArr.push(xArr.join(""));
                    }
                }
            }
            tempArr = tempArr.uniqueArr();
            return tempArr.length;
        }
        ,
        /**
         * 注数-直选跨度
         */
        zhushu_q2zxkd:   function (valArr) {
            var tempArr = [];
            var kdArr = [], numTemp = [];
            var num = 0;
            $.each($(".recl-1005-zxkd ul li[data-name = '跨度'] span.acti"), function (index, value) {
                numTemp.push($.trim($(this).find("i").html()));
            });
            if (typeof valArr != "undefined") {
                kdArr = valArr;
            } else {
                kdArr = numTemp;
            }

            var hzLength = kdArr.length;
            if (hzLength <= 0) {
                return 0;
            }

            for (var n = 0; n < kdArr.length; n++) {
                num = kdArr[n];
                for (var i = 0; i < 10; i++) {
                    for (var i1 = 0; i1 < 10; i1++) {
                        var numTemp = [];
                        numTemp.push(i);
                        numTemp.push(i1);
                        numTemp.sort();
                        if (numTemp[1] - numTemp[0] == num) {
                            tempArr.push(i + "" + i1);
                        }
                    }
                }
            }

            tempArr = tempArr.uniqueArr();
            return tempArr.length;
        },
        /**
         * 注数-直选和值
         */
        zhushu_q2zxhz:  function (valArr) {
            var tempArr = [];
            var hzArr = [], temp = [], nowTemp = [];
            var tempValue = 0, sumTemp = 0, num = 0;
            $.each($(".recl-1004-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                nowTemp.push($.trim($(this).find("i").html()));
            });

            if (typeof valArr != "undefined") {
                hzArr = valArr;
            } else {
                hzArr = nowTemp;
            }

            var hzLength = hzArr.length;
            if (hzLength <= 0) {
                return 0;
            }

            for (var n = 0; n < hzArr.length; n++) {
                sumTemp = parseInt(hzArr[n]);
                num = parseInt(hzArr[n]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                for (var i = 0; i < temp.length; i++) {
                    for (var i1 = 0; i1 < temp.length; i1++) {
                        if (temp[i] + temp[i1] == num && temp[i] <= 9 && temp[i1] <= 9) {
                            tempArr.push(temp[i] + "" + temp[i1]);
                        }
                    }
                }
            }

            tempArr = tempArr.uniqueArr();
            return tempArr.length;
        },
        /**
         * 注数-直选单式
         */
        zhushu_q2zxds:  function () {
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var newArr = [];
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                    newArr.push(arr_new[i]);
                }
            }

            if (newArr.length <= 0) {
                return 0;
            }
            return newArr.length;
        },
        /**
         * 注数 前二-直选单式
         */
        zhushu_qezxds:  function () {
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var tempArr = [];
            var newArr = [];
            textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
            textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
            textStr = $.trim(textStr.replace(/\s/g,""));
            var arr_new = textStr.split(',');
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 4) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 2);
                var twoStr = temp.substr(2, 2);
                if (oneStr != twoStr) {
                    if (parseInt(oneStr) < 12 && parseInt(twoStr) < 12) {
                        tempArr.push(newArr[n]);
                    }
                }
            }
            if (tempArr.length <= 0) {

                return 0;

            }


            return tempArr.length;
        },
        suiji_q2zuxbd: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';
            var betZhushu = '';

            var arrTsh = [], newArr = [];
            while (newArr.length < 1) {
                var zhiTsh = parseInt(Math.random() * 10);
                newArr.push(zhiTsh);
            }
            betZhushu = this.zhushu_q2zuxbd(newArr);
            showPlayName = "前二组选-包胆";
            showContent = "包胆: (" + newArr[0] + ")";
            betContent = newArr.join("");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-组选和值"
         */
        suiji_q2zuxhz: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';
            var betZhushu = '';

            var arrTsh = [], newArr = [];
            while (newArr.length < 1) {
                var zhiTsh = parseInt(Math.random() * 17) + 1;
                newArr.push(zhiTsh);
            }
            betZhushu = this.zhushu_q2zuxhz(newArr);
            showPlayName = "前二组选-和值";
            showContent = "和值: (" + newArr[0] + ")";
            betContent = newArr.join("");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-组选单式"
         */
        suiji_q2zuxds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var newArr = [];
            while (newArr.length < 2) {
                var zhiHao1 = parseInt(Math.random() * 10);
                var zhiHao2 = parseInt(Math.random() * 10);
                if (zhiHao1 != zhiHao2) {
                    newArr.push(zhiHao1);
                    newArr.push(zhiHao2);
                }
            }
            showPlayName = "前二组选-单式";
            showContent = "号码: (" + newArr.join(",") + ")";
            betContent = newArr.join("");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-组选复式"
         */
        suiji_q2zuxfs:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var newArr = [];
            while (newArr.length < 2) {
                var zhiHao1 = parseInt(Math.random() * 10);
                var zhiHao2 = parseInt(Math.random() * 10);
                if (zhiHao1 != zhiHao2) {
                    newArr.push(zhiHao1);
                    newArr.push(zhiHao2);
                }
            }
            showPlayName = "前二组选-复式";
            showContent = "组选: (" + newArr.join(",") + ")";
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-直选跨度"
         */
        suiji_q2zxkd: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';
            var betZhushu = '';

            var arrTsh = [], newArr = [];
            while (newArr.length < 1) {
                var zhiTsh = parseInt(Math.random() * 10);
                newArr.push(zhiTsh);
            }
            betZhushu = this.zhushu_q2zxkd(newArr);
            showPlayName = "前二直选-跨度";
            showContent = "跨度: (" + newArr[0] + ")";
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-直选和值"
         */
        suiji_q2zxhz:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';
            var betZhushu = '';

            var arrTsh = [], newArr = [];
            while (newArr.length < 1) {
                var zhiTsh = parseInt(Math.random() * 19);
                newArr.push(zhiTsh);
            }
            betZhushu = this.zhushu_q2zxhz(newArr);
            showPlayName = "前二直选-和值";
            showContent = "和值: (" + newArr[0] + ")";
            betContent = newArr.join("");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                betZhushu: betZhushu,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-直选单式"
         */
        suiji_q2zxds: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arrTsh = [], newArr = [];
            arrTsh = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

            while (newArr.length < 2) {
                var zhiTsh = parseInt(Math.random() * arrTsh.length);
                newArr.push(arrTsh[parseInt(zhiTsh)]);
            }

            showPlayName = "前二直选-直选单式";
            showContent = "号码: (" + newArr[0] + "" + newArr[1] + ")";
            betContent = newArr[0] + "" + newArr[1];

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前2直选-直选单式"
         */
        suiji_qezxds:  function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arrTsh = [], newArr = [];
            arrTsh = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

            while (newArr.length < 2) {
                var zhiTsh1 = arrTsh[parseInt(Math.random() * 10)];
                var zhiTsh2 = arrTsh[parseInt(Math.random() * 10)];

                if (zhiTsh1 != zhiTsh2) {
                    newArr.push(zhiTsh1+" ");
                    newArr.push(zhiTsh2);
                }

            }


            showPlayName = "前二直选-直选单式";
            showContent = "号码: (" + newArr[0] + "" + newArr[1] + ")";
            betContent = newArr[0] + "" + newArr[1];

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 前2直选-直选复式"
         */
        suiji_q2zxfs:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arrTsh = [], newArr = [];
            arrTsh = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

            while (newArr.length < 2) {
                var zhiTsh = parseInt(Math.random() * arrTsh.length);
                newArr.push(arrTsh[parseInt(zhiTsh)]);
            }

            showPlayName = "前二直选-复式";
            showContent = "万位: (" + newArr[0] + ") 千位: (" + newArr[1] + ")";
            betContent = newArr[0] + "|" + newArr[1];
            ;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
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
        suiji_h2dxds: function () {
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
        content_q2zuxbd:  function () {
            var dmArr = [];
            $.each($(".recl-1009-zuxbd ul li[data-name = '胆码'] span.acti"), function (index, value) {
                dmArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二组选-包胆";
            showContent = "包胆: (" + dmArr.join(",") + ")";
            // 转换投注格式
            betContent = dmArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前二组选-组选和值
         */
        content_q2zuxhz:  function () {
            var hzArr = [];
            $.each($(".recl-1008-zuxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                hzArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二组选-和值";
            showContent = "和值: (" + hzArr.join(",") + ")";
            // 转换投注格式
            betContent = hzArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        }
        ,
        /**
         * 前二组选-组选单式
         */
        content_q2zuxds: function () {
            var textStr = $(".recl-1007-zuxds .content_jiang .content_tex").val();
            var newArr = [];
            var repeatArr = [], errorArr = [], allErrorArr = [], pairArr = [];
            var errorStr = '';
            var zhushu = 0;
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
                    var strTemp = "", strTemp1 = "";
                    var str1 = arr_new[i].toString();
                    var str2 = arr_new[i].toString();
                    strTemp = str1.substr(0, 1);
                    strTemp1 = str2.substr(1, 1);
                    if (strTemp != strTemp1) {
                        var tempArr = [];
                        tempArr.push(parseInt(strTemp));
                        tempArr.push(parseInt(strTemp1));
                        tempArr.sort();
                        newArr.push(tempArr.join(""));
                    } else {
                        pairArr.push(arr_new[i]);
                    }
                } else {
                    if (arr_new[i] != "") {
                        errorArr.push(arr_new[i]);
                    }
                }
            }

            if (newArr.length <= 0) {
                return 0;
            }

            if (pairArr.length > 0) {
                allErrorArr.push("自动过滤对子号码:");
                for (var p = 0; p < pairArr.length; p++) {
                    allErrorArr.push(pairArr[p]);
                }
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

            showPlayName = "前二组选-单式";
            showContent = "号码: (" + newArr + ")";
            // 转换投注格式
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前二组选-组选复式
         */
        content_q2zuxfs: function () {
            var zuxArr = [];
            $.each($(".recl-1006-zuxfs ul li[data-name = '组选'] span.acti"), function (index, value) {
                zuxArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二组选-复式";
            showContent = "组选: (" + zuxArr.join(",") + ")";
            // 转换投注格式
            betContent = zuxArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        }
        ,

        /**
         * 前二直选-直选跨度
         */
        content_q2zxkd:function () {
            var kdArr = [];
            $.each($(".recl-1005-zxkd ul li[data-name = '跨度'] span.acti"), function (index, value) {
                kdArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二直选-跨度";
            showContent = "跨度: (" + kdArr.join(",") + ")";
            // 转换投注格式
            betContent = kdArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 前二直选-直选和值
         */
        content_q2zxhz: function () {
            var hzArr = [];
            $.each($(".recl-1004-zxhz ul li[data-name = '和值'] span.acti"), function (index, value) {
                hzArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二直选-和值";
            showContent = "和值: (" + hzArr.join(",") + ")";
            // 转换投注格式
            betContent = hzArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        }
        ,
        /**
         * 前二直选-直选单式
         */
        content_qezxds: function () {
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var tempArr = [];
            var errorStr = '';
            var zhushu = 0;
            arrTsh = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10];
            /* textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10]/g, ','));

             var arr_new = textStr.split(",");*/
            textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
            textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
            textStr = $.trim(textStr.replace(/\s/g,""));
            var arr_new = textStr.split(',');
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 4) {
                    newArr.push(arr_new[i]);
                } else {
                    if (arr_new[i] != '') {
                        errorArr.push(arr_new[i]);
                    }
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 2);
                var towStr = temp.substr(2, 2);

                tempArr.push(oneStr +" "+ towStr);
            }

            if (tempArr.length <= 0) {
                return 0;
            }

            if (errorArr.length > 0) {
                for (var e = 0; e < errorArr.length; e++) {
                    errorStr += errorArr[e] + "";
                }
                alert("被过滤掉的错误号码" + errorStr);
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二直选-直选单式";
            showContent = "号码: (" + tempArr + ")";
            // 转换投注格式
            betContent = tempArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 注数-直选复式
         */
        zhushu_q2zxfs:function () {
            var tempArr = [];
            var wanArr = [], qianArr = [];
            $.each($(".recl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;

            if (wanLength <= 0 || qianLength <= 0) {
                return 0;
            }

            for (var i = 0; i < wanArr.length; i++) {
                for (var i1 = 0; i1 < qianArr.length; i1++) {
                    tempArr.push(wanArr[i] + "" + qianArr[i1]);
                }
            }
            return tempArr.length;
        },
        /**
         * 前二直选-直选单式
         */
        content_q2zxds:  function () {
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var errorStr = '';
            var zhushu = 0;
            textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
            var arr_new = textStr.split(",");
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 2) {
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
                    errorStr += errorArr[e] + "";
                }
                alert("被过滤掉的错误号码" + errorStr);
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二直选-单式";
            showContent = "号码: (" + newArr + ")";
            // 转换投注格式
            betContent = newArr.join(",");

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 前二直选-直选复式
         */
        content_q2zxfs:  function () {
            var wanArr = [], qianArr = [];
            $.each($(".recl-1002 ul li[data-name = '万'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name = '千'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前二直选-复式";
            showContent = "万位：({0})，千位：({1})".format(
                wanArr.join(","),
                qianArr.join(",")
            );
            // 转换投注格式
            betContent = this.gfwf_2xfs(
                wanArr,
                qianArr
            );

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        gfwf_2xfs:function (shiArr,geArr) {
        var tmpStr_1 = shiArr.join(",");
        var tmpStr_2 = geArr.join(",");
        return "{0}|{1}".format(
            tmpStr_1,
            tmpStr_2
        );
    },
        //获取下注号码
        getBetNum:function(betNum) {
            if (betNum.toString().indexOf('|') < 0) {
                var betCode = this.getPlayId();
                if (betCode == 'ssc_erxing_zhixuan_qekd'|| betCode == 'ssc_erxing_zuxuan_qefs' || betCode == 'zhushu_q2zuxbd'){

                }else{
                betNum = betNum.replace(new RegExp(",","gm"),"|");
                }
            }
            return betNum;
        }
    })
});