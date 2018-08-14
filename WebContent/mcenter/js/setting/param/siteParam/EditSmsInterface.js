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
            //选将所有短信接口字段隐藏
            $(".sms-column").hide();

            //数据库中的值
            var bossSmsInterfaceStr = $('#bossSmsInterfaceMap').html();
            var json = $.parseJSON(bossSmsInterfaceStr);
            var smsId = this.selectedSmsInterface();

            var columnStr = json[smsId]['extJson'];
            var columnMap = $.parseJSON(columnStr);
            if (columnMap['sms.appId'] != null) {
                $(".sms-appId").show();
                $("input[name='sms.appId']").val(json[smsId]['appId']);
            }
            if (columnMap['sms.username'] != null) {
                $(".sms-username").show();
                $("input[name='sms.username']").val(json[smsId]['username']);
            }
            if (columnMap['sms.password'] != null) {
                $(".sms-password").show();
                $("input[name='sms.password']").val(json[smsId]['password']);
            }
            if (columnMap['sms.dataKey'] != null) {
                $(".sms-dataKey").show();
                $("textarea[name='sms.dataKey']").val(json[smsId]['dataKey']);
            }
            if (columnMap['sms.signature'] != null) {
                $(".sms-signature").show();
                $("input[name='sms.signature']").val(json[smsId]['signature']);
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