/**
 * 数据中心 - 运营日常统计
 */
define(['common/BasePage', 'site/g2.min', 'site/data-set.min'], function (BasePage, G2, DataSet) {
    return BasePage.extend({

        /**
         * 初使化
         */
        init: function () {
            this._super();

            this.drawBalanceBarChart();
            this.drawBalanceColumnChart();

            this.drawEffectiveBarChart();
            this.drawEffectiveColumnChart();

            this.drawProfitLossBarChart();
            this.drawProfitLossColumnChart();
        },

        /**
         * 存取差额玉珏图表展示
         */
        drawBalanceBarChart: function() {
            var jsonStr = $("#balanceBarChartData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBarChart('c1', data, '#6363FF-#FF6363');
        },

        /**
         * 存取差额分组柱状图展示
         * 展示最近七个周期的存取差额
         */
        drawBalanceColumnChart: function() {
            var jsonStr = $("#balanceSummaryData").html();
            var fieldStr = $("#columnsDateFieldList").html();
            const data = $.parseJSON(jsonStr);
            const fieldSet = $.parseJSON(fieldStr);
            this.drawGroupColumnChart('z1', data, fieldSet);
        },

        /**
         * 最近两个周期的有效投注额
         */
        drawEffectiveBarChart: function() {
            var jsonStr = $("#effectiveBarChartData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBarChart('c2', data, '#00CC00-#FF6600');
        },

        /**
         * 最近多个周期的有效投注额
         */
        drawEffectiveColumnChart: function() {
            var jsonStr = $("#operationSummaryData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z2', data, 'effectiveTransactionAll', 'staticDay*effectiveTransactionAll', '有效投注额');
        },

        /**
         * 上一个周期损益
         */
        drawProfitLossBarChart: function() {
            var jsonStr = $("#effectiveBarChartData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBarChart('c3', data, '#6363FF-#FF6363');
        },

        /**
         * 最近多个周期的损益
         */
        drawProfitLossColumnChart: function() {
            var jsonStr = $("#operationSummaryData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z3', data, 'transactionProfitLoss', 'staticDay*transactionProfitLoss', '损益');
        },

        /**
         * 画玉珏图
         * @param containerName
         * @param data
         * @param color
         */
        drawBarChart: function(containerName, data, color) {
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 300,
                padding: [40,30,40,0]
            });

            chart.source(data, {
                'percent': { min: 0, max: 1 },
            });
            chart.tooltip({
                title: 'title'
            });
            chart.legend(false);
            chart.coord('polar', { innerRadius: 0.6 }).transpose();
            chart.interval()
                .position('title*percent')
                .color('numerical', color)
                .tooltip(['numerical','tips'], function(val, tips) {
                    return {
                        name: tips,
                        value: val + '元'
                    };
                })
                .label('numerical', {
                    offset: 3,
                    textStyle: {
                        textAlign: 'end', // 文本对齐方向，可取值为： start center end
                        fill: '#000000', // 文本的颜色
                        fontSize: '12', // 文本大小
                        fontWeight: 'normal', // 文本粗细
                        rotate: 30,
                        textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                    }
                });
            data.map(function(obj) {
                chart.guide().text({
                    position: [ obj.title, 0 ],
                    content: obj.title + ' ',
                    style: {
                        textAlign: 'right'
                    }
                });
            });
            chart.render();
        },

        /**
         * 分组柱状图
         */
        drawGroupColumnChart: function(containerName, data, fieldSet) {
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: fieldSet, // 展开字段集
                key: '周期', // key字段
                value: '存取差额', // value字段
            });
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 300,
                padding: [20, 5, 65, 50]
            });
            chart.source(dv);
            chart.interval().position('周期*存取差额').color('name').adjust([{
                type: 'dodge',
                marginRatio: 1 / 32
            }]);
            chart.render();
        },

        /**
         * 基础柱状图
         */
        drawBasicColumnChart: function(containerName, data, scale, position, tips) {
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 300,
                padding: [20, 5, 35, 50]
            });
            chart.source(data);
            chart.scale(scale, {
                //tickInterval: 1000  // 数字间隔,如果不指定则自动设置间隔值
            });
            chart.interval()
                .position(position)
                .tooltip(scale, function(val) {
                    return {
                        name: tips,
                        value: val + ' 元',
                    };
                });
            chart.render();
        }
    });
});