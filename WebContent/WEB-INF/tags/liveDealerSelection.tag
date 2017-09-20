<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@attribute name="selectionVoSet" type="java.util.Set" required="true" description="下注类型转换统一标志" %>
<%@attribute name="betType" type="java.lang.String" required="false" description="下注项目" %>
<%@attribute name="spilt" type="java.lang.String" required="false" description="间隔符" %>
<%@attribute name="apiId" type="java.lang.Integer" required="true" description="apiId" %>
<%@ tag import="org.soul.commons.lang.string.I18nTool" %>
<%@ tag import="so.wwb.gamebox.web.SessionManagerCommon" %>
<c:set var="views" value='<%=I18nTool.getI18nMap(SessionManagerCommon.getLocale().toString()).get("views") %>'/>
<c:set var="liveDealer" value='${views.liveDealer}'/>
<c:set var="selectLen" value="${fn:length(selectionVoSet)}"/>
<%--真人注单：玩家下注--%>
<c:forEach items="${selectionVoSet}" var="selection" varStatus="selectIndex">
    <c:if test="${selectIndex.index!=0 && selectIndex.index%2==0}">
        <br/>
    </c:if>
    <c:set var="select" value="${fn:replace(selection.selection,' ','')}"/>
    <c:if test="${empty betType}">
        <c:set var="key" value="selection.${apiId}.${select}"/>
    </c:if>
    <c:if test="${!empty betType}">
        <c:set var="key" value="selection.${apiId}.${betType}.${select}"/>
    </c:if>
    <c:set var="selectionValue" value="${liveDealer[key]}"/>
    <c:if test="${empty selectionValue}">
        <c:set var="key" value="selection.${apiId}.${select}"/>
        <c:set var="selectionValue" value="${liveDealer[key]}"/>
        <c:if test="${empty selectionValue}">
            <c:set var="selectionValue" value="${selection.selection}"/>
        </c:if>
    </c:if>
    ${selectionValue}
    <%--下注金额，GD没有--%>
    <c:if test="${!empty selection.amount}">
        &nbsp;&nbsp;<span class="co-red">${selection.amount}</span>
    </c:if>
    <c:if test="${selectIndex.index!=selectLen-1}">
        <c:if test="${empty spilt}">
            <br/>
        </c:if>
        <c:if test="${!empty spilt}">
            ${spilt}
        </c:if>
    </c:if>
</c:forEach>