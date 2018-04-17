/**
 * 数据中心---运营日常统计
 */
define(['site/MReport'], function (MReport) {
    return MReport.extend({

        /**
         * 初使化
         */
        init: function () {
            this._super();
            this.drawDifference();
        },

        /**
         * 存取差额图表
         */
        drawDifference: function() {
            var jsonStr = $("#differenceData").html();
            const dataSet = $.parseJSON(jsonStr);
            const chart = new G2.Chart({
                container: 'depositNode',
                forceFit: true,
                height: window.innerHeight,
            });

            chart.source(dataSet, {
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
            dataSet.map(obj => {
                chart.guide().text({
                    position: [ obj.title, 0 ],
                    content: obj.title + ' ',
                    style: {
                        textAlign: 'right'
                    }
                });
            });
            chart.render();
        }
    });
});