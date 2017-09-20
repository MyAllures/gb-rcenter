/**
 * 投注记录
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
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
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            /*var _this = this;
            $(this.formSelector).on("change","input[name='search.pending']",function(e){
                _this.queryWinning(e);
            });*/
        },
        /**
         * 选择游戏类型回调
         * @param e
         * @param option
         */
        gameCallBack: function (e, option) {
            if (e.returnValue) {
                var selects= e.returnValue.selects;
                var html="";
                if(selects) {
                    for(var i=0;i<selects.length;i++) {
                        var select = selects[i];
                        html=html+ select.name+"-"+select.typename;
                        if(i!=selects.length-1) {
                            html=html+"、"
                        }
                    }
                }
                $("#gameSpan").html(html);
                $("[name='search.gameTypeList']").val(e.returnValue.json);
                this.queryByCondition(e, option);
            }
        },
        /**
         * 搜索订单（不含彩池奖金条件）
         * @param e
         * @param option
         */
        queryByCondition: function (e, option) {
            $("input[name='search.beginWinningAmount']").val("");
            this.query(e);
            $(e.currentTarget).unlock();
        },
        /**
         * 搜索订单（含彩池奖金条件）
         * @param e
         * @param option
         */
        queryWinning: function (e, option) {
            $("input[name='search.beginWinningAmount']").val(0);
            this.query(e);
            $(e.currentTarget).unlock();
        }
    });
});