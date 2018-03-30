/**
 * Created by bruce on 16-6-19.
 */
/**
 * Created by eagle on 15-10-29.
 */

define(['common/BaseEditPage','mailAutoComplete'], function(BaseEditPage,MailAutoComplete) {

    return BaseEditPage.extend({
        delayTime:100,
        timer:'',

        init: function (title) {
            this._super();
        },

        onPageLoad: function (e,option) {
            this._super();
            $(".inputMailList").mailAutoComplete();
        },

        bindEvent: function () {
            this._super();
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
         * 邮箱验证码
         */
        sendmCode:function(e) {

            var _this = this;
            var email = $("#emailCode").val();
            window.top.topPage.ajax({
                type:"POST",
                dataType:"json",
                url:root+'/personInfo/getVerificationCode.html',
                data:{"email":email,"t":Math.random()},
                loading:true,
                success: function (data) {
                    if(!data.state) {
                        // window.top.topPage.showWarningMessage(data.emailMsg);
                        $("#emailCode").addClass("error");
                        if($(".sop-down").children().hasClass("tips")){
                            $(".sop-down").find(".tips").remove();
                        }
                        if($(".sop-down").children().hasClass("mark")){
                            $(".sop-down").find(".mark").remove();
                        }
                        $("#emailCode").after("<span class=\"tips orange\"><i class=\"mark plaintsmall\"></i>"+window.top.message.personInfo_auto['请输入邮箱']+"</span>");
                        $(e.currentTarget).unlock();
                        return;
                    }
                    $(e.currentTarget).text(window.top.message.personInfo_auto['100秒后重新获取']);
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
                        // window.top.topPage.showWarningMessage(data.msg);
                        $("[name='phone.contactValue']").addClass("error");
                        if($(".phone").parent().children().hasClass("tips")){
                            $(".phone").parent().find(".tips").remove();
                        }
                        if($(".phone").parent().children().hasClass("mark")){
                            $(".phone").parent().find(".mark").remove();
                        }
                        $(".phone").after("<span class=\"tips orange\"><i class=\"mark plaintsmall\"></i>"+window.top.message.personInfo_auto['请输入手机号']+"</span>");
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
         * 客户服务
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        },

        openCustomerService:function() {
            var _this = this;
            $('[name="customerService"]').click(function(e) {
                var url = $(e.currentTarget).attr("url");
                var option = {};
                option.url = url;
                _this.customerService(e,option);
            });
        },

        /**
         * 回调刷新账号设置页面
         * @param e
         * @param options
         */
        mySaveCallBack:function(e,options){
           
        },

    });
});