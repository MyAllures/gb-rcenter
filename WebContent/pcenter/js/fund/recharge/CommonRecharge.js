/**
 * 存款公共js
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
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
        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click",".openPage",function() {
                var iWidth = 850;                          //弹出窗口的宽度;
                var iHeight = 850;                       //弹出窗口的高度;
                //获得窗口的垂直位置
                var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
                //获得窗口的水平位置
                var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
                var params = 'width=' + iWidth
                        + ',height=' + iHeight
                        + ',top=' + iTop
                        + ',left=' + iLeft
                        + ',channelmode=yes'//是否使用剧院模式显示窗口。默认为 no
                        + ',directories=yes'//是否添加目录按钮。默认为 yes
                        + ',fullscreen=no' //是否使用全屏模式显示浏览器
                        + ',location=yes'//是否显示地址字段。默认是 yes
                        + ',menubar=yes'//是否显示菜单栏。默认是 yes
                        + ',resizable=yes'//窗口是否可调节尺寸。默认是 yes
                        + ',scrollbars=no'//是否显示滚动条。默认是 yes
                        + ',status=yes'//是否添加状态栏。默认是 yes
                        + ',titlebar=yes'//默认是 yes
                        + ',toolbar=yes'//默认是 yes
                    ;
                window.open($(this).attr("data-href"), '_blank', params);
            });
        },
        onPageLoad: function () {
            this._super();
        },
        confirm: function (e, option) {
            var btnOption = {};
            btnOption.text = window.top.message.fund_auto['完成存款'];
            var payAccountId = $("input[name='result.payAccountId']").val();
            var rechargeAmount = $("input[name='result.rechargeAmount']").val();
            var activityId = $("input[name=activityId]").val();
            if (!activityId) {
                activityId = $("input[name=activityId]:checked").val();
            }
            var payerBankcard = $("input[name='result.payerBankcard']").val();
            var bankOrder = $("input[name='result.bankOrder']").val();
            var type = $("input[name='result.rechargeType']").val();
            var code = $("input[name='code']").val();
            var url = root + "/fund/recharge/company/confirmRecharge.html?result.rechargeType=" + type;
            if (payAccountId) {
                url = url + "&result.payAccountId=" + payAccountId;
            }
            if (activityId) {
                url = url + "&activityId=" + activityId;
            }
            if (rechargeAmount) {
                url = url + "&result.rechargeAmount=" + rechargeAmount;
            }
            var bitAmount = $("input[name='result.bitAmount']").val();
            if (bitAmount) {
                url = url + "&result.bitAmount=" + bitAmount;
            }
            var returnTime = $("input[name='result.returnTime']").val();
            if (returnTime) {
                url = url + "&result.returnTime=" + returnTime;
            }
            /* if (payerBankcard) {
             url = url + "&result.payerBankcard=" + payerBankcard;
             }*/
            if (bankOrder) {
                url = url + "&result.bankOrder=" + bankOrder;
            }
            if (code) {
                url = url + "&code=" + code;
            }
            btnOption.target = url;
            btnOption.callback = "back";
            window.top.topPage.doDialog(e, btnOption);
            window.top.topPage.online_payName = $("input[name='result.payerName']").val();
            window.top.topPage.payerBankcard = payerBankcard;
            window.top.topPage.rechargeAddress = $("input[name='result.rechargeAddress']").val();
        }
    });
});