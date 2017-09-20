<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--麻将类注单样式展示 mahjong 麻将数值（即数据库对应值）--%>
<%--其中：1~9: 1筒 ~ 9筒 10：白板--%>
<%@attribute name="mahjong" type="java.lang.Integer" required="true" description="麻将数值" %>
<%--1-9筒--%>
<c:if test="${mahjong>=1&&mahjong<=9}">
    <em class="gr gr-mj-c${mahjong} fs1"></em>
</c:if>
<%--白板--%>
<c:if test="${mahjong==10}">
    <em class="gr gr-mj-wd fs1"></em>
</c:if>