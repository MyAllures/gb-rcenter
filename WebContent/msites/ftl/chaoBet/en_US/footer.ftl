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
                    <#list data.documents as parent>
                <#--关于我们（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="aboutUs">
                            <li><a href="about.html#?id=${parent["id"]}">About us</a></li>
                        </#if>
                    </#if>
                <#--博彩责任（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="Responsible gambling">
                            <li><a href="about.html#?id=${parent["id"]}">Responsible betting</a></li>
                        </#if>
                    </#if>
                <#--免责声明（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="disclaimer">
                            <li><a href="about.html#?id=${parent["id"]}">Disclaimer</a></li>
                        </#if>
                    </#if>
                <#--隐私政策（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="Privacy policy">
                            <li><a href="about.html#?id=${parent["id"]}">Privacy Policy</a></li>
                        </#if>
                    </#if>

                <#--代理合作（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="cooperation">
                            <li><a href="about.html#?id=${parent["id"]}">Alliance Cooperation</a></li>
                        </#if>
                    </#if>
                </#list>
                    <#assign flag=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && flag == 0>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc"
                                       href="javascript:">Common Problem</a></li>
                                <#assign flag = 1>
                            </#if>
                        </#list>
                    </#if>
                    <#assign flag2=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && parent.name == 'Deposit Help'>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc&w=${parent.typeId}"
                                       href="javascript:">Deposit Help</a></li>
                                <#assign flag2 = 1>
                            </#if>
                        </#list>
                    </#if>
                    <#assign flag3=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && flag3 == 0>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc"
                                       href="javascript:">Transfer Help</a></li>
                                <#assign flag3 = 1>
                            </#if>
                        </#list>
                    </#if>
                    <#-- <li><a href="javascript:">存款帮助</a>-->
                    <#assign flag2=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && parent.name == 'Withdraw Help'>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc&w=${parent.typeId}"
                                       href="javascript:">Withdraw Help</a></li>
                                <#assign flag2 = 1>
                            </#if>
                        </#list>
                    </#if>
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