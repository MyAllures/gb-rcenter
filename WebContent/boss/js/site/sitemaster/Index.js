define(['common/BaseListPage','bootstrapswitch'], function(BaseListPage,Bootstrapswitch) {
    var _this=this;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        noRecordMessage:window.top.message.common["find.norecord"],
        init: function (title) {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");
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
            $(".tab-pane").css("display","block");
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                    {
                        onText: window.top.message.content['floatPic.display.on'],
                        offText: window.top.message.content['floatPic.display.off'],
                        onSwitchChange: function (e, state) {
                            var _target = e.currentTarget;
                            var payRankId = $(_target).attr("payRankId");
                            var type=$(_target).attr("mold");
                            var msg="";
                            if(type=="is_lottery_site"){
                                msg="关闭后该站点将转为混合站,确认关闭吗？"
                            }else if(type=="auto_pay"){
                                msg="关闭后该网站将失去免转功能，确认关闭吗？"
                            }else if(type=="is_bitcoin") {
                                msg = "关闭后该网站将失去比特币取款功能，确认关闭吗？"
                            // }else if(type=="is_enable"){
                            //     msg="关闭后该网站将失去导入玩家功能，确认关闭吗？"
                            }else {
                                msg="关闭后该网站将失去现金取款功能，确认关闭吗？"
                            }
                            if (!$(_target).attr("isChanged")&&!state) {
                                var okLabel = window.top.message.setting['common.ok'];
                                var cancelLabel = window.top.message.setting['common.cancel'];
                                window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                    if (confirm && !$(_target).attr("isChanged")) {
                                        window.top.topPage.ajax({
                                            url: root + '/vSysSiteManage/fetchSiteId.html',
                                            dataType: "json",
                                            data: {"result.paramValue": state, "result.siteId": payRankId,"result.paramCode":type},
                                            success: function (data) {
                                                if(data){
                                                    $(_target).attr("isChanged", true);
                                                    // $(_target).bootstrapSwitch("state", !_target.checked);
                                                    $("#status").removeClass("label-success");
                                                    $("#status").addClass("label-danger");
                                                    _this.query(e);
                                                }else{
                                                    page.showPopover(e,{"callback":function () {
                                                        _this.query(e);
                                                    }},"danger","操作失败",true);
                                                }

                                            }
                                        });
                                    }
                                })
                            }else if(!$(_target).attr("isChanged")&&state) {
                                window.top.topPage.ajax({
                                    url: root + '/vSysSiteManage/fetchSiteId.html',
                                    dataType: "json",
                                    data: {"result.paramValue": state, "result.siteId": payRankId,"result.paramCode":type},
                                    success: function (data) {
                                        if(data){
                                            $(_target).attr("isChanged", true);
                                            // $(_target).bootstrapSwitch("state", !_target.checked);
                                            $("#status").removeClass("label-success");
                                            $("#status").addClass("label-danger");
                                            _this.query(e);
                                        }else{
                                            page.showPopover(e,{"callback":function () {
                                                _this.query(e);
                                            }},"danger","操作失败",true);
                                        }
                                    }
                                });
                                return true;
                            }
                            else if($(_target).attr("isChanged")){
                                $(_target).removeAttr("isChanged");
                                return true;
                            }
                            return false;
                        }
                    });
            /*$("ul li a","div.panel").on("click",function(e){
                var $href = $(this).data("href");
                $("#mainFrame").load(root+$href);
            });*/
            var $bootstrapSwitchs = $('input[type=checkbox][name=my-checkboxstatus]');
            this.unInitSwitch($bootstrapSwitchs)
                .bootstrapSwitch({
                        onSwitchChange: function (e, state) {
                            if (state==true){
                              var  status=1;
                            }else if (state==false){
                              var  status=2;
                            }
                            var $this = $(this);
                            var _target = e.currentTarget;
                            var id = $(_target).attr("Id");
                            var okLabel = window.top.message.setting['common.ok'];
                            var cancelLabel = window.top.message.setting['common.cancel'];
                                    window.top.topPage.ajax({
                                        url: root + '/vSysSiteManage/setStatus.html',
                                        dataType: "json",
                                        data: {"result.id": id,"result.status":status},
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
                        }

                    })
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        /*requery:function(event,option) {
            $("#mainFrame").load(window.top.topPage.getCurrentFormAction(event));
        },

        reloadView:function(e,option){
            if(e.returnValue){
                var id = $("[name=id]").val();
                $("#mainFrame").load(root+"/vSiteMasterManage/viewBasic.html?search.id="+id);
            }
        },*/

        getSelectIdsArray:function(e,option)
        {
            var checkedItems = [],counter = 0;
            $("table tbody input[type=checkbox]",this.getCurrentForm(e)).not("[name=my-checkbox]").each(function(node,obj) {
                if(obj.checked) {
                    checkedItems[counter] = obj.value;
                    counter++;
                }
            });

            return checkedItems;
        },

        getSelectIds:function(e,option)
        {
            return {ids:this.getSelectIdsArray(e,option).join(",")};
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

    });
});