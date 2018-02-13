<%@ tag language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib tagdir="/WEB-INF/tags" prefix="gb" %>
<%--棋牌类游戏卡牌展示 betType类型 已转换为统一标识--%>
<%@attribute name="betType" type="java.lang.String" required="true" description="下注类型转换统一标志" %>
<%@attribute name="commonPorker" type="java.util.List<java.lang.Integer>" required="false"
             description="牛牛头牌／德州扑克公牌／三公头牌/色碟白数量/纽扣数量/色碟(记录的是白子数量)/" %>
<%@attribute name="porkerList" type="java.util.List<java.lang.Integer>" required="false" description=" 庄家／龙／骰宝/轮盘" %>
<%@attribute name="porkerListSet" type="java.util.List<java.util.List<java.lang.Integer>>" required="false"
             description="闲家／虎结果牌集合" %>
<%--百家乐、保险百家乐--%>

<%--德州扑克--%>
<c:if test="${betType eq 'TEXAS_HOLDEM'}">
    <c:if test="${!empty commonPorker && !empty porkerListSet}">
        <span style="vertical-align: 10px">
        公牌：&nbsp;&nbsp;&nbsp;(
        </span>
        <c:forEach items="${commonPorker}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <span style="vertical-align: 10px">
            )
        </span>
        <br/>
        <c:forEach items="${porkerListSet}" var="p" varStatus="i">
            <span style="vertical-align: 10px">
            座位${i.index+1}：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(
             </span>
            <c:forEach items="${p}" var="poker">
                <c:if test="${poker==0}">--</c:if>
                <c:if test="${poker!=0}">
                    <gb:poker poker="${poker}"/>
                </c:if>
            </c:forEach>
            <span style="vertical-align: 10px">
                )
            </span>
            <br/>
        </c:forEach>
    </c:if>

</c:if>
<%--二八杠--%>
<c:if test="${betType eq 'MAHJONG_TILES'}">
    <c:if test="${!empty porkerListSet}">
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            座位${pokerIndex.index+1}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <c:forEach items="${pokerList}" var="poker">
                <gb:mahjong mahjong="${poker}"/>
            </c:forEach>
            <br/>
        </c:forEach>
    </c:if>
</c:if>
<%--牛牛--%>
<c:if test="${betType eq 'BULL_BULL'}">
    <c:if test="${!empty commonPorker}">
        <span style="vertical-align: 10px">
        公牌：&nbsp;&nbsp;(
        </span>
        <c:forEach items="${commonPorker}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <span style="vertical-align: 10px">
        )
        </span>
        <br/>
    </c:if>
    <c:if test="${ !empty porkerListSet}">
        <c:if test="${ !empty porkerList}">
        <span style="vertical-align: 10px">
        庄：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(
        </span>
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <span style="vertical-align: 10px">
        )
        </span>
        <br/>
        </c:if>
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            <span style="vertical-align: 10px">
            闲${pokerIndex.index+1}：&nbsp;&nbsp;&nbsp;(
            </span>
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
            <span style="vertical-align: 10px">
              )
            </span>
            <c:if test="${pokerIndex.index!=fn:length(porkerListSet)-1}">
                <br/>
            </c:if>
        </c:forEach>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>
<%--炸金花--%>
<c:if test="${betType eq 'GOLDEN_FRIED'}">
    <c:if test="${!empty porkerListSet}">
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            <span style="vertical-align: 10px">
            座位${pokerIndex.index+1}：&nbsp;&nbsp;&nbsp;(
            </span>
            <c:forEach items="${pokerList}" var="poker">
                <c:if test="${poker==0}">--</c:if>
                <c:if test="${poker!=0}">
                    <gb:poker poker="${poker}"/>
                </c:if>
            </c:forEach>
            <span style="vertical-align: 10px">
            )
            </span>
            <br/>
        </c:forEach>
    </c:if>

</c:if>
<%--三公--%>
<c:if test="${betType eq 'THREE_FACE'}">
    <c:if test="${!empty porkerListSet}">
        <c:forEach items="${porkerListSet}" var="pokerList" varStatus="pokerIndex">
            <span style="vertical-align: 10px">
            座位${pokerIndex.index+1}：&nbsp;&nbsp;&nbsp;(
            </span>
            <c:forEach items="${pokerList}" var="poker">
                <c:if test="${poker==0}">--</c:if>
                <c:if test="${poker!=0}">
                    <gb:poker poker="${poker}"/>
                </c:if>
            </c:forEach>
            <span style="vertical-align: 10px">
            )
            </span>
            <br/>
        </c:forEach>
    </c:if>
</c:if>
<%--龙虎--%>
<c:if test="${betType eq 'DRAGON_TIGER'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        <span style="vertical-align: 10px">
        龙：&nbsp;&nbsp;&nbsp;(
        </span>
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <span style="vertical-align: 10px">
        )
        </span>
        <br/>
        <span style="vertical-align: 10px">
        虎：&nbsp;&nbsp;&nbsp;(
        </span>
        <c:forEach items="${porkerListSet}" var="pokerList">
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
        </c:forEach>
        <span style="vertical-align: 10px">
        )
        </span>
    </c:if>
    <c:if test="${empty porkerList || empty porkerListSet}">
        --
    </c:if>
</c:if>

<%--无限21点--%>
<c:if test="${betType eq 'BLACKJACK'}">
    <c:if test="${!empty porkerList && !empty porkerListSet}">
        <span style="vertical-align: 10px">
        庄：&nbsp;&nbsp;&nbsp;(
        </span>
        <c:forEach items="${porkerList}" var="poker">
            <gb:poker poker="${poker}"/>
        </c:forEach>
        <span style="vertical-align: 10px">
        )
        </span>
        <br/>
        <c:forEach items="${porkerListSet}" var="pokerList">
        <span style="vertical-align: 10px">
          闲：&nbsp;&nbsp;&nbsp;(
        </span>
            <c:forEach items="${pokerList}" var="poker">
                <gb:poker poker="${poker}"/>
            </c:forEach>
        <span style="vertical-align: 10px">
        )<br/>
        </span>
        </c:forEach>
    </c:if>
</c:if>


<%--欢乐红包--%>
<c:if test="${betType eq 'RED_ENVELOPE'}">
    <c:if test="${!empty porkerList }">
        <c:forEach items="${porkerList}" var="poker" varStatus="pokerIndex">
        <span style="vertical-align: 10px">
        座位号 ${pokerIndex.index+1}：&nbsp;&nbsp;&nbsp;(
        </span>
          <c:if test="${poker==0}">--</c:if>
          <c:if test="${poker!=0}"><em class="gr gr-dice-${poker} fs1"></em></c:if>
        <span style="vertical-align: 10px">
        )
        </span>
            <br/>
        </c:forEach>

    </c:if>
</c:if>