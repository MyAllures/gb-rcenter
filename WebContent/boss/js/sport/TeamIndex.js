/**
 * Created by snekey on 15-8-13.
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

        selectListChange: function (e) {
            this._super(e);
            var searchType = e.key;
            if(searchType=='search.teamName'){
                $("#teamNameDiv").removeClass("hide");
                $("#teamTypeDiv").addClass("hide");
                $("#searchtext").removeAttr("disabled");
            }else{
                $("#teamTypeDiv").removeClass("hide");
                $("#teamNameDiv").addClass("hide");
                $("#searchtext").attr("disabled","disabled");
                $("div[selectdiv='search.teamType']").css("width","145px");
                $("div[selectdiv='search.teamType']").find("button").css("width","140px");
                $("div[selectdiv='search.teamType']").find("ul").css("width","140px");
            }
        }
    })
})
