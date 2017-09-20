//模板页面
define(['site/agent/AgentSettlementRebateReport'], function (AgentSettlementRebateReport) {

    return AgentSettlementRebateReport.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "#mainFrame form";
            this._super(window.top.message.report_auto['总代占成']);
            this.viewPeriod();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            /*var json = $("#jsonData").val();
            this.chartData(json);*/
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        callData: function (year, month, ele) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/topAgent/settlementRebate/getPeriods.html",
                type: "post",
                data:{'search.year':year,'search.month':month},
                dataType: "json",
                cache: false,
                async: false,
                success: function (data) {
                    _this.removeOption();
                    var jsonObj = eval(data);
                    if (jsonObj.length>0) {
                        $.each(jsonObj,function(index,obj){
                            $("#period").append('<option value="'+obj.id+'">'+obj.period+window.top.message.report['period']+obj.periodName+'</option>');
                        });
                        ele.trigger("chosen:updated");
                    }
                },
                error: function (err) {
                    console.info(err);
                }
            });
        },

        /**
         * 查看详细记录
         */
        detail:function(event,option){
            window.top.topPage.ajax({
                url:root+'/topAgent/settlementRebate/detail.html',
                type:"post",
                data:window.top.topPage.getCurrentFormData(event),
                success:function(data){
                    $("#mainFrame").html(data);
                },
                error:function(data, state, msg){
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        }
    });
});