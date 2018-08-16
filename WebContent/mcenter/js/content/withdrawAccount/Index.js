define(['common/BaseListPage', 'bootstrapswitch', 'jsrender'], function (BaseListPage, Bootstrapswitch) {
    var _this;

    return BaseListPage.extend({
        rankTag: null,
        bootstrapswitch: Bootstrapswitch,

        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            _this = this;
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');

            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                    {
                        onText: window.top.message.content['floatPic.display.on'],
                        offText: window.top.message.content['floatPic.display.off'],
                        onSwitchChange: function (e, state) {
                            var $this = $(this);
                            var msg = "关闭后将无法用此账号出款,确认关闭吗?";
                            if (state){
                                msg = "确定要开启该出款账号?"
                            }
                            $this.bootstrapSwitch('indeterminate',true);
                            window.top.topPage.showConfirmMessage(msg,function (bol) {
                                if(bol){
                                    _this.changeStatus(e,state);
                                    $this.bootstrapSwitch('indeterminate',false);
                                }else{
                                    $this.bootstrapSwitch('indeterminate',false);
                                    $this.bootstrapSwitch('state', !state,true);
                                }
                            });


                            return true;
                        }
                    });
        },

        changeStatus:function (e, state) {
            var _this = this;
            var _target = e.currentTarget;
            var index = $(_target).attr("tt");
            var id = $(_target).attr("withdrawAccountId");
            window.top.topPage.ajax({
                url: root + '/withdrawAccount/changeStatus.html',
                dataType: "json",
                data: {"result.id": id, "state": state},
                success:function(data){
                    if(data.state) {
                        window.top.page.showPopover(e, {}, "success", window.top.message.common['save.success'], true);
                     } else {
                        window.top.page.showPopover(e, {}, "warning", window.top.message.common['save.failed'], true);
                     }
                },
                error:function(data) {
                    window.top.page.showPopover(e, {}, "warning", window.top.message.common['save.failed'], true);
                }
            });
            setTimeout(function () {
                _this.query(e, state)
            },1000);
        },

        bindEvent: function () {
            this._super();
            $("#searchtext").keydown(function (event) {
                if (event.keyCode == 13) {
                    $(".btn-query-css").click();
                }
            });
        },
        /**
         * 删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        deleteCallbak: function (e, option) {
            this.query(e, option);
        },
        /**
         * 删除确认框
         * @param e
         * @param option
         */
        confirmDel: function (e, option) {
            var msg = window.top.message.content['delete.deleteConfirm'];
            window.top.topPage.showConfirmMessage(msg, function (bol) {
                if (bol) {
                    window.top.topPage.doAjax(e, option);
                }
            });
        },
        hideSettingCallback: function (event, option) {
            if (event.returnValue) {
                $(event.currentTarget).next().click();
            }
        }
    });
});