<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <title>技術支援</title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/support.css" />
    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>

<body>
<div class="wrapper">
    <div class="conTent">
        <div class="conTop" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Download_bg.png);">
            <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Download.png" />
            <div class="text">
                <h2>軟體下載<br />
                </h2>
                <p>請掃描二維碼下載APP</p>
            </div>
        </div>
        <div class="soluTions">
            <div class="solveBox" style="margin:0 9px;">
                <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_1.png)"></div>
                <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Game.png" />
                <h1>手機版APP</h1>
                <p>隨時娛樂 點指成金</p>
                <p>Android</p>
                <div class="pushButton1" id="android_qr_code"></div>
                <p>IOS</p>
                <div class="pushButton1" id="ios_qr_code"></div>
            </div>
            <div class="solveBox" style="margin:0 9px;">
                <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_2.png)"></div>
                <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Browser.png" />
                <h1>專屬瀏覽器</h1>
                <p>專屬定製瀏覽器 安全無憂</p>
                <div class="pushButton">
                    <a class="downBrowser" href="javascript:" target="_blank">瀏覽器下載</a>
                </div>
            </div>
            <div class="solveBox" style="margin:0 9px;">
                <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_3.png)"></div>
                <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Flash.png" />
                <h1>更新Flash</h1>
                <p>請下載新版Flash</p>
                <div class="pushButton">
                    <a target="_blank" href="https://get.adobe.com/flashplayer/?loc=cn">Flash更新</a>
                </div>
            </div>
            <div class="solveBox" style="margin:0 9px;">
                <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_4.png)"></div>
                <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Remote.png" />
                <h1>遠端工具</h1>
                <p>異常故障 遠端協助排查</p>
                <div class="pushButton">
                    <a href="https://www.teamviewer.com/zhcn/download/windows/">下載遠端工具</a>
                </div>
                <div class="pushButton">
                    <a href="Download_Remote_Software.html">使用說明</a>
                </div>
            </div>
            <div class="questionMenu">
                <a href="index.html" style="background-image:url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Back_s.png);">返回主選單</a>
                <a href="Solve_Problem_Black.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Black_s.png)">遊戲黑屏</a>
                <a href="Solve_Problem_Question.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Question_s.png)">無法進行遊戲</a>
                <a href="Solve_Problem_Slow.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Slow_s.png)">網站訪問異常緩慢</a>
                <a href="Solve_Problem_Internet.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Internet_s.png)">其他網路問題</a>
                <a href="Solve_Problem_Download.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Download_s.png)">軟體下載</a>
            </div>
        </div>
    </div>
</div>
</body>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/kaelQrcode.min.js"></script>
<script>
    //android二維碼
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

    //ios二維碼
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
     * 專屬瀏覽器下載連結
     * @type {string}
     */
    var down = cu_url+"/Download.ashx?key="+code+"&name=Browser&zip=true";
    $(".downBrowser").attr("href",down);
</script>
</html>