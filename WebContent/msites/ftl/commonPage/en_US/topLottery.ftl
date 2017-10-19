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
        <#if relationMap.apiId?string.computer == '22'><#--LT-->
            <#assign game_lt_img_22={
            <#--'lt-FFssc.png':'分分时时彩',-->'lt-chongqing.png':'重庆时时彩',<#--'lt-LFssc.png':'两分时时彩',-->'lt-beijingPK10.png':'北京PK10',<#--'lt-SFssc.png':'三分时时彩',-->
            'lt-AHfast3.png':'安徽快3','lt-GXfast3.png':'广西快3','lt-JSfast3.png':'江苏快3','lt-HBfast3.png':'湖北快3',<#--'lt-WFssc.png':'五分时时彩',-->
            'lt-HKmark6.png':'香港六合彩','lt-XJssc.png':'新疆时时彩','lt-TJssc.png':'天津时时彩','lt-XYyt.png':'幸运飞艇','lt-XY28.png':'幸运28','lt-XYnc.png':'幸运农场',
            'lt-happy10.png':'快乐10分','lt-beijing-happy8.png':'北京快乐8','lt-FC3d.png':'福彩3D','lt-PL3.png':'排列3'
            }>
        </#if>
    </#list>
</#if>
<#--各个版本的传奇彩票图片-->
<#assign lotteryApiMap01 = {"2":game_kg_img_2,"10":game_bb_img_10,"22":game_lt_img_22}>
