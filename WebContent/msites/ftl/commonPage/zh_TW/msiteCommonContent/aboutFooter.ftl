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