define(['common/BaseListPage','common/BaseEditPage'], function(BaseListPage,BaseEditPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectedIds:null,
        init : function() {
            this._super();
        },
        bindEvent:function()
        {
            this._super();
            // 列表详情事件绑定
            this.initShowDetail();
        },
        onPageLoad: function () {
            this._super();
        },
        unableAccount:function (e,opt) {
            var _msg;
            var _this=this;
            _msg=window.top.message.player_auto['停用后不可重新启用']
            window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                if (confirm){
                    var id=opt.searchId;
                    window.top.topPage.ajax({
                        url: root + '/simulationAccount/disablePlayer.html',
                        data: {"search.id":id},
                        dataType:'json',
                        type: "POST",
                        html:true,
                        success: function (data) {
                            if (data.state){
                                _this.query(e);
                            }
                        }
                    });
                }
            })
        },
        getIds:function (e,opt) {
            this.selectedIds = this.getSelectIdsArray(e,opt).join(",");
            return true
        },

        getSelectedIds:function () {
            return this.selectedIds;
        }
    });
});