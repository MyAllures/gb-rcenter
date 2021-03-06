<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/zh_TW/msiteCommonContent/signUp-agent.ftl">-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/gui-base.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/common.css" type="text/css" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/style.css" type="text/css" />
    <link rel="icon" type="image/png" href="${data.configInfo.sitePath}/images/favicon.png" sizes="32x32">
    <style>
        .layui-layer.normal-dialog.signAgent-dialog .layui-layer-content{height: 400px !important;}
        .layui-layer.normal-dialog.signAgent-dialog .layui-layer-btn { padding: 10px 15px 10px;}
    </style>
</head>

<body class="main-jumbotron login-jumbotron">
<div class="container-fluid no-full">
    <div class="row">
        <div class="col-lg-12">
            <div class="branding">
                <a href="/" nav-target="mainFrame">
                    <img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" class="tamashi-logo">
                </a>
            </div>
            <h1 class="text-center text-3x text-white">Agent Register</h1>
            <h3 class="text-center text-white m-t-sm m-b-lg">エージェント申請</h3>
        </div>
    </div>
</div>
<!--Login-->
<div class="container">
    <div class="row">
        <div class="signin-card col-md-8 col-md-offset-2 register">
            <form class="form-horizontal" id="regForm" method="post" action="#">
            <#--密码 强度-->
                <input value="" type="hidden" name="sysUser.passwordLevel">
            <#--邀请码-->
                <input name="recommendRegisterCode" id="recommendRegisterCode" type="hidden">
            <#--登录地址-->
                <input type="hidden" name="loginUrl" value="${data.contextInfo.agentCenterContext}">
                <input type="hidden" name="editType" value="agent">
                <input type="hidden" name="sysUser.registerSite" value="">

                <div style="display:none" id="validateRule">${data.registerValidateRule}</div>
                <input type="hidden" value='${data.agentRequiredJson}' name="requiredJson">
            <#if data.agentFieldSorts?has_content>
                <#list data.agentFieldSorts as field>
                    <#if field.name == 'regCode'>
                        <div class="form-group" id="recommendBox">
                            <label for="appid" class="col-sm-2 control-label">紹介者</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="recommendUserInputCode">
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>
            <#if data.agentFieldSorts?has_content>
                <#list data.agentFieldSorts as field>
                    <#if field.name == 'username'>
                        <div class="form-group">
                            <label for="sysUser.username" class="col-sm-2 control-label">ID</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="sysUser.username" maxlength="15" placeholder="4～15桁のIDを入れてください">
                            </div>
                        </div>
                    </#if>

                    <#if field.name == 'password'>
                        <div class="form-group">
                            <label for="sysUser.password" class="col-sm-2 control-label">パスワード</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control noCp" name="sysUser.password" maxlength="20" placeholder="ログインパスワードを入れてください">
                                <div class="progress pass-strength _password_level">
                                <#--未输入密码-->
                                    <div class="progress-bar" password-level="none"></div>
                                    <div class="progress-bar" style="width: 20%;display: none;" password-level="1">弱い</div>
                                    <div class="progress-bar progress-bar-success" style="width: 75%;display: none;" password-level="2">強い</div>
                                    <div class="progress-bar progress-bar-success" style="width: 100%;display: none;" password-level="3">非常に強い</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword" class="col-sm-2 control-label">パスワード確認</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control noCp" name="confirmPassword" maxlength="20" placeholder="再度パスワードを入れてください">
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'verificationCode'>
                    <#--验证码-->
                    </#if>
                    <#if field.name == 'defaultTimezone'>
                    <#--时区-->
                        <div class="form-group">
                            <label for="sysUser.defaultTimezone" class="col-sm-2 control-label">タイムエリア</label>
                            <div class="col-sm-10">
                                <select class="form-control" disabled="disabled" name="sysUser.defaultTimezone">
                                    <option value="">選んでください</option>
                                    <#list data.dictMap['timezone']?keys as key>
                                        <option <#if data.dictMap['timezone'][key].dictCode == "GMT+08:00">selected="selected"</#if> value="${data.dictMap['timezone'][key].dictCode}">${data.dictMap['timezone'][key].remark}</option>
                                    </#list>
                                </select>
                                <p class="help-block form-help _showDateByTimezone" style="display: none;">
                                    <span class="fa fa-exclamation-circle text-info"></span>
                                </p>
                            </div>
                        </div>
                    </#if>

                    <#if field.name == 'sex'>
                        <div class="form-group">
                            <label for="sysUser.sex" class="col-sm-2 control-label">性别</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="sysUser.sex" >
                                    <option value="">選んでください</option>
                                    <#list data.dictMap['sex']?keys as key>
                                        <option value="${data.dictMap['sex'][key].dictCode}">${data.dictMap['sex'][key].translated}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'nickName'>
                        <div class="form-group">
                            <label for="sysUser.nickname" class="col-sm-2 control-label">ニックネーム</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="sysUser.nickname" maxlength="30" placeholder="4～15桁のIDを入れてください">
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'defaultLocale'>
                        <div class="form-group">
                            <label for="sysUser.defaultLocale" class="col-sm-2 control-label">言語</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="sysUser.defaultLocale" >
                                    <option value="">選んでください</option>
                                    <#list data.dictMap['siteLang'] as lang>
                                        <option value="${lang.language}">${lang.tran}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                    </#if>
                    <#if field.name == '304'>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">微信</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="weixin.contactValue" placeholder="微信IDを入れてください">
                            </div>
                        </div>
                    </#if>
                    <#if field.name == '110'>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">携帯電話</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="phone.contactValue" placeholder="携帯電話番号を入れてください">
                            </div>
                        </div>
                    </#if>
                    <#if field.name == '201'>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">メールアドレス</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="email.contactValue" placeholder="正しいメールアドレスを入れてください">
                            </div>
                        </div>
                        <#if data.agentValidateRegisterMap['isEmailValid']?exists && data.agentValidateRegisterMap['isEmailValid']>

                            <#if data.agentValidateRegisterMap['email']?has_content && data.agentValidateRegisterMap['email']>
                                <input name="checkEmail" value="checkEmail" type="hidden">
                                <input name="email.status" value="11" type="hidden">
                            <#--<div class="form-group">
                                <label for="inputPassword" class="col-sm-2 control-label">邮箱验证码</label>
                                <div class="col-sm-10">
                                    <div class="input-group">
                                        <input type="text" class="form-control error" name="emailCode" maxlength="6" placeholder="" aria-required="true" aria-invalid="true">
                                                <span class="input-group-btn">
                                                    <a href="javascript:void(0)" type="button" class="btn btn-info btn-block" onclick="validateEmailAddress(this)">
                                                        发送验证码
                                                    </a>
                                                </span>
                                    </div>
                                </div>
                            </div>-->
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-2 control-label">メール認証コード</label>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="emailCode" maxlength="6" placeholder="メール認証コード">
                                            <span class="input-group-btn"><a class="btn primary-btn -white -sm" onclick="validateEmailAddress(this)">メール認証コード</a></span>
                                        </div>
                                    </div>
                                </div>
                            </#if>
                        </#if>
                    </#if>
                    <#--<#if field.name == '303'>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="">Skype</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="skype.contactValue" placeholder="请输入6-32个字符（由大小写英文字母、特殊符号和数字组成）">
                            </div>
                        </div>
                    </#if>-->
                    <#if field.name == '301'>
                        <div class="form-group">
                            <label for="qq.contactValue" class="col-sm-2 control-label">QQ</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="qq.contactValue" maxlength="11">
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'birthday'>
                    <#--TODO 下拉生日-->
                        <div class="form-group">
                            <label for="sysUser.birthday" class="col-sm-2 control-label">誕生日</label>
                            <div class="col-sm-4 col-xs-4">
                                <select class="form-control" name="birthdayYear">
                                    <option value="">年</option>
                                </select>
                            </div>
                            <div class="col-sm-3 col-xs-4">
                                <select class="form-control" name="birthdayMon">
                                    <option value="">月</option>
                                    <#list 1..12 as mon>
                                        <option value="${mon}">${mon}月</option>
                                    </#list>
                                </select>
                            </div>
                            <div class="col-sm-3 col-xs-4">
                                <select class="form-control" name="birthdayDay">
                                    <option value="">日</option>
                                </select>
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'paymentPassword'>
                        <div class="form-group">
                            <label for="sysUser.permissionPwd" class="col-sm-2 control-label">パスワード</label>
                            <div class="col-sm-10">
                                <input class="form-control noCp" maxlength="6" type="password" name="sysUser.permissionPwd">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confirmPermissionPwd" class="col-sm-2 control-label">パスワード確認</label>
                            <div class="col-sm-10">
                                <input class="form-control noCp" maxlength="6" type="password" name="confirmPermissionPwd">
                            </div>
                        </div>

                    </#if>
                    <#if field.name == 'realName'>
                        <div class="form-group">
                            <label for="sysUser.realName" class="col-sm-2 control-label">実名</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="sysUser.realName" maxlength="30">
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'serviceTerms'>
                    <#--服务条款-->
                    </#if>
                    <#if field.name == 'securityIssues'>
                    <#--安全问题-->
                        <div class="form-group">
                            <label for="sysUserProtection.question1" class="col-sm-2 control-label">セキュリティ問題</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="sysUserProtection.question1" >
                                    <option value="">選んでください</option>
                                    <#list data.dictMap['question1']?keys as key>
                                        <option value="${data.dictMap['question1'][key].dictCode}">${data.dictMap['question1'][key].translated}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sysUserProtection.answer1" class="col-sm-2 control-label">答え</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="sysUserProtection.answer1">
                            </div>
                        </div>

                    </#if>
                    <#if field.name == 'mainCurrency'>
                    <#--主货币-->
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="sysUser.defaultCurrency">主要通貨</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="sysUser.defaultCurrency">
                                    <option value="">選んでください</option>
                                    <#list data.dictMap['siteCurrency'] as siteCurrency>
                                        <option value="${siteCurrency.code}">${siteCurrency.tran}</option>
                                    </#list>
                                </select>
                                <p class="help-block form-help">
                                    <span class="fa fa-info-circle fa-question-circle text-warning"></span>
                                    主要通貨は、入出金時に計算用のベース通貨となります！
                                                <span class="text-warning">
                                                    設定後は変更不可！
                                                </span>
                                </p>
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'constellation'>
                    <#--星座-->
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="sysUser.constellation">星座</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="sysUser.constellation">
                                    <option value="">選んでください</option>
                                    <#list data.dictMap['constellation']?keys as key>
                                        <option value="${data.dictMap['constellation'][key].dictCode}">${data.dictMap['constellation'][key].translated}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                    </#if>
                    <#if field.name == 'resource'>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="sysUser.constellation">資源を広める</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" name="result.promotionResources"></textarea>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>
                <div class="form-group">
                    <label for="inputPassword" class="col-sm-2 control-label">認証コード</label>
                    <div class="col-sm-10">
                        <div class="input-group">
                            <input type="hidden" name="regtype" value="a">
                            <input type="text" class="form-control input-lowercase" name="captchaCode" maxlength="4" placeholder="認証コード">
                            <span class="input-group-btn"><a><img class="_captcha_code" data-code="apcregister" alt=""></a></span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" checked="checked"  value="checked" name="termsOfServiceCheck">クリックしたら、に同意すると見なします<a href="javascript:void(0);" id="login-agreement">顧客協議およびプライバシーポリシー</a>
                            </label>
                        </div>
                        <input type="hidden" value="123123" name="termsOfService">
                    </div>
                </div>
                <button type="button" class="btn primary-btn -blue -lg" onclick="registerPlayer(this)">今すぐ登録</button>
            </form>
        </div>
        <div class="col-md-4 col-md-offset-4 text-center text-white m-t-sm">
            <p>私たちの代理としては?<a class="btn btn-link btn-lg no-vertical" href="${data.contextInfo.agentCenterContext}/passport/login.html">ログイン</a></p>
        </div>
    </div>
</div>
<!--Server Bar-->
<div class="server-bar">
    <button class="btn btn-block flat-btn -blue -xs" type="button" onclick="getCustomerService()">お客様センター</button>
    <button class="btn btn-block flat-btn -white -xs topcontrol" type="button">最上部</button>
</div>
<script>
    var message = ${data.message};
    window.top.language = "en-US";
</script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/layer.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap-dialog.min.js"></script>
<script src="${resComRoot}/js/jquery/plugins/jquery.validate/jquery.validate.js"></script>
<script src="${resComRoot}/js/gamebox/common/jquery.validate.extend.msites.js"></script>

<script>
    // 新弹窗插件配置
    $(function () {
        // layer默认配置
        layer.config({
            type:0,
            move:".layui-layer-title",
            title:true,
            offset:"auto",
            btnAlign:"r",
            closeBtn:"2",
            shade:[0.7,"#000"],
            shadeClose:true,
            time:0,
            resize:false
        });
    });
    $(function () {
        resetLocal();
        $("._captcha_code","#regForm").attr("src","${data.contextInfo.playerCenterContext}captcha/apcregister.html?t="+ new Date().getTime().toString(36));
        $("[name='sysUser.registerSite']").val(window.location.host);
    })
    var REGSTER_SEND_EMAIL_TIME = "REGSTER_SEND_EMAIL_TIME";
    /*根据时区显示当前时间*/
    $("[name='sysUser.defaultTimezone']").on("change",function(){
        var $this = $(this);
        var value = $this.val();
        if(value){
            $.ajax({
                url:"/register/getDateByTimezone.html",
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
    /*强制显示服务条款*/
    <#if data.agentValidateRegisterMap['serviceTermsForcedShow']?? && data.agentValidateRegisterMap['serviceTermsForcedShow']>
    $(function(){
        $("#login-agreement").trigger("click");
    });
    </#if>
    /*禁止复制粘贴*/
    $('.noCp').bind("cut copy paste",function(e) {
        e.preventDefault();
    });
    /*密码强度*/
    var emailCheckCountBackTimer;
    var PASSWORD_LEVEL_1 = new RegExp("${data.PASSWORD_LEVEL_1}");
    var PASSWORD_LEVEL_2 = new RegExp("${data.PASSWORD_LEVEL_2}");
    var PASSWORD_LEVEL_3 = new RegExp("${data.PASSWORD_LEVEL_3}");
    var PASSWORD_LEVEL_4 = new RegExp("${data.PASSWORD_LEVEL_4}");
    /*验证密码强度*/
    $("[name='sysUser.password']").on("keyup",function(){
        setTimeout(
                changePassowrdLevel
                ,
                800
        )
    });
    function getCustomerService(){
        window.open("<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>")
    }
    function changePassowrdLevel(){

        var $this = $("[name='sysUser.password']");
        var $parent = $this.parents(".form-group");
        var level = 0;
        var value = $this.val();
        if(!$parent.hasClass("has-error")){
            if(PASSWORD_LEVEL_1.test(value)||PASSWORD_LEVEL_2.test(value)){
                level = 1;
            }else if(PASSWORD_LEVEL_2.test(value)){
                level = 2;
            }else if(PASSWORD_LEVEL_3.test(value)){
                level = 3;
            }
            $("[name='sysUser.passwordLevel']").val(level*10);
        }
        $("._password_level",$parent).find('[password-level]').hide().eq(level).show();

    }
    // Modal 模态框
    $("#login-agreement").click(function() {
        /*BootstrapDialog.show({
            title:'代理注册协议',
            type: 'default',
            closable: false,
            message: function(dialog) {
                var $message = $('<div style="overflow-y: auto; overflow-x:hidden; height: 600px;"></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);

                return $message;
            },
            buttons: [{
                label: '我不同意',
                action: function(){
                    window.location ="/agent.html";
                }
            }, {
                label: '我同意',
                cssClass: 'btn-success',
                action:function(dialogItself){
                    dialogItself.close();
                }
            }],
            data: {
                'pageToLoad': '/commonPage/modal/agent-agreement.html'
            }
        });*/
        var loAgree = layer.open({
            content:'<#if data.agentValidateRegisterMap.regProtocol??> ${data.agentValidateRegisterMap.regProtocol.value?replace('\n','')?replace('\r','')} </#if>',
            title:'エージェント登録プロトコル',
            area: ['640px','500px'],
            skin:'layui-layer-brand',
            btn:["わたしは反対だ","わたしは同意する"],
            success: function(layer){
            // 重写关闭按钮
            $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
            // 提示框类型
            $(layer).addClass("normal-dialog").addClass("signAgent-dialog");
        },
        yes: function(){
            window.location ="/agent.html";
        },
        btn2: function () {
            layer.close(loAgree);
        }
    });
    });

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
        url:"/register/getRegisterData.html?c="+getRecCode(),
        type:"GET",
        data:{
            utype:"agent"
        },
        success:function(data){
            data = eval('('+data+')');

            $("[name='sysUser.defaultCurrency']").val(data.currency);
            if(data.ipLocale){
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
    $("select[name='sysUser.country']").length && getSelectData($("select[name='sysUser.country']").data().ajax,"select[name='sysUser.country']");

    function getRecCode(){
        var recCode ="";
        if(getlocationParam('registeredCode')!=null){
            recCode = getlocationParam('registeredCode');
        }else if(getlocationParam('c')!=null){
            recCode = getlocationParam('c');
        }
        return recCode;
    }

    /*国家/省/市 异步取值/联动*/
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
        var html = '<option value="">選んでください</option>';
        $.each(data,function(i,item){
            html += "<option value='"+item.dictCode+"'> "+item.remark+"</option>";
        });
        $(selector).html(html);
    }
    /*国际地区*/
    $("[data-rel]").on("change",function(e){
        var $this = $(this);
        var name = $this.prop("name");
        var url;
        if(name === "sysUser.country"){
            url = "/regions/states/"+$('select[name="sysUser.country"]').val()+".html";
        }else if(name === "sysUser.region"){
            url = "/regions/cities/"+$('select[name="sysUser.country"]').val()+"-"+$('select[name="sysUser.region"]').val()+".html"
        }
        getSelectData(url,"select[name='"+$this.data().rel+"']");
    });
    /*服务条款*/
    $("[name=termsOfServiceCheck]").on('click',function(){
        var $this = $(this);
        if($this.is(':checked')){
            $("[name=termsOfService]").val("true");
        }else{
            $("[name=termsOfService]").val("");
        }
//        $("#regForm").valid()
    });
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
                url: "/register/agentRegister.html",
                type: "POST",
                dataType:'json',
                data: ajaxData,
                beforeSend:function(){
                    $this.attr("disabled","disabled");
                    $this.text("申し込み中...");
                },
                success: function (data) {
                    if(data){
                        /*BootstrapDialog.show({
                            title:'提示',
                            type: BootstrapDialog.TYPE_PRIMARY,
                            closable: false,
                            message: function(dialog) {
                                var $message = "注册成功，请等待审核！";
                                return $message;
                            },
                            buttons: [{
                                label: '确定',
                                cssClass: 'btn-success',
                                action:function(dialogItself){
                                    window.location.href ="/agent.html";
                                }
                            }]
                        });*/
                        layer.open({
                            content:'登録が成功したので,審査を待ってください。！',
                            title:'プロンプト',
                            skin:'layui-layer-brand',
                            btn:["落し着ける"],
                            success: function(layer){
                                // 重写关闭按钮
                                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                                // 提示框类型
                                $(layer).addClass("normal-dialog");
                            },
                            yes: function () {
                                window.location.href ="/agent.html";
                            }
                        });
                    }
                },
                error: function (errMsg) {
                    $this.removeAttr("disabled").text("申し込みます");
                    alert(errMsg.responseText);
                },
                complete:function(){
//                    $this.removeAttr("disabled").text("提交注册");
                }
            })
        }
    }
    /*生日*/
    (function(){
        var date = new Date();
        var currentYear = date.getYear()+1900-18;
        var years = currentYear;
        for(;currentYear > years-100;currentYear--){
            $('[name=birthdayYear]').append('<option value="'+currentYear+'">'+(currentYear)+'年</option>')
        }
    })();
    $('[name=birthdayMon],[name=birthdayYear]').on("change",function(){
        var $birthdayMon = $("[name=birthdayMon]");
        var $birthdayYear = $("[name=birthdayYear]");
        if($birthdayMon.val() && $birthdayYear.val()){
//            return new Date(year, month, 0).getDate();
            var days = new Date(Number($birthdayYear.val()), Number($birthdayMon.val()), 0).getDate();
            var html = "<option value=''>日</option>";
            for(;days;days--){
                html += "<option value='"+days+"'>"+days+"日</option>"
            }
            $("[name=birthdayDay]").html(html);
            /*            var constellation = getConstellation($birthdayMon.val(),$birthdayYear.val());
                        if(constellation){
                            $("[name='sysUser.constellation'").val(constellation);
                        }*/
        }
    });
    $("[name=birthdayDay]").on("change",function(){
        var $birthdayMon = $("[name=birthdayMon]");
        var $this = $(this);
        var constellation = getConstellation($birthdayMon.val(),$this.val());
        if(constellation){
            $("[name='sysUser.constellation'").val(constellation);
        }
    });
    function validateEmailAddress(obj){
        var sendEmailIntervalSeconds = ${data.sendEmailIntervalSeconds};
        var timeid;
        var $this = $(obj);
        var $email = $('[name="email.contactValue"]');
        var email = $email.val();
        var cookie = getCookie(REGSTER_SEND_EMAIL_TIME);
        cookie = Number(cookie);
        if(!email){
            /*BootstrapDialog.alert({message:'请先输入邮箱！',title:'提示信息'});*/
            layer.open({
                content:'先にメールを入力してください。',
                title:'プロンプトメッセージ',
                skin:'layui-layer-brand',
                btn:["落し着ける"],
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
                content:'正しいメールアドレスを入力してください。！',
                title:'プロンプトメッセージ',
                skin:'layui-layer-brand',
                btn:["落し着ける"],
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
                content:'送信間隔はまだ決まっていない。！！',
                title:'プロンプトメッセージ',
                skin:'layui-layer-brand',
                btn:["落し着ける"],
                success: function(layer){
                    // 重写关闭按钮
                    $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                    // 提示框类型
                    $(layer).addClass("normal-dialog");
                }
            });
            return;
        }
        function setCookie(c_name,value,expiredays){
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+expiredays);
            document.cookie=c_name+ "=" +escape(value)+";path=/"+
                    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
        }
        /**
         * 获取cookie
         * @param c_name cookie key
         */
        function getCookie(c_name){
            if (document.cookie.length>0){
                c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1){
                    c_start=c_start + c_name.length+1;
                    c_end=document.cookie.indexOf(";",c_start);
                    if (c_end==-1) c_end=document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
        }
        if(email && !cookie){

            var locale = $("[name='sysUser.defaultLocale']").val();
            $.ajax({
                url:"/register/checkEmail.html",
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
                                        $this.text("再度送信")
                                    }else{
                                        $this.prop("disabled",true);
                                        $this.text(sendEmailIntervalSec+"秒後に再度送信")
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
    function getlocationParam(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return r[2]; return null;
    }
    var s = $(window).scroll(function() {
        var top = $(document).scrollTop();
        if (top > 550) {
            $(".topcontrol").fadeIn(1000);
        } else {
            $(".topcontrol").fadeOut(1000);
        }
    });

    $(".topcontrol").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    /*验证码点击切换*/
    $("._captcha_code").on("click",function(e){
        var $this = $(this);
        var src = "${data.contextInfo.playerCenterContext}captcha/"+$this.data().code+".html?t=" + new Date().getTime().toString(36);
        $this.prop("src",src);
        $(this).parents("form").find("input[name='captchaCode']").val("").focus();
    });
    function getConstellation(month, day) {
        var code = month - (day < "102223444433".charAt(month - 1) - -19);
        switch(code) {
            case 0:
            case 12:
                return 'capricorn';
            case 1:
                return 'aquarius';
            case 2:
                return 'pisces';
            case 3:
                return 'aries';
            case 4:
                return 'taurus';
            case 5:
                return 'gemini';
            case 6:
                return 'cancer';
            case 7:
                return 'leo';
            case 8:
                return 'virgo';
            case 9:
                return 'libra';
            case 10:
                return 'scorpio';
            case 11:
                return 'sagittarius';
        }
    }
    function resetLocal(){
        var currentLocal = "<#list data.dictMap['siteLang'] as lang><#if lang_index==0>${lang.language}</#if></#list>";
        $("[name='sysUser.defaultLocale']").val(currentLocal);
    }
</script>
</body>

</html>
