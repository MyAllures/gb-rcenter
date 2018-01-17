define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function (BaseEditPage) {
    var that;
    return BaseEditPage.extend({
        ue:null,
        langObj:{},
        sendType:null,
        $currentLang:$(".lang.current"),
        languageJson :null,
        ue:[],
        oldContent:null,
        ueConfig:{

            maxPic:1,//最多上次几张图片
            objId:null,//当前数据的id
            catePath:null,//模块名(图片文件夹名)
            callBack:null,//上传后的回调函数

            _urlParam:function(){
                //TODO jeff 删除判断
                if(!this.objId||!this.catePath) {
                    throw window.top.message.content_auto['不能为空'];
                };
                return 'objId='+this.objId+'&catePath='+this.catePath;
            }

        },
        /**能自动保存**/
        canSave:true,
        init: function () {
            this._super();
            var _this = this;
            //先验证title
            $(".document_validtitle").each(function (idx,item) {
                $(item).valid();
            });
            $(".form-textarea").each(function(idx,item){
                _this.initUEditor(idx);
            });
            _this.canSave=true;
            _this.autoSave();
            setTimeout(function () {
                _this.oldContent = _this.getCurContent();
            },1000)
        },
        bindEvent:function(){
            that = this;
            this._super();
            $(this.formSelector).on("click",".langtag", function () {
                var lang=$(this).attr("name");
                $(".contentDiv").hide();
                $("#content"+lang).removeClass("hide");
                $("#content"+lang).show();
                $(".langtag").removeClass("current");
                $(this).addClass("current");
            });
            //修改编辑状态
            $(this.formSelector).on("click","a[name='tag']", function () {
                var local=$(this).attr("lname");
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                $(".ann").hide();
                $(".content"+local).show();
                var tabIndex = $(this).attr("lnum");
                $("#curLanguage").val(tabIndex);
                that.showNextOrPreview(tabIndex);
                $(".tab-pane").each(function(index,item){
                    var lang = $(item).attr("lang");
                    if(that.getSendContent(index)==""){
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.unedited']);
                    }else{
                        $("#fz_"+lang).removeClass("hide");
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.edited']);
                    }
                    if(local==lang){
                        $("#fz_"+lang).addClass("hide");
                    }
                });
                $("#span"+local).text(window.top.message.common['switch.CloseReminder.editing']);
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceIndex = $(this).attr("index");
                var targetIndex = $(".current").attr("lnum");
                if(targetIndex){
                    targetIndex--;
                }
                var sourceContent = that.getSendContent(sourceIndex);
                that.setSendContent(targetIndex,sourceContent);

            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input[name$='contentText']", function (e,message) {
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
        onPageLoad:function(){
            this._super();

        },

        /**
         * 初始化 ueditor
         */
        initUEditor:function(idx){
            var that = this;
            UE.delEditor('editContent'+idx);
            var width = $("#editContent"+idx).width;
            that.ue[idx] = UE.getEditor('editContent'+idx,{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:width,/*初始化编辑器宽度($(window.document).width() *.9)*/
                initialFrameHeight:400,/*初始化编辑器宽度*/
                autoHeightEnabled:false,/*是否自动长高*/
                maximumWords:20000,
                toolbars: [[
                    'source','anchor', 'undo', 'redo', 'bold', 'indent', 'italic', 'underline', 'strikethrough', 'subscript', 'fontborder',
                    'superscript', 'formatmatch', 'blockquote', 'pasteplain', 'selectall', 'preview', 'horizontal', 'removeformat', 'time',
                    'date', 'unlink', 'insertrow', 'insertcol', 'mergeright', 'mergedown', 'deleterow', 'deletecol', 'splittorows', 'splittocols',
                    'splittocells', 'deletecaption', 'inserttitle', 'mergecells', 'deletetable', 'cleardoc', 'insertparagraphbeforetable',
                    'fontfamily', 'fontsize', 'paragraph', 'edittable', 'edittd', 'link', 'spechars', 'searchreplace', 'justifyleft', 'justifyright',
                    'justifycenter', 'justifyjustify', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'fullscreen',
                    'directionalityltr', 'directionalityrtl', 'rowspacingtop', 'rowspacingbottom', 'imagenone', 'imageleft', 'imageright',
                    'imagecenter', 'lineheight', 'edittip ', 'customstyle', 'autotypeset', 'touppercase', 'tolowercase', 'background', 'inserttable',
                    'simpleupload', 'insertimage'

                ]]
            });
            that.ue[idx].options.imageUrlPrefix=window.top.imgRoot+"/files/";
            that.ue[idx].options.urlParam = 'objId='+$("#documentId").val()+'&catePath=cttDocument';
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
        getContentText: function (idx) {
            if(this.ue[idx]){
                //UE.getEditor('editor').getContentTxt()
                return this.ue[idx].getContentTxt();
            }
        },
        /**
         * 改变当前语言
         * @param e
         * @param p
         */
        changeCurrentLang:function(e,p){
            try{
                var $this_btn = $(e.currentTarget);
                var curIndex = $("#curLanguage").val();
                var allTags = $(".lang").length;
                if($this_btn.hasClass('next_step')) {
                    if (curIndex < allTags) {
                        curIndex++;
                        $("#a_" + curIndex).click();
                    } else {
                        curIndex = 1;
                        $("#a_" + curIndex).click();
                    }
                    this.showNextOrPreview(curIndex);
                }else{
                    if(curIndex>1){
                        curIndex--;
                        $("#a_" + curIndex).click();
                    }else{
                        curIndex = allTags;
                        $("#a_" + curIndex).click();
                    }
                    this.showNextOrPreview(curIndex);
                }
            }finally{
                $(e.currentTarget).unlock();
            }

        },
        /**
         * 显示下一步或预览按钮
         * @param lnum
         */
        showNextOrPreview:function(lnum){
            var allNum = $(".lang").length;
            if(lnum==1&&allNum>1){
                $(that.formSelector + ' .previous_lang').addClass("hide");
                $(that.formSelector + ' .next_step').removeClass("hide");
                $(that.formSelector + ' .preview').addClass("hide");
            }else if(lnum==allNum){
                $(that.formSelector + ' .previous_lang').removeClass("hide");
                $(that.formSelector + ' .next_step').addClass("hide");
                $(that.formSelector + ' .preview').removeClass("hide");
            }else{
                $(that.formSelector + ' .previous_lang').removeClass("hide");
                $(that.formSelector + ' .next_step').removeClass("hide");
                $(that.formSelector + ' .preview').addClass("hide");
            }
        },
        /**
         * 自动保存
         */
        autoSave:function(){
            var _this = this;
            if(_this.canSave){
                setTimeout(function(){
                    _this.ajaxSave();
                },5*60*1000);
            }
        },
        /**
         * 调用AJAX保存
         */
        ajaxSave:function(){
            var _this = this;
            var $form = $("#editForm");
            var pass = !$form.valid || $form.valid();
            if (!pass) {
                _this.canSave = false;
                return false;
            }else{
                _this.canSave = true;
            }
            if(_this.canSave) {
                var data = $form.serialize();
                window.top.topPage.ajax({
                    url: root + "/cttDocumentI18n/persist.html",
                    dataType: 'json',
                    cache: false,
                    type: "POST",
                    data: data,
                    success: function (data) {
                        if (data.state) {
                            $("#searchId").val(data.doc.documentId);
                            var e ={};
                            e.currentTarget = $(".auto-save-btn");
                            page.showPopover(e, {}, 'success', window.top.message.content['document.autoSaveSuccess'], true);
                            /*window.top.topPage.showSuccessMessage(window.top.message.content['document.autoSaveSuccess'],function(){
                                if(data.state){
                                    $("#searchId").val(data.doc.documentId);
                                }
                                //$("#mainFrame").load(root+"/cttDocumentI18n/editContent.html?search.documentId="+$("#searchId").val());
                            });*/
                        } else {
                            var msg = "";
                            if (data.msg) {
                                msg = window.top.message.content['document.autoSaveFail'] +":"+ data.msg;
                            }else{
                                msg = window.top.message.content['document.autoSaveFail'];
                            }
                            var e ={};
                            e.currentTarget = $(".auto-save-btn");
                            page.showPopover(e, {}, 'danger', msg, true);
                        }
                        _this.autoSave();
                    }
                });
            }
        },
        /**
         * 返回列表
         * @param e
         * @param option
         */
        goToList:function(e,option){
            var _this = this;
            _this.canSave = false;
            var ischange = false;
            var thisContent = _this.getCurContent();
            if(thisContent!=_this.oldContent){
                ischange = true;
            }
            if(ischange){
                window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],
                    window.top.message.content['document.return.tips'],window.top.message.common['ok'],window.top.message.common['cancel'],function(success){
                    if(success){
                        _this.goToLastPage(e,option);
                    }
                });
            }else{
                _this.goToLastPage(e,option);
            }
            $(e.currentTarget).unlock();
        },
        revertDefault:function(e,option){
            var _this = this;
            var curIndex = $(".current").attr("lnum");

            if(curIndex){
                curIndex--;
            }
            var defaultContent = $("#hiddenContentDefault"+curIndex).val();
            _this.setSendContent(curIndex,defaultContent);
            $(e.currentTarget).unlock();
        },
        toDocumentList: function (e,opt) {
            if(opt.data.state){
                $("#reback_btn").click();
            }
        },
        autoSaveCallbak: function (e,opt) {
            if(opt.data.state){
                var id = opt.data.doc.documentId;
                $("#searchId").val(id);
                var url = root + "/cttDocumentI18n/editContent.html?search.documentId="+id;
                window.top.topPage.ajax({
                    url: url,
                    success: function (data) {
                        $("#mainFrame").html(data);
                    }
                });
            }
            $("input[name=gb\\.token]").val(opt.data.token);
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        myValidateForm: function(e,opt) {
            //alert(this.getSendContent(0).length);
            var _this = this;
            $(".contentTextVal").each(function (idx, item) {
                var textIdx = $(item).attr("textIdx");
                var content = _this.getContentText(textIdx);
                $(item).val(content);
            });
            if (!_this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },
        getCurContent: function () {
            var _this = this;
            var content = "";
            $(".contentTextVal").each(function (idx, item) {
                var textIdx = $(item).attr("textIdx");
                var cnt = _this.getContentText(textIdx);
                content+= cnt;
            });
            return content;
        },
        savePreview:function(e,opt){
            var _this = this;
            var data = _this.getCurrentFormData(e);
            window.top.topPage.ajax({
                url: root+'/cttDocumentI18n/savePreview.html',
                data:data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $("#editor",_this.formSelector).hide();
                    $("#preview-content",_this.formSelector).remove();
                    $("#content-div").append(data);
                }
            });
            $(e.currentTarget).unlock();
        },

        toPrevious: function () {
            $("#preview-content",this.formSelector).remove();
            $("#editor",this.formSelector).show();
        }

    })
});