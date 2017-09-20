/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
            this.resizeDialog();
        },
        bindEvent: function () {
            this._super();
            var _this=this;
            //主域名，层级全选，管理中心去不选
            $(this.formSelector).on("keyup","input[name='indexDomain']", function () {
                //线路域名没填或格式不对，提交按钮禁用
                _this.domainIdEnable();
            })
            $(this.formSelector).on("keyup","input[name='managerDomain']", function () {
                //线路域名没填或格式不对，提交按钮禁用
                _this.domainIdEnable();
            })
            $(this.formSelector).on("change","#isDefault", function () {
                $("input[name='result.isDefault']").val($("#isDefault").is(":checked"));
            });
        },
        onPageLoad: function () {
            this._super();
        },
        getValidateRule:function($form){
            var that = this;
            var rule = that._super($form);
            $form.validate(rule);
        },
        viewPrompt: function (e) {
            _this=this;
            $("#mainFrame").load(root + window.location.hash.slice(1));
            window.top.topPage.showSuccessMessage(window.top.message.content['sysdomain.success'], function () {
                _this.closePage();
            });
            //this.closePage();
        },
    });
});