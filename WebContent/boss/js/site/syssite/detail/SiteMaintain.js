define(['common/BaseEditPage','bootstrapswitch','UE.I18N.' + window.top.language], function(BaseEditPage) {
    return BaseEditPage.extend({
        ue:[],

        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.bindEvent();
            var _this = this;

            $(".contents_textarea", _this.formSelector).each(function (idx, item) {
                _this.initUEditor(idx);
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            //这里初始化所有的事件
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });

            $(this.formSelector).on("click","a[name='pretag']", function () {
                $("a[name='pretag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".preann").hide();
                $(".precontent"+local).show();
            });

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input,textarea", function (e,message) {
                if (message && $(this).is(":hidden")) {
                    var attr = $(this).attr("tt");
                    if (attr) {
                        $(".a_" + attr).formtip(message);
                        e.result = true;
                    }
                } else {
                    e.result = false;
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

            $(this.formSelector).on("click","a[name='pretag']", function () {
                var local=$(this).attr("local");
                $("#precurLanguage").val($(this).attr("tagIndex"));
            });

            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                var oldIdx=Number($(".current").attr("tagIndex"));
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".ann").hide();
                $(".content"+local).show();

                var tagIndex = $(this).attr("tagIndex");
                var langSize=Number($("[name='langSize']").val());
                if(oldIdx<tagIndex){
                    $(".previous_lang").removeClass("hide");
                    if(tagIndex == langSize){
                        $(".next_lang").addClass("hide");
                        //$(".preview").removeClass("hide");
                        _this.checkForNext();
                    }else{
                        $(".next_lang").removeClass("hide");
                    }
                }else if(oldIdx>tagIndex){
                    $(".preview").addClass("hide");
                    $(".next_lang").removeClass("hide");
                    if(tagIndex==1){
                        $(".previous_lang").addClass("hide");
                    }
                }
            });

            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceId = $(".siteMaintain"+sourceLocal).attr("id");
                var targetLocal=$(".current").attr("local");
                var targetId = $(".siteMaintain"+targetLocal).attr("id");
                UE.getEditor(targetId).setContent(UE.getEditor(sourceId).getContent());
            });
        },

        /**
         * 预览站点维护信息
         * @param e
         * @param option
         */
        previewMaintain: function (e, option) {
            var content = null;
            var tips = $("textarea", "#siteMaintainTipsDiv");
            var lan  = $("input[name='mainLanguage']", "#siteMaintainTipsDiv").val();
            if (lan) {
                var targetId = $(".siteMaintain" + lan).attr("id");
                content = UE.getEditor(targetId).getContent();
            } else {
                content = UE.getEditor("editContent0").getContent();//默认读取第一个语言的内容显示
            }
            option.target = root + "/site/detail/siteMaintainTipPreview.html?content="+content;
            window.top.topPage.doDialog(e, option);
        },

        /**
         * 提交信息
         */
        saveMaintain: function (e, btnOption) {
            var url = root + "/sysSite/saveMaintain.html";
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                cache: false,
                type: "POST",
                dataType: "json",
                success: function (data) {
                    if (data.state) {
                        _this.returnValue = true;
                        _this.closePage();
                        window.top.topPage.showSuccessMessage(data.msg, null);
                    } else {
                        window.top.topPage.showErrorMessage(data.msg, null);
                    }
                }
            });
        },

        /**
         * 取消维护状态
         * @param event
         * @param option
         */
        turnNormal:function(event,option) {
            var url=root+"/sysSite/turnNormal.html";
            var _this=this;
            window.top.topPage.ajax({
                url: url,
                data:$(this.formSelector).serialize(),
                cache: false,
                type: "POST",
                dataType:"json",
                success: function (data) {
                    if(data.state){
                        _this.returnValue=true;
                        _this.closePage();
                        window.top.topPage.showSuccessMessage(data.msg);
                    }else{
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                }
            });
            $(event.currentTarget).unlock();
        },

        changeCurrentLang:function(e,p)　{
            try{
                var curIndex = $("#curLanguage").val();
                var allTags = $(".tabLanguage").length;
                if ((parseInt(curIndex)+1)>allTags){
                    curIndex = 1;
                } else {
                    curIndex++;
                }
                $("#tag"+curIndex).click();
            }finally{
                $(e.currentTarget).unlock();
            }

        },

        prechangeCurrentLang:function(e,p){
            try{
                var curIndex = $("#precurLanguage").val();
                var allTags = $(".pretabLanguage").length;
                if ((parseInt(curIndex)+1)>allTags){
                    curIndex = 1;
                } else {
                    curIndex++;
                }
                $("#pretag"+curIndex).click();
            }finally{
                $(e.currentTarget).unlock();
            }
        },

        /**
         * 初始化富文本框
         */
        initUEditor: function (idx) {
            var that = this;
            UE.delEditor('editContent' + idx);
            var width = $("#editContent" + idx).width;
            that.ue[idx] = UE.getEditor('editContent' + idx, {
                enableAutoSave: false, /*是否自动保存*/
                initialFrameWidth: width, /*初始化编辑器宽度($(window.document).width() *.8)*/
                initialFrameHeight: 200, /*初始化编辑器宽度*/
                autoHeightEnabled: false, /*是否自动长高*/
                maximumWords: 2000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 'link', 'unlink'

                ]]
            });
        }
    });
});