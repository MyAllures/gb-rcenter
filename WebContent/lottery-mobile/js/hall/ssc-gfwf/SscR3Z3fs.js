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

            $("a[data-code='R3']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#R3").show();
            $("span.x_1.gfwf-tit").text("任选三");
            $(".s-title.title1 span").text("任选三");
            $(".s-title.title2 span").text("组三复式");
            $(".x_3.gfwf-playName").text("组三复式");
            $("a[data-code='ssc_renxuan3_z3fs']").addClass("mui-active");

        },

        /**************任选二***************/
        /**
         * 注数-任选二 / 时时彩与11选5共用注数方法
         */
        zhushu_ssc_renxuan3_z3fs :function(){

            var zuArr = [];
            $.each($("a.n-btn.mui-active"), function (index, value) {
                zuArr.push($.trim($(this).html()));
            });
            var tempArr = [];
            for (var i = 0; i < zuArr.length; i++) {
                for (var i1 = 0; i1 < zuArr.length; i1++) {
                    if (zuArr[i] != zuArr[i1]) {
                        tempArr.push(zuArr[i] + "" + zuArr[i1]);
                    }
                }

            }

            // 选取选中checkbox
            var checkArr = this.getCheckboxValue();
            var shu = this.getFlagArrs(checkArr, 3).length;
            return tempArr.length * shu;
        },

        /**
         * 直选复式
         */
        content_ssc_renxuan3_z3fs : function(){

            var zuArr = [];
            var checkStrArr = [];
            //获取位数字符串
            checkStrArr = this.getCheckboxValue();

            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                zuArr.push($.trim($(this).html()));
            });

            if (checkStrArr.length < 3) {
                Tools.alert("[任选三]至少需要选择3个位置");
                return -1;
            }

            return checkStrArr.join(',') + "|" + zuArr.join(",");
        },

        /**
         * 随机算法-任二直选复式
         */
        random_ssc_renxuan3_z3fs : function() {

            var arrTemp = [];
            while(arrTemp.length < 2){
                var random_1 = parseInt(Math.random() * 10);
                var random_2 = parseInt(Math.random() * 10);
                if(random_1 != random_2){
                    arrTemp.push(random_1);
                    arrTemp.push(random_2);
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
        }

    });
});