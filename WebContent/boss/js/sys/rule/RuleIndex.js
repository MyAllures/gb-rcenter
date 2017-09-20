define(['common/BaseListPage','site/sys/rule/CatalogTree'], function(Parent,CatalogTree) {
     return Parent.extend({

         init : function() {
            this._super();
         },

         bindEvent : function() {
             this._super();

             var _this = this;
             CatalogTree.initTree("search");

         }


    });
});
