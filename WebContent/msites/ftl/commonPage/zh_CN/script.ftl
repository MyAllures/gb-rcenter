<#include "lottery.ftl">
<#--通用脚本-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<#--浮窗js-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/float.js"></script>
<#--特定模板下需要特别处理的在该模板下覆盖同名脚本-->
<script>
    var fltRootPath = '${data.configInfo.ftlRootPath}';
    var message = ${data.message};

    //处理iframe引用的问题
    try{window.top.language='zh-CN';}catch(ex){window.language='zh-CN';}
    /* 检查轮播图,不在展示时间内的移除掉,由于初始化顺序，位置不可移动 By Faker */
    $.ajax({
        url:'/index/getUserTimeZoneDate.html',
        dataType:"json",
        success:function(data){
            var nowTime = data.time;
            $("._vr_carousels_check").each(function(){
                var st = $(this).attr("starttime");
                var et = $(this).attr("endtime");
                if(st>nowTime || et<nowTime){
                    $(this).remove();
                }
            })
        }
    });
</script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/gui-base.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap-dialog.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery.super-marquee.js"></script>
<script src="${resComRoot}/js/jquery/plugins/jquery.validate/jquery.validate.js"></script>
<script src="${resComRoot}/js/gamebox/common/jquery.validate.extend.msites.js"></script>
<script src="${resComRoot}/js/bootstrap-daterangepicker/moment.js"></script><#--通用脚本-->
<link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/hb/css/pc.css">

<script>
    var curTheme = '${curTheme}';
    var resComRoot = '${resComRoot}';
    var resRoot = '${resRoot}';
    var imgRoot = '${imgRoot}';
    var mdRoot='${mdRoot}';
    var rcVersion='${rcVersion}';
</script>
<#-- 站点消息订阅　-->
<#--<script src="${resComRoot}/js/gamebox/common/main.js"></script>-->
<#--<script src="${resComRoot}/js/curl/curl.js"></script>-->
<#--<script type="text/javascript" language="JavaScript" src="${resComRoot}/js/gamebox/common/urlencode.js"></script>-->
<#--<script type="text/javascript">-->
    <#--curl(['gb/home/TopPage','site/index/Comet'], function (TopPage,Comet) {-->
        <#--comet = new Comet();-->
        <#--topPage = new TopPage();-->
    <#--});-->
<#--</script>-->

<script>
    /*全局变量；是否显示登录验证码*/
    var isOpenCaptcha = false;
    /*翻译过的时区*/
    var timezoneTran = "";
    var dateTimeFromat = "";
    var userTimeTimerId;
    var balanceQueryTriggerLimitTimer;
    var balanceAutoRefreshTimer;
    var HIDE_BALANCE_COOKIE_KEY = "BALANCE_HIDE";
    var REFRESH_BALANCE_TIME = "REFRESH_BALANCE_TIME";
    var PAGE_LANGUAGE = "_LANGUAGE";
    $(function () {
        openNewPopWindow();
        /*关闭浮动图*/
        closeFloatPic();
        userTime();
        changeLoginStatus();
        enterLogin();
        balanceRefresh();
        dropdownOpen();
        maintainCheck();
        initMenuEvents();
        /*通用真人手风琴脚本*/
        liveAccordion();
        /*轮播图占位符替换*/
        transWebUrlSlide();
        /*浮窗判断脚本*/
    <#if data.floatPicsInIndex??>
        <#list data.floatPicsInIndex as pic>
            <#if pic.location == "left">
                <#if pic.interactivity=="scroll_with_page">
                    if($("[data-fp='${pic.id}']").length>0){
                    $("[data-fp='${pic.id}']").Float({ <#if pic.distanceTop??>topSide: ${pic.distanceTop?string.computer}<#else>topSide:150</#if>, floatRight: 0,<#if pic.distanceSide??>side: ${pic.distanceSide?string.computer}<#else >side:0</#if>, close: 'aside-float' });
                    }
                </#if>
            </#if>
            <#if pic.location == "right">
                <#if pic.interactivity=="scroll_with_page">
                    if($("[data-fp='${pic.id}']").length>0){
                    $("[data-fp='${pic.id}']").Float({ <#if pic.distanceTop??>topSide: ${pic.distanceTop?string.computer}<#else>topSide:150</#if>, floatRight: 1,<#if pic.distanceSide??>side: ${pic.distanceSide?string.computer}<#else >side:0</#if>, close: 'aside-float' });
                    }
                </#if>
            </#if>
        </#list>
    </#if>
    });

    var current_language = getCookie(PAGE_LANGUAGE);
    if(current_language=="zh_CN"){
        $(".current_language").addClass("zh-CN");
        $(".current_language").text("简体中文");
    }else if(current_language=="zh_TW"){
        $(".current_language").addClass("zh-TW");
        $(".current_language").text("繁体中文");
    }else if(current_language=="en_US"){
        $(".current_language").addClass("en-US");
        $(".current_language").text("English");
    }else if(current_language=="ja_JP"){
        $(".current_language").addClass("ja-JP");
        $(".current_language").text("日文");
    }
    /*轮播图占位符替换*/
    function transWebUrlSlide(){
        var slide = $("._vr_carousels_check");
        if(slide){
            $("._vr_carousels_check").each(function(i,tar){
                var _href = $(tar).children("a").attr("href");
                if(_href != undefined && _href != ""){
                    if(_href.indexOf("http")>-1){
                        _href = _href;
                    }else{
                        _href = "http://" + _href;
                    }
                    if( _href.indexOf("\$\{website\}")>-1){
                        _href = _href.replace("\$\{website\}",window.location.host);
                    }
                    $(tar).children("a").attr("href",_href);
                }
            })
        }
    }

    /*切换语言*/
    $(".changeLanguage").on("click",function(){
        var _this = this;
        if(getCookie(PAGE_LANGUAGE)!= $(_this).data("language")){
            setCookie(PAGE_LANGUAGE,$(_this).data("language"));
            window.location.href="/";
        }
    });

    //手机投注添加链接
    $(".mobileBetting").on("click", function (e) {
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            return;
        }else{
            document.cookie = "ACCESS_TERMINAL=mobile;expires=0";
            window.location.replace(window.location.origin);
        }
    })

    //桌面快捷
    function createDesktop() {
        var sUrl = window.location.href;
        var sName = "<#if data.siteInfo.title?exists>${data.siteInfo.title}</#if>快捷方式";
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var shell = new ActiveXObject("WScript.Shell");
            var folderPath = shell.SpecialFolders("Desktop");//获取桌面本地桌面地址
            if (!fso.FolderExists(folderPath)) {
                fso.CreateFolder(folderPath);
            }
            if (!fso.FileExists(folderPath + "//" + sName + ".lnk")) {
                //在指定的文件夹下创建名为sName的快捷方式
                var shortLink = shell.CreateShortcut(folderPath + "//" + sName + ".lnk"); //相应的描述信息
                shortLink.Description = "shortcut for " + sName; //快捷方式指向的链接
                shortLink.TargetPath = sUrl; //激活链接并且窗口最大化
                shortLink.WindowStyle = 3;
                shortLink.Save();
                alert('桌面快捷方式创建成功！');
            }
        } catch (e) {
            doSave("<script>location.href='" + sUrl + "'</sc" + "ript>", "text/html", sName+".html");
        }
    }
    function doSave(value, type, name) {
        var blob;
        if (typeof window.Blob == "function") {
            blob = new Blob([value], {type: type});
        } else {
            var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
            var bb = new BlobBuilder();
            bb.append(value);
            blob = bb.getBlob(type);
        }
        var URL = window.URL || window.webkitURL;
        var bloburl = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        if ('download' in anchor) {
            anchor.style.visibility = "hidden";
            anchor.href = bloburl;
            anchor.download = name;
            document.body.appendChild(anchor);
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            anchor.dispatchEvent(evt);
            document.body.removeChild(anchor);
        } else if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, name);
        } else {
            location.href = bloburl;
        }
    }

    function initMenuEvents(){
        /*菜单选中状态 维护By Faker*/
        var dataPage = window.location.pathname.split("/")[1]==""?"index.html":window.location.pathname.split("/")[1];
        var currentNavSelector = '._vr_nav a[data-page="'+dataPage+'"]';

        var $currentNav = $(currentNavSelector).parent();
        $currentNav.siblings().removeClass("active");
        $currentNav.addClass("active");

        /*导航二级菜单 修复对代理页面的影响*/
        if(dataPage!='agent.html'){
            jQuery("._vr_nav").slide({
                type: "menu",
                titCell: "li",
                targetCell: ".dropdown-menu",
                effect: "slideDown",
                delayTime: 300,
                triggerTime: 0,
                returnDefault: true
            });
        }else{
            /*代理首页轮播图*/
            jQuery(".slide").hover(function() {
                jQuery(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.5)
            }, function() {
                jQuery(this).find(".prev,.next").fadeOut()
            });
            jQuery(".slide").slide({
                titCell: ".slide-indicators ul",
                mainCell: ".slide-inner ul",
                effect: "fold",
                autoPlay: true,
                interTime: 2500,
                autoPage: true,
                trigger: "click",
                // 切换图片时，才加载图片
                startFun: function(i) {
                    var curLi = jQuery(".slide .slide-inner li").eq(i);
                    if (!!curLi.attr("data-src")) {
                        curLi.css("background-image", curLi.attr("data-src")).removeAttr("data-src")
                    }
                }
            });
        }

        //通栏下拉导航
        var mega = {};
        var $activeElement;
        $('[rel]').hover(function() {
            $activeElement = $activeElement != undefined ?$activeElement : $('.active[rel]');
            var _rel = $(this).attr('rel');
            clearTimeout(mega[_rel + '_timer']);
            mega[_rel + '_timer'] = setTimeout(function() {
                $('[rel]').each(function() {
                    $(this)[_rel == $(this).attr('rel') ? 'addClass' : 'removeClass']('active');
                });
                $('#' + _rel).stop(true, true).slideDown("300");
            }, 150);
        }, function() {
            var _rel = $(this).attr('rel');
            clearTimeout(mega[_rel + '_timer']);
            mega[_rel + '_timer'] = setTimeout(function() {
                $('[rel]').removeClass('active');
                $activeElement.addClass('active');
                $('#' + _rel).stop(true, true).slideUp(300);
            }, 150);
        });
    }

    //设为首页
    function SetHome(url){
        if(url == "" || typeof url ==="undefined"){
            url ="http://"+window.location.host;
        }
        try{
            document.body.style.behavior='url(#default#homepage)';
            document.body.setHomePage(url);
        }catch(e){
            if(window.netscape){
                try{
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }catch(e){
                    alert("抱歉，此操作被浏览器拒绝！\n\n您需要手动将【"+url+"】设置为首页。");
                    // alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                }
            }else{
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
            }
        }
    }

    //收藏本站
    function AddFavorite(url,title) {
        if(url == "" || typeof url ==="undefined"){
            url =location.href;
        }
        if(title == "" || typeof title ==="undefined"){
            title = document.title;
        }
        try {
            window.external.addFavorite(url, title);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            }
            catch (e) {
                alert("抱歉，您所使用的浏览器无法完成此操作，请使用Ctrl+D进行添加");
            }
        }
    }

    /**
     * 首页公告弹窗
     * @param noticeId 公告id
     */
    function noticeDialog(target) {
        var _this = target;
        BootstrapDialog.show({
            title: '最新公告',
            message: function (dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
            type: BootstrapDialog.TYPE_WARNING,
            data: {
                'pageToLoad': '/commonPage/modal/notice-content.html'
            },
            onshown: function (dialoge) {

            }
        });
    }

    /**
     * 公告弹窗分页
     *
     */
    function noticeChangePageAjax(target) {
        var $this = target;
        var num = $this.attributes["data-page-num"].value;
        $.ajax({
            url: '/commonPage/modal/notice-content.html?pageNumber=' + num + "&apiType=announcementPage",
            type: "POST",
            success: function (data) {
                $(".msgbox").html(data);
            }
        })
    }
    /*
    * 设置cookie
    * @param c_name
    * @param value
    * @param expiredays
    * */
    function setCookie(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+";path=/"+
                ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
    /**
     * 获取cookie
     * @param c_name cookie key
     */
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    function alert(message){
        BootstrapDialog.alert({
            message:message,
            title:'提示信息',
            type: BootstrapDialog.TYPE_WARNING
        });
    }

    function getlocationParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return r[2]; return null;
    }


    //首页弹窗
    function homeDialog(){
    <#assign flag = true>
    <#if data.carousels??>
        <#list data.carousels as carousel>
            <#if flag && carousel["type"]="carousel_type_ad_dialog">
                <#if .now?date gt carousel["start_time"]?date && .now?date lt carousel["end_time"]?date>
                    <#if carousel["cover"]??><#assign imgSrc=imgPath(data.configInfo.domain,carousel["cover"])></#if>
                    <#if carousel["name"]??><#assign imgTitl=carousel["name"]></#if>
                    <#if carousel["link"]??><#assign link=carousel["link"]></#if>
                    <#assign flag = false >
                </#if>
            </#if>
        </#list>
    </#if>
    <#if imgSrc??>
        BootstrapDialog.show({
            draggable: true,
            title: "${imgTitl}",
        <#--title: "${.now}",-->
            size: 'index-modal',
            message: function(dialog) {
                var _href = "${link}";
                if(_href!=undefined && _href!=""){
                    if(_href.indexOf("http")>-1){
                        _href = _href;
                    }else{
                        _href = "http://"+_href;
                    }
                    if(_href.indexOf("\$\{website\}")>-1){
                        _href = _href.replace("\$\{website\}",window.location.host);
                    }
                }else{
                    _href = "javascript:void(0)";
                }
                var $message = $('<a href="'+_href+'"><img  src="${imgSrc}"/></a>');
                return $message;
            }
        });
        // 定时关闭
        setTimeout(function () {
            $(".index-modal").modal("hide")
        }, 60000);
    </#if>
    }
    /*公共维护状态检测设置 By Faker*/
    function maintainCheck(){
        var newTime = $("._user_time").attr("time");
        $("._vr_mt_check").each(function(){
            if($(this).hasClass("jumpOver")){
                return;
            }
            var startTime = $(this).attr("starttime");
            var endTime = $(this).attr("endtime");
            var sVal = parseInt(startTime);
            var eVal = parseInt(endTime);
            var apiId = $(this).data("api");
            var gameName = $(this).data("gameName");
            var gameCode = $(this).data("gameCode");
            var dropdown = $(this).data("mtIc");//需要维护的游戏块的class：_vr_mt_<apiTypeName>_<apiId>
            if(sVal<newTime && eVal > newTime){
                handleMt($(this));
                if(!$(this).hasClass("_vr_mt_no")){
                    $(this).attr("onclick","maintainInfo("+startTime+","+endTime+","+apiId+",'"+gameName+"')");
                }
                if(typeof dropdown != 'undefined'){
                    var $handle = $("."+dropdown).find("a");
                    handleMt($handle);
                    $handle.attr("onclick","maintainInfo("+startTime+","+endTime+","+apiId+",'"+gameName+"')");
                    $handle.addClass("jumpOver");
                }
            }else{
                if(!$(this).hasClass("_vr_mt_no")){
                    if( typeof ($(this).attr("data-href")) != 'undefined'){
                        //判断体育游戏是否嵌套显示;
                        if($(this).data("href").indexOf("sports.html")>=0 || $(this).data("href").indexOf("sports-inner.html")>=0 || $(this).data("href").indexOf("sports-detail.html")>=0 || ($(this).data("sports")!=undefined && $(this).data("sports").indexOf("sports")>=0)){
                            //https协议请求
                            var protocol = window.location.protocol;
                            if(protocol.indexOf("https:")>-1){
                                //https协议支持体育嵌套
                                if(apiId=="4" || apiId=="19" || apiId=="12"){
                                    $(this).attr("href",$(this).data("href"));
                                }else{
                                    $(this).attr("href","javascript:");
                                    $(this).attr("onclick","apiLogin("+apiId+",'',"+$(this).data("apitype")+")");
                                }
                            }else{
                                if(apiId=="23"){
                                    $(this).attr("href","javascript:");
                                    $(this).attr("onclick","apiLogin("+apiId+",'',"+$(this).data("apitype")+")");
                                }else{
                                    $(this).attr("href",$(this).data("href"));
                                }
                            }
                        }else{
                            $(this).attr("href",$(this).data("href"));
                        }
                    }else if(typeof gameCode != "undefined"){
                        //电子游戏
                        if($(this).hasClass("game-demo")){
                            $(this).attr("onclick","apiLoginDemo("+apiId+",'"+gameCode+"',2)");
                        }else{
                            $(this).attr("onclick","apiLogin("+apiId+",'"+gameCode+"',2)");
                        }
                    }else {
                        if($(this).data("api")=="3"){
                            if($(this).hasClass("game-demo")){
                                $(this).attr("onclick","apiLoginDemo("+apiId+",'SPPlayboy',"+$(this).data("apitype")+")");
                            }else{
                                $(this).attr("onclick","apiLogin("+apiId+",'SPPlayboy',"+$(this).data("apitype")+")");
                            }
                        }else {
                            if($(this).hasClass("game-demo")){
                                $(this).attr("onclick","apiLoginDemo("+apiId+",'',"+$(this).data("apitype")+")");
                            }else{
                                if($(this).data("api")=="22"){
                                    //添加this，彩票站要根据单个彩种进入相应的投注页面
                                    $(this).attr("onclick","apiLogin("+apiId+",'',"+$(this).data("apitype")+",this)");
                                }else{
                                    $(this).attr("onclick","apiLogin("+apiId+",'',"+$(this).data("apitype")+")");
                                }
                            }
                        }
                    }
                }
            }
        });

        /*//https协议请求;修改导航的体育链接
        var protocol = window.location.protocol;
        if(protocol.indexOf("https:")>-1){
            $("a").each(function(){
                var dataPage = $(this).attr("data-page");
                if(dataPage!=null && dataPage.indexOf("sports.html")>=0){
                    $(this).attr("href","sports.html");
                }
            });
        }*/
    }
    function handleMt($handle){
        $handle.each(function(){
            if($(this).hasClass("_vr_mt_slogan")){
                $(this).text("维护中");
            }
            if($(this).hasClass("_vr_mt_ptSlogan")){
                $(this).text("(维护中)");
            }
            if($(this).hasClass("_vr_mt_gray")){
                $(this).css("color","#999");
            }
        });
        $handle.find("._vr_mt_slogan").text("维护中");
        $handle.find("._vr_mt_ptSlogan").text("(维护中)");
        $handle.find("._vr_mt_gray").css("color","#999");
    }
    //公共维护弹窗
    function maintainInfo(st, et,apiId,gameName){
        var apiName = getApiName(apiId);
        var sTime = moment(st).utcOffset(sessionStorage.getItem("timezone")).format("yyyy-MM-dd HH:mm:ss");
        var eTime = moment(et).utcOffset(sessionStorage.getItem("timezone")).format("yyyy-MM-dd HH:mm:ss");

        //传参进来时 gameName 加了引号转成string类型了 by Faker
        if(gameName == 'undefined' || typeof gameName == 'undefined'){
            BootstrapDialog.alert({
                message:"<div>尊敬的客户您好：</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+apiName+" 平台将于"+transTimeZone(sessionStorage.getItem("timezone"))+" "+sTime+" - "+eTime+"进行维护，维护时间若有变动将另行通知。 给您带来的不便，请您谅解！</div>",
                title:'提示信息',
                type: BootstrapDialog.TYPE_PRIMARY
            });
        }else{
            BootstrapDialog.alert({
                message:"<div>尊敬的客户您好：</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+gameName+" 游戏将于"+transTimeZone(sessionStorage.getItem("timezone"))+" "+sTime+" - "+eTime+"进行维护，维护时间若有变动将另行通知。 给您带来的不便，请您谅解！</div>",
                title:'提示信息',
                type: BootstrapDialog.TYPE_PRIMARY
            });
        }

    }
    function transTimeZone(timezone){
        var tz = sessionStorage.getItem("timezone");
        var trans =timezone;
        switch (tz){
            case "GMT+08:00":
                trans = "北京时间";break;
            case "GMT-04:00":
                trans = "美东时间";break;
        }

        return trans;
    }

    /*浮动图*/
    function closeFloatPic(){
        var floats = $(".float-services");

        if(floats){
            $(floats).each(function(i,float){
                if(window.sessionStorage && sessionStorage.getItem("is_float_close_"+$(float).data("fp")) != "true"){
                    sessionStorage.setItem("is_float_close_"+$(float).data("fp"),"false");
                }
                if(window.sessionStorage && sessionStorage.getItem("is_float_close_"+$(float).data("fp")) == "false"){
                    $(float).show();
                }
                var $li = $("li",floats[i]);
                var leftCloseExist = $li.hasClass("left_close_btn");
                var rightCloseExist = $li.hasClass("right_close_btn");
                //判断上传关闭图片是否开启
                if($(floats[i]).hasClass("hasClose")){
                    if(leftCloseExist){
                        $(".left_close_btn").addClass("_close");
                        $(".left_close_btn a").attr("href","javascript:void(0)");
                    }else if(rightCloseExist){
                        $(".right_close_btn").addClass("_close");
                        $(".right_close_btn a").attr("href","javascript:void(0)");
                    }
                }else{
                    if(leftCloseExist){
                        $(".left_close_btn").addClass("hide");
                    }else if(rightCloseExist){
                        $(".right_close_btn").addClass("hide");
                    }
                }
                transWebUrlTag($li);
            });
            //点击关闭浮动图
            $("._close").on("click",function(){
                var _this = this;
                var showEffect = $(_this).parent().hasClass("show_effect");
                if (window.sessionStorage && !showEffect){
                    sessionStorage.setItem("is_float_close_"+$(_this).parent().data("fp"),"true");
                }
                $(_this).parent().hide();
            });
        }
    }
    function transWebUrlTag(tarLi){
        $(tarLi).each(function(i,tar){
            var _href = $(tar).children("a").attr("href");
            if(typeof _href!="undefined" && _href.indexOf("\$\{website\}")>-1){
                $(tar).children("a").attr("href",_href.replace("\$\{website\}",window.location.host))
            }
        })
    }

    //当前站点的api name
    function getApiName(apiId){
        if (apiId == '1')  return '<#if data.siteApiI18nMap['1']??>${data.siteApiI18nMap['1'].name}</#if>';
        if (apiId == '2')  return '<#if data.siteApiI18nMap['2']??>${data.siteApiI18nMap['2'].name}</#if>';
        if (apiId == '3')  return '<#if data.siteApiI18nMap['3']??>${data.siteApiI18nMap['3'].name}</#if>';
        if (apiId == '4')  return '<#if data.siteApiI18nMap['4']??>${data.siteApiI18nMap['4'].name}</#if>';
        if (apiId == '5')  return '<#if data.siteApiI18nMap['5']??>${data.siteApiI18nMap['5'].name}</#if>';
        if (apiId == '6')  return '<#if data.siteApiI18nMap['6']??>${data.siteApiI18nMap['6'].name}</#if>';
        if (apiId == '7')  return '<#if data.siteApiI18nMap['7']??>${data.siteApiI18nMap['7'].name}</#if>';
        if (apiId == '8')  return '<#if data.siteApiI18nMap['8']??>${data.siteApiI18nMap['8'].name}</#if>';
        if (apiId == '9')  return '<#if data.siteApiI18nMap['9']??>${data.siteApiI18nMap['9'].name}</#if>';
        if (apiId == '10')  return  '<#if data.siteApiI18nMap['10']??>${data.siteApiI18nMap['10'].name}</#if>';
        if (apiId == '11')  return  '<#if data.siteApiI18nMap['11']??>${data.siteApiI18nMap['11'].name}</#if>';
        if (apiId == '12')  return  '<#if data.siteApiI18nMap['12']??>${data.siteApiI18nMap['12'].name}</#if>';
        if (apiId == '14')  return  '<#if data.siteApiI18nMap['14']??>${data.siteApiI18nMap['14'].name}</#if>';
        if (apiId == '15')  return  '<#if data.siteApiI18nMap['15']??>${data.siteApiI18nMap['15'].name}</#if>';
        if (apiId == '16')  return  '<#if data.siteApiI18nMap['16']??>${data.siteApiI18nMap['16'].name}</#if>';
        if (apiId == '17')  return  '<#if data.siteApiI18nMap['17']??>${data.siteApiI18nMap['17'].name}</#if>';
        if (apiId == '19')  return  '<#if data.siteApiI18nMap['19']??>${data.siteApiI18nMap['19'].name}</#if>';
        if (apiId == '20')  return  '<#if data.siteApiI18nMap['20']??>${data.siteApiI18nMap['20'].name}</#if>';
        if (apiId == '21')  return  '<#if data.siteApiI18nMap['21']??>${data.siteApiI18nMap['21'].name}</#if>';
        if (apiId == '22')  return  '<#if data.siteApiI18nMap['22']??>${data.siteApiI18nMap['22'].name}</#if>';
        if (apiId == '23')  return  '<#if data.siteApiI18nMap['23']??>${data.siteApiI18nMap['23'].name}</#if>';
        if (apiId == '24')  return  '<#if data.siteApiI18nMap['24']??>${data.siteApiI18nMap['24'].name}</#if>';
        if (apiId == '25')  return  '<#if data.siteApiI18nMap['25']??>${data.siteApiI18nMap['25'].name}</#if>';
    }

    /*新开弹窗*/
    function openNewPopWindow(){
        var width;
        var size ;
        $(".openNewWindow").on("click",function(){
            var url =  $(this).data("url");
            size = typeof ($(this).data("winSize"))!='undefined'?$(this).data("winSize"):"1";
            if (size =="1") width = "960";
            if (size =="2") width = "1100";
            if ($(this).data("random")){
                url = url +"?t="+ new Date().getTime().toString(36)
            }
            window.open(url,"NewWindow","width="+width+",height=600,top=50,left=50");
        })
    }

    /*找回用户名弹窗*/
    function forgetUsername(){
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_PRIMARY,
            title:'找回用户名',
            message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);

                return $message;
            },
            data: {
                'pageToLoad': '/commonPage/modal/lost-username.html?t='+ new Date().getTime().toString(36)
            }
        });
    }

    //技术支援
    function support(e){
        var _this = e;
        var win_height = $(window).height();
        var win_width = $(window).width();
        var width = (win_width-1100)/2;
        var height = (win_height-750)/2;

        var url =  "/commonPage/support/index.html";
        if ($(_this).data("random")){
            url = url +"?t="+ new Date().getTime().toString(36);
        }
        window.open(
                url,
                "NewWindow",
                "width="+1100+",height="+750+",top="+height+",left="+width+",resizable,scrollbars=yes,status=yes,centerscreen=yes,toolbar=yes"
        );
    }

    /*客服弹窗*/
    function getCustomerService(){
        window.open("<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>")
    }

    function balanceRefresh(){
        setCookie(REFRESH_BALANCE_TIME,0);
        $("._vr_balanceBox").mouseenter(function(){
            var isAutoPay = getCookie("isAutoPay");
            if(isAutoPay == 'true') {
                $("li[name='apiPreNode']").html(' <a href="javascript:" onclick="recoveryApi()"><span class="icon-back-m"></span>一键回收</a>');
            } else {
                $("li[name='apiPreNode']").html('<a href="javascript:" onclick="getApiBalance()"><span class="pull-right gui gui-refresh"></span>刷新余额</a>')
            }
            if (getCookie(REFRESH_BALANCE_TIME)>0){
            }else {
                if(sessionStorage.is_login=="true") {
                    clearInterval(balanceQueryTriggerLimitTimer);
                    setCookie(REFRESH_BALANCE_TIME, 2);
                    balanceQueryTriggerLimitTimer = setInterval(function(){
                        var intervalSec = getCookie(REFRESH_BALANCE_TIME);
                        intervalSec = Number(intervalSec);
                        intervalSec = --intervalSec;
                        if(intervalSec<0){
                            clearInterval(balanceQueryTriggerLimitTimer);
                        }
                        setCookie(REFRESH_BALANCE_TIME,intervalSec);
                    },500);
                    getApiBalance();
                }
            }
        });

    }
    /**
     * 刷新api余额
     */
    function getApiBalance(){
        var isAutoPay = getCookie("isAutoPay");
        if(isAutoPay == 'true') {
            getAllApiBalance();
        } else {
            getNotAutoPayApiBalance();
        }
    }

    function getNotAutoPayApiBalance() {
        var apiLiObj = $("._apiBalance");
        $.ajax({
            url:"/ntl/refreshBalance.html?t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            beforeSend:function(){
                if(typeof apiLiObj == 'undefined'){
                    var  apiHtml = '<li class="balLoding"><a href="#"><span class="gui gui-spinner gui-pulse"></a></li>';
                    $("li[name=apiPreNode]").next().after(apiHtml);
                }else {
                    $(apiLiObj).find("span").text("");
                    $(apiLiObj).find(".text-warning").removeClass("text-warning").addClass("gui gui-spinner gui-pulse")
                }
            },
            success:function(data){

                /*已经登录*/
                if(data.isLogin){
                    /*apis余额*/
                    var apiHtml = '';
                    for(var i = 0;data.api[i];i++){
                        apiHtml += '<li class="_apiBalance"><a href="#">'+data.api[i].apiName+'：'+'<span class="text-warning balance1 hide">--  </span>'+'<span class="text-warning balance2">'+data.api[i].balance+'</span></a></li>';
                    }
                    $('._apiBalance').remove();
                    $("li[name=apiPreNode]").next().after(apiHtml);
                    /*刷新钱包余额*/
                    $("._vr_player_balance").text(data.playerBalance);
                    $('._vr_wallet_balance').text(data.walletBalance);
                }
                hideBalanceIfModeHide();
            },
            complete:function(){
                $(".balLoding").remove();
            },
            error:function(){
            }

        });
    }


    /******************** 顶部时间 *******************/
    function userTime(isTranslate){
        $.ajax({
            url:'/index/getUserTimeZoneDate.html',
            dataType:"json",
            async:false,
            success:function(data){
                timezoneTran = data.timezone;
                if(isTranslate!=undefined){
                    timezoneTran = transTimeZone(timezoneTran)
                }
                dateTimeFromat=data.dateTimeFromat;
                $("._user_time").text(timezoneTran + " " + data.dateTime);
                $("._user_time").attr("time",data.time);
                $("._user_time").css("display","inline");
                //agent.html 时区
                sessionStorage.setItem("timezone",data.timezone);
                if(userTimeTimerId) {
                    window.clearInterval(userTimeTimerId);
                }
                userTimeTimerId=window.setInterval(function () {
                    changeTimeTimer();
                },1000);
            }
        });
    }

    function changeTimeTimer(){
        var $userTime =  $("._user_time");
        if(dateTimeFromat && $userTime.attr("time")) {
            var date = new Date();
            date.setTime(parseInt($userTime.attr("time"))+1000);
            $userTime.attr("time",date.getTime());
            var theMoment=moment(date);
            theMoment.utcOffset(sessionStorage.getItem("timezone"),false);
            $userTime.text(timezoneTran + " " + theMoment.format(dateTimeFromat));
        }
    }
    /******************** 验证码 *******************/

    /*验证码点击切换 By Faker*/
    $("._vr_captcha_code").on("click",function(e){
        var $this = $(this);
        var src = "${data.contextInfo.playerCenterContext}captcha/"+$this.data().code+".html?t=" + new Date().getTime().toString(36);
        $this.prop("src",src)
        $(this).parents("form").find("input[name='captchaCode']").val("").focus();
        $(this).parents("form").find("input[name='captcha']").val("").focus();
    });

    /******************** api登陆 *******************/

    /*api登录*/
    function apiLogin(apiId, gameCode, apiTypeId,thiz) {
        //判断试玩模式
        var demoModel = sessionStorage.demoModel;
        if(demoModel){
            if(demoModel == "MODEL_4_PLATFORM"){
                alert("请使用正式账号登录");
                return;
            }else if(demoModel == "MODEL_4_MOCK_ACCOUNT"){
                if(apiId != 21 && apiId != 22){
                    alert("模拟账号不能登录该游戏");
                    return;
                }
            }
        }
        //根据thiz判断是否可以直接进入对应彩票
        if(apiId == "22" && $(thiz).attr("data-lottery-code")!=undefined){
            gameCode = $(thiz).attr("data-lottery-code");
        }
        //未登录的时候
        if(sessionStorage.is_login!="true"){
            if (apiId == "22") {
                var newWindow = window.open();
                newWindow.location = "/commonPage/gamePage/loadingUnLoginLottery.html?lottery_code="+gameCode;
            }else {
                var protocol = window.location.protocol;
                if(protocol.indexOf("https:")>-1){
                    loginObj.getLoginPopup(function (logined) {
                        if(logined){
                            if(apiTypeId == "3" && apiId=="19"){
                                window.open("https://mkt.ampinplayopt0matrix.com?lang=cs");
                            }else if(apiTypeId == "3" && apiId=="21"){
                                window.open("http://sports-hg.com");
                            }else{
                                currentPage(apiId);
                            }
                        }
                    });
                }else{
                    loginObj.getLoginPopup();
                }
            }
            return;
        }
        if (apiId) {
            var newWindow = window.open();
            newWindow.location ="/commonPage/gamePage/loading.html?apiId="+apiId+"&apiTypeId="+apiTypeId+"&gameCode="+gameCode;
        }
    }

    //试玩登录
    function apiLoginDemo(apiId, gameCode, apiTypeId) {
        var demoModel = sessionStorage.demoModel;
        if(demoModel){
            if(demoModel == "MODEL_4_MOCK_ACCOUNT"){
                alert("模拟账号不能登录该游戏");
                return;
            }
        }
        if (apiId) {
            var newWindow = window.open();
            newWindow.location ="/commonPage/gamePage/loadingDemo.html?apiId="+apiId+"&apiTypeId="+apiTypeId+"&gameCode="+gameCode;
        }
    }
    //彩票试玩登录
    function lotteryDemo() {
        $.ajax('/demo/lottery.html', {
            dataType: 'json',
            success: function (data) {
                if (data) {
                    changeLoginStatus();
                }
            }
        });
    }
    //创建免费试玩账号
    function createFreeAccount() {
        $.ajax('/register/createFreeAccount.html', {
            dataType: 'json',
            success: function (data) {
                if (data&&data.status==true) {
                    BootstrapDialog.alert({
                        title: '提示',
                        message: "恭喜您，注册成功!",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttonLabel: '确定',
                        callback: function(result) {
                            if (result){
                                changeLoginStatus();
                            }
                        }
                    });
                }else if(data&&data.status==false) {
                    sessionStorage.demoModel = "";
                    alert(data.msg);
                }else{
                    sessionStorage.demoModel = "";
                }
            },error:function (state,obj) {
                alert("免费试玩账号异常");
                sessionStorage.demoModel = "";
            }
        });
    }

    function currentPage(apiId){
        if (apiId == "4"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://im.ampinplayopt0matrix.com");
        }else if (apiId=="12"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://hyxu36.uv178.com/whb/view.php");
        }else if(apiId=="19"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://mkt.ampinplayopt0matrix.com?lang=cs");
        }/*else if(apiId=="23"){
            document.getElementById('sportFrame').contentWindow.location.replace("http://opussport.ampinplayopt0matrix.com/sports.aspx");
        }else if(apiId=="21"){
            document.getElementById('sportFrame').contentWindow.location.replace("http://sports-hg.com");
        }*/
    }

    function apiLoginReal(apiId, gameCode, apiTypeId) {
        $.ajax({
            type: "POST",
            url: "/api/login.html?t=" + new Date().getTime().toString(36),
            dataType: "JSON",
            data: {
                apiId: apiId,
                gameCode: gameCode,
                apiTypeId: apiTypeId,
                gamesHall: window.location.href
            },
            success: function(data) {
                if (data.loginSuccess) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        /*https协议的请求*/
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            if (apiTypeId == "3" && apiId=="15") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4" && apiId=="22"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }else{
                                //处理https不兼容的情况
                                /*游戏调转链接不支持https，所以不能嵌套在对应的-game.ftl里面*/
                                window.location=result.defaultLink;
                                return;
                            }
                        }else{
                            /*http协议的请求*/
                            if(apiTypeId == "3" && apiId =="10"){//BBIN 跳转特殊处理 跳转会不对应游戏类型
                                window.location=result.defaultLink;
                                return;
                            }
                            if (apiTypeId == "2") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            }else if(apiTypeId == "3"){
                                if (window.localStorage) {
                                    localStorage.re_url_sport = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            }else if(apiTypeId == "1"){
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }
                        }
                    } else {
                        var redirectUrl = result.links[apiTypeId];
                        if (apiTypeId != "3") {
                            redirectUrl = "/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        } else {
                            redirectUrl = "/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        }
                        window.location=redirectUrl;
                    }
                } else {
                    if (!data.loginSuccess &&( data.errMsg =='' || data.errMsg == null)){
                        BootstrapDialog.alert({
                            title: '提示',
                            message: '游戏暂时无法登录，请稍候再试！',
                            type: BootstrapDialog.TYPE_WARNING,
                            buttonLabel: '确定',
                            callback: function(result) {
                                if (result){
                                    window.close();
                                }
                            }
                        });
                    }else {
                        BootstrapDialog.alert({
                            title: '提示',
                            message: data.errMsg,
                            type: BootstrapDialog.TYPE_WARNING,
                            buttonLabel: '确定',
                            callback: function(result) {
                                if (result){
                                    window.close();
                                }
                            }
                        });
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    window.close();
                    loginObj.getLoginPopup();
                }else {
                    BootstrapDialog.alert({
                        title: '提示',
                        message: '游戏暂时无法登录，请稍候再试！',
                        type: BootstrapDialog.TYPE_WARNING,
                        buttonLabel: '确定',
                        callback: function(result) {
                            if (result){
                                window.close();
                            }
                        }
                    });
                }
            }
        });
    }

    /******************** 下拉资产 *******************/

    /*
  * 设置 隐藏/取消隐藏 余额
  *  @param bol 是否隐藏，参数为空 从cookie中判断
  * */
    function changeBalanceHide(bol){
        if(typeof bol === 'undefined'){
            /*cookie中判断是否需要隐藏*/
            var cookie = getCookie(HIDE_BALANCE_COOKIE_KEY);
            changeBalanceHide(cookie === 'true' ? true:false);

        }else if(bol){
            /*隐藏余额*/
            $('span._vr_wallet_balance').hide();
            $('span.eye').removeClass('gui-eye').addClass('gui-eye-slash').attr('title', '显示余额');
            $('li.f_refresh').hide();
            $('li[name=apiPreNode]').hide();
            $('li[name=apiPreNode]').next().hide();
            $('[name=balanceStatus]').val(1);

            $("[name=balance_hide]").show();
            $("[name=balance_show]").hide();
            $(".balance1").removeClass("hide");
            $(".balance2").addClass("hide");
            setCookie(HIDE_BALANCE_COOKIE_KEY,true)
        }else{
            /*取消隐藏余额*/
            $('span._vr_wallet_balance').show();
            $('span.eye').removeClass('gui-eye-slash').addClass('gui-eye').attr('title', '隐藏余额');
            $('li.f_refresh').show();
            $('li[name=apiPreNode]').show();
            $('li[name=apiPreNode]').next().show();
            $('[name=balanceStatus]').val(0);

            setCookie(HIDE_BALANCE_COOKIE_KEY,false);
            $("[name=balance_hide]").hide();
            $("[name=balance_show]").show();
            $(".balance1").addClass("hide");
            $(".balance2").removeClass("hide");
        }
    }
    function balanceStatus() {
        var $bs = $('[name=balanceStatus]');
        var bs = $bs.val();
        changeBalanceHide(bs == 0);
    }

    function hideBalanceIfModeHide(){
        var hideFlag = getCookie(HIDE_BALANCE_COOKIE_KEY);
        if(hideFlag === "true"?true:false){
            changeBalanceHide(true);
        }else {
            changeBalanceHide(false);
        }
    }


    /******************** 用户登陆登出 *******************/

    /* 回车登录 */
    function enterLogin() {
        $("._vr_unLogin input").keydown(function(e) {
            var $this = $(this);
            if (e.which == 13) {
                /* 阻止重复提交 By Faker */
                if($("._vr_login",$this.parents("form")).css("pointer-events")!="none"){
                    $("._vr_login",$this.parents("form")).trigger("click");
                }
            }
        });
    }

    /**
     * 登录弹出框
     */
    var loginObj  = {
        loginDialog:null,
        getLoginPopup:function (callback){
            if(sessionStorage.is_login=="true"){
                return;
            }
            loginObj.loginDialog = BootstrapDialog.show({
                title:'会员登录',
                type: BootstrapDialog.TYPE_WARNING,
                message: function(dialog) {
                    var $message = $('<div></div>');
                    var pageToLoad = dialog.getData('pageToLoad');
                    $message.load(pageToLoad);

                    return $message;
                },
                onhide: function(dialogRef){
                    if(sessionStorage.is_login=="true"){
                        callback && callback();
                    }else{
                        callback && callback(true);
                    }
                    return true;
                },
                data: {
                    'pageToLoad': '/commonPage/modal/system-login.html'
                }
            });
        },
        closeLoginPopup:function(){
            loginObj.loginDialog && loginObj.loginDialog.close();
        },
        doLogin:function($this,callback,loginText){
            login($this,null,loginText);
            var statusTimer = setInterval(function(){
                if(sessionStorage.is_login=="true"){
                    clearInterval(statusTimer);
                    callback && callback();
                }
            },1000);
        }
    };

    /**
     * 绑定登录事件
     */
    $("._vr_login").on("click", function (e) {
        var loginText = $(e.target).text();
        /* 阻止重复提交 By Faker */
        if(loginText==""){
            $(e.target).css("pointer-events","none");
        }else{
            $(e.target).text("登录中").css("pointer-events","none");
        }
        var $this = $(this);
        loginObj.doLogin($this, function () {
            if (window.location.pathname.split("/")[1] != '' && window.location.pathname.split("/")[1] != "index.html") {
                window.location.href = "/";
            }
        },loginText);
    });

    /**
     * 登录后修改登录状态
     */
    function changeLoginStatus(){
        $.ajax({
            url:"/headerInfo.html?t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            beforeSend:function(){
                if (window.sessionStorage && (sessionStorage.is_login ==="false" || typeof sessionStorage.is_login ==="undefined")) {
                    $("._vr_unLogin").show();
                    sessionStorage.is_login = false;
                }
            },
            success:function(data){

                /*已经登录*/
                if(data.isLogin){
                    sessionStorage.is_login = true;
                    sessionStorage.demoModel = data.demoModel;
                    setCookie("isAutoPay", data.isAutoPay);
                    /*登录成功div jquery对象*/
                    var $loginSuccess = $("._vr_loginSuccess");
                    /*头部 登录成功内容*/
                    /*替换 昵称*/
                    $loginSuccess.find("._vr_nickname").text(data.nickname);
                    /*替换 未读消息数*/
                    $loginSuccess.find("._vr_messageCount").text(data.messageCount);
                    /*钱包余额*/
                    $loginSuccess.find("._vr_player_balance").text(data.playerBalance);
                    /*钱包余额*/
                    $loginSuccess.find("._vr_wallet_balance").text(data.walletBalance);
                    /* 玩家货币 */
                    /*$loginSuccess.find(".currency").text(data.currency);*/

                    /*显示登录成功内容*/
                    $loginSuccess.show();
                    $("._vr_unLogin").hide();
                    /*刷新钱包余额*/
                    $("._vr_player_balance").text(data.playerBalance);
                    $("._vr_wallet_balance").text(data.walletBalance);
                    changeBalanceHide();
//                    getApiBalance();
                    if (window.sessionStorage){
                        sessionStorage.is_login = true;
                    }
                    isOpenCaptcha = false;
                    if(typeof(comet)=="undefined"){
                        return;
                    }
                <#-- 站点消息订阅　-->
//                    if(!comet.isConnect){
//                        comet.connection();
//                    }
                }else{
                    var dataPage = window.location.pathname.split("/")[3];
                    if(dataPage=='loading.html'){
                        window.location.href='/';
                    }
                    /*强制踢出*/
                    if(data.isKickOut) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_PRIMARY,
                            title: data.KickOutMessage.title,
                            message: data.KickOutMessage.message
                        });
                    }
                    /*未登录*/
                    $("._vr_unLogin").show();
                    if(window.sessionStorage){
                        sessionStorage.is_login = "false";
                    }

                    /*是否显示验证码*/
                    if(data.isOpenCaptcha){
                        /*显示验证码*/
                        isOpenCaptcha = true;
                        $("._vr_login","._vr_unLogin").removeAttr("style");//判断个别情况永利登陆按钮取消样式
                        $("._vr_unLogin").each(function(){
                            var captchaObj =  $(this).find("._vr_captcha_code");
                            $(captchaObj).attr("src","${data.contextInfo.playerCenterContext}captcha/"+$(captchaObj).data("code")+".html?t="+ new Date().getTime().toString(36));
                        })
                        $("._vr_captcha_box").show();
                    }else{
                        /*隐藏验证码*/
                        $("._vr_captcha_box").hide();
                    }
                }
            },
            error:function(){
            },
            complete:function(){
                /*重新绑定隐藏元素的事件*/
                openNewPopWindow();
            }

        });
    }
    /*
      * @param data 登录成功后的参数
      * @param $form jquery 对象
      * */
    function afterLogin(data,$form,callback,obj,loginText){
        if(data.success){
            sessionStorage.is_login = true;
            isOpenCaptcha = false;
            var currentPage = window.location.pathname.split("/")[1]==""?"index.html":window.location.pathname.split("/")[1];
            if(currentPage=="register.html"){
                window.location.href="/";
            }
            /*处理登录成功后头部信息*/
            changeLoginStatus();
            setCookie(REFRESH_BALANCE_TIME,0);
            callback && callback()
        }else{
            $(obj).text(loginText).css("pointer-events","auto");
            var msg = data.message;
            if(msg == null){
                msg = data.propMessages.captcha;
            }
            alert(msg);
            if(data.isOpenCaptcha){
                $("._vr_login",$form).removeAttr("style");//判断个别情况永利登陆按钮取消样式
                var captchaObj =  $("._vr_captcha_code",$form);
                $(captchaObj).attr("src","${data.contextInfo.playerCenterContext}captcha/"+$(captchaObj).data("code")+".html?t="+ new Date().getTime().toString(36));
                $("._vr_captcha_box").show();
                isOpenCaptcha = true;
            }
            if(!data.propMessages.captcha){
                /*如果不是验证码错误，更换验证码*/
                $("._vr_captcha_code").trigger("click");
            }
        }
    }

    function login(obj,callback,loginText){
        var $this = $(obj);
        var $form = $this.parents("form");
        var url = "/passport/login.html?t="+ new Date().getTime().toString(36);
        if($('[name=username]',$form).val().trim() && $('[name=password]',$form).val().trim()){
            if(isOpenCaptcha && !$("[name=captcha]",$form).val()){
                alert("请输入验证码！");
                $this.find("span").removeClass("loading gui gui-spinner gui-pulse");
                $this.parent().children("a").removeClass("not-active");
                $this.text(loginText).css("pointer-events","auto");
            }else{
                $.ajax({
                    type:"POST",
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    url:url,
                    data:$form.serialize(),
                    dataType:"JSON",
                    success:function(data){
                        afterLogin(data,$form,callback,obj,loginText);
                    },
                    error:function(error) {
                        if(error.responseJSON.propMessages){
                            window.location.href=error.responseJSON.propMessages.location;
                        }
                    },
                    complete: function () {
                        $this.find("span").removeClass("loading gui gui-spinner gui-pulse");
                        $this.parent().children("a").removeClass("not-active");
                    }
                })
            }
        }else{
            alert("用户名密码不能为空!");
            $this.find("span").removeClass("loading gui gui-spinner gui-pulse");
            $this.parent().children("a").removeClass("not-active");
            $this.text(loginText).css("pointer-events","auto");
        }
    }

    function dropdownOpen() {
        var $dropdownLi = $('._vr_loginSuccess .dropdown');
        $dropdownLi.mouseover(function () {
            $(this).addClass('open');
        }).mouseout(function () {
            $(this).removeClass('open');
        });
    }
    function Logout() {
        $.ajax({
            url: "/passport/logout.html",
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                if (window.sessionStorage){
                    sessionStorage.is_login = false;
                    sessionStorage.demoModel = null;
                }
                window.location.href="/";
            }
        });
    }

    /*通用真人手风琴脚本 By Faker*/
    function liveAccordion(){
    <#if liveScript01??>
        // 真人-手风琴
        $(".live-accordion").accordion({
            maxWidth: "340",
            expandSpeed: "10",
            slideSpeed: "10",
            showIndex: "1"
        });
        // 真人-手风琴滑入动画
        $(".live-accordion > li").hover(function() {
            var $this = $(this);
            $('.mask', $this).stop().fadeOut(300);
            $('.cover', $this).show();
            $('.logo', $this).stop().fadeIn(300)
        }, function() {
            var $this = $(this);
            $('.mask', $this).stop().fadeIn(300);
            $('.cover', $this).hide();
            $('.logo', $this).stop().fadeOut(300)
        });
    <#elseif liveScript02??>
        // 真人-栅格滑入动画
        $(".live-item > .item").hover(function() {
            var $this = $(this);
            $('.logo', $this).stop().fadeOut(300);
            $('.cover', $this).show()
        }, function() {
            var $this = $(this);
            $('.logo', $this).stop().fadeIn(300);
            $('.cover', $this).hide()
        });
    </#if>
    }

    //进入玩家中心前验证是否登陆
    function loginPlayer(e){
        if (sessionStorage.is_login != "true") {
            loginObj.getLoginPopup();
        }else{
            var _href = $(e).data("href");
            window.open(_href);
        }
    }

    //ajax请求后访问
    $(document).ajaxComplete(function (event, xhr, settings) {
        var _this = this;
        var state = xhr.getResponseHeader("headerStatus") || xhr.status;
        if (state == 605){//限制访问
            window.top.location.href =  "/errors/" + state + ".html";
        }else if (state == 606 || state == 607) {//踢出
            window.top.location.href =  "/errors/" + state + ".html";
        }
    });

    /**
     * 回收资金
     **/
    function recoveryApi(obj) {
        var isAutoPay = getCookie("isAutoPay");
        if(isAutoPay != 'true') {
            dialogMsg("当前设置无免转，不能回收！");
            return;
        }
        if(!isAllowRecoveryApi()) {
            autoGetApiBalance(obj);
            return;
        }
        var apiId = $(obj).attr("api");
        var url = "/transfer/auto/recovery.html";
        if(apiId)  {
            url = url + "?search.apiId=" + apiId;
        }
        $.ajax({
            url: url,
            dataType:"json",
            success:function(data){
                if (data) {
                    if (data.msg) {
                        dialogMsg(data.msg);
                    } else if (!apiId) {
                        dialogMsg("正在回收所有api资金，请稍候！");
                        autoGetApiBalance(obj);
                    } else if (data.resultStatus) {
                        if (data.resultStatus == 'SUCCESS') {
                            dialogMsg("回收成功，请查看钱包余额！");
                            autoGetApiBalance(obj);
                        } else if (data.resultCode == 1) {
                            dialogMsg("回收失败，失败状态码[" + data.resultStatus + "],请稍候再试！");
                        } else {
                            dialogMsg("正在回收中，请稍候再来查看！");
                            autoGetApiBalance(obj);
                        }
                    } else {
                        dialogMsg("正在回收中，请稍候再来查看！");
                        autoGetApiBalance(obj);
                    }
                } else {
                    dialogMsg("系统繁忙，请稍候再试！");
                }
            },
            error:function(error){
                console.log(error);
            },
            complete: function() {
                $(obj).attr("lastTime", new Date().getTime());
            }
        })
    }

    /**
     * 是否允许回收资金
     **/
    function  isAllowRecoveryApi(obj) {
        var lastTime = $(obj).attr("lastTime");
        if (!lastTime) {
            return true;
        }
        var apiId = $(obj).attr("api");
        var date = new Date();
        var timeInterval = parseInt(date.getTime() - lastTime) / 1000;
        if(apiId && timeInterval >= 3) {
            return true;
        }
        if (!apiId && timeInterval >= 10) {
            return true;
        }
        return false;
    }

    /**
     * 回收资金后查询余额
     * @param obj
     */
    function autoGetApiBalance(obj) {
        var apiId = $(obj).attr("api");
        if(apiId) { //单个api刷新余额
            getSingleApiBalance(obj, apiId);
        } else  { //全部刷新
            getAllApiBalance();
        }
    }

    /**
     *获取单个api余额
     **/
    function getSingleApiBalance(obj, apiId) {
        $.ajax({
            url: '/transfer/auto/getApiBalance.html?apiId=' + apiId,
            dataType: "JSON",
            beforeSend:function(){
                $(obj).find(".text-warning").removeClass("text-warning").addClass("gui gui-spinner gui-pulse");
            },
            success: function(data) {
                if(data.money) {
                    $(obj).find(".text-money").text(data.money);
                    /*刷新钱包余额*/
                    $("._vr_player_balance").text(data.playerAssets);
                    $('._vr_wallet_balance').text(data.playerWallet);
                }
            },
            error: function(error) {
                console.log(error);
                $(obj).find("span.gui-pulse").removeClass("gui gui-spinner gui-pulse").addClass("text-warning");
            }
        });
    }

    /**
     * 获取所有api余额
     **/
    function getAllApiBalance() {
        var apiObject = $('._apiBalance');
        $.ajax({
            url: '/transfer/auto/getApiBalances.html',
            dataType: "JSON",
            beforeSend:function(){
                if(typeof apiObject == 'undefined'){
                    var  apiHtml = '<li class="balLoding"><a href="#"><span class="gui gui-spinner gui-pulse"></a></li>';
                    $("li[name=apiPreNode]").next().after(apiHtml);
                } else {
                    $(apiObject).find(".text-warning").removeClass("text-warning").addClass("gui gui-spinner gui-pulse");
                }
            },
            success: function(data) {
                var html = '';
                var apis = data.apis;
                var cookie = getCookie(HIDE_BALANCE_COOKIE_KEY);
                if(cookie === 'true'){
                    for (var i = 0; i < apis.length; i++) {
                        html = html + '<li class="_apiBalance"><a href="javascript:" onclick="recoveryApi(this)" api="'+apis[i].apiId+'">' + apis[i].apiName + '：<span class="text-money text-warning balance2 hide">'+apis[i].balance+'</span><span class="text-warning balance1">--</span><span class="icon-back-m"></span></a></li>';
                    }
                }else{
                    for (var i = 0; i < apis.length; i++) {
                        html = html + '<li class="_apiBalance"><a href="javascript:" onclick="recoveryApi(this)" api="'+apis[i].apiId+'">' + apis[i].apiName + '：<span class="text-money text-warning balance2">'+apis[i].balance+'</span><span class="text-warning balance1 hide">--</span><span class="icon-back-m"></span></a></li>';
                    }
                }

                $('._apiBalance').remove();
                $("li[name=apiPreNode]").next().after(html);
                /*刷新钱包余额*/
                $("._vr_player_balance").text(data.playerAssets);
                $('._vr_wallet_balance').text(data.playerWallet);
            },
            error: function(error) {
                $(apiObject).find("span.gui-pulse").removeClass("gui gui-spinner gui-pulse").addClass("text-warning");
                console.log(error);
            },
            complete: function() {
                $(".balLoding").remove();
            }
        });
    }

    /**
     * 消息提示
     * @param msg
     */
    function dialogMsg(msg) {
        BootstrapDialog.alert({
            title: '提示',
            message: msg,
            type: BootstrapDialog.TYPE_WARNING,
            buttonLabel: '确定'
        });
    }

    function canShowLottery(id){
        if(sessionStorage.is_login!="true"){
            loginObj.getLoginPopup();
            return;
        }
        if (!id){
            $(".hongbao").removeClass('disabled');
            $("#tip-msgs").html('红包活动已经结束!');
            $(".hongbao-time-txt").hide();
            $(".hongbao-time").hide();
            return;
        }
        $("#hongbao").addClass('hide_hongbao');
        $("#hongbao_detail").fadeIn(1000);
        $.ajax({
            url:"/ntl/activity/countDrawTimes.html",
            type: "POST",
            dataType: "json",
            data:{activityMessageId:id},
            success: function(data){
                console.log(data.nextLotteryTime);
                console.log(data.drawTimes);
                if(data.drawTimes&&data.drawTimes>0){
                    $(".hongbao").removeClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">'+data.drawTimes+'</span>次抽奖机会');
                    $(".hongbao-time-txt").hide();
                    $(".hongbao-time").hide();
                }else if(data.drawTimes==0){
                    if(data.isEnd=="false"){
                        $(".hongbao").addClass('disabled');
                        $("#tip-msgs").show();
                        $("#tip-msgs").html('你还有<span style="font-size: 22px;padding: 0 5px;color: gold" id="ramain-count">0</span>次抽奖机会');
                        $("#ramain-count").text(data.drawTimes);
                    }else{
                        $(".hongbao").addClass('disabled');
                        $(".icon-open").show();
                        $("#tip-msgs").html('红包活动已经结束!');
                        $("#btn-rule").show();
                    }
                    if(data.nextLotteryTime!=""){
                        $(".hongbao-time-txt").show();
                        $(".hongbao-time").show();
                        $(".hongbao-time").text(data.nextLotteryTime);
                    }else{
                        $(".hongbao-time-txt").hide();
                        $(".hongbao-time").hide();
                    }

                }else if(data.drawTimes==-1){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('红包活动已经结束!');
                    $(".hongbao-time-txt").hide();
                    $(".hongbao-time").hide();
                    return;
                }else if(data.drawTimes==-5){
                    $(".hongbao").addClass('disabled');
                    $("#tip-msgs").show();
                    $("#tip-msgs").html('本次红包已经抢光了');
                    if(data.nextLotteryTime!=""){
                        $(".hongbao-time-txt").show();
                        $(".hongbao-time").show();
                        $(".hongbao-time").text(data.nextLotteryTime);
                    }else{
                        $(".hongbao-time-txt").hide();
                        $(".hongbao-time").hide();
                    }
                    return;
                }
                //setDivCss();
                $("[name='gb.token']").val(data.token);
                $("#activity_message_id").val(id);
            }
        });
    }


</script>

<#--流量统计代码-->
<#if data.siteStatistics?has_content>${data.siteStatistics}</#if>