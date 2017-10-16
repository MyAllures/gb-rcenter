define(['site/hall/common/Common'], function (Common) {
    return Common.extend({
        init: function () {
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            $("#subContent").on("click","#bottom_zs_table_head tbody tr th, #bottom_zs_table_select tbody tr th",function () {
                $(this).parent().find(".choose").removeClass("choose");
                $(this).addClass("choose");
                _this.changeTable();
            });
        },
        onPageLoad: function () {
            this._super();
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
                        _this.renderView(data);
                        _this.changeTable();
                    }
                }
            });
        },
        changeTable: function () {
            var position = $("#bottom_zs_table_head tbody tr th.choose").data("position");
            var type = $("#bottom_zs_table_select tbody tr th.choose").data("type");
            $("#bottom_zs_table_content table").hide();
            $('#bottom_zs_table_' + position + '_' + type).show();
        },
        /**
         * 组装两面长龙排行数据
         * @param json
         */
        renderViewRight: function (json) {
            var result = {
                wan: {
                    da: {name: '第一球-大', num: 0},
                    xiao: {name: '第一球-小', num: 0},
                    dan: {name: '第一球-单', num: 0},
                    shuang: {name: '第一球-双', num: 0}
                },
                qian: {
                    da: {name: '第二球-大', num: 0},
                    xiao: {name: '第二球-小', num: 0},
                    dan: {name: '第二球-单', num: 0},
                    shuang: {name: '第二球-双', num: 0}
                },
                bai: {
                    da: {name: '第三球-大', num: 0},
                    xiao: {name: '第三球-小', num: 0},
                    dan: {name: '第三球-单', num: 0},
                    shuang: {name: '第三球-双', num: 0}
                },
                shi: {
                    da: {name: '第四球-大', num: 0},
                    xiao: {name: '第四球-小', num: 0},
                    dan: {name: '第四球-单', num: 0},
                    shuang: {name: '第四球-双', num: 0}
                },
                ge: {
                    da: {name: '第五球-大', num: 0},
                    xiao: {name: '第五球-小', num: 0},
                    dan: {name: '第五球-单', num: 0},
                    shuang: {name: '第五球-双', num: 0}
                },
                lhh: {long: {name: '龙', num: 0}, hu: {name: '虎', num: 0}, he: {name: '和', num: 0}}
            };

            for (var i = 0; i < json.length; ++i) {
                var value = json[i];
                var openCode = value.openCode.split(",");
                var num1 = Tools.parseInt(openCode[0]);
                var num2 = Tools.parseInt(openCode[1]);
                var num3 = Tools.parseInt(openCode[2]);
                var num4 = Tools.parseInt(openCode[3]);
                var num5 = Tools.parseInt(openCode[4]);

                if (num1 >= 5) {
                    result.wan.da.num++;
                    result.wan.xiao.num = 0;
                } else {
                    result.wan.da.num = 0;
                    result.wan.xiao.num++;
                }
                if (num1 % 2 == 0) {
                    result.wan.shuang.num++;
                    result.wan.dan.num = 0;
                } else {
                    result.wan.shuang.num = 0;
                    result.wan.dan.num++;
                }

                if (num2 >= 5) {
                    result.qian.da.num++;
                    result.qian.xiao.num = 0;
                } else {
                    result.qian.da.num = 0;
                    result.qian.xiao.num++;
                }
                if (num2 % 2 == 0) {
                    result.qian.shuang.num++;
                    result.qian.dan.num = 0;
                } else {
                    result.qian.shuang.num = 0;
                    result.qian.dan.num++;
                }

                if (num3 >= 5) {
                    result.bai.da.num++;
                    result.bai.xiao.num = 0;
                } else {
                    result.bai.da.num = 0;
                    result.bai.xiao.num++;
                }
                if (num3 % 2 == 0) {
                    result.bai.shuang.num++;
                    result.bai.dan.num = 0;
                } else {
                    result.bai.shuang.num = 0;
                    result.bai.dan.num++;
                }

                if (num4 >= 5) {
                    result.shi.da.num++;
                    result.shi.xiao.num = 0;
                } else {
                    result.shi.da.num = 0;
                    result.shi.xiao.num++;
                }
                if (num4 % 2 == 0) {
                    result.shi.shuang.num++;
                    result.shi.dan.num = 0;
                } else {
                    result.shi.shuang.num = 0;
                    result.shi.dan.num++;
                }

                if (num5 >= 5) {
                    result.ge.da.num++;
                    result.ge.xiao.num = 0;
                } else {
                    result.ge.da.num = 0;
                    result.ge.xiao.num++;
                }
                if (num5 % 2 == 0) {
                    result.ge.shuang.num++;
                    result.ge.dan.num = 0;
                } else {
                    result.ge.shuang.num = 0;
                    result.ge.dan.num++;
                }

                if (num1 > num5) {
                    result.lhh.long.num++;
                    result.lhh.he.num = 0;
                    result.lhh.hu.num = 0;
                } else if (num1 == num5) {
                    result.lhh.long.num = 0;
                    result.lhh.he.num++;
                    result.lhh.hu.num = 0;
                } else {
                    result.lhh.long.num = 0;
                    result.lhh.he.num = 0;
                    result.lhh.hu.num++;
                }
            }

            var arr = [];
            arr.push(result.wan.da);
            arr.push(result.wan.xiao);
            arr.push(result.wan.dan);
            arr.push(result.wan.shuang);
            arr.push(result.qian.da);
            arr.push(result.qian.xiao);
            arr.push(result.qian.dan);
            arr.push(result.qian.shuang);
            arr.push(result.bai.da);
            arr.push(result.bai.xiao);
            arr.push(result.bai.dan);
            arr.push(result.bai.shuang);
            arr.push(result.shi.da);
            arr.push(result.shi.xiao);
            arr.push(result.shi.dan);
            arr.push(result.shi.shuang);
            arr.push(result.ge.da);
            arr.push(result.ge.xiao);
            arr.push(result.ge.dan);
            arr.push(result.ge.shuang);
            arr.push(result.lhh.long);
            arr.push(result.lhh.hu);
            arr.push(result.lhh.he);
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
        },

        renderView: function (json) {
            var result = [];
            for (var i = 0; i < 6; ++i) {
                result[i] = {ds: [], dx: []};
            }
            var str = '';
            $("#bottom_zs_table_head tbody tr th").each(function () {
                var position = $(this).data("position");
                if (position != 'zh') {
                    // 单双
                    str += '<table id="bottom_zs_table_' + position + '_ds" width="100%" border="0" class="resultLoad" style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = Tools.parseInt(json[i].openCode.split(",")[Tools.parseInt(position)]);

                        var name = value % 2 == 0 ? '<font style="color:#e70f0f;">双</font>' : '<font style="color:#58adff;">单</font>';
                        var x = 0, y = 0;

                        if (result[Tools.parseInt(position)].ds.length != 0) {
                            var preObj = result[Tools.parseInt(position)].ds[i - 1];
                            if (preObj.name == name) {
                                x = preObj.x;
                                y = preObj.y + 1;
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[Tools.parseInt(position)].ds.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[Tools.parseInt(position)].ds, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY + 1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';


                    // 大小
                    str += '<table id="bottom_zs_table_' + position + '_dx" width="100%" border="0" class="resultLoad" style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = json[i].openCode.split(",")[Tools.parseInt(position)];
                        var name = value >= 5 ? '<font style="color:#e70f0f;">大</font>' : '<font style="color:#58adff;">小</font>';
                        var x = 0, y = 0;

                        if (result[Tools.parseInt(position)].dx.length != 0) {
                            var preObj = result[Tools.parseInt(position)].dx[i - 1];
                            if (preObj.name == name) {
                                x = preObj.x;
                                y = preObj.y + 1;
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[Tools.parseInt(position)].dx.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[Tools.parseInt(position)].dx, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY + 1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';
                } else {
                    // 单双
                    str += '<table id="bottom_zs_table_' + position + '_ds" width="100%" border="0" class="resultLoad" style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = 0;
                        for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                            value += Tools.parseInt(tmpArr[j]);
                        }

                        var name = value % 2 == 0 ? '<font style="color:#e70f0f;">双</font>' : '<font style="color:#58adff;">单</font>';
                        var x = 0, y = 0;

                        if (result[5].ds.length != 0) {
                            var preObj = result[5].ds[i - 1];
                            if (preObj.name == name) {
                                x = preObj.x;
                                y = preObj.y + 1;
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[5].ds.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[5].ds, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY + 1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';


                    // 大小
                    str += '<table id="bottom_zs_table_' + position + '_dx" width="100%" border="0" class="resultLoad" style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = 0;
                        for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                            value += Tools.parseInt(tmpArr[j]);
                        }
                        var name = value >= 23 ? '<font style="color:#e70f0f;">大</font>' : '<font style="color:#58adff;">小</font>';
                        var x = 0, y = 0;

                        if (result[5].dx.length != 0) {
                            var preObj = result[5].dx[i - 1];
                            if (preObj.name == name) {
                                x = preObj.x;
                                y = preObj.y + 1;
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[5].dx.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[5].dx, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY + 1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';
                }
            });

            $("#bottom_zs_table_content").html(str);
            for (var i = 0; i < 6; ++i) {
                var value = result[i];

                var pre = i == 5 ? 'zh' : i;
                $.each(value.ds, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
                $.each(value.dx, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
            }
        },
        /**
         * 关闭弹窗
         */
        closeClearPopup: function (isReset) {
            if (this.T) {
                clearInterval(this.T);
                this.T = null;
            }
            if (page.layerId) {
                layer.close(this.layerId);
                this.layerId = null;
            }
            if (typeof page.PlayWay != "undefined"  && typeof page.PlayWay.layerInfo != 'undefined' && page.PlayWay.layerInfo != null) {
                layer.close(page.PlayWay.layerInfo);
                page.PlayWay.layerInfo = null;
            }

            if (typeof page.PlayWay != "undefined"  && typeof page.PlayWay.layerInfoInsert != 'undefined' && page.PlayWay.layerInfoInsert != null) {
                layer.close(page.PlayWay.layerInfoInsert);
                page.PlayWay.layerInfoInsert = null;
            }

            if (typeof page.PlayWay != "undefined"  &&  typeof page.PlayWay.layerTishi1 != 'undefined' && page.PlayWay.layerTishi1 != null) {
                layer.close(page.PlayWay.layerTishi1);
                page.PlayWay.layerTishi1 = null;
            }
            if (typeof page.PlayWay != "undefined"  &&  typeof page.PlayWay.layerTishi2 != 'undefined' && page.PlayWay.layerTishi2 != null) {
                layer.close(page.PlayWay.layerTishi2);
                page.PlayWay.layerTishi2 = null;
            }

            if (typeof isReset != 'undefined') {
                if (isReset && typeof this.reset == 'function') {
                    this.reset();
                }
                if(typeof page.PlayWay != "undefined"  && isReset){
                    page.PlayWay.clearSelected();
                    page.PlayWay.clearTextarea();
                    page.PlayWay.clearContent();
                }
            }
        },
    })

});

