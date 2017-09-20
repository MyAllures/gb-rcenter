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
         },

         bindEvent : function() {
             var _this = this;
             this._super();

             var $bootstrapSwitch = $("[name$='active'][type='checkbox']");
             this.unInitSwitch($bootstrapSwitch)
                 .bootstrapSwitch({
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
                url:root+'/setting/preference/resetPreference.html',
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
          * 操作成功后，ajax获取页面html refresh
          */
         loadHtml:function() {
             window.top.topPage.ajax({
                 url: root + '/setting/preference/index.html',
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
