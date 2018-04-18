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

            this.drawLastDifference();
            this.drawMultiDifference();

            this.drawLastEffective();
            this.drawMultiEffective();

            this.drawLastProfitLoss();
            this.drawMultiProfitLoss();
        },

        /**
         * 上一个周期存取差额
         */
        drawLastDifference: function() {
            var jsonStr = $("#lastDifferenceData").html();
            const data = $.parseJSON(jsonStr);
            const chart = new G2.Chart({
                container: 'c1',
                forceFit: true,
                height: 350,
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
                .color('numerical', '#BAE7FF-#1890FF')
                .tooltip('numerical', val => {
                    return {
                        name: '昨日',
                        value: val + '元'
                    };
                })
                .label('numerical', {
                    offset: -5
                });
            data.map(obj => {
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
         * 最近多个周期的存取差额
         */
        drawMultiDifference: function() {
            const data = [
                { name:'存款金额', '4.9': 18.9, '4.10': 28.8, '4.11' :39.3, '4.12': 81.4, '4.13': 47, '4.14': 20.3, '4.15': 24, '4.16': 35.6 },
                { name:'取现金额', '4.9': 12.4, '4.10': 23.2, '4.11' :34.5, '4.12': 99.7, '4.13': 52.6, '4.14': 35.5, '4.15': 37.4, '4.16': 42.4}
            ];
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: [ '4.9','4.10','4.11','4.12','4.13','4.14','4.15','4.16' ], // 展开字段集
                key: '月份', // key字段
                value: '月均降雨量', // value字段
            });

            const chart = new G2.Chart({
                container: 'z1',
                forceFit: true,
                height: 350
            });
            chart.source(dv);
            chart.interval().position('月份*月均降雨量').color('name').adjust([{
                type: 'dodge',
                marginRatio: 1 / 32
            }]);
            chart.render();
        },

        /**
         * 上一个周期有效投注额
         */
        drawLastEffective: function() {
            var jsonStr = $("#lastDifferenceData").html();
            const data = $.parseJSON(jsonStr);
            const chart = new G2.Chart({
                container: 'c2',
                forceFit: true,
                height: 350,
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
                .color('numerical', '#BAE7FF-#1890FF')
                .tooltip('numerical', val => {
                    return {
                        name: '昨日',
                        value: val + '元'
                    };
            })
            .label('numerical', {
                offset: -5
            });
            data.map(obj => {
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
         * 最近多个周期的有效投注额
         */
        drawMultiEffective: function() {
            const data = [
                { name:'London', '4.9': 18.9, '4.10': 28.8, '4.11' :39.3, '4.12': 81.4, '4.13': 47, '4.14': 20.3, '4.15': 24, '4.16': 35.6 },
                { name:'Berlin', '4.9': 12.4, '4.10': 23.2, '4.11' :34.5, '4.12': 99.7, '4.13': 52.6, '4.14': 35.5, '4.15': 37.4, '4.16': 42.4}
            ];
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: [ '4.9','4.10','4.11','4.12','4.13','4.14','4.15','4.16' ], // 展开字段集
                key: '月份', // key字段
                value: '月均降雨量', // value字段
            });

            const chart = new G2.Chart({
                container: 'z2',
                forceFit: true,
                height: 350
            });
            chart.source(dv);
            chart.interval().position('月份*月均降雨量').color('name').adjust([{
                type: 'dodge',
                marginRatio: 1 / 32
            }]);
            chart.render();
        },

        /**
         * 上一个周期损益
         */
        drawLastProfitLoss: function() {
            var jsonStr = $("#lastDifferenceData").html();
            const data = $.parseJSON(jsonStr);
            const chart = new G2.Chart({
                container: 'c3',
                forceFit: true,
                height: 350,
            });

            chart.source(data, {
                'percent': { min: 0, max: 1 },
            });
            chart.tooltip({
                title: 'title'
            });
            chart.legend(true);
            chart.coord('polar', { innerRadius: 0.6 }).transpose();
            chart.interval()
                .position('title*percent')
                .color('numerical', '#BAE7FF-#1890FF')
                .tooltip('numerical', val => {
                    return {
                        name: '昨日',
                        value: val + '元'
                    };
                })
                .label('numerical', {
                    offset: -5
                });
            data.map(obj => {
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
         * 最近多个周期的损益
         */
        drawMultiProfitLoss: function() {
            const data = [
                { name:'London', '4.9': 18.9, '4.10': 28.8, '4.11' :39.3, '4.12': 81.4, '4.13': 47, '4.14': 20.3, '4.15': 24, '4.16': 35.6 },
                { name:'Berlin', '4.9': 12.4, '4.10': 23.2, '4.11' :34.5, '4.12': 99.7, '4.13': 52.6, '4.14': 35.5, '4.15': 37.4, '4.16': 42.4}
            ];
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: [ '4.9','4.10','4.11','4.12','4.13','4.14','4.15','4.16' ], // 展开字段集
                key: '月份', // key字段
                value: '月均降雨量', // value字段
            });

            const chart = new G2.Chart({
                container: 'z3',
                forceFit: true,
                height: 350
            });
            chart.source(dv);
            chart.interval().position('月份*月均降雨量').color('name').adjust([{
                type: 'dodge',
                marginRatio: 1 / 32
            }]);
            chart.render();
        }
    });
});