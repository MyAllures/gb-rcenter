/**
 * 六合彩基本玩法
 */
define(['site/hall/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        zodiacMap:undefined,
        showZodiac:false,
        clickFlag:false,
        init: function () {
            this._super();
        },/**
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
        }
    });
});