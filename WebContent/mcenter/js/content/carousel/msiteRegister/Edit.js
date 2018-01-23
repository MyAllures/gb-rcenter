/**
 * Created by jeff on 15-7-30.
 */
define(['common/BaseEditPage','jqFileInput','UE.I18N.' + window.top.language,'css!themesCss/fileinput/fileinput'], function (BaseEditPage,fileinput) {

    return BaseEditPage.extend({
        ue:[],
        titleMaxLength:Number($("#titleMaxLength").val()),
        init: function () {
            this._super();
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
         * 自定义表单验证，保存
         * @param e
         * @param p
         */
        saveCarousel:function(e,p){
            var that = this;
            window.top.topPage.ajax({
                type:"POST",
                url: root+"/content/cttCarousel/registerAd/persist.html",
                data:window.top.topPage.getCurrentFormData(e),
                error: function (request) {

                },
                success: function (data) {
                    that.closePage();
                }
            })
            $(e.currentTarget).unlock();
        },
        closePageConfirm:function(e,p){
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
        }
    });
});