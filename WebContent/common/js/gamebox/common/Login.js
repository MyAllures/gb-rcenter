/**
 * Created by jeff on 15-12-29.
 */
define(['cookie'], function (cookie) {

    return Class.extend({
        formSelector:'form',
        cookieKey:"HIDE_HINT_FOR_BROWSER_VERSION",
        init: function () {
            var that = this;
            $(".captcha-code").on("click",function(event){
                that.changeCode();
            });
           that.initCheckBrowser();
            that.language();
            //that.onPageLoad();
            that.buildClickEvent();
        },
        buildClickEvent: function () {
            var _this = this;
            $("[name='username']").keydown(function (event) {
                if(event.keyCode==13){
                    _this.doLogin();
                }

            });
            $("[name='password']").keydown(function (event) {
                if(event.keyCode==13){
                    _this.doLogin();
                }
            });
            $("[name='authentication']").keydown(function (event) {
                if(event.keyCode==13){
                    _this.doLogin();
                }
            });
        },
        doLogin: function(){
            var username = $("[name='username']").val();
            var password = $("[name='password']").val();
            if(username==""){
                $("#username-error-msg").text("用户名不能为空");
                $("[name='username']").focus();
                return;
            }else{
                $("#username-error-msg").text("");
            }
            if(password==""){
                $("#password-error-msg").text("密码不能为空");
                $("[name='password']").focus();
                return;
            }else{
                $("#password-error-msg").text("");
            }
            if($("[name='authentication']").length>0&&$("[name='authentication']").val()==""){
                $("#authentication-error-msg").text("身份验证码不能为空");
                $("[name='authentication']").focus();
                return;
            }else{
                $("#authentication-error-msg").text("");
            }

            $("#loginForm").submit();
        },
        /**
         * 多语言选项初始化
         * ＠author: Simon
         */
        language : function(){
            var _this=this;
            window.top.topPage.ajax({
                url:root+'/index/language.html',
                dataType:'json',
                cache: false,
                type:"get",
                success:function(data){
                    var languageCurrent = data.languageCurrent;
                    var languageI18n = data.languageI18n;
                    var languageWarn = window.top.message.common['language.change.warn'];
                    var lis = '';
                    var ali;
                    if(data.languageDicts) {
                        $.each(data.languageDicts, function (key, value) {
                            var lang = value.language;
                            if(!lang){
                                lang = value.dictCode;
                            }
                            var val = languageI18n[lang];
                            var vals = val.split("#");
                            if (lang.indexOf(languageCurrent) > -1) {
                                ali = '<img src="' + resComRoot + vals[1] + '" data-rel=\'{"languageWarn":"' + languageWarn + '"}\' class="m-r-xs">' + vals[0] + '<span class="caret m-l-xs"></span>'
                            }else{
                                lis += '<li><a href="javascript:void(0)" change="language" ><img src="' + resComRoot + vals[1] + '" class="m-r-xs" data-rel=\'{"lang":"' + vals[2] + '","country":"' + vals[3] + '"}\'>' + vals[0] + '</a></li>'
                            }
                        });
                    }
                    $("#divLanguage ul").html(lis);
                    $("#divLanguage button").html(ali);
                    _this.changelanguage();
                }});
        },
        /**
         * 多语言选项切换
         * ＠author: Simon
         */
        changelanguage :function(){
            $(document).on("click","ul li [change='language']", function () {
                var img = $(this).children("img");
                var data_rel = $.parseJSON(img.attr("data-rel"));
                var warn_msg = $.parseJSON($(this).parent().parent().prev().children("img").attr("data-rel"));
                window.top.topPage.showConfirmMessage(warn_msg.languageWarn,function(result)
                {
                    if(result) {
                        window.top.topPage.ajax({
                            url:root+'/index/language/change.html',
                            dataType:'json',
                            cache: false,
                            data: {'lang':data_rel.lang,'country':data_rel.country},
                            type:"get",
                            success:function(data){
                                window.top.topPage.showSuccessMessage(data.msg,function(){
                                    location.reload();
                                });
                            }});
                    }
                });
            });
        },
        bindEvent: function () {
        },
        clearErrorMessage: function () {
            window.top.topPage.ajax({
                url:root+'/index/clearLoginErrorMessage.html',
                dataType:'json',
                cache: false,
                success:function(data){
                    window.top.topPage.showSuccessMessage("clear success!");
                }
            });
        },
        onPageLoad: function () {
            var _this = this;
            var captchaMessage = $("#captchaMessage").val();
            var errorMessage = $("#errorMessage").val();
            if(captchaMessage!=""){
                window.top.topPage.showConfirmMessage(captchaMessage, function () {
                    _this.clearErrorMessage();
                });
            }else{
                if(errorMessage!=""){
                    window.top.topPage.showConfirmMessage(errorMessage, function () {
                        _this.clearErrorMessage();
                    });
                }
            }

            /*if(sysUserStatus&&sysUserStatus=="3"){
                var btnOption = {};
                btnOption.target = root + "/passport/showUserLock.html";
                btnOption.callback = this.queryCallback;
                btnOption.text = "通知";
                window.top.topPage.doDialog({}, btnOption);
            }*/

        },
        changeCode:function (event,option){
            var timestamp = (new Date()).valueOf();
            if(!$(".captcha-code").attr("_src")){
                $(".captcha-code").attr("_src",$(".captcha-code").attr("src"));
            }
            $(".captcha-code").attr("src", $(".captcha-code").attr("_src")+"?t=" + timestamp);
            event && $(event.currentTarget).unlock();
        },

        bindButtonEvents: function () {
            window.top.topPage.bindButtonEvents(this,document);
        },
        closeHint:function( event , option ){
            var $this = $(event.currentTarget);
            $this.parents(".hint-content").hide();
            $this.unbind();
            $.cookie(this.cookieKey,true);
        },
        /* 判断ＩＥ版本,仅判断*/
        isIE : function(ver){
            var b = document.createElement('b')
            b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
            return b.getElementsByTagName('i').length === 1
        },
        showBrowserTip: function(){
            var bol = $.cookie(this.cookieKey);
            if(bol !== 'true'){
                $(".hint-box").show();
            }
        },
        initCheckBrowser:function(){
            var Sys = {};
            var s;
            var ua = navigator.userAgent.toLowerCase();
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :0;
            /* boss ccenter tcenter - [ff][chrome]*/
            var $subSysCode = $('[name=subsysCode]');
            if($subSysCode.val() === 'mcenterTopAgent' || $subSysCode.val() === 'ccenter' || $subSysCode.val() == 'boss'){
                if( !Sys.firefox && ! Sys.chrome){
                    this.showBrowserTip();
                }
            }
            /* mcenter - [ff][chrome][10+] */
            if($subSysCode.val() === 'mcenter'){
                if( !Sys.firefox && ! Sys.chrome && (this.isIE(9)||this.isIE(8)||this.isIE(7)||this.isIE(6))){
                    this.showBrowserTip();
                }
            }
            /* agent pcenter msites - [ff][chrome][8+] */
            if($subSysCode.val() === 'pcenter'|| $subSysCode.val() === 'mcenterAgent' ){
                if( !Sys.firefox && ! Sys.chrome && (this.isIE(7)||this.isIE(6))){
                    this.showBrowserTip();
                }
            }
        }
    });
});