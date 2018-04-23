/**
 * 数据中心 - 运营日常统计
 */
define(['common/BasePage', 'g2/g2.min', 'g2/data-set.min'], function (BasePage, G2, DataSet) {
    return BasePage.extend({

        /**
         * 初使化
         */
        init: function () {
            this._super();

            this.balanceGuageChart();
            this.balanceColumnChart();

            this.effectiveGaugeChart();
            this.effectiveColumnChart();

            this.profitLossGaugeChart();
            this.profitLossColumnChart();

            this.activeUser();

            this.installAndUninstall('install'); //默认展示安装量

            this.playerTrend('new-player'); //默认展示新增玩家

            this.rakebackTrend('rakeback-men'); //默认展示反水人数
        },

        /**
         * 绑定事件函数
         */
        bindEvent:function(){
            this._super();
            var _this = this;
            //活跃用户和登录次数切换事件
            $("._addPrimary.active-user .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#f4").html(null);
                if($(this).hasClass('login-count')){
                    _this.loginCount();
                }else{
                    _this.activeUser();
                }

            });

            //安装量和卸载量切换事件
            $("._addPrimary.install .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#i5").html(null);
                if($(this).hasClass('uninstall')){
                    _this.installAndUninstall('uninstall');
                }else{
                    _this.installAndUninstall('install');
                }

            });

            //新增玩家和新增存款玩家切换事件
            $("._addPrimary.player-trend .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#p6").html(null);
                if($(this).hasClass('new-deposit-player')){
                    _this.playerTrend('new-deposit-player');
                }else{
                    _this.playerTrend('new-player');
                }

            });

            //反水人数和反水金额切换事件
            $("._addPrimary.rakeback-trend .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#b7").html(null);
                if($(this).hasClass('rakeback-cash')){
                    $("#api-choice").show();
                    _this.rakebackTrend('rakeback-cash');
                }else{
                    $("#api-choice").hide();
                    _this.rakebackTrend('rakeback-men');
                }
            });

            //反水金额选择API
            $("#api-choice").click(function(){

            });
        },

        /**
         * 最近两个周期的存取差额对比
         */
        balanceGuageChart: function() {
            var jsonStr = $("#balanceGaugeChartData").html();
            const data = $.parseJSON(jsonStr);
            this.drawGaugeChart('c1', data);
        },

        /**
         * 存取差额分组柱状图展示
         * 展示最近七个周期的存取差额
         */
        balanceColumnChart: function() {
            var jsonStr = $("#operationSummaryData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z1', data, 'balanceAmount', 'staticDay*balanceAmount', 300);
        },

        /**
         * 最近两个周期的有效投注额对比
         */
        effectiveGaugeChart: function() {
            var jsonStr = $("#effectiveGaugeChartData").html();
            const data = $.parseJSON(jsonStr);
            this.drawGaugeChart('c2', data);
        },

        /**
         * 最近多个周期的有效投注额
         */
        effectiveColumnChart: function() {
            var jsonStr = $("#operationSummaryData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z2', data, 'effectiveTransactionAll', 'staticDay*effectiveTransactionAll', 300);
        },

        /**
         * 最近两个周期损益对比
         */
        profitLossGaugeChart: function() {
            var jsonStr = $("#profitLossGaugeChartData").html();
            const data = $.parseJSON(jsonStr);
            this.drawGaugeChart('c3', data);
        },

        /**
         * 最近多个周期的损益
         */
        profitLossColumnChart: function() {
            var jsonStr = $("#operationSummaryData").html();
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z3', data, 'transactionProfitLoss', 'staticDay*transactionProfitLoss', 300);
        },

        /**
         * 总登录次数
         */
        loginCount:function(){
            var jsonStr = $("#loginCountData").html();
            var loginCountData = $.parseJSON(jsonStr);
            var fieldStr = $("#columnsDateFieldList").html();
            const fieldSet = $.parseJSON(fieldStr);
            this.drawGroupColumnChart('f4', loginCountData, fieldSet,476);
        },

        /**
         * 活跃用户数
         */
        activeUser:function(){
            var jsonStr = $("#operationSummaryData").html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var data = {};
                var operationSummary = operationSummarys[i];
                data['time'] = operationSummary.staticDayStr;
                data['活跃用户(全部)'] = operationSummary.countActive;
                data['活跃用户(PC端)'] = operationSummary.activePc;
                data['活跃用户(安卓App)'] = operationSummary.activeAndroid;
                data['活跃用户(H5)'] = operationSummary.activeH5;
                data['活跃用户(IOSapp)'] = operationSummary.activeIos;
                data['活跃用户(手机端)'] = operationSummary.activePhone;
                array.push(data);
            }
            this.foldlineDiagram('f4', array);
        },

        /**
         * 安装量和卸载量 折线图
         */
        installAndUninstall:function(isinstall){
            var jsonStr = $("#operationSummaryData").html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var data = {};
                var operationSummary = operationSummarys[i];
                data['time'] = operationSummary.staticDayStr;
                if('install' == isinstall){
                    data['安装量(全部)'] = operationSummary.installIos + operationSummary.installAndroid;
                    data['安装量(安卓App)'] = operationSummary.installAndroid;
                    data['安装量(IOSapp)'] = operationSummary.installIos;
                }else if('uninstall' == isinstall){
                    data['卸载量(全部)'] = operationSummary.uninstallAndroid + operationSummary.uninstallIos;
                    data['卸载量(安卓App)'] = operationSummary.uninstallAndroid;
                    data['卸载量(IOSapp)'] = operationSummary.uninstallIos;
                }
                array.push(data);
            }
            this.foldlineDiagram('i5', array);
        },

        /**
         * 新增玩家和新增存款玩家 折线图
         */
        playerTrend:function(newPlayerType){
            var jsonStr = $("#operationSummaryData").html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var data = {};
                var operationSummary = operationSummarys[i];
                data['time'] = operationSummary.staticDayStr;
                if('new-deposit-player' == newPlayerType){
                    data['新增玩家存款人数'] = operationSummary.newPlayerDeposit;
                }else if('new-player' == newPlayerType){
                    data['新增用户(全部)'] = operationSummary.newPlayerPc + operationSummary.newPlayerPhone;
                    data['新增用户(手机端)'] = operationSummary.newPlayerPhone;
                    data['新增用户(PC)'] = operationSummary.newPlayerPc;
                    data['新增用户(安卓App)'] = operationSummary.newPlayerAndroid;
                    data['新增用户(H5)'] = operationSummary.newPlayerH5;
                    data['新增用户(IOSapp)'] = operationSummary.newPlayerIos;
                }
                array.push(data);
            }
            this.foldlineDiagram('p6', array);
        },

        rakebackTrend:function(rakebackType){
            var jsonStr = $("#operationSummaryData").html();
            if(!jsonStr) return ;
            const resultData = $.parseJSON(jsonStr);
            var array = [];
            for(var i = 0;i < resultData.length ; i ++ ){
                var result = resultData[i];
                var data = {
                    'staticDayStr':result.staticDayStr
                };
                if('rakeback-men' == rakebackType){
                    data['反水人数'] = result.rakebackPlayer;
                }else if('rakeback-cash' == rakebackType){
                    // jsonStr = $("#rakebackCash").html();
                    data['反水金额'] = result.rakebackAmount;
                }
                array.push(data);
            }

            if('rakeback-men' == rakebackType){
                this.drawBasicColumnChart('b7', array, '反水人数', 'staticDayStr*反水人数',379);
            }else if('rakeback-cash' == rakebackType){
                // jsonStr = $("#rakebackCash").html();
                this.drawBasicColumnChart('b7', array, '反水金额', 'staticDayStr*反水金额',356);
            }
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
        drawGroupColumnChart: function(containerName, data, fieldSet,width) {
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: fieldSet, // 展开字段集
                key: '周期', // key字段
                value: '存取差额', // value字段
            });
            const chart = width ? new G2.Chart({
                container: containerName,
                height: 400,
                width:width,
                padding: [20, 5, 65, 50]
            })
                :
            new G2.Chart({
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
        drawBasicColumnChart: function(containerName, data, scale, position, height) {
            const chart =  new G2.Chart({
                container: containerName,
                forceFit: true,
                height: height,
                padding: [20, 5, 35, 50]
            });
            chart.source(data);
            chart.scale(scale, {
                //tickInterval: 2000
            });
            chart.interval().position(position);
            chart.render();
        },

        /**
         * 折线图
         */
        foldlineDiagram:function(containerName, data){
            if(data == null || data.length < 1) return;
            const ds = new DataSet();
            var keys = Object.keys(data[0]);
            keys.splice(0,1);
            const chart = new G2.Chart({
                container: containerName,
                // forceFit: true,
                height: 400,
                width:476
            });
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: keys, // 展开字段集
                key: 'name', // key字段
                value: 'sum' // value字段
            });
            chart.axis('sum', {
                label: {
                    formatter: function(val) {
                        return val;
                    }
                }
            });
            chart.line().position('time*sum').color('name');
            chart.point().position('time*sum').color('name').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });

            chart.source(dv,{
                time: {
                    range: [ 0, 1 ]
                }
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.render();
        },

        /**
         * 仪表图
         * @param containerName
         * @param data
         */
        drawGaugeChart: function(containerName, data) {
            var startNum, endNum;
            if(data[0].numerical>=0 && data[1].numerical>=0) {
                startNum = 0;
                if(data[0].numerical >= data[1].numerical) {
                    endNum = data[0].numerical;
                } else {
                    endNum = data[1].numerical;
                }
            } else {
                if(Math.abs(data[0].numerical) >= Math.abs(data[1].numerical)) {
                    startNum = -(Math.abs(data[0].numerical));
                    endNum = Math.abs(data[0].numerical);
                } else {
                    startNum = -(Math.abs(data[1].numerical));
                    endNum = Math.abs(data[1].numerical);
                }
            }
            const Shape = G2.Shape;
            // 自定义Shape 部分
            Shape.registerShape('point', 'pointer', {
                drawShape(cfg, group) {
                    let point = cfg.points[0]; // 获取第一个标记点
                    point = this.parsePoint(point);
                    const center = this.parsePoint({ // 获取极坐标系下画布中心点
                        x: 0,
                        y: 0
                    });
                }
            });
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 280,
                padding: [ 0, 0, 20, 30 ]
            });
            chart.source(data);

            chart.coord('polar', {
                startAngle: -9 / 8 * Math.PI,
                endAngle: 1 / 8 * Math.PI,
                radius: 0.75
            });
            chart.scale('numerical', {
                min: startNum,
                max: endNum,
                tickInterval: endNum/10,
                nice: false
            });

            chart.axis('1', false);
            chart.axis('numerical', {
                zIndex: 2,
                line: null,
                label: {
                    offset: -8,
                    textStyle: {
                        fontSize: 12,
                        textAlign: 'center',
                        textBaseline: 'middle'
                    }
                },
                subTickCount: 4,
                subTickLine: {
                    length: -8,
                    stroke: '#fff',
                    strokeOpacity: 1
                },
                tickLine: {
                    length: -17,
                    stroke: '#fff',
                    strokeOpacity: 1
                },
                grid: null
            });
            chart.legend(false);
            chart.point({
                generatePoints: true
            }).position('numerical*1')
                .shape('pointer')
                .color('#1890FF')
                .active(false);

            // 绘制仪表盘背景
            chart.guide().arc({
                zIndex: 0,
                top: false,
                start: [ startNum, 0.98 ],
                end: [ endNum, 0.98 ],
                style: { // 底灰色
                    stroke: '#CBCBCB',
                    lineWidth: 2,
                }
            });

            // 绘制昨天的指标
            chart.guide().arc({
                zIndex: 1,
                start: [ data[0].numerical>=0 ? 0 : data[0].numerical, 1.07 ],
                end: [ data[0].numerical>=0 ? data[0].numerical : 0, 1.07 ],
                style: {
                    stroke: '#1890FF',
                    lineWidth: 12,
                }
            });

            // 绘制前天指标
            chart.guide().arc({
                zIndex: 2,
                start: [ data[1].numerical>=0 ? 0 : data[1].numerical, 1.19 ],
                end: [ data[1].numerical>=0 ? data[1].numerical : 0, 1.19 ],
                style: {
                    stroke: 'red',
                    lineWidth: 12,
                }
            });

            // 绘制指标数字
            chart.guide().html({
                position: [ '50%', '95%' ],
                html: '<div style="width: 300px;text-align: center; padding-bottom: 80px; border:0px solid red;">'
                + '<p style="font-size: 15px; color: #545454;margin: 0;">增长</p>'
                + '<p style="font-size: 18px; color: #545454;margin: 0;">' + data[0].numerical * 10  + '%</p>'
                + '</div>'
            });

            chart.render();
        }
    });
});