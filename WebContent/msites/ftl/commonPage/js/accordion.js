/*!
 ========== accordion 动态手风琴 ==========
 */
+ function($) {
	$.fn.accordion = function(options) {
		var subCount, subCountLen;
		var leave = false;
		$this = this;
		defaults = {
			showIndex: 1
		};
		var opts = $.extend(defaults, options);

		function init() {
			m = $this[0];
			subCount = $this.find("li");
			subCountLen = subCount.length;
			$thisWidth = $this[0].offsetWidth;
			averageWidth = $thisWidth / subCountLen;
			ot = Math.floor(($thisWidth - opts.maxWidth) / (subCountLen - 1));
			for(var i = 0; i < subCountLen; i++) {
				subCount[i].style.width = averageWidth + "px";
				timer(subCount[i])
			}
			defatulOpen()
		}

		function timer(s) {
			s.onmouseover = function() {
				$(".mask").show();
				var $__this = $(this);
				clearInterval($this.htimer);
				clearInterval($this.timer);
				$this.timer = setInterval(function() {
					slide(s)
				}, opts.expandSpeed);
				$__this.find(".cover").show();
				$__this.find(".mask").hide();
				var $parent = $(".active", $__this.parent());
				$parent.removeClass("active");
				$parent.find(".cover").hide();
				$parent.find(".mask").show();
				$__this.addClass("active");
				leave = false
			};
			s.onmouseout = function() {
				var $__this = $(this);
				clearInterval($this.timer);
				clearInterval($this.htimer);
				$this.htimer = setInterval(function() {
					$this.find("li.active").mouseover();
				}, opts.expandSpeed);
				$__this.find(".cover").hide();
				$__this.find(".mask").show();
				var his = $__this.parent().find(".his")
				his.siblings().removeClass("active his");
				his.addClass("active his");
				//$__this.removeClass("active");
				leave = true
			}
		}

		function slide(s, c) {
			var cw = parseInt(s.style.width);
			if((cw < opts.maxWidth && !c) || (cw > averageWidth && c)) {
				var owt = 0;
				var i = 0;
				for(i; i < subCountLen; i++) {
					if(subCount[i] != s) {
						var oi = 0;
						var o = subCount[i];
						var ow = parseInt(o.style.width);
						if(ow < averageWidth && c) {
							oi = Math.floor((averageWidth - ow) / opts.slideSpeed);
							oi = (oi > 0) ? oi : 1;
							o.style.width = (ow + oi) + "px"
						} else {
							if(ow > ot && !c) {
								oi = Math.floor((ow - ot) / opts.slideSpeed);
								oi = (oi > 0) ? oi : 1;
								o.style.width = (ow - oi) + "px"
							}
						}
						if(c) {
							owt = owt + (ow + oi)
						} else {
							owt = owt + (ow - oi)
						}
					}
				}
				s.style.width = ($thisWidth - owt) + "px"
			} else {
				if($this.htimer) {
					clearInterval($this.htimer)
				}
				if(leave) {
					defatulOpen()
				}
				if($this.timer) {
					clearInterval($this.timer);
					if(leave) {
						defatulOpen()
					}
				}
			}
		}

		function defatulOpen() {
			$this.timer = setInterval(function() {
				$this.find("li.active").mouseover()
			}, opts.expandSpeed);
		}
		init()
	}
}(jQuery);