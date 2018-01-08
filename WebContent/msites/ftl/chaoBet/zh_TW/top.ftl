<#include "../../commonPage/topCommon.ftl">
<#include "../../commonPage/zh_TW/topCommonDesc.ftl">
<#assign apiTypeName={"1":"LIVE","2":"CASINO","3":"SPORTS","4":"LOTTERY"}>
<header>
    <!--nav-part-->
    <div class="nav-part">
        <div class="container">
            <!--logo-->
            <div class="logo">
                <#if data.siteFlashLogo?has_content>
                    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="182" height="61" align="middle">
                        <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                        <param name="wmode" value="transparent">
                        <param name="menu" value="false">
                        <param name="autoplay" value="true" />
                        <!--[if !IE]>-->
                        <object type="application/x-shockwave-flash" data="${imgPath(data.configInfo.domain,data.siteFlashLogo)}" width="182" height="61">
                            <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                            <param name="wmode" value="transparent">
                            <param name="menu" value="false">
                            <param name="autoplay" value="true" />
                            <!--<![endif]-->
                            <a href="/"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                            <!--[if !IE]>-->
                        </object>
                        <!--<![endif]-->
                    </object>
                <#else >
                    <a href="/"><img style="width: 182px;height: 61px;" src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                </#if>
            </div>
            <!--top-link-->
            <div class="clearfix">
                <div class="top-link pull-right">
                    <ul class="list-inline">
                        <li><a href="javascript:void(0)" class="mobileBetting">手機投注</a></li>
                        <li><a href="javascript:void(0)" onclick="AddFavorite()">加入收藏</a></li>
                        <li class="dropdown lang">
                            <a href="javascript:" class="lan cn current_language">简体中文</a>
                            <ul class="dropdown-menu">
                            <#list data.dictMap.siteLang as lua>
                                <li><a href="javascript:" data-language="${lua.language}" class="lan <#if lua.language=="zh_CN">cn<#elseif lua.language=="zh_TW">hk<#elseif lua.language=="en_US">en</#if> changeLanguage">${lua.tran}</a></li>
                            </#list>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!--nav-->
            <div class="navbar pull-right">
                <ul class="nav navbar-nav _vr_nav">
                    <li class="nav-item active"><a href="/">網站首頁</a></li>
                    <#list data.siteApiTypeI18n?keys as apiTypeId>
                        <li class="nav-item" rel="sub-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>">
                            <#if apiTypeId == '2'>
                                <a data-page="casino.html" href="casino.html?apiType=2&apiId=<#list data.siteApiTypeRelationMap['2'] as relationMap><#if relationMap_index==0>${relationMap.apiId?string}</#if></#list>&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>
                            <#elseif apiTypeId == '3'>
                                <a data-page="sports.html" href="sports-detail.html?apiId=<#list data.siteApiTypeRelationMap['${apiTypeId}'] as relationMap><#if relationMap_index==0>${relationMap.apiId?string.computer}</#if></#list>">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>
                            <#else >
                                <a data-page="${apiRelByType[apiTypeId]}.html" href="${apiRelByType[apiTypeId]}.html">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>
                            </#if>
                        </li>
                    </#list>
                    <li class="nav-item"><a data-page="promo.html" href="promo.html">最新優惠</a></li>
                    <li class="nav-item"><a href="javascript:" class="openNewWindow" data-url="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>">在線客服</a>
                    <li class="nav-item"><a href="/commonPage/mobileTopic/index.html?c=blue" target="_blank">手機APP</a></li>
                </ul>
            </div>
        </div>
        <!-- navbar-sub -->
        <div class="navbar-sub">
            <#list data.siteApiTypeI18n?keys as apiTypeId>
                <div class="sub-content" id="sub-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>" rel="sub-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>" style="display:none;">
                    <div class="container">
                        <div class="row row-gutter-0">
                            <div class="col-5-1">
                                <dl class="sub-box rebate">
                                    <dt>
                                        <#if apiTypeId=="1" || apiTypeId=="3">
                                            <span class="num-single" num="1"></span><i class="num-dot"></i><span class="num-decimal" num="2"></span><i class="num-pre"></i>
                                        <#elseif apiTypeId=="2">
                                            <span class="num-single" num="2"></span><i class="num-dot"></i><span class="num-decimal" num="0"></span><i class="num-pre"></i>
                                        <#elseif apiTypeId=="4">
                                            <span class="num-single" num="1"></span><i class="num-dot"></i><span class="num-decimal" num="0"></span><i class="num-pre"></i>
                                        </#if>
                                    </dt>
                                    <dd>
                                        <p>天天返水</p>
                                        <p>最高可達</p>
                                    </dd>
                                </dl>
                            </div>
                            <div class="col-5-4">
                                <div class="api-games-wrap">
                                    <div class="api-games api-games-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>">
                                        <ul class="list-unstyled">
                                        <#if data.siteApiTypeRelationMap['${apiTypeId}']??>
                                            <#list data.siteApiTypeRelationMap['${apiTypeId}'] as relationMap>
                                                <#if apiTypeId!="3" || relationMap.apiId?string.computer!="10">
                                                    <li>
                                                        <dl class="sub-box api-item">
                                                            <dt>
                                                                <a class="_vr_mt_check" data-api="${relationMap.apiId?string.computer}" href="javascript:void(0)" data-apitype="${apiTypeId}"
                                                                    <#if apiTypeId=='2'>
                                                                   data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>"
                                                                   data-mt-ic="_vr_mt_casino_${relationMap.apiId?string.computer}"
                                                                    <#elseif apiTypeId=='3' && relationMap.apiId?string.computer!="10">
                                                                   data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}" data-sports="sports"
                                                                    </#if>
                                                                   <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                                                                   <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                                                    <span class="apiicon <#if apiPrefix[apiTypeId]??>${apiPrefix[apiTypeId]}</#if>-<#if apiMap[relationMap.apiId?string]??>${apiMap[relationMap.apiId?string]}</#if>"></span>
                                                                <#--<#if apiTypeId =='1'><i>${data.siteApiTypeRelationI18n['${apiTypeId}'+relationMap.apiId?string.computer].name}</i></#if>-->
                                                                </a>
                                                            </dt>
                                                            <dd>
                                                                <p><span><#if apiShortDesc[relationMap.apiId?string+"-"+apiTypeId]??>${apiShortDesc[relationMap.apiId?string+"-"+apiTypeId]}</#if></span></p>
                                                                <p><a class="_vr_mt_check _vr_mt_gray _vr_mt_slogan enter-link" data-api="${relationMap.apiId?string.computer}" href="javascript:void(0)" data-apitype="${apiTypeId}"
                                                                    <#if apiTypeId=='2'>
                                                                      data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>"
                                                                    <#elseif apiTypeId=='3' && relationMap.apiId?string.computer!="10">
                                                                      data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}" data-sports="sports"
                                                                    </#if>
                                                                      <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                                                                      <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                                                    <#if apiTypeId =='1' || apiTypeId =='2' || apiTypeId =='4'>${data.siteApiTypeRelationI18n['${apiTypeId}'+relationMap.apiId?string.computer].name}<#else>立即遊戲</#if></a></p>
                                                            </dd>
                                                        </dl>
                                                    </li>
                                                </#if>
                                            </#list>
                                        </#if>
                                        </ul>
                                    </div>
                                    <#if data.siteApiTypeRelationMap['${apiTypeId}']??>
                                        <#assign apiSize = data.siteApiTypeRelationMap['${apiTypeId}']?size>
                                        <#if (apiTypeId=='1'&& apiSize>4) || (apiTypeId !="1" && apiSize>3) >
                                            <a class="api-btn-prev" href="javascript:void(0);"><span class="api-prev"></span></a>
                                            <a class="api-btn-next" href="javascript:void(0);"><span class="api-next"></span></a>
                                        </#if>
                                    </#if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </#list>
        </div>
    </div>
    <!--header-form-->
    <div class="header-form clearfix">
        <div class="container">
            <div class="time pull-left _user_time"></div>
            <!--form-->
            <div class="form-wrap pull-right">
                <div class="_vr_unLogin" style="display:none;">
                    <form class="form-inline">
                        <input type="hidden" name="type" value="top">
                        <div class="form-group account">
                            <input type="text" name="username" maxlength="15" class="form-control" placeholder="會員賬號">
                            <a href="javascript:" onclick="forgetUsername()" class="forget">忘記?</a>
                        </div>
                        <div class="form-group password">
                            <input type="password" name="password" maxlength="20" class="form-control" placeholder="密碼">
                            <a href="javascript:void(0);" class="forget openNewWindow" data-url="commonPage/msiteCommonContent/forgetPwd.html">忘記?</a>
                        </div>
                        <div class="form-group code _vr_captcha_box" style="display: none">
                            <input type="text" class="form-control" name="captcha" maxlength="4" placeholder="驗證碼">
                            <img class="_vr_captcha_code" data-code="loginTop">
                        </div>
                        <a href="javascript:" type="button" class="btn-login _vr_login">立即登入</a>
                        <a href="register.html" class="btn-register">免費註冊</a>
                    </form>
                </div>
                <!--panel-->
                <div class="header-panel _vr_loginSuccess" style="display: none">
                <#include "../../commonPage/zh_TW/msiteCommonContent/loginSuccess.ftl">
                </div>
            </div>
        </div>

    </div>
</header>