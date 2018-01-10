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