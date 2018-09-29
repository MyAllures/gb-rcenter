$(function(){
	gameEffect();
});

function gameEffect(){
	$(".game-item").each(function(){
		var objEvt = $._data($(this)[0], "events");
		if(objEvt && objEvt['mouseover']){
			console.log("------");
			return;
		}else {
			$(this).mouseenter(function(event) {
				var $this = $(this).find(".item");
				var id = $this.parent().attr("data_id");
				if(canvasAnimate.canvasObjs[id] == undefined){
					canvasAnimate.initCanvas(id);
				}
				if(canvasAnimate.canvasObjs[id] != undefined){
					canvasAnimate.canvasObjs[id].moveIn();
				}
			});
			$(this).mouseleave(function(event) {
				var $this = $(this).find(".item");
				var id = $this.parent().attr("data_id");
				if(canvasAnimate.canvasObjs[id] != undefined){
					canvasAnimate.canvasObjs[id].moveOut();
				}
			});
		}
	})
}

//jackpot
var jackpot = {
	jackpotMap:{},
	init:function(){
		var _this = this;
		if(!$("<canvas><canvas>")[0].getContext){
			return;
		}
	}
}
//缓动函数
// t: current time（当前时间）；
// b: beginning value（初始值）；
// c: change in value（变化量）；
// d: duration（持续时间）
// var b=50,c=100,d=10,t=0;
function UedEasing(time,begin,change,duration,callback){
	var _this = this;
	this.interval = 100;//时间间隔
	this.easingName = "easeOutQuint";//缓动函数
	this.t = time;
	this.b = begin;
	this.c = change;
	this.d = duration;
	this.cb = callback;//回调方法
	this.timeout = null;
	this.run = function(){
		var _this = this;
		var value = jQuery.easing[_this.easingName](null, this.t, this.b, this.c, this.d);
		if(this.cb != undefined){
			this.cb(value);
		}
		//递归调用
		if(this.t<this.d){
			this.t += this.interval;
			this.timeout = setTimeout(function(){
				_this.run();
			},this.interval);
		}
	}
	this.setValue = function(time,begin,change,duration){
		//重置数据
		this.t = time;
		this.b = begin;
		this.c = change;
		this.d = duration;
		if(this.timeout != null){
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.run();
	}
	this.autoGrowth = function(){
		this.t = 0;
		this.b = this.b + this.c;
		this.c = this.b * 0.001;
		this.d = 2000;
		this.run();
	}
}
var canvasAnimate = {
	canvasObjs:{},
	animateList:[],	
	isOnclear:false,
	initCanvas:function(id){
		var obj = $("[data_id='"+id+"']").children(".item");
		//判断是否支持canvas
		if($("<canvas><canvas>")[0].getContext){
			obj.children(".cover").show();
			//支持
			var img = obj.find("img");
			var canvas = $("<canvas width='300px' height='210px'></canvas>");
			obj.append(canvas);
			canvasAnimate.canvasObjs[id] = new CanvasObj();
			canvasAnimate.canvasObjs[id].canvas = canvas;
			canvasAnimate.canvasObjs[id].img = img[0];
			canvasAnimate.canvasObjs[id].id = id;
		}else{
			//不支持
		}
	},
	clearAnimate : function(cvs){
		var $this = this;
		//删除其他未完成动画
		if($this.isOnclear){
			return;
		}
		$this.isOnclear =true;
		for(var i = 0; i < $this.animateList.length; i++){
			if($this.animateList[i] == cvs){
				continue;
			}
			if(cvs == null || cvs.isPlay){
				$this.animateList[i].drawOut();
			}
		}
		$this.isOnclear =false;
		if($this.animateList.length >=1 && $this.animateList[0] != cvs){
			$this.clearAnimate();
		}
	}
};
function CanvasObj(option){
	this.canvas = null;
	this.img = null;
	this.duration = 600;
	this.time = 0;
	this.isPlay = false;
	this.nextAnimate = null;
	this.id = null;
	this.isOn = false;
	this.interval = 60;
	this.onCircle = [
		{"x":{"b":25, "c":15},"y":{"b":-30, "c":430}, "radius":15},
		{"x":{"b":50, "c":135},"y":{"b":-10, "c":460}, "radius":17},
		{"x":{"b":100, "c":150},"y":{"b":-20, "c":450}, "radius":19},
		{"x":{"b":75, "c":90},"y":{"b":-40, "c":360}, "radius":16},
		{"x":{"b":-10, "c":80},"y":{"b":-60, "c":330}, "radius":15},
		{"x":{"b":64, "c":100},"y":{"b":-26, "c":280}, "radius":18},
		{"x":{"b":75, "c":70},"y":{"b":-120, "c":360}, "radius":19},
		{"x":{"b":14, "c":75},"y":{"b":-110, "c":280}, "radius":19},
		{"x":{"b":55, "c":90},"y":{"b":-95, "c":295}, "radius":16},
		{"x":{"b":-15, "c":25},"y":{"b":-130, "c":235}, "radius":23},
		{"x":{"b":30, "c":35},"y":{"b":-80, "c":185}, "radius":24},
		{"x":{"b":99, "c":50},"y":{"b":-125, "c":230}, "radius":24},
		{"x":{"b":2, "c":25},"y":{"b":-50, "c":145}, "radius":18},
		{"x":{"b":72, "c":40},"y":{"b":-115, "c":205}, "radius":24},
		{"x":{"b":138, "c":50},"y":{"b":-65, "c":150}, "radius":24},
		{"x":{"b":2, "c":25},"y":{"b":-50, "c":125}, "radius":23},
		{"x":{"b":28, "c":35},"y":{"b":-105, "c":180}, "radius":30},
		{"x":{"b":135, "c":50},"y":{"b":-65, "c":130}, "radius":29},
		{"x":{"b":2, "c":25},"y":{"b":-50, "c":105}, "radius":23},
		{"x":{"b":68, "c":30},"y":{"b":-50, "c":107}, "radius":26},
		{"x":{"b":102, "c":50},"y":{"b":-65, "c":110}, "radius":29},
		{"x":{"b":-13, "c":25},"y":{"b":-40, "c":65}, "radius":28},
		{"x":{"b":17, "c":45},"y":{"b":-100, "c":120}, "radius":25},
		{"x":{"b":72, "c":40},"y":{"b":-115, "c":135}, "radius":30},
		{"x":{"b":134, "c":50},"y":{"b":-65, "c":80}, "radius":30}
	];
	this.outCircle = [
		{"x":{"b":0, "c":25},"y":{"b":0, "c":800}, "radius":15},
		{"x":{"b":60, "c":33},"y":{"b":0, "c":610}, "radius":18},
		{"x":{"b":110, "c":43},"y":{"b":0, "c":495}, "radius":15},
		{"x":{"b":160, "c":-4},"y":{"b":0, "c":720}, "radius":17},
		{"x":{"b":43, "c":-5},"y":{"b":15, "c":710}, "radius":18},
		{"x":{"b":128, "c":23},"y":{"b":13, "c":485}, "radius":16},
		{"x":{"b":10, "c":-3},"y":{"b":32, "c":810}, "radius":20},
		{"x":{"b":75, "c":33},"y":{"b":34, "c":620}, "radius":23},
		{"x":{"b":121, "c":55},"y":{"b":33, "c":501}, "radius":20},
		{"x":{"b":170, "c":-4},"y":{"b":39, "c":725}, "radius":22},
		{"x":{"b":10, "c":-2},"y":{"b":57, "c":815}, "radius":25},
		{"x":{"b":43, "c":84},"y":{"b":62, "c":735}, "radius":27},
		{"x":{"b":93, "c":-5},"y":{"b":57, "c":480}, "radius":26},
		{"x":{"b":155, "c":70},"y":{"b":63, "c":635}, "radius":27},
		{"x":{"b":10, "c":90},"y":{"b":85, "c":825}, "radius":25},
		{"x":{"b":75, "c":120},"y":{"b":85, "c":640}, "radius":28},
		{"x":{"b":121, "c":60},"y":{"b":85, "c":495}, "radius":25},
		{"x":{"b":170, "c":20},"y":{"b":85, "c":745}, "radius":27},
		{"x":{"b":35, "c":100},"y":{"b":-30, "c":430}, "radius":15},
		{"x":{"b":60, "c":135},"y":{"b":-10, "c":460}, "radius":17},
		{"x":{"b":110, "c":150},"y":{"b":-20, "c":450}, "radius":19},
		{"x":{"b":85, "c":190},"y":{"b":-40, "c":360}, "radius":16},
		{"x":{"b":-5, "c":180},"y":{"b":-60, "c":330}, "radius":15},
		{"x":{"b":-10, "c":190},"y":{"b":-50, "c":500}, "radius":20},
		{"x":{"b":74, "c":200},"y":{"b":-26, "c":480}, "radius":18},
		{"x":{"b":5, "c":190},"y":{"b":-110, "c":530}, "radius":17},
		{"x":{"b":85, "c":170},"y":{"b":-120, "c":560}, "radius":19},
		{"x":{"b":24, "c":175},"y":{"b":-110, "c":480}, "radius":19},
		{"x":{"b":65, "c":190},"y":{"b":-95, "c":495}, "radius":16}
	];
	this.moveIn = function(){
		var $this = this;
		canvasAnimate.clearAnimate($this);
		if(!$this.isPlay){
			var jp = jackpot.jackpotMap[$this.id];
			if(jp != undefined){
				jp.t = 0;
				jp.d = 1100;
				jp.run();
			}
			$this.drawIn();
		}
		$this.nextAnimate = "in";
	}
	this.moveOut = function(){
		var $this = this;
		canvasAnimate.clearAnimate($this);
		if(!$this.isPlay){
			
			$this.drawOut();
		}
		$this.nextAnimate = "out";
	}
	this.drawIn = function(){
		var $this = this;
		$this.isPlay = true;
		$this.isOn = true;
		var cxt = $this.canvas[0].getContext("2d");
		var img = $this.img;
		cxt.drawImage(img,0,0);
		cxt.globalCompositeOperation = "destination-out";
		cxt.beginPath();
	    // 下落的球
	    for(var i = 0; i < $this.onCircle.length; i++){
		    $this.drawCircle(cxt,$this.onCircle[i], $this.time, $this.duration);
	    }
	    cxt.fill();
	    cxt.globalCompositeOperation = "source-over";
	    if($this.time < $this.duration){
	    	$this.time += $this.interval;
	    	setTimeout(function(){
	    		$this.drawIn();
	    	}, $this.interval);
	    }else{
	    	$this.drawNull();
	    	$this.time = 0;
	    	$this.isPlay = false;
	    	canvasAnimate.animateList.push($this);
	    	if($this.nextAnimate == "out"){
	    		$this.drawOut();
	    	}
	    	$this.nextAnimate = null;
	    }
	}
	this.drawOut= function(){
		var $this = this;
		$this.isPlay = true;
		$this.isOn = false;
		var index = canvasAnimate.animateList.indexOf($this);
		if(index >= 0){
			canvasAnimate.animateList.splice(index,1);
		}
		var cxt = $this.canvas[0].getContext("2d");
		var img = $this.img;
		cxt.drawImage(img,0,0);
		cxt.globalCompositeOperation = "destination-out";
		
		cxt.beginPath();
	    // 下落的球
	    for(var i = 0; i < $this.outCircle.length; i++){
		    $this.drawCircle(cxt,$this.outCircle[i], $this.time, $this.duration);
	    }
	    cxt.fill();
	    cxt.globalCompositeOperation = "source-over";
	    if($this.time < $this.duration){
	    	$this.time += $this.interval;
	    	setTimeout(function(){
	    		$this.drawOut();
	    	}, $this.interval);
	    }else{
	    	$this.time = 0;
	    	$this.isPlay = false;
	    	if($this.nextAnimate == "in"){
	    		$this.drawIn();
	    	}
	    	$this.nextAnimate = null;
	    }
	}
	this.drawNull = function(){
		var $this = this;
		var cxt = $this.canvas[0].getContext("2d");
		var img = $this.img;
		cxt.drawImage(img,0,0);
		cxt.globalCompositeOperation = "destination-out";
		
		cxt.beginPath();
		cxt.arc(0, 0, 1000, 0, Math.PI * 2);
		cxt.closePath() ;
		cxt.fill();
		cxt.globalCompositeOperation = "source-over";
	}
	/**
	*	cxt		canvas对象
	*	c		circle属性
	*	t		开始时间
	*   d		总时长	
	*	coef	画布大小比例
	*/
	this.drawCircle = function(cxt,c,t,d,coef){
		var easing = "easeInQuad";
		if(c.easing != undefined){
			easing = c.easing;
		}
		var cx = jQuery.easing[easing](null, t, c.x.b, c.x.c, d);	
		var cy = jQuery.easing[easing](null, t, c.y.b, c.y.c, d);
	    cxt.arc(cx, cy, c.radius, 0, Math.PI * 2);
	    cxt.closePath() ;
	}
}