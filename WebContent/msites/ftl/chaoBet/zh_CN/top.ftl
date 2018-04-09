<#include "../../commonPage/topCommon.ftl">
<#include "../../commonPage/zh_CN/topCommonDesc.ftl">
<#assign apiTypeName={"1":"LIVE","2":"CASINO","3":"SPORTS","4":"LOTTERY"}>
<header>
    <!--nav-part-->
    <div class="nav-part">
        <div class="container">
            <!--logo-->
            <div class="logo">
                <#if data.siteFlashLogo?has_content>
                    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="182" height="61" align="middle">
                        <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                        <param name="wmode" value="transparent">
                        <param name="menu" value="false">
                        <param name="autoplay" value="true" />
                        <!--[if !IE]>-->
                        <object type="application/x-shockwave-flash" data="${imgPath(data.configInfo.domain,data.siteFlashLogo)}" width="182" height="61">
                            <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                            <param name="wmode" value="transparent">
                            <param name="menu" value="false">
                            <param name="autoplay" value="true" />
                            <!--<![endif]-->
                            <a href="/"><img width="182" height="61" src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                            <!--[if !IE]>-->
                        </object>
                        <!--<![endif]-->
                    </object>
                <#else >
                    <a href="/"><img style="width: 182px;height: 61px;" src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                </#if>
            </div>
            <!--top-link-->
            <div class="clearfix">
                <div class="top-link pull-right">
                    <ul class="list-inline">
                        <li><a href="promo_v2.html">promo_v2</a></li>
                        <li><a href="promo_v2_2.html">promo_v2_2</a></li>
                        <li><a href="javascript:void(0)" onclick="layerDialogDownload()"><span class="gui gui-mobile" style="font-size:  17px;vertical-align: top;margin-right: 5px;"></span>下载</a></li>
                        <li><a href="javascript:void(0)" class="mobileBetting">手机投注</a></li>
                        <li><a href="javascript:void(0)" onclick="AddFavorite()">加入收藏</a></li>
                        <li class="dropdown lang">
                            <a href="javascript:" class="lan cn current_language">简体中文</a>
                            <ul class="dropdown-menu">
                            <#list data.dictMap.siteLang as lua>
                                <li><a href="javascript:" data-language="${lua.language}" class="lan <#if lua.language=="zh_CN">cn<#elseif lua.language=="zh_TW">hk<#elseif lua.language=="en_US">en</#if> changeLanguage">${lua.tran}</a></li>
                            </#list>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!--nav-->
            <div class="navbar pull-right">
                <ul class="nav navbar-nav _vr_nav">
                    <li class="nav-item active"><a href="/">网站首页</a></li>
                    <#list data.siteApiTypeI18n?keys as apiTypeId>
                        <#if apiTypeId == '2' && data.siteApiMap['3']?default('')!=''>
                            <li class="nav-item subnav hot" rel="sub-hot">
                                <a class="_vr_mt_check" data-href="casino.html?apiType=2&apiId=3&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>" data-api="3" href="javascript:void(0)"
                                   <#if data.siteApiMap['3'].maintainEndTime?has_content>startTime="${data.siteApiMap['3'].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap['3'].maintainEndTime?has_content>endTime="${data.siteApiMap['3'].maintainEndTime?long?string.computer}"</#if>>
                                    热门电子</a>
                            </li>
                        </#if>
                        <li class="nav-item" rel="sub-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>">
                            <#if apiTypeId == '2'>
                                <a data-page="casino.html" href="casino.html?apiType=2&apiId=<#list data.siteApiTypeRelationMap['2'] as relationMap><#if relationMap_index==0>${relationMap.apiId?string}</#if></#list>">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>
                            <#elseif apiTypeId == '3'>
                                <a data-page="sports.html" href="sports.html?apiId=<#list data.siteApiTypeRelationMap['${apiTypeId}'] as relationMap><#if relationMap_index==0>${relationMap.apiId?string.computer}</#if></#list>">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>
                            <#elseif apiTypeId == '5'>
                                <a data-page="casino.html" href=" casino.html?apiType=2&apiId=5&gameTag=hot_game">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>

                            <#else >
                                <a data-page="${apiRelByType[apiTypeId]}.html" href="${apiRelByType[apiTypeId]}.html">${data.siteApiTypeI18n[apiTypeId].name}<i class="triangle"></i></a>
                            </#if>
                        </li>
                    </#list>
                    <li class="nav-item"><a data-page="promo.html" href="promo.html">最新优惠</a></li>
                    <li class="nav-item"><a href="javascript:" class="openNewWindow" data-url="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>">在线客服</a>
                    <li class="nav-item"><a href="/commonPage/mobileTopic/index.html?c=blue" target="_blank">手机APP</a></li>
                </ul>
            </div>
        </div>
        <!-- navbar-sub -->
        <div class="navbar-sub">
        <#assign MgGames=[{'id':'30601'},{'id':'30631'}]>
            <#list data.siteApiTypeI18n?keys as apiTypeId>
                <#if apiTypeId=='2'>
                    <div class="sub-content" id="sub-hot" rel="sub-hot" style="display:none;">
                        <div class="container">
                            <div class="row row-gutter-0">
                                <div class="col-5-1">
                                    <dl class="sub-box rebate">
                                        <dt><span class="num-single" num="1"></span><i class="num-dot"></i><span class="num-decimal" num="2"></span><i class="num-pre"></i></dt>
                                        <dd>
                                            <p>每日返水无上限</p>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="col-5-4">
                                    <div class="api-games-wrap">
                                        <div class="api-games api-games-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>">
                                            <ul class="list-unstyled">
                                                <#list MgGames as mgGame>
                                                    <#if data.siteGameI18ns[mgGame.id]?? && mgGame_index < 2 >
                                                        <li>
                                                            <dl class="sub-box api-item">
                                                                <dt>
                                                                    <a class="_game_open shake shake-little"  href="javascript:void(0)"
                                                                       <#if data.gameMapById[mgGame.id].gameLine?c?number &gt; 0>data-game-line="${data.gameMapById[mgGame.id].gameLine?string.computer}"</#if> data-game-score="${data.gameMapById[mgGame.id].gameScore?string.computer}"
                                                                       data-api="3" data-game-name="${data.siteGameI18ns[mgGame.id].name}"
                                                                        <#if data.siteGameI18ns[mgGame.id].introduceStatus?has_content && data.siteGameI18ns[mgGame.id].introduceStatus=="normal" && data.siteGameI18ns[mgGame.id].gameIntroduce?has_content>
                                                                       data-game-introduce="${data.siteGameI18ns[mgGame.id].gameIntroduce}"
                                                                        </#if>
                                                                       data-game-code="<#if data.gameMapById[mgGame.id]?has_content>${data.gameMapById[mgGame.id].code}</#if>"
                                                                       data-game-id="${mgGame.id}" data-apitype="2"
                                                                       data-game-img="<#if data.siteGameI18ns[mgGame.id]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[mgGame.id].cover)}</#if>"
                                                                       data-api-name="${data.siteApiTypeRelationI18n["2"+"3"].name}"
                                                                       data-api-name-abb="<#list apiMapKeys as key><#if key == "3">${apiMap[key]}</#if></#list>"
                                                                       startTime="<#if data.gameMapById[mgGame.id].maintainStartTime?has_content>${data.gameMapById[mgGame.id].maintainStartTime?long?string.computer}</#if>"
                                                                       endTime="<#if data.gameMapById[mgGame.id].maintainEndTime?has_content>${data.gameMapById[mgGame.id].maintainEndTime?long?string.computer}</#if>">
                                                                        <img style="width: 125px;border-radius: 10px;margin-top: 20px;" src="<#if data.siteGameI18ns[mgGame.id]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[mgGame.id].cover)}</#if>">
                                                                        <i>${data.siteGameI18ns[mgGame.id].name}</i></a>
                                                                </dt>
                                                                <dd>
                                                                    <p>
                                                                        <a class="_game_open shake shake-little"  href="javascript:void(0)"
                                                                           <#if data.gameMapById[mgGame.id].gameLine?c?number &gt; 0>data-game-line="${data.gameMapById[mgGame.id].gameLine?string.computer}"</#if> data-game-score="${data.gameMapById[mgGame.id].gameScore?string.computer}"
                                                                           data-api="3" data-game-name="${data.siteGameI18ns[mgGame.id].name}"
                                                                            <#if data.siteGameI18ns[mgGame.id].introduceStatus?has_content && data.siteGameI18ns[mgGame.id].introduceStatus=="normal" && data.siteGameI18ns[mgGame.id].gameIntroduce?has_content>
                                                                           data-game-introduce="${data.siteGameI18ns[mgGame.id].gameIntroduce}"
                                                                            </#if>
                                                                           data-game-code="<#if data.gameMapById[mgGame.id]?has_content>${data.gameMapById[mgGame.id].code}</#if>"
                                                                           data-game-id="${mgGame.id}" data-apitype="2"
                                                                           data-game-img="<#if data.siteGameI18ns[mgGame.id]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[mgGame.id].cover)}</#if>"
                                                                           data-api-name="${data.siteApiTypeRelationI18n["2"+"3"].name}"
                                                                           data-api-name-abb="<#list apiMapKeys as key><#if key == "3">${apiMap[key]}</#if></#list>"
                                                                           startTime="<#if data.gameMapById[mgGame.id].maintainStartTime?has_content>${data.gameMapById[mgGame.id].maintainStartTime?long?string.computer}</#if>"
                                                                           endTime="<#if data.gameMapById[mgGame.id].maintainEndTime?has_content>${data.gameMapById[mgGame.id].maintainEndTime?long?string.computer}</#if>">
                                                                            立即游戏</a>
                                                                    </p>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                    </#if>
                                                </#list>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </#if>
                <div class="sub-content" id="sub-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>" rel="sub-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>" style="display:none;">
                    <div class="container">
                        <div class="row row-gutter-0">
                            <div class="col-5-1">
                                <dl class="sub-box rebate">
                                    <dt>
                                        <#if apiTypeId=="1" || apiTypeId=="3">
                                            <span class="num-single" num="1"></span><i class="num-dot"></i><span class="num-decimal" num="2"></span><i class="num-pre"></i>
                                        <#elseif apiTypeId=="2">
                                            <span class="num-single" num="2"></span><i class="num-dot"></i><span class="num-decimal" num="0"></span><i class="num-pre"></i>
                                        <#elseif apiTypeId=="4">
                                            <span class="num-single" num="1"></span><i class="num-dot"></i><span class="num-decimal" num="0"></span><i class="num-pre"></i>
                                        <#elseif apiTypeId=="5">
                                            <span class="num-single" num="1"></span><i class="num-dot"></i><span class="num-decimal" num="0"></span><i class="num-pre"></i>
                                        </#if>
                                    </dt>
                                    <dd>
                                        <p>天天返水</p>
                                        <p>最高可达</p>
                                    </dd>
                                </dl>
                            </div>
                            <div class="col-5-4">
                                <div class="api-games-wrap">
                                    <div class="api-games api-games-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>">
                                        <ul class="list-unstyled">
                                        <#if data.siteApiTypeRelationMap['${apiTypeId}']??>
                                            <#list data.siteApiTypeRelationMap['${apiTypeId}'] as relationMap>
                                                <#if apiTypeId!="3" || relationMap.apiId?string.computer!="10">
                                                    <li>
                                                        <dl class="sub-box api-item">
                                                            <dt>
                                                                <a class="_vr_mt_check" data-api="${relationMap.apiId?string.computer}" href="javascript:void(0)" data-apitype="${apiTypeId}"
                                                                    <#if apiTypeId=='2'>
                                                                   data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}"
                                                                   data-mt-ic="_vr_mt_casino_${relationMap.apiId?string.computer}"
                                                                        <#elseif apiTypeId=='5'>
                                                                   data-href="casino.html?apiType=5&apiId=${relationMap.apiId?string.computer}"
                                                                   data-mt-ic="_vr_mt_casino_${relationMap.apiId?string.computer}"
                                                                    <#elseif apiTypeId=='3' && relationMap.apiId?string.computer!="10">
                                                                   data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}" data-sports="sports"
                                                                    </#if>
                                                                   <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                                                                   <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                                                    <span class="apiicon <#if apiPrefix[apiTypeId]??>${apiPrefix[apiTypeId]}</#if>-<#if apiMap[relationMap.apiId?string]??>${apiMap[relationMap.apiId?string]}</#if> shake shake-little"></span>
                                                                <#--<#if apiTypeId =='1'><i>${data.siteApiTypeRelationI18n['${apiTypeId}'+relationMap.apiId?string.computer].name}</i></#if>-->
                                                                </a>
                                                            </dt>
                                                            <dd>
                                                                <p><span><#if apiShortDesc[relationMap.apiId?string+"-"+apiTypeId]??>${apiShortDesc[relationMap.apiId?string+"-"+apiTypeId]}</#if></span></p>
                                                                <p><a class="_vr_mt_check _vr_mt_gray _vr_mt_slogan enter-link" data-api="${relationMap.apiId?string.computer}" href="javascript:void(0)" data-apitype="${apiTypeId}"
                                                                    <#if apiTypeId=='2'>
                                                                      data-href="casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}"
                                                                        <#elseif apiTypeId=='5'>
                                                                      data-href="casino.html?apiType=5&apiId=${relationMap.apiId?string.computer}"
                                                                    <#elseif apiTypeId=='3' && relationMap.apiId?string.computer!="10">
                                                                      data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}" data-sports="sports"
                                                                    </#if>
                                                                      <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                                                                      <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                                                    <#if apiTypeId =='1' || apiTypeId =='2' || apiTypeId =='4'>${data.siteApiTypeRelationI18n['${apiTypeId}'+relationMap.apiId?string.computer].name}<#else>立即游戏</#if></a></p>
                                                            </dd>
                                                        </dl>
                                                    </li>
                                                </#if>
                                            </#list>
                                        </#if>
                                            <#if apiTypeId=='2'>
                                                <li>
                                                    <dl class="sub-box api-item">
                                                        <dt><a href="casino.html?apiType=2&gameType=Fish"><span class="apiicon c-by shake shake-little"></span></a></dt>
                                                        <dd>
                                                            <p><span>全球最热门捕鱼游戏</span></p>
                                                            <p><a class="enter-link" href="casino.html?apiType=2&gameType=Fish">
                                                                捕鱼游戏</a></p>
                                                        </dd>
                                                    </dl>
                                                </li>

                                                <li>
                                                    <dl class="sub-box api-item">
                                                        <dt>
                                                            <a class="_vr_mt_check" data-api="34" href="casino.html?apiType=5&amp;apiId=34" data-apitype="5" data-href="casino.html?apiType=5&amp;apiId=34" data-mt-ic="_vr_mt_casino_5">
                                                                <span class="apiicon c-qp shake shake-little"></span>
                                                            </a>
                                                        </dt>
                                                        <dd>
                                                            <p><span>全球领先的棋牌休闲游戏</span></p>
                                                            <p><a class="_vr_mt_check _vr_mt_gray _vr_mt_slogan enter-link" data-api="34" href="casino.html?apiType=5&amp;apiId=34" data-apitype="5" data-href="casino.html?apiType=5&amp;apiId=34">
                                                                棋牌游戏</a></p>
                                                        </dd>
                                                    </dl>
                                                </li>
                                            </#if>
                                        </ul>
                                    </div>
                                    <#if data.siteApiTypeRelationMap['${apiTypeId}']??>
                                        <#assign apiSize = data.siteApiTypeRelationMap['${apiTypeId}']?size>
                                        <#if (apiTypeId=='1'&& apiSize>4) || (apiTypeId !="1" && apiSize>3) >
                                            <a class="api-btn-prev" href="javascript:void(0);"><span class="api-prev"></span></a>
                                            <a class="api-btn-next" href="javascript:void(0);"><span class="api-next"></span></a>
                                        </#if>
                                    </#if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </#list>
        </div>
    </div>
    <!--header-form-->
    <div class="header-form clearfix">
        <div class="container">
            <div class="time pull-left _user_time"></div>
            <!--form-->
            <div class="form-wrap pull-right">
                <div class="_vr_unLogin" style="display:none;">
                    <form class="form-inline">
                        <input type="hidden" name="type" value="top">
                        <div class="form-group account">
                            <input type="text" name="username" maxlength="15" class="form-control" placeholder="会员账号">
                            <a href="javascript:" onclick="forgetUsername()" class="forget">忘记?</a>
                        </div>
                        <div class="form-group password">
                            <input type="password" name="password" maxlength="20" class="form-control" placeholder="密码">
                            <a href="javascript:void(0);" class="forget openNewWindow" data-url="commonPage/msiteCommonContent/forgetPwd.html">忘记?</a>
                        </div>
                        <div class="form-group code _vr_captcha_box" style="display: none">
                            <input type="text" class="form-control" name="captcha" maxlength="4" placeholder="验证码">
                            <img class="_vr_captcha_code" data-code="loginTop">
                        </div>
                        <a href="javascript:" type="button" class="btn-login _vr_login">立即登录</a>
                        <a href="register.html" class="btn-register">免费注册</a>
                        <a href="javascript:" onclick="createFreeAccount();" class="btn-register">免费试玩</a>
                    </form>
                </div>
                <!--panel-->
                <div class="header-panel _vr_loginSuccess" style="display: none">
                    <#include "../../commonPage/zh_CN/msiteCommonContent/loginSuccess.ftl">
                </div>
            </div>
        </div>

    </div>
</header>
