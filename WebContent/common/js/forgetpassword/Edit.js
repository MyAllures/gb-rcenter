/**
 * Created by jeff on 15-10-20.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
            /*绑定表单验证*/
            /*var $findPasswordForm = $('#findPasswordForm');
            var findPasswordRule;
            var $findPasswordRuleruleDiv = $findPasswordForm.find('#validateRule');
            var checkUserNameFlag =false;
            if ($findPasswordRuleruleDiv.length > 0) {
                findPasswordRule = eval("({" + $findPasswordRuleruleDiv.text() + "})");
                findPasswordRule.ignore = ".ignore";
            }

            if (findPasswordRule) {
                if ($.data($findPasswordForm[0], "validator")) {
                    $.data($findPasswordForm[0], "validator", null);
                }
                $findPasswordForm.validate(findPasswordRule);
            }*/
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            $(".findTypeGroup a").on("click",function(){
                var $this = $(this);
                $("#findWay").val($this.data().findType);
                $this.siblings().removeClass("active");
                $this.addClass("active");
            });
            $("#continue2").click(function () {
                _this.nextStep(2);
            });
        },
        onPageLoad: function () {
            this._super();
            $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
                var $target = $(e.target);
                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });
            $("input[name='forgetUserName']").on("focus",function(){
                $(".help-block").text('');
            })
        },

        nextTab: function (elem) {
            $(elem).next().find('a[data-toggle="tab"]').click();
        },

        closeOpenService: function () {
            window.open("${data.defaultCustomerService}","Online Help","target=_blank")
        },
        nextStep:function(step){
            checkUserName();
            if(step === 2 && !checkUserNameFlag){
                $("._captcha_code").trigger("click");
                return;
            }
            if($findPasswordForm.valid()){
                var selector = "#step"+step;
                $("a[href="+selector+"]").parent().addClass("active").siblings().removeClass("active");
                var $showDiv = $(selector);
                $showDiv.addClass("active").show().siblings().removeClass("active");

                if(step === 2){
                    $.ajax({
                        url:"/forgetPassword/getFindWay.html",
                        data:{
                            "forgetUserName":$("[name='forgetUserName']").val()
                        },
                        type:"POST",
                        async:false,
                        dataType:"JSON",
                        success:function(data){
                            /*隐藏显示*/
                            debugger;
                            if(data.protectionCanUse){
                                $("._protectionCanUse").show();
                                /*添加问题*/
                                var protection = data.protection
                                $('._answer1',$findPasswordForm).html(protection.answer1);
                                $('._answer2',$findPasswordForm).html(protection.answer2);
                                $('._answer3',$findPasswordForm).html(protection.answer3);
                            }else{
                            }
                            if(data.email){
                                $("._emailCanUse").show();
                                $("[player-email]").each(function(){
                                    var $this = $(this);
                                    var html = $this.html();
                                    $this.html(data.email + html)
                                });
                            }
                            $("#encryptedId",$findPasswordForm).val(data.encryptedId)
                        }
                    })

                }
                if($showDiv.hasClass("_findTypeGroup")){
                    var $selectedType = $('.findTypeGroup a.active')
                    if(!$selectedType.length){
                        alert('请选择验证方式！')
                        return;
                    }
                    var findType = $selectedType.data().findType;
                    $("#findWay").val(findType);
                    $('[find-way='+findType+']').show();
                    if(findType === 'email'){
                        $("#checkPassword").val("check");
    //                    next(4);
                        sendEmailByUserName();
                    }
                } else if ($showDiv.hasClass("_success")){
                    var findWayValue = $("#findWay").val();
                    $('[find-way='+findType+']',$showDiv).show();
                }
                $("#step").val(step)
            }else {
                if (step === 2 ){
                    $("._captcha_code").trigger("click");
                }
            }
        },

        checkUserName: function () {

            $.ajax({
                url: "/forgetPassword/checkPlayerUserNameExist.html",
                data: {
                    "forgetUserName": $("[name='forgetUserName']").val()
                },
                type: "POST",
                async: false,
                dataType: "JSON",
                success: function (data) {
                    if (!data) {
                        $(".help-block").text('请输入正确的账户!');
                    }else {
                        checkUserNameFlag = true;
                    }
                }
            })
        },
        changePasswordByQuestion: function () {

            if($findPasswordForm.valid()){
                $.ajax({
                    url:"/forgetPassword/changePassword.html",
                    data:$findPasswordForm.serialize(),
                    type:"POST",
                    dataType:"JSON",
                    success:function(data){
                        if(data){
                            nextStep(4);
                            /*成功*/
                        }
                    }
                })
            }else {
                $("._captcha_code2").trigger("click");
            }
        },


        sendEmailByUserName: function () {

            var FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY = "findPasswordSendEmailCookieKey";
            var findPasswordSendEmailTimerId;
            var sendEmailIntervalSec = getCookie(FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY);
            sendEmailIntervalSec = Number(sendEmailIntervalSec);
            if(!sendEmailIntervalSec){
                $.ajax({
                    url:"/forgetPassword/sendEmail.html",
                    data:{
                        encryptedId:$("#encryptedId").val()
                    },
                    type:"POST",
                    dataType:"JSON",
                    success:function(data){
                        if(data){
                            setCookie(FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY,new Date());
                            findPasswordSendEmailTimer();
                        }
                    }
                })
            }else{
                findPasswordSendEmailTimer();
            }
        },
        findPasswordSendEmailTimer: function () {
            var $resendBtn = $("#resendBtn");
            findPasswordSendEmailTimerId = setInterval(
                function(){
                    var sendEmailIntervalSec = getCookie(FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY);
                    sendEmailIntervalSec = Number(sendEmailIntervalSec);
                    sendEmailIntervalSec = --sendEmailIntervalSec;
                    if(!sendEmailIntervalSec || sendEmailIntervalSec<0){
                        clearInterval(findPasswordSendEmailTimerId);
                        $resendBtn.prop("disabled",false);
                        $resendBtn.removeClass('disabled')
                        $resendBtn.text("重新发送")
                    }else{
                        $resendBtn.prop("disabled",true);
                        $resendBtn.addClass('disabled')
                        $resendBtn.text("重新发送("+sendEmailIntervalSec+")")
                    }
                    setCookie(FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY,sendEmailIntervalSec);
                },
                1000
            )
        },
        changePasswordByEmail: function () {

            if($findPasswordForm.valid()){
                $.ajax({
                    url:"/forgetPassword/changePasswordByEmail.html",
                    data:$findPasswordForm.serialize(),
                    type:"POST",
                    dataType:"JSON",
                    success:function(data){
                        if(data){
                            nextStep(4);
                        }
                    }
                })
            }
        },
        showChangePwdForm: function () {
            if($findPasswordForm.valid()){
                var  $findTypeGroup =$("._findTypeGroup");
                $findTypeGroup.children().hide();
                $("._change_password",$findTypeGroup).show();
                $("#checkPassword").val("check");
            }
        }
    });
});