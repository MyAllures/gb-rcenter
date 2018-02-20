/*define(['common/BaseListPage'], function(BaseListPage) {*/
define(['common/BaseListPage','bootstrapswitch'], function(BaseListPage,Bootstrapswitch) {
    var _this=this;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame #userBankFrom";
            this._super("formSelector");
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
            /*  var userid = ("td[name=bank_userId]").val();
             var status = ("input[name=my-checkbox]").val();*/
            $(".tab-pane").css("display","block");
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var id = $(_target).attr("id");
                        var typeCode=$(_target).attr("mold");
                        var siteId = $("#siteId").val();
                        if (state){
                            window.top.topPage.ajax({
                                url: root + '/site/detail/queryMenuAdministration.html',
                                dataType: "json",
                                data: {"siteId":siteId,"search.Id":id},
                                success: function (data) {
                                    if (data.state) {
                                        window.top.topPage.showConfirmMessage("已经有在使用，确认继续开启吗？",function (bol) {
                                            if(bol){
                                                _this.doUpdateDefault(state,typeCode,siteId,id,e,_target);
                                            }else {
                                                _this.query(e);
                                            }
                                        })
                                    } else {
                                        window.top.topPage.showConfirmMessage("确认开启吗？",function (bol) {
                                            if(bol){
                                                _this.doUpdateDefault(state,typeCode,siteId,id,e,_target);
                                            }else {
                                                _this.query(e);
                                            }
                                        })
                                    }
                                }
                            });
                        }else{
                            window.top.topPage.showConfirmMessage("确认关闭吗？",function (bol) {
                                if(bol){
                                    _this.doUpdateDefault(state,typeCode,siteId,id,e,_target);
                                }else {
                                    _this.query(e);
                                }
                            })
                        }
                    }
                });
        },
        doUpdateDefault:function (state,typeCode,siteId,id,e,_target) {
            window.top.topPage.ajax({
                url: root + '/site/detail/updateMenuAdministration.html',
                dataType: "json",
                data: {"search.id":siteId,"typeCode":typeCode,"sysResource.status":state,"sysResource.id":id},
                success: function (data) {
                    if(data){
                        $(_target).attr("isChanged", true);
                        // $(_target).bootstrapSwitch("state", !_target.checked);
                        $("#status").removeClass("label-success");
                        $("#status").addClass("label-danger");
                    }else{
                        page.showPopover(e,{"callback":function () {
                            _this.query(e);
                        }},"danger","操作失败",true);
                    }
                }
            });
        },

      /*  /!**
         * 页面加载事件函数
         *!/
        onPageLoad: function () {
            /!**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             *!/
            this._super();
            var _this = this;
            $(".tab-pane").css("display","block");
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var id = $(_target).attr("id");
                        var typeCode=$(_target).attr("mold");
                        var siteId = $("#siteId").val();
                        var msg="";
                        if(typeCode=="privilege_Info"){
                            msg="请问安全密码，确认关闭吗？"
                        }else if(typeCode=="status_Info"){
                            msg="请问启动状态，确认关闭吗？"
                        }

                        window.top.topPage.ajax({
                            url: root + '/site/detail/updateMenuAdministration.html',
                            dataType: "json",
                            data: {"search.id":siteId,"typeCode":typeCode,"sysResource.status":state,"sysResource.id":id},
                            success: function (data) {
                                if(data.state){
                                    $(_target).attr("isChanged", true);
                                    $("#status").removeClass("label-success");
                                    $("#status").addClass("label-danger");
                                }else{
                                    page.showPopover(e,{"callback":function () {
                                        _this.query(e);
                                    }},"danger","操作失败",true);
                                }
                            }
                        });

                    }
                });
        },
*/
        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var $result=$(".search-list-container",$form);
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
                this.queryCount();
            } else {
                $(event.currentTarget).unlock();
            }
        },


        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        }

    });
});