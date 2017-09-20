<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib tagdir="/WEB-INF/tags" prefix="gb" %>
<%--真人类游戏卡牌展示 betType类型 已转换为统一标识--%>
<%@attribute name="betType" type="java.lang.String" required="true" description="下注类型转换统一标志" %>
<%@attribute name="commonPorker" type="java.util.List<java.lang.Integer>" required="false"
             description="牛牛头牌／德州扑克公牌／三公头牌/色碟白数量/纽扣数量/色碟(记录的是白子数量)/" %>
<%@attribute name="porkerList" type="java.util.List<java.lang.Integer>" required="false" description=" 庄家／龙／骰宝/轮盘" %>
<%@attribute name="porkerListSet" type="java.util.List<java.util.List<java.lang.Integer>>" required="false"
             description="闲家／虎结果牌集合" %>
<%--百家乐、保险百家乐--%>
<c:if test="${betType eq 'BACCARAT' || betType eq 'BACCARAT_INSURANCE'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        庄：
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        闲：
        <c:forEach items="${porkerListSet}" var="pokerList">
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--牛牛--%>
<c:if test="${betType eq 'BULL_BULL'}">
    <c:if test="${!empty commonPorker}">
        公牌：
        <c:forEach items="${commonPorker}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
    </c:if>
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        庄：&nbsp;&nbsp;&nbsp;
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            闲${pokerIndex.index+1}：&nbsp;
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
            <c:if test="${pokerIndex.index!=fn:length(porkerListSet)-1}">
                <br/>
            </c:if>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--龙虎--%>
<c:if test="${betType eq 'DRAGON_TIGER'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        龙：
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        虎：
        <c:forEach items="${porkerListSet}" var="pokerList">
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--轮盘--%>
<c:if test="${betType eq 'ROULETTE'}">
    <c:if test="${!empty porkerList[0]}">
        ${porkerList[0]}
        <%--<em class="gr-roulette-${porkerList[0]}"></em>--%>
    </c:if>
    <c:if test="${empty porkerList[0]}">
        --
    </c:if>
</c:if>
<%--骰宝--%>
<c:if test="${betType eq 'SICBO'}">
    <c:if test="${!empty porkerList}">
        <c:forEach items="${porkerList}" var="poker">
            <em class="gr gr-dice-${poker} fs1"></em>
        </c:forEach>
        <%--<em class="gr-roulette-${porkerList[0]}"></em>--%>
    </c:if>
    <c:if test="${empty porkerList[0]}">
        --
    </c:if>
</c:if>
<%--色碟--%>
<c:if test="${betType eq 'XOC_DIA'}">
    <c:if test="${!empty commonPorker[0]}">
        <c:set var="white" value="${commonPorker[0]}"/>
        <c:set var="red" value="${4-commonPorker[0]}"/>
        <c:if test="${white>0}">
            <c:forEach begin="1" end="${white}">
                <em class="gr gr-ft-w fs1"></em>
            </c:forEach>
        </c:if>
        <c:if test="${red>0}">
            <c:forEach begin="1" end="${red}">
                <em class="gr gr-ft-b fs1"></em>
            </c:forEach>
        </c:if>
    </c:if>
    <c:if test="${empty commonPorker[0]}">
        --
    </c:if>
</c:if>
<%--三公--%>
<c:if test="${betType eq 'THREE_FACE'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        庄：&nbsp;&nbsp;
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            闲${pokerIndex.index+1}：
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
            <c:if test="${pokerIndex.index!=fn:length(porkerListSet)-1}">
                <br/>
            </c:if>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--温州牌九--%>
<c:if test="${betType eq 'WENZHOU_PAI_GOW'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        庄：&nbsp;&nbsp;&nbsp;
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            <c:if test="${pokerIndex.index==0}">顺门：</c:if>
            <c:if test="${pokerIndex.index==1}">出门：</c:if>
            <c:if test="${pokerIndex.index==2}">到门：</c:if>
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
            <c:if test="${pokerIndex.index!=fn:length(porkerListSet)-1}">
                <br/>
            </c:if>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--德州扑克--%>
<c:if test="${betType eq 'TEXAS_HOLDEM'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        公牌：
        <c:forEach items="${commonPorker}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        庄：&nbsp;&nbsp;
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <br/>
        闲：&nbsp;&nbsp;
        <c:forEach items="${porkerListSet}" var="pokerList">
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--无限21点--%>
<c:if test="${betType eq 'BLACKJACK'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        庄：
        <c:forEach items="${porkerList}" var="poker">
            ${poker}
        </c:forEach>
        <br/>
        闲：
        <c:forEach items="${porkerListSet}" var="pokerList">
            <c:forEach items="${pokerList}" var="poker">
                ${poker}
            </c:forEach>
        </c:forEach>
    </c:if>
</c:if>
<%--番摊--%>
<c:if test="${betType eq 'FAN_TAN'}">
    <c:if test="${!empty porkerList}">
        <c:forEach begin="1" end="${porkerList[0]}">
            <em class="gr gr-ft-w fs1"></em>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList}">--</c:if>
</c:if>
<%--二八杠--%>
<c:if test="${betType eq 'MAHJONG_TILES'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        庄：&nbsp;&nbsp;&nbsp;
        <c:forEach items="${porkerList}" var="poker">
            <gb:mahjong mahjong="${poker}"/>
        </c:forEach>
        <br/>
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            <c:if test="${pokerIndex.index==0}">上门：</c:if>
            <c:if test="${pokerIndex.index==1}">中门：</c:if>
            <c:if test="${pokerIndex.index==2}">下门：</c:if>
            <c:forEach items="${pokerList}" var="poker">
                <gb:mahjong mahjong="${poker}"/>
            </c:forEach>
            <c:if test="${pokerIndex.index!=fn:length(porkerListSet)-1}">
                <br/>
            </c:if>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>