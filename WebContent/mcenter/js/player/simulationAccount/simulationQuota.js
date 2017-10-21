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
            var totalAssets = $("input[name='search.totalAssets']").val();
            var id = $("input[name='search.id']").val();
            var ids= window.parent.page.getSelectedIds();
            var _this=this;
            var token = $("[name='gb.token']").val()
            window.top.topPage.ajax({
                url: root + '/simulationAccount/saveAddQuota.html',
                data: {"search.ids":ids,"search.id":id,"search.walletBalance":balance,"gb.token":token},
                dataType:'json',
                type: "POST",
                success: function (data) {
                    if (data.state){
                        _this.saveCallbak(e);
                    }else {
                        page.showPopover(e,{},"danger",data.msg,true);
                    }
                }
            });
        }
    });
});