/**
 * Created by ke on 15-6-26.
 */
define(['common/BasePage'], function (BasePage) {
    var strTime="";
    var timeCount =0;
    return BasePage.extend({
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
            _this.syncUserTime();
            this.defaultDomain();
        },
        bindEvent:function () {
            $('.top-tip',this.formSelector).popover({
                trigger: 'hover',
                html: true,
                delay: {show: 100, hide: 100}
            });
            $(".top-online-people").mouseover(function(){
                $(this).addClass("open");
            });
            $(".top-online-people").mouseout(function(){
                $(this).removeClass("open");
            });
        },
        defaultDomain: function () {
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                url: root + '/index/getDomain.html',
                success: function(data) {
                    if (data == 'true') {
                        //主域名和管理中心域名都是首次添加
                        window.top.topPage.doDialog({page:_this},{text:window.top.message.common['msg'],target: root + "/sysDomainOperator/toDefaultDomain.html",callback:""});
                    }
                }
            });
        },

        /**
         * 判断是否有未读任务(提示消息声音的条件：1、是否提醒消息标识为true;2、未读消息数量>0)
         * @returns {boolean}
         */
        hasTask: function () {
            var span = $('.tasks').children().children('span')[0];
            var taskCount = parseInt($(span).text());
            var isReminderTask = $('#isReminderTask').val();
            if (taskCount > 0 && isReminderTask == 'true') {
                return true;
            } else {
                return false;
            }
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