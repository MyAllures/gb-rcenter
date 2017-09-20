/**
 * 管理首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super("form[name=rechargeForm]");
            this.loadBankNotice();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

            $(this.formSelector).on("click", "i.pay-title-tips", function () {
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

            $(this.formSelector).on("click", ".showPage", function () {
                window.top.topPage.showMainPage($(this).attr("data-href"));
            });
        },
        onPageLoad: function () {
            this._super();
        },
        loadBankNotice: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/playerRecharge/loadBankNotice.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.banknotice").html(data);
                }
            });
        },
        /**
         * 客户服务
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        }
    });
});