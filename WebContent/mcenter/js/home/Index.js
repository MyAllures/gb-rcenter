/**
 * 管理首页-首页js
 */
define(['common/BasePage', 'site/home/include/Chart', 'site/home/include/Table', 'inspinia'], function (BasePage, chart, table) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        chart: null,
        table: null,
        init: function () {
            this.formSelector = "form[name=mainFrame]";
            this.chart = new chart();
            this.table = new table();
            this._super();
        },
        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $(window).resize(function(){
                _this.gameDataDaySize();
            });
        },
        onPageLoad: function() {
            this._super();
            var _this=this;
            $('.top-tip',_this.formSelector).popover({
                trigger: 'hover',
                html: true,
                delay: {show: 100, hide: 100}
            });
            this.checkBrowser();
            this.syncUserTime();
            this.gameDataDaySize();
            this.loadOperateData();
        },

        /** 图表模式 */
        chartModel: function (e) {
            $(e.currentTarget).addClass('hide');
            $('a.chart_model').removeClass('hide');
            $('#chart').show();
            $('#table').hide();
            $('.showData').removeAttr('disabled');
            $(e.currentTarget).unlock();
        },
        /** 报表模式 */
        tableModel: function (e) {
            $(e.currentTarget).addClass('hide');
            $('a.table_model').removeClass('hide');
            $('#table').show();
            $('#chart').hide();
            $('.showData').attr('disabled', 'disabled');
            $(e.currentTarget).unlock();
        },
        
        /** 运营数据 */
        loadOperateData: function () {
            var _this=this;
            window.top.topPage.ajax({
                url: root + '/home/operateData.html?t=' + new Date().getTime(),
                dateType: 'html',
                success: function (data) {
                    $('#operate').html($('div.operate', $(data)).html());
                    $('#operate [data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover',
                        html: true,
                        delay: {show: 100, hide: 100}
                    });
                    //有效投注额异步请求
                    _this.effectiveData();
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },
        //有效投注额异步请求
        effectiveData : function () {
            var _this=this;
            window.top.topPage.ajax({
                url: root + '/home/effectiveData.html',
                dateType: 'html',
                success: function (data) {
                    $("#effective").html(data);
                    var effective = $("#effective");
                    $("#operate td:eq(19)").html(data);
                    $('#operate [data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover',
                        html: true,
                        delay: {show: 100, hide: 100}
                    });
                }
            });
        },
        checkBrowser:function(){
            var ie678 = !$.support.leadingWhitespac;
            if (!ie678) {
                var bol = $.cookie(this.cookieKey);
                if(bol !== 'true'){
                    $(".hint-box").show();
                }
            }
        },
        /**
         * 根据用户的时区时间变化页面时间
         */
        userTime: function () {
            var _this=this;
            if(_this.dateTimeFromat!=undefined) {
                var date = new Date();
                //date.setTime(parseInt($("#index-clock").attr("time"))+1000);
                //$("#index-clock").attr("time",date.getTime());
                //var date$go = new Date('2015-08-31')
                $("#index-clock").text(window.top.topPage.formatToMyDateTime(date, _this.dateTimeFromat));
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
                    $("#index-clock").text(data.dateTime);
                    $("#index-clock").attr("time",data.time);
                    $("#index-clock").css("display","inline");
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
        },

        /**
         * 游戏盈亏日期宽度自适应
         */
        gameDataDaySize: function () {
            var outWidth = $('div#gameData').width();
            if (outWidth < 682 && outWidth >= 542) {
                $('span.stat-day a').css({'padding':'5px 10px'})
            } else if (outWidth < 542) {
                $('span.stat-day a').css({'padding':'5px'})
            } else {
                $('span.stat-day a').css({'padding':'5px 20px'})
            }
        }
    });
});