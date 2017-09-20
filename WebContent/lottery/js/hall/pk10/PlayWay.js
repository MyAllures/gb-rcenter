define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        //大彩种
        type: null,
        //小彩种
        code: null,
        //基本路径
        baseUrl: null,
        init: function () {
            this.type = $('[name=type]').val();
            this.code = $('[name=code]').val();
            this.baseUrl = root + '/' + this.type;
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.refreshView();
        },
        refreshView: function () {
            var _this = this;
            ajaxRequest({
                url: _this.baseUrl + '/getRecent30Records.html',
                data: {code: _this.code},
                success: function (data) {
                    if (data && data.length > 0) {
                        _this.renderViewRight(data);
                    }
                }
            });
        },

        /**
         * 组装两面长龙排行
         * @param json
         */
        renderViewRight: function (json) {
            var result = {
                gj: {
                    da: {name: '冠军-大', num: 0},
                    xiao: {name: '冠军-小', num: 0},
                    dan: {name: '冠军-单', num: 0},
                    shuang: {name: '冠军-双', num: 0},
                    long: {name: '冠军-龙', num: 0},
                    hu: {name: '冠军-虎', num: 0}
                },
                yj: {
                    da: {name: '亚军-大', num: 0},
                    xiao: {name: '亚军-小', num: 0},
                    dan: {name: '亚军-单', num: 0},
                    shuang: {name: '亚军-双', num: 0},
                    long: {name: '亚军-龙', num: 0},
                    hu: {name: '亚军-虎', num: 0}
                },
                jj: {
                    da: {name: '季军-大', num: 0},
                    xiao: {name: '季军-小', num: 0},
                    dan: {name: '季军-单', num: 0},
                    shuang: {name: '季军-双', num: 0},
                    long: {name: '季军-龙', num: 0},
                    hu: {name: '季军-虎', num: 0}
                },
                q4: {
                    da: {name: '第四名-大', num: 0},
                    xiao: {name: '第四名-小', num: 0},
                    dan: {name: '第四名-单', num: 0},
                    shuang: {name: '第四名-双', num: 0},
                    long: {name: '第四名-龙', num: 0},
                    hu: {name: '第四名-虎', num: 0}
                },
                q5: {
                    da: {name: '第五名-大', num: 0},
                    xiao: {name: '第五名-小', num: 0},
                    dan: {name: '第五名-单', num: 0},
                    shuang: {name: '第五名-双', num: 0},
                    long: {name: '第五名-龙', num: 0},
                    hu: {name: '第五名-虎', num: 0}
                },
                q6: {
                    da: {name: '第六名-大', num: 0},
                    xiao: {name: '第六名-小', num: 0},
                    dan: {name: '第六名-单', num: 0},
                    shuang: {name: '第六名-双', num: 0}
                },
                q7: {
                    da: {name: '第七名-大', num: 0},
                    xiao: {name: '第七名-小', num: 0},
                    dan: {name: '第七名-单', num: 0},
                    shuang: {name: '第七名-双', num: 0}
                },
                q8: {
                    da: {name: '第八名-大', num: 0},
                    xiao: {name: '第八名-小', num: 0},
                    dan: {name: '第八名-单', num: 0},
                    shuang: {name: '第八名-双', num: 0}
                },
                q9: {
                    da: {name: '第九名-大', num: 0},
                    xiao: {name: '第九名-小', num: 0},
                    dan: {name: '第九名-单', num: 0},
                    shuang: {name: '第九名-双', num: 0}
                },
                q10: {
                    da: {name: '第十名-大', num: 0},
                    xiao: {name: '第十名-小', num: 0},
                    dan: {name: '第十名-单', num: 0},
                    shuang: {name: '第十名-双', num: 0}
                },
            };

            for (var i = json.length - 1; i >= 0; i--) {
                var value = json[i];
                if (!value.openCode) {
                    continue;
                }
                var openCode = value.openCode.split(",");
                var num1 = Tools.parseInt(openCode[0]);
                var num2 = Tools.parseInt(openCode[1]);
                var num3 = Tools.parseInt(openCode[2]);
                var num4 = Tools.parseInt(openCode[3]);
                var num5 = Tools.parseInt(openCode[4]);
                var num6 = Tools.parseInt(openCode[5]);
                var num7 = Tools.parseInt(openCode[6]);
                var num8 = Tools.parseInt(openCode[7]);
                var num9 = Tools.parseInt(openCode[8]);
                var num10 = Tools.parseInt(openCode[9]);

                if (num1 >= 6) {
                    result.gj.da.num++;
                    result.gj.xiao.num = 0;
                } else {
                    result.gj.da.num = 0;
                    result.gj.xiao.num++;
                }
                if (num1 % 2 == 0) {
                    result.gj.shuang.num++;
                    result.gj.dan.num = 0;
                } else {
                    result.gj.shuang.num = 0;
                    result.gj.dan.num++;
                }

                if (num2 >= 6) {
                    result.yj.da.num++;
                    result.yj.xiao.num = 0;
                } else {
                    result.yj.da.num = 0;
                    result.yj.xiao.num++;
                }
                if (num2 % 2 == 0) {
                    result.yj.shuang.num++;
                    result.yj.dan.num = 0;
                } else {
                    result.yj.shuang.num = 0;
                    result.yj.dan.num++;
                }

                if (num3 >= 6) {
                    result.jj.da.num++;
                    result.jj.xiao.num = 0;
                } else {
                    result.jj.da.num = 0;
                    result.jj.xiao.num++;
                }
                if (num3 % 2 == 0) {
                    result.jj.shuang.num++;
                    result.jj.dan.num = 0;
                } else {
                    result.jj.shuang.num = 0;
                    result.jj.dan.num++;
                }

                if (num4 >= 6) {
                    result.q4.da.num++;
                    result.q4.xiao.num = 0;
                } else {
                    result.q4.da.num = 0;
                    result.q4.xiao.num++;
                }
                if (num4 % 2 == 0) {
                    result.q4.shuang.num++;
                    result.q4.dan.num = 0;
                } else {
                    result.q4.shuang.num = 0;
                    result.q4.dan.num++;
                }

                if (num5 >= 6) {
                    result.q5.da.num++;
                    result.q5.xiao.num = 0;
                } else {
                    result.q5.da.num = 0;
                    result.q5.xiao.num++;
                }
                if (num5 % 2 == 0) {
                    result.q5.shuang.num++;
                    result.q5.dan.num = 0;
                } else {
                    result.q5.shuang.num = 0;
                    result.q5.dan.num++;
                }

                if (num6 >= 6) {
                    result.q6.da.num++;
                    result.q6.xiao.num = 0;
                } else {
                    result.q6.da.num = 0;
                    result.q6.xiao.num++;
                }
                if (num6 % 2 == 0) {
                    result.q6.shuang.num++;
                    result.q6.dan.num = 0;
                } else {
                    result.q6.shuang.num = 0;
                    result.q6.dan.num++;
                }

                if (num7 >= 6) {
                    result.q7.da.num++;
                    result.q7.xiao.num = 0;
                } else {
                    result.q7.da.num = 0;
                    result.q7.xiao.num++;
                }
                if (num7 % 2 == 0) {
                    result.q7.shuang.num++;
                    result.q7.dan.num = 0;
                } else {
                    result.q7.shuang.num = 0;
                    result.q7.dan.num++;
                }

                if (num8 >= 6) {
                    result.q8.da.num++;
                    result.q8.xiao.num = 0;
                } else {
                    result.q8.da.num = 0;
                    result.q8.xiao.num++;
                }
                if (num8 % 2 == 0) {
                    result.q8.shuang.num++;
                    result.q8.dan.num = 0;
                } else {
                    result.q8.shuang.num = 0;
                    result.q8.dan.num++;
                }

                if (num9 >= 6) {
                    result.q9.da.num++;
                    result.q9.xiao.num = 0;
                } else {
                    result.q9.da.num = 0;
                    result.q9.xiao.num++;
                }
                if (num9 % 2 == 0) {
                    result.q9.shuang.num++;
                    result.q9.dan.num = 0;
                } else {
                    result.q9.shuang.num = 0;
                    result.q9.dan.num++;
                }

                if (num10 >= 6) {
                    result.q10.da.num++;
                    result.q10.xiao.num = 0;
                } else {
                    result.q10.da.num = 0;
                    result.q10.xiao.num++;
                }
                if (num10 % 2 == 0) {
                    result.q10.shuang.num++;
                    result.q10.dan.num = 0;
                } else {
                    result.q10.shuang.num = 0;
                    result.q10.dan.num++;
                }

                if (num1 > num10) {
                    result.gj.long.num++;
                    result.gj.hu.num = 0;
                } else if (num1 < num10) {
                    result.gj.long.num = 0;
                    result.gj.hu.num++;
                }

                if (num2 > num9) {
                    result.yj.long.num++;
                    result.yj.hu.num = 0;
                } else if (num2 < num9) {
                    result.yj.long.num = 0;
                    result.yj.hu.num++;
                }

                if (num3 > num8) {
                    result.jj.long.num++;
                    result.jj.hu.num = 0;
                } else if (num3 < num8) {
                    result.jj.long.num = 0;
                    result.jj.hu.num++;
                }

                if (num4 > num7) {
                    result.q4.long.num++;
                    result.q4.hu.num = 0;
                } else if (num4 < num7) {
                    result.q4.long.num = 0;
                    result.q4.hu.num++;
                }

                if (num5 > num6) {
                    result.q5.long.num++;
                    result.q5.hu.num = 0;
                } else if (num5 < num6) {
                    result.q5.long.num = 0;
                    result.q5.hu.num++;
                }
            }

            var arr = [];
            arr.push(result.gj.da);
            arr.push(result.gj.xiao);
            arr.push(result.gj.dan);
            arr.push(result.gj.shuang);
            arr.push(result.yj.da);
            arr.push(result.yj.xiao);
            arr.push(result.yj.dan);
            arr.push(result.yj.shuang);
            arr.push(result.jj.da);
            arr.push(result.jj.xiao);
            arr.push(result.jj.dan);
            arr.push(result.jj.shuang);
            arr.push(result.q4.da);
            arr.push(result.q4.xiao);
            arr.push(result.q4.dan);
            arr.push(result.q4.shuang);
            arr.push(result.q5.da);
            arr.push(result.q5.xiao);
            arr.push(result.q5.dan);
            arr.push(result.q5.shuang);
            arr.push(result.q6.da);
            arr.push(result.q6.xiao);
            arr.push(result.q6.dan);
            arr.push(result.q6.shuang);
            arr.push(result.q7.da);
            arr.push(result.q7.xiao);
            arr.push(result.q7.dan);
            arr.push(result.q7.shuang);
            arr.push(result.q8.da);
            arr.push(result.q8.xiao);
            arr.push(result.q8.dan);
            arr.push(result.q8.shuang);
            arr.push(result.q9.da);
            arr.push(result.q9.xiao);
            arr.push(result.q9.dan);
            arr.push(result.q9.shuang);
            arr.push(result.q10.da);
            arr.push(result.q10.xiao);
            arr.push(result.q10.dan);
            arr.push(result.q10.shuang);
            arr.push(result.gj.long);
            arr.push(result.gj.hu);
            arr.push(result.yj.long);
            arr.push(result.yj.hu);
            arr.push(result.jj.long);
            arr.push(result.jj.hu);
            arr.push(result.q4.long);
            arr.push(result.q4.hu);
            arr.push(result.q5.long);
            arr.push(result.q5.hu);

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
            str += '<td colspan="2">两面长龙排行</td>';
            str += '</tr>';
            str += '<tr>';
            if (json[0].openCode) {
                str += '<td colspan="2">统计至第' + json[0].expect + '期</td>';
            } else {
                str += '<td colspan="2">统计至第' + json[1].expect + '期</td>';
            }
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