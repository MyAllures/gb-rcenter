<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ tag import="org.soul.commons.lang.string.I18nTool" %>
<%@ tag import="so.wwb.gamebox.web.SessionManagerCommon" %>
<%--体育类注单详细--%>
<%@attribute name="apiId" type="java.lang.Integer" required="true" description="apiId" %>
<%@attribute name="betType" type="java.lang.String" required="false" description="下注方式" %>
<%@attribute name="selection" type="java.lang.String" required="false" description="下注选项" %>
<%@attribute name="homeTeam" type="java.lang.String" required="false" description="主队名称" %>
<%@attribute name="homeTeamId" type="java.lang.String" required="false" description="主队id" %>
<%@attribute name="awayTeam" type="java.lang.String" required="false" description="客队名称" %>
<%@attribute name="awayTeamId" type="java.lang.String" required="false" description="客队id" %>
<%@attribute name="betTeamName" type="java.lang.String" required="false" description="下注球队名称" %>

<c:set var="views" value='<%=I18nTool.getI18nMap(SessionManagerCommon.getLocale().toString()).get("views") %>'/>

<%--体育下注-玩家投注--%>
<c:set var="selection" value="${fn:replace(selection,' ','')}"/>
<c:set var="selectionKey" value="${fn:replace(selection,':','')}"/>
<c:set var="key" value="selection.${apiId}.${betType}.${selectionKey}"/>
<c:set var="notBetTypekey" value="selection.${apiId}.${selectionKey}"/>
<c:choose>
    <c:when test="${!empty views.sportsbook[key]}">
        ${views.sportsbook[key]}
    </c:when>
    <c:when test="${!empty views.sportsbook[notBetTypekey]}">
        ${views.sportsbook[notBetTypekey]}
    </c:when>
    <c:when test="${apiId==19&&(fn:endsWith(selection,'h')||fn:endsWith(selection,'a')||fn:endsWith(selection,'o')||fn:endsWith(selection,'u'))}">
        <c:set var="len" value="${fn:length(selection)}"/>
        <c:set var="selection" value="${fn:substring(selection,len-1,len)}"/>
        <c:set var="key" value="selection.${apiId}.${betType}.${selection}"/>
        <c:set var="selectView" value="${views.sportsbook[key]}"/>
        <c:if test="${empty selectView && selection eq 'h'}">
            <c:set var="selectView" value="${views.sportsbook['selection.19.1.h']}"/>
        </c:if>
        <c:if test="${empty selectView && selection eq 'a'}">
            <c:set var="selectView" value="${views.sportsbook['selection.19.1.a']}"/>
        </c:if>
        ${selectView}
    </c:when>
    <c:when test="${apiId==19}">
        <c:set var="len" value="${fn:length(selection)}"/>
        <c:set var="subSelection" value="${fn:substring(selection,len-2,len)}"/>
        <c:set var="key" value="selection.${apiId}.${betType}.${subSelection}"/>
        <c:if test="${!empty views.sportsbook[key]}">
            ${views.sportsbook[key]}
        </c:if>
        <c:if test="${empty views.sportsbook[key]&&!empty betTeamName}">
            ${betTeamName}
        </c:if>
        <c:if test="${empty views.sportsbook[key]&&empty betTeamName}">
            ${selection}
        </c:if>
    </c:when>
    <%--选择下注主队--%>
    <c:when test="${selection==homeTeamId}">
        ${homeTeam}
    </c:when>
    <%--选择下注客队--%>
    <c:when test="${selection==awayTeamId}">
        ${awayTeam}
    </c:when>
    <c:when test="${apiId==4&&selection=='H'}">
        ${homeTeam}
    </c:when>
    <c:when test="${apiId==4&&selection=='A'}">
        ${awayTeam}
    </c:when>
    <c:otherwise>
        ${selection}
    </c:otherwise>
</c:choose>
