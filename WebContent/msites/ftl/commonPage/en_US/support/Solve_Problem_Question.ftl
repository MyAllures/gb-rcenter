<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <title>技术支援</title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/support.css" />
    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>

<body>
    <div class="wrapper">
        <div class="conTent">
            <div class="conTop" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Question_bg.png);">
                <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Question.png" />
                <div class="text">
                    <h2>无法进行游戏</h2>
                    <p>请试试下方的步骤，为您排解问题</p>
                </div>
            </div>
            <div class="soluTions">
                <div class="solveBox">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_1.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Flash.png" />
                    <h1>更新Flash</h1>
                    <p>请下载新版Flash</p>
                    <div class="pushButton">
                        <a  target="_blank" href="https://get.adobe.com/flashplayer/?loc=cn">Flash更新</a>
                    </div>
                </div>
                <div class="solveBox">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_2.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Remove.png" />
                    <h1>清除缓存</h1>
                    <p>依浏览器类型，照步骤清除缓存</p>
                    <div class="pushButton">
                        <a href="ClearCache_File_B.html">谷歌</a>
                        <a href="ClearCache_File_A.html">IE</a>
                        <a href="ClearCache_File_C.html">傲游云</a>
                        <a href="ClearCache_File_D.html">火狐</a>
                    </div>
                </div>
                <div class="solveBox">
                    <div class="number" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/No_3.png)"></div>
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Replace.png" />
                    <h1>更换浏览器</h1>
                    <p>点选下载其他浏览器</p>
                    <div class="pushButton">
                        <a href="javascript:" class="downBrowser" target="_blank">专属浏览器</a>
                        <a href="http://windows.microsoft.com/ie" target="_blank">IE</a>
                        <a href="http://www.google.com/chrome" target="_blank">谷歌</a>
                        <a href="http://www.maxthon.cn/"  target="_blank">傲游云</a>
                        <a href="https://www.firefox.com/" target="_blank">火狐</a>
                        <a href="http://chrome.360.cn/" target="_blank">360极速</a>
                    </div>
                </div>
                <div class="questionMenu">
                    <a href="index.html" style="background-image:url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Back_s.png);">返回主菜单</a>
                    <a href="Solve_Problem_Black.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Black_s.png)">游戏黑屏</a>
                    <a href="Solve_Problem_Question.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Question_s.png)">无法进行游戏</a>
                    <a href="Solve_Problem_Slow.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Slow_s.png)">网站访问异常缓慢</a>
                    <a href="Solve_Problem_Internet.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Internet_s.png)">其他网路问题</a>
                    <a href="Solve_Problem_Download.html" style="background-image: url(${data.configInfo.ftlRootPath}commonPage/zh_TW/support/images/icon_Download_s.png)">软件下载</a>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<#include "script.ftl">
</html>
