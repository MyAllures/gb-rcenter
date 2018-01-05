
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        type:null,
        code:null,
        init: function () {
            this._super("#lotteryTime");
            this.bindEventOther();
        },
        onPageLoad:function(){
            this.code =$("#czCode").val();
            this.type =$("#czType").val();
            this._super();

        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        // closePage: function () {
        //     window.top.topPage.closeDialog();
        // },
        bindEventOther:function(){
            var _this = this;

        },

        saveLotteryTime:function (opt) {
            var _this = this;
            var openCode = "";
            var type = $("#czType").val();
            var code = $("#czCode").val();
            var expect = $("#czExpect").val();

            $("[name='result.expect']").val("");

            var openingTime = $("[name='result.openingTime']").val();
            var closeTime = $("[name='result.closeTime']").val();
            var openTime = $("[name='result.openTime']").val();
            var _e = {
                currentTarget:$(opt.currentTarget),
                page:page
            };
            var option = {};
            var $target = $(_e.currentTarget);
            if(openingTime>closeTime || closeTime>openTime){
                _e.page.showPopover(_e, option, 'danger', "开奖时间必须大于封盘时间,封盘时间必须大于开盘时间!", true);
                $target.unlock();
                return;
            }
            window.top.topPage.ajax({
                url: root + "/lotteryResult/updateLotteryResult.html",
                dataType: "json",
                data: {
                    'result.code': code,
                    'result.expect': expect,
                    'result.type': type,
                    'result.openingTime': openingTime,
                    'result.closeTime': closeTime,
                    'result.openTime': openTime,
                },
                success: function(data) {


                    if(data.state){
                        _e.page.showPopover(_e, option, 'success', data.msg, true);
                         _this.closePage()
                        //_this.query(_e,option);
                    }else{
                        _e.page.showPopover(_e, option, 'danger', data.msg, true);
                    }
                },
            });
        },




    });
});/**
 * Created by diego on 17-10-31.
 */
