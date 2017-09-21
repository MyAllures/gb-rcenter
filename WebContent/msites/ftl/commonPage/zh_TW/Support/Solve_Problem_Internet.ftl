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
        <div class="conTop" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Internet_bg.png);">
            <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Internet.png" />
            <div class="text">
                <h2>其他網路問題</h2>
                <p>請試試下方的步驟，為您排解問題</p>
            </div>
        </div>
        <div class="soluTions">
            <div class="solveBox" style="margin-left: 237px">
                <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_1.png)"></div>
                <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Replace.png" />
                <h1>更換瀏覽器</h1>
                <p>點選下載其他瀏覽器</p>
                <div class="pushButton">
                    <a href="javascript:" class="downBrowser" target="_blank">專屬瀏覽器</a>
                    <a href="http://www.google.com/chrome" target="_blank">谷歌</a>
                    <a href="http://windows.microsoft.com/ie" target="_blank">IE</a>
                    <a href="http://www.maxthon.cn/"  target="_blank">傲遊雲</a>
                    <a href="https://www.firefox.com/" target="_blank">火狐</a>
                    <a href="http://chrome.360.cn/" target="_blank">360極速</a>
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
<#include "script.ftl">
</html>
