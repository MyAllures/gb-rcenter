<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ tag import="org.soul.commons.lang.string.I18nTool" %>
<%@ tag import="so.wwb.gamebox.web.SessionManagerCommon" %>
<%@ tag import="org.soul.web.session.SessionManagerBase" %>
<%@ tag import="org.soul.commons.init.context.CommonContext" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib uri="http://soul/fnTag" prefix="soulFn" %>
<%@taglib tagdir="/WEB-INF/tags" prefix="gb" %>
<%--@elvariable id="DateFormat" type="org.soul.commons.locale.DateFormat"--%>
<%--体育类注单详细--%>
<%@attribute name="apiId" type="java.lang.Integer" required="true" description="apiId" %>
<%@attribute name="leagueName" type="java.lang.String" required="false" description="联赛名称" %>
<%@attribute name="homeTeam" type="java.lang.String" required="false" description="主队名称" %>
<%@attribute name="homeTeamId" type="java.lang.String" required="false" description="主队id" %>
<%@attribute name="awayTeam" type="java.lang.String" required="false" description="客队名称" %>
<%@attribute name="awayTeamId" type="java.lang.String" required="false" description="客队id" %>
<%@attribute name="htScore" type="java.lang.String" required="false" description="半场比分" %>
<%@attribute name="ftScore" type="java.lang.String" required="false" description="全场比分" %>
<%@attribute name="handicap" type="java.lang.String" required="false" description="让球" %>
<%@attribute name="odds" type="java.lang.String" required="false" description="赔率" %>
<%@attribute name="betScore" type="java.lang.String" required="false" description="下注比分" %>
<%@attribute name="matchTime" type="java.util.Date" required="false" description="开赛时间" %>
<%@attribute name="betType" type="java.lang.String" required="false" description="下注方式" %>
<%@attribute name="selection" type="java.lang.String" required="false" description="玩家下注" %>
<%@attribute name="betTeamName" type="java.lang.String" required="false" description="下注球队名称" %>

<c:set var="timeZone" value="<%= SessionManagerBase.getTimeZone() %>"/>
<c:set var="DateFormat" value="<%= CommonContext.getDateFormat() %>"/>

<c:if test="${!empty leagueName}">
    <span class="co-blue">${leagueName}</span>
    <br/>
</c:if>
<c:if test="${!empty homeTeam&&!empty awayTeam}">
    ${homeTeam}(主)
    <c:if test="${!empty handicap && apiId==21}">
        <c:if test="${fn:startsWith(handicap,'Y')}">
            <span class="co-blue">${fn:substring(handicap,1,fn:length(handicap))}</span>
        </c:if>
    </c:if>
    &nbsp;VS&nbsp;
    ${awayTeam}
    <c:if test="${!empty handicap && apiId==21}">
        <c:if test="${fn:startsWith(handicap,'N')}">
            <span class="co-blue">${fn:substring(handicap,1,fn:length(handicap))}</span>
        </c:if>
    </c:if>
    <c:if test="${fn:startsWith(ftScore,'1(')}">
        <c:set var="len" value="${fn:length(ftScore)}"/>
        <c:set var="ftScore" value="${fn:substring(ftScore,1,len-1)}"/>
    </c:if>
    <c:choose>
        <c:when test="${!empty htScore && !empty ftScore}">
            (${htScore},${ftScore})
        </c:when>
        <c:when test="${!empty htScore && empty ftScore}">
            (${htScore})
        </c:when>
        <c:when test="${empty htScore && !empty ftScore}">
            (${ftScore})
        </c:when>
    </c:choose>
    <br/>
</c:if>
<span class="co-red3">
     <gb:sportSelection apiId="${apiId}" homeTeam="${homeTeam}" homeTeamId="${homeTeamId}" awayTeam="${awayTeam}" awayTeamId="${awayTeamId}" betType="${betType}" selection="${selection}" betTeamName="${betTeamName}"/>
</span>
&nbsp;
<c:if test="${apiId!=21}">
<span class="co-blue">${handicap}</span>
</c:if>
<c:if test="${!empty odds}">
    &nbsp;@&nbsp;<span class="co-red">${odds}</span>
</c:if>
<c:if test="${!empty betScore}">
    &nbsp;@&nbsp;<span class="co-red">${betScore}</span>
</c:if>
<c:if test="${!empty matchTime}">
    <br>
    ${soulFn:formatDateTz(matchTime, DateFormat.DAY_SECOND, timeZone)}
</c:if>

