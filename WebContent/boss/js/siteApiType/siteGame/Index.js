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
            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });
            $("#searchtext").keyup(function () {
                var oldStr = this.value;
                var newStr =oldStr.replace(/^\s+|\s+$/g,'');
                if(oldStr!=newStr){
                    this.value = newStr ;
                }
            });
        },
        onPageLoad: function () {
            this._super();
            /*var _this = this;
            var tem=$(".refresh-btn-css");
            var btnOption = eval("(" + tem.data('rel') + ")");
            _this.setCountDown({currentTarget:tem[0]},btnOption);*/
        },

        refreshBalance:function(e,opt){
            window.top.topPage.ajax({
                url: root+'/vSiteGame/refreshApiBalance.html?search.apiId='+$("#apiId").val()+'&search.siteId='+$("#siteId").val()+'&lastRefreshApiBalanceTime'+$("#lastRefreshApiBalanceTime").val(),
                cache: false,
                type: "POST",
                dataType:'json',
                success: function (data) {
                    if(data&&data.refreshTime){
                        $(".refresh-btn-css").attr("title",window.top.message.common['last_refresh_time']+":"+data.refreshTime);
                    }
                    if(data.err){
                        $(e.currentTarget).unlock();
                        window.top.topPage.showWarningMessage(data.err);
                        return;
                    }
                    if(data&&data.balance){
                        if(data.balance!=0){
                            $(".withdrawBalance-btn-css").remove("withdrawBalance-btn-css");
                            $("#apiBalance").text(data.balance);
                        }else{
                            $(".withdrawBalance-btn-css").addClass("withdrawBalance-btn-css");
                        }

                    }


                    //alert(data+"==="+data.refreshTime+"==="+data.balance);
                }
            });
            $(e.currentTarget).unlock();
        },
        myCallBack:function(e,opt){
            var _this = this;
            if(opt.data.state){
                window.topPage.showSuccessMessage(window.top.message.common['operation.success'],function(state){
                    if(state){
                        _this.callBackQuery(e);
                    }
                });
            }else{
                window.topPage.showErrorMessage(window.top.message.common['operation.fail'],function(state){
                    if(state){
                        _this.callBackQuery(e);
                    }
                });
            }
            $(e.currentTarget).unlock();

        },
    })
})
