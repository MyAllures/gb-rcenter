/**
 * 六合彩基本玩法
 */
define(['site/hall/Common'], function (Common) {
    return Common.extend({
        zodiacMap:undefined,
        showZodiac:false,
        clickFlag:false,
        isLhcOpen:true,
        init: function () {
            this._super();
        },

        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "special","jspStr":"Special"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },


        checkSubordinate : function (betCode,thisClassList){
            var _this = this;
            if(betCode !='tema'){
                $("div.s-menu.second").hide();
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode=$("a.selected-btn.mui-active").attr("data-code");
                var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
                if($("a.selected-btn.main.mui-active").size()>0){
                    dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
                }
                if(
                dataCode !="positiveSpecial"
                && dataCode !="linkCode"
                && dataCode !="sumZodiac"
                && dataCode !="linkZodiac"
                && dataCode !="mantissaLink"
                && dataCode !="allNoIn"
                ){
                    _this.closeTop();
                }

                if(betCode =="positiveSpecial" && jspName==undefined){//三星
                    jspName="PositiveSpecial";
                    dataCode="正码一";
                }else if(betCode =="linkCode" && jspName==undefined){//前二
                    jspName="LinkCode";
                    dataCode="三全中";
                }else if(betCode =="sumZodiac" && jspName==undefined){//后二
                    jspName="SumZodiac";
                    dataCode="二肖";
                }else if(betCode =="linkZodiac" && jspName==undefined){//定位胆
                    jspName="LinkZodiac";
                    dataCode="二肖连";
                }else if(betCode =="mantissaLink" && jspName==undefined){//不定位
                    jspName="MantissaLink";
                    dataCode="二尾连";
                }else if(betCode =="allNoIn" && jspName==undefined){
                    jspName="AllNoIn";
                    dataCode="五不中";
                }

                _this.getBetTable(dataCode,jspName);
                _this.resetBet();
            }
        },




        /**
         * 展示上一期中奖号码，可根据实际彩种直接重写
         * @param numArr
         */
        showLastOpenCode: function (numArr) {
            var _this = this;
            this.showZodiac = false;
            this.zodiacMap = undefined;
            this.setZodiacList(numArr.join(","),this._super(numArr))
            mui("body").on('tap', 'div#lastOpenCode i.switch-lhc-i', function () {
                _this.clickFlag = true;
                _this.changeOpenValue();
            });
        },
        changeOpenValue:function(){
            var _this = this;
            if(_this.clickFlag){
                if(_this.zodiacMap != undefined){
                    if(_this.showZodiac){
                        //生肖转数字
                        for(var key in _this.zodiacMap){
                            $("#lastOpenCode .lhc-num[num="+key+"]").html(key);
                        }
                    }else{
                        //数字转生肖
                        for(var key in _this.zodiacMap){
                            $("#lastOpenCode .lhc-num[num="+key+"]").html(_this.zodiacMap[key]);
                        }
                        setTimeout(function () {
                            _this.clickFlag = false;
                            _this.changeOpenValue();
                        }, 3000);
                    }
                    _this.showZodiac = !_this.showZodiac;
                }
            }else{
                if(_this.zodiacMap != undefined){
                    if(_this.showZodiac){
                        //生肖转数字
                        for(var key in _this.zodiacMap){
                            $("#lastOpenCode .lhc-num[num="+key+"]").html(key);
                        }
                    }
                    _this.showZodiac = false;
                }
            }
        },

        /**
         * 获取生肖列表
         */
        setZodiacList:function(openCode,callback){
            var _this = this;
            mui.ajax(root + '/' + this.type + '/' + this.code + '/getZodiacNameList.html', {
                type: 'POST',
                data:{openCode:openCode},
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        _this.zodiacMap = data;
                    }
                    if(typeof callback == "function"){
                        callback();
                    }
                },
                error: function (e) {
                    if(typeof callback == "function"){
                        callback();
                    }
                    console.log("setZodiacList error:"+e)
                }
            });
        },
        //组合函数
        combination : function (arr, size) {
            var allResult = [];
            if(arr.length >= size){
                this.combinationSelect(allResult,arr,0,new Array(),0,size);
            }
            return allResult;
        },
        combinationSelect : function(allResult,dataList,dataIndex,resultCode,resultIndex,resultLen){
            var resultCount = resultIndex + 1;
            if (resultCount > resultLen) { // 全部选择完时，输出组合结果
                allResult.push(resultCode.join(","));
                return;
            }
            var count = dataList.length + resultCount - resultLen;
            for (var i = dataIndex; i < count; i++) {
                resultCode[resultIndex] = dataList[i];
                this.combinationSelect(allResult,dataList, i + 1, resultCode, resultIndex + 1,resultLen);
            }
        },
        //求组合数
        combinationNum : function(m,n) {
            var o = 1;
            var j = m - n + 1;
            while (m >= j) {
                o *= m--;
            }
            if(o==0){
                return 0;
            }
            while (n >= 1) {
                o /= n--;
            }
            return o;
        },
        getHandicap:function ( ) {
            if (this.isRunning) {
                return;
            }
            var _this = this;
            var url = root + '/commonLottery/getExpect.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                async: false,
                data: {'code': this.code},
                beforeSend: function () {
                    _this.isRunning = true;
                },
                success: function (data) {
                    if (data) {
                        var expect = $("#expect").text();
                        $("#expect").html(data.expect);
                        $("#leftTime").attr("data-time", data.leftTime);
                        if (_this.code == 'hklhc' &&_this.isLhcOpen && data.leftOpenTime >0){
                            _this.closeLhcHandicap();
                            $("#leftTime").parent().html("距离开盘时间还有：<font id='leftTime' >")
                            $("#leftTime").attr("data-time", data.leftOpenTime);
                            _this.isLhcOpen = false;
                            _this.showClearPopups();
                        }
                        if (_this.code == 'hklhc' && !_this.isLhcOpen&& data.leftOpenTime <=0){
                            var dtime = $("#leftTime").attr("data-time");

                            //leftTimeTitle

                            //$("#leftTime").parent().html("距离封盘时间还有：<font id='leftTime' >")
                            $("#leftTime").attr("data-time", dtime);
                            _this.isLhcOpen = true;
                            _this.openLhcHandicap();
                        }
                        if (typeof callback == 'function') {
                            callback();
                        }
                    } else { //handicap为空
                        $(".mui-table-view-cell.mui-collapse").html('sorry,该彩票暂停!');
                    }
                },
                complete: function () {
                    _this.isRunning = false;
                }
            })
        },
        closeLhcHandicap:function () {
            $(".fengPan").addClass("disabled");
            $("#inputMoney").attr("placeholder","已封盘");
            $("#inputMoney").attr("disabled",true);
            $("a#show-t").addClass("disabled-btn");
            $("a#show-t").attr("id","show_t");
        },
        openLhcHandicap:function () {
            $(".fengPan").removeClass("disabled");
            $("#inputMoney").attr("placeholder","");
            $("#inputMoney").attr("disabled",false);
            $("a#show_t").removeClass("disabled-btn");
            $("a#show_t").attr("id","show-t");
            /** 小彩种 */
            this.code = $(this.formSelector + ' input[name=code]').val();
            this.type = $(this.formSelector + " input[name=type]").val();
            this.betCode = $(this.formSelector + " .ssc-method-list .ssc-method-label a.mui-active").attr("data-code");
            this.getOpenHistory();
            this.muiInit();
            this.iosGoBack();
            if(this.os == 'pc') {
                //已应对在h5下金额输入框不能输入
                $("input#inputMoney").focus();
            }
        },
        showClearPopup:function () {

        },
        showClearPopups: function () {
            console.log("封盘了")
            if (this.clearPopFlag) {
                return;
            }
            mui.toast("当前期已封盘，请等待下期开盘.");
            var time = 5;
            var _this = this;
            this.clearPopLayer = setInterval(function () {
                if (time == 0) {
                    _this.closeClearPopup();
                    return;
                }
                $(".clearBet_time").html(time);
                --time;
            }, 1000)
        }
    });
});