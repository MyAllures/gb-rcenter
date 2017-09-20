/**
 * Created by fly on 15-10-12.
 */
define(['common/BaseListPage','highcharts'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector ||"#mainFrame form";
            this._super();
        },
        /** 页面加载事件函数 */
        onPageLoad: function () {
            this._super();
            var $cdata = $("#chartJson");
            if ($cdata.attr('data-size') > 0) {
                this.chartData($cdata.val());
            }
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
        },

        /** 改变年 */
        changeYear: function(e) {
            if (e.key) {
                var $month = $("[name='search.month']");
                window.top.topPage.ajax({
                    url: root + '/topagent/report/occupy/getMonth.html',
                    dataType: 'json',
                    type: 'POST',
                    data: {'year': e.key},
                    success: function(data) {
                        select.clearOption($month, window.top.message.common['pleaseSelect']);
                        for (var i = data.size; i > 0; i--) {
                            select.addOption($month, i+'', data.month[i]);
                        }
                    }
                });
            }
        },

        /** 图表 */
        chartData:function(jsonStr) {
            var data = eval("("+jsonStr+")");
            data = data == null ? '' : data;
            var dataArray = [];
            for (var i = 0; i < data.length; i++) {
                var type = data[i].drilldown;
                type = type == null ? '' : type;
                var config = {
                    y: parseFloat(data[i].y),
                    name: data[i].name + "<br/>" + type,
                    drilldown: type
                }
                dataArray.push(config);
            }
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ' '
                },
                subtitle: {
                    text: ' '
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: window.top.message.report['occupy.chart.money']
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.2f}'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.drilldown}</span>: <b>{point.y:.2f}</b><br/>'
                },
                series: [{
                    name: window.top.message.report['occupy.chart.money'],
                    colorByPoint: true,
                    data: dataArray
                }]

            });
        }
    });
});