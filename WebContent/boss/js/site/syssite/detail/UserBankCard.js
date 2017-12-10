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
            $(".tab-pane").css("display","block");
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.content['floatPic.dislpay.on'],
                        offText: window.top.message.content['floatPic.display.off'],
                        onSwitchChange: function (e, state) {
                            var _target = e.currentTarget;
                            var id = $(_target).attr("id");
                            var siteId = $("#siteId").val();
                            window.top.topPage.ajax({
                                url: root + '/site/detail/updateUserBankCard.html',
                                dataType: "json",
                                data: {"result.isDefault": state, "siteId":siteId,"result.id":id},
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
                            return true;
                        }
                    });
                },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        }

    });
});