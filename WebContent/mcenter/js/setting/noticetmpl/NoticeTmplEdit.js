define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function(BaseEditPage) {
     return BaseEditPage.extend({

         // {‘zh_TW’：{‘title’:xxx,'content':yyyy},'zh_CN':{‘title’:xxx,'content':yyyy}}
         ue:null,
         langObj:{},
         $currentLang:$(".lang.current"),
         noticeTmplListJson : $("#noticeTmplListJson").html(),
         init : function() {
             this._super();
             var _this = this;
             if (!!_this.noticeTmplListJson) {
                 var _jsonAry = eval("("+_this.noticeTmplListJson+")");
                 !!_jsonAry&&$.each(_jsonAry,function (index,obj) {
                     _this.langObj[obj.locale] = {'title':obj.title,'content':obj.content};
                 });
             }
         },

         /**
          * 页面加载和异步加载时需要重新初始化的工作
          */
         onPageLoad: function () {
             this._super();
             var _this = this;
             /*复制语系*/
             $('#copy_lang li').on("click",function(){
                 // 语言代码
                 var currentCode = $(this).attr("lang-code");
                 _this.setSendContent(_this.langObj[currentCode].content);
                 $("#title").val(_this.langObj[currentCode].title);
                 var code = eval('('+$(".lang.current").attr('data-rel')+')').post
                 _this.langObj[code] = {title:_this.langObj[currentCode].title,content:_this.langObj[currentCode].content};
                 _this.changeEditStatus(_this.langObj[currentCode].title,_this.langObj[currentCode].content,false);
             });
         },

         bindEvent : function() {
             var _this = this;
             this._super();
             /*标题改变时 改为已编辑*/
             $("#title").on("keyup",function(){
                 if (_this.ue) {
                     _this.changeEditStatus($("#title").val().trim(),_this.ue.getContentTxt().trim(),true);
                 } else {
                     _this.changeEditStatus($("#title").val().trim(),$("#editContent").val().trim(),true);
                 }
             });

             $("#title").on("focus",function(){
                 $("#focusFlag").val("1");
             });

             $("#editContent").on("focus",function(){
                 $("#focusFlag").val("2");
             });

             $("input[type=checkbox]").on("click",function(){
                 // 选中短信模板展示提示信息
                 $(this).is(":checked")&&'sms'==$(this).val()&&$("#tip").css("display","block");
                 // 取消选中短信模板隐藏提示信息
                 $(this).is(":checked")||'sms'==$(this).val()&&$("#tip").css("display","none");
                 _this.resizeDialog();
             });

             /*如果是站内信 就不初始化编辑器*/
             if($("[name='result.publishMethod']").val() === 'email'){
                 //$("#editContent").on()
                 _this.initUEditor();
                // _this.resizeDialog();
             } else {
                 $("#editContent").on("keyup",function(){
                     _this.changeEditStatus($("#title").val().trim(),$("#editContent").val().trim(),true);
                 })
             };

             $("a.variable").on("click",_this.initTagBind);

             $("a.more").on("click",function(){
                 $("a.variable").show();
                 $("a.more").hide();
                 page.resizeDialog();
             });
         },

         initTagBind : function(){
            var label = $(this).children("span").text();
            if($("#focusFlag").val() != "1" && page.ue){
                page.ue.execCommand('insertHtml', label)
                // page.ue.setContent(page.ue.getContent()+label);
            }else{
                var obj =$("#editContent");
                if ($("#focusFlag").val() == "1") {
                    obj = $("#title");
                }
                var startPos =  obj[0].selectionStart;
                var endPos =  obj[0].selectionEnd;
                var newValue= obj.val().substring(0, startPos) + label + obj.val().substring(endPos, obj.val().length);
                obj.val(newValue);
            }
         },

         /**
          * 改变语言标签 编辑状态
          * @param obj
          */
         changeEditStatus:function(title,content,isRefresh){
             var $editStatusDom =  this.$currentLang.find('span');
             if (title=='' && content==''){
                 $editStatusDom.addClass("unedited");
                 $editStatusDom.text(this.$currentLang.find("span:first").attr("data-unedit-title"));
             }
             else if (title!='' && content!='') {
                 $editStatusDom.text($editStatusDom.attr("data-edited-title")).removeClass("unedited");
             } else {
                 $editStatusDom.hasClass('unedited')&&$editStatusDom.text($editStatusDom.attr("data-editting-title")).removeClass("unedited");
             }
             if (isRefresh) {
                 this.refreshLangObj(title,content,eval('('+$(".lang.current").attr('data-rel')+')').post);
             }
         },

         /**
          * 更改语言选项
          * @param e
          * @param p
          */
         changeLang:function(e,p){
             /*按钮 jquery对象*/
             var $currentLang = $(".lang.current");
             var $this_btn = this.$currentLang = $(e.currentTarget);

             /*当前语言个数*/
             var langLen = Number($("#langLen").val());
             /*同胞移除 选中class*/
             $this_btn.siblings().removeClass('current');
             /*添加选中class*/
             $this_btn.addClass('current');
             $this_btn.unlock();
             // 事件对象、标题内容，信息内容，语言
             this.afterChangeLang($currentLang,$("#title").val(),this.getSendContent(),eval('('+$this_btn.attr('data-rel')+')').post);
         },

         /**
          * 切换下一个语言 假分页
          * @param e
          * @param p
          */
         changeCurrentLang:function(e,p){

             try{
                 var $this_btn = $(e.currentTarget);
                 /*选择器范围*/
                 var thisFormSelector = this.formSelector;
                 /*当前选中的语言*/
                 var $currentLang = this.$currentLang = $(".lang.current");
                 /*当前语言个数*/
                 var langLen = Number($("#langLen").val());
                 /*一次最多显示语言数量*/
                 var maxLang = $('#maxLang').val();
                 /*移除当前选中的效果*/
                 $currentLang.removeClass('current');
                 /*下一步/下一个 */
                 if($this_btn.hasClass('next_lang')){

                     /*下一个选中语言的下标*/
                     var next = $currentLang.next(thisFormSelector  + " .lang").index() < 0 ?0:$currentLang.next(thisFormSelector +" .lang").index();
                     /*下一个选中的语言*/
                     var $next = $(thisFormSelector +' .lang').eq(next);
                     /*下一步*/
                     if($this_btn.hasClass('next_step')){
                         /*下一个是最后一个*/
                     }else{
                         /*下一个*/
                         $next.addClass("cuttent");
                     }
                     /*切换： 最后一个 或者 每页最后一个需要 切换*/
                     if(next===0||next%maxLang ===0){
                         /*隐藏所有语言*/
                         $(".lang").addClass('hide');
                         /*显示下一个语言直到fenge*/
                         $next.removeClass('hide').nextUntil('.fenge').removeClass('hide').next().removeClass('hide');
                     }
                     /*添加 下一个 选中效果*/
                     $next.addClass('current');

                 }else{
                     /*上一步*/
                     /*上一个选中语言的下标 (不会为第一个)*/
                     var previous = $currentLang.prev(thisFormSelector + ' .lang').index();
                     var $previous = $(thisFormSelector +' .lang').eq(previous);

                     $previous.addClass("current");

                 }
                 this.afterChangeLang($currentLang,$("#title").val(),this.getSendContent(),eval('('+$('.lang.current').attr('data-rel')+')').post);
             }finally{
                 $(e.currentTarget).unlock();
             }
         },

         /**
          * 改变语言后
          * @param obj 对应语言对象
          * @param title 标题
          * @param content 内容
          * @param currentCode 当前需要回显的语言code
          */
         afterChangeLang: function (obj,title,content,currentCode) {
             /*将当前输入 放入对象中*/
             var that = this;
             var $obj = $(obj);
             var $obj_span = $obj.find("span");
             var $option = eval("("+$obj.attr('data-rel')+")");
             var code = $option.post;
             var text = $option.dataType;

             /*复制语系ul*/
             var $copeLang = $("#copy_lang");
             /*将当前 编辑的放置到对象中*/
             that.langObj[code] = {title:title,content:content};
             /*回显*/
             if(currentCode){
                 if(that.langObj[currentCode]){
                     that.setSendContent(this.langObj[currentCode].content);
                     $("#title").val(this.langObj[currentCode].title);

                 }else{
                     $("#title").val('');
                     that.setSendContent('');
                 }
             }
             //改变编辑状态 将正在编辑改为 已编辑
             if($obj_span.attr('data-edited-title') === $obj_span.text().trim()){
                 /*添加到复制语系中*/
                 if(!$copeLang.find("li[lang-code='"+code+"']").attr('lang-code')){
                     var $li = $('<li class="temp"><a href="javascript:void(0)" class="co-gray"></a></li>');
                     $li.attr("lang-code",code).find('a').text(text);
                     // 解决下拉不断动态加载的问题 chosen:updated
                     $("#copy_lang").append($li).trigger("chosen:updated");
                     that.onPageLoad();
                 }
                 $("li[lang-code='"+currentCode+"']",$copeLang).remove();
             }
         },
         /**
          * 获取内容
          */
         getSendContent:function(){
             if(this.ue){
                 return this.ue.getContent();
             }else{
                 return $("#editContent").val();
             }
         },
         /**
          * 设置内容
          * @param val
          */
         setSendContent:function(val){
             if(this.ue){
                 this.ue.setContent(val);
             }else{
                 $("#editContent").val(val);
             }
         },

         showTip:function(e,option) {
             if ('sms'==$(e.currentTarget).attr("key")) {
                 $("#tip").css("display","");
             } else {
                 $("#tip").css("display","none");
             }
             this.resizeDialog();
         },

         saveNoticeTmpl:function(e,option) {
             var _this = this;
             /*var method = [];
             $("[name='result.publishMethod']:checked").each(function(){
                 method.push($(this).val());
             });*/
             //刷新当前编辑的语言数据
             _this.refreshLangObj($("#title").val(),_this.getSendContent(),eval("(" + $(".lang.current").attr("data-rel") + ")").post);
             var _langAry = [];
             for(var p in _this.langObj) {
                 var innerObj = {};
                 innerObj['lang'] = p;
                 innerObj['title']= _this.langObj[p]['title'];
                 innerObj['content']= _this.langObj[p]['content'];
                 _langAry.push(innerObj);
             }
             window.top.topPage.ajax({
                 type:"POST",
                 url:root+'/noticeTmpl/saveNoticeTmpl.html',
                 data:{'search.eventType':$("[name='result.eventType']").val(),'search.publishMethod':$("[name='result.publishMethod']").val(),
                     'search.langAry':JSON.stringify(_langAry),'search.groupCode':$("[name='result.groupCode']").val(),
                     'search.builtIn':$("[name='result.builtIn']").val(),'gb.token':$("[name='gb.token']").val(),
                     'search.tmplType':$("[name='result.tmplType']").val(),'search.active':$("[name='result.active']").val()
                 },
                 dataType:"JSON",
                 success:function(data){
                     if(data.state){
                         window.top.topPage.showSuccessMessage(data.msg, function () {
                             var type = eval('('+$(e.currentTarget).attr('data-rel')+')').type;
                             if (!!$("#addNotice").val()&&type!='noemail'){
                                 page.returnValue=data.groupCode+";"+data.eventType
                             } else{
                                 page.returnValue=true;
                             }
                             _this.closePage();
                         });

                     }else{
                         window.top.topPage.showErrorMessage(data.msg);
                     }
                 }
             });
             $(e.currentTarget).unlock();
         },

         /**
          * 内置模板且是手机短信的恢复默认
          * @param e
          * @param option
          */
         fillDefault:function(e,option) {
             var _this = this;
             window.top.topPage.ajax({
                 type:"POST",
                 url:root+'/noticeTmpl/fillDefault.html',
                 data:{'result.groupCode':$("[name='result.groupCode']").val(),'result.publishMethod':$("[name='result.publishMethod']").val()},
                 dataType:"JSON",
                 error:function(data){
                 },
                 success:function(data){
                     var currentCode = eval('('+$('.lang.current').attr('data-rel')+')').post;
                     $.each(data,function (index,obj) {
                         //_this.langObj[obj.locale] = {'title':obj.defaultTitle,'content':obj.defaultContent};
                         if(currentCode==obj.locale){
                             _this.setSendContent(obj.defaultContent);
                             $("#title").val(obj.defaultTitle);
                         }
                     });
                 }
             });
             $(e.currentTarget).unlock();
         },

         /**
          * 初始化 ueditor
          */
         initUEditor:function(){
             var that = this;
             this.ue = UE.getEditor('editContent',{
                 enableAutoSave:false,/*是否自动保存*/
                 initialFrameWidth:($(window.document).width() *.9),/*初始化编辑器宽度*/
                 initialFrameHeight:200,/*初始化编辑器宽度*/
                 maximumWords:20000,
                 autoHeightEnabled:false/*是否自动长高*/
             });
             /*contentChange*/
             this.ue.addListener( 'contentChange', function( editor ) {
                 /*if(that.ue.getContentTxt().trim()){

                 }*/
                 that.changeEditStatus($("#title").val().trim(),that.ue.getContentTxt().trim(),true);
                 /*if(that.ue.hasContents()){
                     that.changeEditStatus();
                 }*/
             });
             this.ue.addListener( 'focus', function( ) {
                 $("#focusFlag").val("2");
             });
             this.ue.ready(function(){
                 that.resizeDialog()
             })
         },

         /**
          * 保存或更新前验证
          * @param e   事件对象
          * @return 验证是否通过
          */
         _validateForm: function(e) {
             var $form = $(window.top.topPage.getCurrentForm(e));
             var valid = !$form.valid || $form.valid();
             if(!valid){
                 $(e.currentTarget).unlock();
                 return false;
             }
             var _this = this;
             var len = 0;
             var publishMethod = $("[name='result.publishMethod']").val();
             for(var p in _this.langObj) {
                 if (_this.langObj[p].title && _this.langObj[p].content){
                     len++;
                 }
                 if (publishMethod=='siteMsg' && _this.langObj[p].content.trim().length>1000) {
                     window.top.topPage.showWarningMessage(window.top.message.setting["notice.siteMsg.maxcontent"]);
                     return false;
                 }
             }
             if (len<$('.lang').length) {
                 //window.top.message.setting['notice.all.lang.edit']
                 window.top.topPage.showWarningMessage(window.top.message.setting_auto['标题或内容不能为空']);
                 return false;
             }

             $(e.currentTarget).unlock();
             return true;
         },

         /**
          * 刷新内容,即使不切换语言情况下
          * @param title
          * @param content
          * @param currentCode
          */
         refreshLangObj:function(title,content,currentCode) {
             this.langObj[currentCode] = {'title':title,'content':content};
         },

         /**
          * 标签变更
          * @param e
          * @param option
          */
         changeTag:function(e,option) {
             var _this = this;
            var eventTypeVal = select.getValue("[name='result.eventType']");
            $("a.variable").remove();
            if (!!eventTypeVal) {
                window.top.topPage.ajax({
                    type:"POST",
                    url:root+'/noticeTmpl/getNoticeParam.html',
                    data:{'search.eventType':eventTypeVal},
                    dataType:"JSON",
                    error:function(data){
                    },
                    success:function(data){
                        $.each(data,function (index,obj) {
                            if (index<3) {
                                $("a.more").before("<a href='javascript:void(0)' class='variable'>"+window.top.message.setting[obj.paramName]+"<span>"+obj.paramCode+"</span></a>");
                            } else {
                                $("a.more").before("<a href='javascript:void(0)' class='variable' style='display: none;'>"+window.top.message.setting[obj.paramName]+"<span>"+obj.paramCode+"</span></a>");
                            }
                            $("a.more").show();
                        });
                        $("a.variable").on("click",_this.initTagBind);
                        _this.resizeDialog();
                    }
                });
                $(e.currentTarget).unlock();
            }
         }
    });
});
