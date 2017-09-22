<style>
.accordion-wrap{border:3px solid #00a0e6; padding:20px; background: #222;}
.live-accordion{height:650px;overflow:hidden;margin-bottom: 0;}
.live-accordion>li{float:left;height:650px;position:relative;overflow:hidden;background-repeat:no-repeat;background-position:center 0;}
.live-accordion>li>.mask{position:absolute;overflow:hidden;width:100%;height:100%;z-index: 11;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiEBQU3AwQYAABUQDn8rOpmgAAAABJRU5ErkJggg==);}
.live-accordion>li>.mask>img{position: absolute;display: block; bottom: 20px;}
.live-accordion>li>.mask>.title{position: absolute;display: block; bottom: 80px; right: 10px; color: #eee; font-weight: bold; font-size: 16px;}
.live-accordion>li>.logo{position:absolute;height:100px;left:20px;top:20px;z-index: 12;display: none;}
.live-accordion>li>.cover{position:absolute;left:0;right:0;bottom:0;width:100%;height:200px;overflow:hidden;z-index:10;display:none;}
.live-accordion>li>.cover.row3{height:240px;}
.live-accordion>li>.cover>.blur{position:absolute;width:100%;height:200px;left:0;background-repeat:no-repeat;background-position:center bottom;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-filter:blur(8px);-moz-filter:blur(8px);filter:blur(8px);filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius=8,MakeShadow=false);}
.live-accordion>li>.row3>.blur{height:240px;}
.live-accordion>li>.cover>.hot-list{height:200px;left:0;bottom:0;width:100%;background-color:rgba(0,0,0,.3);filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#4d000000,endColorStr=#4d000000);}
.live-accordion>li>.row3>.hot-list{height:240px;}
.live-accordion>li>.cover>.hot-list > div{height:100px;}
.live-accordion>li>.row3>.hot-list > div{height:80px;}
.live-accordion>li>.link{position:absolute;overflow:hidden;width:100%;height:100%;z-index: 10;}
.live-accordion>li>.link>a{width:100%;height:100%;display: block;}
.btn-live{display:inline-block;width:100%;height:100%;padding:15px 0;color:#eee;font-size:16px;text-align:center;border-width:1px;border-style:solid;border-top-color:#0c0c0c;border-right-color:#0c0c0c;border-bottom-color:#262626;border-left-color:#2b2b2b;border-top-color:rgba(0,0,0,.7);border-right-color:rgba(0,0,0,.7);border-bottom-color:rgba(255,255,255,.1);border-left-color:rgba(255,255,255,.1);background-color:rgba(0,0,0,0.5);filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#80000000,endColorStr=#80000000);}
.btn-live:hover{color:#fae39e;text-decoration:none;background-color:rgba(0,0,0,0.3);filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#4d000000,endColorStr=#4d000000);}
.btn-live>span.gui{display:block;}
</style>

<#--  当前api_type_id = 1 -->
<#assign apiType = "1">
<#-- api图片路径 -->
<#assign bgCover ={"1":"ftl/commonPage/images/live-item-ds.jpg","3":"ftl/commonPage/images/live-item-mg.jpg","5":"ftl/commonPage/images/live-item-gd.jpg","7":"ftl/commonPage/images/live-item-og.jpg","8":"ftl/commonPage/images/live-item-slc.jpg","9":"ftl/commonPage/images/live-item-ag.jpg","10":"ftl/commonPage/images/live-item-bb.jpg","16":"ftl/commonPage/images/live-item-ebet.jpg","17":"ftl/commonPage/images/live-item-sa.jpg","24":"ftl/commonPage/images/live-item-opus.jpg"}>
<#assign bgCoverKeys = bgCover?keys>
<#--api logo-->
<#assign apiLogo ={"1":"ftl/commonPage/images/live-logo-ds.png","3":"ftl/commonPage/images/live-logo-mg.png","5":"ftl/commonPage/images/live-logo-gd.png","7":"ftl/commonPage/images/live-logo-og.png","8":"ftl/commonPage/images/live-logo-slc.png","9":"ftl/commonPage/images/live-logo-ag.png","10":"ftl/commonPage/images/live-logo-bb.png","16":"ftl/commonPage/images/live-logo-ebet.png","17":"ftl/commonPage/images/live-logo-sa.png","24":"ftl/commonPage/images/live-logo-opus.png"}>
<#assign logoKeys = apiLogo?keys>
<#--10-->
<#assign api10 ={'lineSize':[4,4,4],'game':{"百家乐":"poker1","骰宝":"dice1","龙虎斗":"poker2","牛牛":"spade-fill","无限21点":"chip2","番摊":"coin-cny","三公":"poker1","二八杠":"dice1","轮盘":"roulette3","色碟":"chip1","德州扑克":"poker2","温州牌九":"dice1"}}>
<#assign api10Keys = api10?keys>
<#--9-->
<#assign api9 ={'lineSize':[3,4],'game':{"旗舰厅":"poker1","国际厅":"dice1","贵宾厅":"poker2","百家乐":"spade-fill","龙虎斗":"chip2","轮盘":"coin-cny","骰宝":"poker1"}}>
<#assign api9Keys = api9?keys>
<#--7-->
<#assign api7 ={'lineSize':[3,3],'game':{"连环百家乐":"poker1","百家乐":"dice1","龙虎斗":"poker2","骰宝":"spade-fill","番摊":"chip2","轮盘":"coin-cny"}}>
<#assign api7Keys = api7?keys>
<#--5-->
<#assign api5 ={'lineSize':[2,2],'game':{"3D百家乐":"poker1","多台百家乐":"dice1","多彩百家乐":"poker2","轮盘":"spade-fill"}}>
<#assign api5Keys = api5?keys>
<#--3-->
<#assign api3 ={'lineSize':[3,4],'game':{"龙虎百家乐":"poker2","百家乐":"poker1","骰宝":"spade-fill","轮盘":"coin-cny","21点":"chip2","德州扑克":"poker2","PLAYBOY":"heart-fill"}}>
<#assign api3Keys = api3?keys>
<#--8-->
<#assign api8 ={'lineSize':[3,3],'game':{"百家乐":"poker1","保险百家乐":"dice1","番摊":"poker2","龙虎斗":"spade-fill","色碟":"poker1","轮盘":"dice1","色碟":"poker2","骰宝":"poker1","鱼虾蟹骰宝":"dice1"}}>
<#assign api8Keys = api8?keys>
<#--1-->
<#assign api1 ={'lineSize':[2,3],'game':{"百家乐":"poker1","轮盘":"dice1","龙虎":"poker2","骰宝":"spade-fill","斗牛":"spade-fill"}}>
<#assign api1Keys = api1?keys>
<#--16-->
<#assign api16 ={'lineSize':[2,3],'game':{"竞咪百家乐":"poker1","龙虎":"dragon-tiger","百家乐":"poker2","轮盘":"roulette3","骰宝":"dice1"}}>
<#assign api16Keys = api16?keys>
<#--17-->
<#assign api17 ={'lineSize':[2,3],'game':{"百家乐":"poker1","龙虎":"dragon-tiger","轮盘":"roulette3","骰宝":"dice1","番摊":"chip2"}}>
<#assign api17Keys = api17?keys>
<#--24-->
<#assign api24 ={'lineSize':[2,2],'game':{"七喜百家乐":"poker1","骰宝":"dice1","龙虎":"dragon-tiger","轮盘":"roulette3"}}>
<#assign api24Keys = api24?keys>

<#assign liveApis={"1":api1,"3":api3,"5":api5,"7":api7,"8":api8,"9":api9,"10":api10,"16":api16,"17":api17,"24":api24}>

<#assign liveScript01=true>

<div class="accordion-wrap">
    <ul class="list-unstyled live-accordion">
        <#if data.siteApiTypeRelationMap['1']?exists>
            <#list data.siteApiTypeRelationMap['1'] as relationMap>
                <#if liveApis[relationMap.apiId?string.computer]??>
                    <li class="_vr_mt_check _vr_mt_no" data-api="${relationMap.apiId?string.computer}" data-mt-ic="_vr_live_${relationMap.apiId?string.computer}" style="background-image: url(<#list bgCoverKeys as key><#if key == relationMap.apiId?string.computer>${bgCover[key]}</#if></#list>)"
                        startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                        endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">
                        <div class="mask">
                            <img src="<#list logoKeys as key><#if key == relationMap.apiId?string.computer>${apiLogo[key]}</#if></#list>">
                            <h3 class="title _vr_mt_gray">${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}<span class="_vr_mt_ptSlogan"></span></h3>
                        </div>
                        <div class="logo">
                            <img src="<#list logoKeys as key><#if key == relationMap.apiId?string.computer>${apiLogo[key]}</#if></#list>">
                        </div>
                        <div class="link">
                            <a href="javascript:" class="_vr_mt_check" data-apitype="1" data-api="${relationMap.apiId?string.computer}" data-mt-ic="_vr_live_${relationMap.apiId?string.computer}"
                               startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                               endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">
                            </a>
                        </div>
                        <div class="cover row${liveApis[relationMap.apiId?string.computer]['lineSize']?size}">
                            <div class="blur" style="background-image: url(<#list bgCoverKeys as key><#if key == relationMap.apiId?string.computer>${bgCover[key]}</#if></#list>);"></div>
                            <div class="row row-gutter-0 hot-list _vr_live_${relationMap.apiId?string.computer}">
                                <#list liveApis[relationMap.apiId?string.computer]["game"]?keys as key>
                                    <#assign countSize = 0>
                                        <div class="<#list liveApis[relationMap.apiId?string.computer]['lineSize'] as size><#assign countSize = countSize+size><#if key_index<countSize>col-${size}-1<#break ></#if></#list>">
                                            <a class="_vr_mt_check btn-live" href="javascript:"
                                               data-api="${relationMap.apiId?string.computer}" data-apitype="${apiType}" data-mt-ic="_vr_live_${relationMap.apiId?string.computer}"
                                               startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                                               endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">
                                                <span class="gui gui-2x gui-${liveApis[relationMap.apiId?string.computer]['game'][key]}"></span>
                                                ${key}
                                            </a>
                                        </div>
                                </#list>
                            </div>
                        </div>
                    </li>
                </#if>
            </#list>
        </#if>
    </ul>
</div>

