define([], function () {
    return Class.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            //引用父页面index中的hideLoading
            this.hideLoading();
            $('.help_list .lis ul li').click(function(){
                var w=$(this).index();
                $(this).addClass('sli').siblings().removeClass('sli');
                $('.help_list .help_col').eq(w).addClass('show').siblings().removeClass('show');
            })
        },/**
         * 关闭加载中效果
         */
        hideLoading: function () {
            $("div.loader", parent.document).remove();
        }
    })
});



