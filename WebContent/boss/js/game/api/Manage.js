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
            //$(".check-box").bootstrapSwitch();
            /*$(".form-textarea").each(function(idx,item){
                _this.initUEditor(idx);
            });*/
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
            var hasSet = $("#hasSetCount").val();
            var allCount = $("#allSchemeCount").val();
            if(hasSet!=allCount){
                //$("input:radio[value='disable']").attr('checked', true);
                $(".status").prop("disabled",true);
                $("#confirmDiv").addClass("hide");

            }
        },
        /**
         * 当前页面所有事件初始化函数
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
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    if(attr){
                        $(".a_"+attr).formtip(message);
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
            //显示隐藏定时发布时间
            $(".publish").click(function(){
                if($(this).prop("checked")){
                    $("#publishDiv").removeClass("hide");
                    $("#timingSend").val("true");
                }else{
                    $("#publishDiv").addClass("hide");
                    $("#timingSend").val("false");
                }
            });
            $(".status").each(function(idx,item){
                var status = $("#status").val();
                $(item).click(function(){
                    if(status=='disable'){
                        if($(this).val()=="maintain"){
                            $("#normalTipsDiv").addClass("hide");
                            $("#confirmDiv").addClass("hide");
                            $("#maintainDiv").removeClass("hide");
                            $("#previewBtnDiv").removeClass("hide");
                        }else if($(this).val()=="normal"){
                            $("#previewBtnDiv").addClass("hide");
                            $("#maintainDetailDiv").addClass("hide");
                            $("#maintainDiv").addClass("hide");
                            $("#confirmDiv").removeClass("hide");
                            $("#normalTipsDiv").removeClass("hide");
                        }else{
                            $("#normalTipsDiv").addClass("hide");
                            $("#maintainDetailDiv").addClass("hide");
                            $("#maintainDiv").addClass("hide");
                            $("#previewBtnDiv").addClass("hide");
                            $("#confirmDiv").addClass("hide");
                        }
                    }else if(status=="normal"){
                        if($(this).val()=="maintain"){
                            $("#confirmDiv").addClass("hide");
                            $("#maintainDiv").removeClass("hide");
                            $("#previewBtnDiv").removeClass("hide");
                            $("#normalTipsDiv").addClass("hide");
                            $("#disableTipsDiv").addClass("hide");
                        }else if($(this).val()=="disable"){
                            $("#previewBtnDiv").addClass("hide");
                            $("#maintainDiv").addClass("hide");
                            $(".confirm-btn").html(window.top.message.common['continueStop']);
                            $("#confirmDiv").removeClass("hide");
                            $("#disableTipsDiv").removeClass("hide");
                        }else{
                            $(".confirm-btn").html(window.top.message.serve['apiManage.OK']);
                            $("#previewBtnDiv").addClass("hide");
                            $("#maintainDetailDiv").addClass("hide");
                            $("#maintainDiv").addClass("hide");
                            $("#confirmDiv").addClass("hide");
                            $("#disableTipsDiv").addClass("hide");
                        }
                    }else{
                        if($(this).val()=="normal"){
                            $(".confirm-btn").html(window.top.message.serve['apiManage.OK']);
                            $("#previewBtnDiv").addClass("hide");
                            $("#maintainDetailDiv").addClass("hide");
                            $("#maintainDiv").addClass("hide");
                            $("#confirmDiv").removeClass("hide");
                            $("#normalTipsDiv").removeClass("hide");
                            $("#disableTipsDiv").addClass("hide");
                        }else if($(this).val()=="disable"){
                            $(".confirm-btn").html(window.top.message.common['continueStop']);
                            $("#confirmDiv").removeClass("hide");
                            $("#disableTipsDiv").removeClass("hide");
                            $("#normalTipsDiv").addClass("hide");
                            $("#maintainDetailDiv").addClass("hide");
                            $("#maintainDiv").addClass("hide");
                        }else{
                            $("#maintainDetailDiv").removeClass("hide");
                            $("#maintainDiv").addClass("hide");
                            $(".confirm-btn").html(window.top.message.serve['apiManage.OK']);
                            $("#normalTipsDiv").addClass("hide");
                            $("#disableTipsDiv").addClass("hide");
                            $("#confirmDiv").addClass("hide");
                        }
                    }
                    page.resizeDialog();
                });
            });
            $(".form-textarea").each(function(idx,item){
                $(item).change(function () {
                    var flag = false;
                    $(".form-textarea").each(function(idx,content){
                        if($(content).val()!=''){
                            flag = true;
                        }
                    });
                    if(flag){
                        $("[name='hasContent']").val("true");
                    }else{
                        $("[name='hasContent']").val("");
                    }
                });
            })

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
         * 初始化 ueditor
         */
        initUEditor:function(idx){
            var that = this;
            UE.delEditor('editContent'+idx);
            this.ue[idx] = UE.getEditor('editContent'+idx,{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:($(window.document).width() *.9),/*初始化编辑器宽度*/
                initialFrameHeight:200,/*初始化编辑器宽度*/
                autoHeightEnabled:false/*是否自动长高*/
            });
            /*contentChange*/
            this.ue[idx].addListener( 'contentChange', function( editor ) {

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
        savePreview:function(e,opt){
            var _this = this;
            var data = _this.getCurrentFormData(e);
            window.top.topPage.ajax({
                url: root+'/api/savePreview.html',
                data:data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $("#editor",_this.formSelector).hide();
                    $(".modal-body").append(data);
                    $("#showPreviewDiv").removeClass("hide");
                    $("#confirmDiv").addClass("hide");
                    $("#previewBtnDiv").addClass("hide");
                    page.resizeDialog();
                }
            });
            $(e.currentTarget).unlock();
        },
        preStep:function(e,opt){
            var _this = this;
            $("#previewDiv").remove();
            $("#editor").show();
            $("#showPreviewDiv").addClass("hide");
            $("#confirmDiv").addClass("hide");
            $("#previewBtnDiv").removeClass("hide");
            page.resizeDialog();
            $(e.currentTarget).unlock();
        },
        toSetScheme : function(e,opt){
            var _this = this;
            _this.returnValue ='toSetScheme?search.apiId='+$("#apiId").val();
            this.closePage();
        },

        preSaveConfirm: function (e, opt) {
            var _this = this;
            var status = $("[name='result.status']:checked").val();
            if(status=="disable"){
                window.top.topPage.ajax({
                    url: root+'/api/fetchApiBalance.html?search.id='+$("#apiId").val(),
                    cache: false,
                    type: "POST",
                    dataType:"JSON",
                    success: function (data) {
                        if(data.balance&&data.balance>=0){
                            var msg = window.top.message.serve['apiManage.disableApiTips'];
                            if(msg){
                                msg = msg.replace("{apiBanalce}",data.balance);
                            }
                            window.top.topPage.showConfirmDynamic(window.top.message.common['manage'],msg,
                                window.top.message.common['OK'],window.top.message.common['cancel'], function (state) {
                                if(state){
                                    window.top.topPage.doAjax(e, opt);
                                }
                            });
                        }else{
                            window.top.topPage.doAjax(e, opt);
                        }
                    }
                });
                //var msg = "当前API余额为123.12,停用后将收回该API的资金到各玩家钱包!";


            }else{
                return true;
            }
            return false;
        },
        myCallBack: function (e, opt) {
            if(opt.data.result.systemStatus=="disable"){
                this.returnValue = "fromDisable";
            }else{
                this.returnValue = true;
            }
            window.top.topPage.closeDialog();
        }

    });
});