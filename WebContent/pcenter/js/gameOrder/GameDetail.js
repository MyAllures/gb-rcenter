/**
 * 选择游戏类型
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        gameDetail:function (e) {
            var betId=$("#betId").val();
            $(e.currentTarget).lock();
            window.top.topPage.ajax({
                url: root + "/gameOrder/GameDetailLink.html?search.betId="+betId,
                type: 'GET',
                success: function (data) {
                    var datas = eval('('+data+')');
                    if(datas.state){
                        window.open(datas.msg);
                        $(e.currentTarget).unlock();
                    }else{
                        window.top.topPage.showWarningMessage(datas.msg);
                        $(e.currentTarget).unlock();
                        return;
                    }
                },
                error: function (data){
                    $(e.currentTarget).unlock();
                },

            })
        }
    })
});