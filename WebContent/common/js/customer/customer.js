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
            $countTextNumEL: $('#countText')
        },
        status: 'connect',
        messageType: null,
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            workerOrderId: null,
            messages: [],
            historyLastTime: null
        },
        isClient: !!openPage.isCustomer,
        defaultMessage: '您好，请问有什么可以帮您？',
        timeout: 30,//超时时间,单位：秒
        timer: null,//计时器
        maxTextLength: 300,
        reader: new FileReader(),
        comet: window.top.comet,
        init: function () {
            var _this = this;
            _this._super();
            _this.setStatus();
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
                _this.els.$imgFileInputEl.click();
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
                _this.els.$countTextNumEL.html(count);
            });
            _this.els.$imgFileInputEl.change(function () {
                //转Base64编码
                var file = this.files[0];
                if (file) {
                    //大于300k
                    if (file.size > (400 * 1024)) {
                        alert('文件大小超过限制');
                        return;
                    }
                    _this.reader.readAsDataURL(file);
                }
            });
            _this.reader.addEventListener("load", function () {
                _this.sendImg();
            }, false);

        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 变更状态
         */
        setStatus: function () {
            var status;
            var imMessage = openPage.imMessage;
            if (imMessage) status = imMessage.status;
            var _this = this;
            if (!status) status = _this.status;
            switch (status) {
                /**发起连接请求**/
                case 'connect' :
                    if (openPage.isButtonClick) {
                        _this.status = 'connect';
                        _this.createTimer();
                    } else {
                        _this.status = 'accepted';
                    }
                    _this.els.$connectionStateEl.html('等待连接...');
                    _this.comet.websocket.send(JSON.stringify(_this._createSendVo()));
                    _this.els.$connectionStateEl.removeClass('unConnected');
                    break;
                /**超时**/
                case 'timeout' :
                    _this.status = 'timeout';
                    _this.els.$connectionStateEl.html('客服繁忙');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    var userId = imMessage ? imMessage.sendUserId : 'customer';
                    window.top.customerGroupView && window.top.customerGroupView.updateStatus(userId, 'timeout');
                    break;
                /**已连通**/
                case 'accepted' :
                case 'reconnected' :
                case 'connected' :
                    if (imMessage.workOrderId) _this.data.workerOrderId = imMessage.workOrderId;
                    _this.stopTimer();
                    _this.status = 'normal';
                    _this._disableButtons(false,'history');
                    _this.els.$connectionStateEl.html('连接成功');
                    _this.els.$connectionStateEl.removeClass('unConnected').addClass('connected');
                    if (window.top.customerGroupView)
                        window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'online'), window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId),
                            window.top.customerGroupView.setWokerOrderId(imMessage.sendUserId, _this.data.workerOrderId);
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
                case 'acceptFailed' :
                    _this.status = 'offLine';
                    _this.els.$connectionStateEl.html('已被其他客服接入');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    var userId = imMessage ? imMessage.sendUserId : 'customer';
                    _this._disableButtons(true,'all');
                    window.top.customerGroupView && window.top.customerGroupView.updateStatus(userId, 'offLine');
                    break;
                /**聊天中**/
                case 'normal' :
                    _this.status = status;
                    var messageType = imMessage.messageType;
                    switch (messageType) {
                        case 'workorderClose' :
                            //alert('弹出评价窗口demo');
                            window.top.topPage.openDialog({
                                message: '弹出评价窗口'
                            })
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
                /**对方已关闭**/
                case 'close' :
                    //_this.els.$sendTextBtnEL.attr('disabled', true);
                    //_this.els.$sendImgBtnEL.attr('disabled', true);
                    _this.status = 'close';
                    _this.els.$connectionStateEl.html('对方已离线');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    if (window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                    break;
                /**服务断开**/
                case 'closeSocket' :
                    _this.status = status;
                    _this.els.$connectionStateEl.html('连接中断');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    _this._disableButtons(true);
                    if (window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                    break;
                /**工单完结**/
                case 'closeOrder' :
                    _this.els.$connectionStateEl.html('工单已完结');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    //如果处于正常聊天状态则推送
                    if (_this.status === 'normal') {
                        _this.comet.websocket.send(JSON.stringify(_this._createSendVo()));
                    }
                    _this.messageType = null;
                    if (window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'closeOrder');
                    break;
                /**加载离线消息**/
                case 'offlineMessage' :
                    _this._disableButtons(true,'all');
                    _this.status = status;
                    _this.els.$connectionStateEl.html('离线消息');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    _this.appendOffline(imMessage);
                    if (window.top.customerGroupView) window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId), window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                    break;
                default:
                    break;
            }
        },
        /**
         *1.遍历messages数组
         *2.输出聊天内容至窗口中
         */
        html: function () {
            var _this = this;
            $.each(_this.data.messages, function (index, data) {
                $(_this.getHtmlString(data)).appendTo(_this.els.$contentEl);
            });
        },
        /**
         *
         * @param data
         */
        socketCallBack: function (data) {
            var _this = this;
            openPage.imMessage = data.imMessage;
            _this.setStatus();
        },
        /**
         * 添加新的聊天内容到窗口中
         * @param message 聊天内容
         * @param isFirst  true : 在聊天窗口最顶端展示
         */
        appendMessage: function (message, isFirst) {
            var _this = this;
            _this.data.messages.push(message);
            if (isFirst) {
                //TODO 注意调整数据排序
                $(_this.getHtmlString(message)).prependTo(_this.els.$contentEl);
                _this.els.$scrollEl.scrollTop(0);
            } else {
                $(_this.getHtmlString(message)).appendTo(_this.els.$contentEl);
                _this.els.$scrollEl.scrollTop(_this.els.$contentEl.height());
            }
        },
        /**
         * 生成聊天html
         * @param data :
            *       {
                    type: ,   //1:对方 2：自己
                    name: ,   //称谓
                    time: ,   //发送时间
                    message: , //发送内容
                    messageBodyType:, //发送类型
                }
         * @returns {string}
         */
        getHtmlString: function (data) {
            var _this = this;
            var html = data.type === 1 ?
                '<div class="service-person" ><p>' + data.name + '<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span>' + (_this.status === 'offlineMessage' ? '<span>(离线消息)</span>' : '') + '</p>' +
                '<div class="customer_message">' + (data.messageBodyType === 'text' ? data.message.replace(/\n/gi, '</br>') : '<img style="max-width:500px;" src="' + data.message + '" onload="$(\'.ivu-scroll-container\').scrollTop($(\'.ivu-scroll-content\').height() + 10);"/>') + '</div>' +
                '</div>'
                :
                '<div class="guest-person" ><p>我<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span>' + (_this.status === 'close' ? '<span>(离线消息)</span>' : '') + '</p>' +
                '<div class="customer_message">' + (data.messageBodyType === 'text' ? data.message.replace(/\n/gi, '</br>') : '<img  style="max-width:500px;" src="' + data.message + '" onload="$(\'.ivu-scroll-container\').scrollTop($(\'.ivu-scroll-content\').height() + 10);"/>') + '</div>' +
                '</div>';
            return html;
        },
        /**
         * 连接断开
         */
        disConnect: function () {
            var _this = this;
            if (_this.status.indexOf('close') === -1) {
                _this.status = 'close';
                var vo = _this._createSendVo();
                _this.comet.websocket.send(JSON.stringify(vo));
            }
        },
        /**
         * 循环生成历史记录html
         * @param userId 当前登录账号的userid
         * @param histories 历史记录
         */
        appendHistory: function (userId, histories) {
            var _this = this;
            //TODO 没有获取到历史数据需提示
            $.each(histories, function (i, history) {
                var type = userId == history.sendUserId ? 2 : 1; //2:发送者 1 接收者
                var message = {
                    type: type,
                    name: type === 1 ? history.sendUserName : history.receiveUserName,
                    time: new Date(Number(history.createTimeLong)),
                    message: history.messageBody.textBody,
                    messageBodyType: history.messageBody.messageBodyType
                }
                _this.appendMessage(message, true);
                if (i === histories.length - 1) {
                    _this.data.historyLastTime = history.createTimeLong;
                }
            });
        },
        /**
         * 加载离线消息
         * @param message
         */
        appendOffline: function (message) {
            this.appendMessage({
                type: 1,
                name: message.sendUserName,
                time: new Date(Number(message.createTimeLong)),
                message: message.messageBody.textBody,
                messageBodyType: message.messageBody.messageBodyType
            }, true);
        },
        /**
         * 监控socket是否已断开
         * 断开则变更聊天窗口状态
         * @private
         */
        socketClosed: function () {
            if (openPage.imMessage && this.status === 'normal')
                openPage.imMessage.status = 'closeSocket',
                    this.setStatus();
        },
        /**
         * 监控socket是否已重新连通
         * 变更聊天窗口状态
         * @private
         */
        socketOpened: function () {
            if (openPage.imMessage && openPage.imMessage.status === 'closeSocket' && openPage.isCustomer)
                openPage.imMessage.status = 'connect',
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
                    openPage.imMessage ? openPage.imMessage.status = 'timeout' : _this.status = 'timeout';
                    _this.setStatus();
                }, _this.timeout * 1000);
        },
        stopTimer: function () {
            clearTimeout(this.timer);
        },
        /**
         * 关闭工单
         * 打开关闭工单弹窗
         */
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
                    client: _this.isClient,
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
        /**
         * 发送文本内容
         */
        sendText: function () {
            var _this = this;
            var text = _this.els.$textEl.val();
            if ($.trim(text) !== '') {
                var createO = JSON.stringify(_this._createSendVo('text', text));
                _this.comet.websocket.send(createO);
                var message = {
                    type: 2,
                    time: new Date(),
                    message: text,
                    messageBodyType: 'text',

                }
                _this.appendMessage(message);
                _this.els.$textEl.val('');
                _this.els.$countTextNumEL.html(0);
            }
        },
        /**
         * 发送图片
         */
        sendImg: function () {
            var _this = this;
            var createVo = JSON.stringify(_this._createSendVo('picture', _this.reader.result));
            _this.comet.websocket.send(createVo);
            var message = {
                type: 2,
                time: new Date(),
                message: _this.reader.result,
                messageBodyType: 'picture'
            }
            _this.appendMessage(message);
            _this.els.$textEl.val('');
        },
        _createSendVo: function (type, body) {
            type = type ? type : 'text';
            var _this = this;
            var imMessage = openPage.imMessage;
            return {
                _S_COMET: 'IM',
                message: JSON.stringify({
                    status: _this.messageType ? 'normal' : _this.status, //断开后发送离线消息
                    workOrderId: _this.data.workerOrderId,
                    receiveUserId: imMessage ? imMessage.sendUserId : null,
                    receiveUserName: imMessage ? imMessage.sendUserName : null,
                    receiveUserSiteId: imMessage ? imMessage.sendUserSiteId : null,
                    client: _this.isClient,
                    messageType: _this.messageType,
                    messageBody: {
                        messageBodyType: type,
                        textBody: body
                    }
                })
            }
        },
        _disableButtons(disable,type) {
            var _this = this;
            _this.els.$sendTextBtnEL.attr('disabled', disable);
            _this.els.$sendImgBtnEL.attr('disabled', disable);
            if (type && type === 'all') _this.els.$closeOrderBtnEl.attr('disabled', disable);
            if (type && type === 'history') _this.els.$historyImMessageBtnEl.attr('disabled', disable);
        }
    });
});