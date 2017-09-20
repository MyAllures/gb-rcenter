/**
 * Created by jeff on 2016/2/17.
 */
define(['common/BaseEditPage'], function(BaseEditPage) {
    return BaseEditPage.extend({
        init:function(){
            this._super();
        },
        bindEvent : function() {
            this._super();
        },
        onPageLoad : function(){
            this._super();
        },

        mySaveCallBack:function(e,options){
            var _this = this;
            var doc = window.top.document;
            if(options.data.state) {
                _this.returnValue=true;
                window.top.topPage.closeDialog();
                /*var url = root+'/accountSettings/list.html?t='+Math.random();
                window.top.topPage.ajax({
                    type: "POST",
                    url: url,
                    success: function(data) {
                        $("#mainFrame",doc).html(data);
                        /!*  $("#bankInfo .bottomline",document).css("display","");
                        $("#bankInfo .set",document).hide();
                        $("#bankInfo .shrink",document).css("display","block");*!/
                        //_this.bindButtonEvents();
                    },
                    error: function(data) {
                    }
                });*/
            }

        },

    })
})