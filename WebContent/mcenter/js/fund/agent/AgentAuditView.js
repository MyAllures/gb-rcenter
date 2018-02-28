
/**
 * 资金管理-代理取款审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.resizeDialog();//自动弹窗iframe高度
        },
        onPageLoad: function () {
           this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            //复制按钮
            var clip = new clipboard('a[name="copy"]');
            clip.on('success', function (e) {
                e.clearSelection();
                e.currentTarget = e.trigger;
                var opt = {};
                if($(e.target).attr("id")=="transactionNo-copy"){
                    opt.placement = "left";
                }else{
                    opt.placement = "right";
                }
                page.showPopover(e, opt, 'success', window.top.message.fund_auto['复制成功'], true);
            });

            clip.on('error', function (e) {
                console.error('复制失败:', e.action);
            });
            //刷新
            $(".fa-refresh").on("click", function (e) {
                window.location.reload();
            })
        },
        /**
         * 选择失败标题原因，相应失败内容在textarea里显示
         * @param e
         */
        reasonTitleChange:function(e){
            var value = e.key;
            $("textarea[name='result.reasonContent']").val(select.getSelected("[name='reasonTitle']").attr("holder"));
            $("input[name='groupCode']").val(select.getSelected("[name='reasonTitle']").attr("groupCode"));
            page.reasonPreviewMore.viewFailureDetail(e);
        },
        /**
         * 跳转至确认审核通过页面
         *
         */
        putConfirmCheck: function (e,btnOption) {
            var id = $('input[name="result.id"]').val();
            var remarkContent = $("textarea[name='remarkContent']").val();
            var withdrawAmount = $('input[name=withdrawAmount]').val();
            btnOption.target = root + "/fund/vAgentWithdrawOrder/putConfirmCheck.html?search.id=" + id + "&remarkContent=" + remarkContent+"&search.withdrawAmount="+withdrawAmount;
            btnOption.callback = function (e,p) {
                if(e.returnValue) {
                    $('.commandNextId').click();
                }
            };
            window.top.topPage.doDialog(e,btnOption);
        },
        /**
         * 锁定订单刷新
         */
        withdrawRefresh: function(e,opt) {
            opt.placement = "right";
            if(opt.data.state){
                page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
            }else{
                page.showPopover(e, opt, 'danger', window.top.message.common['operation.fail'], true);
            }

            setTimeout(function () {
                window.location.reload();
            },1000);
        },
        isAudit: function (e,opt) {
            var id = $("[name='result.id']").val();
            var flag = false;
            window.top.topPage.ajax({
                type: "post",
                url: root + "/fund/vAgentWithdrawOrder/isAudit.html",
                data: {"search.id": id},
                dataType: "json",
                async:false,
                success: function (data) {
                    if(!data.state){
                        flag = true;
                    }else{
                        page.showPopover(e, opt, 'danger', "该记录已经审核！", true);
                    }
                }
            });
            return flag;
        },
        /**
         * 取款审核
         */
        putAuditStatus: function (e,p) {
            var id = $("[name='result.id']").val();
            var _this=this;
            var datas = window.top.topPage.getCurrentFormData(e);
            //var val = $("textarea[name='result.reasonContent']").val();
            window.top.topPage.ajax({
                type:"post",
                url:root + "/fund/vAgentWithdrawOrder/isAudit.html",
                data:{"search.id":id},
                dataType:"json",
                success: function (data) {
                    //判断是否已经审核过
                    if(!data.state){
                        window.top.topPage.ajax({
                            type : 'POST',
                            url : root + "/fund/vAgentWithdrawOrder/putAuditStatus.html",
                            dataType:"json",
                            data :datas,
                            success : function(data) {
                                if (data.state) {
                                    window.top.topPage.showSuccessMessage(data.msg,function(result){
                                        _this.returnValue=data.state;
                                        window.top.topPage.closeDialog();
                                    });
                                }
                            }
                        })
                    }else{
                        window.top.topPage.showErrorMessage(window.top.message.fund['playerWithdraw.isAudit.true']);
                        $(e.currentTarget).unlock();
                    }
                }
            });
        },
        getContent:function(){
            var remarkContent = $('textarea[name=remarkContent]').val();
            var withdrawAmount = $('input[name=withdrawAmount]').val();
            return   {"remarkContent":remarkContent,"withdrawAmount":withdrawAmount};
        },
        //下一条取款记录
        withdrawAuditOk: function (e,opt) {
            var _this = this;
            if(e.returnValue){
                page.showPopover(e, {"callback": function () {
                    _this.returnValue = true;
                    _this.closePage();
                }}, 'success', window.top.message.common['operation.success'], true);
            }
            /*if(!e.returnValue){
                if(opt.data&&opt.data.state){
                    page.showPopover(e, {}, 'success', window.top.message.common['operation.success'], true);
                    _this.returnValue = true;
                    setTimeout(function () {
                        _this.closePage();
                    },1000);

                }else{
                    page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                }
            }*/


            /*if (e.returnValue) {
                $(".commandNextId").click();
            }*/
        },
        /**
         * 进入取款审核页面点击锁定订单看是否锁定
         */
        lockOrder: function (e) {
            var _this = this;
            var id = $("[name='result.id']").val();
            window.top.topPage.ajax({
                type:"post",
                url:root+"/fund/vAgentWithdrawOrder/isAuditPerson.html",
                data:{"search.id":id},
                success: function (data) {
                    if(data=="true"){
                        window.top.topPage.ajax({
                            type:"post",
                            url:root+"/fund/vAgentWithdrawOrder/lockOrder.html",
                            data:{"search.id":id},
                            success: function (datas) {
                                var _data = JSON.parse(datas);
                                if(_data.state){
                                    page.showPopover(e, {placement:'right'}, 'success', window.top.message.common['operation.success'], true);
                                    setTimeout(function() {
                                        window.location.reload();
                                    },300);
                                }else{
                                    page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                                }
                                $(e.currentTarget).unlock();
                            }
                        })
                    }else{
                        var username = data;
                        page.showPopover(e, {}, 'success', username+"正在对该订单正在进行审核！", true);
                        //window.top.topPage.showWarningMessage(username+"正在对该订单正在进行审核！");

                        setTimeout(function(){
                            _this.closePage();
                            /*window.top.topPage.closeDialog();
                            $("#mainFrame").load(root+"/fund/vAgentWithdrawOrder/agentAudit.html?search.id="+id);*/
                        },3000);
                        $(e.currentTarget).unlock();
                    }
                }
            });
        },
        showErrorReason: function (e, opt) {
            if(!this.isAudit(e,opt)){
                page.showPopover(e, opt, 'danger', "该记录已经审核！", true);
                return;
            }
            var _this = this;
            var oldElm = e;
            var oldOpt = opt;
            window.top.topPage.ajax({
                type: "post",
                url: root + "/fund/vAgentWithdrawOrder/hasReason.html",
                dataType: "json",
                async:false,
                success: function (data) {
                    if(data.state){
                        window.top.topPage.doDialog(oldElm,oldOpt);
                    }else{
                        window.top.topPage.showConfirmMessage("确认审核失败吗？", function (state) {
                            if(state){
                                _this.doAuditFail(oldElm,oldOpt);
                            }
                        });

                    }
                }
            });
            return false;
        },
        doAuditFail: function (e,opt) {
            var _this = this;
            var datas = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type : 'POST',
                url : root + "/fund/vAgentWithdrawOrder/putAuditStatus.html?search.transactionStatus=3",
                dataType:"json",
                data :datas,
                success : function(data) {
                    if(data.state){
                        page.showPopover(e, {"callback": function () {
                            _this.returnValue = true;
                            _this.closePage();
                        }}, 'success', "退回订单，扣款回存", true);
                    }else{
                        page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                    }
                }
            })
        },
        showRefuseReason: function (e, opt) {
            if(!this.isAudit(e,opt)){
                page.showPopover(e, opt, 'danger', "该记录已经审核！", true);
                return;
            }
            var _this = this;
            var oldElm = e;
            var oldOpt = opt;

            window.top.topPage.ajax({
                type: "post",
                url: root + "/fund/vAgentWithdrawOrder/hasRefuseReason.html",
                dataType: "json",
                async:false,
                success: function (data) {
                    if(data.state){
                        window.top.topPage.doDialog(oldElm,oldOpt);
                    }else{
                        window.top.topPage.showConfirmMessage("确认拒绝吗？", function (state) {
                            if(state){
                                _this.doAuditRefuse(oldElm,oldOpt);
                            }
                        });

                    }
                }
            });
            return false;
        },
        doAuditRefuse: function (e, opt) {
            var _this = this;
            var datas = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type : 'POST',
                url : root + "/fund/vAgentWithdrawOrder/putAuditStatus.html?search.transactionStatus=4",
                dataType:"json",
                data :datas,
                success : function(data) {
                    if(data.state){
                        page.showPopover(e, {"callback": function () {
                            _this.returnValue = true;
                            _this.closePage();
                        }}, 'success', "通过订单，扣除取款", true);
                    }else{
                        page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                    }
                }
            })
        },
        failToReturn: function (e, opt) {
            if(e.returnValue){
                this.returnValue = true;
                this.closePage();
            }
        },
        editRemark: function (e, opt) {
            $(".edit-btn-css").addClass("hide");
            $(".save-btn-css").removeClass("hide");
            $(".cancel-btn-css").removeClass("hide");
            if($("[name='transactionStatus']").val()!='1') {
                $("[name='remarkContent']").removeAttr("readonly");
            }
            $(e.currentTarget).unlock();
        },
        cancelEdit: function (e, opt) {
            $(".edit-btn-css").removeClass("hide");
            $(".save-btn-css").addClass("hide");
            $(".cancel-btn-css").addClass("hide");
            if(!e.afterSave){
                $("[name='remarkContent']").val($("#auditRemark").val());
            }
            if($("[name='transactionStatus']").val()!='1') {
                $("[name='remarkContent']").attr("readonly", "readonly");
            }
            $(e.currentTarget).unlock();
        },
        afterSaveRemark: function (e, opt) {
            var _this = this;
            if(opt.data.state){
                $("#auditRemark").val($("[name='remarkContent']").val());
                page.showPopover(e, {}, 'success', window.top.message.common['operation.success'], true);
                setTimeout(function () {
                    e.afterSave = true;
                    _this.cancelEdit(e,{});
                },2000);
            }else{
                page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
            }
        }
    });
});