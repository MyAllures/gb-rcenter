/**
 * Created by ke on 15-6-26.
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        timeInterval:null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        dateTimeFromat:"",
        init: function () {
            var _this=this;
            _this._super();
            _this.showTask();
            _this.syncUserTime()
        },
        /**
         * 显示/关闭消息下拉框
         */
        //FixMe Add By Tony 使用bindEvent
        showTask: function () {
            $('.tasks').children('a').click(function () {
                var href = $(this).attr("data-href");
                $(this).parent().find('dl').load(href);
            });
        },
        /**
         * 根据用户的时区时间变化页面时间
         */
        userTime: function () {
            var _this=this;
            if(_this.dateTimeFromat!=undefined) {
                var date = new Date();
                //date.setTime(parseInt($(".clock-show").attr("time"))+1000);
                //$(".clock-show").attr("time",date.getTime());
                //var date$go = new Date('2015-08-31')
                $(".clock-show").text(window.top.topPage.formatToMyDateTime(date, _this.dateTimeFromat));
            }
        },
        /**
         * 与服务器同步用用户时间，修正误差
         */
        syncUserTime:function(){
            var _this=this;
            window.top.topPage.ajax({
                url:root + '/index/getUserTimeZoneDate.html',
                dataType:"json",
                success:function(data){
                    _this.dateTimeFromat=data.dateTimeFromat;
                    $(".clock-show").text(data.dateTime);
                    $(".clock-show").attr("time",data.time);
                    $(".clock-show").css("display","inline");
                    //$(".nav-shadow .clock-show label").text(data.dateTime);
                    window.setTimeout(function() {
                        _this.syncUserTime();
                    }, 360000);
                    if(_this.timeInterval!=null) {
                        window.clearInterval(_this.timeInterval);
                    }
                    _this.timeInterval=window.setInterval(function () {
                        _this.userTime();
                    },1000);
                }
            });
        }
    });
});