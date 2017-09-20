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
            this.initPlayerLink();
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
            select.clearOption($period,'-- ' + window.top.message.common['qi'] + ' --');
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
                            select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
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
                
            }
        },
        changePeriod: function (e) {
            if (e.key > 0) {
                $('span.detail').removeClass('hide');
            } else {
                $('span.detail').addClass('hide');
            }
        },

        /** 改变角色 */
        changeRole: function(e) {
            $('#roleName').attr('name', e.key);
        },

        /** 切换站点 */
        siteChange: function() {
            var $val = select.getValue('[name="search.siteId"]');
            if ($val) {
                $('#qcRole').show();
                $('#qcState').show();
                $('#qcPeriod').show();
                $('#state').show();
                select.setIndex($('[name="search.rebateYear"]'), 0);
                select.setIndex($('[name="search.rebateMonth"]'), 0);
                $('input[name=siteId]').val($val);
            } else {
                $('#qcRole').hide();
                $('#qcState').hide();
                $('#qcPeriod').hide();
                $('#state').hide();
                $('input[name=siteId]').val('');
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
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: window.top.message.report['rebate.list.rebate']
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
                    name: window.top.message.report['rebate.list.rebate'],
                    colorByPoint: true,
                    data: dataArray
                }]

            });
        },

        /** 查看详情 */
        queryDetail : function(event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                $($form).attr('action', root + '/report/rebate/detail/reportDetail.html');
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var $result=$("div#mainFrame");
                        $result.html(data);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        $($form).attr('action', root + '/report/rebate/rebateIndex.html');
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        },

        /** 组装返佣玩家链接 */
        initPlayerLink: function () {
            var isSub = $('[name=isSub]').val();
            var pCount = $('[name=pCount]').val();
            if ((typeof(isSub) == 'undefined' || isSub == 'false') && pCount > 0) {
                var url = '/player/link/rebate.html?m=' + Math.random();

                var role = $('input.role').attr('name');
                var roleName = $('[name="' + role + '"]').val();
                var state = $('[name="search.settlementState"]').val();
                var year = $('[name="search.rebateYear"]').val();
                var month = $('[name="search.rebateMonth"]').val();
                var billId = $('[name="search.id"]').val();

                url += "&" + role + "=" + roleName + "&search.settlementState=" + state
                    + "&search.rebateYear=" + year + "&search.rebateMonth=" + month + "&search.id=" + billId;

                $('td.pnum a').attr('href', url);
                $('td.pnum').addClass('co-blue');
            } else {
                $('td.pnum').removeClass('co-blue');
            }
        }
    });
});