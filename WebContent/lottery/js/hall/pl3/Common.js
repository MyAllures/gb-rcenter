define(['site/hall/common/Common','site/plugin/template'], function (Common,Template) {
    return Common.extend({
        //用于彩判断是否封盘
        isCodeOpen: true,
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
        changeTable: function () {
            var position = $("#bottom_zs_table_head tbody tr th.choose").data("position");
            var type = $("#bottom_zs_table_select tbody tr th.choose").data("type");
            $("#bottom_zs_table_content table").hide();
            $('#bottom_zs_table_' + position + '_' + type).show();
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
            var result = this.getResult();
            for (var i = 0; i < json.length; ++i) {
                this.setRenderAllValue(result,json[i].openCode.split(","));
            }
            var list = this.getListByRenderGroup(result);
            //只展示前6
            var html = Template('template_rank_list', {expect: json[json.length - 1].expect,list:list.slice(0,6)});
            $(".main-right").html(html);
        },
        getResult:function(){
            return [{
                da: {name: '第一球-大', num: 0},
                xiao: {name: '第一球-小', num: 0},
                dan: {name: '第一球-单', num: 0},
                shuang: {name: '第一球-双', num: 0}
            },{
                da: {name: '第二球-大', num: 0},
                xiao: {name: '第二球-小', num: 0},
                dan: {name: '第二球-单', num: 0},
                shuang: {name: '第二球-双', num: 0}
            },{
                da: {name: '第三球-大', num: 0},
                xiao: {name: '第三球-小', num: 0},
                dan: {name: '第三球-单', num: 0},
                shuang: {name: '第三球-双', num: 0}
            }];
        },
        getListByRenderGroup:function(result){
            var list = [];
            for(var i = 0; i < result.length; i++){
                list.push(result[i].da);
                list.push(result[i].xiao);
                list.push(result[i].dan);
                list.push(result[i].shuang);
            }
            list.sort(function (a, b) {
                return a.num >= b.num?1:-1;
            });
            return list.reverse();
        },
        setRenderAllValue : function(result,openCode){
            for(var i=0; i < result.length; i++){
                this.setRenderValue(result[i],Tools.parseInt(openCode[i]))
            }
        },
        setRenderValue:function(obj,num){
            this.setBigSmall(obj,num);
            this.setSingleDouble(obj,num);
        },
        setBigSmall:function(obj,num){
            if (num >= 5) {
                obj.da.num++;
                obj.xiao.num = 0;
            } else {
                obj.da.num = 0;
                obj.xiao.num++;
            }
        },setSingleDouble:function(obj,num){
            if (num % 2 == 0) {
                obj.shuang.num++;
                obj.dan.num = 0;
            } else {
                obj.shuang.num = 0;
                obj.dan.num++;
            }
        },
        renderView: function (json) {
            var headList = [],sortList = [];
            $("#bottom_zs_table_head .game_result").each(function(i){
                headList.push($(this).data("position"));
                sortList[i] = {ds: [], dx: []};
            });
            for (var i = 0; i < json.length; ++i) {
                var openCodes = json[i].openCode.split(",");
                var sum = 0;
                for(var j = 0; j < openCodes.length; j++){
                    var openCode = Tools.parseInt(openCodes[j]);
                    this.setOpenCodeSortList(sortList[j], openCode);
                    sum += openCode;
                }
                this.setOpenCodeSortList(sortList[sortList.length-1], sum,14);
            }
            var maxMap = this.getAllMaxMap(headList,sortList);
            var html = Template('template_result_list', {maxMap:maxMap,headList: headList});
            $("#bottom_zs_table_content").html(html);
            for (var i = 0; i < headList.length; ++i) {
                var value = sortList[i];
                var pre = headList[i];
                $.each(value.ds, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
                $.each(value.dx, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
            }
        },
        setOpenCode:function (list,name) {
            var x = 0, y = 0;
            if(list.length != 0) {
                var preObj = list[list.length - 1];
                if (preObj.name == name) {
                    x = preObj.x;
                    y = preObj.y + 1;
                } else {
                    x = preObj.x + 1;
                    y = 0;
                }
            }
            list.push({
                name: name,
                x: x,
                y: y
            });
        },
        setOpenCodeSortList:function (obj,openCode,bigValue) {
            bigValue = (bigValue == undefined || bigValue == '')?5:bigValue;
            var name = openCode >= bigValue ? "<font style=\"color:#e70f0f;\">大</font>":"<font style=\"color:#58adff;\">小</font>";
            this.setOpenCode(obj.dx,name);
            name = openCode % 2 == 0 ? "<font style=\"color:#e70f0f;\">双</font>":"<font style=\"color:#58adff;\">单</font>";
            this.setOpenCode(obj.ds,name);
        },
        getMaxMap:function(list){
            var map = {};
            var maxX = 30,maxY = 0;
            for(var i = 0; i < list.length; i++){
                var obj = list[i];
                if (obj.x > maxX) {
                    maxX = obj.x;
                }
                if (obj.y > maxY) {
                    maxY = obj.y;
                }
            }
            map.maxX = new Array(maxX+1);
            map.maxY = new Array(maxY+1);
            return map;
        },
        getAllMaxMap:function(headList,sortList){
            var maxMap = {};
            for(var i = 0; i < headList.length; i++){
                var head = headList[i];
                var sortObj = sortList[i];
                maxMap[head+"_dx"] = this.getMaxMap(sortObj.dx);
                maxMap[head+"_ds"] = this.getMaxMap(sortObj.ds);
            }
            return maxMap;
        },

        /**
         * 获取子页
         * @param url
         */
        getSubPage: function (url) {
            var _this = this;
            var subUrl = _this.baseUrl + "/" + url.split("-").join("/") + ".html";
            ajaxRequest({
                url: subUrl,
                type: 'GET',
                dataType: 'html',
                beforeSend: function () {
                    $("#subContent").html('<img src="' + resRoot + '/themes/default/img/base_loading.gif" style="display: block;margin: auto;margin: 50px auto;">');
                },
                success: function (html) {
                    // 读取HTML页内容
                    $("#subContent").html(html);
                    //原来这里有初始化内容js统一放在PlayWay.js里
                }
            });
        },/**
         * 加载计算倒计时
         */
            loadLeftTime: function () {
            var _this = this;
            var $left = $("div#leftTime");
            var time = $left.attr("data-time");
            if (isNaN(time) || time < 0) {
                // 5秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
                if (this.successTime != null && (new Date()).getTime() - this.successTime < 5 * 1000) {
                    return;
                }
                if (time == -1) {
                    //赋值，用来判断是否开奖中
                    this.curExpect = $("#expect").text();
                    if( $("p#tip").text().indexOf("封盘") >0){
                    this.showClearPopup();
                    }
                }
                this.getHandicap(function () {
                    _this.successTime = (new Date()).getTime();
                    _this.getOpenHistory();
                });
                $left.attr("data-time", --time);
                return;
            }
            this.showLeftTime(time);
        },
        getHandicap: function (callback) {
            if (this.isRunning) return;
            var _this = this;
            ajaxRequest({
                url: root + '/commonLottery/getExpect.html',
                data: {'code': this.code},
                beforeSend: function () {
                    this.isRunning = true;
                },
                success: function (data) {
                    if (data) {
                        var expect = $("i.expect").text();
                        if (data.opening) {
                            if ((_this.code == 'fc3d'||_this.code == 'tcpl3')  && data.leftOpenTime >0){
                                $("div#leftTime").attr("data-time", data.leftOpenTime);
                                $("p#tip").html("<i class='expect' style='color: red;font-weight:bold;font-size: 13px;'></i>期距离开盘还有:");
                                $("p#tip").data("opening", data.opening);
                                //前端封盘控制
                                if (_this.isCodeOpen){
                                    _this.isCodeOpen = false;
                                    if (typeof page.playWay != 'undefined') {
                                        page.playWay.closeLhcHandicap();
                                    }
                                }

                            }else {
                                if ((_this.code == 'fc3d'||_this.code == 'tcpl3')  && !_this.isCodeOpen){
                                    _this.isCodeOpen = true;
                                    if (typeof page.playWay != 'undefined'){
                                        page.playWay.openLhcHandicap();
                                    }
                                }
                                $("div#leftTime").attr("data-time", data.leftTime);
                                $("p#tip").html("<i class='expect' style='color: red;font-weight:bold;font-size: 13px;'></i>期已开盘，欢迎投注。距离封盘还有:");
                                $("p#tip").data("opening", data.opening);
                            }
                        }
                        $('i.expect').text(data.expect);
                        if (expect && expect == data.expect) { //重新获取盘口数据以防因为封盘时间比实际早，导致通过接口查询的期数值不对，要加１
                            $('i.expect').text(Number(expect) + 1);
                        }
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                },
                complete: function () {
                    this.isRunning = false;
                }
            });
        },
    })

});

