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
        validateForm: function (e) {
            var a6 = $("#sysParam6").val();
            var a2 = $("#sysParam2").val();
            var a5 = $("#sysParam5").val();
            var a3 = $("#sysParam3").val();
            var a7 = $("#sysParam7").val();
            var a4 = $("#sysParam4").val();
            var r1 = parseFloat(a6) + parseFloat(a2);
            var r2 = parseFloat(a5) + parseFloat(a3);
            var r3 = parseFloat(a7) + parseFloat(a4);
            var b = true;
            if(r1>100 || r2>100 || r3>100){
                b=false
            }
            if(!b){
                page.showPopover(e, {}, 'warning', window.top.message.player_auto['代理和总代分摊之和不能超过100!'], true);
                return false;
            }
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }

    });
});