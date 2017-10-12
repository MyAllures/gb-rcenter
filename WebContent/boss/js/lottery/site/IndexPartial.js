
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

        updateSiteLotteryGenre: function (e) {
            var genre = e.key;
            var code = $(e.currentTarget).parent().parent().parent().parent().find("input[name='code']").val();
            var id = $(e.currentTarget).parent().parent().parent().parent().find("input[name='id']").val();
            var siteId = $("#singleVal").val();
            window.top.topPage.ajax({
                type:"post",
                url:root+'/siteLottery/changeLotteryGenre.html',
                data:{'result.genre':genre,'result.id':id,'result.siteId':siteId},
                error:function(data){
                    alert("修改失败");
                },
                success:function (data) {
                    alert("修改成功");
                }
            })
        }
    })
});
