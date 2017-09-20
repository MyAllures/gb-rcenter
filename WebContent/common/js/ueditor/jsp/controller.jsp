<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="org.soul.web.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page import="so.wwb.gamebox.mcenter.init.ConfigManager" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding("utf-8");
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );
	response.getOutputStream().print(new ActionEnter(request, rootPath)
			.exec(ConfigManager.getMCenterConfigration().getResRoot(),
					ConfigManager.getMCenterConfigration().getFileRoot()));
	
%>