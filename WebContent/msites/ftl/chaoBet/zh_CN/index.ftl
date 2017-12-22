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
            <#if data.carousels??>
                <#list data.carousels as carousel>
                    <#if carousel["type"]="carousel_type_index" >
                        <li class="_vr_carousels_check"
                            starttime="<#if carousel['start_time']??>${carousel['start_time']?long?string.computer}</#if>"
                            endtime="<#if carousel['end_time']??>${carousel['end_time']?long?string.computer}</#if>"
                            data-src="url(${imgPath(data.configInfo.domain,carousel.cover)})" style="background:center bottom no-repeat;">
                            <#if carousel['link']?has_content><a target="_blank" href="${carousel['link']}"></a></#if>
                        </li>
                    </#if>
                </#list>
            </#if>
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
                            <#if data.siteApiMap["4"]??>
                                <a class="_vr_mt_check" data-href="sports.html?apiId=4" href="javascript:void(0)" data-api="4" data-apitype="3"
                                   <#if data.siteApiMap["4"].maintainStartTime?has_content>startTime="${data.siteApiMap["4"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["4"].maintainEndTime?has_content>endTime="${data.siteApiMap["4"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">IM体育</span></a>
                            </#if>
                            <#if data.siteApiMap["12"]??>
                                <a class="_vr_mt_check" data-href="sports.html?apiId=12" href="javascript:void(0)" data-api="12" data-apitype="3"
                                   <#if data.siteApiMap["12"].maintainStartTime?has_content>startTime="${data.siteApiMap["12"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["12"].maintainEndTime?has_content>endTime="${data.siteApiMap["12"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">皇冠体育</span></a>
                            </#if>
                            <#if data.siteApiMap["19"]??>
                                <a class="_vr_mt_check" data-href="sports.html?apiId=19" href="javascript:void(0)" data-api="19" data-apitype="3"
                                   <#if data.siteApiMap["19"].maintainStartTime?has_content>startTime="${data.siteApiMap["19"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["19"].maintainEndTime?has_content>endTime="${data.siteApiMap["19"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">沙巴体育</span></a>
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
                                <#if data.siteApiMap["10"]??>
                                    <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=10&gameTag=hot_game" href="javascript:void(0)" data-api="10" data-apitype="2"
                                       <#if data.siteApiMap["10"].maintainStartTime?has_content>startTime="${data.siteApiMap["10"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["10"].maintainEndTime?has_content>endTime="${data.siteApiMap["10"].maintainEndTime?long?string.computer}"</#if>>
                                        <span class="icon-game">BBIN</span></a>
                                </#if>
                                <#if data.siteApiMap["3"]??>
                                    <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=3&gameTag=hot_game" href="javascript:void(0)" data-api="3" data-apitype="2"
                                       <#if data.siteApiMap["3"].maintainStartTime?has_content>startTime="${data.siteApiMap["3"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["3"].maintainEndTime?has_content>endTime="${data.siteApiMap["3"].maintainEndTime?long?string.computer}"</#if>>
                                        <span class="icon-game">MG电子</span></a>
                                </#if>
                                <#if data.siteApiMap["6"]??>
                                    <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=6&gameTag=hot_game" href="javascript:void(0)" data-api="6" data-apitype="2"
                                       <#if data.siteApiMap["6"].maintainStartTime?has_content>startTime="${data.siteApiMap["6"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["6"].maintainEndTime?has_content>endTime="${data.siteApiMap["6"].maintainEndTime?long?string.computer}"</#if>>
                                        <span class="icon-game">PT电子</span></a>
                                </#if>
                            </div>
                            <div class="d2">
                            <#if data.siteApiMap["9"]??>
                                <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=9&gameTag=hot_game" href="javascript:void(0)" data-api="9" data-apitype="2"
                                   <#if data.siteApiMap["9"].maintainStartTime?has_content>startTime="${data.siteApiMap["9"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["9"].maintainEndTime?has_content>endTime="${data.siteApiMap["9"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">AG电子</span></a>
                            </#if>
                            <#if data.siteApiMap["15"]??>
                                <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=15&gameTag=hot_game" href="javascript:void(0)" data-api="15" data-apitype="2"
                                   <#if data.siteApiMap["15"].maintainStartTime?has_content>startTime="${data.siteApiMap["15"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["15"].maintainEndTime?has_content>endTime="${data.siteApiMap["15"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">HB电子</span></a>
                            </#if>
                            </div>
                        </div>
                        <a href="casino.html" class="btn-tz">立即投注</a>
                    </div>
                    <div class="lig lig2"></div>
                </div>
                <div class="blo blo-live">
                    <div class="tit"><span>真人视讯</span></div>
                    <div class="shadow">
                        <div class="icon-wrap">
                            <div class="d1">
                                <a href="live.html"><span class="icon-game">MG真人</span></a>
                                <a href="live.html"><span class="icon-game">BBIN</span></a>
                                <a href="live.html"><span class="icon-game">AG真人</span></a>
                            </div>
                            <div class="d2">
                                <a href="live.html"><span class="icon-game">OG真人</span></a>
                                <a href="live.html"><span class="icon-game">GD真人</span></a>
                                <a href="live.html"><span class="icon-game">SA真人</span></a>
                            </div>
                            <div class="d3">
                                <a href="live.html"><span class="icon-game">EBET真人</span></a>
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
                            <#if data.siteApiMap["2"]??>
                                <a href="javascript:" class="_vr_mt_check" data-api="2" data-apitype="4"
                                   <#if data.siteApiMap["2"].maintainStartTime?has_content>startTime="${data.siteApiMap["2"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["2"].maintainEndTime?has_content>endTime="${data.siteApiMap["2"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">KG彩票</span></a>
                            </#if>
                            <#if data.siteApiMap["10"]??>
                                <a href="javascript:" class="_vr_mt_check" data-api="10" data-apitype="4"
                                   <#if data.siteApiMap["10"].maintainStartTime?has_content>startTime="${data.siteApiMap["10"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["10"].maintainEndTime?has_content>endTime="${data.siteApiMap["10"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">BBIN</span></a>
                            </#if>
                            <#if data.siteApiMap["11"]??>
                                <a href="javascript:" class="_vr_mt_check" data-api="11" data-apitype="4"
                                   <#if data.siteApiMap["11"].maintainStartTime?has_content>startTime="${data.siteApiMap["11"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["11"].maintainEndTime?has_content>endTime="${data.siteApiMap["11"].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="icon-game">传奇彩票</span></a>
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
<#include "../../commonPage/zh_CN/ads/indexAds.ftl">
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
