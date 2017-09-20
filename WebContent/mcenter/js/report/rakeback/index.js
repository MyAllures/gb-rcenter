/**
 * Created by tom on 15-10-12.
 */
define(['common/BaseListPage','highcharts'], function(BaseListPage) {

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
            this.chartData($("#chartJson").val());

            $('#roleName').bind('input propertychange', function () {
                $('[name="search.roleName"]').val($(this).val());
            });
            $('[data-toggle="popover"]',this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });

            // this.initPlayerLink();
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
        },

        /** 改变年 */
        changeYear: function() {
            $('span.detail').addClass('hide');
            select.setIndex("[name='search.rakebackMonth']",0);
            var $period = $("[name='search.id']");
            select.setIndex($period, 0);
            select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
        },

        /** 改变月 */
        changeMonth: function() {
            $('span.detail').addClass('hide');
            var $year = $("[name='search.rakebackYear']");
            var $month = $("[name='search.rakebackMonth']");
            if ($year.val()) {
                var $period = $("[name='search.id']");
                if ($month.val()) {
                    window.top.topPage.ajax({
                        url: root + '/report/rakeback/ajaxPeriods.html',
                        dataType: 'json',
                        type: 'POST',
                        data: {'search.rakebackYear':$year.val(), 'search.rakebackMonth':$month.val(), 'siteId':$('[name="search.siteId"]').val()},
                        success: function(data) {
                            select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --')
                            if (data.length > 0) {
                                select.enable($period);
                                $.each(data,function(index, obj){
                                    select.addOption($period, obj.id, (obj.period + window.top.message.common['qi'] + obj.periodName));
                                });
                            } else {
                                select.disable($period);
                            }
                        }
                    });
                } else {
                    select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
                    select.disable($period);
                }
            } else {
                window.top.topPage.showWarningMessage(window.top.message.report['tip.warn.selyear']);
                select.setIndex($month, 0);
                return;
            };
        },

        /** 改变角色 */
        changeRole: function(e) {
            $('input.role').attr('name', e.key).val('');
        },

        /** 切换站点 */
        siteChange: function(e) {
            $('span.detail').addClass('hide');
            var $year = $('[name="search.rakebackYear"]');
            var $period = $('[name="search.id"]');

            select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
            if (e.key) {
                $('div.role').removeClass('hide');
                $('div.state').removeClass('hide');
                $('div.period').removeClass('hide');
                $("div.all-state").addClass('hide');
                select.setIndex($year, 0);
                select.setIndex($('[name="search.rakebackMonth"]'), 0);
                select.setIndex($period, 0);

                window.top.topPage.ajax({
                    url: root + '/report/rakeback/ajaxYears.html',
                    dataType: 'json',
                    type: 'POST',
                    data: {'siteId': e.key},
                    success: function(data) {
                        select.clearOption($year, '-- ' + window.top.message.common['year'] + ' --');
                        if (data.length > 0) {
                            $.each(data,function(index, obj){
                                select.addOption($year, obj, obj + window.top.message.common['year']);
                            });
                        }
                    }
                });
            } else {
                $('div.role').addClass('hide');
                $('div.state').addClass('hide');
                $("div.all-state").removeClass('hide');
                select.setIndex("[name='search.settlementState']",0);
                $('div.period').addClass('hide');
            }
        },

        /** 切换期数 */
        changePeriod: function(e) {
            var $detail = $('span.detail');
            if (e.key) {
                $detail.removeClass('hide');
            } else {
                $detail.addClass('hide');
            }
        },

        /** 查看详情 */
        queryDetail : function(event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                $($form).attr('action', root + '/report/rakeback/detail/reportDetail.html');
                //$form.submit();
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var $result=$("#mainFrame");
                        $result.html(data);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        $($form).attr('action', root + '/report/rakeback/rakebackIndex.html');
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
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
                        text: window.top.message.report['rakeback.list.actual']
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
                    name: window.top.message.report['rakeback.list.actual'],
                    colorByPoint: true,
                    data: dataArray
                }]

            });
        },

        /** 组装返水玩家链接 */
        initPlayerLink: function () {
            var isSub = $('[name=isSub]').val();
            var pCount = $('[name=pCount]').val();
            if (isSub == 'false' && pCount > 0) {
                var url = '/player/link/rakeback.html?m=' + Math.random();

                var role = $('input.role').attr('name');
                var roleName = $('[name="' + role + '"]').val();
                var state = $('[name="search.settlementState"]').val();
                var year = $('[name="search.rakebackYear"]').val();
                var month = $('[name="search.rakebackMonth"]').val();
                var billId = $('[name="search.id"]').val();

                url += "&" + role + "=" + roleName + "&search.settlementState=" + state
                    + "&search.rakebackYear=" + year + "&search.rakebackMonth=" + month + "&search.id=" + billId;

                $('td.pnum a').attr('href', url);
                $('td.pnum').addClass('co-blue');
            } else {
                $('td.pnum').removeClass('co-blue');
            }
        }

    });
});