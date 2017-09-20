<%@ tag import="org.soul.web.session.SessionManagerBase" %>
<%@ tag import="org.soul.commons.locale.DateQuickPicker" %>
<%@ tag import="org.soul.commons.init.context.CommonContext" %>
<%@ tag import="org.soul.commons.lang.string.I18nTool" %>


<%--@elvariable id="DateFormat" type="org.soul.commons.locale.DateFormat"--%>
<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://soul/fnTag" prefix="soulFn" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%@ attribute name="id" type="java.lang.String" required="false" description="单选ID"%>
<%@ attribute name="name" type="java.lang.String" required="false" description="单选日期名称"%>
<%@ attribute name="value" type="java.util.Date" required="false" description="单选日期值"%>
<%@ attribute name="style" type="java.lang.String" required="false" description="控件样式"%>
<%@ attribute name="format" type="java.lang.String" required="false" description="日期格式 如：yyyy-MM-dd HH:mm:ss"%>
<%@ attribute name="minDate" type="java.util.Date" required="false" description="最小日期"%>
<%@ attribute name="maxDate" type="java.util.Date" required="false" description="最大日期"%>
<%@ attribute name="inputStyle" type="java.lang.String" required="false" description="input的样式"%>
<%@ attribute name="callback" type="java.lang.String" required="false" description="日期选择发生改变时的回调，脚本函数名称，不带参数，函数接收，Start，End,Label三个参数"%>
<%@ attribute name="btnClass" type="java.lang.String" required="false" description="按钮的样式"%>
<%@ attribute name="position" type="java.lang.String" required="false" description="选项方向:默认：向下,down:向下;up:向上" %>
<%@ attribute name="opens" type="java.lang.String" required="false" description="选项方向:默认：left; left,center,right" %>
<%@ attribute name="showDropdowns" type="java.lang.Boolean" required="false" description="是否显示年份月份下拉选择" %>

<%@ attribute name="useRange" type="java.lang.Boolean" required="false" description="是否区间选择"%>
<%@ attribute name="hideQuick" type="java.lang.Boolean" required="false" description="是否隐藏快速选择"%>
<%@ attribute name="useToday" type="java.lang.Boolean" required="false" description="是否选择包含今天"%>
<%@ attribute name="startName" type="java.lang.String" required="false" description="开始日期名称"%>
<%@ attribute name="endName" type="java.lang.String" required="false" description="结束日期名称"%>
<%@ attribute name="startDate" type="java.util.Date" required="false" description="开始时间"%>
<%@ attribute name="endDate" type="java.util.Date" required="false" description="结束时间"%>


<%@ attribute name="today" type="java.lang.Boolean" required="false" description="是否显示今天true:显示，false：隐藏" %>
<%@ attribute name="yesterday" type="java.lang.Boolean" required="false" description="是否显示昨天" %>
<%@ attribute name="beforeYesterday" type="java.lang.Boolean" required="false" description="是否显示前天" %>
<%@ attribute name="thisWeek" type="java.lang.Boolean" required="false" description="是否显示本周" %>
<%@ attribute name="lastWeek" type="java.lang.Boolean" required="false" description="是否显示上周" %>
<%@ attribute name="thisMonth" type="java.lang.Boolean" required="false" description="是否显示本月" %>
<%@ attribute name="lastMonth" type="java.lang.Boolean" required="false" description="是否显示上月" %>
<%@ attribute name="last7Days" type="java.lang.Boolean" required="false" description="是否显示过去七天" %>
<%@ attribute name="last30Days" type="java.lang.Boolean" required="false" description="是否显示过去三十天" %>

<c:if test="${value!=null}">
       <c:set var="startDate" value="${value}"/>
</c:if>
<c:if test="${endDate==null}">
       <%--<c:set var="endDate" value="<%= new DateQuickPicker().getToday() %>"/>--%>
</c:if>

<jsp:doBody var="bodyRes" />

<c:set var="timeZone" value="<%= SessionManagerBase.getTimeZone() %>"/>
<c:set var="DateFormat" value="<%= CommonContext.getDateFormat() %>"/>
<c:set var="format" value="${format == null ?  DateFormat.DAY : format}"/>
<c:set var="views" value='<%=I18nTool.getI18nMap(SessionManagerBase.getLocale().toString()).get("views") %>'/>


${bodyRes}
<div class="btn-group daterangepickers" style="${style}">
       <c:if test="${useRange!=true}">
              <input class="form-control" type="text" id="${id}" name="${name}" style="${inputStyle};padding-left: 20px;padding-right: 2px;width:100%;"
                     value="${soulFn:formatDateTz(value, format,timeZone)}"
                     data-rel="{showDropdowns:${showDropdowns==null?false:showDropdowns},callback:'${callback}',useRange:${useRange==null?false:useRange},
                     useToday:${useToday==null?false:useToday},format:'${format}',
                     minDate:'${soulFn:formatDateTz(minDate, format,timeZone)}',maxDate:'${soulFn:formatDateTz(maxDate, format,timeZone)}',
                     btnClass:'${btnClass}',drops:'${position==null?'down':position}',opens:'${opens==null?'right':opens}',
                     today:${today==null?true:today},
                     yesterday:${yesterday==null?true:yesterday},
                     beforeYesterday:${beforeYesterday==null?true:beforeYesterday}}">
              <i class="input-group-addon glyphicon glyphicon-calendar fa fa-calendar" style="left: 1px;position: absolute;top: 5px;z-index:3;border: 0px;padding-left: 2px;"></i>
       </c:if>

       <c:if test="${useRange==true}">

              <input class="form-control" type="text" id="${id}" name="${startName}" style="${inputStyle};padding-left: 20px;padding-right: 2px;"
                     value="${soulFn:formatDateTz(startDate, format,timeZone)}"
                     data-rel="{showDropdowns:${showDropdowns==null?false:showDropdowns},callback:'${callback}',useRange:${useRange==null?false:useRange},
                     useToday:${useToday==null?false:useToday},format:'${format}',
                     minDate:'${soulFn:formatDateTz(minDate, format,timeZone)}',maxDate:'${soulFn:formatDateTz(maxDate, format,timeZone)}',
                     startDate:'${soulFn:formatDateTz(startDate, format,timeZone)}',endDate:'${soulFn:formatDateTz(endDate, format,timeZone)}',
                     btnClass:'${btnClass}',drops:'${position==null?'down':position}',opens:'${opens==null?'right':opens}',startName:'${startName}',endName:'${endName}',
                     today:${today==null?true:today},
                     yesterday:${yesterday==null?true:yesterday},
                     beforeYesterday:${beforeYesterday==null?true:beforeYesterday},
                     thisWeek:${thisWeek==null?true:thisWeek},
                     lastWeek:${lastWeek==null?true:lastWeek},
                     thisMonth:${thisMonth==null?true:thisMonth},
                     lastMonth:${lastMonth==null?true:lastMonth},
                     last7Days:${last7Days==null?true:last7Days},
                     last30Days:${last30Days==null?true:last30Days}}">
              <i class="input-group-addon glyphicon glyphicon-calendar fa fa-calendar" style="left: 1px;position: absolute;top: 5px;z-index:3;border: 0px;padding-left: 2px;"></i>
              </div> ~
              <div class="btn-group daterangepickers" style="${style}">
              <input class="form-control" type="text" id="${id}" name="${endName}" style="${inputStyle};padding-left: 20px;padding-right: 2px;"
                     value="${soulFn:formatDateTz(endDate, format,timeZone)}"
                     data-rel="{showDropdowns:${showDropdowns==null?false:showDropdowns},callback:'${callback}',useRange:${useRange==null?false:useRange},
                     useToday:${useToday==null?false:useToday},format:'${format}',
                     minDate:'${soulFn:formatDateTz(minDate, format,timeZone)}',maxDate:'${soulFn:formatDateTz(maxDate, format,timeZone)}',
                     startDate:'${soulFn:formatDateTz(startDate, format,timeZone)}',endDate:'${soulFn:formatDateTz(endDate, format,timeZone)}',
                     btnClass:'${btnClass}',drops:'${position==null?'down':position}',opens:'${opens==null?'right':opens}',startName:'${startName}',endName:'${endName}',
                     today:${today==null?true:today},
                     yesterday:${yesterday==null?true:yesterday},
                     beforeYesterday:${beforeYesterday==null?true:beforeYesterday},
                     thisWeek:${thisWeek==null?true:thisWeek},
                     lastWeek:${lastWeek==null?true:lastWeek},
                     thisMonth:${thisMonth==null?true:thisMonth},
                     lastMonth:${lastMonth==null?true:lastMonth},
                     last7Days:${last7Days==null?true:last7Days},
                     last30Days:${last30Days==null?true:last30Days}}">
              <i class="input-group-addon glyphicon glyphicon-calendar fa fa-calendar" style="left: 1px;position: absolute;top: 5px;z-index:3;border: 0px;padding-left: 2px;"></i>
       </c:if>
</div>
<c:if test="${useRange==true && hideQuick!=true}">
<button type="button" class="btn daterangepickers" style="padding: 6px 3px;" 　endName="${endName}">${not empty views.tags['快选']?views.tags['快选']:'快选'}</button>
</c:if>

