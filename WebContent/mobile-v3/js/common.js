$(function(){
		/*页面整体滚动*/
	mui('.mui-content.mui-scroll-wrapper').scroll({
		 scrollY: true, //是否竖向滚动
		 scrollX:false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: true, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: true //是否启用回弹
	});
	/*关闭轮播*/
	$(".banner-slide").on("tap",".close-slide",function(){
		$(this).parent().hide();
	});
	/*公告弹窗*/
	mui(".notice .notice-list").on("tap","a",function(){
		var noticeA =noticeIndicator="";
		$(".notice .notice-list p a").each(function(){//生成公告html和indicator
			noticeA+="<div class='mui-slider-item'><a href='javascript:'>"+$(this).html()+"</a></div>";
			noticeIndicator+="<div class='mui-indicator'></div>"
		});
		var noticeHtml = $('<div><div class="mui-slider notice-slider"><div class="mui-slider-group">'+noticeA+'</div><div class="mui-slider-indicator">'+noticeIndicator+'</div></div></div></div>');
		var alertNotice = mui.alert(noticeHtml.html(),"公告","关闭");
		$(alertNotice.element).addClass('notice-alert');// 定义弹窗的class,方便修改样式
		var index = $(this).index();//当前点击的公告index
		//初始化notice-slider
		var notice = mui('.notice-alert .mui-slider');
		notice.slider({
		  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
		});
		//点击公告，轮播跳转到对应的位置
		$(".notice-slider .mui-indicator").removeClass("mui-active");
		$(".notice-slider .mui-indicator:eq("+index+")").addClass("mui-active");
		notice.slider().gotoItem(index);
	});
	/*侧滑菜单脚本*/
	$(".mui-bar").on("tap",".mui-action-menu",function(){
		$("html").toggleClass("index-canvas-show");
		mui('.index-canvas-wrap .mui-scroll-wrapper').scroll();
	});
	$(".index-canvas-wrap").on("tap",function(e){
		//e.preventDefault();
		$("html").removeClass("index-canvas-show");
	});
	$(".index-canvas-wrap .mui-off-canvas-left").on("tap",function(e){		
		e.stopPropagation();//首页侧滑菜单打开时，阻止冒泡，防止点击侧滑菜单里面的选项触发了侧滑菜单关闭脚本
	});
		/*关闭侧滑菜单*/
	$(".mui-inner-wrap").on("tap",function(event){
		if(mui('.mui-off-canvas-wrap').offCanvas().isShown('left')){
			mui('.mui-off-canvas-wrap').offCanvas().close();
		}		
	});
	/*打开侧滑菜单*/
	$(".mui-bar").on("tap",".mui-action-menu",function(){
		mui('.mui-off-canvas-wrap').offCanvas().show();
	});
	/* 关闭浮窗广告 */
	mui(".ads-slider").on("tap",".close-ads",function(){
		$(".ads-slider").hide();
	});
	/*侧滑菜单滚动*/
	mui('.side-menu-scroll-wrapper').scroll({
		 scrollY: true, //是否竖向滚动
		 scrollX:false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: true, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: true //是否启用回弹
	});
	
	$(".lottery-nav li").on("tap",function(){
		$(this).siblings().find("a").removeClass("mui-active");
		$(this).find("a").addClass("mui-active");
	});
	/*语言弹窗弹出*/
	mui('.side-nav').on("tap","li",function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		if($(this).hasClass("lang")){
			$(".lang-menu").toggle();
		}		
	});
	/* 关闭侧滑菜单隐藏语言弹窗 */
	$('.mui-off-canvas-wrap').on('hidden',function (event) {
	    $(".lang-menu").hide();
	});
	// 监听tap事件，解决 a标签 不能跳转页面问题
	mui('body').on('tap','a[href$=html]',function(){
		document.location.href=this.href;
	});
	// 选择器示例，展示用而已。根据业务逻辑自己定义
	$(".mui-input-select").on("tap",function(){
		 var picker = new mui.PopPicker();
		 picker.setData([{value:'v1',text:'选项1'},{value:'v2',text:'选项2'},{value:'v3',text:'选项3'}]);
		 picker.show(function (selectItems) {
		 });
	});
	//登录信息点击弹出余额信息
	$("#login-info").on("tap",function(){
		$(this).find(".ex").toggleClass("open");
		mui(".mui-assets").scroll({			
			 scrollY: true, //是否竖向滚动
			 scrollX:false, //是否横向滚动
			 startX: 0, //初始化时滚动至x
			 startY: 0, //初始化时滚动至y
			 indicators: true, //是否显示滚动条
			 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
			 bounce: true //是否启用回弹
		});
	});
	
});