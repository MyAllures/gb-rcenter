define(['gb/common/BaseEditPage', 'bootstrap-dialog','bootstrapswitch'], function(BaseEditPage,BootstrapDialog,Bootstrapswitch) {
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

            //复选框
            //switch
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function(event, state) {
                    var _target = event.currentTarget;
                    var isFee=$(_target).attr("tt");
                    var tname = $(this).attr("tt");
                    $("#"+tname).val(state);
                    //点击fee按钮时处理相关控件的可用不可用状态
                    _this.dealwithComponents($(this), isFee,state);
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

        /**
         * 点击fee按钮时处理相关控件的可用不可用状态
         * @param feeBtn 被点击按钮本身
         * @param isFee  被点击按钮名字
         * @param state  被点击按钮状态
         */
        dealwithComponents:function(feeBtn,isFee,state){
            feeBtn.parent().parent().parent().parent().nextAll().each(function(){
                var obj = $(this).find("input");
                if(obj!=null){
                    obj.attr("disabled",!state);
                    if(state){
                        if(isFee=='isFee'){
                            //$('.bootstrap-switch-id-box_return').bootstrapSwitch('indeterminate',false);;//关闭相对的按钮
                            $(".div1").addClass("cur");
                            $(".div2").removeClass("cur");
                            $("#box_return").attr("checked",false);
                            $(".maxFee").attr("disabled",state);
                            if($("#maxFee").val()>0){
                                $(".maxFeeRadio").attr("disabled",false);
                                var val=$("input[name='radio_feeType']:checked").val();
                                $(".maxFee"+val).attr("disabled",false);
                            }
                        }else if(isFee=='isReturnFee'){
                            //$('.bootstrap-switch-id-box_fee').bootstrapSwitch('indeterminate',false);//关闭相对的按钮
                            $(".div2").addClass("cur");
                            $(".div1").removeClass("cur");
                            $("#box_fee").attr("checked",false);
                            $(".fee_txt").attr("disabled",state);
                            if($("#maxReturnFee").val()>0){
                                $(".returnTypeRadio").attr("disabled",false);
                                var val=$("input[name='radio_returnType']:checked").val();
                                $(".fee"+val).attr("disabled",false);
                            }
                        }
                    }else{
                        if(isFee=='isFee'){
                            $(".div1").removeClass("cur");
                            $("input[name='result.feeTime']").val("");
                            $("input[name='result.freeCount']").val("");
                            $("input[name='result.maxFee']").val("");
                            $("input[name=percentageAmount]").val("");
                            $("input[name=fixedAmount]").val("");
                            $("#editForm").validate().resetForm();
                            //$(".feeStatus").val("");
                        }else if(isFee=='isReturnFee'){
                            $(".div2").removeClass("cur");
                            $("input[name='result.reachMoney']").val("");
                            $("input[name='result.maxReturnFee']").val("");
                            $("input[name='result.returnTime']").val("");
                            $("input[name='result.returnFeeCount']").val("");
                            $("input[name=returnPercentageAmount]").val("");
                            $("input[name=returnFixedAmount]").val("");
                            $("#editForm").validate().resetForm();
                        }
                    }
                }
            })

        },


        myValidateForm:function(e,option){
            if (!this.validateForm(e)) {
                return;
            }

            var isFee = $("#box_fee").bootstrapSwitch("state");
            var  isReturn=$("#box_return").bootstrapSwitch("state");
            //不能同时为true
            if ((isFee && isReturn)) {
                var _msg = window.top.message.player_auto['收取返还不能同时启用'];
                window.top.topPage.showErrorMessage(_msg);
                return;
            }


            var feeTime = $("#feeTime").val();
            var freeCount = $("#freeCount").val();
            //开关停用的要把相关输入框清空

            if((feeTime==''||freeCount=='') && (isFee=='true' || isFee)){
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
            $("#tot").attr('href','/rechargeFeeSchema/list.html');
            $("#tot").click();
        }
    });
});