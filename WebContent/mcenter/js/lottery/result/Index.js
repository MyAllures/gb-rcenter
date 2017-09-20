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
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
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
        }
    });
});