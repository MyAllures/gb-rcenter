
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        sync:function (e,option) {
            var siteId=$("#singleVal").val();
            var btnOption = {};
            btnOption.target = "siteLottery/sync.html?search.siteId="+siteId;
            btnOption.callback ="query";
            if(siteId) {
                btnOption.text = "同步站点:" + siteId;
            }else{
                btnOption.text = "同步全部站点";
            }
            window.top.topPage.doDialog(e, btnOption);
        },
        takeOff:function (e,option) {
            var siteId=$("#singleVal").val();
            var btnOption = {};
            btnOption.target = "siteLottery/takeOff.html?search.siteId="+siteId;
            btnOption.callback ="query";
            if(siteId){
                btnOption.text = "下架站点:"+siteId;
            }else {
                btnOption.text = "下架全部站点";
            }
            window.top.topPage.doDialog(e, btnOption);
        }
    })
});
