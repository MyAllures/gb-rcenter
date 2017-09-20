<%@ tag language="java" body-content="scriptless" dynamic-attributes="dynattrs" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ attribute name="name" type="java.lang.String" required="false" description="密码强度的name"%>
<%@ attribute name="passwordInput" type="java.lang.String" required="false" description="密码输入框的class"%>
<%@ attribute name="level" type="java.lang.Integer" required="false" description="当前密码强度;10 20 30"%>
<%@ attribute name="label" type="java.lang.String" required="false" description="label描述" %>
<c:choose>
    <c:when test="${empty level}">
        <div class="form-group clearfix line-hi34 m-b-xxs _password_level" data-selector="${passwordInput}">
            <input type="hidden" name="${name}" class="" value="">
            <label class="col-xs-3 al-right">${label}</label>
            <div class="col-xs-8 p-x controls">
                <em class="passafe"></em>
                <em class="passafe"></em>
                <em class="passafe"></em>
            </div>
        </div>
    </c:when>
    <c:otherwise>
    <%--如果指定密码强度 只显示强度--%>
    <c:set value="${level}" var="level"></c:set>
        <c:choose>
            <c:when test="${level eq 1}">
                <%--弱密码显示红色等级条--%>
                <c:set var="levelClass" value="passafered"></c:set>
            </c:when>
            <c:otherwise>
                <c:set var="levelClass" value="passafegreen"></c:set>
            </c:otherwise>
        </c:choose>
        <c:forEach begin="1" end="${level}">
            <em class="passafe ${levelClass}" data-target="${level}"></em>
        </c:forEach>
        <c:forEach begin="1" end="${3-level}">
            <em class="passafe"  data-target="${level}"></em>
        </c:forEach>
    </c:otherwise>
</c:choose>
