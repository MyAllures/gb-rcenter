
define(['common/BaseEditPage','common/PasswordLevel'], function(BaseEditPage,PasswordLevel) {

    return BaseEditPage.extend({
        passwordLevel:null,
        delayTime:90,
        timer:'',
        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.passwordLevel = new PasswordLevel();
        },
        bindEvent: function () {
            this._super();
            $("input[name='phone.phoneVerificationCode']").bind('input propertychange', function() {
                var code = $(this).val();
                $('.checkPhoneCode').attr("href","/personInfo/password/forgetPwd3.html?code="+code);
            });
        },
        saveCallbak:function (e,options) {
            $("#editForm").find(".successsmall").remove();
            window.location.reload();
        },
        /**
         * 倒计时
         * @param that
         * @param e
         */
        countDown:function(that,e) {
            that.delayTime--;
            $(e.currentTarget).text(window.top.message.personInfo_auto['几秒后重新获取'].replace("{0}",that.delayTime));
            if(that.delayTime==1) {
                that.timer='';
                that.delayTime = 90;
                $(e.currentTarget).text(window.top.message.personInfo_auto['免费获取验证码']);
                $(e.currentTarget).removeClass("disable-gray");
                $(e.currentTarget).unlock();
            } else {
                that.timer = setTimeout(function() {
                    that.countDown(that,e);
                },1000);
            }
        },
        /**
         * 手机验证码
         * @param e
         */
        sendPhoneCode:function (e) {
            var _this = this;
            var phone = $("[name='phone.contactValue']").val();
            window.top.topPage.ajax({
                type:"POST",
                dataType:"json",
                url:root+'/personInfo/getPhoneVerificationCode.html',
                data:{"phone":phone,"t":Math.random()},
                loading:true,
                success: function (data) {
                    if(!data.state) {
                        $("[name='phone.contactValue']").addClass("error");
                        if($(".phone").parent().children().hasClass("tips")){
                            $(".phone").parent().find(".tips").remove();
                        }
                        if($(".phone").parent().children().hasClass("mark")){
                            $(".phone").parent().find(".mark").remove();
                        }
                        $(e.currentTarget).unlock();
                        return;
                    }
                    $(e.currentTarget).text(window.top.message.personInfo_auto['90秒后重新获取']);
                    $(e.currentTarget).addClass("disable-gray");
                    setTimeout(function() {
                        _this.countDown(_this,e);
                    },1000);
                },
                error:function(data){
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 获取手机验证码验证
         * @param e
         */
        checkPhoneCode:function (e) {
            var code = $("input[name='phone.phoneVerificationCode']").val();
            if(code!="" && code!=undefined && $(".tips.orange").length==0){
                $(".checkPhoneCode").click();
            }else{
                $(e.currentTarget).unlock();
            }
        },
        //保存安全密码
        updatePrivilegePwd:function (e) {
            var pwd = $("input[name='privilegePwd']").val();
            var pwd2 = $("input[name='privilegeRePwd']").val();
            if(pwd!="" && pwd==pwd2){
                window.top.topPage.ajax({
                    type:"POST",
                    dataType:"json",
                    url:root+'/personInfo/password/updatePrivilegePwd.html',
                    data:this.getCurrentFormData(e),
                    success: function (data) {
                        if(data.state) {
                            $(".goSuccess").click();
                        }
                    },
                    error:function(data){
                        $(e.currentTarget).unlock();
                    }
                });
            }else{
                $(e.currentTarget).unlock();
            }
        }
    });
});
