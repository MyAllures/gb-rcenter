<#assign apiTypeLottery="4">
<#-- api下的游戏对应的模板数据填充 -->
<#assign game_kg_img_2 = {}>
<#assign game_bb_img_10 = {}>
<#assign game_lt_img_22 = {}>

<#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
    <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
        <#if relationMap.apiId?string.computer == '2'><#--KG-->
            <#assign game_kg_img_2={'kg-AUSkeno.png':'BC KENO','kg-CANkeno.png':'BC KENO','kg-mark6.png':'Mark Six','kg-ssc.png':'Lottos','kg-fast3.png':'Jiangsu Fast 3'}>
        </#if>
        <#if relationMap.apiId?string.computer == '10'><#--BBIN-->
            <#assign game_bb_img_10={'bb-mark6.png':'Mark Six','bb-bb3d.png':'BB 3D','bb-bbkeno.png':'BB KENO','bb-bbruning.png':'BB Running','bb-CQssc.png':'Chongqing Lotto','bb-11e5.png':'11/5','bb-fast3.png':'Fast 3','bb-pk10.png':'Beijing PK10','bb-happy10.png':'Happy 10','bb-keno8.png':'Beijing KENO'}>
        </#if>
        <#if relationMap.apiId?string.computer == '22'><#--PG-->
            <#assign game_lt_img_22={'lt-CQssc.png':'Chongqing Lotto','lt-pk10.png':'Beijing PK10','lt-JSfast3.png':'Jiangsu Fast 3','lt-mark6.png':'HongKong Mark Six','lt-XJssc.png':'XinJiang Lotto','lt-TJssc.png':'TianJin Lotto'}>
        </#if>
    </#list>
</#if>
<#--各个版本的传奇彩票图片-->
<#assign lotteryApiMap01 = {"2":game_kg_img_2,"10":game_bb_img_10,"22":game_lt_img_22}>
