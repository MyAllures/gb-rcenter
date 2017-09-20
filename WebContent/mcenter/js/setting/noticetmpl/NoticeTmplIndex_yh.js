define(['common/BaseListPage'], function(BaseListPage) {
     return BaseListPage.extend({

         init : function() {
             this._super();
             var _this = this;
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

             $("tbody.sysAuto input[type=checkbox]").on("click",function(){
                 var mname = $(this).attr("name");
                 var $cthis = this;
                 if ($($cthis).is(":checked")) {
                     $($cthis).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide").find("[name='"+mname+"']").each(function(){
                        !!$(this).attr("disabled")||$(this).prop("checked",true);
                     });
                 } else {
                     $($cthis).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide").find("[name='"+mname+"']").prop("checked",false);
                 }
             });

             $("tbody.ng-hide input[type=checkbox]").on("click",function(){
                 var mname = $(this).attr("name");
                 var $cthis = this;
                 var $tbody = $($cthis).parents("tbody");
                 if ($($cthis).is(":checked")) {
                     $tbody.find("[name='"+mname+"']").each(function(){
                        !!$(this).attr("disabled")||$(this).prop("checked",true);
                     });
                     $tbody.prev("tbody.sysAuto").find("[name='"+mname+"']").prop("checked",true);
                 } else {
                     var checkNum = 0;
                     $tbody.find("[name='"+mname+"']").each(function(){
                         if ($(this).prop("checked")) {
                             checkNum++;
                         }
                     });
                     checkNum==0&&$tbody.prev("tbody.sysAuto").find("[name='"+mname+"']").prop("checked",false);
                 }
             });

             $(".over").on("mousedown",function(){
                 // $(this).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide").toggle();
                 var _this = this;
                 var $tbody = $(this).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide");
                 var eventType = $(this).parent("td").parent("tr").children("[name='eventType']").val();
                 if ($tbody.children().length!=0) {
                     $tbody.toggle();
                     $(this).toggleClass("open");
                 } else {
                     window.top.topPage.ajax({
                         url:root+'/noticeTmpl/getNoBuiltIns.html',
                         data:{'search.eventType':eventType},
                         dataType:'json',
                         error:function(data){
                             window.top.topPage.showErrorMessage("");
                         },
                         success:function(data){
                             page.filltbody(data,$tbody);
                             $tbody.toggle();
                             $(_this).toggleClass("open");
                         }
                     });
                 }
             });

         },

         /**
          * 恢复系统默认
          * @param e
          * @param option
          */
         resetActive:function(e,option) {
             var _this = this;
             var tmplType = $("#tmplType").val();
             window.top.topPage.ajax({
                 url:root+'/noticeTmpl/resetActive.html',
                 data:{'tmplType':tmplType},
                 dataType:'json',
                 error:function(data){
                     window.top.topPage.showErrorMessage(data.msg);
                 },
                 success:function(data){
                     _this.loadHtml();
                     window.top.topPage.showSuccessMessage(data.msg);
                 }
             });
             $(e.currentTarget).unlock();
         },

         /**
          * 保存设置
          * @param e
          * @param option
          */
         saveActive:function(e,option) {
             var _this = this;
             var alltr = [];
             $("tbody tr").each(function(){
                 var _tr = {};
                _tr['groupCode'] = $(this).children("[name=groupCode]").val();
                 if (!!_tr['groupCode']) {
                     if ($(this).find("[name=siteMsg]").is(":checked")) {
                         _tr['sysSiteMsgActiveNum'] = 1;
                     } else {
                         _tr['sysSiteMsgActiveNum'] = 0;
                     }
                     if ($(this).find("[name=email]").is(":checked")) {
                         _tr['sysEmailActiveNum'] = 1;
                     } else {
                         _tr['sysEmailActiveNum'] = 0;
                     }
                     if ($(this).find("[name=sms]").is(":checked")) {
                         _tr['sysSmsActiveNum'] = 1;
                     } else {
                         _tr['sysSmsActiveNum'] = 0;
                     }
                     alltr.push(_tr);
                 }
             });
             window.top.topPage.ajax({
                 type:"POST",
                 url:root+'/noticeTmpl/saveActive.html',
                 data:{'noticeTmplSo':JSON.stringify(alltr)},
                 dataType:"JSON",
                 error:function(data){
                     window.top.topPage.showErrorMessage(data.msg);
                 },
                 success:function(data){
                     _this.loadHtml();
                     window.top.topPage.showSuccessMessage(data.msg);
                 }
             });
             $(e.currentTarget).unlock();
         },

         /**
          * 重新加载页面
          * @param e
          * @param option
          */
         query : function(event,option) {
             var $form = $(window.top.topPage.getCurrentForm(event));
             if(!$form.valid || $form.valid()) {
                 window.top.topPage.ajax({
                     url:window.top.topPage.getCurrentFormAction(event),
                     headers: {
                         "Soul-Requested-With":"XMLHttpRequest"
                     },
                     type:"post",
                     // post 需要data 否则报403
                     data:window.top.topPage.getCurrentFormData(event),
                     success:function(data){
                         $("#mainFrame").html(data);
                         event.page.onPageLoad();
                         $(event.currentTarget).unlock()},
                     error:function(data, state, msg){
                         window.top.topPage.showErrorMessage(msg);
                         $(event.currentTarget).unlock();
                     }});
             } else {
                 $(event.currentTarget).unlock();
             }
         },

         /**
          * 回调
          * @param event
          * @param option
          */
         callBackQuery:function(event,option)
         {
             if(event.returnValue==true)
             {
                 this.query(event,option);
             }else if(!!event.returnValue){
                 var params = event.returnValue.split(";");
                 var $target = $("[data-rel*='goToEmail']");
                 var $href = $target.data('rel');
                 $href = $href.replace("{groupCode}",params[0]);
                 $href = $href.replace("{eventType}",params[1]);
                 $target.data("rel",$href);
                 $target.trigger("click");
             }
         },

         callDelQuery:function(event,option)
         {
             this.query(event,option);
         },

         /**
          * 操作成功后，ajax获取页面html refresh
          */
         loadHtml:function() {
             window.top.topPage.ajax({
                 url: root + '/noticeTmpl/tmpIndex.html',
                 data:{tmplType:$("#tmplType").val()},
                 success: function (data) {
                     $("#mainFrame").html(data);
                 }
             });
         },

         /**
          * 非内置信息
          * @param data
          */
         filltbody : function(data,tbody) {
             $.each(data,function(index,obj){
                 var $template=$("#template").clone(true);
                 var emailActiveNum = obj.emailActiveNum;
                 var smsActiveNum = obj.smsActiveNum;
                 var siteMsgContentNum = obj.siteMsgContentNum;
                 var emailContentNum = obj.emailContentNum;
                 var smsContentNum = obj.smsContentNum;
                 var groupCode = obj.groupCode;
                 var eventType = obj.eventType;

                 var $tr = $template.find("tr");
                 $tr.children("[name='groupCode']").val(groupCode);
                 var $ary = $tr.find("a.co-blue3");
                 for(var i=0;i<$ary.length;i++) {
                     var $target = $($ary[i]);
                     var $href = $target.data('rel');
                     $href = $href.replace(new RegExp("{groupCode}","gm"),groupCode);
                     $href = $href.replace(new RegExp("{eventType}","gm"),eventType);
                     $tr.find("a.co-blue3").eq(i).data("data-rel",$href);
                 }
                 /*$.each($template.find("a.co-blue3"),function(ind,item){
                     var $target = $(item);
                     var $href = $target.data('rel');
                     $href = $href.replace("{groupCode}",groupCode);
                     $href = $href.replace("{eventType}",eventType);
                     $target.data("rel",$href);
                 });*/
                 // $template.show();
                 $(tbody).append($tr);
             })
         }
    });
});
