var DepositScanCode = function () {
    var _this = this;
    this.checkAccount = function (obj, options) {//选择银行后触发
        $('#scan_Bank_List').find(".bank_list_i").removeClass("cur");
        $(obj).find(".bank_list_i").addClass("cur");
        var account = $(obj).find("input")[0];
        var min = $(account).attr("onlinePayMin") == "" ? "0.01" : $(account).attr("onlinePayMin");
        var max = $(account).attr("onlinePayMax") == "" ? "99999999" : $(account).attr("onlinePayMax");
        var siteCurrencySign = document.getElementById('siteCurrencySign').value;
        //根据所选账号设置隐藏元素
        document.getElementById('result.rechargeAmount').value = "";
        document.getElementById("onlinePayMax").value = $(account).attr("onlinePayMax");
        document.getElementById("onlinePayMin").value = $(account).attr("onlinePayMin");
        document.getElementById("account").value = $(account).attr("account");
        document.getElementById("result.payerBank").value = $(account).attr("payerBank");
        document.getElementById("depositChannel").value = $(account).attr("depositChannel");
        document.getElementById("rechargeType").value = $(account).attr("rechargeType");
        document.getElementById('result.rechargeAmount').setAttribute("placeholder", "" + siteCurrencySign + Number(min).toFixed(2) + "~" + siteCurrencySign + Number(max).toFixed(2));
        //处理随机金额
        var randomAmount = $(account).attr("randomAmount");
        if (randomAmount == "true") {
            $("input[name='result.randomCash']").val($('#randomValue').val());
            $("#random_amount").show();
        } else {
            $("input[name='result.randomCash']").val("");
            $("#random_amount").hide();
        }
        //设置按钮显示
        if ($("#depositChannel").val() == 'electronic') {
            $("#btn_electronicPay").show();
            $("#btn_scan").hide();
        } else {
            $("#btn_scan").show();
            $("#btn_electronicPay").hide();
        }
    };
}
var depositScanCode = new DepositScanCode();