define(['common/BaseListPage','common/BaseEditPage'], function(BaseListPage,BaseEditPage) {

    return BaseListPage.extend({
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
            // 列表详情事件绑定
            this.initShowDetail();

        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },
        /**
         * 删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        deleteCallbak:function(e,option)
        {
            this.query(e,option);
        },
        saveOrForward: function (e,option) {
            var _this=this;

            var rankId=$("#forwardAddPayLimit").attr("data-rankId");
            if(rankId){
                $("#forwardAddPayLimit").attr("href","/playerRank/payLimit.html?rankId="+rankId);
                $("#forwardAddPayLimit").click();
                $("#forwardAddPayLimit").attr("data-rankId",'');
            }else{
                _this.query(e,option);
            }
        }/*,
         preCheckIdsCount:function(e,option) {
         if (this.getSelectIdsArray(e,option).length > 0) {
         return true;
         } else {
         window.top.topPage.showWarningMessage(message.common['choose.delete.row']);
         return false;
         }
         }*/
    });
});