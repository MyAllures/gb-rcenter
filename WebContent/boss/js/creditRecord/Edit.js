define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','validate'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
        },
        bindEvent:function()
        {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.unInitFileInput($('#file_path')).fileinput({
                showUpload: false,
                maxFileCount: 1,
                maxFileSize: 1024,
                mainClass: "input-group",
                removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                allowedFileExtensions: ['png','jpg'],
                msgInvalidFileExtension: window.top.message.content['floatPic.file.upload.msgInvalidFileExtension'],
                msgValidationError: window.top.message.content['floatPic.file.upload.msgValidationError'],
                msgSizeTooLarge: window.top.message.content['floatPic.file.upload.msgSizeTooLarge'],
                msgImageWidthSmall: window.top.message.content['logo.file.size.widthError'],
                msgImageHeightSmall: window.top.message.content['logo.file.size.heightError'],
                msgImageWidthLarge: window.top.message.content['logo.file.size.widthError'],
                msgImageHeightLarge: window.top.message.content['logo.file.size.heightError']
            }).bind("filecleared", function (e) {
                e.fileInput.$container.prev().show();
                page.resizeDialog();
            }).bind("fileloaded", function (e) {
                e.fileInput.$container.prev().hide();
                e.fileInput.$container.parent().removeClass("error");
                page.resizeDialog();
            });
        },
        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            //$(e.currentTarget).lock();
            e.objId = $("#creditId").val();
            e.catePath = 'creditRecord';
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

            //$(e.currentTarget).unlock();

            return true;
        },
    });
});