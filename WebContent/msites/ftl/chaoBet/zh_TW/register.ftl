<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
</head>

<body>
<#include "top.ftl">
<main class="main-about main-register">
    <div style="height: 410px;background: url(${data.configInfo.sitePath}/images/about-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
<#include "notice.ftl">
    <!-- about -->
    <section class="about register-about">
        <div class="container">
            <div class="row">
                <div class="col-5-1">
                    <div class="page-left">
                        <div class="page-center">
                            <div class="page-box">
                                <div class="list-group page-list">
                                <#list data.documents as document>
                                    <#if document['parent']?exists>
                                        <#if document['code']=="agent&cooperation">
                                            <a href="agent.html" target="_blank" class="list-group-item parentLi <#if document_index==0>active</#if>">${document["title"]}</a>
                                        <#else>
                                            <a href="about.html?id=${document["id"]}" class="list-group-item parentLi_${document['id']} parentLi <#if document_index==0>active</#if>">${document["title"]}</a>
                                        </#if>
                                    </#if>
                                </#list>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5-4">
                    <div class="page-content">
                        <!-- Register -->
                        <div class="register-box">
                            <form id="regForm" class="form-horizontal">
                            <#assign content></#assign>
                            <#if data.carousels??>
                                <#list data.carousels as carousel>
                                    <#if carousel["type"]="carousel_type_ad_register">
                                        <#if carousel["content"]??><#assign content=carousel["content"]>
                                        </#if>
                                    <#else>
                                        <#assign content="false">
                                    </#if>
                                </#list>
                            </#if>
                            <#if content == "false">
                            <#--<h2></h2>-->
                            <#else>
                            ${content}
                            </#if>
                                <fieldset>
                                    <h2 class="account-info"></h2>
                                <#--密碼 强度-->
                                    <input type="hidden" name="sysUser.passwordLevel">
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
                                                <label for="inputPassword" class="col-12-3 control-label">介紹人</label>
                                                <div class="col-12-6">
                                                    <input type="text" class="form-control" name="recommendUserInputCode">
                                                </div>
                                            </div>
                                        </#if>
                                        <#if field.name == 'username'>
                                            <div class="form-group">
                                                <label for="sysUser.username" class="col-12-3 control-label">
                                                    賬號
                                                    <#if data.playerRequiredJson?contains(field.name)>
                                                        <span class="text-danger">*</span>
                                                    </#if>
                                                </label>
                                                <div class="col-12-6">
                                                    <input type="text" class="form-control" name="sysUser.username" maxlength="15" placeholder="請輸入4-15字符賬號">
                                                </div>
                                            </div>
                                        </#if>
                                        <#if field.name == 'password'>
                                            <div class="form-group">
                                                <label for="sysUser.password" class="col-12-3 control-label">
                                                    登入密碼
                                                    <#if data.playerRequiredJson?contains(field.name)>
                                                        <span class="text-danger">*</span>
                                                    </#if>
                                                </label>
                                                <div class="col-12-6">
                                                    <input type="password" class="form-control noCp" name="sysUser.password" maxlength="20" placeholder="請輸入密碼">
                                                    <div class="progress pass-strength m-t-sm _password_level">
                                                    <#--未输入密碼-->
                                                        <div class="progress-bar" password-level="none"></div>
                                                        <div class="progress-bar" style="width: 20%;display: none;" password-level="1">弱</div>
                                                        <div class="progress-bar progress-bar-success" style="width: 75%;display: none;" password-level="2">強</div>
                                                        <div class="progress-bar progress-bar-success" style="width: 100%;display: none;" password-level="3">非常強</div>
                                                    </div>
                                                </div>
                                            <#--<span class="col-12-5 explan">请输入密碼</span>-->
                                            </div>
                                            <div class="form-group">
                                                <label for="confirmPassword" class="col-12-3 control-label">
                                                    密碼確認
                                                    <#if data.playerRequiredJson?contains(field.name)>
                                                        <span class="text-danger">*</span>
                                                    </#if>
                                                </label>
                                                <div class="col-12-6">
                                                    <input type="password" class="form-control noCp" name="confirmPassword" maxlength="20" placeholder="再次輸入密碼">
                                                </div>
                                            <#--<span class="col-12-5 explan">再次输入密碼</span>-->
                                            </div>
                                        </#if>
                                    </#list>
                                </#if>
                                    <h2 class="person-info"></h2>
                                    <#if data.playerFieldSorts??>
                                        <#list data.playerFieldSorts as field>
                                            <#if field.name == 'verificationCode'>
                                            <#--驗證碼-->
                                            </#if>
                                            <#if field.name == 'defaultTimezone'>
                                            <#--时区-->
                                                <div class="form-group">
                                                    <label for="sysUser.defaultTimezone" class="col-12-3 control-label">
                                                        時區
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <select class="form-control" name="sysUser.defaultTimezone" disabled>
                                                            <option value="">請選擇</option>
                                                            <#list data.dictMap['timezone']?keys as key>
                                                                <option <#if data.dictMap['timezone'][key].dictCode == data.configInfo.siteTimeZone >selected="selected"</#if> value="${data.dictMap['timezone'][key].dictCode}">${data.dictMap['timezone'][key].translated}</option>
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
                                                    <label for="sysUser.sex" class="col-12-3 control-label">
                                                        性別
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <select class="form-control" name="sysUser.sex" >
                                                            <option value="">請選擇</option>
                                                            <#list data.dictMap['sex']?keys as key>
                                                                <option value="${data.dictMap['sex'][key].dictCode}">${data.dictMap['sex'][key].translated}</option>
                                                            </#list>
                                                        </select>
                                                    </div>
                                                </div>
                                            </#if>
                                            <#if field.name == 'defaultLocale'>
                                                <div class="form-group">
                                                    <label for="sysUser.defaultLocale" class="col-12-3 control-label">
                                                        主語言
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <select class="form-control" name="sysUser.defaultLocale" >
                                                            <option value="">請選擇</option>
                                                            <#list data.dictMap['siteLang'] as lang>
                                                                <option value="${lang.language}">${lang.tran}</option>
                                                            </#list>
                                                        </select>
                                                    </div>
                                                </div>
                                            </#if>
                                            <#if field.name == '302'>
                                                <div class="form-group">
                                                    <label for="" class="col-12-3 control-label">
                                                        MSN
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control" type="text" name="msn.contactValue" placeholder="請輸入郵箱格式的內容">
                                                    </div>
                                                <#--<span class="col-12-5 explan">请输入邮箱格式的内容</span>-->
                                                </div>
                                            </#if>
                                            <#if field.name == '304'>
                                                <div class="form-group">
                                                    <label for="" class="col-12-3 control-label">
                                                        微信
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control" type="text" name="weixin.contactValue" placeholder="請輸入微信號">
                                                    </div>
                                                </div>
                                            </#if>
                                            <#if field.name == '110'>
                                                <div class="form-group">
                                                    <label for="" class="col-12-3 control-label">
                                                        手機
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control" type="text" name="phone.contactValue" placeholder="請輸入正確的手機號碼，以便接收信息">
                                                    </div>
                                                </div>
                                                <#if data.playerValidateRegisterMap['isPhoneValid']?exists && data.playerValidateRegisterMap['isPhoneValid']>

                                                    <#if data.playerValidateRegisterMap['phone']?has_content && data.playerValidateRegisterMap['phone']>
                                                        <input name="checkPhone" value="checkPhone" type="hidden">
                                                        <div class="form-group">
                                                            <label for="inputPassword" class="col-12-3 control-label">
                                                                手機驗證碼
                                                                <#if data.playerRequiredJson?contains(field.name)>
                                                                    <span class="text-danger">*</span>
                                                                </#if>
                                                            </label>
                                                            <div class="col-12-6">
                                                                <div class="input-group">
                                                                    <input type="hidden" value="11" name="phone.status">
                                                                    <input type="text" class="form-control error" name="phoneCode" maxlength="6" placeholder="" aria-required="true" aria-invalid="true">
                                                                <span class="input-group-btn">
                                                                    <a href="javascript:void(0)" type="button" class="btn btn-info btn-block" onclick="validateCellPhone(this)">
                                                                        發送驗證碼
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
                                                    <label for="" class="col-12-3 control-label">
                                                        郵箱
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control" type="text" name="email.contactValue" placeholder="請輸入正確的郵箱地址，以便接收信息">
                                                    </div>
                                                <#--<span class="col-12-5 explan">请输入Email账号</span>-->
                                                </div>
                                                <#if data.playerValidateRegisterMap['isEmailValid']?exists && data.playerValidateRegisterMap['isEmailValid']>

                                                    <#if data.playerValidateRegisterMap['email']?has_content && data.playerValidateRegisterMap['email'] >
                                                        <input name="checkEmail" value="checkEmail" type="hidden">
                                                        <div class="form-group">
                                                            <label for="inputPassword" class="col-12-3 control-label">
                                                                郵箱驗證碼
                                                                <#if data.playerRequiredJson?contains(field.name)>
                                                                    <span class="text-danger">*</span>
                                                                </#if>
                                                            </label>
                                                            <div class="col-12-6">
                                                                <div class="input-group">
                                                                    <input type="hidden" value="11" name="email.status">
                                                                    <input type="text" class="form-control error" name="emailCode" maxlength="6" placeholder="" aria-required="true" aria-invalid="true">
                                                                    <span class="input-group-btn">
                                                                        <a href="javascript:void(0)" type="button" class="btn btn-info btn-block" onclick="validateEmailAddress(this)">
                                                                            發送驗證碼
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
                                                    <label for="qq.contactValue" class="col-12-3 control-label">
                                                        QQ
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control" type="text" name="qq.contactValue" placeholder="請輸入5～11位0-9的純數字" maxlength="11">
                                                    </div>
                                                </div>
                                            </#if>
                                            <#if field.name == 'birthday'>
                                            <#--TODO 下拉生日-->
                                                <div class="form-group">
                                                    <label for="sysUser.birthday" class="col-12-3 control-label">
                                                        生日
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-2 col-xs-4">
                                                        <select class="form-control" name="birthdayYear">
                                                            <option value="">選擇年份</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-12-2 col-xs-4">
                                                        <select class="form-control" name="birthdayMon">
                                                            <option value="">選擇月份</option>
                                                            <#list 1..12 as mon>
                                                                <option value="${mon}">${mon}月</option>
                                                            </#list>
                                                        </select>
                                                    </div>
                                                    <div class="col-12-2 col-xs-4">
                                                        <select class="form-control" name="birthdayDay">
                                                            <option value="">選擇日期</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </#if>
                                            <#if field.name == 'paymentPassword'>
                                                <div class="form-group">
                                                    <label for="sysUser.permissionPwd" class="col-12-3 control-label">
                                                        安全密碼
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control noCp" maxlength="6" placeholder="请输入6位0-9的数字" type="password" name="sysUser.permissionPwd">
                                                        <p class="help-block form-help">提款認證密碼，請務必牢記！</p>
                                                    </div>
                                                <#--<span class="col-12-5 explan">请输入6位0-9的数字</span>-->
                                                </div>
                                                <div class="form-group">
                                                    <label for="confirmPermissionPwd" class="col-12-3 control-label">
                                                         確認安全密碼
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control noCp" maxlength="6" placeholder="再次輸入安全密碼" type="password" name="confirmPermissionPwd">
                                                    </div>
                                                <#--<span class="col-12-5 explan">请输入6位0-9的数字</span>-->
                                                </div>
                                            </#if>
                                            <#if field.name == 'realName'>
                                                <div class="form-group">
                                                    <label for="sysUser.realName" class="col-12-3 control-label">
                                                        真實姓名
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input class="form-control" type="text" name="sysUser.realName" maxlength="30" placeholder="請輸入真實姓名，一旦設置，不可修改">
                                                    </div>
                                                </div>
                                            </#if>
                                            <#if field.name == 'serviceTerms'>
                                            <#--服务条款-->
                                            </#if>
                                            <#if field.name == 'securityIssues'>
                                            <#--安全问题-->
                                                <div class="form-group">
                                                    <label for="sysUserProtection.question1" class="col-12-3 control-label">
                                                        安全問題
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <select class="form-control" name="sysUserProtection.question1" >
                                                            <option value="">請選擇</option>
                                                            <#list data.dictMap['question1']?keys as key>
                                                                <option value="${data.dictMap['question1'][key].dictCode}">${data.dictMap['question1'][key].translated}</option>
                                                            </#list>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="sysUserProtection.answer1" class="col-12-3 control-label">
                                                        回答
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <input type="text" class="form-control" name="sysUserProtection.answer1" placeholder="請輸入1~30個字符，字符類型不限">
                                                    </div>
                                                </div>

                                            </#if>
                                            <#if field.name == 'mainCurrency'>
                                            <#--主货币-->
                                                <div class="form-group">
                                                    <label class="col-12-3 control-label" for="sysUser.defaultCurrency">
                                                        主貨幣
                                                        <#if data.playerRequiredJson?contains(field.name)>
                                                            <span class="text-danger">*</span>
                                                        </#if>
                                                    </label>
                                                    <div class="col-12-6">
                                                        <select class="form-control" name="sysUser.defaultCurrency">
                                                            <option value="">請選擇</option>
                                                            <#list data.dictMap['siteCurrency'] as siteCurrency>
                                                                <option value="${siteCurrency.code}">${siteCurrency.tran}</option>
                                                            </#list>
                                                        </select>
                                                        <p class="help-block form-help">
                                                            <span class="fa fa-info-circle fa-question-circle text-warning"></span>
                                                            主貨幣為您在站點的貨幣單位，用於存款，轉賬，取款！
                                                                        <span class="text-warning">
                                                                            一旦設置，不可修改！
                                                                        </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </#if>
                                        </#list>
                                    </#if>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-12-3 control-label">驗證碼</label>
                                        <div class="col-12-2">
                                            <div class="input-group">
                                                <input type="text" class="form-control" name="captchaCode" maxlength="4" placeholder="驗證碼">
                                            </div>
                                        </div>
                                        <div class="pull-left">
                                            <div class="input-group">
                                                <a href="javascript:"><img width="100" height="34" class="_vr_captcha_code" data-code="ppcregister"></a>
                                            </div>
                                        </div>
                                    </div>
                                    <#if data.playerValidateRegisterMap['serviceTermsShow']?? && data.playerValidateRegisterMap['serviceTermsShow']>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-12-3 control-label"></label>
                                        <div class="col-12-6">
                                            <div class="font-sm c-p-box">
                                                <input type="checkbox" checked="checked" value="checked" name="termsOfServiceCheck"> 選中即表示您同意並願意遵守ChaoBet
                                                <a href="javascript:" style="color:#999999;line-height: 2;" id="login-agreement">用户協議和隱私條款</a>。
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" value="12321" name="termsOfService">
                                </#if>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-12-3 control-label"></label>
                                        <div class="col-12-5">
                                            <button type="button" class="btn btn-warning btn-block" name="registerBtn" onclick="registerPlayer(this)">立即註冊</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/registerAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_TW/msiteCommonScript/regScript.ftl">
</body>

</html>