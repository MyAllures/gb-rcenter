/**
 * Created by Orange on 2015-11-17
 */

define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function (BaseEditPage) {

    return BaseEditPage.extend({
        ue:[],
        init: function () {
            this._super();
            var _this = this;
            $(".form-textarea").each(function(idx,item){
                _this.initUEditor(idx);
            });
        },

        onPageLoad: function () {
            this._super();
            this.copyLanguage();
            //this.initEditContentEvent();
            this.checkForNext();

            //初始化多语言版本
            $("#index_0").children().text("编辑中");
            $(".click_index").on("click", function (e) {
                var _this = e.currentTarget;
                var id = $(_this).prop("id").substr(6,7);
                var data_language = $(_this).attr("data-language");
                $(".click_index").each(function (e) {
                    var this_id = $(this).prop("id").substr(6,7);
                    if(this_id==id){
                        $("#div_"+this_id).children().removeClass("hide");
                        $(this).addClass("current");
                        $(this).children().text("编辑中");
                    }else{
                       // var title = $("input[name='title["+this_id+"]']").val();
                        var content = $("textarea[name='content["+this_id+"]']").val();
                        if (content.length > 0) {
                            $("#div_"+this_id).children().addClass("hide");
                            $(this).removeClass("current");
                            $(this).children().text("已编辑");
                        } else {
                            $("#div_"+this_id).children().addClass("hide");
                            $(this).removeClass("current");
                            $(this).children().text("未编辑");
                        }
                    }
                });
                //初始化复制语系
                for (var i=0;i<$(".div_length").length;i++){
                    //var title = $("input[name='title["+i+"]']").val();
                    var content = $("textarea[name='content["+i+"]']").val();
                    if (content.length > 0) {
                        var language = $("#div_"+i+"").attr("language");
                        $(".temp").each(function (e) {
                            var lang = $(this).children().attr("copy-language");
                            if(lang==language){
                                if(lang==data_language){
                                    $(this).addClass("hide");
                                }else{
                                    $(this).removeClass("hide");
                                }

                            }
                        })
                    }
                }
            });

            //隐藏定时发送时间按钮
            $("[name='result.timingSend']").on("click", function (e) {
                var _this = e.currentTarget;
                if($(_this).prop("checked")){
                    $(".input-group").removeClass("hide");
                }else{
                    $(".input-group").addClass("hide");
                }
            });

            $(".announcement").on("click",function (e) {
                var val = $(this).val();
                //点击游戏公告
                if(val=='game_announcement'){
                    $(".game_announcement").removeClass("hide");
                }else{
                    $(".game_announcement").addClass("hide");
                }
                //点击运营公告
                if (val=='operator_announcement'){
                    $(".operator_announcement").removeClass("hide");
                }else{
                    $(".operator_announcement").addClass("hide");
                }
            });

            //隐藏显示对应的描述
            $(".announcement").on("click",function (e) {
                var val = $(this).val();
                if(val=='system_announcement' || val=='game_announcement'){
                    $(".system_announcement").removeClass("hide");
                    $(".operator_announcement").addClass("hide");
                    $(".platform_announcement").addClass("hide");
                }
                if(val=='operator_announcement'){
                    $(".operator_announcement").removeClass("hide");
                    $(".system_announcement").addClass("hide");
                    $(".platform_announcement").addClass("hide");
                }
                if(val=='platform_announcement'){
                    $(".platform_announcement").removeClass("hide");
                    $(".system_announcement").addClass("hide");
                    $(".operator_announcement").addClass("hide");
                }
            });
            $(".publish").on("click", function (e) {
                var val = $(this).val();
                if(val=='show'){
                    $(".publish_show").removeClass("hide");
                    $(".publish_showDialog").addClass("hide");
                }
                if(val=='showDialog'){
                    $(".publish_showDialog").removeClass("hide");
                    $(".publish_show").addClass("hide");
                }
            })
        },
        //复制语系
        copyLanguage:function(){
            var that = this;
            $(this.formSelector).on("click",".co-gray", function () {
                var sourceLocal=$(this).attr("copy-language");
                var sourceIndex = $(this).attr("index");
                var targetIndex = $(".current").attr("lnum");
                if(targetIndex){
                    targetIndex--;
                }
                var sourceContent = that.getSendContent(sourceIndex);
                that.setSendContent(targetIndex,sourceContent);

            });
        },

        checkForNext: function () {
           // var checkTitle = true;
            var checkContent = true;
            $(".p-r-70").each(function (e) {
                if($(this).val() == ""){
                    checkTitle = false;
                    return;
                }
            });

            $(".p-b-30").each(function(){
                if($(this).val() == ""){
                    checkContent = false;
                    return;
                }
            });
            if(checkContent){
                $("[title='预览并发布']").attr("disabled",false);
            }else{
                $("[title='预览并发布']").attr("disabled",true);
            }

        },
        /**
         * 进入预览
         * @param e
         */
        systemNoticePreview: function (e) {
            var data = window.top.topPage.getCurrentFormData(e);
            var _this = this;
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/vSystemAnnouncement/systemNoticePreview.html",
                data: data,
                success: function (data) {
                    //$("#mainFrame").html(data);
                    $("#edit-form-div").addClass("hide");
                    $("#mian-form-div").append(data);
                    _this.showLanguageNotice();
                    $(e.currentTarget).unlock();
                }
            });


        },

        showLanguageNotice: function () {
            $("#index_view_1").children().text("已编辑");
            $(".click_view_index").on("click", function (e) {
                var _this = e.currentTarget;
                var id = $(_this).attr("index");
                $(".click_view_index").each(function (e) {
                    var this_id = $(this).attr("index");
                    if(this_id==id){
                        $("#t_div_"+this_id).removeClass("hide");
                        $("#c_div_"+this_id).removeClass("hide");
                        $(this).addClass("current")
                        $(this).children().text("已编辑");
                    }else{
                        $("#t_div_"+this_id).addClass("hide");
                        $("#c_div_"+this_id).addClass("hide");
                        $(this).removeClass("current");
                        $(this).children().text("已编辑");
                    }
                });
            });
        },

        systemNoticePreviewLastStep: function (e) {
            $("#edit-form-div").removeClass("hide");
            $("#preview-form-div").remove();
            /*var data = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/vSystemAnnouncement/systemNotice.html",
                data: data,
                success: function (data) {
                    $("#mainFrame").html(data);
                }
            });
            $(e.currentTarget).unlock();*/

        },
        /**
         * 发送信息
         * @param e
         */
        saveSystemNotice: function (e) {
            var data = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type:"post",
                url: root + "/vSystemAnnouncement/saveSystemNotice.html",
                data: data,
                success: function (data) {
                    $("#mainFrame").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (e) {
                    $(e.currentTarget).unlock();
                }
            });

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
            that.ue[idx].options.urlParam = 'objId=1&catePath=cttDocument';
        },
        /**
         * 设置内容
         * @param val
         */
        setSendContent:function(i,val){
            if(this.ue[i]){
                this.ue[i].setContent(val);
            }
        },
        /**
         * 获取内容
         */
        getSendContent:function(i){
            if(this.ue[i]){
                return this.ue[i].getContent();
            }
        },
        getContentText: function (i) {
            if(this.ue[i]){
                //UE.getEditor('editor').getContentTxt()
                return this.ue[i].getContentTxt();
            }
        },
    });

});
