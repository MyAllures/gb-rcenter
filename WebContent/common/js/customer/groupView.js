/**
 * createBy:nick
 * createDate:2018/04/26
 * 多用户聊天窗口demo版
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        _sep_Iframe: '_iframe',
        _sep_Li: '_li',
        els: {
            $groupUserUl: null,
            $userChatDivUl: null,
            $modal: null,
            $apnData: null,
            $modalCon: null,
            $mainModal: null,
            $minModal: null
        },
        data: {
            imMessage: null,
            users: []
        },
        height: 0,
        openRef: 'btn',
        validConnectTimer: null,
        comet: window.top.comet,
        init: function () {
            var _this = this;
            _this._super();
            _this.els.$groupUserUl = $('#group-user-ul');
            _this.els.$userChatDivUl = $('#user-chat-div');
            _this.els.$mainModal = $('.mymodal');
        },
        bindEvent: function () {
            var _this = this;
            _this._super();
            $(".mdlFire").click(function (e) {
                e.preventDefault();
                var $id = $(this).attr("data-target");
                $($id).modal({backdrop: false, keyboard: false});
            });
            $(".modalMinimize").unbind('click').on("click", function (e) {
                e.preventDefault();
                _this.els.$modalCon = $(this).closest(".mymodal").attr("id");
                _this.els.$modal = "#" + _this.els.$modalCon;
                $(".modal-backdrop").addClass("display-none");
                $(_this.els.$modal).toggleClass("min");
                if ($(_this.els.$modal).hasClass("min")) {
                    _this.els.$apnData = $(this).closest(".mymodal");
                    //$(this).find("i").toggleClass('fa-minus').toggleClass('fa-folder-open');
                    $('.mymodal .modal-body').css('display', 'none');
                    if (!_this.els.$minModal) {
                        _this.els.$minModal = _this.els.$minModal === null ? $($('#customerGroupModal')[0].outerHTML) : _this.els.$minModal;
                        _this.els.$minModal.find('.modal-body').html('');
                        _this.els.$minModal.attr('id', 'customerGroupModal_min');
                        _this.els.$minModal.find(".modalMinimize i").toggleClass('fa-minus').toggleClass('fa-folder-open');
                        $(".minmaxCon").append(_this.els.$minModal);
                        $(this).unbind('click');
                    } else {
                        $('#customerGroupModal_min').addClass('min');
                        $(".minmaxCon").show();
                    }
                }
                else {
                    $('#customerGroupModal').removeClass('min');
                    $('#customerGroupModal .modal-body').show();
                    $(".minmaxCon").hide();
                    $(".minmaxCon .modal-header").removeClass('has-unread-message');
                    _this.height = _this.els.$userChatDivUl.height();
                }
                ;
            });
            $('.mymodal').on('shown.bs.modal', function (e) {
                e.preventDefault();
                _this.data.imMessage = null;
                var options = $(this).data('bs.modal').options;
                if (options.data != null) {
                    _this.openRef = 'user';
                }
                _this.height = _this.els.$userChatDivUl.height();
                if (_this.openRef === 'btn') {
                    _this.addDefaultWin();
                } else {
                    _this.addUserWin(options.data.imMessage);
                }
                //发送获取离线消息通知
                if(options.btnClk) {
                    _this.sendOffineMessage(true); //获取客服留言
                    _this.sendOffineMessage(false); //获取用户留言
                }
            });
            $('.mymodal').unbind('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                var _iframes = _this.els.$userChatDivUl.find('iframe');
                _iframes.each(function (index, ifr) {
                    ifr.contentWindow.page.disConnect();
                });
                _this.destory();
                window.top.customerGroupView = null;
                $(this).data('bs.modal', null);
                $(this).find('.modal-content').html('');
                $(this).remove();
                _this._appendModal();
            })
        },
        onPageLoad: function () {
            this._super();
        },
        /**添加默认窗口**/
        addDefaultWin: function () {
            var _this = this;
            /*
             * 主动发起聊天，只允许发起一个聊天窗口。
             * 但可以接收多个聊天窗口
             */
            var r = _this._hasCustomerWin();
            if (!r) {
                _this.data.users.push('customer');
                _this._andUserLi('customer', null, true);
                _this._andUserIframe('customer', {
                    page: {
                        imMessage: null,
                        isButtonClick: true,
                        isCustomer: true
                    }
                });
                r = 'customer';
            }
            _this._showGroupWin();
            _this.showUserWin(r);
        },
        /**添加用户发起的窗口**/
        addUserWin: function (imMessage) {
            var _this = this;
            var userId = imMessage.sendUserId;
            if (!_this._constainsUserId(userId)) {
                _this.data.users.push(userId);
                var li = _this._andUserLi(imMessage.sendUserId, imMessage.sendUserName, imMessage.isCustomer);
                _this._andUserIframe(imMessage.sendUserId, {
                    page: {
                        imMessage: imMessage,
                        isButtonClick: false,
                        isCustomer: imMessage.isCustomer
                    }
                });
            }
            _this._showGroupWin();
            _this.showUserWin(userId);
        },
        /**显示当前窗口**/
        showUserWin: function (userIdOrLi) {
            var _this = this, _this_li, userId;
            if ("object" === typeof(userIdOrLi)) {
                _this_li = userIdOrLi;
                userId = _this_li.attr('id').replace(_this._sep_Li, '');
            } else {
                userId = userIdOrLi;
                _this_li = _this.els.$groupUserUl.find('li[id=' + userId + _this._sep_Li + ']');
            }
            var _this_iframe = _this.els.$userChatDivUl.find('iframe[id="' + userId + _this._sep_Iframe + '"]');
            if (_this_iframe.is(":hidden")) {
                _this.els.$groupUserUl.find('li').not(_this_li).removeClass('click');
                _this.els.$userChatDivUl.find('iframe').not(_this_iframe).hide();
                _this_li.removeClass('has-unread-message');
                _this_li.addClass('click');
                _this_iframe.show();
            }
        },
        /**关闭当前窗口**/
        closeUserWin: function ($li, noSendClose) {
            var _this = this;
            //TODO 删除li和iframe (注意：如果由未读聊天记录不允许关闭）
            var userId = $li.attr('id').replace(this._sep_Li, '');
            var $iframe = this.els.$userChatDivUl.find('iframe[id="' + userId + this._sep_Iframe + '"]');
            if (!noSendClose) $iframe[0].contentWindow.page.disConnect();
            _this._removeUserId(userId);
            if (_this.data.users.length === 0) {
                $(".minmaxCon").hide();
                $('#customerGroupModal').modal('hide');
            } else {
                $li.remove();
                $iframe.remove();
            }
        },
        /**
         * 修改li状态
         * @param userId
         * @param status
         */
        updateStatus: function (userId, status) {
            var _this = this,$li = _this.els.$groupUserUl.find('li[id=' + userId + _this._sep_Li + ']');
            $li.find('.fa-circle').removeClass(function (index, className) {
                return (className.match(/(^|\s)onlineStatus_\S+/g) || []).join(' ');
            }).addClass('onlineStatus_' + status);
            switch (status) {
                case 'timeout':
                    $li.find('span').html('');
                    break;
                case 'offLine':
                    _this._addCloseButton($li);
                    break;
                case 'online':
                    break;
                case 'closeOrder':
                    break;
                default:
                    break;
            }
        },
        setData: function (data) {
            var _this = this,li,userId;
            if(data.imMessage.status === 'normal'){
                if(data.imMessage.messageType === 'historyMessage') {
                    var workOrderId = data.imMessage.workOrderId;
                    li = this.els.$groupUserUl.find('li[workOrderId=' + workOrderId + ']');
                    userId = li.attr('id').replace(this._sep_Li, "");
                    this.els.$userChatDivUl.find('iframe[id="' + userId + this._sep_Iframe + '"]')[0].contentWindow.page.appendHistory(data.imMessage.sendUserId, data.imMessage.messageBody.other.historyMessage);
                }
                if(data.imMessage.messageType === 'offlineMessage') {
                    _this._addOffineWin(data.imMessage.client,data.imMessage.messageBody.other.offlineMessage);
                }
            }else {
                userId = data.imMessage.sendUserId;
                li = _this.hasUserWin(userId);
                if (data.imMessage.status === 'accepted') {
                    data.imMessage.isCustomer = true;
                    li ? _this.closeUserWin(_this.hasUserWin('customer'), true) : _this._updateUserIdByEls('customer', userId, data.imMessage.sendUserName);
                }
                li = _this.hasUserWin(userId);
                if (li) _this._removeCloseButton(li), this.els.$userChatDivUl.find('iframe[id="' + userId + this._sep_Iframe + '"]')[0].contentWindow.page.socketCallBack(data);
                else data.imMessage.status !== 'close' ? this.addUserWin(data.imMessage) : '';
            }
        },
        /**
         * 窗口是否已存在
         * @param userId
         * @returns {*}
         */
        hasUserWin: function (userId) {
            var li = this.els.$groupUserUl.find('li[id=' + userId + this._sep_Li + ']');
            if (li.length > 0) return li;
            return null;
        },
        /**
         * 未读消息闪动提醒
         * @param userId
         */
        andUnReadMessageClass: function (userId) {
            if ($('.minmaxCon').children().length > 0 && !$('.minmaxCon').is(':hidden')) {
                $('.minmaxCon .modal-header').addClass('has-unread-message');
            }
            var _this_li = this.els.$groupUserUl.find('li[id=' + userId + this._sep_Li + ']');
            if (!_this_li.hasClass('click')) _this_li.addClass('has-unread-message');
        },
        setWokerOrderId : function(userId,workOrderId){
            this.els.$groupUserUl.find('li[id=' + userId + this._sep_Li + ']').attr('workOrderId',workOrderId);
        },
        /**
         * 添加左侧用户列表
         * @param id
         * @param name
         * @returns {Mixed|jQuery|HTMLElement}
         * @private
         */
        _andUserLi: function (id, name, isCustomer) {
            var _this = this;
            name = name ? name : '';
            var $li = $('<li class="clearfix" id="' + id + _this._sep_Li + '" ' + (isCustomer ? ' isCustomer = true style="border-bottom: 1px solid #fff;"' : '') + ' workOrderId="" >' +
                '          <div class="about">' +
                '                 <div class="name"><i class="fa fa-circle"></i><span style="padding-left:4px;">' + name + '</span></div>' +
                '          </div>' +
                '     </li>');
            if (isCustomer) {
                $li = _this._addCloseButton($li);
            }
            $li.bind("click", function () {
                _this.showUserWin($(this));
            });
            isCustomer ? this.els.$groupUserUl.prepend($li) : $li.appendTo(this.els.$groupUserUl)
            return $li;
        },
        _addCloseButton: function ($li) {
            var _this = this;
            if (!$li.hasClass('close-button-customer'))
                $('<button type="button" class="close close-button-customer"><i class="fa fa-times fa-close-li"></i></button>').bind("click", function (e) {
                    e.preventDefault();
                    _this.closeUserWin($(this).closest('li'));
                }).appendTo($li);
            return $li;
        },
        _removeCloseButton: function ($li) {
            $li.find('.close-button-customer').unbind('click').remove();
        },
        /**
         * 获取离线消息
         * @param isClient
         */
        sendOffineMessage : function(isClient){
            window.top.comet.websocket.send(JSON.stringify({
                _S_COMET: 'IM',
                message: JSON.stringify({
                    status: 'command',
                    messageType: 'offlineMessage',
                    client : isClient
                })
            }));
        },
        /**
         * 添加离线消息展示窗口
         * @param isClient
         * @param messages
         * @private
         */
        _addOffineWin : function(isClient,messages){
            var _this = this;
            $.each(messages,function(i,msg){
                var userId = msg.sendUserId;
                if(!_this._constainsUserId(userId)) {
                    msg.status = 'offlineMessage';
                    _this.data.users.push(userId);
                    _this._andUserLi(userId, msg.sendUserName, !!isClient);
                    _this._andUserIframe(userId, {
                        page: {
                            imMessage: msg,
                            isCustomer: !!isClient
                        }
                    });
                }else{
                   this.els.$userChatDivUl.find('iframe[id="' + userId + this._sep_Iframe + '"]').appendOffline(msg);
                }
            });
        },
        /**
         * 添加iframe聊天窗口
         * @param id
         * @param e
         * @private
         */
        _andUserIframe: function (id, e) {
            var _this = this;
            var iframe = '<iframe id="' + id + this._sep_Iframe + '" frameborder="0" scrolling="no" width="100%" style="display:none;overflow: visible;height:' + this.height + 'px;" src="' + root + '/customer/view.html"></iframe>';
            $(iframe).bind("load", function () {
                this.contentWindow.openPage = e.page;
            }).appendTo(this.els.$userChatDivUl);
        },
        /**
         * 显示分组窗口
         * @private
         */
        _showGroupWin: function () {
            var _this = this;
            if ($(_this.els.$modal).hasClass("min")) {
                $('.mymodal .modal-body').show();
                $(".container").append(_this.els.$apnData);
                $(this).find("i").toggleClass('fa-folder-open').toggleClass('fa-minus');

            }
            ;
        },
        /**
         * 用于modal元素清除时重新添加
         * @private
         */
        _appendModal: function () {
            $('<div class="modal fade mymodal" id="customerGroupModal" trole="dialog">\n' +
                '    <div class="modal-dialog modal-lg" role="document">\n' +
                '        <div class="modal-content"></div>\n' +
                '    </div>\n' +
                '</div>').appendTo($(document.body));
        },
        /**
         * 判断userId是否已存在
         * @param userId
         * @returns {boolean}
         * @private
         */
        _constainsUserId: function (userId) {
            var contain = false;
            $.each(this.data.users, function (i, id) {
                if (userId === id) contain = true;
            });
            return contain;
        },
        /**
         * 删除userid
         * @param userId
         * @private
         */
        _removeUserId: function (userId) {
            this.data.users = jQuery.grep(this.data.users, function (value) {
                return value != userId;
            });
        },
        /**
         * 替换userid
         * @param oldUserId
         * @param newUserId
         * @param newUserName
         * @private
         */
        _updateUserIdByEls: function (oldUserId, newUserId, newUserName) {
            var _this = this;
            var li = _this.els.$groupUserUl.find('li[id=' + oldUserId + _this._sep_Li + ']');
            var iframe = _this.els.$userChatDivUl.find('iframe[id="' + oldUserId + _this._sep_Iframe + '"]');
            li.attr('id', newUserId + this._sep_Li);
            iframe.attr('id', newUserId + this._sep_Iframe);
            li.find('span').html(newUserName);
            _this._removeUserId(oldUserId);
            _this.data.users.push(newUserId);
        },
        _hasCustomerWin: function () {
            var _this = this;
            var _li = _this.els.$groupUserUl.find('li[iscustomer="true"]');
            if (_li && _li.find('.name i').hasClass('onlineStatus_online')) {
                return _li;
            }
            if (_this._constainsUserId('customer')) {
                return 'customer';
            }
            return null;
        },
        destory: function () {
            //delete this.data;
            this.data.users = [];
            clearInterval(this.validConnectTimer);
        }
    });
});