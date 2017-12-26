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
                var sourceContent=$(".siteApiNameVal"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".siteApiNameVal"+targetLocal).val(sourceContent);

                var cover = $(".apiTypeCoverVal"+sourceLocal).val();
                $(".apiTypeCoverVal"+targetLocal).val(cover);
                var coverImg = $("#apiTypeCoverImg"+sourceLocal).attr("src");
                $("#apiTypeCoverImg"+targetLocal).attr("src",coverImg);


            });

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

            });


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
        changeApiStatus: function (e, opt) {
            var _this = this;
            var oldVal = $("#tempStatusVal").val();
            var status = $("[name='siteApi.status']:checked").val();

            if(oldVal=="disable"&&status!=oldVal){
                window.top.topPage.showConfirmDynamic(window.top.message.common['gameManage.tipsTitle'],
                    window.top.message.content['gameManage.siteApi.setEnableTips'],window.top.message.content['gameMange.enable'],
                    window.top.message.setting['common.cancel'],function(result){
                        if(result){
                            window.top.topPage.doAjax(e, opt);
                        }
                    });
            }else if(oldVal=="normal"&&status!=oldVal){
                window.top.topPage.showConfirmDynamic(window.top.message.common['gameManage.tipsTitle'],
                    window.top.message.content['gameManage.siteApi.setDisableTips'],window.top.message.content['gameManage.stillStop'],
                    window.top.message.setting['common.cancel'],function(result){
                        if(result){
                            window.top.topPage.doAjax(e, opt);
                        }
                    });
            }else{
                return true;
            }
            return false;
        },
        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            e.objId = $("#siteApiId").val();
            e.catePath = 'siteApi';
            var flag = this.uploadAllFiles(e, opt);
            if(!flag){
                $(e.currentTarget).unlock();
                return false;
            }
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            return  window.top.topPage.doAjax(e, opt);
            //return true;
        },
        /**
         * 自定义名称恢复默认
         * @param e
         * @param option
         */
        revertDefault:function(e,option) {
            var _this = this;
            var local = option.local;
            var apiId = option.apiId;
            window.top.topPage.ajax({
                type:"POST",
                url:root+'/siteApiI18n/revertDefault.html',
                data:{'result.local':local,'result.apiId':apiId},
                dataType:"JSON",
                error:function(data){

                },
                success:function(data){
                    if(data.i18n){
                        $(".siteApiNameVal" +local).val(data.i18n.name);
                    }else{
                        window.top.topPage.showInfoMessage(window.top.message.content['gameManage.noFoundData']);
                    }
                }
            });
            $(e.currentTarget).unlock();
        }

    });
});