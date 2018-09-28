// 代理页面交互JS
$(function(){
	initPage();
	addEvent();
});
//页面初始化
function initPage(){
	pageObj.init();
	fluxPage.init();
}
//添加事件
function addEvent(){
	$(".ipt").focus(function(){
		$(this).parent().addClass("crt");
	});
	$(".ipt").blur(function(){
		$(this).parent().removeClass("crt");
	});
	//更多
	$("#more").click(function(){
		pageObj.page.moveTo(2);
	});
	$("[data-changeImg]").children("div").click(function(){
		fluxPage.changeImg($(this));
	});
	$("#back_top").click(function(){
		pageObj.page.moveTo(1);
	});
}
var pageObj = {
	page:null,
	init:function(){
		var $this = this;
		$("#fullpage").fullpage({
			verticalCentered:true,
			paddingTop:"70px",
			scrollOverflow:true,
			css3:true,
			anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', 'footPage'],
			onLeave:function(index, nextIndex, direction){
				if(nextIndex == 1){
					$this.firstPageLeave();
				}else if(nextIndex == 2){
					$this.secondPageLeave();	
				}else if(nextIndex == 3){
					$this.thirdPageLeave();
				}else if(nextIndex == 4){
					$this.fourthPageLeave();
				}else if(nextIndex == 5){
				}
				if(index == 1){
					$("#back_top").addClass("show");
				}
			},
			afterLoad:function(anchorLink, index){
				if(index == 1){
					$this.firstPageAfter();
				}else if(index == 2){
					$this.secondPageAfter();
				}else if(index == 3){
					$this.thirdPageAfter();
				}else if(index == 4){
					$this.fourthPageAfter();
				}else if(index == 5){
				}
			},
			afterRender:function(){
				$this.firstPageAfter();
			}
		});
		$this.page = $("#fullpage").fullpage;
	},
	firstPageAfter:function(){
		$("#future").addClass("play");
	},
	firstPageLeave:function(){
		$("#future").removeClass("play");
		$("#back_top").removeClass("show");
	},
	secondPageAfter:function(){
		$("#as_list").addClass("play");
	},
	secondPageLeave:function(){
		$("#as_list").removeClass("play");
	},
	thirdPageAfter:function(){
		$("#adv").addClass("play");
		$("#brand").addClass("play");
	},
	thirdPageLeave:function(){
		$("#adv").removeClass("play");				
		$("#brand").removeClass("play");				
	},
	fourthPageAfter:function(){
		$("#mobile").addClass("play");
	},
	fourthPageLeave:function(){
		$("#mobile").removeClass("play");
	}
}
//flux list
var fluxPage = {
	productFlux:null,
	cashierFlux:null,
	adminFlux:null,
	animateName:["bars","zip","blinds","blocks","concentric","warp","slide","bars3d","tiles3d","blinds3d","explode"],
	init:function(){
		var $this = this;
		$this.productFlux = new flux.slider("#product_flux",{autoplay: false, pagination: false });
		$this.cashierFlux = new flux.slider("#cashier_flux",{autoplay: false, pagination: false });
		$this.adminFlux = new flux.slider("#admin_flux",{autoplay: false, pagination: false });
	},
	randonName:function(){
		var $this = this;
		var index = Math.floor(Math.random()*$this.animateName.length);
		index %= $this.animateName.length;
		return $this.animateName[index];
	},
	changeImg:function(obj){
		var $this = this;
		if(obj.hasClass("on")){
			return;
		}
		var parentObj = obj.parent(); 
		var objId = parentObj.parent().attr("id");

		parentObj.children("div").removeClass("on");
		obj.addClass("on");
		var index = obj.index();
		var funcName = $this.randonName();
		$this[objId + "Flux"].showImage(index, funcName);
	}
}