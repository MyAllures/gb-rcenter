<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <title>技术支援</title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/support.css" />
</head>

<body>
    <div class="wrapper">
        <div class="conTent">
            <div class="conTop" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Download_bg.png);">
                <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Download.png" />
                <div class="text">
                    <h2>软件下载<br />
                    </h2>
                    <p>请扫描二维码下载APP</p>
                </div>
            </div>
            <div class="soluTions">
                <div class="solveBox" style="margin:0 9px;">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/No_1.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Game.png" />
                    <h1>手机版APP</h1>
                    <p>随时娱乐 点指成金</p>
                    <p>Android</p>
                    <div class="pushButton1" id="android_qr_code"></div>
                    <p>IOS</p>
                    <div class="pushButton1" id="ios_qr_code"></div>
                </div>
                <div class="solveBox" style="margin:0 9px;">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/No_2.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Browser.png" />
                    <h1>专属浏览器</h1>
                    <p>专属定制浏览器 安全无忧</p>
                    <div class="pushButton">
                        <a class="downBrowser" href="javascript:" target="_blank">浏览器下载</a>
                    </div>
                </div>
                <div class="solveBox" style="margin:0 9px;">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/No_3.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Flash.png" />
                    <h1>更新Flash</h1>
                    <p>请下载新版Flash</p>
                    <div class="pushButton">
                        <a target="_blank" href="https://get.adobe.com/flashplayer/?loc=cn">Flash更新</a>
                    </div>
                </div>
                <div class="solveBox" style="margin:0 9px;">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/No_4.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Remote.png" />
                    <h1>远程工具</h1>
                    <p>异常故障 远程协助排查</p>
                    <div class="pushButton">
                        <a href="https://www.teamviewer.com/zhcn/download/windows/">下载远程工具</a>
                    </div>
                    <div class="pushButton">
                        <a href="Download_Remote_Software.html">使用说明</a>
                    </div>
                </div>
                <div class="questionMenu">
                    <a href="index.html" style="background-image:url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Back_s.png);">返回主菜单</a>
                    <a href="Solve_Problem_Black.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Black_s.png)">游戏黑屏</a>
                    <a href="Solve_Problem_Question.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Question_s.png)">无法进行游戏</a>
                    <a href="Solve_Problem_Slow.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Slow_s.png)">网站访问异常缓慢</a>
                    <a href="Solve_Problem_Internet.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Internet_s.png)">其他网路问题</a>
                    <a href="Solve_Problem_Download.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/ja_JP/support/images/icon_Download_s.png)">软件下载</a>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/kaelQrcode.min.js"></script>
<script>
    //android二维码
    var cu_url = window.location.origin;
    var android_download = "";
    var code = "";
    var android_url = "";
    $.ajax({
        url:"/index/getAppsUrl.html",
        type:"get",
        data:{"device":"android"},
        async:false,
        success:function (data) {
            var data = eval('('+data+')');
            android_download=data.app;
            android_url = "data:image/png;base64,"+android_download;
            code = data.code;
        }
    })
    $("#android_qr_code").append("<img src="+android_url+">");

    //ios二维码
    var ios_url = "";
    var ios_download = "";
    $.ajax({
        url:"/index/getAppsUrl.html",
        type:"get",
        data:{"device":"ios"},
        async:false,
        success:function (data) {
            var data = eval('('+data+')');
            ios_download=data.app;
            ios_url = "data:image/png;base64,"+ios_download;
        }
    })
    $("#ios_qr_code").append("<img src="+ios_url+">");

    /**
     * 专属浏览器下载链接
     * @type {string}
     */
    var down = cu_url+"/Download.ashx?key="+code+"&name=Browser&zip=true";
    $(".downBrowser").attr("href",down);
</script>
</html>