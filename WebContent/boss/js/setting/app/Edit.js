/**
 * Created by jeff on 15-10-20.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();

        },
        bindEvent: function () {
            this._super();
            var that = this;
            this.copyText('a[name="copy"]');
            $('._changePasswordType').on("click",function(){
                var $this = $(this);
                var data = $this.data();
                $("input[name='changePassword']").val($this.val());
                $(data.hide).addClass('hide');
                $(data.show).removeClass('hide');
                that.resizeDialog();
            });
            $("[name=sysUserStatus]").on("click",function(){
                $("[name='sysUser.status']").val($(this).val());
            });
        },
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
            var _this = this;
            var success = $("#success").val();
            if(success=="false"){
                window.top.topPage.showWarningMessage($("#errMsg").val(), function () {
                    _this.closePage();
                });
            }
        },
        previewRole: function ( event , option ) {
            this.returnValue = 'role';
            this.closePage();
        },
        /**
         * 验证表单
         * @param e
         * @returns {boolean|*}
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        addAppresult : function (data) {
            if(data && data == 'true'){

            }
        },
        changeKey: function (e){
            var type = e.key;
            if ('ios' == type){
                   $(".appUrl").val('dsda3112.com/ios/');
            }else if ('android' == type){
                    $(".appUrl").val('/android/');
            }else {
                $(".appUrl").val('');
            }
        }
    });
});