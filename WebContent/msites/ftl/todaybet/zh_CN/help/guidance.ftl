<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            border: none;
        }

        html {
            width: 100%;
            height: 100%;
        }

        body {
            background: url(${data.configInfo.sitePath}/images/bg.jpg);
        }

        .header {
            width: 100%;
            height: 90px;
            background: #ff7814;
            text-align: center;
            overflow: hidden;
        }

        .header img {
            margin-top: 15px;
        }

        .c_ico {
            text-align: center;
            margin-top: 80px;
        }

        .p-hover {
            width: 260px;
            height: 70px;
            position: absolute;
            left: 50%;
            margin: 0 0 0 -155px;
            top: 90px;
            display: block;
        }

        .p-hover a {
            background: none;
        }

        .footer {
            width: 100%;
            height: 80px;
            line-height: 80px;
            color: #fff;
            background: #ff7814;
            text-align: center;
            position: fixed;
            left: 0;
            bottom: 0;
        }

        .button {
            margin: .4em;
            padding: 1em;
            cursor: pointer;
            background: #e1e1e1;
            text-decoration: none;
            color: #666666;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        .hover-shadow {
            display: inline-block;
            position: relative;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            -webkit-transition-property: transform;
            transition-property: transform;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        }

        .hover-shadow:before {
            pointer-events: none;
            position: absolute;
            z-index: -1;
            content: '';
            top: 100%;
            left: 5%;
            height: 10px;
            width: 90%;
            opacity: 0;
            background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
            /* W3C */
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            -webkit-transition-property: transform, opacity;
            transition-property: transform, opacity;
        }

        .hover-shadow:hover, .hover-shadow:focus, .hover-shadow:active {
            -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
            -webkit-animation-name: hover;
            animation-name: hover;
            -webkit-animation-duration: 1.5s;
            animation-duration: 1.5s;
            -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            -webkit-animation-direction: alternate;
            animation-direction: alternate;
        }

        .hover-shadow:hover:before, .hover-shadow:focus:before, .hover-shadow:active:before {
            opacity: .4;
            -webkit-transform: translateY(6px);
            transform: translateY(6px);
            -webkit-animation-name: hover-shadow;
            animation-name: hover-shadow;
            -webkit-animation-duration: 1.5s;
            animation-duration: 1.5s;
            -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            -webkit-animation-direction: alternate;
            animation-direction: alternate;
        }

    </style>
</head>

<body>
<div class="header"><img src="${data.configInfo.sitePath}/images/logo.png"></div>
<div class="cont" id="effects">
    <p class="p-hover"><a class="button hover-shadow" href="index.html"><img
            src="${data.configInfo.sitePath}/images/btn.png"></a></p>
    <p class="c_ico"><img src="${data.configInfo.sitePath}/images/ico.png"></p>
    <p class="footer">版权所有：2010-2020©ttcpxt.com</p>
</div>

</body>

</html>


