define(['site/hall/common/Common','site/plugin/template'], function (Common,Template) {
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

        /**
         * 渲染最近一期开奖号
         */
        renderLastOpenCode: function (openCodeArr) {
            var _this=this;
            var arr = new Array;
            var sxArr = "";
            for (var i = 0; i < openCodeArr.length; i++) {
                var data = {};
                data.num = openCodeArr[i];
                data.colour = this.numColour(data.num);
                arr.push(data);
                sxArr =sxArr+openCodeArr[i]+","
            }
            _this.setZodiacList(sxArr,arr);
        },

        /**
         * 获取生肖列表
         */
        setZodiacList:function(openCode,arr){
            ajaxRequest({
                url: root + '/lhc/hklhc/getZodiacNameList.html',
                data: {"openCode": openCode},
                success: function (data) {
                    var arrSX = new Array;
                    this.lhcData=data;
                    for(var i=0;i<arr.length;i++){
                        arrSX.push(this.lhcData[arr[i].num])
                    }
                    var tmpStr = Template('template_recent1History', {list: arr, listSx:arrSX});
                    $("#lastOpenCode").html(tmpStr);
                },

            });
        },/**
         * 加载计算倒计时
         */
        loadLeftTime: function () {
            var _this = this;
            setTimeout(function(){
                _this.loadLeftTime();
            },1000);
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
        }

    })
})