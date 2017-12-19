define(['common/BaseViewPage'], function(BaseViewPage) {

    return BaseViewPage.extend({
        init: function () {
            this._super();

        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            this.queryRemainCount();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $(_this.formSelector).on("click",".activityTag", function () {
                var lang=$(this).attr("name");
                $(".contentDiv").hide();
                $("#content"+lang).removeClass("hide");
                $("#content"+lang).show();
                $(".activityTag").removeClass("btn-outline");
                $(".activityTag").addClass("btn-outline");
                $(this).removeClass("btn-outline");
            });
        },
        queryRemainCount:function () {
            //$("span#award_remain_count_").text();
            var activityMessageId = $("#activityMessageId").val();
            if(!activityMessageId){
                return;
            }
            window.top.topPage.ajax({
                url: root + "/activityMoneyAwardsRules/queryAwardRemainCount.html?search.activityMessageId="+activityMessageId,
                type: "POST",
                dataType: "JSON",
                success: function (dataList) {
                    if(dataList && dataList.length>0){
                        var totalRemain = parseInt(0);
                        for(var i=0;i<dataList.length;i++){
                            var data = dataList[i];
                            if(data.singleRemainCount){
                                $("span#award_remain_count_"+data.id).text(data.singleRemainCount);
                                totalRemain += data.singleRemainCount;
                            }
                        }
                        $("span#allRemainCount").text(totalRemain);
                    }
                }
            });
        }
    })


});