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
        currentImMessage: null,
        comet: window.top.comet,
        init: function () {
            var _this = this;
            _this._super();
            _this.els.$groupUserUl = $('#group-user-ul');
            _this.els.$userChatDivUl = $('#user-chat-div');
            _this.els.$mainModal = $('.mymodal');
            /*监听socket关闭事件*/
            _this.comet.socketCloseCallBack = function () {
                _this._disConnect();
            }
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
                        _this.els.$minModal = _this.els.$minModal == null ? $($('#customerGroupModal')[0].outerHTML) : _this.els.$minModal;
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
            $("button[data-dismiss='modal']").click(function () {
                //TODO 需判断：若客服有未读的消息或有用户在线，则不允许关闭
                $(".minmaxCon").hide();
                $('#customerGroupModal').modal('hide');
            });
            $('.mymodal').on('shown.bs.modal', function (e) {
                //_this.data.users =  [];
                _this.data.imMessage = null;
                var options = $(this).data('bs.modal').options;
                if (options.data != null) {
                    _this.openRef = 'user';
                    _this.setCurrentImMessage(options.data.imMessage);
                }
                _this.height = _this.els.$userChatDivUl.height();
                if (_this.openRef == 'btn') {
                    _this.addDefaultWin();
                } else {
                    _this.addUserWin(options.data.imMessage);
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
            if (!_this._constainsUserId('customer')) {
                _this.data.users.push('customer');
                _this._andUserLi('customer');
                _this._andUserIframe('customer', {
                    page: {
                        imMessage: null,
                        isButtonClick: true
                    }
                });
            }
            _this._showGroupWin();
            _this.showUserWin('customer');
        },
        /**添加用户发起的窗口**/
        addUserWin: function (imMessage) {
            var _this = this;
            var userId = imMessage.sendUserId;
            if (!_this._constainsUserId(userId)) {
                _this.data.users.push(userId);
                var li = _this._andUserLi(imMessage.sendUserId, imMessage.sendUserName);
                _this._andUserIframe(imMessage.sendUserId, {
                    page: {
                        imMessage: _this.currentImMessage,
                        isButtonClick: false
                    }
                });
            }
            _this._showGroupWin();
            _this.showUserWin(userId);
        },
        /**显示当前窗口**/
        showUserWin: function (userId, li) {
            var _this_li;
            if (li) {
                _this_li = $(li);
                userId = _this_li.attr('id').replace(this._sep_Li, '');
            } else {
                _this_li = this.els.$groupUserUl.find('li[id=' + userId + this._sep_Li + ']');
            }
            var _this_iframe = this.els.$userChatDivUl.find('iframe[id="' + userId + this._sep_Iframe + '"]');
            if (_this_iframe.is(":hidden")) {
                this.els.$groupUserUl.find('li').not(_this_li).removeClass('click');
                this.els.$userChatDivUl.find('iframe').not(_this_iframe).hide();
                _this_li.removeClass('has-unread-message');
                _this_li.addClass('click');
                _this_iframe.show();
            }
        },
        /**关闭当前窗口**/
        closeUserWin: function () {
            var _this = this;
            //TODO 删除li和iframe (注意：如果由未读聊天记录不允许关闭）
        },
        updateStatus: function (userId, status) {
            var li = this.els.$groupUserUl.find('li[id=' + userId + this._sep_Li + ']');
            li.find('.fa-circle').removeClass(function (index, className) {
                return (className.match(/(^|\s)onlineStatus_\S+/g) || []).join(' ');
            }).addClass('onlineStatus_' + status);
            if (status == 'timeout') {
                li.find('span').html('');
            }
        },
        setData: function (data) {
            var _this = this;
            _this.setCurrentImMessage(data.imMessage);
            var userId = data.imMessage.sendUserId;
            if (data.imMessage.isCustomer) {
                _this._updateUserIdByEls('customer', userId, data.imMessage.sendUserName);
            }
            var li = _this.hasUserWin(userId);
            if (li && data.imMessage.status != 'closed') {
                this.els.$userChatDivUl.find('iframe[id="' + userId + this._sep_Iframe + '"]')[0].contentWindow.page.socketCallBack(data);
            } else {
                if (!li && data.imMessage.status != 'close')
                    this.addUserWin(data.imMessage);
            }
        },
        setCurrentImMessage: function (imMessage) {
            this.currentImMessage = imMessage;
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
            if (!$('.minmaxCon').is(':hidden')) {
                $('.minmaxCon .modal-header').addClass('has-unread-message');
            } else {
                var _this_li = this.els.$groupUserUl.find('li[id=' + userId + this._sep_Li + ']');
                if (!_this_li.hasClass('click')) _this_li.addClass('has-unread-message');
            }
        },
        /**
         * 添加左侧用户列表
         * @param id
         * @param name
         * @returns {Mixed|jQuery|HTMLElement}
         * @private
         */
        _andUserLi: function (id, name) {
            var _this = this;
            name = name ? name : '正在获取客服信息';
            var li = '<li class="clearfix click" id="' + id + _this._sep_Li + '">' +
                '          <div class="about">' +
                '                 <div class="name"><i class="fa fa-circle"></i><span style="padding-left:4px;">' + name + '</span></div>' +
                '          </div>' +
                '      </li>';
            $(li).bind("click", function () {
                _this.showUserWin(null, this);
            }).appendTo(this.els.$groupUserUl);
            return $(li);
        },
        /**
         * 添加iframe聊天窗口
         * @param id
         * @param e
         * @private
         */
        _andUserIframe: function (id, e) {
            var _this = this;
            var iframe = '<iframe id="' + id + this._sep_Iframe + '" frameborder="0" scrolling="no" width="100%" style="display:none;overflow: visible;height:' + this.height + 'px;" src="/mcenter/customer/view.html"></iframe>';
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
            if (!$(_this.els.$modal).hasClass("min")) {
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
                if (userId == id) contain = true;
            });
            return contain;
        },
        /**
         * 替换userid
         * @param oldUserId
         * @param newUserId
         * @param newUserName
         * @private
         */
        _updateUserIdByEls: function (oldUserId, newUserId, newUserName) {
            var li = this.els.$groupUserUl.find('li[id=' + oldUserId + this._sep_Li + ']');
            var iframe = this.els.$userChatDivUl.find('iframe[id="' + oldUserId + this._sep_Iframe + '"]');
            li.attr('id', newUserId + this._sep_Li);
            iframe.attr('id', newUserId + this._sep_Iframe);
            li.find('span').html(newUserName);
        },
        /**
         * 监控socket是否已断开
         * 断开则变更聊天窗口状态
         * @private
         */
        _disConnect: function () {
            var _this = this;
            var _iframes = _this.els.$userChatDivUl.find('iframe');
            _iframes.each(function (index, ifr) {
                ifr.contentWindow.page.socketIsCloseFn();
            });
        },
        destory: function () {
            //delete this.data;
            this.data.users = [];
            clearInterval(this.validConnectTimer);
        }
    });
});