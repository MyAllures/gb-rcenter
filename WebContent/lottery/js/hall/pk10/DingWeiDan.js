
define(['site/hall/pk10/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'dwd',
        init: function () {
            this._super();
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
    },
        /**
         * 注数-定位胆
         */
        zhushu_dwdzxfs:function () {
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

        selectFun_6: function(obj) {
            $(obj).parent().parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");
            // this.clearStateTouZhu();//清除投注状态栏
            this.renderZhushu();
        },



})
});
