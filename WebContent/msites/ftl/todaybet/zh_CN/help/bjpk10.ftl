<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "../head.include.ftl">
</head>

<body>
<#include "top.ftl">
<main class="main-about">
    <!-- about -->
    <section class="about register-about">
        <div class="container">
            <div class="main wi">
                <div class="list">
                    <h5><span style="cursor:pointer;" onclick="getHelp(null, '../../help/main.html')">帮助中心</span></h5>
                    <ul>
                        <li class="li1 sli">
                            <h4>彩种介绍<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="display:block;">
                                <p ><a href="cqssc.html">重庆时时彩</a></p>
                                <p ><a href="tjssc.html">天津时时彩</a></p>
                                <p ><a href="xjssc.html">新疆时时彩</a></p>
                                <p ><a href="pl3.html">体彩排列3</a></p>
                                <p ><a href="fc3d.html">福彩3D</a></p>
                                <p ><a href="lhc.html">香港六合彩</a></p>
                                <p ><a href="xy28.html">幸运28</a></p>
                                <p ><a href="bjkl8.html">北京快乐8</a></p>
                                <p class="acti"><a href="bjpk10.html">北京PK10</a></p>
                                <p ><a href="cqxync.html">重庆幸运农场</a></p>
                                <p ><a href="gd10.html">广东快乐十分</a></p>
                                <p ><a href="xyft.html">幸运飞艇</a></p>
                                <p ><a href="ffssc.html">分分时时彩</a></p>
                                <p ><a href="efssc.html">两分时时彩</a></p>
                                <p ><a href="sfssc.html">三分时时彩</a></p>
                                <p ><a href="wfssc.html">五分时时彩</a></p><p ><a href="jsk3.html">江苏快3</a></p><p ><a href="ahk3.html">安徽快3</a></p><p ><a href="gxk3.html">广西快3</a></p><p ><a href="hbk3.html">湖北快3</a></p>
                            </div>
                        </li>
                        <li class="li1  zhinan">
                            <h4>新手指南<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p class="acti"><a href="zc.html">注册登录</a></p>
                                <p ><a href="cz.html">充值</a></p>
                                <p ><a href="tk.html">提款</a></p>
                            </div>
                        </li>
                    <#--<li class="li1  gongneng">
                        <h4>特色功能<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                        <div class="slide" style="">
                            <p ><a href="help/Extension.html">推广赚钱</a></p>
                            <p ><a href="javascript:" target="_blank">手机购彩</a></p>
                        </div>
                    </li>-->
                        <li class="li1  wenti">
                            <h4>常见问题<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p class="acti"><a href="aq.html">安全保障</a></p>
                                <p ><a href="mima.html">热门问题</a></p>
                            </div>
                        </li>
                    </ul>
                    <h3>
                        <a href="javascript:" target="_blank">联系客服</a>
                    </h3>
                </div>
                <div class="rt">
                    <div class="type1">
                        <div class="pict">
                            <img src="${data.configInfo.sitePath}/themes/images/help/ico202.png" alt="">
                        </div>
                        <div class="step">
                            <ul>
                                <li><a href="../../register.html"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico203.png" alt="">免费注册</a></li>
                                <li><a href="javascript:void(0)"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico204.png" alt="">账户充值</a></li>
                                <li><a href="javascript:void(0)"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico205.png" alt="">购买彩票</a></li>
                                <li><img src="${data.configInfo.sitePath}/themes/images/help/ico206.png" alt="">中大奖</li>
                                <li><a href="javascript:void(0)"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico207.png" alt="">提款</a></li>
                            </ul>
                            <div class="bor_box">
                                <p><span></span></p>
                                <p><span></span></p>
                                <p><span></span></p>
                                <p><span></span></p>
                                <p><span></span></p>
                            </div>
                        </div>
                    </div><!--五步-->
                    <div class="fix_ico">
                        <ul>
                            <li>
                                <a href="../register.html" class="a0">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico211.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>免费注册</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>"
                                   target="_blank">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico212.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>在线客服</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico213.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>返回顶部</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="help_list">
                        <div class="lis">
                            <h5>北京PK10</h5>
                            <ul>
                                <li class="sli">常规玩法</li>
                                <li>官方玩法</li>
                                <li>游戏说明</li>
                            </ul>
                        </div>
                        <div class="help_col show">
                            <h5><strong>单码/双面规则说明</strong></h5>
                            <p><strong>◎定位</strong><br>
                                指冠军、亚军、季军、第四、第五、第六、第七、第八、第九、第十名出现的顺序与号码为派彩依据。<br>
                                如现场第一个开奖号码为3号，投注冠军为3则视为中奖，其它号码视为不中奖。</p>
                            <p><strong>◎大小</strong><br>
                                开出的号码大于或等于6为大，小于或等于5为小 。</p>
                            <p><strong>◎单双</strong><br>
                                号码为双数叫双，如4、6；号码为单数叫单，如3、5。</p>
                            <p><strong>◎龙虎</strong><br>
                                冠军龙虎 * 龙：冠军号码大于第十名号码视为“龙”中奖，如冠军开出07，第十名开出03。<br>
                                * 虎：冠军号码小于第十名号码视为“虎”中奖，如冠军开出03，第十名开出07。<br>
                                亚军龙虎 * 龙：亚军号码大于第九名号码视为“龙”中奖，如亚军开出07，第九名开出03。<br>
                                * 虎：亚军号码小于第九名号码视为“虎”中奖，如亚军开出03，第九名开出07。<br>
                                季军龙虎 * 龙：季军号码大于第八名号码视为“龙”中奖，如季军开出07，第八名开出03。<br>
                                * 虎：季军号码小于第八名号码视为“虎”中奖，如季军开出03，第八名开出07。<br>
                                第四名龙虎 * 龙：第四名号码大于第七名号码视为“龙”中奖，如第四名开出07，第七名开出03。<br>
                                * 虎：第四名号码小于第七名号码视为“虎”中奖，如第四名开出03，第七名开出07。<br>
                                第五名龙虎 * 龙：第五名号码大于第六名号码视为“龙”中奖，如第五名开出07，第六名开出03。<br>
                                * 虎：第五名号码小于第六名号码视为“虎”中奖，如第五名开出03，第六名开出07。</p>
                            <h5><strong>冠亚军和规则说明</strong></h5>
                            <p><strong>◎冠亚军和</strong><br>
                                冠军号码与亚军号码的和值区间为3~19，当投注组合符合冠亚军和值，即视为中奖。</p>
                            <p><strong>◎冠亚军和大小</strong><br>
                                当开奖结果冠军号码与亚军号码的和值大于11为大，投注“和大”则视为中奖；小于11为小，投注“和小”则视为中奖；等于11视为和(不计算输赢)。</p>
                            <p><strong>◎冠亚军和单双</strong><br>
                                当开奖结果冠军号码与亚军号码的和值为单数如9、13，投注“和单”则视为中奖；为双数如12、16，投注“和双”则视为中奖；若总和为11，则视为和(不计算输赢)。</p>
                        </div>
                        <div class="help_col">
                            <h5>筹备中</h5>
                        </div>
                        <div class="help_col">
                            <h5><strong>开奖说明</strong></h5>
                            <p>“北京PK拾”是由中国福利彩票发行，北京福利彩票发行中心承销。<br>
                                每日共开奖179期、每5分钟开奖1次。<br>
                                开奖时间：早上9点至晚上12点。如开奖时间异动以中国福利彩票管理中心公告为准。</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../script.ftl">
<#include "script.ftl">
</body>

</html>