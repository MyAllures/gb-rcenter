<#assign apiTypeLottery="4">
<#-- api下的游戏对应的模板数据填充 -->
<#assign game_kg_img_2 = {}>
<#assign game_bb_img_10 = {}>
<#assign game_lt_img_22 = {}>

<#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
    <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
        <#if relationMap.apiId?string.computer == '2'><#--KG-->
            <#assign game_kg_img_2={'kg-AUSkeno.png':'オーストラリアロッテリー','kg-CANkeno.png':'カナダロッテリー','kg-mark6.png':'ロト6','kg-ssc.png':'時々ロト','kg-fast3.png':'快3'}>
        </#if>
        <#if relationMap.apiId?string.computer == '10'><#--BBIN-->
            <#assign game_bb_img_10={'bb-mark6.png':'ロト6','bb-bb3d.png':'BBライブ3Dロト','bb-bbkeno.png':'BB快楽ロト','bb-bbruning.png':'BBローリング王','bb-CQssc.png':'重慶時々ロト','bb-11e5.png':'11から5を','bb-fast3.png':'快3','bb-pk10.png':'北京PK拾','bb-happy10.png':'十分ロト','bb-keno8.png':'快楽8'}>
        </#if>
        <#if relationMap.apiId?string.computer == '22'><#--PG-->
            <#assign game_lt_img_22={'lt-CQssc.png':'重慶時々ロト','lt-pk10.png':'北京PK10','lt-JSfast3.png':'江蘇快3','lt-mark6.png':'香港ロト6','lt-XJssc.png':'新疆時々ロト','lt-TJssc.png':'天津時々ロト'}>
        </#if>
    </#list>
</#if>
<#--各个版本的传奇彩票图片-->
<#assign lotteryApiMap01 = {"2":game_kg_img_2,"10":game_bb_img_10,"22":game_lt_img_22}>
