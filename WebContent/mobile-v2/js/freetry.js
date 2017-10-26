/**
 * Created by fei on 16-12-11.
 */
define(['site/include/BaseIndex'], function (BaseIndex) {
    var isLoad = false;
    return BaseIndex.extend({
        init: function () {
            this._super();
            mui(document.body).on('tap', '.index-action-menu', function () {
                mui('.mui-off-canvas-wrap').offCanvas('show');
            });
        },

        onPageLoad: function () {
            this._super();
            if(this.os == 'app_android' || this.os=='app_ios') {
                $(".pcAndMobile").hide();
            }
            this.gotoDemo();
            this.iosBug();
        },



        /** 试玩 */
        gotoDemo: function () {
            var _this = this;
            mui('body').on('tap', '.btn-try', function () {
                layer.open({
                    title: window.top.message.game_auto['提示'],
                    content: window.top.message.game_auto['欢迎使用试玩模式'],
                    btn: [window.top.message.game_auto['确定'], ''],
                    yes: function (index) {
                        layer.close(index);
                        sessionStorage.is_login = true;
                         if (_this.os === 'app_ios') {
                            demoEnter();
                         } else {
                             mui.ajax('/signUp/createFreeAccount.html', {
                                 dataType: 'json',
                                 type: 'POST',
                                 success: function (data) {
                                     if (data.status) {
                                         var demoModel = data.demoModel;
                                         sessionStorage.demoModel = demoModel;
                                         _this.gotoUrl('/mainIndex.html');
                                     }
                                 }
                             })
                         }
                    }
                })
            });
        },

        /** 一些IOS上有的Bug */
        iosBug: function () {
            // 刷新页面后获取容器高度，解决IOS设备刷新时出现空白页问题
            $('.mui-inner-wrap').height();
            //苹果safari浏览器首页的底部导航栏,首页和我的图标不显示问题
            $(window).bind("pageshow", function () {
                if (isLoad && _this.os === 'ios') {
                    $("#footer_index").addClass("mui-active");
                    $("[id!='footer_index'][id*='footer_']").removeClass("mui-active");
                }
                isLoad = true;
            });
        }

    });
});