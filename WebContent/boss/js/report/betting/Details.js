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
            var betId=$("#betId").val();
            var siteId=$("#siteId").val();
            window.top.topPage.ajax({
                url: root + "/report/betting/getGameDetailLink.html?search.betId="+betId+"&siteId="+siteId,
                type: 'GET',
                success: function (data) {
                    if(data){
                        var data = eval('('+data+')')
                        window.open(data.link);
                        $(e.currentTarget).unlock();
                    }
                },
            })
        }
    });
});
