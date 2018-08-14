<#assign lotteryApiMap01 = {}>
<#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
    <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
        <#assign apiId =  relationMap.apiId?string.computer>
        <#assign apiDataStr = {}>
        <#if data.siteLotteries[apiId]??>
            <#list data.siteLotteries[apiId] as lottery>
                <#assign gameId = lottery.gameId?string.computer>
                <#assign gameI18n = data.siteGameI18ns[gameId]!>
                <#if lottery.code?? && gameI18n??>
                    <#assign apiDataStr = apiDataStr + {'${gameId}':{"name":'${gameI18n.name}',"code":"${lottery.code}","gameId":"${gameId}","gameCover":"${gameI18n.cover}"}}/>
                </#if>
            </#list>
        </#if>
        <#assign lotteryApiMap01 = lotteryApiMap01 + {apiId:apiDataStr}>
    </#list>
    <#assign lotteryApiSize = data.siteApiTypeRelationMap[apiTypeLottery]?size >
</#if>
<#assign apiNumPerSlide = lotteryApiSize!0 >