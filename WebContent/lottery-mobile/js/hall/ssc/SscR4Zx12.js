define(['site/hall/ssc/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //active_a:$("a.selected-btn.mui-col-xs-4.main.mui-active"),
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            $("#checkSelected input[type='checkbox']").change(function() {
                _this.getZhuShu();  //获取注数方法
            });
        },

        showTable : function(){

            $("a[data-code='R4']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#R4").show();
            $("span.x_1.gfwf-tit").text("任选四");
            $(".s-title.title1 span").text("任选四");
            $(".s-title.title2 span").text("组选12");
            $(".x_3.gfwf-playName").text("组选12");
            $("a[data-code='ssc_renxuan4_zx12']").addClass("mui-active");

        },

        /**************任选二***************/
        /**
         * 注数-任选二 / 时时彩与11选5共用注数方法
         */
        zhushu_ssc_renxuan4_zx12 :function(){

            var erChongHaoArr = [], danHaoArr = [], tempArr = [], nowArr = [];
            $.each($(".erChongHao a.n-btn.mui-active"), function (index, value) {
                erChongHaoArr.push($.trim($(this).html()));
            });
            $.each($(".danHao a.n-btn.mui-active"), function (index, value) {
                danHaoArr.push($.trim($(this).html()));
            });

            if (danHaoArr.length < 2 && erChongHaoArr.length < 1) {
                return 0;
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
            // 选取选中checkbox
            var checkArr = this.getCheckboxValue();
            var shu = this.getFlagArrs(checkArr, 4).length;
            return zhushu * shu;

        },

        /**
         * 直选复式
         */
        content_ssc_renxuan4_zx12 : function(){

            var erChongHaoArr = [], danHaoArr = [];
            var checkStrArr = [];
            //获取位数字符串
            checkStrArr = this.getCheckboxValue();

            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                erChongHaoArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                danHaoArr.push($.trim($(this).html()));
            });

            if (checkStrArr.length < 4) {
                mui.toast("[任选四]至少需要选择4个位置");
                return -1;
            }

            return checkStrArr.join(',') + "|" + erChongHaoArr.join(",") + "|" + danHaoArr.join(",");

        },

        /**
         * 随机算法-任二直选复式
         */
        random_ssc_renxuan4_zx12 : function() {

            var arrTemp = [];
            var arrOneNum = [];
            var random_1 = 0;
            var random_2 = 1;
            while(arrTemp.length < 2){
                random_1 = parseInt(Math.random() * 10);
                random_2 = parseInt(Math.random() * 10);
                if(random_1 != random_2){
                    arrTemp.push(random_1);
                    arrTemp.push(random_2);
                }
            }

            while(arrOneNum.length < 1){
                var random_3 = parseInt(Math.random() * 10);
                if(random_1 != random_2 && random_1 != random_3 && random_2 != random_3){
                    arrOneNum.push(random_3);
                }
            }

            $("a.n-btn.mui-active").removeClass("mui-active");
            $(".erChongHao a.n-btn").eq(random_3).addClass("mui-active");
            $(".danHao a.n-btn").eq(random_1).addClass("mui-active");
            $(".danHao a.n-btn").eq(random_2).addClass("mui-active");

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
        },

        /**
         * 获得checkbox选中值列表
         */
        getCheckboxValue:function() {
            var result = [];
            $("#checkSelected input[type='checkbox']").each(function() {
                if ($(this).is(":checked")) {
                    result.push($(this).val());
                }
            });
            return result;
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
        }

    });
});

//去掉数组重复
Array.prototype.uniqueArr = function () {
    var temp = new Array();
    this.sort();
    for(i = 0; i < this.length; i++) {
        if( this[i] == this[i+1]) {
            continue;
        }
        temp[temp.length]=this[i];
    }
    return temp;
}