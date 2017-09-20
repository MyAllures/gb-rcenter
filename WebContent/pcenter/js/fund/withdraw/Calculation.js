/**
 * 资金管理-提现管理审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        timerId:null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        flag: true,
        timeOutInterval:null,
        init: function () {
            this._super();
            this.resizeDialog();//自动弹窗iframe高度
            //this.timer(9);
            this.withdrawAudit();
        },
        /**
         * 倒计时
         * @param intDiff
         */
        timer: function (intDiff) {
            var _this = this;
            timeOutInterval=window.setInterval(function () {
                if (intDiff < 0) {
                    if (_this.flag) {
                        _this.flag = false;
                        _this.overTime();
                    }
                    return;
                }
                var minute = 0,
                    second = 0;//时间默认值
                if (intDiff > 0) {
                    minute = Math.floor(intDiff / 60);
                    second = Math.floor(intDiff) - (minute * 60);
                }
                //if (minute <= 9) minute = '0' + minute;
                //if (second <= 9) second = '0' + second;

                $("#seconds").text(second);
                intDiff--;
            }, 1000);
        },
        overTime: function () {
            var _this=this;
            window.clearInterval(this.timeOutInterval);
            var tem=$(".real-time-btn");
            var btnOption = eval("(" + tem.data('rel') + ")");
            btnOption.text = tem.attr("title");
            window.top.topPage.doDialog({currentTarget:tem[0],page:_this},btnOption);
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
            //$("#withdrawAuditForm").submit();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        //关闭window.top.message.fund_auto['正在努力计算中']页面
        calculationCallback: function (e,opt) {
            if(opt.data.state){
                this.returnValue= e.returnValue;
                window.top.topPage.closeDialog();
            }else{
                window.top.topPage.showErrorMessage(window.top.message.fund_auto['取消取款订单失败取款订单生成成功']);
            }

        },
        withdrawAudit: function () {
            setTimeout(function () {

            },1000);

            /*var num = $("#num").val();
            var transactionNo = $("#transactionNo").val();
            var transactionMoney = $("#transactionMoney").val();
            window.top.topPage.ajax({
                url: root + '/player/withdraw/withdrawAudit.html',
                type: "POST",
                cache: false,
                data: {"num":num,"result.transactionNo": transactionNo,"result.transactionMoney":transactionMoney},
                success: function (data) {
                    //$(".theme-popcon").hide();
                    $("#result-div").append(data);
                    page.resizeDialog();
                },
                error: function (data) {
                    alert(data);
                }
            })*/
        },
        /**
         * 返回资金记录，进行标识
         * @param e
         */
        fundRecord: function (e) {
            this.returnValue = "fundRecord";
            this.closePage();
        }

    });
});