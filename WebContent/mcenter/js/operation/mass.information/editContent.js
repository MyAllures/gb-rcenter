/**
 * Created by snekey on 15-9-7.
 */
define(['common/BaseEditPage','UE.I18N.'+window.top.language], function (BaseEditPage,ue) {
    return BaseEditPage.extend({
        ue:null,
        init: function () {
            this.formSelector="form";
            this._super(this.formSelector);
        },

        bindEvent: function () {

            this._super();

        },

        onPageLoad:function(){
            this._super();
            this.changeEditTabText();
            //this.checkForNext();
            this.initUEditor();
            this.initEditLanguage();
            this.initPreviewTabHightLight();
            this.initEditContentEvent();
            this.initEditTagsEvent();
            this.initCopyLanguage();
            this.checkForNext();
            this.resetMessaPosition();
        },

        resetMessaPosition:function(){
            /**
             * 解决提示不准确的问题
             */
            $(this.formSelector).on("validate", "._title,._editContent", function (e,message) {
                if(message) {
                    if (!$(this).parents('.tab-pane').hasClass('active')) {//$(this).is(":hidden")
                        $("#a_"+$(this).attr("index")).formtip(message);
                        e.result = true;
                    }
                }
                else{
                    e.result=false;
                }
            });
        },
        /**
         * 初始化编辑语言切换事件 改变当前编辑的语言版本tab高亮状态及文本区域
         */
        initEditLanguage: function(){
            var all_this = this;
            $("._editLanguage").on("click", function () {
                var _this = this;
                $("._editLanguage").removeClass("current");
                $(_this).addClass("current");
                //var language = $(this).attr('language');
                //$("#span_" + language).text(window.top.message.operation_auto['编辑中']);
                //$("#fzyx_" + language).hide();
                all_this.changeEditTabText();
                all_this.checkForNext();
            });
        },

        initPreviewTabHightLight :function(){
            $("._clickHightlight").on("click", function () {
                var _this = this;
                $("._clickHightlight").removeClass("current");
                $(_this).addClass("current");
            })
        },

        /**
         *转换编辑状态
         */
        changeEditTabText:function(){
            $("._title").each(function (index) {
                var title = $(this).val();
                var index = $(this).attr('index');
                var content=" ";
                if($("input[name='sendType']").val()!="email"){
                    content = $("#editContent"+index).val();
                    //$("input[name='sendType']").val() =="email"?UE.getEditor("editContent"+index).getContent():$("#editContent"+index).val();
                    if (title.length > 0 && content.length > 0) {
                        $("#fzyx_" + index).show();
                        $("#span_" + index).text(window.top.message.operation_auto['已编辑']);
                    } else {
                        $("#fzyx_" + index).hide();
                        $("#span_" + index).text(window.top.message.operation_auto['未编辑']);
                    }
                }else{
                    if (title.length > 0 ) {
                        $("#fzyx_" + index).show();
                        $("#span_" + index).text(window.top.message.operation_auto['已编辑']);
                    } else {
                        $("#fzyx_" + index).hide();
                        $("#span_" + index).text(window.top.message.operation_auto['未编辑']);
                    }
                }


            });
            //当前选中的语言版本为编辑中,移出复制语系
            var current_a = $(".current._editLanguage");
            var dataIndex = $(current_a).attr('data-index');
            var current_span = $(current_a).find("span");
            $(current_span).text(window.top.message.operation_auto['编辑中']);
            $("#fzyx_" + dataIndex).hide();
        },
        /**
         * 初始化编辑器的文本事件
         */
        initEditContentEvent:function(){
            var $this = this;
            $("._title,._editContent").on("keyup",function(){
                $this.checkForNext();
            })
        },

        /**
         *
         * 初始化富文本框
         */
        initUEditor:function() {
            if($("input[name='sendType']").val()=='email'){
                this.ue = {};

                for(var i=0;i<languageCounts;i++) {
                    var id = 'editContent'+i;
                    UE.delEditor(id);
                    var currentUe = UE.getEditor(id, {
                        toolbars: [
                            [
                                'anchor','undo','redo','bold','indent','italic','underline','strikethrough','subscript','fontborder',
                                'superscript','formatmatch','blockquote','pasteplain','selectall','preview','horizontal','removeformat','time',
                                'date','unlink','insertrow', 'insertcol', 'mergeright', 'mergedown','deleterow','deletecol','splittorows','splittocols',
                                'splittocells','deletecaption','inserttitle','mergecells','deletetable','cleardoc','insertparagraphbeforetable',
                                'fontfamily','fontsize', 'paragraph','edittable','edittd','link', 'spechars','searchreplace','justifyleft','justifyright',
                                'justifycenter','justifyjustify', 'forecolor','backcolor','insertorderedlist','insertunorderedlist','fullscreen',
                                'directionalityltr','directionalityrtl', 'rowspacingtop','rowspacingbottom','insertframe','imagenone','imageleft','imageright',
                                'attachment','imagecenter','lineheight','edittip ','customstyle','autotypeset','touppercase','tolowercase','background','inserttable',
                            ]
                        ],
                        enableAutoSave: false, /*是否自动保存*/
                        initialFrameWidth: ($(window.document).width() * .4), /*初始化编辑器宽度*/
                        initialFrameHeight: 200, /*初始化编辑器高度*/
                        autoHeightEnabled: false, /*是否自动长高*/
                        autoFloatEnabled: true, /*toolbar 是否固定 */
                        elementPathEnabled:false,
                        maximumWords:1000,
                        index:i,
                    });
                    currentUe.addListener("contentChange",function(){
                        var index = this.options.index;
                        var areaClassName = '._editContent'+index;
                        this.sync();
                        $($(areaClassName)[1]).valid();
                    });
                    this.ue[id] = {};
                    this.ue[id] = currentUe;
                }
            }
        },
        /**
         * 初始化变量标签的事件
         */
        initEditTagsEvent:function(){
            var that = this;
            $("._editTags a").on("click",function(){
                var $this = $(this);
                var $parent = $this.parent();
                var $tag = '$'+$this.children().text();
                if(that.ue){
                    /*发送类型是邮件/ue初始化成功*/debugger;
                    var ueKey = $parent.data().ueKey;
                    that.ue[ueKey].execCommand('insertHtml', $tag)
                } else {
                    var $contentId = $parent.attr("id");
                    var $selector = "[name='"+$contentId+"']";
                    var obj =$($selector);
                    var value = $(obj).val();
                    var startPos =  obj[0].selectionStart;
                    var endPos =  obj[0].selectionEnd;
                    var restoreTop = obj[0].scrollTop;
                    var newValue= obj.val().substring(0, startPos) + $tag + obj.val().substring(endPos, obj.val().length);
                    $(obj).val(newValue);
                }
            })
        },
        /**
         * 初始化复制语系事件
         */
        initCopyLanguage:function(){
            var all_this = this;
            $(".copy").on("click", function () {
                var index=$(this).attr("index");
                var sourceTitle=$("#title"+index).val();
                var sourceContent=$("input[name='sendType']").val() =="email"?UE.getEditor("editContent"+index).getContent():$("#editContent"+index).val();
                var targetIndex=$(".current._editLanguage").attr("data-index");
                $("#title"+targetIndex).val(sourceTitle);
                $("input[name='sendType']").val() =="email"?UE.getEditor("editContent"+targetIndex).setContent(sourceContent):$("#editContent"+targetIndex).val(sourceContent);
                all_this.checkForNext();
            });
        },

        checkForNext:function(){
            if($("input[name='sendType']").val()!="email"){

                var checkTitle = true;
                var checkContent = true;
                $("._title").each(function(){
                    if($(this).val() == ""){
                        checkTitle = false;
                        return;
                    }
                });
                $("._editContent").each(function(){
                    if($(this).val() == ""){
                        checkContent = false;
                        return;
                    }
                });
                if(checkTitle&&checkContent){
                    $([title=window.top.message.operation_auto['预览并发布']]).attr("disabled",false);
                }else{
                    $([title=window.top.message.operation_auto['预览并发布']]).attr("disabled",true);
                }
            }
        },
        chooseUser: function (e) {
            var url = root + '/operation/massInformation/chooseUser.html';
            window.top.topPage.ajax({
                type: "POST",
                data: this.getCurrentFormData(e),
                url: url,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $("#mainFrame").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });

        },
        sendPreview: function (e,opt) {
            var url = root + '/operation/massInformation/sendPreview.html';

            //每次单击下一步预览之前先删除隐藏域中的值　防止值叠加
            //$(".formData").val("");
            window.top.topPage.ajax({
                type: "POST",
                data:  $("#step1Form").serialize(),
                url: url,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $("#mainFrame").html(data);
                    $("#step1").hide();
                    $("#step2").show();
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },
        finish: function (e) {
            var url = root + '/operation/massInformation/finish.html';
            window.top.topPage.ajax({
                type: "POST",
                data: $("#step2Form").serialize(),
                url: url,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                   /* $("#mainFrame").html(data);*/
                    $("#step2").hide();
                    $("#step1").hide();
                    $("#step3").show();
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    // $(e.currentTarget).unlock();
                }
            });

        },


        editContent: function (e) {
            var url = root + '/operation/massInformation/editContent.html';
            //表单部分提交，只提交当前显示的step内的表单内容，避免与其他step的表单重复提交，造成数据重复
            /*var section = $("#step2");
            var f = $('<form></form>'),
            newForm = section.clone();
            f.append(newForm);
            var sectionData = f.serialize();*/

            window.top.topPage.ajax({
                type: "POST",
                data:  this.getCurrentFormData(e),
                url: url,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $("#mainFrame").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });

        }
    })
})
