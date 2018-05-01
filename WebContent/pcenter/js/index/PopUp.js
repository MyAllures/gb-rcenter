define(['gb/components/PopUp','bootstrap-dialog'], function (PopUp,BootstrapDialog) {

    return PopUp.extend({
        init: function () {
            this._super();
        },
        popUpCallBack: function (data) {
            var dataObj = $.parseJSON(data);
            console.info(window.top.message.index_auto['订阅类型为'] + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
            $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
            var msgBody = dataObj.msgBody;
            var content = "<a herf='#' onclick='alert(\"你点到人家啦\")'>" + msgBody.content + "</a>"
            var date = msgBody.title;
            popUp.pop(content, date, "success");
        },
        imCallBack : function(data){
            data = JSON.parse(data);
            var dialogs = BootstrapDialog.dialogsArray;
            $.each(dialogs,function(i,dialog){
                if(dialog.opened){
                    if (data.imMessage.status == 'accepted'){
                        data.imMessage.isCustomer = true;
                    }
                    var iframe = $('iframe',dialog.$modalContent)[0];
                    iframe.contentWindow.page.socketCallBack(data);
                }
            });
        },
        dialogCallBack: function (data) {
            var dataObj = $.parseJSON(data);
            console.info(window.top.message.index_auto['订阅类型为'] + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
            $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
            var msgBody = dataObj.msgBody;
            var content = msgBody.content.replace("${user}", $('#ofullname').text().trim());
            content = "<div style='padding: 20px'>" + content + "</div>";
            var title = msgBody.title;
            var opt = {};
            opt.title = title;
            opt.message = content;
            popUp.showDialog(opt);
        },
        playerWithdrawDialogCallBack: function (data) {
            data = $.parseJSON(data).msgBody;
            //稽核不通过,确认是否继续取款
            var btnOption = {};
            btnOption.target = root + "/player/withdraw/masterWithdrawFailDialog.html?withdrawId=" + data;
            btnOption.text = window.top.message.index_auto['申请取款'];
            window.top.topPage.doDialog({}, btnOption);
        },
        /**
         * 系统公告-公告弹窗
         * @param data
         */
        playerAnnouncementDialogCallBack: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody;
            btnOption.target = root + "/operation/pAnnouncementMessage/announcementPopup.html?searchId=" + id;
            btnOption.text = window.top.message.index_auto['公告'];
            btnOption.callback = function (e, opt) {
                if (e.returnValue && e.returnValue.isDetail) {
                    if (e.returnValue.apiId != "") {
                        var $select = $(".sidebar-nav .select", window.top.document);
                        $select.removeClass("select");
                        var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                        $current.parent().addClass("select");
                        $current.click();

                    } else {
                        var $select = $(".sidebar-nav .select", window.top.document);
                        $select.removeClass("select");
                        var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                        $current.parent().addClass("select");
                        $("#mainFrame").load(root + "/operation/pAnnouncementMessage/systemNoticeDetail.html");
                    }
                }
            };
            window.top.topPage.doDialog({page: this, messageId: id}, btnOption);
        },
        /**
         * 更新顶部消息数量
         */
        unReadNotice: function (data) {
            window.top.popUp.queryTones();
            var tones = window.top.tones;

            //声音集合
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                var map = $.parseJSON(data);
                console.log(map);
                if ("notice" == tone.paramCode) {
                    if ($.browser && $.browser.version == '8.0') {
                        //本来这里用的是<bgsound src="system.wav"/>,结果IE8不播放声音,于是换成了embed
                        $('#newMessageDIV').html("<embed src='" + root + "/mcenter/" + tone.paramValue + "'/>");
                    } else {
                        //IE9+,Firefox,Chrome均支持<audio/>
                        $('#newMessageDIV').html("<audio autoplay='autoplay'><source src='" + root + "/mcenter/" + tone.paramValue + "' type='audio/wav'/></audio>");
                    }
                    $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
                }
            }
        },
        queryTones: function () {
            var _this = this;
            if (!window.top.tones) {
                window.top.topPage.ajax({
                    url: root + '/index/queryTones.html',
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        window.top.tones = data;
                    }
                })
            } else {
                return window.top.tones;
            }
        },
        /**
         * 线上支付完成后弹窗
         * @param data
         */
        onlineRecharge: function (data) {
            var result = eval("(" + eval("(" + data + ")").msgBody + ")");
            var orderId = result.orderId;
            var $target = $("a._submit");
            if (orderId == window.top.onlineTransactionNo && $target.length > 0) {
                window.top.onlineTransactionNo = null;
                var url = root + "/fund/recharge/online/onlineOverTime.html?search.transactionNo=" + orderId;
                var btnOption = {};
                btnOption.text = window.top.message.fund_auto['存款结果'];
                btnOption.target = url;
                btnOption.callback = "back";
                window.top.topPage.closeDialog();
                var _e = {currentTarget: $target, page: page};
                window.top.topPage.doDialog(_e, btnOption);
            }
        },
        /**
         * 刷新余额
         * @param data
         */
        digiccyRefreshBalance: function (data) {
            if ($("form[name=digiccyPayForm]").length <= 0) {
                return;
            }
            window.top.topPage.ajax({
                url: root + '/fund/recharge/digiccy/getBalances.html',
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var map = data[i];
                            var currency = map.currency;
                            var amount = map.amount;
                            var $bal = $("[name=account" + currency + "] .s-yue .orange");
                            if (Number($bal.text()) != amount) {
                                var loading = '<em class="t-load"></em>';
                                $bal.html(loading);
                                window.setTimeout(function () {
                                    $bal.text(amount);
                                }, 1000);
                            }
                        }
                    }
                }
            })
        }
    });
});