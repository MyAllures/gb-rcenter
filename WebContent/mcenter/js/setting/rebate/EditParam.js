/**
 * Created by jeff on 15-9-17.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /*最多梯度*/
        maxGrads:5,
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var _this=this;
            $(".ratio",_this.formSelector).on("input",function (e) {
                var inputVal = $(this).val();
                if(inputVal!=null&&inputVal!=""&&inputVal!='undefinded'){
                    if(parseFloat(inputVal)>100){
                        return;
                    }
                    var topInput  = $($(this).parent().parent().parent()).find("._agent").find("input:eq(0)");
                    if(topInput){
                        var rt = 100-inputVal;
                        rt = rt.toFixed(2);
                        $(topInput).val(rt);
                    }
                    var otherInput  = $($(this).parent().parent().siblings()).find("input:eq(0)").val();
                    var add = parseFloat(otherInput) + parseFloat(inputVal);
                    if(add>100){
                        page.showPopover(e, {}, 'warning', window.top.message.player_auto['代理和总代分摊之和不能超过100!'], true);
                    }
                }
            })
        },
        onPageLoad: function () {
            this._super();
        },
        validateForm: function (e, opt) {
            var rakebackFee = $("#sysParam6").val();
            var favorableFee = $("#sysParam5").val();
            var otherFee = $("#sysParam7").val();
            window.top.topPage.ajax({
                url: root+'/rebateSet/checkFee.html?rakebackFee='+rakebackFee+'&favorableFee='+favorableFee+'&otherFee='+otherFee,
                dataType: "json",
                success: function (data) {
                    if (!data.state){
                        if (data.code == 1){
                            var obj = {currentTarget:$("#sysParam6")};
                            var msg = window.top.message.fund_auto['返水费用分摊比例不能超过100%'].replace('{0}', data.radio);
                            page.showPopover(obj, {}, 'success', msg, true);
                        }else if(data.code == 2){
                            var msg = window.top.message.fund_auto['优惠费用分摊比例不能超过100%'].replace('{0}', data.radio);
                            var obj = {currentTarget:$("#sysParam5")};
                            page.showPopover(obj, {}, 'success', msg, true);
                        }else if(data.code == 3){
                            var msg = window.top.message.fund_auto['其他费用分摊比例不能超过100%'].replace('{0}', data.radio);
                            var obj = {currentTarget:$("#sysParam7")};
                            page.showPopover(obj, {}, 'success', msg, true);
                        }
                        return false;
                    }
                    var $form = $(window.top.topPage.getCurrentForm(e));
                    if (!$form.valid || $form.valid()) {
                        window.top.topPage.doAjax(e, opt);
                    }
                },
                error: function (data) {
                    return false;
                }
            });
            $(e.currentTarget).unlock();
        }

    });
});