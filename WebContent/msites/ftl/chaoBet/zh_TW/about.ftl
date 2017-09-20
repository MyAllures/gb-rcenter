<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
</head>

<body>
<#include "top.ftl">
<main class="main-about">
    <div style="height: 410px;background: url(${data.configInfo.sitePath}/images/about-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <!-- about -->
    <section class="about register-about">
        <div class="container">
            <div class="row">
                <div class="col-5-1">
                    <div class="page-left">
                        <div class="page-center">
                            <div class="page-box">
                                <div class="list-group page-list">
                                <#list data.documents as document>
                                    <#if document['parent']?exists>
                                        <#if document['code']=="agent&cooperation">
                                            <a href="agent.html" target="_blank" class="list-group-item parentLi <#if document_index==0>active</#if>">${document["title"]}</a>
                                        <#else>
                                            <a href="#?id=${document["id"]}" class="list-group-item parentLi_${document['id']} parentLi <#if document_index==0>active</#if>">${document["title"]}</a>
                                        </#if>
                                    </#if>
                                </#list>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5-4">
                    <div class="page-content">
                    <#list data.documents as document>
                        <#if document['parent']?exists>
                            <div class="page-content contentPart p${document.id} panel-body" style="word-break:break-all; min-height: 600px;">
                                <h3>${document.title}</h3>
                            ${document.content}
                            <#-- 子项 -->
                                <#list data.documents as children>
                                    <#if children.parent_id = document.document_id>
                                        <h4><span style="color: #fff;">${children.title}</span></h4>
                                    ${children.content}
                                    </#if>
                                </#list>
                            <#-- end 子项 -->
                            </div>
                        </#if>
                    </#list>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_TW/ads/gameAds.ftl">
<#include "script.ftl">
<script>
    $(document).ready(function () {
        $(".parentLi").on("click", function () {
            //左侧菜单点击显示隐藏相应内容
            var add = $(this).attr("href");
            var dId = add.split("id=")[1];
            if (dId != undefined) {
                showReferDoc(dId);
            }
        });

        //加载页面时切换对应的帮助信息
        var url = window.location.href;
        var id = url.split("id=")[1];
        if (id != null) {
            showReferDoc(id);
        }
    });

    function showReferDoc(id) {
        // add catban
        //显示／隐藏相关帮助信息
        $(".contentPart").css("display", "none");
        $(".p" + id).css("display", "block");
        //激活对应菜单栏选中样式
        $(".parentLi").removeClass("active");
        $(".parentLi_" + id).addClass("active");
    }
</script>
</body>

</html>