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
            var userType = $("[name='search.userTypes']").siblings('ul').find("a[key='search.fundSearch.playerName']").text().trim();
            $("[name='search.userTypes']").siblings('button').find("span[prompt='prompt']").text(userType);
            $("#operator").val('');

            $("[name='search.fundSearch.searchStartDate']").val('');
            $("[name='search.fundSearch.searchEndDate']").val('');

            $("[name='search.fundSearch.registeStartDate']").val('');
            $("[name='search.fundSearch.registeEndDate']").val('');

            $("[name='search.fundSearch.depositStartNum']").val('');
            $("[name='search.fundSearch.depositEndNum']").val('');

            $("[name='search.fundSearch.depositStartAmount']").val('');
            $("[name='search.fundSearch.depositEndAmount']").val('');

            $("[name='search.fundSearch.withdrawStartNum']").val('');
            $("[name='search.fundSearch.withdrawEndNum']").val('');

            $("[name='search.fundSearch.withdrawStartAmount']").val('');
            $("[name='search.fundSearch.withdrawEndAmount']").val('');

            $("[name='search.fundSearch.effectiveStartAmount']").val('');
            $("[name='search.fundSearch.effectiveEndAmount']").val('');

            $("[name='search.fundSearch.favorableStartAmount']").val('');
            $("[name='search.fundSearch.favorableEndAmount']").val('');

            $("[name='search.fundSearch.rakebackStartAmount']").val('');
            $("[name='search.fundSearch.rakebackEndAmount']").val('');

            $("[name='search.fundSearch.profitLossStartAmount']").val('');
            $("[name='search.fundSearch.profitLossEndAmount']").val('');

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
                page.showPopover(e,{},"success","导出完成",true);
                $(e.currentTarget).unlock();
            }
        }
    });
});
