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
<main>
    <div class="container">
        <div class="side-nav">
            <h2>选择彩种</h2>
            <ul class="side-nav-01">
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="tjssc"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/tjssc.png"/>天津时时彩<i class="lot-des">最火爆彩种</i></a></li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="cqssc"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/ico16.png"/>重庆时时彩<i class="lot-des">最火爆彩种</i></a></li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="bjpk10"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/ico18.png"/>北京PK10<i class="lot-des">5分钟一期 快速</i></a>
                </li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="xjssc"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/xjssc.png"/>新疆时时彩<i class="lot-des">最火爆彩种</i></a></li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="lhc" data-lottery-code="hklhc"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/ico17.png"/>六合彩<i class="lot-des">火爆低频 每周三期</i></a></li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="ahk3"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/ahk3.png"/>安徽快3<i class="lot-des">10分钟一期</i></a></li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="gxk3"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/gxk3.png"/>广西快3<i class="lot-des">10分钟一期 快速</i></a></li>
                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="hbk3"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>><img
                        src="${data.configInfo.sitePath}/images/hbk3.png"/>湖北快3<i class="lot-des">10分钟一期</i></a></li>
            </ul>
            <div class="gpc">
                <div class="tit"><img src="${data.configInfo.sitePath}/images/ico79.png"/>高 频 彩</div>
                <ul class="list-unstyled list-inline fir_ul">
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="tjssc"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="xjssc"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="ahk3"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="gxk3"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>广西快3</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="hbk3"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="jsk3"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="bjpk10"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="cqssc"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                    </li>
                </ul>
                <div class="ext-menu">
                    <h5>高频彩</h5>
                    <ul>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="bjpk10"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="jspk10"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>极速PK10</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="xyft"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运飞艇</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="cqssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="tjssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="xjssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="ffssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>分分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="efssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>两分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="sfssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>三分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="wfssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>五分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="jsk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="hbk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="ahk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="jlk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>吉林快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="sfc" data-lottery-code="cqxync"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆幸运农场</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="sfc" data-lottery-code="gdkl10"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>广东快乐十分</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="keno" data-lottery-code="bjkl8"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京快乐8</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="xy28" data-lottery-code="xy28"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运28</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dpc">
                <div class="tit"><img src="${data.configInfo.sitePath}/images/ico80.png"/>低频彩</div>
                <ul class="list-unstyled list-inline fir_ul">
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="lhc" data-lottery-code="hklhc"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pl3" data-lottery-code="fc3d"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>福彩3D</a>
                    </li>
                    <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pl3" data-lottery-code="tcpl3"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>体彩排列3</a>
                    </li>
                </ul>
                <div class="ext-menu">
                    <h5>低频彩</h5>
                    <ul>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="lhc" data-lottery-code="hklhc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pl3" data-lottery-code="fc3d"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>福彩3D</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pl3" data-lottery-code="tcpl3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>体彩排列3</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="qb">
                <h3>全部&gt;&gt;</h3>
                <div class="ext-menu">
                    <h5>全部</h5>
                    <ul>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="bjpk10"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="jspk10"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>极速PK10</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="xyft"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运飞艇</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pk10" data-lottery-code="xyft"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="tjssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="xjssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="ffssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>分分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="efssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>两分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="sfssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>三分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="ssc" data-lottery-code="wfssc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>五分时时彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="jsk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="hbk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="ahk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="k3" data-lottery-code="jlk3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>吉林快3</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="sfc" data-lottery-code="cqxync"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆幸运农场</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="sfc" data-lottery-code="gdkl10"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>广东快乐十分</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="bjkl8" data-lottery-code="bjkl8"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京快乐8</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="xy28" data-lottery-code="xy28"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运28</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="lhc" data-lottery-code="hklhc"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pl3" data-lottery-code="fc3d"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>福彩3D</a>
                        </li>
                        <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4" data-lottery-type="pl3" data-lottery-code="tcpl3"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>体彩排列3</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="left-wrap">
                <!--轮播-->
                <div class="slide home-slide">
                    <div class="slide-indicators">
                        <ul></ul>
                    </div>
                    <div class="slide-inner">
                        <ul>
                        <#if data.carousels??>
                            <#list data.carousels as carousel>
                                <#if carousel["type"]="carousel_type_index" >
                                    <li class="_vr_carousels_check"
                                        starttime="<#if carousel['start_time']??>${carousel['start_time']?long?string.computer}</#if>"
                                        endtime="<#if carousel['end_time']??>${carousel['end_time']?long?string.computer}</#if>"
                                        data-src="url(${imgPath(data.configInfo.domain,carousel.cover)})"
                                        style="background:center bottom no-repeat;">
                                        <#if carousel['link']?has_content><a target="_blank"
                                                                             href="${carousel['link']}"></a></#if>
                                    </li>
                                </#if>
                            </#list>
                        </#if>
                        </ul>
                    </div>
                    <span class="prev"></span> <span class="next"></span>
                </div>
                <!--开奖结果-->
                <div class="betting-result">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist" id="betting-tab">
                        <li role="presentation" class="active"><a href="#cqssc" data-code="cqssc" aria-controls="cqssc"
                                                                  role="tab" data-toggle="tab">重庆时时彩</a></li>
                        <li role="presentation"><a href="#lhc" data-code="hklhc" aria-controls="lhc" role="tab"
                                                   data-toggle="tab">香港六合彩</a></li>
                        <li role="presentation"><a href="#pk10" data-code="bjpk10" aria-controls="pk10" role="tab"
                                                   data-toggle="tab">北京PK10</a></li>
                        <li role="presentation"><a href="#xjssc" data-code="xjssc" aria-controls="xjssc" role="tab"
                                                   data-toggle="tab">新疆时时彩</a></li>
                        <li role="presentation"><a href="#tjssc" data-code="tjssc" aria-controls="tjssc" role="tab"
                                                   data-toggle="tab">天津时时彩</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="cqssc">
                            <div class="djq">第<span style="color: red;" class="qs"> </span> 期</div>
                            <div class="result-wrap cqssc">
                            </div>
                            <a class="btn-ljtz _vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>立即投注</a>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="lhc">
                            <div class="djq">第<span style="color: red;" class="qs"> </span> 期</div>
                            <div class="result-wrap hklhc">
                            </div>
                            <a class="btn-ljtz _vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>立即投注</a>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="pk10">
                            <div class="djq">第<span style="color: red;" class="qs"> </span> 期</div>
                            <div class="result-wrap bjpk10">
                            </div>
                            <a class="btn-ljtz _vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>立即投注</a>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="xjssc">
                            <div class="djq">第<span style="color: red;" class="qs"> </span> 期</div>
                            <div class="result-wrap xjssc">
                            </div>
                            <a class="btn-ljtz _vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>立即投注</a>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="tjssc">
                            <div class="djq">第<span style="color: red;" class="qs"> </span> 期</div>
                            <div class="result-wrap tjssc">
                            </div>
                            <a class="btn-ljtz _vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>立即投注</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--right-wrap-->
            <div class="right-wrap">
                <div class="form-wrap">
                    <div class="tit">
                        <p>会员登录</p>
                    </div>
                    <!--登录前-->
                    <form class="_vr_unLogin" style="display: none;">
                        <input type="hidden" name="type" value="inded">
                        <div class="form-group account">
                            <input type="text" class="form-control" placeholder="账号" name="username" maxlength="20"/>
                        </div>
                        <div class="form-group password">
                            <input type="password" class="form-control" placeholder="密码" name="password"
                                   maxlength="20"/>
                        </div>
                        <div class="form-group code _vr_captcha_box" style="display: none;">
                            <input type="text" class="form-control" placeholder="验证码" name="captcha" maxlength="4"/>
                            <img class="_vr_captcha_code" data-code="loginTop"/>
                            <a href="javascript:" class="openNewWindow forget-pas" data-url="commonPage/forgetPwd.html">忘记密码?</a>
                        </div>
                        <a href="javascript:" class="_vr_login btn-login">登录</a>
                        <a href="register.html" class="btn-register">立即注册</a>
                        <a class="_vr_mt_check game-demo btn-sw" href="javascript:void(0)" data-api="22"
                           data-apitype="4"
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>免费试玩</a>
                    </form>
                    <!-- Panel -->
                    <div class="header-panel _vr_loginSuccess" style="display: none;">
                        <a href="javascript:" class="_vr_nickname"></a>
                        <a href="${data.contextInfo.playerCenterContext}" target="_blank">玩家中心</a>
                        <a href="${data.contextInfo.playerCenterContext}#/operation/pAnnouncementMessage/messageList.html"
                           target="_blank">消息 <span class="label label-danger _vr_messageCount"></span></a>
                        <a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html"
                           target="_blank">存款</a>
                        <a href="${data.contextInfo.playerCenterContext}#/gameOrder/index.html" target="_blank">投注记录</a>
                        <div class="btn-group dropdown show-on-hover _vr_balanceBox">
                            <a href="javascript:void(0);" class="static-btn" name="balance_show" data-toggle="dropdown">总资产<span class="text-big _vr_player_balance"></span><span class="caret"></span></a>
                            <a name="balance_hide" style="display: none" data-toggle="dropdown"> 总资产 <span class="caret"></span></a>
                            <ul class="dropdown-menu dropdown-menu-right members-dropdown" style="margin:auto">
                            <#include "../../commonPage/zh_CN/fetchBalance.ftl">
                            </ul>
                        </div>
                        <a href="javascript:void(0);" class="btn-logout" onclick="Logout()">退出</a>
                    </div>
                </div>
                <!--phone-notice-->
                <div class="phone-notice">
                    <div class="phone-lottery">
                        <i class="ico-phone"></i>手机客户端下载<a href="/commonPage/mobileTopic/index.html" target="_blank">more>></a>
                    </div>
                    <div class="code-wrap">
                        <div id="qcode"></div>
                        <div class="txt">
                            <a href="/commonPage/mobileTopic/download.html?c=default#ios" target="_blank"><img
                                    src="${data.configInfo.sitePath}/images/ico87.png" alt="">iOS下载</a>
                            <a href="/commonPage/mobileTopic/download.html?c=default#android" target="_blank"><img
                                    src="${data.configInfo.sitePath}/images/ico88.png" alt="">Android下载</a>
                        </div>
                    </div>
                    <div class="notice">
                        <div class="tit">公告</div>
                    </div>
                    <div class="notice-content">
                        <ul class="list-unstyled">
                        <#list data.announcement as msg>
                            <#if msg_index <5>
                                <li style="display: inline-block;"><a href="javascript:void(0);"
                                                                      data-notice-index="${msg_index}"
                                                                      onclick="noticeDialog(this)"
                                                                      id="notice-content">${msg.content}</a></li>
                            </#if>
                        </#list>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
            <!--chart-->
            <div class="chart">
                <div class="title">
                    <h2>走势图</h2>
                    <a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>更多>></a>
                </div>
                <div class="pic_wrap">
                    <div class="pic_box">
                        <img src="${data.configInfo.sitePath}/images/img11.jpg"/>
                    </div>
                    <div class="links">
                        <div class="link-wrap">
                            <div class="tit">高频彩</div>
                            <ul class="list-inline">
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>极速PK10</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运飞艇</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>分分时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>两分时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>三分时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>五分时时彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>吉林快3</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆幸运农场</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>广东快乐十分</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京快乐8</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京28</a>
                                </li>
                            </ul>
                        </div>
                        <div class="link-wrap">
                            <div class="tit">低频彩</div>
                            <ul class="list-inline">
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>福彩3D</a>
                                </li>
                                <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>体彩排列3</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="clear: both;"></div>
    </div>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_CN/ads/indexAds.ftl">
<#include "script.ftl">
<script src="${data.configInfo.ftlRootPath}commonPage/js/kaelQrcode.min.js"></script>
<script>
    $(function () {
        homeDialog();
        var cu_url = window.location.origin;
        var q_code = new KaelQrcode();
        q_code.init(document.getElementById("qcode"), {
            text: cu_url + "/app/download.html",
            size: 102
        });

        // 轮播图
        jQuery(".slide.home-slide").slide({
            titCell: ".slide-indicators ul",
            mainCell: ".slide-inner ul",
            effect: "fold",
            autoPlay: true,
            interTime: 2500,
            autoPage: true,
            trigger: "click",
            // 切换图片时，才加载图片
            startFun: function (i) {
                var curLi = jQuery(".slide.home-slide .slide-inner li").eq(i);
                if (!!curLi.attr("data-src")) {
                    curLi.css("background-image", curLi.attr("data-src")).removeAttr("data-src")
                }
            }
        });

        //开奖结果tab
        $('#betting-tab a').hover(function (e) {
            e.preventDefault();
            $(this).tab('show');
            var _this = e.currentTarget;
            var code = $(_this).data("code");
            $.ajax({
                url: "/commonLottery/getRecent5Records.html",
                type: "post",
                data: {"code": code},
                success: function (data) {
                    var data = eval('(' + data + ')');
                    var str = new String();
                    var arr = new Array();
                    $(".djq .qs").text(data[0].expect);
                    str = data[0].openCode;
                    var lotteryHtml = "";
                    if (str != null) {
                        arr = str.split(",");
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].length > 1) {
                                if (code == "cqssc" || code == "tjssc" || code == "xjssc") {
                                    lotteryHtml += '<span class="ssc" num="' + arr[i] + '">' + arr[i] + '</span>';
                                } else if (code == "hklhc") {
                                    lotteryHtml += '<span class="cpq-num" num="' + arr[i] + '">' + arr[i] + '</span>';
                                } else if (code == "bjpk10") {
                                    lotteryHtml += '<span class="pks-num" num="' + arr[i] + '">' + arr[i] + '</span>';
                                }
                            } else {
                                if (code == "cqssc" || code == "tjssc" || code == "xjssc") {
                                    lotteryHtml += '<span class="ssc" num="' + arr[i] + '">0' + arr[i] + '</span>';
                                } else if (code == "hklhc") {
                                    lotteryHtml += '<span class="cpq-num" num="' + arr[i] + '">0' + arr[i] + '</span>';
                                } else if (code == "bjpk10") {
                                    lotteryHtml += '<span class="pks-num" num="' + arr[i] + '">0' + arr[i] + '</span>';
                                }
                            }
                        }
                    } else {
                        lotteryHtml = "<div class='result-wrap kjz " + code + "'>开奖中</div>";
                    }
                    $(".result-wrap." + code).html(lotteryHtml);
                }
            });
        }, function (e) {

        });
        //默认请求第一个
        $.ajax({
            url: "/commonLottery/getRecent5Records.html",
            type: "post",
            data: {"code": "cqssc"},
            success: function (data) {
                var data = eval('(' + data + ')');
                var str = new String();
                var arr = new Array();
                $(".djq .qs").text(data[0].expect);
                str = data[0].openCode;
                var lotteryHtml = "";
                if (str != null) {
                    arr = str.split(",");
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].length > 1) {
                            lotteryHtml += '<span class="ssc" num="' + arr[i] + '">' + arr[i] + '</span>';
                        } else {
                            lotteryHtml += '<span class="ssc" num="' + arr[i] + '">0' + arr[i] + '</span>';
                        }
                    }
                } else {
                    lotteryHtml = "<div class='result-wrap cqssc kjz'>开奖中</div>";
                }
                $(".result-wrap.cqssc").html(lotteryHtml);
            }
        });
        //jackpot-slide
        jQuery(".notice-content").slide({
            mainCell: "ul",
            effect: "topMarquee",
            autoPlay: true,
            interTime: 70,
            scroll: 1,
            vis: 3
        });

    });
</script>
</body>

</html>
