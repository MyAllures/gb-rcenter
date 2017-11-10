/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
            var _this =this;

        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click", "#lotteryDiv li", function (e,opt) {
                $("#lotteryDiv li").removeClass("active");
                $(this).addClass("active");
                var datacode = $(this).attr("data-code");
                var code = $(this).attr("code");
                var type = $(this).attr("type");
                $("#searchDiv a").addClass("hide");
                $("#searchDiv a[data-rel*='"+datacode+"']").removeClass("hide");
                $("#searchDiv a").removeClass("ssc-active");
                $("#searchDiv a[data-rel*='"+code+"']").addClass("ssc-active");
                $("#searchDiv a[data-rel*='"+code+"']").click();
            });
        },
        queryByLottery:function (e, opt) {
            var type = opt.type;
            var code = opt.code;
            if(code){
                if(code=='hklhc'){
                    $("#query-time-div").addClass("hide");
                }else{
                    $("#query-time-div").removeClass("hide");
                }
                $(".ssc-label").removeClass("ssc-active")
                $("#lotteryCode").val(code);
                $("#lotteryType").val(type);
                this.query(e,opt);
                $(e.currentTarget).addClass("ssc-active");
            }else{

            }
            $(e.currentTarget).unlock();
        },
        queryResultByDate:function (e, opt) {
            var day = parseInt(opt.days);
            var date = this.setQueryDate(day);
            $("[name='search.queryDate']").val(date);
            this.query(e);
        },
        setQueryDate:function (day) {
            var myDate=new Date();
            myDate.setDate(myDate.getDate()+day);
            var fmt = dateFormat.day;
            var time = window.top.topPage.formatDateTime(myDate,fmt);
            return time;
        },
        payout:function (e, opt) {
            var _this = this;
            var id = opt.objId;
            var data = {"search.id":id};
            window.top.topPage.ajax({
                dataType:'json',
                data:data,
                type:"post",
                url:root+'/lotteryResult/payout.html',
                success:function(data){
                    if(data.state){
                        e.page.showPopover(e,opt,"success",data.msg,true);
                    }else {
                        e.page.showPopover(e,opt,"danger",data.msg,true);
                    }
                },
                error:function(data) {
                    e.page.showPopover(e,opt,"danger",data.msg,true);
                }
            });
        },
    });
});