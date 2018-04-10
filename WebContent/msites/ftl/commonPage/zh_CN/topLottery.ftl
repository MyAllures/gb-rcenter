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
        <#if relationMap.apiId?string.computer == '22'><#--LT-->
            <#assign game_lt_img_22={
            <#--'lt-FFssc.png':{"name":'分分时时彩',"type":"ssc","code":"ffssc"},-->
            'lt-chongqing.png':{"name":'重庆时时彩',"type":"ssc","code":"cqssc"},
            <#--'lt-LFssc.png':{"name":'两分时时彩',"type":"ssc","code":"efssc"},-->
            'lt-beijingPK10.png':{"name":'北京PK10',"type":"pk10","code":"bjpk10"},
            <#--'lt-SFssc.png':{"name":'三分时时彩',"type":"ssc","code":"sfssc"},-->
            'lt-AHfast3.png':{"name":'安徽快3',"type":"k3","code":"ahk3"},
            'lt-GXfast3.png':{"name":'广西快3',"type":"k3","code":"gxk3"},
            'lt-JSfast3.png':{"name":'江苏快3',"type":"k3","code":"jsk3"},
            'lt-HBfast3.png':{"name":'湖北快3',"type":"k3","code":"hbk3"},
            <#--'lt-WFssc.png':{"name":'五分时时彩',"type":"ssc","code":"wfssc"},-->
            'lt-HKmark6.png':{"name":'香港六合彩',"type":"lhc","code":"hklhc"},
            'lt-XJssc.png':{"name":'新疆时时彩',"type":"ssc","code":"xjssc"},
            'lt-TJssc.png':{"name":'天津时时彩',"type":"ssc","code":"tjssc"},
            'lt-XYyt.png':{"name":'幸运飞艇',"type":"pk10","code":"xyft"},
            'lt-XY28.png':{"name":'幸运28',"type":"xy28","code":"xy28"},
            'lt-XYnc.png':{"name":'幸运农场',"type":"sfc","code":"cqxync"},
            'lt-happy10.png':{"name":'快乐10分',"type":"sfc","code":"gdkl10"},
            'lt-beijing-happy8.png':{"name":'北京快乐8',"type":"keno","code":"bjkl8"},
            'lt-FC3d.png':{"name":'福彩3D',"type":"pl3","code":"fc3d"},
            'lt-PL3.png':{"name":'排列3',"type":"pl3","code":"tcpl3"},
            'lt-ssc.png':{"name":'分分时时彩',"type":"ssc","code":"ffssc"},
            'lt-jspk10.png':{"name":'极速pk10',"type":"pk10","code":"jspk10"}
            }>
        </#if>
    </#list>
</#if>
<#--各个版本的传奇彩票图片-->
<#assign lotteryApiMap01 = {"2":game_kg_img_2,"10":game_bb_img_10,"22":game_lt_img_22}>
