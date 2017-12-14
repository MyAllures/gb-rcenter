<#--浮动图-->
<#assign searchId></#assign>
<#if data.activityMessage??>
    <#list data.activityMessage as am>
        <#if am.code=='money'&& am.states=='processing'>
            <#assign searchId=am.searchId>
        </#if>
    </#list>
</#if>
<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.location == "left" && pic.displayInPages?contains("1")>
            <#if pic.interactivity=="lock_on_screen">
            <ul data-fp="${pic.id}" class="float-services a-left aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>left: ${pic.distanceSide}px;</#if> <#if pic.distanceSide??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <#if data.floatPicItems?exists>
                    <#list data.floatPicItems?keys as key>
                        <#if  data.floatPicItems[key].floatPicId ==pic.id>
                            <li class="left_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                <a <#if pic.picType??&&pic.picType=='1'>
                                    <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                            href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                    </#if>
                                    <#elseif pic.picType??&&pic.picType=='2' && searchId?has_content>
                                            href="javascript:void(0)" onclick="canShowLottery('${searchId}');"
                                    </#if>>
                                    <#if data.floatPicItems[key].mouseInEffect?? && data.floatPicItems[key].mouseInEffect!="">
                                        <img src="${imgPath(data.configInfo.domain,data.floatPicItems[key].mouseInEffect)}" alt="">
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            <#elseif pic.interactivity=="scroll_with_page">
            <ul data-fp="${pic.id}" class="float-js-left float-services a-left aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>left: ${pic.distanceSide}px;</#if> <#if pic.distanceSide??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <#if data.floatPicItems?exists>
                    <#list data.floatPicItems?keys as key>
                        <#if  data.floatPicItems[key].floatPicId ==pic.id>
                            <li class="left_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                <a  <#if pic.picType??&&pic.picType=='1'>
                                    <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                            href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                    </#if>
                                    <#elseif pic.picType??&&pic.picType=='2' && searchId?has_content>
                                            href="javascript:void(0)" onclick="canShowLottery('${searchId}');"
                                    </#if>>
                                    <#if data.floatPicItems[key].mouseInEffect?? && data.floatPicItems[key].mouseInEffect!="">
                                        <img src="${imgPath(data.configInfo.domain,data.floatPicItems[key].mouseInEffect)}" alt="">
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            <#elseif pic.interactivity=="lock_on_page">
            <ul data-fp="${pic.id}" class="float-lock-on-page float-services a-left aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>left: ${pic.distanceSide}px;</#if> <#if pic.distanceSide??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <#if data.floatPicItems?exists>
                    <#list data.floatPicItems?keys as key>
                        <#if  data.floatPicItems[key].floatPicId ==pic.id>
                            <li class="left_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                <a <#if pic.picType??&&pic.picType=='1'>
                                    <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                            href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                    </#if>
                                    <#elseif pic.picType??&&pic.picType=='2' && searchId?has_content>
                                            href="javascript:void(0)" onclick="canShowLottery('${searchId}');"
                                    </#if>>
                                    <#if data.floatPicItems[key].mouseInEffect?? && data.floatPicItems[key].mouseInEffect!="">
                                        <img src="${imgPath(data.configInfo.domain,data.floatPicItems[key].mouseInEffect)}" alt="">
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            </#if>
        </#if>
    </#list>
</#if>

<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.location == "right" && pic.displayInPages?contains("1")>
            <#if pic.interactivity=="lock_on_screen">
            <ul data-fp="${pic.id}" class="float-services a-right aside-float list-unstyled hidden-xs <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>right: ${pic.distanceSide}px;</#if> <#if pic.distanceSide?has_content>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <#if data.floatPicItems?exists>
                    <#list data.floatPicItems?keys as key>
                        <#if data.floatPicItems[key].floatPicId == pic.id>
                            <li class="right_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                <a <#if pic.picType??&&pic.picType=='1'>
                                    <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                            href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                    </#if>
                                    <#elseif pic.picType??&&pic.picType=='2' && searchId?has_content>
                                            href="javascript:void(0)" onclick="canShowLottery('${searchId}');"
                                    </#if>>
                                    <#if data.floatPicItems[key].mouseInEffect?? && data.floatPicItems[key].mouseInEffect!="">
                                        <img src="${imgPath(data.configInfo.domain,data.floatPicItems[key].mouseInEffect)}" alt="">
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            <#elseif pic.interactivity=="scroll_with_page">
            <ul data-fp="${pic.id}" class="float-js-right float-services a-right aside-float list-unstyled hidden-xs <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>right: ${pic.distanceSide}px;</#if> <#if pic.distanceSide?has_content>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <#if data.floatPicItems?exists>
                    <#list data.floatPicItems?keys as key>
                        <#if data.floatPicItems[key].floatPicId == pic.id>
                            <li class="right_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                <a <#if pic.picType??&&pic.picType=='1'>
                                    <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                            href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                    </#if>
                                    <#elseif pic.picType??&&pic.picType=='2' && searchId?has_content>
                                            href="javascript:void(0)" onclick="canShowLottery('${searchId}');"
                                    </#if>>
                                    <#if data.floatPicItems[key].mouseInEffect?? && data.floatPicItems[key].mouseInEffect!="">
                                        <img src="${imgPath(data.configInfo.domain,data.floatPicItems[key].mouseInEffect)}" alt="">
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            <#elseif pic.interactivity=="lock_on_page">
            <ul data-fp="${pic.id}" class="float-lock-on-page float-services a-right aside-float list-unstyled hidden-xs <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>right: ${pic.distanceSide}px;</#if> <#if pic.distanceSide?has_content>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <#if data.floatPicItems?exists>
                    <#list data.floatPicItems?keys as key>
                        <#if data.floatPicItems[key].floatPicId == pic.id>
                            <li class="right_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                <a  <#if pic.picType??&&pic.picType=='1'>
                                    <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                            href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                    </#if>
                                    <#elseif pic.picType??&&pic.picType=='2' && searchId?has_content>
                                            href="javascript:void(0)" onclick="canShowLottery('${searchId}');"
                                    </#if>>
                                    <#if data.floatPicItems[key].mouseInEffect?? && data.floatPicItems[key].mouseInEffect!="">
                                        <img src="${imgPath(data.configInfo.domain,data.floatPicItems[key].mouseInEffect)}" alt="">
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            </#if>
        </#if>
    </#list>
</#if>