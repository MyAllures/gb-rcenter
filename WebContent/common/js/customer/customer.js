define(['common/BaseEditPage', 'validate'], function (BaseEditPage, validate) {

    return BaseEditPage.extend({
        els: {
            contontEl: $('.ivu-scroll-content'),
            btnEL: $('#submitMessageBtn'),
            textEl: $('#messageTextArea'),
            ConnectionSatateEl: $('#connection-state-el'),
            scrollEl:$('.ivu-scroll-container')
        },
        status : 'connect',
        defaultMessage : '您好，请问有什么可以帮您？',
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            messages: []
        },
        comet: window.top.comet,
        init: function () {
            var _this = this;
            _this.setStatus();
            _this._super();
            //openPage.returnValue = _this.disConnect();
            if(_this.status == 'normal'){

            }else {
                _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
            }
            /*if (_this.data.messages.length == 0) {
                _this.data.messages.push({
                    type: 1,
                    time: new Date(),
                    message: '您好，请问有什么可以帮您？'
                });
            }
            _this.html();*/
        },
        bindEvent: function () {
            var _this = this;
            _this._super();
            _this.els.btnEL.on("click", function () {
                _this.send();
            });
        },
        onPageLoad: function () {
            this._super();
        },
        setStatus : function(){
            var status;
            var imMessage = openPage.imMessage;
            if(imMessage) status = imMessage.status;
            var _this = this;
            if(!status){
                _this.els.ConnectionSatateEl.html('等待连接...');
            }else{
                switch (status) {
                    case 'accepted' : _this.status = status;_this.els.ConnectionSatateEl.html('正在连接...');break;
                    case 'normal' : _this.status = status;_this.els.ConnectionSatateEl.html('连接成功');_this.els.ConnectionSatateEl.removeClass('unConnected').addClass('connected');break;
                    case 'closed' : _this.status = status;_this.els.ConnectionSatateEl.html('对方已下线');_this.els.ConnectionSatateEl.removeClass('connected').addClass('unConnected');break;
                    default: break;
                }
            }
        },
        html: function () {
            var _this = this;
            $.each(_this.data.messages, function (index, data) {
                //_this.appendMessage(data);
                $(_this.getHtmlString(data)).appendTo(_this.els.contontEl);
            });
        },
        send: function () {
            var _this = this;
            var text = _this.els.textEl.val();
            if ($.trim(text) != '') {
                var createO = _this.createSendVo(text);
                _this.comet.websocket.send(JSON.stringify(createO));
                var message = {
                    type: 2,
                    time: new Date(),
                    message: text
                }
                _this.appendMessage(message);
                _this.els.textEl.val('');
            } else {

            }
        },
        createSendVo: function (text) {
            var _this = this;
            var imMessage = openPage.imMessage;
            return {
                _S_COMET: 'IM',
                message: JSON.stringify({
                    status: _this.status,
                    receiveUserId :imMessage ? imMessage.sendUserId : null,
                    receiveUserName :imMessage ? imMessage.sendUserName : null,
                    receiveUserSiteId : imMessage ? imMessage.sendUserSiteId : null,
                    messageBody: {
                        messageType: 'text',
                        textBody: text
                    }
                })
            }
        },
        socketCallBack: function (data) {
            var _this = this;
            console.log(data);
            if(data.imMessage.status == 'connected' || data.imMessage.status == 'accepted'){
                data.imMessage.status = 'normal';
                _this.els.btnEL.attr('disabled',false);
            }else if(data.imMessage.status == 'normal'){
                var imMessage = data.imMessage;
                _this.appendMessage({
                    message : imMessage.messageBody.textBody ? imMessage.messageBody.textBody : '',
                    time : new Date(),
                    name : imMessage.sendUserName,
                    type : 1
                });
            }else if(data.imMessage.status == 'close'){
                data.imMessage.status = 'closed';
                _this.els.btnEL.attr('disabled',true);
            }
            openPage.imMessage = data.imMessage;
            _this.setStatus();
        },
        appendMessage: function (message) {
            var _this = this;
            _this.data.messages.push(message);
            $(_this.getHtmlString(message)).appendTo(_this.els.contontEl);
            _this.els.scrollEl.scrollTop(_this.els.contontEl.height());
        },
        getHtmlString: function (data) {
            var html = data.type == 1 ?
                '<div class="service-person" ><p>'+data.name+'<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span></p>' +
                '<div class="customer_message">' + data.message + '</div>' +
                '</div>'
                :
                '<div class="guest-person" ><p>我<span>' + window.top.topPage.formatDateTime(data.time, "yyyy-MM-dd HH:mm") + '</span></p>' +
                '<div class="customer_message">' + data.message + '</div>' +
                '</div>';
            return html;
        },
        disConnect:function(){
            var _this = this;
            _this.status = 'close';
            _this.comet.websocket.send(JSON.stringify(_this.createSendVo()));
            //this.comet.disConnect();
        }
    });
});