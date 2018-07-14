/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {
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

            this.initSwitch();
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

        initSwitch:function() {
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var siteId = $(_target).attr("siteId");
                        var gameId = $(_target).attr("gameId");
                        var apiId = $(_target).attr("apiId");
                        var apiTypeId = $(_target).attr("apiTypeId");
                        var msg = state ? "确认启用吗？" : "确认禁用吗？";
                        if (!$(_target).attr("isChanged")) {
                            var okLabel = window.top.message.setting['common.ok'];
                            var cancelLabel = window.top.message.setting['common.cancel'];
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                if (confirm && !$(_target).attr("isChanged")) {
                                    window.top.topPage.ajax({
                                        url: root + '/vSiteGame/updateOwnIcon.html',
                                        dataType: "json",
                                        data: {
                                            "search.ownIcon":state,
                                            "search.siteId": siteId,
                                            "search.gameId": gameId,
                                            "search.apiId": apiId,
                                            "search.apiTypeId": apiTypeId
                                        },
                                        success: function (data) {
                                            if (data.state) {
                                                page.showPopover(e, {
                                                    "callback": function () {
                                                        _this.query(e);
                                                    }
                                                }, "success", data.msg, true);
                                            } else {
                                                page.showPopover(e, {
                                                    "callback": function () {
                                                        _this.query(e);
                                                    }
                                                }, "danger", data.msg, true);
                                            }
                                        }
                                    });
                                }
                                return true;
                            })
                        } else if ($(_target).attr("isChanged")) {
                            $(_target).removeAttr("isChanged");
                            return true;
                        }
                        return false;
                    }
                });
        }
    });
});
