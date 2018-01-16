<div class="content-wrap" style="overflow: hidden;outline: none;height: 100%;padding-right: 8px;margin-right: -8px;">
    <#assign msgKey="announcementPage">
    <ul>
    <#if data.announcement?exists>
        <#list data.announcement as msg >
            <li>${msg.content}</li>
        </#list>
    </#if>
    </ul>
</div>

<#if data.pagingMap[msgKey]?exists>
    <#if data.pagingMap[msgKey].firstPage>
            <a class="layui-layer-btn0">上一页</a>
      <#else>
            <a class="layui-layer-btn0 active" onclick="noticeChangePageAjax(this);" data-page-num="${data.pagingMap[msgKey].pageNumber - 1}">上一页</a>
    </#if>

        <#if data.pagingMap[msgKey].lastPage == true>
            <a class="layui-layer-btn1">下一页</a>
        <#else>
            <a class="layui-layer-btn1 active" onclick="noticeChangePageAjax(this);" data-page-num="${data.pagingMap[msgKey].pageNumber + 1}">下一页</a>
        </#if>
</#if>

