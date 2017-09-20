<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "../head.include.ftl">
    <style>
        .re_reg_col {
            width: 450px;
            height: 450px;
            margin-left: -225px;
            margin-top: -200px;
        }

        .re_img {
            top: -25% !important;
        }

        .recopy {
            bottom: -26% !important;
        }

        .regedit {
            width: 100%;
        }

        .img {
            position: absolute;
            left: 46%;
            margin-left: -130px;
            top: 8%
        }

        .reg_col {
            width: 450px;
            height: 450px;
            background: #fff;
            position: fixed;
            left: 50%;
            border-radius: 10px;
            margin-left: -225px;
            box-shadow: 0px 0px 15px rgba(134, 44, 0, .76);
            margin-top: -200px;
            top: 50%;
        }

        .reg_list ul {
            width: 100%;
            text-align: center;
        }

        .reg_list ul li {
            width: 268px;
            height: 48px;
            border-top: 3px solid #cccccc;
            margin: 0;
            margin-top: 38px;
            display: inline-block;
            float: none;
            padding: 0;
            position: relative;
        }

        .reg_list ul li:after {
            content: "";
            position: absolute;
            right: -4px;
            top: -3px;
            width: 6px;
            height: 3px;
            background: #ccc;
        }

        .reg_list ul li h5 {
            width: 28px;
            height: 28px;
            border: 3px solid #cccccc;
            margin: auto;
            margin-top: -19px;
            border-radius: 50%;
            background: #fff;
            text-align: center;
            line-height: 28px;
            font-weight: 100;
            font-family: "宋体";
            font-size: 16px;
            color: #000;
        }

        .reg_list ul li p {
            text-align: center;
            margin-top: 6px;
            color: #ccc;
        }

        .reg_list ul li.sli {
            border-top: 3px solid #ffa00a;
            color: #ffa00a;
        }

        .reg_list ul li.sli h5 {
            border: 3px solid #ffa00a;
            color: #ffa00a;
        }

        .reg_list ul li.sli p {
            color: #ffa00a;
        }

        .reg {
            width: 100%;
            height: 380px;
        }

        .reg_le {
            width: 535px;
            height: 360px;
            float: left;
            margin-left: 40px;
            padding-top: 20px;
        }

        .reg_le div {
            width: 321px;
            height: 46px;
            border: 1px solid #dbdbdb;
            margin: auto;
            margin-bottom: 20px;
        }

        .reg_le div h4 {
            width: 63px;
            height: 100%;
            float: left;
            text-align: center;
            display: table;
        }

        .reg_le div h4 span {
            display: table-cell;
            vertical-align: middle;
        }

        .reg_le div p {
            width: 220px;
            height: 19px;
            border-left: 1px solid #ccc;
            float: left;
            margin-top: 13px;
            padding-left: 12px;
        }

        .reg_le div p input {
            width: 227px;
            height: 19px;
            border: none;
            background: none;
        }

        .reg_le div p input.short {
            width: 135px;
        }

        .reg_le div p img {
            float: right;
            margin-top: -5px;
        }

        .reg_le div h3 input {
            width: 321px;
            height: 46px;
            border: none;
            background: #ef6b00;
            color: #fff;
            border: none;
            border-radius: 2px;
            font-size: 16px;
            cursor: pointer;
        }

        .reg_le div.no {
            border: none;
        }

        .reg_le div h3 span {
            display: block;
            text-align: center;
            font-size: 13px;
            color: #919191;
            font-weight: 100;
            line-height: 30px;
            margin-top: 6px;
            font-size: 12px;
        }

        .reg_le div h3 a {
            color: #ee8f07;
        }

        .reg_le div h3 a:hover {
            text-decoration: underline;
        }

        .reg_rt {
            width: 295px;
            height: 360px;
            float: left;
            border-left: 1px solid #dbdbdb;
            padding-left: 20px;
        }

        .reg_rt h5 {
            width: 235px;
            height: 34px;
            border-bottom: 1px dotted #ccc;
            margin: auto;
            line-height: 34px;
            font-weight: 100;
            font-size: 13px;
            font-family: "宋体";
        }

        .reg_rt h5 span {
            color: #0a8cd2;
            cursor: pointer;
        }

        .reg_rt h3 {
            width: 235px;
            margin: auto;
            font-weight: 100;
            margin-top: 10px;
            font-family: "宋体";
            font-size: 14px;
        }

        .reg_rt ul {
            width: 235px;
            margin: auto;
            margin-top: 20px;
        }

        .reg_rt ul li {
            width: 100%;
            display: table;
            margin-bottom: 10px;
        }

        .reg_rt ul li h6 {
            width: 16px;
            height: 18px;
            background: url(../img/bj1.png) center no-repeat;
            text-align: center;
            line-height: 16px;
            color: #fff;
            font-weight: 100;
            font-size: 13px;
            float: left;
            margin: 0;
            margin-right: 0px;
        }

        .reg_rt ul li p {
            margin-left: 15px;
            font-weight: 100;
            font-family: "宋体";
            font-size: 13px;
            line-height: 18px;
            color: #0a8cd2;
            width: 190px;
            float: left;
        }

        .reg_rt ul li.no h6 {
            background: none;
        }

        .reg_rt ul li p a {
            color: #0a8cd2;
        }

        .reg_rt ul li p a:hover {
            text-decoration: underline;
        }

        .alert_log {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .8);
            position: fixed;
            z-index: 99;
            left: 0px;
            top: 0px;
            display: none;
        }

        .alert_log_col {
            width: 450px;
            height: 456px;
            background: #fff;
            position: absolute;
            left: 50%;
            margin-left: -225px;
            top: 50%;
            margin-top: -228px;
            border-radius: 10px;
            background: url(../img/bj3.png) repeat-x;
        }

        .alert_log_col h5 {
            text-align: center;
            font-size: 30px;
            color: #333;
            font-weight: 100;
            line-height: 110px;
            position: relative;
        }

        .alert_log_col h5 i {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 16px;
            border: 1px solid #fa6200;
            width: 25px;
            height: 25px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            color: #fa6200;
            text-align: center;
            line-height: 25px;
            cursor: pointer;
            transition: 0.3s;
        }

        .alert_log_col h5 i:hover {
            transform: rotate(180deg);
        }

        .alert_log_col div {
            width: 386px;
            height: 45px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin: auto;
            box-shadow: inset 0px 1px 1px #ccc;
            margin-bottom: 15px;
        }

        .alert_log_col div h4 {
            margin: 0;
            width: 58px;
            height: 100%;
            float: left;
            border-right: 1px solid #ccc;
            text-align: center;
            display: table;
        }

        .alert_log_col div h4 span {
            display: table-cell;
            vertical-align: middle;
        }

        .alert_log_col div p {
            padding-left: 20px;
            float: left;
        }

        .alert_log_col div p input {
            width: 190px;
            border: none;
            height: 41px;
            line-height: 43px;
            margin-top: 1px;
        }

        .alert_log_col div p img {
            float: right;
        }

        .alert_log_col h3 {
            margin: auto;
            width: 386px;
            font-weight: 100;
            font-size: 13px;
            line-height: 12px;
        }

        .alert_log_col h3 input {
            float: left;
            margin-right: 5px;
        }

        .alert_log_col h3 span {
            float: right;
        }

        .alert_log_col h3 span a {
            color: #f15b00;
        }

        .alert_log_col h3 a {
            color: #333;
        }

        .alert_log_col h6 {
            text-align: center;
        }

        .alert_log_col h6 input {
            width: 386px;
            height: 45px;
            margin: auto;
            border: none;
            background: #f15b00;
            margin-top: 10px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }

        .copy {
            position: absolute;
            bottom: -30%;
            width: 60%;
            left: 20%;
            text-align: center;
        }
    </style>
</head>

<body>
<#include "top.ftl">
<main class="main-register">
    <img src="${data.configInfo.sitePath}/images/bj.jpg" class="back" alt="" width="100%" style="height: 644px;">
    <div class="regedit">
        <div class="reg_col re_reg_col">
            <div class="img re_img"><a href="./index.html">
                <img src="${data.configInfo.sitePath}/images/logo.png" alt=""></a>
            </div>
            <div class="reg">
                <div class="alert_log_col log_col">
                    <h5>欢迎您登录</h5>
                    <form onsubmit="registerLogin();return false;">
                        <div>
                            <h4><span><img src="${data.configInfo.sitePath}/images/l1.png"></span></h4>
                            <p><input type="text" placeholder="请输入您的账号"></p>
                        </div>
                        <div>
                            <h4><span><img src="${data.configInfo.sitePath}/images/l2.png"></span></h4>
                            <p><input type="password" placeholder="密码"></p>
                        </div>
                        <div>
                            <h4><span><img src="${data.configInfo.sitePath}/images/l2.png"></span></h4>
                            <p><input type="text" placeholder="验证码"><img width="113" height="43"
                                                                         src="../public/common/scode.jpg"></p>
                        </div>
                        <h3><input type="checkbox"><a href="javascript:">记住密码</a><span><a href="javascript:"
                                                                                target="_blank">忘记密码？</a></span></h3>
                        <h6><input type="submit" class="sub" value="登录"></h6>
                    </form>
                </div>
            </div>
            <div class="copy recopy">
                <p style="color: #fff;">Copyright © 2009-2017 彩票网 版权所有</p>
            </div>
        </div>
    </div>
</main>

<script src="../../ftl/commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<script src="../../ftl/commonPage/js/gui-base.js"></script>
<script src="../../ftl/commonPage/js/bootstrap-dialog.min.js"></script>
<script>
    function refreshYzm(obj) {
        /* var src = $(obj).attr("src");
         var params = getRequest(src);

         src = "./code/yzm?timestamp=" + (new Date()).getTime();
         $.each(params, function(index, value) {
             src += '&' + value.key + '=' + value.value;
         });
         console.log(src);
         $(obj).attr("src", src);*/
    }

    $(window).resize(function () {
        ate();
    });

    $(function () {
        ate();
        $(".alert_log_col h5 i").click(function () {
            $(".two2").fadeOut();
        });
        autobox(".Customerservice", 1, 1180, 0);
        tabs_cg(".Resultt .latyout .tabs_ce ul li", "", "hover", "acti", "", "");
        click_addname(".Resultt .latyout .wrap_select a", "acti", "click");
        $('.reg_rt h5 span').click(function () {
            $('.two2').fadeIn();
        })
    });

    function ate() {
        var hei = $(window).height();
        $(".back").css("height", hei - 24 + "px");
    }


</script>
</body>

</html>
