/**
 * Created by Orange on 2015-11-17
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.copyLanguage();
            this.initEditContentEvent();
            this.checkForNext();

            //计算文本字数
            /*$('input').bind('input propertychange', function () {
                if ($(this).val().length <= 100) {
                    $(this).next().html($(this).val().length + "/100");
                }
            });*/
            $('textarea').bind('input propertychange', function () {
                if ($(this).val().length <= 2000) {
                    $(this).next().html($(this).val().length + "/2000");
                }
            });

            //返回上一页，还原输入框的现有字数
            for(var i=0;i<$(".div_length").length;i++){
               // var title_len = $("input[name='title["+i+"]']").val().length;
                //$(".msg"+i).html(title_len+"/100");
                var content_len = $("textarea[name='content["+i+"]']").val().length;
                $(".textareaMsg"+i).html(content_len+"/2000");
                if(content_len>0){
                    $("#index_"+i).children().text("已编辑");
                }
            }

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
                        //var title = $("input[name='title["+this_id+"]']").val();
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

            //隐藏显示对应的描述
            $(".announcement").on("click",function (e) {
                var val = $(this).val();
                if(val=='system_announcement'){
                    $(".system_announcement").removeClass("hide");
                    $(".operator_announcement").addClass("hide");
                }
                if(val=='operator_announcement'){
                    $(".operator_announcement").removeClass("hide");
                    $(".system_announcement").addClass("hide");
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
            var $this = this;
            $(".co-gray").on("click", function (e) {
                var copy_language=$(this).attr("copy-language");
                var number = $("[language='"+copy_language+"']").prop("id").substr(4,5);

                //var title = $("input[name='title["+number+"]']").val();
                var textarea = $("textarea[name='content["+number+"]']").val();
                //var title_number = $("input[name='title["+number+"]']").next().text();
                var content_number = $("textarea[name='content["+number+"]']").next().text();

                var current_id = $(".current").prop("id").substr(6,7);
                //$("input[name='title["+current_id+"]']").val("");
                //$("input[name='title["+current_id+"]']").val(title);
                //$("input[name='title["+current_id+"]']").next().text(title_number);
                $("textarea[name='content["+current_id+"]']").val("");
                $("textarea[name='content["+current_id+"]']").val(textarea);
                $("textarea[name='content["+current_id+"]']").next().text(content_number);
                $this.checkForNext();
            });
        },
        /**
         * 初始化输入框的文本事件
         */
        initEditContentEvent:function(){
            var $this = this;
            $(".p-r-70,.p-b-30").on("keyup",function(){
                $this.checkForNext();
            })
        },

        checkForNext: function () {
            //var checkTitle = true;
            var checkContent = true;
           /* $(".p-r-70").each(function (e) {
                if($(this).val() == ""){
                    checkTitle = false;
                    return;
                }
            });*/

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
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/systemAnnouncement/systemNoticePreview.html",
                data: data,
                success: function (data) {
                    $("#mainFrame").html(data);
                }
            });
            $(e.currentTarget).unlock();

        }


    });

});
