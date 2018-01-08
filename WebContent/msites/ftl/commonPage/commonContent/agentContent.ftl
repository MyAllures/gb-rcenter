<section class="agent">
    <!-- /* Tab-Content -->
    <div class="tab-content">
        <!-- /* 代理首页 -->
        <div class="agent-slide tab-pane fade active in" id="home">
            <div class="slide">
                <div class="slide-indicators">
                    <ul>
                    </ul>
                </div>
                <div class="slide-inner">
                    <ul>
                        <li data-src="url(../../ftl/commonPage/images/agent-ban-01.jpg)"
                            style="background:center 0 no-repeat;">
                        </li>
                        <li data-src="url(../../ftl/commonPage/images/agent-ban-02.jpg)"
                            style="background:center 0 no-repeat;">
                        </li>
                        <li data-src="url(../../ftl/commonPage/images/agent-ban-03.jpg)"
                            style="background:center 0 no-repeat;">
                        </li>
                    </ul>
                </div>
                <span class="prev gui gui-chevron-left"></span> <span class="next gui gui-chevron-right"></span>
            </div>
        </div>
    <#list data.documents as document>
        <#if document['parent']?exists && document['code']=="agent&cooperation">
            <div class="tab-pane fade agent-content-wrap" id="id_${document["id"]}" style="min-height: 600px;">
                <div class="container">
                    <div class="col-1-1 agent-content">
                        <h3 class="title">${document.title}</h3>
                        <div style="font-size: 15px;">
                        ${document.content}
                        </div>
                    </div>
                </div>
            </div>
        </#if>
    </#list>
        <!--代理加盟子项title and content-->
    <#list data.documents as document>
        <#if document['parent']?exists && document['code']=="agent&cooperation">
            <#list data.documents as children>
                <#if children.parent_id = document.document_id>
                    <div class="tab-pane fade agent-content-wrap" id="id_${children["id"]}" style="min-height: 600px;">
                        <div class="container">
                            <div class="col-1-1 agent-content">
                                <h3 class="title">${children.title}</h3>
                                <div style="font-size: 15px;">
                                ${children.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </#if>
            </#list>
        </#if>
    </#list>
    </div>
</section>