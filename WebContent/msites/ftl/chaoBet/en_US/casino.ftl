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
<#assign apiType = "2">
<main class="main-casino">
    <div style="height: 408px;background: url(${data.configInfo.sitePath}/images/casino-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <div class="clearfix"></div>
    <!-- Casino -->
    <section class="casino _vr_casinoSearch">
        <div class="container">
            <div class="casino-box">
                <!-- Api-tabs -->
                <ul class="api-tabs casino-tabs">
                <#if data.siteApiTypeRelationMap??>
                    <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                        <li class="<#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                            <a title="${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}" href="javascript:" class="_vr_getGames"
                               data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">
                                <span class="icon <#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                            </a>
                        </li>
                    </#list>
                </#if>
                </ul>
                <div class="game-list _vr_itemCasino">
                    <#include "casino_partial.ftl">
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/en_US/msiteCommonScript/casinoScript.ftl">
</body>

</html>
