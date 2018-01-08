<footer>
    <!--footer-parter-->
    <div class="footer-partner">
        <div class="container">
        <ul class="list-inline text-center">
            <li>
                <a href="http://www.hongtubet.com" target="_blank" class="partner dw"><span style="opacity: 0;"></span></a>
            </li>
            <li>
                <a class="partner bb"><span></span></a>
            </li>
            <li>
                <a class="partner mg"><span></span></a>
            </li>
            <li>
                <a class="partner pt"><span></span></a>
            </li>
            <li>
                <a class="partner ag"><span></span></a>
            </li>
            <li>
                <a class="partner og"><span></span></a>
            </li>
            <li>
                <a class="partner hg"><span></span></a>
            </li>
            <li>
                <a class="partner gd"><span style="opacity: 0;"></span></a>
            </li>
            <li>
                <a class="partner ds"><span></span></a>
            </li>
        </ul>
        </div>
    </div>
    <!--footer-link-copyright-->
    <div class="footer-link-copyright">
        <div class="container">
            <div class="footer-link text-center">
                <ul class="list-inline">
                <#include "../../commonPage/en_US/msiteCommonContent/aboutFooter.ftl">
                    <#list data.documents as parent>
                    <#--活动条款-->
                        <#if parent['parent']?exists && parent['code']?exists>
                            <#if parent["code"]=="Activity Terms ">
                                <li><a href="about.html#?id=${parent["id"]}">Terms of activity</a></li>
                            </#if>
                        </#if>
                    </#list>
                    <li><a href="agent.html" target="_blank">Agent center</a></li>
                </ul>
            </div>
            <!--copy-right-->
            <div class="footer-copyright text-center">
                <p>ChaoBet holds and is supervised by the Philippine Government PAGCOR (Philippine Amusement and Gaming Corporation)
                    (c) 2010-2017 ChaoBet.com All rights reserved </p>
            </div>
        </div>
    </div>
</footer>
<#include "../../commonPage/zh_CN/pubads/ads.ftl">