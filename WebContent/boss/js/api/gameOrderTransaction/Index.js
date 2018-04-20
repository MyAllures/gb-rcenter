/**
 * ＡＰＩ注单资金管理
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        checkSiteId:function (e, opt) {
            var siteId = $("#search_id").val();
            if(!siteId){
                page.showPopover(e,opt,"danger","站点ID不能为空",true);
                return false;
            }
            return true;
        },

        checkApiId:function (e, opt) {
            var apiId = $("input[name='search.apiId']").val();
            var betId = $("input[name='search.betId']").val();
            if(!apiId){
                page.showPopover(e,opt,"danger","API ID不能为空",true);
                return false;
            }
            if(apiId!="37"){
                page.showPopover(e,opt,"danger","目前只支持BC重发",true);
                return false;
            }
            if(!betId){
                page.showPopover(e,opt,"danger","注单ID不能为空",true);
                return false;
            }
            return true;
        },
        checkTimeInterval:function (e, opt) {
            var apiId = $("input[name='search.apiId']").val();
            var startTime = $("input[name='search.queryStartDate']").val();
            var endTime = $("input[name='search.queryEndDate']").val();
            if(!apiId){
                page.showPopover(e,opt,"danger","API ID不能为空",true);
                return false;
            }
            if(apiId!="37"){
                page.showPopover(e,opt,"danger","目前只支持BC重发",true);
                return false;
            }
            if(!startTime){
                page.showPopover(e,opt,"danger","开始时间不能为空",true);
                return false;
            }
            if(!endTime){
                page.showPopover(e,opt,"danger","结束时间不能为空",true);
                return false;
            }
            startTime = new Date(Date.parse(startTime));
            endTime = new Date(Date.parse(endTime));
            if(startTime>=endTime){
                page.showPopover(e,opt,"danger","时间填写不正确",true);
                return false;
            }
            return true;
        },

        //注单ID重发:目前只支持BC体育
        resendGameOrderId:function (e) {
            var apiId = $("input[name='search.apiId']").val();
            var betId = $("input[name='search.betId']").val();
            window.top.topPage.ajax({
                url: root+'/gameOrderTransaction/resendGameOrderId.html',
                type:'POST',
                dataType: 'json',
                data: {"search.apiId":apiId,"search.betId":betId},
                success: function (data) {
                    window.top.topPage.showInfoMessage(data.result);
                },
                error: function (data) {
                    window.top.topPage.showErrorMessage(data.result);
                }
            });
        },

        //时间区间重发:目前只支持BC体育
        timeInterval:function (e) {
            var apiId = $("input[name='search.apiId']").val();
            var startTime = $("input[name='search.queryStartDate']").val();
            var endTime = $("input[name='search.queryEndDate']").val();
            window.top.topPage.ajax({
                url: root+'/gameOrderTransaction/timeInterval.html',
                type:'POST',
                dataType: 'json',
                data: {"search.apiId":apiId,"search.startTime":startTime,"search.endTime":endTime},
                success: function (data) {
                    window.top.topPage.showInfoMessage(data.result);
                },
                error: function (data) {
                    window.top.topPage.showErrorMessage(data.result);
                }
            });
        }
    });
});