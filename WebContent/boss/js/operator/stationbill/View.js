/**
 * create by eagle
 */
define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
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

        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            var _this = this;
            //这里初始化所有的事件
        },

        checkBill: function (e,opt) {
            $(".api-hidden-checked-value").html("");
            var billId = opt.billId;
            window.top.topPage.ajax({
                url:root+'/operation/stationbill/checkBill.html',
                type:"POST",
                dataType: "json",
                data: {"search.id": billId},
                success:function(dataList) {
                    if(dataList.length>0){
                        var bbin = 0;
                        var hasBbin = false;
                        for(var i=0;i<dataList.length;i++){
                            var data = dataList[i];
                            if(data.apiId!=10){
                                var dataVal = data.profitLoss;
                                if(dataVal){
                                    dataVal = parseFloat(dataVal);
                                }
                                $("#API_"+data.apiTypeId+data.apiId).html("<b>-["+data.profitLoss.toFixed(2)+"]</b>");
                                var orgin_val = $("#ORGIN_"+data.apiTypeId+data.apiId).text();
                                var orginVal = parseFloat(orgin_val.replace(/,/g,""));
                                var diff  = dataVal - orginVal;
                                $("#DIFF_"+data.apiTypeId+data.apiId).html("<b>="+diff.toFixed(2)+"</b>");
                            }else{
                                hasBbin = true;
                                bbin += data.profitLoss;
                            }

                        }
                        if(hasBbin){
                            var bbinVal = $("#ORGIN_110").text();
                            var diff = parseFloat(bbinVal) - bbin;
                            $("#API_110").html("<b>-["+bbin.toFixed(2)+"]</b>");
                            $("#DIFF_110").html("<b>="+diff.toFixed(2)+"</b>");
                        }
                    }
                    $(e.currentTarget).unlock()
                },
                error:function(data) {
                    $(e.currentTarget).unlock()
                }
            })
        },
        reCalculate:function (e, opt) {
            var _this = this;
            var billId = opt.billId;
            window.top.topPage.ajax({
                url:root+'/operation/stationbill/reCalculate.html',
                type:"POST",
                dataType: "json",
                data: {"search.id": billId},
                beforeSend:function () {
                    $(e.currentTarget).attr("disabled",true);
                },
                success:function(data) {
                    if(data.state){
                        _this.checkBill(e,opt);
                    }
                    $(e.currentTarget).attr("disabled",false);
                    $(e.currentTarget).unlock();
                },
                error:function(data) {
                    $(e.currentTarget).unlock()
                }
            })
        }
    });
});