define(['common/BaseListPage', 'bootstrap-dialog','bootstrapswitch'], function(BaseListPage,BootstrapDialog,Bootstrapswitch) {
    var _this ;
    return BaseListPage.extend({
        bootstrapDialog: BootstrapDialog,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            _this=this;
        },
        onPageLoad: function () {
            this._super();
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch();
        },
        bindEvent:function() {
            this._super();
            $("#li_top_1").addClass("active");
            $(this.formSelector).on("switchChange.bootstrapSwitch", 'input[name="my-checkbox"]',function(e) {
                var emailAccount=$(this).attr("tt");
                window.top.topPage.ajax({
                    url: root+"/vNoticeEmailInterface/updateStatus.html",
                    dataType: 'json',
                    cache: false,
                    type: "get",
                    data: {"emailAccount": emailAccount},
                    success: function (data) {
                        if(data.state){
                            //_this.query(event,option);
                            window.top.page.query({currentTarget:e.currentTarget,page:_this});
                        }else{
                            window.top.topPage.showErrorMessage(data.msg);
                        }
                    }
                });
            });
        },

    });
});