/**
 * 消息公告-发送消息
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
            this.initShowTab();//自动弹窗iframe高度
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $('input').bind('input propertychange', function () {
                if ($(this).val().length <= 100) {
                    $(".msg").html($(this).val().length + "/100");
                }
            });
            $('textarea').bind('input propertychange', function () {
                if ($(this).val().length <= 2000) {
                    $(".textareaMsg").html($(this).val().length + "/2000");
                }
            });
            $('textarea').bind('input propertychange', function () {
                if ($(this).val().length <= 2000) {
                    $(".pump").html($(this).val().length + "/2000");
                }
            });
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            $('.captcha-code').on('click', function(){
                $(this).attr('src', root + '/captcha/continueQuestion.html?t=' + Math.random());
            });
            //消息公告-站点消息
            $(".siteMessage").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                $current.parent().addClass("select");
            });
            //消息公告-系统公告
            $(".systemAnn").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                $current.parent().addClass("select");
            });
            //消息公告-游戏公告
            $(".gameAnn").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                $current.parent().addClass("select");
            })

        },
        /**
         * 消息公告-发送信息
         */
        sendAnnouncementMessage: function (e) {
            var data = window.top.topPage.getCurrentFormData(e);
            var val = $("textarea[name='result.advisoryContent']").val();
            if (val != undefined) {
                window.top.topPage.ajax({
                    type: 'POST',
                    url: root + "/operation/pAnnouncementMessage/sendMessage.html",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        if (data.state) {
                            window.top.topPage.showSuccessMessage(data.msg, function () {
                                $(".returnMain").click();
                            });
                        }
                    }, error: function () {
                        $(e.currentTarget).unlock();
                    }
                })
            } else {
                window.top.topPage.showErrorMessage(window.top.message.fund['playerWithdraw.reasonContent.notBlank']);
                $(e.currentTarget).unlock();
            }
        },
        /**
         * 消息公告-我的消息-追问
         * @param e
         */
        subAdvisoryMessage: function (e, option) {
            var length = $(".question").length;

            var val = $("textarea[name='result.advisoryContent']").val();
            if (length < 50) {
                if (val != undefined) {
                    window.top.topPage.ajax({
                        type: 'POST',
                        url: root + "/operation/pAnnouncementMessage/subAdvisoryMessage.html",
                        dataType: "json",
                        data: window.top.topPage.getCurrentFormData(e),
                        success: function (data) {
                            if (data.state) {
                                window.top.topPage.showSuccessMessage(data.msg, function () {
                                    $("a[name='returnMain']").click();
                                });
                            } else if (data.msg) {
                                e.page.showPopover(e, option, 'warning', data.msg, true);
                            }
                            $(e.currentTarget).unlock();
                        }, error: function () {
                            $(e.currentTarget).unlock();
                        }
                    })
                } else {
                    window.top.topPage.showErrorMessage(window.top.message.fund['playerWithdraw.reasonContent.notBlank']);
                    $(e.currentTarget).unlock();
                }
            } else {
                window.top.topPage.showErrorMessage(window.top.message.fund['advisory.pump.max']);
                $(e.currentTarget).unlock();
            }

        },
        /**
         * 清空内容
         */
        clearText: function (e) {
            $("input[name='result.advisoryTitle']").val("");
            $(".msg").html("0/100");
            $("textarea[name='result.advisoryContent']").val("");
            $(".textareaMsg").html("0/2000");
            $(".successsmall").remove();
            $(".error").removeClass("error");
            $(".tips").remove();
            $(e.currentTarget).unlock();
        },

        clearPumpText: function (e) {
            $("textarea[name='result.advisoryContent']").val("");
            $(".pump").html("0/2000");
            $(e.currentTarget).unlock();
        }
    });
});