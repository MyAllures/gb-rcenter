<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/gui-base.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/gui-skin-default.css">
    <link rel="stylesheet" href="${data.configInfo.sitePath}/themes/common.css">
    <!--[if lt IE 9]>
    <script src="/ftl/commonPage/js/html5.js"></script>
    <![endif]-->
</head>
<style>
</style>

<body>
<header>
    <!-- Static-bar -->
    <div class="navbar navbar-default _topOri" role="navigation">
        <div class="container">
            <style>
                .navbar.navbar-default {
                    border: 0;
                    background: #fa6200;border-radius: 0;
                }
                ._footerOri {
                    background: #fff;
                    text-align: center;
                    min-height: 65px;
                    color: #e93030;
                    font-size: 12px;
                    padding: 10px 0 15px;
                    width: auto;
                }
            </style>
            <div class="row row-gutter-0">
                <div class="col-12-4 logo">
                    <a href="/"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" alt="LOGO"></a>
                </div>
            </div>
        </div>
    </div>
</header>

<footer>
    <!-- Footer-copyright -->
    <div class="footer-copyright _footerOri">
        <div class="container">
            <p class="font-serif">本网站属于菲律宾卡格杨（Cagayan）授权和监管所有版权归<span class="text-blue">天天彩票</span>所有，违者必究。</p>
            <p class="font-serif">Copyright &copy; 天天彩票 ALL RIGHT Reserved.</p>
        </div>
    </div>
</footer>
</body>

</html>
