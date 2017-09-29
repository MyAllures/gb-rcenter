/**
 * 资金管理-提现管理审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        allFee: null,
        init: function () {
            this.formSelector = "form[name=withdrawAuditViewForm]";
            this._super(this.formSelector);
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this=this;
            //复制按钮
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                var opt = {};
                if($(e.target).attr("id")=="transactionNo-copy"){
                    opt.placement = "left";
                }else{
                    opt.placement = "right";
                }
                page.showPopover(e, opt, 'success', window.top.message.fund_auto['复制成功'], true);
            });

            $("[about='playerAccount']").click(function () {
                if ($(this).next().attr('style') != 'display: block;') {
                    $(this).next().attr('style', 'display: block;');
                } else {
                    $(this).next().removeAttr('style');
                }
            });
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 锁定订单
         */
        lockOrder: function (e, opt) {
            var _this = this;
            var id = $("[name='search.id']").val();
            window.top.topPage.ajax({
                type: "post",
                url: root + "/fund/withdraw/lockOrder.html",
                data: {"search.id": id},
                dataType: "json",
                success: function (data) {
                    opt.placement = 'right';
                    if (data == true) {
                        //page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
                        window.location.reload();
                    } else {
                        page.showPopover(e, opt, 'danger', window.top.message.fund_auto['本条订单已被其他管理员锁定'], true);
                    }
                    $(e.target).unlock();
                }
            });
        },
        /**
         * 取消锁定订单
         * @param e
         * @param opt
         */
        cancelLockOrder: function (e, opt) {
            var id = $("[name='search.id']").val();
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/cancelLockOrder.html?search.id=" + id,
                dataType: "json",
                success: function (data) {
                    opt.placement = 'right';
                    if (data == true) {
                        e.returnValue = true;
                        window.location.reload();
                        /*opt.callback = "refreshBack";
                        e.page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);*/
                    } else {
                        e.page.showPopover(e, opt, 'danger', window.top.message.fund_auto['本条订单已被其他管理员锁定'], true);
                    }
                }
            })
        },
        /**
         * 刷新页面
         * @param e
         * @param opt
         */
        refreshBack: function (e, opt) {
            if(e.returnValue) {
                window.location.reload();
            }
        },
        /**
         * 取款审核成功
         * @param e
         * @param opt
         */
        withdrawSuccess: function (e, opt) {
            var _this = this;
            var isCheck = opt.isCheck;
            if (isCheck == false) {
                e.page.showPopover(e, opt, 'warning', window.top.message.fund_auto['本条订单已被其他管理员锁定'], true);
            } else {
                var id = $("input[name='search.id']").val();
                var allFee = $("input[name=allFee]").val();
                var btnOption = {};
                btnOption.target = root + "/fund/withdraw/putConfirmCheck.html?search.id=" + id + "&allFee=" + allFee;
                btnOption.text = opt.text;
                btnOption.callback = "withdrawBack";
                window.top.topPage.doDialog(e, btnOption);
                var remarkContent = $("[name=remarkContent]").val();
                window.top.topPage.remarkContent = remarkContent;
                //this.feeList();
                /*window.top.topPage.ajax({
                    url: root + "/fund/withdraw/withdrawSuccess.html",
                    data: this.getCurrentFormData(e),
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        var state = data.state;
                        if (state == true) {
                            _this.returnValue = true;
                            e.page.showPopover(e, opt, 'success', data.msg, true);
                        } else {
                            e.page.showPopover(e, opt, 'danger', data.msg, true);
                        }
                    }
                });*/
            }
        },
        /**
         * 取款审核操作成功后回调
         * @param e
         * @param opt
         */
        withdrawBack: function (e, opt) {
            if (e.returnValue == true) {
                this.returnValue = true;
                this.closePage();
            }
        },
        /**
         * 取款失败
         * @param e
         * @param opt
         */
        withdrawFailure: function (e, opt) {
            var isCheck = opt.isCheck;
            var id = $("input[name='search.id']").val();
            var _this = this;
            if (isCheck == false) {
                e.page.showPopover(e, opt, 'warning', window.top.message.fund_auto['本条订单已被其他管理员锁定'], true);
            } else {
                var remarkContent = $("[name=remarkContent]").val();
                window.top.topPage.ajax({
                    url: root + "/fund/withdraw/hasReason.html",
                    data: this.getCurrentFormData(e),
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.state == true) {
                            window.location.href = root + "/fund/withdraw/putCheckFailure.html?search.id=" + id;
                            window.top.topPage.remarkContent = remarkContent;
                            window.top.topPage.feeList = data.feeList;
                            _this.resizeDialog();
                        } else {
                            _this.confirmFailure(e, opt);
                        }
                    }
                })
            }
        },
        /**
         * 确认失败
         * @param e
         * @param opt
         */
        confirmFailure: function (e, opt) {
            var _this = this;
            window.top.topPage.showConfirmMessage(window.top.message.fund_auto["确定审核失败吗"], function (state) {
                if(state){
                    window.top.topPage.ajax({
                        url: root + "/fund/withdraw/withdrawFail.html",
                        data: _this.getCurrentFormData(e),
                        dataType: 'json',
                        type: 'POST',
                        success: function (data) {
                            var state = data.state;
                            if (state == true) {
                                _this.returnValue = true;
                                e.page.showPopover(e, opt, 'success', data.msg, true);
                            } else {
                                e.page.showPopover(e, opt, 'danger', data.msg, true);
                            }
                        }
                    })
                } else{
                    $(e.currentTarget).unlock();
                }
            });

        },
        /**
         * 审核拒绝
         * @param e
         * @param opt
         */
        withdrawReject: function (e, opt) {
            var isCheck = opt.isCheck;
            var _this = this;
            var id = $("input[name='search.id']").val();
            if (isCheck == false) {
                e.page.showPopover(e, opt, 'warning', window.top.message.fund_auto['本条订单已被其他管理员锁定'], true);
            } else {
                var remarkContent = $("[name=remarkContent]").val();
                window.top.topPage.ajax({
                    url: root + "/fund/withdraw/hasRefuseReason.html",
                    data: this.getCurrentFormData(e),
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.state == true) {
                            window.location.href = root + "/fund/withdraw/putConfirmRefuses.html?search.id=" + id;
                            window.top.topPage.remarkContent = remarkContent;
                            window.top.topPage.feeList = data.feeList;
                            _this.resizeDialog();
                        } else {
                            _this.confirmReject(e, opt);
                        }
                    }
                })
            }
        },
        confirmReject: function (e, opt) {
            var _this = this;
            window.top.topPage.showConfirmMessage(window.top.message.fund_auto["确定拒绝吗"], function (state) {
                if(state){
                    window.top.topPage.ajax({
                        url: root + "/fund/withdraw/withdrawReject.html",
                        data: _this.getCurrentFormData(e),
                        dataType: 'json',
                        type: 'POST',
                        success: function (data) {
                            var state = data.state;
                            if (state == true) {
                                _this.returnValue = true;
                                e.page.showPopover(e, opt, 'success', data.msg, true);
                            } else {
                                e.page.showPopover(e, opt, 'danger', data.msg, true);
                            }
                        }
                    })
                } else{
                    $(e.currentTarget).unlock();
                }
            });

        },
        editRemark: function (e, opt) {
            $(".edit-btn-css").addClass("hide");
            $(".save-btn-css").removeClass("hide");
            $(".cancel-btn-css").removeClass("hide");
            $("[name='remarkContent']").removeAttr("readonly");
            $(e.currentTarget).unlock();
        },
        cancelEdit: function (e, opt) {
            $(".edit-btn-css").removeClass("hide");
            $(".save-btn-css").addClass("hide");
            $(".cancel-btn-css").addClass("hide");
            $("[name='remarkContent']").attr("readonly", "readonly");
            $(e.currentTarget).unlock();
        },
        afterSaveRemark: function (e, opt) {
            var _this = this;
            var status = $("[name='withdrawStatus']").val();
            if (opt.data.state) {
                if(status=='1'){
                    opt.callback= function () {

                    };
                }else{
                    opt.callback='cancelEdit';
                }

                e.page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
            } else {
                e.page.showPopover(e, opt, 'danger', window.top.message.common['operation.fail'], true);
            }
        },
        userDetail: function (e){
            var origin = window.location.origin;
            var playerId = $("input[name='playerId']").val();
            var url = origin + "/mcenter/#/player/playerView.html?search.id=" + playerId;
            window.open(url);
            $(e.currentTarget).unlock();
        },
        agentDetail: function (e){
            var origin = window.location.origin;
            var agentId = $("input[name='agentId']").val();
            var url = origin + "/mcenter/#/userAgent/agent/detail.html?search.id=" + agentId;
            window.open(url);
            $(e.currentTarget).unlock();
        }
    });
});