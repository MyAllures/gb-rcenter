define(['site/hall/common/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        // 随机号码
        randomNumber: function (len) {
            var tmpStr = '';
            var sum = 0;
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10);
                sum += num;
                tmpStr += '<span>' + num + '</span><span class="plus">'+(i!=(len-1)?'+':'=')+'</span>';
            }
            tmpStr += '<span>' + sum + '</span>';
            $("#lastOpenCode").html(tmpStr);
        },
        /**
         * 渲染近5期历史记录
         */
        renderRecent5OpenCode: function (data) {
            var _this = this;
            var openList = '';
            var map = {
                0: "grayxy28",
                1: "greenxy28",
                2: "bluexy28",
                3: "ball-28xy3",
                4: "greenxy28",
                5: "bluexy28",
                6: "ball-28xy3",
                7: "greenxy28",
                8: "bluexy28",
                9: "ball-28xy3",
                10: "greenxy28",
                11: "bluexy28",
                12: "ball-28xy3",
                13: "grayxy28",
                14: "grayxy28",
                15: "ball-28xy3",
                16: "greenxy28",
                17: "bluexy28",
                18: "ball-28xy3",
                19: "greenxy28",
                20: "bluexy28",
                21: "ball-28xy3",
                22: "greenxy28",
                23: "bluexy28",
                24: "ball-28xy3",
                25: "greenxy28",
                26: "bluexy28",
                27: "grayxy28"
            };

            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var arr = new Array;
                var sum = 0;
                for (var i = 0; i < numArr.length; i++) {
                    var data = {};
                    data.num = numArr[i];
                    data.colour = _this.numColour(data.num);
                    arr.push(data);
                    sum = sum + parseInt(data.num);
                }
                var colorBg = map[sum];
                openList += Template('template_openDataHistory', {
                    number: value.expect,
                    list: arr,
                    sum: sum,
                    colorBg: colorBg
                });
            });
            $("#lastOpenCodeList ul").html(openList);
        },
        /**
         * 渲染最近一期开奖号
         */
        renderLastOpenCode: function (openCodeArr) {
            var tmpStr = '';
            var sum = 0;
            var colorBg = 'ball-28xy3';

            $.each(openCodeArr, function (index, value) {
                sum += parseInt(value);
                if ($.inArray(sum, [0, 13, 14, 27]) >= 0) {
                    colorBg = "graybj28";
                } else if ($.inArray(sum, [1, 4, 7, 10, 16, 19, 22, 25]) >= 0) {
                    colorBg = "greenxy28";
                } else if ($.inArray(sum, [2, 5, 8, 11, 17, 20, 23, 26]) >= 0) {
                    colorBg = "bluexy28";
                } else {
                    colorBg = 'ball-28xy3';
                }
                if (index < 2) {
                    tmpStr += '<span>' + value + '</span><span class="plus">+</span>';
                } else {
                    tmpStr += '<span>' + value + '</span><span class="plus">=</span><span class="' + colorBg + '">' + sum + '</span>';
                }

            });
            $("#lastOpenCode").html(tmpStr);
        },

        refreshView: function () {
            var _this = this;
            ajaxRequest({
                url: _this.baseUrl + '/getRecent30Records.html',
                data: {code: _this.code},
                success: function (data) {
                    if (data && data.length > 0) {
                        data.reverse();
                        _this.renderViewRight(data);
                    }
                }
            });
        },
        /**
         * 组装两面长龙排行数据
         * @param json
         */
        renderViewRight:function(json) {
            var result = {
                da: {name: '和值-大', num: 0},
                xiao: {name: '和值-小', num: 0},
                dan: {name: '和值-单', num: 0},
                shuang: {name: '和值-双', num: 0},
                dadan: {name: '和值-大单', num: 0},
                xiaodan: {name: '和值-小单', num: 0},
                dashuang: {name: '和值-大双', num: 0},
                xiaoshuang: {name: '和值-小双', num: 0},
                jida: {name: '和值-极大', num: 0},
                jixiao: {name: '和值-极小', num: 0},
                hongbo: {name: '和值-红波', num: 0},
                lvbo: {name: '和值-绿波', num: 0},
                lanbo: {name: '和值-蓝波', num: 0},
                baozi: {name: '和值-豹子', num: 0}
            };

            for (var i = 0; i < json.length; ++i) {
                var value = json[i];
                var openCode = value.openCode.split(",");
                var num1 = Tools.parseInt(openCode[0]);
                var num2 = Tools.parseInt(openCode[1]);
                var num3 = Tools.parseInt(openCode[2]);

                var totalnum = num1 + num2 + num3;

                if (totalnum >= 24 || totalnum <= 27) {
                    result.da.num++;
                } else {
                    result.xiao.num++;
                }

                if (totalnum % 2 == 0) {
                    result.shuang.num++;
                } else {
                    result.dan.num++;
                }

                if ($.inArray(totalnum, [1, 3, 5, 7, 9, 11, 13]) >= 0) {
                    result.xiaodan.num++;
                } else if ($.inArray(totalnum, [15, 17, 19, 21, 23, 25, 27]) >= 0) {
                    result.dadan.num++;
                } else if ($.inArray(totalnum, [0, 2, 4, 6, 8, 10, 12]) >= 0) {
                    result.xiaoshuang.num++;
                } else if ($.inArray(totalnum, [14, 16, 18, 20, 22, 24, 26]) >= 0) {
                    result.dashuang.num++;
                }

                if ($.inArray(totalnum, [22, 23, 24, 25, 26, 27]) >= 0) {
                    result.jida.num++;
                } else if ($.inArray(totalnum, [0, 1, 2, 3, 4, 5]) >= 0) {
                    result.jixiao.num++;
                }

                if ($.inArray(totalnum, [1, 4, 7, 10, 16, 19, 22, 25]) >= 0) {
                    result.lvbo.num++;
                } else if ($.inArray(totalnum, [2, 5, 8, 11, 17, 20, 23, 26]) >= 0) {
                    result.lanbo.num++;
                } else if ($.inArray(totalnum, [3, 6, 9, 12, 15, 18, 21, 24]) >= 0) {
                    result.hongbo.num++;
                }

                if (num1 == num2 && num3 == num2 && num1 == num3) {
                    result.baozi.num++;
                }

            }

            var arr = [];
            arr.push(result.da);
            arr.push(result.xiao);
            arr.push(result.dan);
            arr.push(result.shuang);
            arr.push(result.dadan);
            arr.push(result.xiaodan);
            arr.push(result.dashuang);
            arr.push(result.xiaoshuang);
            arr.push(result.jida);
            arr.push(result.jixiao);
            arr.push(result.lvbo);
            arr.push(result.hongbo);
            arr.push(result.lanbo);

            arr.sort(function (a, b) {
                var val1 = a.num;
                var val2 = b.num;
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            });
            arr = arr.reverse();

            var str = '';
            str += '<div class="table-common table-border-color">';
            str += '<table width="100%" border="1">';
            str += '<tbody>';
            str += '<tr>';
            str += '<td colspan="2">长龙排行</td>';
            str += '</tr>';
            str += '<tr>';
            str += '<td colspan="2">统计至第' + json[json.length - 1].expect + '期</td>';
            str += '</tr>';
            for (var i = 0; i < 10 && i < arr.length; ++i) {
                str += '<tr>';
                str += '<td width="142">' + arr[i].name + '</td>';
                str += '<td>' + arr[i].num + '</td>';
                str += '</tr>';
            }
            str += '</tbody>';
            str += '</table>';
            str += '</div>';
            $(".main-right").html(str);
        }
    })
})