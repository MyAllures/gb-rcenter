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
            $("#li_top_6").addClass("active");
            $(".yzmSelect").click(function(){
                var obj = $(this).children().children();
                var src = obj.attr("src");
                var yzmValue = obj.attr("tt");
                $("#yzm").attr("src",src);
                $("#yzmValue").val(yzmValue);
            })
        },

    });
});