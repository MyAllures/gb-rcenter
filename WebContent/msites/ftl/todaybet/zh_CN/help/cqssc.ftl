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
                                <p class="acti"><a href="cqssc.html">重庆时时彩</a></p>
                                <p ><a href="tjssc.html">天津时时彩</a></p>
                                <p ><a href="xjssc.html">新疆时时彩</a></p>
                                <p ><a href="pl3.html">体彩排列3</a></p>
                                <p ><a href="fc3d.html">福彩3D</a></p>
                                <p ><a href="lhc.html">香港六合彩</a></p>
                                <p ><a href="xy28.html">幸运28</a></p>
                                <p ><a href="bjkl8.html">北京快乐8</a></p>
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
                            <h5>重庆时时彩</h5>
                            <ul>
                                <li class="sli">常规玩法</li>
                                <li>官方玩法</li>
                                <li>游戏说明</li>
                            </ul>
                        </div>
                        <div class="help_col show">
                            <h5><strong>【双面玩法】</strong></h5>
                            <p><strong>◎双面>>大小玩法说明</strong></br>
                                开奖结果万位、千位、百位、十位或个位数字为5、6、7、8、9时为“大”，若为0、1、2、3、4时为“小”，当投注位数大小与开奖结果的位数大小相符时，即为中奖。</br>
                                ※举例：投注者购买百位小，当期开奖结果如为20352（3为小），则视为中奖。</p>
                            <p><strong>◎双面>>单双玩法说明</strong></br>
                                开奖结果万位、千位、百位、十位或个位数字为1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”，当投注位数单双与开奖结果的位数单双相符时，即为中奖。 </br>
                                ※举例：投注者购买百位单，当期开奖结果如为20130（1为单），则视为中奖。</p>
                            <p><strong>◎双面>>质合玩法说明</strong></br>
                                开奖结果万位、千位、百位、十位或个位数字为1、2、3、5、7时为“质数”，若为0、4、6、8、9时为“合数”，当投注位数质合与开奖结果的位数质合相符时，即为中奖。 </br>
                                ※举例：投注者购买个位质，当期开奖结果如为20957（7为质），则视为中奖。</p>
                            <p><strong>◎双面>>总和大小 玩法说明</strong></br>
                                开奖结果所有号码总和的为23、24、25、26、27、28、29、30、31、32、33、34、35、36、37、38、39、40、41、42、43、44、45时为“大”，
                                若为0、1、2、3、4、5、6、7、8、9、10、11、12、13、14、15、16、17、18、19、20、21、22时为“小”，当投注和数大小与开奖结果的和数大小相符时，即为中奖。 </br>
                                ※举例：投注者购买"总大"，当期开奖结果如为20976（万2+千0+百9+十7+个6=24为大），则视为中奖。</p>
                            <p><strong>◎双面>>龙虎和 玩法说明</strong></br>
                                龙虎和是以开奖结果的万位和个位作为基准，取万为龙，个为虎的数字进行大小比对的一种玩法；</br>
                                当投注龙/虎时，开奖结果为和局，那么押注龙/虎视为不中奖；</br>
                                当投注"和"时，开奖结果为龙/虎，投注“和”视为不中奖；</br>
                                举例：开奖结果为：2,1,3,5,1 万为龙、个为虎：结果 龙(2）大于虎（1），即为开龙；如结果一样大，即为开和局！</p>
                            <p><strong>◎双面>>总和单双 玩法说明</strong></br>
                                开奖结果总和的个位数为1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”，当投注总单双与开奖结果的总单双相符时，即为中奖。</br>
                                ※举例：投注者购买总单，当期开奖结果如为20290（百2+十9+个0=11为单），则视为中奖。</p>

                            <hr>
                            <h5><strong>【数字盘玩法】</strong></h5>
                            <p>于万千百十个任选一位，自0~9任选1个号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。</p>

                            <hr>
                            <h5><strong>【一字定位玩法】</strong></h5>
                            <p><strong>◎万定位</strong>：取万位为基准，自0~9、大小、单双、质合任选1个号进行投注，当开奖结果与所选号码相同时，即为中奖。</br>
                                <strong>◎千定位</strong>：取千位为基准，自0~9、大小、单双、质合任选1个号进行投注，当开奖结果与所选号码相同时，即为中奖。</br>
                                <strong>◎百定位</strong>：取百位为基准，自0~9、大小、单双、质合任选1个号进行投注，当开奖结果与所选号码相同时，即为中奖。</br>
                                <strong>◎十定位</strong>：取十位为基准，自0~9、大小、单双、质合任选1个号进行投注，当开奖结果与所选号码相同时，即为中奖。</br>
                                <strong>◎个定位</strong>：取个位为基准，自0~9、大小、单双、质合任选1个号进行投注，当开奖结果与所选号码相同时，即为中奖。</br>
                                关于大小：5、6、7、8、9为“大”，若为0、1、2、3、4时为“小”。</br>
                                关于单双：1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”。</br>
                                关于质合：1、2、3、5、7时为“质数”，若为0、4、6、8、9时为“合数”。</p>

                            <hr>
                            <h5><strong>【二字定位玩法】</strong></h5>
                            <p>于万千百十个任选二位，自0~9任选2个号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。</p>

                            <hr>
                            <h5><strong>【三字定位玩法】</strong></h5>
                            <p>于万千百十个任选三位，自0~9任选3个号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。</p>

                            <hr>
                            <h5><strong>【一字组合玩法】</strong></h5>
                            <p><strong>◎全五一字组合</strong>：0~9任选1个号进行投注，当开奖结果[万位、千位、百位、十位、个位]任一数与所选的号码相同时，即为中奖。同个号码出现多次时只计一次中奖</br>
                                ※举例：下注一字【5号】＄100，一字賠率2.404</br>
                                五颗球开出9，5，8，3，5 派彩为＄240.4</br>
                                <strong>◎前三</strong>：0~9任选1个号进行投注，当开奖结果[万位、千位、百位]任一数与所选的号码相同时，即为中奖。</br>
                                <strong>◎中三</strong>：0~9任选1个号进行投注，当开奖结果[千位、百位、十位]任一数与所选的号码相同时，即为中奖。</br>
                                <strong>◎后三</strong>：0~9任选1个号进行投注，当开奖结果[百位、十位、个位]任一数与所选的号码相同时，即为中奖。</p>

                            <hr>
                            <h5><strong>【二字组合玩法】</strong></h5>
                            <p>于前三、中三、后三0~9任选2个号进行投注，当开奖结果任二数与所选的号码相同时，即为中奖。</br>
                                ※举例：投注者购买后三二字组合，选择2个相同号码如为11，当期开奖结果如为xx11x、xx1x1、xxx11、皆视为中奖。（x=0~9任一数）</br>
                                ※举例：投注者购买后三二字组合，选择2个不同号码如为12，当期开奖结果如为xx12x、xx1x2、xx21x、xx2x1、xxx12、xxx21皆视为中奖。（x=0~9任一数）</p>

                            <hr>
                            <h5><strong>【二字和数玩法】</strong></h5>
                            <p>
                                开奖结果万千位、万百位、万十位、万个位、千百位、千十位、千个位、百十位、百个位、十个位数字总和的个位数为1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”，当投注和数单双与开奖结果的和数单双相符时，即为中奖。</br>
                                ※举例：投注者购买百十和数单，当期开奖结果如为20290（百2+十9+个0=11为单），则视为中奖。</p>

                            <hr>
                            <h5><strong>【组选三玩法】</strong></h5>
                            <p><strong>◎前三</strong>：会员可以挑选5~10个号码，当开奖结果[万位、千位、百位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[万位、千位、百位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。</br>
                                ※例如：112、344，若是开出豹子则不算中奖。</br>
                                ※备注："豹子"为三字同号，例如：111、222</br>
                                <strong>◎中三</strong>：会员可以挑选5~10个号码，当开奖结果[千位、百位、十位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[千位、百位、十位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。</br>
                                ※例如：112、344，若是开出豹子则不算中奖。</br>
                                ※备注："豹子"为三字同号，例如：111、222</br>
                                <strong>◎后三</strong>：会员可以挑选5~10个号码，当开奖结果[百位、十位、个位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[百位、十位、个位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。</br>
                                ※例如：112、344，若是开出豹子则不算中奖。</br>
                                ※备注："豹子"为三字同号，例如：111、222</p>

                            <hr>
                            <h5><strong>【组选六玩法】</strong></h5>
                            <p><strong>◎前三</strong>：会员可以挑选4~8个号码，当开奖结果[万位、千位、百位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。</br>
                                ※例如：如果是选择(1、2、3、4)，则开奖结果[万位、千位、百位]为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。</br>
                                <strong>◎中三</strong>：会员可以挑选4~8个号码，当开奖结果[千位、百位、十位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。</br>
                                ※例如：如果是选择(1、2、3、4)，则开奖结果[千位、百位、十位]为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。</br>
                                <strong>◎后三</strong>：会员可以挑选4~8个号码，当开奖结果[百位、十位、个位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。
                            </p>

                            <hr>
                            <h5><strong>【跨度玩法】</strong></h5>
                            <p><strong>◎前三</strong>：以开奖结果[万位、千位、百位]的最大差距（跨度），作为中奖依据。会员可以选择0~9的任一跨度。</br>
                                ※举例：开奖结果为3、4、8、7、6。中奖的跨度为5。（最大号码8减最小号码3=5）。</br>
                                <strong>◎中三</strong>：以开奖结果[千位、百位、十位]的最大差距（跨度），作为中奖依据。会员可以选择0~9的任一跨度。</br>
                                ※举例：开奖结果为3、4、8、7、6。中奖的跨度为4。（最大号码8减最小号码4=4）。</br>
                                <strong>◎后三</strong>：以开奖结果[百位、十位、个位]的最大差距（跨度），作为中奖依据。会员可以选择0~9的任一跨度。</br>
                                ※举例：开奖结果为3、4、8、7、6。中奖的跨度为2。（最大号码8减最小号码6=2）。</p>

                            <hr>
                            <h5><strong>【龙虎玩法】</strong></h5>
                            <p>龙虎游戏规则：龙虎是以开奖结果的五个数字作为基准，取任意位置（万、千、百、十、个）的数字进行组合大小比对的一种玩法；</br>
                                当投注龙/虎时，开奖结果为和局，那么押注龙/虎视为不中奖；</br>
                                当投注"和"时，开奖结果为龙/虎，投注“和”视为不中奖；</br>
                                举例：开奖结果为：2,1,3,5,2 万为龙、千为龙虎时：结果 龙(2）大于虎（1），即为开龙；如万为龙，个为虎时，结果一样大，即为开和局！</br>
                                说明：龙1 VS 虎2 即为万为龙，千为虎；龙2 VS 虎4 即为千为龙，十为虎；</p>
                        </div>
                        <div class="help_col">
                            <h5>筹备中</h5>
                        </div>
                        <div class="help_col">
                            <h5><strong>总则</strong></h5>
                            <p>
                                重庆时时彩游戏是依照中国重庆福利彩票发行中心统一发行的『时时彩』彩票的开奖数据为依据所规划的线上彩票游戏，游戏的投注时间、开奖时间和开奖号码与重庆时时彩完全同步，北京时间（GMT+8）每天白天从上午10：00开到晚上22：00，夜场从22：00至凌晨
                                2 点，每 10 分钟开一次奖，夜场每 5 分钟开一次奖，每天开奖 120 期（白天 72 期，夜间 48 期） 。本公司重庆时时彩具体游戏规则请参考彩种介绍。</br>
                                <span style="color:#E53333;">开奖结果为五码 (万、千、百、十、个)。假设结果为1 、2 、3 、4、5。</span></p>
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