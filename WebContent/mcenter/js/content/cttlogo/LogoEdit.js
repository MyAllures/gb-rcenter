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
            var id = $("[name='result.id']").val();
            if (id != "") {
                //查询上一级页面的该条数据的状态
                var logoStatus = $("#" + id, window.parent.document).children().text();
                //把查到的状态放到编辑页面的时间栏边上
                $("#status").text(logoStatus);
            }
            this.initMustInput();

            this.oldContent = this.getInputContent();
            this.resizeDialog();
        },
        getInputContent: function () {
            var content = "";
            $('input').each(function (idx, item) {
                content += $(item).val();
            });
            return content;
        },
        bindEvent: function () {
            this._super();
            var _this = this;

            $("body").click(function () {
                _this.initMustInput();
            });
            this.unInitFileInput($('#image_file_path')).fileinput({
                showUpload: false,
                maxFileCount: 1,
                maxFileSize: 1024,
                mainClass: "input-group",
                removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                allowedFileExtensions: ['png'],
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
            this.unInitFileInput($('#flash_file_path')).fileinput({
                showUpload: false,
                maxFileCount: 1,
                maxFileSize: 1024,
                mainClass: "input-group",
                removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                allowedFileExtensions: ['swf'],
                msgInvalidFileExtension: window.top.message.content['floatPic.file.upload.msgInvalidFileExtension'],
                msgValidationError: window.top.message.content['floatPic.file.upload.msgValidationError'],
                msgSizeTooLarge: window.top.message.content['floatPic.file.upload.msgSizeTooLarge'],
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

        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            //$(e.currentTarget).lock();
            e.objId = $("#logoId").val();
            e.catePath = 'Logo';
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
         * 表单验证以及保存图片路径
         * @param e
         * @param opt
         * @returns {boolean}
         */
        valiDateFormAndUploadFile: function (e, opt) {
            this.uploadFile(e,opt);
            /*if (!this.validateForm(e)) {
                return false;
            }
            e.objId = 1;
            e.catePath = 'Logo';

            $(e.currentTarget).unlock();
            return this.uploadAllFiles(e, opt);*/
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
        /**
         * 隐藏预览图
         * @param e
         * @param p
         */
        deletePicture: function (e, p) {
            $("input[name='result.path']").val('');
            $('#picUrl').attr("src","");
            $(e.currentTarget).unlock();

        },
        initMustInput: function () {
            var input = true;
            var name = $("[name='result.name']").val();
            var file = $("#image_file_path").val();
            var path = $("[name='result.path']").val();
            var startTimeEndTime = $("[name='startTimeEndTime']").val();
            if(name==""||startTimeEndTime==""||startTimeEndTime==" - "||(file==""&&path=="")){
                input = false;
            }
            if(!input){
                $(".ok-btn").addClass("disabled");
            }else{
                $(".ok-btn").removeClass("disabled");
            }


        }


    })
})
