/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click",".dropdown-menu-stop", function (event) {
                event.stopPropagation();//阻止事件向上冒泡
            });
        },
        onPageLoad: function () {
            this._super();
            var $bootstrapSwitchs = $('input[type=checkbox][name=my-check]');
            this.unInitSwitch($bootstrapSwitchs)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var $this = $(this);
                        $this.bootstrapSwitch('indeterminate', true);
                        var _target = e.currentTarget;
                        var id = $(_target).attr("Id");
                        var _msg = "";
                        if (state) {
                            _msg ="确认启用";
                        } else {
                            _msg = "确认禁用";
                        }
                        window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                            if (confirm) {
                                window.top.topPage.ajax({
                                    url: root + '/operate/payApiProvider/setIsProxyMode.html',
                                    dataType: "json",
                                    data: {"result.id": id, "result.isProxyMode": state},
                                    success: function (data) {
                                        if (data) {
                                            $(_target).attr("isChanged", true);
                                            $("#status").removeClass("label-success");
                                            $("#status").addClass("label-danger");
                                            //_this.query(e);
                                        } else {
                                            page.showPopover(e, {
                                                "callback": function () {
                                                    _this.query(e);
                                                }
                                            }, "danger", "操作失败", true);
                                        }

                                    }
                                });
                                $this.bootstrapSwitch('indeterminate', false);
                            }else {
                                $this.bootstrapSwitch('indeterminate', false);
                                $this.bootstrapSwitch('state', !state, true);
                            }
                        })
                    }

                })
        },

        updatePayHostName:function (e,opt) {
            var _target = e.currentTarget;
            var hostName=e.key;
            var id=$("td .i-checks", $(_target).parents("tr")).val()
            if (hostName==""||id==""){
                window.top.topPage.showErrorMessage("请选择正确的hostName");
            }else {

                window.top.topPage.ajax({
                    url: root + '/operate/payApiProvider/updatePayHostName.html',
                    dataType: "json",
                    data: {"id": id, "hostName": hostName},
                })
            }
        },
        updateQueryHostName:function (e,opt) {
            var _target = e.currentTarget;
            var hostName=e.key;
            var id = $("td .i-checks", $(_target).parents("tr")).val()
            if (hostName==""||id=="") {
                window.top.topPage.showErrorMessage("请选择正确的hostName");
            }
                window.top.topPage.ajax({
                    url: root + '/operate/payApiProvider/updateQueryHostName.html',
                    dataType: "json",
                    data: {"id": id, "hostName": hostName},
                })

        },



        //删除
        deleteMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['pay.delete']);
        },
        showConfirm: function (e,option,msg) {
            window.top.topPage.showConfirmMessage( msg , function( bol ){
                if(bol){
                    window.top.topPage.doAjax(e,option);
                }else{
                    $(e.currentTarget).unlock();
                }
            });
        } ,

    });
});