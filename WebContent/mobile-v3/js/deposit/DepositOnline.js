var DepositOnline = function () {
    var _this = this;
    var bankPick = null;
    this.showBankList = function () {//显示银行列表
        if (!_this.bankPick) {
            _this.initOnlineBankList();
        }
        _this.bankPick.show(function (items) {
            var item = items[0];
            _this.checkAccount(null, null, item);
        });
    };
    this.initOnlineBankList = function () {//初始化银行选择组件
        var bankList = document.getElementById('bankJson').value;
        var data = JSON.parse(bankList);
        _this.bankPick = new mui.PopPicker();
        _this.bankPick.setData(data);
    };
    this.checkAccount = function (obj, options, item) {//选择银行后触发
        //选择银行账号
        var min = isNaN(item.min) ? 0.01 : item.min;
        var max = isNaN(item.max) ? 99999999 : item.max;
        var siteCurrencySign = $("#siteCurrencySign").val();
        document.getElementById('result.payerBank').value = item.value;
        document.getElementById('selectBank').value = item.text;
        document.getElementById('onlinePayMin').value = min;
        document.getElementById('onlinePayMax').value = max;
        document.getElementById('account').value = item.account;
        document.getElementById('result.rechargeAmount').setAttribute("placeholder", "" + siteCurrencySign + Number(min).toFixed(2) + "~" + siteCurrencySign + Number(max).toFixed(2));
    };
    this.nextStep = function (obj, options) {
        baseDeposit.activity();
    };
}
var depositOnline = new DepositOnline();