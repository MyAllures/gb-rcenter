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
            $closeOrderBtnEl : $('#closeOrderBtn'),
            countTextNumEL : $('#countText')
        },
        status: 'connect',
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            messages: []
        },
        defaultMessage: '您好，请问有什么可以帮您？',
        timeout: 30,//超时时间,单位：秒
        timer: null,//计时器
        maxTextLength : 300,
        comet: window.top.comet,
        init: function () {
            var _this = this;
            _this._super();
            _this.setStatus();
            /*监听socket关闭事件*/
            _this.comet.socketCloseCallBack = function () {
                _this._socketColsed();
            }
            if(!openPage.isCustomer){
                _this.els.$closeOrderBtnEl.css('display','inline-block');
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
            _this.els.$closeOrderBtnEl.on("click", function () {
                _this.closeOrder();
            });
            _this.els.$textEl.on("keyup",function(){
                 var text = _this.els.$textEl.val(),count = text.length;
                 if(count > _this.maxTextLength){
                    //保留前300位
                     _this.els.$textEl.val(text.substring(0,300));
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
                    case 'accepted':  //勿删
                    case 'connected' :
                        _this.stopTimer();
                        _this.status = 'normal';
                        _this.els.$sendTextBtnEL.attr('disabled', false);
                        _this.els.$sendImgBtnEL.attr('disabled', false);
                        _this.els.$connectionStateEl.html('连接成功');
                        _this.els.$connectionStateEl.removeClass('unConnected').addClass('connected');
                        if(window.top.customerGroupView)
                            window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'online'),window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId);
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
                        _this.appendMessage({
                            message: imMessage.messageBody.textBody ? imMessage.messageBody.textBody : '',
                            time: new Date(),
                            messageBodyType: imMessage.messageBody.messageBodyType,
                            name: imMessage.sendUserName,
                            type: 1
                        });
                        if(window.top.customerGroupView) window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId);
                        break;
                    case 'close' :
                        _this.els.$sendTextBtnEL.attr('disabled', true);
                        _this.els.$sendImgBtnEL.attr('disabled', true);
                        _this.status = status;
                        _this.els.$connectionStateEl.html('对方已下线');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        if(window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                        break;
                    case 'closeSocket' :
                        _this.status = status;
                        _this.els.$connectionStateEl.html('由于您长时间未操作，连接已关闭');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        _this.els.$sendTextBtnEL.attr('disabled', true);
                        _this.els.$sendImgBtnEL.attr('disabled', true);
                        if(window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                        break;
                    case 'closeOrder' :
                        _this.status = status;
                        _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
                        _this.els.$connectionStateEl.html('工单完结');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        _this.els.$sendTextBtnEL.attr('disabled', true);
                        _this.els.$sendImgBtnEL.attr('disabled', true);
                        if(window.top.customerGroupView) window.top.customerGroupView.updateStatus(imMessage.sendUserId, 'offLine');
                        break;
                    default:
                        break;
                }
            }
        },
        html: function () {
            var _this = this;
            $.each(_this.data.messages, function (index, data) {
                //_this.appendMessage(data);
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
                    receiveUserId: imMessage ? imMessage.sendUserId : null,
                    receiveUserName: imMessage ? imMessage.sendUserName : null,
                    receiveUserSiteId: imMessage ? imMessage.sendUserSiteId : null,
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
        appendMessage: function (message) {
            var _this = this;
            _this.data.messages.push(message);
            $(_this.getHtmlString(message)).appendTo(_this.els.$contentEl);
            _this.els.$scrollEl.scrollTop(_this.els.$contentEl.height());
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
        closeOrder:function(){
            //TODO 关闭工单状态
            openPage.imMessage.status = '';
            this.setStatus();
        },
        sendText: function () {
            var _this = this;
            var text = _this.els.$textEl.val();
            //TODO 需设置文本内容长度
            if ($.trim(text) !== '') {
                var createO = _this.createSendVo('text', text);
                console.log('webSocket:' + _this.comet.websocket.id);
                _this.comet.websocket.send(JSON.stringify(createO));
                var message = {
                    type: 2,
                    time: new Date(),
                    message: text,
                    messageBodyType: 'text'
                }
                _this.appendMessage(message);
                _this.els.$textEl.val('');
            }
        },
        sendImg: function () {
            var _this = this;
            _this.els.$imgFileInputEl.click();
            _this.els.$imgFileInputEl.change(function () {
                var reader = new FileReader();
                var file = this.files[0];
                if (file) {
                    reader.readAsDataURL(file);
                }
                //TODO 需判断文件大小
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