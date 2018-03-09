define(['gb/common/BaseListPage', 'bootstrap-dialog','bootstrapswitch'], function(BaseEditPage,BootstrapDialog,Bootstrapswitch) {
    var _this;
    return BaseEditPage.extend({
        bootstrapDialog: BootstrapDialog,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            _this = this;
            var isFee=$("#isFee").val();
            var isReturnFee = $("#isReturnFee").val();
            if(isFee!=''){
                if(isFee=='true'){
                    $(".div1").click();
                }else{
                    if(isReturnFee==''){
                        $(".div1").click();
                    }else{
                        if(isReturnFee=='true'){
                            $(".div2").click();
                        }else{
                            $(".div1").click();
                        }
                    }
                }
            }else{
                $(".div2").click();
            }

            //固定，比例
            var returnType=$("#returnType").val();
            if(returnType!='2'){
                $("input[name='radio_returnType'][value='1']").click();
            }

            var feeType=$("#feeType").val();
            if(feeType!='2'){
                $("input[name='radio_feeType'][value='1']").click();
            }
            var isFee=$("#isFee").val();
            if(isFee!='true'){
                $(".feeStatus").attr("disabled","disabled");
            }
            //返还
            var isReturnFee=$("#isReturnFee").val();
            if(isReturnFee!='true'){
                $(".returnFeeStatus").attr("disabled","disabled");
            }
            //玩家上限金额为填时，比例和固定禁用
            var maxReturnFee=$("input[name='result.maxFee']").val();
            if(maxReturnFee<1){
                $(".maxFee").attr("disabled",true);
            }
            //返还上限金额为填时，比例和固定禁用
            var maxReturnFee=$("input[name='result.maxReturnFee']").val();
            if(maxReturnFee<1){
                $(".fee_txt").attr("disabled",true);
            }
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this=this;
            //玩家上限金额为填时，比例和固定禁用
            $(this.formSelector).on("keyup","input[name='result.maxFee']", function () {
                $(".maxFee").attr("disabled",true);
                if($(this).val()>0){
                    $(".maxFeeRadio").attr("disabled",false);
                    var val=$("input[name='radio_feeType']:checked").val();
                    $(".maxFee"+val).attr("disabled",false);
                }
            });
            //返还上限金额为填时，比例和固定禁用
            $(this.formSelector).on("keyup","input[name='result.maxReturnFee']", function () {
                $(".fee_txt").attr("disabled",true);
                if($(this).val()>0){
                    $(".returnTypeRadio").attr("disabled",false);
                    var val=$("input[name='radio_returnType']:checked").val();
                    $(".fee"+val).attr("disabled",false);
                }
            });
            $('input[type="radio"]').click(function(){
                var tname = $(this).attr("tt");
                var ff = $(this).attr("ff");
                var val = $(this).val();
                $("#"+tname).val(val);
                $(this).parent().next().attr("disabled",false);
                $("#"+ff).val("");
                $("#"+ff).attr("disabled",true);
                $("#"+ff).removeClass("error").addClass("valid");
            });
            $('.divSelect').click(function(){
                $('.divSelect').removeClass("cur");
                $(this).addClass("cur")
                $('.divSelect').find("i").removeClass("fa fa-check-square-o m-r-sm")
                $(this).find("i").addClass("fa fa-check-square-o m-r-sm")
                var tname = $(this).attr("tt");
                var ff = $(this).attr("ff");
                $(".div_css").hide();
                $("#div_"+tname).show();
                //$("#box_"+ff).bootstrapSwitch("state", false);
                var attr = $("#box_" + ff).attr("tt");
                $("#"+attr).val("");
                $("#first_div_"+ff).find("input").attr("disabled",true);


                var attr = $("#box_" + tname).attr("tt");
                if($("#"+attr).val()==""){
                    $("#"+attr).val(false);
                }else{
                    if($("#"+attr).val()=="true"){
                        $("#first_div_"+ff).find("input").attr("disabled",false);
                    }

                }
                //手续费开关（控制input知否启用）
                var  state=$("#box_"+ff).bootstrapSwitch("state");
                if (state) { //开
                    $("#first_div_"+ff).find("input").attr("disabled", false);
                } else { //关
                    $("#first_div_"+ff).find("input").attr("disabled", true);
                }

                //$("#box_"+tname).bootstrapSwitch("state", $("#"+attr).val());
                //$("#first_div_"+tname).find("input").attr("disabled",false);
                var type = $("#" + tname + "Type").val();//1比例 2固定
                if(type==1){
                    $("#"+tname+"FixedAmount").attr("disabled",true);
                }else{
                    $("#"+tname+"PercentageAmount").attr("disabled",true);
                }
                var dd=$(this).attr("dd");
                $("#"+dd).val("");

                //把开关状态赋值到input
                var  feeState=$("#box_fee").bootstrapSwitch("state");
                var  returnState=$("#box_return").bootstrapSwitch("state");
                $("#isFee").attr("disabled", !feeState);
                $("#isReturnFee").attr("disabled", !returnState);
                $("#isFee").val(feeState?true:'');
                $("#isReturnFee").val(returnState?true:'');
            });

            //复选框
            //switch
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function(event, state) {
                    var _target = event.currentTarget;
                    var isFee=$(_target).attr("tt");
                    var tname = $(this).attr("tt");
                    $("#"+tname).val(state);
                    $(this).parent().parent().parent().parent().nextAll().each(function(){
                        var obj = $(this).find("input");
                        if(obj!=null){
                            obj.attr("disabled",!state);
                            if(state){
                                if(isFee=='isFee'){
                                    $("#box_return").attr("checked",false);
                                    $("#box_return").bootstrapSwitch("state",false);
                                    $("#isReturnFee").val('');
                                    $(".maxFee").attr("disabled",state);
                                    if($("#maxFee").val()>0){
                                        $(".maxFeeRadio").attr("disabled",false);
                                        var val=$("input[name='radio_feeType']:checked").val();
                                        $(".maxFee"+val).attr("disabled",false);
                                    }
                                }else if(isFee=='isReturnFee'){
                                    $("#box_fee").attr("checked",false);
                                    $("#box_fee").bootstrapSwitch("state",false);
                                    $("#isFee").val('');
                                    $(".fee_txt").attr("disabled",state);
                                    if($("#maxReturnFee").val()>0){
                                        $(".returnTypeRadio").attr("disabled",false);
                                        var val=$("input[name='radio_returnType']:checked").val();
                                        $(".fee"+val).attr("disabled",false);
                                    }
                                }
                            }else{
                                if(isFee=='isFee'){
                                    $("#box_return").attr("checked",true);
                                    $("#box_return").bootstrapSwitch("state",true);
                                    $("#isReturnFee").val(true);
                                    $("input[name='result.feeTime']").val("");
                                    $("input[name='result.freeCount']").val("");
                                    $("input[name='result.maxFee']").val("");
                                    $("input[name=percentageAmount]").val("");
                                    $("input[name=fixedAmount]").val("");
                                    $("#editForm").validate().resetForm();
                                    //$(".feeStatus").val("");
                                }else if(isFee=='isReturnFee'){
                                    $("#box_fee").attr("checked",true);
                                    $("#box_fee").bootstrapSwitch("state",true);
                                    $("#isFee").val(true);
                                    $("input[name='result.reachMoney']").val("");
                                    $("input[name='result.maxReturnFee']").val("");
                                    $("input[name='result.returnTime']").val("");
                                    $("input[name='result.returnFeeCount']").val("");
                                    $("input[name=returnPercentageAmount]").val("");
                                    $("input[name=returnFixedAmount]").val("");
                                    $("#editForm").validate().resetForm();
                                    //$(".returnFeeStatus").val("");
                                }
                            }
                        }
                    })

                });
            $("#maxFee").on("keyup change",function(){
                var val = $(this).val();
                $("#span_maxFee").html("&nbsp;≤"+val);
            })
            $("#maxReturnFee").on("keyup change",function(){
                var val = $(this).val();
                $("#span_maxReturnFee").html("&nbsp;≤"+val);
            })

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    if(attr){
                        $("."+attr).formtip(message);
                        e.result=true;
                    }
                }
                else{
                    e.result=false;
                }
            });
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },

        myValidateForm:function(e,option){
            if (!this.validateForm(e)) {
                return;
            }

            var isFee = $("#box_fee").bootstrapSwitch("state");
            var  isReturn=$("#box_return").bootstrapSwitch("state");
            //不能同时为true或者false
            if ((isFee && isReturn) || (!(isFee || isReturn))) {
                var _msg = window.top.message.player_auto['收取返还不能同时启用或者同时禁用'];
                window.top.topPage.showErrorMessage(_msg);
                return;
            }


            var feeTime = $("#feeTime").val();
            var freeCount = $("#freeCount").val();
            //开关停用的要把相关输入框清空

            if((feeTime==''||freeCount=='') && isFee=='true'){
                var _msg = window.top.message.player_auto['你还未设置时限'];
                window.top.topPage.showConfirmDynamic(window.top.message.player_auto['消息'],_msg,window.top.message.player_auto['继续提交'],window.top.message.player_auto['返回设置'], function (confirm) {
                    if(confirm){
                        $(":disabled").removeAttr("disabled");
                        window.top.topPage.doAjax(e, option);
                    }
                });
            }else{
                $(":disabled").removeAttr("disabled");
                return true;

            }
        },
        /**
         * 跳转到列表页
         */
        saveCallbak:function(){
            $("#tot").attr('href','/vPlayerRankStatistics/list.html');
            $("#tot").click();
        },
        /**
         * 跳转到提现限制页面
         */
        toRecharge:function(){
            var rankId = $("#rankId").val();
            $("#tot").attr('href','/playerRank/withdrawLimit.html?search.id='+rankId);
            $("#tot").click();
        }

    });
});