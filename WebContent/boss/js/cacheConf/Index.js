/**
 * Created by ed 17-10-23.
 */
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
        refreshCache:function (e, opt) {
            var cacheKey = opt.cacheKey;
            if(!cacheKey){
                return;
            }
            var t1 = new Date();
            window.top.topPage.ajax({
                dataType:'json',
                async:false,
                type:"post",
                url:root+'/cacheItem/refreshCache.html?cacheKey='+cacheKey,
                beforeSend:function () {
                    $(e.currentTarget).attr("disabled","disabled")
                    $(e.currentTarget).addClass("co-gray");
                },
                success:function(data){
                    $(e.currentTarget).removeAttr("disabled")
                    $(e.currentTarget).removeClass("co-gray");
                    $(e.currentTarget).unlock();
                },
                error:function(data) {
                    console.log("error");
                }
            });
        }
    })
});
