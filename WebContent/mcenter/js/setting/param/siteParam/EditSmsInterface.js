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

        getSmsInterfaceDateForm: function (e, opt) {
            var o = {};
            var a = $("input", "#smsInterface").serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return JSON.stringify(o);
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
            $("#smsInterfaceForm").empty();

            //数据库中的值
            var bossSmsStr = $('#bossSmsInterfaceMap').html();
            var siteSmsStr = $('#siteSmsInterfaceMap').html();
            var bossSmsMap = $.parseJSON(bossSmsStr);
            var siteSmsMap = $.parseJSON(siteSmsStr);
            var smsId = this.selectedSmsInterface();

            var columnExtJson = null;
            var valuesExtJson = null;
            if (smsId && bossSmsMap[smsId] && bossSmsMap[smsId]['extJson']) {
                columnExtJson = $.parseJSON(bossSmsMap[smsId]['extJson']);
            }
            if (columnExtJson && smsId && siteSmsMap[smsId] && siteSmsMap[smsId]['extJson']) {
                valuesExtJson = $.parseJSON(siteSmsMap[smsId]['extJson']);
            }

            var smsHtml = "";
            if (columnExtJson) {
                $.each(columnExtJson, function (key, value) {
                    value = valuesExtJson ? valuesExtJson[key] : "";
                    smsHtml = smsHtml + '<div class="clearfix m-b sms-column sms-signature">'
                        + '<div class="ft-bold pull-left line-hi34" style="width: 100px;text-align: right;">'
                        + window.top.message.setting_auto[key]
                        + '</div>'
                        + '<div class="col-xs-5">'
                        + '    <input type="text" name="' + key + '" maxlength="64" value="' + value + '" class="form-control">'
                        + '</div>'
                        + '</div>';
                });
            }
            $("#smsInterfaceForm").html(smsHtml);
            this.resizeDialog();
        },

        /**
         * 提交保存
         */
        saveSubmit: function()　{
            var extJson = this.getSmsInterfaceDateForm();
            var smsId = this.selectedSmsInterface();
            window.top.topPage.ajax({
                type:"POST",
                url: root+"/smsInterface/saveSmsInterface.html",
                data:{"sms.id":smsId,"sms.extJson":extJson},
                dataType:"json",
                error: function (request) {

                },
                success: function (data) {
                    window.top.topPage.closeDialog();
                }
            })
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