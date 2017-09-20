define(['common/BaseEditPage','bootstrapswitch'], function(BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var _this = this;
        },
        /**
         * 当前对象事件初始化函数
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
            $(this.formSelector).on("click","a[name='pretag']", function () {
                $("a[name='pretag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".preann").hide();
                $(".precontent"+local).show();
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var targetLocal=$(".current").attr("local");


                var sourceContent=$("#title"+sourceLocal).val();
                $("#title"+targetLocal).val(sourceContent);

                sourceContent=$("#content"+sourceLocal).val();
                $("#content"+targetLocal).val(sourceContent);
            });

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input,textarea", function (e,message) {
                if(message){
                    if($(this).is(":hidden")){
                        var attr = $(this).attr("tt");
                        if(attr){
                            $(".a_"+attr).formtip(message);
                            e.result=true;
                        }
                    }
                }
                else{
                    if($(e.currentTarget).attr("type")=="radio"){
                        $("input[name='announcement.releaseMode']").parent().removeClass("error");
                    }
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

            $(this.formSelector).on("click","a[name='pretag']", function () {
                var local=$(this).attr("local");
                $("#precurLanguage").val($(this).attr("tagIndex"));
            });

            //显示隐藏定时发布时间
            $("[name='time']").click(function(){
                if($(this).prop("checked")){
                    $("#publishDiv").removeClass("hide");
                    $("[name='announcement.timingSend']").val("true");
                }else{
                    $("#publishDiv").addClass("hide");
                    $("[name='announcement.timingSend']").val("false");
                }
            });
        },

        /**
         * 预览账号维护
         * @param e
         * @param option
         */
        previewMaintain:function(e,option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root+'/vPlatformManage/previewMaintain.html',
                data:window.top.topPage.getCurrentFormData(e),
                cache: false,
                type: "POST",
                success: function (data) {
                    $("[name=editor]",_this.formSelector).hide();
                    $("div.addFoot").hide();
                    $("div.modal-body").append(data);
                    $("div.preFoot").show();
                    page.resizeDialog();
                    e.page.onPageLoad();
                }
            });
            $(e.currentTarget).unlock();
        },

        /**
         * 取消预览
         * @param e
         * @param option
         */
        cancelPreview:function(e,option) {
            $("[name=editor]",this.formSelector).show();
            $("[name=preview]",this.formSelector).remove();
            $("div.addFoot").show();
            $("div.preFoot").hide();
            page.resizeDialog();
            $(e.currentTarget).unlock();
        },

        /**
         * 提交
         * @param e
         * @param btnOption
         */
        submitMaintain:function(e,btnOption){//提交
            this.cancelPreview(e,btnOption);
            this.saveMaintain();
        },

        /**
         * 提交信息
         */
        saveMaintain:function(){
            var url=root+"/vPlatformManage/saveMaintain.html";
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
                        window.top.topPage.showSuccessMessage(data.msg,null);
                    }else{
                        window.top.topPage.showErrorMessage(data.msg,null);
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
            var url=root+"/vPlatformManage/turnNormal.html";
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

        changeCurrentLang:function(e,p){
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
    });
});