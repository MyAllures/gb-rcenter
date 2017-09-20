/**
 * Created by jeff on 2016/1/14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        saveCallback: function() {
            /*将下下拉置为禁用状态*/
            select.disable('[name="result.playerRankId"]');
            /*select.disable('[name="userAgentRakeback.rakebackId"]');*/
            select.disable('[name="userAgentRebate.rebateId"]');
            $("._audit_btn").addClass("ui-button-disable");
            window.top.topPage.goToLastPage(true);
        }
    });
});