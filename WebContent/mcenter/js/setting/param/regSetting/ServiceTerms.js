//模板页面
define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function(BaseEditPage) {

    return BaseEditPage.extend({
        hint: false,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        ue:[],
        init: function (title) {
            this.formSelector = "form";
            this._super();
            var _this = this;
            $(".form-textarea").each(function(idx,item){
                _this.initUEditor(idx);
            });
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
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            $('textarea').on('change', function () {
                _this.hint = true;
            })
            $("#li_top_2").addClass("active");
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $(this.formSelector).on("click","a[name='tag']", function () {
                var local=$(this).attr("local");
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                $(".ann").hide();
                $(".content"+local).show();
                var tabIndex = $(this).attr("tagIndex");
                $("#curLanguage").val(tabIndex);

                $(".tab-pane").each(function(index,item){
                    var lang = $(item).attr("lang");
                    if(_this.getSendContent(index)==""){
                        $("#span"+lang).text(window.top.message.setting['switch.CloseReminder.unedited']);
                    }else{
                        $("#option"+lang).removeClass("hide");
                        $("#span"+lang).text(window.top.message.setting['switch.CloseReminder.edited']);
                    }
                    if(local==lang){
                        $("#option"+lang).addClass("hide");
                    }
                });
                $("#span"+local).text(window.top.message.setting['switch.CloseReminder.editing']);
                //编辑文字修改
                /*var current=$(".current").attr("local");
                var text=$("#text_"+current).val();
                if(text.length<20){
                    $("#span"+current).text(window.top.message.setting['switch.CloseReminder.unedited']);
                }else{
                    $("#span"+current).text(window.top.message.setting['switch.CloseReminder.edited']);
                }

                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $("#span"+local).text(window.top.message.setting['switch.CloseReminder.editing']);
               $(".form-control").hide();
                $("#text_"+local).show();
                $("#span"+local).text();


                $(".form-control").each(function () {
                    var textVal=$(this).val();
                    var localCopy=$(this).attr('local');
                    if(textVal.length>20){
                       $("#option"+localCopy).show();
                    }else{
                        $("#option"+localCopy).hide();
                    }
                    if(local==localCopy){
                        $("#option"+localCopy).hide();
                    }
                });*/
            });
            //下一个语言
            $(this.formSelector).on("click","#next", function () {
                var siteSize= parseInt($(".current").attr('siteSize'));
                var tagIndex=parseInt($(".current").attr('tagIndex'));
                //$("a[name='tag']").removeClass("current");
                if(tagIndex+1<siteSize){
                    $("#tag"+(tagIndex+1)).click();

                }
                if(tagIndex+1==siteSize){
                    $("#tag0").click();
                }
                var local=$(".current").attr('local');
                $(".ann").hide();
                $(".content"+local).show();
                /*$(".form-control").hide();
                var local=$(".current").attr('local');
                $("#text_"+local).show();*/
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                /*var sourceLocal=$(this).attr("local");
                var sourceVal=$("#text_"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $("#text_"+targetLocal).val(sourceVal);*/
                var sourceorderIndex=$(this).attr("orderIndex");
                var targetOrderIndex = $(".current").attr("tagIndex");
                var introduce = _this.getSendContent(sourceorderIndex);
                _this.setSendContent(targetOrderIndex,introduce);
            });
            $(this.formSelector).on("blur",".form-control", function () {
                var local=$(this).attr("local");

                if($(this).val().length<20){
                    $("#span"+local).text(window.top.message.setting['switch.CloseReminder.unedited']);
                }
            })




            //回复默认文案
            /*$(this.formSelector).on("click","#revert", function () {
                $(".defaultValue").each(function () {
                    $(this).next().val($(this).val());
                });
            });*/
            //强制显示是否禁用
            $(this.formSelector).on("change","[name='phoneParam.paramValue']", function () {
                var stat=$(this).val();
               if(stat=="true"){
                   $("[name='mailParam.paramValue']").removeAttr("disabled");
               }else{
                   $("[name='mailParam.paramValue']").attr("disabled","true");
               }
            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "textarea", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    $(".a_"+attr).formtip(message);
                    e.result=true;
                }
                else{
                    e.result=false;
                }
            });
        },
        /**
         * 关闭页面前判断页面是否编辑过，有则提示
         * @param e
         * @param opt
         */
        close: function (e) {
            var _this = this;
            var a = this.hint
            if (a) {
                window.top.topPage.showConfirmMessage(window.top.message.setting['serviceTrems.notSave'], function (d) {
                    if (d == true) {
                        window.top.topPage.goToLastPage(e);
                    } else {
                        $(e.currentTarget).unlock();
                    }
                });
            } else {

                window.top.topPage.goToLastPage(e);
            }
        },
        /**
         * 初始化 ueditor
         */
        initUEditor:function(idx){
            var that = this;
            UE.delEditor('editContent'+idx);
            var width = $("#editContent"+idx).width;
            this.ue[idx] = UE.getEditor('editContent'+idx,{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:width,/*初始化编辑器宽度($(window.document).width() *.9)*/
                initialFrameHeight:500,/*初始化编辑器宽度*/
                autoHeightEnabled:false,/*是否自动长高*/
                maximumWords:20000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    "fontfamily", 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript',
                    'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|',
                    'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment'
                ]],

            });
            that.ue[idx].options.imageUrlPrefix=window.top.imgRoot+"/files/";
            that.ue[idx].options.urlParam = 'objId=1&catePath=serviceTerms';
            /*contentChange*/
            that.ue[idx].addListener( 'contentChange', function( editor ) {
            });
            that.ue[idx].ready(function(){
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
        getContentText: function (idx) {
            if(this.ue[idx]){
                return this.ue[idx].getContentTxt();
            }
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        myValidateForm: function(e,opt) {
            var _this = this;
            $("input[name$='orginContent']").each(function (idx, item) {
                var textIdx = $(item).attr("indexId");
                var content = _this.getContentText(textIdx);
                $(item).val(content);
            });

            if (!_this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },

        /**
         * 恢复默认协议
         */
        resetDefault: function (e,opt) {
            /*var lsize = $('[name="lsize"]').val();
            var that = this;
            for (var i = 0; i<lsize; i++) {
                var dp = $('[name="siteI18nList[' + i + '].defaultValue"]').val();
                $('[name="siteI18nList['+i+'].value"]').html(dp);
                this.setSendContent(i, dp);
            }*/
            $(e.currentTarget).unlock();
            this.getDefaultValue();

        },

        getDefaultValue: function () {
            var _this = this;
            var language = "";
            var tagIndex = "0";
            var curLang = $(".current");
            if(curLang.length>0){
                language = $(curLang[0]).attr("local");
                tagIndex = $(curLang[0]).attr("tagIndex");
            }
            if(language==""){
                window.top.topPage.showWarningMessage(window.top.message.setting_auto['未知语言版本']);
                return;
            }
            window.top.topPage.ajax({
                type:"POST",
                url:root+'/param/getDefaultServiceTerms.html',
                dataType:"JSON",
                data:{'search.locale':language,'type':$("#type").val()},
                error:function(data){
                    window.top.topPage.showInfoMessage(window.top.message.setting_auto['请求出错']);
                },
                success:function(data){
                    if(data.state){
                        _this.setSendContent(tagIndex, data.serviceTerms);
                    }else{
                        window.top.topPage.showInfoMessage(window.top.message.content['gameManage.noFoundData']);
                    }
                }
            });
        }
    });
});