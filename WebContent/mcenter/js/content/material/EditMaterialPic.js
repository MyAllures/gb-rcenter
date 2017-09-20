define(['common/BaseEditPage','jqFileInput','site/content/carousel/UploadImage','css!themesCss/fileinput/fileinput'], function (BaseEditPage,UploadImage,fileinput) {

    return BaseEditPage.extend({

        $langLenth:$("#langLen").val()||$("#maxLang").val(),
        init : function() {
            this.formSelector = "form";
            this._super();
        },

        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
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
                //e.fileInput.$container.next().val("hasUploaded");
                e.fileInput.$container.parent().removeClass("error");
                page.resizeDialog();
            });
        },

        bindEvent : function() {
            var _this = this;
            this._super();

            for(var i=0;i<_this.$langLenth;i++) {
                window.top.topPage.initFileWithPreview($("#picFile"+i)[0], $("[name='picPicImg"+i+"']")[0],{
                    /*maxImageWidth:200,
                     maxImageHeight:190,
                     minImageWidth:200,
                     minImageHeight:190,*/
                    maxFileSize:1024,
                    msgSizeTooLarge: window.top.message.content['您上传的图片大于1M'],
                    allowedFileExtensions:[".png",".jpg",".jpeg",".gif",".PNG",".JPG",".JPEG",".GIF"]});
            }

            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".ann").hide();
                $(".content"+local).show();
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceContent=$(".picTitleVal"+sourceLocal).val().trim();
                var targetLocal=$(".current").attr("local");
                $(".picTitleVal"+targetLocal).val(sourceContent);

                var picPath = $(".picPicVal"+sourceLocal).val();
                $(".picPicVal"+targetLocal).val(picPath);
                var picPicImg = $("#picPicImg"+sourceLocal).attr("src");
                $("#picPicImg"+targetLocal).attr("src",picPicImg);
                page.resizeDialog();
            });

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", ".title,.materialPic", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("lang");
                    $(".a_"+attr).formtip(message);
                    e.result=true;
                }
                else{
                    e.result=false;
                }
            });

            //修改编辑状态
            $(this.formSelector).on("click","a[name='tag']", function () {
                var local=$(this).attr("local");
                $("#curLanguage").val($(this).attr("tagIndex"));
                $(".tab-pane").each(function(index,item){
                    var lang = $(item).attr("lang");
                    // var flag = false;
                    // var $atab = $(".a_"+lang).find('span');
                    //if($atab.text().trim()==window.top.message.content_auto['编辑中']){
                    var title = $(".picTitleVal"+lang).val().trim();
                    var imgval =  $(".picPicVal"+lang).val();
                    if (!!title && !!imgval) {
                        $("#option"+lang).show();
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.edited']);
                    }
                    //}

                });
                $("a.copy").each(function(index,item){
                    var lang =$(this).attr("local");
                    if(local==lang){
                        $("#option"+lang).css("display","none");
                    } else {
                        $(".picTitleVal"+lang).val().trim()&&$("#option"+lang).css("display","block");
                    }
                });
                if (!!$("#picPicImg"+local+"").val())
                    $("#picPicImg"+local+"").parent().parent().css("display","block");
                page.resizeDialog();
            });

            /*标题改变时 改为已编辑*/
            $("[name$='title']").on("keyup",function(){
                _this.changeEditStatus($(this).attr("lang"));
            });

        },

        changeEditStatus:function(language) {

            var $editStatusDom =  $("a.current").find('span');
            var title = $(".picTitleVal"+language).val().trim();
            var imgval =  $("#picPicImg"+language).attr("src");
            if (!!title==false && !!imgval==false){
                $editStatusDom.text(window.top.message.common['switch.CloseReminder.unedited']);
            } else if (!!title==true && !!imgval==true) {
                $editStatusDom.text(window.top.message.common['switch.CloseReminder.edited']);
            } else if (!!title==true || !!imgval==true) {
                $editStatusDom.text(window.top.message.common['switch.CloseReminder.editing']);
            }
        },

        changeCurrentLang:function(e,p){
            try{
                var curIndex = $("#curLanguage").val();
                var allTags = $(".tabLanguage").length;
                for(var i=0;i<allTags;i++){
                    if(curIndex<allTags){
                        curIndex++;
                        $("#tag"+curIndex).click();
                    }else{
                        curIndex=1;
                        $("#tag"+curIndex).click();
                    }
                    break;
                }
            }finally{
                $(e.currentTarget).unlock();
            }

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
            e.objId = 1;
            e.catePath = 'materialPic';
            var isSuccess = this.uploadAllFiles(e, opt);
            if (isSuccess && this.validateForm(e)) {
                return true;
            } else {
                $(e.currentTarget).unlock();
                return false;
            }
        }
    });
});