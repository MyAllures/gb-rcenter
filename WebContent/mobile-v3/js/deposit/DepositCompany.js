var DepositCompany = function () {
    var _this = this;
    var bankPick = null;
    this.checkAccount = function (obj, options) {//选择银行后触发
        $("#company_bank_list").find(".bank_list_i").removeClass("cur");
        $(obj).find(".bank_list_i").addClass("cur");
        var item = options;
        //选择银行账号
        var siteCurrencySign = $("#siteCurrencySign").val();
        document.getElementById('result.payerBank').value = item.bankCode;
        document.getElementById('account').value = item.accountId;
    };
    this.checkRechargeType = function () {
        if (!_this.bankPick) {
            _this.bankPick = new mui.PopPicker();
            _this.bankPick.setData([{"text":"柜员机现金存款","value":"atm_money"},{"text":"柜员机转账","value":"atm_recharge"},{"text":"银行柜台存款","value":"atm_counter"}]);
        }
        _this.bankPick.show(function (items) {
            $("#selectRecharge").val(items[0].text);
            document.getElementById("result.rechargeType").value = items[0].value;
        });
    }
}
var depositCompany = new DepositCompany();