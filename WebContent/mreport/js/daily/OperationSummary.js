/**
 * 数据中心 - 运营日常统计
 */
define(['site/MReport'], function (MReport) {
    return MReport.extend({

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

            this.activeUser('D',null);

            this.installAndUninstall('D',null); //默认展示近七天安装量

            this.playerTrend('D',null); //默认展示近七天新增玩家

            this.rakebackTrend('D',null); //默认展示近七天反水人数

            this.initDatePick($(".daterangepickers"));//初始化日历插件

        },

        onPageLoad:function () {
            $('.api_chose').css({"margin-left":-$('.api_chose').width()/2});
            $('.api_chose').css({"margin-top":-$('.api_chose').height()/2});
            $(window).resize(function(){
                var domw = $(window).width();
                var domh = $(window).height();
                var h = $('.api_chose').height();
                var w = $('.api_chose').width();
                $('.api_chose').css({"margin-left":-w/2});
                $('.api_chose').css({"margin-top":-h/2});
            });

            //API
            //点击API出现窗口
            $('.apiBut button').click(function(){
                $('#api_chose').show()
            });

            //全选
            var x = 0;
            var lens = $('.api_box input').length;
            var n = 0;
            function allChose(){
                $('.api_box input').each(function(i,val){
                    if($(this).prop("checked")){n++}
                });
                if(n == lens){
                    $('#allCheck input').prop("checked",true)
                }
                else{
                    $('#allCheck input').prop("checked",false)
                }
            }
            //全总选
            if($('#allCheck input').prop("checked") ==  true){
                $('.api_box input').prop("checked",true);
                window.top.topPage.apiAllCheck = true;
            }else{
                window.top.topPage.apiAllCheck = false;
            }
            $('#allCheck input').click(function(){
                $(this).prop("checked") == true?$('.api_box input').prop("checked",true):$('.api_box input').prop("checked",false)
            });
            //类总选
            $(".api_box .api_tlt input").click(function(){
                var prop = $(this).prop("checked")//本身checked值
                var olo = $(this).parent().parent().find('input');
                olo.prop("checked",prop)//赋值全选
                allChose();
                n=0
            });
            //分选
            $(".classification input").click(function(){
                var len = $(this).parent().parent().find('input').length;
                var ipt = $(this).parent().parent().find('input');
                var all = $(this).parent().parent().parent().find('.api_tlt input');

                $(ipt).each(function(i,val){
                    if($(this).prop("checked")){x++}
                });
                x==len?all.prop("checked",true):all.prop("checked",false);
                allChose();
                x=0;
                n=0;
            })
        },
        /**
         * 绑定事件函数
         */
        bindEvent: function() {
            this._super();
            var _this = this;

            //关闭X
            $('#closeAPi').click(function(){
                $("#mask-api").hide();
                if(!$(".singleAPI:checked").length){
                    $('#allCheck input').prop("checked",true);
                    $('.api_box input').prop("checked",true);
                }
            });

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
                $(this).addClass("btn-success").siblings().removeClass("btn-success");
                var chart = $(this).attr("statisticsDataType");
                var rangeType = $(this).attr('value');
                // var yesterDay = new Date(new Date().setDate(new Date().getDate() - 1 ));
                // var lastdate = new Date(new Date().setDate(new Date().getDate() - 8 ));
                if('D' === rangeType){
                     /*var loadDatePick =
                     '<div class="input-group daterangepickers" >'+
                     '  <gb:dateRange format="yyyy-MM-dd" style="width:80px;" inputStyle="width:80px" useToday="true" useRange="true"'+
                     '  position="down" lastMonth="false" hideQuick="true" opens="true" callback="End"  id="'+chart+'"'+
                     '  startDate="'+lastdate+'" endDate="'+yesterDay+'"  maxDate="'+yesterDay+'"'+
                     '  startName="'+chart+'-beginTime" endName="'+chart+'-endTime" thisMonth="true"/>'+
                     ' </div>';
                     $(".date."+chart).html(loadDatePick);
                    _this.initDatePick($(".daterangepickers"));*/
                    $(".date."+chart).show();

                }else{
                    /* $(".date."+chart).empty();*/
                    $(".date."+chart).hide();
                }
                var rakebackType = $("._addPrimary.rakeback-trend .btn.btn-primary").attr("value");
                if(chart === 'rakebackTrend' && 'rakeback-cash' === rakebackType && !window.top.topPage.apiAllCheck) {
                    _this.rakebackTrend(rangeType,null);
                    return ;
                }

                _this.asnycLoadOperationData(chart,rangeType);
            });

            //活跃用户和登录次数切换事件
            $("._addPrimary.active-user .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#f4").html(null);
                var date = $(".cycleChangeBtn.activeUser .btn.btn-success").attr("value");
                if($(this).hasClass('login-count')){
                    _this.loginCount(date,null);
                }else{
                    _this.activeUser(date,null);
                }

            });

            //安装量和卸载量切换事件
            $("._addPrimary.install .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#i5").html(null);
                var date = $(".cycleChangeBtn.installAndUninstall .btn.btn-success").attr("value");
                _this.installAndUninstall(date,null);
            });

            //新增玩家和新增存款玩家切换事件
            $("._addPrimary.player-trend .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#p6").html(null);
                var date = $(".cycleChangeBtn.playerTrend .btn.btn-success").attr("value");
                _this.playerTrend(date,null);
            });

            //反水人数和反水金额切换事件
            $("._addPrimary.rakeback-trend .btn").click(function(){
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                $("#b7").html(null);
                var date = $(".cycleChangeBtn.rakebackTrend .btn.btn-success").attr("value");
                if($(this).hasClass('rakeback-cash')){
                    $("#api-choice").show();
                }else{
                    $("#api-choice").hide();
                }
                _this.rakebackTrend(date,null);
            });

            //反水金额选择API
            $("#api-choice").click(function() {
                if($("#mask-api").length) {
                    $("#mask-api").show();
                }
            });

            //API弹窗保存按钮
            $("#submitApi").click(function(){
                //是否全选
                if($("#apiAllCheckInput").prop('checked')){
                    window.top.topPage.apiAllCheck = true;
                }else{
                    window.top.topPage.apiAllCheck = false;
                }

                if(!$(".singleAPI:checked").length){
                    window.top.alert('请至少选择一项');
                    window.top.topPage.apiIdArray = null;
                    window.top.topPage.gameTypes = null;
                    window.top.topPage.apiAllCheck = true;
                }else{
                    var apiIdArray = [];
                    var gameTypes = [];
                    $(".singleAPI:checked").each(function(i,val){
                        var apiId = $(val).val();
                        var gameType = $(val).attr("gameType");
                        apiIdArray.push(Number(apiId));
                        if(gameTypes.indexOf(gameType) == -1){
                            gameTypes.push(gameType);
                        }
                    });
                    window.top.topPage.apiIdArray = apiIdArray;
                    window.top.topPage.gameTypes = gameTypes;
                    $("#mask-api").hide();
                    var date = $(".cycleChangeBtn.rakebackTrend .btn.btn-success").attr("value");
                    _this.rakebackTrend(date,null);
                }
            });

            /**
             * 图表与报表的切换
             */
            $("._toggleBtn .btn").click(function(e) {
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                if($(this).val()==='report') {
                    $("#operationChart").hide();
                    $("#operationReport").show();
                    _this.asnycOperationSummaryOfDays('', 'initReportList');
                } else {
                    $("#operationChart").show();
                    $("#operationReport").hide();
                }
                e.stopPropagation();    // 阻止事件冒泡
            });
        },

        /**
         *自选时间段查询
         */
        End:function(obj,option){
            var dayOf14 = 14*24*60*60*1000;
            var $current = $(obj.currentTarget.outerHTML);
            var targetId = $current.attr("id");
            var $chartName = $("#"+targetId).parent().parent();
            var StartDate = $chartName.find("input[name='"+targetId+"-beginTime']").val();
            var EndDate = $chartName.find("input[name='"+targetId+"-endTime']").val();
            var maxDate = new Date(new Date(StartDate).setDate(new Date(StartDate).getDate() + 14 ));
            var _endDate = new Date(EndDate) - new Date(StartDate) > dayOf14 ? this.getFormatDate(maxDate) : EndDate;
            var rakebackType = $("._addPrimary.rakeback-trend .btn.btn-primary").attr("value");
            if('rakebackTrend' == targetId && rakebackType == 'rakeback-cash' && !window.top.topPage.apiAllCheck){
                this.queryRakebackcashOfApi(window.top.topPage.apiIdArray, window.top.topPage.gameTypes,'D',StartDate,_endDate);
                return ;
            }

            // $chartName.find("input[name='"+targetId+"-endTime']").daterangepicker({
            //     format: 'YYYY-MM-DD',
            //     endDate: _endDate,
            //     maxDate:maxDate,
            //     autoApply:true,
            // });
            //
            // $chartName.find("input[name='"+targetId+"-beginTime']").daterangepicker({
            //     format: 'YYYY-MM-DD',
            //     startDate: StartDate,
            //     min: this.getFormatDate(new Date(StartDate)),
            //     autoApply:true
            // });
            this.asnycLoadOfDays(targetId,StartDate, _endDate );

             /*var loadDatePick =
             '<div class="input-group daterangepickers" >'+
             ' <gb:dateRange format="${DateFormat.DAY}" style="width:80px;" inputStyle="width:80px" useToday="true" useRange="true"'+
             ' position="down" lastMonth="false" hideQuick="true" opens="true" callback="End"  id="'+chart+'"'+
             ' startDate="${lastdate}" endDate="${yesterDay}"  maxDate="${yesterDay}"'+
             'startName="'+chart+'-beginTime" endName="'+chart+'-endTime" thisMonth="true"/>'+
             ' </div>';
             $(".date."+chart).html(loadDatePick);
            this.initDatePick($(".daterangepickers"));*/
        },

        getFormatDate:function(date){
            return !date ? date : date.getFullYear()+"-"+((date.getMonth()+1).length > 1 ? (date.getMonth()+1) : "0"+(date.getMonth()+1))+"-"+((''+ date.getDate()).length > 1 ?  date.getDate() : '0' + date.getDate());
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
            this.drawBasicColumnChart('z1', data, 'staticDay', 'balanceAmount',　'存取差额', 300);
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
                this.drawBasicColumnChart('z2', data, 'staticDay', 'effectiveTransactionPhone',　'有效投注', 300);
            } else if('pc'===terminal) {
                this.drawBasicColumnChart('z2', data, 'staticDay', 'effectiveTransactionPc',　'有效投注', 300);
            } else {
                this.drawBasicColumnChart('z2', data, 'staticDay', 'effectiveTransactionAll',　'有效投注', 300);
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
            this.drawBasicColumnChart('z3', data, 'staticDay', 'transactionProfitLoss', '损益', 300);
        },

        /**
         * 总登录次数
         */
        loginCount:function(rangeType,operationSummarys)　{
            if(!operationSummarys) {
                var dataKey = this.getKey("#operationSummaryData", rangeType);
                var jsonStr = $(dataKey).html();
                operationSummarys = $.parseJSON(jsonStr);
            }
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
            this.drawGroupColumnChart('f4', array, keys);
        },

        /**
         * 活跃用户数
         */
        activeUser:function(rangeType,operationSummarys){
            if(!operationSummarys) {
                var dataKey = this.getKey("#operationSummaryData", rangeType);
                var jsonStr = $(dataKey).html();
                operationSummarys = $.parseJSON(jsonStr);
            }
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
        installAndUninstall:function(rangeType,operationSummarys) {
            var isinstall = $("._addPrimary.install .btn.btn-primary").attr("value");
            if(!operationSummarys) {
                var dataKey = this.getKey("#operationSummaryData", rangeType);
                var jsonStr = $(dataKey).html();
                operationSummarys = $.parseJSON(jsonStr);
            }
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
        playerTrend: function(rangeType,operationSummarys) {
            var newPlayerType = $("._addPrimary.player-trend .btn.btn-primary").attr("value");
            if(!operationSummarys) {
                var dataKey = this.getKey("#operationSummaryData", rangeType);
                var jsonStr = $(dataKey).html();
                operationSummarys = $.parseJSON(jsonStr);
            }
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
        rakebackTrend:function(rangeType,operationSummarys) {
            var rakebackType = $("._addPrimary.rakeback-trend .btn.btn-primary").attr("value");
            if(!operationSummarys) {
                if(window.top.topPage.apiAllCheck || 'rakeback-men' == rakebackType){
                    var dataKey = this.getKey("#operationSummaryData", rangeType);
                    var jsonStr = $(dataKey).html();
                    if (!jsonStr) return;
                    operationSummarys = $.parseJSON(jsonStr);
                }else{
                    var apiIdArray = window.top.topPage.apiIdArray;
                    var gameTypes = window.top.topPage.gameTypes;
                    if(!apiIdArray.length && !gameTypes.length) {
                        window.top.topPage.apiAllCheck = true;
                        return this.rakebackTrend(rangeType, operationSummarys);
                    }else{
                        this.queryRakebackcashOfApi(apiIdArray,gameTypes,rangeType,null,null);
                        return;
                    }
                }

            }
            if('rakeback-men' == rakebackType) {
                this.drawBasicColumnChart('b7', operationSummarys, 'staticDay', 'rakebackPlayer', '返水人数', 379);
            } else if('rakeback-cash' == rakebackType) {
                this.drawBasicColumnChart('b7', operationSummarys, 'staticDay', 'rakebackAmount', '返水金额', 356);
            }
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
                        'login-count' == statisticsDataType ? _this.loginCount(rangeType,null) : _this.activeUser(rangeType,null);
                    } else if('installAndUninstall'===chart) {
                        _this.installAndUninstall(rangeType,null);

                    } else if('playerTrend'===chart) {
                        _this.playerTrend(rangeType,null);

                    } else if('rakebackTrend'===chart) {
                        _this.rakebackTrend(rangeType,null);
                    }
                }
            });
        },

        /**
         * 异步加载数据(自选天数查询)
         * @param chart
         * @param rangeType
         * @param stateTime
         * @param endTime
         */
        asnycLoadOfDays:function(chart, stateTime, endTime) {
            var _this = this;
            var url = root + '/daily/operationSummaryDataOfChoiceDays.html?search.staticTime='+stateTime+"&search.staticTimeEnd="+endTime;
            $.ajax({
                type: "GET",
                url: url,
                timeout: 60000,
                success: function (data) {
                    var jsonData = $.parseJSON(data);
                    if('activeUser'===chart) {
                        var statisticsDataType = $("._addPrimary.active-user .btn.btn-primary").attr("value");
                        'login-count' == statisticsDataType ? _this.loginCount('D',jsonData) : _this.activeUser('D',jsonData);

                    } else if('installAndUninstall'===chart) {
                        _this.installAndUninstall('D',jsonData);

                    } else if('playerTrend'===chart) {
                        _this.playerTrend('D',jsonData);

                    } else if('rakebackTrend'===chart) {
                        _this.rakebackTrend('D',jsonData);

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
            });
        },

        /**
         *根据Api查询反水金额
         * @param apis
         * @param gameTypes
         * @param rangeType
         * @param stateTime
         * @param endTime
         */
        queryRakebackcashOfApi:function(apis,gameTypes,rangeType,stateTime,endTime){
            var _this = this;
            var url = root + '/daily/queryRakebackCashByApi.html';
            var dataParam = {};
            dataParam.rakebackAmountApis = apis;
            dataParam.rakebackAmountGameTypes = gameTypes;
            dataParam.queryDateRange = rangeType;
            dataParam.beginTime = stateTime;
            dataParam.endTime = endTime;
            $.ajax({
                url: url,
                type: "POST",
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data:JSON.stringify(dataParam),
                success: function (data) {
                    if(data) {
                        _this.rakebackTrend(rangeType,data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {}
            });
        },

        /**
         * 异步按天加载用户走势数据
         * @param beginTime
         * @param endTime
         */
        asnycOperationSummaryOfDays: function(condition, tag) {
            var _this = this;
            var url = root + '/daily/searchOperationSummaryByDays.html?'+condition;
            $.ajax({
                type: "GET",
                url: url,
                timeout: 60000,
                dataType : 'json',
                success: function (data) {
                    if (tag==='playerHowPage') {
                        _this.iterationPlayerList(data.entities);
                    } else if(tag==='depositHowPage') {
                        _this.iterationDepositList(data.entities);
                    } else {
                        _this.initPlayerList(data);
                        _this.initDepositList(data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {}
            });
        },

        /**
         * 玩家走势列表翻页
         * @param pageNo
         */
        playerListHowPage: function(pageSize, pageNo) {
            var condition = "pageSize="+pageSize+"&pageNo="+pageNo;
            _this.asnycOperationSummaryOfDays(condition, 'playerHowPage');
        },

        /**
         * 存取走势列表翻页
         * @param pageNo
         */
        depositListHowPage: function(pageSize, pageNo) {
            var condition = "pageSize="+pageSize+"&pageNo="+pageNo;
            _this.asnycOperationSummaryOfDays(condition, 'depositHowPage');
        },

        /**
         * 迭代用户走势数据
         * @param items
         */
        iterationPlayerList: function(items) {
            $('#playerListResult').empty();
            $(items).each(function(i) {
                $('#playerListResult').append(
                    '<tr><td>' + items[i].staticDateStr + '</td>'
                    + '<td>' + items[i].newPlayerAll + '</td>'
                    + '<td>' + items[i].newPlayerDeposit + '</td>'
                    + '<td>' + items[i].paymentRate + '%</td>'
                    + '<td>' + items[i].activePc + '</td>'
                    + '<td>' + items[i].activePhone + '</td>'
                    + '<td>' + items[i].installIos + '</td>'
                    + '<td>' + items[i].installAndroid + '</td></tr>');
            });
            $('#playerListResult').prepend(
                '<tr><th>时间</th><th>新增玩家</th>'
                +'<th>新增存款玩家</th><th>付费率</th>'
                +'<th>活跃用户(PC端)</th><th>活跃用户(手机端)</th>'
                +'<th>安装量(IOS)</th><th>安装量(Android)</th></tr>');//添加表头tr th
        },

        /**
         * 迭代存取走势数据
         * @param items
         */
        iterationDepositList: function(items) {
            $('#depositWithdrawResult').empty();
            $(items).each(function(i) {
                $('#depositWithdrawResult').append(
                    '<tr><td>'+items[i].staticDateStr+'</td>'
                    + '<td>' + items[i].depositAmount + '</td>'
                    + '<td>' + items[i].withdrawalAmount + '</td>'
                    + '<td>' + items[i].balanceAmount + '</td>'
                    + '<td>' + items[i].refuseWithdrawalAmount + '</td>'
                    + '<td>' + items[i].transactionProfitLoss + '</td>'
                    + '<td>' + items[i].rakebackPlayer + '</td>'
                    + '<td>' + items[i].rakebackAmount + '</td>'
                    + '<td>' + items[i].averageDeposit + '</td></tr>');
            });
            $('#depositWithdrawResult').prepend(
                '<tr><th>时间</th><th>存款金额(全部)</th>'
                +'<th>取款金额(全部)</th><th>存取差额(全部)</th>'
                +'<th>被拒取款金额</th><th>损益(全部)</th><th>返水人数</th>'
                +'<th>返水金额</th><th>平均存款</th></tr>');//添加表头tr th
        },

        /**
         * 用户走势数据加载
         */
        initPlayerList: function(data) {
            _this = this;
            _this.iterationPlayerList(data.entities);

            /*$('#dropdownMenuBtnA').click(function(e) {
                $(this).next('.dropdown-menu').stop().slideToggle();
                $(this).focus();
                $(this).blur(function() {
                    $(this).next('.dropdown-menu').stop().slideUp();
                });
            });

            //选择一页显示多少
            $('#choseNum .dropdown-item').click(function() {
                var pageSize = parseInt(this.text)//取值，该页面显示多少条
                _this.playerListHowPage(pageSize, 1);
                //$("#dropdownMenuBtnA").html(this.text);
            });*/

            //分页
            $.jqPaginator('#playerListPagination', {
                totalPages: data.totalPages,//总共多少页
                pageSize: data.pageSize,//分页条目
                visiblePages: 3,//显示多少分页按钮
                currentPage: data.pageNo,//当前在第几页
                first:'<li class="page-item"><a class="page-link first-page" href="javascript:;"></a></li>',
                prev: '<li class="page-item"><a class="page-link previous" href="javascript:;" aria-label="Previous"></a></li>',
                next: '<li class="page-item"><a class="page-link next" href="javascript:;" aria-label="Next"></a></li>',
                last: '<li class="page-item"><a class="page-link last-page" href="javascript:;"></a></li>',
                page: '<li class="page page-item"><a class="page-link" href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num) {
                    _this.playerListHowPage(data.pageSize, num);
                }
            });
        },

        /**
         * 存取款走势
         */
        initDepositList: function(data) {
            _this = this;
            _this.iterationDepositList(data.entities);

            /*$('#dropdownMenuBtnB').click(function(e) {
                $(this).next('.dropdown-menu').stop().slideToggle();
                $(this).focus();
                $(this).blur(function() {
                    $(this).next('.dropdown-menu').stop().slideUp();
                });
            });

            // 选择一页显示多少
            $('#choseNum .dropdown-item').click(function() {
                var pageSize = parseInt(this.text)//取值，该页面显示多少条
                _this.depositListHowPage(pageSize, 1);
                //$("#dropdownMenuBtnB").html(this.text);
            });*/

            //分页
            $.jqPaginator('#depositWithdrawPagination', {
                totalPages: data.totalPages,//总共多少页
                pageSize: data.pageSize,//分页条目
                visiblePages: 3,//显示多少分页按钮
                currentPage: data.pageNo,//当前在第几页
                first:'<li class="page-item"><a class="page-link first-page" href="javascript:;"></a></li>',
                prev: '<li class="page-item"><a class="page-link previous" href="javascript:;" aria-label="Previous"></a></li>',
                next: '<li class="page-item"><a class="page-link next" href="javascript:;" aria-label="Next"></a></li>',
                last: '<li class="page-item"><a class="page-link last-page" href="javascript:;"></a></li>',
                page: '<li class="page page-item"><a class="page-link" href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num) {
                    _this.depositListHowPage(data.pageSize, num);
                }
            });
        }
    });
});