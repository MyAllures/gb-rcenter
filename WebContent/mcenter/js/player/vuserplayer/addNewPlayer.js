/**
 * Created by ke on 15-7-1.
 */
define(['common/BaseEditPage','mailAutoComplete'], function (BaseEditPage) {
    return BaseEditPage.extend({

        init: function () {
            this._super("form");
            this.querySearchCondition();
        },
        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            var _this=this;
            this._super();
        },
        querySearchCondition:function () {

            var _this = this;
            var rankHtml = '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" key="{0}">{1}</a></li>';
            window.top.topPage.ajax({
                url: root + "/rebateAgent/queryCondtion.html?t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if(data.ranks){
                        $("div[selectdiv='search.agentRanks']").find("ul[role='menu']").html("");
                        for(var i=0;i<data.ranks.length;i++){
                            var rankMap = data.ranks[i];
                            var key = rankMap.key;
                            var val = rankMap.value;
                            var formatHtml = _this.formatStr(rankHtml,key,val);
                            $("div[selectdiv='search.agentRanks']").find("ul[role='menu']").append(formatHtml);
                        }
                    }
                },
                error: function (data) {

                }
            })
        },
        queryAgentLine:function (e, opt) {
            var _this = this;
            var agentId = e.key;
            window.top.topPage.ajax({
                url: root + "/player/queryAgentLine.html?t=" + new Date().getTime(),
                data:{agentId:agentId},
                dataType:"json",
                success: function (data) {
                    if(data){
                        $("#agentLine").html(data.parent_name_array);
                        $("#agent-line-div").removeClass("hide");
                        $("div[selectdiv='result.rankId']").attr("value",data.player_rank_id);
                        $("[name='result.rankId']").val(data.player_rank_id);
                        var rankName = "";
                        $("div[selectdiv='result.rankId']").find("a[role='menuitem']").each(function (idx, sel) {
                           var key = $(sel).attr("key");
                           if(key==data.player_rank_id){
                               rankName = $(sel).html();
                           }
                        });
                        $("div[selectdiv='result.rankId']").find("span[prompt='prompt']").html(rankName);
                        var et = {"key":data.player_rank_id};
                        _this.queryRank(et,opt);

                    }else{
                        $("#agentLine").html("");
                        $("#agent-line-div").addClass("hide");
                        $("[selectdiv='result.rankId']").val("");
                        $("[name='result.rankId']").val("");
                        $("div[selectdiv='result.rankId']").find("span[prompt='prompt']").html("");
                    }
                    page.resizeDialog();
                },
                error: function (data) {

                }
            })
        },
        queryRank: function (e, opt) {
            var id= e.key;
            if(id){
                window.top.topPage.ajax({
                    url: root+"/playerRank/copyParameter.html.html?search.id="+id,
                    dataType: "json",
                    success: function (data) {
                        if(data&&data.rakebackSet){
                            $("#rakeback-div").removeClass("hide");
                            $("#rakebackName-div").html(data.rakebackSet.name);
                        }else{
                            $("#rakebackName-div").html("");
                            $("#rakeback-div").addClass("hide");
                        }
                    }
                });
            }
        },

    });
});