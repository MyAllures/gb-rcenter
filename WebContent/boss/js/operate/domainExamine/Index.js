define(['common/BaseListPage', 'jsrender', 'bootstrapswitch'], function (BaseListPage) {
    var _this;

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectIds:null,
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
            selectIds = null;

            var $bootstrapSwitchs = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitchs)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var $this = $(this);
                        $this.bootstrapSwitch('indeterminate', true);
                        var _target = e.currentTarget;
                        var id = $(_target).attr("Id");
                        var domain = $(_target).attr("domain");
                        var siteId = $(_target).attr("siteId");
                        var _msg = "";
                        if (state) {
                            _msg = "确认设置为例外域名";
                        } else {
                            _msg = "确认取消例外域名设置";
                        }
                        if (state == true) {
                            var isException = 'Y';
                        } else if (state == false) {
                            var isException = 'N';
                        }
                        window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                            if (confirm) {
                                window.top.topPage.ajax({
                                    url: root + '/vDomainCheck/setExceptionDomain.html',
                                    dataType: "json",
                                    data: {
                                        "result.id": id,
                                        "result.isException": isException,
                                        "result.domain": domain,
                                        "result.siteId": siteId
                                    },
                                    success: function (data) {
                                        if (data) {
                                            _this.query(e);
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
                            } else {
                                $this.bootstrapSwitch('indeterminate', false);
                                $this.bootstrapSwitch('state', !state, true);
                            }
                        })
                    }
                })
        },

        bindEvent: function () {
            this._super();
            // 列表详情事件绑定
        },
        isAudit: function (e,option) {
            var _this=this;
            if(option.data){
                window.top.topPage.showSuccessMessage("域名已审核！", function () {
                    _this.query(e, option);
                });
            }else{
                window.top.topPage.doDialog({page:this},{text:window.top.message.common['msg'],target: root + "/sysDomainCheck/failureMsg.html?search.id="+option.id,callback:"query"});
            }
        },
        fetchSelectIds: function (e,opt) {
            selectIds = this.getSelectIdsArray(e);
            return true;
        },
        getCheckIds: function () {
            return selectIds;
        }
    });
})