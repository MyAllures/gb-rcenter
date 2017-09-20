define(['common/BaseListPage', 'jsrender'], function (BaseListPage) {
    var _this;

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectIds:null,
        init: function () {
            this._super();
            _this = this;
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            selectIds = null;
        },

        bindEvent: function () {
            this._super();
            // 列表详情事件绑定
        },
        isAudit: function (e,option) {
            var _this=this;
            if(option.data){
                window.top.topPage.showSuccessMessage("域名已审核！", function () {
                    _this.query(e, option);
                });
            }else{
                window.top.topPage.doDialog({page:this},{text:window.top.message.common['msg'],target: root + "/sysDomainCheck/failureMsg.html?search.id="+option.id,callback:"query"});
            }
        },
        fetchSelectIds: function (e,opt) {
            selectIds = this.getSelectIdsArray(e);
            return true;
        },
        getCheckIds: function () {
            return selectIds;
        }
    });
})