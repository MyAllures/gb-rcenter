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
                    throw '不能为空';
                };
                return 'objId='+this.objId+'&catePath='+this.catePath;
            }

        },
        /**能自动保存**/
        canSave:true,
        init: function () {
            this._super();
            var _this = this;
            setTimeout(function () {
                _this.oldContent = _this.getCurContent();
            },500);

        },
        bindEvent:function(){
            that = this;
            this._super();
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
                    var title = $(".title_"+lang).val();
                    if(that.getSendContent(index)==""||title==""){
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
                var targetLocal = $(".current").attr("lname");
                if(targetIndex){
                    targetIndex--;
                }
                var sourceContent = that.getSendContent(sourceIndex);
                that.setSendContent(targetIndex,sourceContent);
                var sourceTitle = $(".title_"+sourceLocal).val();
                $(".title_"+targetLocal).val(sourceTitle);
            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input[name$='orginContent'],input[name$='helpTitle']", function (e,message) {
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
            $(".form-textarea").each(function(idx,item){
                that.initUEditor(idx);
            });

        },
        onPageLoad:function(){
            this._super();

        },
        /**
         * 显示下一步或预览按钮
         * @param lnum
         */
        showNextOrPreview:function(lnum){
            var allNum = $(".lang").length;
            if(lnum==1){
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
         * 初始化 ueditor
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
                maximumWords:30000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|','link', 'unlink','|',
                    'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment'

                ]]
            });
            that.ue[idx].options.imageUrlPrefix=window.top.imgRoot+"/files/";
            that.ue[idx].options.urlParam = 'objId='+$("#tempHelpDocumentId").val()+'&catePath=helpDocument';
            //that.ue[idx].options.urlParam = 'objId=1&catePath=cttDocument';
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
         * 返回列表
         * @param e
         * @param option
         */
        goToList:function(e,option){
            var _this = this;
            var ischange = false;
            var thisContent = _this.getCurContent();
            if(thisContent!=_this.oldContent){
                ischange = true;
            }
            if(ischange){
                window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],
                    window.top.message.serve['help.document.return.tips'],window.top.message.common['ok'],window.top.message.common['cancel'],function(success){
                    if(success){
                        _this.goToLastPage(e,option);
                    }
                });
            }else{
                _this.goToLastPage(e,option);
            }
            $(e.currentTarget).unlock();
        },
        toDocumentList: function (e,opt) {
            if(opt.data.state){
                $("#reback_btn").click();
            }
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        myValidateForm: function(e,opt) {
            //alert(this.getSendContent(0).length);//orginContent
            var _this = this;
            $("[name='result.orginContent']").each(function (idx, item) {
                var textIdx = $(item).attr("indexId");
                var content = _this.getContentText(textIdx);
                $(item).val(content);
            });

            if (!_this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }

            /*var ele = $(this.formSelector).find("input[name='result.rechargeAmount']");
            $.data(ele[0], "previousValue", null);
            ele.valid();*/

            return true;
        },
        getCurContent: function () {
            var _this = this;
            var content = "";
            content += $("[name='result.helpTypeParentId']").val();
            content += $("[name='result.helpTypeId']").val();
            $("input[name$='helpTitle']").each(function (idx, title) {
                var titleText = $(title).val();
                content += titleText;
            });
            $("[name='result.orginContent']").each(function (idx, item) {
                var indexId = $(item).attr("indexId");
                var cnt = _this.getContentText(indexId);
                content+= cnt;
            });
            return content;
        },
        myCallBack: function (e, opt) {
            if(opt.data.state){
                //$("#refresh-btn").click();
                this.goToLastPage(e,opt)
            }
        }

    })
});