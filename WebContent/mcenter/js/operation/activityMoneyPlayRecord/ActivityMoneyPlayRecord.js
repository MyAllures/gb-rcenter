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
　
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this=this;

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

                var  feeState=$("#box_fee").bootstrapSwitch("state");
                var  returnState=$("#box_return").bootstrapSwitch("state");
                $("#isFee").attr("disabled", !feeState);
                $("#isReturnFee").attr("disabled", !returnState);
                $("#isFee").val(feeState?true:'');
                $("#isReturnFee").val(returnState?true:'');
            });

            　


        },


    });
});