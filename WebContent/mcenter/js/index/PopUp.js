define(['gb/components/PopUp', 'bootstrap-dialog'], function (PopUp, BootstrapDialog) {

    return PopUp.extend({
        tones: null,
        init: function () {
            this._super();
            this.queryTones();

        },
        popUpCallBack: function (data) {
            console.info("订阅类型为MCENTER-popUp-Notice的订阅点收到消息，成功调用回调函数，参数值为" + data);
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var content = msgBody.content;//"<a herf='#' onclick='alert(\"你点到人家啦\")'>" + msgBody.content + "</a>";
            var date = msgBody.date;
            popUp.pop(content, date, "success");
        },
        imCallBack : function(data){
            console.info("订阅类型为MCENTER-popUp-im的订阅点收到消息，成功调用回调函数，参数值为" + data);
            var $textAndPic = $('<div></div>');
            data = JSON.parse(data);
            $textAndPic.append(data.imMessage.sendUserName);
            var text = data.imMessage.messageBody.textBody;
            if(text) {
                $textAndPic.append('<div>' + data.imMessage.messageBody.textBody + '</div>');
            }
            popUp.showDialog({
                title: '您收到新的客户消息',
                message: $textAndPic,
                buttons: [{
                    label: '接收',
                    action: function(dialogRef){
                        window.top.topPage.showCustomerWin('accepted');
                        dialogRef.close();
                    }
                }, {
                    label: '繁忙',
                    action: function(dialogRef){
                        dialogRef.close();
                    }
                }]
            });
        },
        dialogCallBack: function (data) {
            console.info("订阅类型为MCENTER-dialog-Notice的订阅点收到消息，成功调用回调函数，参数值为" + data);
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var content = "<a herf='#' onclick='alert(\"你点到人家啦\")'>" + msgBody.content + "</a>";
            var date = msgBody.date;
            popUp.showDialog(content, date);
        },
        /**
         * 取款提醒弹窗
         * @param data
         * @constructor
         */
        TellerReminderCallBack: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), window.top.dateFormat.daySecond);
            var content;
            if (msgBody.status == '1') {
                content = "<a nav-target='mainFrame' name='tellerReminder' href='/fund/withdraw/withdrawAuditView.html?search.id=" + msgBody.id + "&pageType=detail'>" + date + window.top.message.index_auto['新增'] + msgBody.currency + "&nbsp;" + msgBody.amount + " 取款申请订单，请审核！" + "</a>";
            } else if (msgBody.status == '2') {
                content = "<a nav-target='mainFrame' name='tellerReminder' href='/fund/withdraw/withdrawAuditView.html?search.id=" + msgBody.id + "&pageType=detail'>" + date + window.top.message.index_auto['新增'] + msgBody.currency + "&nbsp;" + msgBody.amount + " 取款申请稽核失败订单，请手动去API查看该玩家下单记录并计算稽核！" + "</a>";
            } else if (msgBody.status == "3") {//代理取款
                content = "<a nav-target='mainFrame' name='tellerReminder' href='/fund/vAgentWithdrawOrder/agentList.html?search.id=" + msgBody.id + "&pageType=detail'>" + date + window.top.message.index_auto['新增'] + msgBody.currency + "&nbsp;" + msgBody.amount + " 取款申请订单，请审核！" + "</a>";
            }
            popUp.pop(content, date, "success");
            window.top.popUp.playVoice(data, "draw");
            if ($("#timer .hd").attr("data-value") == 'refresh') {
                $(".playerWithdrawSearch").click();
                $(".agentWithdrawSearch").click();
            }
            $("#unReadTaskCount").text(parseInt($("#unReadTaskCount").text()) + 1);
        },

        playVoice: function (data, type) {
            var _this = this;
            window.top.popUp.queryTones();
            var tones = window.top.tones;
            setTimeout(function () {
                for (var index = 0; index < tones.length; index++) {
                    var tone = tones[index];
                    if (type == tone.paramCode) {
                        if (!tone.active) {
                            console.log(type + "的声音偏好设置被关闭")
                        } else {
                            window.top.popUp.audioplayer(type, tone.paramValue);
                        }

                    }

                }
            }, 1000);
        },
        /**
         * 存款提醒弹窗
         * @param data
         * @constructor
         */
        RechargeReminderCallBack: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), window.top.dateFormat.daySecond);
            var content;
            content = "<a nav-target='mainFrame' name='tellerReminder' href='/fund/deposit/company/check.html?search.id=" + msgBody.id + "'>" + window.top.message.fund['playerRecharge.rechargeReminder.title'].replace('{date}', date).replace("{currency}", msgBody.currency).replace("{amount}", msgBody.amount) + "</a>";
            popUp.pop(content, date, "success");
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove();
            });
            if ($("#timer .hd").attr("data-value") == 'refresh') {
                $(".companySearcnSpan").click();
            }
            // popUp.unReadNotice(data);
            window.top.popUp.playVoice(data, "deposit");
            $("#unReadTaskCount").text(parseInt($("#unReadTaskCount").text()) + 1);
        },
        /**
         * 存款完成,刷新页面
         * @param data
         * @constructor
         */
        RechargeCheckReminderCallBack: function (data) {
            var value = $.parseJSON(data).msgBody;
            if ($("#timer .hd").attr("data-value") == 'refresh') {
                if (value == 'company_deposit') {
                    $(".companySearcnSpan").click();
                } else if (value == 'online_deposit') {
                    $(".onlineSearchSpan").click();
                } else if (value == 'player_withdraw') {
                    $(".playerWithdrawSearch").click();
                } else if (value == 'agent_withdraw') {
                    $(".agentWithdrawSearch").click();
                }
            }
        },
        /**
         * 在线支付提醒（声音提醒、刷新列表）
         * @param data
         * @constructor
         */
        OnlineRechargeReminderCallBack: function (data) {
            window.top.popUp.playVoice(data, "onlinePay");
            if ($("#timer .hd").attr("data-value") == 'refresh') {
                $(".onlineSearchSpan").click();
            }
        },
        /**
         * 系统公告-公告弹窗
         * @param data
         */
        playerAnnouncementDialogCallBack: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody;
            btnOption.target = root + "/operation/announcementMessage/announcementPopup.html?search.id=" + id;
            btnOption.text = window.top.message.index_auto['公告'];
            btnOption.callback = function (e, option) {
                if (e.returnValue && e.returnValue.isDetail) {
                    if (e.returnValue.apiId != "") {
                        $("#mainFrame").load(root + "/operation/announcementMessage/messageDetail.html?search.id=" + e.messageId);
                    } else {
                        $("#mainFrame").load(root + "/operation/announcementMessage/systemNoticeDetail.html?search.id=" + e.messageId);
                    }
                }
            };
            window.top.topPage.doDialog({page: this, messageId: id}, btnOption);
        },
        /**
         * 更新顶部消息数量
         */
        unReadNotice: function (data) {
            var map = $.parseJSON(data);
            console.log(map);
            $("span[id=unReadCount]").text(parseInt($("span[id=unReadCount]").text()) + 1);
            window.top.popUp.playerNoticeVoice();
        },
        //只播放类型 为notice的声音
        playerNoticeVoice: function () {
            window.top.popUp.queryTones();
            var tones = window.top.tones;
            //声音集合
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                if (!tone.active) continue;
                if ("notice" == tone.paramCode) {
                    window.top.popUp.audioplayer(tone.paramCode, tone.paramValue);
                }
            }
        },
        /**
         * 更新顶部消息数量
         */
        unTaskNotice: function (data) {
            window.top.popUp.queryTones();
            var tones = window.top.tones;
            //声音集合
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                if (!tone.active) continue;
                var map = $.parseJSON(data);
                if (map.msgBody.toneType == tone.paramCode) {
                    window.top.popUp.audioplayer(tone.paramCode, tone.paramValue);
                    $("#unReadTaskCount").text(parseInt($("#unReadTaskCount").text()) + 1);
                    //判断是否是收款账户类任务
                    //是否需要弹窗
                    if (map.msgBody.payWarningType == '3') {
                        //橙色预警
                        if (map.msgBody.taskCode == 'orange') {
                            window.top.popUp.orange(data);
                            break;
                        } else if (map.msgBody.taskCode == 'red') {
                            window.top.popUp.red(data);
                            break;
                        } else if (map.msgBody.taskCode == 'freeze') {
                            window.top.popUp.freeze(data);
                            break;
                        }
                    }
                    break;
                }
            }

        },
        orange: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody.payId;
            btnOption.target = root + "/userTaskReminder/payDialogOrange.html?payId=" + id + "&warningVal=" + dataObj.msgBody.warningVal + "&updateTime=" + dataObj.msgBody.updateTime + "&taskId=" + dataObj.msgBody.taskId;
            btnOption.text = window.top.message.index_auto['消息'];
            btnOption.callback = function (e, opt) {
            };
            window.top.topPage.doDialog({page: this, payId: id}, btnOption);
        },
        red: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody.payId;
            btnOption.target = root + "/userTaskReminder/payDialogRed.html?payId=" + id + "&warningVal=" + dataObj.msgBody.warningVal + "&updateTime=" + dataObj.msgBody.updateTime + "&taskId=" + dataObj.msgBody.taskId;
            btnOption.text = window.top.message.index_auto['消息'];
            btnOption.callback = function (e, opt) {
            };
            window.top.topPage.doDialog({page: this, payId: id}, btnOption);
        }
        ,
        freeze: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody.payId;
            btnOption.target = root + "/payAccount/thawInfo.html?search.id=" + id + "&reminder.id=" + dataObj.msgBody.taskId;
            btnOption.text = window.top.message.index_auto['消息'];
            btnOption.callback = function (e, opt) {
            };
            window.top.topPage.doDialog({page: this, payId: id}, btnOption);
        },

        /**
         * 账户异常任务提醒
         */
        unPayExNotice: function (data) {
            var _this = this;
            //声音集合
            window.top.popUp.queryTones();
            var tones = window.top.tones;
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                if (!tone.active) continue;
                var map = $.parseJSON(data);
                console.log(map);
                if (map.msgBody.toneType == tone.paramCode) {
                    window.top.popUp.audioplayer(tone.paramCode, tone.paramValue);
                    $("#unReadTaskCount").text(parseInt($("#unReadTaskCount").text()) + 1);
                }
            }
            window.top.topPage.showConfirmDynamic(window.top.message.index_auto['账户异常'], map.msgBody.showMsg, "OK", null, null);
        },
        /**
         * 盈利预警弹窗
         * @param data
         */
        profit: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var level = msgBody.level;
            var rate = msgBody.rate;
            var siteName = msgBody.siteName;
            var id = new Date().getTime();
            var key = 'profit.' + level + '.warning';
            var msg = window.top.message.report[key];
            var countDown = window.top.message.setting_auto['倒计时'];
            var tips = window.top.message.setting_auto['tips'];
            var times = window.top.message.setting_auto['times'];
            if (msg) {
                msg = msg.replace("${siteName}", siteName);
                msg = msg.replace("${rate}", rate);
                var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.leftTime), window.top.dateFormat.daySecond);
                times = times.replace("{0}", date);
                var leftTime = new Date(msgBody.leftTime);
                var now = new Date();
                var time = parseInt((leftTime - now) / 1000);
                sessionStorage.setItem("popUp_second" + id, time);
                var tmpTime = time;
                if (tmpTime >= 0) {
                    var hour = Math.floor(tmpTime / 3600);
                    tmpTime = tmpTime - hour * 3600;
                    var minute = Math.floor(tmpTime / 60);
                    if (minute < 10) {
                        minute = '0' + minute;
                    }
                    var second = tmpTime - minute * 60;
                    if (second < 10) {
                        second = '0' + second;
                    }
                } else {
                    var hour = 0;
                    var minute = '0' + 0;
                    var second = '0' + 0;
                }
                if (rate >= 100) {
                    if (level == 'red') {
                        var html = '<div class="msg msg-warning al-center"><div class="msg-description ft-bold">' + msg + '</div></div>' +
                            '<div class="clearfix m-md al-center"><div  id=' + id + '><font class="fs20">' + countDown + '</font>' +
                            '<span class="fs30 co-red" id="leftTime" data-time="${leftTime}"><span id="hours">' + hour + '</span>' + ":" + '' +
                            '<span id="minutes">' + minute + '</span>' + ":" + '<span id="seconds">' + second + '</span></span></div>' +
                            '<div class="al-center co-grayc2">' + times + '</div></div>'
                            + '<div class="clearfix m-md">' + tips + '</div>';
                    } else if (level == 'stop') {
                        var html = '<div class="line-hi34 m-sm">' + msg + '</div>';
                    }
                    var dialog = BootstrapDialog.show({
                        title: window.top.message.setting_auto['消息'],
                        message: html,
                        buttons: [{
                            label: window.top.message.setting_auto['去充值'],
                            action: function (dialog) {
                                dialog.close();
                                $("#mainFrame").load(root + "/credit/pay/pay.html");
                            }
                        }, {
                            label: window.top.message.setting_auto['取消'],
                            cssClass: 'btn-primary',
                            action: function (dialog) {
                                dialog.close();
                            }
                        }],
                        onhidden: function (dialog) {
                            dialog.close();
                        }
                    });
                    if (date && date.length > 0 && time >= 0) {
                        window.top.popUp.showLeftTime();
                        var interval = setInterval(function () {
                            window.top.popUp.showLeftTime(interval, id)
                        }, 1000);
                    } else {
                        var sites = window.top.message.setting_auto['sites'];
                        var quota = window.top.message.setting_auto['quota'];
                        var html = '<div class="msg msg-warning al-center"><div class="msg-description">' + sites + '</div></div>' +
                            '<div class="clearfix m-md">' + quota + '</div>';
                        var dialog = BootstrapDialog.show({
                            title: window.top.message.setting_auto['消息'],
                            message: html,
                            buttons: [{
                                label: window.top.message.setting_auto['去充值'],
                                action: function (dialog) {
                                    dialog.close();
                                    $("#mainFrame").load(root + "/credit/pay/pay.html");
                                }
                            }, {
                                label: window.top.message.setting_auto['取消'],
                                cssClass: 'btn-primary',
                                action: function (dialog) {
                                    dialog.close();
                                }
                            }],
                        })
                    }
                } else {
                    var html = '<div class="clearfix m-md">' + msg + '</div>';
                    var dialog = BootstrapDialog.show({
                        title: window.top.message.setting_auto['消息'],
                        message: html,
                        buttons: [{
                            label: window.top.message.setting_auto['去充值'],
                            action: function (dialog) {
                                dialog.close();
                                $("#mainFrame").load(root + "/credit/pay/pay.html");
                            }
                        }, {
                            label: window.top.message.setting_auto['取消'],
                            cssClass: 'btn-primary',
                            action: function (dialog) {
                                dialog.close();
                            }
                        }],
                    });
                }
            }

            if ($("#topSecurity") && $("#topSecurity").length > 0) {
                //1-79 safe
                var className = "safety";
                if (rate >= 80 && rate < 95) {
                    className = "slight";
                } else if (rate >= 95 && rate < 100) {
                    className = "medium";
                } else if (rate >= 100) {
                    className = "risk";
                }
                $("#topSecurity").removeClass("safety");
                $("#topSecurity").removeClass("slight");
                $("#topSecurity").removeClass("medium");
                $("#topSecurity").removeClass("risk");
                $("#topSecurity").addClass(className);
            }
        },
        showLeftTime: function (interval, id) {
            var time = sessionStorage.getItem("popUp_second" + id);
            if (time < 0 && interval) {
                window.clearInterval(interval);
                return;
            }
            var tmpTime = Number(time);
            var hour = Math.floor(tmpTime / 3600);
            tmpTime = tmpTime - hour * 3600;
            var minute = Math.floor(tmpTime / 60);
            if (minute < 10) {
                minute = '0' + minute;
            }
            var second = tmpTime - minute * 60;
            if (second < 10) {
                second = '0' + second;
            }

            $("span#hours", $("#" + id)).text(hour);
            $("span#minutes", $("#" + id)).text(minute);
            $("span#seconds", $("#" + id)).text(second);
            sessionStorage.setItem("popUp_second" + id, --time);
        },
        rankInadequate: function (data) {
            var btnOption = {};
            var warning = $.parseJSON($.parseJSON(data).msgBody);
            //声音集合
            window.top.popUp.queryTones();
            var tones = window.top.tones;
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                if (!tone.active) continue;
                if (tone.paramCode == 'warm') {
                    window.top.popUp.audioplayer(tone.paramCode, tone.paramValue);
                    $("#unReadTaskCount").text(parseInt($("#unReadTaskCount").text()) + 1);
                }
            }
            //层级弹窗
            if (warning.warningState == 'true') {
                btnOption.target = root + "/userTaskReminder/rankInadequate.html?search.id=" + warning.rankId + "&orangeWarningAccount=" + warning.orangeWarningAccount + "&redWarningAccont=" + warning.redWarningAccont + "&accountNum=" + warning.accountNum + "&payName=" + warning.payName;
                btnOption.text = window.top.message.index_auto['消息'];
                btnOption.callback = function (e, opt) {
                    var url = "/vPayAccount/list.html?search.type=" + warning.payType + "&search.ids=" + warning.payIds;
                    $("#rankInadequate").attr("href", url);
                    $("#rankInadequate").click();
                };
                window.top.topPage.doDialog({page: this}, btnOption);
            }
        },
        negativeWithdrawReminder: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), window.top.dateFormat.daySecond);
            var content;
            content = "<a nav-target='mainFrame' name='tellerReminder' href='/fund/artificial/addChoose.html?deposit=draw&&project=negative&&search.username=" + msgBody.username + "'>" + window.top.message.fund['artificial.negativeWithdrawoReminder.title'].replace("{username}", msgBody.username).replace("{date}", date).replace("{currency}", msgBody.currency).replace("{amount}", msgBody.amount) + "</a>";
            popUp.pop(content, date, "success");
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove();
            });
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


        playerAudio: function (data) {
            var map = $.parseJSON(data);
            window.top.popUp.audioplayer('audit', map.msgBody);
        },
        /**
         *
         * @param id 播放器ID
         * @param file 音频文件
         * @param loop 是否循环
         * @param callback 播放结束回调
         */
        audioplayer: function (id, file, loop, callback) {
            var audioplayer = document.getElementById(id);
            if (audioplayer != null) {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {// IE
                    var embed = document.embedPlay;
                } else {
                    audioplayer.play();
                    if (callback != undefined) {
                        //如何判断声音播放结束
                        //update by jerry
                        setTimeout(function () {
                            callback();
                        }, 3000);
                    }
                }

                return;
                //document.body.removeChild(audioplayer);
            }

            if (typeof(file) != 'undefined') {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {// IE

                    var player = document.createElement('embed');
                    $(player).addClass("hide");
                    player.id = id;
                    player.src = resRoot + '/' + file;
                    //player.setAttribute('autostart', 'true');
                    if (loop) {
                        player.setAttribute('loop', 'infinite');
                    }
                    $("#auto_alert").append(player);
                    var embed = document.embedPlay;
                    if (callback != undefined) {
                        //如何判断声音播放结束
                        setTimeout(function () {
                            callback();
                        }, 3000);

                    }
                } else {
                    // Other FF Chome Safari Opera
                    var player = document.createElement('audio');
                    $(player).addClass("hide");
                    player.id = id;
                    //player.setAttribute('autoplay','autoplay');
                    if (loop) {
                        player.setAttribute('loop', 'loop');
                    }
                    $("#auto_alert").append(player);

                    var mp3 = document.createElement('source');
                    mp3.src = resRoot + '/' + file;
                    mp3.type = 'audio/mpeg';
                    player.appendChild(mp3);
                    player.play();
                    if (callback != undefined) {
                        var is_playFinish = setInterval(function () {
                            if (player.ended) {
                                callback();
                                window.clearInterval(is_playFinish);
                            }
                        }, 10);
                    }
                }
            }
        },
        fetchWithdrawRecord: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var id = msgBody.id;
            if ($("#record_id_" + id).find("td").length > 0) {
                var rowIndex = $($("#record_id_" + id).find("td")[0]).text();
                window.top.topPage.ajax({
                    url: root + '/fund/withdraw/fetchWithdrawRecord.html?search.id=' + id + "&rowIndex=" + rowIndex,
                    success: function (data) {
                        $("#record_id_" + id).html(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                });
            }

        },
        /**
         * 转账上限提醒
         * @param data
         */
        transferLimit: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.leftTime), dateFormat.daySecond);
            var leftTime = new Date(msgBody.leftTime);
            var now = new Date();
            var time = parseInt((leftTime - now) / 1000);
            var id = new Date().getTime();
            sessionStorage.setItem("popUp_second" + id, time);
            var rate = Number(msgBody.rate);
            var warnRate = Number(msgBody.warnRate);
            var stopRate = Number(msgBody.stopRate);
            var countDown = window.top.message.setting_auto['倒计时'];
            var tips = window.top.message.setting_auto['tips'];
            if (rate >= stopRate) { //立即停止
                var msg = window.top.message.setting_auto['您站点的转账上限使用已超出'];
                msg = msg.replace("${stopRate}", stopRate);
                var html = '<div class="line-hi34 m-sm">' + msg + '</div>';
                var dialog = BootstrapDialog.show({
                    title: window.top.message.setting_auto['消息'],
                    message: html,
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }],
                });
            }/*else if (rate >= warnRate) {
                var msg = window.top.message.setting_auto['您站点的额度已用'];
                msg = msg.replace("${rate}", rate);
                msg = msg.replace("${leftTime}", date);
                var tmpTime = time;
                if (tmpTime >= 0) {
                    var hour = Math.floor(tmpTime / 3600);
                    tmpTime = tmpTime - hour * 3600;
                    var minute = Math.floor(tmpTime / 60);
                    if (minute < 10) {
                        minute = '0' + minute;
                    }
                    var second = tmpTime - minute * 60;
                    if (second < 10) {
                        second = '0' + second;
                    }
                } else {
                    var hour = 0;
                    var minute = '0' + 0;
                    var second = '0' + 0;
                }
                var html = '<div class="msg msg-warning al-center"><div class="msg-description ft-bold">' + msg + '</div></div>' +
                    '<div class="clearfix m-md al-center"><div id=' + id + '><font class="fs20">' + countDown + '</font>' +
                    '<span class="fs30 co-red" id="leftTime" data-time="${leftTime}"><span id="hours">' + hour + '</span>' + ":" + '' +
                    '<span id="minutes">' + minute + '</span>' + ":" + '<span id="seconds">' + second + '</span></span></div>' +
                    '<div class="al-center co-grayc2">' + times + '</div></div>'
                    + '<div class="clearfix m-md">' + tips + '</div>';
                var dialog = BootstrapDialog.show({
                    title: window.top.message.setting_auto['消息'],
                    message: html,
                    buttons: [{
                        label: window.top.message.setting_auto['去充值'],
                        action: function (dialog) {
                            dialog.close();
                            $("#mainFrame").load(root + "/credit/pay/pay.html");
                        }
                    }, {
                        label: window.top.message.setting_auto['取消'],
                        cssClass: 'btn-primary',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }],
                    onhidden: function (dialog) {
                        dialog.close();
                    }
                });
                if (date && date.length > 0 && time >= 0) {
                    window.top.popUp.showLeftTime();
                    var interval = setInterval(function () {
                        window.top.popUp.showLeftTime(interval, id)
                    }, 1000);
                } else {
                    var sites = window.top.message.setting_auto['sites'];
                    var quota = window.top.message.setting_auto['quota'];
                    var html = '<div class="msg msg-warning al-center"><div class="msg-description">' + sites + '</div></div>' +
                        '<div class="clearfix m-md">' + quota + '</div>';
                    var dialog = BootstrapDialog.show({
                        title: window.top.message.setting_auto['消息'],
                        message: html,
                        buttons: [{
                            label: window.top.message.setting_auto['去充值'],
                            action: function (dialog) {
                                dialog.close();
                                $("#mainFrame").load(root + "/credit/pay/pay.html");
                            }
                        }, {
                            label: window.top.message.setting_auto['取消'],
                            cssClass: 'btn-primary',
                            action: function (dialog) {
                                dialog.close();
                            }
                        }]
                    })
                }
            }*/
            else {
                var msg = window.top.message.setting_auto['您站点的转账上限使用提醒'];
                msg = msg.replace("${rate}", rate);
                var html = '<div class="clearfix m-md">' + msg + '</div>';
                var dialog = BootstrapDialog.show({
                    title: window.top.message.setting_auto['消息'],
                    message: html,
                    buttons: [{
                        label: window.top.message.setting_auto['去充值'],
                        action: function (dialog) {
                            dialog.close();
                            $("#mainFrame").load(root + "/credit/pay/pay.html");
                        }
                    }, {
                        label: window.top.message.setting_auto['取消'],
                        cssClass: 'btn-primary',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }],
                });
            }
        },
        /**
         * 彩票开奖结果提醒
         * @param data
         */
        lotteryGatherCallback: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), window.top.dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="tellerReminder" href="/lotteryResult/list.html">' + date + '&nbsp;' + msgBody.message + '</a>';
            popUp.pop(content, date, "warning");
            window.top.popUp.playVoice(data, "warm");
            if ($("#timer .hd").attr("data-value") == 'refresh') {
                $(".playerWithdrawSearch").click();
                $(".agentWithdrawSearch").click();
            }
            $("#unReadTaskCount").text(parseInt($("#unReadTaskCount").text()) + 1);
        },
        /**
         * 导入域名检测结果成功后提示
         * @param data
         */
        importDomainCheckResultSuccess: function (data) {
            //window.top.topPage.doDialog(e,opt);
            // var id = $('input[name=id]').val();
            //var remarkContent = $('textarea[name=remarkContent]').val();
            //window.top.topPage.remarkContent = remarkContent;
            var e = {};
            var btnOption = {};
            btnOption.target = root + "/operation/domainCheckResult/showPopStatusCount.html";
            // btnOption.callback = "back";
            btnOption.text = "域名检测结果";
            btnOption.title = "域名检测结果";
            // window.top.topPage.doDialog(e, btnOption);
            window.top.topPage.doDialog({page: this}, btnOption);
        },
        /**
         * 停用账号信息通知
         * @param data
         */
        payAccountDisable: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), window.top.dateFormat.daySecond);
            var content;
            var msg = window.top.message.content['payAccount.disable.master.log'];
            msg = msg.replace("{date}", date);
            content = "<a href='javascript:;'>" + popUp.formatStr(msg, msgBody) + "</a>";
            popUp.pop(content, date, "warning");
        }
    });
});