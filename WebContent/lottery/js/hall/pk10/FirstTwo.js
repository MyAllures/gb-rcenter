
define(['site/hall/pk10/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'qezxfs',
        init: function () {
            this._super();
        },


         gfwf_qyfs :function(qyArr) {
            var tmpStr_1 = qyArr.join(",");


            return "{0}".format(
                tmpStr_1

            );
        },

        /**
         * 前2直选复式-PK10
         */
        content_qezxfs:function () {
            var zhushu = 0;
            var dxdsWArr = [], dxdsQArr = [], tempArr = [];

            $.each($(".recl-1002 ul li[data-name = '冠军'] span.acti"), function (index, value) {
                dxdsWArr.push($.trim($(this).find("i").html()));
            });

            $.each($(".recl-1002 ul li[data-name = '亚军'] span.acti"), function (index, value) {
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

            showPlayName = "前二-直选复式";
            showContent = "冠军: ({0}), 亚军: ({1})".format(arr[0], arr[1]);
            betContent = "{0}|{1}".format(arr[0], arr[1]);

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 注数 前二-直选复式
         */
        zhushu_qezxfs:function () {
            var tempArr = [];
            var wanArr = [], qianArr = [];
            $.each($(".recl-1002 ul li[data-name = '冠军'] span.acti"), function (index, value) {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name = '亚军'] span.acti"), function (index, value) {
                qianArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength = qianArr.length;

            if (wanLength <= 0 || qianLength <= 0) {
                return 0;
            }

            for (var i = 0; i < wanArr.length; i++) {
                for (var i1 = 0; i1 < qianArr.length; i1++) {
                    if (wanArr[i] != qianArr[i1])
                        tempArr.push(wanArr[i] + "," + qianArr[i1]);
                }
            }
            return tempArr.length;
        },
        /**
         * 前2直选-直选复式"
         */
        suiji_qezxfs:function () {
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
                    newArr.push(zhiTsh1);
                    newArr.push(zhiTsh2);
                }
            }

            showPlayName = "前二直选-直选复式";
            showContent = "冠军: (" + newArr[0] + ") 亚军: (" + newArr[1] + ")";
            betContent = newArr[0] + "|" + newArr[1];

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        /**
         * 前二直选-直选单式
         */
        content_qezxds:function () {
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

            if (oneStr != towStr) {
                if (parseInt(oneStr) > 0 && parseInt(oneStr) < 11 && parseInt(towStr)>0 && parseInt(towStr) < 11) {
                    // tempArr.push(newArr[n]);
                    tempArr.push(oneStr +" "+ towStr);
                }else{
                    return;
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
            alert("被过滤掉的错误号码:" + errorStr.substring(0,errorStr.length-1));
        }

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "前二直选-直选单式";
        showContent = "号码: (" + tempArr + ")";
        // 转换投注格式
        betContent = tempArr.join(",");
        console.log(betContent);
        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
         * 注数 前二-直选单式
         */
        zhushu_qezxds:function () {
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
                    if (parseInt(oneStr) > 0 && parseInt(oneStr) < 11 && parseInt(twoStr)>0 && parseInt(twoStr) < 11) {
                        tempArr.push(newArr[n]);
                    }else{
                        return;
                    }
                }
            }
            if (tempArr.length <= 0) {

                return 0;

        }


        return tempArr.length;
    },
        /**
         * 前2直选-直选单式"
         */
        suiji_qezxds:function () {
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





})
});
