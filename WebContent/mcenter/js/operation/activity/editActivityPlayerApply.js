/**
 * 资金管理-提现管理列表
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

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //选择失败标题原因，相应失败内容在textarea里显示
        },
        reasonTitleChange:function(e){
            var value = e.key;
            $("textarea[name='result.reasonContent']").val(select.getSelected("[name='result.reasonTitle']").attr("holder"));
            $("input[name='groupCode']").val(select.getSelected("[name='result.reasonTitle']").attr("groupCode"));
            page.reasonPreviewMore.viewFailureDetail(e);
        },
        /**
         * 获取勾选id-玩家申请活动审核
         * @param e
         */
        auditStatus: function (e) {
            var data = window.top.topPage.getCurrentFormData(e);
            var ids = $("input[name='ids']").val();
            var _this = this;
            if (ids != "") {
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/operation/vActivityPlayerApply/auditStatus.html",
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.state) {
                            window.top.topPage.showSuccessMessage(data.msg, function (result) {
                                _this.returnValue = data.state;
                                window.top.topPage.closeDialog();
                            });
                        }
                    }
                });
            }
        }
    });
});