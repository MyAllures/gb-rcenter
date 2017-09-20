define(['common/BaseEditPage','bootstrapswitch', 'jqFileInput', 'css!themesCss/fileinput/fileinput'], function(BaseEditPage,Bootstrapswitch,fileinput) {
     return BaseEditPage.extend({

         init : function() {
            this._super();
         },

         /**
          * 页面加载和异步加载时需要重新初始化的工作
          */
         onPageLoad: function () {
             this._super();
             var _this = this;
             /*_this.unInitFileInput($('.file')).fileinput({
                 showUpload: false,
                 maxFileCount: 1,
                 mainClass: "input-group",
                 removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                 browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                 allowedFileExtensions: ['mp3']
             });
             $('.file').bind("fileloaded", function (e) {
                 $("#toneDetail").css("display","block");
                 _this.resizeDialog();
             });
             $('.file').bind("fileselect",function(e){
                 _this.resizeDialog();
             });
             $('.file').change(function(e){
                 var files = this.files;
                 var fileSize = ((files[0].size || 0) / 1000/1000).toFixed(3);
                 if (fileSize>1) {
                     window.top.topPage.showWarningMessage(window.top.message.setting["preference.tone.size.limit"],function(e){
                         $("button.fileinput-remove").trigger("click");
                         //_this.raise('fileclear');
                     });
                     return;
                 }
                 var title = $('.file').val();
                 var subfix = title&&title.split('.')[1];
                 $("#detail").text(fileSize.toString()+"/"+subfix);
             });*/
         },

         bindEvent : function() {
             var _this = this;
             this._super();

             var $bootstrapSwitch = $("[name$='active'][type='checkbox']");
             this.unInitSwitch($bootstrapSwitch)
                 .bootstrapSwitch({
                     onText: window.top.message.setting['floatPic.display.on'],
                     offText: window.top.message.setting['floatPic.display.off'],
                     onSwitchChange: function (e, state) {
                         var _target = e.currentTarget;
                         var $preferenceItem = $(_target).parents("tr:first").children("td:first").text();
                         var msg = "";
                         if (!$(_target).attr("isChanged")) {
                             if (state) {
                                 msg = (window.top.message.setting['preference.open']).replace("{item}",$preferenceItem);
                             } else {
                                 msg = (window.top.message.setting['preference.close']).replace("{item}",$preferenceItem);
                             }
                             window.top.topPage.showConfirmMessage(msg, function (confirm) {
                                 if (confirm) {
                                     $(_target).attr("isChanged", true);
                                     $(_target).bootstrapSwitch("state", !_target.checked);
                                     if (state) {
                                         $("#"+$(_target).attr("hidId")).val("true");
                                     } else {
                                         $("#"+$(_target).attr("hidId")).val("false");
                                     }
                                 }
                             });
                         } else {
                             $(_target).removeAttr("isChanged");
                             return true;
                         }
                         return false;
                     }
                 }
             );

             $("#remind input[type=checkbox]").on("click", function () {
                 var paramValue = [];
                 var checks = $(this).parent().parent().find("input[type=checkbox]");
                 if ($(checks[0]).is(":checked"))
                     paramValue.push("1");
                 if ($(checks[1]).is(":checked"))
                     paramValue.push("2");
                 $(this).parent().siblings(":last").val(paramValue.join('#'));
             });

             $(".site-switch .dd-list dd").on("mouseover",function(){
                 $(this).addClass("shut");
             });

             $(".site-switch .dd-list dd").on("mouseleave",function(){
                 $(this).removeClass("shut");
             });
             $("#li_top_5").addClass("active");

         },

         /**
          * 恢复系统默认
          * @param e
          * @param option
          */
         resetPreference: function(e,option) {
             var _this = this;
            window.top.topPage.ajax({
                url:root+'/setting/ccenterPreference/resetPreference.html',
                success:function(data){
                    window.top.topPage.showSuccessMessage(window.top.message.setting['reset.preference.success']);
                    _this.loadHtml();
                },
                error:function(data) {
                    window.top.topPage.showSuccessMessage(window.top.message.setting['reset.preference.fail']);
                }
            });
            $(e.currentTarget).unlock();
         },

         /**
          * 新增快捷菜单
          * @param e
          * @param option
          */
         /*loadShortcutMenu:function(e,option){
             var that = this;
             window.top.topPage.ajax({
                 type: "GET",
                 url: root+"/userShortcutMenu/getShortcutMenu.html",
                 error: function (request) {

                 },
                 success: function (data) {
                     that.loadHtml();
                 }
             });
             //that.bindButtonEvents();
         },*/

         /**
          * 操作成功后，ajax获取页面html refresh
          */
         loadHtml:function() {
             window.top.topPage.ajax({
                 url: root + '/setting/ccenterPreference/index.html',
                 success: function (data) {
                     $("#mainFrame").html(data);
                 }
             });
         },

         /**
          * 回调,重新加载页面
          * @param e
          * @param option
          */
         reload:function(e,option) {
             this.loadHtml();
         },

         /**
          * 提交
          * @param e
          * @param opt
          * @returns {boolean}
          */
         /*valiDateFormAndUploadTone: function (e, opt) {
             e.objId = $("[name='result.id']").val();
             e.catePath = 'settingTone';
             this.uploadAllFiles(e, opt);
             if (!this.validateForm(e)) {
                 window.top.topPage.showWarningMessage(window.top.message.setting['preference.upload.fail']);
                 return false;
             }
             $(e.currentTarget).unlock();
             return true;
         },*/

         validateForm:function(event) {
             var paramValue = $("[name='result.paramValue']").val();
             if (paramValue)
                return true;
             else
                return false;
         },

         _validateForm:function(e,option) {
             var paramValue = $("[name='mstSites.mainLanguage']").val();
             if (paramValue)
                 return true;
             else
                 return false;
         },

         checkOne:function(e,option) {
             var chk = $("[name='result.paramValue']:checked").val();
             if (!chk) {
                 window.top.topPage.showWarningMessage(window.top.message.setting['preference.choose.tone']);
                 return false;
             } else {
                 return true;
             }
         }

    });
});
