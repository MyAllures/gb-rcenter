<#--API名称-->
<#assign apiMap={"1":"ds","2":"kg","3":"mg","4":"im","5":"gd","6":"pt","7":"og","8":"dw","9":"ag","10":"bb","11":"chq","12":"hg","14":"nyx","15":"hb","16":"ebet","17":"sa","19":"sb","20":"bsg","21":"dwt","22":"lt","23":"opus-s","24":"opus-l","25":"sg","26":"png","27":"dt","28":"gg","31":"gns","32":"prg"}>
<#assign apiMapKeys = apiMap?keys>
<#assign casinoDesc ={"3":"MG GAMING","6":"PT GAMING","9":"AG GAMING","10":"BB GAMING","15":"HB GAMING","20":"BSG GAMING","25":"SG GAMING","26":"PNG GAMING"}>
<#assign casinoDescKeys = casinoDesc?keys>
<#--API Type名称-->
<#assign apiRelByType = {"1":"live","2":"casino","3":"sports","4":"lottery"}>
<#assign apiRelByTypeKeys=apiRelByType?keys>
<#--API Type 链接地址-->
<#assign apiTypeHref={"1":"live.html","2":"casino.html","3":"sports.html","4":"lottery.html"}>
<#assign apiTypeHrefKeys=apiTypeHref?keys>
<#--用于拼写class-->
<#assign apiPrefix={"1":"i","2":"c","3":"s","4":"l"}>

<#--MG游戏 id：游戏id , logo：游戏logo名-->
<#assign MgGames=[{'id':'30608','logo':'01'},{'id':'30749','logo':'02'},{'id':'30754','logo':'03'},{'id':'30652','logo':'04'},{'id':'30650','logo':'05'},{'id':'30781','logo':'06'},{'id':'30601','logo':'07'},{'id':'30602','logo':'08'},{"id":"30643",'logo':'08'}]>
<#--PT游戏 id：游戏id , logo：游戏logo名-->
<#assign PtGames=[{'id':'60098','logo':'01'},{'id':'60086','logo':'02'},{'id':'60214','logo':'03'},{'id':'60228','logo':'04'},{'id':'60062','logo':'05'},{'id':'60073','logo':'06'},{'id':'60211','logo':'07'},{'id':'60084','logo':'08'}]>
<#--AG游戏 id：游戏id -->
<#assign AgGames=[{'id':'90013'},{'id':'90014'},{'id':'90015'},{'id':'90016'},{'id':'90017'},{'id':'90018'},{'id':'90019'},{'id':'90020'}]>
<#--NYX游戏 id：游戏id -->
<#assign NyxGames=[{'id':'140001'},{'id':'140010'},{'id':'140003'},{'id':'140004'},{'id':'140005'},{'id':'140006'},{'id':'140007'},{'id':'140008'}]>
<#--BB游戏 id：游戏id -->
<#assign BbGames=[{'id':'100126'},{'id':'100127'},{'id':'100049'},{'id':'100074'},{'id':'100092'},{'id':'100072'},{'id':'100022'},{'id':'100068'}]>
<#--HB游戏 id：游戏id -->
<#assign HbGames=[{'id':'150001'},{'id':'150006'},{'id':'150008'},{'id':'150009'},{'id':'150013'},{'id':'150017'},{'id':'150001'},{'id':'150006'}]>

<#--热门游戏 id：游戏id , apiId：游戏所属api的Id , logo：游戏logo名-->
<#assign hotGames=[{'id':'30608','apiId':'3','logo':'01'},{'id':'30749','apiId':'3','logo':'02'},{'id':'90014','apiId':'9','logo':'03'},{'id':'100049','apiId':'10','logo':'04'},{'id':'100074','apiId':'10','logo':'05'},{'id':'30631','apiId':'3','logo':'06'},{'id':'90019','apiId':'9','logo':'07'},{'id':'150001','apiId':'15','logo':'08'}]>

<#--apiType是否启用-->
<#assign hasCasino=false>
<#assign hasLive=false>
<#assign hasSports=false>
<#assign hasLottery=false>
<#list data.siteApiTypeI18n?keys as apiTypeId>
    <#if apiTypeId=='1'><#assign hasLive=true></#if>
    <#if apiTypeId=='2'><#assign hasCasino=true></#if>
    <#if apiTypeId=='3'><#assign hasSports=true></#if>
    <#if apiTypeId=='4'><#assign hasLottery=true></#if>
</#list>