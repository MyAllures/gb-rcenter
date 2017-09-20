define(['common/BaseEditPage','site/sys/rule/CatalogTree','bootstrapswitch' ], function(Parent,CatalogTree,bootstrapswitch) {
     return Parent.extend({

         init : function() {
            this._super();
         },

         bindEvent : function() {
             this._super();

             //类别树
             CatalogTree.initTree('result');

             //开关
             var _this = this;
             var $isEnabled = $("[name='result.isEnabled']",this.formSelector);
             _this.unInitSwitch($isEnabled)
                 .bootstrapSwitch()
                 .on('switchChange.bootstrapSwitch', function(event, state) {
                     if (state) {
                         if(_this.validRule()){
                             $(event.target).val("true");
                         } else {
                             $isEnabled.bootstrapSwitch('setState', false);
                         }
                     } else {
                         $(event.target).val("false");
                     }
                 });
         },

         /**
          * 验证规则
          */
         validRule : function(){
             var $content = $("[name='result.content']",this.formSelector);
             if($content.val().trim() == "") {
                 window.top.topPage.showErrorMessage("启用规则需要预先验证,请填写完整规则文件");
                 $content.focus();
                 return false;
             }

             var isValid = false;
             window.top.topPage.ajax({
                 url : root + "/sysRuleFile/validRule.html",
                 type : "post",
                 dataType: "json",
                 cache : false,
                 data : {"result.content" : $content.val()},
                 async : false,
                 success: function (data) {
                     isValid = data.state;
                     if(!data.state){
                         window.top.topPage.showErrorMessage(data.msg);
                     }
                 },
                 error : function(err) {
                     console.info(err);
                     window.top.topPage.showErrorMessage(err);
                 }
             });

             return isValid;
         },

         /**
          * 示例删除回调函数
          * @param e             事件对象
          * @param option        Button标签的参数
          */
         saveCallbak:function(e,option)
         {
             e.returnValue = true;
             this._super();
         }

    });
});
