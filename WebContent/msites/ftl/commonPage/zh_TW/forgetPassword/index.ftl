<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/common.css" type="text/css" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/style.css" type="text/css" />
</head>

<body>
<#--找回方式-->
<input name="step" type="hidden" id="step">
<div class="main-jumbotron">
    <div class="container-fluid no-full">
        <div class="row">
            <div class="col-lg-12">
                <div class="branding text-white">
                    <a href="/"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" class="tamashi-logo"></a> | 找回登入密碼
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid no-full m-t">
    <div class="row">
        <form id="findPasswordForm" class="form-horizontal" >
            <input name="encryptedId" value="" id="encryptedId" type="hidden">
            <input name="checkPassword" value="" id="checkPassword" type="hidden">
            <div style="display: none" id="validateRule">${data.forgetPasswordValidateRule}</div>
            <#--密码 强度-->
            <input value="" type="hidden" name="sysUser.passwordLevel">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <!-- <div class="row"> -->
                    <div class="wizard">
                        <ul class="nav nav-pills nav-justified thumbnail nav-wizard">
                            <li class="disabled active">
                                <a href="#step1" data-toggle="tab">
                                    <h3 class="list-group-item-heading">1</h3>
                                    <p class="list-group-item-text">輸入賬號</p>
                                </a>
                            </li>
                            <li class="disabled">
                                <a href="#step2" data-toggle="tab">
                                    <h3 class="list-group-item-heading">2</h3>
                                    <p class="list-group-item-text">選擇校驗方式</p>
                                </a>
                            </li>
                            <li class="disabled">
                                <a href="#step3" data-toggle="tab">
                                    <h3 class="list-group-item-heading">3</h3>
                                    <p class="list-group-item-text">重置密碼</p>
                                </a>
                            </li>
                            <li class="disabled">
                                <a href="#step4" data-toggle="tab">
                                    <h3 class="list-group-item-heading">4</h3>
                                    <p class="list-group-item-text">完成</p>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content m">
                            <div class="tab-pane active" id="step1">
                            <#-- <form class="form-horizontal" id="" method="post" action="#">-->
                                <div class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">賬號</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetUserName" maxlength="20" placeholder="請輸入您的賬號">
                                        <span class="help-block username_tip"></span>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-3 control-label">驗證碼</label>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="forgetPasswordCaptchaCode" maxlength="4" placeholder="驗證碼">
                                            <span class="input-group-btn"><a><img src="${data.contextInfo.playerCenterContext}captcha/forgetPassword.html" alt="" class="_captcha_code" data-code="forgetPassword" onclick="changeCaptcha(this)" alt="" ></a></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" onclick="nextStep(2)">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            <#--</form>-->
                            </div>
                            <div class="tab-pane" id="step2">
                            <#--<form class="form-horizontal" id="" method="post" action="#">-->
                                <div class="list-group findTypeGroup">
                                    <a href="javascript:" class="list-group-item _emailCanUse" style="display: none"  data-find-type="email">
                                        <h4 class="list-group-item-heading text-info">郵箱驗證</h4>
                                        <p class="list-group-item-text">若您賬戶繫結的電子郵箱<span class="text-info"  player-email=""></span>仍在正常使用中，請選擇此驗證方式。</p>
                                    </a>
                                    <a href="javascript:" class="list-group-item _protectionCanUse" style="display: none"  data-find-type="protection">
                                        <h4 class="list-group-item-heading text-info">安全問題驗證</h4>
                                        <p class="list-group-item-text">若您記得設定的安全問題的答案，請選擇此驗證方式。</p>
                                    </a>
                                    <a href="<#if data.defaultCustomerService?has_content>${data.defaultCustomerService}<#else>javascript:</#if>" class="list-group-item" data-find-type="customerervice" target="_blank">
                                        <h4 class="list-group-item-heading text-info">聯絡客服處理</h4>
                                        <p class="list-group-item-text">暫無其他可使用的驗證方式，請直接聯絡線上客服。</p>
                                    </a>
                                    <input name="findWay" type="hidden" id="findWay">
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div class="col-sm-12 text-center">
                                        <a class="btn primary-btn -blue -sm continue" onclick="nextStep(3)">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane _findTypeGroup" id="step3" find-type="protection" style="display: none">
                            <#--</form>-->
                                <!-- 安全問題验证 -->
                            <#-- <form class="form-horizontal" id="" method="post" action="#">-->
                                <div find-way="protection" style="display: none"  class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">問題一：</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static _answer1">我爺爺的名字是？</p>
                                    </div>
                                </div>
                                <div find-way="protection"  style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">答案：</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetPasswordAnswer1" maxlength="20" placeholder="請輸入答案">
                                    </div>
                                </div>
                                <hr>
                                <div  find-way="protection" style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">問題二：</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static _answer2">我的幸運數字是？</p>
                                    </div>
                                </div>
                                <div find-way="protection"  style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">答案：</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetPasswordAnswer2" maxlength="20" placeholder="請輸入答案">
                                    </div>
                                </div>
                                <hr>
                                <div find-way="protection"  style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">問題三：</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static _answer3">我的工號是？</p>
                                    </div>
                                </div>
                                <div find-way="protection" style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">答案：</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetPasswordAnswer3" maxlength="20" placeholder="請輸入答案">
                                    </div>
                                </div>
                                <hr>
                                <div find-way="protection" style="display: none" class="form-group">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" href="javascript:void(0)" onclick="showChangePwdForm()">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            <#--</form>-->
                                <!-- 邮件驗證碼验证 -->
                            <#--<form class="form-horizontal" id="" method="post" action="#">-->
                                <div find-way="email" style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">繫結郵箱</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static" player-email=""></p>
                                    </div>
                                </div>
                                <div find-way="email" style="display: none" class="form-group">
                                    <label for="inputPassword" class="col-sm-3 control-label">請輸入驗證碼</label>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="securityCode"  maxlength="6" placeholder="驗證碼">
                                            <span class="input-group-btn"><a class="btn primary-btn -white -sm" id="resendBtn" onclick="sendEmailByUserName()">发送驗證碼</a></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>

                            <#-- </form>-->
                            <#-- </div>
                             <div class="tab-pane" id="step3">-->
                            <#--<form class="form-horizontal" id="" method="post" action="#">-->
                                <div find-way="email"  style="display: none" class="form-group _change_password">
                                    <label for="inputEmail" class="col-sm-3 control-label">新的登入密碼</label>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control" name="newPassword" maxlength="20" placeholder="請輸入密碼">
                                        <div class="progress pass-strength _password_level">
                                            <div class="progress-bar" style="width: 20%;display: none;" password-level="1">弱</div>
                                            <div class="progress-bar progress-bar-success" style="width: 75%;display: none;" password-level="2">强</div>
                                            <div class="progress-bar progress-bar-success" style="width: 100%;display: none;" password-level="3">非常强</div>
                                        </div>
                                    </div>
                                </div>
                                <div find-way="email" style="display: none" class="form-group _change_password">
                                    <label for="inputEmail" class="col-sm-3 control-label">確認新密碼</label>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control" name="forgetConfirmPassword" maxlength="20" placeholder="確認新密碼">
                                    </div>
                                </div>
                                <div find-way="email" style="display: none"  class="form-group _change_password">
                                    <label for="inputPassword" class="col-sm-3 control-label">驗證碼</label>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="changePasswordCaptchaCode" maxlength="4" placeholder="驗證碼">
                                            <span class="input-group-btn"><a><img onclick="changeCaptcha(this)" class="_captcha_code2" data-code="changePassword" src="${data.contextInfo.playerCenterContext}captcha/changePassword.html" height="34"></a></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div find-way="email"  style="display: none" class="form-group">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" href="javascript:void(0)" onclick="changePasswordByEmail()">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                                <div  class="form-group _change_password" style="display: none">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" href="javascript:void(0)" onclick="changePasswordByQuestion()">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            <#-- </form>-->
                            </div>
                            <div class="tab-pane _success" id="step4" style="display: none">
                                <h4 class="text-center p-lg">恭喜您，密碼已成功重置！歡迎您使用新密碼再次登入！</h4>
                                <hr>
                                <div class="row">
                                    <div class="col-xs-6 p-lg text-right">
                                        <a class="btn primary-btn -blue -sm" href="/?do=loginDialog">立即登入</a>
                                    </div>
                                    <div class="col-xs-6 p-lg">
                                        <a class="btn primary-btn -white -sm" target="_blank" href="/">返回首頁</a>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
    </div>
    </form>
</div>
<!--Server Bar-->
<div class="server-bar">
    <button class="btn btn-block flat-btn -blue -xs" onclick='window.open("<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>")' type="button">客服</button>
    <button class="btn btn-block flat-btn -white -xs topcontrol" type="button">頂部</button>
</div>
<script>
    var message = ${data.message};
    window.top.language = "en-US";
</script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap.min.js"></script>
<script src="${resComRoot}/js/jquery/plugins/jquery.validate/jquery.validate.js"></script>
<script src="${resComRoot}/js/gamebox/common/jquery.validate.extend.msites.js"></script>
<script>
    $(document).ready(function() {
        //Wizard
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var $target = $(e.target);
            if ($target.parent().hasClass('disabled')) {
                return false;
            }
        });
        $("input[name='forgetUserName']").on("focus",function(){
            $(".username_tip").text('');
        })

    });
    function changeCaptcha(obj){
        var $this = $(obj);
        var src = "${data.contextInfo.playerCenterContext}captcha/"+$this.data().code+".html?t=" + new Date().getTime().toString(36);
        $this.prop("src",src)
    }
    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }
    /*绑定表单验证*/
    var $findPasswordForm = $('#findPasswordForm');
    var findPasswordRule;
    var $findPasswordRuleruleDiv = $findPasswordForm.find('#validateRule');
    var checkUserNameFlag =false;
    /*密码强度*/
    var PASSWORD_LEVEL_1 = new RegExp("${data.PASSWORD_LEVEL_1}");
    var PASSWORD_LEVEL_2 = new RegExp("${data.PASSWORD_LEVEL_2}");
    var PASSWORD_LEVEL_3 = new RegExp("${data.PASSWORD_LEVEL_3}");
    var PASSWORD_LEVEL_4 = new RegExp("${data.PASSWORD_LEVEL_4}");
    if ($findPasswordRuleruleDiv.length > 0) {
        findPasswordRule = eval("({" + $findPasswordRuleruleDiv.text() + "})");
        findPasswordRule.ignore = ".ignore";
    }

    if (findPasswordRule) {
        if ($.data($findPasswordForm[0], "validator")) {
            $.data($findPasswordForm[0], "validator", null);
        }
        $findPasswordForm.validate(findPasswordRule);
    }
    /*验证密码强度*/
    $("[name='newPassword']").on("keyup",function(){
        setTimeout(
                changePassowrdLevel
                ,
                800
        )
    });
    function changePassowrdLevel(){
        var $this = $("[name='newPassword']");
        var $parent = $this.parents(".form-group");
        var level = 0;
        var value = $this.val();
        if(!$parent.hasClass("has-error")){
            if(PASSWORD_LEVEL_1.test(value)||PASSWORD_LEVEL_2.test(value)){
                level = 1;
            }else if(PASSWORD_LEVEL_3.test(value)){
                level = 2;
            }else if(PASSWORD_LEVEL_4.test(value)){
                level = 3;
            }
            $("[name='sysUser.passwordLevel']").val(level*10);
        }
        $("._password_level",$parent).find('[password-level]').hide().eq(level-1).show();

    }
    function closeOpenService(){
        window.open("<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>","Online Help","target=_blank")
    }
    function nextStep(step){
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
                            /*添加問題*/
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
    }

    function checkUserName(){
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
                    $(".username_tip").text('请输入正确的账号!');
                }else {
                    checkUserNameFlag = true;
                }
            }
        })
    }
    function changePasswordByQuestion(){
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
    }
    $(".findTypeGroup a").on("click",function(){
        var $this = $(this);
        $("#findWay").val($this.data().findType);
        $this.siblings().removeClass("active");
        $this.addClass("active");
//        $('#findType').val($this.data().findType);
    });
    var FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY = "findPasswordSendEmailCookieKey";
    var findPasswordSendEmailTimerId;
    function sendEmailByUserName(){
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
                        setCookie(FIND_PASSWORD_SEND_EMAiL_COOKIE_KEY,${data.sendEmailIntervalSeconds});
                        findPasswordSendEmailTimer();
                    }
                }
            })
        }else{
            findPasswordSendEmailTimer();
        }
    }
    function findPasswordSendEmailTimer(){
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
    }
    function changePasswordByEmail(){
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
    }
    function showChangePwdForm(){
        if($findPasswordForm.valid()){
            var  $findTypeGroup =$("._findTypeGroup");
            $findTypeGroup.children().hide();
            $("._change_password",$findTypeGroup).show();
            $("#checkPassword").val("check");
        }
    }

</script>
</body>

</html>
