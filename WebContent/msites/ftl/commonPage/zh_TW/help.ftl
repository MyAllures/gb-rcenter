<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/zh_TW/msiteCommonContent/help.ftl">-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/common.css" type="text/css" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/style.css" type="text/css" />
    <style>
        a{word-wrap:break-word}
        img{max-width: 700px;}
    </style>
    <script type="text/javascript">
        var imgRoot='${data.configInfo.imgRoot}';
    </script>
</head>

<body>
    <div class="main-jumbotron">
        <div class="container-fluid no-full">
            <div class="row">
                <div class="col-lg-12">
                    <div class="branding text-white">
                        <img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" class="tamashi-logo"> | 幫助中心
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar primary-navbar">
        <div class="container-fluid no-full">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <#assign parentIndex = 0>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <#if data.helpCenterCategories??>
                        <#list data.helpCenterCategories as parent>
                            <#if parent.parentId == '-1'>
                                <li data-parent="${parent.typeId}" class="parent_${parent.typeId} parentLi"><a href="help.html?pageNumber=${parent.typeId}&pagingKey=hpdc"><#if parent.name??>${parent.name}</#if></a></li>
                             <#assign parentIndex =parentIndex+1>
                            </#if>
                        </#list>
                    </#if>

                </ul>
                <div class="hidden-xs hidden-sm navbar-form navbar-right" role="search">
                    <form class="#">
                    </form>
                </div>
            </div>
        </div>
    </nav>
    <div class="container-fluid no-full">
        <div class="row">
            <div class="col-sm-3 side-menu clearfix">
                <#if data.helpCenterCategories??>
                    <#list data.helpCenterCategories as parent>
                        <#-- 需要加一层if判断是否是当前父项下的子项-->
                        <#-- 父项 -->
                        <#if parent.parentId == '-1'>
                            <#assign flag = 0>
                            <#list data.helpCenterCategories as children>
                                <#if parent.typeId = children.parentId>
                                    <#-- 子项 -->
                                    <a class="list-group-item child_parent_${parent.typeId}" data-parent="${parent.typeId}" data-children="${children.typeId}" style="display: none" href="javascript:">${children.name}</a>
                                </#if>
                            </#list>
                        </#if>
                    </#list>
                </#if>
            </div>

            <#if data.helpCenterCategories??>
                <#list data.helpCenterCategories as parent>
                <#--父项-->
                    <#if parent.parentId == '-1'>
                    <#list data.helpCenterCategories as children>
                    <#--子项-->
                        <#if parent.typeId = children.parentId>
                        <#-- 子项下是否有相关问题 -->
                            <#if children.documents??>
                            <div class="col-sm-9 help-content content_parent_${parent.typeId}_${children.typeId}" style="display: none">
                                <div class="panel panel-default">
                                        <div class="panel-heading"><strong>${children.name}</strong> 共<span class="label label-warning counts">10</span> 个相关问题</div>
                                    <div class="panel-body">
                                        <ul class="list-inline help-list clearfix">

                                                <#list children.documents as questions>
                                                <li class="col-md-4 col-sm-6"><a href="#q${questions.id}">
                                                <#list data.helpCenterDocuments as questionInfo>
                                                    <#if questionInfo.helpDocumentId?string.computer = questions.id?string.computer>
                                                        ${questionInfo.helpTitle}
                                                    </#if>
                                                </#list>
                                                </a></li>
                                                </#list>

                                         </ul>
                                        <!--Help Item-->
                                        <#list children.documents as questions>

                                            <#list data.helpCenterDocuments as questionInfo>
                                                <#if questionInfo.helpDocumentId?string.computer = questions.id?string.computer>
                                                     <button title="${questionInfo.helpTitle}" id="q${questions.id}" class="btn btn-block primary-btn -blue -sm title" type="button"><#if questionInfo.helpTitle?length gt 33>${questionInfo.helpTitle?substring(0,31)}...<#else >${questionInfo.helpTitle}</#if></button>
                                                    <hr>
                                                    <div class="content">
                                                       ${questionInfo.helpContent}
                                                    </div>
                                                </#if>
                                            </#list>
                                        </#list>

                                    </div>
                                </div>
                            </div>
                            </#if>
                        </#if>

                    </#list>

                    </#if>
                </#list>

            </#if>
        </div>
    </div>
    <!--Server Bar-->

    <div class="server-bar">
        <button class="btn btn-block flat-btn -blue -xs" type="button" onclick='window.open("<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>")'>客服</button>
        <button class="btn btn-block flat-btn -white -xs topcontrol" type="button">顶部</button>
    </div>
    <script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap.min.js"></script>
    <script>
    $(window).scroll(function() {
        var top = $(document).scrollTop();
        if (top > 250)
            $(".list-group").addClass("side-menu-fixed");
        else
            $(".list-group").removeClass("side-menu-fixed");
    });
    $(window).scroll(function() {
        var top = $(document).scrollTop();
        if (top > 550) {
            $(".topcontrol").fadeIn(1000);
        } else {
            $(".topcontrol").fadeOut(1000);
        }
    });
    $(".topcontrol").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    $(function(){
        /* 点击一级分类切换二级分类 */
        var id = getlocationParam("pageNumber");
        var childrenId = getlocationParam("dataChildren");
        if(id == null){
            /* 处理首次进入连接无参数时 默认选中 */
            var tar = $(".parentLi")[0];
            id = $(tar).data("parent");
            $(tar).addClass("active");
        }
        $(".child_parent_"+id).attr("style","display:block");
        $(".parent_"+id).addClass("active");
        if(childrenId!=null){
            $("a[data-children="+childrenId+"]").trigger("click");
        }else{
            $($(".child_parent_"+id)[0]).trigger("click");
        }
        /* 计算问题数量 */
        $(".help-content").each(function(){
            var count =  $(this).find(".help-list li").length;
            $(this).find(".counts").text(count);
        })

    });
    /* 点击二级分类切换右侧问题 */
    $(".list-group-item").on("click",function(){
        var parent = $(this).data("parent");
        var children =  $(this).data("children");
        $(".child_parent_"+parent).removeAttr("style");
        $("a[data-children="+children+"]").attr("style","background: #f5f5f5;");
        $(".help-content").attr("style","display:none")
        $(".content_parent_"+parent+"_"+children).attr("style","display:block");
    });
    function getlocationParam(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return r[2]; return null;
    }
    </script>
</body>

</html>
