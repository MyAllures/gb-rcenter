/**
 * createBy:nick
 * createDate:2018/04/25
 * 用户聊天窗口demo版
 */
define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        els: {
            $contentEl: $('.ivu-scroll-content'),
            $sendTextBtnEL: $('#submitMessageBtn'),
            $sendImgBtnEL: $('#sendIimBtn'),
            $textEl: $('#messageTextArea'),
            $connectionStateEl: $('#connection-state-el'),
            $scrollEl: $('.ivu-scroll-container'),
            $imgFileInputEl: $('#imgFileInput'),
            $closeOrderBtnEl: $('#closeOrderBtn'),
            $historyImMessageBtnEl: $('#historyImMessageBtn'),
            countTextNumEL: $('#countText')
        },
        status: 'connect',
        messageType: null, //目前只用于关闭工单操作
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            workerOrderId: null,
            messages: [],
            historyLastTime: null
        },
        defaultMessage: '您好，请问有什么可以帮您？',
        timeout: 30,//超时时间,单位：秒
        timer: null,//计时器
        maxTextLength: 300,
        comet: window.top.comet,
        init: function () {
            var _this = this;
            _this._super();
            _this.setStatus();
            /*监听socket关闭事件*/
            _this.comet.socketCloseCallBack = function () {
                _this._socketColsed();
            }
            if (!openPage.isCustomer) {
                _this.els.$closeOrderBtnEl.css('display', 'inline-block');
            }
        },
        bindEvent: function () {
            var _this = this;
            _this._super();
            _this.els.$sendTextBtnEL.on("click", function () {
                _this.sendText();
            });
            _this.els.$sendImgBtnEL.on("click", function () {
                _this.sendImg();
            });
            _this.els.$historyImMessageBtnEl.on("click", function () {
                _this.sendHistoryMessage();
            });
            _this.els.$closeOrderBtnEl.on("click", function () {
                _this.closeOrder();
            });
            _this.els.$textEl.on("keyup", function () {
                var text = _this.els.$textEl.val(), count = text.length;
                if (count > _this.maxTextLength) {
                    //保留前300位
                    _this.els.$textEl.val(text.substring(0, 300));
                    count = 300;
                }
                _this.els.countTextNumEL.html(count);
            });

        },
        onPageLoad: function () {
            this._super();
        },
        setStatus: function () {
            var status;
            var imMessage = openPage.imMessage;
            if (imMessage) status = imMessage.status;
            var _this = this;
            if (!status) {
                if (_this.status === 'connect') {
                    _this.els.$connectionStateEl.html('等待连接...');
                    _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
                    _this.createTimer();
                } else if (_this.status === 'timeout') {
                    _this.els.$connectionStateEl.html('客服繁忙');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    var userId = imMessage ? imMessage.sendUserId : 'customer';
                    window.top.customerGroupView && window.top.customerGroupView.updateStatus(userId, 'timeout');
                }
            } else {
                switch (status) {
                    case 'reconnected' :
                    case 'accepted' :
                    case 'connected' :
                        if (imMessage.workOrderId) _this.data.workerOrderId = imMessage.workOrderId;
                        _this.stopTimer();
                        _this.status = 'normal';
                        _this.els.$sendTextBtnEL.attr('disabled', false);
                        _this.els.$sendImgBtnEL.attr('disabled', false); //$historyImMessageBtnEl
                        _this.els.$historyImMessageBtnEl.attr('disabled', false);
                        _this.els.$connectionStateEl.html('连接成功');
                        _this.els.$connectionStateEl.removeClass('unConnected').addClass('connected');
                        if (window.top.customerGroupView)
                            window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'online'), window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId),
                                window.top.customerGroupView.setWokerOrderId(imMessage.sendUserId,_this.data.workerOrderId);
                        if (imMessage.isCustomer) {
                            _this.appendMessage({
                                message: _this.defaultMessage,
                                time: new Date(),
                                messageBodyType: 'text',
                                name: imMessage.sendUserName,
                                type: 1
                            });
                        }
                        break;
                    case 'normal' :
                        _this.status = status;
                        var messageType = imMessage.messageType;
                        switch (messageType) {
                            case 'workorderClose' :
                                alert('弹出评价窗口demo');
                                _this.els.$connectionStateEl.html('工单已完结');
                                _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                                window.top.customerGroupView && window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                                break;
                            default :
                                _this.appendMessage({
                                    message: imMessage.messageBody.textBody ? imMessage.messageBody.textBody : '',
                                    time: new Date(),
                                    messageBodyType: imMessage.messageBody.messageBodyType,
                                    name: imMessage.sendUserName,
                                    type: 1
                                });
                                break;
                        }
                        if (window.top.customerGroupView) window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId);
                        break;
                    case 'close' :
                        _this.els.$sendTextBtnEL.attr('disabled', true);
                        _this.els.$sendImgBtnEL.attr('disabled', true);
                        _this.status = status;
                        _this.els.$connectionStateEl.html('对方已离线');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        if (window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                        break;
                    case 'closeSocket' :
                        _this.status = status;
                        _this.els.$connectionStateEl.html('由于您长时间未操作，连接已关闭');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        _this.els.$sendTextBtnEL.attr('disabled', true);
                        _this.els.$sendImgBtnEL.attr('disabled', true);
                        if (window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                        break;
                    case 'closeOrder' :
                        _this.els.$connectionStateEl.html('工单已完结');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        //如果处于正常聊天状态则推送
                        if (_this.status === 'normal') {
                            _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
                        }
                        if (window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'closeOrder');
                        break;
                    case 'offlineMessage' :
                        _this.els.$sendTextBtnEL.attr('disabled', true);
                        _this.els.$sendImgBtnEL.attr('disabled', true);
                        _this.els.$closeOrderBtnEl.attr('disabled', true);
                        _this.status = status;
                        _this.els.$connectionStateEl.html('离线消息');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        _this.appendOffline(imMessage);
                        if (window.top.customerGroupView) window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId);
                        break;
                    default:
                        break;
                }
            }
        },
        html: function () {
            var _this = this;
            $.each(_this.data.messages, function (index, data) {
                $(_this.getHtmlString(data)).appendTo(_this.els.$contentEl);
            });
        },
        createSendVo: function (type, body) {
            type = type ? type : 'text';
            var _this = this;
            var imMessage = openPage.imMessage;
            return {
                _S_COMET: 'IM',
                message: JSON.stringify({
                    status: _this.status,
                    workOrderId: _this.data.workerOrderId,
                    receiveUserId: imMessage ? imMessage.sendUserId : null,
                    receiveUserName: imMessage ? imMessage.sendUserName : null,
                    receiveUserSiteId: imMessage ? imMessage.sendUserSiteId : null,
                    messageType: _this.messageType,
                    messageBody: {
                        messageBodyType: type,
                        textBody: body
                        //byteBody : type == 'picture'  || type == 'video' ? body : null
                    }
                })
            }
        },
        socketCallBack: function (data) {
            var _this = this;
            openPage.imMessage = data.imMessage;
            _this.setStatus();
        },
        appendMessage: function (message,isFirst) {
            var _this = this;
            _this.data.messages.push(message);
            if(isFirst) {
                //TODO 注意调整数据排序
                $(_this.getHtmlString(message)).prependTo(_this.els.$contentEl);
                _this.els.$scrollEl.scrollTop(0);
            }else {
                $(_this.getHtmlString(message)).appendTo(_this.els.$contentEl);
                _this.els.$scrollEl.scrollTop(_this.els.$contentEl.height());
            }
        },
        getHtmlString: function (data) {
            var html = data.type === 1 ?
                '<div class="service-person" ><p>' + data.name + '<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span></p>' +
                '<div class="customer_message">' + (data.messageBodyType === 'text' ? data.message : '<img src="' + data.message + '"/>') + '</div>' +
                '</div>'
                :
                '<div class="guest-person" ><p>我<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span></p>' +
                '<div class="customer_message">' + (data.messageBodyType === 'text' ? data.message : '<img src="' + data.message + '"/>') + '</div>' +
                '</div>';
            return html;
        },
        disConnect: function () {
            var _this = this;
            _this.status = 'close';
            var vo = _this.createSendVo();
            _this.comet.websocket.send(JSON.stringify(vo));
        },
        /**
         * 循环生成历史记录html
         * @param userId 当前登录账号的userid
         * @param histories 历史记录
         */
        appendHistory : function(userId,histories){
            var _this = this;
            //TODO 没有获取到历史数据需提示
            $.each(histories,function(i,history){
                var type = userId == history.sendUserId ? 2 : 1; //2:发送者 1 接收者
                var message = {
                    type: type,
                    name: type == 1 ? history.sendUserName : history.receiveUserName,
                    time: new Date(Number(history.createTimeLong)),
                    message:history.messageBody.textBody,
                    messageBodyType: history.messageBody.messageBodyType
                }
                _this.appendMessage(message,true);
                if(i == histories.length - 1){
                    _this.data.historyLastTime = history.createTimeLong;
                }
            });
        },
        //加载离线消息
        appendOffline: function(message){
            this.appendMessage({
                type: 1,
                name: message.sendUserName,
                time: new Date(Number(message.createTimeLong)),
                message:message.messageBody.textBody,
                messageBodyType: message.messageBody.messageBodyType
            },true);
        },
        /**
         * 监控socket是否已断开
         * 断开则变更聊天窗口状态
         * @private
         */
        _socketColsed: function () {
            if (openPage.imMessage)
                openPage.imMessage.status = 'closeSocket',
                    this.setStatus();
        },
        /**
         * 连接超时功能
         * 开启倒计时
         */
        createTimer: function () {
            var _this = this;
            _this.timer = setTimeout(
                function () {
                    _this.status = "timeout";
                    _this.setStatus();
                }, _this.timeout * 1000);
        },
        stopTimer: function () {
            clearTimeout(this.timer);
        },
        closeOrder: function () {
            var _this = this;
            var orderId = _this.data.workerOrderId; //工单ID
            window.top.topPage.openDialog({
                message: '关闭工单业务处理页</br>...</br>...',
                buttons: [{
                    id: 'close_order_btn',
                    label: '确定',
                    action: function (dialogRef) {
                        //TODO 关闭工单业务callback处理
                        //业务callback后修改状态
                        openPage.imMessage.status = 'closeOrder';
                        _this.messageType = 'workorderClose';//待客户评价
                        _this.setStatus();
                        dialogRef.close();
                        _this.els.$closeOrderBtnEl.attr('disabled', true);
                    }
                }, {
                    label: '取消',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        },
        /**请求历史记录**/
        sendHistoryMessage: function () {
            var _this = this;
            _this.comet.websocket.send(JSON.stringify({
                _S_COMET: 'IM',
                message: JSON.stringify({
                    status: 'command',
                    workOrderId: _this.data.workerOrderId,
                    messageType: 'historyMessage',
                    messageBody: {
                        other: {
                            'KEY_TIME_POINT': _this.data.historyLastTime
                        }
                    }
                })
            }));
        },
        sendText: function () {
            var _this = this;
            var text = _this.els.$textEl.val();
            if ($.trim(text) !== '') {
                var createO = _this.createSendVo('text', text);
                _this.comet.websocket.send(JSON.stringify(createO));
                var message = {
                    type: 2,
                    time: new Date(),
                    message: text,
                    messageBodyType: 'text'
                }
                _this.appendMessage(message);
                _this.els.$textEl.val('');
                console.log(111)
            }
        },
        sendImg: function () {
            var _this = this;
            _this.els.$imgFileInputEl.click();
            _this.els.$imgFileInputEl.change(function () {
                //转Base64编码
                var reader = new FileReader();
                var file = this.files[0];
                if (file) {
                    reader.readAsDataURL(file);
                }
                //TODO 需校验文件大小
                reader && reader.addEventListener("load", function () {
                    _this.comet.websocket.send(JSON.stringify(_this.createSendVo('picture', reader.result)));
                    var message = {
                        type: 2,
                        time: new Date(),
                        message: reader.result,
                        messageBodyType: 'picture'
                    }
                    _this.appendMessage(message);
                    _this.els.$textEl.val('');
                }, false);
            });
        }
    });
});