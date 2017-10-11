define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();

            $("#checkSelected input[type='checkbox']").change(function() {
                _this.getZhuShu();  //获取注数方法
            });
        },

        /**
         * 任选二-直选和值
         */
        content_ssc_renxuan2_zuxhz: function () {
            var hzArr = [], checkStrArr = [];
            $.each($("a.n-btn.hz"), function () {
                hzArr.push($.trim($(this).html()));
            });

            checkStrArr = this.getCheckboxValue();

            if (checkStrArr.length < 2) {
                mui.toast("[任选二]至少需要选择2个位置");
                return -1;
            }

            return checkStrArr.join(',') + "|" + hzArr.join(",");
        },

        zhushu_ssc_renxuan2_zuxhz:function () {

            var hzArr = [];
            var newArr = [];

            $.each($("a.n-btn.hz.mui-active"), function (index, value) {
                hzArr.push($.trim($(this).html()));
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
            // 选取选中checkbox
            var checkArr = this.getCheckboxValue();

            var shu = this.getFlagArrs(checkArr, 2).length;
            return zhushu * shu;

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

    /**
         * 随机算法-任二直选和值
         */

        random_ssc_renxuan2_zuxhz: function () {

            var random_1 = parseInt(Math.random() * 19);
            $("a.n-btn.hz").removeClass("mui-active").eq(random_1).addClass("mui-active");
        }
    });
});