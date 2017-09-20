define([''], function () {
    return Class.extend({
        init:function() {
            mui.init();
            this.bindButtonEvents();
        },
        /**
         * 绑定事件
         */
        bindButtonEvents:function() {
            mui('body').on('tap', 'button', function () {
                var href = $(this).data('href');
                mui.openWindow({
                    url: href,
                    id: href,
                    extras: {},
                    createNew: false,
                    show: {autoShow: true},
                    waiting: {
                        autoShow: true,
                        title: ''
                    }
                })
            });

            mui('body').on('tap', 'a[data-terminal]', function () {
                var terminal = $(this).data('terminal');
                if (terminal === 'pc') {
                    document.cookie = "ACCESS_TERMINAL=pc;expires=0";
                    window.location.replace(root + '/');
                }
            });
        }
    });
})