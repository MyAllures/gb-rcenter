define(['common/BaseEditPage', 'jqFileInput', 'css!themesCss/fileinput/fileinput', 'validate', 'gb/components/Comet'], function (BaseEditPage,jqFileInput,fileinput,validate,Comet) {

    return BaseEditPage.extend({
        //comet : new Comet(),
        els: {
            contontEl: $('.ivu-scroll-content'),
            btnEL: $('#submitMessageBtn'),
            textEl: $('#messageTextArea'),
            ConnectionSatateEl:$('#connection-state-el')
        },
        data: {
            sendMessageData: {
                sendMessageText: '',
                sendMessageImg: ''
            },
            messages: []
        },
        comet : window.top.comet,
        init: function () {
            var vm = this;
            vm.comet.subscribeMsg("IM",vm.socketCallBack);
            if(vm.comet.isConnect){
                vm.els.ConnectionSatateEl.html('连接成功');
                vm.els.ConnectionSatateEl.removeClass('unConnected').addClass('connected');
            }else{
                vm.els.ConnectionSatateEl.html('连接失败');
                vm.els.ConnectionSatateEl.removeClass('connected').addClass('unConnected');
            }
            vm._super();
            if (vm.data.messages.length == 0) {
                vm.data.messages.push({
                    type: 1,
                    time: new Date(),
                    message: '您好，请问有什么可以帮您？'
                });
            }
            vm.html();
        },
        bindEvent: function () {
            var _this = this;
            _this._super();
            _this.els.btnEL.on("click",function () {
                _this.send();
            });
            _this.comet.websocket.onmessage();
        },
        onPageLoad: function () {
            this._super();
        },
        html: function () {
            var vm = this;
            $.each(vm.data.messages,function(index,data){
                //vm.appendMessage(data);
                $(vm.getHtmlString(data)).appendTo(vm.els.contontEl);
            });
        },
        send : function(){
            var _this = this;
            var text = _this.els.textEl.val();
            if($.trim(text) != ''){
                var message = {
                    type: 2,
                    time: new Date(),
                    message: text
                }
                vm.comet.websocket.send(message);
                _this.appendMessage(message);
                _this.els.textEl.val('');
            }else{

            }
        },
        socketCallBack : function(message){
            console.log(message);
        },
        appendMessage: function (message) {
            var vm = this;
            vm.data.messages.push(message);
            $(vm.getHtmlString(message)).appendTo(vm.els.contontEl);

        },
        getHtmlString: function (data) {
            var html = data.type == 1 ?
                '<div class="service-person" ><p>客服<span>'+window.top.topPage.formatDateTime(data.time)+'</span></p>' +
                '<div class="message">'+data.message+'</div>' +
                '</div>'
                :
                '<div class="guest-person" ><p>我<span>'+window.top.topPage.formatDateTime(data.time)+'</span></p>' +
                '<div class="message">'+data.message+'</div>' +
                '</div>';
            return html;
        }
    });
});