<#assign apiTypeLottery="4">
<#-- api下的游戏对应的模板数据填充 -->
<#assign game_kg_img_2 = {}>
<#assign game_bb_img_10 = {}>
<#assign game_lt_img_22 = {}>

<#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
    <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
        <#if relationMap.apiId?string.computer == '2' && data.siteLotteries[relationMap.apiId?string.computer]??><#--KG-->
            <#list data.siteLotteries[relationMap.apiId?string.computer] as lottery>
                <#if lottery.code?? && data.siteGameI18ns[lottery.gameId?string.computer]??>
                    <#assign game_kg_img_2 = game_kg_img_2 + {'${lottery.gameId?string.computer}':'${data.siteGameI18ns[lottery.gameId?string.computer].name}'}>
                </#if>
            </#list>
        </#if>
        <#if relationMap.apiId?string.computer == '10' && data.siteLotteries[relationMap.apiId?string.computer]??><#--BBIN-->
            <#list data.siteLotteries[relationMap.apiId?string.computer] as lottery>
                <#if lottery.code?? && data.siteGameI18ns[lottery.gameId?string.computer]??>
                    <#assign game_bb_img_10 = game_bb_img_10 + {'${lottery.gameId?string.computer}':'${data.siteGameI18ns[lottery.gameId?string.computer].name}'}>
                </#if>
            </#list>
        </#if>
        <#if relationMap.apiId?string.computer == '22' && data.siteLotteries[relationMap.apiId?string.computer]??><#--LT-->
            <#list data.siteLotteries[relationMap.apiId?string.computer] as lottery>
                <#if lottery.code?? && data.siteGameI18ns[lottery.gameId?string.computer]??>
                    <#assign game_lt_img_22 = game_lt_img_22 + {'${lottery.gameId?string.computer}':{"name":'${data.siteGameI18ns[lottery.gameId?string.computer].name}',"code":"${lottery.code}"}}/>
                </#if>
            </#list>
        </#if>
    </#list>
</#if>
<#--各个版本的传奇彩票图片-->
<#assign lotteryApiMap01 = {"2":game_kg_img_2,"10":game_bb_img_10,"22":game_lt_img_22}>
