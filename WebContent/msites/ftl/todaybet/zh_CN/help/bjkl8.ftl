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
                                <p class="acti"><a href="bjkl8.html">北京快乐8</a></p>
                                <p ><a href="bjpk10.html">北京PK10</a></p>
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
                            <h5>北京快乐8</h5>
                            <ul>
                                <li class="sli">常规玩法</li>
                                <li>官方玩法</li>
                                <li>开奖规则</li>
                            </ul>
                        </div>
                        <div class="help_col show">
                            <h5><strong>规则说明</strong></h5>
                            <p><strong>◎选号</strong><br>
                                选一：投注的1个号码与当期摇出的20个号码中的任1个号码相同，则中奖。<br><br>
                                选二：投注的2个号码与当期摇出的20个号码中的任2个号码相同，则中奖。<br><br>
                                选三：投注的3个号码为一组合，若其中2个是开奖中的号码，即为三中二，视为中奖；若3个都是开奖中的号码，即为三中三，其余情形视为不中奖。<br><br>
                                选四：投注的4个号码为一组合，若其中2个是开奖中的号码，即为四中二，视为中奖；若其中3个是开奖中的号码，即为四中三；若4个都是开奖中的号码，即为四中四，其余情形视为不中奖。<br><br>
                                选五：投注的5个号码为一组合，若其中3个是开奖中的号码，即为五中三，视为中奖；若其中4个号码是开奖中的号码，即为五中四；若5个都是开奖中的号码，即为五中五，其余情形视为不中奖。
                            </p>
                            <p><strong>◎和值</strong><br>
                                以所有开出的全部20个号码加起来的和值来判定。<br>
                                总单/双：20个号码加总的和值为单，叫做和单；20个号码加总的和值为双，叫做和双。<br>
                                总大/小：20个号码加总的和值大于810，为和大；20个号码加总的和值小于810，则为和小。<br>
                                和值810：20个号码加总的和值等于810，叫和值810。<br>
                                ※举例：开奖号码为1，2，3，4，5，6，7，8，9，10，11，12，13，14，15，16，17，18，19，20；那么此20个开奖号码的和值总和为210，则为小，为双。则投注小和双者中奖。投注大、单、和值810者不中奖。
                            </p>
                            <p><strong>◎上中下盘</strong><br>
                                上下盘：开奖号码1至40为上盘号码，41至80为下盘号码。<br>
                                开出的20个号码中：如上盘号码（1-40）在此局开出号码数目占多数时，此局为上盘；<br>
                                下盘号码（41-80）在此局开出号码数目占多数时，此局为下盘；<br>
                                上盘号码（1－40）和下盘号码（41-80）在此局开出的数目相同时（各10个数字），此局为中盘。<br>
                                ※举例：此局开出1，2，3，4，5，6，7，8，9，10，11，12，13，14，15，16，17，18，19，20. 此局为上盘。<br>
                                ※举例：此局开出41，42，43，44，45，46，47，48，49，50，51，52，53，54，55，56，57，58，59，60 此局为下盘。<br>
                                ※举例：此局开出 1，2，3，4，5，6，7，8，9，10，41，42，43，44，45，46，47，48，49，50 此局为中盘。</p>
                            <p><strong>◎奇偶和盘</strong><br>
                                开奖号码中1，3，5，7，…，75，77，79为奇数号码，2，4，6，8，……，76，78，80为偶数号码。
                                当期开出的20个中奖号码中，如奇数号码数目占多数时（超过10个），则为奇盘，投注奇者中奖； 偶数号码占多数时（超过10个），则为偶盘，投注偶者中奖；
                                如果奇数和偶数号码数目相同时（均为 10个），则为和，投注和者中奖。<br>
                                ※举例：此期开出1，3，5，7，9，11，13，15，17，19，21，22，24，26，28，30，32，34，46，68， 其中奇数11个偶数9个，此期为奇盘。<br>
                                ※举例：此期开出2，4，6，8，10，12，14，16，44，48，66，68，25，27，31，35，37，39，41，55， 其中偶数12个奇数8个，此期为偶盘。<br>
                                ※举例：此期开出2，4，6，8，10，12，14，16，18，20，41，43，45，47，49，51，53，55，57，59， 其中奇数10个偶数10个，此期为和。</p>
                            <p><strong>◎五行</strong><br>
                                开出的20个号码的总和分在5个段，以金、木、水、火、土命名：金（210～695）、木（696～763）、水（764～855）、火（856～923）和土（924～1410）。<br>
                                ※举例：开奖号码为01、04、05、10、11、13、20、27、30、32、33、36、40、47、54、59、61、64、67、79，总和是693，则总分数在210－695段内，则开出的是「金」。下注「金」为赢，反之则输。
                            </p>
                        </div>
                        <div class="help_col">
                            <h5>筹备中</h5>
                        </div>
                        <div class="help_col">
                            <h5><strong>总则</strong></h5>
                            <p>北京快乐8
                                是依照北京福彩网发行的北京快乐8的官方开奖结果所规划的游戏。由1至80的号码中随机摇出20个数字作为开奖号码，依这20个号码变化成各式不同的玩法，在根据猜中的号码个数或玩法可以获得不同等级的奖金。<br>
                                此游戏的开奖时间和开奖号码完全与北京福彩网发行的北京快乐8同步，每日从早上9点至晚上12点，每五分钟开奖一次，每日开奖179期。如开奖时间异动以中国福利彩票管理中心公告为准。<br>
                                本公司北京快乐8具体游戏规则请参考彩种介绍。<br></p>
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