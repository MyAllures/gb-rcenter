<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.picType=='1'>
            <#if pic.displayInPages?contains("5")>
                <#if pic.interactivity=="lock_on_screen">
                <ul data-fp="${pic.id}" class="float-services a-${pic.location} aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect?string('true','false')=='true'>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>${pic.location}: ${pic.distanceSide}px;</#if> <#if pic.distanceSide??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                    <#if data.floatPicItems?exists>
                        <#list data.floatPicItems?keys as key>
                            <#if  data.floatPicItems[key].floatPicId ==pic.id>
                                <li class="${pic.location}_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth?string.computer}px;height: ${data.floatPicItems[key].imgHeight?string.computer}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                    <a <#if pic.picType??&&pic.picType=='1'>
                                        <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                                href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                        </#if>
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
                <ul data-fp="${pic.id}" class="float-js-${pic.location} float-services a-${pic.location} aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect?string('true','false')=='true'>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>${pic.location}: ${pic.distanceSide}px;</#if>">
                    <#if data.floatPicItems?exists>
                        <#list data.floatPicItems?keys as key>
                            <#if  data.floatPicItems[key].floatPicId ==pic.id>
                                <li class="${pic.location}_${data.floatPicItems[key].imgLinkType}"  style="width:${data.floatPicItems[key].imgWidth?string.computer}px;height: ${data.floatPicItems[key].imgHeight?string.computer}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                    <a  <#if pic.picType??&&pic.picType=='1'>
                                        <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                                href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                        </#if>
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
                <ul data-fp="${pic.id}" class="float-lock-on-page float-services a-${pic.location} aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect?string('true','false')=='true'>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>${pic.location}: ${pic.distanceSide}px;</#if> <#if pic.distanceSide??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                    <#if data.floatPicItems?exists>
                        <#list data.floatPicItems?keys as key>
                            <#if  data.floatPicItems[key].floatPicId ==pic.id>
                                <li class="${pic.location}_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth?string.computer}px;height: ${data.floatPicItems[key].imgHeight?string.computer}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                    <a <#if pic.picType??&&pic.picType=='1'>
                                        <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                                href="<#if data.floatPicItems[key].imgLinkType?string == 'link'><#if !data.floatPicItems[key].imgLinkValue?contains("http://")><#if data.floatPicItems[key].imgLinkProtocol?? && data.floatPicItems[key].imgLinkProtocol!="">${data.floatPicItems[key].imgLinkProtocol}<#else >'http://'</#if></#if></#if>${data.floatPicItems[key].imgLinkValue}" target="_blank"
                                        </#if>
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
        </#if>
    </#list>
</#if>