<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
</head>

<body>
<#include "top.ftl">
<main class="main-home">
    <!--轮播-->
    <div class="slide home-slide">
        <div class="slide-inner">
            <ul>
            <#include "../../commonPage/commonContent/indexCarousels.ftl">
            </ul>
        </div>
        <div class="slide-indicators">
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
    <!-- notice -->
<#include "notice.ftl">
    <!--game-type-->
    <div class="game-type">
        <div class="container">
            <div class="game-type-wrap">
                <div class="blo blo-sports">
                    <div class="tit"><span>体育竞技</span></div>
                    <div class="shadow">
                        <div class="icon-wrap">
                        <#if data.siteApiTypeRelationMap['3']?exists>
                            <#list data.siteApiTypeRelationMap['3'] as relationMap>
                                <#if relationMap.apiId?string.computer!="10">
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]??>
                                        <a class="_vr_mt_check" data-href="sports.html?apiId=${relationMap.apiId}" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="3"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['3'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#if>
                            </#list>
                        </#if>
                        </div>
                        <a href="sports.html" class="btn-tz">立即投注</a>
                    </div>
                    <div class="lig lig1"></div>
                </div>
                <div class="blo blo-casino">
                    <div class="tit"><span>电子游艺</span></div>
                    <div class="shadow">
                        <div class="icon-wrap">
                            <div class="d1">
                            <#if data.siteApiTypeRelationMap['2']?exists>
                                <#list data.siteApiTypeRelationMap['2'] as relationMap>
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]?? && relationMap_index &lt; 3>
                                        <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}&gameTag=hot_game" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="2"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['2'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#list>
                            </#if>
                            </div>
                            <div class="d2">
                            <#if data.siteApiTypeRelationMap['2']?exists>
                                <#list data.siteApiTypeRelationMap['2'] as relationMap>
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]?? && relationMap_index &gt; 2 && relationMap_index &lt; 6>
                                        <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}&gameTag=hot_game" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="2"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['2'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#list>
                            </#if>
                            </div>
                            <div class="d3">
                            <#if data.siteApiTypeRelationMap['2']?exists>
                                <#list data.siteApiTypeRelationMap['2'] as relationMap>
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]?? && relationMap_index &gt; 5 && relationMap_index &lt; 9>
                                        <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}&gameTag=hot_game" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="2"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['2'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#list>
                            </#if>
                            </div>
                        </div>
                        <a href="casino.html?apiType=2&apiId=<#list data.siteApiTypeRelationMap['2'] as relationMap><#if relationMap_index==0>${relationMap.apiId?string}</#if></#list>&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>" class="btn-tz">立即投注</a>
                    </div>
                    <div class="lig lig2"></div>
                </div>
                <div class="blo blo-live">
                    <div class="tit"><span>真人视讯</span></div>
                    <div class="shadow">
                        <div class="icon-wrap">
                            <div class="d1">
                            <#if data.siteApiTypeRelationMap['1']?exists>
                                <#list data.siteApiTypeRelationMap['1'] as relationMap>
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]?? && relationMap_index &lt; 3>
                                        <a class="_vr_mt_check" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="1"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['1'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#list>
                            </#if>
                            </div>
                            <div class="d2">
                            <#if data.siteApiTypeRelationMap['1']?exists>
                                <#list data.siteApiTypeRelationMap['1'] as relationMap>
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]?? && relationMap_index &gt; 2 && relationMap_index &lt; 6>
                                        <a class="_vr_mt_check" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="1"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['1'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#list>
                            </#if>
                            </div>
                            <div class="d3">
                            <#if data.siteApiTypeRelationMap['1']?exists>
                                <#list data.siteApiTypeRelationMap['1'] as relationMap>
                                    <#if data.siteApiMap["${relationMap.apiId?string.computer}"]?? && relationMap_index &gt; 5 && relationMap_index &lt; 9>
                                        <a class="_vr_mt_check" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="1"
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                           <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                            <span class="icon-game">${data.siteApiTypeRelationI18n['1'+relationMap.apiId?string.computer].name}</span></a>
                                    </#if>
                                </#list>
                            </#if>
                            </div>
                        </div>
                        <a href="live.html" class="btn-tz">立即投注</a>
                    </div>
                    <div class="lig lig3"></div>
                </div>
                <div class="blo blo-lottery">
                    <div class="tit"><span>彩票游戏</span></div>
                    <div class="shadow">
                        <div class="icon-wrap">
                        <#if data.siteApiTypeRelationMap['4']?exists>
                            <#list data.siteApiTypeRelationMap['4'] as relationMap>
                                <#if data.siteApiMap["${relationMap.apiId?string.computer}"]??>
                                    <a class="_vr_mt_check" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="4"
                                       <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?has_content>startTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?has_content>endTime="${data.siteApiMap["${relationMap.apiId?string.computer}"].maintainEndTime?long?string.computer}"</#if>>
                                        <span class="icon-game">${data.siteApiTypeRelationI18n['4'+relationMap.apiId?string.computer].name}</span></a>
                                </#if>
                            </#list>
                        </#if>
                        </div>
                        <a href="lottery.html" class="btn-tz">立即投注</a>
                    </div>
                    <div class="lig lig4"></div>
                </div>
            </div>
        </div>
    </div>
    <!--service-adv-->
    <div class="service-adv">
        <div class="container">
            <div class="pic"></div>
            <div class="col-4-1">
                <div class="pull-left">
                    <div class="t1">存款到帐</div>
                    <div class="t2">平均时间</div>
                </div>
                <div class="big-t"><span id="n1"></span><span class="unit">秒</span></div>
            </div>
            <div class="col-4-1">
                <div class="pull-left">
                    <div class="t1">取款到帐</div>
                    <div class="t2">平均时间</div>
                </div>
                <div class="big-t"><span id="n2"></span><span class="unit">秒</span></div>
            </div>
            <div class="col-4-1">
                <div class="pull-left">
                    <div class="t1">便捷的银行服务</div>
                    <div class="t2">合作支付平台</div>
                </div>
                <div class="big-t"><span id="n3"></span><span class="unit">家</span></div>
            </div>
            <div class="col-4-1">
                <div class="pull-left">
                    <div class="t1">合作游戏投注平台</div>
                    <div class="t2">数量超过</div>
                </div>
                <div class="big-t"><span id="n4"></span><span class="unit">家</span></div>
            </div>
        </div>
    </div>
    <!--phone-visit-->
    <div class="phone-visit">
        <div class="container">
        </div>
        <div class="txt-wrap">
            <div class="phone-txt">
                <span class="typed-txt"></span>
            </div>
            <a href="/commonPage/mobileTopic/download.html?c=blue" class="mobile-link">使用移动设备，直接访问开启精彩手机投注之旅 </a>
        </div>
    </div>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/indexAds.ftl">
<#include "script.ftl">
<script src="${data.configInfo.sitePath}/js/typed.min.js" type="text/javascript" charset="utf-8"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/countUp/countUp.js"></script>
<script>
    $(function () {
        homeDialog();
        var once = true, once2 = true;// 只执行一次
        $(document).scroll(function () {
            if ($(document).scrollTop() > 682) {
                if (once === false) {
                    return;
                }
                // 文字输入效果
                $(".typed-txt").typed({
                    strings: ["我们的手机投注平台面向全网玩家，提供近百款老虎机·百家乐·以及彩票游戏投注，线上存款及线上取款，一键操作，运用3D即时运算创造真实场景结合立体影像，完整规划的跨系统娱乐平台，整合同步账号和资料传输，达到随时随地不间断娱乐的享受概念。"],
                    typeSpeed: 0
                });
                once = false;
            }
            // 服务优势处文字效果
            if ($(window).scrollTop() > 490) {
                if (once2 == false) {
                    return;
                }
                var demo1 = new CountUp("n1", 0, 60, 0, 2.5);
                demo1.start();
                var demo2 = new CountUp("n2", 0, 60, 0, 2.5);
                demo2.start();
                var demo3 = new CountUp("n3", 0, 100, 0, 2.5);
                demo3.start();
                var demo4 = new CountUp("n4", 0, 50, 0, 2.5);
                demo4.start();
                once2 = false;
            }
        });
    });
</script>
</body>

</html>
