define(['common/BaseEditPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        detail:function (e) {
            var betId = $("#betId").val();
            var siteId = $("#siteId").val();
            var apiId = $("#apiId").val();
            window.top.topPage.ajax({
                url: root + "/report/gameTransaction/getGameDetailLink.html?search.betId="+betId+"&siteId="+siteId+"&search.apiId="+apiId,
                type: 'GET',
                success: function (data) {
                    var datas = eval('('+data+')')
                    if(datas.state){
                        window.open(datas.msg);
                    }else{
                        window.top.topPage.showWarningMessage(datas.msg);
                        return;
                    }
                    $(e.currentTarget).unlock();
                },
                error: function(data){
                    console.log('请求错误');
                    $(e.currentTarget).unlock();
                },
            })
        }
    });
});
