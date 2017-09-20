/**
 * Created by jeff on 15-7-30.
 */
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput'], function (BaseEditPage,fileinput) {

    return BaseEditPage.extend({
        _editor:null,
        titleMaxLength:Number($("#titleMaxLength").val()),
        init: function () {
            //var that = this;
            this._super();
            window.top.topPage.initFileWithPreview($("#uploadImageInput")[0], $("#picUrl")[0],{
                maxFileSize:1024,
                allowedFileExtensions:[".png",".jpg",".gif",".jpeg"]});
            var type = $("[name='result.type']").val();
            if(type=='carousel_type_player_index'){
                var apiId = $("[name='apiId']").val();
                if(apiId=='link'){
                    this.hideApiTypeSelect(true);
                }
            }else if(type==""){
                /*this.hideApiTypeSelect(true)
                $("#url-div").addClass("hide");
                $("#api-div").addClass("hide");*/
            }
            this.resizeDialog();
        },
        bindEvent: function () {
            this._super();
            var _this = this;
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
            this.buildJson();
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

        buildJson: function () {
            var type = $("[name='result.type']").val();
            if(type=='carousel_type_player_index'){
                var apiId = $("[name='apiId']").val();
                var link = {};
                link.apiId = apiId;
                if(apiId!="link"){
                    link.apiTypeId = $("[name='apiTypeId']").val();
                }else{
                    link.url = $("[name='result.url']").val();
                }
                $("[name='result.link']").val(JSON.stringify(link));
            }else{
                $("[name='result.link']").val($("[name='result.url']").val());
            }
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
                url: root+"/content/cttCarousel/persist.html",
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
        selectType: function (e, opt) {
            var type = e.key;
            if(type=="carousel_type_player_index"){
                $("#api-div").removeClass("hide");
                $("#url-div").addClass("hide");
                this.hideApiTypeSelect(false);
            }else{
                this.hideApiTypeSelect(true);
                $("#api-div").addClass("hide");
                $("#url-div").removeClass("hide");
                //$("[name='result.url']").removeClass("hide");
            }
            this.resizeDialog();
        },
        showLink: function (e, opt) {
            var key = e.key;
            if(key=='link'){
                this.hideApiTypeSelect(true);
                $("#url-div").removeClass("hide");
            }else{
                this.hideApiTypeSelect(false)
                $("#url-div").addClass("hide");
            }
        },
        hideApiTypeSelect: function (flag) {
            if(flag){
                $("#apiTypeId-div").addClass("hide");
            }else {
                $("#apiTypeId-div").removeClass("hide");
            }

            /*$(document).find("div").each(function (idx, item) {
                var seldiv = $(item).attr("selectdiv");
                if(seldiv&&seldiv=="apiTypeId"){
                    if(flag){
                        $(item).addClass("hide");
                    }else {
                        $(item).removeClass("hide");
                    }

                }
            });*/
        }

    });
});