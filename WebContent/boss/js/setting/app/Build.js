/**
 * Created by fei on 17-10-31.
 */
/**
 * Created by jeff on 15-10-20.
 */
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput'], function (BaseEditPage,fileinput) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            this.unInitFileInput($('#appLogo')).fileinput({
                showUpload: false,
                maxFileCount: 1,
                maxFileSize: 2048,
                mainClass: "input-group",
                removeLabel: '删除',
                browseLabel: '浏览' + '&hellip;',
                allowedFileExtensions: ['zip', 'rar'],
                msgInvalidFileExtension: '仅支持"{extensions}"等类型的文件',
                msgValidationError: '文件上传失败',
                msgSizeTooLarge: '您上传的图片大于2M，无法上传，请重新选择.'
            }).bind("filecleared", function (e) {
                e.fileInput.$container.prev().show();
                page.resizeDialog();
            }).bind("fileloaded", function (e) {
                e.fileInput.$container.prev().hide();
                e.fileInput.$container.parent().removeClass("error");
                page.resizeDialog();
            });

            $(".delete-img-btn").click(function () {
                $(this).parent().parent().parent().find(".logo-path").val("");
                $($(this).parent()).remove();
                _this.resizeDialog();
            });
        },
        onPageLoad: function () {
            this._super();
        },
        uploadFile: function (e, opt) {
            e.objId = 0;
            e.catePath = 'appLogo';
            var flag = this.uploadAllFiles(e, opt);
            if(!flag){
                return false;
            }
            if (!this.validateForm(e)) {
                return false;
            }
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            return true;
        },
    })
});
