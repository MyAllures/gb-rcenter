define(['gb/home/TopPage', 'poshytip'], function (TopPage, Poshytip) {

    return TopPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },

        /**
         * 自动绑定Button标签的所有按钮事件
         */
        bindNavigation: function () {
            var _this = this;
            $(document).on("click", "a[nav-target]", function (e) {
                _this._doNavigate(e);
                return false;
            });

            $(document).on("click", ".sidebar-nav a", function (e) {
                _this.loading();
                e.preventDefault();
                var $target = $(e.currentTarget);

                if ($target.parent().parent()[0].tagName == "DL" && $target.parent()[0].tagName == "DT") {
                    if (!$target.parent().parent().hasClass("select")) {
                        $("dd", $(".sidebar-nav dt.select").parent()).removeClass("select").css("display", "none");
                        $(".sidebar-nav dt.select").find('i').removeClass('select');
                        $(".sidebar-nav dt.select").removeClass("select");
                    }
                    $("dd", $target.parent().parent()).css("display", "block");
                }
                $("dd", $target.parent().parent()).removeClass("select");
                $target.parent().addClass("select");
                $target.find('i').addClass('select');

                if (!$target.attr("nav-target")) {
                    var first = $("dd", $target.parent().parent())[0];
                    $(first).addClass("select");
                    _this._doNavigate(e);
                }
            });
        },

        /**
         * 显示最后一次点击的 {nav-top,nav-target} 页面
         */
        showPage: function (url) {
            var _this = this;
            var $obj = $(_this.hashEvent.currentTarget);
            url= url||$obj.attr("data")||$obj.attr("href");
            var target = $obj.attr("nav-target");
            $('.preloader').show();

            this.ajax({
                mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
                url: root + url,
                type: 'GET',
                cache: false,
                loading: true,
                dataType: "html",
                eventTarget: {currentTarget: _this.hashEvent.currentTarget},
                eventCall:eventCall=function(e){
                    _this.showPage();
                },
                success: function (data) {
                    $("#" + target).html(data);
                    $('.preloader').hide();
                    document.title = _this.currentMenuTitle(url);
                    document.activeElement =$(this.formSelector + " textarea,input:not('[name=\"paging.pageNumberText\"]'):not('.daterangepickers input'):not('[readonly]'):not('[type=radio]'):input:visible:enabled:first")[0];
                    if(document.activeElement) {
                        document.activeElement.focus();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        },
        /**
         * 显示提示信息，time后隐藏
         * @param msg 提示信息
         * @param time 显示时间
         * @param callback  回调
         */
        showTips: function (msg, time, callback) {

        },
        /**
         * 提示错误信息
         * @param msg       错误信息字符串
         */
        showErrorMessage: function (msg, callback, autoClose) {
            if(msg==null || msg==undefined || msg==""){
                return;
            }
            callback = this._showCallback(callback);
            var _bootstrapDialog = this.bootstrapDialog;
            var option = {
                type: _bootstrapDialog.TYPE_DANGER,
                title: window.top.message.common["dialog.title.error"],
                onhidden: callback,
                message: this.getDefaultMessageContainer(msg)
            };
            if (autoClose == true) {
                option.onshow = function () {
                    var _this = _bootstrapDialog.dialogs[this.id];
                    window.setTimeout(function () {
                        _this.close();
                    }, 2000)
                };
            }
            this.bootstrapDialog.show(option);
        },
        /**
         * 提示信息
         * @param msg       信息字符串
         */
        showInfoMessage: function (msg, callback) {
            callback = this._showCallback(callback);
            var option = {
                type: this.bootstrapDialog.TYPE_INFO,
                title: window.top.message.common["dialog.title.info"],
                onhidden: callback,
                message: this.getDefaultMessageContainer(msg)
            };
            this.bootstrapDialog.show(option);
        },
        /**
         * 提示成功信息
         * @param msg       成功信息字符串
         */
        showSuccessMessage: function (msg, callback) {
            callback = this._showCallback(callback);
            var option = {
                type: this.bootstrapDialog.TYPE_SUCCESS,
                title: window.top.message.common["dialog.title.success"],
                onhidden: callback,
                message: this.getDefaultMessageContainer(msg),
                buttons: [{
                    label: this.bootstrapDialog.DEFAULT_TEXTS.OK,
                    action: function (dialog) {
                        dialog.setData('btnClicked', true);
                        typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
                        dialog.close();
                    }
                }]
            };
            this.bootstrapDialog.show(option);
        },
        /**
         * 提示警告信息
         * @param msg       警告信息字符串
         */
        showWarningMessage: function (msg, callback) {
            callback = this._showCallback(callback);
            var option = {
                type: this.bootstrapDialog.TYPE_WARNING,
                title: window.top.message.common["dialog.title.warning"],
                onhidden: callback,
                message: this.getDefaultMessageContainer(msg)
            };
            this.bootstrapDialog.show(option);
        },
        /**
         * 提示警告信息
         * @param msg       警告信息字符串
         */
        showConfirmMessage: function (msg, callback) {
            callback = this._showCallback(callback);
            this.bootstrapDialog.confirm({
                type: this.bootstrapDialog.TYPE_WARNING,
                title: window.top.message.common["dialog.title.confirm"],
                callback: callback,
                message: this.getDefaultMessageContainer(msg)
            });
        },
        /**
         * 提示警告信息(可以自己定义标题、按钮名称)
         * @param title       标题
         * @param msg         警告信息字符串
         * @param okLabel     确认按钮名称
         * @param cancelLabel 取消按钮名称
         * @param callback    回调方法
         */
        showConfirmDynamic: function (title, msg, okLabel, cancelLabel, callback) {
            msg = $(this.dialogMessageContainer).html(msg);
            callback = this._showCallback(callback);
            this.bootstrapDialog.confirmDynamic(title, msg, okLabel, cancelLabel, callback);
        },
        /**
         * 客服链接(需定义option.url)
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            if (option.url) {
                var iWidth = 650;                          //弹出窗口的宽度;
                var iHeight = 650;                       //弹出窗口的高度;
                //获得窗口的垂直位置
                var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
                //获得窗口的水平位置
                var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
                var params = 'width=' + iWidth
                        + ',height=' + iHeight
                        + ',top=' + iTop
                        + ',left=' + iLeft
                        + ',channelmode=yes'//是否使用剧院模式显示窗口。默认为 no
                        + ',directories=yes'//是否添加目录按钮。默认为 yes
                        + ',fullscreen=no' //是否使用全屏模式显示浏览器
                        + ',location=yes'//是否显示地址字段。默认是 yes
                        + ',menubar=yes'//是否显示菜单栏。默认是 yes
                        + ',resizable=yes'//窗口是否可调节尺寸。默认是 yes
                        + ',scrollbars=no'//是否显示滚动条。默认是 yes
                        + ',status=yes'//是否添加状态栏。默认是 yes
                        + ',titlebar=yes'//默认是 yes
                        + ',toolbar=yes'//默认是 yes
                    ;
                window.open(option.url, '_blank', params);
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 打开新窗口，防止被浏览器阻止新窗口
         * @param url
         * @param target
         */
        windowOpen: function (url, target) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            if (target == null) {
                target = '_blank';
            }
            a.setAttribute("target", target);
            document.body.appendChild(a);
            if (a.click) {
                a.click();
            } else {
                try {
                    var evt = document.createEvent('Event');
                    a.initEvent('click', true, true);
                    a.dispatchEvent(evt);
                } catch (e) {
                    window.open(url, target);
                }
            }
            document.body.removeChild(a);
        }
    });

});