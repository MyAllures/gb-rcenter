/**
 * Created by snake on 18-5-2.
 */
$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
});
var delayTime=90;

/**
 * 倒计时
 * @param that
 * @param e
 */
function countDown(that,e) {
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
}

//发送手机验证码
function sendPhoneCode(obj,options) {
    var $phone = $("[name=phone]");
    var obj = $("#sendPhoneCode");
    var phone = $phone.val();
    if (!phone) {
        toast(window.top.message.passport_auto['请输入手机号']);
        return;
    } else if ($phone.valid()) {
        var options = {
            type: "POST",
            url: root + "/forgetPassword/getPhoneVerificationCode.html",
            dataType: "json",
            data: {"phone": phone},
            success: function (data) {
                if (data) {
                    var phoneInterval;
                    wait(90, obj, phoneInterval);
                }
            },
            error: function () {
                toast(window.top.message.passport_auto['服务忙']);
            }
        };
        muiAjax(options);
    }
}

/**
 * 手机验证码
 * @param e
 */
/*function sendPhoneCode (e) {
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
}*/

//发送短信，邮箱等待
function wait(t, obj, interval) {
    interval = setInterval(function () {
        if (t > 0) {
            obj.text((t--) + window.top.message.passport_auto['重新发送2']);
            obj.attr("disabled", true);
            obj.addClass("mui-disabled");
        } else {
            window.clearInterval(interval);
            obj.text(window.top.message.passport_auto['重新发送']);
            obj.removeAttr("disabled");
            obj.removeClass("mui-disabled");
        }
    }, 1000);
}
function bindMobile (){
    //验证手机号码和验证码
    var options = {
        url:root + '/forgetPassword/getPhoneVerificationCode.html'
    }
}