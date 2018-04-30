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
            $sendImgBtnEL : $('#sendIimBtn'),
            $textEl: $('#messageTextArea'),
            $connectionStateEl: $('#connection-state-el'),
            $scrollEl: $('.ivu-scroll-container'),
            $imgFileInputEl: $('#imgFileInput')
        },
        status: 'connect',
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            messages: []
        },
        defaultMessage : '您好，请问有什么可以帮您？',
        timeout: 10000,
        timer: null,//计时器
        comet: window.top.comet,
        last_active_time : new Date().getTime(),
        init: function () {
            var _this = this;
            _this.setStatus();
            _this._super();
            if (_this.status == 'normal') {

            } else {
                _this.comet.isConnect && _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
            }
            if (_this.status == 'connect') _this.createTimer();
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
                if (_this.status == 'connect') {
                    _this.els.$connectionStateEl.html('等待连接...');
                } else if (_this.status == 'timeout') {
                    _this.els.$connectionStateEl.html('连接超时');
                    _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                    var userId = imMessage ? imMessage.sendUserId : 'customer';
                    window.top.customerGroupView.updateStatus(userId,'timeout');
                }
            } else {
                switch (status) {
                    case 'accepted' :
                        _this.status = status;
                        _this.els.$connectionStateEl.html('正在接通...');
                        break;
                    case 'normal' :
                        _this.status = status;
                        _this.els.$connectionStateEl.html('连接成功');
                        _this.els.$connectionStateEl.removeClass('unConnected').addClass('connected');
                        window.top.customerGroupView.updateStatus(imMessage.sendUserId,'online');
                        window.top.customerGroupView.andUnReadMessageClass(imMessage.sendUserId);
                        break;
                    case 'closed' :
                        _this.status = status;
                        _this.els.$connectionStateEl.html('对方已下线');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        window.top.customerGroupView.updateStatus(imMessage.sendUserId,'offLine');
                        break;
                    case 'closeSocket' :
                        _this.status = status;
                        _this.els.$connectionStateEl.html('连接已关闭');
                        _this.els.$connectionStateEl.removeClass('connected').addClass('unConnected');
                        window.top.customerGroupView.updateStatus(imMessage.sendUserId,'offLine');
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
                        messageType: type,
                        textBody: body
                        //byteBody : type == 'picture'  || type == 'video' ? body : null
                    }
                })
            }
        },
        socketCallBack: function (data) {
            var _this = this;
            switch(data.imMessage.status){
                case 'accepted' :
                    _this.status = 'accepted';
                    _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
                    break;
                case 'connected' :
                    _this.stopTimer();

                    data.imMessage.status = 'normal';
                    _this.els.$sendTextBtnEL.attr('disabled', false);
                    _this.els.$sendImgBtnEL.attr('disabled', false);
                    if(data.imMessage.isCustomer){
                        var imMessage = data.imMessage;
                        _this.appendMessage({
                            message: _this.defaultMessage,
                            time: new Date(),
                            messageType: 'text',
                            name: imMessage.sendUserName,
                            type: 1
                        });

                    }
                    break;
                case 'normal':
                    var imMessage = data.imMessage;
                    _this.appendMessage({
                        message: imMessage.messageBody.textBody ? imMessage.messageBody.textBody : '',
                        time: new Date(),
                        messageType: imMessage.messageBody.messageType,
                        name: imMessage.sendUserName,
                        type: 1
                    });
                    break;
                case 'close':
                    data.imMessage.status = 'closed';
                    _this.els.$sendTextBtnEL.attr('disabled', true);
                    _this.els.$sendImgBtnEL.attr('disabled', true);
                    break;
                default : break;
            }
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
            var html = data.type == 1 ?
                '<div class="service-person" ><p>' + data.name + '<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span></p>' +
                '<div class="customer_message">' + (data.messageType == 'text' ? data.message : '<img src="' + data.message + '"/>') + '</div>' +
                '</div>'
                :
                '<div class="guest-person" ><p>我<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span></p>' +
                '<div class="customer_message">' + (data.messageType == 'text' ? data.message : '<img src="' + data.message + '"/>') + '</div>' +
                '</div>';
            return html;
        },
        disConnect: function () {
            var _this = this;
            _this.status = 'close';
            _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
            //this.comet.disConnect();
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
                }, _this.timeout);
        },
        stopTimer: function () {
            clearTimeout(this.timer);
        },
        sendText: function () {
            var _this = this;
            var text = _this.els.$textEl.val();
            if ($.trim(text) != '') {
                var createO = _this.createSendVo('text', text);
                _this.comet.websocket.send(JSON.stringify(createO));
                var message = {
                    type: 2,
                    time: new Date(),
                    message: text,
                    messageType: 'text'
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
                reader && reader.addEventListener("load", function () {
                    _this.comet.websocket.send(JSON.stringify(_this.createSendVo('picture', reader.result)));
                    var message = {
                        type: 2,
                        time: new Date(),
                        message: reader.result,
                        messageType: 'picture'
                    }
                    _this.appendMessage(message);
                    _this.els.$textEl.val('');
                }, false);
            });
        },
        socketIsCloseFn: function(){
            openPage.imMessage.status  = 'closeSocket';
            this.setStatus();
        }
    });
});