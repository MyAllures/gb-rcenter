/**
 * 资金查询
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
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _that = this;

            /**
             * 高级搜索下拉
             */
            $('.show-demand-b',_that.formSelector).on('click', function () {
                $(this).toggleClass("open")
                $(".show-demand-a").toggle()
            });
        },

        /**
         * 重置表单
         */
        reset: function (e, option) {
            $("[name='search.userTypes']").val('username');
            var userType = $("[name='search.userTypes']").siblings('ul').find("a[key='fundSearch.playerName']").text().trim();
            $("[name='search.userTypes']").siblings('button').find("span[prompt='prompt']").text(userType);
            $("#operator").val('');

            $("[name='fundSearch.searchStartDate']").val('');
            $("[name='fundSearch.searchEndDate']").val('');

            $("[name='fundSearch.registeStartDate']").val('');
            $("[name='fundSearch.registeEndDate']").val('');

            $("[name='fundSearch.depositStartNum']").val('');
            $("[name='fundSearch.depositEndNum']").val('');

            $("[name='fundSearch.depositStartAmount']").val('');
            $("[name='fundSearch.depositEndAmount']").val('');

            $("[name='fundSearch.withdrawStartNum']").val('');
            $("[name='fundSearch.withdrawEndNum']").val('');

            $("[name='fundSearch.withdrawStartAmount']").val('');
            $("[name='fundSearch.withdrawEndAmount']").val('');

            $("[name='fundSearch.effectiveStartAmount']").val('');
            $("[name='fundSearch.effectiveEndAmount']").val('');

            $("[name='fundSearch.favorableStartAmount']").val('');
            $("[name='fundSearch.favorableEndAmount']").val('');

            $("[name='fundSearch.rakebackStartAmount']").val('');
            $("[name='fundSearch.rakebackEndAmount']").val('');

            $("[name='fundSearch.profitLossStartAmount']").val('');
            $("[name='fundSearch.profitLossEndAmount']").val('');

            $(e.currentTarget).unlock();
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        /**
         *
         */
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');
        },
        downloadFile:function (e, opt) {
            if(opt.data.state){
                page.showPopover(e,opt,"success","导出完成",true);
                $(e.currentTarget).unlock();
            }
        }
    });
});
