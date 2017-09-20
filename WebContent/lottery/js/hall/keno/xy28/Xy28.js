define(['site/hall/common/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        //最新已开奖的期数
        lastOpenedExpect : null,
        init: function () {
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        refreshView: function () {
            var _this = this;
            ajaxRequest({
                url: root + "/commonLottery/getLastOpenedExpect.html",
                data: {code: _this.code},
                success: function (data) {
                    var expect = _this.lastOpenedExpect;
                    if(data && data != _this.lastOpenedExpect){
                        expect = data;
                        _this.lastOpenedExpect = data;
                    }
                    ajaxRequest({
                        url: root + "/commonLottery/getRank.html",
                        data: {expect: expect,code: _this.code},
                        success: function (data) {
                            if (data && data.length > 0) {
                                _this.renderViewRight(data);
                            }
                        }
                    });
                }
            });
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
        /**
         * 组装两面长龙排行数据
         * @param json
         */
        renderViewRight: function (list) {
            // var result = this.getResult();
            // for (var i = 0; i < json.length; ++i) {
            //     this.setRenderAllValue(result,json[i].openCode.split(","));
            // }
            // var list = this.getListByRenderGroup(result);
            var html = Template('template_rank_list', {expect: this.lastOpenedExpect,list:list});
            $(".main-right").html(html);
        }
        // getResult:function(){
        //     return {
        //             da: {name: '和值-大', num: 0},
        //             xiao: {name: '和值-小', num: 0},
        //             dan: {name: '和值-单', num: 0},
        //             shuang: {name: '和值-双', num: 0},
        //             dadan: {name: '和值-大单', num: 0},
        //             xiaodan: {name: '和值-小单', num: 0},
        //             dashuang: {name: '和值-大双', num: 0},
        //             xiaoshuang: {name: '和值-小双', num: 0},
        //             jida: {name: '和值-极大', num: 0},
        //             jixiao: {name: '和值-极小', num: 0},
        //             baozi: {name: '豹子', num: 0},
        //             hong: {name: '和值-红波', num: 0},
        //             lan: {name: '和值-蓝波', num: 0},
        //             lv: {name: '和值-绿波', num: 0}
        //         };
        // },
        // getListByRenderGroup:function(result){
        //     var list = [];
        //     $.each(result,function(key,value){
        //         list.push(value);
        //     });
        //     list.sort(function (a, b) {
        //         return a.num >= b.num?1:-1;
        //     });
        //     return list.reverse();
        // },
        // setRenderAllValue : function(result,openCode){
        //     this.setRenderValue(result,Tools.parseInt(openCode[0]),Tools.parseInt(openCode[1]),Tools.parseInt(openCode[2]))
        // },
        // setRenderValue:function(obj,num1,num2,num3){
        //     var sum = num1+num2+num3;
        //     this.setBigSmall(obj,sum);
        //     //极大小
        //     this.setBestBigSmall(obj,sum);
        //     this.setSingleDouble(obj,sum);
        //     //大小单双
        //     this.setBigSmallSingleDouble(obj,sum);
        //     //红蓝绿波
        //     this.setColorWave(obj,sum);
        //     //豹子
        //     this.setLeopard(obj,num1,num2,num3);
        // },
        // setBigSmall:function(obj,num){
        //     if (num >= 14) {
        //         obj.da.num++;
        //     } else {
        //         obj.xiao.num++;
        //     }
        // },
        // setBestBigSmall:function(obj,num){
        //     if (num >= 22) {
        //         obj.jida.num++;
        //     } else if(num <= 5){
        //         obj.jixiao.num++;
        //     }
        // },
        // setSingleDouble:function(obj,num){
        //     if (num % 2 == 0) {
        //         obj.shuang.num++;
        //     } else {
        //         obj.dan.num++;
        //     }
        // },
        // setBigSmallSingleDouble:function(obj,num){
        //     if (num % 2 != 0 && num >= 14) {
        //         obj.dadan.num++;
        //     } else if (num % 2 != 0 && num < 14) {
        //         obj.xiaodan.num++;
        //     } else if (num % 2 == 0 && num >= 14) {
        //         obj.dashuang.num++;
        //     } else if (num % 2 == 0 && num < 14) {
        //         obj.xiaoshuang.num++;
        //     }
        // },
        // setColorWave:function(obj,num){
        //     if(num != 0 && num != 13 && num != 14 && num != 27){
        //         if(num%3 == 0){
        //             obj.hong.num++;
        //         }else if(num%3 == 1){
        //             obj.lv.num++;
        //         }else{
        //             obj.lan.num++;
        //         }
        //     }
        // },
        // setLeopard:function(obj,num1,num2,num3){
        //     if(num1 == num2 && num1 == num3 && num2 == num3){
        //         obj.jida.num++;
        //     }
        // }
        // renderView: function (json) {
        //     var headList = [],sortList = [];
        //     $("#bottom_zs_table_head .game_result").each(function(i){
        //         headList.push($(this).data("position"));
        //         sortList[i] = {ds: [], dx: []};
        //     });
        //     for (var i = 0; i < json.length; ++i) {
        //         var openCodes = json[i].openCode.split(",");
        //         var sum = 0;
        //         for(var j = 0; j < openCodes.length; j++){
        //             var openCode = Tools.parseInt(openCodes[j]);
        //             this.setOpenCodeSortList(sortList[j], openCode);
        //             sum += openCode;
        //         }
        //         this.setOpenCodeSortList(sortList[sortList.length-1], sum,14);
        //     }
        //     var maxMap = this.getAllMaxMap(headList,sortList);
        //     var html = Template('template_result_list', {maxMap:maxMap,headList: headList});
        //     $("#bottom_zs_table_content").html(html);
        //     for (var i = 0; i < headList.length; ++i) {
        //         var value = sortList[i];
        //         var pre = headList[i];
        //         $.each(value.ds, function (index, value) {
        //             $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
        //         });
        //         $.each(value.dx, function (index, value) {
        //             $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
        //         });
        //     }
        // },
        // setOpenCode:function (list,name) {
        //     var x = 0, y = 0;
        //     if(list.length != 0) {
        //         var preObj = list[list.length - 1];
        //         if (preObj.name == name) {
        //             x = preObj.x;
        //             y = preObj.y + 1;
        //         } else {
        //             x = preObj.x + 1;
        //             y = 0;
        //         }
        //     }
        //     list.push({
        //         name: name,
        //         x: x,
        //         y: y
        //     });
        // },
        // setOpenCodeSortList:function (obj,openCode,bigValue) {
        //     bigValue = (bigValue == undefined || bigValue == '')?5:bigValue;
        //     var name = openCode >= bigValue ? "<font style=\"color:#e70f0f;\">大</font>":"<font style=\"color:#58adff;\">小</font>";
        //     this.setOpenCode(obj.dx,name);
        //     name = openCode % 2 == 0 ? "<font style=\"color:#e70f0f;\">双</font>":"<font style=\"color:#58adff;\">单</font>";
        //     this.setOpenCode(obj.ds,name);
        // },
        // getMaxMap:function(list){
        //     var map = {};
        //     var maxX = 30,maxY = 0;
        //     for(var i = 0; i < list.length; i++){
        //         var obj = list[i];
        //         if (obj.x > maxX) {
        //             maxX = obj.x;
        //         }
        //         if (obj.y > maxY) {
        //             maxY = obj.y;
        //         }
        //     }
        //     map.maxX = new Array(maxX+1);
        //     map.maxY = new Array(maxY+1);
        //     return map;
        // },
        // getAllMaxMap:function(headList,sortList){
        //     var maxMap = {};
        //     for(var i = 0; i < headList.length; i++){
        //         var head = headList[i];
        //         var sortObj = sortList[i];
        //         maxMap[head+"_dx"] = this.getMaxMap(sortObj.dx);
        //         maxMap[head+"_ds"] = this.getMaxMap(sortObj.ds);
        //     }
        //     return maxMap;
        // }
    })
})