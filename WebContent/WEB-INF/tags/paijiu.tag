<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--麻将类注单样式展示 mahjong 麻将数值（即数据库对应值）--%>
<%--其中：1~9: 1筒 ~ 9筒 10：白板--%>
<%@attribute name="paijiu" type="java.lang.Integer" required="true" description="牌九数值" %>
<%--天牌 66--%>
<c:if test="${paijiu == 66}">
    <em class="gr pj-icon pj-icon-tian fs1"></em>
</c:if>
<%--地牌 11--%>
<c:if test="${paijiu == 11}">
    <em class="gr pj-icon pj-icon-di fs1"></em>
</c:if>
<%--人牌 44--%>
<c:if test="${paijiu == 44}">
    <em class="gr pj-icon pj-icon-ren fs1"></em>
</c:if>
<%--鹅牌 13--%>
<c:if test="${paijiu == 13}">
    <em class="gr pj-icon pj-icon-he fs1"></em>
</c:if>
<%--长三 33--%>
<c:if test="${paijiu == 33}">
    <em class="gr pj-icon pj-icon-changsan fs1"></em>
</c:if>
<%--梅牌 55--%>
<c:if test="${paijiu == 55}">
    <em class="gr pj-icon pj-icon-mei fs1"></em>
</c:if>
<%--板凳 22--%>
<c:if test="${paijiu == 22}">
    <em class="gr pj-icon pj-icon-bandeng fs1"></em>
</c:if>
<%--红头十 46--%>
<c:if test="${paijiu == 46}">
    <em class="gr pj-icon pj-icon-hongtou fs1"></em>
</c:if>
<%--斧头 56--%>
<c:if test="${paijiu == 56}">
    <em class="gr pj-icon pj-icon-futou fs1"></em>
</c:if>
<%-- 高脚 16--%>
<c:if test="${paijiu == 16}">
    <em class="gr pj-icon pj-icon-gaojiao fs1"></em>
</c:if>
<%-- 零霖六 15--%>
<c:if test="${paijiu == 15}">
    <em class="gr pj-icon pj-icon-tongchui fs1"></em>
</c:if>
<%--杂九 36 --%>
<c:if test="${paijiu == 36}">
    <em class="gr pj-icon pj-icon-baijiu fs1"></em>
</c:if>
<%--杂九 45 --%>
<c:if test="${paijiu == 45}">
    <em class="gr pj-icon pj-icon-hongjiu fs1"></em>
</c:if>
<%-- 杂八 35 --%>
<c:if test="${paijiu == 35}">
    <em class="gr pj-icon pj-icon-wanba fs1"></em>
</c:if>
<%-- 杂八 26 --%>
<c:if test="${paijiu == 26}">
    <em class="gr pj-icon pj-icon-pingba fs1"></em>
</c:if>
<%-- 杂七 34 --%>
<c:if test="${paijiu == 34}">
    <em class="gr pj-icon pj-icon-hongqi fs1"></em>
</c:if>
<%-- 杂七 25 --%>
<c:if test="${paijiu == 25}">
    <em class="gr pj-icon pj-icon-baiqi fs1"></em>
</c:if>
<%-- 杂五 23 --%>
<c:if test="${paijiu == 23}">
    <em class="gr pj-icon pj-icon-baiwu fs1"></em>
</c:if>
<%-- 杂五 14 --%>
<c:if test="${paijiu == 14}">
    <em class="gr pj-icon pj-icon-hongwu fs1"></em>
</c:if>
<%-- 二四 24 --%>
<c:if test="${paijiu == 24}">
    <em class="gr pj-icon pj-icon-liu fs1"></em>
</c:if>
<%-- 丁三 --%>
<c:if test="${paijiu == 12}">
    <em class="gr pj-icon pj-icon-dingsan fs1"></em>
</c:if>

















