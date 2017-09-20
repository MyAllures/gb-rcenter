/**
 * Created by eagle on 16-2-18.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({

        init:function() {
            this._super();
        },

        bindEvent:function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
        },
        setDefaultTeamId: function (e, opt) {
            var _this = this;
            var type = e.key;

            $("[selectdiv='result.hostTeamType']").find("ul").find("li").find("a").each(function (idx, item) {
                var key = $(item).attr("key");
                if(key==type){
                    $(item).click();
                }
            });
            $("[selectdiv='result.guestTeamType']").find("ul").find("li").find("a").each(function (idx, item) {
                var key = $(item).attr("key");
                if(key==type){
                    $(item).click();
                }
            });
        },
        addSportTeam: function (e, opt) {
            window.parent.page.toSportTeam();
            this.closePage();
            var btnOption = {};
            btnOption.target = root + "/sport/team/create.html";
            btnOption.text = "新增球队";
            btnOption.callback = function (e, opt) {

            };
            window.parent.top.topPage.doDialog({}, btnOption);

        }

    });
});