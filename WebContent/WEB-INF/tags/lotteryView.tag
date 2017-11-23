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
<%--彩票类注单详细--%>
<%@attribute name="code" type="java.lang.String" required="false" description="投注彩种" %>
<%@attribute name="expect" type="java.lang.String" required="false" description="期号" %>
<%@attribute name="odd" type="java.lang.String" required="false" description="赔率" %>
<%@attribute name="betCode" type="java.lang.String" required="false" description="投注玩法" %>
<%@attribute name="betNum" type="java.lang.String" required="false" description="投注号码" %>

<c:set var="dicts" value='<%=I18nTool.getDictsMap(SessionManagerCommon.getLocale().toString()) %>' />

<c:set var="timeZone" value="<%= SessionManagerBase.getTimeZone() %>"/>
<c:set var="DateFormat" value="<%= CommonContext.getDateFormat() %>"/>


<c:if test="${!empty expect}">
    <span class="co-blue">${expect}</span>
    <br/>
</c:if>
<c:if test="${!empty odd}">
    &nbsp;@&nbsp;<span class="co-red">${odd}</span>
    <br/>
</c:if>
<span class="co-blue">
<c:if test="${!empty betCode}">
    ${dicts.lottery.lottery_betting[betCode]}
</c:if>
<c:if test="${!empty betNum}">
   -${betNum}

</c:if>
</span>


