
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
            this.setContent();
            $(".btn-withdraw-result-btn").focus();

        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            $(document).keydown(function (event) {
                if(event.keyCode==32){
                    $(".btn-withdraw-result-btn").click();
                }
            });
            this.copyText('a[name="copy"]');
        },
        setContent:function(){
            try {
                var content=window.openPage.getContent();
                $('[name=remarkContent]').val(content.remarkContent);
                $("input[name='result.withdrawAmount']").val(content.withdrawAmount);
                $(".showWithdrawAmount").text(content.withdrawAmount);
            }catch(e){

            }

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
         * 取款审核
         */
        putAuditStatus: function (e,p) {
            var id = $("[name='search.id']").val();
            var _this=this;
            var datas = window.top.topPage.getCurrentFormData(e);
            var val = $("textarea[name='result.reasonContent']").val();
            var status = $("[name='search.transactionStatus']").val();
            window.top.topPage.ajax({
                type:"post",
                url:root + "/fund/vAgentWithdrawOrder/isAudit.html",
                data:{"search.id":id},
                dataType:"json",
                success: function (data) {
                    //判断是否已经审核过
                    if(!data.state){
                        if(val!=""){
                            window.top.topPage.ajax({
                                type : 'POST',
                                url : root + "/fund/vAgentWithdrawOrder/putAuditStatus.html",
                                dataType:"json",
                                data :datas,
                                success : function(data) {
                                    if (data.state) {
                                        _this.returnValue=data.state;
                                        page.showPopover(e, {}, 'success', window.top.message.common['operation.success'], true);
                                            setTimeout(function () {
                                                _this.closePage();
                                            },1000);

                                    }else{
                                        page.showPopover(e, {}, 'success', window.top.message.common['operation.fail'], true);
                                    }
                                }
                            })
                        }else{
                            page.showPopover(e, {}, 'danger', window.top.message.fund['playerWithdraw.reasonContent.notBlank'], true);
                            //window.top.topPage.showErrorMessage(window.top.message.fund['playerWithdraw.reasonContent.notBlank']);
                            $(e.currentTarget).unlock();
                        }
                    }else{
                        page.showPopover(e, {}, 'danger', window.top.message.fund['playerWithdraw.isAudit.true'], true);
                        //window.top.topPage.showErrorMessage(window.top.message.fund['playerWithdraw.isAudit.true']);
                        $(e.currentTarget).unlock();
                    }
                }
            });



        }

    });
});