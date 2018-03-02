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
        init: function () {
            this._super();
            this.setContent();
            this.setFeeList();
            //复制按钮
            this.copyText('a[name="copy"]');
            $(".btn-withdraw-result-btn").focus();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            this._super();
            //刷新
            $(".fa-refresh").on("click", function (e) {
                window.location.reload();
            });
            $(document).keydown(function (event) {
                if(event.keyCode==32){
                    $(".btn-withdraw-result-btn").click();
                }
            });

        },
        setContent: function () {
            var content = window.top.topPage.remarkContent;
            $('[name=remarkContent]').val(content);
            window.top.topPage.remarkContent = null;
        },
        setFeeList: function () {
            var feeList = window.top.topPage.feeList;
            var html="";
            if (feeList) {
                for (var i = 0; i < feeList.length; i++) {
                    var data = feeList[i];
                    if(data.id) {
                        html = html + "<input type='hidden' name='feeList["+i+"].id' value='"+data.id+"'>";
                    }
                    if(data.deductFavorable) {
                        html = html + "<input type='hidden' name='feeList["+i+"].deductFavorable' value='"+data.deductFavorable+"'>";
                    }
                    if(data.maxDeductFavorable) {
                        html = html + "<input type='hidden' name='feeList["+i+"].maxDeductFavorable' value='"+data.maxDeductFavorable+"'>";
                    }
                    if(data.administrativeFee) {
                        html = html + "<input type='hidden' name='feeList["+i+"].administrativeFee' value='"+data.administrativeFee+"'>";
                    }
                    if(data.maxAdministrativeFee) {
                        html = html + "<input type='hidden' name='feeList["+i+"].maxAdministrativeFee' value='"+data.maxAdministrativeFee+"'>";
                    }
                }
                $("#feeList").html(html);
            }
            window.top.topPage.feeList = null;
        },
        /**
         * 选择失败标题原因，相应失败内容在textarea里显示
         * @param e
         */
        reasonTitleChange: function (e) {
            $("textarea[name='search.reasonContent']").val(select.getSelected("[name='search.reasonTitle']").attr("holder"));
            $("input[name='groupCode']").val(select.getSelected("[name='search.reasonTitle']").attr("groupCode"));
            page.reasonPreviewMore.viewFailureDetail(e);
        },
        /**
         * 审核成功
         * @param e
         * @param opt
         */
        withdrawSuccess: function (e, opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/withdrawSuccess.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        _this.returnValue = true;
                        page.showPopover(e, opt, 'success', data.msg, true);
                    } else {
                        page.showPopover(e, {"placement":"top"}, 'danger', data.msg, true);
                    }
                }
            })
        },
        /**
         * 审核失败
         * @param e
         * @param opt
         */
        withdrawFailure: function (e, opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/withdrawFail.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        _this.returnValue = true;
                        page.showPopover(e, opt, 'success', data.msg, true);
                    } else {
                        page.showPopover(e, opt, 'danger', data.msg, true);
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
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/withdrawReject.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        _this.returnValue = true;
                        page.showPopover(e, opt, 'success', data.msg, true);
                    } else {
                        page.showPopover(e, opt, 'danger', data.msg, true);
                    }
                }
            })
        }
    });
});