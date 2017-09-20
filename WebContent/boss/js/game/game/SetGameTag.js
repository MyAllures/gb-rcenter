//模板页面
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            var gameIds = window.parent.page.getIds();
            $("#gameIds").val(gameIds);
            this.getGameTag(gameIds);
        },

        getGameTag: function (gameIds) {
            if(gameIds==null||gameIds==""){
                return;
            }
            //var ids = gameIds.split(",");
            if(gameIds.length==1){
                var idspar = {"gameId":gameIds[0]};
                window.top.topPage.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType:'json',
                    async:false,
                    type:"post",
                    url:root+'/vGame/getGameTags.html?search.id='+gameIds[0]+'&gameId='+gameIds[0],
                    success:function(data){
                        //alert(data.gameTags);
                        if(data&&data.gameTags){
                            var tags = ","+data.gameTags+",";
                            $("[name='tagIds']").each(function (idx, item) {
                                var tag = ","+$(item).val()+",";
                                if(tags.indexOf(tag)>-1){
                                    $(item).attr("checked", true);
                                }
                            });
                        }
                    },
                    error:function(data) {
                        window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                    }
                });
            }
        }

    });
});