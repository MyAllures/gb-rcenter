define(['site/hall/ssc-gfwf/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //active_a:$("a.selected-btn.mui-col-xs-4.main.mui-active"),
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();

        },

        showTable : function(){
            $("a[data-code='R4']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#R4").show();
            $("span.x_1.gfwf-tit").text("任选四");
            $(".s-title.title1 span").text("任选四");
            $(".s-title.title2 span").text("直选复式");
            $(".x_3.gfwf-playName").text("直选复式");
            $("a[data-code='ssc_renxuan4_zxfs']").addClass("mui-active");
        },
        /**************任选二***************/
        /**
         * 注数-任选二 / 时时彩与11选5共用注数方法
         */
        zhushu_ssc_renxuan4_zxfs :function(){

            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];

            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
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

            var tmpArr = this.getFlagArrs(numArr, 4);
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
         * 直选复式
         */
        content_ssc_renxuan4_zxfs : function(){

            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];

            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            var wanStr = wanArr.length > 0 ? ("万位: " + wanArr.join("")) : '';
            var qianStr = qianArr.length > 0 ? (" 千位: " + qianArr.join("")) : '';
            var baiStr = baiArr.length > 0 ? (" 百位: " + baiArr.join("")) : '';
            var shiStr = shiArr.length > 0 ?  (" 十位: " + shiArr.join("")) : '';
            var geStr = geArr.length > 0 ? (" 个位: " + geArr.join("")) : '';

            var strTemp = $.trim(
                (wanStr == ' ' ? ' ' : wanArr.join(",") + "|") +
                (qianStr == ' ' ? ' ' : qianArr.join(",") + "|") +
                (baiStr == ' ' ? ' ' : baiArr.join(",") + "|") +
                (shiStr == ' ' ? ' ' : shiArr.join(",") + "|") +
                (geStr == ' ' ? ' ' : geArr.join(","))
            );

            return strTemp;
        },

        /**
         * 随机算法-任二直选复式
         */
        random_ssc_renxuan4_zxfs : function() {

            var arrTemp = [];
            arrTemp = this.getFourNum();
            var wei_1 = arrTemp[0];
            var wei_2 = arrTemp[1];
            var wei_3 = arrTemp[2];
            var wei_4 = arrTemp[3];

            var random_1 = parseInt(Math.random() * 10);
            var random_2 = parseInt(Math.random() * 10);
            var random_3 = parseInt(Math.random() * 10);
            var random_4 = parseInt(Math.random() * 10);
            var random_5 = parseInt(Math.random() * 10);

            if(wei_1 == 0 || wei_2 == 0|| wei_3 == 0 || wei_4 == 0){
                $("a.n-btn.wang").removeClass("mui-active").eq(random_1).addClass("mui-active");
            }

            if(wei_1 == 1 || wei_2 == 1 || wei_3 == 1){
                $("a.n-btn.qian").removeClass("mui-active").eq(random_2).addClass("mui-active");
            }

            if(wei_1 == 2 || wei_2 == 2 || wei_3 == 2 || wei_4 == 2){
                $("a.n-btn.bai").removeClass("mui-active").eq(random_3).addClass("mui-active");
            }

            if(wei_1 == 3 || wei_2 == 3 || wei_3 == 3 || wei_4 == 3){
                $("a.n-btn.shi").removeClass("mui-active").eq(random_4).addClass("mui-active");
            }

            if(wei_1 == 4 || wei_2 == 4 || wei_3 == 4 || wei_4 == 4){
                $("a.n-btn.ge").removeClass("mui-active").eq(random_5).addClass("mui-active");
            }
        },

        //获取 0 到 9 位上4个不同号码
        getFourNum:function(){
            var arrTemp = [];
            var wei_1 = 0;
            var wei_2 = 1;
            var wei_3 = 2;
            var wei_4 = 3;
            while(arrTemp.length < 4){
                wei_1 = parseInt(Math.random() * 5);
                wei_2 = parseInt(Math.random() * 5);
                wei_3 = parseInt(Math.random() * 5);
                wei_4 = parseInt(Math.random() * 5);
                if(wei_1 != wei_2 && wei_3 != wei_1 && wei_1 != wei_4 && wei_2 != wei_3 && wei_2 != wei_4 && wei_3 != wei_4){
                    arrTemp.push(wei_1);
                    arrTemp.push(wei_2);
                    arrTemp.push(wei_3);
                    arrTemp.push(wei_4);
                }
            }

            return arrTemp;
        },

        /**
         * 获得从m中取n的所有组合
         */
        getFlagArrs:function(arr, num) {

            if (arr.length < num) {
                return [];
            }
            var list = [];
            var sb = "";
            var b = new Array();
            for (var i = 0; i < arr.length; i++) {
                if (i < num) {
                    b[i] = "1";
                } else
                    b[i] = "0";
            }

            var point = 0;
            var nextPoint = 0;
            var count = 0;
            var sum = 0;
            var temp = "1";
            while (true) {
                // 判断是否全部移位完毕
                for (var i = b.length - 1; i >= b.length - num; i--) {
                    if (b[i] == "1")
                        sum += 1;
                }
                // 根据移位生成数据
                for (var i = 0; i < b.length; i++) {
                    if (b[i] == "1") {
                        point = i;
                        sb += arr[point];
                        sb += " ";
                        count++;
                        if (count == num)
                            break;
                    }
                }
                // 往返回值列表添加数据
                list.push(sb);

                // 当数组的最后num位全部为1 退出
                if (sum == num) {
                    break;
                }
                sum = 0;

                // 修改从左往右第一个10变成01
                for (var i = 0; i < b.length - 1; i++) {
                    if (b[i] == "1" && b[i + 1] == "0") {
                        point = i;
                        nextPoint = i + 1;
                        b[point] = "0";
                        b[nextPoint] = "1";
                        break;
                    }
                }
                // 将 i-point个元素的1往前移动 0往后移动
                for (var i = 0; i < point - 1; i++)
                    for (var j = i; j < point - 1; j++) {
                        if (b[i] == "0") {
                            temp = b[i];
                            b[i] = b[j + 1];
                            b[j + 1] = temp;
                        }
                    }
                // 清空 StringBuffer
                sb = "";
                count = 0;
            }
            for (var i = 0; i < list.length; ++i) {
                list[i] = $.trim(list[i]);
            }
            return list;
        }

    });
});