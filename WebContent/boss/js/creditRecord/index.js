/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,bootstrapswitch) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            //统计数据
            this.staticData();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            //双击图片查看大图
            $(this.formSelector).on('click', 'tbody td img', function (e, opt) {
                e.imgs = [$(this).data('src')];
                window.top.topPage.imageSilde(e,opt);
            });
        },

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('a.needLock').addClass('disabled').lock();
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            this.staticData();
        },

        /**
         * 统计
         */
        staticData: function (e,opt) {
            var _this = this;
            /*var siteId = $("input[name='search.siteId']").val();
            if (!siteId) {
                $("#total").text(0);
                $("#moneyTotal").text(0);
                $("#liquidation").text(0);
                $("#actualRecharge").text(0);
                return;
            }*/
            var html = "";
            window.top.topPage.ajax({
                url: root + "/creditRecord/statisticalData.html",
                data: $(this.formSelector).serialize(),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.total) {
                        $("#total").text(data.total);
                    } else {
                        $("#total").text(0);
                    }
                    if (data.moneytotal) {
                        $("#moneyTotal").text(data.moneytotal);
                    } else {
                        $("#moneyTotal").text(0);
                    }
                    if(data.liquidation) {
                        $("#liquidation").text(data.liquidation);
                    } else {
                        $("#liquidation").text(0);
                    }
                    if (data.actualrecharge) {
                        $("#actualRecharge").text(data.actualrecharge);
                    } else {
                        $("#actualRecharge").text(0);
                    }
                }
            })
        },
        //成功
        successMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['is.handle.success']);
        },
        failMessage: function (e,option){
            this.showConfirm(e,option,window.top.message.content['is.handle.fail']);
        },
        showConfirm: function (e,option,msg) {
            window.top.topPage.showConfirmMessage( msg , function( bol ){
                if(bol){
                    window.top.topPage.doAjax(e,option);
                }else{
                    $(e.currentTarget).unlock();
                }
            });
        },

    });
});