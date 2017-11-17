define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','validate'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this.formSelector = "#countDownForm";
            this._super();
        },
        bindEvent:function()
        {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            var leftTime = $(this.formSelector + " #leftTime[data-time]");
            if (leftTime && leftTime.length > 0) {
                _this.showLeftTime();
                var interval = setInterval(function () {
                    _this.showLeftTime(interval)
                }, 1000);
            }
        },
        showLeftTime: function (interval) {
            var leftTime = $("#leftTime[data-time]");
            if ((!leftTime || leftTime.length == 0) && interval) {
                window.clearInterval(interval);
                return;
            }
            var time = $(leftTime).attr("data-time");
            if (time < 0 && interval) {
                window.clearInterval(interval);
                return;
            }
            var tmpTime = Number(time);
            var hour = Math.floor(tmpTime / 3600);
            tmpTime = tmpTime - hour * 3600;
            var minute = Math.floor(tmpTime / 60);
            if (minute < 10) {
                minute = '0' + minute;
            }
            var second = tmpTime - minute * 60;
            $("span#hour").text(hour);
            $("span#minute").text(minute);
            $('span#second').text(second);
            $("#leftTime[data-time]").attr("data-time", --time);
        }
    });
});