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
            var _this=this;
            this.chartData($("#chartJson").val());
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
        },

        /** 改变年 */
        changeYear: function() {
            select.setIndex("[name='search.rebateMonth']",0);
            var $period = $("[name='search.id']");
            select.setIndex($period, 0);
            select.disable($period);
            select.clearOption($period,'--'+ window.top.message.report_auto['期']+ '--');
        },

        /** 改变月 */
        changeMonth: function() {
            var $year = $("[name='search.rebateYear']");
            var $month = $("[name='search.rebateMonth']");
            if ($year.val()) {
                var $period = $("[name='search.id']");
                if ($month.val()) {
                    window.top.topPage.ajax({
                        url: root + '/report/rebate/ajaxPeriods.html',
                        dataType: 'json',
                        type: 'POST',
                        data: {'search.rebateYear':$year.val(), 'search.rebateMonth':$month.val(), 'siteId':$('[name="search.siteId"]').val()},
                        success: function(data) {
                            select.clearOption($period, '--'+ window.top.message.report_auto['期']+ '--');
                            if (data.length > 0) {
                                select.enable($period);
                                $.each(data,function(index, obj){
                                    select.addOption($period, obj.id, (obj.period + window.top.message.report_auto['期'] + obj.periodName));
                                });
                            } else {
                                select.disable($period);
                            }
                        }
                    });
                } else {
                    select.clearOption($period, '--'+ window.top.message.report_auto['期']+ '--');
                    select.disable($period);
                }
            } else {
                window.top.topPage.showWarningMessage(window.top.message.report_auto['请选择年份']);
                select.setIndex($month, 0);
                return;
            }
        },

        /** 改变角色 */
        changeRole: function() {
            $('#roleName').attr('name', select.getValue($('[name="roleSel"]')));
        },

        /** 切换站点 */
        siteChange: function() {
            var $val = select.getValue('[name="search.siteId"]');
            if ($val) {
                $('#qcRole').show();
                $('#qcState').show();
                $('#qcPeriod').show();
                $('#qcPart').show();
                $('#qcPart').attr('href','/report/rebate/detail/list.html?siteId='+$val);
                $('#state').show();
                select.setIndex($('[name="search.rebateYear"]'), 0);
                select.setIndex($('[name="search.rebateMonth"]'), 0);
            } else {
                $('#qcRole').hide();
                $('#qcState').hide();
                $('#qcPeriod').hide();
                $('#qcPart').hide();
                $('#qcPart').attr('href','#');
                $('#state').hide();
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
                };
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
                        text: window.top.message.report_auto['实付佣金']
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
                    name: window.top.message.report_auto['实付佣金'],
                    colorByPoint: true,
                    data: dataArray
                }]

            });
        }
    });
});