var DepositBitCoin = function () {
    var _this = this;
    var dtpicker = null;
    this.checkAccount = function (obj, options) {//选择银行后触发
        $('#scan_Bank_List').find(".bank_list_i").removeClass("cur");
        $(obj).find(".bank_list_i").addClass("cur");
        $('#account').val(options.accountId);
    };
    //下一步，一般为公司入款才用到
    this.nextStep = function (obj, options) {
        var key = $("#account").val();
        if(key==''||key==null){
            toast("请选择一个账号.");
            return false;
        }
        var url = "/wallet/v3/deposit/nextStep.html?channel=" + $("#channel").val() + "&search.id=" + key + "&v=" + Math.random();
        goToUrl(url);
    };
    this.selectionDate= function (obj,options) {
        var _this = this;
        var format = dateFormat.dayminute;
        //设置开始时间选择器
        if(_this.dtpicker==null){
            _this.dtpicker = new mui.DtPicker({
                "type": "datetime",
                "value": $("input[name='result.returnTime']").val(),
                beginDate: new Date($("input[name='result.returnTime']").attr("minDate")),
                labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日'], '时', '分']//设置默认标签区域提示语
            });
        }
        _this.dtpicker.show(function (e) {
            var date = e.value;
            $("input[name='result.returnTime']").val(date);
        })
    };
}
var depositBitCoin = new DepositBitCoin();