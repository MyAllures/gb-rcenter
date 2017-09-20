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
                            <li><a href="about.html#?id=${parent["id"]}">關於我們</a></li>
                        </#if>
                    </#if>
                <#--博彩责任（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="Responsible gambling">
                            <li><a href="about.html#?id=${parent["id"]}">責任博彩</a></li>
                        </#if>
                    </#if>
                <#--免责声明（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="disclaimer">
                            <li><a href="about.html#?id=${parent["id"]}">免責宣告</a></li>
                        </#if>
                    </#if>
                <#--隐私政策（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="Privacy policy">
                            <li><a href="about.html#?id=${parent["id"]}">隱私政策</a></li>
                        </#if>
                    </#if>

                <#--代理合作（内置）-->
                    <#if parent['parent']?exists && parent['code']?exists>
                        <#if parent["code"]=="cooperation">
                            <li><a href="about.html#?id=${parent["id"]}">聯盟合作</a></li>
                        </#if>
                    </#if>
                </#list>
                    <#assign flag=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && flag == 0>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc"
                                       href="javascript:">常見問題</a></li>
                                <#assign flag = 1>
                            </#if>
                        </#list>
                    </#if>
                    <#assign flag2=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && parent.name == '存款幫助'>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc&w=${parent.typeId}"
                                       href="javascript:">存款幫助</a></li>
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
                                       href="javascript:">轉賬幫助</a></li>
                                <#assign flag3 = 1>
                            </#if>
                        </#list>
                    </#if>
                    <#-- <li><a href="javascript:">存款帮助</a>-->
                    <#assign flag2=0>
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1' && parent.name == '取款幫助'>
                                <li><a class="openNewWindow"
                                       data-url="commonPage/help.html?pageNumber=${parent.typeId}&pagingKey=hpdc&w=${parent.typeId}"
                                       href="javascript:">取款幫助</a></li>
                                <#assign flag2 = 1>
                            </#if>
                        </#list>
                    </#if>
                    <#list data.documents as parent>
                    <#--活动条款-->
                        <#if parent['parent']?exists && parent['code']?exists>
                            <#if parent["code"]=="Activity Terms ">
                                <li><a href="about.html#?id=${parent["id"]}">活動條款</a></li>
                            </#if>
                        </#if>
                    </#list>
                    <li><a href="agent.html" target="_blank">代理中心</a></li>
                    <li><a href="javascript:" onclick="support(this)" target="_blank">技術支援</a></li>
                </ul>
            </div>
            <!--copy-right-->
            <div class="footer-copyright text-center">
                <p>ChaoBet持有菲律賓政府PAGCOR (Philippine Amusement and Gaming Corporation) 頒發的離岸博彩許可證並受其監督
                    (c) 2010-2017 ChaoBet.com版權所有 </p>
            </div>
        </div>
    </div>
</footer>