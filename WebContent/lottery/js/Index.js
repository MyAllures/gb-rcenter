define(['site/common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this.initBlink();
            this.getWebPopUpNotice();
            this.initXyxh();
            this.initTable();
            this.initTypeTop();
            this.initWindow();

        },
        bindButtonEvents:function() {

        },
        // 闪烁
        blinkColorArr : "#fa6200|#0f3f94".split("|"),
        initBlink : function(){
            var _this = this;
            $(".blink").each(function() {
                var obj = $(this);
                setInterval(function() {
                    var tmpColor = _this.blinkColorArr[parseInt(Math.random() * blinkColorArr.length)];
                    $(obj).css("color", tmpColor);
                },200);
            });
        },
        getWebPopUpNotice : function() {
            /*静态显示用,后面要删除*/
            var str ='<p onclick="showGonggao(0)" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;height:25px;line-height:25px;margin:0;">重要公告</p><p onclick="showGonggao(1)" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;height:25px;line-height:25px;margin:0;">重要公告</p><p onclick="showGonggao(2)" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;height:25px;line-height:25px;margin:0;">新游戏上线</p>';
            $("#gonggao_marquee").html(str);
            $('#gonggao_marquee').liMarquee({
                direction: 'up',
                scrollamount: 10
            });
            /*静态显示用,后面要删除*/
        },
        showGonggao : function(id) {
            $("#gonggao_" + id).show();
        },
        initXyxh : function(){
            this.xyxh(null, 6);
            this.xyxh(null, 1);
            this.xyxh(null, 9);
            this.xyxh(null, 2);
            this.xyxh(null, 3);
        },
        xyxh : function(obj, type) {
            if (typeof type == 'undefined') {
                return;
            }

            var index_6 = null;
            var index_1 = null;
            var index_2 = null;
            var index_3 = null;
            var index_9 = null;
            if (type == 6) {
                $("#xyxhContent_6 span").each(function () {
                    $(this).data("num", '');
                });

                index_6 = setInterval(function () {
                    var num1 = Math.floor(Math.random() * 49 + 1);
                    var num2 = Math.floor(Math.random() * 49 + 1);
                    var num3 = Math.floor(Math.random() * 49 + 1);
                    var num4 = Math.floor(Math.random() * 49 + 1);
                    var num5 = Math.floor(Math.random() * 49 + 1);
                    var num6 = Math.floor(Math.random() * 49 + 1);
                    var num7 = Math.floor(Math.random() * 49 + 1);

                    var bose1 = getBose(num1);
                    var bose2 = getBose(num2);
                    var bose3 = getBose(num3);
                    var bose4 = getBose(num4);
                    var bose5 = getBose(num5);
                    var bose6 = getBose(num6);
                    var bose7 = getBose(num7);

                    bose1 = bose1 == 0 ? 's0' : (bose1 == 1 ? 's1' : 's2');
                    bose2 = bose2 == 0 ? 's0' : (bose2 == 1 ? 's1' : 's2');
                    bose3 = bose3 == 0 ? 's0' : (bose3 == 1 ? 's1' : 's2');
                    bose4 = bose4 == 0 ? 's0' : (bose4 == 1 ? 's1' : 's2');
                    bose5 = bose5 == 0 ? 's0' : (bose5 == 1 ? 's1' : 's2');
                    bose6 = bose6 == 0 ? 's0' : (bose6 == 1 ? 's1' : 's2');
                    bose7 = bose7 == 0 ? 's0' : (bose7 == 1 ? 's1' : 's2');

                    $("#xyxhContent_6 span").eq(0).attr("class", bose1).html(num1);
                    $("#xyxhContent_6 span").eq(1).attr("class", bose2).html(num2);
                    $("#xyxhContent_6 span").eq(2).attr("class", bose3).html(num3);
                    $("#xyxhContent_6 span").eq(3).attr("class", bose4).html(num4);
                    $("#xyxhContent_6 span").eq(4).attr("class", bose5).html(num5);
                    $("#xyxhContent_6 span").eq(5).attr("class", bose6).html(num6);
                    $("#xyxhContent_6 span").eq(6).attr("class", bose7).html(num7);

                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                    $("#xyxhContent_6 var em").eq(1).html(getSxName(num2));
                    $("#xyxhContent_6 var em").eq(2).html(getSxName(num3));
                    $("#xyxhContent_6 var em").eq(3).html(getSxName(num4));
                    $("#xyxhContent_6 var em").eq(4).html(getSxName(num5));
                    $("#xyxhContent_6 var em").eq(5).html(getSxName(num6));
                    $("#xyxhContent_6 var em").eq(6).html(getSxName(num7));
                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                }, 50);

                setTimeout(function () {
                    var arr = [];
                    while (arr.length != 7) {
                        var randNum = Math.floor(Math.random() * 49 + 1);

                        var hasExist = false;
                        for (var j = 0; j < arr.length; ++j) {
                            if (arr[j] == randNum) {
                                hasExist = true;
                                break;
                            }
                        }
                        if (!hasExist) {
                            arr.push(randNum);
                        }
                    }

                    var num1 = arr[0];
                    var num2 = arr[1];
                    var num3 = arr[2];
                    var num4 = arr[3];
                    var num5 = arr[4];
                    var num6 = arr[5];
                    var num7 = arr[6];

                    var bose1 = getBose(num1);
                    var bose2 = getBose(num2);
                    var bose3 = getBose(num3);
                    var bose4 = getBose(num4);
                    var bose5 = getBose(num5);
                    var bose6 = getBose(num6);
                    var bose7 = getBose(num7);

                    bose1 = bose1 == 0 ? 's0' : (bose1 == 1 ? 's1' : 's2');
                    bose2 = bose2 == 0 ? 's0' : (bose2 == 1 ? 's1' : 's2');
                    bose3 = bose3 == 0 ? 's0' : (bose3 == 1 ? 's1' : 's2');
                    bose4 = bose4 == 0 ? 's0' : (bose4 == 1 ? 's1' : 's2');
                    bose5 = bose5 == 0 ? 's0' : (bose5 == 1 ? 's1' : 's2');
                    bose6 = bose6 == 0 ? 's0' : (bose6 == 1 ? 's1' : 's2');
                    bose7 = bose7 == 0 ? 's0' : (bose7 == 1 ? 's1' : 's2');

                    clearInterval(index_6);
                    $("#xyxhContent_6 span").eq(0).attr("class", bose1).data("num", "tm_b-" + num1).html(num1);
                    $("#xyxhContent_6 span").eq(1).attr("class", bose2).data("num", "tm_b-" + num2).html(num2);
                    $("#xyxhContent_6 span").eq(2).attr("class", bose3).data("num", "tm_b-" + num3).html(num3);
                    $("#xyxhContent_6 span").eq(3).attr("class", bose4).data("num", "tm_b-" + num4).html(num4);
                    $("#xyxhContent_6 span").eq(4).attr("class", bose5).data("num", "tm_b-" + num5).html(num5);
                    $("#xyxhContent_6 span").eq(5).attr("class", bose6).data("num", "tm_b-" + num6).html(num6);
                    $("#xyxhContent_6 span").eq(6).attr("class", bose7).data("num", "tm_b-" + num7).html(num7);

                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                    $("#xyxhContent_6 var em").eq(1).html(getSxName(num2));
                    $("#xyxhContent_6 var em").eq(2).html(getSxName(num3));
                    $("#xyxhContent_6 var em").eq(3).html(getSxName(num4));
                    $("#xyxhContent_6 var em").eq(4).html(getSxName(num5));
                    $("#xyxhContent_6 var em").eq(5).html(getSxName(num6));
                    $("#xyxhContent_6 var em").eq(6).html(getSxName(num7));
                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                    $("#xyxhContent_6 var em").eq(0).html(getSxName(num1));
                }, 2000);
            } else if (type == 1) {
                $("#xyxhContent_1 span").each(function () {
                    $(this).data("num", '');
                });

                index_1 = setInterval(function () {
                    var num1 = Math.floor(Math.random() * 10);
                    var num2 = Math.floor(Math.random() * 10);
                    var num3 = Math.floor(Math.random() * 10);
                    var num4 = Math.floor(Math.random() * 10);
                    var num5 = Math.floor(Math.random() * 10);

                    $("#xyxhContent_1 span").eq(0).html(num1);
                    $("#xyxhContent_1 span").eq(1).html(num2);
                    $("#xyxhContent_1 span").eq(2).html(num3);
                    $("#xyxhContent_1 span").eq(3).html(num4);
                    $("#xyxhContent_1 span").eq(4).html(num5);
                }, 50);

                setTimeout(function () {
                    var num1 = Math.floor(Math.random() * 10);
                    var num2 = Math.floor(Math.random() * 10);
                    var num3 = Math.floor(Math.random() * 10);
                    var num4 = Math.floor(Math.random() * 10);
                    var num5 = Math.floor(Math.random() * 10);

                    clearInterval(index_1);
                    $("#xyxhContent_1 span").eq(0).data("num", "wan-" + num1).html(num1);
                    $("#xyxhContent_1 span").eq(1).data("num", "qian-" + num2).html(num2);
                    $("#xyxhContent_1 span").eq(2).data("num", "bai-" + num3).html(num3);
                    $("#xyxhContent_1 span").eq(3).data("num", "shi-" + num4).html(num4);
                    $("#xyxhContent_1 span").eq(4).data("num", "ge-" + num5).html(num5);
                }, 2000);
            } else if (type == 2) {
                $("#xyxhContent_2 span").each(function () {
                    $(this).data("num", '');
                });

                index_2 = setInterval(function () {
                    var num1 = Math.floor(Math.random() * 10);
                    var num2 = Math.floor(Math.random() * 10);
                    var num3 = Math.floor(Math.random() * 10);
                    var num4 = Math.floor(Math.random() * 10);
                    var num5 = Math.floor(Math.random() * 10);

                    $("#xyxhContent_2 span").eq(0).html(num1);
                    $("#xyxhContent_2 span").eq(1).html(num2);
                    $("#xyxhContent_2 span").eq(2).html(num3);
                    $("#xyxhContent_2 span").eq(3).html(num4);
                    $("#xyxhContent_2 span").eq(4).html(num5);
                }, 50);

                setTimeout(function () {
                    var num1 = Math.floor(Math.random() * 10);
                    var num2 = Math.floor(Math.random() * 10);
                    var num3 = Math.floor(Math.random() * 10);
                    var num4 = Math.floor(Math.random() * 10);
                    var num5 = Math.floor(Math.random() * 10);

                    clearInterval(index_2);
                    $("#xyxhContent_2 span").eq(0).data("num", "wan-" + num1).html(num1);
                    $("#xyxhContent_2 span").eq(1).data("num", "qian-" + num2).html(num2);
                    $("#xyxhContent_2 span").eq(2).data("num", "bai-" + num3).html(num3);
                    $("#xyxhContent_2 span").eq(3).data("num", "shi-" + num4).html(num4);
                    $("#xyxhContent_2 span").eq(4).data("num", "ge-" + num5).html(num5);
                }, 2000);
            } else if (type == 3) {
                $("#xyxhContent_3 span").each(function () {
                    $(this).data("num", '');
                });

                index_3 = setInterval(function () {
                    var num1 = Math.floor(Math.random() * 10);
                    var num2 = Math.floor(Math.random() * 10);
                    var num3 = Math.floor(Math.random() * 10);
                    var num4 = Math.floor(Math.random() * 10);
                    var num5 = Math.floor(Math.random() * 10);

                    $("#xyxhContent_3 span").eq(0).html(num1);
                    $("#xyxhContent_3 span").eq(1).html(num2);
                    $("#xyxhContent_3 span").eq(2).html(num3);
                    $("#xyxhContent_3 span").eq(3).html(num4);
                    $("#xyxhContent_3 span").eq(4).html(num5);
                }, 50);

                setTimeout(function () {
                    var num1 = Math.floor(Math.random() * 10);
                    var num2 = Math.floor(Math.random() * 10);
                    var num3 = Math.floor(Math.random() * 10);
                    var num4 = Math.floor(Math.random() * 10);
                    var num5 = Math.floor(Math.random() * 10);

                    clearInterval(index_3);
                    $("#xyxhContent_3 span").eq(0).data("num", "wan-" + num1).html(num1);
                    $("#xyxhContent_3 span").eq(1).data("num", "qian-" + num2).html(num2);
                    $("#xyxhContent_3 span").eq(2).data("num", "bai-" + num3).html(num3);
                    $("#xyxhContent_3 span").eq(3).data("num", "shi-" + num4).html(num4);
                    $("#xyxhContent_3 span").eq(4).data("num", "ge-" + num5).html(num5);
                }, 2000);
            } else if (type == 9) {
                $("#xyxhContent_9 span").each(function () {
                    $(this).data("num", '');
                });

                index_9 = setInterval(function () {
                    var num1 = Math.floor(Math.random() * 10 + 1);
                    var num2 = Math.floor(Math.random() * 10 + 1);
                    var num3 = Math.floor(Math.random() * 10 + 1);
                    var num4 = Math.floor(Math.random() * 10 + 1);
                    var num5 = Math.floor(Math.random() * 10 + 1);
                    var num6 = Math.floor(Math.random() * 10 + 1);
                    var num7 = Math.floor(Math.random() * 10 + 1);
                    var num8 = Math.floor(Math.random() * 10 + 1);
                    var num9 = Math.floor(Math.random() * 10 + 1);
                    var num10 = Math.floor(Math.random() * 10 + 1);

                    $("#xyxhContent_9 span").eq(0).attr("class", 'fang bg-' + num1).html(num1);
                    $("#xyxhContent_9 span").eq(1).attr("class", 'fang bg-' + num2).html(num2);
                    $("#xyxhContent_9 span").eq(2).attr("class", 'fang bg-' + num3).html(num3);
                    $("#xyxhContent_9 span").eq(3).attr("class", 'fang bg-' + num4).html(num4);
                    $("#xyxhContent_9 span").eq(4).attr("class", 'fang bg-' + num5).html(num5);
                    $("#xyxhContent_9 span").eq(5).attr("class", 'fang bg-' + num6).html(num6);
                    $("#xyxhContent_9 span").eq(6).attr("class", 'fang bg-' + num7).html(num7);
                    $("#xyxhContent_9 span").eq(7).attr("class", 'fang bg-' + num8).html(num8);
                    $("#xyxhContent_9 span").eq(8).attr("class", 'fang bg-' + num9).html(num9);
                    $("#xyxhContent_9 span").eq(9).attr("class", 'fang bg-' + num10).html(num10);
                }, 50);

                setTimeout(function () {
                    var num1 = Math.floor(Math.random() * 10 + 1);
                    var num2 = Math.floor(Math.random() * 10 + 1);
                    var num3 = Math.floor(Math.random() * 10 + 1);
                    var num4 = Math.floor(Math.random() * 10 + 1);
                    var num5 = Math.floor(Math.random() * 10 + 1);
                    var num6 = Math.floor(Math.random() * 10 + 1);
                    var num7 = Math.floor(Math.random() * 10 + 1);
                    var num8 = Math.floor(Math.random() * 10 + 1);
                    var num9 = Math.floor(Math.random() * 10 + 1);
                    var num10 = Math.floor(Math.random() * 10 + 1);

                    clearInterval(index_9);
                    $("#xyxhContent_9 span").eq(0).attr("class", 'fang bg-' + num1).data('num', 'gj-' + num1).html(num1);
                    $("#xyxhContent_9 span").eq(1).attr("class", 'fang bg-' + num2).data('num', 'yj-' + num2).html(num2);
                    $("#xyxhContent_9 span").eq(2).attr("class", 'fang bg-' + num3).data('num', 'jj-' + num3).html(num3);
                    $("#xyxhContent_9 span").eq(3).attr("class", 'fang bg-' + num4).data('num', 'q4-' + num4).html(num4);
                    $("#xyxhContent_9 span").eq(4).attr("class", 'fang bg-' + num5).data('num', 'q5-' + num5).html(num5);
                    $("#xyxhContent_9 span").eq(5).attr("class", 'fang bg-' + num6).data('num', 'q6-' + num6).html(num6);
                    $("#xyxhContent_9 span").eq(6).attr("class", 'fang bg-' + num7).data('num', 'q7-' + num7).html(num7);
                    $("#xyxhContent_9 span").eq(7).attr("class", 'fang bg-' + num8).data('num', 'q8-' + num8).html(num8);
                    $("#xyxhContent_9 span").eq(8).attr("class", 'fang bg-' + num9).data('num', 'q9-' + num9).html(num9);
                    $("#xyxhContent_9 span").eq(9).attr("class", 'fang bg-' + num10).data('num', 'q10-' + num10).html(num10);
                }, 2000);
            }
        },
        initTable : function(){
            var _this = this;
            //        numadd(".main_layout .right_layotu .left_wrap .Bettingbag .num_bett .val_add .reduce a",".main_layout .right_layotu .left_wrap .Bettingbag .num_bett .val_add .reduce a.fl",".main_layout .right_layotu .left_wrap .Bettingbag .num_bett .val_add .reduce a.fr")
            tabs_cg(".Newest .tabs_cg ul li:lt(11)", ".Newest .layout .Analysis", "hover", "acti", "", "");//下面
            tabs_cg(".main_layout .right_layotu .left_wrap .tabs_cg ul li", ".main_layout .right_layotu .left_wrap .Bettingbag .num_bett", "hover", "acti", "", "");
            two_scroll(".main_layout .right_layotu .left_wrap .scroll_pic ul li", "", "", ".main_layout .right_layotu .left_wrap .scroll_pic p i", "", 189);

            $(".Newest .Analysis .box3 .timer_wrap").each(function (index, element) {
                $(this).attr("index", "ti" + index);
                $(this).addClass("ti" + index);
            });

            setInterval(function(){
                $(".Newest .Analysis .box3 .timer_wrap").each(function(index, element) {
                    _this.abc('".Newest .Analysis .box3 ".'+$(this).attr("index")+'"');
                });
            }, 1000);

            // 底部彩种时间
            setInterval(function () {
                $(".openTime_leftOpenTime").each(function () {
                    var time = parseInt($(this).data("leftOpenTime"));
                    if (time < 0) {
                        var p = $(this).parent().parent();
                        if($(p).data("querydate") && new Date() - $(p).data("querydate") > 4000 ){
//                        eval($(p).data("methodname") + '()');
                        }
                        //console.log($(p).data("methodname") + " " + $(p).data("querydate"));
                        return;
                    }
//                if (typeof time == 'undefined' || isNaN(time) || time < 0) {
//                    if (time < 0) {
//                        $(time).data("methodName")();
//                    }
//                    return;
//                }
                    var tmp = time;
                    var hour = Math.floor(tmp / 60 / 60);
                    tmp -= hour * 60 * 60;
                    var minute = Math.floor(tmp / 60);
                    tmp -= minute * 60;
                    var second = Math.floor(tmp);

                    var str = '';
                    if (hour > 0) {
                        str += '<ol class="s">';
                        str += '<span class="sp1">' + Math.floor(hour / 10) + '</span>';
                        str += '<span class="sp2">' + Math.floor(hour % 10) + '</span>';
                        str += '</ol>';

                    }
                    str += '<ol class="f">';
                    str += '<span class="sp1">' + Math.floor(minute / 10) + '</span>';
                    str += '<span class="sp2">' + Math.floor(minute % 10) + '</span>';
                    str += '</ol>';
                    str += '<ol class="m">';
                    str += '<span class="sp1">' + Math.floor(second / 10) + '</span>';
                    str += '<span class="sp2">' + Math.floor(second % 10) + '</span>';
                    str += '</ol>';
                    $(this).html(str);
                    $(this).data("leftOpenTime", --time);
                    if (hour <= 0) {
                        $(this).removeClass("three");
                    } else {
                        $(this).addClass("three");
                    }
                });
            }, 1000);

            // 首页中间彩种时间
            setInterval(function () {
                $(".Bettingbag .leftTime").each(function () {
                    var mtime = $(this).data("left_time");
                    if (typeof mtime == 'undefined' || isNaN(mtime) || mtime < 0) {
                        return;
                    }
                    var tmp = mtime;
                    var hour = Math.floor(tmp / 60 / 60);
                    tmp -= hour * 60 * 60;
                    var minute = Math.floor(tmp / 60);
                    tmp -= minute * 60;
                    var second = Math.floor(tmp);

                    var str = '';
                    str += '截止&nbsp:&nbsp';
                    if (hour > 0) {
                        str += Math.floor(hour / 10);
                        str += Math.floor(hour % 10);
                        str += '小时';
                    }
                    str += Math.floor(minute / 10);
                    str += Math.floor(minute % 10);
                    str += '分';
                    str += Math.floor(second / 10);
                    str += Math.floor(second % 10);
                    str += '秒';
                    $(this).html(str);
                    $(this).data("left_time", --mtime);
                });
            }, 1000);
        },
        abc : function (mainDiv) {
            //console.log(mainDiv);
            var i = $(mainDiv + " ol.m span.sp2").text();
            i--;
            if (i == -1) {
                i = 9;
                $(mainDiv + " ol.m span.sp2").text(i);
                var te = $(mainDiv + " ol.m span.sp1").text() - 1;
                if (te < 0) {
                    if ($(mainDiv + " ol.f span.sp2").text() == 0) {
                        $(mainDiv + " ol.f span.sp2").text(9);

                        if ($(mainDiv + " ol.f span.sp1").text() == 0) { //分

                            $(mainDiv + " ol.f span.sp1").text(6);

                            if ($(mainDiv + " ol.s span.sp2").text() == 0) {
                                $(mainDiv + " ol.s span.sp2").text(9);
                                $(mainDiv + " ol.s span.sp1").text($(mainDiv + " ol.s span.sp1").text() - 1);

                            } else {
                                $(mainDiv + " ol.s span.sp2").text($(mainDiv + " ol.s span.sp2").text() - 1);
                            }
                        }
                        $(mainDiv + " ol.f span.sp1").text($(mainDiv + " ol.f span.sp1").text() - 1);
                    } else {
                        $(mainDiv + " ol.f span.sp2").text($(mainDiv + " ol.f span.sp2").text() - 1)//分钟
                    };;;;;;
                    te = 5;
                }
                $(mainDiv + " ol.m span.sp1").text(te)
            }

            $(mainDiv + " ol.m span.sp2").text(i)
        },
        initTypeTop : function(){
            $('.type_top .left .left_div .log,.type_top .left .left_div .alert_log').hover(function () {
                $('.type_top .left .left_div .alert_log').show();
                $('.type_top .left .left_div .alert_par').hide();
            });
            $('.type_top').hover(function () {
            }, function () {
                $('.type_top .left .left_div .alert_log').hide();
                $('.type_top .left .left_div .alert_par').hide();
            });
            $('.type_top .right ul li.l').hover(function () {
                $(this).addClass('sli');
                $(this).find('div').show();
            });
            $('.type_top .right ul li').hover(function () {

            }, function () {
                $(this).removeClass('sli');
                $(this).find('div').hide();
            });
            $('.type_top .left .left_div a.par').hover(function () {
                $('.type_top .left .left_div .alert_par').show();
                $('.type_top .left .left_div .alert_log').hide();
            })
        },
        initWindow : function(){
            var _this = this;
            $(window).resize(function() {
                _this.resizePopUp();
            });
            $(window).scroll(function() {
                _this.resizePopUp();
            });
        },
        resizePopUp : function () {
            $(".popupDiv").css({
                "top": ($(window).height() - $(".popupDiv").height()) / 2 + $(window).scrollTop() + "px",
                "left": ($(window).width() - $(".popupDiv").width()) / 2 + "px"
            });
        }
    });
});
