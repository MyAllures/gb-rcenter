// 清除内容提示框
var layerId = null;
var T = null;
function showClearBetTemplate() {
    if (layerId != null) {
        return;
    }
    var clearBet_template = '\
    <div class="clearBet_template">\
        <div class="l">\
            <span>\
            <i></i>\
            </span>\
        </div>\
        <div class="r">\
            <p>当前期已结束，是否要清空已投注内容？</p>\
            <p>要清空已投注内容请单击"确定",不刷新页面请点击"取消"</p>\
        </div>\
        <div style="clear:both"></div>\
        <div class="btns" style="text-align:center">\
            <button type="button" onclick="closeClearBetTemplate(true)">确定</button>\
            <button type="button" onclick="closeClearBetTemplate(false)">取消<font class="time"></font></button>\
        </div>\
    </div>\
    ';

    layer.closeAll();
    //页面层
    layerId = layer.open({
        type: 1,
        time: 15000,
        title: '温馨提示',
        skin: 'layui-layer-popup layui-layer-rim', //加上边框
        area: ['480px', '240px'], //宽高
        content: clearBet_template
    });

    var time = 5;
    T = setInterval(function() {
        if (time == 0) {
            closeClearBetTemplate();
            return;
        }
        $(".clearBet_template .time").html('(' + time + ')');
        --time;
    }, 1000);

    // 隐藏追号模板
    $("#zhInfo").hide();
    zhuihaoSscOpenTimeList = null;
}

function closeClearBetTemplate(isReset) {
    if (T != null) {
        clearInterval(T);
        T = null;
    }
    if (typeof layerId != 'undefined' && layerId != null) {
        layer.close(layerId);
        layerId = null;
    }
    if (typeof layerInfo != 'undefined' && layerInfo != null) {
        layer.close(layerInfo);
        layerInfo = null;
    }

    if (typeof layerInfoInsert != 'undefined' && layerInfoInsert != null) {
        layer.close(layerInfoInsert);
        layerInfoInsert = null;
    }

    if (typeof layerTishi1 != 'undefined' && layerTishi1 != null) {
        layer.close(layerTishi1);
        layerTishi1 = null;
    }
    if (typeof layerTishi2 != 'undefined' && layerTishi2 != null) {
        layer.close(layerTishi2);
        layerTishi2 = null;
    }

    if (typeof isReset != 'undefined') {
        if (isReset && typeof reset == 'function') {
            reset();
        }

        if(isReset){
            clearSelected();
            clearTextarea();
            clearContent();
        }
    }
}

// 显示封盘
function showFengPan() {
    $(".pl").html("封盘");    // 初始显示封盘
}

var getSscOpenTime_Running = false; // getSscOpenTime函数是否正在调用
// 获取时间、期号
function getSscOpenTime(playGroupId, callback) {
    if (getSscOpenTime_Running) {
        return;
    }

    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getSscOpenTime2.json",
        data: {
            playGroupId: playGroupId
        },
        beforeSend: function() {
            sscOpenTimeJson = null;
            getSscOpenTime_Running = true;
        },
        success: function(json) {
            if (json.result != 1) {
                return;
            }

            $("#number").data("number", json.number).html(json.number); // 期数

            if (json.opening) {
                $("#tip").html(json.number + '期已开盘，欢迎投注。距离下一期还有:');
                $("#leftTime").data("time", json.leftTime);
                $("#tip").data("opening", true);
                $("#tip").data("isFengpan", json.isFengpan);

                renderPlData();
            } else {
                $("#tip").html(json.number + '期已封盘，距离开盘还有:');
                $("#leftTime").data("time", json.leftOpenTime);
                $("#tip").data("opening", false);
                $("#tip").data("isFengpan", json.isFengpan);
                showFengPan();
            }

            if (typeof callback == 'function') {
                callback();
            }

            // 追号处理
            if (typeof getZhuihaoList == 'function') {
                // 隐藏追号模板
                $("#zhInfo").hide();
                // 获取最新开奖时间列表
                getZhuihaoList();
            }
        },
        complete: function() {
            getSscOpenTime_Running = false;
        }
    });
}

// 获取玩法赔率
var playPlJson = null;
function getSscPlayPl(playId) {
    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getSscPlayPl.json",
        data: {
            playId: playId
        },
        success: function(json) {
            if (json.result != 1) {
                return;
            }

            playPlJson = json.sscPlayPlList;

            // 渲染数据
            renderPlData();
        },
        error: function() {
            // 重试
            setTimeout(function() {
                getSscPlayPl(playId);
            }, 3000);
        }
    });
}

// 渲染赔率
function renderPlData() {
    if (playPlJson != null) {
        $.each(playPlJson, function (index, value) {
            $("[data-plid='" + value.playPlId + "']").data("pl", value.playPl).html(value.playPl);
        });
    }
}

// 时间倒计时
$(function() {
    var getSscOpenTime_Timestamp = null;   // 调用getSscOpenTime成功的时间

    var isInitSwfObject = false;
    function play(file) {
        if (!isInitSwfObject) {
            // 初始化音乐
            var flashvars = {};
            var params = {
                wmode: "transparent"
            };
            var attributes = {};
            swfobject.embedSWF(CONFIG.RESURL + "js/swfobject/sound.swf", "soundContainer", "1", "1", "9.0.0", CONFIG.RESURL + "js/swfobject/expressInstall.swf", flashvars, params, attributes);
            isInitSwfObject = true;
        }

        var sound = swfobject.getObjectById("soundContainer");
        if (sound) {
            sound.SetVariable("f", file);
            sound.GotoFrame(1);
        }
    }

    function autoLeftTime() {
        var time = $("#leftTime").data("time");
        var isFengpan = $("#tip").data("isFengpan");
        var opening = $("#tip").data("opening");
        if (isNaN(time) || time < 0) {
            if (getSscOpenTime_Timestamp != null && (new Date()).getTime() - getSscOpenTime_Timestamp < 5 * 1000) {   // 5秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
                return;
            }

            if (1 == isFengpan) {
                getSscOpenTime(playGroupId, function () {
                    getSscOpenTime_Timestamp = (new Date()).getTime();  // 设置调用getSscOpenTime成功的时间
                    getOpenCodeHistory();   // 获取开奖记录
                });

                if (opening) {
                    if (time == -1) {
                        // 显示清除投注内容提示框
                        if (typeof showClearBetTemplate == 'function') {
                            showClearBetTemplate();
                        }
                    }
                }
            } else {
                getSscOpenTime(playGroupId, function () {
                    getSscOpenTime_Timestamp = (new Date()).getTime();  // 设置调用getSscOpenTime成功的时间
                    getOpenCodeHistory();   // 获取开奖记录
                });

                if (time == -1) {
                    // 显示清除投注内容提示框
                    if (typeof showClearBetTemplate == 'function') {
                        showClearBetTemplate();
                    }
                }
            }


            $("#leftTime").data("time", --time);
            return;
        }
        var tmpTime = time;
        var hour = Math.floor(tmpTime / 60 / 60);
        tmpTime = tmpTime - hour * 60 * 60;
        var minute = Math.floor(tmpTime / 60);
        tmpTime = tmpTime - minute * 60;
        var second = tmpTime;

        var str = '';
        str += '<ol class="s">';
        str += '<span class="sp1">' + (Math.floor(hour / 10)) + '</span>';
        str += '<span class="sp2">' + (Math.floor(hour % 10)) + '</span>';
        str += '</ol>';
        str += '<ol class="f">';
        str += '<span class="sp1">' + (Math.floor(minute / 10)) + '</span>';
        str += '<span class="sp2">' + (Math.floor(minute % 10)) + '</span>';
        str += '</ol>';
        str += '<ol class="m">';
        str += '<span class="sp1">' + (Math.floor(second / 10)) + '</span>';
        str += '<span class="sp2">' + (Math.floor(second % 10)) + '</span>';
        str += '</ol>';

        $("#leftTime").data("time", --time).html(str);

        // 播放铃声
        if (1 == isFengpan) {
            if (opening) {
                if (hour == 0 && minute == 0 && second < 10 && second > 0) {
                    var file = $("#selectCount").find("option:selected").data("file");
                    play(file);
                }
            }
        } else {
            if (hour == 0 && minute == 0 && second < 10 && second > 0) {
                var file = $("#selectCount").find("option:selected").data("file");
                play(file);
            }
        }
        return;
    }

    setInterval(function() {
        autoLeftTime();
    }, 1000);
});

function getSscSubPage(url) {
    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/gcdt/" + url.split("-").join("/") + ".html",
        type: 'GET',
        dataType: 'html',
        beforeSend: function(){
            $("#sscContent").html('<img src="' + CONFIG.RESURL + 'img/base_loading.gif" style="display: block;margin: auto;margin: 50px auto;">');
        },
        success: function(html) {
            // 读取HTML页内容
            $("#sscContent").html(html);

            // 兼容官方玩法
            if (typeof playId == 'undefined') {
                return;
            }

            var gfwfPlayId =  $(".playPlIdBtn.acti").data("play_id");
            //判断是否官方玩法的玩法id
            if(gfwfPlayId != null){
                playId = gfwfPlayId;
            }

            // 读取赔率
            getSscPlayPl(playId);

            // 下单按钮
            $("#sscContent .btns button[type='submit']").click(function() {
                xd();
            });

            // 重置按钮
            $("#sscContent .btns .btn-2").click(function() {
                reset();
            });

            // 只能输入整数
            $('#sscContent input').keyup(function(){
                // this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                var obj = this;
                var v = parseInt($(obj).val());
                //先把非数字的都替换掉，除了数字和.
                obj.value = obj.value.replace(/[^\d.]/g,"");
                //必须保证第一个为数字而不是.
                obj.value = obj.value.replace(/^\./g,"");
                //必须保证第一个为非零数据
                obj.value = obj.value.replace(/^0/g,"");
                //保证只有出现一个.而没有多个.
                obj.value = obj.value.replace(/\.{2,}/g,".");
                //保证.只出现一次，而不能出现两次以上
                obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                if (obj.value.indexOf(".") > 0 && obj.value.indexOf(".") + 0  <= obj.value.length) {
                    obj.value = obj.value.substr(0, obj.value.indexOf(".") + 0);
                }
                if(isNaN(v)|| v <= 0){
                    $(obj).val('');
                }
            });

            $("#toptouzhu .kjanniu a").click(function () {
                var num =parseInt($(this).data('num'));
                $('#toptouzhu input').val(num);
            });

            //判断加载11选5页面是需重新初始化全局变量
            var flag11x5 = $(".Playmethod ul li.gf-li").attr("data-name");
            if(typeof flag11x5 && flag11x5 == '11x5menu'){
                initArrNum();
            }

        },
        complete: function() {
        }
    });
}

// 切换玩法
$(function() {

    // 绑定
    $(".Playmethod ul li p span a").click(function() {
        $(".Playmethod ul li p span.acti").removeClass("acti");
        $(this).parent().addClass("acti");
        getSscSubPage($(this).data("url"));

    });


//        $(".cqssc").click(function(){
//            getSscSubPage($(this).data("url"));
//        });
//

    var navIndex = getQueryString("navIndex");    // 自定义导航子页面
    // 默认第一个玩法
    if (isNaN(navIndex) || navIndex == null) {
        navIndex = 0;
    }

    $(".Playmethod ul li p span a").eq(navIndex).trigger("click");
});

$(function() {
    // 关闭父页Loding
    try {
        parent.hideLoading();
    } catch (e) {}
});

$(function() {
    // 页面加载读取开奖时间
    getSscOpenTime(playGroupId);
});

var lastNumberOpening_intervalFlag = null;
function getOpenCodeHistory() {
    // 获取开奖历史
    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getPlanOpenDataHistory.json",
        data: {
            playGroupId: playGroupId
        },
        success: function (json) {
            if (json.result != 1) {
                return;
            }
            var tmpHtml = '';

            if (json.sscHistoryList.length > 0) {
                var value = json.sscHistoryList[0];
                var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                if (lastNumberOpening) {
                    if (lastNumberOpening_intervalFlag == null) {
                        $("#lastNumber").html('<a href="javascript:void(0)" onclick="gdkj('+playGroupId+')">更多</a>&nbsp;&nbsp;第 ' + value.number + '期<var>开奖中</var>');

                        // 随机号码
                        if (typeof randomNumber == 'function') {
                            lastNumberOpening_intervalFlag = setInterval(function () {
                                randomNumber();
                            }, 100);
                        }
                    }

                    //z 循环读取开奖时间，5秒
                    setTimeout(function () {
                        getOpenCodeHistory();
                    }, 5000);
                } else {
                    if (null != lastNumberOpening_intervalFlag) {
                        clearInterval(lastNumberOpening_intervalFlag);
                        lastNumberOpening_intervalFlag = null;
                    }

                    $("#lastNumber").html('<a href="javascript:void(0)" onclick="gdkj('+playGroupId+')">更多</a>&nbsp;&nbsp;第<var>' + value.number + '</var>期');
/*
                    '<a href="javascript:void(0)" onclick="gdkj('+playGroupId+'">更多</a>'+ '第<var>' + value.number + '</var>期')
*/
                    if (typeof renderLastOpenCode == 'function') {
                        renderLastOpenCode(openCodeArr);
                    }

                    // 两面长龙
                    if (typeof refreshViewRight == 'function') {
                        refreshViewRight();
                    }

                    // 我的中奖
                    if (typeof getBetZjDetails == 'function') {
                        getBetZjDetails();
                    }
                }
            }
            template.helper('getBose',function(xvalue){
                var value = parseInt(xvalue);
                var num = getBose(value);
                var numStr = '';
                if (num == 0) {
                    numStr = 'ball-red';
                } else if (num == 1) {
                    numStr = 'ball-blue';
                } else {
                    numStr = 'ball-green';
                }
                return numStr;
            });

            var colorBg = '';
            var obj = {
                number: '',
                list:''
            };

            $.each(json.sscHistoryList, function (index, value) {
                var openCodeArr = value.openCode ? value.openCode.split(",") : [];

                if(playGroupId != null && playGroupId == 7){

                    var sum1 = parseInt(openCodeArr[0]);
                    var sum2 = parseInt(openCodeArr[1]);
                    var sum3 = parseInt(openCodeArr[2]);

                    var sum = sum1 + sum2 + sum3;

                    if($.inArray(sum,[0,13,14,27]) >= 0){
                        colorBg = "grayxy28";
                    } else if($.inArray(sum,[1,4,7,10,16,19,22,25]) >= 0){
                        colorBg = "greenxy28";
                    } else if($.inArray(sum,[2,5,8,11,17,20,23,26]) >= 0){
                        colorBg = "bluexy28";
                    } else{
                        colorBg = 'redxy28';
                    }

                    obj.colorBg = colorBg;
                    obj.sum = sum;
                }

                obj.number = value.number;
                obj.list = openCodeArr;

                tmpHtml += template('template_openDataHistory', obj);
            });
            $("#lastOpenCodeList ul").html(tmpHtml);
        },
        error: function() {
            // 失败重试
            setTimeout(function() {
                getOpenCodeHistory()
            }, 5000);
        },
        complete: function () {
        }
    });
}
$(function() {
    // 开奖切换
    tabs_cg(".game_name .box2_stage p span i", ".game_name .box2_stage .number", "click", "acti", "", "", 0);
    getOpenCodeHistory();
});
function gdkj(playGroupId) {
    var str="";
    var num="";var num1="";var num2="";var num3="";var num4=""; var num5="";var num6="";var num7="";var num8="";var num9="";var num10=""; var num11="";var num12=""; var num13="";var num14="";var num15="";var num16="";var num17="";var num18="";var num19="";
    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getPlanOpenDataHistory10.json",
        data: {
            playGroupId: playGroupId
        },
        beforeSend: function () {
            parent.showLoading();
        },
        success: function (json) {
            if (json.result != 1) {
                return;
            }
            parent.hideLoading();

            if (playGroupId == 9 || playGroupId == 14 || playGroupId == 23) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {
                                var num = openCode[0];
                                var num1 = openCode[1];
                                var num2 = openCode[2];
                                var num3 = openCode[3];
                                var num4 = openCode[4];
                                var num5 = openCode[5];
                                var num6 = openCode[6];
                                var num7 = openCode[7];
                                var num8 = openCode[8];
                                var num9 = openCode[9];
                        }
                    }
                    if (lastNumberOpening) {
                        str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di">' + getBgColor(num) + ' ' + getBgColor(num1) + '' + getBgColor(num2) + ' ' + getBgColor(num3) + '' + getBgColor(num4) + ' ' + getBgColor(num5) + ' ' + getBgColor(num6) + ' ' + getBgColor(num7) + ' ' + getBgColor(num8) + ' ' + getBgColor(num9) + '</div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                    var num = openCode[0];
                                    var num1 = openCode[1];
                                    var num2 = openCode[2];
                                    var num3 = openCode[3];
                                    var num4 = openCode[4];
                                    var num5 = openCode[5];
                                    var num6 = openCode[6];
                                    var num7 = openCode[7];
                                    var num8 = openCode[8];
                                    var num9 = openCode[9];
                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px; color: white"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di">' + getBgColor(num) + ' ' + getBgColor(num1) + '' + getBgColor(num2) + ' ' + getBgColor(num3) + '' + getBgColor(num4) + ' ' + getBgColor(num5) + ' ' + getBgColor(num6) + ' ' + getBgColor(num7) + ' ' + getBgColor(num8) + ' ' + getBgColor(num9) + '</div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖',
                    }, function () {
                        layer.close(lid);
                    });

                }

            } else if (playGroupId == 1 || playGroupId == 15 || playGroupId == 3 || playGroupId == 2 || playGroupId == 16 || playGroupId == 13 || playGroupId == 17) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {

                            var num = openCode[0];
                            var num1 = openCode[1];
                            var num2 = openCode[2];
                            var num3 = openCode[3];
                            var num4 = openCode[4];


                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span></div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                num = openCode[0];
                                num1 = openCode[1];
                                num2 = openCode[2];
                                num3 = openCode[3];
                                num4 = openCode[4];

                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span></div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖'
                    }, function () {
                        layer.close(lid);
                    });
                }
            } else if (playGroupId == 19 || playGroupId == 20 || playGroupId == 21 || playGroupId == 5 || playGroupId == 4) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {

                            var num = openCode[0];
                            var num1 = openCode[1];
                            var num2 = openCode[2];


                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span></div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                num = openCode[0];
                                num1 = openCode[1];
                                num2 = openCode[2];
                                num3 = openCode[3];
                                num4 = openCode[4];

                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span></div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖'
                    }, function () {
                        layer.close(lid);
                    });

                }
            } else if (playGroupId == 10 || playGroupId == 11) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {

                            var num = openCode[0];
                            var num1 = openCode[1];
                            var num2 = openCode[2];
                            var num3 = openCode[3];
                            var num4 = openCode[4];
                            var num5 = openCode[5];
                            var num6 = openCode[6];
                            var num7 = openCode[7];


                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span><span class="apend">' + num5 + '</span><span class="apend">' + num6 + '</span><span class="apend">' + num7 + '</span></div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                num = openCode[0];
                                num1 = openCode[1];
                                num2 = openCode[2];
                                num3 = openCode[3];
                                num4 = openCode[4];
                                num5 = openCode[5];
                                num6 = openCode[6];
                                num7 = openCode[7];

                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span><span class="apend">' + num5 + '</span><span class="apend">' + num6 + '</span><span class="apend">' + num7 + '</span></div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖'
                    }, function () {
                        layer.close(lid);
                    });
                }
            } else if (playGroupId == 6) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {
                            num = parseInt((openCode)[0]);
                            num1 = parseInt((openCode)[1]);
                            num2 = parseInt((openCode)[2]);
                            num3 = parseInt((openCode)[3]);
                            num4 = parseInt((openCode)[4]);
                            num5 = parseInt((openCode)[5]);
                            num6 = parseInt((openCode)[6]);
                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number +
                            '</var>期</span></div><div class="di">' +
                            getBgColorlhc(num) + ' ' + getBgColorlhc(num1) + ' ' +
                            getBgColorlhc(num2) + ' ' + getBgColorlhc(num3) + ' ' +
                            getBgColorlhc(num4) + ' ' + getBgColorlhc(num5) + ' ' +
                            getBgColorlhc(num6) + '></div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                num = parseInt((openCode)[0]);
                                num1 = parseInt((openCode)[1]);
                                num2 = parseInt((openCode)[2]);
                                num3 = parseInt((openCode)[3]);
                                num4 = parseInt((openCode)[4]);
                                num5 = parseInt((openCode)[5]);
                                num6 = parseInt((openCode)[6]);

                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di">' + getBgColorlhc(num) + ' ' + getBgColorlhc(num1) + ' ' + getBgColorlhc(num2) + ' ' + getBgColorlhc(num3) + ' ' + getBgColorlhc(num4) + ' ' + getBgColorlhc(num5) + ' ' + getBgColorlhc(num6) + '</div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖'
                    }, function () {
                        layer.close(lid);
                    });
                }
            } else if (playGroupId == 8) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {

                            var num = openCode[0];
                            var num1 = openCode[1];
                            var num2 = openCode[2];
                            var num3 = openCode[3];
                            var num4 = openCode[4];
                            var num5 = openCode[5];
                            var num6 = openCode[6];
                            var num7 = openCode[7];
                            var num8 = openCode[8];
                            var num9 = openCode[9];
                            var num10 = openCode[10];
                            var num11 = openCode[11];
                            var num12 = openCode[12];
                            var num13 = openCode[13];
                            var num14 = openCode[14];
                            var num15 = openCode[15];
                            var num16 = openCode[16];
                            var num17 = openCode[17];
                            var num18 = openCode[18];
                            var num19 = openCode[19];


                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di pk10_content"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span><span class="apend">' + num5 + '</span><span class="apend">' + num6 + '</span><span class="apend">' + num7 + '</span><span class="apend">' + num8 + '</span><span class="apend">' + num9 + '</span><span class="apend">' + num10 + '</span><span class="apend">' + num11 + '</span><span class="apend">' + num12 + '</span><span class="apend">' + num13 + '</span><span class="apend">' + num14 + '</span><span class="apend">' + num15 + '</span><span class="apend">' + num16 + '</span><span class="apend">' + num17 + '</span><span class="apend">' + num18 + '</span><span class="apend">' + num19 + '</span></div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                num = openCode[0];
                                num1 = openCode[1];
                                num2 = openCode[2];
                                num3 = openCode[3];
                                num4 = openCode[4];
                                num5 = openCode[5];
                                num6 = openCode[6];
                                num7 = openCode[7];
                                num8 = openCode[8];
                                num9 = openCode[9];
                                num10 = openCode[10];
                                num11 = openCode[11];
                                num12 = openCode[12];
                                num13 = openCode[13];
                                num14 = openCode[14];
                                num15 = openCode[15];
                                num16 = openCode[16];
                                num17 = openCode[17];
                                num18 = openCode[18];
                                num19 = openCode[19];

                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di pk10_content"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span><span class="apend">' + num5 + '</span><span class="apend">' + num6 + '</span><span class="apend">' + num7 + '</span><span class="apend">' + num8 + '</span><span class="apend">' + num9 + '</span><span class="apend">' + num10 + '</span><span class="apend">' + num11 + '</span><span class="apend">' + num12 + '</span><span class="apend">' + num13 + '</span><span class="apend">' + num14 + '</span><span class="apend">' + num15 + '</span><span class="apend">' + num16 + '</span><span class="apend">' + num17 + '</span><span class="apend">' + num18 + '</span><span class="apend">' + num19 + '</span></div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖'
                    }, function () {
                        layer.close(lid);
                    });
                }
            } else if (playGroupId == 7) {

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {

                            var num = openCode[0];
                            var num1 = openCode[1];
                            var num2 = openCode[2];
                            var num3 = parseInt(num) + parseInt(num1) + parseInt(num2);


                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="pluss">+</span><span class="apend">' + num1 + '</span><span class="pluss">+</span><span class="apend">' + num2 + '</span><span class="pluss">=</span><span class="apend ' + getBgCo(num3) + '">' + num3 + '</span></div></p>';
                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                var num = openCode[0];
                                var num1 = openCode[1];
                                var num2 = openCode[2];
                                var num3 = parseInt(num) + parseInt(num1) + parseInt(num2);


                            }
                        }

                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di"><span>第<var>' + value.number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="pluss">+</span><span class="apend">' + num1 + '</span><span class="pluss">+</span><span class="apend">' + num2 + '</span><span class="pluss">=</span><span class="apend ' + getBgCo(num3) + '">' + num3 + '</span></div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖'
                    }, function () {
                        layer.close(lid);
                    });
                }
            }else if (playGroupId == 24) {
                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中
                    var openCode = value.openCode;
                    if (typeof openCode != "undefined" || openCode != null) {
                        openCode = openCode.split(",");

                        for (var i in openCode) {
                                var num = openCode[0];
                                var num1 = openCode[1];
                                var num2 = openCode[2];
                                var num3 = openCode[3];
                                var num4 = openCode[4];

                        }
                    }
                    if (lastNumberOpening) {
                        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;"><span>第<var>' + value.number + '</var>期</span><span>开奖中</span></p>';
                    } else {
                        var str = '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + value.number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span></div></p>';

                    }

                    var slist = json.sscHistoryList;
                    for (var i = 1; i < slist.length; i++) {
                        var openCode = slist[i].openCode
                        if (typeof openCode != "undefined" || openCode != null) {
                            openCode = openCode.split(",");
                            for (var j = 0; j < openCode.length; ++j) {
                                    var num = openCode[0];
                                    var num1 = openCode[1];
                                    var num2 = openCode[2];
                                    var num3 = openCode[3];
                                    var num4 = openCode[4];


                            }
                        }
                        str += '<p class="p" style="font-weight: bold;padding-bottom: 5px;margin-bottom: 5px;"><div class="di1"><span>第<var>' + slist[i].number + '</var>期</span></div><div class="di"><span class="apend">' + num + '</span><span class="apend">' + num1 + '</span><span class="apend">' + num2 + '</span><span class="apend">' + num3 + '</span><span class="apend">' + num4 + '</span></div></p>';

                    }
                    //询问框
                    lid = layer.confirm(str, {
                        btn: ['取消'], //按钮
                        title: '历史开奖',
                    }, function () {
                        layer.close(lid);
                    });

                }
            }

        }

    });




    $(".layui-layer-title").addClass('xzqd');
    $(".layui-layer-close").css({'background': 'url(' + CONFIG.RESURL + 'img/ico_close.png) no-repeat'});
}

function getBgColorlhc(num){
    if ($.inArray(num, [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]) >= 0) {
        return '<span class="red-bg-lhc">' + num + '</span>';
    } else if ($.inArray(num, [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]) >= 0) {
        return '<span class="blue-bg-lhc">' + num + '</span>';
    } else {
        return '<span class="green-bg-lhc">' + num + '</span>';
    }
}

function getBgCo(num){

    var bgnum='';
    if( $.inArray(num, [0,13,14,27])>=0){
       return  bgnum="grayxy28";
    }else if($.inArray(num,[1,4,7,10,16,19,22,25]) >= 0){
        return  bgnum = "greenxy28";
    } else if($.inArray(num,[2,5,8,11,17,20,23,26]) >= 0){
        return  bgnum = "bluexy28";
    } else{
        bgnum = 'redxy28';
    }

}


/*function getBgCo(num){

    if(num==0||num==13||num==14||num==27){
        return '<span  style="background: gray!important: 8px;width: 25px; height: 25px; line-height: 25px; font-size: 16px; ">' + num + '</span>';
    }else if(num==1||num==4||num==7||num==10||num==16||num==19||num==22||num==25){
        return '<span  style="background: #0074ff;margin-left: 8px;width: 25px; height: 25px; line-height: 25px; font-size: 16px; ">' + num + '</span>';
    }else{
        return '<span  style="background: #5bae1c;margin-left: 8px;width: 25px; height: 25px; line-height: 25px; font-size: 16px; ">' + num + '</span>';
    }
}*/




function getBgColor(num){
    if(num==01){

        return '<span  style="background: #dbd507!important;margin-left: 8px;">' + num + '</span>';
    }else if(num==02){

        return '<span  style="background: #01b7ff!important;margin-left: 8px;">' +num+ '</span>';
    }else if(num==03){

        return '<span  style="background: #636862!important;margin-left: 8px;">' + num + '</span>';
    }
    else if(num==04){

        return '<span  style="background: #e4670d!important;margin-left: 8px; ">' +num + '</span>';
    }else if(num==05){

        return '<span  style="background: #7bf8fc!important;margin-left: 8px;">' + num + '</span>';
    }else if(num==06){

        return '<span  style="background: #2600f7!important;margin-left: 8px;">' + num + '</span>';
    }else if(num==07){

        return '<span style="background: #ceced6!important;margin-left: 8px;">' +num + '</span>';
    }else if(num==08){

        return '<span  style="background: #f80509!important; margin-left: 8px; ">' + num + '</span>';
    }else if(num==09){

        return '<span style=" background: #690000!important;margin-left: 8px; ">' + num+ '</span>';
    }else if(num==010){
        return '<span style="background: #090!important;margin-left: 8px; ">' + parseInt(num) + '</span>';
    }
    else if(num==1){

        return '<span  style="background: #dbd507!important;margin-left: 8px;">' + parseInt(num) + '</span>';
    }else if(num==2){

        return '<span  style="background: #01b7ff!important;margin-left: 8px;">' + parseInt(num) + '</span>';
    }else if(num==3){

        return '<span  style="background: #636862!important;margin-left: 8px;">' + parseInt(num) + '</span>';
    }
    else if(num==4){

        return '<span  style="background: #e4670d!important;margin-left: 8px; ">' + parseInt(num) + '</span>';
    }else if(num==5){

        return '<span  style="background: #7bf8fc!important;margin-left: 8px;">' + parseInt(num) + '</span>';
    }else if(num==6){

        return '<span  style="background: #2600f7!important;margin-left: 8px;">' + parseInt(num) + '</span>';
    }else if(num==7){

        return '<span style="background: #ceced6!important;margin-left: 8px;">' + parseInt(num) + '</span>';
    }else if(num==8){

        return '<span  style="background: #f80509!important; margin-left: 8px; ">' + parseInt(num) + '</span>';
    }else if(num==9){

        return '<span style=" background: #690000!important;margin-left: 8px; ">' + parseInt(num) + '</span>';
    }else if(num==10){
        return '<span style="background: #090!important;margin-left: 8px; ">' + parseInt(num) + '</span>';
    }

}

// 下注
function xd() {
    parent.showLoading();
    var betForm = getZhudan();
    if (typeof betForm != 'object') {
        parent.hideLoading();
        return;
    }
    if (betForm.sscBetList.length == 0) {
        parent.hideLoading();
        Tools.toast("请选择");
        return;
    }

    var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;">共计：￥<font class="red">' + betForm.totalMoney + '</font>/<font class="red">' + betForm.totalZhushu + '</font>&nbsp;注，您确定要下注吗？</p>';
    $.each(betForm.sscBetList, function(index, value) {
        str += '<p><span>[&nbsp;' + value.content + '&nbsp;]</span><span>&nbsp;@' + value.playPl + '&nbsp;X&nbsp;' + value.perMoney + '</span></p>';
    });
    parent.hideLoading();
    //询问框
    layer.confirm(str, {
        btn: ['确认','取消'], //按钮
        title: '下注清单'
    }, function(){
        sureXd();
    }, function(){
    });
    $(".layui-layer-title").addClass('xzqd');
    $(".layui-layer-close").css({'background': 'url(' + CONFIG.RESURL + 'img/ico_close.png) no-repeat'});
}

function sureXd() {
    var betForm = getZhudan();
    if (typeof betForm != 'object') {
        return;
    }

    var data = {
        totalZhushu: betForm.totalZhushu,
        totalMoney: betForm.totalMoney,
        sscBetList: []
    };
    $.each(betForm.sscBetList, function(index, value) {
        data.sscBetList.push({
            playGroupId: value.playGroupId,
            number: value.number,
            playId: value.playId,
            zhushu: value.zhushu,
            perMoney: value.perMoney,
            content: value.content,
            playPlId: value.playPlId,
            playPl: value.playPl
        });
    });

    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/ajaxBet.json",
        data: {
            betForm: JSON.stringify(data)
        },
        beforeSend: function() {
            layer.closeAll();
            parent.showLoading();
        },
        success: function(json) {
            parent.hideLoading();
            if (json.result == 1) {
                layer.msg("下注成功", {icon: 1});
                // 刷新我的投注
                getBetDetails();
                // 刷新余额
                parent.getUserSession();
                // 重置表格
                reset();
            } else {
                layer.msg("下注失败：" + json.description, {icon: 2});
            }
        },
        complete: function() {
        }
    });
}

function reset() {
    $(".main-left .table-common input").each(function(index, value) {
        if ($(this).attr("type") == "checkbox") {
            $(this).prop("checked", false);
        } else if ($(this).attr("type") == "text") {
            $(this).val('');
        }
    });
    $(".bg-yellow").removeClass("bg-yellow");
    $(".main-left .fl input").each(function() {
        if ($(this).attr("type") != 'submit') {
            $(this).val('');
        }
    });
}

$(function() {

    $("#sscContent .btns button[type='submit']").click(function() {
        xd();
    });

    $("#sscContent .btns .btn-2").click(function() {
        reset();
    });
});

// 底部
function getBetZjDetails(){
    var container = $(".wdzj");
    ajaxRequest({
        url: CONFIG.BASEURL + "member/ajaxGetTzjl.json",
        data: {
//                playGroupId: playGroupId,
            pageSize:5,
            status: 1,
            isZhongjiang: true
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {
            if (json.result == -101) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<span class="spanlogin">登录</span>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="' + CONFIG.BASEURL + '?u=' + CONFIG.BASEURL + 'register.html" target="_blank">注册</a></span>一个</li>');

                $("#bottomInfo #BetLogin .spanlogin").click(function () {
                    $(".alert_log").fadeIn();
                });
                $(".alert_log .alert_log_col h5 i").click(function () {
                    $(".alert_log").fadeOut();
                });
                parent.getUserSession();
                return;
            }
            if(json.result != 1) {
                return;
            }

            if (json.sscBetsList.length == 0) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无投注</li>');
                return;
            }

            var obj = {list: []};
            $.each(json.sscBetsList,function (index,value) {
                obj.list.push({
                    playGroupName: value.playGroupName,
                    number: value.number,
                    playName: value.playName,
                    content: value.content,
                    totalMoney: value.totalMoney,
                    jiangjin: mul(value.totalMoney, value.playPl),
                    status: value.status,
                    zjMoney: value.zjMoney
                });
            });

            var html = template('wdzjTemplate', obj);
            $(container).html(html);
        }
    });
}

function getJjsm() {
    var container = $(".jjsm");

    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/ajaxGetSscPlayJjDescription.json",
        data: {
            playId: playId
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {
            if(json.result != 1) {
                return;
            }

            $(container).html(json.jjDescription);
        }
    });
}

function getKjhm(){
    var container = $(".kjhm");
    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/ajaxGetHistory.json",
        data: {
            playGroupId: playGroupId,
            pageIndex: 1,
            pageSize: 5
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {
            if (json.result == -101) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">请先登录</li>');
                return;
            }
            if(json.result != 1) {
                return;
            }

            if (json.sscHistoryList.length == 0) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无记录</li>');
                return;
            }

            var obj = {list: []};
            $.each(json.sscHistoryList,function (index,value) {
                obj.list.push({
                    playGroupName: value.playGroupName,
                    number: value.number,
                    openCode: value.openCode,
                    openTime: dateFormat(value.openTime, "yyyy-mm-dd HH:MM:ss"),
                    playGroupId: value.playGroupId
                });
            });
            obj.playGroupId = playGroupId;

            var html = template('kjhmTemplate', obj);
            $(container).html(html);
        }
    });
}

function getBetDetails(){
    var container = $(".wdtz");
    ajaxRequest({
        url: CONFIG.BASEURL + "member/ajaxGetTzjl.json",
        data: {
//                playGroupId: playGroupId,
            pageSize:5,
            status: 0
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {

            if (json.result == -101) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<span class="spanlogin">登录</span>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="' + CONFIG.BASEURL + '?u=' + CONFIG.BASEURL + 'register.html" target="_blank">注册</a></span>一个</li>');

                $("#bottomInfo #BetLogin .spanlogin").click(function () {
                    $(".alert_log").fadeIn();
                });
                $(".alert_log .alert_log_col h5 i").click(function () {
                    $(".alert_log").fadeOut();
                });
                parent.getUserSession();
                return;
            }
            if(json.result != 1) {
                return;
            }

            if (json.sscBetsList.length == 0) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无投注</li>');
                return;
            }

            var obj = {list: []};
            $.each(json.sscBetsList,function (index,value) {
                obj.list.push({
                    playGroupName: value.playGroupName,
                    number: value.number,
                    playName: value.playName,
                    content: value.content,
                    totalMoney: value.totalMoney,
                    jiangjin: mul(value.totalMoney, value.playPl),
                    status: value.status,
                    zjMoney: value.zjMoney
                });
            });

            var html = template('wdtzTemplate', obj);
            $(container).html(html);
        }
    });
}

$(function() {

    $("#bottomInfo .tabs ul li").click(function() {
        $("#bottomInfo .tabs ul li.acti").removeClass("acti");
        $(this).addClass("acti");
        $("#bottomInfo .list_wrap").hide();

        var obj = $("#bottomInfo .list_wrap").eq($(this).index());
        $(obj).show();

        var operType = $(this).data("opertype");
        if (operType == 'wdtz') {
            getBetDetails();
        } else if (operType == 'kjhm') {
            getKjhm(obj);
        } else if (operType == 'jjsm') {
            getJjsm(obj);
        } else if (operType == 'wdzj') {
            getBetZjDetails(obj);
        }
    });

    $("#bottomInfo .tabs ul li").eq(0).trigger("click");
});