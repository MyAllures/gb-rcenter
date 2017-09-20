<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
    <style>
        header .nav-wrap .logo {
            top: 30px;
        }
    </style>
</head>


<body class="register-body">
<header>
    <div class="top-bar">
        <span class="_user_time hide"></span>
        <div class="container">
            <ul class="list-inline pull-left list-left _vr_unLogin" style="display: none;">
                <input type="hidden" name="type" value="top">
                <li>你好!</li>
                <li><a onclick="onLogin()" href="javascript:">请登录 </a></li>
                <li><a href="register.html" class="link-blink">免费注册</a></li>
                <li><a class="_vr_mt_check game-demo" href="javascript:void(0)" data-api="22" data-apitype="4"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>免费试玩</a>
                </li>
            </ul>
            <ul class="list-inline pull-left list-left _vr_loginSuccess" style="display:none;">
                <li>你好，<span class="_vr_nickname"></span>!</li>
                <li><a href="javascript:void(0);" class="btn-logout" onclick="Logout()">退出</a></li>
            </ul>
            <ul class="list-inline pull-right list-right">
                <li><a href="/">首页</a></li>
                <li><a class="link-blink" <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if>>在线客服</a></li>
                <li class="show-on-hover">
                    <a href="javascript:">购买彩票<i class="icon-arr-dow"></i></a>
                    <div class="dropdown-menua">
                        <h4>高频：</h4>
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>广西快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                            </li>
                        </ul>
                        <hr/>
                        <h4>低频：</h4>
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li><a href="/commonPage/help.html">帮助</a></li>
                <li class="show-on-hover">
                    <a href="javascript:">网站导航<i class="icon-arr-dow"></i></a>
                    <div class="dropdown-menua dropdown2">
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>购买彩票</a>
                            </li>
                            <li><a href="javascript:" class="mobileBetting">手机购彩</a></li>
                            <li><a href="javascript:">规则说明</a></li>
                        </ul>
                        <hr/>
                        <h4>彩票工具</h4>
                        <ul class="list-inline">
                            <li><a href="/commonPage/mobileTopic/index.html">手机客户端</a></li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>走势查询</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>中奖查询</a>
                            </li>
                        </ul>
                        <hr/>
                        <ul class="list-inline">
                            <li><a href="javascript:">会员中心</a></li>
                            <li><a href="javascript:">推广赚钱</a></li>
                            <li><a href="promo.html">优惠活动</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</header>
<main class="main-register">
    <div class="register">
        <div class="register-img">
        <#if data.siteFlashLogo?has_content>
            <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="260" height="56" align="middle">
                <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                <param name="wmode" value="transparent">
                <param name="menu" value="false">
                <param name="autoplay" value="true"/>
                <!--[if !IE]>-->
                <object type="application/x-shockwave-flash" data="${imgPath(data.configInfo.domain,data.siteFlashLogo)}" width="260" height="56">
                    <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                    <param name="wmode" value="transparent">
                    <param name="menu" value="false">
                    <param name="autoplay" value="true"/>
                    <!--<![endif]-->
                    <a href="/"><img style="max-width:260px;height: 56px;" src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                    <!--[if !IE]>-->
                </object>
                <!--<![endif]-->
            </object>
        <#else >
            <a href="/"><img style="max-width:260px;height: 56px;" src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
        </#if>
        </div>
        <div class="container">
            <!-- Register -->
            <div class="register-box">
                <form id=regForm class="form-horizontal">
                    <fieldset>
                        <h2 class="account-info"></h2>
                    <#--密码 强度-->
                        <input value="" type="hidden" name="sysUser.passwordLevel">
                    <#--介绍人 通过链接-->
                        <input name="recommendRegisterCode" id="recommendRegisterCode" type="hidden">
                    <#--登录地址-->
                        <input type="hidden" name="loginUrl" value="/?do=loginDialog">
                        <input type="hidden" name="editType" value="player">
                        <div style="display:none" id="validateRule">${data.registerValidateRule}</div>
                        <input type="hidden" value='${data.playerRequiredJson}' name="requiredJson">
                    <#if data.playerFieldSorts??>
                        <#list data.playerFieldSorts as field>
                            <#if field.name == 'regCode'>
                                <div class="form-group" id="recommendBox">
                                    <label for="inputPassword" class="col-12-4 control-label">介绍人</label>
                                    <div class="col-12-5">
                                        <input type="text" class="form-control" name="recommendUserInputCode"
                                               placeholder="请输入推荐ID号">
                                    </div>
                                </div>
                            </#if>
                        </#list>
                    </#if>
                    <#if data.playerFieldSorts??>
                        <#list data.playerFieldSorts as field>
                            <#if field.name == 'username'>
                                <div class="form-group">
                                    <label for="sysUser.username" class="col-12-4 control-label">
                                        账号
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input type="text" class="form-control" name="sysUser.username" maxlength="15"
                                               placeholder="请输入4-15字符账号">
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == 'password'>
                                <div class="form-group">
                                    <label for="sysUser.password" class="col-12-4 control-label">
                                        登录密码
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input type="password" class="form-control noCp" name="sysUser.password"
                                               maxlength="20" placeholder="请输入密码">
                                        <div class="progress pass-strength m-t-sm _password_level">
                                        <#--未输入密码-->
                                            <div class="progress-bar" password-level="none"></div>
                                            <div class="progress-bar" style="width: 20%;display: none;"
                                                 password-level="1">弱
                                            </div>
                                            <div class="progress-bar progress-bar-success"
                                                 style="width: 75%;display: none;" password-level="2">强
                                            </div>
                                            <div class="progress-bar progress-bar-success"
                                                 style="width: 100%;display: none;" password-level="3">非常强
                                            </div>
                                        </div>
                                    </div>
                                <#--<span class="col-12-5 explan">请输入密码</span>-->
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword" class="col-12-4 control-label">
                                        密码确认
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input type="password" class="form-control noCp" name="confirmPassword"
                                               maxlength="20" placeholder="再次输入密码">
                                    </div>
                                <#--<span class="col-12-5 explan">再次输入密码</span>-->
                                </div>
                            </#if>
                            <#if field.name == 'verificationCode'>
                            <#--验证码-->
                            </#if>
                        </#list>
                    </#if>

                        <h2 class="person-info"></h2>
                    <#if data.playerFieldSorts??>
                        <#list data.playerFieldSorts as field>
                            <#if field.name == 'defaultTimezone'>
                            <#--时区-->
                                <div class="form-group">
                                    <label for="sysUser.defaultTimezone" class="col-12-4 control-label">
                                        时区
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <select class="form-control" name="sysUser.defaultTimezone" disabled>
                                            <option value="">请选择</option>
                                            <#list data.dictMap['timezone']?keys as key>
                                                <option
                                                    <#if data.dictMap['timezone'][key].dictCode == data.configInfo.siteTimeZone >selected="selected"</#if>
                                                    value="${data.dictMap['timezone'][key].dictCode}">${data.dictMap['timezone'][key].translated}</option>
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
                                    <label for="sysUser.sex" class="col-12-4 control-label">
                                        性别
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <select class="form-control" name="sysUser.sex">
                                            <option value="">请选择</option>
                                            <#list data.dictMap['sex']?keys as key>
                                                <option value="${data.dictMap['sex'][key].dictCode}">${data.dictMap['sex'][key].translated}</option>
                                            </#list>
                                        </select>
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == 'defaultLocale'>
                                <div class="form-group">
                                    <label for="sysUser.defaultLocale" class="col-12-4 control-label">
                                        主语言
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <select class="form-control" name="sysUser.defaultLocale">
                                            <option value="">请选择</option>
                                            <#list data.dictMap['siteLang'] as lang>
                                                <option value="${lang.language}">${lang.tran}</option>
                                            </#list>
                                        </select>
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == '302'>
                                <div class="form-group">
                                    <label for="" class="col-12-4 control-label">
                                        MSN
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control" type="text" name="msn.contactValue"
                                               placeholder="请输入邮箱格式的内容">
                                    </div>
                                <#--<span class="col-12-5 explan">请输入邮箱格式的内容</span>-->
                                </div>
                            </#if>
                            <#if field.name == '304'>
                                <div class="form-group">
                                    <label for="" class="col-12-4 control-label">
                                        微信
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control" type="text" name="weixin.contactValue"
                                               placeholder="请输入微信号">
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == '110'>
                                <div class="form-group">
                                    <label for="" class="col-12-4 control-label">
                                        手机
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control" type="text" name="phone.contactValue"
                                               placeholder="请输入正确的手机号码，以便接收信息">
                                    </div>
                                </div>

                                <#if data.playerValidateRegisterMap['isPhoneValid']?exists && data.playerValidateRegisterMap['isPhoneValid']>

                                    <#if data.playerValidateRegisterMap['phone']?has_content && data.playerValidateRegisterMap['phone']>
                                        <input name="checkPhone" value="checkPhone" type="hidden">
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-12-4 control-label">
                                                手机验证码
                                                <#if data.playerRequiredJson?contains(field.name)>
                                                    <span class="text-danger">*</span>
                                                </#if>
                                            </label>
                                            <div class="col-12-5">
                                                <div class="input-group">
                                                    <input type="hidden" value="11" name="phone.status">
                                                    <input type="text" class="form-control error" name="phoneCode"
                                                           maxlength="6" placeholder="" aria-required="true"
                                                           aria-invalid="true">
                                                    <span class="input-group-btn">
                                                                    <a href="javascript:void(0)" type="button"
                                                                       class="btn btn-info btn-block"
                                                                       onclick="validateCellPhone(this)">
                                                                        发送验证码
                                                                    </a>
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </#if>
                                </#if>

                            </#if>
                            <#if field.name == '201'>
                                <div class="form-group">
                                    <label for="" class="col-12-4 control-label">
                                        邮箱
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control" type="text" name="email.contactValue"
                                               placeholder="请输入正确的邮箱地址，以便接收信息">
                                    </div>
                                <#--<span class="col-12-5 explan">请输入Email账号</span>-->
                                </div>
                                <#if data.playerValidateRegisterMap['isEmailValid']?exists && data.playerValidateRegisterMap['isEmailValid']>

                                    <#if data.playerValidateRegisterMap['email']?has_content && data.playerValidateRegisterMap['email'] >
                                        <input name="checkEmail" value="checkEmail" type="hidden">
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-12-4 control-label">
                                                邮箱验证码
                                                <#if data.playerRequiredJson?contains(field.name)>
                                                    <span class="text-danger">*</span>
                                                </#if>
                                            </label>
                                            <div class="col-12-5">
                                                <div class="input-group">
                                                    <input type="hidden" value="11" name="email.status">
                                                    <input type="text" class="form-control error" name="emailCode"
                                                           maxlength="6" placeholder="" aria-required="true"
                                                           aria-invalid="true">
                                                    <span class="input-group-btn">
                                                                            <a href="javascript:void(0)" type="button"
                                                                               class="btn btn-info btn-block"
                                                                               onclick="validateEmailAddress(this)">
                                                                                发送验证码
                                                                            </a>
                                                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </#if>
                                </#if>
                            </#if>
                            <#if field.name == '301'>
                                <div class="form-group">
                                    <label for="qq.contactValue" class="col-12-4 control-label">
                                        QQ
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control" type="text" name="qq.contactValue"
                                               placeholder="请输入5～11位0-9的纯数字" maxlength="11">
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == 'birthday'>
                            <#--TODO 下拉生日-->
                                <div class="form-group">
                                    <label for="sysUser.birthday" class="col-12-4 control-label">
                                        生日
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5 p-x-0">
                                        <div class="col-12-4">
                                            <select class="form-control" name="birthdayYear">
                                                <option value="">选择年份</option>
                                            </select>
                                        </div>
                                        <div class="col-12-4">
                                            <select class="form-control" name="birthdayMon">
                                                <option value="">选择月份</option>
                                                <#list 1..12 as mon>
                                                    <option value="${mon}">${mon}月</option>
                                                </#list>
                                            </select>
                                        </div>
                                        <div class="col-12-4">
                                            <select class="form-control" name="birthdayDay">
                                                <option value="">选择日期</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == 'paymentPassword'>
                                <div class="form-group">
                                    <label for="sysUser.permissionPwd" class="col-12-4 control-label">
                                        安全密码
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control noCp" maxlength="6" placeholder="请输入6位0-9的数字"
                                               type="password" name="sysUser.permissionPwd">
                                        <p class="help-block form-help">提款认证密码，请务必牢记！</p>
                                    </div>
                                <#--<span class="col-12-5 explan">请输入6位0-9的数字</span>-->
                                </div>
                                <div class="form-group">
                                    <label for="confirmPermissionPwd" class="col-12-4 control-label">
                                        确认安全密码
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control noCp" maxlength="6" placeholder="再次输入安全密码"
                                               type="password" name="confirmPermissionPwd">
                                    </div>
                                <#--<span class="col-12-5 explan">请输入6位0-9的数字</span>-->
                                </div>
                            </#if>
                            <#if field.name == 'realName'>
                                <div class="form-group">
                                    <label for="sysUser.realName" class="col-12-4 control-label">
                                        真实姓名
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input class="form-control" type="text" name="sysUser.realName" maxlength="30"
                                               placeholder="请输入真实姓名，一旦设置，不可修改">
                                    </div>
                                </div>
                            </#if>
                            <#if field.name == 'serviceTerms'>
                            <#--服务条款-->
                            </#if>
                            <#if field.name == 'securityIssues'>
                            <#--安全问题-->
                                <div class="form-group">
                                    <label for="sysUserProtection.question1" class="col-12-4 control-label">
                                        安全问题
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <select class="form-control" name="sysUserProtection.question1">
                                            <option value="">请选择</option>
                                            <#list data.dictMap['question1']?keys as key>
                                                <option value="${data.dictMap['question1'][key].dictCode}">${data.dictMap['question1'][key].translated}</option>
                                            </#list>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sysUserProtection.answer1" class="col-12-4 control-label">
                                        回答
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <input type="text" class="form-control" name="sysUserProtection.answer1"
                                               placeholder="请输入1~30个字符，字符类型不限">
                                    </div>
                                </div>

                            </#if>
                            <#if field.name == 'mainCurrency'>
                            <#--主货币-->
                                <div class="form-group">
                                    <label class="col-12-4 control-label" for="sysUser.defaultCurrency">
                                        主货币
                                        <#if data.playerRequiredJson?contains(field.name)>
                                            <span class="text-danger">*</span>
                                        </#if>
                                    </label>
                                    <div class="col-12-5">
                                        <select class="form-control" name="sysUser.defaultCurrency">
                                            <option value="">请选择</option>
                                            <#list data.dictMap['siteCurrency'] as siteCurrency>
                                                <option value="${siteCurrency.code}">${siteCurrency.tran}</option>
                                            </#list>
                                        </select>
                                        <p class="help-block form-help">
                                            <span class="fa fa-info-circle fa-question-circle text-warning"></span>
                                            主货币为您在站点的货币单位，用于存款，转账，取款！
                                            <span class="text-danger">
                                                                            一旦设置，不可修改！
                                                                        </span>
                                        </p>
                                    </div>
                                </div>
                            </#if>
                        </#list>
                    </#if>

                        <div class="form-group">
                            <label for="inputPassword" class="col-12-4 control-label">验证码</label>
                            <div class="col-12-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="captchaCode" maxlength="4"
                                           placeholder="验证码">
                                </div>
                            </div>
                            <div class="pull-left">
                                <div class="input-group code">
                                    <a href="javascript:"><img style="width: 106px;height: 34px;"
                                                               class="_vr_captcha_code" data-code="ppcregister"></a>
                                </div>
                            </div>
                        </div>
                    <#if data.playerValidateRegisterMap['serviceTermsShow']?? && data.playerValidateRegisterMap['serviceTermsShow']>
                        <div class="form-group">
                            <label for="inputPassword" class="col-12-4 control-label"></label>
                            <div class="col-12-5">
                                <div class="font-sm c-p-box">
                                    <input type="checkbox" checked="checked" value="checked" name="termsOfServiceCheck">选中即表示您同意并愿意遵守天天彩票<a
                                        style="color: #7a4703" href="javascript:void(0)"
                                        id="login-agreement">用户协议和隐私条款</a>。
                                </div>
                            </div>
                        </div>
                        <input type="hidden" value="12321" name="termsOfService">
                    </#if>
                        <div class="form-group">
                            <label for="inputPassword" class="col-12-4 control-label"></label>
                            <div class="col-12-5">
                                <button type="button" class="btn btn-warning btn-block" name="registerBtn"
                                        onclick="registerPlayer(this)">立即注册
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</main>
<footer>
    <div class="container">
        <div class="footer_wrap reg-footer">
            <div class="copy_right">
                <p>Copyright © 2009-2017 彩票网 版权所有</p>
            </div>
        </div>
    </div>
</footer>
<#include "../../commonPage/zh_CN/ads/registerAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/regScript.ftl">
</body>

</html>
