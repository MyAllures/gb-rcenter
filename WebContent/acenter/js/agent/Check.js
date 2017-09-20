/**
 * Created by lorne on 15-9-10.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        listVo:null,
        lastAgentUserName:'',
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var that = this;
        },
        onPageLoad: function () {
            this._super();
            //change
        },
        myValidateForm:function(e,option){
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            this.checkStatus(e,option);
            return false;
        },

        checkStatus:function (e, option) {
            var val = $("#freeze_status").val();
            if(val==4){
                var tt = option.tt;
                var msg = window.top.message.agent['agent.audit.checkpassed'];//确认审核不通过吗？
                if(tt=='failure'){
                    msg = window.top.message.agent['agent.audit.checkfailure'];
                }
                window.top.topPage.showConfirmMessage(msg, function (confirm) {
                    if(confirm){
                        window.top.topPage.doAjax(e, option);
                    }
                });

            }else{
                window.top.topPage.showErrorMessage(window.top.message.agent['agent.audit.haschecked']);
            }
            return false;
        },
        updateStatus:function(){
            $("#freeze_status").val("1");
        },
        showNextRecord: function (e, opt) {
            var nextRecordId = $("#nextCheckAgentId").val();
            if(nextRecordId){
                window.top.topPage.ajax({
                    url: root + "/userAgent/toCheck.html?search.id="+nextRecordId,
                    success: function (data) {
                        $("#mainFrame").html(data);
                    }
                });
            }else{
                $(".return-btn").click();
            }
        }
    });
});