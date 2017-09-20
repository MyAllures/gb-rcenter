/**
 * Created by fei on 16-8-4.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector:'form',

        /*密码强度*/
        level1: new RegExp('^[a-zA-Z]+$'),/*单一形式字母*/
        level2: new RegExp('^[0-9]+$'),
        level3: new RegExp('^[0-9a-zA-Z]+$'),/*单一形式字母+数字*/
        level4: new RegExp('^[A-Za-z0-9~!@#$%^&*()_+\\{\\}\\[\\]|\\:;\'\"<>,./?]+$'),/*大小写字母+数字+字符*/

        init : function() {
            this._super();
            this.getTemplate();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            $(".login-bl input").keydown(function (e) {
                if (e.which == 13)
                    $('a.btn-l').trigger('click');
            });
            $('.real-name-b input').keydown(function (e) {
                if (e.which == 13)
                    $('a._ok').trigger('click');
            });
            $('[name="tempPass"]').bind('input propertychange', function(){
                _this.checkPassStrength();
            });
        },
        /** 获取站点模板 */
        getTemplate:function(){
            window.top.topPage.ajax({
                url: '/commonPage/error.html',
                dataType: 'html',
                type: 'POST',
                success:function(data){
                    $('._top').html($(data).find('div._topOri'));
                    $('._footer').html($(data).find('div._footerOri'));
                },
                complete: function () {
                    $('._center').height($(window).height() - $('._footer').height());
                }
            })
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            $('.captcha-code').on('click', function(event){
                _this.changeCode();
            });
        },

        /** 验证登录 */
        toChecking: function (e, option) {
            var _this = this;
            var top = window.top.topPage;
            top.ajax({
                url: root + '/passport/verify/index.html',
                dataType: 'html',
                type: 'GET',
                success:function(data){
                    if ($(data).find('div.login-bl').length > 0) {
                        $('div#main').html($(data).find('div.login-bl'));
                        $('[name="search.playerAccount"]').focus();
                        _this.bindButtonEvents();
                        _this.bindFormValidation();
                        _this.onPageLoad();
                    }
                }
            })
        },

        login: function (e, option) {
            $('a.btn-l i').addClass('fa-circle-o-notch fa-spin');
            $('a.btn-l span').text(window.top.message.newi18n['登录中']);
            var _this = this;
            var top = window.top.topPage;
            top.ajax({
                url: root + '/passport/verify/login.html',
                type: 'POST',
                data: $('form').serialize(),
                dataType: 'JSON',
                async: false,
                success:function(data) {
                    if (data.redirect) {
                        $('[name=username]').val($('[name="search.playerAccount"]').val());
                        $('[name=password]').val($('[name=tempPass]').val());
                        $('[name=captcha]').val($('[name=tempCapt]').val());
                        _this.siteLogin(e);
                        return false;
                    }
                    if (data.exist) {
                        if(data.repeat) {
                            top.showWarningMessage(window.top.message.newi18n['导入表中存在多个相同玩家账号']);
                            _this.showCaptcha();
                            _this.recoverLoginBtn(e);
                        } else {
                            var uri = root + '/passport/verify/toCheckRealName.html?search.id=' + data.id;
                            _this.handleLogin(uri);
                        }
                    } else {
                        option.target = root + '/passport/verify/unExist.html?flag=' + data.flag;
                        option.text = window.top.message.newi18n['验证提醒'];
                        top.doDialog(e, option);
                        _this.showCaptcha();
                        _this.recoverLoginBtn(e);
                    }
                },
                error: function (data) {
                    _this.recoverLoginBtn(e);
                }
            });
        },

        recoverLoginBtn: function (e) {
            $('a.btn-l i').removeClass('fa-circle-o-notch fa-spin');
            $('a.btn-l span').text(window.top.message.newi18n['立即登录']);
            $(e.currentTarget).unlock();
        },

        handleLogin: function (url) {
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                success: function (data) {
                    $('div#main').html($(data).find('form#command'));
                    $('[name="result.realName"]').focus();
                    _this.bindButtonEvents();
                    _this.bindFormValidation();
                    _this.onPageLoad();
                }
            });
        },

        showCaptcha: function () {
            $('.captcha-code').trigger('click');
            $('[name=needCaptcha]').val('yes');
            $('div.securityCode').show();
            $('[name=tempCapt]').val('');
        },

        siteLogin: function (e) {
            var $form = $('form#loginForm');
            var url = "/passport/login.html?t=" + new Date().getTime().toString(36);
            var _this = this;
            if ($('[name=username]', $form).val().trim() && $('[name=password]', $form).val().trim()) {
                window.top.topPage.ajax({
                    type: "POST",
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    url: url,
                    data: $form.serialize(),
                    dataType: "JSON",
                    success: function (data) {
                        if (data.success) {
                            console.log('Log in ' + data.success);
                            window.location.href = '/';
                        } else {
                            console.log('Log in failed!');
                            _this.recoverLoginBtn(e);
                        }
                    }, error: function (data) {
                        _this.recoverLoginBtn(e);
                    }
                })
            } else {
                _this.recoverLoginBtn(e);
            }
        },

        bindButtonEvents: function () {
            window.top.topPage.bindButtonEvents(this,document);
        },

        /** 绑定表单验证规则 */
        bindFormValidation : function() {
            var $form = $(this.formSelector);
            var rule = this.getValidateRule($form);
            if (rule) {
                if($.data($form[0], 'validator')) {
                    $.data($form[0], 'validator', null);
                }
                $form.validate(rule);
            }
        },

        getValidateRule: function ($form) {
            var $ruleDiv = $form.find('div[id=validateRule]');
            if ($ruleDiv.length > 0) {
                var rule= eval('({' + $ruleDiv.text() + '})');
                rule.ignore = '.ignore';
                return rule;
            }
            return null;
        },

        validateForm: function(e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },

        /** 验证密码强度 */
        checkPassStrength :function() {
            var $this = $('[name="tempPass"]');
            var $parent = $this.parents('.form-group');
            var level = 0;
            var value = $this.val();
            if(!$parent.hasClass('has-error')) {
                if(this.level1.test(value)||this.level2.test(value)) {
                    level = 1;
                } else if(this.level3.test(value)) {
                    level = 2;
                } else if(this.level4.test(value)) {
                    level = 3;
                }
                $('[name="passLevel"]').val(level * 10);
            }
            $('._password_level', $parent).find('[password-level]').hide().eq(level).show();
        },

        changeCode: function (e) {
            var timestamp = (new Date()).valueOf();
            var src = root + '/pcenter/captcha/code.html?t=' + timestamp;
            $('.captcha-code').attr('src', src);
            e && $(e.currentTarget).unlock();
        },

        checkRealName: function(e, option) {
            $('a._ok i').addClass('fa-circle-o-notch fa-spin');
            $('a._ok span').text(window.top.message.newi18n['请稍后']);
            var _this = this;
            var top = window.top.topPage;
            /*后台验证*/
            top.ajax({
                url: root + '/passport/verify/checkRealName.html',
                dataType: 'JSON',
                type: 'POST',
                async: false,
                data: $(this.formSelector).serialize(),
                success: function(data) {
                    // 验证真实姓名通过
                    if (data.nameSame) {
                        // 账号冲突
                        if (data.conflict) {
                            option.closable = "false";
                            option.target = root + "/passport/verify/setNewUsername.html?search.id=" + $('[name="search.id"]').val();
                            option.text = "账户验证";
                            top.doDialog(e, option);
                            _this.recoverCheckNameBtn(e);
                        } else {
                            _this.importPlayer(e, option);
                        }
                    } else {
                        top.showAlertMessage(window.top.message.newi18n['账号验证'], '<span class="tip_container">'+window.top.message.newi18n['真实姓名与账号不匹配']+'</span>', window.top.message.newi18n['重新验证'], function() {
                            $('.captcha-code').trigger('click');
                            $('[name=captcha]').removeClass('ignore');
                            $('[name="result.realName"]').val('');
                            $('input[name="captcha"]').val('');
                            $('.securityCode').css('display', 'block');
                            $('[name="result.realName"]').focus();
                            _this.resizeDialog();
                            _this.showCaptcha();
                        });
                        _this.recoverCheckNameBtn(e);
                    }
                },
                error:function(data){
                    _this.recoverCheckNameBtn(e);
                }
            })
        },

        /** 提交并导入账号 */
        importPlayer: function (e, option) {
            var _this = this;
            var id = $('[name="search.id"]').val();
            var username = $('[name="result.playerAccount"]').val();
            var top = window.top.topPage;
            top.ajax({
                url: root + '/passport/verify/importPlayer.html',
                dataType: 'JSON',
                type: 'POST',
                data: $(this.formSelector).serialize(),
                success: function (data) {
                    if (data) {
                        option.closable = 'false';
                        option.target = root + '/passport/verify/importSuccess.html?flag=0&search.id=' + id + '&search.playerAccount=' + username;
                        option.text = window.top.message.newi18n['验证提醒'];
                        top.doDialog(e, option);
                    } else {
                        top.showWarningMessage(window.top.message.newi18n['该账号已验证']);
                        _this.recoverCheckNameBtn(e);
                    }
                },
                error: function (data) {
                    _this.recoverCheckNameBtn(e);
                }
            })
        },

        recoverCheckNameBtn: function (e) {
            $('a._ok i').removeClass('fa-circle-o-notch fa-spin');
            $('a._ok span').text(window.top.message.newi18n['确定']);
            $(e.currentTarget).unlock();
        }

    });
});
