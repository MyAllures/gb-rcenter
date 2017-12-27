/**
 * 返水明细-添加选择
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function (form) {
            this._super(form);

            //绑定click方法
            $("#ichecks_0").click(function () {
                var checked =$('#ichecks_0').is(':checked');
                if(checked){
                    $("#div_batchSettleRakeBack").css("display","").removeClass('show').addClass('hide');
                }else{
                    $("#div_batchSettleRakeBack").css("display","").removeClass('hide').addClass('show');
                }
            });

            $("input[id^='ichecks_item']").on("click", function (i) {
                // alert(i);
                var existChecked = false;
                $(".i-checks").each(function (node,obj) {
                    existChecked = ($(obj).is(':checked')) || existChecked;
                });
                if(existChecked){
                    $("#div_batchSettleRakeBack").css("display","").removeClass('show').addClass('hide');
                }else{
                    $("#div_batchSettleRakeBack").css("display","").removeClass('hide').addClass('show');
                }
            });

        },
        /**
         * 回调：选择字段回调
         */
        back: function (e, option) {
            var _this = this;
            if (e.returnValue) {
                window.top.topPage.ajax({
                    url: this.getCurrentFormAction(e),
                    data: {'filterData': JSON.stringify(e.returnValue), "changeType": "change"},
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    success: function (data) {
                        if (data) {
                            $('.search-list-container').html(data);
                            e.page.onPageLoad();
                        }
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(e.currentTarget).unlock();
                    }
                })
            }
        },
        getIds: function (e, option) {
            var ids = this.getSelectIdsArray(e).join(",");
            option.target = option.target.replace('{ids}', ids);
            return true;
        },

        callBackQuery: function (event, opt) {
            var that = this;
            if (event.returnValue == true) {
                window.top.topPage.ajax({
                    url: window.top.topPage.getCurrentFormAction(event),
                    type: "post",
                    data: window.top.topPage.getCurrentFormData(event),
                    success: function (data) {
                        //var form = window.top.topPage.getCurrentForm(event);
                        var $result = $("#mainFrame");
                        $result.html(data);
                        event.page.onPageLoad();
                    }
                });
            }
        },
        hasReason: function (e, opt) {
            var _this = this;
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/operation/rakebackBill/hasReason.html",
                dataType: "json",
                success: function (data) {
                    if (data.state) {
                        _this.getIds(e, opt);
                        window.top.topPage.doDialog(e, opt);
                    } else {
                        window.top.topPage.showConfirmMessage(window.top.message.operation_auto['确认拒绝结算吗'], function (state) {
                            if (state) {
                                _this.rejectSettlement(e, opt);
                            }
                        });
                    }
                    $(e.currentTarget).unlock();
                }
            });
            return false;
        },
        rejectSettlement: function (e, opt) {
            var _this = this;
            var ids = this.getSelectIdsArray(e).join(",");
            var sid = $("[name='search.id']").val();
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/operation/rakebackBill/settlementReject.html?ids=" + ids,
                dataType: "json",
                data: _this.getCurrentFormData(e),
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e, opt, "success", window.top.message.operation_auto['操作成功'], true);
                    } else {
                        page.showPopover(e, opt, "danger", window.top.message.operation_auto['操作失败'], true);
                    }
                    e.returnValue = true;
                }
            });
        }
    });
});
