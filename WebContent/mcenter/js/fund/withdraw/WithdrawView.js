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
            this.formSelector="form[name=withdrawViewForm]";
            this._super(this.formSelector);
            this.allFee = this.getAllFee();
            $("#mainFrame .return-btn").css("display","");
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //复制按钮
            this.copyText('a[name="copy"]');
            $("[about='playerAccount']").click(function () {
                if ($(this).next().attr('style') != 'display: block;') {
                    $(this).next().attr('style', 'display: block;');
                } else {
                    $(this).next().removeAttr('style');
                }
            });

            //查看稽核记录
            $(".audit-records .chak").click(function () {
                $(this).hide();
                $(".audit-records-list").show();
                $(".audit-records .shouq").show();
            });
            $(".audit-records .shouq").click(function () {
                $(this).hide();
                $(".audit-records-list").hide();
                $(".audit-records .chak").show();
            })
        },
        myValidateForm: function (e, opt) {
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            var allFee = this.getAllFee();

            var withdrawActualAmount = $("[name=withdrawActualAmount]").val();
            if (!withdrawActualAmount) {
                withdrawActualAmount = 0;
            }

            var counterFee = $("[name=counterFee]").val();
            if (counterFee) {
                allFee += parseFloat(counterFee);
            }
            $("[name=allFee]").val(allFee);
            return true;

        },
        getAllFee: function () {
            var allFee = parseFloat(0);
            $(".fee-money").each(function (idx, item) {
                if ($(item).val() != null && $(item).val() != "") {
                    allFee += parseFloat($(item).val());
                }
            });
            return allFee;
        },
        showEditField: function (e, opt) {
            $(".fee-show-span").addClass("hide");
            $(".fee-money").removeClass("hide");
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
                    $(e.target).unlock();
                    opt.placement = 'right';
                    if (data == true) {
                        e.returnValue = true;
                        _this.refreshBack(e,opt,id);
                        //page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
                    } else {
                        page.showPopover(e, opt, 'danger', '本条订单已被其他管理员锁定！', true);
                    }

                }
            });
        },
        /**
         * 取消锁定订单
         * @param e
         * @param opt
         */
        cancelLockOrder: function (e, opt) {
            var _this = this;
            var id = $("[name='search.id']").val();
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/cancelLockOrder.html?search.id=" + id,
                dataType: "json",
                success: function (data) {
                    opt.placement = 'right';
                    if (data == true) {
                        e.returnValue = true;
                        _this.refreshBack(e,opt,id);
                        //opt.callback = "refreshBack";
                        //page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
                    } else {
                        page.showPopover(e, opt, 'danger', '本条订单已被其他管理员锁定！', true);
                    }
                }
            })
        },
        /**
         * 刷新页面
         * @param e
         * @param opt
         */
        refreshBack: function (e, opt,id) {
            if(e.returnValue) {
                //var id = $("input[name='search.id']").val();
                $("#mainFrame").load(root + "/fund/withdraw/withdrawAuditView.html?search.id=" + id + "&pageType=detail");
            }
        },
        /**
         * 取款审核成功
         * @param e
         * @param opt
         */
        withdrawSuccess: function (e, opt) {
            var isCheck = opt.isCheck;
            if (isCheck == false) {
                e.page.showPopover(e, opt, 'warning', '本条订单已被其他管理员锁定！', true);
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
                this.feeList();
            }
        },
        feeList: function () {
            var feeList = $("input[name^='feeList']").serializeArray();
            var o = [];
            $.each(feeList, function () {
                var name = this.name;
                var value = this.value;
                var split = name.split('.');
                var count = split[0].substring(8, split[0].length - 1);
                var data = {};
                if (o[count]) {
                    data = o[count];
                }
                data[split[1]] = value;
                o[count] = data;
            });
            window.top.topPage.feeList = o;
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
                e.page.showPopover(e, opt, 'warning', '本条订单已被其他管理员锁定！', true);
            } else {
                var remarkContent = $("[name=remarkContent]").val();
                window.top.topPage.ajax({
                    url: root + "/fund/withdraw/hasReason.html",
                    data: this.getCurrentFormData(e),
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.state == true) {
                            var btnOption = {};
                            btnOption.target = root + "/fund/withdraw/putCheckFailure.html?search.id=" + id;
                            btnOption.text = opt.text;
                            btnOption.callback = "withdrawBack";
                            window.top.topPage.doDialog(e, btnOption);
                            window.top.topPage.remarkContent = remarkContent;
                            window.top.topPage.feeList = data.feeList;
                        } else {
                            window.top.topPage.showConfirmMessage("确定审核失败吗？", function (state) {
                                if(state){
                                    _this.confirmFailure(e, opt);
                                } else{
                                    $(e.currentTarget).unlock();
                                }
                            });
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
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/withdrawFail.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        e.returnValue = true;
                        opt.callback = "withdrawBack";
                        e.page.showPopover(e, opt, 'success', data.msg, true);
                    } else {
                        e.page.showPopover(e, opt, 'danger', data.msg, true);
                    }
                }
            })
        },
        /**
         * 审核拒绝
         * @param e
         * @param opt
         */
        withdrawReject: function (e, opt) {
            var isCheck = opt.isCheck;
            var _this = this;
            if (isCheck == false) {
                e.page.showPopover(e, opt, 'warning', '本条订单已被其他管理员锁定！', true);
            } else {
                var remarkContent = $("[name=remarkContent]").val();
                var id = $("input[name='search.id']").val();
                window.top.topPage.ajax({
                    url: root + "/fund/withdraw/hasRefuseReason.html",
                    data: this.getCurrentFormData(e),
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.state == true) {
                            var btnOption = {};
                            btnOption.target = root + "/fund/withdraw/putConfirmRefuses.html?search.id=" + id;
                            btnOption.text = opt.text;
                            btnOption.callback = "withdrawBack";
                            window.top.topPage.doDialog(e, btnOption);
                            window.top.topPage.remarkContent = remarkContent;
                            window.top.topPage.feeList = data.feeList;
                        } else {
                            window.top.topPage.showConfirmMessage("确认审核拒绝吗？", function (state) {
                                if(state){
                                    _this.confirmReject(e, opt);
                                } else{
                                    $(e.currentTarget).unlock();
                                }
                            });
                        }
                    }
                })
            }
        },
        test: function (result) {
            console.log(result)
        },
        /**
         * 确认审核拒绝
         * @param e
         * @param opt
         */
        confirmReject: function (e, opt) {
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/withdrawReject.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        e.returnValue = true;
                        opt.callback = "withdrawBack";
                        e.page.showPopover(e, opt, 'success', data.msg, true);
                    } else {
                        e.page.showPopover(e, opt, 'danger', data.msg, true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 取款审核操作成功后回调
         * @param e
         * @param opt
         */
        withdrawBack: function (e, opt) {
            if (e.returnValue == true) {
                $("span[id=unReadTaskCount]").text(parseInt($("span[id=unReadTaskCount]").text()) - 1);
                $("#mainFrame").load(root + "/fund/withdraw/withdrawList.html");
            }
        },
        /**
         * 跳转至下一条
         * @param e
         * @param opt
         */
        checkNext: function (e, opt) {
            var id = $("input[name='search.id']").val();
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/hasNext.html?search.id=" + id,
                dataType: 'json',
                success: function (data) {
                    var status = data.status;
                    if (status == true) {
                        $("#mainFrame").load(root + "/fund/withdraw/withdrawAuditView.html?search.id=" + data.id + "&pageType=detail");
                    } else {
                        e.page.showPopover(e, opt, 'warning', "没有下一条了！", true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
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
            var checkRemark = $("input[name=checkRemark]").val();
            $("[name='remarkContent']").val(checkRemark);
            $("[name='remarkContent']").attr("readonly", "readonly");
            $(e.currentTarget).unlock();
        },
        afterSaveRemark: function (e, opt) {
            var _this = this;
            var status = $("[name='withdrawStatus']").val();
            if (opt.data.state) {
                var checkRemark = $("textarea[name='remarkContent']").val();
                $("input[name=checkRemark]").val(checkRemark);
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
        setTextValue: function (name, val) {
            $("[name='" + name + "']").val(val);
        },
        getTextValue: function (name) {
            return $("[name='" + name + "']").val();
        },
        setAuditFee: function (id, formatVal,realVal) {
            $("#" + id).html(formatVal);
            if(id=="actual-amount-div"){
                $(".amount-copy-data").attr("data-clipboard-text",realVal);
            }
        },
        getCounterFee: function () {
            return $("[name='counterFee']").val();
        },
        gotoGameOrder: function (e, opt) {
            if(e.returnValue){
                var url = "/report/gameTransaction/list.html?isLink=true&outer=-1&search.username="+$("#username").val()+"&searchKey=search.username&"+ e.returnValue;
                $("#toGameOrder").attr("href",url);
                $("#toGameOrder").click();
            }
        },
        /**
         * 查看所有取款订单
         * @param e
         */
        playerWithdraw: function (e) {
            var data = {
                date:new Date(),
                'search.transactionWays':'player_withdraw',
                'search.usernames':$("#username").val(),
                'search.userTypes':'username',
                'search.outer':'-1'
            };
            this.gotoFundsRecord(e,data);
        },
        /**
         * 所有失败订单
         */
        playerWithdrawFail: function (e) {
            var data = {
                date:new Date(),
                'search.transactionWays':'player_withdraw',
                'search.usernames':$("#username").val(),
                'search.userTypes':'username',
                'search.outer':'-1',
                'search.status':'failure'
            };
            this.gotoFundsRecord(e,data);
        },
        /**
         * 所有拒绝订单
         */
        playerWithdrawReject: function (e) {
            var data = {
                date:new Date(),
                'search.transactionWays':'player_withdraw',
                'search.usernames':$("#username").val(),
                'search.userTypes':'username',
                'search.outer':'-1',
                'search.status':'reject'
            };
            this.gotoFundsRecord(e,data);
        },
        /**
         * 公共跳转资金记录方法
         */
        gotoFundsRecord: function (e,data) {
            window.top.topPage.ajax({
                loading: true,
                url: root+"/report/vPlayerFundsRecord/fundsLog.html",
                type: "post",
                data: data,
                dataType: "html",
                success: function (data) {
                    $("#mainFrame").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(e.currentTarget).unlock();
                }
            });
        }

    });
});