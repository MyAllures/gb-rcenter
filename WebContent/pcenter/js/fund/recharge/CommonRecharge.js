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
            this.copyText('a[name="copy"]');
            $(this.formSelector).on("click", ".openPage", function () {
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
        back: function (e, option) {
            if (e.returnValue == true) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/fund/transaction/list.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
            } else {
                var $current = $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']", window.top.document);
                $current.parent().addClass("select");
                var hash = window.top.location.hash;
                if (hash.startsWith("#")) {
                    hash = hash.substring(1, hash.length);
                }
                $("#mainFrame").load(root + hash);
            }
        },
        closeConfirmDialog: function (e, option) {
            $("#confirmDialog").hide();
            $("#backdrop").hide();
            $(e.currentTarget).unlock();
        },
        /**
         * 查看资金记录
         * @param e
         * @param option
         */
        viewRecharge: function (e, option) {
            e.returnValue = true;
            this.back(e, option);
        },
        /**
         * 关闭错误弹窗
         * @param e
         * @param option
         */
        closeConFailDialog: function (e, option) {
            $("#failDialog").hide();
            $("#backdrop").hide();
            $(e.currentTarget).unlock();
        },

        /**
         * 关闭多次错误提示弹窗
         * @param e
         * @param option
         */
        continueDeposit: function (e, option) {
            $("#manyFailures").hide();
            if ($("#bitAmount").text()) {
                $("[name=bitcoinRecharge]").show();
                $("[name=companyRecharge]").hide();
            } else {
                $("[name=bitcoinRecharge]").hide();
                $("[name=companyRecharge]").show();
            }
            $("#confirmDialog").show();
            $(e.currentTarget).unlock();
        },

        /**
         * 客服访问
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        },
        /**
         * 展开其它优惠
         * @param e
         * @param option
         */
        expendSale: function (e, option) {
            $("tr.expendSales").show();
            $(e.currentTarget).hide();
            $(e.currentTarget).unlock();
        }
    });
});