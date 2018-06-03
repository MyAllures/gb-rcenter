/**
 * Created by shisongbin on 15-9-16.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init:function() {
            this._super();
        },

        bindEvent:function(){
            this._super();
            var _this = this;
            $("#return-back",_this.formSelector).on("click",function (e) {
                $("div.tab-content").find("div.tab-content").remove();
                $("#table-content").show();
                $("#return-back").addClass("hide");
                page.reloadDialog();
            })
        },
        onPageLoad: function () {
            this._super();
            
        },
        showChildProfitLoss:function (e, opt) {
            var rebateBillId = opt.rebateBillId;
            var agentId= opt.agentId;
            var rebateAgentId = opt.rebateAgentId;
            var param = {"rebateAgentId":rebateAgentId,"search.agentId":agentId,"search.rebateBillId":rebateBillId};
            window.top.topPage.ajax({
                url: root + "/rebateAgent/showAgentRebate.html?t=" + new Date().getTime(),
                data:param,
                success: function (data) {
                    $("#table-content").hide();
                    var content = $(data).find(".tab-content");
                    $("div.tab-content").append(content);
                    $("#return-back").removeClass("hide");
                    page.reloadDialog();
                },
                error: function (data) {

                }
            })
            $(e.currentTarget).unlock();
        }
    });
});