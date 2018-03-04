/**
 * Created by fly on 15-12-7.
 */
define(['common/BaseListPage', 'site/home/include/Chart', 'site/home/include/Table', 'inspinia'], function (BaseListPage,chart, table) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        chart: null,
        table: null,
        init: function (formSelector) {
            //this.formSelector = this.formSelector || formSelector ||"#mainFrame form";
            this.formSelector = "form[name=mainFrame]";
            this.chart = new chart();
            this.table = new table();
            this._super();
        },
        /** 页面加载事件函数 */
        onPageLoad: function () {
            this._super();
            this.checkBrowser();
            this.gameDataDaySize();
            this.loadOperateData();
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $(window).resize(function(){
                _this.gameDataDaySize();
            });
            //复制
            this.copyText('a[name="copy"]');
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
        },
        /** 运营数据 */
        loadOperateData: function () {
            var _this=this;
            window.top.topPage.ajax({
                url: root + '/home/operateData.html?t=' + new Date().getTime(),
                dateType: 'html',
                success: function (data) {
                    $('#operate').html($('div.operate', $(data)).html());
                    $('[data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover',
                        html: true,
                        delay: {show: 100, hide: 100}
                    });
                },
                error: function (e) {
                    console.log(e);
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
        openMore: function(e) {
            $('div#domain').removeAttr('style');
            $('div#openMore').hide();
            $('div#hideMore').show();
            $(e.currentTarget).unlock();
        },
        hideMore: function(e) {
            $('div#domain').css({'height':'150px', 'overflow':'hidden'});
            $('div#openMore').show();
            $('div#hideMore').hide();
            $(e.currentTarget).unlock();
        }
    });
});
