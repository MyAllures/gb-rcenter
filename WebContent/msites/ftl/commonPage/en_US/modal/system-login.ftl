<div class="row">
    <div class="col-12-10 col-offset-12-1">
        <form id="loginForm" method="post" action="#">
            <input type="hidden" name="type" value="dialog">
            <div class="form-group">
                <input type="text" class="form-control" autocomplete="off" name="username" placeholder="username">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" autocomplete="off" name="password" placeholder="password">
            </div>
            <div class="form-group _vr_captcha_box" style="display: none">
                <div class="input-group">
                    <input type="text" class="form-control" name="captcha" maxlength="4" placeholder="Verification code">
                    <span class="input-group-btn"><a><img style="height: 34px;" class="_vr_captcha_code" data-code="loginDialog" alt=""></a></span>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-info btn-block dialog_login"  type="button">Login</button>
            </div>
        </form>
    </div>
    <div class="col-12-10 col-offset-12-1">
        <a type="button" class="btn btn-default pull-left" target="_blank" href="commonPage/forgetPwd.html">Get back password</a>
        <a type="button" class="btn btn-success pull-right" href="/register.html">Register now</a>
    </div>
</div>
<script>

    (function(){
        if(isOpenCaptcha){
            $("._vr_captcha_code","#loginForm").attr("src","${data.contextInfo.playerCenterContext}captcha/loginDialog.html?t="+ new Date().getTime().toString(36));
            $("._vr_captcha_box").show();
        }

        $("#loginForm input").keydown(function(e) {
            var $this = $(this);
            if (e.which == 13) {
                if($(".dialog_login",$this.parents("form")).css("pointer-events")!="none"){
                    $(".dialog_login",$this.parents("form")).trigger("click");
                }
            }
        });

        $("#loginForm .dialog_login").on('click',function(e){
            var loginText = $(e.target).text();
            /* 阻止重复提交 By Faker */
            if(loginText==""){
                $(e.target).css("pointer-events","none");
            }else{
                $(e.target).text("登录中").css("pointer-events","none");
            }
            var $this = $(this);
            login($this,loginObj.closeLoginPopup,loginText);
        })

        $("._vr_captcha_code").on("click",function(e){
            var $this = $(this);
            var src = "${data.contextInfo.playerCenterContext}captcha/"+$this.data().code+".html?t=" + new Date().getTime().toString(36);
            $this.prop("src",src)
        });
    })()

</script>