$(function(){
});
/**选择日期组件*/
function selectionDate() {
    var format = dateFormat.dayminute;
    //设置开始时间选择器
    var dtpicker = new mui.DtPicker({
        "type": "datetime",
        "value": $("input[name='result.returnTime']").val(),
        beginDate: new Date($("input[name='result.returnTime']").attr("minDate")),
        labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日'], '时', '分']//设置默认标签区域提示语
    });

    dtpicker.show(function (e) {
        var date = e.value;
        $("input[name='result.returnTime']").val(date);
        dtpicker.dispose();
    })
}

/**公司入款提交存款后跳转至确认账号页面*/
function confirmationAccount(obj , payType , key){
    if (document.activeElement) {
        document.activeElement.blur();
    }
    var $form;
    var href = "";
    if(payType == "company"){
        $form = $("#companyCashForm");
        href = "/wallet/deposit/company/index.html?searchId=" + key ;
    }else if(payType == "electronicPay"){
        $form = $("#electronicCashForm");
        href = "/wallet/deposit/company/electronic/index.html?searchId=" + key ;
    }

    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }
    var options = {
        statusNum : 1 ,
        form : $form ,
        href : href
    };
    seachDiscount(obj , options);
}

/**选择存款类型*/
function showPayTypeList() {
    //存款类型
    var typePick = new mui.PopPicker();
    var typeList = document.getElementById('rechargeTypeJson').value;
    typePick.setData(JSON.parse(typeList));
    typePick.show(function (items) {
        var value = items[0].value;
        document.getElementById('result.rechargeType').value = value;
        document.getElementById("rechargeTypeText").setAttribute("placeholder" , items[0].text);
        //柜台现金存款需填写交易地点，其他填写存款人
        if (value == 'atm_money') {
            document.getElementById('address').style.display="block";
            document.getElementById('payerName').style.display="none";
        } else {
            document.getElementById('address').style.display="none";
            document.getElementById('payerName').style.display="block";
        }

    });


}

/**比特币支付 获取存款优惠*/
function depositDiscount(obj , options){
    var $form = $("#bitcoinForm");
    if (document.activeElement) {
        document.activeElement.blur();
    }
    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }
    var ajaxoptions = {
        url : root + "/wallet/deposit/company/bitcoin/getSales.html",
        data : $form.serialize(),
        type : "POST",
        dataType : "json",
        success: function (data) {
            if (data && data.length > 0) {
                var html =
                    '<div class="gb-withdraw-box pro-window" style="display:block">' +
                    '<div class="cont"><h3>' + window.top.message.deposit_auto['优惠'] + '</h3><div class="cont-text"></div>' +
                    '<div class="text-pro"><p></p><ul><li><div class="text-warp">' +
                    '<span>' + window.top.message.deposit_auto['不参与优惠'] + '</span><input name="activityId" type="radio" value="" checked="checked/"></div></li>';
                for (var i = 0; i < data.length; i++) {
                    var sale = data[i];
                    html = html + '<li><div class="text-warp"><span>' + sale.activityName + '</span>' +
                        '<input name="activityId" type="radio" value="' + sale.id + '"></div></li>';
                }
                html = html + '</ul></div><div class="pro-btn"><a class="next-btn" data-rel={"opType":"function","target":"submitDeposit"}>' + window.top.message.deposit_auto['已存款'] + '</a>' +
                    '<a class="agin-btn" data-rel={"opType":"function","target":"closeProWindow"}>' + window.top.message.deposit_auto['重新填写'] + '</a></div>' +
                    '<div class="close" data-rel={"opType":"function","target":"closeProWindow"}></div></div></div>';
                $("boby").append(html);
                $("#successMasker").attr("style","display: block;");

            } else { //无优惠
                companyDepositSubmit($("input[name='depositChannel']").val());
            }
        },
        error : function(){
            toast(window.top.message.deposit_auto['网络繁忙']);
        }
    };
    muiAjax(ajaxoptions);
}

/**查询是否有优惠*/
function seachDiscount(obj , options) {
    var depositChannel = $("input[name='depositChannel']").val();
    var url = "";
    var $form ;
    if(depositChannel == "company"){
        url = "/wallet/deposit/company/submit.html";
        $form = $("#confirmCompanyForm");
    }else if(depositChannel == "electronic"){
        url = "/wallet/deposit/company/electronic/submit.html";
        $form = $("#electronicForm");
    }
    if(options.statusNum){
        $form = options.form;
    }
    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }

   var ajaxoptions = {
        url : root + url,
        data : $form.serialize(),
        type : "POST",
        dataType : "text/html",
        success:function(data){
            if(data){
                if ($("#depositSalePop").length > 0) {
                    $("#depositSalePop").remove();
                }
                $("body").append(data);
                var unCheckSuccess = $("#unCheckSuccess").attr("unCheckSuccess");
                if (unCheckSuccess === "true") {
                    var pop = $("#pop").attr("pop");
                    if (pop === "true") {
                        $("#activityId").val($("input[type=radio]:checked").val());
                        $("#successMasker").attr("style","display:block;");
                    }else if(options.statusNum){
                        var rechargeAmount = $("input[name='result.rechargeAmount']").val();
                        goToUrl(options.href + "&depositCash="+rechargeAmount);
                    }else{
                        companyDepositSubmit(depositChannel);
                    }
                } else {
                    //验证提示
                    toast($("#tips").attr("tips"));
                }
            }
        },
       error : function(){
           toast(window.top.message.deposit_auto['网络繁忙']);
       }
    };
    muiAjax(ajaxoptions);
}

/**公司入款提交存款*/
function companyDepositSubmit(depositChannel){
    var url = "" ;
    var $form ;
    if(depositChannel == "electronic"){
        url = "/wallet/deposit/company/electronic/deposit.html";
        $form = $("#electronicForm");
    }else if(depositChannel == "company"){
        url = "/wallet/deposit/company/deposit.html";
        $form = $("#confirmCompanyForm");
    }else if (depositChannel == "bitcoin") {
        url = "/wallet/deposit/company/bitcoin/deposit.html";
        $form = $("#bitcoinForm");
    }
    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }

    var optiolns = {
        url : root + url,
        data : $form.serialize(),
        dataType: 'json',
        type: 'post',
        async: false,
        success: function (data) {
            if (data.state) {
                $("#successMasker , .window-ok").attr("style","display: block;");
            } else {
                toast(data.msg);
                $("input[name='gb.token']").val(data.token);
            }
        },
        error: function () {
            toast(window.top.message.deposit_auto['提交失败']);
        }
    };
    muiAjax(optiolns);
}
