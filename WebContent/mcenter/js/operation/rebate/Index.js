/**
 * Created by eagle on 15-9-10.
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        init: function () {
            this._super();
            this.querySearchCondition();
        },

        onPageLoad: function () {
            this._super();
            $('.help-popover').popover();
        },
        bindEvent:function () {
            
        },
        querySearchCondition:function () {
            /**<li role="presentation">
             <a role="menuitem" tabindex="-1" href="javascript:void(0)" key="">请选择</a>
             </li>*/
            var _this = this;
            var rankHtml = '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" key="{0}">{1}</a></li>';
            window.top.topPage.ajax({
                url: root + "/rebateAgent/queryCondtion.html?t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if(data.ranks){
                        $("div[selectdiv='search.agentRank']").find("ul[role='menu']").html("");
                        for(var i=0;i<data.ranks.length;i++){
                            var rankMap = data.ranks[i];
                            var key = rankMap.key;
                            var val = rankMap.value;
                            var formatHtml = _this.formatStr(rankHtml,key,val);
                            $("div[selectdiv='search.agentRank']").find("ul[role='menu']").append(formatHtml);
                        }
                    }
                },
                error: function (data) {

                }
            })
        }
    });

});
