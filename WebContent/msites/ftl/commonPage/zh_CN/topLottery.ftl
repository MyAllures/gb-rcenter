<#assign apiTypeLottery="4">
<#-- api下的游戏对应的模板数据填充 -->
<#assign game_kg_img_2 = {}>
<#assign game_bb_img_10 = {}>
<#assign game_lt_img_22 = {}>

<#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
    <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
        <#if relationMap.apiId?string.computer == '2'><#--KG-->
            <#assign game_kg_img_2={'kg-AUSkeno.png':'澳洲快乐彩','kg-CANkeno.png':'加拿大快乐彩','kg-mark6.png':'六合彩','kg-ssc.png':'时时彩','kg-fast3.png':'快3'}>
        </#if>
        <#if relationMap.apiId?string.computer == '10'><#--BBIN-->
            <#assign game_bb_img_10={'bb-mark6.png':'六合彩','bb-bb3d.png':'BB真人3D彩','bb-bbkeno.png':'BB快乐彩','bb-bbruning.png':'BB滚球王','bb-CQssc.png':'重庆时时彩','bb-11e5.png':'11选5','bb-fast3.png':'快3','bb-pk10.png':'北京PK拾','bb-happy10.png':'十分彩','bb-keno8.png':'快乐8'}>
        </#if>
        <#if relationMap.apiId?string.computer == '22'><#--PG-->
            <#assign game_lt_img_22={'lt-CQssc.png':'重庆时时彩','lt-pk10.png':'北京PK10','lt-JSfast3.png':'江苏快3','lt-mark6.png':'香港六合彩','lt-XJssc.png':'新疆时时彩','lt-TJssc.png':'天津时时彩'}>
        </#if>
    </#list>
</#if>
<#--各个版本的传奇彩票图片-->
<#assign lotteryApiMap01 = {"2":game_kg_img_2,"10":game_bb_img_10,"22":game_lt_img_22}>
