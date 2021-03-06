//模板页面
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput'], function(BaseEditPage,fileinput) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var timing=$("#is_task").val();
            if(timing=="true"){
                $(".i-checks").click();
            }
            this.unInitFileInput($('.file'))
                .fileinput({
                    showUpload: false,
                    maxFileCount: 1,
                    maxFileSize: 1024,
                    mainClass: "input-group",
                    removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                    browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                    msgInvalidFileExtension: window.top.message.content['floatPic.file.upload.msgInvalidFileExtension'],
                    msgValidationError: window.top.message.content['floatPic.file.upload.msgValidationError'],
                    msgSizeTooLarge: window.top.message.content['floatPic.file.upload.msgSizeTooLarge'],
                    msgImageWidthSmall: window.top.message.setting['myAccount.file.size.widthError'],
                    msgImageHeightSmall: window.top.message.setting['myAccount.file.size.heightError'],
                    msgImageWidthLarge: window.top.message.setting['myAccount.file.size.widthError'],
                    msgImageHeightLarge: window.top.message.setting['myAccount.file.size.heightError']
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
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    $(".a_"+attr).formtip(message);
                    $(".a_"+attr).click();
                    e.result=true;
                }
                else{
                    e.result=false;
                }
            });
        },
        /**
         * 文件上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            var id= $("[name='paramId']").val();
            var paramCode = $("#paramCode").val();
            e.objId = id;
            e.catePath = paramCode;
            this.setFileName(e.opt);
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
            var fileName = $('.file-caption-name').attr("title");
            if (!fileName){
                page.showPopover(e,{},"warning",window.top.message.setting_auto['请选择上传文件'],true);
                return false;
            }else {
                var paramValue = $("[name='result.paramValue']").val();
                if (!paramValue){
                    page.showPopover(e,{},"warning",window.top.message.setting_auto['上传失败，请重选选择'],true);
                    return false;
                }
            }
            return flag;
        },
        /**
         * 设置文件名
         * @param e
         * @param opt
         * @returns {boolean}
         */
        setFileName:function(e,opt){
            var _this = this;
            var files = $("input[type=file]", _this.formSelector);
            for (var index = 0; index < files.length; index++) {
                var $file = $(files[index]);
                var $hid = $("input[type=hidden][name='result.fileName']", _this.formSelector);
                if (files[index].files.length == 0) {
                    continue;
                }
                if ($hid.attr("fileName") == files[index].files[0].name) {
                    continue;
                }
                var formData = new FormData();
                formData.append($file.attr("target"), files[index].files[0]);
                $hid.attr("fileName", files[index].files[0].name);
                $hid.val(files[index].files[0].name);
            }
        },
        /**
         * 保存上传图片
         * @param e
         * @param opt
         */
        saveParam:function (e,opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/param/saveChessSharePicture.html",
                type: "POST",
                dataType: "JSON",
                data:_this.getCurrentFormData(e),
                success: function (data) {
                    if (data){
                        e.page.showPopover(e,{},"success",window.top.message.common['save.success'],true);
                        e.returnValue = true;
                        setTimeout(function () {
                            window.top.topPage.closeDialog();
                        }, 1000);
                    }else {
                        e.page.showPopover(e,{},"warning",window.top.message.common['save.failed'],true);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
    });
});