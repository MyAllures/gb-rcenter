//模板页面
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','bootstrapswitch', 'UE.I18N.'+window.top.language], function(BaseEditPage,fileinput,bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,
        ue:[],
        init: function (title) {
            this.formSelector = "form";
            this._super();
            var _this = this;
            //$("#introduceStatus").bootstrapSwitch();//switch
            $(".check-box").bootstrapSwitch();
            $(".form-textarea").each(function(idx,item){
                _this.initUEditor(idx);
            });
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
                    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
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
            this.copyText('a[name="copy"]');
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
                var targetLocal=$(".current").attr("local");
                var sourceorderIndex=$(this).attr("orderIndex");
                var targetOrderIndex = $(".current").attr("tagIndex");

                var sourceContent=$(".siteGameNameVal"+sourceLocal).val();
                $(".siteGameNameVal"+targetLocal).val(sourceContent);

                var cover = $(".apiTypeCoverVal"+sourceLocal).val();
                $(".apiTypeCoverVal"+targetLocal).val(cover);

                var coverImg = $("#apiTypeCoverImg"+sourceLocal).attr("src");
                $("#apiTypeCoverImg"+targetLocal).attr("src",coverImg);

                var introduceStatus = $(".siteGameIntroduceStatusVal"+sourceLocal).val();
                var targetVal = $(".siteGameIntroduceStatusVal"+targetLocal).val();
                if(introduceStatus!=targetVal){
                    $("[name=introduceStatus"+targetLocal+"]").click();
                    $(".siteGameIntroduceStatusVal"+targetLocal).val(introduceStatus);
                }

                var introduce = _this.getSendContent(sourceorderIndex-1);
                _this.setSendContent(targetOrderIndex-1,introduce);

            });

            var $bootstrapSwitch = $(".check-box");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.common['enable'],
                    offText: window.top.message.common['forbidden'],
                    /*onText: window.top.message.content['floatPic.display.on'],
                    offText: window.top.message.content['floatPic.display.off'],*/
                    onSwitchChange: function (e, state) {
                        var local = $(this).attr("local");
                        if(state){
                            $(".siteGameIntroduceStatusVal"+local).val("normal");
                        }else{
                            $(".siteGameIntroduceStatusVal"+local).val("disable");
                        }
                    }
                }
            );

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input,textarea", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    if(attr){
                        $(".a_"+attr).formtip(message);
                        $(".a_"+attr).click();
                        e.result=true;
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

            });


        },
        changeGameStatus: function (e, opt) {
            var _this = this;
            var oldVal = $("#tempStatusVal").val();
            var status = $("[name='siteGameStatus']:checked").val();
            if(oldVal=='normal'&&status!='normal'){
                window.top.topPage.showConfirmDynamic(window.top.message.common['gameManage.tipsTitle'],
                    window.top.message.content['gameManage.siteGame.setDisableTips'],window.top.message.content['gameManage.stillStop'],
                    window.top.message.setting['common.cancel'],function(result){
                        if(result){
                            window.top.topPage.doAjax(e, opt);
                        }
                    });
            }else if(oldVal=='disable'&&status!='disable'){
                window.top.topPage.showConfirmDynamic(window.top.message.common['gameManage.tipsTitle'],
                    window.top.message.content['gameManage.siteGame.setEnableTips'],window.top.message.content['gameMange.enable'],
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
            e.objId =$("#siteGameId").val();
            e.catePath = 'siteGame';
            var flag = this.uploadAllFiles(e, opt);
            if(!flag){
                return false;
            }
            if (!this.validateForm(e)) {
                return false;
            }
            return  window.top.topPage.doAjax(e, opt);
        },
        /**
         * 初始化 ueditor
         */
        initUEditor:function(idx){
            var that = this;
            UE.delEditor('editContent'+idx);
            var width = $("#editContent"+idx).width;
            this.ue[idx] = UE.getEditor('editContent'+idx,{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:width,/*初始化编辑器宽度($(window.document).width() *.9)*/
                initialFrameHeight:200,/*初始化编辑器宽度*/
                autoHeightEnabled:false,/*是否自动长高*/
                maximumWords:20000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment'

                ]]
            });
            /*contentChange*/
            this.ue[idx].addListener( 'contentChange', function( editor ) {
                /*if(that.ue.getContentTxt().trim()){

                 }*/
                //that.changeEditStatus($("#title").val().trim(),that.ue.getContentTxt().trim(),true);
                /*if(that.ue.hasContents()){
                 that.changeEditStatus();
                 }*/
            });
            this.ue[idx].ready(function(){
                that.resizeDialog()
            })
        },
        /**
         * 设置内容
         * @param val
         */
        setSendContent:function(idx,val){
            if(this.ue[idx]){
                this.ue[idx].setContent(val);
            }
        },
        /**
         * 获取内容
         */
        getSendContent:function(idx){
            if(this.ue[idx]){
                return this.ue[idx].getContent();
            }
        },
        /**
         * 自定义名称恢复默认
         * @param e
         * @param option
         */
        revertDefault:function(e,option) {
            var _this = this;
            var local = option.local;
            var gameId = option.gameId;
            window.top.topPage.ajax({
                type:"POST",
                url:root+'/siteGameI18n/revertDefault.html',
                data:{'result.local':local,'result.gameId':gameId},
                dataType:"JSON",
                error:function(data){
                },
                success:function(data){
                    if(data.i18n){
                        $(".siteGameNameVal" +local).val(data.i18n.name);
                    }else{
                        window.top.topPage.showInfoMessage(window.top.message.content['gameManage.noFoundData']);
                    }
                }
            });
            $(e.currentTarget).unlock();
        },
        query:function(e,opt){
            if(e.returnValue=="successful"){
                $("#editForm").submit();
            }

        }

    });
});