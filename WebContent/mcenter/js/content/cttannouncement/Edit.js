//模板页面
define(['common/BaseEditPage'], function(BaseEditPage) {

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
            //是否定时
            if($("input[name='task']").val()=="true"){
                $("#task").attr("checked","true");
                $(".date").removeClass("hide");
            }

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
            this.initEditContentEvent();//修改编辑状态
            var timing=$("#is_task").val();
            if(timing=="true"){
              $(".i-checks").click();
            }
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //回车提交
            this.enterSubmit("._enter_submit");
            //这里初始化所有的事件
            $(this.formSelector).on("click",".i-checks",function(){
                $("input[name='task']").val($(this).is(':checked'));
                _this.showDateFidld();
            }) ;
            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                var oldIdx=Number($(".current").attr("tagIndex"));
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".ann").hide();
                $(".content"+local).show();
                $("[name=tag]").each(function (e) {
                    var tagId=$(this).attr('tagindex');
                    var this_local=$(this).attr('local');
                    if(local==this_local){
                        $("#span"+this_local).text(window.top.message.content_auto['编辑中']);
                    }else{
                       /* var title = $("input[name='result["+(Number(tagId)-1)+"].title']").val();*/
                        var content = $("textarea[name='result["+(Number(tagId)-1)+"].content']").val();
                        if (content.length > 0) {
                            $("#span"+this_local).text(window.top.message.content_auto['已编辑']);
                        } else {
                            $("#span"+this_local).text(window.top.message.content_auto['未编辑']);
                        }
                    }
                });

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
                var sourceContent=$(".titleVal"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".titleVal"+targetLocal).val(sourceContent);

                var sourceContent=$(".contentVal"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".contentVal"+targetLocal).val(sourceContent);

                _this.checkForNext();

            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "textarea,input", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    $(".a_"+attr).formtip(message);
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

            $(this.formSelector).on("click","a[name='targetTag']", function () {
                var local=$(this).attr("local");
                $(".ann_target").hide();
                $("a[name='targetTag']").removeClass("current");
                $(this).addClass("current");
                $(".content"+local).show();
            });
            //预览下一步
        },
        /**
         * 初始化输入框的文本事件,修改编辑状态
         */
        initEditContentEvent:function(){
            var $this = this;
            if($("[name=tag]",this.formSelector).length>1){
                $(".titleSource,.contentSource").on("keyup",function(){
                    $this.checkForNext();
                })
            }else{
                $(".preview").removeClass("hide");
            }
        },
        checkForNext: function () {
            var checkTitle = true;
            var checkContent = true;
            $(".titleSource").each(function (e) {
                if($(this).val() == ""){
                    checkTitle = false;
                    return;
                }
            });

            $(".contentSource").each(function(){
                if($(this).val() == ""){
                    checkContent = false;
                    return;
                }
            });
            if(checkTitle&&checkContent){
                var oldIdx=Number($(".current").attr("tagIndex"));
                var langSize=Number($("[name='langSize']").val());
                if(oldIdx==langSize){
                    $(".preview").removeClass("hide");
                }
            }else{
                $(".preview").addClass("hide");
            }
        },
        /**
         * 下一步
         * @param e
         * @param opt
         */
        next: function(e,opt) {
            var tagIndex=Number($(".current").attr("tagIndex"));
            var langSize=Number($("[name='langSize']").val());
            if(tagIndex<langSize){
                tagIndex=tagIndex+1;
                $(".tag"+tagIndex).click();
                $(".previous_lang").removeClass("hide");
            }else if(tagIndex == langSize){
                $(".next_lang").addClass("hide");
                this.checkForNext();
            }

            $(e.currentTarget).unlock();
        },
        /**
         * 上一步
         * @param e
         * @param opt
         */
        previous: function (e,opt) {
            var tagIndex=Number($(".current").attr("tagIndex"));
            var langSize=Number($("[name='langSize']").val());
            if(tagIndex>1){
                tagIndex=tagIndex-1;
                $(".tag"+tagIndex).click();
                if(tagIndex==1){
                    $(".previous_lang").addClass("hide");
                }
            }
            $(".next_lang").removeClass("hide");
            $(".preview").addClass("hide");
            $(e.currentTarget).unlock();
        },
        /**
         * 设置是否定时发送
         */
        showDateFidld:function(){
            if($(".i-checks").is(":checked")){
                $(".date").removeClass("hide")
            }else{
                $(".date").addClass("hide")
                $("input[name='timing']").val("");
            }
        },
        saveValid: function (e) {
            if (!this.validateForm(e)) {
                return false;
            }
            var task=$("#task").is(':checked');
            if(!task){
               $("[name='timing']").val("");
            }
            return true;
        },
        Preview: function (e) {
            $(".target0").click();
            $("#resource").addClass("hide");
            $("#target").removeClass("hide");

            $(".contentSource").each(function (index) {
                var language=$(this).attr("tt");
                /*var title=$(this).val();*/
                var content=$("[name='result["+index+"].content']").val();
              /*  $(".targetTitleVal"+language).val(title);*/
                $(".targetContent"+language).val(content);
            });

            if($("[name='countdown']")!=undefined){
                var countdown = $("[name='countdown']").val();
                $("#countdown").text(countdown+"s");
            }

            var type = $("[name='announcementType']").attr('title');
            $("#targetType").text(type);

            $(e.currentTarget).unlock();
            var task=$("#task").is(':checked');
            if(task){
                $("#showTime").text($("[name='timing']").val());
            }
        },
        returnEdit: function (e) {
            $("#target").addClass("hide");
            $("#resource").removeClass("hide");
            $("#tag1").click();
            $(e.currentTarget).unlock();
        }
    });
});