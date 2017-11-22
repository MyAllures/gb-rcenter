/**
 * Created by snekey on 15-8-10.
 */
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','validate'], function (BaseEditPage, fileinput) {
    return BaseEditPage.extend({
        uploadImage: null,
        oldContent:null,
        init: function () {
            this._super();
            var _this = this;
            //拿到id，通过id判断是否是编辑页面

            this.resizeDialog();
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            this.unInitFileInput($('#image_file_path')).fileinput({
                showUpload: false,
                maxFileCount: 1,
                maxFileSize: 1024,
                mainClass: "input-group",
                removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                allowedFileExtensions: ['png','jpg','jpeg','bmp','gif'],
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
            e.objId = $("[name='result.id']").val();
            e.catePath = 'CreditRecord';
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
        /**
         * 关闭页面前判断页面是否编辑过，有则提示
         * @param e
         * @param opt
         */
        close: function (e,opt) {
            var _this = this;
            var curContent = _this.getInputContent();
            if (curContent!=this.oldContent) {
                window.top.topPage.showConfirmMessage(window.top.message.content['logo.return.tips'], function (d) {
                    if (d == true) {
                        _this.closePage();
                        //_this.closePage();
                    } else {
                        $(e.currentTarget).unlock();
                    }
                });
            } else {
                this.closePage();
            }
        },
        mySaveCallbak:function (e, opt) {
           if(opt.data.state){
               this.closePage();
           } else{
               alert(1111);
           }
        }


    })
})
