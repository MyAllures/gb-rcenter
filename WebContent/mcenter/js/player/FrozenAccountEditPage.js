define(['common/BaseEditPage','eventlock','bootstrapswitch','jschosen'], function(BaseEditPage,eventlock,Bootstrapswitch) {
     return BaseEditPage.extend({

         init : function() {
            this._super();
            this.lockPage();
         },
         bindEvent : function() {
             var _this = this;
             this._super();

             var $bootstrapSwitch = $("[name='status'][type='checkbox']");
             this.unInitSwitch($bootstrapSwitch)
                 .bootstrapSwitch(
                 {
                     onText: window.top.message.content['floatPic.display.on'],
                     offText: window.top.message.content['floatPic.display.off'],
                     onSwitchChange: function (e, state) {
                         var _target = e.currentTarget;
                         if (!$(_target).attr("isChanged")) {
                             if (!state) {
                                 select.disable("#freezeCode");
                                 select.disable("#frozeTimeType");
                             } else {
                                 select.enable("#freezeCode");
                                 select.enable("#frozeTimeType");;
                             }
                             $(_target).attr("isChanged", true);
                             $(_target).bootstrapSwitch("state", !_target.checked);
                         } else {
                             $(_target).removeAttr("isChanged");
                             return true;
                         }
                         return false;
                     }
                 }
             );
         },

         /**
          * 凍結原因下拉框改变事件，原因展示不同
          * @param _this
          */
         freezeCodeChange:function(e) {
             /*var arr = eval("("+jsonList+")");
             var code = $(_this).val();
             $.each(arr,function (index,content) {
                 if (code==content.code) {
                     $("textarea[name=reason]").val(content.reason);
                 }
             });*/
             var value = e.key;

             var content = select.getSelected('#freezeCode').attr('holder');
             var groupCode = select.getSelected('#freezeCode').attr('groupCode');
             $("#title").val(value);
             $("#reason").val(content);
             $("#groupCode").val(groupCode);
         },

         /**
          * 保存冻结账号（余额）参数替换
          * @param e
          * @param btnOption
          * @returns {boolean}
          */
         replaceUrlParam:function(e,btnOption){
             if(!$("#status").is(':checked')){
                 window.top.topPage.showWarningMessage(window.top.message.playerFrozen['check.enable']);
                 return false;
             }
             var frozeTimeType = $("#frozeTimeType").val();
             if(!frozeTimeType){
                 // window.top.topPage.showWarningMessage(window.top.message.playerFrozen['frozen.time']);
                 return false;
             }
             var freezeCode = $("#freezeCode").val();
             if(!freezeCode){
                 //window.top.topPage.showWarningMessage(window.top.message.playerFrozen['frozen.reason']);
                 $("#tipReason").attr("display","block");
                 return false;
             }

             btnOption.target = btnOption.target.replace('{frozeTimeType}',frozeTimeType);
             btnOption.target = btnOption.target.replace('{freezeCode}',freezeCode);
             return true;
         },

         /**
          * 保存冻结
          * @param e
          * @param btnOption
          */
         saveFrozen: function (e,btnOption) {
             if(e.returnValue){
                 $("[data-rel*='saveFrozen']").lock();
                 var url=root+"/sysuser/frozen/"+$("#controller").val();
                 var _this=this;
                 window.top.topPage.ajax({
                     url: url,
                     data: $("form[name=af]").serialize(),
                     dataType: 'json',
                     cache: false,
                     type: "POST",
                     success: function (data) {
                         if (data.success=='success') {
                             window.top.topPage.showConfirmMessage(window.top.message.common['save.success'],function(){
                                 _this.closePage(e,btnOption);
                             });
                         } else {
                             window.top.topPage.showConfirmMessage(window.top.message.common['save.failed']);
                         }
                     },
                     error:function(data) {
                         window.top.topPage.showSuccessMessage(window.top.message.common['save.failed']);
                     }
                 });
             }
         },

         /**
          * 确定预览
          * @param e
          * @param btnOption
          */
         previewOk:function(e,btnOption){//提交
             this.returnValue=true;
             this.closePage(e,btnOption)
         },

         /**
          * 锁定页面
          */
         lockPage:function(){
             if ($("#lockFlag").val()=='1') {
                 var isLocked = $("a[data-rel*='freezeCode']").isLocked();
                 if (isLocked) {
                     return;
                 }
                 $("[data-rel*='freezeCode']").lock();
             }
          },

         /**
          * 展示信息模板
          * @param e
          * @param btnOption
          */
         showTmpl:function(e,btnOption){

         }

    });
});
