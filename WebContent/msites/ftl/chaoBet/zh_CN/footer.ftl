<footer>
    <!--footer-parter-->
    <div class="footer-partner">
            <div class="container">
                <ul class="list-inline text-center">
                    <li>
                        <a class="partner ht" href="http://www.hongtubet.com" target="_blank">
                            <div class="hontu-wrap">
                                <div class="img1"></div>
                                <div class="img2"></div>
                                <div class="img3"></div>
                                <div class="img4"></div>
                                <div class="img5"></div>
                                <div class="img6"></div>
                                <div class="img7"></div>
                                <div class="img8"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="partner bb"><span></span></a>
                    </li>
                    <li>
                        <a class="partner ag"><span></span></a>
                    </li>
                    <li>
                        <a class="partner mg"><span></span></a>
                    </li>
                    <li>
                        <a class="partner pt"><span></span></a>
                    </li>
                    <li>
                        <a class="partner sb"><span></span></a>
                    </li>
                    <li>
                        <a class="partner og"><span></span></a>
                    </li>
                    <li>
                        <a class="partner gd"><span></span></a>
                    </li>
                    <li>
                        <a class="partner bsg"><span></span></a>
                    </li>
                    <li>
                        <a class="partner opus"><span></span></a>
                    </li>
                </ul>
            </div>
        </div>
    <!--footer-link-copyright-->
    <div class="footer-link-copyright">
        <div class="container">
            <div class="footer-link text-center">
                <ul class="list-inline">
                    <#include "../../commonPage/zh_CN/msiteCommonContent/aboutFooter.ftl">
                    <#list data.documents as parent>
                    <#--活动条款-->
                        <#if parent['parent']?exists && parent['code']?exists>
                            <#if parent["code"]=="Activity Terms ">
                                <li><a href="about.html#?id=${parent["id"]}">活动条款</a></li>
                            </#if>
                        </#if>
                    </#list>
                    <li><a href="agent.html" target="_blank">代理中心</a></li>
                    <li><a href="javascript:" onclick="support(this)" target="_blank">技术支援</a></li>
                </ul>
            </div>
            <!--copy-right-->
            <div class="footer-copyright text-center">
                <p>
                    <#if data.copyrightInformation?has_content>
                        ${data.copyrightInformation}
                    <#else >
                        ChaoBet持有菲律宾政府PAGCOR (Philippine Amusement and Gaming Corporation) 颁发的离岸博彩许可证并受其监督
                        (c) 2010-2017 ChaoBet.com版权所有
                    </#if>
                </p>
            </div>
        </div>
    </div>
</footer>
<#include "../../commonPage/zh_CN/pubads/ads.ftl">