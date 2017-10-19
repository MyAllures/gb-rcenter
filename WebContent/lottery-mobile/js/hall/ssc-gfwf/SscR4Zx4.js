define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

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
            $(".s-title.title2 span").text("组选4");
            $(".x_3.gfwf-playName").text("组选4");
            $("a[data-code='ssc_renxuan4_zx4']").addClass("mui-active");

        },

        /**************任选二***************/
        /**
         * 注数-任选二 / 时时彩与11选5共用注数方法
         */
        zhushu_ssc_renxuan4_zx4 :function(){

            var sanChongHaoArr = [], danHaoArr = [], tempArr = [], nowArr = [];
            $.each($("a.n-btn.mui-active"), function (index, value) {
                sanChongHaoArr.push($.trim($(this).html()));
            });
            $.each($("a.n-btn.mui-active"), function (index, value) {
                danHaoArr.push($.trim($(this).html()));
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
            // 选取选中checkbox
            var checkArr = this.getCheckboxValue();
            var shu = this.getFlagArrs(checkArr, 4).length;
            return zhushu * shu;

        },

        /**
         * 直选复式
         */
        content_ssc_renxuan4_zx4 : function(){

            var sanChongHaoArr = [], danHaoArr = [];
            var checkStrArr = [];
            //获取位数字符串
            checkStrArr = this.getCheckboxValue();

            $.each($("a.n-btn.mui-active"), function (index, value) {
                sanChongHaoArr.push($.trim($(this).html()));
            });

            $.each($("a.n-btn.mui-active"), function (index, value) {
                danHaoArr.push($.trim($(this).html()));
            });


            if (checkStrArr.length < 4) {
                mui.toast("[任选四]至少需要选择4个位置");
                return -1;
            }
            return checkStrArr.join(',') + "|" + sanChongHaoArr.join(",") + "|" + danHaoArr.join(",");

        },

        /**
         * 随机算法-任二直选复式
         */
        random_ssc_renxuan4_zx4 : function() {

            var arrOneNum = [];
            var random_1 = parseInt(Math.random() * 10);

            while(arrOneNum.length < 1){
                var random_2 = parseInt(Math.random() * 10);
                if(random_1 != random_2){
                    arrOneNum.push(2);
                }
            }

            $("a.n-btn.mui-active").removeClass("mui-active");
            $("a.n-btn").eq(random_1).addClass("mui-active");
            $("a.n-btn").eq(random_2).addClass("mui-active");

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