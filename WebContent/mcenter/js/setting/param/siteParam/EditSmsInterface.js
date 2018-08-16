define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            this.changeSmsInterface();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {

        },
        getSmsInterfaceDateForm:function (e,opt) {
            return $("input,textarea","#smsInterface").serialize();
        },
        validSmsInterface: function (e, opt) {
            var opt = {};
            var flag = this.validDataVal($("[name='sms.id']"),false,24,window.top.message.setting_auto['接口名称'],opt);
            if(flag){
                flag = this.validDataVal($("[name='sms.dataKey']"),false,120,window.top.message.setting_auto['接口密钥长度'],opt);
            }

            if(flag){
                return true;
            }
            return false;
        },
        validDataVal: function (obj, empty, len, title,opt) {
            var val = $(obj).val();
            var e = {};
            e.currentTarget = obj;
            if(!empty){
                if(!val){
                    page.showPopover(e, opt, 'danger', title + window.top.message.setting_auto['不能为空'], true);
                    $(obj).focus();
                    return false;
                }else{
                    if(val.length>len){
                        page.showPopover(e, opt, 'danger', title + window.top.message.setting_auto['长度不能超过'].replace("[0]",len), true);
                        $(obj).focus();
                        return false;
                    }
                }
            }else{
                if(val&&val.length>len){
                    page.showPopover(e, opt, 'danger', title + window.top.message.setting_auto['长度不能超过'].replace("[0]",len), true);
                    $(obj).focus();
                    return false;
                }
            }
            return true;
        },
        /**
         * 选择不同的短信接口，显示不同的输入框
         * @param e
         * @param opt
         * @returns {boolean}
         */
        changeSmsInterface: function () {
            //清空旧数据
            $("input[name^='sms']").not("input[name$='id']").val('');
            $("textarea[name='sms.dataKey']").val('');

            //数据库中的值
            var existedSmsInterfaceMapJsonStr = $('#existedSmsInterfaceMap').html();
            var json = $.parseJSON( existedSmsInterfaceMapJsonStr );

            //罗斯猫
            if (this.selectedSmsInterface() == '1'){
                // $("input").val("");
                $("input[name='sms.appId']").parent().parent().addClass("hide");
                $("input[name='sms.username']").parent().parent().removeClass("hide");
                $("input[name='sms.password']").parent().parent().removeClass("hide");

                //默认值
                $("input[name='sms.username']").val(json['1']['username']);
                $("input[name='sms.password']").val(json['1']['password']);
                $("textarea[name='sms.dataKey']").val(json['1']['dataKey']);
                $("input[name='sms.signature']").val(json['1']['signature']);
            }else if (this.selectedSmsInterface() == '2'){
                // $("input").val("");
                $("input[name='sms.appId']").parent().parent().removeClass("hide");
                $("input[name='sms.username']").parent().parent().addClass("hide");
                $("input[name='sms.password']").parent().parent().addClass("hide");

                //默认值
                $("input[name='sms.appId']").val(json['2']['appId']);
                $("textarea[name='sms.dataKey']").val(json['2']['dataKey']);
                $("input[name='sms.signature']").val(json['2']['signature']);
            }
            this.resizeDialog();

        },
        /**
         * 接口名称
         * @param e
         * @param opt
         * @returns {boolean}
         */
        selectedSmsInterface: function () {
            return $("input[name='sms.id']").val();
        }





    });
});