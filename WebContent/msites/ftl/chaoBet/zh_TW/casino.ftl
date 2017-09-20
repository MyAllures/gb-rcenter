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
<#assign apiType = "2">
<main class="main-casino">
    <div style="height: 408px;background: url(${data.configInfo.sitePath}/images/casino-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <div class="clearfix"></div>
    <!-- Casino -->
    <section class="casino _vr_casinoSearch">
        <div class="container">
            <div class="casino-box">
                <!-- Api-tabs -->
                <ul class="api-tabs casino-tabs">
                <#if data.siteApiTypeRelationMap??>
                    <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                        <li class="<#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                            <a title="點選進入${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}" href="javascript:" class="_vr_getGames"
                               data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">
                                <span class="icon <#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                            </a>
                        </li>
                    </#list>
                </#if>
                </ul>
                <div class="game-list _vr_itemCasino">
                    <#include "casino_partial.ftl">
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_TW/ads/gameAds.ftl">
<#include "script.ftl">
<script>
    $(function () {
        $(".search input").keydown(function(e) {
            if (e.which == 13) {
                var $this = $(this);
                $("._vr_buttonSubmit",$this.parents("form")).trigger("click");
            }
        });

        //异步加载游戏
        $("._vr_casinoSearch").on('click',"._vr_getGames",function(){
            if(typeof $(this).attr("onclick")=="undefined"){
                /*此处选中状态需要根据模板调整*/
                $(this).parent().parent().find(".active").removeClass("active");
                $(this).parent().addClass("active");
                var gameName;
                if($(this).data("type")!="paging"){
                    /*用于搜索结果多页时判断是否保留搜索关键词*/
                    gameName='';
                }else {
                    gameName = $("input[name='gameName']").val()==''?'':encodeURIComponent($("input[name='gameName']").val());
                }
                $.ajax({
                    url:$(this).data("href"),
                    dataType:"html",
                    data:{
                        gameName:gameName
                    },
                    success:function(data){
                        $("._vr_itemCasino").html(data);
                        maintainCheck();
                    }
                });
            }
        });

        //游戏搜索
        $("._vr_casinoSearch").on("click", "._vr_buttonSubmit",function (e) {
            var gameName = typeof $("input[name='gameName']").val()=='undefined'?'':encodeURIComponent($("input[name='gameName']").val());
            /*此处取apiId的target需要根据模板调整*/
            var tarApi = $("._vr_casinoSearch").find(".active a").data("api");
            var apiId = typeof tarApi !="undefined"?tarApi :"";

            $.ajax({
                url:"casino_partial.html?t="+new Date().getTime(),
                dataType:"html",
                data:{
                    gameName:gameName,
                    apiId:apiId
                },
                success:function(data){
                    $("._vr_itemCasino").html(data);
                    maintainCheck();
                }
            });
        });

        //更多游戏
        $("._vr_casinoSearch").on("click",".more_click_game",function (e) {
            var firstPageNumber = $(".more_click_game").attr("data-firstPageNumber");
            var lastPageNumber = $(".more_click_game").attr("data-lastPageNumber");
            var data_firstPageNumber = Number(firstPageNumber);
            var data_lastPageNumber = Number(lastPageNumber);
            //根据模板调整moreUrl的target
            var moreUrl = $("._vr_itemCasino ._vr_tabs").find("li.active a").data("href");
            if(data_firstPageNumber<data_lastPageNumber){
                data_firstPageNumber+=1;
            }else{
                $(".more_click_game").text("全部遊戲載入完成");
                return;
            }
            $(".more_click_game").attr("data-firstPageNumber",data_firstPageNumber);
            $.ajax({
                url:moreUrl+"&pageNumber="+data_firstPageNumber,
                type:"post",
                success:function(data){
                    var afterData = $(data).find("._vr_casino_game").children();
                    $('div._vr_casino_game').append(afterData);
                    var first = $(".more_click_game").attr("data-firstPageNumber");
                    if(first>=data_lastPageNumber){
                        $(".more_click_game").text("全部遊戲載入完成");
                        $(".more_click_game").removeClass("more_click_game");
                    }
                    maintainCheck();
                }
            })
        })
    });
</script>
</body>

</html>
