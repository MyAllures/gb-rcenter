/**
 * Created by cj on 15-6-18.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({

        init: function () {
            this._super();
        },

        onPageLoad:function(){
            this._super();
            //分页下拉向上显示
            $('[selectdiv="paging.pageSize"]').addClass("dropup");
            this.resizeDialog();
        },

        /**
         * 当前对象事件初始化函数
         */
        reloadWhenChangeDialog:function(e,opt){
            this.query(e,opt);
        },

        jump:function (e) {
            var aa = eval('('+$(e.currentTarget).attr("data-rel")+')');
            $(e.currentTarget).attr("nav-target","mainFrame");
            $(e.currentTarget).attr("href","/player/list.html?search.tagId="+aa.tagId);
            this.closePage();
            window.top.topPage._doNavigate(e);

        }
    })
});