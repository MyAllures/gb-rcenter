<style>
    .pagination a{cursor: pointer}
</style>
<div class="msgbox">


<div class="list-group" id="accordion" role="tablist" aria-multiselectable="true">
<#assign msgKey="announcementPage">

 <#if data.announcement?exists>
        <#list data.announcement as msg >
            <a href="#" class="list-group-item">
                <p>${msg.content}</p>
            </a>
        </#list>
  </#if>


</div>
    <div class="text-center">
        <ul class="pagination">
    <#if data.pagingMap[msgKey]?exists>
    <#if data.pagingMap[msgKey].firstPage>
       <li class="disabled"><a href="#">«</a></li>
      <#else>
        <li onclick="noticeChangePageAjax(this)"  data-page-num="${data.pagingMap[msgKey].pageNumber - 1}"><a>«</a> </li>
    </#if>
        <#list data.pagingMap[msgKey].midBeginPage..data.pagingMap[msgKey].midEndPage as n>
            <#if data.pagingMap[msgKey].pageNumber == n && data.pagingMap[msgKey].midBeginPage lt 2>
                <li data-page-num="${n}" class="active"><a href="#">${n}</a></li>
            <#else>

                <#if data.pagingMap[msgKey].midBeginPage gt 1 && n_index lt 1>
                <#--分页中的 [1 ... N] -->
                    <li  data-page-num="1" onclick="noticeChangePageAjax(this)"><a>1</a></li>
                    <#if n == data.pagingMap[msgKey].midBeginPage>
                        <li><a>...</a></li>
                    </#if>
                <#elseif  !n_has_next>
                <#-- 分页中的 [N ... 尾页]-->
                    <#if !(n = data.pagingMap[msgKey].lastPageNumber)>
                        <#--最后两页时不要[...]-->
                        <li><a>...</a></li>
                    </#if>

                    <li <#if data.pagingMap[msgKey].pageNumber == n>class="active"</#if> data-page-num="${data.pagingMap[msgKey].lastPageNumber}" onclick="noticeChangePageAjax(this)"><a>${data.pagingMap[msgKey].lastPageNumber}</a></li>
                <#else>
                    <li  data-page-num="${n}" <#if data.pagingMap[msgKey].pageNumber == n>class="active"</#if> onclick="noticeChangePageAjax(this)"><a>${n}</a></li>
                </#if>
            </#if>
        </#list>
        <#if data.pagingMap[msgKey].lastPage == true>
            <li class="disabled"><a href="#">»</a></li>
        <#else>
            <li onclick="noticeChangePageAjax(this)" data-page-num="${data.pagingMap[msgKey].pageNumber + 1}"><a>»</a></li>
        </#if>

</#if>
        </ul>
    </div>
</div>

