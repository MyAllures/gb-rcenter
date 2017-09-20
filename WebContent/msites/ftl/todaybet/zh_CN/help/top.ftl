<header>
    <!--top-bar-->
    <div class="top-bar">
        <span class="_user_time hide"></span>
        <div class="container">
            <ul class="list-inline pull-left list-left _vr_unLogin" style="display: none;">
                <input type="hidden" name="type" value="top">
                <li>你好，欢迎来到天天彩票网!</li>
                <li><a onclick="onLogin()" href="javascript:">请登录 </a></li>
                <li><a href="register.html" class="link-blink">免费注册</a></li>
                <li><a class="_vr_mt_check game-demo" href="javascript:void(0)" data-api="22" data-apitype="4"
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>免费试玩</a>
                </li>
            </ul>
            <ul class="list-inline pull-left list-left _vr_loginSuccess" style="display:none;">
                <li>你好，<span class="_vr_nickname"></span>!</li>
                <li><a href="javascript:void(0);" class="btn-logout" onclick="Logout()">退出</a></li>
            </ul>
            <ul class="list-inline pull-right list-right">
                <li><a href="/">首页</a></li>
                <li><a class="link-blink" <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if>>在线客服</a></li>
                <li class="show-on-hover">
                    <a href="javascript:">购买彩票<i class="icon-arr-dow"></i></a>
                    <div class="dropdown-menua">
                        <h4>高频：</h4>
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>广西快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                            </li>
                        </ul>
                        <hr/>
                        <h4>低频：</h4>
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li><a href="about.html">帮助</a></li>
                <li class="show-on-hover">
                    <a href="javascript:">网站导航<i class="icon-arr-dow"></i></a>
                    <div class="dropdown-menua dropdown2">
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>购买彩票</a>
                            </li>
                            <li><a href="javascript:" class="mobileBetting">手机购彩</a></li>
                            <li><a href="../about.html">规则说明</a></li>
                        </ul>
                        <hr/>
                        <h4>彩票工具</h4>
                        <ul class="list-inline">
                            <li><a href="/commonPage/mobileTopic/index.html">手机客户端</a></li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>走势查询</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>中奖查询</a>
                            </li>
                        </ul>
                        <hr/>
                        <ul class="list-inline">
                            <li><a <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if>>在线客服</a></li>
                            <li><a href="Extension.html">推广赚钱</a></li>
                            <li><a href="../promo.html">优惠活动</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="nav-wrap">
        <div class="container">
            <div class="logo">
            <#if data.siteFlashLogo?has_content>
                <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="260" height="56" align="middle">
                    <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                    <param name="wmode" value="transparent">
                    <param name="menu" value="false">
                    <param name="autoplay" value="true"/>
                    <!--[if !IE]>-->
                    <object type="application/x-shockwave-flash"
                            data="${imgPath(data.configInfo.domain,data.siteFlashLogo)}" width="260" height="56">
                        <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                        <param name="wmode" value="transparent">
                        <param name="menu" value="false">
                        <param name="autoplay" value="true"/>
                        <!--<![endif]-->
                        <a href="/"><img style="max-width:260px;height: 56px;"
                                         src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                        <!--[if !IE]>-->
                    </object>
                    <!--<![endif]-->
                </object>
            <#else >
                <a href="/"><img style="max-width:260px;height: 56px;"
                                 src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
            </#if>
            </div>
            <!--navbar-nav-->
            <ul class="nav navbar-nav _vr_nav">
                <li class="nav-item active"><a href="/" class="home">网站首页</a></li>
                <li class="nav-item"><a class="lottery-hall _vr_mt_check" href="javascript:void(0)" data-api="22"
                                        data-apitype="4"
                                        <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                        <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>购彩大厅</a>
                </li>
                <li class="nav-item"><a class="result _vr_mt_check" href="javascript:void(0)" data-api="22"
                                        data-apitype="4"
                                        <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                        <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>开奖结果</a>
                </li>
                <li class="nav-item"><a class="lottery-chart _vr_mt_check" href="javascript:void(0)" data-api="22"
                                        data-apitype="4"
                                        <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                        <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>走势图表</a>
                </li>
                <li class="nav-item"><a href="../agent.html" class="agent">代理合作</a></li>
                <li class="nav-item"><a href="../promo.html" class="promo">优惠活动</a></li>
                <li class="nav-item"><a href="../mobile.html" class="mobile-lottery">手机购彩</a></li>
            </ul>
        </div>
    </div>
</header>