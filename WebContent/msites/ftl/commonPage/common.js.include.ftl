<script type="text/javascript">
    var imgRoot='${data.configInfo.imgRoot}';
</script>
<#-- 站点消息订阅　-->
<script>
    var curTheme = '${curTheme}';
    var resComRoot = '${resComRoot}';
    var resRoot = '${resRoot}';
    var imgRoot = '${imgRoot}';
    var mdRoot='${mdRoot}';
    var rcVersion='${rcVersion}';
    var language='${language?replace("_","-")}';
</script>
<script type="text/javascript" src="/message_${language}.js?v=${rcVersion}"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<#--浮窗js-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/float.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/gui-base.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap-dialog.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery.super-marquee.js"></script>
<script src="${resComRoot}/js/jquery/plugins/jquery.validate/jquery.validate.js"></script>
<script src="${resComRoot}/js/gamebox/common/jquery.validate.extend.msites.js"></script>
<script src="${resComRoot}/js/bootstrap-daterangepicker/moment.js"></script><#--通用脚本-->

<script src="${resComRoot}/js/gamebox/common/main.js"></script>
<script src="${resComRoot}/js/curl/curl.js"></script>
<script type="text/javascript" language="JavaScript" src="${resComRoot}/js/gamebox/common/urlencode.js"></script>
<#--通用脚本-->
<script type="text/javascript">
    curl(['gb/home/TopPage','site/index/Comet'], function (TopPage,Comet) {
        comet = new Comet();
        topPage = new TopPage();
    });
</script>
<!--[if lt IE 9]>
  <script src="/ftl/commonPage/js/html5.js"></script>
<![endif]-->
