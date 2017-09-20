/**
 * 资金管理-提现管理审核
 */
define(['common/BaseEditPage', 'bootstrapswitch'], function (BaseEditPage,Bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.resizeDialog();//自动弹窗iframe高度
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
            $("[name='active']").bootstrapSwitch()
                .on('switchChange.bootstrapSwitch',function( event , status ){
                    $("[name=active]").val(status);
            });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $("[name='paramValue']").on("input", function () {
                var valstring = this.value;
                if(valstring!=null&&valstring.length>0){
                    if(isNaN(valstring)){
                        var val = valstring.substring(0,valstring.length-1);
                        this.value = val;
                        return;
                    }
                    var intVal = parseFloat(valstring);
                    if(intVal<1){
                        this.value = 1;
                    }else if(intVal>100){
                        this.value = 100;
                    }
                    if(valstring.indexOf(".")>-1){
                        var len = valstring.substring(valstring.indexOf(".")+1);
                        if(len.length>2){
                            var val = valstring.substring(0,valstring.indexOf(".")+3);
                            this.value = val;
                            return;
                        }
                    }
                }
            });
        },
        //提交提醒
        submitRemind: function (e) {
            var this_ = this;
            var active = $("[name=active]").val();
            var paramValue = $("[name=paramValue]").val();
            window.top.topPage.ajax({
                type:"post",
                url:root+"/fund/withdraw/submitRemind.html",
                dataType:"json",
                data:{"result.active":active,"result.paramValue":paramValue},
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage(data.msg, function (result) {
                            window.top.topPage.closeDialog();
                            this_.query(e);
                        });
                    }
                },
                error: function (data) {

                }
            })
        }


    });
});