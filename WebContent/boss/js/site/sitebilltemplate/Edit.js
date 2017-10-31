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
                    //minImageWidth: 600,
                    //minImageHeight: 350,
                    //maxImageWidth: 600,
                    //maxImageHeight: 350,
                    mainClass: "input-group",
                    removeLabel: window.top.message.common['floatPic.file.upload.remove'],
                    browseLabel: window.top.message.common['floatPic.file.upload.browse'] + '&hellip;',
                    allowedFileExtensions: ['xls','xlsx'],
                    msgInvalidFileExtension: window.top.message.common['floatPic.file.upload.msgInvalidFileExtension'],
                    msgValidationError: window.top.message.common['floatPic.file.upload.msgValidationError'],
                    msgSizeTooLarge: window.top.message.common['floatPic.file.upload.msgSizeTooLarge'],
                    msgImageWidthSmall: window.top.message.setting['myAccount.file.size.widthError'],
                    msgImageHeightSmall: window.top.message.setting['myAccount.file.size.heightError'],
                    msgImageWidthLarge: window.top.message.setting['myAccount.file.size.widthError'],
                    msgImageHeightLarge: window.top.message.setting['myAccount.file.size.heightError']
                }).bind("filecleared", function (e) {
                    e.fileInput.$container.prev().show();
                    page.resizeDialog();
                }).bind("fileloaded", function (e) {
                    e.fileInput.$container.prev().hide();
                    //e.fileInput.$container.next().val("hasUploaded");
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
            var id= $("[name='siteBillTemplateId']").val();
            var temp = $("[name='result.id']").val();
            var tempid;
            if(id !=null && id != "")
            {
                tempid = id;
            }else{
                tempid = temp;
            }
            e.objId = tempid;
            e.catePath = 'siteBillTemplate';
            this.setFileName(e.opt);
            var flag = this.uploadAllFiles(e, opt);
            if(!flag){
                return false;
            }
            if (!this.validateForm(e)) {
                return false;
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
        }
    });
});