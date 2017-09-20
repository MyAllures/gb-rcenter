/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage','gb/share/ListFiltersPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            //this.initShowTab();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            //this.initShowDetail();
            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });

        },
        /** 声音开关 */
        toneSwitch: function (e) {
            var tone = $('[name=switchVal]').val();
            if (e.key == tone) return;
            window.top.topPage.ajax({
                url: root + '/fund/vAgentWithdrawOrder/toneSwitch.html?paramVal='+e.key,
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        $('[name=switchVal]').val(e.key);

                        var obj = {currentTarget:$("div[selectdiv='toneSwitch']")};
                        if (e.key == 0) {
                            page.showPopover(obj, {}, 'success', window.top.message.fund_auto['声音已开启'], true);
                        } else {
                            page.showPopover(obj, {}, 'success', window.top.message.fund_auto['声音已关闭'], true);
                        }
                    }
                }
            });
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.fund_auto['复制成功'], true);
            });
            if($("#todaySales").val()=='true'){
                $("#todayTotal").text($("#todayTotalSource").text());
                $("#totalSumTarget").parent().parent().hide();
                $("#todayTotal").parent().parent().show();
            }else{
                $("#totalSumTarget").text($("#totalSumSource").text());
                $("#todayTotal").parent().parent().hide();
                $("#totalSumTarget").parent().parent().show();
            }
        },
        /**
         * 刷新
         * @param e
         */
        queryAgentWithdrawRemark:function(e){
            var target = e.currentTarget;
            var data_href = $(target).parents('.col-lg-12').prev().find("a[name=returnView]");
            $(data_href).click();
        },
        /**
         * 提现审核前先判断订单是否已锁定详情页面  和  提现审核详情页面
         *
         * @param vo
         * @return
         */
        agentWithdrawAuditView: function (e) {
            var _this = e.currentTarget;
            var id = $(_this).prev("input[name=id]").val();
            window.top.topPage.ajax({
                type:"post",
                url:root+"/fund/vAgentWithdrawOrder/isAuditPerson.html",
                data:{'search.id':id},
                success: function (data) {
                    if(data=="true"){
                        window.top.topPage.ajax({
                            type:"post",
                            url:root+"/fund/vAgentWithdrawOrder/agentAudit.html",
                            data:{'search.id':id},
                            success: function (data) {
                                $("#mainFrame").html(data);
                            }
                        })
                    }else{
                        var username = data;
                        window.top.topPage.showWarningMessage(username+"正在对该订单正在进行审核！");
                        setTimeout(function(){
                            window.top.topPage.closeDialog();
                            $("#mainFrame").load(root+"/fund/vAgentWithdrawOrder/agentAudit.html?search.id="+id);
                        },3000);
                        $(e.currentTarget).unlock();
                    }
                }
            });
        },
        withdrawRefresh: function(e,opt) {
            if(opt.data.state){
                page.showPopover(e, {}, 'success', window.top.message.common['operation.success'], true);
            }else{
                page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
            }
            setTimeout(function () {
                $("[name='returnView']").click();
            },2000);
        },
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
                                    page.showPopover(e, {}, 'success', window.top.message.common['operation.success'], true);
                                    setTimeout(function() {
                                        $("[name='returnView']").click();
                                    },2000);
                                }else{
                                    page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                                }
                                $(e.currentTarget).unlock();
                            }
                        })
                    }else{
                        var username = data;
                        page.showPopover(e, {}, 'success', username+"正在对该订单正在进行审核！", true);
                        $(e.currentTarget).unlock();
                    }
                }
            });
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
                        page.showPopover(e, {}, 'danger', "该记录已经审核！", true);
                    }
                }
            });
            return flag;
        },
        showNextRecord: function (e, opt) {
            if(e.returnValue){
                var nextRecordId = $("[name='nextRecordId']").val();
                if(nextRecordId){
                    window.top.topPage.ajax({
                        url: root + "/fund/vAgentWithdrawOrder/showAgentAuditDetail.html?search.id="+nextRecordId,
                        success: function (data) {
                            $("#mainFrame").html(data);
                        }
                    });
                }else{
                    $("[name=gotoList]").click();
                }
            }

        },
        showErrorReason: function (e, opt) {
            if(!this.isAudit(e,opt)){
                page.showPopover(e, {}, 'danger', "该记录已经审核！", true);
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
                        _this.doAuditFail(oldElm,oldOpt);
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
                        page.showPopover(e, {"callback": function (obj, option) {
                            obj.returnValue = true;
                            _this.showNextRecord(obj,option);
                        }}, 'success', window.top.message.common['operation.success'], true);

                    }else{
                        page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                    }
                }
            })
        },
        showRefuseReason: function (e, opt) {
            if(!this.isAudit(e,opt)){
                page.showPopover(e, {}, 'danger', "该记录已经审核！", true);
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
                        _this.doAuditRefuse(oldElm,oldOpt);
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
                        page.showPopover(e, {"callback": function (e, opt) {
                            e.returnValue = true;
                            _this.showNextRecord(e,opt);
                        }}, 'success', window.top.message.common['operation.success'], true);

                    }else{
                        page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
                    }
                    //_this.withdrawAuditOk(e,opt);
                }
            })
        },
        failToReturn: function (e, opt) {
            if(e.returnValue){
                $("[name='returnView']").click();
            }
        },
        reloadDetailPage: function (e,opt) {
            page.showPopover(e, {}, 'success', window.top.message.common['operation.success'], true);
            setTimeout(function () {
                $("[name='returnView']").click();
            },2000);

        },
        auditCallBack: function (e, opt) {
            if(e.returnValue){
                this.query(e,opt);
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
            if($("[name='transactionStatus']").val()!='1'){
                $("[name='remarkContent']").attr("readonly","readonly");
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
                    _this.cancelEdit(e,opt);
                },2000);

            }else{
                page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
            }
        },
        getContent:function(){
            var remarkContent = $('textarea[name=remarkContent]').val();
            var withdrawAmount = $('input[name=withdrawAmount]').val();
            return   {"remarkContent":remarkContent,"withdrawAmount":withdrawAmount};
        },
        selectListChange : function (e) {
            var target = $(e.currentTarget).parent().parent().parent().parent().next();
            $(target).attr("name", e.key);
            $(target).attr("placeholder", e.key == 'search.username'?"多个账号，用半角逗号隔开":e.value);
        }
    });
});