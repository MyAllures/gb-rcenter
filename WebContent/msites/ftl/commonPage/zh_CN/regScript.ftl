<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/zh_CN/msiteCommonContent/regScript.ftl">-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery.mailAutoComplete-4.0.js"></script>
<script>
    var message =${data.message}
    var emailCheckCountBackTimer;
    var REGSTER_SEND_EMAIL_TIME = "REGSTER_SEND_EMAIL_TIME";
    var REGSTER_SEND_PHONE_TIME = "REGSTER_SEND_PHONE_TIME";
    /*密码强度*/
    var PASSWORD_LEVEL_1 = new RegExp("${data.PASSWORD_LEVEL_1}");
    var PASSWORD_LEVEL_2 = new RegExp("${data.PASSWORD_LEVEL_2}");
    var PASSWORD_LEVEL_3 = new RegExp("${data.PASSWORD_LEVEL_3}");
    var PASSWORD_LEVEL_4 = new RegExp("${data.PASSWORD_LEVEL_4}");

    $(function(){
        disableLogin();
        initFormDataAndValid();
        initCountryArea();
        initBirthData();
        var captchaObj = $("._vr_captcha_code","#regForm");
        $(captchaObj).attr("src","${data.contextInfo.playerCenterContext}captcha/"+$(captchaObj).data("code")+".html?t="+ new Date().getTime().toString(36));
        //初始化语言
        resetLocal()
    });
    /*强制显示服务条款*/
    <#if data.playerValidateRegisterMap['serviceTermsForcedShow']?? && data.playerValidateRegisterMap['serviceTermsForcedShow']>
    $(function(){
        $("#login-agreement").trigger("click");
    });
    </#if>

    function disableLogin(){
        $(".inputMailList").mailAutoComplete();
        $("#unLogin").hide();
    }
    //马上登录
    $(".loginNow").on("click",function(){
        loginObj.getLoginPopup(function(){
            window.location.href = "/";
        });
    });

    function validateCellPhone(obj) {
        var $phone = $('[name="phone.contactValue"]');
        var phone = $phone.val();
        var cookie = getCookie("register_sms_verification_end_time");
        cookie = Number(cookie);
        if(cookie>0){
            cookie = cookie-new Date().getTime();
        }

        if(!phone){
            layer.open({
                content:'请先输入手机号！',
                title:'提示信息',
                skin:'layui-layer-brand',
                btn:["确定"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                }
            });
            return;
        }else if($phone.parents(".form-group").hasClass("has-error")){
            layer.open({
                content:'请输入正确的手机号！',
                title:'提示信息',
                skin:'layui-layer-brand',
                btn:["确定"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                }
            });
            return;
        }else if(cookie>0){
            layer.open({
                content:'发送间隔时间未到！',
                title:'提示信息',
                skin:'layui-layer-brand',
                btn:["确定"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                },
                end:function () {
                    checkPasswordSendPhoneTimer(obj);
                }
            });
            return;
        }

        if(phone && !cookie || cookie<0){
            $.ajax({
                url:"/verificationCode/getPhoneVerificationCode.html",
                type: "POST",
                dataType:'json',
                data:{"phone":phone},
                success:function(data){
                    if(data){
                        var startTime = new Date().getTime();
                        var endTime = Number(startTime)+(Number(${data.sendPhoneIntervalSeconds})*1000);
                        setCookie("register_sms_verification_end_time",endTime);
                        checkPasswordSendPhoneTimer(obj);
                    }
                }
            })
        }
    }

    var phoneCheckCountBackTimer;
    function checkPasswordSendPhoneTimer(obj){
        var $this = $(obj);
        var getSmsEndTime = getCookie("register_sms_verification_end_time");
        var sendPhoneIntervalSec = Number(getSmsEndTime);
        sendPhoneIntervalSec = parseInt((sendPhoneIntervalSec-new Date().getTime())/1000);
        setCookie(REGSTER_SEND_PHONE_TIME,sendPhoneIntervalSec);

        phoneCheckCountBackTimer = setInterval(
                function(){
                    var sendPhoneIntervalSec = getCookie(REGSTER_SEND_PHONE_TIME);
                    sendPhoneIntervalSec = Number(sendPhoneIntervalSec);
                    sendPhoneIntervalSec = --sendPhoneIntervalSec;
                    if(!sendPhoneIntervalSec || sendPhoneIntervalSec<0){
                        clearInterval(phoneCheckCountBackTimer);
                        $this.prop("disabled",false);
                        $this.text("重新发送")
                    }else{
                        $this.prop("disabled",true);
                        $this.text(sendPhoneIntervalSec+"秒后重新发送")
                    }
                    setCookie(REGSTER_SEND_PHONE_TIME,sendPhoneIntervalSec);
                },
                1000
        )
    }

    /**
     * 根据时区显示当前时间
     * */
    $("[name='sysUser.defaultTimezone']").on("change",function(){
        var $this = $(this);
        var value = $this.val();
        if(value){
            $.ajax({
                url:"register/getDateByTimezone.html",
                data:{
                    "sysUser.defaultTimezone":value,
                },
                type:"POST",
                success:function(data){
                    $("._showDateByTimezone").show().children().text(value + " " +data);
                },
                error:function(error){
                }
            })
        }
    });

    /**
     * 禁止复制粘贴
     * */
    $('.noCp').bind("cut copy paste",function(e) {
        e.preventDefault();
    });

    /**
     * 验证密码强度
     * */
    $("[name='sysUser.password']").on("keyup",function(){
        setTimeout(
                changePassowrdLevel, 500
        )
    });

    /**
     * 国际地区
     * */
    $("[data-rel]").on("change",function(e){
        var $this = $(this);
        var name = $this.prop("name");
        var url;
        if(name === "sysUser.country"){
            url = "regions/states/"+$('select[name="sysUser.country"]').val()+".html";
        }else if(name === "sysUser.region"){
            url = "regions/cities/"+$('select[name="sysUser.country"]').val()+"-"+$('select[name="sysUser.region"]').val()+".html"
        }
        getSelectData(url,"select[name='"+$this.data().rel+"']");
    });

    /**
     * 服务条款
     * */
    $("[name=termsOfServiceCheck]").on('click',function(){
        var $this = $(this);
        if($this.is(':checked')){
            $("[name=termsOfService]").val("true");
        }else{
            $("[name=termsOfService]").val("");
        }
    });

    // Modal 模态框
    $("#login-agreement").on("click",function() {
        layerDialogRegister('<div class="register-content-wrap" style="overflow: hidden;outline: none;height:  100%;padding-right:  8px;margin-right: -8px;"><div class="col-md-12"><#if data.playerValidateRegisterMap.regProtocol??> ${data.playerValidateRegisterMap.regProtocol.value?replace('\n','')?replace('\r','')}</#if></div><div class="after"></div></div>','会员注册协议','layui-layer-brand',['640px','582px'],false,false);
    });

    $('[name=birthdayMon],[name=birthdayYear]').on("change",function(){
        var $birthdayMon = $("[name=birthdayMon]");
        var $birthdayYear = $("[name=birthdayYear]");
        if($birthdayMon.val() && $birthdayYear.val()){
            var days = new Date(Number($birthdayYear.val()), Number($birthdayMon.val()), 0).getDate();
            var html = [];
            for(var i=1;i<=days;i++){
                html.push("<option value='"+i+"'>"+i+"日</option>");
            }
            $("[name=birthdayDay]").html(html);
        }
    });
    /**
     * 安全密码提示
     * */
    $("[name='sysUser.permissionPwd']")&&$("[name='sysUser.permissionPwd']").on("blur",function(){
        var pwdObj = $("[name='sysUser.password']");
        var tipObj = $(".permitPwdTip");
        if($(this).val() == $(pwdObj).val()){
            tipObj.show();
        }else {
            tipObj.hide();
        }
    });

    function changePassowrdLevel(){
        var $this = $("[name='sysUser.password']");
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
        $("._password_level",$parent).find('[password-level]').hide().eq(level).show();

    }


    /**
     * 初始化注册数据及表单验证
     * */
    function initFormDataAndValid() {
        var $form = $('#regForm');
        var rule;
        var $ruleDiv = $form.find('div[id=validateRule]');
        if ($ruleDiv.length > 0) {
            rule = eval("({" + $ruleDiv.text() + "})");
            rule.ignore = ".ignore";
        }

        if (rule) {
            if ($.data($form[0], "validator")) {
                $.data($form[0], "validator", null);
            }
            $form.validate(rule);
        }
        /*注册脚本 Jeff*/
        $.ajax({
            url: "register/getRegisterData.html?c="+getRecCode(),
            type: "GET",
            success: function (data) {
                data = eval('(' + data + ')');
                $("[name='sysUser.defaultCurrency']").val(data.currency);
                $("[name='sysUser.defaultTimezone']").val(data.timezone);
                if (data.ipLocale) {
                    data.ipLocale.country && $("[name='sysUser.country']").val(data.ipLocale.country).change();
                    data.ipLocale.region && $("[name='sysUser.region']").val(data.ipLocale.region).change();
                    data.ipLocale.city && $("[name='sysUser.city']").val(data.ipLocale.city).change();
                }
                var $recommendBox = $("#recommendBox");
                if (data.recommendCode || getRecCode()!="") {
                    $recommendBox.show();
                    $("input", $recommendBox).val(data.recommendCode?data.recommendCode:getRecCode()).attr("disabled","disabled");
                    $('#recommendRegisterCode').val(data.recommendCode?data.recommendCode:getRecCode());
                }

            }
        });
    }
    function getRecCode(){
        var recCode ="";
        if(getlocationParam('registeredCode')!=null){
            recCode = getlocationParam('registeredCode');
        }else if(getlocationParam('c')!=null){
            recCode = getlocationParam('c');
        }
        return recCode;
    }
    /**
     * 初始化国家地区联动数据
     * */
    function initCountryArea(){
        $("select[name='sysUser.country']").length && getSelectData($("select[name='sysUser.country']").data().ajax,"select[name='sysUser.country']");
    }

    /**
     * 国家/省/市 异步取值/联动
     * */
    function getSelectData(url,Selector){
        $.ajax({
            url:url,
            dataType:'JSON',
            cache: false,
            type:"GET",
            success:function(data){
                createSelect(data,Selector)
            },

        });
    }
    /**
     * @param data 根据json生成select
     * @param selector select选择器
     */
    function createSelect(data,selector){
        var html = '<option value="">请选择</option>';
        $.each(data,function(i,item){
            html += "<option value='"+item.dictCode+"'> "+item.remark+"</option>";
        });
        $(selector).html(html);
    }

    /*注册提交*/
    function registerPlayer(obj){
        var $this = $(obj);
        var $form = $this.parents("form");
        //$('[disabled]',$form).prop("disabled",false);
        if ($form.valid()) {
            var permissionPwd = '';
            $('._permissionPwd').each(function(){
                permissionPwd +=$(this).val();
            });
            var $disabled = $(":disabled",$form);

            $disabled.removeAttr('disabled');
            var ajaxData = $form.serialize();
            $disabled.attr("disabled","disabled");
            $.ajax({
                url: "register/playerRegister.html",
                type: "POST",
                dataType:'json',
                data: ajaxData,
                beforeSend:function(){
                    $this.attr("disabled","disabled");
                    $this.text("提交中...");
                },
                success: function (data) {
                    if(data.status){
                        sessionStorage.setItem("registerDialog","true");
                        setCookie(REGSTER_SEND_EMAIL_TIME,0);
                        clearInterval(emailCheckCountBackTimer);
                        autoLogin();
                    }else {
                        alert(data.msg);
                        $this.removeAttr("disabled").text("提交注册");
                    }

                },
                error: function (msg) {
                    $this.removeAttr("disabled").text("提交注册");
                    alert(msg.responseText);
                },
                complete:function(){
//                        $this.removeAttr("disabled").text("提交注册");
                }
            })
        }
    }
    /**
     * 生日
     * */
    function initBirthData(){
        var date = new Date();
        var currentYear = date.getYear()+1900-18;
        var years = currentYear;
        for(;currentYear > years-100;currentYear--){
            $('[name=birthdayYear]').append('<option value="'+currentYear+'">'+(currentYear)+'年</option>')
        }
    }



    function validateEmailAddress(obj){
        var sendEmailIntervalSeconds = ${data.sendEmailIntervalSeconds};
        var $this = $(obj);
        var $email = $('[name="email.contactValue"]');
        var email = $email.val();
        var cookie = getCookie(REGSTER_SEND_EMAIL_TIME);
        cookie = Number(cookie);
        if(!email){
            /*BootstrapDialog.alert({message:'请先输入邮箱！',title:'提示信息'});*/
            layer.open({
                content:'请先输入邮箱！',
                title:'提示信息',
                skin:'layui-layer-brand',
                btn:["确定"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                }
            });
            return;
        }else if($email.parents(".form-group").hasClass("has-error")){
            /*BootstrapDialog.alert({message:'请输入正确的邮箱！',title:'提示信息'});*/
            layer.open({
                content:'请输入正确的邮箱！',
                title:'提示信息',
                skin:'layui-layer-brand',
                btn:["确定"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                }
            });
            return;
        }else if(cookie){
            /*BootstrapDialog.alert({message:'发送间隔时间未到！',title:'提示信息'});*/
            layer.open({
                content:'发送间隔时间未到！',
                title:'提示信息',
                skin:'layui-layer-brand',
                btn:["确定"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                }
            });
            return;
        }

        if(email && !cookie){

            var locale = $("[name='sysUser.defaultLocale']").val();
            $.ajax({
                url:"register/checkEmail.html",
                type: "POST",
                dataType:'json',
                data:{"email":email,"locale":typeof locale === 'undefined'?'':locale},
                success:function(data){
                    if(data){
                        setCookie(REGSTER_SEND_EMAIL_TIME,sendEmailIntervalSeconds);
                        emailCheckCountBackTimer = setInterval(
                                function(){
                                    var sendEmailIntervalSec = getCookie(REGSTER_SEND_EMAIL_TIME);
                                    sendEmailIntervalSec = Number(sendEmailIntervalSec);
                                    sendEmailIntervalSec = --sendEmailIntervalSec;
                                    if(!sendEmailIntervalSec){
                                        clearInterval(emailCheckCountBackTimer);
                                        $this.prop("disabled",false);
                                        $this.text("重新发送")
                                    }else{
                                        $this.prop("disabled",true);
                                        $this.text(sendEmailIntervalSec+"秒后重新发送")
                                    }
                                    setCookie(REGSTER_SEND_EMAIL_TIME,sendEmailIntervalSec);
                                },
                                1000
                        )
                    }
                },
                error:function(error){

                }

            })
        }
    }
    function autoLogin() {
        var username = $("[name='sysUser.username']").val();
        var password = $("[name='sysUser.password']").val();
        $.ajax({
            type:"POST",
            headers: {
                "Soul-Requested-With":"XMLHttpRequest"
            },
            url:"passport/login.html",
            dataType:'JSON',
            data:{
                'username':username.toLowerCase(),
                'password':password
            },
            success:function(data){
                if(data.success){
                    window.location.href ="/";
                }else {
                    window.location.href ="/";
                }
            },
            error: function (data) {

            }
        });

    }

    function resetLocal(){
        var currentLocal = "<#list data.dictMap['siteLang'] as lang><#if lang_index==0>${lang.language}</#if></#list>";
        $("[name='sysUser.defaultLocale']").val(currentLocal);
    }


</script>