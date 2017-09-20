/**
 * Created by fly on 15-10-26.
 */
define(['common/BaseListPage'], function(BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            this.initShowTab();
            $('.show-demand-b', _this.formSelector).on('click', function () {
                $(this).toggleClass("open")
                $(".show-demand-a").toggle();
            });
        },
        /**
         * 重置表单
         */
        reset: function (event, option) {
            $("input[name='search.username']").val('');
            $("input[name='search.createTimeBegin']").val('');
            $("input[name='search.createTimeEnd']").val('');
            $("input[name='search.rechargeTotalBegin']").val('');
            $("input[name='search.rechargeTotalEnd']").val('');
            $("input[name='search.txTotalBegin']").val('');
            $("input[name='search.txTotalEnd']").val('');
            $("input[name='search.noLoginTime']").val('');
            $("input[name='search.loginTimeBegin']").val('');
            $("input[name='search.loginTimeEnd']").val('');
            $("input[name='search.walletBalanceBegin']").val('');
            $("input[name='search.walletBalanceEnd']").val('');
            $("input[name='search.totalAssetsBegin']").val('');
            $("input[name='search.totalAssetsEnd']").val('');
            $("input[name='search.registerIpv4']").val('');
            $("input[name='search.registerSite']").val('');
            $("input[name='search.createChannel'][value='']").prop("checked", true);
            $(event.currentTarget).unlock();
        },
        canAddNewPlayer:function (e, opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/vUserPlayer/isCanAddNewPlayer.html",
                success: function (data) {
                    if(data=="true"){
                        window.top.topPage.doDialog(e,opt);
                    }else{
                        page.showPopover(e,{},"danger",window.top.message.player_auto['player.addNewPlayer.noPower'],true);
                        _this.query(e,opt);
                    }
                },
                error: function (data) {

                }
            });
            return false;
        }
    })
})
