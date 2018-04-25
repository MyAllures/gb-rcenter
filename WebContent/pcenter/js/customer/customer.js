define(['common/BaseEditPage', 'validate'], function (BaseEditPage, validate) {

    return BaseEditPage.extend({
        //comet : new Comet(),
        els: {
            contontEl: $('.ivu-scroll-content'),
            btnEL: $('#submitMessageBtn'),
            textEl: $('#messageTextArea'),
            ConnectionSatateEl: $('#connection-state-el')
        },
        status : 'connect',
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            messages: []
        },
        comet: window.top.comet,
        init: function () {
            var vm = this;
            vm.setStatus();
            vm._super();
            vm.comet.websocket.send(JSON.stringify(vm.createSendVo()));
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
        html: function () {
            var vm = this;
            $.each(vm.data.messages, function (index, data) {
                //vm.appendMessage(data);
                $(vm.getHtmlString(data)).appendTo(vm.els.contontEl);
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
                }
            }
        },
        socketCallBack: function (data) {
            var _this = this;
            if(data.imMessage.status == 'accepted'){
                data.imMessage.status = 'normal';
                _this.els.btnEL.attr('disabled',false);
            }
            var imMessage = openPage.imMessage = data.imMessage;
            _this.setStatus();
            _this.appendMessage({
                message : imMessage.messageBody.textBody ? imMessage.messageBody.textBody : '',
                time : new Date(),
                name : imMessage.sendUserName,
                type : 1
            });
        },
        appendMessage: function (message) {
            var vm = this;
            vm.data.messages.push(message);
            $(vm.getHtmlString(message)).appendTo(vm.els.contontEl);

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
        }
    });
});