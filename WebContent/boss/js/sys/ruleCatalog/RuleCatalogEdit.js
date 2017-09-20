define(['common/BaseEditPage','site/sys/rule/CatalogTree','bootstrapswitch' ], function(Parent,CatalogTree,bootstrapswitch) {
     return Parent.extend({

         init : function() {
            this._super();
         },

         bindEvent : function() {
             this._super();

             //类别树
             CatalogTree.initTree('result');
         },

         /**
          * 删除之前的验证
          */
         deleteCatalog : function(e,p){
             var $catalogId = $("[name='result.catalogId']",this.formSelector);
             var catalogId = $catalogId.val();
             if (catalogId == "") {
                 window.top.topPage.showErrorMessage("请选择一种类别!");
                 $(e.currentTarget).unlock();
                 return false;
             }

             window.top.topPage.ajax({
                 url:root+'/sysRuleFileCatalog/deleteCatalog.html',
                 type:"POST",
                 data: { "search.id" : catalogId },
                 error: function (request) {
                     $(e.currentTarget).unlock();
                 },
                 success: function (data) {
                     $(e.currentTarget).unlock();
                     CatalogTree.refreshTree('result');
                 }
             })
         }
    });
});
