define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
        },
        bindEvent:function()
        {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        updatePlayer:function (e,opt) {
            var balance = $("input[name='search.walletBalance']").val();
            var id = $("input[name='search.id']").val();
            var ids= window.parent.page.getSelectedIds();
            var _this=this;
            window.top.topPage.ajax({
                url: root + '/simulationAccount/saveAddQuota.html?walletBalance='+balance+'&search.id='+id,
                data: {"search.ids":ids},
                dataType:'json',
                type: "POST",
                success: function (data) {
                    if (data.state){
                        _this.saveCallbak(e);
                    }
                }
            });
        }
    });
});