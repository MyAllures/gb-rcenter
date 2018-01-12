<section class="notice">
    <div class="container">
        <div class="title"><span class="gui gui-volume-down"></span>最新訊息</div>
        <div class="notice-list">
            <ul class="list-unstyled">
            <#list data.announcement as msg>
                <#if msg_index <5>
                    <li style="display: inline-block;"><a href="javascript:void(0);" data-notice-index="${msg_index}" onclick="noticeDialog(this)" id="notice-content">${msg.content}</a></li>
                </#if>
            </#list>
            </ul>
        </div>
    </div>
</section>