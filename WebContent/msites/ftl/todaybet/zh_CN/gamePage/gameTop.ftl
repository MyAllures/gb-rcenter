<header class="game-header">
    <div class="container">
        <div class="menu pull-left">
            <img class="logo" src="${data.configInfo.sitePath}/images/logo.png">
        </div>
        <!--header-form-->
        <div class="game-notice">
            <div class="title"></div>
            <div class="notice-list">
                <ul class="list-unstyled">
                <#list data.announcement as msg>
                    <#if msg_index <5>
                        <li style="display: inline-block;"><a href="javascript:void(0);" data-notice-index="${msg_index}" onclick="noticeDialog(this)" id="notice-content">${msg.content}</a></li>
                    </#if>
                </#list>
                </ul>
            </div>
        </div>
        <div class="nav">
            <h1>网址导航<i></i></h1>
            <div class="downte">
                <ul>
                    <li>
                        <h2><a <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if>>在线客服</a></h2>
                        <p>
                            <a href="/register.html" class="a0">免费注册</a>
                            <a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html" target="_blank" >账户充值</a>
                        </p>
                    </li>
                    <li>
                        <h2><a href="/about.html">帮助中心</a></h2>
                        <p>
                            <a href="/help/cqssc.html">彩种介绍</a>
                            <a href="/about.html">功能指引</a>
                            <a href="/help/mima.html">常见问题</a>
                            <a href="/help/mima.html">热点问题</a>
                        </p>
                    </li>
                    <li>
                        <h2><a href="${data.contextInfo.playerCenterContext}" target="_blank">会员中心</a></h2>
                        <p>
                            <a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html" target="_blank">账户充值</a>
                            <a href="${data.contextInfo.playerCenterContext}#/player/withdraw/withdrawList.html" target="_blank">快速提款</a>
                            <a href="${data.contextInfo.playerCenterContext}#/gameOrder/index.html" target="_blank">记录查询</a>
                            <a href="${data.contextInfo.playerCenterContext}" target="_blank">账户设置</a>
                            <a href="${data.contextInfo.playerCenterContext}#/playerRecommendAward/recommend.html" target="_blank">我的推广</a>
                        </p>
                    </li>
                    <li>
                        <h2><a href="/">首页</a></h2>
                        <p>
                            <a href="/">购彩大厅</a>
                            <a href="/">开奖结果</a>
                            <a href="/">走势图表</a>
                            <a href="/promo.html">优惠活动</a>
                            <a href="/mobile.html">手机购彩</a>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</header>
<script src="../../ftl/commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<script src="../../ftl/commonPage/js/gui-base.js"></script>
<script>
    $(function() {
        // 公告-左滚动
        $('.notice-list>ul>li').css('display', 'inline-block');
        $('.notice-list').Marquee({
            isMarquee: true,
            isEqual: false, // 元素等长
            scrollDelay: 30, // 时长
            direction: 'left'
        });
    });
</script>