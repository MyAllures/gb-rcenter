<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—手机专题—手机专题页</title>
    <link rel="shortcut Icon" href="${data.configInfo.sitePath}/images/favicon.png" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/common.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/<#if mobileTopic??>${mobileTopic}<#else>default</#if>/style.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/jquery.fullPage.css">
</head>

<body class="index-page">
    <!--top-->
    <div class="top">
        <div class="header">
            <div class="container">
                <div class="logo">
                    <a href="/">
                        <#if data.siteInfo.siteId??>
                            <img src="${data.configInfo.ftlRootPath}commonPage/images/app_logo/app_logo_${data.siteInfo.siteId}.png" alt="">
                        <#else>
                            <img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" alt="">
                        </#if>
                    </a>

                </div>
                <ul class="menu list-inline">
                    <li class="active"><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">手机专题<small>新版上线</small></a></li>
                    <li><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">游戏<small>四大类十大API</small></a></li>
                    <li><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP下载<small>随意畅玩</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar" style="height:1px;">
        </div>
    </div>
    <div class="myFullPage">
        <!-- index -->
        <div class="section index">
            <div class="container">
                <div class="left left0">
                    <a href="download.html" title="下载APP手机客户端"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-01.png" class="img-left0"></a>
                    <div class="left0-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-02.png" class="img-left0-2"></div>
                    <div class="left0-3"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-03.png" class="img-left0-3"></div>
                    <div class="left0-4"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-04.png" class="img-left0-4"></div>
                    <div class="left0-5"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-05.png" class="img-left0-5"></div>
                    <div class="left0-6 flash2">
                        <#--<img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/qcode.png">-->
                            <div id="qcode"></div>
                        <p>手机扫码 立即下载</p>
                        <p>全新APP 即刻精彩</p>
                    </div>
                </div>
                <div class="right right0">
                    <a href="games.html" title="精彩API游戏介绍"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-title-01.png" class="flash"></a>
                    <div class="right0-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-title-02.png" class="img-right0-2"></div>
                    <div class="right0-3"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-08.png" class="img-right0-3"></div>
                </div>
                <div class="top top0">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-06.png" class="img-top0">
                    <div class="top0-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-10.png" class="img-top0-2"></div>
                </div>
                <div class="bottom bottom0">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-07.png" class="img-bottom0">
                    <div class="bottom0-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/index-09.png" class="img-bottom0-2"></div>
                </div>
            </div>
        </div>
    </div>
    <!--footer-->
    <div class="footer">
        <div class="container">
            <p>手机端HTML5版本最佳显示建议IOS 8.0 以上系统使用内建浏览器，Android 4.0以上系统使用 Chrome 浏览器。</p>
            <p>若当您无法顺利用手机上网投注，请您使用电脑登录网站，咨询线上客服，我们会尽快帮您处理。</p>
        </div>
    </div>
    <!--themes-->
    <#--<dl style="position:fixed;left:10px;top:200px;width:200px;">
        <dt style="height:50px;line-height:50px;text-align:center;font-size:16px;color:#fff;background:#606060;border-top-right-radius:10px;border-top-left-radius:10px;">皮肤风格切换</dt>
        <dd style="background:#fff;margin:0;">
            <ul style="list-style:none;padding:0;font-size:0;padding:0 10px 10px 10px;">
                <li style="display:inline-block;"><a style="display:block;border:2px solid #a7863e;color:#a7863e;padding:5px 10px;font-size:14px;margin:10px 10px 0 0;" href="javascript:void(0);" data-value="default" class="targetElem">默认</a></li>
                <li style="display:inline-block;"><a style="display:block;border:2px solid #3d5ea5;color:#3d5ea5;padding:5px 10px;font-size:14px;margin:10px 10px 0 0;" href="javascript:void(0);" data-value="blue" class="targetElem">蓝色</a></li>
                <li style="display:inline-block;"><a style="display:block;border:2px solid #3ea2a9;color:#3ea2a9;padding:5px 10px;font-size:14px;margin:10px 0 0 0;" href="javascript:void(0);" data-value="cyan" class="targetElem">青色</a></li>
                <li style="display:inline-block;"><a style="display:block;border:2px solid #747474;color:#747474;padding:5px 10px;font-size:14px;margin:10px 10px 0 0;" href="javascript:void(0);" data-value="gray" class="targetElem">灰色</a></li>
                <li style="display:inline-block;"><a style="display:block;border:2px solid #46aa3e;color:#46aa3e;padding:5px 10px;font-size:14px;margin:10px 10px 0 0;" href="javascript:void(0);" data-value="green" class="targetElem">绿色</a></li>
                <li style="display:inline-block;"><a style="display:block;border:2px solid #803ea7;color:#803ea7;padding:5px 10px;font-size:14px;margin:10px 0 0 0;" href="javascript:void(0);" data-value="purple" class="targetElem">紫色</a></li>
                <li style="display:inline-block;"><a style="display:block;border:2px solid #a83e40;color:#a83e40;padding:5px 10px;font-size:14px;margin:10px 10px 0 0;" href="javascript:void(0);" data-value="red" class="targetElem">红色</a></li>
            </ul>
        </dd>
    </dl>-->
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/jquery/jquery-1.11.3.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/TweenMax.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/jquery-parallax.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/js/kaelQrcode.min.js"></script>
    <script>
    $(function() {
        var cu_url = window.location.origin;
        var q_code = new KaelQrcode();
        q_code.init(document.getElementById("qcode"), {
            text : cu_url+"/app/download.html",
            size: 140
        });

        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true //CSS3 transforms滚动
        });
        // 扫码按钮
        $(".left0-6").hover(function() {
            if ($(this).hasClass("flash2")) {
                $(this).removeClass("flash2");
            } else if ($(this).hasClass("flash22")) {
                $(this).removeClass("flash22");
            } else {
                $(this).addClass("flash22");
            }
        });
    });
    $(document).mousemove(function(e) {
        $('.img-left0').parallax(-40, e);
        $('.img-left0-2').parallax(40, e);
        $('.img-left0-3').parallax(20, e);
        $('.img-left0-4').parallax(-20, e);
        $('.img-left0-5').parallax(-25, e);
        $('.img-right0-3').parallax(-100, e);
        $('.img-top0').parallax(100, e);
        $('.img-top0-2').parallax(-100, e);
        $('.img-bottom0').parallax(100, e);
        $('.img-bottom0-2').parallax(-100, e);
    });
    </script>
</body>

</html>
