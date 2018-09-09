define(['common/BaseListPage', 'jsrender', 'bootstrapswitch'], function(BaseListPage,Bootstrapswitch) {
    var _this = this;

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectIds:null,
        noRecordMessage:window.top.message.common["find.norecord"],
        init: function (title) {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");
            _this = this;
            this.noRecordMessage = window.top.message.common["find.norecord"];
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
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
                            var _msg = "";
                            if (state) {
                                _msg ="确认启用"+id+"站点";
                            } else {
                                _msg = "确认禁用"+id+"站点";
                            }
                            if (state==true){
                              var  status=1;
                            }else if (state==false){
                              var  status=2;
                            }
                            window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                                if (confirm) {
                                    window.top.topPage.ajax({
                                        url: root + '/vSysSiteManage/setStatus.html',
                                        dataType: "json",
                                        data: {"result.id": id, "result.status": status},
                                        success: function (data) {
                                            if (data) {
                                                $(_target).attr("isChanged", true);
                                                $("#status").removeClass("label-success");
                                                $("#status").addClass("label-danger");
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

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        getSelectIdsArray: function (e, option) {
            var checkedItems = [], counter = 0;
            $("table tbody input[type=checkbox]", this.getCurrentForm(e)).not("[name=my-checkbox]").each(function (node, obj) {
                if (obj.checked) {
                    checkedItems[counter] = obj.value;
                    counter++;
                }
            });
            return checkedItems;
        },

        getSelectIds: function (e, option) {
            return this.getSelectIdsArray(e, option).join(",");
        },

        /**
         * 搜索查询
         * @param event
         * @param option
         */
        searchQuery:function(event,option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:root+$("div.panel ul li.active a").attr("data-href"),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        $("div.search-list-container").html(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        },

        accountSaveCallBack:function(event,option) {
            if (event.returnValue==true) {
                this.query(event,option);
            } else if (event.returnValue) {
                $("#mainFrame").load(root+"/vSysSiteManage/siteBasic.html?search.step=1&search.sysUserId="+event.returnValue);
            }
        },

        batchAddSiteMaintain: function (e, option) {
            var ids = this.getSelectIds(e, option);
            option.target = root + "/sysSite/batchSiteMaintain.html?opType=add&siteIds="+ids;
            window.top.topPage.doDialog(e, option);
        },

        batchCancelSiteMaintain: function (e, option) {
            var ids = this.getSelectIds(e, option);
            option.target = root + "/sysSite/batchSiteMaintain.html?opType=cancel&siteIds="+ids;
            window.top.topPage.doDialog(e, option);
        },
        showMsg:function (e, opt) {
            if(opt.data.state){
                page.showPopover(e,{},"success","操作成功",true);
            }
        }
    });
});