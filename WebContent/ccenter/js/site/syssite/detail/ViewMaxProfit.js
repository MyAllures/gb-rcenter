define(['common/BaseEditPage'], function(BaseEditPage) {
    var _this=this;
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#viewMaxProfitForm";
            this._super();
            $(".tab-content > .tab-pane").css("display","block");
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var _this = this;
            var leftTime = $(this.formSelector + " #leftTime[data-time]");
            if (leftTime && leftTime.length > 0) {
                _this.showLeftTime();
                var interval = setInterval(function () {
                    _this.showLeftTime(interval)
                }, 60 * 1000);
            }
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this=this;
            //这里初始化所有的事件
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
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
            var hour = Math.floor(tmpTime / 60);
            tmpTime = tmpTime - hour * 60;
            var minute = tmpTime;
            if (minute < 10) {
                minute = '0' + minute;
            }
            $("span#hour").text(hour);
            $("span#minute").text(minute);
            $("#leftTime[data-time]").attr("data-time", time--);
        }
    });
});