/**
 * Created by jeff on 15-6-30.
 */
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        init:function(){
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },
        save:function(){
            var that = this;
            //window.top.topPage.ajax({
            //    type: "POST",
            //    url: root+"/tags/checkMax50Tag.html",
            //    data:$("#editForm").serialize(),
            //    error: function (request) {
            //        $(e.target).unlock();
            //        //message.player['']
            //    },
            //    success: function (data) {
            //        if(data === 'true'){
                        window.top.topPage.ajax({
                            type: "POST",
                            url: root+"/tags/persist.html",
                            data:$("#editForm").serialize(),
                            error: function (request) {
                                //$(e.target).unlock();
                                //message.player['']
                            },
                            success: function (data) {
                                that.closePage();
                            }
                        });
            //        }else{
            //            window.top.topPage.showWarningMessage(window.top.message.playerTag['tagsMax50']);
            //        }
            //    }
            //});

        }
    })
})