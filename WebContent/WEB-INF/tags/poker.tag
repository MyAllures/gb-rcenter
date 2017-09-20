<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--扑克类注单样式展示 poker 扑克数值（即数据库对应值）--%>
<%--其中：1~13:黑桃A~黑桃K 14~26:红桃A~红桃K 27~39:梅花A~梅花K  40~52:方片A~方片K--%>
<%@attribute name="poker" type="java.lang.Integer" required="true" description="扑克数值" %>

<c:set var="round" value="${poker%13==0?13:poker%13}"/>
<c:choose>
    <c:when test="${(poker/13).intValue()==0||poker==13}">
        <em class="gr gr-spade-${round} fs1"></em>
    </c:when>
    <c:when test="${(poker/13).intValue()==1||poker==26}">
        <em class="gr gr-heart-${round} fs1"></em>
    </c:when>
    <c:when test="${(poker/13).intValue()==2||poker==39}">
        <em class="gr gr-club-${round} fs1"></em>
    </c:when>
    <c:when test="${(poker/13).intValue()==3||(poker/13).intValue()==4}">
        <em class="gr gr-diamond-${round} fs1"></em>
    </c:when>
</c:choose>
