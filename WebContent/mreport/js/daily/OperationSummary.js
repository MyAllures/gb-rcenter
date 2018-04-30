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

            this.balanceGaugeChart('D');
            this.balanceColumnChart('D');

            this.effectiveGaugeChart('D', 'all');
            this.effectiveColumnChart('D','all');

            this.profitLossGaugeChart('D');
            this.profitLossColumnChart('D');

            this.activeUser('D');

            this.installAndUninstall('install','D'); //默认展示近七天安装量

            this.playerTrend('new-player','D'); //默认展示近七天新增玩家

            this.rakebackTrend('rakeback-men','D'); //默认展示近七天反水人数
        },

        /**
         * 绑定事件函数
         */
        bindEvent:function(){
            this._super();
            var _this = this;

            /**
             * 存取差额周期切换事件
             */
            $(".balanceBtn .btn").click(function() {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                var rangeType = $(this).attr('value');
                if($(_this.getKey("#operationSummaryData", rangeType)).html()==="") {
                    _this.asnycLoadOperationData('balance', rangeType);
                } else {
                    _this.balanceGaugeChart(rangeType);
                    _this.balanceColumnChart(rangeType);
                }
            });

            /**
             * 有效投注周期切换事件
             */
            $(".effectiveBtn .btn").click(function() {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                var terminalAll = $(".terminal-btn-group").find("button[value='all']");
                $(terminalAll).addClass("btn-primary").siblings().removeClass("btn-primary");
                var rangeType = $(this).attr('value');
                if($(_this.getKey("#operationSummaryData", rangeType)).html()==="") {
                    _this.asnycLoadOperationData('effective', rangeType);
                } else {
                    _this.effectiveGaugeChart(rangeType, 'all');
                    _this.effectiveColumnChart(rangeType, 'all');
                }
            });

            /**
             * 有效投注终端切换
             */
            $(".effectiveTerminal .btn").click(function() {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                var terminal = $(this).attr('value');
                var btn = $(".effectiveBtn").find(".btn-primary");
                var rangeType = $(btn).attr('value');
                _this.effectiveGaugeChart(rangeType, terminal);
                _this.effectiveColumnChart(rangeType, terminal);
            });

            /**
             * 损益周期切换事件
             */
            $(".profitLossBtn .btn").click(function() {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                var rangeType = $(this).attr('value');
                if($(_this.getKey("#operationSummaryData", rangeType)).html()==="") {
                    _this.asnycLoadOperationData('profitLoss', rangeType);
                } else {
                    _this.profitLossGaugeChart(rangeType);
                    _this.profitLossColumnChart(rangeType);
                }
            });

            /**
             * 活跃用户、总登录次数、安装量、卸载量、新增玩家、新增存款玩家、返回人数、反水金额周期切换事件
             */
            $(".cycleChangeBtn .btn").click(function() {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                _this.asnycLoadOperationData($(this).attr("statisticsDataType"), $(this).attr('value'));
            });

            /**
             *自选时间段查询
             */
            $(".cycleChangeOFdaysBtn .btn").click(function() {
                var stateTime =  $(this).attr("stateTime");
                var endTime = $(this).attr("endTime");
                _this.asnycLoadOfDays($(this).attr("statisticsDataType"),$(this).attr('value'),stateTime,endTime);
            });

            /**
             * 根据api查询反水金额
             * */
            $(".queryRakebackcashByApi .btn.btn-primary").click(function() {
                var apis = $(this).attr("apis");
                var gameTypes = $(this).attr("gameTypes");
                var rangeType = 'D';
                var stateTime = $(this).attr("stateTime");
                var endTime = $(this).attr("endTime");
                // _this.queryRakebackcashOfApi(apis,gameTypes, rangeType,null,null);
                _this.queryRakebackcashOfApi(apis,gameTypes, rangeType,stateTime,endTime);
            });


            //活跃用户和登录次数切换事件
            $("._addPrimary.active-user .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#f4").html(null);
                if($(this).hasClass('login-count')){
                    _this.loginCount('D');
                }else{
                    _this.activeUser('D');
                }

            });

            //安装量和卸载量切换事件
            $("._addPrimary.install .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#i5").html(null);
                if($(this).hasClass('uninstall')){
                    _this.installAndUninstall('uninstall','D');
                }else{
                    _this.installAndUninstall('install','D');
                }

            });

            //新增玩家和新增存款玩家切换事件
            $("._addPrimary.player-trend .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#p6").html(null);
                if($(this).hasClass('new-deposit-player')){
                    _this.playerTrend('new-deposit-player','D');
                }else{
                    _this.playerTrend('new-player','D');
                }

            });

            //反水人数和反水金额切换事件
            $("._addPrimary.rakeback-trend .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#b7").html(null);
                if($(this).hasClass('rakeback-cash')){
                    $("#api-choice").show();
                    _this.rakebackTrend('rakeback-cash','D');
                }else{
                    $("#api-choice").hide();
                    _this.rakebackTrend('rakeback-men','D');
                }
            });

            //反水金额选择API
            $("#api-choice").click(function() {

            });

            /**
             * 图表与报表的切换
             */
            $("._addPrimary .btn").click(function() {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                if($(this).val()==='report') {
                    $("#operationChart").hide();
                    $("#operationReport").show();
                    _this.playerTrendList();
                } else {
                    $("#operationChart").show();
                    $("#operationReport").hide();
                }
            });
        },

        /**
         * 获取对应周期图表数据的Key
         * @param prefix
         * @param rangeType
         * @returns {string}
         */
        getKey: function(prefix, rangeType) {
            if ('M'===rangeType) {
                return prefix + 'OfMonth';
            } else if('W'===rangeType) {
                return prefix + 'OfWeek';
            }else if('C' === rangeType){
                return prefix + 'OfChoiceDays';
            } else {
                return prefix + 'OfDay';
            }
        },

        /**
         * 最近两个周期的存取差额对比
         * @param rangeType
         */
        balanceGaugeChart: function(rangeType) {
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            this.drawGaugeChart('c1', data, '#FF6363', '#6363FF', 'balanceAmount');
        },

        /**
         * 存取差额分组柱状图展示
         * 展示最近七个周期的存取差额
         * @param rangeType
         */
        balanceColumnChart: function(rangeType) {
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z1', data, 'balanceAmount', 'staticDay*balanceAmount',　'存取差额', 300);
        },

        /**
         * 最近两个周期的有效投注额对比
         * @param rangeType
         * @param terminal
         */
        effectiveGaugeChart: function(rangeType, terminal) {
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            if('phone'===terminal) {
                this.drawGaugeChart('c2', data, '#FF6363', '#6363FF', 'effectiveTransactionPhone');
            } else if('pc'===terminal) {
                this.drawGaugeChart('c2', data, '#FF6363', '#6363FF', 'effectiveTransactionPc');
            } else {
                this.drawGaugeChart('c2', data, '#FF6363', '#6363FF', 'effectiveTransactionAll');
            }
        },

        /**
         * 最近多个周期的有效投注额
         * @param rangeType
         * @param terminal
         */
        effectiveColumnChart: function(rangeType, terminal) {
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            if('phone'===terminal) {
                this.drawBasicColumnChart('z2', data, 'effectiveTransactionPhone', 'staticDay*effectiveTransactionPhone',　'有效投注', 300);
            } else if('pc'===terminal) {
                this.drawBasicColumnChart('z2', data, 'effectiveTransactionPc', 'staticDay*effectiveTransactionPc',　'有效投注', 300);
            } else {
                this.drawBasicColumnChart('z2', data, 'effectiveTransactionAll', 'staticDay*effectiveTransactionAll',　'有效投注', 300);
            }

        },

        /**
         * 最近两个周期损益对比
         * @param rangeType
         */
        profitLossGaugeChart: function(rangeType) {
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            this.drawGaugeChart('c3', data, '#FF6363', '#6363FF', 'transactionProfitLoss');
        },

        /**
         * 最近多个周期的损益
         * @param rangeType
         */
        profitLossColumnChart: function(rangeType) {
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            this.drawBasicColumnChart('z3', data, 'transactionProfitLoss', 'staticDay*transactionProfitLoss', '损益', 300);
        },

        /**
         * 总登录次数
         */
        loginCount:function(rangeType)　{
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            var pc = {"name":"登录次数(PC端)"};
            var phone = {"name":"登录次数(手机端)"};
            var all = {"name":"登录次数(全部)"};
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var operationSummary = operationSummarys[i];
                pc[operationSummary.staticDay] = operationSummary.loginNumPc;
                phone[operationSummary.staticDay] = operationSummary.loginNumPhone;
                all[operationSummary.staticDay] = operationSummary.loginNumPc + operationSummary.loginNumPhone;
            }
            array.push(pc);
            array.push(phone);
            array.push(all);
            var keys = Object.keys(array[0]);
            keys.splice(0,1);
            this.drawGroupColumnChart('f4', array, keys,476);
        },

        /**
         * 活跃用户数
         */
        activeUser:function(rangeType){
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var data = {};
                var operationSummary = operationSummarys[i];
                data['time'] = operationSummary.staticDay;
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
        installAndUninstall:function(rangeType) {
            var isinstall = $("._addPrimary.install .btn.btn-primary").attr("value");
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var data = {};
                var operationSummary = operationSummarys[i];
                data['time'] = operationSummary.staticDay;
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
        playerTrend: function(rangeType) {
            var newPlayerType = $("._addPrimary.player-trend .btn.btn-primary").attr("value");
            var dataKey = this.getKey("#operationSummaryData", rangeType);
            var jsonStr = $(dataKey).html();
            var operationSummarys = $.parseJSON(jsonStr);
            if(operationSummarys == null || operationSummarys.length < 1) return ;
            var array = [];
            for(var i = 0 ;i < operationSummarys.length ; i++ ){
                var data = {};
                var operationSummary = operationSummarys[i];
                data['time'] = operationSummary.staticDay;
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

        /**
         * 返水走势
         * @param rangeType
         */
        rakebackTrend:function(rakebackType,rangeType) {
            var rakebackType = $("._addPrimary.rakeback-trend .btn.btn-primary").attr("value");
            var dataKey;
            if('API' === rakebackType){
                dataKey = '#rakebackCashListByApis';
                rakebackType = 'rakeback-cash';
            }else{
                dataKey = this.getKey("#operationSummaryData", rangeType);
            }
            var jsonStr = $(dataKey).html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            if('rakeback-men' == rakebackType) {
                this.drawBasicColumnChart('b7', data, 'rakebackPlayer', 'staticDay*rakebackPlayer', '返水人数', 379);
            } else if('rakeback-cash' == rakebackType) {
                this.drawBasicColumnChart('b7', data, 'rakebackAmount', 'staticDay*rakebackAmount', '返水金额', 356);
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
            if(data == null || data.length < 1) return;
            $("#"+containerName).html(null);
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: fieldSet, // 展开字段集
                key: 'time', // key字段
                value: 'sum' // value字段
            });
            const chart = width ? new G2.Chart({
                container: containerName,
                height: 400,
                width:width,
                padding: [20, 12, 95, 50]
            })
                :
            new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 300,
                padding: [20, 12, 95, 50]
            });
            chart.source(dv);
            chart.interval().position('time*sum').color('name').adjust([{
                type: 'dodge',
                marginRatio: 1 / 32
            }]);
            chart.render();
        },

        /**
         * 基础柱状图
         */
        drawBasicColumnChart: function(containerName, data, scale, position, tips, height) {
            //清空原有内容
            $("#"+containerName).empty();

            const chart =  new G2.Chart({
                container: containerName,
                forceFit: true,
                height: height,
                padding: [20, 35, 45, 50]
            });
            chart.source(data);
            chart.interval().position(position)
                .tooltip(scale, function(val) {
                    return {
                        name: tips,
                        value: val
                    };
                });
            chart.render();
        },

        /**
         * 折线图
         */
        foldlineDiagram:function(containerName, data){
            if(data == null || data.length < 1) return;
            $("#"+containerName).empty();
            const ds = new DataSet();
            var keys = Object.keys(data[0]);
            keys.splice(0,1);
            const chart = new G2.Chart({
                container: containerName,
                // forceFit: true,
                height: 400,
                width:476,
                padding: [20, 30, 105, 50]
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
            chart.axis('time', {
                label: {
                    formatter: function(time) {
                        return time + '    ';
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
         * 绘制双环仪表图
         * @param containerName
         * @param data
         * @param colorm
         * @param colorn
         * @param column
         */
        drawGaugeChart: function(containerName, data, colorm, colorn, column) {
            //清空原有内容
            $("#"+containerName).empty();

            // 获取最近两个周期的值
            var numerical0 = $(data[data.length-1]).attr(column);
            var numerical1 = $(data[data.length-2]).attr(column);
            var staticDay0 = $(data[data.length-1]).attr('staticDay');
            var staticDay1 = $(data[data.length-2]).attr('staticDay');
            $("#"+containerName+"_title").html(staticDay0+": "+numerical0);

            var startNum, endNum;
            if(numerical0>=0 && numerical1>=0) {
                startNum = 0;
                if(numerical0 >= numerical1) {
                    endNum = numerical0;
                } else {
                    endNum = numerical1;
                }
            } else {
                if(Math.abs(numerical0) >= Math.abs(numerical1)) {
                    startNum = -(Math.abs(numerical0));
                    endNum = Math.abs(numerical0);
                } else {
                    startNum = -(Math.abs(numerical1));
                    endNum = Math.abs(numerical1);
                }
            }
            const Shape = G2.Shape;
            // 自定义Shape 部分
            Shape.registerShape('point', 'pointer', function(cfg, group) {
                var point = cfg.points[0]; // 获取第一个标记点
                point = this.parsePoint(point);
                const center = this.parsePoint({ // 获取极坐标系下画布中心点
                    x: 0,
                    y: 0
                });
            });
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 320,
                padding: [ 0, 10, 30, 10 ]
            });
            chart.source(data);

            chart.coord('polar', {
                startAngle: -9 / 8 * Math.PI,
                endAngle: 1 / 8 * Math.PI,
                radius: 0.80 //设置仪表图在画框中占比(即在固定画框中的大小)
            });
            chart.scale('numerical', {
                min: startNum,
                max: (startNum===0 && endNum===0) ? 100 : endNum,
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
                start: [ numerical0>=0 ? 0 : numerical0, 1.07 ],
                end: [ numerical0>=0 ? numerical0 : 0, 1.07 ],
                style: {
                    stroke: colorm,
                    lineWidth: 12,
                }
            });

            // 绘制前天指标
            chart.guide().arc({
                zIndex: 2,
                start: [ numerical1>=0 ? 0 : numerical1, 1.19 ],
                end: [ numerical1>=0 ? numerical1 : 0, 1.19 ],
                style: {
                    stroke: colorn,
                    lineWidth: 12,
                }
            });

            // 绘制指标数字
            chart.guide().html({
                position: [ '50%', '60%' ],
                html: '<div style="width: 300px;text-align: center; border:0px solid red;">'
                + '<p style="margin: 0; font-weight:bold;">' + this.getGaugePercent(numerical0, numerical1) + '</p>'
                + '<p style="font-size:15px; color: #545454;margin: 0;">' + staticDay1 + '</p>'
                + '<p style="font-size:14px; font-weight:bold; color:#d2b0ff;margin: 0;">' + numerical1 + '</p>'
                + '</div>'
            });

            // 自定义标题
            chart.guide().html({
                position: [ '50%', '95%' ],
                html: '<div style="width: 300px;text-align: center; border:0px solid red;">'
                + '<span style="background-color: '+colorm+'; width: 15px; height: 15px; display: inline-block; margin-right: 8px;"></span>' + staticDay0
                + '<span style="background-color: '+colorn+'; width: 15px; height: 15px; display: inline-block; margin: 0px 8px 0px 20px;"></span>' + staticDay1
                + '</div>'
            });

            chart.render();
        },

        /**
         * 异步加截运营统计数据(按天/周/月)
         * @param chart
         * @param rangeType
         */
        asnycLoadOperationData: function(chart, rangeType) {
            var _this = this;
            var url = root + '/daily/asyncLoadOperationSummary.html?queryDateRange='+rangeType;
            $.ajax({
                type: "GET",
                url: url,
                timeout: 60000,
                success: function (data) {
                    var jsonData = $.parseJSON(data);
                    $(_this.getKey("#operationSummaryData", rangeType)).html(JSON.stringify(jsonData.operationSummaryData));
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                beforeSend: function () {
                    //_this.showLoading();
                },
                complete: function () {
                    if ('balance'===chart) {
                        _this.balanceGaugeChart(rangeType);
                        _this.balanceColumnChart(rangeType);
                    } else if('effective'===chart) {
                        _this.effectiveGaugeChart(rangeType);
                        _this.effectiveColumnChart(rangeType);
                    } else if('profitLoss'===chart) {
                        _this.profitLossGaugeChart(rangeType);
                        _this.profitLossColumnChart(rangeType);
                    } else if('activeUser'===chart) {
                        var statisticsDataType = $("._addPrimary.active-user .btn.btn-primary").attr("value");
                       'login-count' == statisticsDataType ? _this.loginCount(rangeType) : _this.activeUser(rangeType);
                    } else if('installAndUninstall'===chart) {
                        var statisticsDataType = $("._addPrimary.install .btn.btn-primary").attr("value");
                        _this.installAndUninstall(statisticsDataType,rangeType);
                    } else if('playerTrend'===chart) {
                        var statisticsDataType = $("._addPrimary.player-trend .btn.btn-primary").attr("value");
                        _this.playerTrend(statisticsDataType,rangeType);
                    } else if('rakebackTrend'===chart) {
                        var statisticsDataType = $("._addPrimary.rakeback-trend .btn.btn-primary").attr("value");
                        _this.rakebackTrend(statisticsDataType,rangeType);
                    }
                }
            });
        },

        getGaugePercent: function(numerical1, numerical2) {
            if(numerical1===0) {
                numerical1 = 0.0;
            }
            var percent = Number([1-(numerical1/numerical2)]*10).toFixed(2);
            if (percent>0) {
                return '<font color="red" size="30">↑</font><font color="#d2b0ff" size="30">'+percent+'%</font>';
            } else if(percent<0) {
                return '<font color="green" size="30">↓</font><font color="#d2b0ff" size="30">'+Math.abs(percent)+'%</font>';
            } else {
                return '<font color="#d2b0ff" size="30">'+percent+'%</font>';
            }
        },

        /**
         * 异步加载数据
         * @param chart
         * @param rangeType
         * @param stateTime
         * @param endTime
         */
        asnycLoadOfDays:function(chart, rangeType, stateTime, endTime) {
            var _this = this;
            var url = root + '/daily/operationSummaryDataOfChoiceDays.html?search.staticTime='+stateTime+"&search.staticTimeEnd="+endTime;
            $.ajax({
                type: "GET",
                url: url,
                timeout: 60000,
                success: function (data) {
                    var jsonData = $.parseJSON(data);
                    $("#operationSummaryDataOfChoiceDays").html(JSON.stringify(jsonData));
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                beforeSend: function () {
                    //_this.showLoading();
                },
                complete: function () {
                    if('activeUser'===chart) {
                        var statisticsDataType = $("._addPrimary.active-user .btn.btn-primary").attr("value");
                        'login-count' == statisticsDataType ? _this.loginCount(rangeType) : _this.activeUser(rangeType);
                    } else if('installAndUninstall'===chart) {
                        var statisticsDataType = $("._addPrimary.install .btn.btn-primary").attr("value");
                        _this.installAndUninstall(statisticsDataType,rangeType);
                    } else if('playerTrend'===chart) {
                        var statisticsDataType = $("._addPrimary.player-trend .btn.btn-primary").attr("value");
                        _this.playerTrend(statisticsDataType,rangeType);
                    } else if('rakebackTrend'===chart) {
                        var statisticsDataType = $("._addPrimary.rakeback-trend .btn.btn-primary").attr("value");
                        _this.rakebackTrend(statisticsDataType,rangeType);
                    }
                }
            });
        },

        queryRakebackcashOfApi:function(apis,gameTypes,rangeType,stateTime,endTime){
            var _this = this;
            var url = root + '/daily/queryRakebackCashByApi.html';
            $.ajax({
                url: url,
                type: "POST",
                data:{
                    "rakebackAmountApis":apis,
                    "rakebackAmountGameTypes":gameTypes,
                    "queryDateRange":rangeType,
                    "result.staticTime":stateTime,
                    "result.staticTimeEnd":endTime
                },
                success: function (data) {
                    if(data) {
                        var jsonData = $.parseJSON(data);
                        $("#rakebackCashListByApis").html(JSON.stringify(jsonData));
                        _this.rakebackTrend('API', rangeType);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        },

        /**
         * 用户走势数据加载
         */
        playerTrendList: function() {
            var jsonStr = $("#operationSummaryDataOfDay").html();
            if(!jsonStr) return;
            const data = $.parseJSON(jsonStr);
            $('#playerListResult').empty();
            var html;
            $(data).each(function(i) {
                html += '<tr><td>'+data[i].staticDay+'</td><td>'+data[i].balanceAmount+'</td><td>'+data[i].balanceAmount+'</td><td>'+data[i].balanceAmount+'</td></tr>';
            });
            $("#playerListResult").html(html);
            $('#playerListResult').prepend('<tr><th>时间</th><th>新增玩家</th><th>新增存款玩家</th><th>付费率</th><th>活跃用户(PC端)</th><th>活跃用户(手机端)</th><th>安装量(IOS)</th><th>安装量(Android)</th></tr>')//添加表头tr th

            //分页
            $.jqPaginator('#pagination', {
                totalPages: 5,//总共多少页
                pageSize:10,//分页条目
                visiblePages: 3,//显示多少分页按钮
                currentPage: 1,//当前在第几页
                first:'<li class="page-item"><a class="page-link first-page" href="javascript:;"></a></li>',
                prev: '<li class="page-item"><a class="page-link previous" href="javascript:;" aria-label="Previous"></a></li>',
                next: '<li class="page-item"><a class="page-link next" href="javascript:;" aria-label="Next"></a></li>',
                last: '<li class="page-item"><a class="page-link last-page" href="javascript:;"></a></li>',
                page: '<li class="page page-item"><a class="page-link" href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num) {
                    /*nowpage = num;
                     howPage();
                     if(!run){return false}//控制没有时页面还跳动情况*/
                }
            });
        }
    });
});