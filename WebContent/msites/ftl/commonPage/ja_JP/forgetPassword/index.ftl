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
                    <a href="/"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" class="tamashi-logo"></a> | パスワードを再設定
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
                                    <p class="list-group-item-text">IDをご入力ください。</p>
                                </a>
                            </li>
                            <li class="disabled">
                                <a href="#step2" data-toggle="tab">
                                    <h3 class="list-group-item-heading">2</h3>
                                    <p class="list-group-item-text">認証方法を選んでください。</p>
                                </a>
                            </li>
                            <li class="disabled">
                                <a href="#step3" data-toggle="tab">
                                    <h3 class="list-group-item-heading">3</h3>
                                    <p class="list-group-item-text">パスワードリセット</p>
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
                                    <label for="inputEmail" class="col-sm-3 control-label">ID</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetUserName" maxlength="20" placeholder="IDをご入力ください。">
                                        <span class="help-block username_tip"></span>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-3 control-label">認証コード</label>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="forgetPasswordCaptchaCode" maxlength="4" placeholder="認証コード">
                                            <span class="input-group-btn"><a><img src="${data.contextInfo.playerCenterContext}captcha/forgetPassword.html" alt="" class="_captcha_code" data-code="forgetPassword" onclick="changeCaptcha(this)" alt="" ></a></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" onclick="nextStep(2)">&nbsp;&nbsp;&nbsp;&nbsp;次へ&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            <#--</form>-->
                            </div>
                            <div class="tab-pane" id="step2">
                            <#--<form class="form-horizontal" id="" method="post" action="#">-->
                                <div class="list-group findTypeGroup">
                                    <a href="javascript:" class="list-group-item _emailCanUse" style="display: none"  data-find-type="email">
                                        <h4 class="list-group-item-heading text-info">メールによる認証</h4>
                                        <p class="list-group-item-text">登録済みのメールアドレス<span class="text-info"  player-email=""></span>この認証方法を選んでください。</p>
                                    </a>
                                    <a href="javascript:" class="list-group-item _protectionCanUse" style="display: none"  data-find-type="protection">
                                        <h4 class="list-group-item-heading text-info">セキュリティ問題認証</h4>
                                        <p class="list-group-item-text">セキュリティ問題の答えがお分かりなら、選んでください。</p>
                                    </a>
                                    <a href="<#if data.defaultCustomerService?has_content>${data.defaultCustomerService}<#else>javascript:</#if>" class="list-group-item" data-find-type="customerervice" target="_blank">
                                        <h4 class="list-group-item-heading text-info">お客様センターに処理依頼</h4>
                                        <p class="list-group-item-text">分からない場合は、お客様センターへご連絡ください。</p>
                                    </a>
                                    <input name="findWay" type="hidden" id="findWay">
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div class="col-sm-12 text-center">
                                        <a class="btn primary-btn -blue -sm continue" onclick="nextStep(3)">&nbsp;&nbsp;&nbsp;&nbsp;次へ&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane _findTypeGroup" id="step3" find-type="protection" style="display: none">
                            <#--</form>-->
                                <!-- 安全问题验证 -->
                            <#-- <form class="form-horizontal" id="" method="post" action="#">-->
                                <div find-way="protection" style="display: none"  class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">問題一：</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static _answer1">おじいちゃんの名前は？</p>
                                    </div>
                                </div>
                                <div find-way="protection"  style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">答え：</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetPasswordAnswer1" maxlength="20" placeholder="お答えを入れてください。">
                                    </div>
                                </div>
                                <hr>
                                <div  find-way="protection" style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">問題二：</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static _answer2">私のラッキーナンバーは？</p>
                                    </div>
                                </div>
                                <div find-way="protection"  style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">答え：</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetPasswordAnswer2" maxlength="20" placeholder="お答えを入れてください。">
                                    </div>
                                </div>
                                <hr>
                                <div find-way="protection"  style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">問題三：</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static _answer3">お好きな数字は？</p>
                                    </div>
                                </div>
                                <div find-way="protection" style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">答え：</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="forgetPasswordAnswer3" maxlength="20" placeholder="お答えを入れてください。">
                                    </div>
                                </div>
                                <hr>
                                <div find-way="protection" style="display: none" class="form-group">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" href="javascript:void(0)" onclick="showChangePwdForm()">&nbsp;&nbsp;&nbsp;&nbsp;次へ&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            <#--</form>-->
                                <!-- 邮件验证码验证 -->
                            <#--<form class="form-horizontal" id="" method="post" action="#">-->
                                <div find-way="email" style="display: none" class="form-group">
                                    <label for="inputEmail" class="col-sm-3 control-label">メールアドレスリンク</label>
                                    <div class="col-sm-6">
                                        <p class="form-control-static" player-email=""></p>
                                    </div>
                                </div>
                                <div find-way="email" style="display: none" class="form-group">
                                    <label for="inputPassword" class="col-sm-3 control-label">認証コードを入れてください。</label>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="securityCode"  maxlength="6" placeholder="認証コード">
                                            <span class="input-group-btn"><a class="btn primary-btn -white -sm" id="resendBtn" onclick="sendEmailByUserName()">認証コードを送信します。</a></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>

                            <#-- </form>-->
                            <#-- </div>
                             <div class="tab-pane" id="step3">-->
                            <#--<form class="form-horizontal" id="" method="post" action="#">-->
                                <div find-way="email"  style="display: none" class="form-group _change_password">
                                    <label for="inputEmail" class="col-sm-3 control-label">新しいログインパスワード</label>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control" name="newPassword" maxlength="20" placeholder="パスワードを入れてください。">
                                        <div class="progress pass-strength _password_level">
                                            <div class="progress-bar" style="width: 20%;display: none;" password-level="1">弱い</div>
                                            <div class="progress-bar progress-bar-success" style="width: 75%;display: none;" password-level="2">強い</div>
                                            <div class="progress-bar progress-bar-success" style="width: 100%;display: none;" password-level="3">非常に強い</div>
                                        </div>
                                    </div>
                                </div>
                                <div find-way="email" style="display: none" class="form-group _change_password">
                                    <label for="inputEmail" class="col-sm-3 control-label">新しいパスワードを確認します</label>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control" name="forgetConfirmPassword" maxlength="20" placeholder="新しいパスワード確認">
                                    </div>
                                </div>
                                <div find-way="email" style="display: none"  class="form-group _change_password">
                                    <label for="inputPassword" class="col-sm-3 control-label">認証コード</label>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="changePasswordCaptchaCode" maxlength="4" placeholder="認証コード">
                                            <span class="input-group-btn"><a><img onclick="changeCaptcha(this)" class="_captcha_code2" data-code="changePassword" src="${data.contextInfo.playerCenterContext}captcha/changePassword.html" height="34"></a></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div find-way="email"  style="display: none" class="form-group">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" href="javascript:void(0)" onclick="changePasswordByEmail()">&nbsp;&nbsp;&nbsp;&nbsp;次へ&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                                <div  class="form-group _change_password" style="display: none">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <a class="btn primary-btn -blue -sm continue" href="javascript:void(0)" onclick="changePasswordByQuestion()">&nbsp;&nbsp;&nbsp;&nbsp;次へ&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                    </div>
                                </div>
                            <#-- </form>-->
                            </div>
                            <div class="tab-pane _success" id="step4" style="display: none">
                                <h4 class="text-center p-lg">パスワードリセット完了！ログインしてください！</h4>
                                <hr>
                                <div class="row">
                                    <div class="col-xs-6 p-lg text-right">
                                        <a class="btn primary-btn -blue -sm" href="/?do=loginDialog">登録します!</a>
                                    </div>
                                    <div class="col-xs-6 p-lg">
                                        <a class="btn primary-btn -white -sm" target="_blank" href="/">トップページに戻る</a>
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
    <button class="btn btn-block flat-btn -blue -xs" onclick='window.open("<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>")' type="button">お客様センター</button>
    <button class="btn btn-block flat-btn -white -xs topcontrol" type="button">最上部</button>
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
                    alert('認証方法を選んでください。！')
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
                    $(".username_tip").text('正しいIDを入れてください。!');
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
                        $resendBtn.text("再送信")
                    }else{
                        $resendBtn.prop("disabled",true);
                        $resendBtn.addClass('disabled')
                        $resendBtn.text("再送信("+sendEmailIntervalSec+")")
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
