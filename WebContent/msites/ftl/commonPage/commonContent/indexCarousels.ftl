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