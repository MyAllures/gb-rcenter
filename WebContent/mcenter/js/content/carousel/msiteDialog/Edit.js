/**
 * Created by jeff on 15-7-30.
 */
define(['common/BaseEditPage','jqFileInput','UE.I18N.' + window.top.language,'css!themesCss/fileinput/fileinput'], function (BaseEditPage,fileinput) {

    return BaseEditPage.extend({
        _editor:null,
        maxRange: 30,
        ue:[],
        titleMaxLength:Number($("#titleMaxLength").val()),
        init: function () {
            //var that = this;
            this._super();
            window.top.topPage.initFileWithPreview($("#uploadImageInput")[0], $("#picUrl")[0],{
                maxFileSize:1024,
                allowedFileExtensions:[".png",".jpg",".gif",".jpeg"]});
            this.resizeDialog();
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            /**
             * 链接地址添加占位符
             *
             * @param e
             */
            $(this.formSelector).on("click", "._editTags a", function(e){
                var $tag = '$'+$(this).children().text();
                var obj = $(e.currentTarget).parent().prev();
                var startPos =  obj[0].selectionStart;
                var endPos =  obj[0].selectionEnd;
                var restoreTop = obj[0].scrollTop;
                var newValue= obj.val().substring(0, startPos) + $tag + obj.val().substring(endPos, obj.val().length);
                $(obj).val(newValue);
            });
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
                var sourceContent=$(".carouselNameVal"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".carouselNameVal"+targetLocal).val(sourceContent);

                var cover = $(".carouselCover"+sourceLocal).val();
                $(".carouselCover"+targetLocal).val(cover);
                var coverImg = $("#carouselCoverImg"+sourceLocal).attr("src");
                if(coverImg!=""){
                    $("#carouselCoverImg"+targetLocal).attr("src",coverImg);
                }
            });

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    if(attr){
                        $(".a_"+attr).click();
                        $(".a_"+attr).formtip(message);
                        e.result=true;
                    }else{
                        e.result=false;
                    }


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
                    var flag = false;
                    $(item).find(".field").each(function(idx,field){
                        if($(field).val()==""){
                            flag=true;
                        }
                    });
                    if(flag){
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.unedited']);
                    }else{
                        $("#option"+lang).show();
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.edited']);
                    }
                    if(local==lang){
                        $("#option"+lang).hide();
                    }
                });
                $("#span"+local).text(window.top.message.common['switch.CloseReminder.editing']);
                page.resizeDialog();
            });
        },
        onPageLoad: function () {
            var _this = this;
            this._super();
            $(".contents_textarea",_this.formSelector).each(function(idx,item){
                _this.initUEditor(idx);
            });
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
                e.fileInput.$container.parent().removeClass("error");
                page.resizeDialog();
            });
            setTimeout(function () {
                $("#oldContent").val(_this.getCurrentContent());
            },1000)
            $(":radio[name='result.contentType']").on('change', function (e) {
                _this._switchDisplay();
            });
        },

        getCurrentContent: function () {
            var contents= "";
            $(":input").each(function(index,obj){
                if($(obj).attr("name")!="oldContent"){
                    var string = $(obj).attr("name")+":"+$(obj).val().trim()+",";
                    contents += string;
                }

            });
            $(":file").each(function(index,obj){
                var string = $(obj).attr("name")+":"+$(obj).val().trim()+",";
                contents += string;
            });
            return contents;
        },
        /**
         * 删除图片按钮
         * @param e
         * @param p
         */
        deletePicture:function(e,p){
            $("input[name='result.path']").val('');
            $('#picUrl').removeAttr('src');
            /*清除上传文件路径*/
            $('#uploadImageInput').val('');
            $(e.currentTarget).unlock();
        },
        preSave:function( event , option ){
            var status = $("[name='result.contentType']:checked").val();
            if (status!=1){
                $(".content_picture").find("input.cover").val('');
            }else {
                $(".content_word_title").find("textarea.word_content").val('');
            }
            event.objId = $('[name="search.id"]').val();
            event.catePath = 'carousel';
            var flag = this.uploadAllFiles( event, option);
            if(!flag){
                return false;
            }
            /*当前按钮*/
            var $currentBtn = $(event.currentTarget);
            var that = this;

            /*未通过 表单验证*/
            if (!that.validateForm(event)) {
                return false;
            }
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            return true;
        },
        /**
         * 自定义表单验证，保存
         * @param e
         * @param p
         */
        saveCarousel:function(e,p){
            var that = this;
            window.top.topPage.ajax({
                type:"POST",
                url: root+"/content/cttCarousel/dialog/persist.html",
                data:window.top.topPage.getCurrentFormData(e),
                error: function (request) {

                },
                success: function (data) {
                    that.closePage();
                }
            })
        },
        getImg:function(images){
            var imgSrc = images[0].src;
            $("#picUrl").removeClass("hide").attr('src',imgSrc);
            $("input[name='result.path']").val(images[0]._src);
        },
        closePageConfirm:function(e,p){
            //debugger;
            //如果有编辑内容提示
            //当前有未发布的内容，返回后内容将丢失！
            var that = this;
            var contents = '';
            $('._edit').each(function(index,obj){
                contents += $(obj).val().trim()
            });
            var oldContent = $("#oldContent").val();
            var curContent = that.getCurrentContent();
            if(curContent !== oldContent){
                var message = window.top.message.content['carousel.closePageConfirmMessage'];
                window.top.topPage.showConfirmMessage(message,function(bol){
                    if(bol){
                        that.closePage();
                    }
                    $(e.currentTarget).unlock();
                });
            }else{

                that.closePage();
                $(e.currentTarget).unlock();
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
         * 图片、文字模式切换
         * @private
         */
        _switchDisplay: function () {
            var _this = this;
            var contentType = $(":radio[name='result.contentType']:checked").val();
            //圖片
            if(contentType == '1'){
                $(".content_picture_title").removeClass("hide");//圖片模式標題去掉hide
                $(".content_picture").removeClass("hide");//圖片模式图片去掉hide
                $("#content_picture_link").removeClass("hide");
                $(".content_word_title").addClass("hide");
                $(".content_word").addClass("hide");//显示效果添加hide
                $("#showModel").removeClass("hide");
            }else {
                $("#content_picture_link").addClass("hide");//图片链接添加hide
                $(".content_picture_title").addClass("hide");//文字模式圖片名称添加hide
                $(".content_word_title").removeClass("hide");//文字模式內容去掉hide
                $(".content_picture").addClass("hide");
                $(".content_word").removeClass("hide");
                $("#showModel").addClass("hide");
            }
            _this.resizeDialog();
        },

        /**
         *
         * 初始化富文本框
         */
        initUEditor:function(idx){
            var that = this;
            UE.delEditor('editContent'+idx);
            var width = $("#editContent"+idx).width;
            that.ue[idx] = UE.getEditor('editContent'+idx,{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:width,/*初始化编辑器宽度($(window.document).width() *.8)*/
                initialFrameHeight:200,/*初始化编辑器宽度*/
                autoHeightEnabled:false,/*是否自动长高*/
                maximumWords:2000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|','link', 'unlink'

                ]]
            });
        }
    });
});