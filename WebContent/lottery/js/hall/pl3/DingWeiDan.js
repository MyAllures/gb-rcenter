/**
 * 跨度
 */
define(['site/hall/pl3/Pl3Gfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },
        zhushu_dwd:function () {
            var baiArr = [], shiArr = [], geArr = [], newArr = [];
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '十'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '个'] span.acti"), function (index, value) {
                geArr.push($.trim($(this).find("i").html()));
            });

            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (baiLength <= 0 && shiLength <= 0 && geLength <= 0) {
                return 0;
            }

            if (baiLength > 0) {
                newArr = newArr.concat(baiArr);
            }
            if (shiLength > 0) {
                newArr = newArr.concat(shiArr);
            }
            if (geLength > 0) {
                newArr = newArr.concat(geArr);
            }
            return newArr.length;
        },

        /**
         * 注数-定位胆
         */
        zhushu_gd11x5_dwd:function () {
            var baiArr = [], shiArr = [], geArr = [], newArr = [];
            $.each($(".cl-1002 ul li[data-name = '第一位'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第二位'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第三位'] span.acti"), function (index, value) {
                geArr.push($.trim($(this).find("i").html()));
            });

            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (baiLength <= 0 && shiLength <= 0 && geLength <= 0) {
                return 0;
            }

            if (baiLength > 0) {
                newArr = newArr.concat(baiArr);
            }
            if (shiLength > 0) {
                newArr = newArr.concat(shiArr);
            }
            if (geLength > 0) {
                newArr = newArr.concat(geArr);
            }
            return newArr.length;
        },
        /**
         * 注数-定位胆
         */
        zhushu_dwdzxfs: function () {
            var gj = [], yj = [],  jj = [], ds = [],dw = [] ,dt = [],dq = [],db = [],dj = [],dsm = [],newArr = [];;
            $.each($(".cl-1002 ul li[data-name = '冠军'] span.acti"), function (index, value) {
                gj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '亚军'] span.acti"), function (index, value) {
                yj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '季军'] span.acti"), function (index, value) {
                jj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第四名'] span.acti"), function (index, value) {
                ds.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第五名'] span.acti"), function (index, value) {
                dw.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第六名'] span.acti"), function (index, value) {
                dt.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第七名'] span.acti"), function (index, value) {
                dq.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第八名'] span.acti"), function (index, value) {
                db.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第九名'] span.acti"), function (index, value) {
                dj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第十名'] span.acti"), function (index, value) {
                dsm.push($.trim($(this).find("i").html()));
            });


            var gjlength = gj.length;
            var yjLength = yj.length;
            var jjLength = jj.length;
            var dsLength = ds.length;
            var dwlength = dw.length;
            var dtlength = dt.length;
            var dqlength = dq.length;
            var dblength = db.length;
            var djlength = dj.length;
            var dsmlength = dsm.length;

            if (gjlength <= 0 && yjLength <= 0 && jjLength <= 0 && dsLength <= 0 && dwlength <= 0&& dtlength <= 0&& dqlength <= 0&& dblength <= 0&& djlength <= 0&& dsmlength <= 0) {
                return 0;
            }

            if (gjlength > 0) {
                newArr = newArr.concat(gj);
            }
            if (yjLength > 0) {
                newArr = newArr.concat(yj);
            }
            if (jjLength > 0) {
                newArr = newArr.concat(jj);
            }
            if (dsLength > 0) {
                newArr = newArr.concat(ds);
            }
            if (dwlength > 0) {
                newArr = newArr.concat(dw);
            }
            if (dtlength > 0) {
                newArr = newArr.concat(dt);
            }
            if (dqlength > 0) {
                newArr = newArr.concat(dq);
            }
            if (dblength > 0) {
                newArr = newArr.concat(db);
            }
            if (djlength > 0) {
                newArr = newArr.concat(dj);
            }
            if (dsmlength > 0) {
                newArr = newArr.concat(dsm);
            }
            return newArr.length;
        },
        suiji_dwd:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var xArr = ["百位", "十位", "个位"];

            var arr = [];
            var betStr = '';
            while (arr.length < 1) {
                var num1 = parseInt(Math.random() * 3);
                var num2 = parseInt(Math.random() * 6);
                var str = xArr[num1];
                str = str + ": (" + numArr[num2] + ")";
                arr.push(str);
                if (num1 == 0) {
                    betStr = numArr[num2] + "|" + "|";
                } else if (num1 == 1) {
                    betStr = "|" + numArr[num2] + "|";
                } else if (num1 == 2) {
                    betStr = "|" + "|" + numArr[num2];
                }

            }
            debugger;
            showPlayName = "定位胆-定位胆";
            showContent = arr[0];
            betContent = betStr;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 定位胆"
         */
        suiji_gd11x5_dwd: function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11'];
            var xArr = ["第一名", "第二名", "第三名", "第四名", "第五名"];

            var arr = [];
            var betStr = '';
            while (arr.length < 1) {
                var num1 = parseInt(Math.random() * 5);
                var num2 = parseInt(Math.random() * 10+1);
                var str = xArr[num1];
                str = str + ": (" + numArr[num2] + ")";
                arr.push(str);
                if (num1 == 0) {
                    betStr = numArr[num2] + "|" + "|" + "|" + "|";
                } else if (num1 == 1) {
                    betStr = "|" + numArr[num2] + "|" + "|" + "|";
                } else if (num1 == 2) {
                    betStr = "|" + "|" + numArr[num2] + "|" + "|";
                } else if (num1 == 3) {
                    betStr = "|" + "|" + "|" + numArr[num2] + "|";
                } else if (num1 == 4) {
                    betStr = "|" + "|" + "|" + "|" + numArr[num2];
                }

            }

            showPlayName = "定位胆-定位胆";
            showContent = arr[0];
            betContent = betStr;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },

        /**
         * 定位胆"
         */
        suiji_dwdzxfs:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
            var xArr = ["冠军", "亚军", "季军", "第四名", "第五名","第六名","第七名","第八名","第九名","第十名"];

            var arr = [];
            var betStr = '';
            while (arr.length < 1) {
                var num1 = parseInt(Math.random() * 10);
                var num2 = numArr[parseInt(Math.random() * 10)];
                var str = xArr[num1];
                str = str + ": (" + num2 + ")";
                arr.push(str);
                if (num1 == 0) {
                    betStr = num2 + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|";
                } else if (num1 == 1) {
                    betStr ="|" + num2 + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|";
                } else if (num1 == 2) {
                    betStr ="|" + "|" + num2  + "|" + "|" + "|" + "|" + "|" + "|" + "|";
                } else if (num1 == 3) {
                    betStr ="|" + "|" + "|" + num2 + "|" + "|" + "|" + "|" + "|" + "|";
                } else if (num1 == 4) {
                    betStr ="|" + "|" + "|" +"|"+ num2 + "|" + "|" + "|" + "|" + "|";
                }else if (num1 == 5) {
                    betStr ="|" + "|"+ "|" + "|" + "|" + num2  + "|" + "|" + "|" + "|";
                }else if (num1 == 6) {
                    betStr ="|" + "|"+ "|" + "|" + "|"  + "|" + num2 + "|" + "|" + "|";
                }else if (num1 == 7) {
                    betStr ="|" + "|"+ "|" + "|" + "|"  + "|"  + "|"+ num2 + "|" + "|";
                }else if (num1 == 8) {
                    betStr ="|" + "|"+ "|" + "|" + "|"  + "|"  + "|" + "|"+ num2 + "|";
                }else if (num1 == 9) {
                    betStr ="|" + "|"+ "|" + "|" + "|"  + "|"  + "|" + "|" + "|"+  num2
                }

            }

            showPlayName = "定位胆-定位胆";
            showContent = arr[0];
            betContent = betStr;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        content_dwd:function () {
            var baiArr = [], shiArr = [], geArr = [];
            $.each($(".cl-1002 ul li[data-name = '百'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '十'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '个'] span.acti"), function (index, value) {
                geArr.push($.trim($(this).find("i").html()));
            });

            var baiStr = baiArr.length > 0 ? (" 百位: (" + baiArr.join(",") + ")") : "";
            var shiStr = shiArr.length > 0 ? (" 十位: (" + shiArr.join(",") + ")") : "";
            var geStr = geArr.length > 0 ? (" 个位: (" + geArr.join(",") + ")") : "";

            var nowArr = [];
            var strTemp = $.trim(
                (baiStr == ' ' ? ' ' : baiArr.join(",") + "|") +
                (shiStr == ' ' ? ' ' : shiArr.join(",") + "|") +
                (geStr == ' ' ? ' ' : geArr.join(","))
            );

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "定位胆-定位胆";
            showContent = $.trim(baiStr + shiStr + geStr);
            // 转换投注格式
            betContent = strTemp;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },

        /**
         * 定位胆
         */
        content_gd11x5_dwd:function () {
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($(".cl-1002 ul li[data-name = '第一位'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第二位'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第三位'] span.acti"), function (index, value) {
                baiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第四位'] span.acti"), function (index, value) {
                shiArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第五位'] span.acti"), function (index, value) {
                geArr.push($.trim($(this).find("i").html()));
            });

            var wanStr = wanArr.length > 0 ? ("(" + wanArr.join(",") + ")") : "";
            var qianStr = qianArr.length > 0 ? ("(" + qianArr.join(",") + ")") : "";
            var baiStr = baiArr.length > 0 ? ("(" + baiArr.join(",") + ")") : "";
            var shiStr = shiArr.length > 0 ? ("(" + shiArr.join(",") + ")") : "";
            var geStr = geArr.length > 0 ? ("(" + geArr.join(",") + ")") : "";

            var nowArr = [];
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

            showPlayName = "定位胆-定位胆";
            showContent = $.trim(wanStr + qianStr + baiStr + shiStr + geStr);
            // 转换投注格式
            betContent = strTemp;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 定位胆
         */
        content_dwdzxfs:function () {
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            var gj = [], yj = [],  jj = [], ds = [],dw = [] ,dt = [],dq = [],db = [],dj = [],dsm = [];
            $.each($(".cl-1002 ul li[data-name = '冠军'] span.acti"), function (index, value) {
                gj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '亚军'] span.acti"), function (index, value) {
                yj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '季军'] span.acti"), function (index, value) {
                jj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第四名'] span.acti"), function (index, value) {
                ds.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第五名'] span.acti"), function (index, value) {
                dw.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第六名'] span.acti"), function (index, value) {
                dt.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第七名'] span.acti"), function (index, value) {
                dq.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第八名'] span.acti"), function (index, value) {
                db.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第九名'] span.acti"), function (index, value) {
                dj.push($.trim($(this).find("i").html()));
            });
            $.each($(".cl-1002 ul li[data-name = '第十名'] span.acti"), function (index, value) {
                dsm.push($.trim($(this).find("i").html()));
            });

            var gjStr = gj.length > 0 ? ("冠军: (" + gj.join(",") + ")") : "";
            var yjStr = yj.length > 0 ? (" 亚军: (" + yj.join(",") + ")") : "";
            var jjStr = jj.length > 0 ? (" 季军: (" + jj.join(",") + ")") : "";
            var dsStr = ds.length > 0 ? (" 第四名: (" + ds.join(",") + ")") : "";
            var dwStr = dw.length > 0 ? (" 第五名: (" + dw.join(",") + ")") : "";
            var dtStr = dt.length > 0 ? (" 第六名: (" + dt.join(",") + ")") : "";
            var dqStr = dq.length > 0 ? (" 第七名: (" + dq.join(",") + ")") : "";
            var dbStr = db.length > 0 ? (" 第八名: (" + db.join(",") + ")") : "";
            var djStr = dj.length > 0 ? (" 第九名: (" + dj.join(",") + ")") : "";
            var dsmStr = dsm.length > 0 ? (" 第十名: (" + dsm.join(",") + ")") : "";

            var nowArr = [];
            var strTemp = $.trim(
                (gjStr == ' ' ? ' ' : gj.join(",") + "|") +
                (yjStr == ' ' ? ' ' : yj.join(",") + "|") +
                (jjStr == ' ' ? ' ' : jj.join(",") + "|") +
                (dsStr == ' ' ? ' ' : ds.join(",") + "|") +
                (dwStr == ' ' ? ' ' : dw.join(",")+"|")+
                (dtStr == ' ' ? ' ' : dt.join(",") + "|") +
                (dqStr == ' ' ? ' ' : dq.join(",") + "|") +
                (dbStr == ' ' ? ' ' : db.join(",") + "|") +
                (djStr == ' ' ? ' ' : dj.join(",") + "|") +
                (dsmStr == ' ' ? ' ' : dsm.join(","))
            );

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "定位胆-定位胆";
            showContent = $.trim(gjStr + yjStr + jjStr +dsStr + dwStr+ dtStr+ dqStr+ dbStr+ djStr+ dsmStr);
            // 转换投注格式
            betContent = strTemp;

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        }


    })
});