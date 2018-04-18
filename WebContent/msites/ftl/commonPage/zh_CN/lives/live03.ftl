<style>
    .row.row-match{background: #132842;}
    .live-item, .live-item > .title { border-color: #313346; }
    .live-item { margin: 10px 0; border-width: 1px; border-style: solid; }
    .live-item > .item { height: 315px; display: block; position: relative; background-repeat: no-repeat; background-color: #050505; background-position: right bottom; background-size: 100%; }
    .live-item > .item > .logo { position: absolute; left: 10%; top: 100px; z-index: 9; }
    .live-item > .item > .logo > img { display: block; }
    .live-item > .item > .logo > .title { display: block; color: #666; margin: 3px 0; }
    .live-item > .item > .cover { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 315px; overflow: hidden; z-index: 10; display: none; }
    .live-item > .item > .cover > .blur { position: absolute; width: 100%; height: 315px; left: 0; background-repeat: no-repeat; background-position: right bottom; -webkit-transform: translateZ(0); transform: translateZ(0); -webkit-filter: blur(8px); -moz-filter: blur(8px); filter: blur(8px); filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=8,MakeShadow=false); }
    .live-item > .item > .cover > .hot-list { position: absolute; width: 100%; height: 315px; left: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.3); filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#4d000000,endColorStr=#4d000000); }
    .live-item > .item > .cover > .hot-list > div { height: 158px; }
    .live-item > .item > .row3 > .hot-list > div { height: 106px; }
    .live-item > .item > .cover > .hot-list .btn-live { padding: 25px 0; }
    .live-item > .title { color: #777; line-height: 38px; background: #053269 ; border-top-width: 1px; border-top-style: solid; padding: 20px; overflow: hidden; }
    .live-item > .title span { color: #fff; font-size: 18px; background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(white), to(#a5aaae)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .coming > .title { text-align: center; }
    .live-item > .title > .live-play { width: 146px; height: 46px; font-size: 16px; text-align: center; text-decoration: none; color: #0058de; float: right; display: inline-block;background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAmCAMAAAA/ULM3AAABJlBMVEUAAAAiIiJBPz4BAQE1MzJ4eHgFBQUFBQUfHh5vb28CAgIMDAyJiYkxMC0+Pj7BwcE/Pz80Mi86OjoqKil5eXkzMzEuLSoAAAACAgIPDw/GxsbGxsY5NjOjo6Otra0pKCWdnZ1xcXEyMCy9vb0UFBOUlJQrKyuIiIhmZma1tbWenp51dXVOTk59fX0AAAAcHR0bGxsaGhoAAAAWFhYDAwMZGBgXGBgQEBANDg4TExMMDAwREBAVFBQHBwcFBQUUFRUKCwsUERF4eHhISEgOCgoSDg4SEhIJCQkQDQ0PDAwWFRUNCQkiIB8MBwfp6enPzs6QkJBcW1tNS0onJyb09PS6urqwrK2srKykpKSRjI2GhoZ8fHx6dXRqZGRaVlQuLi5wb29ubm7CtZFvAAAAL3RSTlMABP4Z/tE+EqmMcFj47ubl4eDRw6iiamgxDfzy8url08yvr6mSjIx0X1xZU0AoCnoUxZcAAAKcSURBVFjDxdXXetpAEIbhEdW91/TeExNZQRIrCTlxJCCiu9fk/m8iMwMbwZNTj/ydcfS/z+4CwBkfN4rfM674/N2uAbrPxX4habfbv0YdCjdaSQr94qcvY8HbhRzO43KTalA/xWpQPHR4mFuYLfNBvO7vIa053j3IpLEm6W/k0fDhzwHtN5RSB5SXQTyEgw3v92wejCeFWrNh2yqKItf1vFartS8cTnie6+KgsguPS/D+kgRKMYD3q2nf7rBqGisYodTlLLwcaIHH+7z7VTDWsMIjw+AZLA8dB68BBXUESAu0gRF1NKjhMjysTgl4vyIaKRjBhvoDOK7dE0EfwzGcOY4WEID294RDBSK04Qx6fAquhwZNEDZU/hHqSFA9uEgvAg+HCMKGyoig34K6oFNw7Mh1R0+BBLIG/R5Gj8F1ox6c1vRjyP4t8CmcQjekm5i8CGnD9EXYXeiE/z0G2aYFyu7AUcyGya+loIL3J7+Stn0EHSKkr4ERojEgPQSnA12fj2HKoLvjZd2kwHa6cOL7YTj1T8UMsfTftRY4J3Ae+HFco7vgXwdEUFWx9rk6/SIQoFY7h6sADaE2MEI6BmhBeAXXVuCnBkSgQjiXAFoQX8ONaREixDdJCKUizBUswpRCAArC0PdvYEAEOgiNsJV4tgbEvh8MIGeiwRobGCEfA8YCKwePLNPUB8EKdEjG67xPgMAKCrDqm9qACFYIx/sIYIEVL8KLyOQsUjCDHILFeh738Qaip7CVEEAjWCFfMAZgyQyUV5tmimCGfDzEk83FOTC2hvxBKzJKzw1n5gF2N5PAxDJzmGlBsr5dAjDym7mKeS9VcutzpTyQYX7ltuqYGefs3y692i7lDSBDeefN2sqPjFtam5mb3ykb8BfL4xriLf1aOAAAAABJRU5ErkJggg==);}
    .live-item > .title > .live-play:hover { color: #fef400; }
    .live-item:hover .title { color: #fae39e; }
    .btn-live { display: inline-block; width: 100%; height: 100%; padding: 15px 0; color: #eee; font-size: 16px; text-align: center; border-width: 1px; border-style: solid; border-top-color: #0c0c0c; border-right-color: #0c0c0c; border-bottom-color: #262626; border-left-color: #2b2b2b; border-top-color: rgba(0, 0, 0, 0.7); border-right-color: rgba(0, 0, 0, 0.7); border-bottom-color: rgba(255, 255, 255, 0.1); border-left-color: rgba(255, 255, 255, 0.1); background-color: rgba(0, 0, 0, 0.5); filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#80000000,endColorStr=#80000000); }
    .btn-live:hover { color: #fae39e; text-decoration: none; background-color: rgba(0, 0, 0, 0.3); filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#4d000000,endColorStr=#4d000000); }
    .btn-live > span.gui { display: block; }
</style>

<#--  当前api_type_id = 1 -->
<#assign apiType = "1">
<#-- api图片路径 -->
<#assign bgCover ={"1":"ftl/commonPage/images/lives/live-item-bg-ds.jpg","3":"ftl/commonPage/images/lives/live-item-bg-mg.jpg","5":"ftl/commonPage/images/lives/live-item-bg-gd.jpg","7":"ftl/commonPage/images/lives/live-item-bg-og.jpg","8":"ftl/commonPage/images/lives/live-item-bg-slc.jpg","9":"ftl/commonPage/images/lives/live-item-bg-ag.jpg","10":"ftl/commonPage/images/lives/live-item-bg-bb.jpg","16":"ftl/commonPage/images/lives/live-item-bg-ebet.jpg","17":"ftl/commonPage/images/lives/live-item-bg-sa.jpg","24":"ftl/commonPage/images/lives/live-item-bg-opus.jpg","33":"ftl/commonPage/images/lives/live-item-bg-shenbo.jpg"}>
<#assign bgCoverKeys = bgCover?keys>
<#--api logo-->
<#assign apiLogo ={"1":"ftl/commonPage/images/lives/live-logo-ds.png","3":"ftl/commonPage/images/lives/live-logo-mg.png","5":"ftl/commonPage/images/lives/live-logo-gd.png","7":"ftl/commonPage/images/lives/live-logo-og.png","8":"ftl/commonPage/images/lives/live-logo-slc.png","9":"ftl/commonPage/images/lives/live-logo-ag.png","10":"ftl/commonPage/images/lives/live-logo-bb.png","16":"ftl/commonPage/images/lives/live-logo-ebet.png","17":"ftl/commonPage/images/lives/live-logo-sa.png","24":"ftl/commonPage/images/lives/live-logo-opus.png","33":"ftl/commonPage/images//lives/live-logo-shenbo.png"}>
<#assign logoKeys = apiLogo?keys>

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
<#--10-->
<#assign api10 ={'lineSize':[4,4,4],'game':{"百家乐":"poker1","骰宝":"dice1","龙虎斗":"poker2","牛牛":"spade-fill","无限21点":"chip2","番摊":"coin-cny","三公":"poker1","二八杠":"dice1","轮盘":"roulette3","色碟":"chip1","德州扑克":"poker2","温州牌九":"dice1"}}>
<#assign api10Keys = api10?keys>
<#--33-->
<#assign api33 ={'lineSize':[3,4],'game':{"百家乐":"poker1","星级百家乐":"poker2","互动多合一":"roulette4","龙虎":"dragon-tiger","轮盘":"roulette3","三公":"poker1","骰宝":"dice1"}}>
<#assign api33Keys = api33?keys>

<#assign liveApis={"1":api1,"3":api3,"5":api5,"7":api7,"8":api8,"9":api9,"10":api10,"16":api16,"17":api17,"24":api24,"33":api33}>
<#assign liveLogos = {"1":"ds","5":"gd","7":"og","9":"ag","10":"bb","16":"ebet","17":"sa","24":"opus-l","33":"shenbo"}>
<#assign liveLogoDescs = {"1":"服务至上的亚洲线上赌场","3":"VIP贵宾厅，至尊享受","5":"全球口碑最好平台之一","7":"东南亚最大赌场","9":"全球唯一女优发牌","10":"亚洲最知名游戏平台","16":"亚洲技术领先的新晋赌场","17":"亚洲服务最好娱乐平台","24":"欧洲最流行的线上娱乐平台","33":"全球娱乐领先博彩之一"}>
<#assign liveScript02=true>

<div class="row row-match">
<#if data.siteApiTypeRelationMap['1']?exists>
    <#list data.siteApiTypeRelationMap['1'] as relationMap>
        <#if liveApis[relationMap.apiId?string.computer]??>
            <div class="col-3-1">
                <figure class="live-item <#if liveLogos[relationMap.apiId?string.computer]??>${liveLogos[relationMap.apiId?string.computer]}</#if>">
                    <div class="item" style="background-image: url(<#list bgCoverKeys as key><#if key == relationMap.apiId?string.computer>${bgCover[key]}</#if></#list>)">
                        <div class="logo">
                            <img src="<#list logoKeys as key><#if key == relationMap.apiId?string.computer>${apiLogo[key]}</#if></#list>">
                            <h5 class="title"><#if liveLogoDescs[relationMap.apiId?string.computer]??>${liveLogoDescs[relationMap.apiId?string.computer]}</#if></h5>
                        </div>
                        <div class="cover">
                            <div class="blur" style="background-image: url(<#list logoKeys as key><#if key == relationMap.apiId?string.computer>${apiLogo[key]}</#if></#list>);"></div>
                            <div class="row row-gutter-0 hot-list">
                                <#list liveApis[relationMap.apiId?string.computer]["game"]?keys as key>
                                    <#assign countSize = 0>
                                    <div class="<#list liveApis[relationMap.apiId?string.computer]['lineSize'] as size><#assign countSize = countSize+size><#if key_index<countSize>col-${size}-1<#break ></#if></#list>">
                                        <a class="btn-live _vr_mt_check" href="javascript:"
                                           data-api="${relationMap.apiId?string.computer}" data-apitype="${apiType}"
                                           startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                                           endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">
                                            <span class="gui gui-2x gui-${liveApis[relationMap.apiId?string.computer]['game'][key]}"></span>
                                        ${key}
                                        </a>
                                    </div>
                                </#list>
                            </div>
                        </div>
                    </div>
                    <figcaption class="title">
                        ${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}
                        <a class="live-play _vr_mt_check _vr_mt_slogan" href="javascript:"
                           data-api="${relationMap.apiId?string.computer}" data-apitype="${apiType}"
                           startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                           endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">开始游戏</a>
                    </figcaption>
                </figure>
            </div>
        </#if>
    </#list>
</#if>
<#if data.siteApiTypeRelationMap['1']?size%3!=0>
    <#list 1..(3-data.siteApiTypeRelationMap['1']?size%3) as t>
        <div class="col-3-1">
            <figure class="live-item coming">
                <div class="item" style="background-image: url(ftl/commonPage/images/lives/live-item-bg-coming.jpg);">
                </div>
                <figcaption class="title">敬请期待</figcaption>
            </figure>
        </div>
    </#list>
</#if>
</div>
