<#--浮动图-->
<#assign searchId></#assign>
<#if data.activityMessage??>
    <#list data.activityMessage as am>
        <#if am.code=='money'&& am.states=='processing' &&am.isDisplay>
            <#assign searchId=am.searchId>
        </#if>
    </#list>
</#if>



<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.singleMode && pic.picType=='2'>
            <#if pic.location == "left" && pic.displayInPages?contains("1")>
            <div class="hongbao-slide-wrap hongbao-wrap" id="hongbao" style="<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>left: ${pic.distanceSide}px;</#if> <#if pic.distanceBottom??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <div class="slide-inner">
                    <ul>
                        <#if data.floatPicItems?exists>
                            <#list data.floatPicItems?keys as key>
                                <#if  data.floatPicItems[key].floatPicId ==pic.id>
                                    <li class="hb_type_<#if data.floatPicItems[key].normalEffect?contains('panel-first.png')>1<#elseif data.floatPicItems[key].normalEffect?contains('panel-second.png')>2<#else>3</#if>">
                                        <a href="javascript:void(0)" onclick="canShowLottery('${searchId}');">
                                            <div class="img"></div>
                                            <div class="extra"></div>
                                        </a>
                                    </li>
                                </#if>
                            </#list>
                        </#if>
                    </ul>
                </div>
            </div>
            </#if>
        </#if>
    </#list>
</#if>

<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.singleMode && pic.picType=='2'>
            <#if pic.location == "right" && pic.displayInPages?contains("1")>
            <div class="hongbao-slide-wrap hongbao-wrap" id="hongbao" style="<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>right: ${pic.distanceSide}px;</#if> <#if pic.distanceBottom??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                <div class="slide-inner">
                    <ul>
                        <#if data.floatPicItems?exists>
                            <#list data.floatPicItems?keys as key>
                                <#if  data.floatPicItems[key].floatPicId ==pic.id>
                                    <li class="hb_type_<#if data.floatPicItems[key].normalEffect?contains('panel-first.png')>1<#elseif data.floatPicItems[key].normalEffect?contains('panel-second.png')>2<#else>3</#if>">
                                        <a href="javascript:void(0)" onclick="canShowLottery('${searchId}');">
                                            <div class="img"></div>
                                            <div class="extra"></div>
                                        </a>
                                    </li>
                                </#if>
                            </#list>
                        </#if>
                    </ul>
                </div>
            </div>
            </#if>
        </#if>
    </#list>
</#if>

<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.singleMode && pic.picType=='1' || !pic.singleMode>
            <#if pic.location == "left" && pic.displayInPages?contains("1")>
                <#if pic.interactivity=="lock_on_screen">
                <ul data-fp="${pic.id}" class="float-services a-left aside-float list-unstyled <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>left: ${pic.distanceSide}px;</#if> <#if pic.distanceSide??>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                    <#if data.floatPicItems?exists>
                        <#list data.floatPicItems?keys as key>
                            <#if  data.floatPicItems[key].floatPicId ==pic.id>
                                <li class="left_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                    <a <#if pic.picType??&&pic.picType=='1'>
                                        <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                                href="${data.floatPicItems[key].imgLinkProtocol}${data.floatPicItems[key].imgLinkValue}"
                                                target="_blank"
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
                                                href="${data.floatPicItems[key].imgLinkProtocol}${data.floatPicItems[key].imgLinkValue}" target="_blank"
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
                                                href="${data.floatPicItems[key].imgLinkProtocol}${data.floatPicItems[key].imgLinkValue}" target="_blank"
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
        </#if>
    </#list>
</#if>

<#if data.floatPicsInIndex??>
    <#list data.floatPicsInIndex as pic>
        <#if pic.singleMode && pic.picType=='1' || !pic.singleMode>
            <#if pic.location == "right" && pic.displayInPages?contains("1")>
                <#if pic.interactivity=="lock_on_screen">
                <ul data-fp="${pic.id}" class="float-services a-right aside-float list-unstyled hidden-xs <#if pic.showEffect?? && pic.showEffect>show_effect </#if> <#if pic.hideCloseButton?? && pic.hideCloseButton>hasClose</#if>" style="display:none;<#if pic.distanceTop??>top: ${pic.distanceTop}px;</#if> <#if pic.distanceSide??>right: ${pic.distanceSide}px;</#if> <#if pic.distanceSide?has_content>bottom: <#if pic.distanceBottom??>${pic.distanceBottom}</#if>px</#if>">
                    <#if data.floatPicItems?exists>
                        <#list data.floatPicItems?keys as key>
                            <#if data.floatPicItems[key].floatPicId == pic.id>
                                <li class="right_${data.floatPicItems[key].imgLinkType}" style="width:${data.floatPicItems[key].imgWidth}px;height: ${data.floatPicItems[key].imgHeight}px; background-image:url(${imgPath(data.configInfo.domain,data.floatPicItems[key].normalEffect)});">
                                    <a <#if pic.picType??&&pic.picType=='1'>
                                        <#if data.floatPicItems[key].imgLinkValue?? && data.floatPicItems[key].imgLinkValue!="">
                                                href="${data.floatPicItems[key].imgLinkProtocol}${data.floatPicItems[key].imgLinkValue}" target="_blank"
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
                                                href="${data.floatPicItems[key].imgLinkProtocol}${data.floatPicItems[key].imgLinkValue}" target="_blank"
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
                                                href="${data.floatPicItems[key].imgLinkProtocol}${data.floatPicItems[key].imgLinkValue}" target="_blank"
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
        </#if>
    </#list>
</#if>