/**
 * Created by eagle on 16-2-18.
 */
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput'], function (BaseEditPage,fileinput) {
    return BaseEditPage.extend({

        init:function() {
            this._super();
        },

        bindEvent:function() {
            this._super();
        },

        onPageLoad: function () {

            /**
             * 上传组件初始化
             */
            this._super();
            var _this = this;

            _this.unInitFileInput($('.file'))
                .fileinput({
                    showUpload: false,
                    maxFileCount: 1,
                    maxFileSize: 1024,
                    //minImageWidth: 630,
                    //minImageHeight: 350,
                    //maxImageWidth: 630,
                    //maxImageHeight: 350,
                    //mainClass: "input-group",
                    removeLabel: "删除",
                    browseLabel: "浏览" + '&hellip;',
                    allowedFileExtensions: ['png'],
                    msgInvalidFileExtension: "仅支持'{extensions}'等类型的图片",
                    msgValidationError: "图片上传失败",
                    msgSizeTooLarge: "您上传的图片大于1M，无法上传，请重新选择.",
                }).bind("filecleared", function (e) {
                    e.fileInput.$container.prev().show();
                    e.fileInput.$container.next().val(e.fileInput.$container.next().next().val());
                    e.fileInput.$container.parent().next().children().attr("src","");
                    //e.fileInput.$container.parent().addClass("error");
                    page.resizeDialog();
                }).bind("fileloaded", function (e) {
                    e.fileInput.$container.prev().hide();
                    e.fileInput.$container.parent().removeClass("error");
                    page.resizeDialog();
                }).bind("fileerror",function(e) {
                    page.resizeDialog();
                });
            /**
             * 预览图片副本
             */
            /*$.each($(".file"),function(index,item){
                window.top.topPage.initFileWithPreview(item,$("#aa_"+index),{
                    maxFileSize:1024,
                    allowedFileExtensions:['.jpg', '.jpeg','.png', '.gif']
                });
            });*/
        },


        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            e.objId = $("#sportTeamId").val();
            e.catePath = 'sportTeam';
            $(e.currentTarget).unlock();
            return this.uploadAllFiles(e, opt);
        },

        myValidateForm:function(e,opt){
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            e.objId = $("#sportTeamId").val();
            e.catePath = 'sportTeam';
            $(e.currentTarget).unlock();
            var flag =  this.uploadAllFiles(e, opt);
            if (flag&&!this.validateForm(e)) {
                return false;
            }

            return true;

        },

        mySaveCallback:function(e,opt) {
            this.returnValue = true;
            //e.page.query(e, opt);
            window.top.topPage.showPage();
            window.top.topPage.closeDialog();
        }


    });
});